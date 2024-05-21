import React, {Component} from 'react';
import './formLoader.scss'
import { LinearProgress } from '@material-ui/core';
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import * as formLoaderActions from "../../store/formLoader/actions";
export default class formLoader extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {};
    // }
    render() {
      return (
        <div className="form-loader">
          <LinearProgress color="secondary" />

        </div>
      )
    }
  }
