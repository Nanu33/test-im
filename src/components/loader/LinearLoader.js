/* eslint-disable require-jsdoc */
import React, {Component} from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';

export default class loader extends Component {
  // constructor(props) {
  //     super(props);
  //     this.state = {};
  // }
  render() {
    return (
      <React.Fragment>
        <div className="LinearProgress">
          <LinearProgress thickness="2"  color="secondary" />
          {this.props.msg === undefined ? 'Please wait...' : <span className="loadingText"> {this.props.msg} </span>}
        </div>
      </React.Fragment>
    );
  }
}
