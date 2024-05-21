/* eslint-disable require-jsdoc */
import React, { Component } from "react";
// import { connect } from 'react-redux';
import Sidebar from "../../../components/sidebar";
import MUIDataTable from "mui-datatables";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Loader from "../../../components/loader";
import Snackbar from "../../../components/snackbar";
import LinearLoader from "../../../components/loader/LinearLoader";
import axios from "axios";
import CloseIcon from "@material-ui/icons/Close";
import moment from "moment";
import { withSnackbar } from "notistack";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddIcon from "@material-ui/icons/Add";
import { withTheme } from "react-jsonschema-form";
import { Theme as MuiTheme } from "rjsf-material-ui";
import FormLoader from "../../../components/loader/formLoader";
import {
  viewLoans,
  uploadlms,
  savelms,
  getAllDeals,
  DealDetailsRedirect,
} from "../../../servies/services";
import Match from "../../../images/match.png";
import Mismatch from "../../../images/mismatch.png";
import PropTypes from "prop-types";
import { FullscreenExit, TrainRounded } from "@material-ui/icons";
import {
  ThemeProvider,
  createTheme,
  MuiThemeProvider,
} from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import { SliderThumb } from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import AddCircleOutlinedIcon from "@material-ui/icons/AddCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import ReorderIcon from "@material-ui/icons/Reorder";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import OpprtunitiesCard from "./Opportunities_card";
import NumberComp2 from "../../../components/NumberComp2";

const datas = [
  {
    subhead: "Credit Capital Corp presents",
    mainhead: "Credit Cap 1",
    dayleft: "3 days left",
    description:
      "The deal summary is lorem Ipsum is simply dummy text of the printing and typesetting industry. Lore...",
    principalbalance: "$10,465,730",
    balancedescription: "exposure to Business Loans",
    tranches: "3 tranches",
    tranchesdescription: "offered with yields ranging from 0.5% to 3.4%",
    refund: "60",
  },
  {
    subhead: "Money Lender Inc presents",
    mainhead: "Money Lend 2",
    dayleft: "1 days left",
    description:
      "The deal summary is lorem Ipsum is simply dummy text of the printing and typesetting industry. Lore...",
    principalbalance: "$8,265,500",
    balancedescription: "exposure to Business Loans",
    tranches: "2 tranches",
    tranchesdescription: "offered with yields ranging from 0.5% to 3.4%",
    refund: "60",
  },
  {
    subhead: "Credit Capital Corp presents",
    mainhead: "Credit Cap 1",
    dayleft: "3 days left",
    description:
      "The deal summary is lorem Ipsum is simply dummy text of the printing and typesetting industry. Lore...",
    principalbalance: "$10,465,730",
    balancedescription: "exposure to Business Loans",
    tranches: "3 tranches",
    tranchesdescription: "offered with yields ranging from 0.5% to 3.4%",
    refund: "60",
  },
  {
    subhead: "Money Lender Inc presents",
    mainhead: "Money Lend 2",
    dayleft: "1 days left",
    description:
      "The deal summary is lorem Ipsum is simply dummy text of the printing and typesetting industry. Lore...",
    principalbalance: "$8,265,500",
    balancedescription: "exposure to Business Loans",
    tranches: "2 tranches",
    tranchesdescription: "offered with yields ranging from 0.5% to 3.4%",
    refund: "60",
  },
  {
    subhead: "Credit Capital Corp presents",
    mainhead: "Credit Cap 1",
    dayleft: "3 days left",
    description:
      "The deal summary is lorem Ipsum is simply dummy text of the printing and typesetting industry. Lore...",
    principalbalance: "$10,465,730",
    balancedescription: "exposure to Business Loans",
    tranches: "3 tranches",
    tranchesdescription: "offered with yields ranging from 0.5% to 3.4%",
    refund: "80",
  },
  {
    subhead: "Money Lender Inc presents",
    mainhead: "Money Lend 2",
    dayleft: "1 days left",
    description:
      "The deal summary is lorem Ipsum is simply dummy text of the printing and typesetting industry. Lore...",
    principalbalance: "$8,265,500",
    balancedescription: "exposure to Business Loans",
    tranches: "2 tranches",
    tranchesdescription: "offered with yields ranging from 0.5% to 3.4%",
    refund: "60",
  },
];

