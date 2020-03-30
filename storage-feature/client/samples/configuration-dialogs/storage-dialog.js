/**
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * This file is licensed under the terms of the MIT License (see LICENSE.md).
 */

/* eslint-env browser */

( function() {
	const LOCAL_STORAGE_KEY = 'STORAGE_CONFIG';

	function storageDialog() {
		const overlay = document.createElement( 'div' );

		overlay.id = 'overlay';
		overlay.innerHTML = `
			<form class="body">
				<h2>Connect CKEditor Cloud Services</h2>
				<div><label for="environment-id">Environment ID</label><input required id="environment-id"></div>
				<div><label for="organization-id">Organization ID</label><input required id="organization-id"></div>
				<div><label for="bundle-version">Editor bundle version</label><input required id="bundle-version"></div>
				<button type="submit" id="start">Start</button>
			</form>`;

		document.body.appendChild( overlay );

		const form = overlay.querySelector( 'form' );
		const environmentIdInput = document.getElementById( 'environment-id' );
		const organizationIdInput = document.getElementById( 'organization-id' );
		const bundleVersionInput = document.getElementById( 'bundle-version' );

		const storageConfig = getStoredConfig();

		environmentIdInput.value = storageConfig.environmentId || '';
		organizationIdInput.value = storageConfig.organizationId || '';
		bundleVersionInput.value = storageConfig.bundleVersion || '';

		return new Promise( resolve => {
			form.addEventListener( 'submit', evt => {
				evt.preventDefault();

				storeConfig( {
					environmentId: environmentIdInput.value,
					organizationId: organizationIdInput.value,
					bundleVersion: bundleVersionInput.value
				} );

				overlay.remove();

				resolve( {
					environmentId: environmentIdInput.value,
					organizationId: organizationIdInput.value,
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

	window.storageDialog = storageDialog;
}() );
