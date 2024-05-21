/* eslint-disable require-jsdoc */
import React, { Component } from "react";
// import { connect } from 'react-redux';
import Sidebar from "../../../../components/sidebar";
import MUIDataTable from "mui-datatables";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Loader from "../../../../components/loader";
import Snackbar from "../../../../components/snackbar";
import LinearLoader from "../../../../components/loader/LinearLoader";
import axios from "axios";
import CloseIcon from "@material-ui/icons/Close";
import moment from "moment";
import { withSnackbar } from "notistack";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddIcon from "@material-ui/icons/Add";
import { withTheme } from "react-jsonschema-form";
import { Theme as MuiTheme } from "rjsf-material-ui";
import ReactModal from "react-modal";
import { customStylesautosmallmodal } from "../../../../components/customscripts/customscript";
import FormLoader from "../../../../components/loader/formLoader";
import {
  UpdateDealUW,
  downloadDealTemplate,
  PublishUW,
  getdealstatusbydealid,
  uploadPreclosingXl,
  DownloadPreclosingTemplate,
} from "../../../../servies/services";
import { FullscreenExit, TrainRounded } from "@material-ui/icons";
import {
  ThemeProvider,
  createTheme,
  MuiThemeProvider,
} from "@material-ui/core/styles";
import "react-input-range/lib/css/index.css";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

