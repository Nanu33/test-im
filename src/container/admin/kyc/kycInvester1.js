import React, { Component } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import AIcon1 from "./AIcon1.xlsx";
import { UploadKyc } from "../../../servies/services";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

class KycInvester1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: sessionStorage.getItem("token"),
      userid: sessionStorage.getItem("userid"),
      file: "",
      qibdisplay: false,
      formData: {
        organizationname: sessionStorage.getItem("oraganization"),
        QIBdate: "",
      },
      checkedstatus: false,
    };
  }

  handleOnChange = (e) => {
    this.setState({
      file: e.target.files[0],
      filename: e.target.files[0].name,
    });
    console.log("fileeee", e.target.files[0].name);
  };

  UploadKyc1 = async () => {
    console.log("uplaodlms");
    const files = [];
    files.push(this.state.file);
    console.log("ffff", files);
    const newdata = new FormData();
    newdata.append("userid", this.state.userid);
    Array.from(files).forEach((file) => {
      newdata.append("filename", file);
    });
    newdata.append("token", this.state.token);
    console.log("newdata", newdata);
    this.setState({ formLoader: true });

    const APIResponse = await UploadKyc(newdata);

    if (APIResponse.status === 200) {
      this.setState({ formLoader: true });
      console.log("upload--", APIResponse);
      this.props.handleClickKyc1();
    } else {
      this.setState({ formLoader: false });
      const message = "Something went wrong, please try again";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  handleClick = () => {
    this.props.handleClickKyc1();
  };

  handleClick1 = () => {
    this.setState({ qibdisplay: false });
  };

  ViewTheQibForm = () => {
    this.setState({ qibdisplay: true });
  };

  onSubmit1 = async (e) => {
    e.preventDefault();
    console.log(this.state.formData);
    this.UploadKyc();
  };

  UploadKyc = async () => {
    this.setState({ formLoader: true });
    const newdata = new FormData();
    newdata.append("userid", this.state.userid);
    newdata.append("QIBAutorizedofficer", "yes");
    newdata.append("token", this.state.token);
    newdata.append("organizationname", this.state.formData.organizationname);
    newdata.append("QIBdate", this.state.formData.QIBdate);
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

  card1 = () => (
    <div className="card__container">
      <h6 className="card1__title">Upload the W9 Form</h6>
      <ol className="card1__list">
        <li>
          <a href={AIcon1} download className="login-sign_up-links">
            Click here
          </a>{" "}
          to view the form
        </li>
        <li>Download, Fill in, Execute</li>
        <li>Upload the completed form</li>
      </ol>
      <div className="kyc-card__button-container">
        <div>
          <input
            id="icon-button-file"
            type="file"
            style={{ display: "none" }}
            onChange={this.handleOnChange}
          />
          <button className="card__button" type="submit">
            <label htmlFor="icon-button-file" className="upload-button-label">
              Upload
            </label>
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
  );

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
  );

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
                          <div className="register1__title-container1s">
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

  render() {
    return (
      <React.Fragment>
        {this.state.qibdisplay == false ? (
          <div className="outer-kycformwidth">
            <div className="kycformwidth">
              <div className="topcontent">
                <h2 className="text-center heading1">KYC Process</h2>
              </div>
              <div className="kyc-title-container">
                <h5>Submission of Documents</h5>
                <i>
                  <b>1</b>/2
                </i>
              </div>
              <div id="form-btn">
                <div className="container-fluid text-center">
                  <div className="row d-flex justify-content-center align-items-center">
                    {this.card1()}
                    {this.card6()}
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      onClick={this.UploadKyc1}
                    >
                      {" "}
                      Next
                      {this.state.formLoader === true ? (
                        <CircularProgress size="22px" color="primary" />
                      ) : (
                        ""
                      )}
                    </Button>
                  </div>
                </div>
                <div />
              </div>
            </div>
          </div>
        ) : (
          this.QibForm()
        )}
      </React.Fragment>
    );
  }
}

export default KycInvester1;
