/* eslint-disable require-jsdoc */
import React, { Component } from "react";
// import { connect } from 'react-redux';
import Sidebar from "../../../components/sidebar";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Loader from "../../../components/loader";
import LinearLoader from "../../../components/loader/LinearLoader";
import axios from "axios";
import CloseIcon from "@material-ui/icons/Close";
import moment from "moment";
import { withSnackbar } from "notistack";
import CircularProgress from "@material-ui/core/CircularProgress";
import ReactModal from "react-modal";
import Select from "react-select";
import DatePicker from "react-datepicker";
import Arrow from "../../../images/Arrow.png";
import "react-datepicker/dist/react-datepicker.css";
import Iframe from "react-iframe";
import {
  customStylesauto,
  customStylesautosmallmodal,
  customStylesAcceptPopup,
  customStylesPAPopup,
  customStylesauto2,
  customStylesPopupInveststep,
} from "../../../components/customscripts/customscript";
import FormLoader from "../../../components/loader/formLoader";
import {
  viewLoans,
  uploadlms,
  savelms,
  updateVerificationTemplate,
  getOriginatorlist,
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
  getverficationtemplatedetails,
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
} from "@material-ui/core";
import "react-input-range/lib/css/index.css";
import DownloadIcon from "@mui/icons-material/Download";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import NumberComp from "../../../components/NumberComp";
import NumberComp2 from "../../../components/NumberComp2";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { default as ReactSelect } from "react-select";
import { components } from "react-select";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import $ from "jquery";
import MapFields from "../IssuerMapFields/MapFields";
import { TableVirtuoso } from "react-virtuoso";
import TableContainer from "@mui/material/TableContainer";

const token = sessionStorage.getItem("token");

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
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
    height: 55,
    minHeight: 55,
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
        {/* {
          props.data.Email === sessionStorage.getItem("EmailAddress") ? (
            <label className="setup">Self</label>
          ) : (
            <label className="setup">{props.label}</label>
          )
        } */}
      </components.Option>
    </div>
  );
};

const SortIcon = ({ sortAscending }) => (
  <img
    src={Arrow}
    style={{
      transform: sortAscending ? "rotate(0deg)" : "rotate(180deg)",
      height: "12px",
    }}
  />
);

