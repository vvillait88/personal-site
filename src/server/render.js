import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';
import { Provider } from 'react-redux';
import configureStore from '../shared/store';
import App from '../client/App';

const isProd = process.env.NODE_ENV === 'production';

export default ({ clientStats }) => (req, res) => {
  const context = {};

  const helmetContext = {};

  const store = configureStore();

  const loadContent = () => Promise.all([
  ]);

  const app = () => renderToString(
    <Provider store={store}>
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={req.originalUrl} context={context}>
          <App />
        </StaticRouter>
      </HelmetProvider>
    </Provider>
  );

  const { js, styles, cssHash } = flushChunks(clientStats, {
    chunkNames: flushChunkNames()
  });

  const template = () => {
    const appOutput = app();
    const { helmet } = helmetContext;

    return (
      `<html>
       <head ${helmet.htmlAttributes.toString()}>
         <!-- Charset -->
         <meta charset="utf-8">

         <!-- Mobile Compatability -->
         <meta name="viewport" content="width=device-width, initial-scale=1">

         <!-- Fonts -->
         <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,700&display=swap" rel="stylesheet">

         <!-- Material-UI Icons -->
         <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">

         <!-- jQuery -->
         <script src="https://code.jquery.com/jquery.js"></script>

         <!-- FontAwesome -->
         <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.12.0/css/all.css" crossOrigin="anonymous" />

         <!-- Fontisto -->
         <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/fontisto@v3.0.4/css/fontisto/fontisto.min.css" />

         <!-- FlexBox Grid -->
         <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/flexboxgrid/6.3.1/flexboxgrid.min.css" type="text/css" />

         <!-- SEO -->
         <meta name="description" content="Varun Villait's Personal Site" />
         <script type="application/ld+json">
         {
           "@context":"http://schema.org",
           "@type":"WebSite",
           "name":"Varun Villait's Personal Site",
           "url":"https://varun.villait.org"
         }
         </script>
         <link rel="canonical" href="https://varun.villait.org">
         ${helmet.title.toString()}
         ${helmet.meta.toString()}
         ${helmet.link.toString()}

         ${styles}
       </head>
       <body ${helmet.bodyAttributes.toString()}>
         <div id="root">${appOutput}</div>
         ${js}
         <script>
           window.INITIAL_STATE = ${JSON.stringify(store.getState())}
         </script>
         ${cssHash}
       </body>
     </html>`
    );
  };

  const promise = loadContent();

  promise.then(() => {
    res.send(template());
  });
};
