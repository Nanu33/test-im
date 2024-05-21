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
  getDealsbyServicerId,
  servicerRedirect,
  UpdatePoolUWStatus,
} from "../../../../servies/services";
import { FullscreenExit, TrainRounded } from "@material-ui/icons";
import {
  ThemeProvider,
  createTheme,
  MuiThemeProvider,
} from "@material-ui/core/styles";
import "react-input-range/lib/css/index.css";
import NumberComp2 from "../../../../components/NumberComp2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
const history = require("history").createBrowserHistory();

class ServicerDashboardDeals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: sessionStorage.getItem("token"),
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
      UserId: sessionStorage.getItem("userid"),
      poolName: sessionStorage.getItem("poolname"),
      kycuploadstatus: sessionStorage.getItem("KycUploadStatus"),
      kycverifystatus: sessionStorage.getItem("KycVerifiedStatus"),
      EmailAddress: sessionStorage.getItem("EmailAddress"),
      TermsOfService: sessionStorage.getItem("TermsOfService"),
      activePools: false,
      activeDeals: true,
      //   activeInsights3: false,
      showSearchBox: false,
      NextPaymentDate: "",
    };
    console.log("props", props);
  }

  handleClickUpload = () => {
    history.push({
      pathname: "/kycloginstep1",
    });
  };
  handleClick = () => {
    history.push({
      pathname: "/pendingkyc",
    });
  };
  handleClickSubmitted = () => {
    console.log("handleClickSubmitted");
    history.push({
      pathname: "/kycloginstep2",
    });
  };

  handleClickDeals = () => {
    this.setState({
      activePools: false,
      activeDeals: true,
      activeInsights3: false,
    });
    window.location.assign("/admin/servicer_deals");
  };
  handleClickActive = () => {
    this.setState({
      activePools: false,
      activeDeals: false,
      activeInsights3: true,
    });
    window.location.assign("/admin/servicer_active");
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
  searchBar = () => (
    <div className="search-bar-main-container" id="searchBox">
      <div className="tableSearch1">
        <TextField
          value={this.state.searchText}
          onChange={this.onchange}
          placeholder="Search"
          variant="standard"
          size="small"
          autoFocus
        />
        {/* {this.state.searchTextDashboard.length !== 0 ? <CloseIcon className="closeiconstyle" onClick={() => this.setState({ searchTextDashboard: '' })} /> : ''} */}
      </div>
      <button
        type="button"
        onClick={this.onClickCloseSearchBar}
        className="close-mui-icon"
      >
        <CloseIcon />
      </button>
    </div>
  );

  onClickCloseSearchBar = () => {
    this.setState({ searchText: "" });
    this.setState({ showSearchBox: false });
  };

  onClickSearchButton = () => {
    this.setState({ showSearchBox: true });
  };

  getDealsbyServicerId = async () => {
    this.setState({ getLoansLoader: true, tableData: [], loading: true });
    var data = {};
    data.servicerid = this.state.UserId;
    data.mailid = this.state.EmailAddress;
    data.token = this.state.token;
    const APIResponse = await getDealsbyServicerId(data);

    if (APIResponse.status === 200) {
      console.log("AllGetAllPoolsdata--", APIResponse);
      this.setState({
        getLoansLoader: false,
        open: true,
        tableData: APIResponse.data,
        loading: false,
      });
    } else {
      this.setState({ getLoansLoader: false, loading: false });
      const message = "Couldn't fetch the record";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };
  ViewDetails = async (value) => {
    console.log("value", value);
    sessionStorage.setItem("dealId", value);
    sessionStorage.setItem("component", "/admin/servicer_deals");
    // window.location.assign('/admin/servicer_deals_details')
    var data = {};
    data.dealid = value;
    data.token = this.state.token;

    const APIResponse = await servicerRedirect(data);

    if (APIResponse.status === 200) {
      if (APIResponse.data.redirect == "postclosing") {
        // window.location.assign("/admin/servicer_pool_details");
        history.push({
          pathname: "/admin/servicer_pool_details",
        });
      } else {
        window.location.assign("/admin/servicer_deals_details");
      }
      console.log("AllGetAllPoolsdata--", APIResponse);
    } else {
      const message = "Something went wrong";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };
  uploadLoanTape = (val, tableMeta) => {
    console.log("tableMeta", tableMeta);
    sessionStorage.setItem("dealName", tableMeta.rowData[1]);
    sessionStorage.setItem(
      "paymentDate",
      this.state.NextPaymentDate
        ? this.state.NextPaymentDate
        : tableMeta.rowData[4].replaceAll("-", "/")
    );
    sessionStorage.setItem("assetClass", tableMeta.rowData[2]);
    sessionStorage.setItem("RowIndividualSummary", tableMeta.rowData[8]);
    window.location.assign("/admin/uploadLoanTape");
  };
  viewsummarize = (val, tableMeta) => {
    sessionStorage.setItem("dealName", tableMeta.rowData[1]);
    sessionStorage.setItem(
      "paymentDate",
      this.state.NextPaymentDate
        ? this.state.NextPaymentDate
        : tableMeta.rowData[4].replaceAll("-", "/")
    );
    sessionStorage.setItem("RowIndividualSummary", tableMeta.rowData[8]);
    window.location.assign("/admin/summarize");
  };
  UpdatePoolUWStatus = async (value, poolid) => {
    var data = {};

    data.poolid = poolid;
    data.status = value;
    console.log("datata", data);
    this.setState({ formLoader: true });
    data.token = this.state.token;
    const APIResponse = await UpdatePoolUWStatus(data);

    // if (APIResponse.status === 200) {
    //   if(value == 'Accepted By Underwriter'){
    //     this.CreateDealUW(poolid)
    //   }
    //   else{
    //     this.getpoolsfrombcbyunderwriter()
    //   }
    //   this.onCloseModal()
    //   this.onCloseModal1()
    // this.setState({formLoader:false})

    // } else {
    // this.setState({formLoader:false})

    //   const message = "Couldn't change the status";
    //   this.props.enqueueSnackbar(message, {
    //     variant: "error",
    //     autoHideDuration: 3000,
    //   });
    // }
  };
  async componentDidMount() {
    this.getDealsbyServicerId();
    var component = window.location.pathname;
    sessionStorage.setItem("component", component);
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
              backgroundColor: "rgb(229,229,229,0.3) !important",
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
        MuiCircularProgress: {
          colorSecondary: {
            color: "#048c88 !important",
          },
        },
        MUIDataTableBodyCell: {
          root: {
            borderBottom: "none !important",
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
            fontFamily: "Catamaran !important",
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
            fontFamily: "Mulish !important",
            paddingLeft: "5px !important",
            paddingRight: "5px !important",
          },
          titleText: {
            fontFamily: "Mulish !important",
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
            fontFamily: "Mulish !important",
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
              this.state.currentPage >= 1 && this.state.currentPage <= 9
                ? "-138"
                : this.state.currentPage >= 10
                ? "-142"
                : "-130"
            }px`,
            fontSize: "0.80rem",
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
      onRowsSelect: this.onRowsSelect,
      onChangePage: this.onChangePage,
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

      onChangePage: (currentPage) => {
        console.log("currentPage", currentPage);
        this.setState({ currentPage: currentPage });
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
              <Loader msg={"Please wait, Loading Deal Data"} />
            ) : (
              "Sorry, there is no matching data to display"
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

    const getAllDates = (date, Index, tableMeta) => {
      console.log("date-data", date);
      const changeDateFormat =
        Index === tableMeta.rowIndex
          ? moment(date).format("MM/DD/YYYY").toString()
          : null;
      this.setState({ dateNeeded: Index });
      console.log("changeDateFormat", changeDateFormat);
      return changeDateFormat;
    };

    const getIndex = (index) => {
      console.log("index", index);
      this.setState({ isDateSelected: index });
      return index;
    };

    const columns = [
      {
        name: "dealId",
        label: "Deal Id",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "dealName",
        label: "Deal Name",
        options: {
          filter: true,
          sort: true,
        },
      },

      {
        name: "assetclass",
        label: "Asset Class",
        options: {
          filter: true,
          sort: true,
        },
      },

      {
        name: "originalbalance",
        label: "Principal Balance",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <React.Fragment>
                <NumberComp2 value={value}></NumberComp2>
              </React.Fragment>
            );
          },
        },
      },

      // {
      //   name: "numberofloans",
      //   label: "No. of Loans",
      //   options: {
      //     filter: true,
      //     sort: true,
      //   },
      // },

      // {
      //   name: "numberofTranches",
      //   label: "No. of Tranches",
      //   options: {
      //     filter: true,
      //     sort: true,
      //   },
      // },

      {
        name: "firstPaymentDate",
        label: "Payment Date",
        options: {
          filter: false,
          sort: false,
          customHeadRender: (columnMeta, updateDirection) => (
            <th
              style={{
                backgroundColor: "rgba(1, 142, 130, 0.1)",
                borderBottom: "none",
                paddingBottom: "5px",
                paddingTop: "5px",
                paddingLeft: "20px",
                width: "190px",
              }}
            >
              {columnMeta.label}
            </th>
          ),
          customBodyRender: (value, tableMeta, updateValue) => {
            console.log("va;;", value, tableMeta);
            value = value.replaceAll("-", "/");
            return (
              <React.Fragment>
                <div
                  style={{ width: "55%" }}
                  onClick={() => getIndex(tableMeta.rowIndex)}
                >
                  <DatePicker
                    required
                    placeholderText="MM/DD/YYYY"
                    dateFormat="MM/dd/yyyy"
                    className="input-select"
                    value={
                      this.state.NextPaymentDate === ""
                        ? value
                        : tableMeta.rowIndex === this.state.isDateSelected
                        ? this.state.NextPaymentDate
                        : value
                    }
                    onChange={(date) =>
                      this.setState({
                        NextPaymentDate: getAllDates(
                          date,
                          tableMeta.rowIndex,
                          tableMeta
                        ),
                      })
                    }
                  />
                </div>
              </React.Fragment>
            );
          },
        },
      },

      {
        name: "status",
        label: "Status",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "Processed",
        label: "Processed",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "dealId",
        label: "Actions",
        options: {
          filter: false,
          sort: false,
          customHeadRender: (columnMeta, updateDirection) => (
            <th
              style={{
                backgroundColor: "rgba(1, 142, 130, 0.1)",
                borderBottom: "none",
                paddingBottom: "5px",
                paddingTop: "5px",
                paddingLeft: "20px",
                width: "190px",
              }}
            >
              {columnMeta.label}
            </th>
          ),
          customBodyRender: (value, tableMeta, updateValue) => {
            console.log(tableMeta, "value");
            return (
              <React.Fragment>
                <React.Fragment>
                  <div className="align-actions">
                    <span>
                      <button
                        className="popupbutton3"
                        onClick={() => this.ViewDetails(value)}
                        style={{ marginLeft: "5px" }}
                      >
                        View Details
                      </button>
                    </span>
                    <button
                      className="popupbutton3"
                      onClick={() => this.uploadLoanTape(value, tableMeta)}
                    >
                      Process Loan Tape
                    </button>
                    <span>
                      {tableMeta.rowData[6] === "Yes" ? (
                        <button
                          className="popupbutton3"
                          onClick={() => this.viewsummarize(value, tableMeta)}
                        >
                          View Aggregate Summary
                        </button>
                      ) : (
                        <button
                          className="popupbutton3 button-disabled"
                          disabled
                        >
                          View Aggregate Summary
                        </button>
                      )}
                    </span>
                    {/* </Button> */}
                  </div>
                </React.Fragment>
              </React.Fragment>
            );
          },
        },
      },
    ];

    return (
      <React.Fragment>
        {this.state.TermsOfService == "Agree" ? (
          this.state.kycverifystatus == "Pending" ? (
            this.state.kycuploadstatus == "No" ? (
              this.handleClickUpload()
            ) : (
              this.handleClick()
            )
          ) : (
            <div className="page">
              <Sidebar activeComponent={"ServicerDashboardDeals"} />
              <div className="content1">
                <div className="page-content">
                  <div className="row row1">
                    <div className="investor-heading-container">
                      <h1 className="headerdashboard">Dashboard</h1>
                    </div>

                    <div>
                      <div className="tablechangebutton3">
                        <buton
                          type="button"
                          onClick={() => this.handleClickDeals()}
                          className={
                            this.state.activeDeals == true
                              ? "issuerDashboard-table-top-button-workbench-active"
                              : "issuerDashboard-table-top-button-workbench"
                          }
                        >
                          Deals
                        </buton>

                        <buton
                          type="button"
                          onClick={() => this.handleClickActive()}
                          className={
                            this.state.activePools == true
                              ? "issuerDashboard-table-top-button-insights-active"
                              : "issuerDashboard-table-top-button-insights"
                          }
                        >
                          Active
                        </buton>
                      </div>
                    </div>

                    <div>
                      <div className="dashboard-top-right-container1">
                        <div className="search-bar-outer-container uw-search-button-container">
                          {this.state.showSearchBox == false ? (
                            <Button
                              variant="contained"
                              color="primary"
                              type="button"
                              onClick={this.onClickSearchButton}
                            >
                              Search
                            </Button>
                          ) : (
                            this.searchBar()
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <React.Fragment>
                    <div className="workbench-table-container">
                      <MuiThemeProvider theme={this.getMuiTheme()}>
                        <MUIDataTable
                          // title={'Dashboard'}
                          data={this.state.tableData}
                          columns={columns}
                          options={options}
                        />
                      </MuiThemeProvider>
                    </div>
                  </React.Fragment>
                </div>
              </div>
            </div>
          )
        ) : (
          this.handleClickSubmitted()
        )}
      </React.Fragment>
    );
  }
}

export default withSnackbar(ServicerDashboardDeals);