class PoolDetailsIssuer extends Component {
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
      openMapLoanField: false,
      openPreview: false,
      openVerification: false,
      openLoanTape: false,
      setupPoolFormData: {
        poolname: "",
        assetclass: "",
        description: "",
        assignunderwriter: "",
        assigninvestor: "",
        assignverification: "",
        assignservicer: "",
        assignpayingagent: "",
        ratingagency: "",
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
      loanTapeFormData: {
        verification_template: "",
        AsOfDate: "",
      },
      poolName: sessionStorage.getItem("poolname"),
      token: sessionStorage.getItem("token"),
      activeInsights1: true,
      activeInsights2: false,
      activeInsights3: false,
      activeInsights4: false,
      activeInsights5: false,
      activeInsights6: false,
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
      isSubmitVerifiedBtn: false,
      noAlertStatus: "",
      UserId: sessionStorage.getItem("userid"),
      EmailAddress: sessionStorage.getItem("EmailAddress"),
      submitDownArrow: false,
      UnderwriterDropdown: JSON.parse(
        sessionStorage.getItem("underwriterDropdown")
      ),
      InvestorDropdown: JSON.parse(sessionStorage.getItem("investorDropdown")),
      VerificationDropdown: JSON.parse(
        sessionStorage.getItem("verificationDropdown")
      ),
      ratingAgencyDropdown: JSON.parse(
        sessionStorage.getItem("ratingAgencyDropdown")
      ),
      ServicerDropdown: JSON.parse(sessionStorage.getItem("servicerDropdown")),
      PayingAgentDropdown: JSON.parse(
        sessionStorage.getItem("payingAgentDropdown")
      ),
      verificationTemplate: JSON.parse(
        sessionStorage.getItem("verification_template")
      ),
      openStatusUpdate: false,
      firstname: sessionStorage.getItem("firstname"),
      lastname: sessionStorage.getItem("lastname"),
      updateStatus: "",
      loanid: "",
      formLoader: false,
      retrieveFeedbackData: [],
      openFeedback: false,
      UserRole: sessionStorage.getItem("userrole"),
      formData2: {
        feedback: "",
      },
      previewOrVerify: "",
      loandate: "",
      openDelete: false,
      sortColumn: "",
      sortAscending: true,
      openFilter: false,
      openVerificationTemp: false,
      validationError: false,
      originatorList: [],
      selectedOriginatorName: "",
      disableAsofDate: false,
      selectedContract: "",
      searchTerm: "",
      filteredData: [],
      verificationTempRes: "",
      verificationTemplate: [],
      selectedLabels: [],
      contractUploadDropdown: ["test1", "test2", "test3", "test4", "test5"],
      verificationFieldsDropdown: [],
      verificationTemplateKeys: [],
      selectedVerificationTemp: "",
      bdbURL: "",
      poolidold: {
        poolid: {
          type: "in",
          value: "",
        },
      },
      UrlBdbNew:
        "https://analytics.demo-iaedge.intainabs.com/home/#/opendocument?data=",
    };
    this.onCloseFilter = this.onCloseFilter.bind(this);
    this.submitFilterLoan = this.submitFilterLoan.bind(this);
    this.onCloseVerificationForm = this.onCloseVerificationForm.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.PoolDetails1 = this.PoolDetails1.bind(this);
    console.log("props", this.props);
  }

  handleSort = (column, dataKey) => {
    console.log("datakey");
    const { sortColumn, sortAscending, filteredData, searchTerm } = this.state;

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
      const valueA = a[column] ? a[column].toLowerCase() : "";
      const valueB = b[column] ? b[column].toLowerCase() : "";
      if (valueA < valueB) return newSortAscending ? -1 : 1;
      if (valueA > valueB) return newSortAscending ? 1 : -1;
      return 0;
    };

    let sortedData;
    if (searchTerm) {
      // If there's a search term, sort the filtered data
      sortedData = [...filteredData].sort(compareFunc);
    } else {
      // If no search term, sort the full data
      sortedData = [...dataKey].sort(compareFunc);
    }
    console.log("sortedData", sortedData);
    if (dataKey === this.state.tableData2) {
      this.setState({
        tableData2: searchTerm ? this.state.tableData2 : sortedData,
      });
    }
    if (dataKey === this.state.loandetails) {
      this.setState({
        loandetails: searchTerm ? this.state.loandetails : sortedData,
      });
    }

    this.setState({
      // Update the appropriate data array based on the scenario
      // [dataKey] : searchTerm ? this.state[dataKey] : sortedData,
      filteredData: searchTerm ? sortedData : filteredData,
      sortColumn: column,
      sortAscending: newSortAscending,
    });
  };
  // handleSort2 = (column) => {
  //   const { sortColumn, sortAscending, tableData2, filteredData, searchTerm } = this.state;

  //   // Determine the new sort order
  //   let newSortAscending;
  //   if (sortColumn === column) {
  //     newSortAscending = !sortAscending;
  //   } else {
  //     // Default to ascending order when sorting a new column
  //     newSortAscending = true;
  //   }

  //   // Custom compare function for sorting
  //   const compareFunc = (a, b) => {
  //     const valueA = a[column] ? a[column].toLowerCase() : "";
  //     const valueB = b[column] ? b[column].toLowerCase() : "";
  //     if (valueA < valueB) return newSortAscending ? -1 : 1;
  //     if (valueA > valueB) return newSortAscending ? 1 : -1;
  //     return 0;
  //   };

  //   let sortedData;
  //   if (searchTerm) {
  //     // If there's a search term, sort the filtered data
  //     sortedData = [...filteredData].sort(compareFunc);
  //   } else {
  //     // If no search term, sort the full data
  //     sortedData = [...tableData2].sort(compareFunc);
  //   }

  //   this.setState({
  //     // Update the appropriate data array based on the scenario
  //     tableData2: searchTerm ? tableData2 : sortedData,
  //     filteredData: searchTerm ? sortedData : filteredData,
  //     sortColumn: column,
  //     sortAscending: newSortAscending,
  //   });
  // };
  handleCheckboxChange = (value) => {
    // Check if the value is already in the selectedValues array
    if (this.state.selectedLabels.includes(value)) {
      // If it is, remove it
      this.setState((prevState) => ({
        selectedLabels: prevState.selectedLabels.filter(
          (item) => item !== value
        ),
        validationError: false,
      }));
    } else {
      // If it isn't, add it
      this.setState((prevState) => ({
        selectedLabels: [...prevState.selectedLabels, value],
        validationError: false,
      }));
    }
    console.log("selectedValues", this.state.selectedLabels);
  };
  handleToggleSearchField = () => {
    this.setState((prevState) => ({
      searchTerm: "",
    }));
  };
  handleClearSearch = () => {
    const { loandetails } = this.state;
    this.setState({
      showSearchBox: false,
      searchTerm: "",
      loandetails: loandetails,
    });
  };
  handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const { loandetails } = this.state;

    const filteredData = loandetails.filter((row) => {
      for (let key in row) {
        if (
          row[key] &&
          row[key].toString().toLowerCase().includes(searchTerm)
        ) {
          return true;
        }
      }
      return false;
    });

    this.setState({
      searchTerm: event.target.value,
      filteredData: filteredData,
      isDataFound: filteredData.length > 0,
    });
    console.log("filterdata", this.state.filteredData);
  };
  filterData = (searchTerm) => {
    const { loandetails } = this.state;

    const filteredData = loandetails.filter((row) =>
      Object.values(row).some((value) => {
        const isMatch =
          typeof value === "string" &&
          value.toLowerCase().includes(searchTerm.toLowerCase());
        console.log(`Checking "${value}" - Is Match? ${isMatch}`);
        return isMatch;
      })
    );

    return filteredData;
  };

  openPreviewOrVerify = () => {
    if (this.state.previewOrVerify === "Preview") {
      this.setState({
        openPreview: true,
      });
    } else if (this.state.previewOrVerify === "Verify") {
      this.setState({
        openVerification: true,
      });
    } else {
      this.setState({
        openPreview: true,
      });
    }
  };

  openDeletePopup = (val) => {
    this.setState({
      openDelete: true,
      loanid: val,
    });
    // this.UpdateReadlist()
  };
  onCloseDelete = () => {
    this.setState({
      openDelete: false,
    });
  };
  onOpenFilter() {
    this.setState({
      openFilter: true,
    });
  }
  onCloseFilter() {
    this.setState({
      openFilter: false,
      selectedOriginatorName: "",
    });
  }
  onOpenVerificationForm() {
    this.setState({
      openVerificationTemp: true,
    });
  }
  onCloseVerificationForm() {
    this.setState({
      openVerificationTemp: false,
      selectedOriginatorName: "",
      selectedVerificationTemp: "",
    });
  }
  submitFilterLoan() {
    this.setState({
      openFilter: false,
    });
    this.onOpenVerificationForm();
  }

  onOpenStatusUpdate = (val, loanid) => {
    console.log("lllll", loanid);
    this.setState({
      openStatusUpdate: true,
      updateStatus: val,
      loanid: loanid,
    });
    // this.UpdateReadlist()
  };
  updateloanstatus = (val, loanid) => {
    this.setState({
      updateStatus: val,
      loanid: loanid,
    });
    console.log(this.state.updateStatus, this.state.loanid);
    this.UpdateLoanStatus();
  };
  closeStatusUpdate = () => {
    this.setState({
      openStatusUpdate: false,
      updateStatus: "",
      loanid: "",
      formData2: {
        feedback: "",
      },
    });
  };
  onOpenFeedback = (val) => {
    console.log("hi");
    this.setState({
      openFeedback: true,
      loanid: val,
    });
    this.retrieveFeedback(val);
  };
  closeFeedback = () => {
    this.setState({
      openFeedback: false,
      formData2: {
        feedback: "",
      },
    });
  };

  handleChildData = (a, b) => {
    this.closeMapLoanField();
    this.setState({
      openLoanTape: true,
    });
  };

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
        ...this.state.loanTapeFormData,
        verification_template: "",
      },
    });
  };
  onSubmit = (e) => {
    e.preventDefault();
    sessionStorage.setItem("functiontodo", "reupload");
    this.Uploadloanlms();
  };
  onSubmit4 = (e) => {
    e.preventDefault();
    this.UpdateLoanStatus();
  };
  onSubmit5 = (e) => {
    e.preventDefault();
    this.saveFeedback();
  };
  popoverBottom = () => {
    return (
      <Popover className="popover-container">
        {/* <button>Edit Details</button>
        <hr className="servicer-popover-hr" />  */}
        {/* <button onClick={() => this.onOpenModal3()}>Pool Details</button> */}
        <button onClick={this.openPreviewOrVerify}>Pool Details</button>
        <hr className="popover-hr" />
        <button onClick={this.openEditLoanTape}>Loan Tape</button>
      </Popover>
    );
  };
  popoverBottom2 = () => {
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
        <button onClick={this.openPreviewForm.bind(this)}>Preview</button>
        <hr className="popover-hr" />
        <button onClick={this.openVerificationForm.bind(this)}>
          Verification
        </button>
      </Popover>
    );
  };
  popoverBottom1 = (e) => {
    return (
      <Popover id="popover-positioned-bottom" className="popover-container1">
        <button
          style={{ paddingTop: "15px" }}
          onClick={() => this.onOpenModal6(e)}
        >
          View
        </button>
        <hr className="popover-hr" />
        <button onClick={() => this.onOpenModal5(e)}>Edit</button>
        <hr className="popover-hr" />
        <button
          style={{ paddingBottom: "15px" }}
          onClick={() => this.DeletePoolDocument(e)}
        >
          Delete
        </button>
      </Popover>
    );
  };
  openPreviewForm = () => {
    this.setState({ openPreview: true });
  };
  closePreviewForm = () => {
    this.setState({
      openPreview: false,
      // setupPoolFormData: {
      //   // ...this.state.setupPoolFormData,
      //   poolname: this.state.pooldetails.poolname,
      //   assetclass: this.state.pooldetails.assetclass,
      //   description: this.state.pooldetails.description,
      //   assignunderwriter: this.state.pooldetails.assignunderwriter,
      //   assigninvestor: this.state.pooldetails.assigninvestor,
      //   assignverification: this.state.pooldetails.assignverification
      // }
    });
  };
  openVerificationForm = () => {
    this.setState({ openVerification: true });
  };
  closeVerificationForm = () => {
    this.setState({
      openVerification: false,
      // setupPoolFormData: {
      //   ...this.state.setupPoolFormData,
      //   // poolname: this.state.pooldetails.poolname,
      //   // assetclass: this.state.pooldetails.assetclass,
      //   // description: this.state.pooldetails.description,
      //   assignunderwriter: this.state.pooldetails.assignunderwriter,
      //   // assigninvestor: this.state.pooldetails.assigninvestor,
      //   assignverification: this.state.pooldetails.assignverification
      // }
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

  maploanfield = (val) => {
    this.setState({
      openMapLoanField: true,
      loandate: val,
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
    this.addDealDocument();
  };
  onSubmitFilter = (e) => {
    e.preventDefault();
    this.UpdateVerificationTemplate();
  };
  onSubmit3 = (e) => {
    e.preventDefault();
    this.updateDealDocument();
  };
  onPreviewSubmit = (e) => {
    e.preventDefault();
    this.updatePool();
  };
  onVerficationSubmit = (e) => {
    e.preventDefault();
    if (this.state.setupPoolFormData.assignservicer.length === 0) {
      this.setState({
        assignServicerError: true,
      });
      return;
    }
    this.updatePool();
  };

  handleOnChange1 = (e) => {
    this.setState({
      file1: e.target.files[0],
      filename1: e.target.files[0].name,
    });
    sessionStorage.setItem("filename", JSON.stringify(e.target.files[0].name));
  };

  handleOnChange2 = (e) => {
    this.setState({
      file2: e.target.files[0],
      filename2: e.target.files[0].name,
    });
  };

  handleClick = () => {
    // this.props.history.push({
    //   pathname: "/admin/issuerdashboard",
    // });
    this.props.history.goBack();
    // window.location.assign("/admin/issuerdashboard");
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
  GetOriginatorlist = async () => {
    var data = {};
    // data.poolid = this.state.pooldetails.poolID;
    data.poolid = sessionStorage.getItem("poolid");
    data.token = this.state.token;
    const APIResponse = await getOriginatorlist(data);
    console.log("GetOriginatorlist", APIResponse);
    if (APIResponse.status === 200) {
      if (APIResponse.data.success === true) {
        this.setState({
          originatorList: APIResponse.data.result,
        });
      }
    }
  };
  submitVerificationTemplate(e) {
    e.preventDefault();
    if (this.state.selectedLabels.length === 0) {
      this.setState({ validationError: true });
    } else {
      this.setState({ validationError: false });
      this.UpdateVerificationTemplate();
    }
  }
  UpdateReadlist = async (loanid) => {
    var data = {};
    data.poolid = this.state.pooldetails["poolID"];
    data.userid = this.state.issuerid;
    data.loanid = loanid;
    data.token = this.state.token;

    const APIResponse = await UpdateReadlist(data);
    if (APIResponse.status === 200) {
      window.location.reload();
    } else {
      const message = "Something went wrong";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };
  UpdateVerificationTemplate = async () => {
    this.setState({ formLoader: true });
    var data = {};
    data.poolid = this.state.pooldetails["poolID"];
    data.originatorname = this.state.selectedOriginatorName;
    data.verificationtemplate = this.state.selectedVerificationTemp;
    data.verificationfields = this.state.selectedLabels;
    data.contractpath = this.state.selectedContract;
    data.token = this.state.token;

    const APIResponse = await updateVerificationTemplate(data);

    if (APIResponse.status === 200) {
      if (APIResponse.data.isSuccess === true) {
        const message = APIResponse.data.message;
        this.props.enqueueSnackbar(message, {
          variant: "info",
          autoHideDuration: 3000,
        });
        this.onCloseVerificationForm();
        window.location.reload();
      } else {
        const message = "Something went wrong";
        this.props.enqueueSnackbar(message, {
          variant: "error",
          autoHideDuration: 3000,
        });
        this.onCloseVerificationForm();
      }
    }
  };
  UpdateLoanStatus = async () => {
    this.setState({ formLoader: true });
    var data = {};
    if (this.state.updateStatus !== "Mapped") {
      data.status = "Unmapped";
    } else {
      data.status = this.state.updateStatus;
    }
    data.loanid = this.state.loanid;
    data.poolid = this.state.pooldetails["poolID"];
    data.token = this.state.token;

    const APIResponse = await UpdateLoanStatus(data);
    console.log("res", APIResponse);
    if (APIResponse.status === 200) {
      this.setState({ formLoader: false });
      if (this.state.formData2.feedback.length > 0) {
        this.setState({ formLoader: true });
        this.saveFeedback();
        this.UpdateReadlist(this.state.loanid);
        return;
      }
      if (APIResponse.data.isSuccess == true) {
        const message = APIResponse.data.message;
        this.props.enqueueSnackbar(message, {
          variant: "info",
          autoHideDuration: 3000,
        });
        this.closeStatusUpdate();
        this.onCloseDelete();
        this.UpdateReadlist(this.state.loanid);
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
    data.issuerId = this.state.issuerid;
    data.username = this.state.firstname + this.state.lastname;
    data.feedback = data.feedback;
    data.organizationname = sessionStorage.getItem("organizationname");
    data.token = this.state.token;

    const APIResponse = await saveFeedback(data);
    console.log("savefeedback", APIResponse);
    if (APIResponse.status === 200) {
      if (APIResponse.data.success == true) {
        const message = APIResponse.data.message;
        this.props.enqueueSnackbar(message, {
          variant: "info",
          autoHideDuration: 3000,
        });
        this.closeFeedback();
      } else {
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
    }
  };

  retrieveFeedback = async (val) => {
    var data = {};
    data.loanid = val;
    data.poolid = sessionStorage.getItem("poolid") || this.state.dealid;
    data.userid = sessionStorage.getItem("userid");
    data.token = this.state.token;

    const APIResponse = await retrieveFeedback(data);

    console.log("res", APIResponse);
    if (APIResponse.status === 200) {
      this.setState({
        retrieveFeedbackData: APIResponse.data,
      });
    }
  };
  updatePool = async () => {
    const { setupPoolFormData, openPreview } = this.state;
    this.setState({ formLoader: true });
    let data = {
      poolid: this.state.pooldetails.poolID,
      issuerId: this.state.issuerid,
      poolname: setupPoolFormData.poolname,
      assetclass: setupPoolFormData.assetclass,
      description: setupPoolFormData.description,
      token: this.state.token,
      assignverification: setupPoolFormData.assignverification,
      assignpayingagent: setupPoolFormData.assignpayingagent,
      previewOrverify: openPreview ? "Preview" : "Verify",
    };

    // Handle multi-select fields
    const handleMultiSelect = (field) => {
      if (setupPoolFormData[field] !== "") {
        data[field] = setupPoolFormData[field]
          ?.map((item) => item.value)
          .join(",");
      } else {
        data[field] = "";
      }
    };

    [
      "assignunderwriter",
      "assignservicer",
      "ratingagency",
      "assigninvestor",
    ].forEach(handleMultiSelect);
    console.log("dataaaaa", data);
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

  downloadpreviewstdloantape = async (value) => {
    console.log(this.state.issuerid);
    var data = {};
    data.poolid = sessionStorage.getItem("poolid") || this.state.dealid;
    data.issuerId = this.state.issuerid;
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
    const val = this.state.loanTapeFormData.AsOfDate;
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
        this.maploanfield(val);
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

  getFileListByDealName = async (verificationTemplate) => {
    var data = {};
    data.poolname = this.state.verificationTemplate[verificationTemplate];
    data.verificationtemplate = verificationTemplate;
    data.token = this.state.token;
    console.log("datatatatatta", data);
    const APIResponse = await getFileListByDealName(data);
    console.log("Allzipfiles--", APIResponse);
    if (APIResponse.status === 200) {
      console.log("Allzipfiles--", APIResponse);
      this.setState({ array1: APIResponse.data });
      let x = APIResponse.data;
      let y = [];
      x.forEach(function (element) {
        y.push({ label: element, value: element });
      });
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

  onchange = (e) => {
    this.setState({ searchText: e.target.value, searchType: true });
    console.log("search: e.target.value", e.target.value);
  };

  searchBar = () => (
    <div className="search-bar-main-container" id="searchBox">
      <div className="tableSearch1">
        <TextField
          value={this.state.searchTerm}
          onChange={this.handleSearch}
          placeholder="Search"
          variant="standard"
          size="small"
          autoFocus
        />
        {/* {this.state.searchTextDashboard.length !== 0 ? <CloseIcon className="closeiconstyle" onClick={() => this.setState({ searchTextDashboard: '' })} /> : ''} */}
      </div>
      <button
        type="button"
        onClick={this.handleClearSearch}
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
    // this.props.history.push({
    //   pathname: this.state.Redirection,
    // });
    window.location.assign("/admin/issuerdashboard");
  };
  VerificationTemplateDetails = async () => {
    const APIResponse = await getverficationtemplatedetails(this.state.token);
    console.log("VerificationTemplateDetails", APIResponse);
    if (APIResponse.status === 200) {
      this.setState({
        verificationTempRes: APIResponse.data,
        verificationTemplate: APIResponse.data["VerificationTemplate"],
      });
      const verificationTemplateKeys = Object.keys(
        APIResponse.data["VerificationTemplate"]
      );
      this.setState({
        verificationTemplateKeys: verificationTemplateKeys,
      });
    }
  };
  PoolDetails1 = async () => {
    this.setState({ screenloader: true });

    var data = {};
    data.issuerId = sessionStorage.getItem("userid");
    data.poolid = sessionStorage.getItem("poolid") || this.state.dealid;
    data.userid = sessionStorage.getItem("userid");
    data.token = this.state.token;
    console.log("formdata", data);
    const APIResponse = await PoolDetails(data);

    if (APIResponse.status === 200) {
      this.setState({ PoolDetailsData: APIResponse.data, screenloader: false });
      console.log(
        "AllGetAllPoolsdata--",
        APIResponse.data.pooldetails[0]["poolID"]
      );
      const response = APIResponse.data;
      let temp = [];
      let temp2 = [];
      let temp3 = [];
      let temp4 = [];
      if (response.pooldetails[0].previewOrverify != "") {
        temp = this.state.UnderwriterDropdown?.map((underwriter, index) =>
          response.pooldetails[0].assignunderwriter.includes(underwriter.value)
            ? index
            : -1
        ).filter((index) => index !== -1);
        temp2 = this.state.InvestorDropdown?.map((investor, index) =>
          response.pooldetails[0].assigninvestor?.includes(investor.value)
            ? index
            : -1
        ).filter((index) => index !== -1);
        temp3 = this.state.ServicerDropdown?.map((servicer, index) =>
          response.pooldetails[0].assignservicer?.includes(servicer.value)
            ? index
            : -1
        ).filter((index) => index !== -1);
        temp4 = this.state.ratingAgencyDropdown
          ?.map((ratingagency, index) =>
            response.pooldetails[0].ratingagency?.includes(ratingagency.value)
              ? index
              : -1
          )
          .filter((index) => index !== -1);
      }
      let fdate;
      // // fdate = moment(response.loandetails[0]?.['As Of Date'])._d
      if (response.loandetails.length == 0) {
        console.log("a1111111111111111", "if");
        fdate = "";
        this.setState({ disableAsofDate: false });
      }

      if (response.loandetails.length != 0) {
        fdate = moment(response.loandetails[0]?.["As Of Date"])._d;
        this.setState({ disableAsofDate: true });
      }
      this.setState({
        loandetails: response.loandetails,
        pooldetails: response.pooldetails[0],
        loanTapeFormData: {
          ...this.state.loanTapeFormData,
          AsOfDate: fdate,
        },
        previewOrVerify: response.pooldetails[0].previewOrverify,
        setupPoolFormData: {
          ...this.state.setupPoolFormData,
          poolname: response.pooldetails[0].poolname,
          assetclass: response.pooldetails[0].assetclass,
          description: response.pooldetails[0].description,
          assignverification: response.pooldetails[0].assignverification,
          assignunderwriter: temp?.map(
            (index) => this.state.UnderwriterDropdown[index]
          ),
          assigninvestor: temp2?.map(
            (index) => this.state.InvestorDropdown[index]
          ),
          assignservicer: temp3?.map(
            (index) => this.state.ServicerDropdown[index]
          ),
          ratingagency: temp4?.map(
            (index) => this.state.ratingAgencyDropdown[index]
          ),
          assignpayingagent: response.pooldetails[0].assignpayingagent,
        },
      });
      console.log("ghcghchgvch", this.state.pooldetails);
      this.GetOriginatorlist();
      this.VerificationTemplateDetails();
      if (response.bdbtiles) {
        this.setState({
          bdbtiles: response?.bdbtiles[0],
        });
      }
      console.log("setupPoolFormData", this.state.setupPoolFormData);
      let arrrej = [];
      let arrace = [];
      let arrpen = [];
      let loanId = [];
      let display = [];
      const desiredColumn = "Loan ID";
      let desiredColumnIndex = -1;
      if (response.loandetails.length != 0) {
        Object.keys(response.loandetails[0]).map((val, index) => {
          if (
            val == "_id" ||
            val == "issuerId" ||
            val == "poolid" ||
            val == "Loan Data" ||
            val == "Contract Data" ||
            val == "Contract Digitized" ||
            val == "Status" ||
            val == "Created Date" ||
            val == "Asset Class" ||
            val == "Matched" ||
            val == "Verfification Template" ||
            val == "System ID"
          ) {
            return;
          }
          let column = {
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
              customBodyRender: (value, tableMeta, updateValue) => {
                console.log("values", tableMeta);
                return (
                  <React.Fragment>
                    {this.state.poolName === "New Silver" ? (
                      tableMeta.columnIndex === 6 ? (
                        <NumberComp
                          className="text-center"
                          value={value}
                        ></NumberComp>
                      ) : tableMeta.columnIndex === 7 ? (
                        <div className="text-center">
                          {(value * 100).toFixed(3) + "%"}
                        </div>
                      ) : (
                        <div className="text-center">{value}</div>
                      )
                    ) : (
                      <div className="text-center">{value}</div>
                    )}
                  </React.Fragment>
                );
              },
            },
          };
          if (val === desiredColumn) {
            desiredColumnIndex = display.length;
          }
          display.push(column);
        });
        if (desiredColumnIndex > 0) {
          const [removedColumn] = display.splice(desiredColumnIndex, 1);
          display.unshift(removedColumn);
        }

        let checkerBoolen = (arr) =>
          arr.every((v) => v["Contract Data"] === "Yes");

        let checkLoanContratData = checkerBoolen(response.loandetails);

        let checkPoolAlert = response.pooldetails[0].AlertStatus;

        let finalCheck;

        if (
          checkLoanContratData === true &&
          checkPoolAlert === "False" &&
          this.state.userrole === "Issuer"
        ) {
          finalCheck = true;
        } else if (
          checkLoanContratData === false &&
          checkPoolAlert === "False" &&
          this.state.userrole === "Issuer"
        ) {
          finalCheck = true;
          this.setState({
            noAlertStatus: "No",
          });
        } else {
          finalCheck = false;
        }
        console.log("display", display);
        this.setState({
          columns: display,
          isSubmitVerifiedBtn: finalCheck,
          open8: finalCheck,
        });
      } else {
        this.setState({
          tableData1: [],
          tableData2: [],
          tableData3: [],
        });
      }
      console.log("this.state.loandetails", response.loandetails);
      response.loandetails.map((e) => {
        console.log("arr", e);
        if (e.Status === "Reconsider") {
          arrrej.push(e);
          console.log("arr1", arrrej);
        } else if (e.Status === "Mapped" || e.Status === "Unreviewed") {
          arrpen.push(e);
          loanId.push(e.Loan_ID);
        } else {
          arrace.push(e);
        }
      });
      console.log("arr2", arrrej);
      this.setState({
        loanidlist: loanId,
        tableData1: arrrej,
        tableData2: arrpen,
        tableData3: arrace,
        screenloader: false,
        dealDocuments: APIResponse.data.documentdetails,
      });
      // this.GetOriginatorlist()
      //this.getAttributesByPoolName(response.pooldetails[0].poolname);
    } else {
      this.setState({ screenloader: false });
      const message = "Couldn't fetch the record";
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

    console.log("newdata", JSON.stringify(newdata));

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
    // this.GetOriginatorlist()
    this.setState({
      setupPoolFormData: {
        ...this.state.setupPoolFormData,
        poolname: this.state.pooldetails.poolname,
      },
    });
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
        MuiCheckbox: {
          // Add this block for checkbox styling
          root: {
            color: "#FFC000 !important",
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

  handleClickAccepted = () => {
    this.setState({
      activeInsights1: true,
      activeInsights2: false,
      activeInsights3: false,
      activeInsights4: false,
      activeInsights5: false,
      activeInsights6: false,
    });
  };

  handleClickPending = () => {
    this.setState({
      activeInsights1: false,
      activeInsights2: true,
      activeInsights3: false,
      activeInsights4: false,
      activeInsights5: false,
      activeInsights6: false,
    });
  };
  handleClickRejected = () => {
    this.setState({
      activeInsights1: false,
      activeInsights2: false,
      activeInsights3: true,
      activeInsights4: false,
      activeInsights5: false,
      activeInsights6: false,
    });
    // this.UpdateReadlist();
  };
  handleClickLoanTape = () => {
    this.setState({
      activeInsights1: false,
      activeInsights2: false,
      activeInsights3: false,
      activeInsights4: true,
      activeInsights5: false,
      activeInsights6: false,
    });
  };
  async handleClickStrat() {
    const res = await axios.get(
      "https://bdb.imtest.intainmarkets.us/api/v1/imarkets/reportlink?groupby=d&mailid=shruthie.sridhar@intainft.com&password=3QoJ4apBSWykJbp9RTRG4Q==&type=strat"
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
      activeInsights6: false,
    });
  }
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
      activeInsights5: false,
      activeInsights6: true,
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

    const filteredData = this.state.searchTerm
      ? this.filterData(this.state.searchTerm)
      : this.state.loandetails;

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
        name: "As Of Date",
        label: "As of Date",
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
          customBodyRender: (value, tableMeta) => {
            console.log(tableMeta);
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
                        <CheckOutlinedIcon
                          onClick={() =>
                            this.openDeletePopup(tableMeta.rowData[0])
                          }
                        />
                      </button>
                      <button className="search-mui-icons">
                        <ClearOutlinedIcon
                          onClick={() =>
                            this.onOpenStatusUpdate(
                              "Mapped",
                              tableMeta.rowData[0]
                            )
                          }
                        />
                      </button>
                      <button className="search-mui-icons">
                        <MessageOutlinedIcon
                          onClick={() =>
                            this.onOpenFeedback(tableMeta.rowData[0])
                          }
                        />
                      </button>
                    </>
                  )}
                  {!this.state.activeInsights3 && (
                    <button className="search-mui-icons">
                      {/* <DeleteIcon onClick={() => this.UpdateLoanStatus(tableMeta.rowData[0])} /> */}
                      <DeleteIcon
                        onClick={() =>
                          this.openDeletePopup(tableMeta.rowData[0])
                        }
                      />
                    </button>
                  )}
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
          <Sidebar
            activeComponent={
              this.state.userrole == "Verification"
                ? "VA_Dashboard"
                : "Dashboard"
            }
          />
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
                      <h3 className="headerdashboard">Pool Details</h3>
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
                                ></NumberComp>
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
                          <div
                            style={{
                              display: "flex",
                              gap: "200px",
                              marginBottom: "-15px",
                            }}
                          >
                            {this.state.bdbtiles.fico != "NA" &&
                              this.state.bdbtiles.wac != "NA" && (
                                <div className="headingspaces1">
                                  <p className="sizeofp">FICO</p>
                                  <h6 className="headingspace1">
                                    {this.state.bdbtiles.fico}
                                  </h6>
                                </div>
                              )}
                            {this.state.bdbtiles.ltv != "NA" &&
                              this.state.bdbtiles.wac != "NA" && (
                                <div className="headingspaces1">
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
                      {this.state.userrole == "Issuer" ? (
                        <React.Fragment>
                          <OverlayTrigger
                            rootClose={true}
                            trigger="click"
                            placement="bottom"
                            onClick={document.body.click()}
                            overlay={this.popoverBottom()}
                            //onHide={!this.state.openLoanTape}
                          >
                            <Button
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
                              onClick={() =>
                                this.setState((prevState) => ({
                                  submitDownArrow: !prevState.submitDownArrow,
                                }))
                              }
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
                        this.state.userrole == "Verification" ? (
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
                  <div className="investor-heading-container">
                    <h1 className="headerdashboard1">Mapped Loans</h1>
                  </div>

                  <div className="tabContainer">
                    <div className="tablechangebutton1">
                      <buton
                        type="button"
                        onClick={() => this.handleClickAccepted()}
                        className={
                          this.state.activeInsights1 == true
                            ? "issuerDashboard-table-top-button-insights-active"
                            : "issuerDashboard-table-top-button-insights"
                        }
                      >
                        Accepted
                      </buton>
                      <buton
                        type="button"
                        onClick={() => this.handleClickPending()}
                        className={
                          this.state.activeInsights2 == true
                            ? "issuerDashboard-table-top-button-workbench-active"
                            : "issuerDashboard-table-top-button-workbench"
                        }
                      >
                        Pending
                      </buton>
                      <buton
                        type="button"
                        onClick={() => this.handleClickRejected()}
                        className={
                          this.state.activeInsights3 == true
                            ? "issuerDashboard-table-top-button-rejected-active"
                            : "issuerDashboard-table-top-button-rejected"
                        }
                      >
                        Reconsider
                      </buton>
                      <button
                        type="button"
                        onClick={() => this.handleClickLoanTape()}
                        className={
                          this.state.activeInsights4 == true
                            ? "issuerDashboard-table-top-button-rejected-active"
                            : "issuerDashboard-table-top-button-rejected"
                        }
                      >
                        Loan Tape
                      </button>
                      <buton
                        type="button"
                        onClick={() => this.handleClickStrat()}
                        className={
                          this.state.activeInsights5 == true
                            ? "issuerDashboard-table-top-button-rejected-active"
                            : "issuerDashboard-table-top-button-rejected"
                        }
                      >
                        Strat
                      </buton>
                      <buton
                        type="button"
                        onClick={() => this.handleClickSummary()}
                        className={
                          this.state.activeInsights6 == true
                            ? "issuerDashboard-table-top-button-rejected-active"
                            : "issuerDashboard-table-top-button-rejected"
                        }
                      >
                        Summary
                      </buton>
                    </div>
                  </div>

                  <div className="dashboard-top-right-container">
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
                      <OverlayTrigger
                        rootClose={true}
                        trigger="click"
                        placement="bottom"
                        onClick={document.body.click()}
                        overlay={this.popoverBottom2()}
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
                    )}
                    {this.state.activeInsights2 &&
                      !this.state.showSearchBox && (
                        <Button
                          variant="outlined"
                          onClick={this.onOpenFilter.bind(this)}
                          // className="card__button2"
                          // type="submit"
                        >
                          Map Loan Contract
                        </Button>
                      )}
                  </div>
                </div>

                <React.Fragment>
                  {this.state.activeInsights1 && (
                    <React.Fragment>
                      <div
                        id="table-container"
                        style={{
                          height: "100%",
                          borderRadius: "1rem",
                          overflow: "auto",
                          border: "1px solid black",
                          marginBottom: "30px",
                        }}
                      >
                        <TableVirtuoso
                          data={
                            this.state.searchTerm
                              ? this.state.filteredData
                              : this.state.tableData3
                          }
                          columns={columns}
                          components={TableComponents}
                          itemHeight={50}
                          style={{
                            width: "100%",
                            height: this.state.searchTerm
                              ? this.state.filteredData.length * 50 > 600
                                ? 600
                                : this.state.filteredData.length * 50 + 70
                              : this.state.tableData3.length * 50 > 600
                              ? 600
                              : this.state.tableData3.length * 50 + 70,
                            overflow: "auto",
                            borderRadius: "1rem",
                            overflowAnchor: "none",
                          }}
                          fixedHeaderContent={() => (
                            <TableRow>
                              {columns?.map((column) => (
                                <TableCell
                                  key={column.key}
                                  style={{
                                    background: "white",
                                    cursor: "pointer",
                                    width: `${column.length * 10}px`,
                                    whiteSpace: "nowrap",
                                  }}
                                  onClick={() =>
                                    this.handleSort(
                                      column.name,
                                      this.state.tableData2
                                    )
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
                                        sortAscending={this.state.sortAscending}
                                      />
                                    )}
                                  </div>
                                </TableCell>
                              ))}
                            </TableRow>
                          )}
                          itemContent={(index) => {
                            const { searchTerm, filteredData, tableData3 } =
                              this.state;
                            const rowData = searchTerm
                              ? filteredData[index]
                              : tableData3[index];
                            const isOddRow = index % 2 !== 0;
                            return (
                              <>
                                {columns?.map((column) => (
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
                                      <button
                                        className="search-mui-icons"
                                        style={{
                                          marginTop: "-3px",
                                        }}
                                      >
                                        <DeleteIcon
                                          onClick={() =>
                                            this.openDeletePopup(
                                              rowData["Loan ID"]
                                            )
                                          }
                                        />
                                      </button>
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
                  {this.state.activeInsights2 && (
                    <React.Fragment>
                      <div
                        id="table-container"
                        style={{
                          height: "100%",
                          borderRadius: "1rem",
                          overflow: "auto",
                          border: "1px solid black",
                          marginBottom: "30px",
                        }}
                      >
                        <TableVirtuoso
                          data={
                            this.state.searchTerm
                              ? this.state.filteredData
                              : this.state.tableData2
                          }
                          columns={columns}
                          components={TableComponents}
                          itemHeight={50}
                          style={{
                            width: "100%",
                            height: this.state.searchTerm
                              ? this.state.filteredData.length * 50 > 600
                                ? 600
                                : this.state.filteredData.length * 50 + 70
                              : this.state.tableData2.length * 50 > 600
                              ? 600
                              : this.state.tableData2.length * 50 + 70,
                            overflow: "auto",
                            borderRadius: "1rem",
                            overflowAnchor: "none",
                          }}
                          fixedHeaderContent={() => (
                            <TableRow>
                              {columns?.map((column) => (
                                <TableCell
                                  key={column.key}
                                  style={{
                                    background: "white",
                                    cursor: "pointer",
                                    width: `${column.length * 10}px`,
                                    whiteSpace: "nowrap",
                                  }}
                                  onClick={() =>
                                    this.handleSort(
                                      column.name,
                                      this.state.tableData2
                                    )
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
                                        sortAscending={this.state.sortAscending}
                                      />
                                    )}
                                  </div>
                                </TableCell>
                              ))}
                            </TableRow>
                          )}
                          itemContent={(index) => {
                            const { searchTerm, filteredData, tableData2 } =
                              this.state;
                            const rowData = searchTerm
                              ? filteredData[index]
                              : tableData2[index];
                            const isOddRow = index % 2 !== 0;
                            return (
                              <>
                                {columns?.map((column) => (
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
                                      <button
                                        className="search-mui-icons"
                                        style={{
                                          marginTop: "-3px",
                                        }}
                                      >
                                        <DeleteIcon
                                          onClick={() =>
                                            this.openDeletePopup(
                                              rowData["Loan ID"]
                                            )
                                          }
                                        />
                                      </button>
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
                  {this.state.activeInsights3 && (
                    // <div className="workbench-table-container">
                    //   <MuiThemeProvider theme={this.getMuiTheme()}>
                    //     <MUIDataTable
                    //       data={this.state.tableData1}
                    //       columns={columns}
                    //       options={options}
                    //     />
                    //   </MuiThemeProvider>
                    // </div>
                    <React.Fragment>
                      <div
                        id="table-container"
                        style={{
                          height: "100%",
                          borderRadius: "1rem",
                          overflow: "auto",
                          border: "1px solid black",
                          marginBottom: "30px",
                        }}
                      >
                        <TableVirtuoso
                          data={
                            this.state.searchTerm
                              ? this.state.filteredData
                              : this.state.tableData1
                          }
                          columns={this.state.columns}
                          itemHeight={50}
                          components={TableComponents}
                          style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            height: this.state.searchTerm
                              ? this.state.filteredData.length * 50 > 600
                                ? 600
                                : this.state.filteredData.length * 50 + 90
                              : this.state.tableData1?.length * 50 > 600
                              ? 600
                              : this.state.tableData1.length * 50 + 90,
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
                                  onClick={() =>
                                    this.handleSort(
                                      column.name,
                                      this.state.tableData1
                                    )
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
                                        sortAscending={this.state.sortAscending}
                                      />
                                    )}
                                  </div>
                                </TableCell>
                              ))}
                            </TableRow>
                          )}
                          itemContent={(index) => {
                            const { searchTerm, filteredData, tableData1 } =
                              this.state;
                            const rowData = searchTerm
                              ? filteredData[index]
                              : tableData1[index];
                            const isOddRow = index % 2 !== 0;
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
                                      : rowData[column.name]}{" "}
                                  </TableCell>
                                ))}
                              </>
                            );
                          }}
                        />
                      </div>
                    </React.Fragment>
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
                          marginBottom: "30px",
                        }}
                      >
                        <TableVirtuoso
                          data={
                            this.state.searchTerm
                              ? this.state.filteredData
                              : this.state.loandetails
                          }
                          columns={this.state.columns}
                          itemHeight={50}
                          components={TableComponents}
                          style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            height: this.state.searchTerm
                              ? this.state.filteredData.length * 50 > 600
                                ? 600
                                : this.state.filteredData.length * 50 + 90
                              : this.state.loandetails?.length * 50 > 600
                              ? 600
                              : this.state.loandetails.length * 50 + 90,
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
                                  onClick={() =>
                                    this.handleSort(
                                      column.name,
                                      this.state.loandetails
                                    )
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
                                        sortAscending={this.state.sortAscending}
                                      />
                                    )}
                                  </div>
                                </TableCell>
                              ))}
                            </TableRow>
                          )}
                          itemContent={(index) => {
                            const { searchTerm, filteredData, loandetails } =
                              this.state;
                            const rowData = searchTerm
                              ? filteredData[index]
                              : loandetails[index];
                            const isOddRow = index % 2 !== 0;
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
                                      : rowData[column.name]}{" "}
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
                  {this.state.activeInsights6 && (
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

          <div id="modal1">
            <ReactModal
              isOpen={this.state.open2}
              onRequestClose={this.onCloseModal1}
              contentLabel="Minimal Modal Example"
              style={customStylesautosmallmodal}
            >
              <div className="new-modal-popup">
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
                  <div>
                    <h4 className="popupheading">Update Loan Status</h4>
                  </div>
                  <p>
                    Are you sure, you want to move the loan to the Pending
                    status.
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
                      {this.state?.retrieveFeedbackData?.map((item) => {
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
                              style={{ color: "#018e82" }}
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

                      <div className="input-container">
                        <label className="label">As of Date*</label>
                        <br />
                        <div className="input-container-date">
                          <DatePicker
                            disabled={this.state.disableAsofDate}
                            required
                            defaultDate={moment(new Date())}
                            placeholderText="MM/DD/YYYY"
                            dateFormat="MM/dd/yyyy"
                            className="input-select"
                            selected={this.state.loanTapeFormData.AsOfDate}
                            onChange={(date) =>
                              this.setState({
                                loanTapeFormData: {
                                  ...this.state.loanTapeFormData,
                                  AsOfDate: date,
                                },
                              })
                            }
                          />
                        </div>
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
                  </div>
                </div>
              </React.Fragment>
            </ReactModal>
          </div>

          {/* Map Loan Field Popup */}
          <div id="modal">
            <ReactModal
              isOpen={this.state.openMapLoanField}
              onRequestClose={this.closeMapLoanField}
              contentLabel="Minimal Modal Example"
              //style={customStylesauto}
            >
              <React.Fragment>
                <div className="modalPopup2">
                  <div className="popupTitle" style={{ margin: "0 22px" }}>
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
                </div>
                <div>
                  <MapFields
                    loandataupdtaedtill={this.state.loandate}
                    poolid={this.state.pooldetails.poolID}
                    reupload={true}
                    filename={this.state.filename1}
                    assetclass={this.state.pooldetails.assetclass}
                    verificationtemplate={
                      this.state.loanTapeFormData.verification_template
                    }
                    mappingDataKey={this.state.mappingDataKey}
                    mapData={this.state.previewMappingData}
                    dataFromMappingField={this.handleChildData} //data from parent to child
                  />
                </div>
              </React.Fragment>
            </ReactModal>
          </div>

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
                            value={
                              this.state.setupPoolFormData.assignunderwriter
                            }
                            options={this.state.UnderwriterDropdown}
                            placeholder="Select one or more"
                            onChange={(selected) => {
                              console.log("selected", selected);
                              this.setState({
                                setupPoolFormData: {
                                  ...this.state.setupPoolFormData,
                                  assignunderwriter: selected,
                                },
                              });
                            }}
                            menuPlacement="auto"
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
                            menuPlacement="auto"
                          />
                        ) : (
                          <FormLoader></FormLoader>
                        )}
                      </div>
                      <br></br>

                      <div classNamePrefix="input-container">
                        <label className="label">Rating Agency Access</label>
                        {this.state.getLoansLoader == false ? (
                          <Select
                            isMulti
                            className="basic-multi-select"
                            classNamePrefix="select"
                            components={{
                              Option,
                            }}
                            value={this.state.setupPoolFormData.ratingagency}
                            options={this.state.ratingAgencyDropdown}
                            placeholder="Select one or more"
                            onChange={(selected) => {
                              this.setState({
                                setupPoolFormData: {
                                  ...this.state.setupPoolFormData,
                                  ratingagency: selected,
                                },
                              });
                            }}
                            menuPlacement="auto"
                          />
                        ) : (
                          <FormLoader></FormLoader>
                        )}
                      </div>
                      <br></br>

                      {/* <div className="input-container">
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
                            {this.state.VerificationDropdown?.map((item) => {
                              return (
                                <option value={item.value}>{item.label}</option>
                              );
                            })}
                          </select>
                        ) : (
                          <FormLoader></FormLoader>
                        )}
                      </div> */}

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

          {/* Submit for Verification */}
          <div id="modal">
            <ReactModal
              isOpen={this.state.openVerification}
              onRequestClose={this.closeVerificationForm}
              contentLabel="Minimal Modal Example"
              style={customStylesauto}
            >
              <React.Fragment>
                <div className="modalPopup2">
                  <div className="popupTitle">
                    <h2>Submit for Verification</h2>
                    <button
                      type="button"
                      className="closePopup"
                      style={{ minWidth: "30px" }}
                      onClick={this.closeVerificationForm}
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
                        <label className="label">Underwriter Access*</label>
                        {this.state.getLoansLoader === false ? (
                          // <Select
                          //   isMulti
                          //   className="basic-multi-select"
                          //   classNamePrefix="select"
                          //   components={{
                          //     Option
                          //   }}
                          //   placeholder="Select one or more"
                          //   value={this.state.setupPoolFormData.assignunderwriter}
                          //   options={this.state.UnderwriterDropdown}
                          //   onChange={(selected) => {
                          //     this.setState({
                          //       setupPoolFormData: {
                          //         ...this.state.setupPoolFormData,
                          //         assignunderwriter: selected
                          //       }
                          //     })
                          //   }}
                          //   menuPlacement="auto"
                          // />
                          <select
                            required
                            placeholder="Select any one"
                            className="input-select"
                            onChange={(e) => {
                              this.setState({
                                setupPoolFormData: {
                                  ...this.state.setupPoolFormData,
                                  assignunderwriter: e.target.value,
                                },
                              });
                            }}
                            value={
                              this.state.setupPoolFormData.assignunderwriter
                            }
                          >
                            <option value="" disabled className="selectclass">
                              Select any one
                            </option>
                            {this.state.UnderwriterDropdown?.map((item) => {
                              // if(item.Email === this.state.EmailAddress){
                              //   return(
                              //     <option value={item.value}>
                              //   {"Self"}
                              // </option>
                              //   )
                              // }
                              return (
                                <option value={item.value}>{item.label}</option>
                              );
                            })}
                          </select>
                        ) : (
                          <FormLoader></FormLoader>
                        )}
                      </div>

                      <div classNamePrefix="input-container">
                        <label className="label">Servicer Access*</label>
                        {this.state.getLoansLoader == false ? (
                          <>
                            <Select
                              isMulti
                              className="basic-multi-select"
                              classNamePrefix="select"
                              components={{
                                Option,
                              }}
                              required={true}
                              value={
                                this.state.setupPoolFormData.assignservicer
                              }
                              options={this.state.ServicerDropdown}
                              placeholder="Select one or more"
                              onChange={(selected) => {
                                this.setState({
                                  setupPoolFormData: {
                                    ...this.state.setupPoolFormData,
                                    assignservicer: selected,
                                  },
                                  assignServicerError: selected.length === 0,
                                });
                              }}
                              menuPlacement="auto"
                            />
                            {this.state.assignServicerError && (
                              <p className="error-msg">
                                Please select at least one servicer.
                              </p>
                            )}
                          </>
                        ) : (
                          <FormLoader></FormLoader>
                        )}
                      </div>

                      <br></br>

                      <div classNamePrefix="input-container">
                        <label className="label">Rating Agency Access</label>
                        {this.state.getLoansLoader == false ? (
                          <Select
                            isMulti
                            className="basic-multi-select"
                            classNamePrefix="select"
                            components={{
                              Option,
                            }}
                            value={this.state.setupPoolFormData.ratingagency}
                            options={this.state.ratingAgencyDropdown}
                            placeholder="Select one or more"
                            onChange={(selected) => {
                              this.setState({
                                setupPoolFormData: {
                                  ...this.state.setupPoolFormData,
                                  ratingagency: selected,
                                },
                              });
                            }}
                            menuPlacement="auto"
                          />
                        ) : (
                          <FormLoader></FormLoader>
                        )}
                      </div>

                      <br></br>

                      <div className="input-container">
                        <label className="label">Assign Paying Agent*</label>
                        {this.state.getLoansLoader == false ? (
                          <select
                            required
                            placeholder="select any one"
                            className="input-select"
                            onChange={(e) => {
                              this.setState(
                                {
                                  setupPoolFormData: {
                                    ...this.state.setupPoolFormData,
                                    assignpayingagent: e.target.value,
                                  },
                                },
                                () =>
                                  console.log(
                                    this.state.setupPoolFormData
                                      .assignpayingagent
                                  )
                              );
                            }}
                            value={
                              this.state.setupPoolFormData.assignpayingagent
                            }
                          >
                            <option value="" disabled className="selectclass">
                              Select any one
                            </option>
                            {this.state.PayingAgentDropdown?.map((item) => {
                              return (
                                <option value={item.value}>{item.label}</option>
                              );
                            })}
                          </select>
                        ) : (
                          <FormLoader></FormLoader>
                        )}
                      </div>

                      <div className="input-container">
                        <label className="label">
                          Assign Verification Agent*
                        </label>
                        {this.state.getLoansLoader == false ? (
                          <select
                            required
                            placeholder="select any one"
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
                            {this.state.VerificationDropdown?.map((item) => {
                              return (
                                <option value={item.value}>{item.label}</option>
                              );
                            })}
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
                                onClick={this.closeVerificationForm}
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

          {/* Remove the loan from the pool */}
          <div id="modal1">
            <ReactModal
              isOpen={this.state.openDelete}
              onRequestClose={this.onCloseDelete}
              contentLabel="Minimal Modal Example"
              style={customStylesPopupInveststep}
            >
              <React.Fragment>
                <div className="modalPopup2">
                  <div className="popupheading1">
                    <h4 className="popupheading">
                      Are you sure, you want to Accept the rejection for this
                      loan?
                    </h4>
                    <p>
                      Once you accepet this, the loan will be unmapped/removed
                      from this pool.
                    </p>
                  </div>
                  <div className="modalshiftcontent">
                    <div className="modalsubmit">
                      <div className="submitbuttonbg">
                        <div className="row">
                          <div className="row justify-content-end11">
                            <button
                              type="button"
                              className="popupbutton1"
                              onClick={this.onCloseDelete}
                            >
                              {" "}
                              Cancel{" "}
                            </button>

                            <Button
                              variant="contained"
                              color="primary"
                              type="submit"
                              onClick={this.UpdateLoanStatus}
                            >
                              Accept
                              {this.state.formLoader === true ? (
                                <CircularProgress size="25px" color="primary" />
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

                  {/* <div className="modalshiftcontent">
                            <ul>
                              <li className="t-flex-container">
                                <div className="td-first">
                                  <p>Select any one Tranche</p>
                                </div>
                                <div className="td-second">
                                  <p>Status</p>
                                </div>
                              </li>
                              {demoTranche.map((element) => (
                                <li
                                  className="t-flex-container"
                                  key={element.name}
                                >
                                  <div className="td-first">
                                    <input
                                      type="checkbox"
                                      className="t-select"
                                      disabled={
                                        element.status
                                          .toLocaleLowerCase()
                                          .includes("done")
                                          ? true
                                          : false
                                      }
                                      onChange={(e) => {
                                        if (e.target.checked === true) {
                                          this.handleOnChangeAdd(element);
                                        } else {
                                          this.handleOnChnageRemove(element);
                                        }
                                      }}
                                    />
                                    <p className="t-name">{element.name}</p>
                                  </div>
                                  <div className="td-second">
                                    <p
                                      className={
                                        element.status
                                          .toLocaleLowerCase()
                                          .includes("done")
                                          ? "t-text-color-green"
                                          : "t-text-color-red"
                                      }
                                    >
                                      {element.status}
                                    </p>
                                  </div>
                                </li>
                              ))}
                            </ul>

                            <p>Note:</p>
                            <ul>
                              <li>
                                Each tranche in this deal is represented by
                                Fungible Tokens (FTs) that are currently held in
                                your IM Subnet Wallet; once this deal is
                                published, those FTs will be exchanged with
                                Investors for USDC.{" "}
                              </li>
                              <li>
                                By signing the Approve Transaction below, you
                                agree to allow IM to automatically debit the
                                corresponding amount of FTs from your IM Subnet
                                Wallet as Investors credits your C-Chain Wallet
                                with USDC.”
                              </li>
                            </ul>
                          </div> */}

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

          <div className="filter">
            <div id="modal1">
              <ReactModal
                isOpen={this.state.openFilter}
                onRequestClose={this.onCloseFilter}
                contentLabel="Minimal Modal Example"
                style={customStylesautosmallmodal}
              >
                <React.Fragment>
                  <div className="modalPopup2">
                    <div className="popupTitle">
                      <h2>Filter Loan</h2>
                      <button
                        type="button"
                        className="closePopup"
                        style={{ minWidth: "30px" }}
                        onClick={this.onCloseFilter}
                      >
                        {" "}
                        <CloseIcon></CloseIcon>{" "}
                      </button>
                    </div>

                    <div className="modalshiftcontent">
                      <form
                        className="form-container"
                        onSubmit={this.submitFilterLoan}
                      >
                        <div className="input-container">
                          <label className="label">Originator Name</label>
                          <select
                            required
                            className="input-select"
                            onChange={(e) => {
                              this.setState({
                                selectedOriginatorName: e.target.value,
                              });
                            }}
                            value={this.state.selectedOriginatorName}
                          >
                            <option value="" disabled className="selectclass">
                              Select Any One{" "}
                            </option>
                            {this.state.originatorList.map((item) => {
                              return <option value={item}>{item}</option>;
                            })}
                          </select>
                        </div>

                        <div className="modalsubmit">
                          <div className="submitbuttonbg">
                            <div className="row">
                              <div className="row justify-content-end4">
                                <button
                                  type="button"
                                  className="popupbutton22"
                                  onClick={this.onCloseFilter}
                                >
                                  {" "}
                                  Cancel{" "}
                                </button>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  type="submit"
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

          {/* Verification Template */}
          <div className="filter">
            <div id="modal1">
              <ReactModal
                isOpen={this.state.openVerificationTemp}
                onRequestClose={this.onCloseVerificationForm}
                contentLabel="Minimal Modal Example"
                style={customStylesautosmallmodal}
              >
                <React.Fragment>
                  <div className="modalPopup2">
                    <div className="popupTitle">
                      <h2>Verification Template</h2>
                      <button
                        type="button"
                        className="closePopup"
                        style={{ minWidth: "30px" }}
                        onClick={this.onCloseVerificationForm}
                      >
                        {" "}
                        <CloseIcon></CloseIcon>{" "}
                      </button>
                    </div>

                    <div className="modalshiftcontent">
                      <form
                        className="form-container"
                        onSubmit={(e) => this.submitVerificationTemplate(e)}
                      >
                        <div className="input-container">
                          <label className="label">Verfication Template</label>
                          <select
                            required
                            className="input-select"
                            onChange={(e) => {
                              this.setState(
                                {
                                  selectedVerificationTemp: e.target.value,
                                },
                                () => {
                                  this.getFileListByDealName(
                                    this.state.selectedVerificationTemp
                                  );
                                }
                              );
                            }}
                            value={this.state.selectedVerificationTemp}
                          >
                            <option value="" disabled className="selectclass">
                              Select Any One{" "}
                            </option>
                            {this.state.verificationTemplateKeys.map((item) => {
                              return <option value={item}>{item}</option>;
                            })}
                          </select>
                        </div>

                        {this.state.selectedVerificationTemp !== "" && (
                          <div className="input-container">
                            <label className="label">Contract</label>
                            <select
                              className="input-select"
                              onChange={(e) => {
                                this.setState({
                                  selectedContract: e.target.value,
                                });
                              }}
                              value={this.state.selectedContract}
                            >
                              <option value="" disabled className="selectclass">
                                Select Any One{" "}
                              </option>
                              {this.state.array1.map((item) => {
                                return <option value={item}>{item}</option>;
                              })}
                            </select>
                          </div>
                        )}
                        {this.state.selectedVerificationTemp !== "" && (
                          <div className="input-container">
                            <label className="label">Verification Fields</label>
                            <div
                              style={{
                                height: "280px",
                                border: "1px solid #212121",
                                overflowY: "auto",
                              }}
                            >
                              {this.state.verificationTempRes[
                                this.state.selectedVerificationTemp
                              ].map((item) => (
                                <div
                                  key={item}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                    marginLeft: "15px",
                                  }}
                                >
                                  <input
                                    type="checkbox"
                                    style={{ cursor: "pointer" }}
                                    onChange={() =>
                                      this.handleCheckboxChange(item)
                                    }
                                    checked={this.state.selectedLabels.includes(
                                      item
                                    )}
                                  />
                                  <label>{item}</label>
                                </div>
                              ))}
                            </div>
                            {this.state.validationError && (
                              <p className="error-msg">
                                Please select at least one verification field.
                              </p>
                            )}
                          </div>
                        )}

                        <div className="modalsubmit">
                          <div className="submitbuttonbg">
                            <div className="row">
                              <div className="row justify-content-end4">
                                <button
                                  type="button"
                                  className="popupbutton22"
                                  onClick={this.onCloseVerificationForm}
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
              {/* <React.Fragment>
                <div className="modalPopup2">
                  <h2>Upload Contracts</h2>
                  <button
                    type="button"
                    className="closePopup"
                    style={{ minWidth: "30px" }}
                    onClick={this.onCloseModal3}
                  >
                    {" "}
                    <CloseIcon></CloseIcon>{" "}
                  </button>

                  <div className="modalshiftcontent">
                    <form className="form-container" onSubmit={this.onSubmit2}>

                    <div className="">
                      <h6 className="e1">
                        Upload Loan Contracts (in Zip format)
                      </h6>
                      <div className="kyc-card__button-container1">
                        <div>
                        <button className="card__button" style={{
                                    position: "relative",
                                  }}>
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
                            accept="zip,application/octet-stream,application/zip,application/x-zip,application/x-zip-compressed"
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
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="modalsubmit">
                      <div className="submitbuttonbg">
                        <div className="row">
                          <div className="row justify-content-end2">
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
                            >
                              Add Now
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
                    </form>
                  </div>
                </div>
              </React.Fragment> */}
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

                  <div className="modalshiftcontent">
                    <form className="form-container" onSubmit={this.onSubmit1}>
                      <div className="input-container">
                        {/* <h6 className="e1">Document File</h6> */}
                        <label className="label">Document File</label>
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
                              >
                                {this.state.formLoader === true ? (
                                  <CircularProgress
                                    size="22px"
                                    color="primary"
                                  />
                                ) : (
                                  <span>Add</span>
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

                      {/* <div className="input-container">
                        <label className="label">Privacy Mode</label>
                        <select
                          required
                          className="input-select"
                          onChange={(e) => {
                            this.setState({
                              formData1: {
                                ...this.state.formData1,
                                privacymode: e.target.value,
                              },
                            });
                          }}
                          value={this.state.formData1.privacymode}
                        >
                          <option value="" disabled>
                            Select any one
                          </option>
                          <option value="private">Private</option>
                          <option value="public">Public</option>
                        </select>
                      </div> */}

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

          {/* <div id="modal">
                  <ReactModal
                    isOpen={this.state.open4}
                    onRequestClose={this.onCloseModal3}
                    contentLabel="Minimal Modal Example"
                    style={customStylesautosmallmodal}
                  >
                   <React.Fragment>
                      <div className="modalPopup2">
                        <h2>Map to Verfication</h2>
                        <button
                          type="button"
                          className="closePopup"
                          style={{ minWidth: "30px" }}
                          onClick={this.onCloseModal3}
                        >
                          {" "}
                          <CloseIcon></CloseIcon>{" "}
                        </button>

                        <div className="modalshiftcontent">
                          <React.Fragment>
                            <table
                              className="table text-left"
                              id="viewServicerData2"
                            >
                              <thead>
                                <tr className="tablehead">
                                  <th className="headerclass">Excel Field</th>
                                  <th className="headerclass">Standard Field</th>
                                </tr>
                              </thead>
                              <tbody>{this.renderRows()}</tbody>
                            </table>
                          </React.Fragment>
                        </div>

                        <div className="modalsubmit">
                          <div className="submitbuttonbg">
                            <div className="row">
                              <div className="row justify-content-end2">
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
                                    onClick={this.CompleteTransferPopupData}
                                  >
                                    Completed
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
                      </div>
                    </React.Fragment>
                  </ReactModal>
                </div> */}
        </div>
      </React.Fragment>
    );
  }
}

export default withSnackbar(PoolDetailsIssuer);
