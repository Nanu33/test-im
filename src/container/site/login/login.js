/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import React, { Component } from 'react';
import './login.scss';
import './login.css';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';

import { withTheme } from '@rjsf/core';
import { Theme as MaterialUITheme } from '@rjsf/material-ui';


import logo from '../../../images/IntainLogo_onHover.png';
import FormLoader from '../../../components/loader/formLoader';
import { withSnackbar } from 'notistack';
import { widgets, CustomFieldTemplate, customStyles, customStylesauto } from '../../../components/customscripts/customscript';

const Form = withTheme(MaterialUITheme);

const schema = require('./schema.json');

const uiSchema = {

  'Password': {
    'ui:widget': 'password',
  },
};


class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schema: schema,
      uiSchema: uiSchema,
      orgLoading: false,
      loginLoading: false,
      formData: {
        "UserName": "",
        "Password": "",
        "OrgName": ""
      }
    };
  }




  getAllOrgnames = async () => {

    try {
      const res = await axios.get(process.env.react_app_base_url2 + "getAllUserRoles");

      const resp = res.data;

      console.log(resp)
      if (res.status === 200) {

        let UserRoleID = []
        let UserRoleName = []
        if (resp.length !== 0) {
          resp.forEach(function (key, value) {
            console.log("key", key.UserRoleID)
            console.log("value", value)
            // var obj = { name: key, label: key }
            UserRoleID.push(key.UserRoleID);
            UserRoleName.push(key.UserRoleName);
          });
        }
        console.log("columns", UserRoleID)

        let olschemadata = this.state.schema;
        console.log("olschemadata", olschemadata);

        olschemadata.properties.OrgName.enum = UserRoleName;
        olschemadata.properties.OrgName.enumNames = UserRoleName;
        const nodesData = Object.assign({}, olschemadata);
        console.log("WRITE oldstagedata1", nodesData);
        this.setState({ schema: nodesData })


        console.log('eligibleloans', this.state.schema);
        this.setState({ OrgNames: resp, orgLoading: true });

        const message = "Org list loaded";
        this.props.enqueueSnackbar(message, {
          variant: 'info',
          autoHideDuration: 1000,
        });

      } else {
        alert('Failed');
      }
    } catch (error) {
      alert('Failed');
      console.log('getLoans API error', error);
    }

  }





  async componentDidMount() {

    sessionStorage.clear();
    this.getAllOrgnames();

  }


  // onSubmit = async (value) => {

  onSubmit = async ({ formData }, e) => {
    e.preventDefault();
    console.log("Data submitted: ", formData)
    console.log('onSubmit:', formData)
    let data = formData;

    this.authenticate(data);
    // this.setState({ loginLoading: true });
  };


  authenticate = async (data) => {

    const dataString = data


    try {
      const res = await axios.post(process.env.react_app_base_url2 + 'authenticate', dataString);

      const resp = res.data.data;

      console.log("resp" + JSON.stringify(resp))
      this.setState({ loginLoading: false });

      if (res.status === 204) {
        alert("Incorrect details or user not registered")
        // $('#loader').hide();
      }
      else if (res.status === 200) {

        sessionStorage.setItem("OrgName", resp.OrgName);
        sessionStorage.setItem('user_id', resp.UserID)
        sessionStorage.setItem('first_name', resp.FirstName);
        sessionStorage.setItem('last_name', resp.LastName);
        sessionStorage.setItem('token', res.data.response.token);
        var peer = "peer0." + resp.OrgName + "-net";
        var p1 = "peer0." + resp.OrgName + "-net";
        var peers = [p1]
        sessionStorage.setItem('peer', peer);
        sessionStorage.setItem('peers', JSON.stringify(peers));
        const userRole = resp.OrgName;
        var admin = resp.UserName;

        const message = "Login Succesfully";
        this.props.enqueueSnackbar(message, {
          variant: 'info',
          autoHideDuration: 3000,
        });

        if (admin !== "admin") {
          sessionStorage.setItem('OrgName, userRole);
          sessionStorage.setItem('company', "HSBC");
          sessionStorage.setItem("userType", "user")
          if (userRole === 'originator') {

            this.props.history.push({
              pathname: '/portfolio-setup-wizard/eligible-portfolio-import'
            })

          } else if (userRole === 'issuer' || userRole === 'servicer' || userRole === 'investor' || userRole === 'trustee') {

            this.props.history.push({
              pathname: '/pool-details'
            })

          }
          else if (userRole === 'whlender') {

            this.props.history.push({
              pathname: '/viewLoans'
            })

          }
          else {
            alert("Role not found - user type")
          }
        }

        else {

          sessionStorage.setItem('OrgName, "admin");
          sessionStorage.setItem("userType", "admin")
          // window.location.assign("/admin/dashboard.html")
          this.props.history.push({
            pathname: '/admin/dashboard'
          })

        }

      }
      else {
        alert("Role not found - 200")
      }

    }

    catch (error) {
      alert('Failed');
      console.log('getLoans API error', error);
    }
  };

  //   console.log(data)

  render() {
    return (
      <React.Fragment>
        <div className="loginbody container-fluid">
          <div className="row">
            <div className="hide-mob-size col-md-6 col-sm-12 col-6 col-lg-6 imageLeft">
            </div>
            <div className="col-md-6 col-sm-12 col-12 col-lg-6 align-content-center align-self-center">
              <div className="div-center">
                <div className="text-center">
                  <img id="profile-img" className="profile-img-card" src={logo} />
                  <p id="profile-name" className="profile-name-card"></p>
                </div>
                <div className="relative">
                  {this.state.loginLoading === true ? <CircularProgress size="20px" color="secondary" /> : ''}
                  {/* {JSON.stringify(this.state.loginLoading)} */}
                  {this.state.orgLoading === true ?
                    <React.Fragment>
                      <Form
                        schema={this.state.schema}
                        onSubmit={this.onSubmit}
                        onChange={this.onFormChanged}
                        widgets={widgets}
                        omitExtraData={true}
                        liveOmit={true}
                        FieldTemplate={CustomFieldTemplate}
                        formData={this.state.formData}
                        uiSchema={this.state.uiSchema}

                      >
                        <div className="text-center">
                          <Button variant="contained" id="signinbutton" type="submit">

                            Login </Button>
                        </div>
                      </Form>
                    </React.Fragment>
                    :
                    <React.Fragment>
                      <FormLoader></FormLoader>
                      <Form
                        schema={this.state.schema}
                        onSubmit={this.onSubmit}
                        onChange={this.onFormChanged}
                        formData={this.state.formData}
                        uiSchema={this.state.uiSchema}
                        widgets={widgets}
                        FieldTemplate={CustomFieldTemplate}
                      >
                        <div className="text-center">
                          <Button variant="contained" id="signinbutton" type="submit" >
                            Login
                          </Button>
                        </div>
                      </Form>
                    </React.Fragment>
                  }
                </div>
                <div className="text-center">
                  <hr className="hrLine"></hr>
                  <p style={{ marginTop: "5px", color: "#048c84" }}>New to IntainABS platform</p>
                  <Button variant="contained" href="/register" id="signinbutton">
                    Register
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="footer">
          <div className="row">
            <div className="col-md-6 text-center copy">&copy; 2018 Intain Technologies Private Limited. All rights reserved.</div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withSnackbar(login);