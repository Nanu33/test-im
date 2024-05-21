/* eslint-disable require-jsdoc */
import React, { Component } from "react";
// import { connect } from 'react-redux';
import Sidebar from "../../../components/sidebar";
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
import { TableVirtuoso } from "react-virtuoso";
import ReactModal from "react-modal";
import Arrow from "../../../images/Arrow.png";
import { customStylesautosmallmodal } from "../../../components/customscripts/customscript";
import FormLoader from "../../../components/loader/formLoader";
import {
  GetAllPools,
  SetUpPool,
  Uploadloanlms,
  Onboradloans,
  UploadContract,
  SetUpPoolRoles,
  GetAItrainedPoolNames,
} from "../../../servies/services";
import {
  ThemeProvider,
  createTheme,
  MuiThemeProvider,
} from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TableContainer,
} from "@material-ui/core";
import "react-input-range/lib/css/index.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import NumberComp2 from "../../../components/NumberComp2";
import { NavLink } from "react-router-dom";

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
class IssuerDashboard extends Component {
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
      notificationlist: [],
      ratingAgencyDropdown: [],
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
      UserId: sessionStorage.getItem("userid"),
      EmailAddress: sessionStorage.getItem("EmailAddress"),
      kycuploadstatus: sessionStorage.getItem("KycUploadStatus"),
      kycverifystatus: sessionStorage.getItem("KycVerifiedStatus"),
      TermsOfService: sessionStorage.getItem("TermsOfService"),
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
      screendisplay: true,
      showStartPopUp: true,
      formData1: {
        asset_class: "",
      },
      showMessage: false,
      theme: sessionStorage.getItem("dark-theme"),
    };
    this.onCloseModal1 = this.onCloseModal1.bind(this);
    this.GetAllPools = this.GetAllPools.bind(this);
    this.sortPoolDetails = this.sortPoolDetails.bind(this);
    console.log("props", props.history);
  }
  handleClick = () => {
    // this.props.history.push({
    //   pathname: "/pendingkyc",
    // });
    window.location.assign("/pendingkyc");
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

  onOpenModal = () => {
    console.log("inside modal1");
    this.setState({ open1: true });
  };
  onOpenModal1 = () => {
    console.log("inside modal1");
    this.setState({ open2: true });
  };

  onCloseModal = () => {
    this.setState({
      open1: false,
      file1: "",
      formData1: {
        asset_class: "",
      },
      showMessageData1: "",
      ColumnName: [],
      LoanIdData: [],
    });
  };

  onCloseModal1 = () => {
    this.setState({ open2: false });
    this.setState({
      formData: {
        poolname: "",
        //aiConfiguration: "",
        assetclass: "",
        description: "",
        // assignverification: "",
        // assignservicer: "",
        //assignunderwriter: "",
        //assignpayingagent: "",
        document: "",
        purpose: "",
      },
    });
  };

  viewdetails = async (value, poolname) => {
    sessionStorage.setItem("poolname", poolname);
    sessionStorage.setItem("poolid", value);
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
  sortPoolDetails = () => {
    this.setState({ loading: true });
    const { tableData, notificationlist } = this.state;
    const sortedLoanDetails = tableData.sort((a, b) => {
      const indexA = notificationlist.indexOf(a["poolID"]);
      const indexB = notificationlist.indexOf(b["poolID"]);

      return indexB - indexA;
    });
    console.log("sortedLoanDetails", sortedLoanDetails);
    this.setState({ tableData: sortedLoanDetails, loading: false });
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

    if (column === "actions") {
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
    <div className="search-bar-main-container-is" id="searchBox">
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
    this.setState({ loading: true });
    var data = {};
    data.issuerId = this.state.UserId;
    data.mailid = this.state.EmailAddress;
    data.token = this.state.token;

    try {
      const APIResponse = await GetAllPools(data);

      if (APIResponse.status === 200) {
        console.log("AllGetAllPoolsdata--", APIResponse);
        if (APIResponse.data.length !== 0) {
          this.setState(
            {
              open: true,
              tableData: APIResponse.data.pooldetails,
              notificationlist: APIResponse.data.notificationlist,
              loading: false,
              serialno: APIResponse.data.length,
            },
            () => {
              console.log(
                "tableData",
                this.state.notificationlist,
                APIResponse.data.notificationlist
              );
              if (this.state.notificationlist.length !== 0) {
                this.sortPoolDetails();
              }
            }
          );
        } else {
          this.setState({ loading: false, tableData: [] });
        }
      } else {
        throw new Error("Couldn't fetch the record");
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

    if (APIResponse.status === 200) {
      this.setState({ formLoader: false });
      this.onCloseModal1();
      window.location.reload();
    } else {
      this.setState({ formLoader: false });
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

  setUpAItrainedPoolNames = async () => {
    this.setState({ getLoansLoader: true });
    var data = {};
    data.token = this.state.token;

    const APIResponse = await GetAItrainedPoolNames(data);

    if (APIResponse.status === 200) {
      console.log("SetUpPoolRoles--", APIResponse.data);

      let aiData = [];

      if (APIResponse.data.AITrainedPoolNames.length !== 0) {
        aiData = APIResponse.data.AITrainedPoolNames;
        // if (this.state.EmailAddress.toLowerCase().includes("test") == true) {
        //   console.log(
        //     "APIResponse.data.AITrainedPoolNames 1",
        //     APIResponse.data.AITrainedPoolNames
        //   );
        //   APIResponse.data.AITrainedPoolNames.forEach(function (key, value) {
        //     console.log("AITrainedPoolNames value 1", value);
        //     aiData.push({ label: key, value: key });
        //   });
        // } else {
        //   APIResponse.data.AITrainedPoolNames.forEach(function (key, value) {
        //     console.log(
        //       "APIResponse.data.AITrainedPoolNames",
        //       APIResponse.data.AITrainedPoolNames,
        //       key
        //     );
        //     if (key.toLowerCase().includes("test") == false) {
        //       console.log("AITrainedPoolNames value", value);
        //       aiData.push({ label: key, value: key });
        //     }
        //   });
        // }
      }
      console.log("aiData", aiData);
      this.setState({ AiConfigurationDropdown: aiData, getLoansLoader: false });
      sessionStorage.setItem("verification_template", JSON.stringify(aiData));
    } else {
      this.setState({ getLoansLoader: false });
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

  // SetUpPoolRoles = async () => {
  //   this.setState({ getLoansLoader: true });

  //   var data = {};
  //   data.token = this.state.token;
  //   const APIResponse = await SetUpPoolRoles(data);
  //   if (APIResponse.status === 200) {
  //     console.log("SetUpPoolRoles--", APIResponse.data);

  //     let UserID = [];
  //     let UserName = [];
  //     let y = [];
  //     let x = [];
  //     let z = [];
  //     let p = [];
  //     let investorrole = [];
  //     let ratingAgencyRole = [];

  //     if (APIResponse.data.Verification.length !== 0) {
  //       if (this.state.EmailAddress.toLowerCase().includes("test") == true) {
  //         APIResponse.data.Verification.forEach(function (key, value) {
  //           if (key.UserName.toLowerCase().includes("test") == true) {
  //             console.log("key", key);
  //             console.log("value", value);
  //             if (key.EmailAddress === sessionStorage.getItem("EmailAddress")) {
  //               y.push({
  //                 label: "Self",
  //                 value: key.UserId,
  //                 Email: key.EmailAddress,
  //               });
  //             } else {
  //               if (key.UserType != "Self") {
  //                 y.push({
  //                   label: key.UserName,
  //                   value: key.UserId,
  //                   Email: key.EmailAddress,
  //                 });
  //               } else {
  //                 y.push({
  //                   label: "Self",
  //                   value: key.UserId,
  //                   Email: key.EmailAddress,
  //                 });
  //               }
  //             }
  //             // var obj = { name: key, label: key }
  //             // y.push({ label: key.UserName, value: key.UserId, "Email": key.EmailAddress });
  //             // UserID.push(key.UserId);
  //             // UserName.push(key.UserName);
  //           }
  //         });
  //       } else {
  //         APIResponse.data.Verification.forEach(function (key, value) {
  //           if (key.UserName.toLowerCase().includes("test") == false) {
  //             console.log("key", key.UserId);
  //             console.log("value", value);
  //             // var obj = { name: key, label: key }
  //             if (key.EmailAddress === sessionStorage.getItem("EmailAddress")) {
  //               y.push({
  //                 label: "Self",
  //                 value: key.UserId,
  //                 Email: key.EmailAddress,
  //               });
  //             } else {
  //               if (key.UserType != "Self") {
  //                 y.push({
  //                   label: key.UserName,
  //                   value: key.UserId,
  //                   Email: key.EmailAddress,
  //                 });
  //               } else {
  //                 y.push({
  //                   label: "Self",
  //                   value: key.UserId,
  //                   Email: key.EmailAddress,
  //                 });
  //               }
  //             }
  //             // y.push({ label: key.UserName, value: key.UserId, "Email": key.EmailAddress });
  //             // UserID.push(key.UserId);
  //             // UserName.push(key.UserName);
  //           }
  //         });
  //       }
  //     }
  //     this.setState({ VerificationDropdown: y, getLoansLoader: false });
  //     console.log("VerificationDropdown", this.state.VerificationDropdown);
  //     sessionStorage.setItem("verificationDropdown", JSON.stringify(y));

  //     if (APIResponse.data.Underwriter.length !== 0) {
  //       if (this.state.EmailAddress.toLowerCase().includes("test") == true) {
  //         APIResponse.data.Underwriter.forEach(function (key, value) {
  //           if (key.UserName.toLowerCase().includes("test") == true) {
  //             console.log("key", key);
  //             console.log("value", value);
  //             // var obj = { name: key, label: key }
  //             if (key.EmailAddress === sessionStorage.getItem("EmailAddress")) {
  //               x.push({
  //                 label: "Self",
  //                 value: key.UserId,
  //                 Email: key.EmailAddress,
  //               });
  //             }
  //             // else if(key.EmailAddress !== sessionStorage.getItem("EmailAddress") && key.UserType === "All Deals" ){
  //             //   x.push({ label: key.UserName, value: key.UserId, "Email": key.EmailAddress });
  //             // }
  //             else {
  //               if (key.UserType != "Self") {
  //                 x.push({
  //                   label: key.UserName,
  //                   value: key.UserId,
  //                   Email: key.EmailAddress,
  //                 });
  //               } else {
  //                 x.push({
  //                   label: "Self",
  //                   value: key.UserId,
  //                   Email: key.EmailAddress,
  //                 });
  //               }
  //             }
  //             // x.push({ label: key.UserName, value: key.UserId, "Email": key.EmailAddress });
  //             // UserID.push(key.UserId);
  //             // UserName.push(key.UserName);
  //           }
  //         });
  //       } else {
  //         APIResponse.data.Underwriter.forEach(function (key, value) {
  //           if (key.UserName.toLowerCase().includes("test") == false) {
  //             console.log("key", key.UserId);
  //             console.log("value", value);
  //             // var obj = { name: key, label: key }
  //             if (key.EmailAddress === sessionStorage.getItem("EmailAddress")) {
  //               x.push({
  //                 label: "Self",
  //                 value: key.UserId,
  //                 Email: key.EmailAddress,
  //               });
  //             } else {
  //               if (key.UserType != "Self") {
  //                 x.push({
  //                   label: key.UserName,
  //                   value: key.UserId,
  //                   Email: key.EmailAddress,
  //                 });
  //               } else {
  //                 x.push({
  //                   label: "Self",
  //                   value: key.UserId,
  //                   Email: key.EmailAddress,
  //                 });
  //               }
  //             }
  //             // x.push({ label: key.UserName, value: key.UserId, "Email": key.EmailAddress });
  //             // UserID.push(key.UserId);
  //             // UserName.push(key.UserName);
  //           }
  //         });
  //       }
  //     }
  //     console.log("y", x);
  //     this.setState({ UnderwriterDropdown: x, getLoansLoader: false });
  //     sessionStorage.setItem("underwriterDropdown", JSON.stringify(x));

  //     if (APIResponse.data.Investor.length !== 0) {
  //       if (this.state.EmailAddress.toLowerCase().includes("test") == true) {
  //         APIResponse.data.Investor.forEach(function (key, value) {
  //           if (key.UserName.toLowerCase().includes("test") == true) {
  //             console.log("key", key.UserId);
  //             console.log("value", value);
  //             // if(key.EmailAddress === sessionStorage.getItem("EmailAddress")){
  //             //   investorrole.push({ label: "Self", value: key.UserId, "Email": key.EmailAddress });
  //             // }else{
  //             //   if(key.UserType !== "Self" || key.UserType === ''){
  //             //     investorrole.push({ label: key.UserName, value: key.UserId, "Email": key.EmailAddress });
  //             //   }else{
  //             //     investorrole.push({ label: "Self", value: key.UserId, "Email": key.EmailAddress });
  //             //   }
  //             // }
  //             investorrole.push({
  //               label: key.UserName,
  //               value: key.UserId,
  //               Email: key.EmailAddress,
  //             });
  //           }
  //         });
  //         sessionStorage.setItem(
  //           "investorDropdown",
  //           JSON.stringify(investorrole)
  //         );
  //       } else {
  //         APIResponse.data.Investor.forEach(function (key, value) {
  //           if (key.UserName.toLowerCase().includes("test") == false) {
  //             console.log("key", key.UserId);
  //             console.log("value", value);
  //             y.push({
  //               label: key.UserName,
  //               value: key.UserId,
  //               Email: key.EmailAddress,
  //             });
  //           }
  //         });
  //         sessionStorage.setItem("investorDropdown", JSON.stringify(y));
  //       }
  //     }
  //     //this.setState({ InvestorDropdown: investorrole, getLoansLoader: false });
  //     //sessionStorage.setItem('investorDropdown', JSON.stringify(investorrole))

  //     if (APIResponse.data.Servicer.length !== 0) {
  //       if (this.state.EmailAddress.toLowerCase().includes("test") == true) {
  //         APIResponse.data.Servicer.forEach(function (key, value) {
  //           if (key.UserName.toLowerCase().includes("test") == true) {
  //             console.log("key", key.UserId);
  //             console.log("value", value);
  //             if (key.EmailAddress === sessionStorage.getItem("EmailAddress")) {
  //               z.push({
  //                 label: "Self",
  //                 value: key.UserId,
  //                 Email: key.EmailAddress,
  //               });
  //             } else {
  //               if (key.UserType != "Self") {
  //                 z.push({
  //                   label: key.UserName,
  //                   value: key.UserId,
  //                   Email: key.EmailAddress,
  //                 });
  //               } else {
  //                 z.push({
  //                   label: "Self",
  //                   value: key.UserId,
  //                   Email: key.EmailAddress,
  //                 });
  //               }
  //             }
  //             // var obj = { name: key, label: key }
  //             // z.push({ label: key.UserName, value: key.UserId, "Email": key.EmailAddress });
  //             // UserID.push(key.UserId);
  //             // UserName.push(key.UserName);
  //           }
  //         });
  //         sessionStorage.setItem("servicerDropdown", JSON.stringify(z));
  //       } else {
  //         APIResponse.data.Servicer.forEach(function (key, value) {
  //           if (key.UserName.toLowerCase().includes("test") == false) {
  //             console.log("key", key.UserId);
  //             console.log("value", value);
  //             // var obj = { name: key, label: key }
  //             if (key.EmailAddress === sessionStorage.getItem("EmailAddress")) {
  //               z.push({
  //                 label: "Self",
  //                 value: key.UserId,
  //                 Email: key.EmailAddress,
  //               });
  //             } else {
  //               if (key.UserType != "Self") {
  //                 z.push({
  //                   label: key.UserName,
  //                   value: key.UserId,
  //                   Email: key.EmailAddress,
  //                 });
  //               } else {
  //                 z.push({
  //                   label: "Self",
  //                   value: key.UserId,
  //                   Email: key.EmailAddress,
  //                 });
  //               }
  //             }
  //             // z.push({ label: key.UserName, value: key.UserId, "Email": key.EmailAddress });
  //             // UserID.push(key.UserId);
  //             // UserName.push(key.UserName);
  //           }
  //         });
  //         sessionStorage.setItem("servicerDropdown", JSON.stringify(z));
  //       }
  //     }
  //     console.log("z", z);
  //     this.setState({ ServicerDropdown: z, getLoansLoader: false });

  //     if (APIResponse.data["Rating Agency"].length !== 0) {
  //       if (this.state.EmailAddress.toLowerCase().includes("test") == true) {
  //         APIResponse.data["Rating Agency"].forEach(function (key, value) {
  //           if (key.UserName.toLowerCase().includes("test") == true) {
  //             console.log("key", key.UserId);
  //             console.log("value", value);
  //             if (key.EmailAddress === sessionStorage.getItem("EmailAddress")) {
  //               ratingAgencyRole.push({
  //                 label: "Self",
  //                 value: key.UserId,
  //                 Email: key.EmailAddress,
  //               });
  //             } else {
  //               if (key.UserType != "Self") {
  //                 ratingAgencyRole.push({
  //                   label: key.UserName,
  //                   value: key.UserId,
  //                   Email: key.EmailAddress,
  //                 });
  //               } else {
  //                 ratingAgencyRole.push({
  //                   label: "Self",
  //                   value: key.UserId,
  //                   Email: key.EmailAddress,
  //                 });
  //               }
  //             }
  //           }
  //         });
  //         sessionStorage.setItem("ratingAgencyDropdown", JSON.stringify(z));
  //       } else {
  //         APIResponse.data["Rating Agency"].forEach(function (key, value) {
  //           if (key.UserName.toLowerCase().includes("test") == false) {
  //             if (key.EmailAddress === sessionStorage.getItem("EmailAddress")) {
  //               ratingAgencyRole.push({
  //                 label: "Self",
  //                 value: key.UserId,
  //                 Email: key.EmailAddress,
  //               });
  //             } else {
  //               if (key.UserType != "Self") {
  //                 ratingAgencyRole.push({
  //                   label: key.UserName,
  //                   value: key.UserId,
  //                   Email: key.EmailAddress,
  //                 });
  //               } else {
  //                 ratingAgencyRole.push({
  //                   label: "Self",
  //                   value: key.UserId,
  //                   Email: key.EmailAddress,
  //                 });
  //               }
  //             }
  //           }
  //         });
  //         sessionStorage.setItem("ratingAgencyDropdown", JSON.stringify(ratingAgencyRole));
  //       }
  //     }
  //     this.setState({ ratingAgencyDropdown: ratingAgencyRole, getLoansLoader: false });

  //     if (APIResponse.data["Paying Agent"].length !== 0) {
  //       if (this.state.EmailAddress.toLowerCase().includes("test") == true) {
  //         APIResponse.data["Paying Agent"].forEach(function (key, value) {
  //           if (key.UserName.toLowerCase().includes("test") == true) {
  //             console.log("key", key.UserId);
  //             console.log("value", value);
  //             // var obj = { name: key, label: key }
  //             p.push({
  //               label: key.UserName,
  //               value: key.UserId,
  //               Email: key.EmailAddress,
  //             });
  //             // UserID.push(key.UserId);
  //             // UserName.push(key.UserName);
  //           }
  //         });
  //         sessionStorage.setItem("payingAgentDropdown", JSON.stringify(p));
  //       } else {
  //         APIResponse.data["Paying Agent"].forEach(function (key, value) {
  //           if (key.UserName.toLowerCase().includes("test") == false) {
  //             console.log("key", key.UserId);
  //             console.log("value", value);
  //             // var obj = { name: key, label: key }
  //             p.push({
  //               label: key.UserName,
  //               value: key.UserId,
  //               Email: key.EmailAddress,
  //             });
  //             // UserID.push(key.UserId);
  //             // UserName.push(key.UserName);
  //           }
  //         });
  //         sessionStorage.setItem("payingAgentDropdown", JSON.stringify(p));
  //       }
  //     }
  //     console.log("p", p);
  //     this.setState({ PayingagentDropdown: p, getLoansLoader: false });
  //   } else {
  //     this.setState({ getLoansLoader: false });
  //     const message = "Couldn't fetch the record";
  //     this.props.enqueueSnackbar(message, {
  //       variant: "error",
  //       autoHideDuration: 3000,
  //     });
  //   }
  // };

  async componentDidMount() {
    var component = window.location.pathname;
    sessionStorage.setItem("component", component);
    this.SetUpPoolRoles();
    try {
      await Promise.all([
        this.GetAllPools(),
        // this.SetUpPoolRoles(),
        this.setUpAItrainedPoolNames(),
      ]);
    } catch (error) {
      console.error("Error:", error);
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
        // options: {
        //   filter: true,
        //   sort: true,
        //   customBodyRender: (value, tableMeta, updateValue) => {
        //     return (
        //       <React.Fragment>
        //         <NumberComp2 value={value}></NumberComp2>
        //       </React.Fragment>
        //     );
        //   },
        // },
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
        name: "actions",
        label: "Actions",
        key: "1",
        bodyRenderer: (value) => {
          return (
            <React.Fragment>
              <div>
                <button
                  type="button"
                  onClick={() =>
                    this.viewdetails(value["poolID"], value["poolname"])
                  }
                  className="login-sign_up-links"
                >
                 <NavLink
                  style={{
                    color: this.state.notificationlist.some(
                      (poolid) => poolid === value["poolID"]
                    )
                      ? "#CA2E55"
                      : "#018e82",
                    textDecoration : "none"  
                  }}
                  to="/admin/pooldetails"
                 >
                  View Details
                 </NavLink>
                </button>
              </div>
            </React.Fragment>
          );
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
              <Sidebar activeComponent={"Dashboard"} />
              <div className="content1">
                {/* {this.state.getLoansLoader == false ? '' : <LinearLoader></LinearLoader>} */}
                {this.state.screendisplay === true ? (
                  <div className="page-content-is">
                    <div className="row row1">
                      <div className="investor-heading-container">
                        {/* {this.state.showSearchBox == true ? (
                          this.searchBar()
                        ) : (
                          <h1 className="headerdashboard">Pools</h1>
                        )} */}
                        <h1 className="headerdashboard">Pools</h1>
                      </div>

                      <div>
                        {/* <div className="tablechangebutton"> */}
                        <div className="tablechangebuttonloans">
                          {/* <buton
                            type="button"
                            onClick={() => this.handleClickInsights()}
                            className={
                              this.state.activeInsights1 == true
                                ? "issuerDashboard-table-top-button-insights-active"
                                : "issuerDashboard-table-top-button-insights"
                            }
                          >
                            Portfolio
                          </buton> */}

                          {/* <buton
                            type="button"
                            onClick={() => this.handleClickPools()}
                            className={
                              this.state.activeInsights3 == true
                                ? "issuerDashboard-table-top-button-workbench-active"
                                : "issuerDashboard-table-top-button-workbench"
                            }
                          >
                            Pools
                          </buton> */}

                          {/* <buton
                            type="button"
                            onClick={() => this.handleClickLoans()}
                            className={
                              this.state.activeInsights2 == true
                                ? "issuerDashboard-table-top-button-rejected-active"
                                : "issuerDashboard-table-top-button-rejected"
                            }
                          >
                            Loans
                          </buton> */}
                          {/* <buton
                            type="button"
                            onClick={() => this.handleClickDeals()}
                            className={
                              this.state.activeInsights4 == true
                                ? "issuerDashboard-table-top-button-rejected-active"
                                : "issuerDashboard-table-top-button-rejected"
                            }
                          >
                            Deals
                          </buton> */}
                        </div>
                      </div>

                      <div>
                        <div className="dashboard-top-right-container1">
                          <div className="search-bar-outer-container-is">
                            {this.state.showSearchBox == false ? (
                              <button
                                className="search-mui-icons"
                                type="button"
                                onClick={this.onClickSearchButton}
                              >
                                <SearchOutlinedIcon />
                              </button>
                            ) : (
                              this.searchBar()
                            )}
                          </div>
                          <div>
                            <Button
                              variant="contained"
                              color="primary"
                              type="submit"
                              onClick={this.onOpenModal1.bind(this)}
                              style={{ width: "10rem" }}
                            >
                              Set-up Pool
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <React.Fragment>
                      <div>
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
                              scrollBehavior: "smooth",
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
                                  ? this.state.filteredData.length * 50 > 620
                                    ? 620
                                    : this.state.filteredData.length * 50 + 60
                                  : this.state.tableData.length * 50 > 620
                                  ? 620
                                  : this.state.tableData.length * 50 + 90,
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
                                        width: `${column.length * 10}px`,
                                        whiteSpace: "nowrap",
                                        height: "50px",
                                        border: "none",
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
                                        {column.name !== "actions" && (
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
                                const {
                                  searchText,
                                  filteredData,
                                  tableData,
                                  theme,
                                } = this.state;
                                const rowData = searchText
                                  ? filteredData[index]
                                  : tableData[index];
                                const isOddRow = index % 2 !== 0;
                                return (
                                  <>
                                    {columns.map((column) => (
                                      <TableCell
                                        style={{
                                          width: `${column.length * 10}px`,
                                          background: "white",
                                          whiteSpace: "nowrap",
                                          overflow: "auto",
                                          border: "none",
                                          backgroundColor: isOddRow
                                            ? "rgb(229,229,229,0.3)"
                                            : "",
                                        }}
                                      >
                                        {column.name === "originalbalance"
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
                      <div className="popupTitle">
                        <h2>Add Loans</h2>
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
                          onSubmit={this.onSubmit2}
                        >
                          <div className="">
                            <h6 className="e1">
                              Upload Loan data (in Excel format)
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
                                    htmlFor="icon-button-file-id2"
                                    className="upload-button-label"
                                  >
                                    Upload
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
                                    onChange={this.handleOnChange2}
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

                          <div className="input-container">
                            <label className="label">Asset Class</label>
                            <select
                              required
                              className="input-select"
                              onChange={(e) => {
                                this.setState({
                                  formData1: {
                                    ...this.state.formData1,
                                    asset_class: e.target.value,
                                  },
                                });
                              }}
                              value={this.state.formData1.asset_class}
                            >
                              <option value="" disabled className="selectclass">
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

                          <p className="error-msg">
                            {this.state.showMessageData1}
                            {this.state?.LoanIdData === undefined
                              ? this.state?.ColumnName.map((name) => (
                                  <li>{name}</li>
                                ))
                              : this.state?.LoanIdData.map((name) => (
                                  <li>{name}</li>
                                ))}
                          </p>

                          <div className="modalsubmit">
                            <div className="submitbuttonbg">
                              <div className="row">
                                <div className="row justify-content-end2">
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
                                    //type="submit"
                                    // onClick={this.Uploadloanlms}
                                    // onClick={this.onOpenModal2}
                                  >
                                    Add Now
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

              {/* Set-up a pool popup */}
              <div className="modal">
                <ReactModal
                  isOpen={this.state.open2}
                  onRequestClose={this.onCloseModal1}
                  contentLabel="Minimal Modal Example"
                  style={customStylesautosmallmodal}
                >
                  <React.Fragment>
                    <div className="modalPopup2">
                      <div className="popupTitle">
                        <h2>Set-up a Pool</h2>
                        <button
                          type="button"
                          className="closePopup"
                          onClick={this.onCloseModal1}
                        >
                          {" "}
                          <CloseIcon
                            style={{ fontSize: "1.7rem" }}
                          ></CloseIcon>{" "}
                        </button>
                      </div>
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
                                    description: e.target.value,
                                  },
                                });
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

export default withSnackbar(IssuerDashboard);
