/* eslint-disable require-jsdoc */
import React, {Component} from 'react';
import LinkItem from '../linkItem';
import {portfolioSetupWizard as MenuJSON} from '../sidebar/menu';
export default class breadcrumb extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="stepBar">
        <ul className={this.props.activeStep}>
          {MenuJSON.map((item) => {
            return (
              <li className={item.className} key={item.title}>
                <LinkItem to={item.linkto} step={item.step} title={item.title}></LinkItem>
              </li>
            );
          })
          }
        </ul>
      </div>
    );
  }
}
