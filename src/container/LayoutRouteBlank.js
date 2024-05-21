import React from 'react';
import { Route } from 'react-router-dom';
import Sidebar from '../components/sidebar/sidebar';


export default function LayoutRoute({ component: Component, ...rest }) {
  return (
    <Route {...rest} render={(props) => (
      <Layout>
        {Component &&
          <Component {...props} />
        }
      </Layout>
    )} />
  );
}

function Layout({ children }) {
  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  );
}
