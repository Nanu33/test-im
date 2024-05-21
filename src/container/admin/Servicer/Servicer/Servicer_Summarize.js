/* eslint-disable require-jsdoc */
import React, { Component } from "react";
import Sidebar from "../../../../components/sidebar";
import Button from "@material-ui/core/Button";
import LinearLoader from "../../../../components/loader/LinearLoader";
import { withSnackbar } from "notistack";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Theme as MuiTheme } from "rjsf-material-ui";
import {
  summarize,
  saveaggregatesummarytobc,
  viewaggregatesummary,
  // SaveAggregateSummaryToBC,
  // ConsolidatedAggregateSummaryToDB,
  // ConsolidatedAggregateSummaryToBC,
  SaveLoanProcessDate,
} from "../../../../servies/services";
import { TrainRounded } from "@material-ui/icons";
import {
  ThemeProvider,
  createTheme,
  MuiThemeProvider,
} from "@material-ui/core/styles";
import "react-input-range/lib/css/index.css";
// import NumberComp2 from "../../../../../components/NumberComp2";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import * as moment from "moment";
import { LensTwoTone } from "@mui/icons-material";

class Summarize_Servicer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      downArrow: true,
      selectedRecords: [],
      eligibleloans: {},
      tableData: [],
      servicerData: [],
      loading: false,
      servicerDealName: sessionStorage.getItem('dealName'),
      servicerPaymentDate: sessionStorage.getItem('paymentDate'),
      ViewServicerName: this.props.location?.state?.ViewServicer,
      getLoansLoader: false,
      selectedLoanId: [],
      rowsSelected: null,
      isFullScreen: false,
      DealName:
        sessionStorage.getItem("dealname") === null
          ? sessionStorage.getItem("servicerdealname")
          : sessionStorage.getItem("dealname"),
      detailsDate:
        sessionStorage.getItem("selectdate") === null
          ? sessionStorage.getItem("selectservicerdate")
          : sessionStorage.getItem("selectdate"),
      ServicerName: this.props.location?.state?.rowViewDetails
        ? this.props.location?.state?.Servicer
        : sessionStorage.getItem("Servicer"),
      //this.props.location?.state?.ServicerName,
      peer: sessionStorage.getItem("peer_insurer"),
      peers: JSON.parse(sessionStorage.getItem("peers")),
      activeInsights1: false,
      activeInsights2: false,
      activeInsights3: false,
      activeInsights4: false,
      activeInsights5: true,
      screendisplay: true,
      formLoader: false,
      screenloader: false,
      RowSummary: sessionStorage.getItem('RowIndividualSummary'),
      TopSummary: this.props.location?.state?.TopWholeSummary,
      ServicerList: this.props.location?.state?.ServicerList,
      userid: sessionStorage.getItem('userid'),
      token: sessionStorage.getItem('token')
    };
  }

  handleClickUploadLoanTapes = () => {
    this.setState({
      activeInsights1: true,
      activeInsights2: false,
      activeInsights3: false,
      activeInsights4: false,
      activeInsights5: false,
    });
    window.location.assign("/admin/uploadLoanTape");
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
  };

  goBackToDashBoard = () => {
    // if (sessionStorage.getItem("user_name") === "Trustee") {
    //   this.props.history.push({
    //     pathname: "/admin/viewdetails",
    //     state: { details: this.state.detailsDate },
    //   });
    // } else {
    //   this.props.history.push({
    //     pathname: "/admin/servicer_deals",
    //   });
    // }
    window.location.assign("/admin/servicer_deals");
  };

  summarize = async () => {
    console.log("Summarize");
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
    data.peers = this.state.peer;
    try {
      this.setState({ screenloader: true });
      const APIResponse = await summarize(data, this.state.token);

      if (APIResponse.status === 200) {
        console.log("upload--", APIResponse);
        this.setState(
          {
            screenloader: false,
            servicerData: APIResponse.data?.Data,
            BlockChainStatus: APIResponse.data.Status,
          }
        );
        this.SaveLoanProcessDate();
      } else {
        this.setState({ screenloader: false });
        const message = APIResponse.data.Result;
        this.props.enqueueSnackbar(message, {
          variant: "error",
          autoHideDuration: 2000,
        });
      }
    } catch (err) {
      console.log("Err", err)
    }
  };

  ViewAggregateSummary = async () => {
    console.log("ViewAggregateSummary");
    let x = moment(this.state.servicerPaymentDate)
      .subtract(1, "months")
      .format("MM/DD/YYYY")
      .toString();
    let month = x.slice(0, 2);
    let year = x.slice(6, 10);
    var data = {};
    data.peer = this.state.peer;
    data.DealName = this.state.servicerDealName;
    data.Month = month;
    data.Year = year;
    data.ServicerName = this.state.userid;
    this.setState({ screenloader: true });
    const APIResponse = await viewaggregatesummary(data, this.state.token);

    if (APIResponse.status === 200) {
      console.log("upload--", APIResponse);
      this.setState({
        screenloader: false,
        servicerData: APIResponse.data.Data,
        BlockChainStatus: APIResponse.data.Status,
      });
    } else {
      this.setState({ screenloader: false });
      const message = APIResponse.data.Result;
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  ConsolidatedAggregateSummaryToDB = async () => {
    console.log("ConsolidatedAggregateSummaryToDB");
    let x = moment(this.state.detailsDate)
      .subtract(1, "months")
      .format("MM/DD/YYYY")
      .toString();
    let month = x.slice(0, 2);
    let year = x.slice(6, 10);
    var data = {};
    data.DealName = this.state.DealName;
    data.Month = month;
    data.Year = year;
    data.Servicers = this.state.ServicerList;
    data.peers = this.state.peers;
    this.setState({ screenloader: true });
    const APIResponse = await ConsolidatedAggregateSummaryToDB(data);

    if (APIResponse.status === 200) {
      console.log("upload--", APIResponse);
      this.setState({
        screenloader: false,
        servicerData: APIResponse.data.Data,
        BlockChainStatus: APIResponse.data.Status,
      });
      this.SaveLoanProcessDate();
    } else {
      this.setState({ screenloader: false });
      const message = APIResponse.data.Result;
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  SaveAggregateSummaryToBC = async () => {
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
    data.SummaryData = this.state.servicerData;
    data.peers = this.state.peer;
    this.setState({ formLoader: true });
    const APIResponse = await saveaggregatesummarytobc(data, this.state.token);

    if (APIResponse.status === 200) {
      this.setState({
        formLoader: false,
        BlockChainStatus: APIResponse.data.Status,
      });
      console.log("upload--", APIResponse);
      const message = APIResponse.data.Result;
      this.props.enqueueSnackbar(message, {
        variant: "info",
        autoHideDuration: 2000,
      });
      this.SaveLoanProcessDate();
    } else {
      this.setState({ formLoader: false });
      const message = APIResponse.data.Result;
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  ConsolidatedAggregateSummaryToBC = async () => {
    let x = moment(this.state.detailsDate)
      .subtract(1, "months")
      .format("MM/DD/YYYY")
      .toString();
    let month = x.slice(0, 2);
    let year = x.slice(6, 10);
    var data = {};
    data.DealName = this.state.DealName;
    data.Month = month;
    data.Year = year;
    data.SummaryData = this.state.servicerData;
    data.peers = this.state.peers;
    this.setState({ formLoader: true });
    const APIResponse = await ConsolidatedAggregateSummaryToBC(data);

    if (APIResponse.status === 200) {
      this.setState({
        formLoader: false,
        BlockChainStatus: APIResponse.data.Status,
      });
      this.SaveLoanProcessDate();
      console.log("upload--", APIResponse);
      const message = APIResponse.data.Result;
      this.props.enqueueSnackbar(message, {
        variant: "info",
        autoHideDuration: 2000,
      });
    } else {
      this.setState({ formLoader: false });
      const message = APIResponse.data.Result;
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  SaveLoanProcessDate = async () => {
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
    data.ServicerName = this.state.userid
    data.peers = this.state.peer;

    console.log("datata", data);
    try {
      const APIResponse = await SaveLoanProcessDate(data, this.state.token);

      console.log("SaveMapping", APIResponse.data);
      if (APIResponse.status === 200) {
        const message = APIResponse.data.message;
        this.props.enqueueSnackbar(message, {
          variant: "info",
          autoHideDuration: 3000,
        });
      } else {
        const message = APIResponse.data.message;
        this.props.enqueueSnackbar(message, {
          variant: "error",
          autoHideDuration: 3000,
        });
      }
    } catch (error) {
      console.log("Err", error)
    }
  };

  async componentDidMount() {
    console.log("servvvvv", this.props.location?.state?.ViewServicer);
    var component = window.location.pathname;
    sessionStorage.setItem("component", component);
    if (this.state.RowSummary === "Yes") {
      this.ViewAggregateSummary();
    } else {
      this.summarize();
    }
    // if (sessionStorage.getItem("user_name") === "Trustee") {
    //   if (this.state.RowSummary === "Yes") {
    //     this.ViewAggregateSummary();
    //   } else if (this.state.TopSummary === "Yes") {
    //     this.ConsolidatedAggregateSummaryToDB();
    //   } else {
    //     this.Summarize();
    //   }
    // } else {
    //   if (this.state.ViewServicerName === "Yes") {
    //     this.ViewAggregateSummary();
    //   } else {
    //     this.Summarize();
    //   }
    // }
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
            marginRight: `${this.state.tableData.length < 10 ? "-122" : "-132"
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
      },
    });

  fistTableData = (tableData) => {
    console.log("tableData", tableData);
    return (
      <div>
        {tableData !== undefined ? (
          <table className="table-servicer">
            <tr>
              {Object.keys(tableData[0])?.map((heading) => (
                <th className="servicer-data-table-heading">{heading}</th>
              ))}
            </tr>
            {tableData.map((data) => (
              <tr>
                {Object.keys(tableData[0])?.map((element) => (
                  <td>
                    {element == "Balance" ? (
                      //   <NumberComp2 value={data[element]}></NumberComp2>
                      ''
                    ) : (
                      data[element]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </table>
        ) : (
          ""
        )}
      </div>
    );
  };

  render() {
    const { classes } = this.props;
    const options = {
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
      onRowSelectionChange: this.onRowSelectionChange,
      rowsSelected: this.state.rowsSelected,
      rowsPerPage: [10],
      rowsPerPageOptions: false,
      jumpToPage: false,
      pagination: TrainRounded,

      onRowSelectionChange: (rowsSelected, allRows) => {
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
              "Sorry, there is no matching data to display"
            ) : (
              //   <Loader msg={"Please wait, Loading Loan Data"} />
              ''
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
          <Sidebar
            activeComponent={"ServicerDashboardDeals"}
          />
          <div className="content1">
            {this.state.screenloader == true ? (
              <LinearLoader></LinearLoader>
            ) : (
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
                    {/* <div className="buttonsverified uw-deal-details-button-container">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-around",
                          alignItems: "center",
                          width: "50rem",
                          marginTop: "20px",
                        }}
                      >
                        <div style={{ display: "flex" }}>
                          <label className="dealInfo">Deal Name : </label>
                          <h6 className="dealInfo1">{this.state.DealName}</h6>
                        </div>
                        <div style={{ display: "flex" }}>
                          <label className="dealInfo">Payment Date : </label>
                          <h6 className="dealInfo1">
                            {this.state.detailsDate}
                          </h6>
                        </div>
                      </div>
                    </div> */}
                    <div className="recurring_details">
                      <div>
                        <label className="dealInfo">Deal Name : </label>
                        <h6 className="dealInfo1">{this.state.servicerDealName}</h6>
                      </div>
                      <div>
                        <label className="dealInfo">Payment Date : </label>
                        <h6 className="dealInfo1">{this.state.servicerPaymentDate}</h6>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row row1">
                  <div>
                    <div className="tablechangebuttonloans">
                      {this.state.TopSummary === "Yes" ? (
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
                      ) : (
                        <>
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
                            onClick={() =>
                              this.handleClickPreviewMappedFields()
                            }
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
                        </>
                      )}
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    {this.state.BlockChainStatus === "Enable" ? (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => this.SaveAggregateSummaryToBC()}
                      // onClick={() =>
                      //   sessionStorage.getItem("user_name") === "Trustee"
                      //     ? this.state.TopSummary === "Yes"
                      //       ? this.ConsolidatedAggregateSummaryToBC()
                      //       : this.SaveAggregateSummaryToBC()
                      //     : this.SaveAggregateSummaryToBC()
                      // }
                      >
                        Commit to the Digital Ledger
                        {this.state.formLoader === true ? (
                          <CircularProgress size="25px" color="primary" />
                        ) : (
                          ""
                        )}
                      </Button>
                    ) : (
                      <Button variant="contained" color="primary" disabled>
                        Commit to the Digital Ledger
                      </Button>
                    )}
                  </div>
                </div>

                <div className="servicer-data-main-container">
                  <div className="servicer-data-left-container">
                    {/* table1 */}
                    <div className="outer-servicer-data-table-container ">
                      <div className="servicer-data-table-container servicer-first-table">
                        {this.fistTableData(this.state.servicerData?.Collateral)}
                      </div>
                    </div>

                    {/* table 2 */}
                    <div className="outer-servicer-data-table-container ">
                      <div className="servicer-data-table-container servicer-second-table">
                        {this.fistTableData(
                          this.state.servicerData?.Collections
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="servicer-data-right-container">
                    {/* table1 */}
                    <div className="outer-servicer-data-table-container ">
                      <div className="servicer-data-table-container servicer-third-table">
                        {this.fistTableData(this.state.servicerData?.Interest)}
                      </div>
                    </div>

                    {/* table2 */}
                    <div className="outer-servicer-data-table-container ">
                      <div className="servicer-data-table-container servicer-forth-table">
                        {this.fistTableData(this.state.servicerData?.Principal)}
                      </div>
                    </div>
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

export default withSnackbar(Summarize_Servicer);
