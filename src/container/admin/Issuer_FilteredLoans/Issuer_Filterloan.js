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
import ReactModal from "react-modal";
import {
  widgets,
  CustomFieldTemplate,
  customStyles,
  customStylesauto,
  customStylesautosmallmodal,
} from "../../../components/customscripts/customscript";
import FormLoader from "../../../components/loader/formLoader";
import {
  MapPoolToLoan,
  GetAllPools,
  PoolDetails,
  GetAllLoans,
  UpdateLoanAndPoolStatus,
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
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import NumberComp2 from "../../../components/NumberComp2";
const token = sessionStorage.getItem("token");

class FilteredLoans extends Component {
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
      showSearchBox: false,
      open1: false,
      open2: false,
      formData: {
        poolname: "",
      },
      UserId: sessionStorage.getItem("userid"),
      token: sessionStorage.getItem("token"),
      EmailAddress: sessionStorage.getItem("EmailAddress"),
      loandetails: [],
      PoolListdata: [
        {
          poolID: "222uac234",
          poolname: "Credibly",
        },
        {
          poolID: "222uac235",
          poolname: "UOWN",
        },
        {
          poolID: "222uac236",
          poolname: "Credibly Investor",
        },
        {
          poolID: "222uac237",
          poolname: "UOWN 2",
        },
      ],
      tableData: [],
    };
  }

  onOpenModal = () => {
    console.log("inside modal1");
    this.setState({ open1: true });
  };

  onCloseModal = () => {
    this.setState({
      open1: false,
      formData: {
        poolname: "",
      },
    });
  };

  onSubmit1 = (e) => {
    e.preventDefault();
    console.log(this.state.formData);
    console.log("hello we have clicked the button");
    this.MapPoolToLoan();
    // this.setState({ formData: value.formData })
  };

  handleClicks = () => {
    console.log("hello we have clicked the button");
    // this.props.history.push({
    //   pathname: "/admin/issuerloans",
    // });
    window.location.assign("/admin/issuerloans");
  };

  async selectedpoolid(selected) {
    const arr = [];

    for (var i = 0; i < selected.length; i++) {
      var j = selected[i];
      let PoolID = this.state.tableData[j]["Loan ID"];
      arr.push(PoolID);
    }
    console.log("selected Loans", arr);
    this.setState({ loandetails: arr });
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

  MapPoolToLoan = async () => {
    console.log("poollist", this.state.PoolList);
    let filterdata = this.state.PoolList.filter((value) => {
      return value.poolID === this.state.formData.poolname;
    });
    console.log("filterdata", filterdata[0].poolname);
    var data = {};
    data.loanid = this.state.loandetails;
    data.aitrainedpoolname = filterdata[0].aitrainedpoolname;
    data.poolid = this.state.formData.poolname;
    data.issuerId = this.state.UserId;
    data.token = this.state.token;
    // data.contractaddress = "0xFD6380543eDc62EB255746DED6b7d39baAa414a1";
    console.log("GetAllPools---" + JSON.stringify(data));
    this.setState({ formLoader: true });
    const APIResponse = await MapPoolToLoan(data);
    console.log(APIResponse);
    if (APIResponse.status !== 200) {
      const message = "Something went wrong, please try again";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 5000,
      });
      this.setState({ formLoader: false });
    } else {
      this.setState({ getLoansLoader: false, openPopup: true });

      if (APIResponse.data.success == false) {
        this.setState({ formLoader: false });
        const message = APIResponse.data.message;
        this.props.enqueueSnackbar(message, {
          variant: "error",
          autoHideDuration: 1000,
        });
      } else {
        const message = "Pool Added successfully!";
        this.props.enqueueSnackbar(message, {
          variant: "info",
          autoHideDuration: 1000,
        });
        this.UpdateLoanAndPoolStatus(filterdata[0].poolname);

        //  this.onCloseModal()
      }
    }
  };
  UpdateLoanAndPoolStatus = async (value) => {
    sessionStorage.setItem("poolname", value);
    sessionStorage.setItem("poolid", this.state.formData.poolname);
    var data = {};
    // data.contractaddress = "0xFD6380543eDc62EB255746DED6b7d39baAa414a1";
    data.poolid = this.state.formData.poolname;
    data.poolStatus = "Created";
    data.loanStatus = "Mapped";
    data.token = this.state.token;
    console.log("datata", data);
    const APIResponse = await UpdateLoanAndPoolStatus(data);

    if (APIResponse.status === 200) {
      this.PoolDetails();
    } else {
      const message = "Couldn't fetch the record";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  PoolDetails = async () => {
    // var data = {};
    // data.contractaddress = "0xFD6380543eDc62EB255746DED6b7d39baAa414a1";
    // data.poolid = this.state.formData.poolname;
    // data.issuerId= this.state.UserId
    // data.token = this.state.token
    // console.log("datata", data);
    // const APIResponse = await PoolDetails(data);

    // if (APIResponse.status === 200) {
    //   console.log("AllGetAllPoolsdata--", APIResponse);
    //   sessionStorage.setItem("pooldetailsdata", JSON.stringify(APIResponse.data));
    // this.props.history.push("/admin/pooldetails");
    window.location.assign("/admin/pooldetails");
    // } else {
    //   const message = "Couldn't fetch the record";
    //   this.props.enqueueSnackbar(message, {
    //     variant: "error",
    //     autoHideDuration: 3000,
    //   });
    // }
  };

  GetAllPools = async () => {
    let contractaddress = "0xFD6380543eDc62EB255746DED6b7d39baAa414a1";
    let PoolID = [];
    let PoolName = [];
    let y = [];
    // if (this.state.PoolListdata.length !== 0) {
    //   this.state.PoolListdata.forEach(function (key, value) {
    //         console.log("key", key.poolID)
    //         console.log("value", value)
    //         // var obj = { name: key, label: key }
    //         y.push({ label: key.poolname, value: key.poolID })
    //         PoolID.push(key.poolID);
    //         PoolName.push(key.poolname);
    //     });
    // }

    console.log("APIResponse.data", this.state.PoolListdata);
    console.log("yyyyyy", y);

    // let oldSchema = this.state.schema;
    // console.log("oldstagedata", oldSchema);
    // oldSchema.properties.investorid.enum = UserID;
    // oldSchema.properties.investorid.enumNames = UserName;
    // const newSchema = Object.assign({}, oldSchema);
    // console.log("WRITE oldSchema", newSchema);
    this.setState({ PoolDropdown: y, PoolListLoader: false });
    var data = {};
    data.issuerId = this.state.UserId;
    data.mailid = this.state.EmailAddress;
    data.token = this.state.token;
    const APIResponse = await GetAllPools(data);

    if (APIResponse.status === 200) {
      if (APIResponse !== null) {
        console.log("InvestorList", APIResponse.data);
        this.setState({ PoolList: APIResponse.data.pooldetails });
        let PoolID = [];
        let PoolName = [];
        let y = [];
        if (APIResponse.data.length !== 0) {
          APIResponse.data?.pooldetails.forEach(function (key, value) {
            console.log("key", key.poolID);
            console.log("value", value);
            // var obj = { name: key, label: key }
            y.push({ label: key.poolname, value: key.poolID });
            PoolID.push(key.poolID);
            PoolName.push(key.poolname);
          });
        }

        console.log("APIResponse.data", APIResponse.data);
        console.log("yyyyyy", y);

        // let oldSchema = this.state.schema;
        // console.log("oldstagedata", oldSchema);
        // oldSchema.properties.investorid.enum = UserID;
        // oldSchema.properties.investorid.enumNames = UserName;
        // const newSchema = Object.assign({}, oldSchema);
        // console.log("WRITE oldSchema", newSchema);
        this.setState({ PoolDropdown: y, PoolListLoader: false });
      }
    } else {
      const message = "Couldn't fetch the record";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };
  // GetAllLoans = async () => {
  //   this.setState({ getLoansLoader: true, tableData: [] });
  //   const APIResponse = await GetAllLoans(this.state.UserId,this.state.token);

  //   if (APIResponse.status === 200) {
  //     console.log("Allpoolonboardingdata--", APIResponse);
  //     this.setState({
  //       getLoansLoader: false,
  //       open: true,
  //       tableData: APIResponse.data,
  //       loading: true,
  //     });
  //     // const message = "Record Fetched Successfully";
  //     // this.props.enqueueSnackbar(message, {
  //     //   variant: "info",
  //     //   autoHideDuration: 3000,
  //     // });
  //   } else {
  //     const message = "Couldn't fetch the record";
  //     this.props.enqueueSnackbar(message, {
  //       variant: "error",
  //       autoHideDuration: 3000,
  //     });
  //   }
  // };

  async componentDidMount() {
    var filtereddata = JSON.parse(sessionStorage.getItem("filteredloans"));
    let arrfilter = [];
    filtereddata.map((e) => {
      console.log("arrfilter", e);
      if (e.Status === "Unmapped") {
        arrfilter.push(e);
      }
    });
    console.log("arr1", arrfilter);
    this.setState({ tableData: arrfilter });
    let display = [];

    if (filtereddata.length != 0) {
      Object.keys(filtereddata[0]).map((val) => {
        if (
          val == "_id" ||
          val == "issuerId" ||
          val == "poolid" ||
          val == "System ID"
        ) {
          return;
        }
        let column = {
          name: val,
          label: val,
          // label: label[val] ? label[val] : val,
          options: {
            filter: true,
            sort: true,
            // customBodyRender: (value, tableMeta, updateValue) => {
            //   console.log('values',value)
            //   return (
            //     <React.Fragment>
            //       {value}
            //     </React.Fragment>
            //   );
            // },
          },
        };
        display.push(column);
      });
      console.log("display", display);
      this.setState({ columns: display });
    } else {
      this.setState({ tableData: [] });
    }
    var component = window.location.pathname;
    sessionStorage.setItem("component", component);
    this.GetAllPools();

    // let filterloans = sessionStorage.getItem("filterloans");
    // if (filterloans == undefined) {
    //   this.GetAllLoans();
    // } else {
    //   this.setState({
    //     tableData: JSON.parse(sessionStorage.getItem("filteredloans")),
    //   });
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
              backgroundColor: "rgb(229,229,229,0.3) !important",
            },
            "&.Mui-selected": {
              backgroundColor: "white !important",
            },
          },
        },

        MuiCheckbox: {
          root: {
            color: "#212121ab !important",
          },
          indeterminate: {
            color: "#FFC000 !important",
            border: "1.2px solid #212121 !important",
            borderRadius: "3px !important",
            width: "28px !important",
            height: "28px !important",
            marginLeft: "8px !important",
          },
          colorPrimary: {
            "&.Mui-checked": {
              color: "#FFC000 !important",
              border: "1.2px solid #212121 !important",
              borderRadius: "3px !important",
              width: "30px !important",
              height: "30px !important",
              marginLeft: "8px !important",
            },
            "&.Mui-checked:hover": {
              backgroundColor: "#fff !important",
            },
          },
        },

        MuiTableCell: {
          paddingCheckbox: {
            position: "static !important",
          },
          root: {
            fontFamily: "Mulish, sans-serif !important",
            padding: "20px",
            fontSize: "0.980rem !important",
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
          left: {
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
            backgroundColor: "#fff !important",
            padding: "5px 30px !important",
            marginLeft: "10px !important",
            textTransform: "none !important",
            border: "1.2px solid #212121 !important",
            borderRadius: "20px !important",
            boxShadow: "none !important",
          },
          textPrimary: {
            color: "#018E82 !important",
          },
          label: {
            fontSize: "15px !important",
            fontWeight: "600 !important",
            fontFamily: "Mulish, sans-serif !important",
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
            // color: "#8C8C8C",
            // marginRight: `${this.state.currentPage >= 1 && this.state.currentPage <= 9 ? "-138" : this.state.currentPage >= 10 ?'-142':"-130"}px`,
            fontSize: "0.80rem",
          },
        },
        MuiIconButton: {
          colorInherit: {
            color: "#018E82 !important",
            zIndex: "1000",
            // marginRight: "60px",
            // paddingLeft: "-25px",
          },
        },

        MUIDataTableSelectCell: {
          headerCell: {
            backgroundColor: "rgba(1, 142, 130, 0.1) !important",
            borderBottom: "none !important",
            paddingLeft: "20px !important",
          },
          fixedLeft: {
            borderBottom: "none !important",
            paddingLeft: "20px !important",
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
    const { loandetails } = this.state;
    const selectedArrLen = loandetails.length;
    const options = {
      filterType: "dropdown",
      filter: false,
      search: false,
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
      rowsPerPageOptions: [10, 50, 100],
      // rowsPerPageOptions: false,
      // jumpToPage: false,
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
              <Loader msg={"Please wait, Loading Loan Data"} />
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
          rowsPerPage: "Rows Per Page",
          displayRows: "Of",
        },
      },
    };

    const columns = [
      {
        name: "Loan ID",
        label: "Loan ID",
        options: {
          fiter: true,
        },
      },
      {
        name: "Asset Class",
        label: "Asset Class",
        options: {
          filter: true,
        },
      },
      {
        name: "Originator Name",
        label: "Originator Name",
        options: {
          filter: true,
        },
      },
      {
        name: "Original Principal Balance",
        label: "Original Principal",
        options: {
          filter: true,
        },
      },
      {
        name: "As Of Date",
        label: "As Of Date",
        options: {
          filter: true,
        },
      },
      {
        name: "Loan Data",
        label: "Loan Data",
        options: {
          filter: true,
        },
      },
      {
        name: "Contract Digitized",
        label: "Loan Contract",
        options: {
          filter: true,
        },
      },
      {
        name: "Status",
        label: "Status",
        options: {
          filter: true,
        },
      },
    ];

    // const columns = [
    //   {
    //     name: "loanid",
    //     label: "Loan ID",
    //     options: {
    //       filter: true,
    //       sortCompare: (order) => {
    //         return (obj1, obj2) => {
    //           console.log(order);
    //           let val1 = parseInt(obj1.data, 10);
    //           let val2 = parseInt(obj2.data, 10);
    //           return (val1 - val2) * (order === 'asc' ? 1 : -1);
    //         };
    //       }
    //     },
    //   },

    //   {
    //     name: "asset_class",
    //     label: "Asset Class",
    //     options: {
    //       filter: true,
    //       sort: true,
    //     },
    //   },

    //   {
    //     name: "borrower_name",
    //     label: "Borrower Name",
    //     options: {
    //       filter: true,
    //       sort: true,
    //     },
    //   },

    //   {
    //     name: "current_principal",
    //     label: "Current Principal",
    //     options: {
    //       filter: true,
    //       sort: true,
    //       customBodyRender: (value, tableMeta, updateValue) => {
    //         return (
    //           <React.Fragment>
    //               <NumberComp2 value={value} ></NumberComp2>
    //           </React.Fragment>
    //         );
    //       },
    //     },
    //   },

    //   {
    //     name: "createddate",
    //     label: "Uploaded On",
    //     options: {
    //       filter: true,
    //       sort: true,
    //     },
    //   },

    //   {
    //     name: "contractdata",
    //     label: "Loan Contract",
    //     options: {
    //       filter: true,
    //       sort: true,
    //     },
    //   },
    //   {
    //     name: "contractdigitized",
    //     label: "Digitized Contracts",
    //     options: {
    //       filter: true,
    //       sort: true,
    //     },
    //   },

    //   {
    //     name: "status",
    //     label: "Status",
    //     options: {
    //       filter: true,
    //       sort: true,
    //     },
    //   },
    //   {
    //     name: "_id",
    //     label: "Loan ID",
    //     options: {
    //       filter: true,
    //       sort: true,
    //       display: false,
    //     },
    //   },
    // ];

    return (
      <React.Fragment>
        <div className="page">
          <Sidebar activeComponent={"Loans"} />
          <div className="content1">
            {/* {this.state.getLoansLoader == false ? (
              ""
            ) : (
              <LinearLoader></LinearLoader>
            )} */}
            <div className="page-content">
              <div className="row row1">
                <div>
                  {this.state.showSearchBox == true ? (
                    this.searchBar()
                  ) : (
                    <div className="arrowtextclass">
                      <KeyboardBackspaceIcon
                        onClick={this.handleClicks}
                        className="left-arrow-muis1 filter-icon"
                      ></KeyboardBackspaceIcon>
                      <h1 className="headerdashboard">Filtered Loans</h1>
                    </div>
                  )}
                </div>

                <div>
                  <div className="dashboard-top-right-container1">
                    <div className="search-bar-outer-container1">
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
                    {selectedArrLen > 0 ? (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.onOpenModal.bind(this)}
                        type="submit"
                      >
                        Map to Pool
                      </Button>
                    ) : (
                      <Button
                        variant="contained1"
                        color="primary"
                        onClick={this.onOpenModal.bind(this)}
                        type="submit"
                        disabled
                      >
                        Map to Pool
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              <React.Fragment>
                <MuiThemeProvider theme={this.getMuiTheme()}>
                  <MUIDataTable
                    //  title={<> <KeyboardBackspaceIcon onClick={this.handleClicks} className="left-arrow-muis"></KeyboardBackspaceIcon>Filtered Loans</>}
                    data={this.state.tableData}
                    // data={this.state.tabledatafilter}
                    columns={columns}
                    options={options}
                  />
                </MuiThemeProvider>
              </React.Fragment>
            </div>
          </div>

          <div className="filter">
            <div id="modal1">
              {/* <Modal open={open1} onClose={this.onCloseModal1} center>
                    <div id="modalheader">
                      <h5>Create a Pool</h5>

                    </div> */}

              <ReactModal
                isOpen={this.state.open1}
                onRequestClose={this.onCloseModal}
                contentLabel="Minimal Modal Example"
                style={customStylesautosmallmodal}
              >
                <React.Fragment>
                  <div className="modalPopup2">
                    <div className="popupTitle">
                      <h2>Map Selected Loans to Pool</h2>
                      <button
                        type="button"
                        className="closePopup"
                        style={{ minWidth: "30px" }}
                        onClick={this.onCloseModal}
                      >
                        {" "}
                        <CloseIcon></CloseIcon>{" "}
                      </button>
                    </div>

                    {/* {this.state.popupLoader === true ? <CircularProgress size="30px" color="secondary" /> : ' '} */}

                    <div className="modalshiftcontent">
                      <form
                        className="form-container"
                        onSubmit={this.onSubmit1}
                      >
                        <div className="input-container">
                          <label className="label">Pool Name</label>
                          {this.state.PoolListLoader === false ? (
                            <select
                              required
                              className="input-select"
                              onChange={(e) => {
                                this.setState({
                                  formData: {
                                    ...this.state.formData,
                                    poolname: e.target.value,
                                  },
                                });
                              }}
                              value={this.state.formData.poolname}
                            >
                              <option value="" disabled className="selectclass">
                                Select Any One{" "}
                              </option>
                              {this.state.PoolDropdown.map((item) => {
                                return (
                                  <option value={item.value}>
                                    {item.label}
                                  </option>
                                );
                              })}
                            </select>
                          ) : (
                            ""
                          )}
                        </div>

                        <div className="modalsubmit">
                          <div className="submitbuttonbg">
                            <div className="row">
                              <div className="row justify-content-end3">
                                <button
                                  type="button"
                                  className="popupbutton22"
                                  onClick={this.onCloseModal}
                                >
                                  {" "}
                                  Cancel{" "}
                                </button>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  type="submit"
                                >
                                  Map Now
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
        </div>
      </React.Fragment>
    );
  }
}

export default withSnackbar(FilteredLoans);
