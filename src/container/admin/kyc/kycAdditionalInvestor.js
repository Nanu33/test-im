/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import React, { Component } from "react";
import { Theme as MuiTheme } from "rjsf-material-ui";
import { withSnackbar } from "notistack";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { UploadKyc } from "../../../servies/services";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
const history = require("history").createBrowserHistory();


class KycAdditionalInvester extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: sessionStorage.getItem("token"),
      userid: sessionStorage.getItem("userid"),
      file: "",
      showfirstform1: true,
      showfirstform2: false,
      formData1: {
        investortype: true,
      },
      formData: {
        organizationname: sessionStorage.getItem("organization"),
        QIBdate: "",
      },
      checkedstatus: false,
    };
  }

  onSubmit1 = (e) => {
    e.preventDefault();
    console.log(this.state.formData);
    this.UploadKyc()
  };
  onSubmit2 = (e) => {
    e.preventDefault();
    console.log(this.state.formData1);
    this.setState({ showfirstform1: false, showfirstform2: true })
  };
  onSubmit3 = (e) => {
    e.preventDefault();
    let newdata = {}
    newdata.userid = this.state.userid;
    newdata.AccreditedInvestorCertification = "yes";
    newdata.token = this.state.token;
    newdata.investortype = "AccreditedInvestor";
    console.log(newdata);
    this.UploadKyc1()
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
    newdata.append("QIBdate", formattedMinDate);
    newdata.append("investortype", "QIB");

    console.log("datata", newdata);

    const APIResponse = await UploadKyc(newdata);

    if (APIResponse.status === 200) {
      this.setState({ formLoader: false });
      console.log("upload--", APIResponse);
      history.push("/popupverifymail");
    } else {
      this.setState({ formLoader: false });
      const message = "Something went wrong, please try again";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };
  UploadKyc1 = async () => {
    this.setState({ formLoader: true });
    const newdata = new FormData();
    newdata.append("userid", this.state.userid);
    newdata.append("AccreditedInvestorCertification", "yes");
    newdata.append("token", this.state.token);
    newdata.append("investortype", "AccreditedInvestor");

    console.log("datata", newdata);

    const APIResponse = await UploadKyc(newdata);

    if (APIResponse.status === 200) {
      this.setState({ formLoader: false });
      console.log("upload--", APIResponse);
      history.push("/popupverifymail");
    } else {
      this.setState({ formLoader: false });
      const message = "Something went wrong, please try again";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  QibForm = () => {
    return (
      <React.Fragment>
        <div className="kyc-content2">
          <div className="topcontent">
            <div className="qibheader">
              <div className="arrowtextclass">
                {/* <KeyboardBackspaceIcon
                    onClick={this.handleClick1}
                    className="left-arrow-muis1 filter-icon"
                  ></KeyboardBackspaceIcon> */}
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
                        required
                      />
                    </div>
                    <div className="input-container">
                      {/* <div className="register1__title-container1s">
                            <label className="label">Date</label>
                          </div>

                          <input
                            placeholder="Type here"
                            className="input"
                            type="date"
                            onChange={(e) => {
                              this.setState({
                                formData: {
                                  ...this.state.formData,
                                  QIBdate: e.target.value,
                                },
                              });
                            }}
                            value={this.state.formData.QIBdate}
                            required
                          /> */}
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

      </React.Fragment>
    );
  };

  InvestorRadioSelection = () => {
    return (
      <React.Fragment>

        <div className="topcontent1">
          <h2 className="text-center heading1">Select Investor Type</h2>
        </div>

        <div className="outer-form-container">
          <form className="form-container" onSubmit={this.onSubmit2}>

            <div className="input-container">
              {/* <label className="label">Is this a Publicly traded company?</label> */}
              <div className="flex-radio-select">
                <label className="label-radio-container">
                  I am a Qualified Institutional Buyer
                  <input
                    id="traded1"
                    type="radio"
                    name="publiclytradedcompany"
                    value={true}
                    checked={this.state.formData1.investortype}
                    onChange={(e) => {
                      this.setState({
                        formData1: {
                          ...this.state.formData1,
                          investortype: true,
                        },
                      });
                    }}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="label-radio-container">
                  I am an Accredited Investor
                  <input
                    id="traded2"
                    type="radio"
                    // className="simple-container"
                    name="publiclytradedcompany"
                    value={false}
                    onChange={(e) => {
                      this.setState({
                        formData1: {
                          ...this.state.formData1,
                          investortype: false,
                        },
                      });
                    }}
                  />
                  <span className="checkmark"></span>
                </label>
              </div>
            </div>

            <div id="form-btn">
              <div className="container-fluid text-center">
                <div className="row d-flex justify-content-center align-items-center">
                  <Button variant="contained" color="primary" type="submit">
                    {" "}
                    Next
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>

      </React.Fragment>
    );
  };

  AccreditedInvestorForm = () => {
    return (
      <React.Fragment>

        <div className="kyc-content2-certification">
          <div className="topcontent">
            <div className="qibheader">
              <div className="arrowtextclass">
                {/* <KeyboardBackspaceIcon
                    onClick={this.handleClick1}
                    className="left-arrow-muis1 filter-icon"
                  ></KeyboardBackspaceIcon> */}
                <h1 className="headerdashboard-certification">
                  Accredited Investor Certification
                </h1>
              </div>
            </div>
          </div>

          <form className="form-container1" onSubmit={this.onSubmit3}>
            <div id="form-btn">
              <div className="container-fluid text-center">
                <div className="row d-flex justify-content-center align-items-center">
                  <div className="form__container">
                    <h6 className="form__title">
                      I hereby confirm that I am an <a href="https://www.sec.gov/education/capitalraising/building-blocks/accredited-investor">Accredited Investor</a> and, that prior to making any investments, I may need to provide to the Issuer documents supporting this Certification.
                    </h6>

                  </div>

                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
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

      </React.Fragment>
    );
  };

  render() {
    return <>
      {this.state.showfirstform1 && this.InvestorRadioSelection()}
      {this.state.showfirstform2 == true ? this.state.formData1.investortype == true ? this.QibForm() : this.AccreditedInvestorForm() : ""}</>;
  }
}

export default withSnackbar(KycAdditionalInvester);

