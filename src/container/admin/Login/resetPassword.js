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
import { ResetPassword } from "../../../servies/services";
import Button from "@material-ui/core/Button";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import CircularProgress from "@material-ui/core/CircularProgress";

class resetPassword extends Component {
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
      open1: true,
      open2: false,
      formData: {
        email: "",
        password: "",
      },
      formData1: {
        password: "",
        confirmPassword: "",
      },
      showPassword: false,
      showPassword1: false,
      OrgLoading: false,
      EmailId: "",
      Role: "",
    };
  }

  handleClick = () => {
    this.props.history.push({
      pathname: "/",
    });
  };

  handleOnClick = (e) => {
    this.setState({
      formData1: { ...this.state.formData1, password: e.target.value },
    });
  };
  handleOnClick1 = (e) => {
    this.setState({
      formData1: { ...this.state.formData1, confirmPassword: e.target.value },
    });
    this.setState({ showErrMsg: true });
  };

  handleButtonClick = () => {
    this.setState((prevState) => ({
      showPassword: !prevState.showPassword,
    }));
  };
  handleButtonClick1 = () => {
    this.setState((prevState) => ({
      showPassword1: !prevState.showPassword1,
    }));
  };

  onSubmit1 = (e) => {
    e.preventDefault();
    this.state.formData1.password === this.state.formData1.confirmPassword &&
    (this.state.secondFormPasswordErrorMsg === "" ||
      this.state.secondFormPasswordErrorMsg === null)
      ? this.myfunc()
      : alert("Enter Valid Inputs");
  };
  myfunc = () => {
    console.log(this.state.formData1);
    console.log("hello we have clicked the button");
    this.ResetPassword();
  };
  secondFormPasswordValidate = () => {
    const { password } = this.state.formData1;
    const passwordValid = password.match(
      /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,15}$/gm
    );
    if (passwordValid) {
      this.setState({ secondFormPasswordErrorMsg: "" });
    } else {
      this.setState({
        secondFormPasswordErrorMsg:
          "Password must contain at least 8 characters ,1 uppercase, 1 lowercase, 1 special character and 1 number",
      });
    }
  };

  secondFormHandleChangePassword = (e) => {
    this.setState(
      {
        formData1: { ...this.state.formData1, password: e.target.value },
      },
      this.secondFormPasswordValidate
    );
  };

  ResetPassword = async () => {
    let data = {};
    data.EmailId = this.state.EmailId;
    data.Password = this.state.formData1.password;
    data.Role = this.state.Role;
    console.log("data", data);

    this.setState({ formLoader: true });
    const APIResponse = await ResetPassword(data);
    console.log("APIResponse", APIResponse);
    if (APIResponse.status === 200) {
      console.log("Forgotpassword--", APIResponse);
      this.setState({ formLoader: false });
      const message = "User password is updated sucessfully ";
      this.props.enqueueSnackbar(message, {
        variant: "info",
        autoHideDuration: 3000,
      });
      this.onOpenModal1();
    } else if (APIResponse.status === 204) {
      console.log("Forgotpassword--", APIResponse);
      this.setState({ formLoader: false });
      const message = "Username is incorrect";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    } else {
      this.setState({ formLoader: false });
      const message = "Incorrect Email";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  // onSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log(this.state.formData);
  //   this.props.history.push({
  //     pathname: "/admin/issuerdashboard",
  //   });
  // };

  onOpenModal = () => {
    console.log("inside modal1");
    this.setState({ open1: true });
  };

  onCloseModal = () => {
    this.setState({ open1: false });
  };
  onCloseModalpopup = () => {
    this.setState({ open1: true });
  };
  onCloseModalpopup1 = () => {
    this.setState({ open2: true });
  };

  onOpenModal1 = () => {
    console.log("inside modal1");
    this.setState({ open1: false, open2: true });
  };

  onCloseModal1 = () => {
    this.setState({ open2: false });
  };

  async componentDidMount() {
    let search = this.props.location?.search;
    let params = new URLSearchParams(search);
    let Email = params.get("EmailAddress");
    let Role = params.get("Role");
    this.setState({ EmailId: Email, Role: Role });
    console.log("Roleeee", this.state.EmailId);
    console.log("Role", this.state.Role);
    sessionStorage.clear();
  }

  secondFormEmailValidate = () => {
    const { email } = this.state.formData;
    const emailValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
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
          email: e.target.value,
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
          <h2 className="text-center heading1">Sign In to Platform</h2>
        </div>
        <form className="form-container" onSubmit={this.onSubmit}>
          <div className="input-container">
            <label className="label">Email Address</label>
            <input
              required
              placeholder="Type here"
              className="input"
              type="text"
              onChange={this.secondFormHandleChangeEmail}
              value={this.state.formData.email}
              // required
            />
            {this.state.secondFormEmailErrorMsg === null ||
            this.state.secondFormEmailErrorMsg === "" ? null : (
              <p className="error-msg">{this.state.secondFormEmailErrorMsg}</p>
            )}
          </div>
          <div className="input-container">
            <div className="register1__title-container1s">
              <label className="label">Password</label>
              <buton
                type="button"
                onClick={() => this.onOpenModal()}
                className="login-sign_up-links"
              >
                Forgot Password?
              </buton>
              {/* <Link to={''} className="login-sign_up-links" onClick={this.onOpenModal.bind(this)}>Forgot Password?</Link> */}
            </div>

            <input
              required
              placeholder="Type here"
              className="input"
              type="password"
              onChange={(e) => {
                this.setState({
                  formData: {
                    ...this.state.formData,
                    password: e.target.value,
                  },
                });
              }}
              value={this.state.formData.password}
              // required
            />
          </div>
          <div id="form-btn">
            <div className="container-fluid text-center">
              <div className="row d-flex justify-content-center align-items-center">
                <Button variant="contained" color="primary" type="submit">
                  {" "}
                  Sign In
                  {this.state.formLoader1 === true ? (
                    <CircularProgress size="25px" color="primary" />
                  ) : (
                    ""
                  )}
                </Button>
              </div>
            </div>
          </div>
        </form>
        {this.state.open1 && (
          <div id="modal1">
            <ReactModal
              isOpen={this.state.open1}
              onRequestClose={this.onCloseModalpopup}
              contentLabel="Minimal Modal Example"
              style={customStylesautosmallmodal}
            >
              <React.Fragment>
                <div className="modalPopup2">
                  <div className="popupTitle">
                    <h4 className="popupheading">Reset your Password</h4>
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
                    <form className="form-container" onSubmit={this.onSubmit1}>
                      <div className="input-container">
                        <label className="label">Password</label>
                        <div className="flex input">
                          <input
                            required
                            placeholder="Type here"
                            className="input-none"
                            type={this.state.showPassword ? "text" : "password"}
                            onChange={this.secondFormHandleChangePassword}
                            value={this.state.formData1.password}
                            // required
                          />
                          <button
                            type="button"
                            className="eye-btn"
                            onClick={this.handleButtonClick}
                          >
                            {this.state.showPassword ? (
                              <VisibilityOffIcon />
                            ) : (
                              <VisibilityIcon />
                            )}
                          </button>
                        </div>
                        {this.state.secondFormPasswordErrorMsg === null ||
                        this.state.secondFormPasswordErrorMsg === "" ? null : (
                          <p className="error-msg">
                            {this.state.secondFormPasswordErrorMsg}
                          </p>
                        )}
                      </div>

                      <div className="input-container">
                        <label className="label">Confirm Password</label>
                        <div className="flex input">
                          <input
                            required
                            placeholder="Type here"
                            className="input-none"
                            type={
                              this.state.showPassword1 ? "text" : "password"
                            }
                            onChange={this.handleOnClick1}
                            value={this.state.formData1.confirmPassword}
                            // required
                          />
                          <button
                            type="button"
                            className="eye-btn"
                            onClick={this.handleButtonClick1}
                          >
                            {this.state.showPassword1 ? (
                              <VisibilityOffIcon />
                            ) : (
                              <VisibilityIcon />
                            )}
                          </button>
                        </div>

                        {this.state.showErrMsg && (
                          <div className="error-msg-container">
                            {this.state.formData1.password ===
                            this.state.formData1.confirmPassword ? null : (
                              <p className="error-msg">
                                Do not match with Password
                              </p>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="modalsubmit">
                        <div className="submitbuttonbg">
                          <div className="row">
                            <div className="row justify-content-endforlogin">
                              <button
                                type="button"
                                className="popupbutton2"
                                onClick={this.handleClick}
                              >
                                {" "}
                                Cancel{" "}
                              </button>
                              <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                              >
                                Reset
                                {this.state.formLoader === true ? (
                                  <CircularProgress
                                    size="25px"
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
            </ReactModal>
          </div>
        )}

        <div id="modal1">
          <ReactModal
            isOpen={this.state.open2}
            onRequestClose={this.onCloseModalpopup1}
            contentLabel="Minimal Modal Example"
            style={customStylesautosmallmodal}
          >
            <React.Fragment>
              <div className="modalPopup2">
                <h4 className="popupheading">
                  Successfully reset the Password!
                </h4>
                {/* <button
                      type="button"
                      className="closePopup"
                      style={{ minWidth: "30px" }}
                      onClick={this.onCloseModal1}
                    >
                      {" "}
                      <CloseIcon></CloseIcon>{" "}
                    </button> */}

                {/* {this.state.popupLoader === true ? <CircularProgress size="30px" color="secondary" /> : ' '} */}

                <div className="modalshiftcontent">
                  <h6 className="card1__title">
                    You can now use the new password to access our platform.
                  </h6>

                  <div className="modalsubmit">
                    <div className="submitbuttonbg">
                      <div className="row justify-content-end1">
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          onClick={this.handleClick}
                        >
                          Go to Sign In
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
          <p className="login-sign-up-para">
            <Link to={"/register"} className="login-sign_up-link">
              Sign Up
            </Link>
            , If you don’t have an account
          </p>
        </div>

        <React.Fragment></React.Fragment>
      </React.Fragment>
    );
  }
}

export default withSnackbar(resetPassword);
