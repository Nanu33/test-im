/* eslint-disable require-jsdoc */
import React, { Component } from "react";
// import { connect } from 'react-redux';
import Header from "../../../components/header";
import Sidebar from "../../../components/sidebar";
import MUIDataTable from "mui-datatables";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import { withSnackbar } from "notistack";
import { Theme as MuiTheme } from "rjsf-material-ui";
import ReactModal from "react-modal";
import {
  customStylesautosmallmodalpopup,
} from "../../../components/customscripts/customscript";
import { FullscreenExit, TrainRounded } from "@material-ui/icons";
import {
  ThemeProvider,
  createTheme,
  MuiThemeProvider,
} from "@material-ui/core/styles";
import "react-input-range/lib/css/index.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import ReorderIcon from "@material-ui/icons/Reorder";
import OpprtunitiesCard from '../InvestorDashboard/Opportunities_card';
import ViewModuleIcon from "@material-ui/icons/ViewModule";
class KYCLoginPopupStep1 extends Component {
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
      poolName: sessionStorage.getItem("poolname"),
      activeInsights1: false,
      activeInsights2: false,
      activeInsights3: true,
      showSearchBox: false,
      showStartPopUp: true,
      investorInsights1:true,
      investorInsights2:false,
      activeDeals: true,
      reorderchart: true,
      activePools: false,
      activePoolsUnder:true,
      Submittoggle:false,
      userRole:sessionStorage.getItem('userrole')
    };
  }

  handleClickInsights = () => {
    this.setState({
      activeInsights1: true,
      activeInsights2: false,
      activeInsights3: false,
    });
  };

  handleClickLoans = () => {
    this.setState({
      activeInsights1: false,
      activeInsights2: true,
      activeInsights3: false,
    });
  };
  handleClickPools = () => {
    this.setState({
      activeInsights1: false,
      activeInsights2: false,
      activeInsights3: true,
    });
  };


  handleClick = () => {
    this.props.history.push({
      pathname: "/kyc1login",
    });
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
          id="outlined-basic"
          value={this.state.searchText}
          onChange={this.onchange}
          label="Search"
          variant="filled"
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


  async componentDidMount() {
    let EmailAddress = sessionStorage.getItem("EmailAddress");
    this.setState({ EmailAddress: EmailAddress });
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
            "&:nth-child(odd)": {
              backgroundColor: "",
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
            border: "2px solid #212121 !important",
            borderRadius: "20px !important",
            boxShadow: "none !important",
          },
          outlined: {
            fontFamily: "Mulish, sans-serif !important",
            backgroundColor: "#fff !important",
            padding: "5px 30px !important",
            marginLeft: "10px !important",
            textTransform: "none !important",
            border: "2px solid #212121 !important",
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
            fontFamily: "Mulish, sans-serif !important",
            color: "#8C8C8C",
            marginRight: "-119px",
            fontSize: "0.90rem",
          },
        },
        MuiIconButton: {
          colorInherit: {
            color: "#018E82 !important",
            marginRight: "60px",
          },
        },

        MUIDataTable: {
          paper: {
            boxShadow: "none !important",
          },
          responsiveBase: {
            border: "2px solid #212121 !important",
            borderRadius: "20px !important",
            height: "70vh!important",
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
      selectableRowsOnClick: true,
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
      // loading: false,
      textLabels: {
        body: {
          noMatch:
            this.state.loading === true
              ? "Sorry, there is no matching data to display"
              : null,
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
        name: "pooid",
        label: "Pool ID",
        options: {
          filter: true,
          sort: true,
        },
      },

      {
        name: "poolname",
        label: "Pool Name",
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
        name: "noofloans",
        label: "No. of Loans",
        options: {
          filter: true,
          sort: true,
        },
      },

      {
        name: "setupon",
        label: "Set-up On",
        options: {
          filter: true,
          sort: true,
        },
      },

      {
        name: "originalbalance",
        label: "Original Balance",
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
        name: "pooid",
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
                  <Link to={""} className="login-sign_up-link">
                    View Details
                  </Link>
                  {/* </Button> */}
                </div>
              </React.Fragment>
            );
          },
        },
      },
    ];

    const optionsVerify = {

      customToolbar: ()=>{return(<span><Button variant="outlined" type="submit">View Pending Pools</Button>
       {this.state.Submittoggle == 'true' ? 
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                    >
                      Submit Verification
                    </Button>
                    :
                    <Button
                      variant="contained1"
                      color="primary"
                      type="submit"
                      className="buttoncss"
                      disabled
                    >
                   Submit Verification
                    </Button>
                  }
      </span>)},
      
      filterType: "dropdown",
      filter: true,
      search: true,
      print: false,
      viewColumns: false,
      download: false,
      rowHover: false,
      selectableRowsOnClick: false,
      selectToolbarPlacement: "none",
      selectableRows: true,
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
        this.setState({currentPage:currentPage})
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
              "Please wait, Loading Loan Data"
            ) : (
              <div></div>
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



    const columnsAgent = [
      {
        name: "dealId",
        label: "Deal Id",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
          name: "dealname",
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
          name: "principalbalance",
          label: "Principal Balance",
          options: {
              filter: true,
              sort: true,
              // customBodyRender: (value, tableMeta, updateValue) => {
              //   return (
              //     <React.Fragment>
              //       <NumberComp value={value}></NumberComp>
              //     </React.Fragment>
              //   );
              // },
          },
      },

      {
          name: "noofloans",
          label: "No. of Loans",
          options: {
              filter: true,
              sort: true,
          },
      },

      {
          name: "nooftranches",
          label: "No. of Tranches",
          options: {
              filter: true,
              sort: true,
          },
      },

      {
          name: "setupon",
          label: "Set-Up On",
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
          name: "dealname",
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
                  return (
                      <React.Fragment>
                          <React.Fragment>
                              <div className="">
                                  <span>
                                      {/* <Button variant="outlined" id="optionalbutton" type="submit" onClick={this.onOpenModal1.bind(this)}> */}
                                      <button className="popupbutton1" onClick={() => this.ViewDetails(value)}>View Details</button>
                                     
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
  const columnsVerification = [
    {
      name: "poolID",
      label: "Pool ID",
      options: {
        filter: true,
        sort: true,
      },
    },

    {
      name: "poolname",
      label: "Pool Name",
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
      name: "issuerName",
      label: "Issuer",
      options: {
        filter: true,
        sort: true,
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
      name: "status",
      label: "Status",
      options: {
        filter: true,
        sort: true,
      },
    },

    {
      name: "poolID",
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
              paddingLeft: "20px"
              
            }}
          >
            {columnMeta.label}
          </th>
        ),
        customBodyRender: (value, tableMeta, updateValue) => {
          return (

            <React.Fragment>
            <div className="">
              <span>
              {/* <Button variant="outlined" id="optionalbutton" type="submit" onClick={this.onOpenModal1.bind(this)}> */}
              <button className="popupbutton1" onClick={() => this.PoolDetails(value)}>
                View Details
              </button>
              <button className="popupbuttons1" onClick={()=>this.handleClick1(value,tableMeta.rowData[5],tableMeta.rowData[1])}>
                View Loans
              </button>
              </span>
              {/* </Button> */}
            </div>
          </React.Fragment>
          );
        },
      },
    },
  ];

  const columnsInvestor = [
    {
      name: "dealid",
      label: "Deal Id",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "dealname",
      label: "Deal Name",
      options: {
        filter: true,
        sort: true,
      },
    },

    {
      name: "tranchename",
      label: "Tranch Name",
      options: {
        filter: true,
        sort: true,
      },
    },

    {
      name: "originalinvestment",
      label: "Original Investment",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <React.Fragment>
            </React.Fragment>
          );
        },
      },
    },

    {
      name: "interestrate",
      label: "Interest Rate",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <React.Fragment>{value}</React.Fragment>;
        },
      },
    },

    {
      name: "interestpaid",
      label: "Interest Paid",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <React.Fragment>
            </React.Fragment>
          );
        },
      },
    },

    {
      name: "principalpaid",
      label: "Principal Paid",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <React.Fragment>
            </React.Fragment>
          );
        },
      },
    },

    {
      name: "outstandinginvestment",
      label: "Outstanding Investment",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <React.Fragment>
            </React.Fragment>
          );
        },
      },
    },

    {
      name: "dealid",
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

                {/* </Button> */}
              </div>
            </React.Fragment>
          );
        },
      },
    },
  ];

  const columnsUW = [
    {
      name: "poolid",
      label: "Pool ID",
      options: {
        filter: true,
        sort: true,
      },
    },

    {
      name: "poolname",
      label: "Pool Name",
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
      name: "numberofloans",
      label: "No. of Loans",
      options: {
        filter: true,
        sort: true,
      },
    },

    {
      name: "setupdate",
      label: "Set-up On",
      options: {
        filter: true,
        sort: true,
      },
    },

    {
      name: "originalbalance",
      label: "Original Balance",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <React.Fragment>
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
              <div className="text-center">{value}</div>
            </React.Fragment>
          );
        },
      },
    },

    {
      name: "poolid",
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
          console.log('table',tableMeta.rowData[6])
          return (
            <React.Fragment>
              <div className="">
                <span>
                  {/* <Button variant="outlined" id="optionalbutton" type="submit" onClick={this.onOpenModal1.bind(this)}> */}
                  <button className="popupbutton1" onClick={()=>this.PoolDetails(value)}>View Details</button>
                  { tableMeta.rowData[6] == 'Verified' ?
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
                  </React.Fragment>: null}
                </span>
                {/* </Button> */}
              </div>
            </React.Fragment>
          );
        },
      },
    },
  ];
  const columnsSerivcer = [
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
        name: "createdDate",
        label: "Set-Up On",
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
            return (
              <React.Fragment>
                <React.Fragment>
              <div className="">
                <span>
                  {/* <Button variant="outlined" id="optionalbutton" type="submit" onClick={this.onOpenModal1.bind(this)}> */}
                  <button className="popupbutton1" onClick={() => this.ViewDetails(value)}>View Details</button>
          
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
        <div className="page">
                {this.state.userRole === "Issuer" ? (
                <div>
                  <Sidebar activeComponent={"IssuerDashboard"} />
                  <div className="content1">
                    <div className="header">
                      <Header></Header>
                    </div>
                    {/* {this.state.getLoansLoader == false ? '' : <LinearLoader></LinearLoader>} */}
                    <div className="page-content">
                      <div className="row row1">
                        <div className="investor-heading-container">
                          {this.state.showSearchBox == true ? (
                            this.searchBar()
                          ) : (
                            <h1 className="headerdashboard">Dashboard</h1>
                          )}
                        </div>

                        <div>
                          <div className="tablechangebutton">
                            <buton
                              type="button"
                              onClick={() => this.handleClickInsights()}
                              className={
                                this.state.activeInsights1 == true
                                  ? "issuerDashboard-table-top-button-insights-active"
                                  : "issuerDashboard-table-top-button-insights"
                              }
                            >
                              Portfolio
                            </buton>

                            <buton
                              type="button"
                              onClick={() => this.handleClickPools()}
                              className={
                                this.state.activeInsights3 == true
                                  ? "issuerDashboard-table-top-button-workbench-active"
                                  : "issuerDashboard-table-top-button-workbench"
                              }
                            >
                              Pools
                            </buton>

                            <buton
                              type="button"
                              onClick={() => this.handleClickLoans()}
                              className={
                                this.state.activeInsights2 == true
                                  ? "issuerDashboard-table-top-button-rejected-active"
                                  : "issuerDashboard-table-top-button-rejected"
                              }
                            >
                              Loans
                            </buton>
                            <buton
                              type="button"
                              onClick={() => this.handleClickLoans()}
                              className={
                                this.state.activeInsights2 == true
                                  ? "issuerDashboard-table-top-button-rejected-active"
                                  : "issuerDashboard-table-top-button-rejected"
                              }
                            >
                              Deals
                            </buton>
                          </div>
                        </div>

                        <div>
                          <div className="dashboard-top-right-container1">
                            <div className="search-bar-outer-container">
                              {this.state.showSearchBox == false && (
                                <button
                                  className="search-mui-icons"
                                  type="button"
                                  onClick={this.onClickSearchButton}
                                >
                                  <SearchOutlinedIcon />
                                </button>
                              )}
                            </div>
                            <Button className="card__button2" type="submit">
                              Add Loans
                            </Button>
                            <Button
                              variant="contained"
                              color="primary"
                              type="submit"
                            >
                              Set-up Pool
                            </Button>
                          </div>
                        </div>
                      </div>

                      <React.Fragment>
                        {this.state.activeInsights1 == true ? (
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
                        ) : this.state.activeInsights2 == true ? (
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
                            <MuiThemeProvider theme={this.getMuiTheme()}>
                              <MUIDataTable
                                // title={'Dashboard'}
                                data={this.state.tableData}
                                columns={columns}
                                options={options}
                              />
                            </MuiThemeProvider>
                          </div>
                        )}
                      </React.Fragment>
                    </div>
                  </div>
                </div>
              ) : this.state.userRole === "Paying Agent" ? (
                <div>
                  <Sidebar activeComponent={"PayingAgentDeal"} />

                  <div className="content1">
                    <div className="header">
                      <Header></Header>
                    </div>
                    <div className="page-content">
                      <div className="row row1">
                        <div className="investor-heading-container">
                          {this.state.showSearchBox == true ? (
                            this.searchBar()
                          ) : (
                            <h1 className="headerdashboard">Dashboard</h1>
                          )}
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
                              {this.state.showSearchBox == false && (
                                <Button
                                  variant="contained"
                                  color="primary"
                                  type="button"
                                  onClick={this.onClickSearchButton}
                                >
                                  Search
                                </Button>
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
                              columns={columnsAgent}
                              options={options}
                            />
                          </MuiThemeProvider>
                        </div>
                      </React.Fragment>
                    </div>
                  </div>
                </div>
              ) : this.state.userRole === "Verification" ? (
                <div>
                    <Sidebar activeComponent="VA_Dashboard" />
                  <div className="content1">
                    <div className="header">
                      <Header></Header>
                    </div>
                    <div className="page-content">
                      <React.Fragment>
                        <div className="workbench-table-container">
                          <MuiThemeProvider theme={this.getMuiTheme()}>
                            <MUIDataTable
                              title={"Dashboard"}
                              data={this.state.tableData}
                              columns={columnsVerification}
                              options={options}
                            />
                          </MuiThemeProvider>
                        </div>
                      </React.Fragment>
                    </div>
                  </div>
                </div>
              ) : this.state.userRole === "Investor" ? (
                <div>
                  <Sidebar
                    activeComponent={"InvestorDashboard_Opportunities"}
                  />

                  <div className="content1">
                    <div className="header">
                      <Header></Header>
                    </div>
                    {/* {this.state.getLoansLoader == false ? (
              ""
            ) : (
              <LinearLoader></LinearLoader>
            )} */}
                    <div className="page-content">
                      <div className="row row1">
                        <div className="investor-heading-container">
                          {this.state.showSearchBox == true ? (
                            this.searchBar()
                          ) : (
                            <h1 className="headerdashboard">Dashboard</h1>
                          )}
                        </div>

                        <div>
                          <div className="tablechangebutton table_change-investor-buttons">
                            {/* <buton
                      type="button"
                      onClick={() => this.handleClickInsights()}
                      className={this.state.activeInsights1 == true ? "issuerDashboard-table-top-button-insights-active" : "issuerDashboard-table-top-button-insights"}>
                      Insights
                    </buton> */}
                            <buton
                              type="button"
                              onClick={() => this.handleClickInvested()}
                              className={
                                this.state.investorInsights1 == true
                                  ? "issuerDashboard-table-top-button-rejected-active"
                                  : "issuerDashboard-table-top-button-rejected"
                              }
                            >
                              Portfolio
                            </buton>
                            <buton
                              type="button"
                              onClick={() => this.handleClickOpportunities()}
                              className={
                                this.state.investorInsights2 == true
                                  ? "issuerDashboard-table-top-button-workbench-active"
                                  : "issuerDashboard-table-top-button-workbench"
                              }
                            >
                              Opportunities
                            </buton>
                          </div>
                        </div>

                        <div>
                          <div className="dashboard-top-right-container1">
                            <div className="search-bar-outer-container">
                              {this.state.showSearchBox == false && (
                                <button
                                  className="search-mui-icons"
                                  type="button"
                                  onClick={this.onClickSearchButton}
                                >
                                  <SearchOutlinedIcon className="reordersize" />
                                </button>
                              )}
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
                                columns={columnsInvestor}
                                options={options}
                              />
                            </MuiThemeProvider>
                          </div>
                        ) : (
                          <div className="workbench-table-container">
                            <div className="op-main-main-container">
                              {this.state.tableData.map((data) => (
                                <OpprtunitiesCard
                                  data={data}
                                  key={data.dealName}
                                />
                              ))}
                            </div>
                          </div>
                        )}
                      </React.Fragment>
                    </div>
                  </div>
                </div>
              ) : this.state.userRole === "Underwriter" ? (
                <div>
                  <Sidebar activeComponent={"UW_Dashboard_Pools"} />
                  <div className="content1">
                    <div className="header">
                      <Header></Header>
                    </div>

                    <div className="page-content">
                      <div className="row row1">
                        <div className="investor-heading-container">
                          {this.state.showSearchBox == true ? (
                            this.searchBar()
                          ) : (
                            <h1 className="headerdashboard">Dashboard</h1>
                          )}
                        </div>

                        <div>
                          <div className="tablechangebutton3">
                            <buton
                              type="button"
                              onClick={() => this.handleClickPools()}
                              className={
                                this.state.activePoolsUnder == true
                                  ? "issuerDashboard-table-top-button-workbench-active"
                                  : "issuerDashboard-table-top-button-workbench"
                              }
                            >
                              Pools
                            </buton>

                            <buton
                              type="button"
                              onClick={() => this.handleClickDeals()}
                              className={
                                this.state.activePoolsUnder == false
                                  ? "issuerDashboard-table-top-button-insights-active"
                                  : "issuerDashboard-table-top-button-insights"
                              }
                            >
                              Deals
                            </buton>
                          </div>
                        </div>

                        <div>
                          <div className="dashboard-top-right-container1">
                            <div className="search-bar-outer-container uw-search-button-container">
                              {this.state.showSearchBox == false && (
                                <Button
                                  variant="contained"
                                  color="primary"
                                  type="button"
                                  onClick={this.onClickSearchButton}
                                >
                                  Search
                                </Button>
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
                              columns={columnsUW}
                              options={options}
                            />
                          </MuiThemeProvider>
                        </div>
                      </React.Fragment>
                    </div>
                  </div>
                </div>
              ) : this.state.userRole === "Servicer" ? (
                <div>
                  <Sidebar activeComponent={"ServicerDashboardDeals"} />
                  <div className="content1">
                    <div className="header">
                      <Header></Header>
                    </div>
                    {/* {this.state.getLoansLoader == false ? (
              ""
            ) : (
              <LinearLoader></LinearLoader>
            )} */}
                    <div className="page-content">
                      <div className="row row1">
                        <div className="investor-heading-container">
                          {this.state.showSearchBox == true ? (
                            this.searchBar()
                          ) : (
                            <h1 className="headerdashboard">Dashboard</h1>
                          )}
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
                              {this.state.showSearchBox == false && (
                                <Button
                                  variant="contained"
                                  color="primary"
                                  type="button"
                                  onClick={this.onClickSearchButton}
                                >
                                  Search
                                </Button>
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
                              columns={columnsSerivcer}
                              options={options}
                            />
                          </MuiThemeProvider>
                        </div>
                      </React.Fragment>
                    </div>
                  </div>
                </div>
              ) : null}

          {this.state.showStartPopUp && (
            <ReactModal
              isOpen={this.state.showStartPopUp}
              // contentLabel="Minimal Modal Example"
              style={customStylesautosmallmodalpopup}
            >
              <div className="new-modal-popup">
                {/* <div className="shiftingpopup"> */}
                {/* <div className="card__container2"> */}
                <React.Fragment>
                  <div className="modalPopup2">
                    <h3>Confirm Email</h3>

                    <div className="modalshiftcontent">
                      <p className="dataEmail">
                        We sent an email to {this.state.EmailAddress}. Please
                        check your inbox and click the Confirm Link.
                      </p>

                      {/* {this.state.openPopup === true ? <React.Fragment><Snackbar msg={"Processor addded Successfully" || this.state.message} open="true" /> </React.Fragment> : ' '} */}
                    </div>
                  </div>
                </React.Fragment>

                {/* </div> */}
                {/* </div> */}
              </div>
            </ReactModal>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default withSnackbar(KYCLoginPopupStep1);
