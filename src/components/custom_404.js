/* eslint-disable require-jsdoc */
import React, { Component } from "react";
import { createTheme } from '@material-ui/core/styles'
import Button from "@material-ui/core/Button";


class ErrorPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  login=()=>{
    window.location.assign('/')
  }

  render() {
    return (
     <div>
          <h1 style={{textAlign:'center',marginTop:'30px'}}>Page Not found</h1>
          <p style={{textAlign:'center'}}>
            Are you sure you typed in the correct URL?
          </p>
          <div style={{textAlign:'center'}}>
          <Button variant="contained" color="primary" onClick={this.login}>Back to Login</Button>
          </div>
    
          </div>
    );
  }
}

export default ErrorPage;
