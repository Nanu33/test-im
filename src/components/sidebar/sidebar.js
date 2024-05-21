/* eslint-disable require-jsdoc */
import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import {
  TrusteeMenu, InvestorMenu, Preprocessing, Originator, IntainABSTrustee,
  Issuer, IntainABSInvestor, Servicer, adminUser, IssuerIcons, Servicer_Icons,Processor, InvestorIcons, VA_Icons,UW_Icons,RA_Icons,PayingAgent_Icons
} from './menu';
import LinkItem from '../linkItem';
import HelpIcon from '../../images/help.png'
import Logo from '../../images/logo-ind.png';
import Button from '@material-ui/core/Button';
import axios from "axios";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Tooltip from '@material-ui/core/Tooltip';



export default class sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: sessionStorage.getItem('username'),
      // currentUser: sessionStorage.getItem('userrole'),
      OrgName: sessionStorage.getItem('OrgName'),
      userrole: sessionStorage.getItem('userrole'),
      ChannelName: sessionStorage.getItem('ChannelName'),
      loading: false,
      getLoansLoader: false,
      open: false,
      message: '',
      currentmenu: [],
      menu_loader: false
    };
  }

  async componentDidMount() {
    // currentUser: sessionStorage.getItem('name').charAt(0).toUpperCase(),

    if (this.state.userrole === "Investor") {
      this.setState({ currentmenu: InvestorIcons, menu_loader: true })
    }
    else if (this.state.userrole === "Verification") {
        this.setState({ currentmenu: VA_Icons, menu_loader: true })
      }
      else if (this.state.userrole === "Underwriter") {
        this.setState({ currentmenu: UW_Icons, menu_loader: true })
      }
      else if (this.state.userrole === "Servicer") {
        this.setState({ currentmenu: Servicer_Icons, menu_loader: true })
      }
      else if (this.state.userrole === "Paying Agent") {
        this.setState({ currentmenu: PayingAgent_Icons, menu_loader: true })
      }else if(this.state.userrole === "Rating Agency"){
        this.setState({ currentmenu: RA_Icons, menu_loader: true })
      }
      else {
        this.setState({ currentmenu: IssuerIcons, menu_loader: true })
      }
    
    // if (this.state.userType == "Admin") {
    //   this.setState({ currentmenu: IssuerIcons, menu_loader: true })
    // } else {
    //   this.setState({ currentmenu: Processor, menu_loader: true })
    // if (this.state.OrgName == "investor") {
    //   if (this.state.ChannelName == "IntainABS") {
    //     this.setState({ currentmenu: IntainABSInvestor, menu_loader: true })
    //   } else if (this.state.ChannelName == "WSFS") {
    //     this.setState({ currentmenu: InvestorMenu, menu_loader: true })
    //   } else if (this.state.ChannelName == "UMB") {
    //     this.setState({ currentmenu: InvestorMenu, menu_loader: true })
    //   }
    // } else if (this.state.OrgName == "originator") {
    //   this.setState({ currentmenu: Originator, menu_loader: true })
    // } else if (this.state.OrgName == "issuer") {
    //   this.setState({ currentmenu: Issuer, menu_loader: true })
    // } else if (this.state.OrgName == "servicer") {
    //   this.setState({ currentmenu: Servicer, menu_loader: true })
    // } else if (this.state.OrgName == "whlender") {
    //   this.setState({ currentmenu: TrusteeMenu, menu_loader: true })
    // } else if (this.state.OrgName == "trustee") {
    //   if (this.state.ChannelName == "IntainABS") {
    //     this.setState({ currentmenu: IntainABSTrustee, menu_loader: true })
    //   } else if (this.state.ChannelName == "WSFS") {
    //     this.setState({ currentmenu: TrusteeMenu, menu_loader: true })
    //   } else if (this.state.ChannelName == "UMB") {
    //     this.setState({ currentmenu: TrusteeMenu, menu_loader: true })
    //   }
    // }
    // }

    // Originator, Preprocessing, Issuer, Investor, Servicer




    // if (this.state.currentUser !== null) {
    //   const firstname = this.state.currentUser;
    //   const namefirstletter = firstname.charAt(0).toUpperCase();
    //   this.setState({ currentUser: namefirstletter });
    // }

  };

  logoutBtn() {
    sessionStorage.clear();
    window.location.assign("/")
  }

  render() {
    console.log("the active sidebar is", this.props.activeComponent)
    return (
      <React.Fragment>
        {this.state.menu_loader == false ? '' :
          <div className="sidebar">
            <ul>
              {this.state.currentmenu.map((item) => {
                return (
                  <li key={item.title} className="issure-icons">
                    {/* {item.icon} */}
                    <Link to={item.linkto} title={item.title} className={this.props.activeComponent === item.title ? "issure-icon-active" : "issure-icon"}>
                      <img alt='issuer icon' src={item.icon} />
                    </Link>
                    {item.subitems != null ? (
                      <React.Fragment>
                        <ul>
                          <div className="arrow-left"></div>
                          <div className="arrow_box">
                            {item.subitems.map((item1) => {
                              return (
                                <li key={item1.title}>
                                  <LinkItem to={item1.linkto} title={item1.title}></LinkItem>
                                </li>
                              );
                            })
                            }
                          </div>
                        </ul>
                      </React.Fragment>
                    ) : (
                      <React.Fragment> </React.Fragment>
                    )
                    }
                  </li>
                );
              })
              }
            </ul>
            {/* Help Icon functionality is remaining So it it commented */}
            {/* <ul className="bottomMenu issure-icons">
              <li>
                <img src={HelpIcon} alt="help" />
              </li>
            </ul> */}
            {/*  */}

            {/* <Tooltip title="LogOut">
            <ul className="bottomMenu">
              {/* <li className="userInfo"><LinkItem to={'#nogo'} title={this.state.currentUser} > </LinkItem></li> */}
            {/* <li className="showMenu">  
                <Button className="logout" variant="contained" color="primary" type="submit" onClick={this.logoutBtn} >
                  <ExitToAppIcon></ExitToAppIcon> 
                </Button>
              </li>
              
            </ul>
            </Tooltip> */}
          </div>
        }
      </React.Fragment>
    );
  }
}
