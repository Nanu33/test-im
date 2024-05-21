/* eslint-disable require-jsdoc */
import React, {Component} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
export default class loader extends Component {
  // constructor(props) {
  //     super(props);
  //     this.state = {};
  // }
  render() {
    return (
      <React.Fragment>
        <div className="loader">
          <CircularProgress thickness="2"  color="secondary" />
          {this.props.msg === undefined ? ' Loading, Please wait !!! ' : <span className="loadingText"> {this.props.msg} </span>}
        </div>
      </React.Fragment>
    );
  }
}
