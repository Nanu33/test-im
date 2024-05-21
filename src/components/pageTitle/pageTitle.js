import React, {Component} from 'react';
import './pageTitle.scss';

export default class pageTitle extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
      return (
        <div className="pageTitle">

          Portfolio Wizard Setup

        </div>
      )
    }
  }
// export default connect(
//     ({ pageTitle }) => ({ ...pageTitle }),
//     dispatch => bindActionCreators({ ...pageTitleActions }, dispatch)
//   )( pageTitle );