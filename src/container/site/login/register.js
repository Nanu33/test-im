/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import React, { Component } from 'react';
import './login.scss';
import './login.css';
import Button from '@material-ui/core/Button';
// import Loader from '../../../components/loader';
import Snackbar from '../../../components/snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import { withTheme } from 'react-jsonschema-form';
import { Theme as MuiTheme } from 'rjsf-material-ui';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import loginLeftBg1 from '../../../images/loginLeftBg1.png'
// import logo from '../../../images/WSFS_Wealth_institutional_services_logo.jpg'
import logo from '../../../images/IntainLogo_onHover.png'
import { NavLink } from 'react-router-dom';
import FormLoader from '../../../components/loader/formLoader';
import { withSnackbar } from 'notistack';
import InputLabel from '@material-ui/core/InputLabel';
import { widgets, CustomFieldTemplate, customStyles, customStylesauto } from '../../../components/customscripts/customscript';

const Form = withTheme(MuiTheme);
const schema = require('./registerschema.json');

// function CustomFieldTemplate(props) {
//   const { id, classNames, label, help, required, description, errors, children } = props;
//   return (
//     <div className={classNames + ' customWrapper'}>
//       {/* <label htmlFor={id} className={classNames + ' customLabel'}>{label}{required ? '*' : null}</label> */}
//       {description}
//       {children}
//       {errors}
//       {help}
//     </div>
//   );
// }


const select = (props) => {
  const { onChange } = props;

  const handleChange = (val) => (evt) => {
    evt.preventDefault();
    onChange(val);
  };

  return (

    <FormControl variant="outlined" size="small" >
      <InputLabel id={props.id}>{props.label}</InputLabel>

      <Select
        labelId={props.id}
        id={props.id}
        value={props.value}
        required={props.required}
        onChange={(event) => props.onChange(event.target.value)}
      >
        {props.options.enumOptions.map((item) =>
          <MenuItem value={item.value}>{item.label}</MenuItem>,
        )}
      </Select>
    </FormControl>

  );
};

// const widgets = {
//   select: select,
// };


const uiSchema = {

  'password': {
    'ui:widget': 'password',
  },
};


class register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schema: schema,
      uiSchema: uiSchema,
      loading: false
    };
  }

  onSubmit = (value) => {
    console.log('onSubmit:', value.formData)
    let data = value.formData;
    const OrgName = value.formData.OrgName;

    let jsonfields = this.state.OrgNames.filter(userroleids => { return userroleids.UserRoleName === OrgName; })
    // var fieldresult = jsonfields;
    console.log("+++++" + jsonfields[0].UserRoleName)
    console.log("+++++" + jsonfields[0].UserRoleID)

    console.log("+++++" + OrgName)
    console.log("+++++" + JSON.stringify(this.state.OrgNames))

    data.UserRoleID = jsonfields[0].UserRoleID
    // var OrgName = fieldresult[0].UserRoleName;

    console.log("data", data)
    this.addUser(data);
  };


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
        this.setState({ getLoansLoader: false, open: true, OrgNames: resp, loading: true });

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

  async addUser(data) {
    this.setState({ getLoansLoader: true });
    const dataString = data



    console.log('getLoans dataString', dataString);

    try {
      const res = await axios.post(process.env.react_app_base_url2 + 'addUser', dataString);

      const resp = res.data;
      if (res.status == 204) {
        alert("fails")
      }
      if (res.status === 200) {
        if (resp.success == true) {

          const message = "Successfully registered!! Please wait till admin approves.";
          this.props.enqueueSnackbar(message, {
            variant: 'info',
            autoHideDuration: 1000,
          });

          this.setState({ getLoansLoader: false })

        } else {
          alert("failed");
        }
      } else {

        alert('Failed');

      }
    } catch (error) {

      console.log('getLoans API error', error);
      if (error.response.status == 400) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        alert("missing arguments");
      } else {
        alert("something went wrong")
      }
    }

  };

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
                  {this.state.loading === true ?
                    <React.Fragment>
                      <Form
                        schema={this.state.schema}
                        onSubmit={this.onSubmit}
                        onChange={this.onFormChanged}
                        widgets={widgets}
                        FieldTemplate={CustomFieldTemplate}
                        uiSchema={this.state.uiSchema}
                      >
                        <div className="text-center">
                          <Button variant="contained" id="signinbutton" type="submit" disabled={this.state.getLoansLoader === true ? true : false} >
                            {this.state.getLoansLoader === true ? <CircularProgress size="20px" color="secondary" /> : ''} Register
                          </Button>
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
                        widgets={widgets}
                        FieldTemplate={CustomFieldTemplate}
                        uiSchema={this.state.uiSchema}
                      >
                        <div className="text-center">
                          <Button variant="contained" id="signinbutton" type="submit" disabled={this.state.getLoansLoader === true ? true : false} >
                            {this.state.getLoansLoader === true ? <CircularProgress size="20px" color="secondary" /> : ''} Register
                          </Button>
                        </div>
                      </Form>
                    </React.Fragment>
                  }

                </div>


                {/* {this.state.loading === true ?
                  <Form
                    schema={this.state.schema}
                    onSubmit={this.onSubmit}
                    onChange={this.onFormChanged}
                    widgets={widgets}
                    FieldTemplate={CustomFieldTemplate}
                    uiSchema={this.state.uiSchema}
                  >
                    <div className="text-center">
                      <Button variant="contained" id="signinbutton" type="submit" disabled={this.state.getLoansLoader === true ? true : false} >
                        {this.state.getLoansLoader === true ? <CircularProgress size="20px" color="secondary" /> : ''} Register
                  </Button>
                    </div>
                  </Form>
                  : ''} */}

                <div className="text-center">
                  <hr></hr>
                  <p style={{ marginTop: "5px", color: "#048c84" }}>Already have an Account?</p>
                  <NavLink variant="contained" to="/"> Login</NavLink>
                </div>

                {/* {this.state.open === true ? <React.Fragment><Snackbar msg={'Login Successfully'} open="true" /> </React.Fragment> : ' '} */}
                {/* <div className="loginbottom">
                  <div className="text-center">
                    <p id="powercolor"> Powered  by  <img align="absmiddle" id="intainlogologin"
                      src={logo2} />

                    </p>
                  </div>
                </div> */}








              </div>




            </div>

          </div>








        </div>

        <div id="footer">
          <div className="row">
            <div className="col-md-6 text-center copy">&copy; 2018 Intain
              Technologies Private Limited. All rights reserved.</div>

          </div>
        </div>

      </React.Fragment>
    );
  }
}


export default withSnackbar(register);