class InvestorDashboard_Opportunities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRecords: [],
      eligibleloans: {},
      tableData: [],
      tableData2: [],
      loading: false,
      getLoansLoader: false,
      open: false,
      openPopup: false,
      selectedLoanId: [],
      searchText: "",
      rowsSelected: null,
      open1: false,
      open2: false,
      poolName: sessionStorage.getItem("poolname"),
      UserId: sessionStorage.getItem("userid"),
      token: sessionStorage.getItem("token"),
      EmailAddress: sessionStorage.getItem("EmailAddress"),
      activeInsights1: false,
      activeInsights2: false,
      activeInsights3: true,
      showSearchBox: false,
      reorderchart: true,
      moduleicon: false,
    };
  }

  handleClickInsights = () => {
    this.setState({
      activeInsights1: true,
      activeInsights2: false,
      activeInsights3: false,
    });
    window.location.assign("/admin/investorinsight");
  };

  handleClickInvested = () => {
    this.setState({
      activeInsights1: false,
      activeInsights2: true,
      activeInsights3: false,
    });
    window.location.assign("/admin/investorportfolio");
  };
  handleClickOpportunities = () => {
    this.setState({
      activeInsights1: false,
      activeInsights2: false,
      activeInsights3: true,
    });
  };
  handleClickReorder = () => {
    this.setState({
      reorderchart: true,
      moduleicon: false,
    });
  };

  handleClickmoduleicon = () => {
    this.setState({
      reorderchart: false,
      moduleicon: true,
    });
    sessionStorage.setItem("griddata", this.state.tableData);
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

  getAllDeals = async () => {
    this.setState({ getLoansLoader: true, tableData: [], loading: true });
    var data = {};
    data.mailid = this.state.EmailAddress;
    data.token = this.state.token;
    const APIResponse = await getAllDeals(data);

    if (APIResponse.status === 200) {
      console.log("AllGetAllPoolsdata--", APIResponse);
      let arr = [];
      APIResponse.data.map((e) => {
        if (e.status == "Upcoming" || e.status == "Open") {
          arr.push(e);
        }
      });
      this.setState({
        getLoansLoader: false,
        open: true,
        tableData: arr,
        loading: false,
      });
      sessionStorage.setItem("paymentmode", APIResponse.data[0].paymentmode);
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
    sessionStorage.setItem("component", "/admin/investoropportunites");
    window.location.assign("/admin/investordealdetails");

    // var data ={}
    // data.dealid = value
    // const APIResponse = await DealDetailsRedirect(data);

    //   if (APIResponse.status === 200) {
    //      if(APIResponse.data.Dealdetails == "Post Closing"){
    //
    //       window.location.assign('/admin/investorpooldetails')
    //      }
    //      else{
    //       window.location.assign('/admin/investordealdetails')
    //      }
    //     console.log("AllGetAllPoolsdata--", APIResponse);

    //   } else {
    //     const message = "Something went wrong";
    //     this.props.enqueueSnackbar(message, {
    //       variant: "error",
    //       autoHideDuration: 3000,
    //     });
    //   }
  };

  async componentDidMount() {
    var component = window.location.pathname;
    sessionStorage.setItem("component", component);
    this.getAllDeals();
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
        label: "Deal ID",
        options: {
          filter: true,
          sort: true,
          customHeadRender: (columnMeta, updateDirection) => (
            <th
              style={{
                backgroundColor: "rgba(1, 142, 130, 0.1)",
                borderBottom: "none",
                paddingBottom: "10px",
                paddingTop: "10px",
                textAlign: "center",
              }}
            >
              {columnMeta.label}
            </th>
          ),
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <React.Fragment>
                <div className="text-left">{value}</div>
              </React.Fragment>
            );
          },
        },
      },
      {
        name: "dealName",
        label: "Deal Name",
        options: {
          filter: true,
          sort: true,
          customHeadRender: (columnMeta, updateDirection) => (
            <th
              style={{
                backgroundColor: "rgba(1, 142, 130, 0.1)",
                borderBottom: "none",
                paddingBottom: "10px",
                paddingTop: "10px",
                textAlign: "center",
              }}
            >
              {columnMeta.label}
            </th>
          ),
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <React.Fragment>
                <div className="text-left">{value}</div>
              </React.Fragment>
            );
          },
        },
      },

      {
        name: "assetclass",
        label: "Asset Class",
        options: {
          filter: true,
          sort: true,
          customHeadRender: (columnMeta, updateDirection) => (
            <th
              style={{
                backgroundColor: "rgba(1, 142, 130, 0.1)",
                borderBottom: "none",
                paddingBottom: "10px",
                paddingTop: "10px",
                textAlign: "center",
              }}
            >
              {columnMeta.label}
            </th>
          ),
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <React.Fragment>
                <div className="text-center">{value}</div>
              </React.Fragment>
            );
          },
        },
      },

      {
        name: "originalbalance",
        label: "Principal Balance",
        options: {
          filter: true,
          sort: true,
          customHeadRender: (columnMeta, updateDirection) => (
            <th
              style={{
                backgroundColor: "rgba(1, 142, 130, 0.1)",
                borderBottom: "none",
                paddingBottom: "10px",
                paddingTop: "10px",
                textAlign: "center",
              }}
            >
              {columnMeta.label}
            </th>
          ),
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <React.Fragment>
                <div className="text-right">
                  <NumberComp2 value={value}></NumberComp2>
                </div>
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
          customHeadRender: (columnMeta, updateDirection) => (
            <th
              style={{
                backgroundColor: "rgba(1, 142, 130, 0.1)",
                borderBottom: "none",
                paddingBottom: "10px",
                paddingTop: "10px",
                textAlign: "center",
              }}
            >
              {columnMeta.label}
            </th>
          ),
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <React.Fragment>
                <div className="text-center">{value}</div>
              </React.Fragment>
            );
          },
        },
      },

      {
        name: "numberofTranches",
        label: "No. of Tranches",
        options: {
          filter: true,
          sort: true,
          customHeadRender: (columnMeta, updateDirection) => (
            <th
              style={{
                backgroundColor: "rgba(1, 142, 130, 0.1)",
                borderBottom: "none",
                paddingBottom: "10px",
                paddingTop: "10px",
                textAlign: "center",
              }}
            >
              {columnMeta.label}
            </th>
          ),
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <React.Fragment>
                <div className="text-center">{value}</div>
              </React.Fragment>
            );
          },
        },
      },

      {
        name: "createdDate",
        label: "Set-Up On",
        options: {
          filter: true,
          sort: true,
          customHeadRender: (columnMeta, updateDirection) => (
            <th
              style={{
                backgroundColor: "rgba(1, 142, 130, 0.1)",
                borderBottom: "none",
                paddingBottom: "10px",
                paddingTop: "10px",
                textAlign: "center",
              }}
            >
              {columnMeta.label}
            </th>
          ),
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <React.Fragment>
                <div className="text-center">{value}</div>
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
          customHeadRender: (columnMeta, updateDirection) => (
            <th
              style={{
                backgroundColor: "rgba(1, 142, 130, 0.1)",
                borderBottom: "none",
                paddingBottom: "10px",
                paddingTop: "10px",
                textAlign: "center",
              }}
            >
              {columnMeta.label}
            </th>
          ),
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <React.Fragment>
                <div className="text-center">{value}</div>
              </React.Fragment>
            );
          },
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
                textAlign: "center",
              }}
            >
              {columnMeta.label}
            </th>
          ),
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <React.Fragment>
                <div className="text-center">
                  {/* <Button variant="outlined" id="optionalbutton" type="submit" onClick={this.onOpenModal1.bind(this)}> */}
                  <button
                    onClick={() => this.ViewDetails(value)}
                    className="login-sign_up-link"
                  >
                    View Details
                  </button>
                  {/* </Button> */}
                </div>
              </React.Fragment>
            );
          },
        },
      },
    ];

    return (
      <React.Fragment>
        <div className="page">
          <Sidebar activeComponent={"Opportunities"} />
          <div className="content1">
            {/* {this.state.getLoansLoader == false ? (
              ""
            ) : (
              <LinearLoader></LinearLoader>
            )} */}
            <div className="page-content">
              <div className="row row1">
                <div className="investor-heading-container">
                  <h1 className="headerdashboard">Opportunities</h1>
                </div>

                <div>
                  <div className="dashboard-top-right-container1">
                    <div className="search-bar-outer-container">
                      {
                      this.state.showSearchBox == false ?(
                        <button
                          className="search-mui-icons"
                          type="button"
                          onClick={this.onClickSearchButton}
                        >
                          <SearchOutlinedIcon className="reordersize" />
                        </button>
                      ) : (
                        this.searchBar()
                      )
                    }
                    </div>
                    <div className="buttonchartchanges">
                      <buton
                        onClick={() => this.handleClickReorder()}
                        className={
                          this.state.reorderchart == true
                            ? "reorder-chart-active"
                            : "reorder-chart"
                        }
                        type="button"
                      >
                        <ReorderIcon className="reordersize" />
                      </buton>
                      <buton
                        onClick={() => this.handleClickmoduleicon()}
                        className={
                          this.state.moduleicon == true
                            ? "barchart-chart-active"
                            : "barchart-chart"
                        }
                        type="button"
                      >
                        <ViewModuleIcon className="reordersize" />
                      </buton>
                    </div>
                    {/* <Button className="card__button2" type="submit" onClick={this.onOpenModal.bind(this)}>Add Loans</Button>
                    <Button variant="contained" color="primary" type="submit" onClick={this.onOpenModal1.bind(this)}>Set-up Pool</Button> */}
                  </div>
                </div>
              </div>

              <React.Fragment>
                {this.state.reorderchart == true ? (
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
                ) : (
                  <div className="workbench-table-container">
                    <div className="op-main-main-container">
                      {this.state.tableData.map((data) => (
                        <OpprtunitiesCard data={data} key={data.dealName} />
                      ))}
                    </div>
                  </div>
                )}
              </React.Fragment>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withSnackbar(InvestorDashboard_Opportunities);
