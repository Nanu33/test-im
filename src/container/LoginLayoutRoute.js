import React from 'react';
import { Outlet } from 'react-router-dom';
import intainmarketlogo from '../images/intainmarketlogo.png';
import loginImage from '../images/loginimage2.png'

function LoginLayout() {
  return (
    <React.Fragment>
      <div className="container-fluid">
        <div className="row align-self-center custom-height main-container">
          <div className="left-container" id='signup-container'>
            <div className="logo-container">
              <img alt="intain market" src={intainmarketlogo} />
            </div>
            <div className="login-content1 left-container-form align-self-center justify-content-center" id='signup-content'>
              {/* Render nested routes */}
              <Outlet />
            </div>
          </div>

          <div className="right-container d-flex custom-height login-left-image"
            style={{
              backgroundImage: `url(${loginImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              position: 'fixed', right: 0, top: 0
            }}>
            <div className="login-content align-self-end text-start left-content">
              <div className='futureof'>
                <h1>Future of</h1>
                <h1>Structured Finance</h1>
              </div>
              <p>Integrated and Automated for Transaction Efficiency and Asset Transparency</p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

// Usage within Route
export function LoginLayoutRoute({ children }) {
  return (
    <LoginLayout>
      {children}
    </LoginLayout>
  );
}
