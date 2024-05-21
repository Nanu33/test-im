import React, {Component} from 'react';
import './logo.scss'
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import * as logoActions from "../../store/logo/actions";
export default class logo extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {};
    // }
    render() {
      return <div className="component-logo">Hello! component logo</div>;
    }
  }
// export default connect(
//     ({ logo }) => ({ ...logo }),
//     dispatch => bindActionCreators({ ...logoActions }, dispatch)
//   )( logo );