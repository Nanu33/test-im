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
import { withSnackbar } from 'notistack';
import InputLabel from '@material-ui/core/InputLabel';

const Form = withTheme(MuiTheme);
const schema = require('./userdetailschema.json');

function CustomFieldTemplate(props) {
  const { id, classNames, label, help, required, description, errors, children } = props;
  return (
    <div id={id} className={classNames + ' customWrapper'}>
    {children}
    {description}
    {errors}
    {help}
  </div>
);
}


const select = (props) => {
  const { onChange } = props;

  const handleChange = (val) => (evt) => {
    evt.preventDefault();
    onChange(val);
  };

  return (

    <FormControl variant="filled" size="small" >
      {/* {JSON.stringify(props)} */}
      <InputLabel id={props.id}>{props.label}</InputLabel>

      <Select
       disabled={props.disabled}
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

const widgets = {
  select: select,
};


const uiSchema = {

  'Password': {
    'ui:widget': 'password',
  },
  'OrgName': {
    "ui:disabled": true
  },
  'UserName': {
    "ui:readonly": true
  },
};



 class UserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schema: schema,
      uiSchema: uiSchema,
      formData:{}
    };
  }

  onSubmit = async(value) => {
    console.log('onSubmit:', value.formData)
    let data = value.formData;

      try {
        const res = await axios.post(process.env.react_app_base_url2 + 'addApprovedUserDetails', data);
  
        const resp = res.data;
        
        console.log("+++++++++++0"+res)
        if (res.status === 204) {
          // alert("user is not approved or user is not present");
          const message = "user is not approved or user is not present";
        this.props.enqueueSnackbar(message, {
          variant: 'error',
          autoHideDuration: 2000
      });
      }
        else  {
          // this.props.history.push({
          //   pathname: '/'
          // })
          window.location.assign('/')
        }
      }catch (error) {
        console.log(error)
        if (error.response.status == 400) {

          console.log("getLoans API error", error);
          console.log("error.response", error.response.data.message);
  
          const message = error.response.data.message;
          this.props.enqueueSnackbar(message, {
              variant: 'error',
              autoHideDuration: 3000,
          });
  
      } else {
  
          const message = "something went wrong, please try again";
          this.props.enqueueSnackbar(message, {
              variant: 'error',
              autoHideDuration: 3000,
          });
  
  
      }
    }

    // this.UserDetails(data);
  };

  getAllOrgnames=async () =>{

    try {
      const res = await axios.get(process.env.react_app_base_url2 + "getAllUserRoles");
  
      const resp = res.data;
 
  
      console.log(resp)
      if (res.status === 200) {
  
        let UserRoleID = []
      let UserRoleName = []
      if (resp.length !== 0) {
        resp.forEach(function (key,value) {
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
  
  
          console.log('eligibleloans', resp);
          this.setState({ getLoansLoader: false, open: true, OrgNames: resp, loading: true });
      } else {
          alert('Failed');
      }
  } catch (error) {
      alert('Failed');
      console.log('getLoans API error', error);
  }
  
  
  }


  async componentDidMount() {
    this.getAllOrgnames();
const params = new URLSearchParams(this.props.location.search);
const UserName=params.get('UserName')
    console.log("this.props.location.query"+UserName)
    const OrgName=params.get('OrgName')
    console.log("this.props.location.query"+OrgName)


    const updateformdata = {
      "UserName":UserName,
      "OrgName":OrgName,
    }
    const newformdata = Object.assign({}, updateformdata);
    this.setState({formData:newformdata})

    sessionStorage.clear();

  }

 

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
<div className="twoColunm">
{this.state.loading === true? 
                <Form
                  schema={this.state.schema}
                  onSubmit={this.onSubmit}
                  onChange={this.onFormChanged}
                  widgets={widgets}
                  FieldTemplate={CustomFieldTemplate}
                  uiSchema={this.state.uiSchema}
                  formData={this.state.formData}
                >
<div className="text-center">
                  <Button variant="contained" id="signinbutton" type="submit" disabled={this.state.getLoansLoader === true ? true : false} >
                    {this.state.getLoansLoader === true ? <CircularProgress size="20px" color="secondary" /> : ''} Update Details
                  </Button>
                  </div>
                </Form>
:''}
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
export default withSnackbar(UserDetails);
