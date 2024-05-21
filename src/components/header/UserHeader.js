/* eslint-disable require-jsdoc */
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { NavLink, Link } from 'react-router-dom';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import AddIcon from '@material-ui/icons/Add';
import PublishIcon from '@material-ui/icons/Publish';
import { customStyles, customStylesauto } from '../../components/customscripts/customscript';
import ReactModal from 'react-modal';
import { withSnackbar } from 'notistack';
import CloseIcon from '@material-ui/icons/Close';
import Logo from '../../images/logo.jpg';
import LinkItem from '../linkItem';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';

class header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      open1: false,
      value: null,
      message: '',
      inputVal: '',
      anchorEl: false,
      DealType: sessionStorage.getItem('DealType'),
      OrgName: sessionStorage.getItem('OrgName'),

    };
  }

  onOpenModal1(value) {
    console.log("MODAL " + value);
    this.setState({ open1: true, value: value });
  };

  onCloseModal1 = () => {
    this.setState({ open1: false, loadingmodal: false });
  };


  render() {

    return (
      <React.Fragment>

        <div className="row">
          <div className="col-md-6 col-sm-12 align-self-center pageHeading">
          {/* <img src={Logo} className="logo_img" /> */}
          <LinkItem to={'#nogo'} className="logo_img" title={''} icon={Logo} > </LinkItem>
          <span className="pageTitle"> {this.props.pageTitle} </span>
          </div>
          <div className="col-md-6 col-sm-12 text-right align-self-center pageHeading">
            <React.Fragment>
              <Button variant="outlined" color="primary" href={"/admin/users/"+this.state.OrgName+"/Pending"}>
                <PermIdentityIcon></PermIdentityIcon> Pending User
            </Button>

            <Button variant="outlined" color="primary" href={"/admin/users/"+this.state.OrgName+"/Approved"}>
                <PermIdentityIcon></PermIdentityIcon> Approved User
            </Button>

            </React.Fragment>
          </div>
        </div>


      </React.Fragment>
    );
  }
}


export default withSnackbar(header);