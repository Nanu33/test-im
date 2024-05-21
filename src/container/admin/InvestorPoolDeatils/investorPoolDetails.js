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
import { customStylesautosmallmodal } from "../../../components/customscripts/customscript";
import FormLoader from "../../../components/loader/formLoader";
import {
  NextAPI,
  RecurringsetupDateQuery,
  getPreviousDealDetails,
  getDealDetailsbyDealIdPostClosing,
  PoolDetails,
  getDealDetailsbyInvIdPostClosing,
  DownloadIPFSFile,
} from "../../../servies/services";
import { FullscreenExit, TrainRounded } from "@material-ui/icons";
import {
  ThemeProvider,
  createTheme,
  MuiThemeProvider,
} from "@material-ui/core/styles";
import "react-input-range/lib/css/index.css";
import VisibilityIcon from "@material-ui/icons/Visibility";
import DownloadIcon from "@mui/icons-material/Download";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ethers } from "ethers";
import Web3 from "web3";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import NumberComp from "../../../components/NumberComp";
import NumberComp2 from "../../../components/NumberComp2";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import Iframe from "react-iframe";
import Logo2 from "../../../images/wellslogored.png";

const piedata = [
  { name: "Group A", value: 200 },
  { name: "Group B", value: 500 },
  { name: "Group C", value: 200 },
];
const COLORS = ["#FFC000", "#AE2E2E", "#169414"];

