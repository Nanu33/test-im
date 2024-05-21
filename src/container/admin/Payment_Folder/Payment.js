/* eslint-disable require-jsdoc */
import React, { Component } from "react";
import Sidebar from "../../../components/sidebar";
import { withSnackbar } from "notistack";
import LinearLoader from "../../../components/loader/LinearLoader";
import Button from "@material-ui/core/Button";
import {
  SavePaymentSettings,
  savebankdetailsoffchain,
  getuserbyid,
  API
} from "../../../servies/services";
import CircularProgress from "@material-ui/core/CircularProgress";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payInsDetails: {
        PayInsViaCircle: "true",
        PayInPaymentType: "Wire",
        userWalletAdd:
          sessionStorage.getItem("subnetaccaddress") == ""
            ? ""
            : sessionStorage.getItem("subnetaccaddress"),
        subnetWalletAdd:
          sessionStorage.getItem("subnetaccaddress") == ""
            ? ""
            : sessionStorage.getItem("subnetaccaddress"),
      },
      PayOutDeets: {
        PayoutsViaCircle: "true",
        PayOutPaymentType: "Wire",
      },
      payOutsDetails: {
        beneficiaryName: "",
        accountNumber: "",
        routingNumber: "",
        iban: "",
        billingDetails: {
          name: "",
          line1: "",
          line2: "",
          city: "",
          district: "",
          country: "",
          postalCode: "",
        },
        bankAddress: {
          bankName: "",
          line1: "",
          line2: "",
          city: "",
          district: "",
          country: "",
          postalCode: "",
        },
      },
      offline: {
        beneficiaryName: "",
        accountNumber: "",
        routingNumber: "",
        iban: "",
        billingDetails: {
          name: "",
          line1: "",
          line2: "",
          city: "",
          district: "",
          country: "",
          postalCode: "",
        },
        bankAddress: {
          bankName: "",
          line1: "",
          line2: "",
          city: "",
          district: "",
          country: "",
          postalCode: "",
        },
      },
      PaymentType: "Wire",
      offchain: {
        subnetcchain:
          sessionStorage.getItem("subnetaccaddress") == ""
            ? ""
            : sessionStorage.getItem("subnetaccaddress"),
      },
      userrole: sessionStorage.getItem("userrole"),
      component: sessionStorage.getItem("component"),
      token: sessionStorage.getItem("token"),
      UserId: sessionStorage.getItem("userid"),
      formLoader: false,
      formLoaderOff: false,
      display: sessionStorage.getItem("subnetaccaddress"),
      screenloader: false,
    };
  }

  blockInvalidChar = (e) => {
    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();
  };

  handleClicks = () => {
    console.log("hello we have clicked the button");
    this.props.history.push({
      pathname: this.state.component,
    });
  };

  SavePayOuts = (e) => {
    e.preventDefault();
    this.SavePayOut();
  };
  OffChain = (e) => {
    e.preventDefault();
    this.OffChainAPI();
  };

  SavePayOut = async () => {
    let newData;
    var data = this.state.payInsDetails;
    data.subnetWalletAdd = this.state.payInsDetails.userWalletAdd;
    newData = {
      userid: this.state.UserId,
      ...data,
      ...this.state.PayOutDeets,
      AccountDetails: this.state.payOutsDetails,
      token: this.state.token,
    };
    console.log("newdata", newData);
    this.setState({ formLoader: true });
    const APIResponse = await SavePaymentSettings(newData);

    if (APIResponse.status === 200) {
      const message = "Payment Setting Save Success";
      this.props.enqueueSnackbar(message, {
        variant: "info",
        autoHideDuration: 3000,
      });
      this.setState({ formLoader: false });
    } else {
      const message = "Couldn't fetch the record";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
      this.setState({ formLoader: false });
    }
  };
  OffChainAPI = async () => {
    let newData;
    newData = {
      userid: this.state.UserId,
      PaymentType: this.state.PaymentType,
      ...this.state.offchain,
      AccountDetails: this.state.offline,
      token: this.state.token,
    };
    console.log("newdata", newData);
    this.setState({ formLoaderOff: true });
    const APIResponse = await savebankdetailsoffchain(newData);

    if (APIResponse.status === 200) {
      const message = "Bank Details Save Success";
      this.props.enqueueSnackbar(message, {
        variant: "info",
        autoHideDuration: 3000,
      });
      this.getuserbyid()
      this.setState({ formLoaderOff: false });
    } else {
      const message = "Couldn't fetch the record";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
      this.setState({ formLoaderOff: false });
    }
  };
  getuserbyid = async () => {
    this.setState({screenloader:true})
    var data = {}
    data.userid=this.state.UserId
    data.token=this.state.token
    console.log('formdata',data)
    const APIResponse = await getuserbyid(data)
  
    if (APIResponse.status === 200) {
      this.setState({screenloader:false})
      sessionStorage.setItem("subnetaccaddress",APIResponse.data.UserAccAddress)
      this.setState({ payInsDetails: {
        userWalletAdd:
          sessionStorage.getItem("subnetaccaddress") == ""
            ? ""
            : sessionStorage.getItem("subnetaccaddress"),
        subnetWalletAdd:
          sessionStorage.getItem("subnetaccaddress") == ""
            ? ""
            : sessionStorage.getItem("subnetaccaddress"),
      }, display: sessionStorage.getItem("subnetaccaddress"),offchain: {
        subnetcchain:
          sessionStorage.getItem("subnetaccaddress") == ""
            ? ""
            : sessionStorage.getItem("subnetaccaddress"),
      }})
    } else {
        this.setState({screenloader:false})
      const message = "Couldn't fetch the record";
      this.props.enqueueSnackbar(message, {
        variant: 'error',
        autoHideDuration: 3000,
      });
    }
  };
  async componentDidMount() {
    this.getuserbyid()
  }
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
              <div className="page-content-is">
                <div className="row1">
                  <div className="col-12 col-sm-6 col-md-8 d-flex justigy-content-center align-center hellocard">
                    <KeyboardBackspaceIcon
                      onClick={this.handleClicks}
                      className="left-arrow-muis1 left-arrow-servicer"
                    ></KeyboardBackspaceIcon>
                    <h3 className="headerdashboard">Payment Settings</h3>
                  </div>
                </div>
                <form onSubmit={this.OffChain}>
                  <div className="servicer-modal-acc">
                    <Accordion defaultExpanded={true}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <div className="editcontainer1">
                          <h5 className="headingpayment">Off-Chain</h5>
                        </div>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          <div className="paymentsetting">
                            <div className="col-12 col-sm-12 col-md-12 hellocardsave">
                              <div className="buttonsverified uw-deal-details-button-container">
                                <Button
                                  variant="contained"
                                  color="primary"
                                  type="submit"
                                  // onClick={this.SavePayOut}
                                >
                                  Save
                                  {this.state.formLoaderOff === true ? (
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
                            <div className="ps_page-in-out-main-container">
                              <div className="ps_page-left-container">
                                <div className="ps_outer-container">
                                  <div className="ps-inner-bottom-contianer">
                                    <div className="input-container">
                                      <label className="label">
                                        Payment Type
                                      </label>
                                      <input
                                        required
                                        placeholder="Wire"
                                        className="input"
                                        type="text"
                                        value={this.state.PaymentType}
                                        disabled
                                        // onChange={(e) => {
                                        //   this.setState({
                                        //     PayOutDeets: {
                                        //       ...this.state.PayOutDeets,
                                        //       PayOutPaymentType: e.target.value,
                                        //     },
                                        //   });
                                        // }}
                                        // value={
                                        //   this.state.PayOutDeets.PayOutPaymentType
                                        // }
                                        // required
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="ps_outer-container">
                                  <div className="ps_inner-heading-container">
                                    <h3>Bank Details</h3>
                                  </div>
                                  <div className="ps-inner-bottom-contianer">
                                    <div>
                                      {/* Beneficiery name */}
                                      <div className="input-container">
                                        <label className="label">
                                          Beneficiary Name
                                        </label>
                                        <input
                                          required
                                          placeholder="Type here"
                                          className="input"
                                          type="text"
                                          onChange={(e) => {
                                            this.setState({
                                              offline: {
                                                ...this.state.offline,
                                                beneficiaryName: e.target.value,
                                              },
                                            });
                                          }}
                                          value={
                                            this.state.offline.beneficiaryName
                                          }
                                          // required
                                        />
                                      </div>

                                      {/* Account Number */}
                                      <div className="input-container">
                                        <label className="label">
                                          Account Number
                                        </label>
                                        <input
                                          required
                                          onKeyDown={this.blockInvalidChar}
                                          placeholder="Type here"
                                          className="input"
                                          type="number"
                                          onChange={(e) => {
                                            this.setState({
                                              offline: {
                                                ...this.state.offline,
                                                accountNumber: e.target.value,
                                              },
                                            });
                                          }}
                                          value={
                                            this.state.offline.accountNumber
                                          }
                                          // required
                                        />
                                      </div>

                                      {/* Routing Number */}
                                      <div className="input-container">
                                        <label className="label">
                                          Routing Number
                                        </label>
                                        <input
                                          required
                                          onKeyDown={this.blockInvalidChar}
                                          placeholder="Type here"
                                          className="input"
                                          type="number"
                                          onChange={(e) => {
                                            this.setState({
                                              offline: {
                                                ...this.state.offline,
                                                routingNumber: e.target.value,
                                              },
                                            });
                                          }}
                                          value={
                                            this.state.offline.routingNumber
                                          }
                                          // required
                                        />
                                      </div>
                                      {/* IBAN*/}
                                      <div className="input-container">
                                      <label className="label">IBAN (if applicable)</label>
                                        <input
                                          placeholder="Type here"
                                          className="input"
                                          type="text"
                                          onChange={(e) => {
                                            this.setState({
                                              offline: {
                                                ...this.state.offline,
                                                iban: e.target.value,
                                              },
                                            });
                                          }}
                                          value={this.state.offline.iban}
                                          // required
                                        />
                                      </div>
                                      {/* Billing Name */}
                                      <div className="input-container">
                                        <label className="label">
                                          Billing Name
                                        </label>
                                        <input
                                          required
                                          placeholder="Type here"
                                          className="input"
                                          type="text"
                                          onChange={(e) => {
                                            this.setState({
                                              offline: {
                                                ...this.state.offline,
                                                billingDetails: {
                                                  ...this.state.offline
                                                    .billingDetails,
                                                  name: e.target?.value,
                                                },
                                              },
                                            });
                                          }}
                                          value={
                                            this.state.offline?.billingDetails
                                              ?.name
                                          }
                                          // required
                                        />
                                      </div>

                                      {/* Billing Add Line 1 */}
                                      <div className="input-container">
                                        <label className="label">
                                          Billing Address Line 1
                                        </label>
                                        <input
                                          required
                                          placeholder="Type here"
                                          className="input"
                                          type="text"
                                          onChange={(e) => {
                                            this.setState({
                                              offline: {
                                                ...this.state.offline,
                                                billingDetails: {
                                                  ...this.state.offline
                                                    .billingDetails,
                                                  line1: e.target?.value,
                                                },
                                              },
                                            });
                                          }}
                                          value={
                                            this.state.offline?.billingDetails
                                              ?.line1
                                          }
                                          // required
                                        />
                                      </div>

                                      {/* Billing Address Line 2 */}
                                      <div className="input-container">
                                        <label className="label">
                                          Billing Address Line 2
                                        </label>
                                        <input
                                          required
                                          placeholder="Type here"
                                          className="input"
                                          type="text"
                                          onChange={(e) => {
                                            this.setState({
                                              offline: {
                                                ...this.state.offline,
                                                billingDetails: {
                                                  ...this.state.offline
                                                    .billingDetails,
                                                  line2: e.target?.value,
                                                },
                                              },
                                            });
                                          }}
                                          value={
                                            this.state.offline?.billingDetails
                                              ?.line2
                                          }
                                          // required
                                        />
                                      </div>

                                      {/* Billing City */}
                                      <div className="input-container">
                                        <label className="label">
                                          Billing City
                                        </label>
                                        <input
                                          required
                                          placeholder="Type here"
                                          className="input"
                                          type="text"
                                          onChange={(e) => {
                                            this.setState({
                                              offline: {
                                                ...this.state.offline,
                                                billingDetails: {
                                                  ...this.state.offline
                                                    .billingDetails,
                                                  city: e.target?.value,
                                                },
                                              },
                                            });
                                          }}
                                          value={
                                            this.state.offline?.billingDetails
                                              ?.city
                                          }
                                          // required
                                        />
                                      </div>

                                      {/* Billing District */}
                                      <div className="input-container">
                                        <label className="label">
                                        Billing State/District
                                        </label>
                                        <input
                                          required
                                          placeholder="Type here"
                                          className="input"
                                          type="text"
                                          onChange={(e) => {
                                            this.setState({
                                              offline: {
                                                ...this.state.offline,
                                                billingDetails: {
                                                  ...this.state.offline
                                                    .billingDetails,
                                                  district: e.target?.value,
                                                },
                                              },
                                            });
                                          }}
                                          value={
                                            this.state.offline?.billingDetails
                                              ?.district
                                          }
                                          // required
                                        />
                                      </div>
                                      {/* Billing Country */}
                                      <div className="input-container">
                                        <label className="label">
                                          Billing Country Code
                                        </label>
                                        <input
                                          required
                                          placeholder="Type here"
                                          className="input"
                                          type="number"
                                          onKeyDown={this.blockInvalidChar}
                                          onChange={(e) => {
                                            this.setState({
                                              offline: {
                                                ...this.state.offline,
                                                billingDetails: {
                                                  ...this.state.offline
                                                    .billingDetails,
                                                  country: e.target?.value,
                                                },
                                              },
                                            });
                                          }}
                                          value={
                                            this.state.offline?.billingDetails
                                              ?.country
                                          }
                                          // required
                                        />
                                      </div>

                                      {/* Billing Postalcode */}
                                      <div className="input-container">
                                        <label className="label">
                                        Billing Postal Code
                                        </label>
                                        <input
                                          required
                                          onKeyDown={this.blockInvalidChar}
                                          placeholder="Type here"
                                          className="input"
                                          type="number"
                                          onChange={(e) => {
                                            this.setState({
                                              offline: {
                                                ...this.state.offline,
                                                billingDetails: {
                                                  ...this.state.offline
                                                    .billingDetails,
                                                  postalCode: e.target?.value,
                                                },
                                              },
                                            });
                                          }}
                                          value={
                                            this.state.offline?.billingDetails
                                              ?.postalCode
                                          }
                                          // required
                                        />
                                      </div>

                                      {/* Bank Name */}
                                      <div className="input-container">
                                        <label className="label">
                                          Bank Name
                                        </label>
                                        <input
                                          required
                                          placeholder="Type here"
                                          className="input"
                                          type="text"
                                          onChange={(e) => {
                                            this.setState({
                                              offline: {
                                                ...this.state.offline,
                                                bankAddress: {
                                                  ...this.state.offline
                                                    .bankAddress,
                                                  bankName: e.target?.value,
                                                },
                                              },
                                            });
                                          }}
                                          value={
                                            this.state.offline?.bankAddress
                                              ?.bankName
                                          }
                                          // required
                                        />
                                      </div>

                                      {/* Bank Addres Line 1 */}
                                      <div className="input-container">
                                        <label className="label">
                                          Bank Address Line 1
                                        </label>
                                        <input
                                          placeholder="Type here"
                                          className="input"
                                          type="text"
                                          onChange={(e) => {
                                            this.setState({
                                              offline: {
                                                ...this.state.offline,
                                                bankAddress: {
                                                  ...this.state.offline
                                                    .bankAddress,
                                                  line1: e.target?.value,
                                                },
                                              },
                                            });
                                          }}
                                          value={
                                            this.state.offline?.bankAddress
                                              ?.line1
                                          }
                                          // required
                                        />
                                      </div>

                                      {/* Bank Addres Line 2 */}
                                      <div className="input-container">
                                        <label className="label">
                                          Bank Address Line 2
                                        </label>
                                        <input
                                          placeholder="Type here"
                                          className="input"
                                          type="text"
                                          onChange={(e) => {
                                            this.setState({
                                              offline: {
                                                ...this.state.offline,
                                                bankAddress: {
                                                  ...this.state.offline
                                                    .bankAddress,
                                                  line2: e.target?.value,
                                                },
                                              },
                                            });
                                          }}
                                          value={
                                            this.state.offline?.bankAddress
                                              ?.line2
                                          }
                                        />
                                      </div>

                                      {/* Bank Address City */}
                                      <div className="input-container">
                                        <label className="label">
                                          Bank Address City
                                        </label>
                                        <input
                                          placeholder="Type here"
                                          className="input"
                                          type="text"
                                          onChange={(e) => {
                                            this.setState({
                                              offline: {
                                                ...this.state.offline,
                                                bankAddress: {
                                                  ...this.state.offline
                                                    .bankAddress,
                                                  city: e.target?.value,
                                                },
                                              },
                                            });
                                          }}
                                          value={
                                            this.state.offline?.bankAddress
                                              ?.city
                                          }
                                          // required
                                        />
                                      </div>

                                      {/* Bank Address District */}
                                      <div className="input-container">
                                        <label className="label">
                                          Bank Address District/State
                                        </label>
                                        <input
                                          placeholder="Type here"
                                          className="input"
                                          type="text"
                                          onChange={(e) => {
                                            this.setState({
                                              offline: {
                                                ...this.state.offline,
                                                bankAddress: {
                                                  ...this.state.offline
                                                    .bankAddress,
                                                  district: e.target?.value,
                                                },
                                              },
                                            });
                                          }}
                                          value={
                                            this.state.offline?.bankAddress
                                              ?.district
                                          }
                                          // required
                                        />
                                      </div>

                                      {/* Bank Address Country Code */}
                                      <div className="input-container">
                                        <label className="label">
                                          Bank Address Country Code{" "}
                                        </label>
                                        <input
                                          required
                                          placeholder="Type here"
                                          className="input"
                                          onKeyDown={this.blockInvalidChar}
                                          type="number"
                                          onChange={(e) => {
                                            this.setState({
                                              offline: {
                                                ...this.state.offline,
                                                bankAddress: {
                                                  ...this.state.offline
                                                    .bankAddress,
                                                  country: e.target?.value,
                                                },
                                              },
                                            });
                                          }}
                                          value={
                                            this.state.offline?.bankAddress
                                              ?.country
                                          }
                                          // required
                                        />
                                      </div>
                                      {/* Bank PostalCode */}
                                      <div className="input-container">
                                        <label className="label">
                                        Bank Postal Code
                                        </label>
                                        <input
                                          placeholder="Type here"
                                          className="input"
                                          onKeyDown={this.blockInvalidChar}
                                          type="number"
                                          onChange={(e) => {
                                            this.setState({
                                              offline: {
                                                ...this.state.offline,
                                                bankAddress: {
                                                  ...this.state.offline
                                                    .bankAddress,
                                                  postalCode: e.target?.value,
                                                },
                                              },
                                            });
                                          }}
                                          value={
                                            this.state.offline?.bankAddress
                                              ?.postalCode
                                          }
                                          // required
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="ps_page-right-container">
                                <div className="ps_outer-container">
                                  <div className="ps-inner-bottom-contianer">
                                    <div className="input-container">
                                      <label className="label">
                                        Subnet Wallet Address
                                      </label>
                                      <input
                                        required
                                        placeholder="Type Here"
                                        className="input"
                                        type="text"
                                        onChange={(e) => {
                                          this.setState({
                                            offchain: {
                                              ...this.state.subnetcchain,
                                              subnetcchain: e.target.value,
                                            },
                                          });
                                        }}
                                        value={this.state.offchain.subnetcchain}
                                      />
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
                </form>
                <form onSubmit={this.SavePayOuts}>
                  <div className="servicer-modal-acc">
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <div className="editcontainer1">
                          <h5 className="headingpayment">On-Chain</h5>
                        </div>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          <div className="paymentsetting">
                            <div className="col-12 col-sm-12 col-md-12 hellocardsave">
                              <div className="buttonsverified uw-deal-details-button-container">
                                <Button
                                  variant="contained"
                                  color="primary"
                                  type="submit"
                                  // onClick={this.SavePayOut}
                                >
                                  Save
                                  {this.state.formLoader === true ? (
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
                            <div className="ps_page-in-out-main-container">
                              <div className="ps_page-left-container">
                                <div className="ps_outer-container">
                                  <div className="ps_inner-heading-container">
                                    <h3>Pay-Ins</h3>
                                  </div>

                                  <div className="ps-inner-bottom-contianer">
                                    <p>Manage Pay-Ins via Circle?</p>
                                    <div className="pay-ins-radio-container">
                                      <div className="flex-radio1">
                                        <label className="label-radio-container">
                                          <input
                                            id="pay-ins12"
                                            type="radio"
                                            onChange={() => {
                                              console.log(
                                                this.state.payInsDetails
                                                  .PayInsViaCircle
                                              );
                                              this.setState({
                                                payInsDetails: {
                                                  ...this.state.payInsDetails,
                                                  PayInsViaCircle: "true",
                                                },
                                              });
                                            }}
                                            value={"true"}
                                            checked={
                                              this.state.payInsDetails
                                                .PayInsViaCircle
                                            }
                                          />
                                          <span className="checkmark"></span>
                                          Yes
                                        </label>
                                      </div>

                                      <div className="flex-radio1">
                                        <label className="label-radio-container">
                                          <input
                                            disabled
                                            id="pay-ins"
                                            type="radio"
                                            onChange={() => {
                                              console.log(
                                                this.state.payInsDetails
                                                  .PayInsViaCircle
                                              );
                                              this.setState({
                                                payInsDetails: {
                                                  ...this.state.payInsDetails,
                                                  PayInsViaCircle: "false",
                                                },
                                              });
                                            }}
                                            value={"false"}
                                            checked={
                                              !this.state.payInsDetails
                                                .PayInsViaCircle
                                            }
                                          />
                                          <span className="checkmark"></span>
                                          No
                                        </label>
                                      </div>
                                    </div>

                                    {this.state.payInsDetails.PayInsViaCircle ==
                                    "true" ? (
                                      <div>
                                        <div className="input-container">
                                          <label className="label">
                                            Payment Type
                                          </label>
                                          <input
                                            required
                                            placeholder="Wire"
                                            className="input"
                                            type="text"
                                            value="Wire"
                                            disabled
                                            // onChange={(e) => {
                                            //   this.setState({
                                            //     payInsDetails: {
                                            //       ...this.state.payInsDetails,
                                            //       PaymentType: e.target.value,
                                            //     },
                                            //   });
                                            // }}
                                            // value={
                                            //   this.state.payInsDetails.PaymentType
                                            // }
                                            // required
                                          />
                                        </div>
                                        <p>
                                          Cicrle's wire instructions will be
                                          provided when required
                                        </p>
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                                <div className="ps_outer-container">
                                  <div className="ps_inner-heading-container">
                                    <h3>Pay-Outs</h3>
                                  </div>
                                  <div className="ps-inner-bottom-contianer">
                                    <p>Manage Pay-Outs via Circle?</p>
                                    <div className="pay-ins-radio-container">
                                      <div className="flex-radio1">
                                        <label className="label-radio-container">
                                          <input
                                            id="pay-ins123"
                                            type="radio"
                                            onChange={() => {
                                              this.setState({
                                                PayOutDeets: {
                                                  ...this.state.PayOutDeets,
                                                  PayoutsViaCircle: "true",
                                                },
                                              });
                                            }}
                                            value={"true"}
                                            checked={
                                              this.state.PayOutDeets
                                                .PayoutsViaCircle
                                            }
                                          />
                                          <span className="checkmark"></span>
                                          Yes
                                        </label>
                                      </div>

                                      <div className="flex-radio1">
                                        <label className="label-radio-container">
                                          <input
                                            disabled
                                            id="pay-ins1234"
                                            type="radio"
                                            onChange={() => {
                                              this.setState({
                                                PayOutDeets: {
                                                  ...this.state.PayOutDeets,
                                                  PayoutsViaCircle: "false",
                                                },
                                              });
                                            }}
                                            value={"false"}
                                            checked={
                                              !this.state.PayOutDeets
                                                .PayoutsViaCircle
                                            }
                                          />
                                          <span className="checkmark"></span>
                                          No
                                        </label>
                                      </div>
                                    </div>

                                    {this.state.PayOutDeets.PayoutsViaCircle ==
                                    "true" ? (
                                      <div>
                                        <div className="input-container">
                                          <label className="label">
                                            Payment Type
                                          </label>
                                          <input
                                            required
                                            placeholder="Wire"
                                            className="input"
                                            type="text"
                                            value="Wire"
                                            disabled
                                            // onChange={(e) => {
                                            //   this.setState({
                                            //     PayOutDeets: {
                                            //       ...this.state.PayOutDeets,
                                            //       PayOutPaymentType: e.target.value,
                                            //     },
                                            //   });
                                            // }}
                                            // value={
                                            //   this.state.PayOutDeets.PayOutPaymentType
                                            // }
                                            // required
                                          />
                                        </div>
                                        <p>
                                          Cicrle's wire instructions will be
                                          provided when required
                                        </p>
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="ps_page-right-container">
                                <div className="ps_outer-container">
                                  <div className="ps_inner-heading-container">
                                    <h3>Wallets</h3>
                                  </div>
                                  <div className="ps-inner-bottom-contianer">
                                    {/* C-Chain USDC Wallet Address */}
                                    <div className="input-container">
                                      <label className="label">
                                        Avalanche C-Chain Address
                                      </label>
                                      <input
                                        required
                                        disabled={
                                          this.state.display == ""
                                            ? false
                                            : true
                                        }
                                        placeholder="Type here"
                                        className="input"
                                        type="text"
                                        onChange={(e) => {
                                          this.setState({
                                            payInsDetails: {
                                              ...this.state.payInsDetails,
                                              userWalletAdd: e.target.value,
                                            },
                                          });
                                        }}
                                        value={
                                          this.state.payInsDetails.userWalletAdd
                                        }
                                        // required
                                      />
                                    </div>

                                    {/* C-Chain USDC Wallet Address */}
                                    <div className="input-container">
                                      <label className="label">
                                        Intain Markets Subnet Wallet Address
                                      </label>
                                      <input
                                        required
                                        disabled
                                        placeholder="Type here"
                                        className="input"
                                        type="text"
                                        onChange={(e) => {
                                          this.setState({
                                            payInsDetails: {
                                              ...this.state.payInsDetails,
                                              userWalletAdd: e.target.value,
                                            },
                                          });
                                        }}
                                        value={
                                          this.state.payInsDetails.userWalletAdd
                                        }
                                        // required
                                      />
                                    </div>

                                    {/* <div className="wallet-btn-container">
      <Button
        variant="contained"
        color="primary"
        type="button"
        onClick={this.SavePayIn}

      >
        Save
    </Button>
    </div> */}
                                  </div>
                                </div>

                                <div className="ps_outer-container">
                                  <div className="ps_inner-heading-container">
                                    <h3>Bank Details</h3>
                                  </div>
                                  <div className="ps-inner-bottom-contianer">
                                    <div>
                                      {/* Beneficiery name */}
                                      <div className="input-container">
                                        <label className="label">
                                          Beneficiary Name
                                        </label>
                                        <input
                                          required
                                          placeholder="Type here"
                                          className="input"
                                          type="text"
                                          onChange={(e) => {
                                            this.setState({
                                              payOutsDetails: {
                                                ...this.state.payOutsDetails,
                                                beneficiaryName: e.target.value,
                                              },
                                            });
                                          }}
                                          value={
                                            this.state.payOutsDetails
                                              .beneficiaryName
                                          }
                                          // required
                                        />
                                      </div>

                                      {/* Account Number */}
                                      <div className="input-container">
                                        <label className="label">
                                          Account Number
                                        </label>
                                        <input
                                          required
                                          onKeyDown={this.blockInvalidChar}
                                          placeholder="Type here"
                                          className="input"
                                          type="number"
                                          onChange={(e) => {
                                            this.setState({
                                              payOutsDetails: {
                                                ...this.state.payOutsDetails,
                                                accountNumber: e.target.value,
                                              },
                                            });
                                          }}
                                          value={
                                            this.state.payOutsDetails
                                              .accountNumber
                                          }
                                          // required
                                        />
                                      </div>

                                      {/* Routing Number */}
                                      <div className="input-container">
                                        <label className="label">
                                          Routing Number
                                        </label>
                                        <input
                                          required
                                          onKeyDown={this.blockInvalidChar}
                                          placeholder="Type here"
                                          className="input"
                                          type="number"
                                          onChange={(e) => {
                                            this.setState({
                                              payOutsDetails: {
                                                ...this.state.payOutsDetails,
                                                routingNumber: e.target.value,
                                              },
                                            });
                                          }}
                                          value={
                                            this.state.payOutsDetails
                                              .routingNumber
                                          }
                                          // required
                                        />
                                      </div>
                                      {/* IBAN*/}
                                      <div className="input-container">
                                        <label className="label">IBAN (if applicable)</label>
                                        <input
                                          placeholder="Type here"
                                          className="input"
                                          type="text"
                                          onChange={(e) => {
                                            this.setState({
                                              payOutsDetails: {
                                                ...this.state.payOutsDetails,
                                                iban: e.target.value,
                                              },
                                            });
                                          }}
                                          value={this.state.payOutsDetails.iban}
                                          // required
                                        />
                                      </div>
                                      {/* Billing Name */}
                                      <div className="input-container">
                                        <label className="label">
                                          Billing Name
                                        </label>
                                        <input
                                          required
                                          placeholder="Type here"
                                          className="input"
                                          type="text"
                                          onChange={(e) => {
                                            this.setState({
                                              payOutsDetails: {
                                                ...this.state.payOutsDetails,
                                                billingDetails: {
                                                  ...this.state.payOutsDetails
                                                    .billingDetails,
                                                  name: e.target?.value,
                                                },
                                              },
                                            });
                                          }}
                                          value={
                                            this.state.payOutsDetails
                                              ?.billingDetails?.name
                                          }
                                          // required
                                        />
                                      </div>

                                      {/* Billing Add Line 1 */}
                                      <div className="input-container">
                                        <label className="label">
                                          Billing Address Line 1
                                        </label>
                                        <input
                                          required
                                          placeholder="Type here"
                                          className="input"
                                          type="text"
                                          onChange={(e) => {
                                            this.setState({
                                              payOutsDetails: {
                                                ...this.state.payOutsDetails,
                                                billingDetails: {
                                                  ...this.state.payOutsDetails
                                                    .billingDetails,
                                                  line1: e.target?.value,
                                                },
                                              },
                                            });
                                          }}
                                          value={
                                            this.state.payOutsDetails
                                              ?.billingDetails?.line1
                                          }
                                          // required
                                        />
                                      </div>

                                      {/* Billing Address Line 2 */}
                                      <div className="input-container">
                                        <label className="label">
                                          Billing Address Line 2
                                        </label>
                                        <input
                                          required
                                          placeholder="Type here"
                                          className="input"
                                          type="text"
                                          onChange={(e) => {
                                            this.setState({
                                              payOutsDetails: {
                                                ...this.state.payOutsDetails,
                                                billingDetails: {
                                                  ...this.state.payOutsDetails
                                                    .billingDetails,
                                                  line2: e.target?.value,
                                                },
                                              },
                                            });
                                          }}
                                          value={
                                            this.state.payOutsDetails
                                              ?.billingDetails?.line2
                                          }
                                          // required
                                        />
                                      </div>

                                      {/* Billing City */}
                                      <div className="input-container">
                                        <label className="label">
                                          Billing City
                                        </label>
                                        <input
                                          required
                                          placeholder="Type here"
                                          className="input"
                                          type="text"
                                          onChange={(e) => {
                                            this.setState({
                                              payOutsDetails: {
                                                ...this.state.payOutsDetails,
                                                billingDetails: {
                                                  ...this.state.payOutsDetails
                                                    .billingDetails,
                                                  city: e.target?.value,
                                                },
                                              },
                                            });
                                          }}
                                          value={
                                            this.state.payOutsDetails
                                              ?.billingDetails?.city
                                          }
                                          // required
                                        />
                                      </div>

                                      {/* Billing District */}
                                      <div className="input-container">
                                        <label className="label">
                                        Billing State/District
                                        </label>
                                        <input
                                          required
                                          placeholder="Type here"
                                          className="input"
                                          type="text"
                                          onChange={(e) => {
                                            this.setState({
                                              payOutsDetails: {
                                                ...this.state.payOutsDetails,
                                                billingDetails: {
                                                  ...this.state.payOutsDetails
                                                    .billingDetails,
                                                  district: e.target?.value,
                                                },
                                              },
                                            });
                                          }}
                                          value={
                                            this.state.payOutsDetails
                                              ?.billingDetails?.district
                                          }
                                          // required
                                        />
                                      </div>
                                      {/* Billing Country */}
                                      <div className="input-container">
                                        <label className="label">
                                          Billing Country Code
                                        </label>
                                        <input
                                          required
                                          placeholder="Type here"
                                          className="input"
                                          type="number"
                                          onKeyDown={this.blockInvalidChar}
                                          onChange={(e) => {
                                            this.setState({
                                              payOutsDetails: {
                                                ...this.state.payOutsDetails,
                                                billingDetails: {
                                                  ...this.state.payOutsDetails
                                                    .billingDetails,
                                                  country: e.target?.value,
                                                },
                                              },
                                            });
                                          }}
                                          value={
                                            this.state.payOutsDetails
                                              ?.billingDetails?.country
                                          }
                                          // required
                                        />
                                      </div>

                                      {/* Billing Postalcode */}
                                      <div className="input-container">
                                        <label className="label">
                                        Billing Postal Code
                                        </label>
                                        <input
                                          required
                                          placeholder="Type here"
                                          className="input"
                                          type="number"
                                          onKeyDown={this.blockInvalidChar}
                                          onChange={(e) => {
                                            this.setState({
                                              payOutsDetails: {
                                                ...this.state.payOutsDetails,
                                                billingDetails: {
                                                  ...this.state.payOutsDetails
                                                    .billingDetails,
                                                  postalCode: e.target?.value,
                                                },
                                              },
                                            });
                                          }}
                                          value={
                                            this.state.payOutsDetails
                                              ?.billingDetails?.postalCode
                                          }
                                          // required
                                        />
                                      </div>

                                      {/* Bank Name */}
                                      <div className="input-container">
                                        <label className="label">
                                          Bank Name
                                        </label>
                                        <input
                                          required
                                          placeholder="Type here"
                                          className="input"
                                          type="text"
                                          onChange={(e) => {
                                            this.setState({
                                              payOutsDetails: {
                                                ...this.state.payOutsDetails,
                                                bankAddress: {
                                                  ...this.state.payOutsDetails
                                                    .bankAddress,
                                                  bankName: e.target?.value,
                                                },
                                              },
                                            });
                                          }}
                                          value={
                                            this.state.payOutsDetails
                                              ?.bankAddress?.bankName
                                          }
                                          // required
                                        />
                                      </div>

                                      {/* Bank Addres Line 1 */}
                                      <div className="input-container">
                                        <label className="label">
                                          Bank Address Line 1
                                        </label>
                                        <input
                                          placeholder="Type here"
                                          className="input"
                                          type="text"
                                          onChange={(e) => {
                                            this.setState({
                                              payOutsDetails: {
                                                ...this.state.payOutsDetails,
                                                bankAddress: {
                                                  ...this.state.payOutsDetails
                                                    .bankAddress,
                                                  line1: e.target?.value,
                                                },
                                              },
                                            });
                                          }}
                                          value={
                                            this.state.payOutsDetails
                                              ?.bankAddress?.line1
                                          }
                                          // required
                                        />
                                      </div>

                                      {/* Bank Addres Line 2 */}
                                      <div className="input-container">
                                        <label className="label">
                                          Bank Address Line 2
                                        </label>
                                        <input
                                          placeholder="Type here"
                                          className="input"
                                          type="text"
                                          onChange={(e) => {
                                            this.setState({
                                              payOutsDetails: {
                                                ...this.state.payOutsDetails,
                                                bankAddress: {
                                                  ...this.state.payOutsDetails
                                                    .bankAddress,
                                                  line2: e.target?.value,
                                                },
                                              },
                                            });
                                          }}
                                          value={
                                            this.state.payOutsDetails
                                              ?.bankAddress?.line2
                                          }
                                        />
                                      </div>

                                      {/* Bank Address City */}
                                      <div className="input-container">
                                        <label className="label">
                                          Bank Address City
                                        </label>
                                        <input
                                          placeholder="Type here"
                                          className="input"
                                          type="text"
                                          onChange={(e) => {
                                            this.setState({
                                              payOutsDetails: {
                                                ...this.state.payOutsDetails,
                                                bankAddress: {
                                                  ...this.state.payOutsDetails
                                                    .bankAddress,
                                                  city: e.target?.value,
                                                },
                                              },
                                            });
                                          }}
                                          value={
                                            this.state.payOutsDetails
                                              ?.bankAddress?.city
                                          }
                                          // required
                                        />
                                      </div>

                                      {/* Bank Address District */}
                                      <div className="input-container">
                                        <label className="label">
                                          Bank Address District/State
                                        </label>
                                        <input
                                          placeholder="Type here"
                                          className="input"
                                          type="text"
                                          onChange={(e) => {
                                            this.setState({
                                              payOutsDetails: {
                                                ...this.state.payOutsDetails,
                                                bankAddress: {
                                                  ...this.state.payOutsDetails
                                                    .bankAddress,
                                                  district: e.target?.value,
                                                },
                                              },
                                            });
                                          }}
                                          value={
                                            this.state.payOutsDetails
                                              ?.bankAddress?.district
                                          }
                                          // required
                                        />
                                      </div>

                                      {/* Bank Address Country Code */}
                                      <div className="input-container">
                                        <label className="label">
                                          Bank Address Country Code{" "}
                                        </label>
                                        <input
                                          required
                                          placeholder="Type here"
                                          className="input"
                                          onKeyDown={this.blockInvalidChar}
                                          type="number"
                                          onChange={(e) => {
                                            this.setState({
                                              payOutsDetails: {
                                                ...this.state.payOutsDetails,
                                                bankAddress: {
                                                  ...this.state.payOutsDetails
                                                    .bankAddress,
                                                  country: e.target?.value,
                                                },
                                              },
                                            });
                                          }}
                                          value={
                                            this.state.payOutsDetails
                                              ?.bankAddress?.country
                                          }
                                          // required
                                        />
                                      </div>
                                      {/* Bank PostalCode */}
                                      <div className="input-container">
                                        <label className="label">
                                        Bank Postal Code
                                        </label>
                                        <input
                                          placeholder="Type here"
                                          className="input"
                                          type="number"
                                          onKeyDown={this.blockInvalidChar}
                                          onChange={(e) => {
                                            this.setState({
                                              payOutsDetails: {
                                                ...this.state.payOutsDetails,
                                                bankAddress: {
                                                  ...this.state.payOutsDetails
                                                    .bankAddress,
                                                  postalCode: e.target?.value,
                                                },
                                              },
                                            });
                                          }}
                                          value={
                                            this.state.payOutsDetails
                                              ?.bankAddress?.postalCode
                                          }
                                          // required
                                        />
                                      </div>

                                      {/* <div className="wallet-btn-container">
        <Button
          variant="contained"
          color="primary"
          type="submit"               
          // onClick={this.SavePayOut}
        >
          Save
        </Button>
      </div> */}
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
                </form>
              </div>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withSnackbar(Payment);
