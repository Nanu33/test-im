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
import { TableVirtuoso } from "react-virtuoso";

import {
  widgets,
  CustomFieldTemplate,
  customStyles,
  customStylesauto,
  customStylesautosmallmodal,
} from "../../../../components/customscripts/customscript";
import FormLoader from "../../../../components/loader/formLoader";
import {
  GetAllPools,
  SetUpPool,
  SetUpPoolRoles,
  Uploadloanlms,
  Onboradloans,
  PoolDetails,
  UpdatePoolUWStatus,
  CreateDealUW,
  getpoolsfrombcbyunderwriter,
  previewunderwriterpool,
  previewupdatePoolStatus,
} from "../../../../servies/services";
import Match from "../../../../images/match.png";
import Mismatch from "../../../../images/mismatch.png";
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
  TableContainer,
} from "@material-ui/core";
import Slider from "@material-ui/core/Slider";
import { SliderThumb } from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import AddCircleOutlinedIcon from "@material-ui/icons/AddCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import NumberComp2 from "../../../../components/NumberComp2";
import Arrow from "../../../../images/Arrow.png";

const token = sessionStorage.getItem("token");
const SortIcon = ({ sortAscending }) => (
  <img
    src={Arrow}
    style={{
      transform: sortAscending ? "rotate(180deg)" : "rotate(0deg)",
      height: "12px",
    }}
  />
);
const TableComponents = {
  Scroller: React.forwardRef((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => <Table {...props} style={{ borderCollapse: "separate" }} />,
  TableHead: TableHead,
  TableRow: TableRow,
  TableBody: React.forwardRef((props, ref) => (
    <TableBody {...props} ref={ref} />
  )),
};
const formatNumberWithCommas = (number) => {
  return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

class UW_Preview_Pools extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: sessionStorage.getItem("token"),
      selectedRecords: [],
      eligibleloans: {},
      tableData: [],
      tableData2: [],
      loading: false,
      getLoansLoader: false,
      formLoader: false,
      open: false,
      openPopup: false,
      selectedLoanId: [],
      searchText: "",
      rowsSelected: null,
      open1: false,
      open2: false,
      formData: {
        poolname: "",
        // aiConfiguration: "",
        assetclass: "",
        // assignverification: "",
        //assignservicer: "",
        //assignunderwriter: "",
        //assignpayingagent: "",
        description: "",
        //document: "",
        //purpose: "",
      },
      poolName: sessionStorage.getItem("poolname"),
      firstname: sessionStorage.getItem("firstname"),
      lastname: sessionStorage.getItem("lastname"),
      UserId: sessionStorage.getItem("userid"),
      EmailAddress: sessionStorage.getItem("EmailAddress"),
      kycuploadstatus: sessionStorage.getItem("KycUploadStatus"),
      kycverifystatus: sessionStorage.getItem("KycVerifiedStatus"),
      TermsOfService: sessionStorage.getItem("TermsOfService"),
      organizationname: sessionStorage.getItem("organizationname"),
      activeInsights1: false,
      activeInsights2: false,
      activeInsights3: true,
      activeInsights4: false,
      showSearchBox: false,
      file1: "",
      file2: "",
      serialno: "12",
      contractaddress: "0xFD6380543eDc62EB255746DED6b7d39baAa414a1",
      VerificationDropdown: [],
      UnderwriterDropdown: [],
      ServicerDropdown: [],
      AiConfigurationDropdown: [],
      PayingagentDropdown: [],
      LoanIdData: [],
      ColumnName: [],
      notificationlist: [],
      screendisplay: true,
      showStartPopUp: true,
      formData1: {
        asset_class: "",
      },
      showMessage: false,
      value: "",
    };
    this.onCloseModal1 = this.onCloseModal1.bind(this);
    this.GetAllPools = this.GetAllPools.bind(this);
  }
  sortPoolDetails = () => {
    const { tableData, notificationlist } = this.state;
    const sortedLoanDetails = tableData.sort((a, b) => {
      const indexA = notificationlist.indexOf(a["poolID"]);
      const indexB = notificationlist.indexOf(b["poolID"]);

      return indexB - indexA;
    });

    this.setState({ tableData: sortedLoanDetails });
  };
  handleSort = (column) => {
    const {
      sortColumn,
      sortAscending,
      tableData,
      filteredData,
      searchText,
      notificationlist,
    } = this.state;

    // Determine the new sort order
    let newSortAscending;
    if (sortColumn === column) {
      newSortAscending = !sortAscending;
    } else {
      // Default to ascending order when sorting a new column
      newSortAscending = true;
    }

    if (column === "Actions") {
      const sortedPoolDetails = tableData.slice().sort((a, b) => {
        const indexA = notificationlist.indexOf(a["poolID"]);
        const indexB = notificationlist.indexOf(b["poolID"]);
        const sortOrder = newSortAscending ? indexB - indexA : indexA - indexB;
        return sortOrder;
      });

      this.setState({
        tableData: sortedPoolDetails,
        sortColumn: column,
        sortAscending: newSortAscending,
      });
      return;
    }

    // Custom compare function for sorting
    const compareFunc = (a, b) => {
      const valueA = a[column];
      const valueB = b[column];

      // Check if both values are numbers
      if (!isNaN(valueA) && !isNaN(valueB)) {
        return newSortAscending ? valueA - valueB : valueB - valueA;
      } else {
        // If one or both values are not numbers, compare them as strings
        const stringA = valueA ? String(valueA).toLowerCase() : "";
        const stringB = valueB ? String(valueB).toLowerCase() : "";

        if (stringA < stringB) return newSortAscending ? -1 : 1;
        if (stringA > stringB) return newSortAscending ? 1 : -1;
        return 0;
      }
    };

    let sortedData;
    if (searchText) {
      // If there's a search term, sort the filtered data
      sortedData = filteredData.slice().sort(compareFunc);
    } else {
      // If no search term, sort the full data
      sortedData = tableData.slice().sort(compareFunc);
      this.sortPoolDetails();
    }

    // Update the appropriate data array based on the scenario
    this.setState({
      tableData: sortedData,
      sortColumn: column,
      sortAscending: newSortAscending,
    });
  };

  handleClick = () => {
    // this.props.history.push({
    //   pathname: "/pendingkyc",
    // });
    window.location.assighn("/pendingkyc");
  };
  handleClickSubmitted = () => {
    console.log("handleClickSubmitted");
    // this.props.history.push({
    //   pathname: "/kycloginstep2",
    // });
    window.location.assign("/kycloginstep2");
  };
  handleClickUpload = () => {
    // this.props.history.push({
    //   pathname: "/kycloginstep1",
    // });
    window.location.assign("/kycloginstep1");
  };

  handleClickInsights = () => {
    this.setState({
      activeInsights1: true,
      activeInsights2: false,
      activeInsights3: false,
      activeInsights4: false,
    });
    window.location.assign("/admin/issuerinsights");
  };

  handleClickLoans = () => {
    this.setState({
      activeInsights1: false,
      activeInsights2: true,
      activeInsights3: false,
      activeInsights4: false,
    });
    window.location.assign("/admin/issuerloans");
  };
  handleClickPools = () => {
    this.setState({
      activeInsights1: false,
      activeInsights2: false,
      activeInsights3: true,
      activeInsights4: false,
    });
  };
  handleClickDeals = () => {
    this.setState({
      activeInsights1: false,
      activeInsights2: false,
      activeInsights3: false,
      activeInsights4: true,
    });
    window.location.assign("/admin/issuerdeals");
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
    this.setState({
      open1: false,
    });
  };

  onCloseModal1 = () => {
    this.setState({
      open2: false,
      formData: {
        note: "",
      },
    });
  };

  viewdetails = async (value, poolname, status) => {
    sessionStorage.setItem("poolname", poolname);
    sessionStorage.setItem("poolid", value);
    if (status === "Pending") {
      const message = "Please accept the pool";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    } else if (status === "Rejected By Underwriter") {
      const message = "Rejected By Underwriter";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    } else {
      window.location.assign("/admin/preview_pool_details");
    }
  };

  previewupdatePoolStatus = async (value, poolid) => {
    this.setState({ formLoader: true });
    var data = {};
    data.poolid = poolid;
    data.status = value;
    data.userid = this.state.UserId;
    data.token = this.state.token;
    data.organizationname = this.state.organizationname;
    data.username = this.state.firstname + this.state.lastname;
    data.message = this.state.formData.note;
    const APIResponse = await previewupdatePoolStatus(data);
    if (APIResponse.status === 200) {
      if (value == "Accepted By Underwriter") {
        const message = "Accepted Successfully";
        this.props.enqueueSnackbar(message, {
          variant: "info",
          autoHideDuration: 3000,
        });
        window.location.reload();
        //this.CreateDealUW(poolid)
      } else {
        const message = "Rejected Successfully";
        this.props.enqueueSnackbar(message, {
          variant: "info",
          autoHideDuration: 3000,
        });
        window.location.reload();
        //this.getpoolsfrombcbyunderwriter()
      }
      this.onCloseModal();
      this.onCloseModal1();
      this.setState({ formLoader: false });
    } else {
      this.setState({ formLoader: false });
      const message = "Couldn't change the status";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  onSubmit1 = (e) => {
    e.preventDefault();
    this.SetUpPool();
  };

  onSubmit2 = (e) => {
    e.preventDefault();
    console.log(this.state.formData1);
    this.Uploadloanlms();
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

  onchange = (event) => {
    const searchText = event.target.value.toLowerCase();
    const { tableData } = this.state;

    const filteredData = tableData.filter((row) => {
      for (let key in row) {
        if (
          row[key] &&
          row[key].toString().toLowerCase().includes(searchText)
        ) {
          return true;
        }
      }
      return false;
    });

    this.setState({
      searchText: event.target.value,
      filteredData: filteredData,
      isDataFound: filteredData.length > 0,
    });
  };
  searchBar = () => (
    <div className="search-bar-main-container" id="searchBox">
      <div className="tableSearch1">
        <TextField
          value={this.state.searchText}
          onChange={this.onchange}
          placeholder="Search"
          color="#212121"
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

  // 1

  // handleOnChange1 = (e) => {
  //   this.setState({
  //     file1: e.target.files[0],
  //     filename: e.target.files[0].name,
  //   });
  //   console.log("eeee", e.target.files[0].name);
  //   console.log("file1", e.target.files[0]);
  // };

  handleOnChange2 = (e) => {
    this.setState({
      file1: e.target.files[0],
      filename1: e.target.files[0].name,
    });
    console.log("eeee", e.target.files[0].name, this.state.file1);
  };

  GetAllPools = async () => {
    let contractaddress = "0xFD6380543eDc62EB255746DED6b7d39baAa414a1";
    this.setState({ tableData: [], loading: true });
    var data = {};
    data.issuerId = this.state.UserId;
    data.mailid = this.state.EmailAddress;
    data.token = this.state.token;
    const APIResponse = await GetAllPools(data);

    if (APIResponse.status === 200) {
      console.log("AllGetAllPoolsdata--", APIResponse);
      if (APIResponse.data.length != 0) {
        this.setState({
          open: true,
          tableData: APIResponse.data,
          loading: false,
          serialno: APIResponse.data.length,
        });
      } else {
        this.setState({ loading: false, tableData: [] });
      }
      // const message = "Record Fetched Successfully";
      // this.props.enqueueSnackbar(message, {
      //   variant: 'info',
      //   autoHideDuration: 3000,
      // });
    } else {
      this.setState({ loading: false });
      const message = "Couldn't fetch the record";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  SetUpPool = async (value) => {
    this.setState({ formLoader: true });
    var data = this.state.formData;
    data.poolname = this.state.formData.poolname;
    data.assetclass = this.state.formData.assetclass;

    //data.serialno = this.state.serialno;
    data.issuerId = this.state.UserId;
    data.description = this.state.formData.description;
    data.issuerName = this.state.firstname;
    data.token = this.state.token;

    sessionStorage.setItem("setuppooldetails", [
      data.poolname,
      data.assetclass,
      data.description,
    ]);
    const APIResponse = await SetUpPool(data);
    console.log(APIResponse);
    // data.contractaddress = this.state.contractaddress;
    // let result = this.state.VerificationDropdown.filter(
    //   (e) => this.state.formData.assignverification === e.value
    // )[0];
    // let result1 = this.state.UnderwriterDropdown.filter(
    //   (e) => this.state.formData.assignunderwriter === e.value
    // )[0];
    // let result2 = this.state.ServicerDropdown.filter(
    //   (e) => this.state.formData.assignservicer === e.value
    // )[0];
    // let result3 = this.state.PayingagentDropdown.filter(
    //   (e) => this.state.formData.assignpayingagent === e.value
    // )[0];

    // console.log("result", result);
    // data.assignverificationname = result.label;
    // data.assignunderwritername = result1.label;
    // data.assignservicername = result2.label;
    // data.assignpayingagentname = result3.label;
    // data.aitrainedpoolname = this.state.formData.aiConfiguration;

    // console.log("GetAllPools---" + JSON.stringify(data));
    // this.setState({ formLoader: true });
    // const APIResponse = await SetUpPool(data);
    // console.log(APIResponse);
    // if (APIResponse.status !== 200) {
    //   const message = "Something went wrong, please try again";
    //   this.props.enqueueSnackbar(message, {
    //     variant: "error",
    //     autoHideDuration: 5000,
    //   });
    //   this.setState({ formLoader: false });
    // } else {
    //   this.setState({ openPopup: true });

    //   if (APIResponse.data.success == false) {
    //     this.setState({ formLoader: false });
    //     const message = "Pool already exists";
    //     this.props.enqueueSnackbar(message, {
    //       variant: "error",
    //       autoHideDuration: 1000,
    //     });
    //   } else {
    //     this.setState({ formLoader: false });
    //     const message = "Pool Added successfully!";
    //     this.props.enqueueSnackbar(message, {
    //       variant: "info",
    //       autoHideDuration: 1000,
    //     });
    //     this.onCloseModal1();
    //     this.GetAllPools();
    //   }
    // }
    if (APIResponse.status === 200) {
      this.setState({ formLoader: false });
      const message = "Pool Added Successfully!";
      this.props.enqueueSnackbar(message, {
        variant: "info",
        autoHideDuration: 3000,
      });
      this.onCloseModal1();
      window.location.reload();
      //this.GetAllPools();
    } else {
      this.setState({ formLoader: false });
      const message = "Something went wrong, please try again";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 5000,
      });
    }
  };

  // UploadContract = async () => {
  //   if (this.state.file1 != "") {
  //     console.log("uplaodcontract");
  //     const newdata = new FormData();
  //     newdata.append("file", this.state.file1);
  //     console.log("newdata", newdata);
  //     this.setState({ formLoader: true });
  //     newdata.append("token", this.state.token);
  //     const APIResponse = await UploadContract(newdata);

  //     if (APIResponse.status === 200) {
  //       console.log("upload--", APIResponse);
  //       if (APIResponse.data.desc === "File Upload Completed!!!") {
  //         this.setState({ formLoader: false });
  //         const message = "File Upload Completed!!!";
  //         this.props.enqueueSnackbar(message, {
  //           variant: "info",
  //           autoHideDuration: 2000,
  //         });
  //         window.location.assign("/admin/issuerloans");
  //       } else {
  //         this.setState({ formLoader: false });
  //         const message = "Something went wrong, please try again";
  //         this.props.enqueueSnackbar(message, {
  //           variant: "error",
  //           autoHideDuration: 2000,
  //         });
  //       }
  //     } else {
  //       alert("Failed upload");
  //     }
  //   } else {
  //     const message = "Data Saved Successfully";
  //     this.props.enqueueSnackbar(message, {
  //       variant: "info",
  //       autoHideDuration: 3000,
  //     });
  //     window.location.assign("/admin/issuerloans");
  //   }
  // };

  previewUnderwriterPool = async () => {
    this.setState({ getLoansLoader: true, tableData: [], loading: true });
    var data = {};
    data.underwriterId = this.state.UserId;
    data.mailid = this.state.EmailAddress;
    data.token = this.state.token;

    try {
      const APIResponse = await previewunderwriterpool(data);

      if (APIResponse.status === 200) {
        this.setState(
          {
            getLoansLoader: false,
            open: true,
            tableData: APIResponse.data.pooldetails,
            notificationlist: APIResponse.data.notificationlist,
            loading: false,
          },
          () => {
            if (
              APIResponse.data.notificationlist &&
              APIResponse.data.notificationlist.length > 0
            ) {
              this.sortPoolDetails();
            }
            sessionStorage.setItem(
              "issuerid",
              APIResponse.data.pooldetails[0]?.issuerId
            );
          }
        );
      } else {
        this.setState({ getLoansLoader: false, loading: false });
        const message = "Couldn't fetch the record";
        this.props.enqueueSnackbar(message, {
          variant: "error",
          autoHideDuration: 3000,
        });
      }
    } catch (error) {
      this.setState({ loading: false });
      const message = "Couldn't fetch the record";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  Uploadloanlms = async () => {
    console.log("uplaodlms");
    const newdata = new FormData();
    newdata.append("filename", this.state.file1);
    console.log("newdata", newdata);
    this.setState({ formLoader: true });
    const APIResponse = await Uploadloanlms(newdata, this.state.token);

    if (APIResponse.status === 200) {
      console.log("upload--", APIResponse);
      if (APIResponse.data.isSuccess === true) {
        this.Onboradloans(APIResponse.data.filename);
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

  Onboradloans = async (value) => {
    var data = {};
    data.issuerId = this.state.UserId;
    data.filename = value;
    data.asset_class = this.state.formData1.asset_class;
    data.token = this.state.token;
    console.log("value", data);
    this.setState({ formLoader: true });
    const APIResponse = await Onboradloans(data);

    if (APIResponse.status === 200) {
      console.log("upload--", APIResponse);
      if (APIResponse.data.success === true) {
        this.setState({ formLoader: false });
        const message = "Data Saved Successfully";
        this.props.enqueueSnackbar(message, {
          variant: "info",
          autoHideDuration: 3000,
        });
        window.location.assign("/admin/issuerloans");
      } else {
        this.setState(
          {
            formLoader: false,
            showMessage: true,
            ColumnName: APIResponse?.data?.ColumnName,
            LoanIdData: APIResponse?.data?.["Loan ID's"],
            showMessageData1: APIResponse.data.message,
          },
          () => console.log("LoanIdData", this.state?.LoanIdData?.["Loan ID's"])
        );
      }
    } else {
      alert("Failed upload");
    }
  };

  // setUpAItrainedPoolNames = async () => {
  //   this.setState({ getLoansLoader: true });
  //   var data = {};
  //   data.token = this.state.token;

  //   const APIResponse = await GetAItrainedPoolNames(data);

  //   if (APIResponse.status === 200) {
  //     console.log("SetUpPoolRoles--", APIResponse.data);

  //     let aiData = [];

  //     if (APIResponse.data.AITrainedPoolNames.length !== 0) {
  //       if (this.state.EmailAddress.toLowerCase().includes("test") == true) {
  //         console.log("APIResponse.data.AITrainedPoolNames 1", APIResponse.data.AITrainedPoolNames);
  //         APIResponse.data.AITrainedPoolNames.forEach(function (key, value) {
  //           console.log("AITrainedPoolNames value 1", value);
  //           aiData.push({ label: key, value: key });
  //         });
  //       } else {
  //         APIResponse.data.AITrainedPoolNames.forEach(function (key, value) {
  //           console.log("APIResponse.data.AITrainedPoolNames", APIResponse.data.AITrainedPoolNames, key);
  //           if (key.toLowerCase().includes("test") == false) {
  //             console.log("AITrainedPoolNames value", value);
  //             aiData.push({ label: key, value: key });
  //           }
  //         });
  //       }
  //     }
  //     console.log("aiData", aiData);
  //     this.setState({ AiConfigurationDropdown: aiData, getLoansLoader: false });
  //     sessionStorage.setItem("verification_template", JSON.stringify(aiData))

  //   } else {
  //     this.setState({ getLoansLoader: false });
  //     const message = "Couldn't fetch the record";
  //     this.props.enqueueSnackbar(message, {
  //       variant: "error",
  //       autoHideDuration: 3000,
  //     });
  //   }
  // }

  SetUpPoolRoles = async () => {
    this.setState({ getLoansLoader: true });

    var data = {};
    data.token = this.state.token;
    const APIResponse = await SetUpPoolRoles(data);
    if (APIResponse.status === 200) {
      console.log("SetUpPoolRoles--", APIResponse.data);

      let UserID = [];
      let UserName = [];
      let y = [];
      let x = [];
      let z = [];
      let p = [];
      let investorrole = [];

      if (APIResponse.data.Verification.length !== 0) {
        if (this.state.EmailAddress.toLowerCase().includes("test") == true) {
          APIResponse.data.Verification.forEach(function (key, value) {
            if (key.UserName.toLowerCase().includes("test") == true) {
              console.log("key", key.UserId);
              console.log("value", value);
              // var obj = { name: key, label: key }
              y.push({ label: key.UserName, value: key.UserId });
              // UserID.push(key.UserId);
              // UserName.push(key.UserName);
            }
          });
        } else {
          APIResponse.data.Verification.forEach(function (key, value) {
            if (key.UserName.toLowerCase().includes("test") == false) {
              console.log("key", key.UserId);
              console.log("value", value);
              // var obj = { name: key, label: key }
              y.push({ label: key.UserName, value: key.UserId });
              // UserID.push(key.UserId);
              // UserName.push(key.UserName);
            }
          });
        }
      }
      console.log("y", y);
      this.setState({ VerificationDropdown: y, getLoansLoader: false });
      sessionStorage.setItem(
        "verificationDropdown",
        JSON.stringify(this.state.VerificationDropdown)
      );

      if (APIResponse.data.Underwriter.length !== 0) {
        if (this.state.EmailAddress.toLowerCase().includes("test") == true) {
          APIResponse.data.Underwriter.forEach(function (key, value) {
            if (key.UserName.toLowerCase().includes("test") == true) {
              console.log("key", key.UserId);
              console.log("value", value);
              // var obj = { name: key, label: key }
              x.push({ label: key.UserName, value: key.UserId });
              // UserID.push(key.UserId);
              // UserName.push(key.UserName);
            }
          });
        } else {
          APIResponse.data.Underwriter.forEach(function (key, value) {
            if (key.UserName.toLowerCase().includes("test") == false) {
              console.log("key", key.UserId);
              console.log("value", value);
              // var obj = { name: key, label: key }
              x.push({ label: key.UserName, value: key.UserId });
              // UserID.push(key.UserId);
              // UserName.push(key.UserName);
            }
          });
        }
      }
      console.log("y", x);
      console.log("11111", x);
      this.setState({ UnderwriterDropdown: x, getLoansLoader: false });
      console.log(this.state.UnderwriterDropdown, "121212");
      sessionStorage.setItem(
        "underwriterDropdown",
        JSON.stringify(this.state.UnderwriterDropdown)
      );

      if (APIResponse.data.Investor.length !== 0) {
        if (this.state.EmailAddress.toLowerCase().includes("test") == true) {
          APIResponse.data.Investor.forEach(function (key, value) {
            if (key.UserName.toLowerCase().includes("test") == true) {
              console.log("key", key.UserId);
              console.log("value", value);
              investorrole.push({ label: key.UserName, value: key.UserId });
            }
          });
        } else {
          APIResponse.data.Investor.forEach(function (key, value) {
            if (key.UserName.toLowerCase().includes("test") == false) {
              console.log("key", key.UserId);
              console.log("value", value);
              y.push({ label: key.UserName, value: key.UserId });
            }
          });
        }
      }
      //this.setState({ InvestorDropdown: investorrole, getLoansLoader: false });
      sessionStorage.setItem("investorDropdown", JSON.stringify(investorrole));

      if (APIResponse.data.Servicer.length !== 0) {
        if (this.state.EmailAddress.toLowerCase().includes("test") == true) {
          APIResponse.data.Servicer.forEach(function (key, value) {
            if (key.UserName.toLowerCase().includes("test") == true) {
              console.log("key", key.UserId);
              console.log("value", value);
              // var obj = { name: key, label: key }
              z.push({ label: key.UserName, value: key.UserId });
              // UserID.push(key.UserId);
              // UserName.push(key.UserName);
            }
          });
        } else {
          APIResponse.data.Servicer.forEach(function (key, value) {
            if (key.UserName.toLowerCase().includes("test") == false) {
              console.log("key", key.UserId);
              console.log("value", value);
              // var obj = { name: key, label: key }
              z.push({ label: key.UserName, value: key.UserId });
              // UserID.push(key.UserId);
              // UserName.push(key.UserName);
            }
          });
        }
      }
      console.log("z", z);
      this.setState({ ServicerDropdown: z, getLoansLoader: false });

      if (APIResponse.data["Paying Agent"].length !== 0) {
        if (this.state.EmailAddress.toLowerCase().includes("test") == true) {
          APIResponse.data["Paying Agent"].forEach(function (key, value) {
            if (key.UserName.toLowerCase().includes("test") == true) {
              console.log("key", key.UserId);
              console.log("value", value);
              // var obj = { name: key, label: key }
              p.push({ label: key.UserName, value: key.UserId });
              // UserID.push(key.UserId);
              // UserName.push(key.UserName);
            }
          });
        } else {
          APIResponse.data["Paying Agent"].forEach(function (key, value) {
            if (key.UserName.toLowerCase().includes("test") == false) {
              console.log("key", key.UserId);
              console.log("value", value);
              // var obj = { name: key, label: key }
              p.push({ label: key.UserName, value: key.UserId });
              // UserID.push(key.UserId);
              // UserName.push(key.UserName);
            }
          });
        }
      }
      console.log("p", p);
      this.setState({ PayingagentDropdown: p, getLoansLoader: false });
    } else {
      this.setState({ getLoansLoader: false });
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
    // this.SetUpPoolRoles();
    // this.GetAllPools();
    // this.setUpAItrainedPoolNames();
    try {
      await Promise.all([this.previewUnderwriterPool(), this.SetUpPoolRoles()]);
    } catch (err) {
      console.log("Error:", err);
    }
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

  handleChange11 = (e) => {
    console.log(e);
    this.setState({ value1: e.target.value });
  };

  handleClickWorkBench = () => {
    this.setState({ activeInsights: false });
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
          rowsPerPage: "",
          displayRows: "Of",
        },
      },
    };

    const columns = [
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
                <NumberComp2 value={value}></NumberComp2>
              </React.Fragment>
            );
          },
        },
      },
      {
        name: "previewstatus",
        label: "Status",
        // options: {
        //   filter: true,
        //   sort: true,
        //   customHeadRender: (columnMeta, updateDirection) => (
        //     <th
        //       style={{
        //         backgroundColor: "rgba(1, 142, 130, 0.1)",
        //         borderBottom: "none",
        //         paddingBottom: "5px",
        //         paddingTop: "5px",
        //         textAlign: "center",
        //       }}
        //     >
        //       {columnMeta.label}
        //     </th>
        //   ),
        //   customBodyRender: (value, tableMeta, updateValue) => {
        //     // if(value !== undefined){
        //     //   return (
        //     //   <React.Fragment>
        //     //     <div className="text-center">{value[this.state.UserId]}</div>
        //     //   </React.Fragment>
        //     // );
        //     // }
        //     return (
        //       <React.Fragment>
        //         <div className="text-center">{value[this.state.UserId]}</div>
        //       </React.Fragment>
        //     )
        //   },
        // },
      },
      {
        name: "Actions",
        label: "Actions",
        bodyRenderer: (value) => {
          console.log("vvvvvvvvvvvvvvvvvvvv", value);
          return (
            <React.Fragment>
              <div>
                <button
                  type="button"
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    this.viewdetails(
                      value["poolID"],
                      value["poolname"],
                      value.previewstatus[this.state.UserId]
                    )
                  }
                  className="popupbutton1"
                >
                  View Details
                </button>
                {value.previewstatus[this.state.UserId] === "Pending" ? (
                  <React.Fragment style={{ display: "flex" }}>
                    <button
                      className="popupbuttons1 uw-popup-button"
                      onClick={() => this.onOpenModal(value.poolID)}
                    >
                      Accept
                    </button>
                    <button
                      className="popupbuttons1"
                      onClick={() => this.onOpenModal1(value.poolID)}
                    >
                      Reject
                    </button>
                  </React.Fragment>
                ) : null}
              </div>
            </React.Fragment>
          );
        },
        // options: {
        //   filter: false,
        //   sort: false,
        //   customHeadRender: (columnMeta, updateDirection) => (
        //     <th
        //       style={{
        //         backgroundColor: "rgba(1, 142, 130, 0.1)",
        //         borderBottom: "none",
        //         paddingBottom: "5px",
        //         paddingTop: "5px",
        //         paddingLeft: "20px",
        //       }}
        //     >
        //       {columnMeta.label}
        //     </th>
        //   ),
        //   customBodyRender: (value, tableMeta, updateValue) => {
        //     console.log('tb',tableMeta)
        //     return (
        //       <React.Fragment>
        //         <div className="">
        //           <span>
        //           <buton
        //             type="button"
        //             onClick={() =>
        //               this.viewdetails(value, tableMeta.rowData[1],tableMeta.rowData[6][this.state.UserId])
        //             }
        //             className="popupbutton1"
        //           >
        //             View Details
        //           </buton>
        // {tableMeta.rowData[6][this.state.UserId] === 'Pending' ?
        //   <React.Fragment>
        //     <button
        //       className="popupbuttons1 uw-popup-button"
        //       onClick={() => this.onOpenModal(value)}
        //     // onClick={() => this.UpdatePoolUWStatus("Accepted By Underwriter",value)}
        //     >
        //       Accept
        //     </button>
        //     <button
        //       className="popupbuttons1"
        //       onClick={() => this.onOpenModal1(value)}
        //     //onClick={() => this.UpdatePoolUWStatus("Rejected By Underwriter",value)}
        //     >
        //       Reject
        //     </button>
        //   </React.Fragment> : null}
        //           </span>

        //         </div>
        //       </React.Fragment>
        //     );
        //   },
        // },
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
              <Sidebar activeComponent={"Preview Pools"} />
              <div className="content1">
                {/* {this.state.getLoansLoader == false ? '' : <LinearLoader></LinearLoader>} */}
                {this.state.screendisplay === true ? (
                  <div className="page-content">
                    <div className="row row1">
                      <div className="investor-heading-container">
                        <h1 className="headerdashboard">Preview - Pools</h1>
                      </div>

                      <div>
                        <div className="dashboard-top-right-container1">
                          {/* <div className="search-bar-outer-container">
                            {this.state.showSearchBox == false && (
                              <button
                                className="search-mui-icons"
                                type="button"
                                onClick={this.onClickSearchButton}
                              >
                                <SearchOutlinedIcon />
                              </button>
                            )}
                          </div> */}
                          {/* <Button
                            className="card__button2"
                            type="submit"
                            onClick={this.onOpenModal.bind(this)}
                          >
                            Add Loans
                          </Button> */}
                          {this.state.showSearchBox === false ? (
                            <Button
                              variant="contained"
                              color="primary"
                              type="submit"
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

                    <React.Fragment>
                      <div className="workbench-table-container">
                        {/* <MuiThemeProvider theme={this.getMuiTheme()}>
                          <MUIDataTable
                            // title={'Dashboard'}
                            data={this.state.tableData}
                            columns={columns}
                            options={options}
                          />
                        </MuiThemeProvider> */}
                        {this.state.loading ? (
                          <center>
                            <Loader msg={"Please wait, Loading Pool Data"} />
                          </center>
                        ) : (
                          <div
                            id="table-container"
                            style={{
                              height: "100%",
                              borderRadius: "1rem",
                              overflow: "auto",
                              border: "1px solid black",
                            }}
                          >
                            <TableVirtuoso
                              data={
                                this.state.searchText
                                  ? this.state.filteredData
                                  : this.state.tableData
                              }
                              columns={columns}
                              itemHeight={50}
                              components={TableComponents}
                              style={{
                                width: "100",
                                height: this.state.searchText
                                  ? this.state.filteredData.length * 50 > 630
                                    ? 630
                                    : this.state.filteredData.length * 50 + 70
                                  : this.state.tableData.length * 50 > 630
                                  ? 630
                                  : this.state.tableData.length * 50 + 95,
                                overflow: "auto",
                                borderRadius: "1rem",
                                overflowAnchor: "none",
                              }}
                              fixedHeaderContent={() => (
                                <TableRow>
                                  {columns.map((column) => (
                                    <TableCell
                                      key={column.key}
                                      style={{
                                        background: "white",
                                        cursor: "pointer",
                                        width: `${column.length * 50}px`,
                                        whiteSpace: "nowrap",
                                      }}
                                      onClick={() =>
                                        this.handleSort(column.name)
                                      }
                                    >
                                      <div
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                          gap: "2px",
                                          fontWeight: "600",
                                          fontSize: "15px",
                                        }}
                                      >
                                        {column.label}
                                        {column.name !== "Actions" && (
                                          <SortIcon
                                            sortAscending={
                                              this.state.sortAscending
                                            }
                                          />
                                        )}
                                      </div>
                                    </TableCell>
                                  ))}
                                </TableRow>
                              )}
                              itemContent={(index) => {
                                const { searchText, filteredData, tableData } =
                                  this.state;
                                const rowData = searchText
                                  ? filteredData[index]
                                  : tableData[index];
                                const isOddRow = index % 2 !== 0;
                                return (
                                  <>
                                    {columns.map((column) => (
                                      <TableCell
                                        style={{
                                          width: `${column.length * 50}px`,
                                          background: "white",
                                          whiteSpace: "nowrap",
                                          backgroundColor: isOddRow
                                            ? "rgb(229,229,229,0.3)"
                                            : "",
                                        }}
                                      >
                                        {column.name === "previewstatus"
                                          ? rowData.previewstatus[
                                              this.state.UserId
                                            ]
                                          : column.name === "originalbalance"
                                          ? formatNumberWithCommas(
                                              rowData[column.name]
                                            )
                                          : column.bodyRenderer
                                          ? column.bodyRenderer(rowData)
                                          : rowData[column.name]}
                                      </TableCell>
                                    ))}
                                  </>
                                );
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </React.Fragment>
                  </div>
                ) : (
                  ""
                )}
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
                      <h2>
                        Are you sure you want to Accept the Pool to Preview?
                      </h2>
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
                          Once accepted, the issuer will be notified that you
                          have agreed to preview this Pool.
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
                                    this.previewupdatePoolStatus(
                                      "Accepted By Underwriter",
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
                      <h3>
                        Are you sure you want to Reject the Pool to Preview?
                      </h3>
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
                          have denied previewing this Pool.
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
                                  this.previewupdatePoolStatus(
                                    "Rejected By Underwriter",
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

              {/* Set-up a pool popup */}
              {/* <div id="modal">
                <ReactModal
                  isOpen={this.state.open2}
                  onRequestClose={this.onCloseModal1}
                  contentLabel="Minimal Modal Example"
                  style={customStylesauto}
                >
                  <React.Fragment>
                    <div className="modalPopup2">
                      <h2>Set-up a Pool</h2>
                      <button
                        type="button"
                        className="closePopup"
                        style={{ minWidth: "30px" }}
                        onClick={this.onCloseModal1}
                      >
                        {" "}
                        <CloseIcon></CloseIcon>{" "}
                      </button>
                      <div className="modalshiftcontent">
                        <form
                          className="form-container"
                          onSubmit={this.onSubmit1}
                        >
                          <div className="input-container">
                            <label className="label">Pool Name*</label>
                            <input
                              required
                              placeholder="Type here"
                              className="input"
                              type="text"
                              onChange={(e) => {
                                this.setState({
                                  formData: {
                                    ...this.state.formData,
                                    poolname: e.target.value,
                                  },
                                });
                              }}
                              value={this.state.formData.poolname}
                            />
                          </div>

                          <div className="input-container">
                            <label className="label">Asset Class*</label>
                            <select
                              required
                              className="input-select"
                              onChange={(e) => {
                                this.setState({
                                  formData: {
                                    ...this.state.formData,
                                    assetclass: e.target.value,
                                  },
                                });
                              }}
                              value={this.state.formData.assetclass}
                            >
                              <option value="" disabled>
                                Select any one
                              </option>
                              <option value="Residential Real Estate">
                                Residential Real Estate
                              </option>
                              <option value="Commercial Mortgage">
                                Commercial Mortgage
                              </option>
                              <option value="Corporate Loans">
                                Corporate Loans
                              </option>
                              <option value="Auto Loans">Auto Loans</option>
                              <option value="Consumer Loans">
                                Consumer Loans
                              </option>
                              <option value="Credit Cards">Credit Cards</option>
                              <option value="Leasing">Leasing</option>
                              <option value="Esoteric">Esoteric</option>
                              <option value="Non Performing Loans">
                                Non Performing Loans
                              </option>
                              <option value="Asset Backed Commercial Papers">
                                Asset Backed Commercial Papers
                              </option>
                            </select>
                          </div>

                          <div className="input-container">
                            <label>Description*</label>
                            <textarea
                              rows=""
                              cols="40"
                              placeholder="Type here"
                              className="description-box"
                              onChange={(e) => {
                                this.setState({
                                  formData: {
                                    ...this.state.formData,
                                    description: e.target.value
                                  }
                                })
                              }}
                            />
                          </div>

                          <div className="modalsubmit">
                            <div className="submitbuttonbg">
                              <div className="row">
                                <div className="row justify-content-end1">
                                  <button
                                    type="button"
                                    className="popupbutton22"
                                    onClick={this.onCloseModal1}
                                  >
                                    {" "}
                                    Cancel{" "}
                                  </button>
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                  >
                                    Set-up
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
                      </div>
                    </div>
                  </React.Fragment>
                </ReactModal>
              </div> */}
            </div>
          )
        ) : (
          this.handleClickSubmitted()
        )}
      </React.Fragment>
    );
  }
}

export default withSnackbar(UW_Preview_Pools);
