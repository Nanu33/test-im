/* eslint-disable require-jsdoc */
import React, {Component} from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
export default class formloader extends Component {
  // constructor(props) {
  //     super(props);
  //     this.state = {};
  // }
  render() {
    return (
      <React.Fragment>
        <div className="form-loader">
          <LinearProgress id="loadercolor" />
          {this.props.msg === undefined ? <span className="text-center">Please wait </span> : <span className="loadingText"> {this.props.msg} </span>}
        </div>
      </React.Fragment>
    );
  }
}
