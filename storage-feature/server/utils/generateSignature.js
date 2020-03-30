/**
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * This file is licensed under the terms of the MIT License (see LICENSE.md).
 */

'use strict';

const crypto = require( 'crypto' );
const url = require( 'url' );

// See: https://ckeditor.com/docs/cs/latest/guides/security/request-signature.html
// and https://ckeditor.com/docs/cs/latest/examples/security/request-signature-nodejs.html.
function generateSignature( apiSecret, method, uri, timestamp, body = null ) {
	const parsedUrl = url.parse( uri ).path;

	const hmac = crypto.createHmac( 'SHA256', apiSecret );

	hmac.update( `${ method.toUpperCase() }${ parsedUrl }${ timestamp }` );

	if ( body ) {
		hmac.update( Buffer.from( JSON.stringify( body ) ) );
	}

	return hmac.digest( 'hex' );
}

module.exports = generateSignature;
