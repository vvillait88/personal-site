import React from 'react';
import { Helmet } from 'react-helmet-async';
import './styles.scss';

export default class NotFound extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <section>
        <Helmet>
          <title>Not Found</title>
        </Helmet>
        <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
          <div className="col-md-5 p-lg-5 mx-auto my-5">
            <h1 className="display-4 font-weight-normal">Not Found</h1>
          </div>
        </div>
      </section>
    );
  }
}
