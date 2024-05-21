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
import Select from "react-select";
import { TableVirtuoso } from "react-virtuoso";

import {
  widgets,
  CustomFieldTemplate,
  customStyles,
  customStylesauto,
  customStylesauto3,
  customStylesautosmallmodal,
  customStylesAcceptPopup,
  customStylesPAPopup,
  customStylesauto2,
} from "../../../components/customscripts/customscript";
import FormLoader from "../../../components/loader/formLoader";
import {
  viewLoans,
  uploadlms,
  savelms,
  ValidateLoan,
  UpdateLoanAndPoolStatus,
  getAttributesByPoolName,
  UploadContract,
  mapAttributesToPool,
  PoolDetails,
  getPoolDocument,
  addPoolDocument,
  updatepooldocuments,
  DownloadPoolDoc,
  DeletePoolDocument,
  getFileListByDealName,
  UpdatePool,
  Downloadpreviewstdloantape,
  Uploadloanlms,
  Onboradloans,
  UpdateLoanStatus,
  saveFeedback,
  retrieveFeedback,
  SetUpPoolRoles,
  getNotificationList,
  updatepreviewinvestorlist,
  UpdateReadlist,
} from "../../../servies/services";
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
import VisibilityIcon from "@material-ui/icons/Visibility";
import DownloadIcon from "@mui/icons-material/Download";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import NumberComp from "../../../components/NumberComp";
import NumberComp2 from "../../../components/NumberComp2";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import LockIcon from "@material-ui/icons/Lock";
import PublicIcon from "@material-ui/icons/Public";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { default as ReactSelect } from "react-select";
import { components } from "react-select";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import Arrow from "../../../images/Arrow.png";
import Iframe from "react-iframe";

import $ from "jquery";
//import MapFields from "../IssuerMapFields/MapFields";

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

const customStyle = {
  option: (provided, state) => ({
    ...provided,
    // minHeight: 20,
    // height: 20,
    // color: state.isSelected ? 'red' : 'blue',
    padding: 2,
  }),
  control: (base) => ({
    ...base,
    height: 45,
    minHeight: 45,
    width: 500,
    minWidth: 500,
    // marginLeft: '60px',
    // marginRight: '60px',
    fontWeight: "bold",
    borderStyle: "solid",
    borderColor: "grey",
    borderBottom: "1px solid grey",
  }),
};

const Option = (props) => {
  return (
    <div>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />{" "}
        <label className="setup">{props.label}</label>
      </components.Option>
    </div>
  );
};

