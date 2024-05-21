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


class kycAttestination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: sessionStorage.getItem("token"),
      formData: {

      },
      file: "",
      loading: false,
      OrgLoading: false,
      showFirstForm: true,
      userrole: sessionStorage.getItem("userrole"),
      formType: sessionStorage.getItem("kyctype"),
      userid: sessionStorage.getItem("userid"),
      formData1: {
        Compilancedate: "",
        name: sessionStorage.getItem("fullname"),
        Compilancetitle: "",
      },
      checkedstatus: false,
    };
  }

  onSubmit1 = (e) => {
    e.preventDefault();
    console.log(this.state.formData1);
    this.UploadKyc();
  };

  handleOnChange1 = (e) => {
    this.setState({
      file: e.target.files[0],
      filename: e.target.files[0].name,
    });
  };

  UploadKyc = async () => {
    console.log("uplaodlms");
    const originalMinDate = new Date(this.state.formData1.Compilancedate)
    const minday = originalMinDate.getDate();
    const minmonth = originalMinDate.getMonth() + 1;
    const minyear = originalMinDate.getFullYear();
    const formattedMinDate = `${minmonth.toString().padStart(2, '0')}/${minday.toString().padStart(2, '0')}/${minyear}`;
    const files = [];
    files.push(this.state.file);
    console.log("ffff", files);
    const newdata = new FormData();
    newdata.append("userid", this.state.userid);
    newdata.append("AttestationAutorizedofficer", "yes");
    newdata.append("token", this.state.token);
    newdata.append("Compilancedate", formattedMinDate);
    newdata.append("Compilancetitle", this.state.formData1.Compilancetitle);
    console.log("newdata", newdata);
    this.setState({ formLoader: true });
    const APIResponse = await UploadKyc(newdata);

    if (APIResponse.status === 200) {
      this.setState({ formLoader: true });
      console.log("upload--", APIResponse);
      const message = "KYC Registered Sucessfully";
      this.props.enqueueSnackbar(message, {
        variant: "info",
        autoHideDuration: 2000,
      });
      if (this.state.userrole == "Investor") {
        // history.push("/kycadditionalinvestor");
        window.location.assign("/kycadditionalinvestor")
      }
      else {
        // history.push("/popupverifymail");
        window.location.assign("/popupverifymail")
      }
    } else {
      this.setState({ formLoader: false });
      const message = "Something went wrong, please try again";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };


  kyc2 = () => {
    return (
      <div className="outer-kycformwidth">
        <div className="kyc-content2">
          <div className="topcontent">
            <h2 className="text-center heading1">Attestations</h2>
          </div>

          <form className="form-container1" onSubmit={this.onSubmit1}>
            <div id="form-btn">
              <div className="container-fluid text-center">
                <div className="row d-flex justify-content-center align-items-center">
                  <div className="form__container">
                    <h6 className="form__title">
                      The Company hereby certifies that we do not employ, do business with, or
                      provide any funding to aid or support any entities or individuals that
                      appear on the terrorist watch lists of the US Government, United
                      Nations, European Union and Interpol. The Company also hereby certifies
                      that we comply with the requirements of the USA Patriot Act and other
                      counterterrorism laws as relevant to our business and the jurisdiction
                      in which we operate.
                    </h6>

                    <div className="input-container">
                     
                      <div style={{width:'57%'}}>
                      <label className="label">Date (MM/DD/YYYY)</label>
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
                    </div>

                    <div className="input-container">
                      <label className="label">Name</label>
                      <input
                        required
                        placeholder="Type here"
                        className="input"
                        type="text"
                        onChange={(e) => {
                          this.setState({
                            formData1: {
                              ...this.state.formData1,
                              name: e.target.value,
                            },
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
                        placeholder="Type here"
                        className="input"
                        type="text"
                        onChange={(e) => {
                          this.setState({
                            formData1: {
                              ...this.state.formData1,
                              Compilancetitle: e.target.value,
                            },
                          });
                        }}
                        value={this.state.formData1.Compilancetitle}
                      // required
                      />
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
                  {this.state.userrole == "Investor" ?
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={this.state.checkedstatus == false ? true : false}
                    // disabled={this.state.loading === true ? true : false}
                    >
                      {" "}
                      Next
                      {this.state.formLoader === true ? (
                        <CircularProgress size="22px" color="primary" />
                      ) : (
                        ""
                      )}
                    </Button> :
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={this.state.checkedstatus == false ? true : false}
                    // disabled={this.state.loading === true ? true : false}
                    >
                      {" "}
                      Submit
                      {this.state.formLoader === true ? (
                        <CircularProgress size="22px" color="primary" />
                      ) : (
                        ""
                      )}
                    </Button>}
                </div>
              </div>
              <div />
            </div>
          </form>
        </div>
      </div>
    );
  };

  render() {
    return <>{this.kyc2()}</>;
  }
}

export default withSnackbar(kycAttestination);
