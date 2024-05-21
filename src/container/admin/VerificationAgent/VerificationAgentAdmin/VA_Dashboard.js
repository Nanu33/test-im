/* eslint-disable require-jsdoc */
import React, { Component } from "react";
import Pagination from "@mui/material/Pagination";
// import { connect } from 'react-redux';
import Sidebar from "../../../../components/sidebar";
import MUIDataTable from "mui-datatables";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Loader from "../../../../components/loader";
import CloseIcon from "@material-ui/icons/Close";
import { withSnackbar } from "notistack";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddIcon from "@material-ui/icons/Add";
import { withTheme } from "react-jsonschema-form";
import { Theme as MuiTheme } from "rjsf-material-ui";
import ReactModal from "react-modal";
import { TableVirtuoso } from "react-virtuoso";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import {
  customStylesPopupPending,
  customStylesautosmallmodal,
  customStylesautosmallmodal1,
} from "../../../../components/customscripts/customscript";
import FormLoader from "../../../../components/loader/formLoader";
import {
  PoolDetails,
  GetAllPoolsByVaId,
  UpdateLoanAndPoolStatus,
  UpdatePoolStatus,
  NFTmint,
  getVaToken,
  downloadVaCertificate,
  MoveVAcontractfiles,
} from "../../../../servies/services";
import { FullscreenExit, TrainRounded } from "@material-ui/icons";
import {
  ThemeProvider,
  createTheme,
  MuiThemeProvider,
} from "@material-ui/core/styles";
import "react-input-range/lib/css/index.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import NumberComp from "../../../../components/NumberComp";
import GetAppIcon from "@material-ui/icons/GetApp";
import {
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  Checkbox,
  TableBody,
  Table,
} from "@material-ui/core";
import Arrow from "../../../../images/Arrow.png";

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

