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
import {
  customStylesServicer,
  customStylesautosmallmodal,
} from "../../../../components/customscripts/customscript";
import FormLoader from "../../../../components/loader/formLoader";
import {
  NextAPI,
  getDealDetailsByDealId,
  RecurringsetupDateQuery,
  RecurringsetupDateAnalyse,
  RecurringsetupUploadServicerReport,
  uploadapproach,
  PoolDetails,
  DownloadIPFSFile,
} from "../../../../servies/services";
import { FullscreenExit, TrainRounded } from "@material-ui/icons";
import {
  ThemeProvider,
  createTheme,
  MuiThemeProvider,
} from "@material-ui/core/styles";
import "react-input-range/lib/css/index.css";
import AddCircleOutlinedIcon from "@material-ui/icons/AddCircleOutlined";
import VisibilityIcon from "@material-ui/icons/Visibility";
import DownloadIcon from "@mui/icons-material/Download";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ethers } from "ethers";
import Web3 from "web3";
import NumberComp from "../../../../components/NumberComp";
import NumberComp2 from "../../../../components/NumberComp2";
import Iframe from "react-iframe";
import Logo2 from "../../../../images/wellslogored.png";

class ServicerDealDetails extends Component {
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
      open1: false,
      open2: false,
      open3: false,
      UserId: sessionStorage.getItem("userid"),
      dealId: sessionStorage.getItem("dealId"),
      token: sessionStorage.getItem("token"),
      activeInsights1: true,
      activeInsights2: false,
      activeInsights3: false,
      editpopupdetails: [],
      paymentRules: [],
      dealData: {},
      dealDocuments: [],
      showSearchBox: false,
      screenloader: false,
      poolName: sessionStorage.getItem("poolname"),
      Redirection: sessionStorage.getItem("component"),
      file: "",
      formData1: {
        documentname: "",
        description: "",
        privacymode: "",
      },
      initialSetUpApproach1: true,
      initialSetUpApproach2: false,
      initialSetUpApproach3: false,
      approach: ".xlsx",
      formLoader1: false,
      bdbUrl: "",
    };
  }

  onOpenModal2 = (e) => {
    console.log("e", e);
    this.setState({
      open3: true,
      documentDetail: e,
      formData1: {
        documentname: e.documentname,
        description: e.description,
        privacymode: e.privacymode,
      },
    });
  };
  onCloseModal2 = () => {
    this.setState({ open3: false });
  };

  handleOnChange2 = (e) => {
    this.setState({
      file: e.target.files[0],
      filename: e.target.files[0].name,
    });
  };
  onSubmit2 = (e) => {
    e.preventDefault();
    // console.log(this.state.formData1);
    this.RecurringsetupDateQuery();
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
  handleClicks = () => {
    // this.props.history.push({
    //   pathname: this.state.Redirection,
    // });
    window.location.assign("/admin/servicer_deals");
  };

  onchange = (e) => {
    this.setState({ searchText: e.target.value, searchType: true });
    console.log("search: e.target.value", e.target.value);
  };

  meta = () => {
    // Asking if metamask is already present or not
    if (window.ethereum) {
      // res[0] for fetching a first wallet
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((res) => this.newfun(res[0]));
    } else {
      alert("install metamask extension!!");
    }
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
  RecurringsetupDateQuery = async (value) => {
    var data = {};
    data.dealid = this.state.dealId;
    console.log("value", value);
    this.setState({ formLoader: true });
    data.token = this.state.token;
    const APIResponse = await RecurringsetupDateQuery(data);

    if (APIResponse.status === 200) {
      console.log("upload--", APIResponse);
      this.setState({ formLoader: true });
      this.RecurringsetupDateAnalyse(APIResponse.data);
    } else {
      this.setState({ formLoader: false });
      const message = "Something went wrong, please try again";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  RecurringsetupDateAnalyse = async (value) => {
    var data = {};
    data.dealid = this.state.dealId;
    data.input = value;
    console.log("data", data);
    this.setState({ formLoader: true });
    data.token = this.state.token;
    const APIResponse = await RecurringsetupDateAnalyse(data);

    if (APIResponse.status === 200) {
      console.log("upload--", APIResponse);
      if (APIResponse.data.isSuccess === true) {
        this.setState({ formLoader: true });

        this.RecurringsetupUploadServicerReport(APIResponse.data);
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

  RecurringsetupUploadServicerReport = async (value) => {
    console.log("uplaodlms");
    const newdata = new FormData();
    newdata.append("dealid", this.state.dealId);
    newdata.append("filename", this.state.file);
    newdata.append("month", value.month);
    newdata.append("year", value.year);
    newdata.append("functiontodo", value.functiontodo);
    newdata.append("currentpaymentdate", value.currentpaymentdate);
    newdata.append("confirmation", value.confirmation);
    newdata.append("nextpaymentdate", value.nextpaymentdate);
    newdata.append("assetclass", value.assetclass);
    newdata.append("previouspaymentdate", value.previouspaymentdate);

    console.log("newdata", newdata);
    this.setState({ formLoader: true });

    const APIResponse = await RecurringsetupUploadServicerReport(
      newdata,
      this.state.token
    );

    if (APIResponse.status === 200) {
      console.log("upload--", APIResponse);
      this.setState({ formLoader: false });
      const message = "Uploaded Successfully";
      this.props.enqueueSnackbar(message, {
        variant: "info",
        autoHideDuration: 2000,
      });
      window.location.assign("/admin/servicer_mapfields");
    } else {
      this.setState({ formLoader: false });
      const message = "Something went wrong, please try again";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 2000,
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
    // this.props.history.push("/admin/pooldetails")
    // window.location.assign("/admin/pooldetails")
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
    });
  };

  handleClickPending = () => {
    this.setState({
      activeInsights1: false,
      activeInsights2: true,
      activeInsights3: false,
    });
  };
  handleClickRejected = () => {
    this.setState({
      activeInsights1: false,
      activeInsights2: false,
      activeInsights3: true,
    });
  };

  onChangeRadio1 = (value) => {
    console.log("first one is hit");
    if (value == "Excel") {
      this.setState({
        approach: ".xlsx",
        initialSetUpApproach1: true,
        initialSetUpApproach2: false,
        initialSetUpApproach3: false,
      });
    } else if (value == "SFTP") {
      this.setState({
        approach: "SFTP",
        initialSetUpApproach1: false,
        initialSetUpApproach2: true,
        initialSetUpApproach3: false,
      });
    } else {
      this.setState({
        approach: "API",
        initialSetUpApproach1: false,
        initialSetUpApproach2: false,
        initialSetUpApproach3: true,
      });
    }
  };
  uploadapproach = async () => {
    var data = {};
    data.dealid = this.state.dealId;
    data.uploadapproach = this.state.approach;
    this.setState({ formLoader1: true });
    data.token = this.state.token;
    const APIResponse = await uploadapproach(data);

    if (APIResponse.status === 200) {
      if (APIResponse.data.success === true) {
        this.setState({ formLoader1: false });
        console.log("AllGetAllPoolsdata--", APIResponse);
        const message = "Deal upload approach Successfull";
        this.props.enqueueSnackbar(message, {
          variant: "info",
          autoHideDuration: 3000,
        });
      } else {
        this.setState({ formLoader1: false });
        const message = "Something went wrong";
        this.props.enqueueSnackbar(message, {
          variant: "error",
          autoHideDuration: 3000,
        });
      }
    } else {
      this.setState({ formLoader1: false });
      const message = "Something went wrong";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
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
                  -
                  {/* <Button variant="outlined" id="optionalbutton" type="submit" onClick={this.onOpenModal1.bind(this)}> */}
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
          <Sidebar activeComponent={"ServicerDashboardDeals"} />
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
                      <Button
                        variant="outlined"
                        color="black"
                        onClick={this.PoolDetails}
                      >
                        View Pool Details
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.onOpenModal1}
                      >
                        Set-Up
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
                        </div>
                        {/* <h3 className="headingpayment">Payment Rules</h3> */}
                      </AccordionSummary>
                      {this.state.paymentRules.length == 0 ? (
                        ""
                      ) : (
                        // <AccordionDetails>
                        //   <Typography>
                        //     <div className="bulletpoints1_container1">
                        //       <p className="bulletpoints11">
                        //         Add the data by clicking on the “Edit” button
                        //       </p>
                        //     </div>
                        //   </Typography>
                        // </AccordionDetails>
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
                        </div>
                      </AccordionSummary>

                      {this.state.dealData.dealsummary == " " ? (
                        ""
                      ) : (
                        // <AccordionDetails>
                        //   <Typography>
                        //     <div className="bulletpoints1_container1">
                        //       <p className="bulletpoints11">
                        //         Add the data by clicking on the “Edit” button
                        //       </p>
                        //     </div>
                        //   </Typography>
                        // </AccordionDetails>
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
                                    {/* {e.privacymode == 'public' ?  <PublicIcon className="lockicon"></PublicIcon>:
                              <LockIcon className="lockicon"></LockIcon>} */}
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
                                    onClick={() => this.onOpenModal2(e)}
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
                  {/* <div className="dashboard-top-right-container1">
                  
                    <button type="button" className="popupbutton2">Edit</button>
                  </div> */}
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
            {/* <Modal open={open1} onClose={this.onCloseModal1} center>
                    <div id="modalheader">
                      <h5>Create a Pool</h5>

                    </div> */}
            <ReactModal
              isOpen={this.state.open2}
              onRequestClose={this.onCloseModal1}
              contentLabel="Minimal Modal Example"
              style={customStylesServicer}
            >
              <React.Fragment>
                <div className="modalPopup2">
                  <div className="popupTitle">
                    <h2>Set-up the Deal Process</h2>
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

                  <div className="modalshiftcontent">
                    <div className="part2 servicer-modal-acc">
                      <Accordion>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <h3 className="headingpayment1">Initial Set-Up</h3>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>
                            <div className="servicer-popup-bottom-container">
                              <div className="servicer-popup-inner-container">
                                <h6 className="servicer-popup-inner-container-heading">
                                  Select the approach
                                </h6>

                                {/* first */}
                                <div className="flex-radio1">
                                  <label className="label-radio-container">
                                    <div className="servicer-set-up-popup-text-container">
                                      <h6
                                        className={
                                          this.state.initialSetUpApproach1
                                            ? "servicer-set-up-popup-text-container-heading"
                                            : "servicer-set-up-popup-text-container-heading-unchecked"
                                        }
                                      >
                                        Excel Upload
                                      </h6>
                                      <p
                                        className={
                                          this.state.initialSetUpApproach1
                                            ? "servicer-set-up-popup-text-container-para"
                                            : "servicer-set-up-popup-text-container-para-unchecked"
                                        }
                                      >
                                        LoremIpsum is simple dummy text of the
                                        printing and typesetting industry Lorem
                                        Ipsum
                                      </p>
                                    </div>
                                    <input
                                      id="servicer1"
                                      type="radio"
                                      name="servicer"
                                      onChange={() =>
                                        this.onChangeRadio1("Excel")
                                      }
                                      // value={this.state.initialSetUpApproach1}
                                      checked={this.state.initialSetUpApproach1}
                                    />
                                    <span className="checkmark"></span>
                                  </label>
                                </div>

                                {/* second */}

                                <div className="flex-radio1">
                                  <label className="label-radio-container">
                                    <div className="servicer-set-up-popup-text-container">
                                      <h6
                                        className={
                                          this.state.initialSetUpApproach2
                                            ? "servicer-set-up-popup-text-container-heading"
                                            : "servicer-set-up-popup-text-container-heading-unchecked"
                                        }
                                      >
                                        SFTP Address
                                      </h6>
                                      <p
                                        className={
                                          this.state.initialSetUpApproach2
                                            ? "servicer-set-up-popup-text-container-para"
                                            : "servicer-set-up-popup-text-container-para-unchecked"
                                        }
                                      >
                                        LoremIpsum is simple dummy text of the
                                        printing and typesetting industry Lorem
                                        Ipsum
                                      </p>
                                    </div>
                                    <input
                                      id="servicer2"
                                      type="radio"
                                      name="servicer"
                                      onChange={() =>
                                        this.onChangeRadio1("SFTP")
                                      }
                                      // value={this.state.initialSetUpApproach2}
                                      checked={this.state.initialSetUpApproach2}
                                    />
                                    <span className="checkmark"></span>
                                  </label>
                                </div>

                                {/* third */}

                                <div className="flex-radio1">
                                  <label className="label-radio-container">
                                    <div className="servicer-set-up-popup-text-container">
                                      <h6
                                        className={
                                          this.state.initialSetUpApproach3
                                            ? "servicer-set-up-popup-text-container-heading"
                                            : "servicer-set-up-popup-text-container-heading-unchecked"
                                        }
                                      >
                                        API Integration
                                      </h6>
                                      <p
                                        className={
                                          this.state.initialSetUpApproach3
                                            ? "servicer-set-up-popup-text-container-para"
                                            : "servicer-set-up-popup-text-container-para-unchecked"
                                        }
                                      >
                                        LoremIpsum is simple dummy text of the
                                        printing and typesetting industry Lorem
                                        Ipsum
                                      </p>
                                    </div>
                                    <input
                                      id="servicer1"
                                      type="radio"
                                      name="servicer"
                                      onChange={() =>
                                        this.onChangeRadio1("API")
                                      }
                                      // value={this.state.initialSetUpApproach3}
                                      checked={this.state.initialSetUpApproach3}
                                    />
                                    <span className="checkmark"></span>
                                  </label>
                                </div>

                                <div className="servicer-popup-upload-btn-contianer">
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    type="button"
                                    onClick={this.uploadapproach}
                                  >
                                    Save
                                    {this.state.formLoader1 === true ? (
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
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    </div>

                    <div className="part2 servicer-modal-acc">
                      <Accordion>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <h3 className="headingpayment1">Recurring Set-Up</h3>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>
                            <div className="">
                              <form
                                className="form-container-setup"
                                onSubmit={this.onSubmit2}
                              >
                                <div className="servicer-popup-inner-container">
                                  <h6 className="servicer-popup-inner-container-heading">
                                    Upload the file to set up the recurring
                                    process
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
                                          htmlFor="icon-button-file-id21"
                                          className="upload-button-label1"
                                        >
                                          Select File
                                        </label>
                                        <input
                                          required
                                          id="icon-button-file-id21"
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
                                    {this.state.file !== "" && (
                                      <div className="kyc-card__select_name-container">
                                        <p>{this.state.filename}</p>
                                        {/* <button type="button" onClick={handleClickCross}>
                          x
                      </button> */}
                                      </div>
                                    )}
                                  </div>
                                  <div className="servicer-popup-upload-btn-contianer">
                                    <Button
                                      variant="contained"
                                      color="primary"
                                      type="submit"
                                      // onClick={this.RecurringsetupDateQuery}
                                    >
                                      Upload
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
                              </form>
                            </div>
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    </div>
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
                      onClick={this.onCloseModal2}
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
                                onClick={this.onCloseModal2}
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

export default withSnackbar(ServicerDealDetails);
