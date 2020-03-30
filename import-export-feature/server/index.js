/**
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * This file is licensed under the terms of the MIT License (see LICENSE.md).
 */

'use strict';

const path = require( 'path' );
const fs = require( 'fs' );
const express = require( 'express' );
const axios = require( 'axios' );
const cors = require( 'cors' );
const bodyParser = require( 'body-parser' );
const generateSignature = require( './utils/generateSignature' ); // See: https://ckeditor.com/docs/cs/latest/examples/security/request-signature-nodejs.html.
const editorBundle = fs.readFileSync( path.resolve( '../client/build/editor.js' ) ); // It should be your bundled editor.

const app = express();
const port = 8000; // The default application port.

if ( !process.env.API_SECRET ) {
	console.error( 'API_SECRET environmental variable is required!' );
	process.exit( 9 );
}

const apiSecret = process.env.API_SECRET;

app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( bodyParser.json() );
app.use( cors() );

// This function will be responsible for sending requests to CKEditor Cloud Services API.
async function sendRequest( method, url, body ) {
	const CSTimestamp = Date.now();
	const payload = {
		method,
		url,
		mode: 'no-cors',
		headers: {
			'Content-Type': 'application/json',
			'X-CS-Signature': generateSignature( apiSecret, method, url, CSTimestamp, body ),
			'X-CS-Timestamp': CSTimestamp
		}
	};

	if ( method.toUpperCase() !== 'GET' ) {
		payload.data = body;
	}

	try {
		const { status, data } = await axios( payload );

		return { status, data };
	} catch ( { response } ) {
		const { status, data } = response;

		return { status, data };
	}
}

// Upload the editor bundle. Note that you will need to upload your editor again if you change the bundle.
app.post( '/upload-editor', async ( req, res ) => {
	const { organizationId, environmentId, bundleVersion } = req.body;

	const { status, data } = await sendRequest( 'POST', `https://${ organizationId }.cke-cs.com/api/v4/${ environmentId }/editors`, {
		bundle: editorBundle.toString(),
		config: {
			cloudServices: {
				bundleVersion // This value should be unique per environment.
			}
		}
	} );

	return res.json( { status, data } );
} );

// Import content to the document.
app.post( '/import', async ( req, res ) => {
	const { organizationId, environmentId, documentId, editorContent, bundleVersion } = req.body;

	const { status, data } = await sendRequest( 'POST', `https://${ organizationId }.cke-cs.com/api/v4/${ environmentId }/collaborations`, {
		document_id: documentId,
		bundle_version: bundleVersion,
		data: editorContent
	} );

	return res.json( { status, data } );
} );

// Export your data from the CKEditor Cloud Services. You can schedule export operations e.g. once per hour.
app.get( '/export', async ( req, res ) => {
	const { organizationId, environmentId, documentId } = req.query;

	const { status, data } = await sendRequest( 'GET', `https://${ organizationId }.cke-cs.com/api/v4/${ environmentId }/collaborations/${ documentId }` );

	return res.json( { status, data } );
} );

app.listen( port, () => console.log( `The application is listening on port ${ port }!` ) );