const piedata1 = [
  { name: "Group A", value: 500 },
  { name: "Group B", value: 200 },
];
const COLORS1 = ["#FFC000", "#169414"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
const token = sessionStorage.getItem("token");

const data = [
  {
    name: "2015",
    uv: 4000,
    pv: 8400,
    amt: 8400,
  },
  {
    name: "2016",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "2017",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "2018",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "2019",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "2020",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "2021",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "2022",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const curvedata = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

class InvestorPoolDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      downArrow: true,
      selectedRecords: [],
      eligibleloans: {},
      tableData: [],
      myInvestments: [],
      loading: false,
      getLoansLoader: false,
      open: false,
      openPopup: false,
      selectedLoanId: [],
      searchText: "",
      rowsSelected: null,
      open1: false,
      open2: false,
      formData: {
        date: "",
      },
      formData1: {
        documentname: "",
        description: "",
        privacymode: "",
      },
      poolName: sessionStorage.getItem("poolname"),
      dealId: sessionStorage.getItem("dealId"),
      Redirection: sessionStorage.getItem("component"),
      UserId: sessionStorage.getItem("userid"),
      token: sessionStorage.getItem("token"),

      activeInsights1: true,
      activeInsights2: false,
      activeInsights3: false,
      showSearchBox: false,
      file: "",
      initialSetUpApproach1: true,
      initialSetUpApproach2: false,
      initialSetUpApproach3: false,
      editpopupdetails: [],
      paymentRules: [],
      dealData: {},
      importantDetails: {},
      poolCollections: {},
      loanData: [],
      servicerData: {},
      dealDocuments: [],
      screenloader: true,
      bdbUrl: "",
    };
  }
  onSubmit1 = (e) => {
    e.preventDefault();
    console.log(this.state.formData);
    console.log("hello we have clicked the button");
    this.SubmitDate();
    // this.setState({ formData: value.formData })
  };
  onOpenModal = () => {
    console.log("inside modal1");
    this.setState({ open1: true });
  };
  onOpenModal1 = (e) => {
    console.log("e", e);
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
  onCloseModal1 = () => {
    this.setState({ open2: false });
  };
  onCloseModal = () => {
    this.setState({ open1: false });
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
    console.log("hello we have clicked the button");
    window.location.assign("/admin/investorportfolio");
    // this.props.history.push({
    //   pathname: this.state.Redirection,
    // });
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

  getPreviousDealDetails = async () => {
    var data = {};
    data.dealid = this.state.dealId;
    this.setState({ formLoader: true });
    data.token = this.state.token;
    const APIResponse = await getPreviousDealDetails(data);

    if (APIResponse.status === 200) {
      this.setState({ formLoader: false, DateFilter: APIResponse.data });
      // const message = "Successfully saved";
      // this.props.enqueueSnackbar(message, {
      //   variant: "info",
      //   autoHideDuration: 2000,
      // });
      console.log("upload--", APIResponse);
    } else {
      this.setState({ formLoader: false });
      const message = "Something went wrong, please try again";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  RecurringsetupDateQuery = async (value) => {
    var data = {};
    data.dealid = this.state.dealId;
    console.log("value", value);
    this.setState({ screenloader: true });
    data.token = this.state.token;
    const APIResponse = await RecurringsetupDateQuery(data);

    if (APIResponse.status === 200) {
      if (APIResponse.data.length == 0) {
        console.log("RecurringsetupDateQuery--", APIResponse.data);
        this.setState({
          screenloader: false,
          month: APIResponse.data[0].month,
          year: APIResponse.data[0].year,
        });
      } else {
        this.setState({
          screenloader: true,
          month: APIResponse.data[0].month,
          year: APIResponse.data[0].year,
        });
        this.getDealDetailsbyInvIdPostClosing();
        this.bdbapi();
      }
    } else {
      this.setState({ screenloader: false });
      const message = "Something went wrong, please try again";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  getDealDetailsbyInvIdPostClosing = async () => {
    var data = {};
    data.dealid = this.state.dealId;
    data.month = this.state.month;
    data.year = this.state.year;
    data.investorid = this.state.UserId;
    console.log("datata", data);
    this.setState({ screenloader: true, open1: false });
    data.token = this.state.token;
    const APIResponse = await getDealDetailsbyInvIdPostClosing(data);

    if (APIResponse.status === 200) {
      this.setState({
        screenloader: false,
        importantDetails: APIResponse.data.importantDetails,
        poolCollections: APIResponse.data.poolCollections,
        loanData: APIResponse.data.loanData,
        servicerData: APIResponse.data.servicerData,
        dealData: APIResponse.data.dealData,
        tableData: APIResponse.data.trancheData,
        paymentRules: APIResponse.data.paymentRules,
        dealDocuments: APIResponse.data.dealDocuments,
        myInvestments: APIResponse.data.myInvestments,
      });
      sessionStorage.setItem(
        "paymentmode",
        APIResponse.data.dealData.paymentmode
      );
      console.log("servicerData", APIResponse.data.servicerData);
      // const message = "Deal Document Update Success";
      // this.props.enqueueSnackbar(message, {
      //   variant: "info",
      //   autoHideDuration: 3000,
      // });
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
    // var data = {};
    // data.contractaddress = "0xFD6380543eDc62EB255746DED6b7d39baAa414a1"
    // data.poolid = this.state.dealId;
    // data.token = this.state.token;
    // console.log("formdata", data);
    // this.setState({getLoansLoader: true});
    // const APIResponse = await PoolDetails(data);

    // if (APIResponse.status === 200) {
    //   console.log("AllGetAllPoolsdata--", APIResponse);
    //   sessionStorage.setItem(
    //     "pooldetailsdata",
    //     JSON.stringify(APIResponse.data)
    //   );
    // this.props.history.push("/admin/investorPreviewPooldetails");
    window.location.assign("/admin/investorPreviewPooldetails");
    // } else {
    //   const message = "Couldn't fetch the record";
    //   this.props.enqueueSnackbar(message, {
    //     variant: "error",
    //     autoHideDuration: 3000,
    //   });
    // }
  };
  SubmitDate = () => {
    console.log("submitdate", this.state.formData.date);
    let selectdate = this.state.formData.date;
    let month = selectdate.slice(0, 2);
    let year = selectdate.slice(6, 10);
    console.log("date", year, month);
    this.setState({ month: month, year: year });
    this.getDealDetailsbyInvIdPostClosing();
  };

  bdbapi = async () => {
    let poolidold = JSON.stringify({
      DealID: {
        type: "in",
        value: [this.state.dealId],
      },
      Month: {
        type: "in",
        value: [this.state.month],
      },
      Year: {
        type: "in",
        value: [this.state.year],
      },
    });
    console.log("poolidold", poolidold);
    let mailid = "support@bdb.ai";
    let password = "Intain@321";
    const res = await axios.get(
      "https://bdb.imtest.intainmarkets.us/api/v1/imarkets/link?type=" +
        "postclosing" +
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
    this.RecurringsetupDateQuery();
    this.getPreviousDealDetails();
    var component = window.location.pathname;
    sessionStorage.setItem("component", component);
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

  popoverBottom = () => {
    return (
      <Popover className="servicer-popover-container">
        <button onClick={() => this.PoolDetails()}>View Pool Details</button>
        <hr className="servicer-popover-hr" />
        <button onClick={() => this.onOpenModal()}>
          View Previous Deal Details
        </button>
      </Popover>
    );
  };
  fistTableData = (tableData) => {
    if (tableData == undefined) {
      return <div></div>;
    } else {
      console.log("tableData", tableData);
      const headingArr = Object.keys(tableData[0]);
      console.log(tableData);
      return (
        <table className="table-servicer">
          <tr>
            {headingArr.map((heading) => (
              <th className="servicer-data-table-heading">{heading}</th>
            ))}
          </tr>
          {tableData.map((data) => (
            <tr>
              {headingArr.map((element) => (
                <td>
                  {element == "Balance" ? (
                    <NumberComp2 value={data[element]}></NumberComp2>
                  ) : (
                    data[element]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </table>
      );
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
              <Loader msg={"Please wait, Loading Tranche Data"} />
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
    const options1 = {
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
      pagination: false,

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
              <Loader msg={"Please wait, Loading Tranche Data"} />
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
      },
    };

    const columns = [
      {
        name: "Tranche ID",
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
          // customBodyRender: (value, tableMeta, updateValue) => {
          //   return (
          //     <React.Fragment>{value.substring(0, 15) + "..."}</React.Fragment>
          //   );
          // },
        },
      },

      {
        name: "Tranche Name",
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
        name: "Beginning Balance",
        label: "Beginning Balance",
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
        name: "Interest Paid",
        label: "Interest Paid",
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
        name: "Principal Paid",
        label: "Principal Paid",
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
        name: "Total Paid",
        label: "Total Paid",
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
        name: "Ending Balance",
        label: "Ending Balance",
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
        name: "Tranche ID",
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
      // {
      //     name: "originalbalance",
      //     label: "Original Balance",
      //     options: {
      //       filter: true,
      //       sort: true,
      //       // customBodyRender: (value, tableMeta, updateValue) => {
      //       //   return (
      //       //     <React.Fragment>
      //       //       <NumberComp value={value}></NumberComp>
      //       //     </React.Fragment>
      //       //   );
      //       // },
      //     },
      //   },
    ];
    const columns1 = [
      {
        name: "TrancheID",
        label: "Tranche ID",
        options: {
          filter: true,
          sort: false,
        },
      },

      {
        name: "Tranche",
        label: "Tranche Name",
        options: {
          filter: true,
          sort: false,
        },
      },
      {
        name: "BeginningBalance",
        label: "Beginning Balance",
        options: {
          filter: true,
          sort: false,
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
        name: "InterestPaid",
        label: "Interest Paid",
        options: {
          filter: true,
          sort: false,
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
        name: "PrincipalPaid",
        label: "Principal Paid",
        options: {
          filter: true,
          sort: false,
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
        name: "TotalPaid",
        label: "Total Paid",
        options: {
          filter: true,
          sort: false,
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
        name: "EndingBalance",
        label: "Ending Balance",
        options: {
          filter: true,
          sort: false,
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
        name: "TrancheID",
        label: "Actions",
        options: {
          filter: false,
          sort: false,

          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <React.Fragment>
                <div className="text-center">
                  {/* <Button variant="outlined" id="optionalbutton" type="submit" onClick={this.onOpenModal1.bind(this)}> */}
                  <buton
                    type="button"
                    // onClick={this.meta}
                    className="login-sign_up-links"
                  >
                    View Details
                  </buton>
                  {/* </Button> */}
                </div>
              </React.Fragment>
            );
          },
        },
      },
      {
        name: "OrigPrinBal",
        label: "Orig. Prin. Bal.",
        options: {
          filter: true,
          sort: false,
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
        name: "CumIntPaid",
        label: "Cum. Int. Paid.",
        options: {
          filter: true,
          sort: false,
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
        name: "CumPrinPaid",
        label: "Cum. Prin. Paid.",
        options: {
          filter: true,
          sort: false,
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
        name: "CumTotalPaid",
        label: "Cum. Total. Paid.",
        options: {
          filter: true,
          sort: false,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <React.Fragment>
                <NumberComp2 value={value}></NumberComp2>
              </React.Fragment>
            );
          },
        },
      },
    ];

    return (
      <React.Fragment>
        <div className="page">
          <Sidebar activeComponent={"Portfolio"} />
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
                          More{" "}
                          {this.state.downArrow ? (
                            <ArrowDropDownIcon />
                          ) : (
                            <ArrowDropUpIcon />
                          )}
                        </Button>
                      </OverlayTrigger>
                      <Button
                        variant="contained"
                        color="primary"
                        // onClick={this.onOpenModal1}
                      >
                        Investment
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
                        <div className="servicer_deal_details-top_heading_container">
                          <h3 className="headingpayment">Payment Rules</h3>

                          {this.state.dealData.paymentmode == "offchain" ? (
                            <h3 className="headingpaymentAmount">
                              Amount Paid(USD)
                            </h3>
                          ) : (
                            <h3 className="headingpaymentAmount">
                              Amount Paid(USDC)
                            </h3>
                          )}
                        </div>
                      </AccordionSummary>

                      {this.state.paymentRules.length == 0 ? (
                        ""
                      ) : (
                        <AccordionDetails>
                          <Typography>
                            <ul className="bulletpoints">
                              {this.state.paymentRules.map((e) => {
                                return (
                                  <span className="payment-rules-li-elements">
                                    <li>{e.paymentRule}</li>

                                    <p className="payment-rules-li-elements-para">
                                      <NumberComp2
                                        value={e.amountPaid}
                                      ></NumberComp2>
                                    </p>
                                  </span>
                                );
                              })}

                              {/* <p>Use Interest Collections to Pay Tranche Senior
                                  Interest Owed</p>
                                <p className="payment-rules-li-elements-para"><NumberComp value={"6,000,000"}></NumberComp></p>
                              </div>
                            </li>
                            <li>
                              <div className="payment-rules-li-elements">
                                <p>Use Interest Collections to Pay Tranche Senior
                                  Interest Owed</p>
                                  <p className="payment-rules-li-elements-para"><NumberComp value={"6,000,000"}></NumberComp></p>
                              </div>
                            </li>
                            <li>
                              <div className="payment-rules-li-elements">
                                <p>Use Interest Collections to Pay Tranche Senior
                                  Interest Owed</p>
                                  <p className="payment-rules-li-elements-para"><NumberComp value={"6,000,000"}></NumberComp></p>
                              </div>
                            </li>
                            <li>
                              <div className="payment-rules-li-elements">
                                <p>Use Interest Collections to Pay Tranche Senior
                                  Interest Owed</p>
                                  <p className="payment-rules-li-elements-para"><NumberComp value={"6,000,000"}></NumberComp></p>
                              </div>
                            </li>
                            <li>
                              <div className="payment-rules-li-elements">
                                <p>Use Interest Collections to Pay Tranche Senior
                                  Interest Owed</p>
                                  <p className="payment-rules-li-elements-para"><NumberComp value={"6,000,000"}></NumberComp></p>
                              </div> */}
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

                <div className="row row1">
                  <h1 className="myinvestment">My Investment(s)</h1>
                </div>
                <React.Fragment>
                  <div className="workbench-table-container">
                    <MuiThemeProvider theme={this.getMuiTheme()}>
                      <MUIDataTable
                        // title={'Dashboard'}
                        data={this.state.myInvestments}
                        columns={columns1}
                        options={options1}
                      />
                    </MuiThemeProvider>
                  </div>
                </React.Fragment>

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
                                    onClick={() => this.onOpenModal1(e)}
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

                        {/* <div className="horizontal-divider" />

                      <div className="pool-box">
                        <div className="pool-box-text-container1">
                          <div className="lockicondivcss">
                            <h6 className="headingspace11">
                              India top 10 MNCs in IT
                            </h6>
                            <PublicIcon className="lockicon"></PublicIcon>
                          </div>
                          <p className="text-secondary sizeofp1">
                            It will help us to generate the leads and that will
                            boost the business
                          </p>
                        </div>
                        <div className="pool-box-icons-container">
                          <DownloadIcon className="eye-btn1"></DownloadIcon>
                          <OverlayTrigger
                            rootClose
                            trigger="click"
                            placement="bottom"
                            overlay={this.popoverBottom1}
                          >
                            <MoreVertIcon className="eye-btn1" />
                          </OverlayTrigger>
                        </div>
                      </div> */}
                      </div>
                    </div>
                  </div>
                  {/* <div className="col-12 col-sm-6 col-md-4">
                    <div className="page-content3">
                      <div className="pieoutercontainer1">
                        <h5 className="headingspace">Asset Status</h5>
                        <Link to={""} className="login-sign_up-link">
                          Filter
                        </Link>
                      </div>

                      <div className="pieoutercontainer">
                        <div className="pieinnercontainer1-details1">
                          <PieChart width={340} height={350}>
                            <Pie
                              data={piedata1}
                              cx={120}
                              cy={200}
                              innerRadius={100}
                              outerRadius={110}
                              fill="#8884d8"
                              paddingAngle={0}
                              dataKey="value"
                            >
                              {piedata1.map((entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={COLORS1[index % COLORS1.length]}
                                />
                              ))}
                            </Pie>
                          </PieChart>
                        </div>
                        <div className="pieinnercontainer2">
                          <ul>
                            <li>Current</li>
                            <li>30-59_days_dq</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div> */}
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
                              {this.state.dealData.dealName
                                ? this.state.dealData.dealName
                                : "-"}
                            </h6>
                          </div>
                          <div className="headingspaces1">
                            <p className="sizeofp">Asset Class</p>
                            <h6 className="headingspace1">
                              {" "}
                              {this.state.dealData.assetclass
                                ? this.state.dealData.assetclass
                                : "-"}
                            </h6>
                          </div>
                          <div className="headingspaces1">
                            <p className="sizeofp">Closing Date</p>
                            <h6 className="headingspace1">
                              {this.state.dealData.colsingDate
                                ? this.state.dealData.colsingDate
                                : "-"}
                            </h6>
                          </div>
                          <div className="headingspaces1">
                            <p className="sizeofp">Maturity Date</p>
                            <h6 className="headingspace1">
                              {this.state.dealData.maturityDate
                                ? this.state.dealData.maturityDate
                                : "-"}
                            </h6>
                          </div>
                        </div>

                        <div className="col">
                          <div className="headingspaces1">
                            <p className="sizeofp">Status</p>
                            <h6 className="headingspace1">
                              {this.state.dealData.status
                                ? this.state.dealData.status
                                : "-"}
                            </h6>
                          </div>
                          <div className="headingspaces1">
                            <p className="sizeofp">
                              Pool Original Principal Balance
                            </p>
                            <h6 className="headingspace1">
                              {this.state.dealData.originalbalance ? (
                                <NumberComp
                                  value={this.state.dealData.originalbalance}
                                ></NumberComp>
                              ) : (
                                "-"
                              )}
                            </h6>
                          </div>
                          <div className="headingspaces1">
                            <p className="sizeofp">1st Payment Date</p>
                            <h6 className="headingspace1">
                              {this.state.dealData.firstPaymentDate
                                ? this.state.dealData.firstPaymentDate
                                : "-"}
                            </h6>
                          </div>
                          <div className="headingspaces1">
                            <p className="sizeofp">Payment Frequency</p>
                            <h6 className="headingspace1">
                              {this.state.dealData.paymentFrequency
                                ? this.state.dealData.paymentFrequency
                                : "-"}
                            </h6>
                          </div>
                        </div>

                        <div className="col">
                          <div className="headingspaces1">
                            <p className="sizeofp">Verification Agent</p>
                            <h6 className="headingspace1">
                              {this.state.dealData.VAUserName
                                ? this.state.dealData.VAUserName
                                : "-"}
                            </h6>
                          </div>
                          <div className="headingspaces1">
                            <p className="sizeofp">Servicer</p>
                            <h6 className="headingspace1">
                              {this.state.dealData.ServicerUserName
                                ? this.state.dealData.ServicerUserName
                                : "-"}
                            </h6>
                          </div>
                          <div className="headingspaces1">
                            <p className="sizeofp">Underwriter</p>
                            <h6 className="headingspace1">
                              {this.state.dealData.UnderWriterUserName
                                ? this.state.dealData.UnderWriterUserName
                                : "-"}
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
                  {/* <div className="col-12 col-sm-6 col-md-4">
                    <div className="page-content3">
                      <div className="pieoutercontainer1">
                        <h5 className="headingspace">Asset Type</h5>
                        <Link to={""} className="login-sign_up-link">
                          Filter
                        </Link>
                      </div>

                      <div className="pieoutercontainer">
                        <div className="pieinnercontainer1-details1">
                          <PieChart width={340} height={350}>
                            <Pie
                              data={piedata}
                              cx={120}
                              cy={200}
                              innerRadius={100}
                              outerRadius={110}
                              fill="#8884d8"
                              paddingAngle={0}
                              dataKey="value"
                            >
                              {piedata.map((entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={COLORS[index % COLORS.length]}
                                />
                              ))}
                            </Pie>
                          </PieChart>
                        </div>
                        <div className="pieinnercontainer2">
                          <ul>
                            <li>Term Loans</li>
                            <li>Bridge Loans</li>
                            <li>Revolving Facilities</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div> */}
                  {/* <div className="col-12 col-sm-6 col-md-4">
                    <div className="page-content3">
                      <div className="pieoutercontainer1">
                        <h5 className="headingspace">Issuer Performance</h5>
                        <Link to={""} className="login-sign_up-link">
                          Filter
                        </Link>
                      </div>
                      <div className="pieoutercontainer">
                        <div className="pieinnercontainer1-details1 areachart-graph">
                          <AreaChart
                            width={730}
                            height={250}
                            data={data}
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                          >
                            <defs>
                              <linearGradient
                                id="colorPv"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                              >
                                <stop
                                  offset="5%"
                                  stopColor="#FFC000"
                                  stopOpacity={0.8}
                                />
                                <stop
                                  offset="95%"
                                  stopColor="#FFC000"
                                  stopOpacity={0}
                                />
                              </linearGradient>
                            </defs>
                            <Area
                              // type="monotone"
                              dataKey="pv"
                              stroke="#FFC000"
                              fillOpacity={1}
                              fill="url(#colorPv)"
                            />
                          </AreaChart>
                        </div>
                      </div>
                    </div>
                  </div> */}
                </div>

                {/* here comes the extra containers */}
                <div className="servicer-detail-pool-activity-container">
                  <div className="servicer-detail-pool-activity-first-container">
                    <div className="servicer-detail-pool-activity-first-top-container">
                      <h3 className="servicer-card-heading">
                        Important Details
                      </h3>
                      <div className="important-details-text-container">
                        <p className="servicer-card-inner-heading">
                          Pool Current Princial Balance
                        </p>
                        <p>
                          <NumberComp
                            value={
                              this.state.importantDetails
                                .PoolCurrentPrincipalBalance
                            }
                          ></NumberComp>
                        </p>
                      </div>
                      <div className="container-full-width-1">
                        <div className="important-details-text-container">
                          <p className="servicer-card-inner-heading">
                            Next Payment Date
                          </p>
                          <p>{this.state.importantDetails.NextPaymentDate}</p>
                        </div>
                        <div className="important-details-text-container">
                          <p className="servicer-card-inner-heading">
                            As Of Date
                          </p>
                          <p>{this.state.importantDetails.AsOfDate}</p>
                        </div>
                      </div>
                    </div>
                    <div className="servicer-detail-pool-activity-first-bottom-container">
                      <h3 className="servicer-card-heading">Pool Collection</h3>
                      <div className="container-full-width-2">
                        <div className="important-details-text-container">
                          <p className="servicer-card-inner-heading">
                            Interest Collected
                          </p>
                          <p>
                            <NumberComp
                              value={
                                this.state.poolCollections.InterestCollected
                              }
                            ></NumberComp>
                          </p>
                        </div>
                        <div className="important-details-text-container">
                          <p className="servicer-card-inner-heading">
                            Principal Collected
                          </p>
                          <p>
                            <NumberComp
                              value={
                                this.state.poolCollections.PrincipalCollected
                              }
                            ></NumberComp>
                          </p>
                        </div>
                      </div>
                      <div className="important-details-text-container">
                        <p className="servicer-card-inner-heading">
                          Total Collections
                        </p>
                        <p>
                          <NumberComp
                            value={this.state.poolCollections.TotalCollections}
                          ></NumberComp>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="outer-servicer-detail-pool-activity-second-container">
                    <div className="servicer-detail-pool-activity-second-container">
                      {this.state.servicerData == undefined ? (
                        <div></div>
                      ) : (
                        this.fistTableData(this.state.servicerData.collateral)
                      )}
                    </div>
                  </div>
                </div>

                <div className="row row1">
                  <div>
                    {this.state.showSearchBox == true ? (
                      this.searchBar()
                    ) : (
                      <h1 className="headerdashboard1">Tranche(s)</h1>
                    )}
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

                <div id="modal">
                  <ReactModal
                    isOpen={this.state.open1}
                    onRequestClose={this.onCloseModal}
                    contentLabel="Minimal Modal Example"
                    style={customStylesautosmallmodal}
                  >
                    <React.Fragment>
                      <div className="modalPopup2">
                        <div className="popupTitle">
                          <h2>View Previous Deal Details</h2>
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
                          <form
                            className="form-container"
                            onSubmit={this.onSubmit1}
                          >
                            <div className="input-container">
                              <label className="label">Select Date</label>
                              {this.state.getLoansLoader == false ? (
                                <select
                                  required
                                  placeholder="select any one"
                                  className="input-select"
                                  onChange={(e) => {
                                    this.setState({
                                      formData: {
                                        ...this.state.formData,
                                        date: e.target.value,
                                      },
                                    });
                                  }}
                                  value={this.state.formData.date}
                                >
                                  <option
                                    value=""
                                    disabled
                                    className="selectclass"
                                  >
                                    Select any one
                                  </option>
                                  {this.state.DateFilter?.map((value) => {
                                    return (
                                      <option value={value}>{value}</option>
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
                                      onClick={this.onCloseModal}
                                    >
                                      {" "}
                                      Cancel{" "}
                                    </button>
                                    <Button
                                      variant="contained"
                                      color="primary"
                                      type="submit"
                                      // onClick={this.SubmitDate}
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

                <div id="modal">
                  <ReactModal
                    isOpen={this.state.open2}
                    onRequestClose={this.onCloseModal1}
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
                            onClick={this.onCloseModal1}
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
                                      onClick={this.onCloseModal1}
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
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withSnackbar(InvestorPoolDetails);
