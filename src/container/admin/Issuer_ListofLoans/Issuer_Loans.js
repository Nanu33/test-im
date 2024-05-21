/* eslint-disable require-jsdoc */
import React, { Component } from "react";
// import { connect } from 'react-redux';
import Sidebar from "../../../components/sidebar";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Loader from "../../../components/loader";
import CloseIcon from "@material-ui/icons/Close";
import { withSnackbar } from "notistack";
import { TableVirtuoso } from "react-virtuoso";
import CircularProgress from "@material-ui/core/CircularProgress";
import ReactModal from "react-modal";
import DatePicker from "react-datepicker";
import { FullscreenExit, TrainRounded } from "@material-ui/icons";
import "react-datepicker/dist/react-datepicker.css";
import {
  widgets,
  CustomFieldTemplate,
  customStyles,
  customStylesauto,
  customStylesautosmallmodal,
  customStylesautosmallmodal1,
} from "../../../components/customscripts/customscript";
import FormLoader from "../../../components/loader/formLoader";
import {
  GetAllLoans,
  FilteredLoans,
  deleteloans,
  Uploadloanlms,
  Onboradloans,
  previewDeleteLoans,
  GetAllPools,
  MapPoolToLoan,
  UpdateLoanAndPoolStatus,
} from "../../../servies/services";
import Arrow from "../../../images/Arrow.png";
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
  Checkbox,
  Paper,
  TableContainer,
} from "@material-ui/core";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import { truncate } from "lodash";
import MapFields from "../IssuerMapFields/MapFields";
const token = sessionStorage.getItem("token");

const resetState = {
  //status: "",
  //loanData: false,
  contractdigitized: false,
  principleAmount: { min: 50, max: 500 },
  mindate: "",
  maxdate: "",
  assetclass: "",
};

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
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

