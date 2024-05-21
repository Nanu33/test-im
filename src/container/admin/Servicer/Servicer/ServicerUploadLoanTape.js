import React, { Component } from "react";
import Sidebar from "../../../../components/sidebar";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import Button from "@material-ui/core/Button";
import "react-input-range/lib/css/index.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import * as moment from "moment";
import { withSnackbar } from "notistack";
import { UploadLoanTape, SaveLoanProcessDate } from "../../../../servies/services";

class ServicerUploadLoanTape extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFullScreen: false,
      loading: false,
      activeInsights1: true,
      activeInsights2: false,
      activeInsights3: false,
      activeInsights4: false,
      activeInsights5: false,
      screendisplay: true,
      servicerPaymentDate: sessionStorage.getItem('paymentDate'),
      servicerDealName: sessionStorage.getItem('dealName'),
      detailsDate:
        this.props.location?.state?.detailsView === undefined
          ? sessionStorage.getItem("selectdate")
          : this.props.location?.state?.detailsView,
      file1: "",
      DealName:
        this.props.location?.state?.dealname === undefined
          ? sessionStorage.getItem("dealname")
          : this.props.location?.state?.dealname,
      ServicerName:
        this.props.location?.state?.servicer === undefined
          ? sessionStorage.getItem("Servicer")
          : this.props.location?.state?.servicer,
      servicerDashboardName:
        this.props.location?.state?.ServicerDashboardName === undefined
          ? sessionStorage.getItem("servicerdashboardname")
          : this.props.location?.state?.ServicerDashboardName,
      peers: sessionStorage.getItem("peer_insurer"),
      userid: sessionStorage.getItem('userid'),
      token: sessionStorage.getItem('token')
    };
    console.log("propssss", props)
  }

  handleOnChange1 = (e) => {
    this.setState({
      file1: e.target.files[0],
      filename1: e.target.files[0].name,
    });
    console.log("eeee", e.target.files[0].name);
    console.log("file1", e.target.files[0]);
  };


  handleClickUploadLoanTapes = () => {
    this.setState({
      activeInsights1: true,
      activeInsights2: false,
      activeInsights3: false,
      activeInsights4: false,
      activeInsights5: false,
    });
  };


  handleClickPreviewLoanTape = () => {
    this.setState({
      activeInsights1: false,
      activeInsights2: true,
      activeInsights3: false,
      activeInsights4: false,
      activeInsights5: false,
    });
    window.location.assign("/admin/previewloantapedetails");
  };
  handleClickMapFields = () => {
    this.setState({
      activeInsights1: false,
      activeInsights2: false,
      activeInsights3: true,
      activeInsights4: false,
      activeInsights5: false,
    });
    window.location.assign("/admin/mapfields");
  };
  handleClickPreviewMappedFields = () => {
    this.setState({
      activeInsights1: false,
      activeInsights2: false,
      activeInsights3: false,
      activeInsights4: true,
      activeInsights5: false,
    });
    window.location.assign("/admin/previewmapfields");
  };
  handleClickSummarize = () => {
    this.setState({
      activeInsights1: false,
      activeInsights2: false,
      activeInsights3: false,
      activeInsights4: false,
      activeInsights5: true,
    });
    window.location.assign("/admin/summarize");
  };


  goBackToDashBoard = () => {
    window.location.assign("/admin/servicer_deals")
  };

  onSubmit1 = (e) => {
    e.preventDefault();
    this.UploadLoanTape()
    // this.dealUploadLoanTape();
  };
  //  
  UploadLoanTape = async () => {
    const checkDate = this.state.paymentDate;
    const checkDealName =
      this.state.DealName === null
        ? this.state.servicerDealName
        : this.state.DealName;
    const checkServicerName =
      this.state.ServicerName === null
        ? this.state.servicerDashboardName
        : this.state.ServicerName;
    let x = moment(this.state.servicerPaymentDate)
      .subtract(1, "months")
      .format("MM/DD/YYYY")
      .toString();
    let month = x.slice(0, 2);
    let year = x.slice(6, 10);
    console.log("uplaodpooluw");
    const newdata = new FormData();
    newdata.append("DealName", this.state.servicerDealName);
    newdata.append("Month", month);
    newdata.append("Year", year);
    newdata.append("ServicerName", this.state.userid);
    newdata.append("filename", this.state.file1);
    console.log("newdata", newdata);
    this.setState({ formLoader: true });


    const APIResponse = await UploadLoanTape(newdata, this.state.token);
    if (APIResponse.status === 200) {
      console.log("upload--", APIResponse);
      if (APIResponse.data.isSuccess === true) {
        this.setState({ formLoader: true });
        // const message = APIResponse.data.result;
        // this.props.enqueueSnackbar(message, {
        //   variant: "info",
        //   autoHideDuration: 2000,
        // });
        this.SaveLoanProcessDate();
      } else {
        this.setState({ formLoader: false });
        const message = APIResponse.data.result;
        this.props.enqueueSnackbar(message, {
          variant: "error",
          autoHideDuration: 2000,
        });
      }
    } else {
      alert("Failed upload");
    }
  };
  SaveLoanProcessDate = async () => {
    const checkDate =
      this.state.detailsDate === null
        ? this.state.servicerPaymentDate
        : this.state.detailsDate;
    const checkDealName =
      this.state.DealName === null
        ? this.state.servicerDealName
        : this.state.DealName;
    const checkServicerName =
      this.state.ServicerName === null
        ? this.state.servicerDashboardName
        : this.state.ServicerName;
    let x = moment(this.state.servicerPaymentDate)
      .subtract(1, "months")
      .format("MM/DD/YYYY")
      .toString();
    let month = x.slice(0, 2);
    let year = x.slice(6, 10);
    var data = {};
    data.DealName = this.state.servicerDealName;
    data.Month = month;
    data.Year = year;
    data.ServicerName = this.state.userid;
    data.peers = this.state.peers;


    console.log("datata", data);
    this.setState({ formLoader: true });
    const APIResponse = await SaveLoanProcessDate(data, this.state.token);


    console.log("SaveMapping", APIResponse.data);
    if (APIResponse.status === 200) {
      this.setState({ formLoader: false });
      const message = "Deal Document Update Success";
      this.props.enqueueSnackbar(message, {
        variant: "info",
        autoHideDuration: 3000,
      });
      // this.props.history.push({
      //   pathname: "/admin/previewloantapedetails",
      //   state: { dealName: this.state.servicerDealName, month, year }
      // })
      window.location.assign("/admin/previewloantapedetails");
      // sessionStorage.setItem('dealName',[this.state.servicerDealName, month, year])
    } else {
      this.setState({ formLoader: false });
      const message = APIResponse.data.message;
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  componentDidMount() {
    // if (sessionStorage.getItem("user_name") === "Trustee") {
    //   sessionStorage.removeItem("selectservicerdate");
    //   sessionStorage.removeItem("servicerdealname");
    //   sessionStorage.removeItem("servicerdashboardname");
    //   sessionStorage.setItem(
    //     "selectdate",
    //     this.props.location?.state?.detailsView === undefined
    //       ? this.state.detailsDate
    //       : this.props.location?.state?.detailsView
    //   );
    //   sessionStorage.setItem(
    //     "dealname",
    //     this.props.location?.state?.dealname === undefined
    //       ? this.state.DealName
    //       : this.props.location?.state?.dealname
    //   );
    //   sessionStorage.setItem(
    //     "Servicer",
    //     this.props.location?.state?.servicer === undefined
    //       ? this.state.ServicerName
    //       : this.props.location?.state?.servicer
    //   );
    // } else {
    //   sessionStorage.removeItem("selectdate");
    //   sessionStorage.removeItem("dealname");
    //   sessionStorage.removeItem("Servicer");
    //   sessionStorage.setItem(
    //     "selectservicerdate",
    //     this.props.location?.state?.ServicerPaymentDate === undefined
    //       ? this.state.servicerPaymentDate
    //       : this.props.location?.state?.ServicerPaymentDate
    //   );
    //   sessionStorage.setItem(
    //     "servicerdealname",
    //     this.props.location?.state?.ServicerDealName === undefined
    //       ? this.state.servicerDealName
    //       : this.props.location?.state?.ServicerDealName
    //   );
    //   sessionStorage.setItem(
    //     "servicerdashboardname",
    //     this.props.location?.state?.ServicerDashboardName === undefined
    //       ? this.state.servicerDashboardName
    //       : this.props.location?.state?.ServicerDashboardName
    //   );
    // }
  }

  render() {
    const servicerDate = this.state.servicerPaymentDate;
    console.log("servicerDate", servicerDate, this.state.detailsDate);

    return (
      <div className="page">
        <Sidebar activeComponent={"ServicerDashboardDeals"} />
        <div className="content1">
          {this.state.screendisplay === true ? (
            <div className="page-contentofpool1">
              <div className="row1">
                <div className="col-12 col-sm-6 col-md-2 d-flex justigy-content-center align-center hellocard">
                  <KeyboardBackspaceIcon
                    onClick={() => this.goBackToDashBoard()}
                    className="left-arrow-muis1 left-arrow-servicer"
                  ></KeyboardBackspaceIcon>
                  <h3 className="headerdashboard">Servicer Details</h3>
                </div>
                <div className="col-12 col-sm-6 col-md-10 hellocard">

                  <div className="recurring_details">
                    <div>
                      <label className="dealInfo">Deal Name : </label>
                      <h6 className="dealInfo1">
                        {this.state.DealName === null
                          ? this.state.servicerDealName
                          : this.state.DealName}
                      </h6>
                    </div>
                    <div>
                      <label className="dealInfo">Payment Date : </label>
                      <h6 className="dealInfo1">
                        {this.state.detailsDate === null
                          ? this.state.servicerPaymentDate
                          : this.state.detailsDate}
                      </h6>
                    </div>
                  </div>
                </div>
              </div>


              <div className="row row1">
                <div>
                  <div className="tablechangebuttonloans">
                    <button
                      type="button"
                      onClick={() => this.handleClickUploadLoanTapes()}
                      className={
                        this.state.activeInsights1 == true
                          ? "issuerDashboard-table-top-button-insights-active"
                          : "issuerDashboard-table-top-button-insights"
                      }
                    >
                      Upload Loan Tapes
                    </button>


                    <button
                      type="button"
                      onClick={() => this.handleClickPreviewLoanTape()}
                      className={
                        this.state.activeInsights2 == true
                          ? "issuerDashboard-table-top-button-rejected-active"
                          : "issuerDashboard-table-top-button-rejected"
                      }
                    >
                      Preview Loan Tape
                    </button>
                    <button
                      type="button"
                      onClick={() => this.handleClickMapFields()}
                      className={
                        this.state.activeInsights3 == true
                          ? "issuerDashboard-table-top-button-workbench-active"
                          : "issuerDashboard-table-top-button-workbench"
                      }
                    >
                      Map Fields
                    </button>
                    <button
                      type="button"
                      onClick={() => this.handleClickPreviewMappedFields()}
                      className={
                        this.state.activeInsights4 == true
                          ? "issuerDashboard-table-top-button-rejected-active"
                          : "issuerDashboard-table-top-button-rejected"
                      }
                    >
                      Preview Map Fields
                    </button>
                    <button
                      type="button"
                      onClick={() => this.handleClickSummarize()}
                      className={
                        this.state.activeInsights5 == true
                          ? "issuerDashboard-table-top-button-rejected-active"
                          : "issuerDashboard-table-top-button-rejected"
                      }
                    >
                      Summarize
                    </button>
                  </div>
                </div>
              </div>


              <div className="part2 servicer-modal-acc">
                <div className="borderclass">
                  <h5 className="headingpayment1-css">Loan Tape</h5>
                  <div className="">
                    <form
                      className="form-container-setup"
                      onSubmit={this.onSubmit1}
                    >
                      <div className="servicer-popup-inner-container-sr">
                        <h6 className="servicer-popup-inner-container-heading">
                          Upload Loan Tape
                        </h6>
                        <div className="kyc-card__button-container1">
                          <div>
                            <button
                              className="card__button"
                              style={{
                                position: "relative",
                              }}
                            >
                              <label
                                htmlFor="icon-button-file-id21"
                                className="upload-button-label1"
                              >
                                Select File
                              </label>
                              <input
                                required
                                id="icon-button-file-id21"
                                type="file"
                                accept=".csv,.xlsm, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                // style={{ display: "none" }}
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
                              {/* <button type="button" onClick={handleClickCross}>
                         x
                     </button> */}
                            </div>
                          )}
                        </div>
                        <div className="servicer-popup-upload-btn-contianer">
                          <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                          // onClick={this.RecurringsetupDateQuery}
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
                    </form>
                  </div>
                </div>
              </div>
              {/* <div className="modalshiftcontent">
                   <form className="form-container" onSubmit={this.onSubmit1}>


                   <div className="borderclass">
                     <h5 className="borderclassh5">Loan Tape</h5>
                     <h6 className="e1class">Upload Loan Tape</h6>
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
                           accept=".csv,.xlsm, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                          
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
                         <div className="row justify-content-end-loantape">
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
                   </div>
                   </form>


                 </div> */}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

export default withSnackbar(ServicerUploadLoanTape);
