/* eslint-disable react/prop-types */
/* eslint-disable require-jsdoc */
import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import {NavLink} from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';


export default class linkItem extends Component {
  // constructor(props) {
  //     super(props);
  //     this.state = {};
  // }
  render() {
    return (
      <NavLink className={'nav-link ' + this.props.className} to={this.props.to}>

        <Tooltip title={this.props.title} placement="top">            
        <Button aria-controls="simple-menu" aria-haspopup="true">
          {this.props.icon === undefined? ' ' : <span className="icon">
            {/* {process.env.react_app_base_url_app} */}
            <img alt={this.props.title} title={this.props.title} src={this.props.icon} />
          </span>}
          {this.props.step === undefined ? ' ' : <span className="step">
            {this.props.step}
          </span>}
          <span className="text">
            {this.props.title}
          </span>
          {this.props.children}
        </Button>
        </Tooltip>
      </NavLink>
    );
  }
}
// export default connect(
//     ({ linkItem }) => ({ ...linkItem }),
//     dispatch => bindActionCreators({ ...linkItemActions }, dispatch)
//   )( linkItem );
