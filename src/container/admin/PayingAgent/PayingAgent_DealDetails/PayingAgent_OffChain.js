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
import { Theme as MuiTheme } from "rjsf-material-ui";
import ReactModal from "react-modal";
import {
  customStylesauto,
  customStylesautosmallmodalpopup,
  customStylesAcceptPopup,
  customStylesautosmallmodal,
} from "../../../../components/customscripts/customscript";
import FormLoader from "../../../../components/loader/formLoader";
import {
  addDealDocument,
  updateDealDocument,
  getDealDetailsByDealId,
  PoolDetails,
  updatepaymentmode,
  getAllInvestorCommitmentsbyDealID,
  InvestOffchain,
  DownloadIPFSFile,
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
import VisibilityIcon from "@material-ui/icons/Visibility";
import { Link } from "react-router-dom";
import "react-input-range/lib/css/index.css";
import DownloadIcon from "@mui/icons-material/Download";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LockIcon from "@material-ui/icons/Lock";
import PublicIcon from "@material-ui/icons/Public";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import NumberComp from "../../../../components/NumberComp";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import NumberComp2 from "../../../../components/NumberComp2";
import Iframe from "react-iframe";
import Logo2 from "../../../../images/wellslogored.png";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import Switch from "@material-ui/core/Switch";

class PayingAgent_OffChain extends Component {
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
      screenloader: false,
      searchText: "",
      rowsSelected: null,
      open1: false,
      open2: false,
      open3: false,
      open4: false,
      open5: false,
      formData: {
        documentname: "",
        description: "",
        privacymode: "",
      },
      formData1: {
        documentname: "",
        description: "",
        privacymode: "",
      },
      togglepayment: false,
      togglestate: false,
      file1: "",
      file2: "",
      UserId: sessionStorage.getItem("userid"),
      dealId: sessionStorage.getItem("dealId"),
      token: sessionStorage.getItem("token"),
      poolName: sessionStorage.getItem("poolname"),
      Redirection: sessionStorage.getItem("component"),
      userrole: sessionStorage.getItem("userrole"),
      activeInsights1: true,
      activeInsights2: false,
      activeInsights3: false,
      showSearchBox: false,
      editpopupdetails: [],
      paymentRules: [],
      dealData: {},
      dealDocuments: [],
      bdbUrl: "",
      PayingOffChain: [],
    };
  }

  // setdata=() =>{
  //   this.setState({
  //     formData1: {
  //       ...this.state.formData1,
  //       documentname: 'uytrdesw',
  //     },
  //   })
  // }
  handleChange = (e) => {
    // togglevat
    if (this.state.togglepayment == false) {
      this.setState({ togglepayment: true });
    } else {
      this.setState({ togglepayment: false });
    }
  };

  handleChangeState = (e) => {
    // togglevat
    if (this.state.togglestate == false) {
      this.setState({ togglestate: true });
    } else {
      this.setState({ togglestate: false });
    }
  };

  popoverBottom = (e) => {
    return (
      <Popover id="popover-positioned-bottom" className="popover-container">
        <button>View</button>
        <hr className="popover-hr" />
        <button onClick={() => this.onOpenModal1(e)}>Edit</button>
        <hr className="popover-hr" />
        <button>Delete</button>
      </Popover>
    );
  };
  popoverBottom1 = () => {
    return (
      <Popover className="servicer-popover-container">
        <button onClick={() => this.PoolDetails()}>View Pool Details</button>
        <hr className="servicer-popover-hr" />
        <button onClick={() => this.Redirect()}>View Account Details</button>
        <hr className="servicer-popover-hr" />
        <button onClick={() => this.onOpenModal2()}>
          View General Settings
        </button>
        {/* {this.state.dealData.paymentmode == "offchain" ?
        <button onClick={() => this.Redirect()}>Accounts</button>:
        <button disabled>Accounts</button>} */}
      </Popover>
    );
  };

  Redirect = () => {
    this.props.history.push({
      pathname: "/admin/account",
    });
  };

  onOpenModal = () => {
    console.log("inside modal1");
    this.setState({ open1: true });
  };
  onOpenModal1 = (e) => {
    console.log("e", e);
    console.log("inside modal1");
    this.setState({
      open2: true,
      documentDetail: e,
      formData1: {
        documentname: e.documentname,
        description: e.description,
        privacymode: e.privacymode,
      },
    });
  };
  onOpenModal2 = () => {
    console.log("general modal1");
    this.setState({ open3: true });
  };

  onOpenModal3 = () => {
    console.log("issue fts");
    this.setState({ open4: true });
  };

  onOpenModal4 = (e) => {
    console.log("e", e);
    this.setState({
      open5: true,
      documentDetail: e,
      formData1: {
        documentname: e.documentname,
        description: e.description,
        privacymode: e.privacymode,
      },
    });
  };
  onCloseModal4 = () => {
    this.setState({ open5: false });
  };

  onCloseModal = () => {
    this.setState({
      open1: false,
      file1: "",
      formData: {
        documentname: "",
        description: "",
        privacymode: "",
      },
    });
  };
  onCloseModal1 = () => {
    this.setState({
      open2: false,
      formData1: {
        documentname: "Washington top MNCs",
        description: "It will help us to verify the sources",
        privacymode: "Private",
      },
    });
  };

  onCloseModal2 = () => {
    this.setState({ open3: false });
  };
  onCloseModal3 = () => {
    this.setState({ open4: false });
  };

  onSubmit1 = (e) => {
    e.preventDefault();
    console.log(this.state.formData);
    this.addDealDocument();
    console.log("hello we have clicked the button");
  };
  onSubmit2 = (e) => {
    e.preventDefault();
    console.log(this.state.formData1);
    this.updateDealDocument();
    console.log("hello we have clicked the button");
  };

  onSubmit3 = (e) => {
    e.preventDefault();
    console.log(this.state.togglepayment, this.state.togglestate);
    this.updatepaymentmode();
  };

  handleOnChange1 = (e) => {
    this.setState({
      file1: e.target.files[0],
      filename1: e.target.files[0].name,
    });
    console.log("eeee", e.target.files[0].name);
    console.log("file1", e.target.files[0]);
  };

  async selectedpoolid(selected) {
    const arr = [];

    for (var i = 0; i < selected.length; i++) {
      var j = selected[i];
      let PoolID = this.state.tableData[j];
      arr.push(PoolID);
    }
    console.log("selected Loans", arr);
    sessionStorage.setItem("rundd", JSON.stringify(arr));
  }

  addDealDocument = async () => {
    const newdata = new FormData();
    newdata.append("filename", this.state.file1);
    newdata.append("dealid", this.state.dealId);
    newdata.append("underwriterid", this.state.UserId);
    newdata.append("docname", this.state.formData.documentname);
    newdata.append("description", this.state.formData.description);
    newdata.append("privacymode", this.state.formData.privacymode);

    console.log("newdata", JSON.stringify(newdata));

    this.setState({ formLoader: true });

    const APIResponse = await addDealDocument(newdata, this.state.token);

    if (APIResponse.status === 200) {
      this.setState({ formLoader: false });

      const message = "Deal Upload Update Success";
      this.props.enqueueSnackbar(message, {
        variant: "info",
        autoHideDuration: 3000,
      });

      this.onCloseModal();
      this.getDealDetailsByDealId();
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
    data.docname = this.state.formData1.documentname;
    data.description = this.state.formData1.description;
    data.privacymode = this.state.formData1.privacymode;

    console.log("datata", data);
    this.setState({ formLoader: true });
    data.token = this.state.token;
    const APIResponse = await updateDealDocument(data);

    if (APIResponse.status === 200) {
      this.setState({ formLoader: false });
      const message = "Deal Document Update Success";
      this.props.enqueueSnackbar(message, {
        variant: "info",
        autoHideDuration: 3000,
      });
      this.onCloseModal1();
      this.getDealDetailsByDealId();
    } else {
      this.setState({ formLoader: false });
      const message = "Couldn't create the deal";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };
  downloadDealTemplate = async () => {
    let url =
      "http://165.227.5.156:8080/ipfs/QmfC72NfTMyTDNTk9SNCF6AsGeL9Y9h7zYs5zgzZEZwj7A";

    // const APIResponse = await downloadDealTemplate();
    const file_name = "Structuring Template" + ".xls";

    startDownload(url);
    function startDownload(link) {
      var element = document.createElement("a");
      element.setAttribute("href", link);

      element.style.display = "none";
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
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
  handleClicks = () => {
    // this.props.history.push({
    //   pathname: this.state.Redirection,
    // });
    window.location.assign("/admin/payingagent_deals");
  };
  getDealDetailsByDealId = async () => {
    var data = {};
    data.dealid = this.state.dealId;
    data.userid = this.state.UserId;
    console.log("datata", data);
    this.setState({ screenloader: true });
    data.token = this.state.token;
    const APIResponse = await getDealDetailsByDealId(data);

    if (APIResponse.status === 200) {
      this.setState({
        screenloader: false,
        dealData: APIResponse.data.dealData,
        tableData: APIResponse.data.trancheData,
        paymentRules: APIResponse.data.paymentRules,
        dealDocuments: APIResponse.data.dealDocuments,
        togglepayment:
          APIResponse.data.dealData.paymentmode == "offchain" ? false : true,
        togglestate:
          APIResponse.data.dealData.commitORinvest == "commit" ? false : true,
      });
      sessionStorage.setItem(
        "paymentmode",
        APIResponse.data.dealData.paymentmode
      );
      const message = "Deal Document Update Success";
      this.props.enqueueSnackbar(message, {
        variant: "info",
        autoHideDuration: 3000,
      });
    } else {
      this.setState({ screenloader: false });

      const message = "Couldn't create the deal";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  PoolDetails = async () => {
    // var data = {}
    // data.contractaddress = "0xFD6380543eDc62EB255746DED6b7d39baAa414a1"
    // data.poolid = this.state.dealId
    // data.token = this.state.token
    // console.log('formdata',data)
    // this.setState({getLoansLoader: true});
    // const APIResponse = await PoolDetails(data)

    // if (APIResponse.status === 200) {
    //   console.log('AllGetAllPoolsdata--', APIResponse);
    //   sessionStorage.setItem("pooldetailsdata", JSON.stringify(APIResponse.data))
    this.props.history.push("/admin/pooldetails");
    // } else {
    //   const message = "Couldn't fetch the record";
    //   this.props.enqueueSnackbar(message, {
    //     variant: 'error',
    //     autoHideDuration: 3000,
    //   });
    // }
  };

  bdbapi = async () => {
    let poolidold = JSON.stringify({
      DealID: {
        type: "in",
        value: [this.state.dealId],
      },
    });
    console.log("poolidold", poolidold);

    let mailid = "support@bdb.ai";
    let password = "Intain@321";
    const res = await axios.get(
      "https://bdb.imtest.intainmarkets.us/api/v1/imarkets/link?type=" +
        "preclosing" +
        "&mailid=" +
        mailid +
        "&password=" +
        password
    );
    if (res.status == 204) {
      this.setState({ bdbUrl: "UrlBdbNew", bdb_loader: false });
    } else {
      let UrlBdbNew =
        "https://analytics.intainmarkets.us/home/#/opendocument?data=" +
        res.data +
        "&customGlobalFilter=" +
        encodeURIComponent(poolidold);
      this.setState({ bdbUrl: UrlBdbNew, bdb_loader: false });
    }
  };

  updatepaymentmode = async () => {
    var data = {
      dealid: this.state.dealId,
      paymentmode: this.state.togglepayment == false ? "offchain" : "onchain",
      commitORinvest: this.state.togglestate == false ? "commit" : "invest",
      token: this.state.token,
    };
    console.log("datata", data);
    this.setState({ formLoader: true });
    const APIResponse = await updatepaymentmode(data);

    if (APIResponse.status === 200) {
      this.setState({ formLoader: false });
      // const message = "Deal Update PaymentMode Success"
      // this.props.enqueueSnackbar(message, {
      //   variant: "info",
      //   autoHideDuration: 3000,
      // });
      this.onCloseModal2();
      this.getDealDetailsByDealId();
    } else {
      this.setState({ formLoader: false });
      const message = "Something went wrong";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };
  getAllInvestorCommitmentsbyDealID = async () => {
    var data = {
      dealid: this.state.dealId,
      token: this.state.token,
    };
    console.log("datata", data);
    const APIResponse = await getAllInvestorCommitmentsbyDealID(data);

    if (APIResponse.status === 200) {
      this.setState({ PayingOffChain: APIResponse.data });
    } else {
      const message = "Something went wrong";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  InvestOffchain = async () => {
    var data = {};
    data.dealid = this.state.dealId;
    data.token = this.state.token;
    console.log("datata", data);
    this.setState({ formLoader: true });

    const APIResponse = await InvestOffchain(data);

    if (APIResponse.status === 200) {
      this.setState({ formLoader: false });
      const message = "Invest Success";
      this.props.enqueueSnackbar(message, {
        variant: "info",
        autoHideDuration: 3000,
      });
      this.onCloseModal3();
    } else {
      this.setState({ formLoader: false });
      const message = "Something went wrong";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };
  DownloadIPFSFile = async (e) => {
    let filetype = e.filetype.split(".");
    let path = e.documentpath;
    console.log("filetype", filetype[1], path);
    if (filetype[1] === "pdf") {
      let data = {};
      data.documentid = e.documentid;
      data.token = this.state.token;
      const APIResponse = await DownloadIPFSFile(data, filetype[1]);
      const file_name = e.filetype;
      const token = this.state.token;
      console.log("token", token);
      startDownload(APIResponse.data, file_name);
      console.log("APIResponse", APIResponse.data);
      function startDownload(file, file_name) {
        let data = new Buffer.from(file);
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
      const APIResponse = await DownloadIPFSFile(data, filetype[1]);
      const file_name = e.filetype;
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
    this.getDealDetailsByDealId();
    this.getAllInvestorCommitmentsbyDealID();
    this.bdbapi();
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
              backgroundColor: "#FAFAFA !important",
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
        MUIDataTableBody: {
          emptyTitle: {
            fontSize: "15px !important",
            fontFamily: "Mulish, sans-serif !important",
            color: "#8C8C8C !important",
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
              <Loader msg={"Please wait, Loading Loan Data"} />
            ) : (
              'Add the data by clicking on the "Edit" button'
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
        name: "trancheId",
        label: "Tranche ID",
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
        name: "trancheName",
        label: "Tranche Name",
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
        name: "creditEnhancement",
        label: "Credit Enhancement",
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
                <div className="text-center">{value + "%"}</div>
              </React.Fragment>
            );
          },
        },
      },
      {
        name: "pricipalBalance",
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
        name: "interestRate",
        label: "Interest Rate",
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
        name: "investedAmount",
        label: "Invested Amount",
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
        name: "trancheId",
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
                  <buton className="login-sign_up-links">-</buton>
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
          <Sidebar activeComponent={"UW_Dashboard_Pools"} />
          <div className="content1">
            {this.state.screenloader == true ? (
              <LinearLoader></LinearLoader>
            ) : (
              <div className="page-contentofpool1">
                <div className="row1">
                  <div className="col-12 col-sm-6 col-md-8 d-flex justigy-content-center align-center hellocard">
                    <KeyboardBackspaceIcon
                      onClick={this.handleClicks}
                      className="left-arrow-muis1 left-arrow-servicer"
                    ></KeyboardBackspaceIcon>
                    <h3 className="headerdashboard">Deal Details</h3>
                  </div>
                  <div className="col-12 col-sm-6 col-md-4 hellocard">
                    <div className="buttonsverified uw-deal-details-button-container">
                      <OverlayTrigger
                        rootClose
                        trigger="click"
                        placement="bottom"
                        overlay={this.popoverBottom1()}
                      >
                        <Button
                          variant="outlined"
                          onClick={() =>
                            this.setState((prevState) => ({
                              downArrow: !prevState.downArrow,
                            }))
                          }
                        >
                          More{" "}
                          {this.state.downArrow ? (
                            <ArrowDropDownIcon />
                          ) : (
                            <ArrowDropUpIcon />
                          )}
                        </Button>
                      </OverlayTrigger>
                      {/* <Button variant="outlined" color="black" onClick={this.PoolDetails}>
                    View Pool Details
                  </Button> */}
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.onOpenModal3}
                      >
                        Issue FTs
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="abovepart1">
                  <div className="part1">
                    <Accordion defaultExpanded={true}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <div className="editcontainer1">
                          <h5 className="headingpayment">Payment Rules</h5>
                          <Link className="login-sign_up-link">Edit</Link>
                        </div>
                        {/* <h3 className="headingpayment">Payment Rules</h3> */}
                      </AccordionSummary>
                      {this.state.paymentRules.length == 0 ? (
                        <AccordionDetails>
                          <Typography>
                            <div className="bulletpoints1_container1">
                              <p className="bulletpoints11">
                                Add the data by clicking on the “Edit” button
                              </p>
                            </div>
                          </Typography>
                        </AccordionDetails>
                      ) : (
                        <AccordionDetails>
                          <Typography>
                            <ul className="bulletpoints">
                              {this.state.paymentRules.map((e) => {
                                return <li>{e.paymentRule}</li>;
                              })}
                            </ul>
                          </Typography>
                        </AccordionDetails>
                      )}
                    </Accordion>
                  </div>
                  <div className="part2">
                    <Accordion defaultExpanded={true}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <div className="editcontainer1">
                          <h5 className="headingpayment">Summary</h5>
                          <Link to={""} className="login-sign_up-link">
                            Edit
                          </Link>
                        </div>
                      </AccordionSummary>

                      {this.state.dealData.dealsummary == " " ? (
                        <AccordionDetails>
                          <Typography>
                            <div className="bulletpoints1_container1">
                              <p className="bulletpoints11">
                                Add the data by clicking on the “Edit” button
                              </p>
                            </div>
                          </Typography>
                        </AccordionDetails>
                      ) : (
                        <AccordionDetails>
                          <Typography>
                            <div className="bulletpoints1_container1">
                              <div className="rowdealsummary">
                                <img
                                  src={
                                    process.env.react_app_base_url +
                                    "root_folder/" +
                                    this.state.dealData.logo
                                  }
                                  alt="logo"
                                  className="wellslogodeal"
                                />

                                <p className="bulletpoints11-black-1">
                                  {this.state.dealData.dealsummary}
                                </p>
                              </div>
                            </div>
                          </Typography>
                        </AccordionDetails>
                      )}
                    </Accordion>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12 col-sm-6 col-md-4">
                    <div className="page-content3 documents-section">
                      <div className="editcontainer">
                        <h5 className="headingspace">
                          Documents ({this.state.dealDocuments?.length})
                        </h5>
                        {/* <button
                      type="button"
                      onClick={this.onOpenModal.bind(this)}
                      className="login-sign_up-linksadd"
                    >
                      Add
                    </button> */}
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
                                    {e.privacymode == "public" ? (
                                      <PublicIcon className="lockicon"></PublicIcon>
                                    ) : (
                                      <LockIcon className="lockicon"></LockIcon>
                                    )}
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
                                  <VisibilityIcon
                                    type="button"
                                    onClick={() => this.onOpenModal4(e)}
                                    className="eye-btn1"
                                  ></VisibilityIcon>
                                  {/* <button onClick={this.setdata}> */}
                                  {/* <OverlayTrigger
                            rootClose
                            trigger="click"
                            placement="bottom"
                            overlay={this.popoverBottom(e)}
                          >
                            <MoreVertIcon className="eye-btn1" />
                          </OverlayTrigger> */}
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

                  <div className="col-12 col-sm-6 col-md-8">
                    <div className="page-content3 basic-details-container">
                      <div className="editcontainer">
                        <h5 className="headingspace">Basic Details</h5>
                        <Link to={""} className="login-sign_up-link">
                          Edit
                        </Link>
                      </div>
                      {/* <h5 className="headingspace">Basic Details</h5> */}
                      <div className="row">
                        <div className="col">
                          <div className="headingspaces1">
                            <p className="sizeofp">Deal Name</p>
                            <h6 className="headingspace1">
                              {this.state.dealData.dealName}
                            </h6>
                          </div>
                          <div className="headingspaces1">
                            <p className="sizeofp">Asset Class</p>
                            <h6 className="headingspace1">
                              {" "}
                              {this.state.dealData.assetclass}
                            </h6>
                          </div>
                          <div className="headingspaces1">
                            <p className="sizeofp">Closing Date</p>
                            <h6 className="headingspace1">
                              {this.state.dealData.closingDate}
                            </h6>
                          </div>
                          <div className="headingspaces1">
                            <p className="sizeofp">Maturity Date</p>
                            <h6 className="headingspace1">
                              {this.state.dealData.maturityDate}
                            </h6>
                          </div>
                        </div>

                        <div className="col">
                          <div className="headingspaces1">
                            <p className="sizeofp">Status</p>
                            <h6 className="headingspace1">
                              {this.state.dealData.status}
                            </h6>
                          </div>
                          <div className="headingspaces1">
                            <p className="sizeofp">
                              Pool Original Principal Balance
                            </p>
                            <h6 className="headingspace1">
                              <NumberComp
                                value={this.state.dealData.originalbalance}
                              ></NumberComp>
                            </h6>
                          </div>
                          <div className="headingspaces1">
                            <p className="sizeofp">1st Payment Date</p>
                            <h6 className="headingspace1">
                              {this.state.dealData.firstPaymentDate}
                            </h6>
                          </div>
                          <div className="headingspaces1">
                            <p className="sizeofp">Payment Frequency</p>
                            <h6 className="headingspace1">
                              {this.state.dealData.paymentFrequency}
                            </h6>
                          </div>
                        </div>

                        <div className="col">
                          <div className="headingspaces1">
                            <p className="sizeofp">Verification Agent</p>
                            <h6 className="headingspace1">
                              {this.state.dealData.VAUserName}
                            </h6>
                          </div>
                          <div className="headingspaces1">
                            <p className="sizeofp">Servicer</p>
                            <h6 className="headingspace1">
                              {this.state.dealData.ServicerUserName}
                            </h6>
                          </div>
                          <div className="headingspaces1">
                            <p className="sizeofp">Underwriter</p>
                            <h6 className="headingspace1">
                              {this.state.dealData.UnderWriterUserName}
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row graphs-container">
                  <React.Fragment>
                    <Iframe
                      // allowtransparency="true"
                      // frameborder="0"
                      // style="background: #FFFFFF;"
                      url={this.state.bdbUrl}
                      // url={pdffile}
                      width="100%"
                      height="450px"
                      id="myId"
                      className="bdb-charts"
                      display="initial"
                      position="relative"
                    />
                  </React.Fragment>
                </div>

                <div className="row row1">
                  <div>
                    {this.state.showSearchBox == true ? (
                      this.searchBar()
                    ) : (
                      <h1 className="headerdashboard1">Tranches</h1>
                    )}
                  </div>
                  <div className="dashboard-top-right-container1">
                    <button type="button" className="popupbutton2">
                      Edit
                    </button>
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
            )}
          </div>

          <div id="modal">
            <ReactModal
              isOpen={this.state.open1}
              onRequestClose={this.onCloseModal}
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
                      onClick={this.onCloseModal}
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

                      <div className="input-container">
                        <label className="label">Privacy Mode</label>
                        <select
                          required
                          className="input-select"
                          onChange={(e) => {
                            this.setState({
                              formData: {
                                ...this.state.formData,
                                privacymode: e.target.value,
                              },
                            });
                          }}
                          value={this.state.formData.privacymode}
                        >
                          <option value="" disabled>
                            Select any one
                          </option>
                          <option value="private">Private</option>
                          <option value="public">Public</option>
                        </select>
                      </div>

                      <div className="modalsubmit">
                        <div className="submitbuttonbg">
                          <div className="row">
                            <div className="row justify-content-addedit">
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

                    {/* {this.state.getLoansLoader === false ? '' : <FormLoader></FormLoader>} */}
                    {/* {this.state.openPopup === true ? <React.Fragment><Snackbar msg={"Processor addded Successfully" || this.state.message} open="true" /> </React.Fragment> : ' '} */}
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
                      onClick={this.onCloseModal1}
                    >
                      {" "}
                      <CloseIcon></CloseIcon>{" "}
                    </button>
                  </div>

                  {/* {this.state.popupLoader === true ? <CircularProgress size="30px" color="secondary" /> : ' '} */}

                  <div className="modalshiftcontent">
                    <form className="form-container" onSubmit={this.onSubmit2}>
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

                      <div className="input-container">
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
                      </div>

                      <div className="modalsubmit">
                        <div className="submitbuttonbg">
                          <div className="row">
                            <div className="row justify-content-addedit">
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
              isOpen={this.state.open3}
              onRequestClose={this.onCloseModal2}
              contentLabel="Minimal Modal Example"
              style={customStylesautosmallmodalpopup}
            >
              <React.Fragment>
                <div className="modalPopup2">
                  <h2>Payment Mode Selection</h2>

                  <div className="modalshiftcontent">
                    <form className="form-container" onSubmit={this.onSubmit3}>
                      <div className="radio-input-container">
                        <p className="headinggeneral">
                          Select Transaction Type
                        </p>
                        <div className="radio1-container">
                          <p>Off-Chain</p>
                          <Switch
                            disabled={
                              this.state.userrole == "Paying Agent"
                                ? true
                                : false
                            }
                            checked={this.state.togglepayment}
                            onChange={this.handleChange}
                            name="togglevat"
                            inputProps={{ "aria-label": "secondary checkbox" }}
                          />
                          <p>On-Chain</p>
                        </div>
                      </div>

                      <div className="radio-input-container">
                        <p className="headinggeneral">Select State</p>
                        <div className="radio1-container">
                          <p>Commitment State</p>
                          <Switch
                            disabled={
                              this.state.userrole == "Paying Agent"
                                ? true
                                : false
                            }
                            checked={this.state.togglestate}
                            onChange={this.handleChangeState}
                            name="togglevat"
                            inputProps={{ "aria-label": "secondary checkbox" }}
                          />
                          <p>Investment State</p>
                        </div>
                      </div>

                      <div className="modalsubmit">
                        <div className="submitbuttonbg">
                          <div className="row">
                            <div className="row justify-content-addedit">
                              <button
                                type="button"
                                className="popupbutton22"
                                onClick={this.onCloseModal2}
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
              isOpen={this.state.open4}
              onRequestClose={this.onCloseModal3}
              contentLabel="Minimal Modal Example"
              style={customStylesAcceptPopup}
            >
              <React.Fragment>
                <div className="modalPopup2">
                  <div className="popupTitle">
                    <h2>Issue Fungible Tokens</h2>
                    <button
                      type="button"
                      className="closePopup"
                      style={{ minWidth: "30px" }}
                      onClick={this.onCloseModal3}
                    >
                      {" "}
                      <CloseIcon></CloseIcon>{" "}
                    </button>
                  </div>

                  <div className="modalshiftcontent">
                    <ul>
                      <li className="t-flex-container">
                        <div className="td-first">
                          <p>Investor Name</p>
                        </div>
                        <div className="td-second">
                          <p>Amount</p>
                        </div>
                      </li>
                      {this.state.PayingOffChain.map((element) => (
                        <li
                          className="t-flex-container"
                          key={element.trancheid}
                        >
                          <div className="td-first">
                            <p className="t-name">{element.investorname}</p>
                          </div>
                          <div className="td-second">
                            <p className="t-name">{element.commitamount}</p>
                          </div>
                        </li>
                      ))}
                    </ul>

                    <p>Note:</p>
                    <ul className="issueftshift">
                      <li>
                        Each tranche in this deal is represented by Fungible
                        Tokens (FTs) that are currently held in the Issuer’s
                        Subnet Wallet.
                      </li>
                      <li>
                        When you click Approve, FTs will be distributed from the
                        Issuer’s Subnet Wallet to each Investor’s Subnet Wallet
                        in accordance with his investment.
                      </li>
                      <li>
                        Please ensure that Investor funds have settled in your
                        Account(s) prior to approving this step.
                      </li>
                    </ul>
                  </div>

                  <div className="modalshiftcontent">
                    <div className="accept_pop-button-container">
                      <button
                        className="pa_popup-reject-btn"
                        onClick={this.onCloseModal3}
                      >
                        Cancel
                      </button>
                      <Button
                        variant="contained"
                        color="primary"
                        type="button"
                        onClick={this.InvestOffchain}
                      >
                        {" "}
                        Approve
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

          <div id="modal">
            <ReactModal
              isOpen={this.state.open5}
              onRequestClose={this.onCloseModal4}
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
                      onClick={this.onCloseModal4}
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
                        <div className="headingspaces1">
                          <p className="sizeofp">Privacy Mode</p>
                          <h6 className="headingspace1">
                            {this.state.formData1.privacymode}
                          </h6>
                        </div>
                      </div>

                      <div className="modalsubmit">
                        <div className="submitbuttonbg">
                          <div className="row">
                            <div className="row justify-content-addedit1">
                              <button
                                type="button"
                                className="popupbutton22"
                                onClick={this.onCloseModal4}
                              >
                                {" "}
                                Cancel{" "}
                              </button>
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

export default withSnackbar(PayingAgent_OffChain);
