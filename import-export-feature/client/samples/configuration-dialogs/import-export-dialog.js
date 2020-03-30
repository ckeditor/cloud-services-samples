/**
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * This file is licensed under the terms of the MIT License (see LICENSE.md).
 */

/* eslint-env browser */

( function() {
	const LOCAL_STORAGE_KEY = 'IMPORT_EXPORT_CONFIG';

	function importExportDialog() {
		const overlay = document.createElement( 'div' );

		overlay.id = 'overlay';
		overlay.innerHTML = `
			<form class="body">
				<h2>Connect CKEditor Cloud Services</h2>
				<div><label for="environment-id">Environment ID</label><input required id="environment-id"></div>
				<div><label for="organization-id">Organization ID</label><input required id="organization-id"></div>
				<div><label for="bundle-version">Editor bundle version</label><input required id="bundle-version"></div>
				<div><label for="document-id">Document ID</label><input required id="document-id"></div>
				<button type="submit" id="start">Start</button>
			</form>`;

		document.body.appendChild( overlay );

		const form = overlay.querySelector( 'form' );
		const environmentIdInput = document.getElementById( 'environment-id' );
		const organizationIdInput = document.getElementById( 'organization-id' );
		const bundleVersionInput = document.getElementById( 'bundle-version' );
		const documentIdInput = document.getElementById( 'document-id' );

		const importExportConfig = getStoredConfig();

		environmentIdInput.value = importExportConfig.environmentId || '';
		organizationIdInput.value = importExportConfig.organizationId || '';
		documentIdInput.value = importExportConfig.documentId || '';
		bundleVersionInput.value = importExportConfig.bundleVersion || '';

		return new Promise( resolve => {
			form.addEventListener( 'submit', evt => {
				evt.preventDefault();

				storeConfig( {
					environmentId: environmentIdInput.value,
					organizationId: organizationIdInput.value,
					documentId: documentIdInput.value,
					bundleVersion: bundleVersionInput.value
				} );

				overlay.remove();

				resolve( {
					environmentId: environmentIdInput.value,
					organizationId: organizationIdInput.value,
					documentId: documentIdInput.value,
					bundleVersion: bundleVersionInput.value
				} );
			} );
		} );
	}

	function getStoredConfig() {
		return JSON.parse( localStorage.getItem( LOCAL_STORAGE_KEY ) || '{}' );
	}

	function storeConfig( csConfig ) {
		localStorage.setItem( LOCAL_STORAGE_KEY, JSON.stringify( csConfig ) );
	}

	window.importExportDialog = importExportDialog;
}() );