class VA_Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRecords: [],
      eligibleloans: {},
      PendindPoolsdata: [{}],
      tableData: [],
      loading: false,
      getLoansLoader: false,
      open: false,
      openPopup: false,
      selectedLoanId: [],
      loandetails: [],
      searchTerm: "",
      rowsSelected: null,
      open1: false,
      open2: false,
      open3: false,
      open4: false,
      active_pool: 0,
      anchorEl: null,
      formData: {
        note: "",
      },
      filteredData: [],
      Submittoggle: false,
      pendingpoolshow: true,
      userrole: sessionStorage.getItem("userrole"),
      UserId: sessionStorage.getItem("userid"),
      token: sessionStorage.getItem("token"),
      EmailAddress: sessionStorage.getItem("EmailAddress"),
      kycuploadstatus: sessionStorage.getItem("KycUploadStatus"),
      kycverifystatus: sessionStorage.getItem("KycVerifiedStatus"),
      TermsOfService: sessionStorage.getItem("TermsOfService"),
      verifystatus: false,
      showSearchBox: false,
      selectedRows: new Set(),
      selectedpoolid: "",
    };
  }
  handleClickUpload = () => {
    this.props.history.push({
      pathname: "/kycloginstep1",
    });
  };
  // async toggleRowSelection(poolID, status) {
  //   console.log("checkedddddddddd", poolID, status);
  //   const selectedRows = new Set(this.state.selectedRows);

  //   if (selectedRows.has(poolID)) {
  //     selectedRows.delete(poolID);

  //     console.log("selectedrow", selectedRows);
  //     this.setState({
  //       selectedRows,
  //       selectAll: false,
  //     });
  //   } else {
  //     selectedRows.add(poolID);
  //     console.log("selectedrow", selectedRows);
  //     this.setState({ selectedRows });
  //   }
  // }
  async toggleRowSelection(poolID, status) {
    console.log("checkedddddddddd", poolID, status);
    const selectedRows = new Set(this.state.selectedRows);

    if (selectedRows.has(poolID)) {
      selectedRows.delete(poolID);
    } else {
      selectedRows.add(poolID);
    }
    this.setState({
      selectedpoolid: poolID,
    });
    console.log("selectedrow", selectedRows);

    // Check if all selected rows have status "Accepted" or "Verified"
    const allAcceptedOrVerified = Array.from(selectedRows).every((id) => {
      const rowData = this.state.tableData.find((row) => row.poolID === id);
      return rowData && rowData.status === "Verified";
    });

    // Update selectedRows and Submittoggle states
    this.setState(
      {
        selectedRows,
      },
      () => {
        // Check if selectedRows is empty
        if (selectedRows.size === 0) {
          console.log("Submittoggle", false);
          this.setState({ Submittoggle: false });
        } else {
          // Check Submittoggle after state update
          console.log("Submittoggle", allAcceptedOrVerified);
          this.setState({ Submittoggle: allAcceptedOrVerified });
        }
      }
    );
  }

  toggleSelectAll = () => {
    this.setState((prevState) => {
      const { tableData, selectedRows } = prevState;
      const allRowsSelected = selectedRows.size === tableData.length;

      // Create a new Set containing all row indices (0, 1, 2, ...)
      const allRowIndices = new Set([...Array(tableData.length).keys()]);

      // If not all rows are currently selected, select all and update loandetails
      if (!allRowsSelected) {
        return {
          selectAll: true,
          selectedRows: allRowIndices, // Select all row indices
          loandetails: tableData.map((row) => row["poolID"]), // Update loandetails
        };
      } else {
        // If all rows are currently selected, deselect all and clear loandetails
        return {
          selectAll: false,
          selectedRows: new Set(), // Clear selected rows
          loandetails: [], // Clear loandetails
        };
      }
    });
  };

  handleSort = (column) => {
    this.setState((prevState) => {
      const { sortColumn, sortAscending, tableData, filteredData, searchTerm } =
        prevState;

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
        sortedData = [...tableData].sort(compareFunc);
      }

      // Update the appropriate data array based on the scenario
      return {
        tableData: searchTerm ? tableData : sortedData,
        filteredData: searchTerm ? sortedData : filteredData,
        sortColumn: column,
        sortAscending: newSortAscending,
      };
    });
  };
  handleClickpending = () => {
    this.props.history.push({
      pathname: "/pendingkyc",
    });
  };
  handleClickSubmitted = () => {
    console.log("handleClickSubmitted");
    this.props.history.push({
      pathname: "/kycloginstep2",
    });
  };

  onOpenModal = () => {
    console.log("accept pools");
    this.setState({ open3: false, open1: true, open2: false });
  };
  onOpenModal2 = () => {
    console.log("pending pools");
    if (this.state.PendindPoolsdata.length > 0) {
      this.setState({ open3: true, open2: false, open1: false });
    } else {
      this.setState({ open3: false, open2: false, open1: false });
    }
  };
  onOpenModal1 = () => {
    this.setState({ formData: [] });
    console.log("Reject pools");
    this.setState({ open3: false, open2: true, open1: false });
  };
  onOpenModal3 = () => {
    this.setState({ formData: [] });
    console.log("inside modal1");
    this.setState({ open4: true });
  };

  onCloseModal = () => {
    this.setState({ open1: false, active_pool: 0 });
  };
  onCloseModal2 = () => {
    this.setState({ open3: false, open2: false, open1: false, active_pool: 0 });
  };
  onCloseModal1 = () => {
    this.setState({ open2: false });
  };
  onCloseModal3 = () => {
    this.setState({ open4: false });
  };

  onSubmit1 = (e) => {
    e.preventDefault();
    console.log(this.state.formData);
    console.log("hello we have clicked the button");
  };

  async selectedpoolid(selected) {
    const arr = [];
    var toggle = "";
    for (var i = 0; i < selected.length; i++) {
      var j = selected[i];
      let status = this.state.tableData[j].status;

      // let PoolID = this.state.tableData[j].poolID;
      // arr.push(PoolID);
      if (status == "Accepted" || status == "Verified") {
        let PoolID = this.state.tableData[j].poolID;
        arr.push(PoolID);
        toggle = "true";
      } else {
        const message = "Please select the pools with 'Accepted' status";
        this.props.enqueueSnackbar(message, {
          variant: "error",
          autoHideDuration: 3000,
        });
        toggle = "false";
        break;
      }
    }

    this.setState({ loandetails: arr, Submittoggle: toggle });
    console.log("selected Loans", arr, toggle);

    sessionStorage.setItem("rundd", JSON.stringify(arr));
  }

  onchange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const { tableData } = this.state;
    const filteredData = tableData.filter((row) => {
      return Object.values(row).some(
        (value) => value && value.toString().toLowerCase().includes(searchTerm)
      );
    });

    this.setState({
      searchTerm: event.target.value,
      filteredData: filteredData,
      isDataFound: filteredData.length > 0,
    });
  };
  searchBar = () => (
    <div className="search-bar-main-container" id="searchBox">
      <div className="tableSearch1">
        <TextField
          value={this.state.searchTerm}
          onChange={this.onchange}
          placeholder="Search"
          variant="standard"
          size="small"
          autoFocus
        />
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
    this.setState({ searchTerm: "" });
    this.setState({ showSearchBox: false });
  };

  onClickSearchButton = () => {
    this.setState({ showSearchBox: true });
  };

  GetAllPoolsByVaId = async () => {
    console.log(
      "PendindPoolsdata",
      this.state.PendindPoolsdata,
      this.state.active_pool
    );
    this.setState({ tableData: [], getLoansLoader: true });
    var data = {};
    data.VAId = this.state.UserId;
    data.mailid = this.state.EmailAddress;
    data.token = this.state.token;
    const APIResponse = await GetAllPoolsByVaId(data);

    if (APIResponse.status === 200) {
      console.log("AllGetAllPoolsdata--", APIResponse);
      if (APIResponse.data.length != 0) {
        this.setState({ tableData: APIResponse.data, getLoansLoader: false });
        sessionStorage.setItem("issuerId", APIResponse.data[0].issuerId);
        let arr = [];
        APIResponse.data.map((e) => {
          if (e.status == "Pending") {
            arr.push(e);
          }
        });
        this.setState({
          PendindPoolsdata: arr,
          pendingpoolshow: true,
        });

        console.log("ghvhuhgjj", this.state.tableData);
      } else {
        this.setState({ getLoansLoader: false, tableData: [] });
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
  getVaToken = async () => {
    var data = {};
    data.VAToken = sessionStorage.getItem("VaToken");
    data.token = this.state.token;
    const APIResponse = await getVaToken(data);
    localStorage.setItem("ImVaToken", APIResponse.data.JWTToken);
  };
  downloadVaCertificate = async (poolid, issuerid) => {
    var data = {};
    data.poolid = poolid;
    data.issuerId = issuerid;
    data.token = this.state.token;
    const APIResponse = await downloadVaCertificate(data);
    if (APIResponse.status === 200) {
      const file_name = `Certificate-${poolid}` + ".pdf";
      startDownload(APIResponse.data, file_name);
      console.log("APIResponse-Download", APIResponse.data);
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

      const message = "Record Fetched Successfully";
      this.props.enqueueSnackbar(message, {
        variant: "info",
        autoHideDuration: 3000,
      });
    } else {
      alert("Failed");
    }
  };
  MoveVAcontractfiles = async (poolid) => {
    var data = {};
    data.poolid = poolid;
    data.token = this.state.token;
    const APIResponse = await MoveVAcontractfiles(data);

    if (APIResponse.status === 200) {
      if (APIResponse.data.isSuccess === true) {
        const message = APIResponse.data.message;
        this.props.enqueueSnackbar(message, {
          variant: "info",
          autoHideDuration: 3000,
        });
      } else {
        const message = "Couldn't fetch the record";
        this.props.enqueueSnackbar(message, {
          variant: "error",
          autoHideDuration: 3000,
        });
      }
    }
  };

  UpdateLoanAndPoolStatus = async () => {
    var data = {};
    data.poolid = this.state.PendindPoolsdata[this.state.active_pool].poolID;
    data.poolStatus = "Accepted";
    data.loanStatus = "Unreviewed";
    data.token = this.state.token;
    console.log("datata", data);
    const APIResponse = await UpdateLoanAndPoolStatus(data);

    if (APIResponse.status === 200) {
      if (this.state.PendindPoolsdata.length > 1) {
        this.setState({
          open3: true,
          pendingpoolshow: false,
          open2: false,
          open1: false,
          active_pool: 0,
        });
        this.GetAllPoolsByVaId();
        this.MoveVAcontractfiles(
          this.state.PendindPoolsdata[this.state.active_pool].poolID
        );
      } else {
        this.setState({
          open3: false,
          open2: false,
          open1: false,
          active_pool: 0,
        });
        this.GetAllPoolsByVaId();
        this.MoveVAcontractfiles(
          this.state.PendindPoolsdata[this.state.active_pool].poolID
        );
      }
    } else {
      const message = "Couldn't fetch the record";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  UpdatePoolStatus = async () => {
    var data = {};
    // data.contractaddress = "0xFD6380543eDc62EB255746DED6b7d39baAa414a1";
    data.poolid = this.state.PendindPoolsdata[this.state.active_pool].poolID;
    data.status = "Rejected";
    console.log("datata", data);
    data.token = this.state.token;
    const APIResponse = await UpdatePoolStatus(data);

    if (APIResponse.status === 200) {
      if (this.state.PendindPoolsdata.length > 1) {
        this.setState({
          open3: true,
          pendingpoolshow: false,
          open2: false,
          open1: false,
          active_pool: 0,
        });
        this.GetAllPoolsByVaId();
      } else {
        this.setState({
          open3: false,
          open2: false,
          open1: false,
          active_pool: 0,
        });
        this.GetAllPoolsByVaId();
      }
    } else {
      const message = "Couldn't fetch the record";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  PoolDetails = async (value) => {
    // sessionStorage.setItem("poolname", poolname);
    sessionStorage.setItem("poolid", value.poolID);
    if (value.status === "Pending") {
      const message = "Please accept the pool";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    } else if (value.status === "Rejected By Underwriter") {
      const message = "Rejected By Underwriter";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    } else{
      window.location.assign("/admin/va_pooldetails");
    }
  };

  Verified = async () => {
    this.setState({ formLoader: true, verifystatus: true });
    var data = {};
    // data.contractaddress = "0xFD6380543eDc62EB255746DED6b7d39baAa414a1";
    data.poolid = this.state.selectedpoolid;

    console.log("datata", data);
    data.token = this.state.token;
    const APIResponse = await NFTmint(data);
    if (APIResponse.status == 200) {
      this.UpdatePoolVerifyStatus();
    } else {
      this.setState({ formLoader: false, open4: false });

      const message = "Couldn't fetch the record";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };
  UpdatePoolVerifyStatus = async () => {
    var data = {};
    // data.contractaddress = "0xFD6380543eDc62EB255746DED6b7d39baAa414a1";
    data.poolid = this.state.selectedpoolid;
    data.status = "Verified";
    console.log("datata", data);
    data.token = this.state.token;
    const APIResponse = await UpdatePoolStatus(data);

    if (APIResponse.status === 200) {
      this.setState({ formLoader: false, open4: false, verifystatus: false });

      this.GetAllPoolsByVaId();
    } else {
      this.setState({ formLoader: false, open4: false });

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
    this.getVaToken();
    this.GetAllPoolsByVaId();

    // const APIResponse = {
    //   message: "successfull",
    //   isSuccess: true,
    //   data: [
    //     {
    //       poolID: "TETR24259",
    //       poolname: "Credit Cap 1",
    //       assetclass: "Consumer Loans",
    //       issuer: "Credit Capital Corp",
    //       numberofloans: "24",
    //       status: "Accepted",
    //     },
    //     // {
    //     //   poolID: "222UAE22",
    //     //   poolname: "Money Lend 2",
    //     //   assetclass: "Business Loans",
    //     //   issuer: "Money Lender Inc",
    //     //   numberofloans: "15",
    //     //   status: "Validated",
    //     // },
    //     // {
    //     //   poolID: "222UAE8",
    //     //   poolname: "Credit Cap 2",
    //     //   assetclass: "Business Loans",
    //     //   issuer: "Money Lender Inc",
    //     //   numberofloans: "6",
    //     //   status: "Unreviewed",
    //     // },

    //     // {
    //     //   poolID: "222UCE10",
    //     //   poolname: "Money Lend 1",
    //     //   assetclass: "Consumer Loans",
    //     //   issuer: "Credit Capital Corp",
    //     //   numberofloans: "33",
    //     //   status: "In Review",
    //     // },
    //     // {
    //     //   poolID: "222UCE11",
    //     //   poolname: "Money Lend 1",
    //     //   assetclass: "Consumer Loans",
    //     //   issuer: "Money Lender Inc",
    //     //   numberofloans: "18",
    //     //   status: "Certified",
    //     // },
    //     // {
    //     //   poolID: "222UCE12",
    //     //   poolname: "Credit Cap 2",
    //     //   assetclass: "Business Loans",
    //     //   issuer: "Credit Capital Corp",
    //     //   numberofloans: "29",
    //     //   status: "Validated",
    //     // },
    //     // {
    //     //   poolID: "222UCE13",
    //     //   poolname: "Credit Cap 1",
    //     //   assetclass: "Consumer Loans",
    //     //   issuer: "Credit Capital Corp",
    //     //   numberofloans: "9",
    //     //   status: "Unreviewed",
    //     // },
    //     // {
    //     //   poolID: "222UCE14",
    //     //   poolname: "Money Lend 2",
    //     //   assetclass: "Business Loans",
    //     //   issuer: "Money Lender Inc",
    //     //   numberofloans: "36",
    //     //   status: "Certified",
    //     // },
    //     // {
    //     //   poolID: "222UCE15",
    //     //   poolname: "Credit Cap 1",
    //     //   assetclass: "Consumer Loans",
    //     //   issuer: "Credit Capital Corp",
    //     //   numberofloans: "21",
    //     //   status: "Validated",
    //     // },
    //     // {
    //     //   poolID: "222UCE16",
    //     //   poolname: "Money Lend 1",
    //     //   assetclass: "Consumer Loans",
    //     //   issuer: "Money Lender Inc",
    //     //   numberofloans: "16",
    //     //   status: "Unreviewed",
    //     // },
    //     // {
    //     //   poolID: "222UCE16",
    //     //   poolname: "Money Lend 1",
    //     //   assetclass: "Consumer Loans",
    //     //   issuer: "Money Lender Inc",
    //     //   numberofloans: "16",
    //     //   status: "Certified",
    //     // },
    //     // {
    //     //   poolID: "222UCE16",
    //     //   poolname: "Money Lend 1",
    //     //   assetclass: "Consumer Loans",
    //     //   issuer: "Money Lender Inc",
    //     //   numberofloans: "16",
    //     //   status: "Validated",
    //     // },
    //   ],
    // };
    // this.setState({ tableData: APIResponse.data });
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
        MuiInput: {
          underline: {
            "&:after": {
              borderBottom: "2px solid #018E82 !important",
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
        MUIDataTableToolbar: {
          root: {
            marginBottom: "3px !important",
            paddingLeft: "5px !important",
            paddingRight: "5px !important",
          },
          titleText: {
            fontFamily: "Catamaran, sans-serif !important",
            fontSize: "30px",
            color: "#212121",
            fontWeight: "600",
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
            color: "#212121 !important",
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
        MUIDataTableSearch: {
          main: {
            marginLeft: "-30px !important",
            marginRight: "300px !important",
            marginTop: "15px !important",
          },
          clearIcon: {
            color: "#018E82 !important",
            "&:hover": {
              color: "#018E82 !important",
            },
          },
          searchIcon: {
            color: "#fff !important",
          },
        },

        MuiCircularProgress: {
          colorSecondary: {
            color: "#048c88 !important",
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

  handleChange11 = (e) => {
    console.log(e);
    this.setState({ value1: e.target.value });
  };

  handleClickWorkBench = () => {
    this.setState({ activeInsights: false });
  };

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleClick1 = (value, status, poolname) => {
    sessionStorage.setItem("poolid", value);
    sessionStorage.setItem("poolname", poolname);
    if (status === "Accepted" || status === "Verified") {
      // Load remote bundles
      const script = document.createElement("script");
      script.src = "http://localhost:8080/moduleEntry.js";
      document.body.appendChild(script);

      // Redirect to the list of loans page
      window.location.assign("/admin/va_listofloans");
    } else {
      const message = "Please accept the pool";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  onClickLeftArrow = () => {
    if (this.state.active_pool > 0) {
      this.setState((prevState) => ({
        active_pool: prevState.active_pool - 1,
      }));
    } else {
      this.setState({ active_pool: 0 });
    }
  };

  onClickRightArrow = () => {
    const len = this.state.PendindPoolsdata.length;
    const totalInd = len - 1;

    console.log(totalInd);
    if (this.state.active_pool < totalInd) {
      this.setState((prevState) => ({
        active_pool: prevState.active_pool + 1,
      }));
    } else {
      if (this.state.active_pool >= totalInd) {
        this.setState({ active_pool: totalInd });
      }
    }
  };

  showAllPagesNum = (e) => (
    <button
      type="button"
      className={
        e == this.state.active_pool
          ? parseInt(e) < 9
            ? "va-actice_button-key"
            : "va-actice_button-key-2"
          : "va-unactive-button-key"
      }
      onClick={(e) =>
        this.setState({ active_pool: parseInt(e.target.textContent) - 1 })
      }
    >
      {e + 1}
    </button>
  );
  renderPopup1232 = () => {
    const { PendindPoolsdata, active_pool } = this.state;
    // console.log("modalData[active_pool]", PendindPoolsdata[active_pool].poolname)
    return (
      <div>
        {this.state.pendingpoolshow == true ? (
          <React.Fragment>
            <div className="pending-pool-popup-card">
              <div className="pending-pool-popup-card-top-container">
                <div className="popup-card-top-container-first">
                  <p>Pool Name</p>
                  <p>{PendindPoolsdata[active_pool]?.poolname}</p>
                </div>
                <div className="popup-card-top-container-second">
                  <button
                    className="popupbutton1"
                    onClick={this.onOpenModal1.bind(this)}
                  >
                    Reject
                  </button>
                  <Button
                    variant="contained"
                    color="primary"
                    type="button"
                    className="va-popup-btn-accept"
                    onClick={this.onOpenModal.bind(this)}
                  >
                    Accept
                  </Button>
                </div>
              </div>

              <div className="pending-pool-popup-card-bottom-container">
                <div className="popup-card-bottom-container-first">
                  <div className="first-inner-container">
                    <p>Pool ID</p>
                    <p>{PendindPoolsdata[active_pool]?.poolID}</p>
                  </div>

                  <div className="first-inner-container">
                    <p>Asset Class</p>
                    <p>{PendindPoolsdata[active_pool]?.assetclass}</p>
                  </div>

                  <div className="first-inner-container">
                    <p>Set-up On</p>
                    <p>{PendindPoolsdata[active_pool]?.setupdate}</p>
                  </div>
                </div>

                <div className="popup-card-bottom-container-second">
                  <div className="first-inner-container">
                    <p>Issuer</p>
                    <p>{PendindPoolsdata[active_pool]?.issuerName}</p>
                  </div>

                  <div className="first-inner-container">
                    <p>Original Balance</p>
                    <p>
                      <NumberComp
                        value={PendindPoolsdata[active_pool]?.originalbalance}
                      ></NumberComp>
                    </p>
                  </div>

                  <div className="first-inner-container">
                    <p>No. Of Loans</p>
                    <p>{PendindPoolsdata[active_pool]?.numberofloans}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="va-popup-button-close-container">
              <div className="va-popup-button-container">
                <button
                  type="button"
                  className="va-popup-arrow-button-left"
                  onClick={this.onClickLeftArrow}
                >
                  <ArrowBackIosNewIcon color="#018E82" />
                </button>

                <div>
                  <Pagination
                    count={this.state.PendindPoolsdata.length}
                    page={parseInt(this.state.active_pool + 1)}
                    color="secondary"
                    onChange={(e) => {
                      this.setState({
                        active_pool: parseInt(e.target.textContent) - 1,
                      });
                    }}
                    hideNextButton={true}
                    hidePrevButton={true}
                    boundaryCount={0}
                  />
                </div>

                <button
                  type="button"
                  className="va-popup-arrow-button-right"
                  onClick={this.onClickRightArrow}
                >
                  <ArrowForwardIosIcon size={18} />
                </button>
              </div>

              <div className="va-popup-close-container">
                <button
                  onClick={this.onCloseModal2}
                  className="va-popup-close-btn"
                >
                  Close
                </button>
              </div>
            </div>
          </React.Fragment>
        ) : (
          ""
        )}
      </div>
    );
  };

  render() {
    const { loandetails } = this.state;
    const { Submittoggle } = this.state;
    const selectedArrLen = loandetails.length;
    const open = Boolean(this.state.anchorEl);
    const id = open ? "simple-popover" : undefined;

    const { classes } = this.props;
    const options = {
      customToolbar: () => {
        return (
          <span>
            {/* <Button
              variant="outlined"
              type="submit"
              onClick={this.onOpenModal2.bind(this)}
            >
              View Pending Pools
            </Button> */}
            {this.state.Submittoggle === true ? (
              <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={this.onOpenModal3.bind(this)}
              >
                Submit Verification
              </Button>
            ) : (
              <Button
                variant="contained1"
                color="primary"
                type="submit"
                className="buttoncss"
                onClick={this.onOpenModal3.bind(this)}
                disabled
              >
                Submit Verification
              </Button>
            )}
          </span>
        );
      },

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
        this.setState({ currentPage: currentPage });
      },

      searchTerm: this.state.searchTerm,
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
        name: "actions",
        label: "Actions",
        key: "1",
        bodyRenderer: (value) => {
          console.log("valueeeeeeeeee", value);
          return (
            <React.Fragment>
              <div className="">
                <span>
                  <button
                    className="popupbutton1"
                    onClick={() => this.PoolDetails(value)}
                  >
                    View Details
                  </button>
                  {value.status !== "Pending" && (
                    <button
                      className="popupbuttons1"
                      onClick={() =>
                        this.handleClick1(
                          value.poolID,
                          value.status,
                          value.poolname
                        )
                      }
                    >
                      View Loans
                    </button>
                  )}
                  {value.status === "Pending" ? (
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
                  ) : value.VACertificate &&
                    value.VACertificate !== undefined &&
                    value.VACertificate !== "" ? (
                    <button
                      className="popupbuttons1"
                      onClick={() =>
                        this.downloadVaCertificate(value.poolID, value.issuerId)
                      }
                    >
                      <GetAppIcon />
                    </button>
                  ) : (
                    <button disabled className="popupbuttons1">
                      <GetAppIcon color="disabled" />
                    </button>
                  )}
                </span>
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
              this.handleClickpending()
            )
          ) : (
            <div className="page">
              <Sidebar activeComponent="VA_Dashboard" />
              <div className="content1">
                <div className="page-content-is">
                  <div className="row row1">
                    <div className="investor-heading-container">
                      <h1 className="headerdashboard">Dashboard</h1>
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
                          {/* <Button
                            variant="outlined"
                            type="submit"
                            onClick={this.onOpenModal2.bind(this)}
                          >
                            View Pending Pools
                          </Button> */}
                          {Submittoggle === true ? (
                            <Button
                              variant="contained"
                              color="primary"
                              type="submit"
                              className="buttoncss1"
                              onClick={this.onOpenModal3.bind(this)}
                            >
                              Submit Verification
                            </Button>
                          ) : (
                            <Button
                              variant="contained1"
                              color="primary"
                              type="submit"
                              className="buttoncss"
                              onClick={this.onOpenModal3.bind(this)}
                              disabled
                            >
                              Submit Verification
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <React.Fragment>
                    <div>
                      {this.state.getLoansLoader ? (
                        <center>
                          <Loader msg={"Please wait, Loading Loan Data"} />
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
                              this.state.searchTerm
                                ? this.state.filteredData
                                : this.state.tableData
                            }
                            columns={columns}
                            components={TableComponents}
                            itemHeight={50}
                            style={{
                              width: "100%",
                              height: this.state.searchTerm
                                ? this.state.filteredData.length * 50 > 630
                                  ? 630
                                  : this.state.filteredData.length * 50 + 70
                                : 630,
                              overflow: "auto",
                              borderRadius: "1rem",
                              overflowAnchor: "none",
                            }}
                            fixedHeaderContent={() => (
                              <TableRow>
                                <>
                                  <TableCell>
                                    <Checkbox
                                      style={{ transform: "scale(0.8)",border : 'none' }}
                                      checked={this.state.selectAll}
                                      onChange={this.toggleSelectAll}
                                    />
                                  </TableCell>
                                  {columns?.map((column) => (
                                    <TableCell
                                      key={column.name}
                                      style={{
                                        background: "white",
                                        cursor: "pointer",
                                        width: `${column.length * 10}px`,
                                        whiteSpace: "nowrap",
                                        border : 'none'
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
                                </>
                              </TableRow>
                            )}
                            itemContent={(index) => {
                              console.log("index",index,this.state.filteredData)
                              const { searchTerm, filteredData, tableData } =
                                this.state;
                              const rowData = searchTerm
                                ? filteredData[index]
                                : tableData[index];
                              const isRowSelected =
                                this.state.selectedRows?.has(rowData["poolID"]);
                              const isOddRow = index % 2 !== 0;
                              console.log("tablevaluessss", rowData,searchTerm,filteredData);
                              return (
                                <>
                                  <TableCell
                                    style={{
                                      backgroundColor: isOddRow
                                        ? "rgb(229,229,229,0.3)"
                                        : "",
                                        border : 'none' 
                                    }}
                                  >
                                    <Checkbox
                                      style={{ transform: "scale(0.8)" }}
                                      checked={
                                        isRowSelected || this.state.selectAll
                                      }
                                      onChange={() =>
                                        this.toggleRowSelection(
                                          tableData[index]["poolID"],
                                          tableData[index]["status"]
                                        )
                                      }
                                    />
                                  </TableCell>
                                  {columns?.map((column) => (
                                    <TableCell
                                      style={{
                                        width: `${column.length * 10}px`,
                                        background: "white",
                                        whiteSpace: "nowrap",
                                        backgroundColor: isOddRow
                                          ? "rgb(229,229,229,0.3)"
                                          : "",
                                        border : 'none'
                                          
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
              </div>

              <div id="modal1">
                <ReactModal
                  isOpen={this.state.open1}
                  onRequestClose={this.onCloseModal}
                  contentLabel="Minimal Modal Example"
                  style={customStylesautosmallmodal1}
                >
                  <React.Fragment>
                    <div className="modalPopup2">
                      <h2>Are you sure, you want to Accept the Pool?</h2>

                      {/* {this.state.popupLoader === true ? <CircularProgress size="30px" color="secondary" /> : ' '} */}

                      <div className="modalshiftcontent">
                        <h6 className="card1__titles1">
                          Once you accept the pool, it will be moved to your
                          dashboard and you can proceed to validate it.
                        </h6>

                        <div className="modalsubmit">
                          <div className="submitbuttonbg">
                            <div className="row">
                              <div className="row justify-content-end11">
                                <button
                                  type="button"
                                  className="popupbutton1"
                                  onClick={this.onCloseModal}
                                >
                                  {" "}
                                  No{" "}
                                </button>

                                <Button
                                  variant="contained"
                                  color="primary"
                                  type="submit"
                                  onClick={this.UpdateLoanAndPoolStatus}
                                >
                                  Yes, Accept it
                                  {this.state.formLoader === true ? (
                                    <CircularProgress
                                      size="25px"
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
                        {/* {this.state.openPopup === true ? <React.Fragment><Snackbar msg={"Processor addded Successfully" || this.state.message} open="true" /> </React.Fragment> : ' '} */}
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
                  style={customStylesautosmallmodal1}
                >
                  <React.Fragment>
                    <div className="modalPopup2">
                      <h2> Are you sure you want to Submit Verification? </h2>

                      <div className="modalshiftcontent">
                        <h6 className="card1__titles1">
                          Submitting verification signifies completion of your
                          assigned duty as Verification Agent. This Pool will be
                          committed to Issuer for Underwriting.
                        </h6>

                        <div className="modalsubmit">
                          <div className="submitbuttonbg">
                            <div className="row">
                              <div className="row justify-content-end12">
                                <button
                                  type="button"
                                  className="popupbutton1"
                                  onClick={this.onCloseModal3}
                                >
                                  {" "}
                                  Cancel{" "}
                                </button>

                                <Button
                                  variant="contained"
                                  color="primary"
                                  type="submit"
                                  disabled={
                                    this.state.verifystatus == true
                                      ? true
                                      : false
                                  }
                                  onClick={this.Verified}
                                >
                                  Verify
                                  {this.state.formLoader === true ? (
                                    <CircularProgress
                                      size="25px"
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
                  isOpen={this.state.open3}
                  onRequestClose={this.onCloseModal2}
                  contentLabel="Minimal Modal Example"
                  style={customStylesPopupPending}
                >
                  <React.Fragment>
                    <div className="modalPopup2 modalPopupPending11">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          margin: "0 25px 0 0",
                        }}
                      >
                        <h2>Pending Pools</h2>
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

                      <div className="modalshiftcontent">
                        {this.state.PendindPoolsdata.length != 0
                          ? this.renderPopup1232()
                          : ""}

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

              <div id="modal1">
                <ReactModal
                  isOpen={this.state.open2}
                  onRequestClose={this.onCloseModal1}
                  contentLabel="Minimal Modal Example"
                  style={customStylesautosmallmodal}
                >
                  <React.Fragment>
                    <div className="modalPopup2">
                      <h2>Are you sure, you want to Reject the Pool?</h2>

                      <div className="modalshiftcontent">
                        <h6 className="card1__title">
                          Once you reject the pool, it will be returned to the
                          Issuer. You can also mention the reason below.
                        </h6>

                        <form
                          className="form-container"
                          onSubmit={this.onSubmit1}
                        >
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

                          <div className="modalsubmit">
                            <div className="submitbuttonbg">
                              <div className="row">
                                <div className="row justify-content-end1">
                                  <button
                                    type="button"
                                    className="popupbutton1"
                                    onClick={this.onCloseModal1}
                                  >
                                    {" "}
                                    No{" "}
                                  </button>
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    onClick={this.UpdatePoolStatus}
                                  >
                                    Yes, Reject it
                                    {this.state.formLoader === true ? (
                                      <CircularProgress
                                        size="25px"
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
          )
        ) : (
          this.handleClickSubmitted()
        )}
      </React.Fragment>
    );
  }
}

export default withSnackbar(VA_Dashboard);
