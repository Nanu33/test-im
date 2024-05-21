/* eslint-disable require-jsdoc */
import React, { Component } from "react";
import Sidebar from "../../../components/sidebar";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Loader from "../../../components/loader";
import CloseIcon from "@material-ui/icons/Close";
import { withSnackbar } from "notistack";
import CircularProgress from "@material-ui/core/CircularProgress";

import ReactModal from "react-modal";
import { TableVirtuoso } from "react-virtuoso";

import { customStylesautosmallmodal } from "../../../components/customscripts/customscript";
import FormLoader from "../../../components/loader/formLoader";
import {
  GetAllPools,
  SetUpPool,
  SetUpPoolRoles,
  Uploadloanlms,
  Onboradloans,
  previewratingagencypool,
  previewupdatePoolStatus,
} from "../../../servies/services";
import { TrainRounded } from "@material-ui/icons";
import {
  ThemeProvider,
  createTheme,
  MuiThemeProvider,
} from "@material-ui/core/styles";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import "react-input-range/lib/css/index.css";
import NumberComp2 from "../../../components/NumberComp2";
import Arrow from "../../../images/Arrow.png";

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

class RA_Preview_Pools extends Component {
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
        assetclass: "",
        description: "",
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
      // notificationlist: [],
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
    } = this.state;
  
    // Determine the new sort order
    let newSortAscending;
    if (sortColumn === column) {
      newSortAscending = !sortAscending;
    } else {
      // Default to ascending order when sorting a new column
      newSortAscending = true;
    }
  
    // Custom compare function for sorting
    const compareFunc = (a, b) => {
      const valueA = a[column];
      const valueB = b[column];
  
      // Check if both values are numbers
      if (!isNaN(valueA) && !isNaN(valueB)) {
        return newSortAscending ? valueA - valueB : valueB - valueA;
      } else {
        const stringA = valueA ? String(valueA).toLowerCase() : "";
        const stringB = valueB ? String(valueB).toLowerCase() : "";
  
        if (stringA < stringB) return newSortAscending ? -1 : 1;
        if (stringA > stringB) return newSortAscending ? 1 : -1;
        return 0;
      }
    };
  
    let sortedData;
    if (searchText) {
      sortedData = filteredData.slice().sort(compareFunc);
    } else {
      sortedData = tableData.slice().sort(compareFunc);
    }
  
    this.setState({
      tableData: sortedData,
      sortColumn: column,
      sortAscending: newSortAscending,
    });
  };
  handleClick = () => {
    // this.props.history.push({
    //     pathname: "/pendingkyc",
    // });
    window.location.assign("/pendingkyc");
  };
  handleClickSubmitted = () => {
    // console.log("handleClickSubmitted");
    // this.props.history.push({
    //     pathname: "/kycloginstep2",
    // });
    window.location.assign("/kycloginstep2");
  };
  handleClickUpload = () => {
    // this.props.history.push({
    //     pathname: "/kycloginstep1",
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
    } else if (status === "Rejected By RatingAgency") {
      const message = "Rejected By RatingAgency";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    } else {
      // this.props.history.push("/admin/preview_pool_details");
      window.location.assign("/admin/ra_previewpooldetails");
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
      if (value == "Accepted By RatingAgency") {
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

  previewratingagencypool = async () => {
    this.setState({ getLoansLoader: true, tableData: [], loading: true });
    var data = {};
    data.ratingagency = this.state.UserId;
    data.mailid = this.state.EmailAddress;
    data.token = this.state.token;

    try {
      const APIResponse = await previewratingagencypool(data);

      if (APIResponse.status === 200) {
        this.setState({
          getLoansLoader: false,
          open: true,
          tableData: APIResponse.data,
          // notificationlist: APIResponse.data.notificationlist,
          loading: false,
        });
        sessionStorage.setItem("issuerid", APIResponse.data[0].issuerId);
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
    try {
      await Promise.all([
        this.previewratingagencypool(),
        // this.SetUpPoolRoles()
      ]);
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
      },
      {
        name: "Actions",
        label: "Actions",
        bodyRenderer: (value) => {
          return (
            <React.Fragment>
              <div>
                <button
                  type="button"
                  style={{
                    cursor: "pointer",
                    // color: this.state?.notificationlist.some((poolid) => poolid === value['poolID']) ? "#CA2E55" : ''
                  }}
                  onClick={() =>
                    this.viewdetails(
                      value["poolID"],
                      value["poolname"],
                      value.previewstatus[this.state.UserId]
                    )
                  }
                  className="login-sign_up-links"
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
                {this.state.screendisplay === true ? (
                  <div className="page-content">
                    <div className="row row1">
                      <div className="investor-heading-container">
                        <h1 className="headerdashboard">Preview - Pools</h1>
                      </div>

                      <div>
                        <div className="dashboard-top-right-container1">
                          {
                          this.state.showSearchBox === false ? (
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
                          )
                        }
                        </div>
                      </div>
                    </div>

                    <React.Fragment>
                      <div className="workbench-table-container">
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
                                    : this.state.filteredData.length * 50 + 60
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

                      <div className="modalshiftcontent">
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
                                      "Accepted By RatingAgency",
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

                        {this.state.getLoansLoader === false ? (
                          ""
                        ) : (
                          <FormLoader></FormLoader>
                        )}
                      </div>
                    </div>
                  </React.Fragment>
                </ReactModal>
              </div>

              <div id="modal">
                <ReactModal
                  isOpen={this.state.open2}
                  onRequestClose={this.onCloseModal1}
                  contentLabel="Minimal Modal Example"
                  style={customStylesautosmallmodal}
                >
                  <React.Fragment>
                    <div className="modalPopup2">
                      <h2>
                        Are you sure you want to Reject the Pool to Preview?
                      </h2>

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
                                    "Rejected By RatingAgency",
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

export default withSnackbar(RA_Preview_Pools);
