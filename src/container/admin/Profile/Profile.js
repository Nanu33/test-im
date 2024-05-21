/* eslint-disable require-jsdoc */
import React, { Component } from "react";
import Sidebar from "../../../components/sidebar";
import { withSnackbar } from "notistack";
import LinearLoader from "../../../components/loader/LinearLoader";
import Button from "@material-ui/core/Button";
import { addlogo } from "../../../servies/services";
import CircularProgress from "@material-ui/core/CircularProgress";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userrole: sessionStorage.getItem("userrole"),
      component: sessionStorage.getItem("component"),
      token: sessionStorage.getItem("token"),
      UserId: sessionStorage.getItem("userid"),
      formLoader: false,
      formLoaderOff: false,
      display: sessionStorage.getItem("subnetaccaddress"),
      screenloader: false,
      file1: "",
    };
  }

  handleOnChange1 = (e) => {
    this.setState({
      file1: e.target.files[0],
      filename1: e.target.files[0].name,
    });
    console.log("eeee", e.target.files[0].name, this.state.file1);
  };
  onSubmit1 = (e) => {
    e.preventDefault();
    this.addlogo();
    console.log("hello we have clicked the button");
  };
  addlogo = async () => {
    const newdata = new FormData();
    newdata.append("filename", this.state.file1);
    newdata.append("userid", this.state.UserId);

    console.log("newdata", JSON.stringify(newdata));

    this.setState({ formLoader: true });

    const APIResponse = await addlogo(newdata, this.state.token);

    if (APIResponse.status === 200) {
      this.setState({ formLoader: false });

      const message = "Upload Update Success";
      this.props.enqueueSnackbar(message, {
        variant: "info",
        autoHideDuration: 3000,
      });
    } else {
      this.setState({ formLoader: false });
      const message = "Something went wrong";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };
  handleClicks = () => {
    console.log("hello we have clicked the button");
    this.props.history.push({
      pathname: this.state.component,
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="page">
          <Sidebar
            activeComponent={
              this.state.userrole == "Investor"
                ? "InvestorDashboard_Portfolio"
                : "IssuerDashboard"
            }
          />

          <div className="content1">
            {this.state.screenloader == true ? (
              <LinearLoader />
            ) : (
              <div className="page-contentofpool1">
                <div className="row1">
                  <div className="col-12 col-sm-6 col-md-8 d-flex justigy-content-center align-center hellocard">
                    <KeyboardBackspaceIcon
                      onClick={this.handleClicks}
                      className="left-arrow-muis1 left-arrow-servicer"
                    ></KeyboardBackspaceIcon>
                    <h3 className="headerdashboard">Profile</h3>
                  </div>
                </div>
                <div >
                  <div className="servicer-modal-acc">
                    <Accordion defaultExpanded={true}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <div className="editcontainer1">
                          <h5 className="headingpayment">Logo</h5>
                        </div>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          <div className="paymentsetting">
                            <div className="ps_page-in-out-main-container1">
                              <div className="ps_page-left-container">
                                <div className="ps_outer-container">
                                  <div className="ps-inner-bottom-contianer">
                                    <div className="modalshiftcontent">
                                      <form className="form-container" onSubmit={this.onSubmit1}>

                                      <h6 className="e1class">Upload Logo</h6>
                                          <div className="kyc-card__button-container1">
                                            <div>
                                              <button className="card__button" style={{
                                                position: "relative",
                                              }}>
                                                <label
                                                  htmlFor="icon-button-file-id2"
                                                  className="upload-button-label"
                                                >
                                                  Select File
                                                </label>

                                                <input
                                                  required
                                                  id="icon-button-file-id2"
                                                  type="file"
                                                  accept="image/png, image/jpg, image/jpeg"
                                                  style={{
                                                    position: "absolute",
                                                    width: "60%",
                                                    height: "100%",
                                                    cursor: "pointer",
                                                    top: "0",
                                                    right: "0px",
                                                    opacity: "0",
                                                    border: "1.2px solid #212121",
                                                  }}
                                                  onChange={this.handleOnChange1}
                                                />
                                              </button>


                                            </div>
                                            {this.state.file1 !== "" && (
                                              <div className="kyc-card__select_name-container">
                                                <p>{this.state.filename1}</p>
                                              </div>
                                            )}
                                          </div>


                                          <div className="modalsubmit">
                                            <div className="submitbuttonbg">
                                              <div className="row">
                                                <div className="row justify-content-end2">
                                                  <Button
                                                    variant="contained"
                                                    color="primary"
                                                    type="submit"
                                                  >
                                                    Upload
                                                    {this.state.formLoader === true ? (
                                                      <CircularProgress size="22px" color="primary" />
                                                    ) : (
                                                      ""
                                                    )}
                                                  </Button>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                      </form>

                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withSnackbar(Profile);