class UW_Tools extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRecords: [],
      eligibleloans: {},
      tableData: [],
      loading: false,
      getLoansLoader: false,
      screenloader: false,
      open: false,
      openPopup: false,
      selectedLoanId: [],
      searchText: "",
      rowsSelected: null,
      open1: false,
      open2: false,
      open3: false,
      file1: "",
      file2: "",
      UserId: sessionStorage.getItem("userid"),
      dealId: sessionStorage.getItem("dealId"),
      poolName: sessionStorage.getItem("poolname"),
      activeInsights1: true,
      activeInsights2: false,
      activeInsights3: false,
      showSearchBox: false,
      publishstatus: false,
      token: sessionStorage.getItem("token"),
    };
  }

  onOpenModal = () => {
    console.log("inside modal1");
    this.setState({ open1: true });
  };
  onCloseModal = () => {
    this.setState({ open1: false });
  };

  onOpenModal1 = () => {
    console.log("inside modal1");
    this.setState({ open2: true, file1: "" });
  };
  onCloseModal1 = () => {
    this.setState({ open2: false });
  };

  onOpenModal2 = () => {
    console.log("inside modal1");
    this.setState({ open3: true, file2: "" });
  };
  onCloseModal2 = () => {
    this.setState({ open3: false });
  };

  onSubmit1 = (e) => {
    e.preventDefault();
    this.UpdateDealUW();
  };

  onSubmit2 = (e) => {
    e.preventDefault();
    this.uploadPreclosingXl();
  };

  handleOnChange1 = (e) => {
    this.setState({
      file1: e.target.files[0],
      filename1: e.target.files[0].name,
    });
    console.log("eeee", e.target.files[0].name);
    console.log("file1", e.target.files[0]);
  };

  handleOnChange2 = (e) => {
    this.setState({
      file2: e.target.files[0],
      filename2: e.target.files[0].name,
    });
    console.log("eeee", e.target.files[0].name);
    console.log("file2", e.target.files[0]);
  };
  handleClicks = () => {
    console.log("hello we have clicked the button");
    // this.props.history.push({
    //   pathname: "/admin/uw_deals_details",
    // });
    window.location.assign("/admin/uw_deal_details");
  };
  downloadDealTemplate = async () => {
    const APIResponse = await downloadDealTemplate(this.state.token);
    const file_name = "Structuring Template" + ".xls";

    startDownload(APIResponse.data, file_name);
    function startDownload(file, fileName) {
      const url = window.URL.createObjectURL(new Blob([file]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    }
  };

  DownloadPreclosingTemplate = async () => {
    let data = {};
    data.poolid = this.state.dealId;
    data.token = this.state.token;
    const APIResponse = await DownloadPreclosingTemplate(data);
    const file_name = this.state.dealId + ".xls";
    startDownload(APIResponse.data, file_name);
    function startDownload(file, file_name) {
      const url = window.URL.createObjectURL(new Blob([file]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", file_name);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    }
  };

  UpdateDealUW = async () => {
    console.log("uplaodpooluw");
    const newdata = new FormData();
    newdata.append("filename", this.state.file1);
    newdata.append("dealid", this.state.dealId);
    newdata.append("underwriterid", this.state.UserId);
    console.log("newdata", newdata);
    this.setState({ formLoader: true });

    const APIResponse = await UpdateDealUW(newdata, this.state.token);

    if (APIResponse.status === 200) {
      console.log("upload--", APIResponse);
      if (APIResponse.data.success === true) {
        this.setState({ formLoader: false });
        const message = "Deal upload success";
        this.props.enqueueSnackbar(message, {
          variant: "info",
          autoHideDuration: 2000,
        });
        this.onCloseModal1();
      } else {
        this.setState({ formLoader: false });
        const message = "Something went wrong, please try again";
        this.props.enqueueSnackbar(message, {
          variant: "error",
          autoHideDuration: 2000,
        });
      }
    } else {
      alert("Failed upload");
    }
  };

  PublishUW = async () => {
    var data = {};

    data.dealid = this.state.dealId;
    data.status = "Awaiting Approval";
    console.log("datata", data);
    this.setState({ formLoader: true, publishstatus: true });
    data.token = this.state.token;
    const APIResponse = await PublishUW(data);

    if (APIResponse.status == 200) {
      this.setState({ formLoader: false, publishstatus: false });
      const message = "Deal Update Status Success";
      this.props.enqueueSnackbar(message, {
        variant: "info",
        autoHideDuration: 3000,
      });
      this.onCloseModal();
    } else {
      this.setState({ formLoader: false, publishstatus: false });
      const message = "Couldn't fetch the record";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  uploadPreclosingXl = async () => {
    console.log("uplaodpooluw");
    const newdata = new FormData();
    newdata.append("filename", this.state.file2);
    newdata.append("poolid", this.state.dealId);
    console.log("newdata", newdata);
    this.setState({ formLoader: true });

    const APIResponse = await uploadPreclosingXl(newdata, this.state.token);

    if (APIResponse.status === 200) {
      console.log("upload--", APIResponse);
      if (APIResponse.data.success === true) {
        this.setState({ formLoader: false });
        const message = APIResponse.data.message;
        this.props.enqueueSnackbar(message, {
          variant: "info",
          autoHideDuration: 2000,
        });
        this.onCloseModal2();
      } else {
        this.setState({ formLoader: false });
        const message = APIResponse.data.message;
        this.props.enqueueSnackbar(message, {
          variant: "error",
          autoHideDuration: 5000,
        });
      }
    } else {
      alert("Failed upload");
    }
  };

  async selectedpoolid(selected) {
    const arr = [];

    for (var i = 0; i < selected.length; i++) {
      var j = selected[i];
      let PoolID = this.state.tableData[j].dealid;
      arr.push(PoolID);
    }
    console.log("selected Loans", arr);
    sessionStorage.setItem("rundd", JSON.stringify(arr));
  }

  onchange = (e) => {
    this.setState({ searchText: e.target.value, searchType: true });
    console.log("search: e.target.value", e.target.value);
  };

  getdealstatusbydealid = async () => {
    var data = {};
    data.dealid = this.state.dealId;
    console.log("datata", data);
    this.setState({ screenloader: true });
    data.token = this.state.token;
    const APIResponse = await getdealstatusbydealid(data);

    if (APIResponse.status == 200) {
      this.setState({
        screenloader: false,
        dealstatus: APIResponse.data.status,
      });
    } else {
      this.setState({ screenloader: false });
      const message = "Couldn't fetch the record";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  async componentDidMount() {
    var component = window.location.pathname;
    sessionStorage.setItem("component", component);
    this.getdealstatusbydealid();
  }
  getMuiTheme = () =>
    createTheme({
      typography: {
        useNextVariants: true,
      },
      overrides: {
        MUIDataTable: {
          root: {
            border: "none !important",
          },
        },
        MUIDataTableBodyRow: {
          root: {
            "&:nth-child(even)": {
              backgroundColor: "#FAFAFA !important",
            },
            "&.Mui-selected": {
              backgroundColor: "white !important",
            },
          },
          hoverCursor: {
            cursor: "auto !important",
          },
        },
        MuiTableCell: {
          root: {
            fontFamily: "Mulish, sans-serif !important",
            padding: "20px",
            fontSize: "0.980rem !important",
          },
        },
        MUIDataTableBodyCell: {
          root: {
            fontFamily: "Mulish, sans-serif !important",
            fontWeight: "400 !important",
            fontSize: "15px !important",
            borderBottom: "none !important",
          },
        },
        MuiCircularProgress: {
          colorSecondary: {
            color: "#048c88 !important",
          },
        },
        MUIDataTableHeadCell: {
          root: {
            fontFamily: "Mulish, sans-serif !important",
            backgroundColor: "rgba(1, 142, 130, 0.1) !important",
            borderBottom: "none !important",
            paddingBottom: "5px !important",
            paddingTop: "5px !important",
            paddingLeft: "15px !important",
          },
          toolButton: {
            fontWeight: "600 !important",
            fontSize: "15px !important",
            backgroundColor: "none !important",
            padding: "none !important",
            marginLeft: "none !important",
            textTransform: "none !important",
            border: "none !important",
            borderRadius: "none !important",
          },
        },
        MUIDataTableToolbar: {
          root: {
            fontFamily: "Mulish, sans-serif !important",
            paddingLeft: "5px !important",
            paddingRight: "5px !important",
          },
          titleText: {
            fontFamily: "Mulish, sans-serif !important",
            fontSize: "28px",
            color: "#212121",
            fontWeight: "600",
            fontFamily: "arial",
            marginBottom: "20px",
            marginTop: "20px",
          },
          icon: {
            color: "#018E82",
            paddingRight: "14px !important",
            "&:hover": {
              color: "#018E82 !important",
            },
          },
          iconActive: {
            color: "#018E82 !important",
          },
        },
        MuiButton: {
          contained: {
            backgroundColor: "#FFC000 !important",
            padding: "5px 30px !important",
            marginLeft: "10px !important",
            textTransform: "none !important",
            border: "1.2px solid #212121 !important",
            borderRadius: "20px !important",
            boxShadow: "none !important",
          },
          outlined: {
            fontFamily: "Mulish, sans-serif !important",
            backgroundColor: "#fff !important",
            padding: "5px 30px !important",
            marginLeft: "10px !important",
            textTransform: "none !important",
            border: "1.2px solid #212121 !important",
            borderRadius: "20px !important",
            boxShadow: "none !important",
          },
          label: {
            fontSize: "15px !important",
            fontWeight: "600 !important",
            fontFamily: "Mulish, sans-serif !important",
          },
          textPrimary: {
            color: "#018E82 !important",
          },
        },
        MUIDataTablePagination: {
          tableCellContainer: {
            borderBottom: "none !important",
          },
          navContainer: {
            justifyContent: "center",
          },
          toolbar: {
            paddingLeft: "50px !important",
          },
        },
        MuiTableSortLabel: {
          icon: {
            color: "#018E82 !important",
          },
          active: {
            color: "#018E82 !important",
          },
        },
        MuiTablePagination: {
          caption: {
            color: "#8C8C8C",
            marginRight: `${
              this.state.tableData.length < 10 ? "-122" : "-132"
            }px`,
            fontSize: "0.90rem",
          },
        },
        MuiIconButton: {
          colorInherit: {
            color: "#018E82 !important",
            zIndex: "1000",
            marginRight: "60px",
            paddingLeft: "-25px",
          },
        },

        MUIDataTable: {
          paper: {
            boxShadow: "none !important",
          },
          responsiveBase: {
            border: "1px solid #212121 !important",
            borderRadius: "10px !important",
          },
        },
        MUIDataTableBody: {
          emptyTitle: {
            fontSize: "15px !important",
            fontFamily: "Mulish, sans-serif !important",
            color: "#8C8C8C !important",
          },
        },
      },
    });

  render() {
    const { classes } = this.props;
    const options = {
      customToolbar: () => {
        return (
          <button type="button" className="popupbutton1">
            Edit
          </button>
        );
      },
      filterType: "dropdown",
      filter: false,
      search: false,
      print: false,
      viewColumns: false,
      download: false,
      rowHover: false,
      selectableRowsOnClick: false,
      selectableRows: false,
      onRowClick: this.onRowClick,
      onRowsSelect: this.onRowsSelect,
      rowsSelected: this.state.rowsSelected,
      rowsPerPage: [10],
      rowsPerPageOptions: false,
      jumpToPage: false,
      pagination: TrainRounded,

      onRowsSelect: (rowsSelected, allRows) => {
        console.log("allRows", allRows);
        console.log("rowsSelected", rowsSelected);
        this.setState({ rowsSelected: allRows.map((row) => row.dataIndex) });
        const selected = allRows.map((row) => row.dataIndex);
        console.log("selected" + selected);
        this.selectedpoolid(selected);
      },

      searchText: this.state.searchText,
      searchPlaceholder: "Search",
      customSearch: (searchQuery, currentRow, columns) => {
        let isFound = false;
        currentRow.forEach((col) => {
          if (col.toString().indexOf(searchQuery) >= 0) {
            isFound = true;
          }
        });
        return isFound;
      },

      //
      loading: false,
      textLabels: {
        body: {
          noMatch:
            this.state.loading === true ? (
              <Loader msg={"Please wait, Loading Loan Data"} />
            ) : (
              'Add the data by clicking on the "Edit" button'
            ),
          toolTip: "Sort",
          columnHeaderTooltip: (column) => `Sort for ${column.label}`,
        },
        filter: {
          all: "All",
          title: "FILTERS",
          reset: "RESET",
        },

        selectedRows: {
          text: "row(s) selected",
          delete: "Delete",
          deleteAria: "Delete Selected Rows",
        },
        pagination: {
          next: "Next ",
          previous: "Previous",
          rowsPerPage: "",
          displayRows: "Of",
        },
      },
    };

    return (
      <React.Fragment>
        <div className="page">
          <Sidebar activeComponent={"UW_Dashboard_Pools"} />
          <div className="content1">
            {this.state.screenloader == true ? (
              <LinearLoader></LinearLoader>
            ) : (
              <>
                <div className="page-content">
                  <div className="row rowreview1">
                    <div className="investor-heading-container">
                      <div className="arrowtextclass">
                        <KeyboardBackspaceIcon
                          onClick={this.handleClicks}
                          className="left-arrow-muis1 toolsmuis"
                        ></KeyboardBackspaceIcon>
                        <h1 className="headerdashboard">Tools</h1>
                      </div>
                    </div>

                    <div>
                      <div className="dashboard-top-right-container1">
                        {this.state?.dealstatus === "Open" ? (
                          <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            disabled
                            // onClick={this.onOpenModal.bind(this)}
                          >
                            Deal Published
                          </Button>
                        ) : this.state?.dealstatus === "Awaiting Approval" ? (
                          <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            disabled
                            // onClick={this.onOpenModal.bind(this)}
                          >
                            Awaiting Issuer Approval
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            onClick={this.onOpenModal.bind(this)}
                          >
                            Publish Deal to Issuer
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className="tool-main-container">
              <div className="tool-template-container">
                <div className="tool-template-text-container">
                  <h3>Loan Template</h3>
                  <p>
                    Use this Excel template to add additional loan properties to
                    the charts on the main page.
                  </p>
                </div>
                <div className="tool-template-right-container">
                  <button
                    className="tool-button"
                    onClick={this.DownloadPreclosingTemplate}
                  >
                    Download
                  </button>
                  <button
                    className="tool-button-css"
                    onClick={this.onOpenModal2.bind(this)}
                  >
                    Upload
                  </button>
                </div>
              </div>
              <hr className="tool-hr" />

              <div className="tool-template-container">
                <div className="tool-template-text-container">
                  <h3>Structuring Template</h3>
                  <p>
                    Use this Excel template to auto populate the different
                    sections on the main page.
                  </p>
                </div>
                <div className="tool-template-right-container">
                  <button
                    className="tool-button"
                    onClick={this.downloadDealTemplate}
                  >
                    Download
                  </button>
                  <button
                    className="tool-button-css"
                    onClick={this.onOpenModal1.bind(this)}
                  >
                    Upload
                  </button>
                </div>
              </div>
              {/* <hr className="tool-hr" />
              <div className="tool-template-container">
                <div className="tool-template-text-container">
                  <h3>Completed Structuring Template</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Aliquam eius nobis tempore ab totam earum reprehenderit
                    velit, corrupti porro, quibusdam accusantium voluptates
                    debitis fuga natus aperiam minima veritatis neque
                    voluptatum?
                  </p>
                </div>
                <div className="tool-template-right-container">
                  <button
                    className="tool-button"
                    onClick={this.onOpenModal1.bind(this)}
                  >
                    Upload
                  </button>
                </div>
              </div> */}
            </div>
          </div>

          {/* publish deals investors popup */}
          <div id="modal1">
            <ReactModal
              isOpen={this.state.open1}
              onRequestClose={this.onCloseModal}
              contentLabel="Minimal Modal Example"
              style={customStylesautosmallmodal}
            >
              <React.Fragment>
                <div className="modalPopup2">
                  <h2>Are you sure, you want to Publish the Deal?</h2>

                  <div className="modalshiftcontent">
                    <h6 className="card1__title">
                      Once published, this Deal will become visible to Issuer.
                    </h6>

                    <div className="modalsubmit">
                      <div className="submitbuttonbg">
                        <div className="row">
                          <div className="row justify-content-end1">
                            <button
                              type="button"
                              className="popupbutton1"
                              onClick={this.onCloseModal}
                            >
                              {" "}
                              Cancel{" "}
                            </button>
                            <Button
                              variant="contained"
                              color="primary"
                              disabled={
                                this.state.publishstatus == true ? true : false
                              }
                              onClick={() => this.PublishUW()}
                            >
                              Publish
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

          {/* upload popup */}
          <div id="modal1">
            <ReactModal
              isOpen={this.state.open2}
              onRequestClose={this.onCloseModal1}
              contentLabel="Minimal Modal Example"
              style={customStylesautosmallmodal}
            >
              <React.Fragment>
                <div className="modalPopup2">
                  <div className="popupTitle">
                    <h2>Upload the Document</h2>
                    <button
                      type="button"
                      className="closePopup"
                      style={{ minWidth: "30px" }}
                      onClick={this.onCloseModal1}
                    >
                      {" "}
                      <CloseIcon></CloseIcon>{" "}
                    </button>
                  </div>

                  {/* {this.state.popupLoader === true ? <CircularProgress size="30px" color="secondary" /> : ' '} */}

                  <div className="modalshiftcontent">
                    <form className="form-container" onSubmit={this.onSubmit1}>
                      <div className="">
                        <h6 className="e1">Document</h6>
                        <div className="kyc-card__button-container1">
                          <div>
                            <button
                              className="card__button"
                              style={{
                                position: "relative",
                              }}
                            >
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
                      </div>

                      <div className="modalsubmit">
                        <div className="submitbuttonbg">
                          <div className="row">
                            <div className="row justify-content-end-uw">
                              <button
                                type="button"
                                className="popupbutton2"
                                onClick={this.onCloseModal1}
                              >
                                {" "}
                                Cancel{" "}
                              </button>
                              {this.state.dealstatus == "Created" ||
                              this.state.dealstatus == "Active" ? (
                                <Button
                                  variant="contained"
                                  color="primary"
                                  type="submit"
                                  // onClick={this.UpdateDealUW}
                                >
                                  Upload
                                  {this.state.formLoader === true ? (
                                    <CircularProgress
                                      size="22px"
                                      color="primary"
                                    />
                                  ) : (
                                    ""
                                  )}
                                </Button>
                              ) : (
                                <Button
                                  variant="contained"
                                  color="primary"
                                  disabled
                                >
                                  Upload
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>

                    {/* {this.state.getLoansLoader === false ? '' : <FormLoader></FormLoader>} */}
                    {/* {this.state.openPopup === true ? <React.Fragment><Snackbar msg={"Processor addded Successfully" || this.state.message} open="true" /> </React.Fragment> : ' '} */}
                  </div>
                </div>
              </React.Fragment>
            </ReactModal>
          </div>

          <div id="modal1">
            <ReactModal
              isOpen={this.state.open3}
              onRequestClose={this.onCloseModal2}
              contentLabel="Minimal Modal Example"
              style={customStylesautosmallmodal}
            >
              <React.Fragment>
                <div className="modalPopup2">
                  <div className="popupTitle">
                    <h2>Upload the Document </h2>
                    <button
                      type="button"
                      className="closePopup"
                      style={{ minWidth: "30px" }}
                      onClick={this.onCloseModal2}
                    >
                      {" "}
                      <CloseIcon></CloseIcon>{" "}
                    </button>
                  </div>

                  {/* {this.state.popupLoader === true ? <CircularProgress size="30px" color="secondary" /> : ' '} */}

                  <div className="modalshiftcontent">
                    <form className="form-container" onSubmit={this.onSubmit2}>
                      <div className="">
                        <h6 className="e1">Document</h6>
                        <div className="kyc-card__button-container1">
                          <div>
                            <button
                              className="card__button"
                              style={{
                                position: "relative",
                              }}
                            >
                              <label
                                htmlFor="icon-button-file-id3"
                                className="upload-button-label"
                              >
                                Select File
                              </label>

                              <input
                                required
                                id="icon-button-file-id3"
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
                                onChange={this.handleOnChange2}
                              />
                            </button>
                          </div>
                          {this.state.file2 !== "" && (
                            <div className="kyc-card__select_name-container">
                              <p>{this.state.filename2}</p>
                              {/* <button type="button" onClick={handleClickCross}>
                x
            </button> */}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="modalsubmit">
                        <div className="submitbuttonbg">
                          <div className="row">
                            <div className="row justify-content-end-uw">
                              <button
                                type="button"
                                className="popupbutton2"
                                onClick={this.onCloseModal2}
                              >
                                {" "}
                                Cancel{" "}
                              </button>

                              <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                // onClick={this.UpdateDealUW}
                              >
                                Upload
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
                        </div>
                      </div>
                    </form>

                    {/* {this.state.getLoansLoader === false ? '' : <FormLoader></FormLoader>} */}
                    {/* {this.state.openPopup === true ? <React.Fragment><Snackbar msg={"Processor addded Successfully" || this.state.message} open="true" /> </React.Fragment> : ' '} */}
                  </div>
                </div>
              </React.Fragment>
            </ReactModal>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withSnackbar(UW_Tools);
