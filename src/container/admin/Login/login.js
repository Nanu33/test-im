/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import React, { Component } from "react";
// import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import CloseIcon from "@material-ui/icons/Close";
import ReactModal from "react-modal";
import FormLoader from "../../../components/formLoader";
import { withTheme } from "react-jsonschema-form";
import { Theme as MuiTheme } from "rjsf-material-ui";
import { customStylesautosmallmodal } from "../../../components/customscripts/customscript";
import { withSnackbar } from "notistack";
import { Login, ForgotPassword } from "../../../servies/services";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRecords: [],
      eligibleloans: {},
      tableData: [],
      loading: false,
      getLoansLoader: false,
      open: false,
      openPopup: false,
      selectedLoanId: [],
      searchText: "",
      rowsSelected: null,
      open1: false,
      open2: false,
      formData: {
        EmailId: "",
        Password: "",
        Role: "",
      },
      formData1: {
        email1: "",
        Role: "",
      },
      OrgLoading: false,
      button: true,
      remainingAttempts: 3,
      signbtn: false,
      showPassword: false,
    };
  }

  onSubmit = async (e) => {
    e.preventDefault();
    console.log(this.state.formData);
    this.Login();
    // let userrole = "issuer";
    // if (userrole == "issuer") {
    //   return this.props.history.push({
    //     pathname: "/admin/issuerdashboard",
    //   });
    // } else {
    //   return this.props.history.push({
    //     pathname: "/admin/investorinvested",
    //   });
    // }
  };
  handleButtonClick = () => {
    this.setState((prevState) => ({
      showPassword: !prevState.showPassword,
    }));
  };

  Login = async () => {
    var data = this.state.formData;

    console.log("logindata---" + JSON.stringify(data));
    this.setState({ formLoader: true });
    const APIResponse = await Login(data);
    console.log("APIResponse", APIResponse);
    if (APIResponse !== null) {
      if (APIResponse.status == 204) {
        this.setState({ remainingAttempts: this.state.remainingAttempts - 1 });

        if (this.state.remainingAttempts <= 0) {
          this.setState({ formLoader: false, signbtn: true });

          setTimeout(
            () =>
              this.setState({
                formLoader: false,
                signbtn: false,
                remainingAttempts: 3,
              }),
            180000
          );

          const message =
            "Your login attempts expired please wait for 3 minute";
          this.props.enqueueSnackbar(message, {
            variant: "error",
            autoHideDuration: 5000,
          });
        } else {
          this.setState({ formLoader: false });
          const message = "Credentials Incorrect";
          this.props.enqueueSnackbar(message, {
            variant: "error",
            autoHideDuration: 2000,
          });
        }
      } else {
        if (APIResponse.data != "undefined") {
          sessionStorage.setItem("isLogin",true)
          sessionStorage.setItem("userrole", APIResponse.data.data.UserRole);
          sessionStorage.setItem("userid", APIResponse.data.data.UserId);
          sessionStorage.setItem("firstname", APIResponse.data.data.FirstName);
          sessionStorage.setItem("lastname", APIResponse.data.data.lastname);
          sessionStorage.setItem(
            "subnetaccaddress",
            APIResponse.data.data.UserAccAddress
          );
          sessionStorage.setItem("token", APIResponse.data.token);
          sessionStorage.setItem(
            "EmailAddress",
            APIResponse.data.data.EmailAddress
          );
          sessionStorage.setItem(
            "KycVerifiedStatus",
            APIResponse.data.data.KycVerifiedStatus
          );
          sessionStorage.setItem(
            "KycUploadStatus",
            APIResponse.data.data.KycUploadStatus
          );
          sessionStorage.setItem(
            "TermsOfService",
            APIResponse.data.data.TermsOfService
          );
          sessionStorage.setItem(
            "countryofregistration",
            APIResponse.data.data.countryofregistration
          );
          sessionStorage.setItem(
            "publiclytradedcompany",
            APIResponse.data.data.publiclytradedcompany
          );
          sessionStorage.setItem(
            "organizationname",
            APIResponse.data.data.organizationname
          );
          // sessionStorage.setItem("logo", APIResponse.data.data.logo);
          console.log("UserRole", APIResponse.data.data.UserRole);

          if (APIResponse.data.data.UserRole == "Issuer") {
            this.setState({ formLoader: false });
            const message = "Logged in successfully";
            this.props.enqueueSnackbar(message, {
              variant: "info",
              autoHideDuration: 2000,
            });
            window.location.assign("/admin/issuerdashboard");
          } else if (APIResponse.data.data.UserRole == "Investor") {
            this.setState({ formLoader: false });
            const message = "Logged in successfully";
            this.props.enqueueSnackbar(message, {
              variant: "info",
              autoHideDuration: 2000,
            });
            window.location.assign("admin/investorpreviewpools");
          } else if (APIResponse.data.data.UserRole == "Rating Agency") {
            this.setState({ formLoader: false });
            const message = "Logged in successfully";
            this.props.enqueueSnackbar(message, {
              variant: "info",
              autoHideDuration: 2000,
            });
            window.location.assign("/admin/ra_preview_pools");
          } else if (APIResponse.data.data.UserRole == "Verification") {
            this.setState({ formLoader: false });
            sessionStorage.setItem("VaToken", APIResponse.data.data.VAToken);
            sessionStorage.setItem("application_name", "IntainMarkets");
            const message = "Logged in successfully";
            this.props.enqueueSnackbar(message, {
              variant: "info",
              autoHideDuration: 2000,
            });
            window.location.assign("/admin/va_dashboard");
          } else if (APIResponse.data.data.UserRole == "Underwriter") {
            this.setState({ formLoader: false });
            const message = "Logged in successfully";
            this.props.enqueueSnackbar(message, {
              variant: "info",
              autoHideDuration: 2000,
            });
            window.location.assign("/admin/uw_dashboard_pools");
          } else if (APIResponse.data.data.UserRole == "Servicer") {
            this.setState({ formLoader: false });
            const message = "Logged in successfully";
            this.props.enqueueSnackbar(message, {
              variant: "info",
              autoHideDuration: 2000,
            });
            window.location.assign("/admin/servicer_deals");
          } else if (APIResponse.data.data.UserRole == "Paying Agent") {
            this.setState({ formLoader: false });
            const message = "Logged in successfully";
            this.props.enqueueSnackbar(message, {
              variant: "info",
              autoHideDuration: 2000,
            });
            window.location.assign("/admin/payingagent_deals");
          } else if (APIResponse.data.data.UserRole == "Admin") {
            this.setState({ formLoader: false });
            const message = "Logged in successfully";
            this.props.enqueueSnackbar(message, {
              variant: "info",
              autoHideDuration: 2000,
            });
            window.location.assign("/attributeautomation");
          }
        } else {
          this.setState({ formLoader: false });
          const message = "Something went wrong, please try again";
          this.props.enqueueSnackbar(message, {
            variant: "error",
            autoHideDuration: 5000,
          });
        }
      }
    }
  };
  onSubmit1 = (e) => {
    e.preventDefault();
    this.state.secondFormEmailErrorMsg1 === null ||
    this.state.secondFormEmailErrorMsg1 === ""
      ? this.myfunc()
      : alert("Enter Valid Inputs");
  };
  myfunc = () => {
    console.log(this.state.formData1);
    console.log("hello we have clicked the button");
    this.ForgotPassword();
  };

  secondFormEmailValidate1 = () => {
    const { email1 } = this.state.formData1;
    const emailValid1 = email1.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    if (emailValid1) {
      this.setState({ secondFormEmailErrorMsg1: "" });
    } else {
      this.setState({
        secondFormEmailErrorMsg1: "Enter valid main ,ex- emailadd@email.com ",
      });
    }
  };

  secondFormHandleChangeEmail1 = (e) => {
    this.setState(
      {
        formData1: {
          ...this.state.formData1,
          email1: e.target.value,
        },
      },
      this.secondFormEmailValidate1
    );
  };

  ForgotPassword = async () => {
    let data = {};

    if (this.state.formData1.email1 != "") {
      data.EmailId = this.state.formData1.email1;
      console.log("datasssssssssssss1111", data);
    } else {
      data.EmailId = this.state.formData.EmailId;
      console.log("datassssssssssss", data);
    }
    data.Role = this.state.formData1.Role;
    console.log("data", data);
    this.setState({ formLoader1: true });
    const APIResponse = await ForgotPassword(data);

    if (APIResponse.status === 200) {
      console.log("Forgotpassword--", APIResponse);
      this.setState({ formLoader1: false });
      const message = "Email Successfully sent";
      this.props.enqueueSnackbar(message, {
        variant: "info",
        autoHideDuration: 3000,
      });
      this.onOpenModal1();
    } else {
      this.setState({ formLoader1: false });
      const message = "Incorrect Email";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
      this.onCloseModal();
    }
  };

  onOpenModal = () => {
    console.log("inside modal1");
    this.setState({ open1: true });
  };

  onCloseModal = () => {
    this.setState({
      open1: false,
      formData1: {
        email: "",
        Role: "",
      },
    });
  };

  onOpenModal1 = () => {
    console.log("inside modal1");
    this.setState({ open1: false, open2: true });
  };

  onCloseModal1 = () => {
    this.setState({ open2: false });
  };

  async componentDidMount() {
    sessionStorage.clear();
  }

  secondFormEmailValidate = () => {
    const { EmailId } = this.state.formData;
    const emailValid = EmailId.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    if (emailValid) {
      this.setState({ secondFormEmailErrorMsg: "" });
    } else {
      this.setState({ secondFormEmailErrorMsg: "Enter Valid Email" });
    }
  };
  secondFormHandleChangeEmail = (e) => {
    this.setState(
      {
        formData: {
          ...this.state.formData,
          EmailId: e.target.value,
        },
      },
      this.secondFormEmailValidate
    );
  };

  render() {
    return (
      <React.Fragment>
        {this.state.loading === true ? <FormLoader></FormLoader> : ""}
        <div className="topcontent">
          <h2 className="text-center heading1" style={{ color: 'var(--primary-text-color)' }}>Sign In to Platform</h2>
        </div>
        <div className="outer-form-container">
          <form className="form-container" onSubmit={this.onSubmit}>
            <div className="input-container">
              <label className="label" style={{ color: 'var(--primary-text-color)' }}>Email Address</label>
              <input
                required
                placeholder="Type here"
                className="input"
                type="text"
                onChange={this.secondFormHandleChangeEmail}
                value={this.state.formData.EmailId}
                // required
              />
              {this.state.secondFormEmailErrorMsg === null ||
              this.state.secondFormEmailErrorMsg === "" ? null : (
                <p className="error-msg">
                  {this.state.secondFormEmailErrorMsg}
                </p>
              )}
            </div>
            <div className="input-container">
              <div className="register1__title-container1s">
                <label className="label" style={{ color: 'var(--primary-text-color)' }}>Password</label>
                <button
                  type="button"
                  onClick={() => this.onOpenModal()}
                  className="login-sign_up-links"
                >
                  Forgot Password?
                </button>
              </div>

              <div className="flex input">
                <input
                  required
                  placeholder="Type here"
                  className="input-none"
                  type={this.state.showPassword ? "text" : "Password"}
                  onChange={(e) => {
                    this.setState({
                      formData: {
                        ...this.state.formData,
                        Password: e.target.value,
                      },
                    });
                  }}
                  value={this.state.formData.Password}
                />
                <button
                  type="button"
                  className="eye-btn"
                  onClick={this.handleButtonClick}
                >
                  {!this.state.formData.Password ? (
                    <VisibilityIcon className="disabled" />
                  ) : this.state.showPassword ? (
                    <VisibilityOffIcon />
                  ) : (
                    <VisibilityIcon />
                  )}
                </button>
              </div>
            </div>
            <div className="input-container">
              <label className="label" style={{ color: 'var(--primary-text-color)' }}>Role</label>
              <select
                required
                placeholder="select any one"
                className="input-select"
                onChange={(e) => {
                  this.setState({
                    formData: {
                      ...this.state.formData,
                      Role: e.target.value,
                    },
                  });
                }}
                value={this.state.formData.Role}
              >
                <option value="" disabled className="selectclass">
                  Select any one{" "}
                </option>
                <option value="Issuer">Issuer</option>
                <option value="Investor">Investor</option>
                <option value="Servicer">Servicer</option>
                <option value="Verification">Verification Agent</option>
                {/* <option value="Custodian">Custodian</option> */}
                <option value="Underwriter">Underwriter</option>
                {/* <option value="Trustee">Trustee</option> */}
                {/* <option value="Brokerr/Dealer">Broker/Dealer</option> */}
                <option value="Paying Agent">Paying Agent</option>
                <option value="Rating Agency">Rating Agency</option>
              </select>
            </div>
            <div id="form-btn">
              <div className="container-fluid text-center">
                <div className="row d-flex justify-content-center align-items-center">
                  {this.state.signbtn == false ? (
                    <Button variant="contained" color="primary" type="submit">
                      {" "}
                      Sign In
                      {this.state.formLoader === true ? (
                        <CircularProgress size="25px" color="primary" />
                      ) : (
                        ""
                      )}
                    </Button>
                  ) : (
                    <Button variant="contained" color="primary" disabled>
                      Sign In
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>

        <div id="modal1">
          <ReactModal
            isOpen={this.state.open1}
            onRequestClose={this.onCloseModal}
            contentLabel="Minimal Modal Example"
            style={customStylesautosmallmodal}
          >
            {this.state.formData.EmailId.length > 0 ? (
              <React.Fragment>
                <div className="modalPopup2">
                  <div className="popupTitle">
                    <h2 className="popupheading">Confirm your Mail ID</h2>
                    <button
                      type="button"
                      className="closePopup"
                      style={{ minWidth: "30px" }}
                      onClick={this.onCloseModal}
                    >
                      {" "}
                      <CloseIcon></CloseIcon>{" "}
                    </button>
                  </div>

                  {/* {this.state.popupLoader === true ? <CircularProgress size="30px" color="secondary" /> : ' '} */}

                  <div className="modalshiftcontent">
                    <h6 className="card1__title">
                      We will send the link to reset your password on your
                      registered mail ID "{this.state.formData.EmailId}"
                    </h6>
                    <div className="input-container">
                      <label className="label">Role</label>
                      <select
                        required
                        placeholder="select any one"
                        className="input-select"
                        onChange={(e) => {
                          this.setState({
                            formData1: {
                              ...this.state.formData1,
                              Role: e.target.value,
                            },
                          });
                        }}
                        value={this.state.formData1.Role}
                      >
                        <option value="" disabled className="selectclass">
                          Select any one{" "}
                        </option>
                        <option value="Issuer">Issuer</option>
                        <option value="Investor">Investor</option>
                        <option value="Servicer">Servicer</option>
                        <option value="Verification">Verification Agent</option>
                        {/* <option value="Custodian">Custodian</option> */}
                        <option value="Underwriter">Underwriter</option>
                        {/* <option value="Trustee">Trustee</option> */}
                        {/* <option value="Brokerr/Dealer">Broker/Dealer</option> */}
                        <option value="Paying Agent">Paying Agent</option>
                      </select>
                    </div>

                    <div className="modalsubmit">
                      <div className="submitbuttonbg">
                        <div className="row">
                          <div className="row justify-content-loginforgot">
                            <button
                              type="button"
                              className="popupbutton22"
                              onClick={this.onCloseModal}
                            >
                              {" "}
                              Cancel{" "}
                            </button>
                            <Button
                              variant="contained"
                              color="primary"
                              type="submit"
                              onClick={this.ForgotPassword}
                            >
                              Confirm
                              {this.state.formLoader1 === true ? (
                                <CircularProgress size="22px" color="primary" />
                              ) : (
                                ""
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {this.state.getLoansLoader === false ? (
                      ""
                    ) : (
                      <FormLoader></FormLoader>
                    )}
                    {/* {this.state.openPopup === true ? <React.Fragment><Snackbar msg={"Processor addded Successfully" || this.state.message} open="true" /> </React.Fragment> : ' '} */}
                  </div>
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <div className="modalPopup2">
                  <div className="popupTitle">
                    <h2 className="popupheading">Confirm your Mail ID</h2>
                    <button
                      type="button"
                      className="closePopup"
                      style={{ minWidth: "30px" }}
                      onClick={this.onCloseModal}
                    >
                      {" "}
                      <CloseIcon></CloseIcon>{" "}
                    </button>
                  </div>

                  {/* {this.state.popupLoader === true ? <CircularProgress size="30px" color="secondary" /> : ' '} */}

                  <div className="modalshiftcontent">
                    <h6 className="card1__title">
                      We will send the link to reset your password on your
                      registered mail ID
                    </h6>
                    <form className="form-container" onSubmit={this.onSubmit1}>
                      <div className="input-container">
                        <label className="label">Email Address</label>
                        <input
                          required
                          placeholder="Type here"
                          className="input"
                          type="text"
                          onChange={this.secondFormHandleChangeEmail1}
                          value={this.state.formData1.email1}
                          // required
                        />
                        {this.state.secondFormEmailErrorMsg1 === null ||
                        this.state.secondFormEmailErrorMsg1 === "" ? null : (
                          <p className="error-msg">
                            {this.state.secondFormEmailErrorMsg1}
                          </p>
                        )}
                      </div>
                      <div className="input-container">
                        <label className="label">Role</label>
                        <select
                          required
                          placeholder="select any one"
                          className="input-select"
                          onChange={(e) => {
                            this.setState({
                              formData1: {
                                ...this.state.formData1,
                                Role: e.target.value,
                              },
                            });
                          }}
                          value={this.state.formData1.Role}
                        >
                          <option value="" disabled className="selectclass">
                            Select any one{" "}
                          </option>
                          <option value="Issuer">Issuer</option>
                          <option value="Investor">Investor</option>
                          <option value="Servicer">Servicer</option>
                          <option value="Verification">
                            Verification Agent
                          </option>
                          {/* <option value="Custodian">Custodian</option> */}
                          <option value="Underwriter">Underwriter</option>
                          {/* <option value="Trustee">Trustee</option> */}
                          {/* <option value="Brokerr/Dealer">Broker/Dealer</option> */}
                          <option value="Paying Agent">Paying Agent</option>
                        </select>
                      </div>

                      <div className="modalsubmit">
                        <div className="submitbuttonbg">
                          <div className="row">
                            <div className="row justify-content-loginforgot">
                              <button
                                type="button"
                                className="popupbutton22"
                                onClick={this.onCloseModal}
                              >
                                {" "}
                                Cancel{" "}
                              </button>
                              <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                              >
                                Confirm
                                {this.state.formLoader1 === true ? (
                                  <CircularProgress
                                    size="22px"
                                    color="primary"
                                  />
                                ) : (
                                  ""
                                )}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>

                    {this.state.getLoansLoader === false ? (
                      ""
                    ) : (
                      <FormLoader></FormLoader>
                    )}
                    {/* {this.state.openPopup === true ? <React.Fragment><Snackbar msg={"Processor addded Successfully" || this.state.message} open="true" /> </React.Fragment> : ' '} */}
                  </div>
                </div>
              </React.Fragment>
            )}
          </ReactModal>
        </div>

        <div id="modal1">
          <ReactModal
            isOpen={this.state.open2}
            onRequestClose={this.onCloseModal1}
            contentLabel="Minimal Modal Example"
            style={customStylesautosmallmodal}
          >
            <React.Fragment>
              <div className="modalPopup2">
                <h4 className="popupheading">Reset link has been sent!</h4>
                <div className="modalshiftcontent">
                  <h6 className="card1__title">
                    Kindly check our mail and click on the given link to reset
                    your password.
                  </h6>

                  <div className="modalsubmit">
                    <div className="submitbuttonbg">
                      <div className="row justify-content-end1">
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          onClick={this.onCloseModal1}
                        >
                          Okay
                          {this.state.formLoader === true ? (
                            <CircularProgress size="25px" color="primary" />
                          ) : (
                            ""
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>

                  {this.state.getLoansLoader === false ? (
                    ""
                  ) : (
                    <FormLoader></FormLoader>
                  )}
                  {/* {this.state.openPopup === true ? <React.Fragment><Snackbar msg={"Processor addded Successfully" || this.state.message} open="true" /> </React.Fragment> : ' '} */}
                </div>
              </div>
            </React.Fragment>
          </ReactModal>
        </div>

        <div className="loginCheckbox">
          <p className="login-sign-up-para" style={{ color: 'var(--primary-text-color)' }}>
            <Link to={"/register"} className="login-sign_up-link">
              Sign Up
            </Link>
            , If you don’t have an account
          </p>
        </div>
      </React.Fragment>
    );
  }
}

export default withSnackbar(login);
