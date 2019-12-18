import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { Route } from 'react-router-dom';
import universal from 'react-universal-component';
import { Switch } from 'react-router';

const UniversalContainer = universal((props) => import(`./containers/${props.page}/index`));

const isProd = process.env.NODE_ENV === 'production';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <Fragment>
        <Helmet
          defaultTitle=""
          titleTemplate="%s | "
        >
          <meta property="og:title" content="" />
          <meta property="og:description" content="" />
          <meta property="og:url" content="" />
          <meta property="og:image" content="" />
          <meta property="og:type" content="website" />
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:image" content="" />
          <meta property="twitter:title" content="" />
          <meta property="twitter:site" content="" />
          <meta property="twitter:creator" content="" />
          <meta property="twitter:description" content="" />
        </Helmet>

        <Switch>
          <Route exact path="/">
            <UniversalContainer isProd={isProd} page="home" />
          </Route>
          <Route exact path="*">
            <UniversalContainer isProd={isProd} page="notfound" />
          </Route>
        </Switch>
      </Fragment>
    );
  }
}

export default connect(null, {
})(App);
