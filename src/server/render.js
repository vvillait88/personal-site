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
         <!-- SEO -->
         <meta name="description" content="" />
         <meta name="keywords" content="" />
         <script type="application/ld+json">
         {
           "@context":"http://schema.org",
           "@type":"WebSite",
           "name":"",
           "url":""
         }
         </script>
         <link rel="canonical" href="">
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
