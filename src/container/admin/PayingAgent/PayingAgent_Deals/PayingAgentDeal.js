/* eslint-disable require-jsdoc */
import React, { Component } from "react";
// import { connect } from 'react-redux';
import Sidebar from "../../../../components/sidebar";
import MUIDataTable from "mui-datatables";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Loader from "../../../../components/loader";
import CloseIcon from "@material-ui/icons/Close";
import { withSnackbar } from "notistack";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Theme as MuiTheme } from "rjsf-material-ui";
import ReactModal from "react-modal";
import { customStylesautosmallmodal } from "../../../../components/customscripts/customscript";
import FormLoader from "../../../../components/loader/formLoader";
import {} from "../../../../servies/services";
import Match from "../../../../images/match.png";
import Mismatch from "../../../../images/mismatch.png";
import PropTypes from "prop-types";
import { FullscreenExit, TrainRounded } from "@material-ui/icons";
import {
  getDealsbyPayingAgentId,
  SetUpPoolRoles,
  servicerRedirect,
} from "../../../../servies/services";
import NumberComp2 from "../../../../components/NumberComp2";

import {
  ThemeProvider,
  createTheme,
  MuiThemeProvider,
} from "@material-ui/core/styles";
import {
  withStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import Slider from "@material-ui/core/Slider";
import { SliderThumb } from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import AddCircleOutlinedIcon from "@material-ui/icons/AddCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import NumberComp from "../../../../components/NumberComp";
const token = sessionStorage.getItem("token");

class PayingAgentDeal extends Component {
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
      open1: false,
      open2: false,
      formData: {
        note: "",
      },
      UserId: sessionStorage.getItem("userid"),
      poolName: sessionStorage.getItem("poolname"),
      EmailAddress: sessionStorage.getItem("EmailAddress"),
      kycuploadstatus: sessionStorage.getItem("KycUploadStatus"),
      kycverifystatus: sessionStorage.getItem("KycVerifiedStatus"),
      TermsOfService: sessionStorage.getItem("TermsOfService"),
      activePools: false,
      activeDeals: true,
      showSearchBox: false,
    };
  }

  handleClickUpload = () => {
    this.props.history.push({
      pathname: "/kycloginstep1",
    });
  };
  handleClick = () => {
    this.props.history.push({
      pathname: "/pendingkyc",
    });
  };
  handleClickSubmitted = () => {
    console.log("handleClickSubmitted");
    this.props.history.push({
      pathname: "/kycloginstep2",
    });
  };

  handleClickDeals = () => {
    this.setState({
      activePools: false,
      activeDeals: true,
      activeInsights3: false,
    });
    window.location.assign("/admin/payingagent_deals");
  };
  handleClickActive = () => {
    this.setState({
      activePools: false,
      activeDeals: false,
      activeInsights3: true,
    });
    window.location.assign("/admin/payingagent_active");
  };
  AddDeal = () => {
    sessionStorage.setItem("isAddDeal", true);
    window.location.assign("/admin/general")
  };
  Recurring = (value, tableMeta) => {
    sessionStorage.setItem("dealID",tableMeta.rowData[0]);
    sessionStorage.setItem("dealName",tableMeta.rowData[1]);
    sessionStorage.setItem("firstPaymentDate",tableMeta.rowData[6]);
    window.location.assign("/admin/general_recurring");
  };

 
  onOpenModal = (value) => {
    console.log("inside modal1");
    this.setState({ open1: true, value: value });
  };
  onOpenModal1 = (value) => {
    console.log("inside modal1");
    this.setState({ open2: true, value: value });
  };

  onCloseModal = () => {
    this.setState({ open1: false });
  };
  onCloseModal1 = () => {
    this.setState({ open2: false });
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

  getDealsbyPayingAgentId = async () => {
    this.setState({ getLoansLoader: true, tableData: [], loading: true });
    var data = {};
    data.payingagentid = this.state.UserId;
    data.mailid = this.state.EmailAddress;
    data.token = this.state.token;
    const APIResponse = await getDealsbyPayingAgentId(data);

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
  SetUpPoolRoles = async () => {
    this.setState({ getLoansLoader: true });
    const { token, EmailAddress } = this.state;
    const data = { token };

    try {
      const APIResponse = await SetUpPoolRoles(data);

      if (APIResponse.status === 200) {
        const {
          Verification,
          Underwriter,
          Investor,
          Servicer,
          Issuer,
          "Rating Agency": RatingAgency,
          "Paying Agent": PayingAgent,
        } = APIResponse.data;

        const processDropdownData = (dataArray, dropdownArray) => {
          dataArray.forEach((item) => {
            if (
              item.UserName.toLowerCase().includes("test") ===
              EmailAddress.toLowerCase().includes("test")
            ) {
              dropdownArray.push({
                label:
                  item.EmailAddress === sessionStorage.getItem("EmailAddress")
                    ? "Self"
                    : item.UserName,
                value: item.UserId,
                Email: item.EmailAddress,
              });
            }
          });
        };

        const VerificationDropdown = [];
        processDropdownData(Verification, VerificationDropdown);
        this.setState({ VerificationDropdown, getLoansLoader: false });
        sessionStorage.setItem(
          "verificationDropdown",
          JSON.stringify(VerificationDropdown)
        );

        const IssuerDropdown = [];
        processDropdownData(Issuer, IssuerDropdown);
        this.setState({ IssuerDropdown, getLoansLoader: false });
        sessionStorage.setItem(
          "IssuerDropdown",
          JSON.stringify(IssuerDropdown)
        );

        const UnderwriterDropdown = [];
        processDropdownData(Underwriter, UnderwriterDropdown);
        this.setState({ UnderwriterDropdown, getLoansLoader: false });
        sessionStorage.setItem(
          "underwriterDropdown",
          JSON.stringify(UnderwriterDropdown)
        );

        const InvestorDropdown = [];
        processDropdownData(Investor, InvestorDropdown);
        this.setState({ InvestorDropdown, getLoansLoader: false });
        sessionStorage.setItem(
          "investorDropdown",
          JSON.stringify(InvestorDropdown)
        );

        const ServicerDropdown = [];
        processDropdownData(Servicer, ServicerDropdown);
        this.setState({ ServicerDropdown, getLoansLoader: false });
        sessionStorage.setItem(
          "servicerDropdown",
          JSON.stringify(ServicerDropdown)
        );

        const RatingAgencyDropdown = [];
        processDropdownData(RatingAgency, RatingAgencyDropdown);
        this.setState({ RatingAgencyDropdown, getLoansLoader: false });
        sessionStorage.setItem(
          "ratingAgencyDropdown",
          JSON.stringify(RatingAgencyDropdown)
        );

        const PayingAgentDropdown = [];
        processDropdownData(PayingAgent, PayingAgentDropdown);
        this.setState({ PayingAgentDropdown, getLoansLoader: false });
        sessionStorage.setItem(
          "payingAgentDropdown",
          JSON.stringify(PayingAgentDropdown)
        );
      } else {
        this.setState({ getLoansLoader: false });
        const message = "Couldn't fetch the record";
        this.props.enqueueSnackbar(message, {
          variant: "error",
          autoHideDuration: 3000,
        });
      }
    } catch (error) {
      console.error("Error occurred:", error);
      this.setState({ getLoansLoader: false });
    }
  };
  ViewDetails = async (value) => {
    console.log("value", value);
    sessionStorage.setItem("dealId", value);
    sessionStorage.setItem("component", "/admin/payingagent_deals");
    var data = {};
    data.dealid = value;
    data.token = this.state.token;

    const APIResponse = await servicerRedirect(data);

    if (APIResponse.status === 200) {
      if (APIResponse.data.redirect == "postclosing") {
        window.location.assign("/admin/payingagent_dealdetails");
      } else {
        window.location.assign("/admin/payingagent_offchaindetails");
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
 
  async componentDidMount() {
    this.getDealsbyPayingAgentId();
    this.SetUpPoolRoles();
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

      {
        name: "numberofloans",
        label: "No. of Loans",
        options: {
          filter: true,
          sort: true,
        },
      },

      {
        name: "numberofTranches",
        label: "No. of Tranches",
        options: {
          filter: true,
          sort: true,
        },
      },

      {
        name: "firstPaymentDate",
        label: "Payment Date",
        options: {
          filter: true,
          sort: true,
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
              }}
            >
              {columnMeta.label}
            </th>
          ),
          customBodyRender: (value, tableMeta, updateValue) => {
            console.log('vallllll',value,tableMeta  )
            return (
              <React.Fragment>
                <React.Fragment>
                  <div style={{ display: "flex", gap: "5px" }}>
                    <button
                      className="popupbuttons1"
                      onClick={() => this.Recurring(value, tableMeta)}
                    >
                      Deal
                    </button>
                    <button
                      className="popupbuttons1"
                      onClick={() => this.ViewDetails(value)}
                    >
                      View Details
                    </button>
                    {tableMeta.rowData[6] == "Pending" ? (
                      <React.Fragment>
                        <button
                          className="popupbuttons1 uw-popup-button"
                          onClick={() => this.onOpenModal(value)}
                          // onClick={() => this.UpdatePoolUWStatus("Accepted By Underwriter",value)}
                        >
                          Accept
                        </button>
                        <button
                          className="popupbuttons1"
                          onClick={() => this.onOpenModal1(value)}
                          // onClick={() => this.UpdatePoolUWStatus("Rejected By Underwriter",value)}
                        >
                          Reject
                        </button>
                      </React.Fragment>
                    ) : null}
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
              <Sidebar activeComponent={"PayingAgentDeal"} />
              <div className="content1">
                {/* {this.state.getLoansLoader == false ? (
              ""
            ) : (
              <LinearLoader></LinearLoader>
            )} */}
                <div className="page-content">
                  <div className="row row1">
                    <div className="investor-heading-container">
                      <h1 className="headerdashboard">Dashboard</h1>
                    </div>

                    {/* <div>
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
                    </div> */}

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
                        {/* <div style={{marginLeft:'15px'}}>
                          {
                            <Button
                              variant="contained"
                              color="primary"
                              type="button"
                              onClick={this.AddDeal}
                            >
                              Add Deal
                            </Button>
                          }
                        </div> */}
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

              <div id="modal1">
                <ReactModal
                  isOpen={this.state.open1}
                  onRequestClose={this.onCloseModal}
                  contentLabel="Minimal Modal Example"
                  style={customStylesautosmallmodal}
                >
                  <React.Fragment>
                    <div className="modalPopup2">
                      <h3>Are you sure you want to Accept the Pool?</h3>
                      {/* <button
                    type="button"
                    className="closePopup"
                    style={{ minWidth: "30px" }}
                    onClick={this.onCloseModal}
                  >
                    {" "}
                    <CloseIcon></CloseIcon>{" "}
                  </button> */}

                      {/* {this.state.popupLoader === true ? <CircularProgress size="30px" color="secondary" /> : ' '} */}

                      <div className="modalshiftcontent">
                        {/* <form className="form-container" onSubmit={this.onSubmit2}> */}

                        <p>
                          Once accepted, this Pool will be converted into a
                          Deal, and the Issuer will be notified that you have
                          agreed to underwrite this Deal.
                        </p>

                        <div className="modalsubmit">
                          <div className="submitbuttonbg">
                            <div className="row">
                              <div className="row justify-content-accept">
                                <button
                                  type="button"
                                  className="popupbutton2"
                                  onClick={this.onCloseModal}
                                >
                                  {" "}
                                  Cancel{" "}
                                </button>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  onClick={() =>
                                    this.UpdatePoolUWStatus(
                                      "Accepted By Servicer",
                                      this.state.value
                                    )
                                  }
                                >
                                  Accept
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
                        {/* </form> */}

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

              <div id="modal">
                {/* <Modal open={open1} onClose={this.onCloseModal1} center>
                    <div id="modalheader">
                      <h5>Create a Pool</h5>

                    </div> */}
                <ReactModal
                  isOpen={this.state.open2}
                  onRequestClose={this.onCloseModal1}
                  contentLabel="Minimal Modal Example"
                  style={customStylesautosmallmodal}
                >
                  <React.Fragment>
                    <div className="modalPopup2">
                      <h3>Are you sure you want to Reject the Pool?</h3>
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
                        <p>
                          Once rejected, the Issuer will be notified that you
                          have denied to underwrite this Deal.
                        </p>

                        <div className="input-container">
                          <label className="label">Note (Optional)</label>
                          <input
                            placeholder="Type here"
                            className="input"
                            type="text"
                            onChange={(e) => {
                              this.setState({
                                formData: {
                                  ...this.state.formData,
                                  note: e.target.value,
                                },
                              });
                            }}
                            value={this.state.formData.note}
                          />
                        </div>

                        <div className="submitbuttonbg">
                          <div className="row">
                            <div className="row justify-content-reject">
                              <button
                                type="button"
                                className="popupbutton2"
                                onClick={this.onCloseModal1}
                              >
                                {" "}
                                Cancel{" "}
                              </button>
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={() =>
                                  this.UpdatePoolUWStatus(
                                    "Rejected By Servicer",
                                    this.state.value
                                  )
                                }
                              >
                                Reject
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
            </div>
          )
        ) : (
          this.handleClickSubmitted()
        )}
      </React.Fragment>
    );
  }
}

export default withSnackbar(PayingAgentDeal);