class RA_PreviewPoolDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRecords: [],
      eligibleloans: {},
      tableData1: [],
      tableData2: [],
      tableData3: [],
      previewMappingData: [],
      loading: false,
      getLoansLoader: false,
      screenloader: false,
      formLoader: false,
      open: false,
      openPopup: false,
      selectedLoanId: [],
      searchText: "",
      rowsSelected: null,
      open1: false,
      open2: false,
      open3: false,
      open4: false,
      open5: false,
      open6: false,
      open7: false,
      open8: false,
      openPreview: false,
      openInvestor: false,
      openLoanTape: false,
      setupPoolFormData: {
        poolname: "",
        assetclass: "",
        description: "",
        assignunderwriter: "",
        assigninvestor: "",
        assignverification: "",
      },
      formData: {
        documentname: "",
        description: "",
        // privacymode: "",
      },
      formData1: {
        documentname: "",
        description: "",
        // privacymode: "",
      },
      formData2: {
        feedback: "",
      },
      loanTapeFormData: {
        verification_template: "",
      },
      poolName: sessionStorage.getItem("poolname"),
      token: sessionStorage.getItem("token"),
      activeInsights1: false,
      activeInsights2: false,
      activeInsights3: false,
      activeInsights4: true,
      activeInsights5: false,
      showSearchBox: false,
      pooldetails: [],
      bdbtiles: [],
      dealDocuments: [],
      userrole: sessionStorage.getItem("userrole"),
      Redirection: sessionStorage.getItem("component"),
      dealid: sessionStorage.getItem("dealId"),
      issuerid: sessionStorage.getItem("userid"),
      selectedData: [],
      demoData: [],
      file1: "",
      filename1: "",
      file2: "",
      filename2: "",
      loandetails: [],
      PoolDetailsData: [],
      processorarrray: [],
      processoroption: {
        data: [
          { date: "02-10-2021" },
          { date: "03-10-2021" },
          { date: "02-10-2021" },
          { date: "04-10-2021" },
          { date: "05-10-2021" },
        ],
      },
      array1: [],
      columns: [],
      isSubmitVerifiedBtn: false,
      noAlertStatus: "",
      UserId: sessionStorage.getItem("userid"),
      issuerId: sessionStorage.getItem("issuerid"),
      EmailAddress: sessionStorage.getItem("EmailAddress"),
      submitDownArrow: false,
      UnderwriterDropdown: JSON.parse(
        sessionStorage.getItem("underwriterDropdown")
      ),
      InvestorDropdown: JSON.parse(sessionStorage.getItem("investorDropdown")),
      VerificationDropdown: JSON.parse(
        sessionStorage.getItem("verificationDropdown")
      ),
      verificationTemplate: JSON.parse(
        sessionStorage.getItem("verification_template")
      ),
      firstname: sessionStorage.getItem("firstname"),
      lastname: sessionStorage.getItem("lastname"),
      openStatusUpdate: false,
      openFeedback: false,
      loanid: "",
      retrieveFeedbackData: [],
      notificationlist: [],
      investorDropdown: [],
      selectedLabels: [],
      filteredData: [],
      searchQuery: "",
      bdbURL: "",
      poolidold: {
        poolid: {
          type: "in",
          value: "",
        },
      },
      UrlBdbNew:
        "https://analytics.demo-iaedge.intainabs.com/home/#/opendocument?data=",
      //dataFromSetupPool : sessionStorage.getItem("setuppooldetails").split(",")
    };
  }

  handleCheckboxChange = (value) => {
    // Check if the value is already in the selectedValues array
    if (this.state.selectedLabels.includes(value)) {
      // If it is, remove it
      this.setState((prevState) => ({
        selectedLabels: prevState.selectedLabels.filter(
          (item) => item !== value
        ),
      }));
    } else {
      // If it isn't, add it
      this.setState((prevState) => ({
        selectedLabels: [...prevState.selectedLabels, value],
      }));
    }
    console.log("selectedValues", this.state.selectedLabels);
  };

  handleChildData = (a, b) => {
    this.closeMapLoanField();
    this.setState({
      openLoanTape: true,
    });
  };

  // {loanId: "Frankie Long", loanNumber: "Industrial Analyst", constatus: "Uploaded", lmsstatus: "Digitised"},
  //     {loanId: "Brynn Robbins", loanNumber: "Business Analyst", constatus: "Digitised", lmsstatus: "Reviewd"},
  //     {loanId: "Justice Mann", loanNumber: "Business Consultant", constatus: "Reviewd", lmsstatus: "Uploaded"},
  handleChange = (selected) => {
    this.setState({
      processorarrray: selected,
    });
    console.log("selecteddd", selected.value);
  };
  openEditLoanTape = () => {
    this.setState({
      openLoanTape: true,
      downArrow: false,
    });
  };
  closeEditLoanTape = () => {
    this.setState({
      openLoanTape: false,
      file1: "",
      filename1: "",
      file2: "",
      filename2: "",
      loanTapeFormData: {
        verification_template: "",
      },
    });
  };
  onSubmit = (e) => {
    e.preventDefault();
    sessionStorage.setItem("functiontodo", "reupload");
    this.Uploadloanlms();
  };
  popoverBottom = () => {
    return (
      <Popover className="popover-container">
        <button onClick={() => this.downloadpreviewstdloantape("xlsx")}>
          Excel
        </button>
        <hr className="popover-hr" />
        <button onClick={() => this.downloadpreviewstdloantape("csv")}>
          CSV
        </button>
      </Popover>
    );
  };
  submitPopover = () => {
    return (
      <Popover className="popover-container">
        {/* <button onClick={this.openPreviewForm.bind(this)}>Issuer</button> */}
        <button disabled style={{ color: "#808080" }}>
          Issuer
        </button>
        <hr className="popover-hr" />
        <button onClick={this.openInvestorForm.bind(this)}>
          Select Investor
        </button>
      </Popover>
    );
  };
  popoverBottom1 = (e) => {
    return (
      <Popover id="popover-positioned-bottom" className="popover-container">
        <button style={{ paddingTop: "15px" }} onClick={() => this.onOpenModal6(e)}>View</button>
        <hr className="popover-hr" />
        <button onClick={() => this.onOpenModal5(e)}>Edit</button>
        <hr className="popover-hr" />
        <button style={{ paddingBottom: "15px" }} onClick={() => this.DeletePoolDocument(e)}>Delete</button>
      </Popover>
    );
  };
  openPreviewForm = () => {
    this.setState({ openPreview: true });
  };
  closePreviewForm = () => {
    this.setState({
      openPreview: false,
      setupPoolFormData: {
        poolname: this.state.pooldetails.poolname,
        assetclass: this.state.pooldetails.assetclass,
        description: this.state.pooldetails.description,
        assignunderwriter: "",
        assigninvestor: "",
        assignverification: "",
      },
    });
  };
  openInvestorForm = () => {
    this.setState({ openInvestor: true });
  };
  closeInvestorForm = () => {
    this.setState({
      openInvestor: false,
      selectedLabels: "",
      searchQuery: "",
    });
  };
  onOpenModal = () => {
    console.log("inside modal1");
    this.setState({
      open1: true,
      open2: false,
      open3: false,
      formLoader: false,
    });
  };

  onOpenFeedback = (val) => {
    this.setState({
      openFeedback: true,
      loanid: val,
    });
    this.retrieveFeedback(val);
    // this.getNotificationList();
  };
  closeFeedback = () => {
    this.setState({
      openFeedback: false,
      formData2: {
        feedback: "",
      },
    });
  };
  onOpenStatusUpdate = (val) => {
    this.setState({
      openStatusUpdate: true,
      loanid: val,
    });
  };
  closeStatusUpdate = () => {
    this.setState({
      openStatusUpdate: false,
    });
  };

  maploanfield = () => {
    this.setState({
      openMapLoanField: true,
    });
  };

  closeMapLoanField = () => {
    this.setState({
      openMapLoanField: false,
    });
  };

  onCloseModal = () => {
    this.setState({ open1: false, open2: false, open8: false });
  };
  onOpenModal1 = () => {
    console.log("inside modal1");
    this.setState({ open2: true, open1: false });
  };

  onCloseModal1 = () => {
    this.setState({ open2: false, open1: false });
  };

  onOpenModal2 = () => {
    this.setState({
      open3: true,
      selectedData: [],
      submitDownArrow: !this.state.submitDownArrow,
    });
  };

  onCloseModal2 = () => {
    this.setState({ open3: false, selectedData: [] });
  };
  onOpenModal3 = () => {
    console.log("upload contract popup");
    this.setState({ processorarrray: [] });
    this.getFileListByDealName();
    this.setState({ open4: true });
  };
  onCloseModal3 = () => {
    this.setState({ open4: false });
  };
  onOpenModal4 = () => {
    console.log("inside modal1");
    this.setState({ open5: true });
  };
  onCloseModal4 = () => {
    this.setState({
      open5: false,
      file1: "",
      formData: {
        documentname: "",
        description: "",
        // privacymode: "",
      },
    });
  };
  onCloseModal5 = () => {
    this.setState({
      open6: false,
      formData1: {
        documentname: "Washington top MNCs",
        description: "It will help us to verify the sources",
        // privacymode: "Private",
      },
    });
  };
  onOpenModal5 = (e) => {
    console.log("e", e);
    console.log("inside modal1");
    this.setState({
      open6: true,
      documentDetail: e,
      formData1: {
        documentname: e.documentname,
        description: e.description,
        // privacymode: e.privacymode,
      },
    });
  };
  onOpenModal6 = (e) => {
    console.log("e", e);
    console.log("inside modal1");
    this.setState({
      open7: true,
      documentDetail: e,
      formData1: {
        documentname: e.documentname,
        description: e.description,
        // privacymode: e.privacymode,
      },
    });
  };
  onCloseModal6 = () => {
    this.setState({ open7: false });
  };
  onSubmit1 = (e) => {
    e.preventDefault();
    console.log(this.state.formData);
    this.addDealDocument();
    console.log("hello we have clicked the button");
  };
  onSubmit3 = (e) => {
    e.preventDefault();
    console.log(this.state.formData1);
    this.updateDealDocument();
    console.log("hello we have clicked the button");
  };
  onSubmit4 = (e) => {
    e.preventDefault();
    this.UpdateLoanStatus();
  };
  onSubmit5 = (e) => {
    e.preventDefault();
    this.saveFeedback();
  };
  onPreviewSubmit = (e) => {
    e.preventDefault();
    this.updatePool();
  };
  onVerficationSubmit = (e) => {
    e.preventDefault();
    this.updatepreviewinvestorlist();
  };

  handleOnChange1 = (e) => {
    this.setState({
      file1: e.target.files[0],
      filename1: e.target.files[0].name,
    });
    sessionStorage.setItem("filename", JSON.stringify(e.target.files[0].name));
    console.log("file1", this.state.filename1);
    console.log("eeee", e.target.files[0].name);
    console.log("file2", e.target.files[0]);
  };

  handleOnChange2 = (e) => {
    this.setState({
      file2: e.target.files[0],
      filename2: e.target.files[0].name,
    });
    console.log("eeee", e.target.files[0].name, this.state.file1);
  };

  handleClick = () => {
    this.props.history.push({
      pathname: "/admin/issuerdashboard",
    });
  };
  onSubmit2 = (e) => {
    e.preventDefault();
    this.UploadContract();
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

  updatePool = async () => {
    const { setupPoolFormData } = this.state;
    this.setState({ formLoader: true });
    var data = setupPoolFormData;
    data.poolid = this.state.pooldetails.poolID;
    data.issuerId = this.state.issuerid;
    data.poolname = setupPoolFormData.poolname;
    data.assetclass = setupPoolFormData.assetclass;
    data.description = setupPoolFormData.description;
    data.token = this.state.token;
    data.previewOrVerfify =
      this.state.openPreview === true ? "Preview" : "Verify";
    data.assignverification = setupPoolFormData.assignverification;
    if (data.assignunderwriter !== "") {
      let result = [];
      setupPoolFormData.assignunderwriter.forEach((key, value) => {
        result.push(key.value);
      });
      data.assignunderwriter = result.join(",");
    } else {
      data.assignunderwriter = "";
    }
    if (data.assigninvestor !== "") {
      let result = [];
      setupPoolFormData.assigninvestor.forEach((key, value) => {
        result.push(key.value);
      });
      data.assigninvestor = result.join(",");
    } else {
      data.assigninvestor = "";
    }

    const APIResponse = await UpdatePool(data);

    if (APIResponse.status === 200) {
      this.setState({ formLoader: false });
      const message = "Data Saved Successfully";
      this.props.enqueueSnackbar(message, {
        variant: "info",
        autoHideDuration: 3000,
      });
      this.closePreviewForm();
      window.location.reload();
    } else {
      alert("Failed upload");
    }
  };
  //  preview pool
  UpdateLoanStatus = async () => {
    this.setState({ formLoader: true });
    var data = {};
    data.loanid = this.state.loanid;
    data.status = "Reconsider";
    data.poolid = this.state.pooldetails["poolID"];
    data.token = this.state.token;

    const APIResponse = await UpdateLoanStatus(data);
    console.log("res", APIResponse);
    if (APIResponse.status === 200) {
      if (this.state.formData2.feedback.length > 0) {
        this.setState({ formLoader: true });
        this.saveFeedback();
        return;
      }
      this.setState({ formLoader: false });
      if (APIResponse.data.isSuccess == true) {
        const message = APIResponse.data.message;
        this.props.enqueueSnackbar(message, {
          variant: "info",
          autoHideDuration: 3000,
        });
        this.closeStatusUpdate();
        // window.location.reload()
      } else {
        const message = APIResponse.data.message;
        this.props.enqueueSnackbar(message, {
          variant: "error",
          autoHideDuration: 3000,
        });
        this.closeStatusUpdate();
      }
    } else {
      this.setState({ formLoader: false });
      const message = "Something went wrong, Please try again!";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
      this.closeStatusUpdate();
    }
  };

  saveFeedback = async () => {
    var data = this.state.formData2;
    data.poolid = sessionStorage.getItem("poolid") || this.state.dealid;
    data.loanid = this.state.loanid;
    data.userid = this.state.UserId;
    data.issuerId = this.state.issuerId;
    data.username = this.state.firstname + this.state.lastname;
    data.feedback = data.feedback;
    data.organizationname = sessionStorage.getItem("organizationname");
    data.token = this.state.token;

    const APIResponse = await saveFeedback(data);
    console.log(APIResponse);
    if (APIResponse.status === 200) {
      if (APIResponse.data.success == true) {
        this.setState({ formLoader: false });
        const message = APIResponse.data.message;
        this.props.enqueueSnackbar(message, {
          variant: "info",
          autoHideDuration: 3000,
        });
        this.closeFeedback();
        this.closeStatusUpdate();
        // window.location.reload()
      } else {
        this.setState({ formLoader: false });
        const message = APIResponse.data.message;
        this.props.enqueueSnackbar(message, {
          variant: "error",
          autoHideDuration: 3000,
        });
        this.closeFeedback();
        window.location.reload();
      }
    } else {
      this.setState({ formLoader: false });
      const message = "Something went wrong, Please try again!";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
      this.closeFeedback();
      window.location.reload();
    }
  };
  UpdateReadlist = async (loanid) => {
    var data = {};
    data.poolid = this.state.pooldetails["poolID"];
    data.userid = this.state.issuerid;
    data.loanid = loanid;
    data.token = this.state.token;

    const APIResponse = await UpdateReadlist(data);
    if (APIResponse.status === 200) {
      this.getNotificationList();
    }
  };

  retrieveFeedback = async (val) => {
    var data = {};
    data.loanid = val;
    data.poolid = sessionStorage.getItem("poolid") || this.state.dealid;
    data.userid = this.state.issuerid;
    data.token = this.state.token;

    const APIResponse = await retrieveFeedback(data);

    console.log("res", APIResponse);
    if (APIResponse.status === 200) {
      this.setState({
        retrieveFeedbackData: APIResponse.data,
      });
      this.UpdateReadlist(val);
    }
  };

  SetUpPoolRoles = async () => {
    this.setState({ getLoansLoader: true });

    var data = {};
    data.token = this.state.token;
    const APIResponse = await SetUpPoolRoles(data);
    if (APIResponse.status === 200) {
      console.log("SetUpPoolRoles--", APIResponse.data);

      let y = [];
      let investorrole = [];

      if (APIResponse.data.Investor.length !== 0) {
        if (this.state.EmailAddress.toLowerCase().includes("test") == true) {
          APIResponse.data.Investor.forEach(function (key, value) {
            if (key.UserName.toLowerCase().includes("test") == true) {
              console.log("key", key.UserId);
              console.log("value", value);
              investorrole.push({ label: key.UserName, value: key.UserId });
            }
          });
          this.setState({
            investorDropdown: investorrole,
            getLoansLoader: false,
          });
        }
        // else if(this.state.EmailAddress.toLowerCase().includes("demo") == true && sessionStorage.getItem('firstname').toLowerCase() === "demo"){
        //     APIResponse.data.Investor.forEach(function (key, value) {
        //         if (key.UserName.toLowerCase().includes("demo") == true) {
        //             console.log("key", key.UserId);
        //             console.log("value", value);
        //             investorrole.push({ label: key.UserName, value: key.UserId });
        //         }
        //     });
        // }
        else {
          APIResponse.data.Investor.forEach(function (key, value) {
            if (!key.UserName.toLowerCase().includes("test")) {
              console.log("key", key.UserId);
              console.log("value", value);
              y.push({ label: key.UserName, value: key.UserId });
            }
          });
          this.setState({
            investorDropdown: y,
            getLoansLoader: false,
          });
        }
      }
    } else {
      this.setState({ getLoansLoader: false });
      const message = "Couldn't fetch the record";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  downloadpreviewstdloantape = async (value) => {
    console.log(this.state.issuerid);
    var data = {};
    data.poolid = sessionStorage.getItem("poolid") || this.state.dealid;
    data.issuerId = this.state.loandetails[0]["issuerId"];
    data.selectedFormat = value;
    data.token = this.state.token;
    const APIResponse = await Downloadpreviewstdloantape(data);
    console.log(APIResponse);

    if (APIResponse.status === 200) {
      const file_name = `${data.poolid}.${value}`;
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
    }
  };

  Uploadloanlms = async () => {
    const newdata = new FormData();
    newdata.append("filename", this.state.file1);
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
    this.setState({ formLoader: true });
    var data = {};
    data.filename = value;
    data.issuerId = this.state.UserId;
    data.asset_class = this.state.pooldetails.assetclass;
    data.verificationtemplate =
      this.state.loanTapeFormData.verification_template;
    data.token = this.state.token;
    const APIResponse = await Onboradloans(data);
    console.log(APIResponse.data.data.key);
    if (APIResponse.status === 200) {
      console.log("upload--", APIResponse);
      if (APIResponse.data.sucess === "true") {
        this.setState({ formLoader: false });
        // const message = "Data Saved Successfully";
        // this.props.enqueueSnackbar(message, {
        //   variant: "info",
        //   autoHideDuration: 3000,
        // });
        this.setState({ mappingDataKey: APIResponse.data.data.key });
        sessionStorage.setItem("addloandetails", [
          value,
          this.state.formData.asset_class,
          this.state.formData.verification_template,
        ]);
        this.closeEditLoanTape();
        this.maploanfield();
      } else {
        this.setState({
          formLoader: false,
          showMessage: true,
          ColumnName: APIResponse?.data?.ColumnName,
          LoanIdData: APIResponse?.data?.["Loan ID's"],
          showMessageData1: APIResponse.data.message,
        });
      }
    } else {
      alert("Failed upload");
    }
  };

  // previewQueryPoolMappingDetails = async () => {
  //   var data = {}
  //   data.poolid = sessionStorage.getItem("poolid")
  //   data.token = this.state.token;

  //   const APIResponse = await PreviewQueryPoolMappingDetails(data);

  //   console.log('map', APIResponse.data.mappingData);
  //   if (APIResponse.status === 200) {
  //     this.setState({
  //       previewMappingData: APIResponse.data.mappingData
  //     })
  //     console.log("previewdata", this.state.previewMappingData)
  //     sessionStorage.setItem('map', JSON.stringify(APIResponse.data.mappingData))
  //   }
  // }

  getFileListByDealName = async () => {
    var data = {};
    data.poolname = this.state.pooldetails.aitrainedpoolname;
    data.token = this.state.token;
    console.log("datatatatatta", data);
    const APIResponse = await getFileListByDealName(data);
    console.log("Allzipfiles--", APIResponse);
    if (APIResponse.status === 200) {
      console.log("Allzipfiles--", APIResponse);
      this.setState({ array1: APIResponse.data });
      let x = APIResponse.data;
      console.log("xxxxxxxx", x);
      let y = [];
      x.forEach(function (element) {
        y.push({ label: element, value: element });
      });
      console.log("yyyyyyyy", y);
      console.log("inside modal1");
      this.setState({ processoroption: y });
    } else {
      alert("Failed");
    }
  };

  Submitforverification = () => {
    this.setState({ formLoader: true });
    let arr = [];
    if (sessionStorage.getItem("pooldetailsdata") != null) {
      const response = JSON.parse(sessionStorage.getItem("pooldetailsdata"));
      for (var i = 0; i < response.loandetails.length; i++) {
        if (
          response.loandetails[i].Status === "Mapped" &&
          response.loandetails[i]["Contract Digitized"] == "no"
        ) {
          arr.push(response.loandetails[i]);
          // this.onOpenModal()
          console.log(
            "xxxxxxxxxxxxxxxxxxxx",
            response.loandetails[i].Status,
            response.loandetails.length,
            response.loandetails[i]
          );
          break;
        } else {
          //  this.ValidateLoan()
        }
      }
    } else {
      const response = this.state.PoolDetailsData;
      for (var i = 0; i < response.loandetails.length; i++) {
        if (
          response.loandetails[i].Status === "Mapped" &&
          response.loandetails[i]["Contract Digitized"] == "no"
        ) {
          arr.push(response.loandetails[i]);
          // this.onOpenModal()
          console.log(
            "xxxxxxxxxxxxxxxxxxxx",
            response.loandetails[i].Status,
            response.loandetails.length,
            response.loandetails[i]
          );
          break;
        } else {
          //  this.ValidateLoan()
        }
      }
    }
    if (arr.length == 0) {
      this.ValidateLoan();
    } else this.onOpenModal();
  };

  ValidateLoan = async () => {
    var data = {};
    data.loanidlist = this.state.loanidlist;
    data.poolid = this.state.pooldetails.poolID;
    data.aitrainedpoolname = this.state.pooldetails.aitrainedpoolname;
    data.fields_list = this.state.selectedData;

    console.log("datata", data);
    data.token = this.state.token;
    const APIResponse = await ValidateLoan(data);

    if (APIResponse.status === 200) {
      this.UpdateLoanAndPoolStatus();
    } else {
      this.setState({ formLoader: false });
      const message = "Something went wrong";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };
  getAttributesByPoolName = async (value) => {
    var data = {};
    data.aitrainedpoolname = value;
    data.token = this.state.token;
    console.log("datata", data);
    const APIResponse = await getAttributesByPoolName(data);

    if (APIResponse.status === 200) {
      this.setState({ demoData: APIResponse.data });
    } else {
      const message = "Something went wrong";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };
  UpdateLoanAndPoolStatus = async () => {
    var data = {};
    // data.contractaddress = "0xFD6380543eDc62EB255746DED6b7d39baAa414a1";
    data.poolid = this.state.pooldetails.poolID;
    data.poolStatus = "Pending";
    data.loanStatus = "Mapped";
    data.token = this.state.token;
    console.log("datata", data);
    const APIResponse = await UpdateLoanAndPoolStatus(data);

    if (APIResponse.status === 200) {
      this.setState({ formLoader: false, open3: false });
      this.onOpenModal1();
    } else {
      this.setState({ formLoader: false });
      const message = "Update Unsuccessful";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  UploadContract = async () => {
    console.log("uplaodcontract");

    const newdata = {};
    newdata.filename = this.state.processorarrray.value;
    newdata.token = this.state.token;
    newdata.poolid = this.state.pooldetails.poolID;
    newdata.aitrainedpoolname = this.state.pooldetails.aitrainedpoolname;
    newdata.token = this.state.token;
    console.log("newdata", newdata);
    this.setState({ formLoader: true });
    const APIResponse = await UploadContract(newdata);

    if (APIResponse.status === 200) {
      console.log("upload--", APIResponse);
      if (APIResponse.data.desc === "File Upload Completed!!!") {
        const message = "File Upload Completed!!!";
        this.props.enqueueSnackbar(message, {
          variant: "info",
          autoHideDuration: 2000,
        });
        this.setState({ formLoader: false });
        window.location.reload();
        this.onCloseModal4();
        // this.mapAttributesToPool()
        // window.location.assign("/admin/issuerloans");
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

  DeletePoolDocument = async (e) => {
    var data = {};
    data.documentid = e.documentid;
    data.token = this.state.token;
    console.log("datata", data);
    const APIResponse = await DeletePoolDocument(data);

    if (APIResponse.status === 200) {
      const message = "Deal Document Delete Success";
      this.props.enqueueSnackbar(message, {
        variant: "info",
        autoHideDuration: 3000,
      });
      this.PoolDetails1();
    } else {
      const message = "Couldn't create the deal";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  mapAttributesToPool = async () => {
    this.setState({ formLoader: true });
    var data = {};
    data.poolid = this.state.pooldetails.poolID;
    data.aitrainedpoolname = this.state.pooldetails.aitrainedpoolname;
    console.log("datata", data);
    const APIResponse = await mapAttributesToPool(data, this.state.token);

    if (APIResponse.status === 200) {
      this.setState({ formLoader: false });
      this.onCloseModal4();
    } else {
      this.setState({ formLoader: false });
      const message = "Update Unsuccessful";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  onchange = (event) => {
    const searchText = event.target.value.toLowerCase();
    const { loandetails } = this.state;

    const filteredData = loandetails.filter((row) => {
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
    console.log("filterdata", this.state.filteredData);
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
  handleClicks = () => {
    console.log("hello we have clicked the button");
    window.location.assign("/admin/ra_preview_pools");
  };
  PoolDetails1 = async () => {
    try {
      this.setState({ screenloader: true });

      const data = {
        issuerId: sessionStorage.getItem("issuerid"),
        poolid: sessionStorage.getItem("poolid") || this.state.dealid,
        userid: sessionStorage.getItem("userid"),
        token: this.state.token,
      };

      const APIResponse = await PoolDetails(data);

      if (APIResponse.status === 200) {
        const response = APIResponse.data;
        const {
          loandetails,
          pooldetails,
          notificationlist,
          bdbtiles,
          documentdetails,
        } = response;
        const poolDetails = pooldetails[0];
        const {
          poolname,
          assetclass,
          description,
          assignverification,
          AlertStatus,
        } = poolDetails;

        const setupPoolFormData = {
          ...this.state.setupPoolFormData,
          poolname,
          assetclass,
          description,
          assignverification,
        };

        this.setState({
          PoolDetailsData: response,
          loandetails,
          pooldetails: poolDetails,
          notificationlist,
          setupPoolFormData,
        });

        if (bdbtiles) {
          this.setState({ bdbtiles: bdbtiles[0] });
        }

        const staticColumn = [
          {
            name: "Loan ID",
            label: "Loan ID",
            options: { filter: true, sort: true },
          },
          {
            name: "Asset Class",
            label: "Asset Class",
            options: { filter: true, sort: true },
          },
          {
            name: "Originator Name",
            label: "Originator Name",
            options: { filter: true, sort: true },
          },
          {
            name: "Original Principal Balance",
            label: "Original Principal",
            options: {
              filter: true,
              sort: true,
              customBodyRender: (value) => <NumberComp2 value={value} />,
            },
          },
          {
            name: "As Of Date",
            label: "As of Date",
            options: { filter: true, sort: true },
          },
          {
            name: "Loan Data",
            label: "Loan Data",
            options: { filter: true, sort: true },
          },
          {
            name: "Contract Digitized",
            label: "Loan Contract",
            options: { filter: true, sort: true },
          },
          // {
          //     name: "Actions",
          //     label: "Actions",
          //     options: {
          //         customBodyRender: (value, tableMeta) => (
          //             <React.Fragment>
          //                 <div
          //                     style={{
          //                         display: 'flex',
          //                         flexDirection: 'row',
          //                         marginTop: '-5px'
          //                     }}
          //                 >
          //                     <button
          //                         className="search-mui-icons"
          //                     >
          //                         <ClearOutlinedIcon onClick={() => this.onOpenStatusUpdate(tableMeta.rowData[0])} />
          //                     </button>
          //                     <button
          //                         className="search-mui-icons"
          //                     >
          //                         <MessageOutlinedIcon onClick={() => this.onOpenFeedback(tableMeta.rowData[0])} />
          //                     </button>
          //                 </div>
          //             </React.Fragment>
          //         )
          //     }
          // }
        ];

        const display = Object.keys(loandetails[0])
          .filter(
            (val) =>
              ![
                "_id",
                "issuerId",
                "poolid",
                "Loan Data",
                "Contract Data",
                "Contract Digitized",
                "Status",
                "Created Date",
                "Asset Class",
                "Matched",
                "Verfification Template",
                "System ID",
                "Loan ID",
                "As Of Date",
              ].includes(val)
          )
          .map((val, index) => ({
            name: val,
            label: val,
            options: {
              filter: true,
              sort: true,
              customHeadRender: (columnMeta, updateDirection) => (
                <th
                  style={{
                    backgroundColor: "rgba(1, 142, 130, 0.1)",
                    borderBottom: "none",
                    padding: "10px",
                    textAlign: "center",
                  }}
                >
                  {columnMeta.label}
                </th>
              ),
              customBodyRender: (value, tableMeta, updateValue) => (
                <div className="text-center">
                  {this.state.poolName === "New Silver" &&
                  tableMeta.columnIndex === 6 ? (
                    <NumberComp className="text-center" value={value} />
                  ) : tableMeta.columnIndex === 7 ? (
                    <div className="text-center">
                      {(value * 100).toFixed(3) + "%"}
                    </div>
                  ) : (
                    <div className="text-center">{value}</div>
                  )}
                </div>
              ),
            },
          }));

        const allColumns = [...staticColumn, ...display];

        let isSubmitVerifiedBtn = false;
        let noAlertStatus = "";
        if (
          this.state.userrole === "Issuer" &&
          loandetails.every((item) => item["Contract Data"] === "Yes") &&
          AlertStatus === "False"
        ) {
          isSubmitVerifiedBtn = true;
        } else if (
          this.state.userrole === "Issuer" &&
          !loandetails.every((item) => item["Contract Data"] === "Yes") &&
          AlertStatus === "False"
        ) {
          isSubmitVerifiedBtn = true;
          noAlertStatus = "No";
        }

        this.setState({
          columns: allColumns,
          isSubmitVerifiedBtn,
          open8: isSubmitVerifiedBtn,
          tableData1: loandetails.filter((e) => e.Status === "Reported"),
          tableData2: loandetails.filter(
            (e) => e.Status === "Mapped" || e.Status === "Unreviewed"
          ),
          tableData3: loandetails.filter(
            (e) =>
              e.Status !== "Reported" &&
              !(e.Status === "Mapped" || e.Status === "Unreviewed")
          ),
          screenloader: false,
          dealDocuments: documentdetails || [],
          noAlertStatus,
        });

        this.SetUpPoolRoles();
        this.getAttributesByPoolName(poolname);
      }
    } catch (err) {
      this.setState({ screenloader: false });
      console.log(err);
    }
  };
  getPoolDocument = async (value, value1) => {
    this.setState({ screenloader: true });
    var data = {};
    data.issuerid = value;
    data.poolid = value1;
    data.token = this.state.token;
    console.log("datata", data);
    const APIResponse = await getPoolDocument(data);

    if (APIResponse.status === 200) {
      this.setState({ screenloader: false });
      this.setState({ dealDocuments: APIResponse.data });
    } else {
      this.setState({ screenloader: false });
      const message = "Something went wrong";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  addDealDocument = async () => {
    const newdata = new FormData();
    newdata.append("filename", this.state.file2);
    newdata.append("poolid", this.state.pooldetails.poolID);
    newdata.append("issuerid", this.state.pooldetails.issuerId);
    newdata.append("documentname", this.state.formData.documentname);
    newdata.append("description", this.state.formData.description);
    // newdata.append("privacymode", this.state.formData.privacymode);

    console.log("newdata", newdata);

    this.setState({ formLoader: true });

    const APIResponse = await addPoolDocument(newdata, this.state.token);

    if (APIResponse.status === 200) {
      this.setState({ formLoader: false });

      const message = "Deal Upload Update Success";
      this.props.enqueueSnackbar(message, {
        variant: "info",
        autoHideDuration: 3000,
      });
      this.onCloseModal4();
      window.location.reload();
    } else {
      this.setState({ formLoader: false });
      const message = "Couldn't create the deal";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };
  updatepreviewinvestorlist = async () => {
    this.setState({ formLoader: true });
    var data = {};
    data.poolid = this.state.pooldetails.poolID;
    data.assigninvestor = this.state.selectedLabels.join(", ");
    data.token = this.state.token;

    const APIResponse = await updatepreviewinvestorlist(data);

    if (APIResponse.status === 200) {
      this.setState({ formLoader: false });
      const message = APIResponse.data.message;
      this.props.enqueueSnackbar(message, {
        variant: "info",
        autoHideDuration: 3000,
      });
      this.closeInvestorForm();
      window.location.reload();
    } else {
      this.setState({ formLoader: false });
      const message = APIResponse.data.message;
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
      this.closeInvestorForm();
    }
  };

  updateDealDocument = async () => {
    var data = {};
    data.documentid = this.state.documentDetail.documentid;
    data.documentname = this.state.formData1.documentname;
    data.description = this.state.formData1.description;
    // data.privacymode = this.state.formData1.privacymode;

    console.log("datata", data);
    this.setState({ formLoader: true });
    data.token = this.state.token;
    const APIResponse = await updatepooldocuments(data);

    if (APIResponse.status === 200) {
      this.setState({ formLoader: false, reload: true });
      const message = "Deal Document Update Success";
      this.props.enqueueSnackbar(message, {
        variant: "info",
        autoHideDuration: 3000,
      });
      this.onCloseModal5();
      window.location.reload();
    } else {
      this.setState({ formLoader: false });
      const message = "Couldn't create the deal";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };
  DownloadIPFSFile = async (e) => {
    let filetype = e.filename.split(".");
    let path = e.documentpath;
    console.log("filetype", filetype[1], path);
    if (filetype[1] === "pdf") {
      let data = {};
      data.documentid = e.documentid;
      data.token = this.state.token;
      const APIResponse = await DownloadPoolDoc(data, filetype[1]);
      const file_name = e.filename;
      const token = this.state.token;
      console.log("token", token);
      startDownload(APIResponse.data, file_name);
      console.log("APIResponse", APIResponse.data);
      function startDownload(file, file_name) {
        let data = new Uint8Array(file); // Use Uint8Array instead of Buffer
        const pdffile = new Blob([data], { type: "application/pdf" });
        const downloadLink = document.createElement("a");
        const url = window.URL.createObjectURL(pdffile);
        downloadLink.href = url;
        downloadLink.download = file_name;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      }
    } else {
      let data = {};
      data.documentid = e.documentid;
      data.token = this.state.token;
      const APIResponse = await DownloadPoolDoc(data, filetype[1]);
      const file_name = e.filename;
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
    }
  };

  async componentDidMount() {
    var component = window.location.pathname;
    sessionStorage.setItem("component", component);
    this.PoolDetails1();
    const res = await axios.get(
      "https://bdb.imtest.intainmarkets.us/api/v1/imarkets/reportlink?groupby=d&mailid=shruthie.sridhar@intainft.com&password=3QoJ4apBSWykJbp9RTRG4Q==&type=strat"
    );

    this.setState({
      bdbURL: res.data,
    });
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
            fontFamily: "Catamaran, sans-serif !important",
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
        MuiCircularProgress: {
          colorSecondary: {
            color: "#048c88 !important",
          },
        },
        MUIDataTableToolbar: {
          root: {
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

  async handleClickAccepted() {
    const res = await axios.get(
      "https://bdb.imtest.intainmarkets.us/api/v1/imarkets/reportlink?groupby=d&mailid=shruthie.sridhar@intainft.com&password=3QoJ4apBSWykJbp9RTRG4Q==&type=strat"
    );

    this.setState({
      bdbURL: res.data,
    });
    this.setState({
      activeInsights1: true,
      activeInsights2: false,
      activeInsights3: false,
      activeInsights4: false,
      activeInsights5: false,
    });
  }

  handleClickPending = () => {
    this.setState({
      activeInsights1: false,
      activeInsights2: true,
      activeInsights3: false,
      activeInsights4: false,
      activeInsights5: false,
    });
  };
  handleClickRejected = () => {
    this.setState({
      activeInsights1: false,
      activeInsights2: false,
      activeInsights3: true,
      activeInsights4: false,
      activeInsights5: false,
    });
  };
  handleClickLoanTape = () => {
    this.setState({
      activeInsights1: false,
      activeInsights2: false,
      activeInsights3: false,
      activeInsights4: true,
      activeInsights5: false,
    });
  };
  async handleClickSummary() {
    const res = await axios.get(
      "https://bdb.imtest.intainmarkets.us/api/v1/imarkets/reportlink?groupby=d&mailid=shruthie.sridhar@intainft.com&password=3QoJ4apBSWykJbp9RTRG4Q==&type=summary"
    );

    this.setState({
      bdbURL: res.data,
    });
    this.setState({
      activeInsights1: false,
      activeInsights2: false,
      activeInsights3: false,
      activeInsights4: false,
      activeInsights5: true,
      poolidold: JSON.stringify({
        poolid: {
          type: "in",
          value: [this.state.pooldetails.poolID],
        },
      }),
    });
  }

  handleOnChangeAdd = (data) => {
    console.log("dataaaa", data);
    this.setState((prevState) => ({
      selectedData: [...prevState.selectedData, data.attributeStandardName],
    }));
  };

  handleOnChnageRemove = (data) => {
    const newArr = this.state.selectedData;
    if (newArr.length > 0) {
      let indexPosition = newArr.findIndex(
        (element) => element.attributeName === data.attributeName
      );
      newArr.splice(indexPosition, 1);
      this.setState({ selectedData: newArr });
    }
  };
  handleSort = (column) => {
    const {
      sortColumn,
      sortAscending,
      loandetails,
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
      const sortedLoanDetails = loandetails.sort((a, b) => {
        const indexA = notificationlist.indexOf(a["Loan ID"]);
        const indexB = notificationlist.indexOf(b["Loan ID"]);
        const sortOrder = newSortAscending ? indexB - indexA : indexA - indexB;
        return sortOrder;
      });
      this.setState({
        loandetails: sortedLoanDetails,
        sortAscending: !newSortAscending,
      });
    }

    // Custom compare function for sorting
    const compareFunc = (a, b) => {
      const valueA = a[column] ? a[column].toLowerCase() : "";
      const valueB = b[column] ? b[column].toLowerCase() : "";
      if (valueA < valueB) return newSortAscending ? -1 : 1;
      if (valueA > valueB) return newSortAscending ? 1 : -1;
      return 0;
    };

    let sortedData;
    if (searchText) {
      // If there's a search term, sort the filtered data
      sortedData = [...filteredData].sort(compareFunc);
    } else {
      // If no search term, sort the full data
      sortedData = [...loandetails].sort(compareFunc);
    }

    this.setState({
      // Update the appropriate data array based on the scenario
      loandetails: searchText ? loandetails : sortedData,
      filteredData: searchText ? sortedData : filteredData,
      sortColumn: column,
      sortAscending: newSortAscending,
    });
  };

  render() {
    console.log("selected Data", this.state.selectedData);
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
        name: "Loan ID",
        label: "Loan ID",
        options: {
          fiter: true,
          sort: true,
        },
      },
      {
        name: "Asset Class",
        label: "Asset Class",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "Originator Name",
        label: "Originator Name",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "Original Principal Balance",
        label: "Original Principal",
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
        name: "Created Date",
        label: "Uploaded On",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "Loan Data",
        label: "Loan Data",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "Contract Digitized",
        label: "Loan Contract",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "Actions",
        label: "Actions",
        options: {
          customBodyRender: () => {
            return (
              <React.Fragment>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: "-5px",
                  }}
                >
                  {this.state.activeInsights3 && (
                    <>
                      <button className="search-mui-icons">
                        <CheckOutlinedIcon />
                      </button>
                      <button className="search-mui-icons">
                        <ClearOutlinedIcon />
                      </button>
                      <button className="search-mui-icons">
                        <MessageOutlinedIcon />
                      </button>
                    </>
                  )}
                  <button className="search-mui-icons">
                    <DeleteIcon />
                  </button>
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
          <Sidebar activeComponent={"Preview Pools"} />
          <div className="content1">
            {this.state.screenloader == true ? (
              <LinearLoader></LinearLoader>
            ) : (
              <div className="page-contentofpool">
                <div className="row">
                  <div className="col-12 col-sm-6 col-md-8">
                    <div className="d-flex">
                      <KeyboardBackspaceIcon
                        onClick={this.handleClicks}
                        className="left-arrow-muis1 left-arrow-servicer"
                      ></KeyboardBackspaceIcon>
                      <h3 className="headerdashboard">
                        Preview - Pool Details
                      </h3>
                    </div>
                    <div className="page-content1">
                      <h5 className="headingspace">Basic Details</h5>
                      <div className="row">
                        <div className="col">
                          <div className="headingspaces1">
                            <p className="sizeofp">Pool Name</p>
                            <h6 className="headingspace1">
                              {this.state.pooldetails.poolname
                                ? this.state.pooldetails.poolname
                                : "-"}
                            </h6>
                          </div>
                          <div className="headingspaces1">
                            <p className="sizeofp">Pool ID</p>
                            <h6 className="headingspace1">
                              {this.state.pooldetails.poolID
                                ? this.state.pooldetails.poolID
                                : "-"}
                            </h6>
                          </div>
                          <div className="headingspaces1">
                            <p className="sizeofp">Asset Class</p>
                            <h6 className="headingspace1">
                              {this.state.pooldetails.assetclass
                                ? this.state.pooldetails.assetclass
                                : "-"}
                            </h6>
                          </div>

                          <div className="headingspaces1">
                            <p className="sizeofp">No. of Loans</p>
                            <h6 className="headingspace1">
                              {this.state.pooldetails.numberofloans
                                ? this.state.pooldetails.numberofloans
                                : "-"}
                            </h6>
                          </div>
                        </div>

                        <div className="col">
                          <div className="headingspaces1">
                            <p className="sizeofp">Status</p>
                            {/* <h6 className="headingspace1">Created</h6> */}
                            <h6 className="headingspace1">
                              {this.state.pooldetails.status
                                ? this.state.pooldetails.status
                                : "-"}
                            </h6>
                          </div>
                          <div className="headingspaces1">
                            <p className="sizeofp">Set-up On</p>
                            <h6 className="headingspace1">
                              {this.state.pooldetails.setupdate
                                ? this.state.pooldetails.setupdate
                                : "-"}
                            </h6>
                          </div>
                          <div className="headingspaces1">
                            <p className="sizeofp">Original Balance</p>
                            <h6 className="headingspace1">
                              {this.state.pooldetails.originalbalance ? (
                                <NumberComp
                                  value={this.state.pooldetails.originalbalance}
                                />
                              ) : (
                                "-"
                              )}
                            </h6>
                          </div>
                          {(this.state.bdbtiles.wac !== "NA" && (
                            <div className="headingspaces1">
                              <p className="sizeofp">WAC</p>
                              <h6 className="headingspace1">
                                {this.state.bdbtiles.wac}
                              </h6>
                            </div>
                          )) ||
                            (this.state.bdbtiles.fico !== "NA" && (
                              <div className="headingspaces1">
                                <p className="sizeofp">FICO</p>
                                <h6 className="headingspace1">
                                  {this.state.bdbtiles.fico}
                                </h6>
                              </div>
                            )) ||
                            (this.state.bdbtiles.ltv !== "NA" && (
                              <div className="headingspaces1">
                                <p className="sizeofp">LTV</p>
                                <h6 className="headingspace1">
                                  {this.state.bdbtiles.ltv}
                                </h6>
                              </div>
                            ))}
                        </div>

                        <div className="col">
                          <div className="headingspaces1">
                            <p className="sizeofp">Verification Agent</p>
                            {/* <h6 className="headingspace1">Mariya Kapoor</h6> */}
                            <h6 className="headingspace1">
                              {this.state.pooldetails.VAUserName
                                ? this.state.pooldetails.VAUserName
                                : "-"}
                            </h6>
                          </div>
                          <div className="headingspaces1">
                            <p className="sizeofp">Servicer</p>
                            {/* <h6 className="headingspace1">-</h6> */}
                            <h6 className="headingspace1">
                              {this.state.pooldetails.ServicerUserName
                                ? this.state.pooldetails.ServicerUserName
                                : "-"}
                            </h6>
                          </div>
                          <div className="headingspaces1">
                            <p className="sizeofp">Underwriter</p>
                            {/* <h6 className="headingspace1">Priya Deshmukh</h6> */}
                            <h6 className="headingspace1">
                              {this.state.pooldetails.UnderWriterUserName
                                ? this.state.pooldetails.UnderWriterUserName
                                : "-"}
                            </h6>
                          </div>
                          <div style={{ display: "flex", gap: "200px" }}>
                            {this.state.bdbtiles.fico != "NA" && (
                              <div>
                                <p className="sizeofp">FICO</p>
                                <h6 className="headingspace1">
                                  {this.state.bdbtiles.fico}
                                </h6>
                              </div>
                            )}
                            {this.state.bdbtiles.ltv != "NA" &&
                              this.state.bdbtiles.wac != "NA" && (
                                <div>
                                  <p className="sizeofp">LTV</p>
                                  <h6 className="headingspace1">
                                    {this.state.bdbtiles.ltv}
                                  </h6>
                                </div>
                              )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-sm-6 col-md-4 hellocard">
                    <div className="buttonsverified1">
                      {this.state.userrole == "Underwriter" ? (
                        <React.Fragment>
                          <OverlayTrigger
                            rootClose={true}
                            trigger="click"
                            placement="bottom"
                            onClick={document.body.click()}
                            //overlay={this.popoverBottom()}
                            //onHide={!this.state.openLoanTape}
                          >
                            <Button
                              disabled
                              variant="outlined"
                              onClick={() =>
                                this.setState((prevState) => ({
                                  downArrow: !prevState.downArrow,
                                }))
                              }
                            >
                              Edit{" "}
                              {this.state.downArrow ? (
                                <ArrowDropUpIcon />
                              ) : (
                                <ArrowDropDownIcon />
                              )}
                            </Button>
                          </OverlayTrigger>
                          <OverlayTrigger
                            rootClose={true}
                            trigger="click"
                            placement="bottom"
                            overlay={this.submitPopover()}
                          >
                            <Button
                              variant="contained"
                              color="primary"
                              // type="submit"
                              className="submitbuttoncss"
                            >
                              Submit{" "}
                              {this.state.submitDownArrow ? (
                                <ArrowDropUpIcon />
                              ) : (
                                <ArrowDropDownIcon />
                              )}
                            </Button>
                          </OverlayTrigger>
                        </React.Fragment>
                      ) : (
                        <div className="shiftforverification"></div>
                      )}
                    </div>
                    <div className="page-content3 documents-section">
                      <div className="editcontainer">
                        <h5 className="headingspace">
                          Documents ({this.state.dealDocuments?.length})
                        </h5>
                        {this.state.userrole == "Issuer" ||
                        this.state.userrole == "Verification" ||
                        this.state.userrole == "Rating Agency" ? (
                          <button
                            type="button"
                            onClick={this.onOpenModal4.bind(this)}
                            className="login-sign_up-linksadd"
                          >
                            Add
                          </button>
                        ) : null}
                      </div>
                      <div>
                        {this.state.dealDocuments.map((e) => {
                          return (
                            <div>
                              <div className="pool-box">
                                <div className="pool-box-text-container">
                                  <div className="lockicondivcss">
                                    <h6 className="headingspace11">
                                      {e.documentname}
                                    </h6>
                                    {/* {e.privacymode == "public" ? (
                                      <PublicIcon className="lockicon"></PublicIcon>
                                    ) : (
                                      <LockIcon className="lockicon"></LockIcon>
                                    )} */}
                                  </div>

                                  <p className="text-secondary sizeofp1">
                                    {e.description}
                                  </p>
                                </div>
                                <div className="pool-box-icons-container">
                                  <DownloadIcon
                                    className="eye-btn1"
                                    type="button"
                                    onClick={() => this.DownloadIPFSFile(e)}
                                  ></DownloadIcon>
                                  {/* <button onClick={this.setdata}> */}
                                  {this.state.userrole == "Issuer" ||
                                  this.state.userrole == "Verification" ? (
                                    <OverlayTrigger
                                      rootClose
                                      trigger="click"
                                      placement="bottom"
                                      overlay={this.popoverBottom1(e)}
                                    >
                                      <MoreVertIcon className="eye-btn1" />
                                    </OverlayTrigger>
                                  ) : null}
                                  {/* </button> */}
                                </div>
                              </div>

                              <div className="horizontal-divider" />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row row3">
                  <div className="investor-heading-container">{/*      */}</div>

                  <div>
                    <div className="tablechangebutton1">
                      {/* <buton
                        type="button"
                        onClick={() => this.handleClickAccepted()}
                        className={
                          this.state.activeInsights1 == true
                            ? "issuerDashboard-table-top-button-insights-active"
                            : "issuerDashboard-table-top-button-insights"
                        }
                      >
                        Accepted
                      </buton> */}
                      {/* <buton
                        type="button"
                        onClick={() => this.handleClickPending()}
                        className={
                          this.state.activeInsights2 == true
                            ? "issuerDashboard-table-top-button-workbench-active"
                            : "issuerDashboard-table-top-button-workbench"
                        }
                      >
                        Pending
                      </buton> */}
                      {/* <buton
                        type="button"
                        onClick={() => this.handleClickRejected()}
                        className={
                          this.state.activeInsights3 == true
                            ? "issuerDashboard-table-top-button-rejected-active"
                            : "issuerDashboard-table-top-button-rejected"
                        }
                      >
                        Reconsider
                      </buton> */}
                      <buton
                        type="button"
                        onClick={() => this.handleClickLoanTape()}
                        className={
                          this.state.activeInsights4 == true
                            ? "issuerDashboard-table-top-button-rejected-active"
                            : "issuerDashboard-table-top-button-rejected"
                        }
                      >
                        Loan Tape
                      </buton>
                      <buton
                        type="button"
                        onClick={() => this.handleClickAccepted()}
                        className={
                          this.state.activeInsights1 == true
                            ? "issuerDashboard-table-top-button-insights-active"
                            : "issuerDashboard-table-top-button-insights"
                        }
                      >
                        Strat
                      </buton>
                      <buton
                        type="button"
                        onClick={() => this.handleClickSummary()}
                        className={
                          this.state.activeInsights5 == true
                            ? "issuerDashboard-table-top-button-insights-active"
                            : "issuerDashboard-table-top-button-insights"
                        }
                      >
                        Summary
                      </buton>
                      {/* <buton
                                                type="button"
                                                onClick={() => this.handleClickPending()}
                                                className={
                                                    this.state.activeInsights2 == true
                                                        ? "issuerDashboard-table-top-button-workbench-active"
                                                        : "issuerDashboard-table-top-button-workbench"
                                                }
                                            >
                                                Performance
                                            </buton> */}
                    </div>
                  </div>

                  <div className="dashboard-top-right-container2">
                    {this.state.showSearchBox === true ? (
                      this.searchBar()
                    ) : (
                      <button
                        className="search-mui-icons1"
                        type="button"
                        onClick={this.onClickSearchButton}
                        style={{ marginRight: "5px" }}
                      >
                        <SearchOutlinedIcon />
                      </button>
                    )}
                    {this.state.activeInsights4 && (
                      <div>
                        <OverlayTrigger
                          rootClose={true}
                          trigger="click"
                          placement="bottom"
                          onClick={document.body.click()}
                          overlay={this.popoverBottom()}
                        >
                          <Button
                            variant="outlined"
                            onClick={() =>
                              this.setState((prevState) => ({
                                downArrow: !prevState.downArrow,
                              }))
                            }
                          >
                            Download{" "}
                            {this.state.downArrow ? (
                              <ArrowDropUpIcon />
                            ) : (
                              <ArrowDropDownIcon />
                            )}
                          </Button>
                        </OverlayTrigger>
                        <Button
                          className="card__button2"
                          type="submit"
                          disabled
                        >
                          Filter
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                <React.Fragment>
                  {this.state.activeInsights1 && (
                    <div className="workbench-table-container">
                      <Iframe
                        url={`${this.state.UrlBdbNew}${this.state.bdbURL}&poolid=${this.state.pooldetails.poolID}`}
                        width="100%"
                        height="665px"
                        id="myId"
                        className="bdb-charts"
                        display="initial"
                        position="relative"
                      />
                    </div>
                  )}
                  {this.state.activeInsights2 && (
                    <div className="workbench-table-container">
                      <MuiThemeProvider theme={this.getMuiTheme()}>
                        <MUIDataTable
                          //data={this.state.tableData2}
                          data={[]}
                          columns={columns}
                          options={options}
                        />
                      </MuiThemeProvider>
                    </div>
                  )}
                  {this.state.activeInsights3 && (
                    <div className="workbench-table-container">
                      <MuiThemeProvider theme={this.getMuiTheme()}>
                        <MUIDataTable
                          //data={this.state.tableData1}
                          data={[]}
                          columns={columns}
                          options={options}
                        />
                      </MuiThemeProvider>
                    </div>
                  )}
                  {this.state.activeInsights4 && (
                    <React.Fragment>
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
                              : this.state.loandetails
                          }
                          columns={this.state.columns}
                          itemHeight={50}
                          components={TableComponents}
                          style={{
                            width: "100%",
                            height: this.state.searchText
                              ? this.state.filteredData?.length * 50 > 600
                                ? 600
                                : this.state.filteredData?.length * 50 + 90
                              : this.state.loandetails?.length * 50 > 600
                              ? 600
                              : this.state.loandetails?.length * 50 + 90,
                            overflow: "auto",
                            borderRadius: "1rem",
                            overflowAnchor: "none",
                          }}
                          fixedHeaderContent={() => (
                            <TableRow>
                              {this.state.columns?.map((column) => (
                                <TableCell
                                  key={column.key}
                                  style={{
                                    background: "white",
                                    cursor: "pointer",
                                    width: `${column.length * 10}px`,
                                    whiteSpace: "nowrap",
                                  }}
                                  onClick={() => this.handleSort(column.name)}
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
                                        sortAscending={this.state.sortAscending}
                                      />
                                    )}
                                  </div>
                                </TableCell>
                              ))}
                            </TableRow>
                          )}
                          itemContent={(index) => {
                            const { searchText, filteredData, loandetails } =
                              this.state;
                            const rowData = searchText
                              ? filteredData[index]
                              : loandetails[index];
                            const isOddRow = index % 2 !== 0;
                            console.log(
                              "tablevalue",
                              this.state.loandetails[index]
                            );
                            return (
                              <>
                                {this.state.columns?.map((column) => (
                                  <TableCell
                                    style={{
                                      width: `${column.length * 10}px`,
                                      background: "white",
                                      whiteSpace: "nowrap",
                                      backgroundColor: isOddRow
                                        ? "rgb(229,229,229,0.3)"
                                        : "",
                                    }}
                                  >
                                    {column.name ===
                                    "Original Principal Balance"
                                      ? formatNumberWithCommas(
                                          rowData[column.name]
                                        )
                                      : column.bodyRenderer
                                      ? column.bodyRenderer(rowData)
                                      : rowData[column.name]}
                                    {column.name === "Actions" && (
                                      <div
                                        style={{
                                          display: "flex",
                                          flexDirection: "row",
                                          marginTop: "-5px",
                                        }}
                                      >
                                        {this.state.notificationlist.some(
                                          (loanid) =>
                                            loanid === rowData["Loan ID"]
                                        ) ? (
                                          <button
                                            className="search-mui-icons-unread"
                                            style={{ color: "#CA2E55" }}
                                          >
                                            <MessageOutlinedIcon
                                              onClick={() =>
                                                this.onOpenFeedback(
                                                  rowData["Loan ID"]
                                                )
                                              }
                                            />
                                          </button>
                                        ) : (
                                          <button className="search-mui-icons">
                                            <MessageOutlinedIcon
                                              onClick={() =>
                                                this.onOpenFeedback(
                                                  rowData["Loan ID"]
                                                )
                                              }
                                            />
                                          </button>
                                        )}
                                      </div>
                                    )}
                                  </TableCell>
                                ))}
                              </>
                            );
                          }}
                        />
                      </div>
                    </React.Fragment>
                  )}
                  {this.state.activeInsights5 && (
                    <div className="workbench-table-container">
                      <Iframe
                        url={`${this.state.UrlBdbNew}${this.state.bdbURL}&poolid=${this.state.pooldetails.poolID}&customGlobalFilter=${this.state.poolidold}`}
                        width="100%"
                        height="665px"
                        id="myId"
                        className="bdb-charts"
                        display="initial"
                        position="relative"
                      />
                    </div>
                  )}
                </React.Fragment>
              </div>
            )}
          </div>

          {/* remove loan popup */}
          <div className="modal">
            <ReactModal
              isOpen={this.state.openStatusUpdate}
              onRequestClose={this.closeStatusUpdate}
              contentLabel="Minimal Modal Example"
              style={customStylesauto2}
            >
              <React.Fragment>
                <div className="modalpopup1">
                  <h2 style={{ fontWeight: "600" }}>Request to Remove Loan!</h2>
                  <p>
                    You are requesting the issuer to remove the loan from the
                    Pool.
                  </p>
                  <div>
                    <form className="form-cotainer" onSubmit={this.onSubmit4}>
                      <div className="input-container">
                        <label className="label">Comment</label>
                        <input
                          required
                          placeholder="Type here"
                          className="input"
                          type="text"
                          onChange={(e) => {
                            this.setState({
                              formData2: {
                                feedback: e.target.value,
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
                                className="popupbutton23"
                                onClick={this.closeStatusUpdate}
                              >
                                {" "}
                                Cancel{" "}
                              </button>
                              <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                              >
                                Send
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

          {/* send feedback popup */}
          <div className="modal">
            <ReactModal
              isOpen={this.state.openFeedback}
              onRequestClose={this.closeFeedback}
              contentLabel="Minimal Modal Example"
              style={customStylesauto2}
            >
              <React.Fragment>
                <div className="modalpopup1">
                  <h2 style={{ fontWeight: "600" }}>Comments</h2>
                  <button
                    type="button"
                    className="closePopup"
                    style={{ minWidth: "30px" }}
                    onClick={this.closeFeedback}
                  >
                    {" "}
                    <CloseIcon></CloseIcon>{" "}
                  </button>
                  <div
                    syle={{
                      display: "flex",
                      flexDirection: "column",
                      marginLeft: "10px",
                      marginRight: "10px",
                    }}
                  >
                    <div>
                      {this.state.retrieveFeedbackData.map((item) => {
                        var data = item.createddateandtime.split(" ");
                        return (
                          <div
                            key={item["_id"]}
                            style={{ marginBottom: "5px" }}
                          >
                            <div>{item.feedback}</div>
                            <span style={{ color: "#5e5c58" }}>
                              {item.username}{" "}
                              {sessionStorage.getItem("organizationname")}{" "}
                              {data[0]} - {data[1]}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    <div style={{ marginTop: "15px" }}>
                      <form
                        className="form-container"
                        onSubmit={this.onSubmit5}
                      >
                        <div className="input-container1">
                          <label className="label">New Comment</label>
                          <div className="relative-container">
                            <input
                              placeholder="Type here"
                              className="input2"
                              type="text"
                              onChange={(e) => {
                                this.setState({
                                  formData2: {
                                    feedback: e.target.value,
                                  },
                                });
                              }}
                            />
                            <button
                              className="submit-btn"
                              type="submit"
                              style={{ color: "#018e82", width: "50px" }}
                            >
                              Send
                            </button>
                          </div>
                        </div>
                        <div className="modalsubmit">
                          <div className="submitbuttonbg">
                            <div className="row justify-content-end1">
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={this.closeFeedback}
                              >
                                Close
                              </Button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            </ReactModal>
          </div>

          <div id="modal1">
            <ReactModal
              isOpen={this.state.open2}
              onRequestClose={this.onCloseModal1}
              contentLabel="Minimal Modal Example"
              style={customStylesautosmallmodal}
            >
              <div className="new-modal-popup">
                {/* <div className="shiftingpopup"> */}
                {/* <div className="card__container2"> */}
                <div>
                  <h4 className="popupheading">
                    Request submitted for Verification!
                  </h4>
                </div>
                <h6 className="card1__title">
                  The assigned verification agent will review your pool and it
                  will be offered to investors once it’s approved.
                </h6>
                <div className="popupbutton">
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={this.handleClick}
                  >
                    {" "}
                    Go to Dashboard
                  </Button>
                </div>
              </div>
            </ReactModal>
          </div>

          {/* Edit Loan Tape Popup */}
          <div id="modal1">
            <ReactModal
              isOpen={this.state.openLoanTape}
              onRequestClose={this.closeEditLoanTape}
              contentLabel="Minimal Modal Example"
              style={customStylesautosmallmodal}
            >
              <React.Fragment>
                <div className="modalPopup2">
                  <div className="popupTitle">
                    <h2>Edit Loan Tape</h2>
                    <button
                      type="button"
                      className="closePopup"
                      style={{ minWidth: "30px" }}
                      onClick={this.closeEditLoanTape}
                    >
                      {" "}
                      <CloseIcon></CloseIcon>{" "}
                    </button>
                  </div>
                  <div className="modalshiftcontent">
                    <form className="form-container" onSubmit={this.onSubmit}>
                      <div className="">
                        <h6 className="e1">Upload Loan Tape*</h6>
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
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="">
                        <h6 className="e1">Upload Loan Contracts</h6>
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
                                id="icon-button-file-id2"
                                type="file"
                                accept=".csv,.xlsm, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
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
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="input-container">
                        <label className="label">Verification Template*</label>
                        <select
                          required
                          className="input-select"
                          onChange={(e) => {
                            this.setState({
                              loanTapeFormData: {
                                ...this.state.loanTapeFormData,
                                verification_template: e.target.value,
                              },
                            });
                            sessionStorage.setItem(
                              "verificationtemplate",
                              JSON.stringify(e.target.value)
                            );
                          }}
                          value={
                            this.state.loanTapeFormData.verification_template
                          }
                        >
                          <option value="" disabled className="selectclass">
                            Select any one
                          </option>
                          <option value="New">New</option>
                          {/* {this.state.verificationTemplate.map((item) => {
                            return (
                              <option value={item.value}>
                                {item.label}
                              </option>
                            );
                          })} */}
                        </select>
                      </div>

                      <div className="modalsubmit">
                        <div className="submitbuttonbg">
                          <div className="row">
                            <div className="row justify-content-end2">
                              <button
                                type="button"
                                className="popupbutton22"
                                onClick={this.closeEditLoanTape}
                              >
                                {" "}
                                Cancel{" "}
                              </button>
                              <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                //onClick={()=>console.log(this.state.formData)}
                              >
                                Next
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

          {/* Map Loan Field Popup */}
          {/* <div id="modal">
            <ReactModal
              isOpen={this.state.openMapLoanField}
              onRequestClose={this.closeMapLoanField}
              contentLabel="Minimal Modal Example"
            //style={customStylesauto}
            >
              <React.Fragment>
                <div>
                  <h2>Map Loan Fields</h2>
                  <button
                    type="button"
                    className="closePopup"
                    style={{ minWidth: "30px" }}
                    onClick={this.closeMapLoanField}
                  >
                    {" "}
                    <CloseIcon></CloseIcon>{" "}
                  </button>
                </div>
                <div>
                  <MapFields 
                    poolid={this.state.pooldetails.poolID} 
                    reupload={true} 
                    filename={this.state.filename1} 
                    assetclass={this.state.pooldetails.assetclass} 
                    verificationtemplate={this.state.loanTapeFormData.verification_template} 
                    mappingDataKey={this.state.mappingDataKey} 
                    mapData={this.state.previewMappingData} 
                    dataFromMappingField={this.handleChildData}  //data from parent to child
                  />
                </div>
              </React.Fragment>
            </ReactModal>
          </div> */}

          {/* Submit for preview */}
          <div id="modal">
            <ReactModal
              isOpen={this.state.openPreview}
              onRequestClose={this.closePreviewForm}
              contentLabel="Minimal Modal Example"
              style={customStylesauto}
            >
              <React.Fragment>
                <div className="modalPopup2">
                  <div className="popupTitle">
                    <h2>Submit for Preview</h2>
                    <button
                      type="button"
                      className="closePopup"
                      style={{ minWidth: "30px" }}
                      onClick={this.closePreviewForm}
                    >
                      {" "}
                      <CloseIcon></CloseIcon>{" "}
                    </button>
                  </div>

                  <div className="modalshiftcontent">
                    <form
                      className="form-container"
                      onSubmit={this.onPreviewSubmit}
                      //onSubmit={()=>console.log(this.state.setupPoolFormData)}
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
                              setupPoolFormData: {
                                ...this.state.setupPoolFormData,
                                poolname: e.target.value,
                              },
                            });
                          }}
                          value={this.state.setupPoolFormData.poolname}
                        />
                      </div>

                      <div className="input-container">
                        <label className="label">Asset Class</label>
                        <select
                          required
                          className="input-select"
                          onChange={(e) => {
                            this.setState({
                              setupPoolFormData: {
                                ...this.state.setupPoolFormData,
                                assetclass: e.target.value,
                              },
                            });
                          }}
                          value={this.state.setupPoolFormData.assetclass}
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
                          <option value="Consumer Loans">Consumer Loans</option>
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
                          rows="3"
                          cols="40"
                          placeholder="Type here"
                          className="description-box"
                          onChange={(e) => {
                            this.setState({
                              setupPoolFormData: {
                                ...this.state.setupPoolFormData,
                                description: e.target.value,
                              },
                            });
                          }}
                          value={this.state.setupPoolFormData.description}
                        />
                      </div>

                      <div className="input-container">
                        <label className="label">Underwriter Access</label>
                        {this.state.getLoansLoader === false ? (
                          <Select
                            isMulti
                            className="basic-multi-select"
                            classNamePrefix="select"
                            components={{
                              Option,
                            }}
                            placeholder="Select one or more"
                            value={
                              this.state.setupPoolFormData.assignunderwriter
                            }
                            options={this.state.UnderwriterDropdown}
                            onChange={(selected) => {
                              this.setState({
                                setupPoolFormData: {
                                  ...this.state.setupPoolFormData,
                                  assignunderwriter: selected,
                                },
                              });
                            }}
                          />
                        ) : (
                          <FormLoader></FormLoader>
                        )}
                      </div>

                      <div classNamePrefix="input-container">
                        <label className="label">Investor Access</label>
                        {this.state.getLoansLoader == false ? (
                          <Select
                            isMulti
                            className="basic-multi-select"
                            classNamePrefix="select"
                            components={{
                              Option,
                            }}
                            value={this.state.setupPoolFormData.assigninvestor}
                            options={this.state.InvestorDropdown}
                            placeholder="Select one or more"
                            onChange={(selected) => {
                              this.setState({
                                setupPoolFormData: {
                                  ...this.state.setupPoolFormData,
                                  assigninvestor: selected,
                                },
                              });
                            }}
                          />
                        ) : (
                          <FormLoader></FormLoader>
                        )}
                      </div>
                      <br></br>

                      <div className="input-container">
                        <label className="label">
                          Assign Verification Agent
                        </label>
                        {this.state.getLoansLoader == false ? (
                          <select
                            placeholder="Select any one"
                            className="input-select"
                            onChange={(e) => {
                              this.setState({
                                setupPoolFormData: {
                                  ...this.state.setupPoolFormData,
                                  assignverification: e.target.value,
                                },
                              });
                            }}
                            value={
                              this.state.setupPoolFormData.assignverification
                            }
                          >
                            <option value="" disabled className="selectclass">
                              Select any one
                            </option>
                          </select>
                        ) : (
                          <FormLoader></FormLoader>
                        )}
                      </div>

                      <div className="modalsubmit">
                        <div className="submitbuttonbg">
                          <div className="row">
                            <div className="row justify-content-end1">
                              <button
                                type="button"
                                className="popupbutton22"
                                onClick={this.closePreviewForm}
                              >
                                {" "}
                                Cancel{" "}
                              </button>
                              <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                              >
                                Submit
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

          {/* Investor Form */}
          <div id="modal">
            <ReactModal
              isOpen={this.state.openInvestor}
              onRequestClose={this.closeInvestorForm}
              contentLabel="Minimal Modal Example"
              style={customStylesauto}
            >
              <React.Fragment>
                <div className="modalPopup2">
                  <div className="popupTitle">
                    <h2>Select one or more Investors</h2>
                    <button
                      type="button"
                      className="closePopup"
                      style={{ minWidth: "30px" }}
                      onClick={this.closeInvestorForm}
                    >
                      {" "}
                      <CloseIcon></CloseIcon>{" "}
                    </button>
                  </div>

                  <div className="modalshiftcontent">
                    <form
                      className="form-container"
                      onSubmit={this.onVerficationSubmit}
                    >
                      <div classNamePrefix="input-container">
                        <input
                          type="text"
                          placeholder="Search Investor Name"
                          className="input-select1"
                          value={this.state.searchQuery}
                          onChange={(e) =>
                            this.setState({ searchQuery: e.target.value })
                          }
                        />
                        {this.state.getLoansLoader == false ? (
                          <div
                            style={{
                              height: "280px",
                              border: "1px solid #212121",
                              overflowY: "auto",
                            }}
                          >
                            {this.state.investorDropdown
                              .filter((item) =>
                                item.label
                                  .toLowerCase()
                                  .includes(
                                    this.state.searchQuery.toLowerCase()
                                  )
                              )
                              .map((item) => {
                                return (
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: "10px",
                                      marginLeft: "15px",
                                    }}
                                  >
                                    <input
                                      key={item.value}
                                      type="checkbox"
                                      style={{ cursor: "pointer" }}
                                      onChange={() =>
                                        this.handleCheckboxChange(item.value)
                                      }
                                      checked={this.state.selectedLabels.includes(
                                        item.value
                                      )}
                                    />
                                    <label>{item.label}</label>
                                  </div>
                                );
                              })}
                          </div>
                        ) : (
                          <FormLoader></FormLoader>
                        )}
                      </div>
                      <br></br>

                      <div className="modalsubmit">
                        <div className="submitbuttonbg">
                          <div className="row">
                            <div className="row justify-content-end1">
                              <button
                                type="button"
                                className="popupbutton22"
                                onClick={this.closeInvestorForm}
                              >
                                {" "}
                                Cancel{" "}
                              </button>
                              <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                              >
                                Submit
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

          {/* new modal */}
          <div id="modal1">
            <ReactModal
              isOpen={
                this.state.noAlertStatus != "No" ? this.state.open8 : null
              }
              onRequestClose={this.onCloseModal}
              contentLabel="Minimal Modal Example"
              style={customStylesautosmallmodal}
            >
              <div className="modalPopup2">
                <div className="popupTitle">
                  <h4 className="popupheading">Alert</h4>
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

                <div className="modalshiftcontent">
                  <h6 className="alertpopup">
                    Please wait 24 hours for the contract data to get digitized
                    before submitting to the Verification Agent.
                  </h6>
                </div>
              </div>
            </ReactModal>
          </div>

          <div id="modal1">
            <ReactModal
              isOpen={this.state.open1}
              onRequestClose={this.onCloseModal}
              contentLabel="Minimal Modal Example"
              style={customStylesautosmallmodal}
            >
              <div className="modalPopup2">
                <div className="popupTitle">
                  <h4 className="popupheading">Alert</h4>
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

                <div className="modalshiftcontent">
                  <h6 className="alertpopup">
                    Please submit for verification once all the loan contracts
                    has been digitized
                  </h6>
                </div>
              </div>
            </ReactModal>
          </div>

          <div id="modal">
            <ReactModal
              isOpen={this.state.open3}
              onRequestClose={this.onCloseModal2}
              contentLabel="Minimal Modal Example"
              style={customStylesAcceptPopup}
            >
              <React.Fragment>
                <div className="modalPopup2">
                  <h4>Select the Properties</h4>
                  <div className="modalshiftcontent">
                    <p>
                      Please select the properties you would like the
                      Verification Agent to verify
                    </p>
                  </div>
                  <div className="modalshiftcontent">
                    <ul>
                      {this.state.demoData.map((element) => (
                        <li
                          className="t-flex-container"
                          key={element.attributeName}
                        >
                          <div className="td-first">
                            <input
                              type="checkbox"
                              className="t-select"
                              onChange={(e) => {
                                if (e.target.checked === true) {
                                  this.handleOnChangeAdd(element);
                                } else {
                                  this.handleOnChnageRemove(element);
                                }
                              }}
                            />
                            <p className="t-name">{element.attributeName}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="modalshiftcontent">
                    <div className="accept_pop-button-container">
                      <button
                        className="pa_popup-reject-btn"
                        onClick={this.onCloseModal2}
                      >
                        Cancel
                      </button>
                      <Button
                        variant="contained"
                        color="primary"
                        type="button"
                        onClick={this.Submitforverification}
                      >
                        {" "}
                        Submit
                        {this.state.formLoader === true ? (
                          <CircularProgress size="22px" color="primary" />
                        ) : (
                          ""
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            </ReactModal>
          </div>

          <div id="modal1">
            <ReactModal
              isOpen={this.state.open4}
              onRequestClose={this.onCloseModal3}
              contentLabel="Minimal Modal Example"
              style={customStylesPAPopup}
            >
              <React.Fragment>
                <div className="shifting">
                  <h5 className="text-secondary"> Upload Contract </h5>

                  <div className="row">
                    <div className="col">
                      <ReactSelect
                        className="as-shifted"
                        options={this.state.processoroption}
                        placeholder="Select File"
                        closeMenuOnSelect={false}
                        maxMenuHeight={150}
                        hideSelectedOptions={false}
                        components={{
                          Option,
                        }}
                        onChange={this.handleChange}
                        allowSelectAll={true}
                        value={this.state.processorarrray}
                        styles={customStyle}
                      />
                    </div>
                  </div>
                </div>

                <div className="modalsubmit">
                  <div className="submitbuttonbg">
                    <div className="row">
                      <div className="row justify-content-addedit1">
                        <button
                          type="button"
                          className="popupbutton22"
                          onClick={this.onCloseModal3}
                        >
                          {" "}
                          Cancel{" "}
                        </button>
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          onClick={this.UploadContract}
                        >
                          Upload
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
              </React.Fragment>
            </ReactModal>
          </div>

          <div id="modal">
            <ReactModal
              isOpen={this.state.open5}
              onRequestClose={this.onCloseModal4}
              contentLabel="Minimal Modal Example"
              style={customStylesauto}
            >
              <React.Fragment>
                <div className="modalPopup2">
                  <div className="popupTitle">
                    <h2>Add the Document</h2>
                    <button
                      type="button"
                      className="closePopup"
                      style={{ minWidth: "30px" }}
                      onClick={this.onCloseModal4}
                    >
                      {" "}
                      <CloseIcon></CloseIcon>{" "}
                    </button>
                  </div>

                  {/* {this.state.popupLoader === true ? <CircularProgress size="30px" color="secondary" /> : ' '} */}

                  <div className="modalshiftcontent">
                    <form className="form-container" onSubmit={this.onSubmit1}>
                      <div className="">
                        <h6 className="e1">Document File</h6>
                        <div className="kyc-card__button-container1">
                          <div>
                            <button
                              className="card__button"
                              style={{
                                position: "relative",
                              }}
                            >
                              <label
                                htmlFor="icon-button-file-id1"
                                className="upload-button-label"
                              >
                                Upload
                              </label>
                              <input
                                required
                                id="icon-button-file-id1"
                                type="file"
                                accept=".csv,.xlsm,application/pdf, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
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
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="input-container">
                        <label className="label">Document Name</label>
                        <input
                          required
                          placeholder="Type here"
                          className="input"
                          type="text"
                          onChange={(e) => {
                            this.setState({
                              formData: {
                                ...this.state.formData,
                                documentname: e.target.value,
                              },
                            });
                          }}
                          value={this.state.formData.documentname}
                        />
                      </div>

                      <div className="input-container">
                        <label className="label">Description</label>
                        <input
                          required
                          placeholder="Type here"
                          className="input"
                          type="text"
                          onChange={(e) => {
                            this.setState({
                              formData: {
                                ...this.state.formData,
                                description: e.target.value,
                              },
                            });
                          }}
                          value={this.state.formData.description}
                        />
                      </div>

                      <div className="modalsubmit">
                        <div className="submitbuttonbg">
                          <div className="row">
                            <div className="row justify-content-addedit">
                              <button
                                type="button"
                                className="popupbutton22"
                                onClick={this.onCloseModal4}
                              >
                                {" "}
                                Cancel{" "}
                              </button>
                              <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                // onClick={this.addDealDocument}
                              >
                                Add
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

          <div id="modal">
            <ReactModal
              isOpen={this.state.open6}
              onRequestClose={this.onCloseModal5}
              contentLabel="Minimal Modal Example"
              style={customStylesauto}
            >
              <React.Fragment>
                <div className="modalPopup2">
                  <div className="popupTitle">
                    <h2>Edit the Document Details</h2>
                    <button
                      type="button"
                      className="closePopup"
                      style={{ minWidth: "30px" }}
                      onClick={this.onCloseModal5}
                    >
                      {" "}
                      <CloseIcon></CloseIcon>{" "}
                    </button>
                  </div>

                  {/* {this.state.popupLoader === true ? <CircularProgress size="30px" color="secondary" /> : ' '} */}

                  <div className="modalshiftcontent">
                    <form className="form-container" onSubmit={this.onSubmit3}>
                      <div className="input-container">
                        <label className="label">Document Name</label>
                        <input
                          required
                          placeholder="Type here"
                          className="input"
                          type="text"
                          onChange={(e) => {
                            this.setState({
                              formData1: {
                                ...this.state.formData1,
                                documentname: e.target.value,
                              },
                            });
                          }}
                          value={this.state.formData1.documentname}
                        />
                      </div>

                      <div className="input-container">
                        <label className="label">Description</label>
                        <input
                          required
                          placeholder="Type here"
                          className="input"
                          type="text"
                          onChange={(e) => {
                            this.setState({
                              formData1: {
                                ...this.state.formData1,
                                description: e.target.value,
                              },
                            });
                          }}
                          value={this.state.formData1.description}
                        />
                      </div>

                      <div className="modalsubmit">
                        <div className="submitbuttonbg">
                          <div className="row">
                            <div className="row justify-content-addedit">
                              <button
                                type="button"
                                className="popupbutton22"
                                onClick={this.onCloseModal5}
                              >
                                {" "}
                                Cancel{" "}
                              </button>
                              <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                              >
                                Save
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

          <div id="modal">
            <ReactModal
              isOpen={this.state.open7}
              onRequestClose={this.onCloseModal6}
              contentLabel="Minimal Modal Example"
              style={customStylesautosmallmodal}
            >
              <React.Fragment>
                <div className="modalPopup2">
                  <div className="popupTitle">
                    <h2>View the Document Details</h2>
                    <button
                      type="button"
                      className="closePopup"
                      style={{ minWidth: "30px" }}
                      onClick={this.onCloseModal6}
                    >
                      {" "}
                      <CloseIcon></CloseIcon>{" "}
                    </button>
                  </div>

                  {/* {this.state.popupLoader === true ? <CircularProgress size="30px" color="secondary" /> : ' '} */}

                  <div className="modalshiftcontent">
                    <form className="form-container">
                      <div className="Modal-Data">
                        <div className="headingspaces1">
                          <p className="sizeofp">Document Name</p>
                          <h6 className="headingspace1">
                            {this.state.formData1.documentname}
                          </h6>
                        </div>
                        <div className="headingspaces1">
                          <p className="sizeofp">Description</p>
                          <h6 className="headingspace1">
                            {this.state.formData1.description}
                          </h6>
                        </div>

                        <div className="modalsubmit">
                          <div className="submitbuttonbg">
                            <div className="row">
                              <div className="row justify-content-addedit1">
                                <button
                                  type="button"
                                  className="popupbutton22"
                                  onClick={this.onCloseModal6}
                                >
                                  {" "}
                                  Cancel{" "}
                                </button>
                              </div>
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
      </React.Fragment>
    );
  }
}

export default withSnackbar(RA_PreviewPoolDetails);
