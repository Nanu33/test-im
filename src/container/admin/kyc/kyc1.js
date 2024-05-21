/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import React, { Component } from 'react';
import { Theme as MuiTheme } from 'rjsf-material-ui';
import { withSnackbar } from 'notistack';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { UploadKyc } from '../../../servies/services';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

import KycIssuer1 from './kycIssuer1';
import KycIssuer2 from './kycIssuer2';
import KycIssuer3 from './kycIssuer3';

import KycInvester1 from './kycInvester1';
import KycInvester2 from './kycInvester2';

import KycVerification from './kycVerification';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


// const Form = withTheme(MuiTheme);


class kyc1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: sessionStorage.getItem("token"),
      formData: {},
      file: "",
      loading: false,
      OrgLoading: false,
      showFirstForm: true,
      userrole: sessionStorage.getItem('userrole'),
      formType: sessionStorage.getItem('kyctype'),
      userid: sessionStorage.getItem('userid'),
      formData1: {
        Compilancedate: "",
        name: sessionStorage.getItem('fullname'),
        Compilancetitle: ""
      }
    };
  }

  onSubmit1 = (e) => {
    e.preventDefault();
    console.log(this.state.formData1);
    this.UploadKyc()
  };

  checkRole = () => {
    if (this.state.userrole === 'Issuer') {
      return (this.checkIssuerFormType())
    }
    else if (this.state.userrole === 'Investor') {
      return (this.checkInvesterFormType())
    }
    else {
      return (this.checkVerificationFormType())
    }
  }

  checkIssuerFormType = () => {
    switch (this.state.formType) {
      case 'type1':
        return this.kycIssuer1();
      case 'type2':
        return this.kycIssuer2();
      case 'type3':
        return this.kycIssuer3();
      default:
        return null;
    }
  }

  checkInvesterFormType = () => {
    switch (this.state.formType) {
      case 'type1':
        return this.kycInvester1();
      case 'type2':
        return this.kycInvester2();
      default:
        return null;
    }
  }

  checkVerificationFormType = () => {
    switch (this.state.formType) {
      case 'type1':
        return this.kycVerification();
      default:
        return null;
    }
  }

  // card1 = () => (
  //   <div className="card__container">
  //     <h6 className="card1__title">Upload the W9 Form</h6>
  //     <ol className="card1__list">
  //       <li><a href="#">Click here</a> to view the form</li>
  //       <li>Fill it and download</li>
  //       <li>Upload the filled form</li>
  //     </ol>
  //     <button type="button" className="card__button">Upload</button>
  //   </div>
  // )

  // card2 = () => (
  //   <div className="card__container">
  //     <h6 className="card1__title">Upload the Good Standing Certificate</h6>
  //     <button type="button" className="card__button">Upload</button>
  //   </div>
  // )

  // card3 = () => (
  //   <div className="card__container">
  //     <h6 className="card1__title">Upload the Organization Document (such as Operating Agreement or a copy of your 10K if a US publicly traded entity)</h6>
  //     <button type="button" className="card__button">Upload</button>
  //   </div>
  // )

  // card4 = () => (
  //   <div className="card__container">
  //     <h6 className="card1__title">Upload the Business License / Country Authorization Document</h6>
  //     <button type="button" className="card__button">Upload</button>
  //   </div>
  // )

  // card5 = () => (
  //   <div className="card__container">
  //     <h6 className="card1__title">Upload the evidence of OFAC and FinCen clearance</h6>
  //     <button type="button" className="card__button">Upload</button>
  //   </div>
  // )

  // card6 = () => (
  //   <div className="card__container">
  //     <h6 className="card1__title">Upload the QIB Certification</h6>
  //     <ol className="card1__list">
  //       <li><a href="#">Click here</a> to view the form</li>
  //       <li>Sign it and submit</li>
  //     </ol>
  //   </div>
  // )

  // card7 = () => (
  //   <div className="card__container">
  //     <h6 className="card1__title">Upload the W8 Form</h6>
  //     <ol className="card1__list">
  //       <li><a href="#">Click here</a> to view the form</li>
  //       <li>Fill it and download</li>
  //       <li>Upload the filled form</li>
  //     </ol>
  //     <button type="button" className="card__button">Upload</button>
  //   </div>
  // )

  handleOnChange1 = (e) => {
    this.setState({ file: e.target.files[0], filename: e.target.files[0].name });
  };

  UploadKyc = async () => {

    console.log('uplaodlms')
    const originalMinDate = new Date(this.state.formData1.Compilancedate)
    const minday = originalMinDate.getDate();
    const minmonth = originalMinDate.getMonth() + 1;
    const minyear = originalMinDate.getFullYear();
    const formattedMinDate = `${minmonth.toString().padStart(2, '0')}/${minday.toString().padStart(2, '0')}/${minyear}`;
    const files = []
    files.push(this.state.file)
    console.log('ffff', files)
    const newdata = new FormData();
    newdata.append('userid', this.state.userid)
    Array.from(files).forEach(file => {
      newdata.append('filename', file);
    });
    newdata.append('token', this.state.token)
    newdata.append('Compilancedate', formattedMinDate)
    newdata.append('Compilancetitle', this.state.formData1.Compilancetitle)
    console.log('newdata', newdata)
    this.setState({ formLoader: true })
    const APIResponse = await UploadKyc(newdata)

    if (APIResponse.status === 200) {
      this.setState({ formLoader: true })
      console.log('upload--', APIResponse);
      const message = "KYC Registered Sucessfully";
      this.props.enqueueSnackbar(message, {
        variant: 'info',
        autoHideDuration: 2000,
      });
      this.props.history.push('/popup2');
    }
    else {
      this.setState({ formLoader: false })
      const message = "Something went wrong, please try again";
      this.props.enqueueSnackbar(message, {
        variant: 'error',
        autoHideDuration: 2000,
      });
    }
  }





  form22 = () => (
    <div className="form__container">
      <h6 className="form__title">The Company hereby certifies that we do not employ, do business with, or provide any funding to aid or support any entities or individuals that appear on the terrorist watch lists of the US Government, United Nations, European Union and Interpol. The Company also hereby certifies that we comply with the requirements of the USA Patriot Act and other counterterrorism laws as relevant to our business and the jurisdiction in which we operate.</h6>
      <form className="form-container" onSubmit={this.onSubmit1}>
        <div className="input-container">
          <label className="label">Date (DD/MM/YYYY)</label>
          <DatePicker
            required
            placeholderText="MM/DD/YYYY"
            dateFormat="MM/dd/yyyy"
            className="input-select"
            selected={this.state.formData1.Compilancedate}
            onChange={(date) => {
              this.setState({
                formData1: {
                  ...this.state.formData1,
                  Compilancedate: date,
                }
              })
            }}
          />
        </div>

        <div className="input-container">
          <label className="label">Name</label>
          <input
            required
            placeholder='Type here'
            className="input"
            type="text"
            onChange={(e) => {
              this.setState({
                formData1: {
                  ...this.state.formData1,
                  name: e.target.value
                }
              });
            }}
            value={this.state.formData1.name}
          // required
          />
        </div>

        <div className="input-container">
          <label className="label">Title</label>
          <input
            required
            placeholder='Type here'
            className="input"
            type="text"
            onChange={(e) => {
              this.setState({
                formData1: {
                  ...this.state.formData1,
                  Compilancetitle: e.target.value
                }
              });
            }}
            value={this.state.formData1.Compilancetitle}
          // required
          />
        </div>

        <h6 className="form-para">An Authorized Officer of the Company</h6>
        <div className="kyc-card__button-container">
          <div>
            <input
              id="icon-button-file-kycInvester2"
              type="file"
              style={{ display: "none" }}
              onChange={this.handleOnChange1}
            />
            <button className="card__button" type="button">
              <label htmlFor="icon-button-file-kycInvester2" className="upload-button-label">Upload</label>
            </button>
          </div>
          {this.state.file !== "" && (
            <div className="kyc-card__select_name-container">
              <p>{this.state.filename}</p>
              {/* <button type="button" onClick={handleClickCross}>
                            x
                        </button> */}
            </div>
          )}
        </div>

      </form>
    </div>
  )

  handleClickKyc1 = () => {
    console.log("hello we have clicked the button")
    this.setState({ showFirstForm: false })
  }

  handleClick1 = () => {
    this.setState({ showFirstForm: true })
    this.checkRole()
  }

  kycIssuer1 = () => (
    <KycIssuer1 handleClickKyc1={this.handleClickKyc1} />
  )

  kycIssuer2 = () => (
    <KycIssuer2 handleClickKyc1={this.handleClickKyc1} />
  )

  kycIssuer3 = () => (
    <KycIssuer3 handleClickKyc1={this.handleClickKyc1} />
  )

  kycInvester1 = () => (
    <KycInvester1 handleClickKyc1={this.handleClickKyc1} />
  )

  kycInvester2 = () => (
    <KycInvester2 handleClickKyc1={this.handleClickKyc1} />
  )

  kycVerification = () => (
    <KycVerification handleClickKyc1={this.handleClickKyc1} />
  )


  kyc2 = () => {
    return (
      <div className="outer-kycformwidth">
        <div className="kyc-content2">
          <div className='topcontent'>
            <h2 className='text-center heading1'>KYC Process</h2>
          </div>

          <div className="register1__title-container">

            <div>
              <KeyboardBackspaceIcon className="left-arrow-mui" onClick={this.handleClick1}></KeyboardBackspaceIcon>
            </div>
            <div className="register1__title-container1">
              <h5>Submission of Compliance Statement</h5>
              <i><b>2</b>/2</i>
            </div>
          </div>

          <form className="form-container1" onSubmit={this.onSubmit1}>
            <div id="form-btn">

              <div className="container-fluid text-center">
                <div className="row d-flex justify-content-center align-items-center">
                  {this.form22()}
                  <Button variant="contained" color="primary" type="submit"
                  // disabled={this.state.loading === true ? true : false} 
                  > Submit
                    {this.state.formLoader === true ? (
                      <CircularProgress size='22px' color='primary' />
                    ) : (
                      ''
                    )}
                  </Button>
                </div>
              </div>
              <div />

            </div>
          </form>

        </div>
      </div>

    )
  }

  render() {
    return (
      <>
        {/* {this.kyc2()} */}
        {this.state.showFirstForm ? this.checkRole() : this.kyc2()}
      </>
    );
  }
}

export default withSnackbar(kyc1);