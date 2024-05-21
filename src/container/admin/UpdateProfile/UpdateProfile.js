// /* eslint-disable max-len */
// /* eslint-disable require-jsdoc */
// import React, { Component } from 'react';
// import Button from '@material-ui/core/Button';
// import FormLoader from '../../../components/formLoader';
// import { withTheme } from 'react-jsonschema-form';
// import { Theme as MuiTheme } from 'rjsf-material-ui';
// import LinkItem from '../../../components/linkItem';
// import { CustomFieldTemplate, widgets } from '../../../components/customscripts/customscript';
// import { withSnackbar } from 'notistack';

// import { addUser, authenticate, updateUser } from '../../../servies/services';

// const Form = withTheme(MuiTheme);
// const schema = require('./schema.json');
// const uiSchema = {

//   'password': {
//     'ui:widget': 'password',
//   },
//   "emailid": {
//     "ui:autofocus": false,
//     "ui:emptyValue": "",
//     "ui:autocomplete": false,
//     "ui:readonly": true
//   },
//   "userrole": {
//     "ui:autofocus": false,
//     "ui:emptyValue": "",
//     "ui:autocomplete": false,
//     "ui:readonly": true
//   }

// };


// class UpdateProfile extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       schema: schema,
//       uiSchema: uiSchema,
//       formData: {},
//       UserId: '',
//     };
//   }

//   onSubmit = async (value) => {
//     console.log('onSubmit:', value.formData)
//     let data = value.formData;
//     data.userid = this.state.UserId
//     // this.setState({ loading: true })
//     const APIResponse = await updateUser(data)
//     console.log("authenticate", APIResponse)
//     if (APIResponse !== null) {

//       this.setState({ loading: false })
//       if (APIResponse.status !== 200) {

//         const message = "Something went wrong, please try again";
//         this.props.enqueueSnackbar(message, {
//           variant: 'error',
//           autoHideDuration: 5000,
//         });

//       }
//       else {

//         if (APIResponse.data.Success == false) {

//           this.setState({ formLoader: false })
//           const message = "Profile Update unsucessful";
//           this.props.enqueueSnackbar(message, {
//             variant: 'error',
//             autoHideDuration: 2000,
//           });

//         } else {

//     //       // console.log("data.data", APIResponse.data.data)
//     //       // console.log("APIResponse.data.data.UserName", APIResponse.data.data.UserName)

//           this.setState({ formLoader: false })
//           const message = "Profile Updated Successfully";
//           this.props.enqueueSnackbar(message, {
//             variant: 'info',
//             autoHideDuration: 2000,
//           });
//         }
//       }
//     }
//   }
//   async componentDidMount() {

//     let search = this.props.location.search;
//     let params = new URLSearchParams(search);
//     // let UserName = params.get('UserName');
//     // let OrgName = params.get('OrgName');
//     let UserId = params.get('userid');
//     let Email = params.get('Email');
//     this.setState({UserId:UserId});
//     // alert(UserId)
//     const formData = {
//       // "username": UserName,
//       "emailid" : Email,
//     }

//     this.setState({ formData: formData})

//   }

//   render() {
//     return (
//       <React.Fragment>
//         <h4>Complete your profile to access Intain ABS</h4>
//         <div className="form_row_single">
//           {/* {JSON.stringify(this.state.formData)} */}
//           <Form
//             schema={this.state.schema}
//             onChange={this.onFormChanged}
//             onSubmit={this.onSubmit}
//             widgets={widgets}
//             FieldTemplate={CustomFieldTemplate}
//             uiSchema={this.state.uiSchema}
//             formData={this.state.formData}

//           >
//             <div id="form-btn">
//               <div className="container-fluid text-center">
//                 <div className="row">
//                   <Button className="col-md-12" variant="contained" size="large" color="primary" id="signinbutton" type="submit"
//                     disabled={this.state.loading === true ? true : false} > Update Profile </Button>
//                 </div>
//               </div>
//             </div>
//           </Form>
//           <div className="loginCheckbox">
//             <p className="lineDivider">
//               <span>Have Account?</span>
//             </p>
//             <LinkItem to={'/'} variant="contained" className="loginBtn" title={'Login'}> </LinkItem>
//           </div>
//         </div>
//       </React.Fragment>
//     );
//   }
// }
// export default withSnackbar(UpdateProfile);