/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import React, { Component } from "react";
import { Theme as MuiTheme } from "rjsf-material-ui";
import { withSnackbar } from "notistack";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { UploadKyc } from "../../../servies/services";
class QIBForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: sessionStorage.getItem("token"),
      formData: {
        organizationname: sessionStorage.getItem('oraganization'),
        QIBdate: "",
      },
      file: "",
      userid : sessionStorage.getItem('userid'),
      loading: false,
      OrgLoading: false,
      tableData: [],
      checkedstatus: false,
    };
  }

  onSubmit = async (e) => {
    e.preventDefault();
    console.log(this.state.formData);
    this.UploadKyc();
  };

  UploadKyc = async () => {
    this.setState({ formLoader: true });
    let newData = {};
    newData = { ...this.state.formData, QIBAutorizedofficer: "yes","userid": this.state.userid,"token" : this.state.token};
      console.log("datata", newData);

    const APIResponse = await UploadKyc(newData);

    if (APIResponse.status === 200) {
      this.setState({ formLoader: false });
      console.log("upload--", APIResponse);
      this.props.history.push("/kyc1");
    } else {
      this.setState({ formLoader: false });
      const message = "Something went wrong, please try again";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  handleOnChange1 = (e) => {
    this.setState({
      file: e.target.files[0],
      filename: e.target.files[0].name,
    });
  };

  form22 = () => {
    return (
      <div className="form__container">
        <h6 className="form__title">
          We hereby confirm that we are a "qualified institutional buyer" as
          defined in Rule 144A under the U.S. Securities Act of 1933, as
          amended, that is able to bear the economic risk of such an investment
          in the Tokens. We understand that (a) the Tokens are not being, and
          will not be, registered under the Securities Act, (b) the Tokens are
          being offered and sold to us in a transaction that is exempt from the
          registration requirements of the Securities Act, and (c) the Tokens
          may be considered "restricted securities" within the meaning of Rule
          144(a)(3) under the Securites Act. We agree, for so long as the Tokens
          may be considered "restricted securities" within the meaning of Rule
          144(a)(3) under the Securites Act, (a) not to offer or sell the
          Tokens, except the pursuant to an exemption from the registration
          requirements of the Securites Act and (b) not to deposit the Tokens in
          an unrestricted depositary receipt facility. We understand that an
          exemption pursuant to Rule 144A under the Securites Act may not be
          available for the resale of the tokens.
        </h6>
        <form className="form-container1" onSubmit={this.onSubmit}>
          <div className="input-container">
            <label className="label">Organization Name</label>
            <input
            required
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
            required
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
            <h6 className="form-para">I am an Authorized Officer of the Company</h6>
          </span>
        </form>
      </div>
    );
  };

  render() {
    return (
      <React.Fragment>
        <div className="kyc-content2">
          <div className="topcontent">
            <h2 className="text-center heading1">Investor QIB Certification</h2>
          </div>

          <div className="register1__title-container"></div>

          <form className="form-container1" onSubmit={this.onSubmit}>
            <div id="form-btn">
              <div className="container-fluid text-center">
                <div className="row d-flex justify-content-center align-items-center">
                  {this.form22()}
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={this.state.checkedstatus == false ? true : false}
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
  }
}

export default withSnackbar(QIBForm);
