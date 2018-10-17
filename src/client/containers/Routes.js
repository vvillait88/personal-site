import React from 'react';
import { Helmet } from 'react-helmet';
import { Route, Link } from 'react-router-dom';
import universal from 'react-universal-component';
import { Switch } from 'react-router';

const UniversalContainer = universal(props => import(`./${props.page}/index`));

export default () => (
  <div>
    <Helmet
      defaultTitle="Site Name"
      titleTemplate="Site Name - %s"
    >
      <meta charSet="utf-8" />
      <link rel="canonical" href="" />
      <meta name="description" content="" />
      <meta name="keywords" content="" />
    </Helmet>
    {/* <div className="nav">
      <Link to="/">Gallery</Link>
      <Link to="/about">About</Link>
      <Link to="/article">Article</Link>
    </div> */}
    <Switch>
      <Route exact path="/">
        <UniversalContainer page="home" />
      </Route>
    </Switch>
  </div>
);
