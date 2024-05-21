import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import FormLoader from '../../../components/formLoader';
import Loader from '../../../components/loader';
import AIcon1 from './AIcon1.xlsx';
import { UploadKyc } from '../../../servies/services';
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class kycInvester2 extends Component {
  state = {
    token: sessionStorage.getItem("token"),
    userid: sessionStorage.getItem('userid'),
    file: "",
    qibdisplay: false,
    formData: {
      organizationname: sessionStorage.getItem("organizationname"),
      QIBdate: "",
    },
    checkedstatus: false,
  }

  handleOnChange1 = (e) => {
    this.setState({ file: e.target.files[0], filename: e.target.files[0].name });
  };

  handleClick = () => {
    this.props.handleClickKyc1()
  }
  handleClick1 = () => {
    this.setState({ qibdisplay: false });
  };

  ViewTheQibForm = () => {
    this.setState({ qibdisplay: true });
  };

  UploadKyc1 = async () => {

    console.log('uplaodlms')
    const files = []
    files.push(this.state.file)
    console.log('ffff', files)
    const newdata = new FormData();
    newdata.append('userid', this.state.userid)
    Array.from(files).forEach(file => {
      newdata.append('filename', file);
    });

    console.log('newdata', newdata)

    this.setState({ formLoader: true })
    newdata.append('token', this.state.token)

    const APIResponse = await UploadKyc(newdata)

    if (APIResponse.status === 200) {
      this.setState({ formLoader: true })
      console.log('upload--', APIResponse);
      this.props.handleClickKyc1()
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
  onSubmit1 = async (e) => {
    e.preventDefault();
    console.log(this.state.formData);
    this.UploadKyc();
  };

  UploadKyc = async () => {
    this.setState({ formLoader: true });
    const originalMinDate = new Date(this.state.formData.QIBdate)
    const minday = originalMinDate.getDate();
    const minmonth = originalMinDate.getMonth() + 1;
    const minyear = originalMinDate.getFullYear();
    const formattedMinDate = `${minmonth.toString().padStart(2, '0')}/${minday.toString().padStart(2, '0')}/${minyear}`;
    const newdata = new FormData();
    newdata.append("userid", this.state.userid);
    newdata.append("QIBAutorizedofficer", "yes");
    newdata.append("token", this.state.token);
    newdata.append("organizationname", this.state.formData.organizationname);
    newdata.append("QIBdate", formattedMinDate );
    console.log("datata", newdata);

    const APIResponse = await UploadKyc(newdata);

    if (APIResponse.status === 200) {
      this.setState({ formLoader: false });
      console.log("upload--", APIResponse);
      this.handleClick1();
    } else {
      this.setState({ formLoader: false });
      const message = "Something went wrong, please try again";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };
  card6 = () => (
    <div className="card__container">
      <h6 className="card1__title">Upload the QIB Certification</h6>
      <ol className="card1__list">
        <li>
          <buton
            type="button"
            className="login-sign_up-links"
            onClick={this.ViewTheQibForm}
          >
            Click here{" "}
          </buton>

          {" "} to view the form
        </li>
        <li>Sign it and submit</li>
      </ol>
    </div>
  )
  QibForm = () => {
    return (
      <React.Fragment>
        {this.state.qibdisplay == true ? (
          <div className="kyc-content2">
            <div className="topcontent">
              <div className="qibheader">
                <div className="arrowtextclass">
                  <KeyboardBackspaceIcon
                    onClick={this.handleClick1}
                    className="left-arrow-muis1 filter-icon"
                  ></KeyboardBackspaceIcon>
                  <h1 className="headerdashboard">
                    Investor QIB Certification
                  </h1>
                </div>
              </div>
            </div>

            <form className="form-container1" onSubmit={this.onSubmit1}>
              <div id="form-btn">
                <div className="container-fluid text-center">
                  <div className="row d-flex justify-content-center align-items-center">
                    <div className="form__container">
                      <h6 className="form__title">
                        We hereby confirm that we are a "qualified institutional
                        buyer" as defined in Rule 144A under the U.S. Securities
                        Act of 1933, as amended, that is able to bear the
                        economic risk of such an investment in the Tokens. We
                        understand that (a) the Tokens are not being, and will
                        not be, registered under the Securities Act, (b) the
                        Tokens are being offered and sold to us in a transaction
                        that is exempt from the registration requirements of the
                        Securities Act, and (c) the Tokens may be considered
                        "restricted securities" within the meaning of Rule
                        144(a)(3) under the Securites Act. We agree, for so long
                        as the Tokens may be considered "restricted securities"
                        within the meaning of Rule 144(a)(3) under the Securites
                        Act, (a) not to offer or sell the Tokens, except the
                        pursuant to an exemption from the registration
                        requirements of the Securites Act and (b) not to deposit
                        the Tokens in an unrestricted depositary receipt
                        facility. We understand that an exemption pursuant to
                        Rule 144A under the Securites Act may not be available
                        for the resale of the tokens.
                      </h6>
                      <form
                        className="form-container1"
                        onSubmit={this.onSubmit}
                      >
                        <div className="input-container">
                          <label className="label">Organization Name</label>
                          <input
                            placeholder="Type here"
                            className="input"
                            type="text"
                            onChange={(e) => {
                              this.setState({
                                formData: {
                                  ...this.state.formData,
                                  organizationname: e.target.value,
                                },
                              });
                            }}
                            value={this.state.formData.organizationname}
                          // required
                          />
                        </div>
                        <div className="input-container">
                          <div style={{ width: '57%' }}>
                            <div className="register1__title-container1s">
                              <label className="label">Date</label>
                            </div>
                            <DatePicker
                              required
                              placeholderText="MM/DD/YYYY"
                              dateFormat="MM/dd/yyyy"
                              className="input-select"
                              selected={this.state.formData.QIBdate}
                              onChange={(date) => {
                                this.setState({
                                  formData: {
                                    ...this.state.formData,
                                    QIBdate: date,
                                  }
                                })
                              }}
                            />
                          </div>
                        </div>
                        <span className="checkboxproperty">
                          <input
                            type="checkbox"
                            className="t-select-checbox"
                            onChange={(e) => {
                              this.setState(
                                (prevState) => {
                                  return {
                                    ...prevState,
                                    checkedstatus: !prevState.checkedstatus,
                                  };
                                },
                                () => {
                                  console.log(this.state.checkedstatus);
                                }
                              );
                            }}
                          />
                          <h6 className="form-para">
                            I am an Authorized Officer of the Company
                          </h6>
                        </span>
                      </form>
                    </div>

                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={
                        this.state.checkedstatus == false ? true : false
                      }
                    >
                      {" "}
                      Submit
                      {this.state.formLoader === true ? (
                        <CircularProgress size="22px" color="primary" />
                      ) : (
                        ""
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        ) : (
          ""
        )}
      </React.Fragment>
    );
  };

  card7 = () => (
    <div className="card__container">
      <h6 className="card1__title">Upload the W8 Form</h6>
      <ol className="card1__list">
        <li><a href={AIcon1} download className='login-sign_up-links'>Click here</a> to view the form</li>
        <li>Fill it and download</li>
        <li>Upload the filled form</li>
      </ol>
      <div className="kyc-card__button-container">
        <div>
          <input
            id="icon-button-file-kycInvester2"
            type="file"
            style={{ display: "none" }}
            onChange={this.handleOnChange1}
          />
          <button className="card__button" type="submit">
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
    </div>
  )
  render() {
    return (
      <React.Fragment>
        {this.state.qibdisplay == false ? (
          <div className="outer-kycformwidth">
            <div className='kycformwidth'>
              <div className='topcontent'>
                <h2 className='text-center heading1'>KYC Process</h2>
              </div>
              <div className="kyc-title-container">
                <h5>Submission of Documents</h5>
                <i><b>1</b>/2</i>
              </div>
              <div id="form-btn">

                <div className="container-fluid text-center">
                  <div className="row d-flex justify-content-center align-items-center">
                    {this.card7()}
                    {this.card6()}
                    <Button variant="contained" color="primary" type="submit" onClick={this.UploadKyc1}> Next
                      {this.state.formLoader === true ? (
                        <CircularProgress size='22px' color='primary' />
                      ) : (
                        ''
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          this.QibForm()
        )}

      </React.Fragment>
    )
  }

}
export default kycInvester2