class IssuerLoans extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRecords: [],
      eligibleloans: {},
      tableData: [],
      loading: false,
      getLoansLoader: true,
      open: false,
      openPopup: false,
      selectedLoanId: [],
      searchTerm: "",
      rowsSelected: null,
      open1: false,
      open2: false,
      openAddLoan: false,
      openMapLoanField: false,
      openMapToPool: false,
      // formData: {
      //   status: "Unmapped",
      //   assetclass: "",
      // },
      loandetails: [],
      filteredData : [],
      poolName: sessionStorage.getItem("poolname"),
      UserId: sessionStorage.getItem("userid"),
      token: sessionStorage.getItem("token"),
      verificationTemplate: JSON.parse(
        sessionStorage.getItem("verification_template")
      ),
      file1: "",
      filename1: "",
      // file2: '',
      // filename2: '',
      formData: {
        asset_class: "",
        // verification_template: '',
        AsOfDate: "",
      },
      formData1: {
        poolname: "",
      },
      value11: [10, 20],
      valueRange: { min: 2, max: 10 },
      showSearchBox: false,
      modalData: {
        // status: "Unmapped",
        // loandata: false,
        contractdigitized: false,
        principleAmount: { min: 50, max: 5000000000 },
        //mindate: "15/03/2022",
        mindate: "",
        maxdate: "",
        assetclass: "",
      },
      activeInsights1: false,
      activeInsights2: true,
      activeInsights3: false,
      activeInsights4: false,
      mappingDataKey: [],
      loandate: "",
      PoolDropdown: "",
      selectedRows: new Set(),
      selectAll: false,
    };
    this.formatLabel = this.formatLabel.bind(this);
  }

  async toggleRowSelection(loanID) {
    const selectedRows = new Set(this.state.selectedRows);

    if (selectedRows.has(loanID)) {
      selectedRows.delete(loanID);

      // Remove the deselected loanID from the loandetails array
      const updatedLoandetails = this.state.loandetails.filter(
        (id) => id !== loanID
      );

      this.setState({
        selectedRows,
        loandetails: updatedLoandetails,
        selectAll: false,
      });
      console.log("length", this.state.loandetails);
    } else {
      selectedRows.add(loanID);

      // Add the selected loanID to the loandetails array
      const updatedLoandetails = [...this.state.loandetails, loanID];

      this.setState({ selectedRows, loandetails: updatedLoandetails });

      // Check if all rows are now selected
      if (updatedLoandetails.length === this.state.tableData.length) {
        this.setState({ selectAll: true });
      }
      console.log("length1", this.state.loandetails.length);
    }
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
          loandetails: tableData.map((row) => row["Loan ID"]), // Update loandetails
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

  handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const { tableData } = this.state;

    const filteredData = tableData.filter((row) => {
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
    console.log('search',this.state.filteredData)
  };

  // filterData = (searchTerm) => {
  //   const { tableData } = this.state;
  //   const lowerCaseSearchTerm = searchTerm.toLowerCase();

  //   const filteredData = tableData.filter((row) =>
  //     Object.values(row).find((value) => {
  //       if (typeof value === "string") {
  //         return value.toLowerCase().includes(lowerCaseSearchTerm);
  //       } else if (typeof value === "number" && !isNaN(value)) {
  //         return value.toString().includes(searchTerm);
  //       } else {
  //         return false;
  //       }
  //     })
  //   );

  //   return filteredData;
  // };

  handleDateChange = (date) => {
    console.log(date);
    this.setState({
      formData: {
        ...this.state.formData,
        AsOfDate: date,
      },
    });
  };

  onOpenMaptoPool = () => {
    this.setState({ openMapToPool: true });
  };
  onCLoseMaptoPool = () => {
    this.setState({
      openMapToPool: false,
    });
  };

  maploanfield = (val) => {
    this.setState({
      openMapLoanField: true,
      loandate: val,
    });
  };

  handleChildData = () => {
    this.closeMapLoanField();
    this.setState({
      openAddLoan: true,
    });
  };
  handleInputChange = (e) => {
    this.setState({
      modalData: {
        ...this.state.modalData,
        principleAmount: e,
      },
    });
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
  };
  handleClickPools = () => {
    this.setState({
      activeInsights1: false,
      activeInsights2: false,
      activeInsights3: true,
      activeInsights4: false,
    });
    window.location.assign("/admin/issuerdashboard");
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

  handleOnChange1 = (e) => {
    console.log("eeeeeeeeee", e);
    this.setState({
      file1: e.target.files[0],
      filename1: e.target.files[0].name,
    });
  };

  handleOnChange2 = (e) => {
    this.setState({
      file2: e.target.files[0],
      filename2: e.target.files[0].name,
    });
  };

  handleDeleteLoan = () => {
    this.setState({
      open2: true,
    });
  };

  openAddLoanModal = () => {
    this.setState({ openAddLoan: true });
  };

  closeAddLoanModal = () => {
    this.setState({
      openAddLoan: false,
      file1: "",
      filename1: "",
      // file2: '',
      // filename2: '',
      formData: {
        asset_class: "",
        // verification_template: ''
      },
    });
  };

  onOpenModal = () => {
    console.log("inside modal1");
    this.setState({ open1: true });
  };
  onOpenModal1 = () => {
    console.log("inside modal1");
    this.setState({ open2: true });
  };
  onCloseModal1 = () => {
    console.log("inside modal1");
    this.setState({ open2: false, loandetails: [], rowsSelected: [] });
  };

  onCloseModal = () => {
    this.setState({
      open1: false,
      modalData: {
        contractdigitized: false,
        principleAmount: { min: 50, max: 5000000000 },
        mindate: "",
        maxdate: "",
        assetclass: "",
      },
    });
  };

  closeMapLoanField = () => {
    this.setState({
      openMapLoanField: false,
    });
  };

  onSubmit1 = (e) => {
    e.preventDefault();
    console.log("aaaaaaa", this.state.modalData);
    this.FilteredLoans();
    console.log("hello we have clicked the button");
    // this.setState({ formData: value.formData })
  };
  onMaptoPoolSubmit = (e) => {
    e.preventDefault();
    this.MapPoolToLoan();
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
    this.setState({ searchTerm: e.target.value, searchType: true });
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
  GetAllPools = async () => {
    let contractaddress = "0xFD6380543eDc62EB255746DED6b7d39baAa414a1";
    let PoolID = [];
    let PoolName = [];
    let y = [];

    this.setState({ PoolDropdown: y, PoolListLoader: false });
    var data = {};
    data.issuerId = this.state.UserId;
    data.mailid = sessionStorage.getItem("EmailAddress");
    data.token = this.state.token;
    const APIResponse = await GetAllPools(data);

    if (APIResponse.status === 200) {
      if (APIResponse !== null) {
        console.log("InvestorList", APIResponse.data);
        this.setState({ PoolList: APIResponse.data });
        let PoolID = [];
        let PoolName = [];
        let y = [];
        if (APIResponse.data.length !== 0) {
          APIResponse.data.pooldetails.forEach(function (key, value) {
            y.push({ label: key.poolname, value: key.poolID });
            PoolID.push(key.poolID);
            PoolName.push(key.poolname);
          });
        }
        this.setState({ PoolDropdown: y, PoolListLoader: false });
        console.log("pd", this.state.PoolDropdown);
      }
    } else {
      const message = "Couldn't fetch the record";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };
  MapPoolToLoan = async () => {
    console.log("poollist", this.state.PoolList);
    let filterdata = this.state.PoolList.pooldetails.filter((value) => {
      return value.poolID === this.state.formData1.poolname;
    });
    console.log("filterdata", filterdata[0].poolname);
    var data = {};
    data.loanid = this.state.loandetails;
    data.aitrainedpoolname = filterdata[0].aitrainedpoolname;
    data.poolid = this.state.formData1.poolname;
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
      }
    }
  };
  UpdateLoanAndPoolStatus = async (value) => {
    sessionStorage.setItem("poolname", value);
    sessionStorage.setItem("poolid", this.state.formData1.poolname);
    var data = {};
    data.poolid = this.state.formData1.poolname;
    data.poolStatus = "Created";
    data.loanStatus = "Mapped";
    data.token = this.state.token;
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
    // this.props.history.push("/admin/pooldetails");
    window.location.assign("/admin/pooldetails");
  };
  GetAllLoans = async () => {
    this.setState({ getLoansLoader: true });
    var data = {};
    data.issuerId = this.state.UserId;
    data.token = this.state.token;
    const APIResponse = await GetAllLoans(data);

    if (APIResponse.status === 200) {
      // let filterdata = APIResponse.data.filter((value) => {
      //   return value.Status === "Unmapped";
      // });
      let display = [];
      console.log("Allpoolonboardingdata--", APIResponse);
      this.setState({
        getLoansLoader: false,
        open: true,
        tableData: APIResponse.data,
        loading: true,
      });

      if (APIResponse.data.length !== 0) {
        console.log("apires", APIResponse);
        Object.keys(APIResponse.data[0]).map((val) => {
          console.log("valll", { val, APIResponse });
          if (
            val == "_id" ||
            val == "issuerId" ||
            val == "poolid" ||
            val == "asset_class"
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
        console.log("col", this.state.columns);
      } else {
        this.setState({ tableData: [] });
      }
      this.GetAllPools();

      // const message = "Record Fetched Successfully";
      // this.props.enqueueSnackbar(message, {
      //   variant: "info",
      //   autoHideDuration: 3000,
      // });
    } else {
      const message = "Couldn't fetch the record";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
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
    const val = this.state.formData.AsOfDate;
    data.filename = value;
    data.issuerId = this.state.UserId;
    data.asset_class = this.state.formData.asset_class;
    // data.verificationtemplate = this.state.formData.verification_template;
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
        this.closeAddLoanModal();
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

  FilteredLoans = async () => {
    const originalMinDate = new Date(this.state.modalData.mindate);
    console.log("originalMinDate", originalMinDate);
    const minday = originalMinDate.getDate();
    const minmonth = originalMinDate.getMonth() + 1;
    const minyear = originalMinDate.getFullYear();
    const formattedMinDate = `${minmonth.toString().padStart(2, "0")}/${minday
      .toString()
      .padStart(2, "0")}/${minyear}`;

    const originalMaxDate = new Date(this.state.modalData.maxdate);
    const maxday = originalMaxDate.getDate();
    const maxmonth = originalMaxDate.getMonth() + 1;
    const maxyear = originalMaxDate.getFullYear();
    const formattedMaxDate = `${maxmonth.toString().padStart(2, "0")}/${maxday
      .toString()
      .padStart(2, "0")}/${maxyear}`;
    var data = {};
    // delete data.principleAmount;
    data.assetclass = this.state.modalData.assetclass;
    data.issuerId = this.state.UserId;
    data.mindate = formattedMinDate;
    data.maxdate = formattedMaxDate;
    data.minprincipalamt = this.state.modalData.principleAmount.min.toString();
    data.maxprincipalamt = this.state.modalData.principleAmount.max.toString();
    // data.minprincipalamt = "300"
    //data.maxprincipalamt = "2040"
    data.contractdata =
      this.state.modalData.contractdigitized === true ? "Yes" : "No";

    data.token = this.state.token;
    console.log("GetAllPools---" + JSON.stringify(data));
    this.setState({ formLoader: true });
    const APIResponse = await FilteredLoans(data);

    console.log(APIResponse);
    if (APIResponse.status !== 200) {
      const message = "Something went wrong, please try again";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 5000,
      });
      this.setState({ formLoader: false });
      this.onCloseModal();
    } else if (APIResponse.status === 200) {
      if (APIResponse.data.success === true) {
        this.setState({ formLoader: false });
        sessionStorage.setItem(
          "filteredloans",
          JSON.stringify(APIResponse.data.data)
        );

        // this.props.history.push("/admin/filteredloans");
        window.location.assign("/admin/filteredloans");
      } else {
        this.setState({ formLoader: false });
        const message = "No data found";
        this.props.enqueueSnackbar(message, {
          variant: "error",
          autoHideDuration: 5000,
        });
      }
    } else {
      this.setState({ formLoader: false });
      const message = "Something went wrong, please try again";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 5000,
      });
    }
  };

  deleteloans = async () => {
    var data = {};
    data.loanid = this.state.loandetails;
    data.issuerid = this.state.UserId;
    console.log("GetAllPools---" + JSON.stringify(data));
    this.setState({ formLoader: true });
    const APIResponse = await deleteloans(data, this.state.token);
    console.log(APIResponse);
    if (APIResponse.status !== 200) {
      const message = "Something went wrong, please try again";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 5000,
      });
      this.setState({ formLoader: false });
      this.onCloseModal1();
    } else {
      const message = "Pool Added successfully!";
      this.props.enqueueSnackbar(message, {
        variant: "info",
        autoHideDuration: 1000,
      });
      this.setState({ formLoader: false });
      this.onCloseModal1();
      this.GetAllLoans();
    }
  };

  previewDeleteLoans = async () => {
    this.setState({ formLoader: true });
    var data = {};
    data.loanid = this.state.loandetails;
    data.issuerId = this.state.UserId;
    data.token = this.state.token;
    const APIResponse = await previewDeleteLoans(data);
    if (APIResponse.status !== 200) {
      const message = "Something went wrong, please try again";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 5000,
      });
      this.setState({ formLoader: false });
      this.onCloseModal1();
    } else {
      const message = "Loan Deleted successfully!";
      this.props.enqueueSnackbar(message, {
        variant: "info",
        autoHideDuration: 1000,
      });
      this.setState({ formLoader: false });
      this.onCloseModal1();
      window.location.reload();
    }
  };

  async componentDidMount() {
    var component = window.location.pathname;
    sessionStorage.setItem("component", component);
    sessionStorage.removeItem("filterloans");
    this.GetAllLoans();
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

  handleChange11 = (e) => {
    console.log(e);
    this.setState({ value1: e.target.value });
  };

  formatLabel(value) {
    return `$${value.toLocaleString()}M`;
  }
  handleReset = () => {
    this.setState({
      modalData: {
        contractdigitized: false,
        principleAmount: { min: 50, max: 5000000000 },
        mindate: "",
        maxdate: "",
        assetclass: "",
      },
    });
    //this.onCloseModal()
  };

  onSubmit = (e) => {
    e.preventDefault();
    sessionStorage.setItem("functiontodo", "upload");
    this.Uploadloanlms();
  };

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
      selectableRows: true,
      selectToolbarPlacement: "none",
      onRowClick: this.onRowClick,
      onRowsSelect: this.onRowsSelect,
      onChangePage: this.onChangePage,
      rowsSelected: this.state.rowsSelected,
      rowsPerPage: [10],
      rowsPerPageOptions: [10, 50, 100],
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
          if (col && col.toString().indexOf(searchQuery) >= 0) {
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
              "Sorry, there is no matching data to display"
            ) : (
              <Loader msg={"Please wait, Loading Loan Data"} />
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

    const isMapped = this.state.loandetails.some((loanID) => {
      const index = this.state.tableData.findIndex(
        (rowData) => rowData["Loan ID"] === loanID
      );
      return index !== -1 && this.state.tableData[index].Status === "Unmapped";
    });

    // const filteredData = this.state.searchTerm
    //   ? this.filterData(this.state.searchTerm)
    //   : this.state.tableData;

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
        label: "Borrower Name",
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
        label: "As of Date",
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
    // const maxWidths = {};
    // columns.forEach((column) => {
    //   const maxColumnWidth = Math.max(
    //     ...this.state.tableData.map((row) => String(row[column.name]).length)
    //   );
    //   maxWidths[column.name] = maxColumnWidth * 10; // Assuming each character takes 10px width
    // });

    return (
      <React.Fragment>
        <div className="page">
          <Sidebar activeComponent={"Loans"} />
          <div className="content1">
            <div className="page-content-is">
              <div className="row row1">
                <div className="investor-heading-container">
                  <h1 className="headerdashboard">Loans</h1>
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
                      <div className="dashboard-top-right-container1">
                        {selectedArrLen === 0 ? (
                          <button
                            className="disabled-del"
                            type="button"
                            //  onClick={this.handleDeleteLoan}
                            //  disabled={selectedArrLen === 0}
                          >
                            <DeleteIcon />
                          </button>
                        ) : (
                          <button
                            className="search-mui-icons"
                            type="button"
                            onClick={this.handleDeleteLoan}
                            disabled={selectedArrLen === 0}
                          >
                            <DeleteIcon />
                          </button>
                        )}
                      </div>
                    </div>

                    <div>
                      <div className="dashboard-top-right-container1">
                        <button
                          className="search-mui-icons"
                          type="button"
                          onClick={this.onOpenModal.bind(this)}
                        >
                          <FilterListOutlinedIcon />
                        </button>
                      </div>
                    </div>
                    {/* Delete button */}
                    {/* {selectedArrLen > 0 ? (
                      <button
                        className="va-popup-close-btn1"
                        type="submit"
                        onClick={this.onOpenModal1.bind(this)}
                      >
                        Delete
                      </button>
                    ) : (
                      <button type="submit" className="va-popup-close-btn1-disabled" disabled>Delete</button>
                    )} */}
                    <Button
                      className="card__button2"
                      type="submit"
                      onClick={this.openAddLoanModal.bind(this)}
                    >
                      Add Loans
                    </Button>
                    {selectedArrLen > 0 && isMapped ? (
                      <Button
                        style={{ width: "160px" }}
                        variant="contained"
                        color="primary"
                        type="submit"
                        onClick={this.onOpenMaptoPool.bind(this)}
                      >
                        Map To Pool
                      </Button>
                    ) : (
                      <Button
                        style={{ width: "160px" }}
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled
                      >
                        Map To Pool
                      </Button>
                    )}
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
                            ? this.state.filteredData.length * 50 > 620
                              ? 620
                              : this.state.filteredData.length * 50 + 90
                            : 620,
                          overflow: "auto",
                          borderRadius: "1rem",
                          overflowAnchor: "none",
                        }}
                        fixedHeaderContent={() => (
                          <TableRow>
                            <>
                              <TableCell>
                                <Checkbox
                                  style={{ transform: "scale(0.8)" }}
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
                                    // width: `${maxWidths[column.name]}px`,
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
                                    <SortIcon
                                      sortAscending={this.state.sortAscending}
                                    />
                                  </div>
                                </TableCell>
                              ))}
                            </>
                          </TableRow>
                        )}
                        itemContent={(index) => {
                          const { searchTerm, filteredData, tableData } =
                            this.state;
                          const rowData = searchTerm
                            ? filteredData[index]
                            : tableData[index];
                          const isRowSelected = this.state.selectedRows.has(
                            rowData["Loan ID"]
                          );
                          const isOddRow = index % 2 !== 0;
                          const renderCellContent = (column, value) => {
                            if (!value || value === "") return "-"; // Display "-" for empty or unavailable values
                            if (column.name === "Original Principal Balance") {
                              return formatNumberWithCommas(value);
                            }
                            if (column.bodyRenderer) {
                              return column.bodyRenderer(value);
                            }
                            return value;
                          };
                          console.log("tablevalue", tableData[index]);
                          return (
                            <>
                              <TableCell
                                style={{
                                  backgroundColor: isOddRow
                                    ? "rgb(229,229,229,0.3)"
                                    : "",
                                    border :"none",
                                }}
                              >
                                <Checkbox
                                  style={{ transform: "scale(0.8)" }}
                                  checked={
                                    isRowSelected || this.state.selectAll
                                  }
                                  onChange={() =>
                                    this.toggleRowSelection(rowData["Loan ID"])
                                  }
                                />
                              </TableCell>
                              {columns?.map((column) => (
                                <TableCell
                                  style={{
                                    width: `${column.length * 10}px`,
                                    // width: `${maxWidths[column.name]}px`,
                                    background: "white",
                                    whiteSpace: "nowrap",
                                    border :"none",
                                    backgroundColor: isOddRow
                                      ? "rgb(229,229,229,0.3)"
                                      : "",
                                    textAlign:
                                      rowData[column.name] ===
                                      (null || undefined)
                                        ? "center"
                                        : "",
                                  }}
                                >
                                  {renderCellContent(
                                    column,
                                    rowData[column.name]
                                  )}
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

          {/* Filter Loans */}
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
                    <h2>Filter Loans</h2>
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
                      <div className="input-container">
                        <label className="label">Asset Class</label>
                        <select
                          required
                          className="input-select"
                          onChange={(e) => {
                            this.setState({
                              modalData: {
                                ...this.state.modalData,
                                assetclass: e.target.value,
                              },
                            });
                          }}
                          value={this.state.modalData.assetclass}
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

                      <div className="radio-input-container">
                        <p>Is the Loan Contract available?</p>
                        <div className="radio1-container">
                          <p>No</p>
                          <div class="switch1">
                            <label
                              htmlFor="three"
                              class="switch1__label"
                            ></label>
                            <input
                              name="switch1"
                              id="three"
                              type="radio"
                              value={false}
                              onChange={(e) => {
                                this.setState({
                                  modalData: {
                                    ...this.state.modalData,
                                    contractdigitized: false,
                                  },
                                });
                              }}
                            />
                            <input
                              name="switch1"
                              id="four"
                              type="radio"
                              value={truncate}
                              onChange={(e) => {
                                this.setState({
                                  modalData: {
                                    ...this.state.modalData,
                                    contractdigitized: true,
                                  },
                                });
                              }}
                            />
                            <label
                              htmlFor="four"
                              class="switch1__label"
                            ></label>
                            <div class="switch1__indicator">
                              <div className="fields-radion-button-center" />
                            </div>
                          </div>
                          <p>Yes</p>
                        </div>
                      </div>

                      <div className="range-container">
                        <p>Original Principal</p>
                        <br></br>
                        <InputRange
                          draggableTrack
                          maxValue={9999999999}
                          minValue={0}
                          value={this.state.modalData.principleAmount}
                          onChange={(e) => this.handleInputChange(e)}
                          formatLabel={this.formatLabel}
                        />
                      </div>

                      <br />

                      <div className="input-container">
                        <label className="label">As of Date</label>
                        <br />
                        <div
                          style={{
                            display: "flex",
                            gap: "120px",
                            alignItems: "center",
                          }}
                        >
                          {/* <input
                            required
                            placeholder="DD/MM/YYYY"
                            className="fields-date-input"
                            type="date"
                            onChange={(e) => {
                              this.setState({
                                modalData: {
                                  ...this.state.modalData,
                                  mindate: e.target.value,
                                },
                              });
                            }}
                            value={this.state.modalData.mindate}
                          /> */}
                          <div style={{ width: "25%" }}>
                            <DatePicker
                              required
                              placeholderText="MM/DD/YYYY"
                              dateFormat="MM/dd/yyyy"
                              className="input-select"
                              selected={this.state.modalData.mindate}
                              onChange={(date) => {
                                this.setState({
                                  modalData: {
                                    ...this.state.modalData,
                                    mindate: date,
                                  },
                                });
                              }}
                            />
                          </div>
                          <p className="input-date-text-ele">To</p>

                          {/* <input
                            required
                            placeholder="DD/MM/YYYY"
                            className="fields-date-input"
                            type="date"
                            onChange={(e) => {
                              this.setState({
                                modalData: {
                                  ...this.state.modalData,
                                  maxdate: e.target.value,
                                },
                              });
                            }}
                            value={this.state.modalData.maxdate}
                          /> */}
                          <div style={{ width: "25%" }}>
                            <DatePicker
                              required
                              placeholderText="MM/DD/YYYY"
                              dateFormat="MM/dd/yyyy"
                              className="input-select"
                              selected={this.state.modalData.maxdate}
                              onChange={(date) => {
                                this.setState({
                                  modalData: {
                                    ...this.state.modalData,
                                    maxdate: date,
                                  },
                                });
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="modalsubmit">
                        <div className="submitbuttonbg">
                          <div className="row">
                            <div className="row justify-content-start">
                              <button
                                type="button"
                                className="popupbutton1"
                                onClick={this.handleReset}
                              >
                                {" "}
                                Reset{" "}
                              </button>
                            </div>
                            <div className="row justify-content-end">
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
                                Apply
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

          {/* Map Loan Field Popup */}
          <div id="modal">
            <ReactModal
              isOpen={this.state.openMapLoanField}
              onRequestClose={this.closeMapLoanField}
              contentLabel="Minimal Modal Example"
              //style={customStylesauto}
            >
              <React.Fragment>
                <div className="popupTitle">
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
                    poolid={""}
                    mappingDataKey={this.state.mappingDataKey}
                    dataFromMappingField={this.handleChildData}
                    loandataupdtaedtill={this.state.loandate}
                  />
                </div>
              </React.Fragment>
            </ReactModal>
          </div>

          {/* Add loan popup */}
          <div id="modal1">
            <ReactModal
              isOpen={this.state.openAddLoan}
              onRequestClose={this.closeAddLoanModal}
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
                      onClick={this.closeAddLoanModal}
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
                        <label className="label">Asset Class*</label>
                        <select
                          required
                          className="input-select"
                          onChange={(e) => {
                            this.setState({
                              formData: {
                                ...this.state.formData,
                                asset_class: e.target.value,
                              },
                            });
                          }}
                          value={this.state.formData.asset_class}
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

                      {/* <p className="error-msg">
                            {this.state.showMessageData1}
                            {this.state?.LoanIdData === undefined
                              ? this.state?.ColumnName.map((name) => (
                                  <li>{name}</li>
                                ))
                              : this.state?.LoanIdData.map((name) => (
                                  <li>{name}</li>
                                ))}
                          </p> */}

                      {/* <div className="input-container">
                        <label className="label">Verification Template*</label>
                        <select
                          required
                          className="input-select"
                          onChange={(e) => {
                            this.setState({
                              formData: {
                                ...this.state.formData,
                                verification_template: e.target.value,
                              },
                            });
                          }}
                          value={this.state.formData.verification_template}
                        >
                          <option
                            value=""
                            disabled
                            className="selectclass"
                          >
                            Select any one
                          </option>
                          <option value="New">New</option>
                          {this.state.verificationTemplate?.map((item) => {
                            return (
                              <option value={item.value}>
                                {item.label}
                              </option>
                            );
                          })}
                        </select>
                      </div> */}

                      <div className="input-container">
                        <label className="label">As of Date*</label>
                        <br />
                        <div className="input-container">
                          <DatePicker
                            required
                            placeholderText="MM/DD/YYYY"
                            dateFormat="MM/dd/yyyy"
                            className="input-select"
                            selected={this.state.formData.AsOfDate}
                            onChange={this.handleDateChange}
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
                                onClick={this.closeAddLoanModal}
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

          <div id="modal1">
            <ReactModal
              isOpen={this.state.open2}
              onRequestClose={this.onCloseModal1}
              contentLabel="Minimal Modal Example"
              style={customStylesautosmallmodal1}
            >
              <React.Fragment>
                <div className="modalPopup2-il">
                  <h3 className="popupheading">
                    Are you sure, you want to Delete the loans ?
                  </h3>

                  {/* {this.state.popupLoader === true ? <CircularProgress size="30px" color="secondary" /> : ' '} */}

                  <div className="modalshiftcontent">
                    <div className="modalsubmit">
                      <div className="submitbuttonbg">
                        <div className="row">
                          <div className="row justify-content-end11">
                            <button
                              type="button"
                              className="popupbutton1"
                              onClick={this.onCloseModal1}
                            >
                              {" "}
                              Cancel{" "}
                            </button>

                            <Button
                              variant="contained"
                              color="primary"
                              type="submit"
                              onClick={this.previewDeleteLoans}
                            >
                              Delete
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
                    {/* {this.state.openPopup === true ? <React.Fragment><Snackbar msg={"Processor addded Successfully" || this.state.message} open="true" /> </React.Fragment> : ' '} */}
                  </div>
                </div>
              </React.Fragment>
            </ReactModal>
          </div>

          <div className="filter">
            <div id="modal1">
              <ReactModal
                isOpen={this.state.openMapToPool}
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
                        onClick={this.onCLoseMaptoPool}
                      >
                        {" "}
                        <CloseIcon></CloseIcon>{" "}
                      </button>
                    </div>
                    <div className="modalshiftcontent">
                      <form
                        className="form-container"
                        onSubmit={this.onMaptoPoolSubmit}
                      >
                        <div className="input-container">
                          <label className="label">Pool Name</label>
                          {this.state.PoolListLoader === false ? (
                            <select
                              required
                              className="input-select"
                              onChange={(e) => {
                                this.setState({
                                  formData1: {
                                    ...this.state.formData1,
                                    poolname: e.target.value,
                                  },
                                });
                              }}
                              value={this.state.formData1.poolname}
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
                                  onClick={this.onCLoseMaptoPool}
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

export default withSnackbar(IssuerLoans);
