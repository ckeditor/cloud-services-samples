# CKEditor Cloud Services storage feature sample

This repository presents a [classic editor build](https://ckeditor.com/docs/ckeditor5/latest/builds/guides/overview.html#classic-editor) of CKEditor 5 with the
ready to use [Express.js](https://expressjs.com/) application using storage feature.

## Quick start

1. Clone the repository:

   ```bash
   git clone git@github.com:ckeditor/cloud-services-samples.git
   cd cloud-services-samples/storage-feature
   ```
   
2. Run the backend application. Remember to provide a valid `API_SECRET` during the application start: 
   
   ```bash
   cd server
   npm install
   API_SECRET=your_api_secret npm run start
   ```

3. Open the `client/samples/index.html` page in the browser in two separate tabs.

4. In the first tab open `Simple storage interface` and fill the dialog. The `Editor bundle version` property should be unique per an environment. Click `Upload editor bundle` to upload the editor bundle to CKEditor Cloud Services.

5. In the second tab open `Editor` and fill the dialog with correct token, websocket, document ID, editor bundle version and upload URL endpoints. If you do not have these yet or do not know their meaning, [contact us](https://ckeditor.com/contact/). Remember to use the same `Editor bundle version` as in the previous step. Add some content, try to collaborate. Create a few more documents with different IDs.

6. When you finish editing your documents back to the previous tab. To get the list of your documents click the `Get documents list` button. You should get the list of previously created documents. To get content of a document provide its ID in the field and click `Get document content`. To delete a document provide its ID in the field and click the `Delete document` button.
  

![Storage example](https://c.cksource.com/a/1/img/npm/storage-cloud-services-sample.png
 "Storage example")

## Overview

This sample includes a simple application using CKEditor 5 [classic editor](https://ckeditor.com/docs/ckeditor5/latest/builds/guides/overview.html#classic-editor) with [real-time collaborative editing](https://ckeditor.com/docs/ckeditor5/latest/features/collaboration/real-time-collaboration/real-time-collaboration.html).
The sample contains also the sample [Node.js](https://nodejs.org/en/) and [Express.js](https://expressjs.com/) application that uses CKEditor Cloud Services storage feature.

## Custom build

To create your custom build you need to install packages first. Run:

```bash
cd client
npm install
```

To edit client side code open the `client` directory and add some changes. Then you need to rebuild a project. Run:

```bash
npm run build
```

Note: The application supports JavaScript, PostCSS and SVG imports.

See the [CKEditor 5 Installing plugins guide](https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/installing-plugins.html) to learn more.

The build process uses the webpack configuration from `webpack.config.js`. If you are familiar with Webpack, you can play with this file to achieve a custom build that would fit your needs. You can check the [CKEditor 5 Advanced setup guide](https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/advanced-setup.html#webpack-configuration) for some ready-to-use advanced configurations.

To edit server side code open the `server` directory and install packages.

```bash
cd server
npm install
```

Then add some changes. Finally, rerun the server application:

```bash
API_SECRET=your_api_secret npm run start
```

If you are familiar with Express.js you can build use this sample to build your custom server app that uses CKEditor Cloud Services benefits.
