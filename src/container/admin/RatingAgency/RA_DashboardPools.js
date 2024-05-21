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
import {
  widgets,
  CustomFieldTemplate,
  customStyles,
  customStylesauto,
  customStylesautosmallmodal,
} from "../../../components/customscripts/customscript";
import FormLoader from "../../../components/loader/formLoader";
import {
  getallratingagencypool,
  CreateDealUW,
  previewupdatePoolStatus,
  UpdatePoolStatus
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
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import NumberComp2 from "../../../components/NumberComp2";
import { TableVirtuoso } from "react-virtuoso";
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
class RA_DashboardPools extends Component {
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
      formData: {
        note: "",
      },
      firstname: sessionStorage.getItem("firstname"),
      lastname: sessionStorage.getItem("lastname"),
      UserId: sessionStorage.getItem("userid"),
      poolName: sessionStorage.getItem("poolname"),
      token: sessionStorage.getItem("token"),
      kycuploadstatus: sessionStorage.getItem("KycUploadStatus"),
      kycverifystatus: sessionStorage.getItem("KycVerifiedStatus"),
      TermsOfService: sessionStorage.getItem("TermsOfService"),
      EmailAddress: sessionStorage.getItem("EmailAddress"),
      activePools: true,
      activeInsights2: false,
      showSearchBox: false,
      organizationname : sessionStorage.getItem("organizationname")
    };
  }
  handleClickUpload = () => {
    this.props.history.push({
      pathname: "/kycloginstep1",
    });
  };
  handleClick = () => {
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
  handleClickDeals = () => {
    this.setState({
      activePools: false,
      activeInsights2: true,
      //   activeInsights3: false,
    });
    window.location.assign("/admin/uw_dashboard_deals");
  };

  handleClickPools = () => {
    this.setState({
      activePools: true,
      activeInsights2: false,
    });
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

  onOpenModal = (value) => {
    console.log("inside modal1");
    this.setState({ open1: true, value: value });
  };
  onOpenModal1 = (value) => {
    console.log("inside modal1");
    this.setState({ open2: true, value: value });
  };

  onCloseModal = () => {
    this.setState({ open1: false });
  };
  onCloseModal1 = () => {
    this.setState({ open2: false });
    this.setState({
      formData: {
        note: "",
      },
    });
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

  // onchange = (e) => {
  //   this.setState({ searchText: e.target.value, searchType: true });
  //   console.log("search: e.target.value", e.target.value);
  // };
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

  getallratingagencypool = async () => {
    this.setState({ getLoansLoader: true, tableData: [], loading: true });
    var data = {};
    data.ratingagency = this.state.UserId;
    data.mailid = this.state.EmailAddress;
    data.token = this.state.token;
    const APIResponse = await getallratingagencypool(data);

    if (APIResponse.status === 200) {
      console.log("AllGetAllPoolsdata--", APIResponse);
      this.setState({
        getLoansLoader: false,
        open: true,
        tableData: APIResponse.data,
        loading: false,
      });
    } else {
      this.setState({ getLoansLoader: false, loading: false });
      const message = "Couldn't fetch the record";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };
  CreateDealUW = async (value) => {
    var data = {};
    data.poolid = value;

    console.log("datata", data);
    data.token = this.state.token;
    const APIResponse = await CreateDealUW(data);

    if (APIResponse.status === 200) {
      this.getallratingagencypool();
    } else {
      const message = "Couldn't create the deal";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  UpdatePoolUWStatus = async (value, pool) => {
    var data = {};

    data.poolid = pool.poolID;
    data.status = value;
    data.userid = this.state.UserId;
    data.organizationname = this.state.organizationname
    data.username = this.state.firstname + this.state.lastname;
    data.message = this.state.formData.note;
    console.log("datata", data);
    this.setState({ formLoader: true });
    data.token = this.state.token;
    const APIResponse = await previewupdatePoolStatus(data);

    if (APIResponse.status === 200) {
      if (value == "Accepted By RatingAgency") {
        const message = "Accepted Successfully";
        this.props.enqueueSnackbar(message, {
          variant: "info",
          autoHideDuration: 3000,
        });
        this.getallratingagencypool();
      } else {
        const message = "Rejected Successfully";
        this.props.enqueueSnackbar(message, {
          variant: "info",
          autoHideDuration: 3000,
        });
        this.getallratingagencypool();
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

  PoolDetails = async (value) => {
    sessionStorage.setItem("poolid", value.poolID);
    if (value.status === "Pending") {
      const message = "Please accept the pool";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    } else if (value.status === "Rejected By RatingAgency") {
      const message = "Rejected By RatingAgency";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    } else {
      window.location.assign("/admin/ra_pool_details");
    }
  };

  async componentDidMount() {
    var component = window.location.pathname;
    sessionStorage.setItem("component", component);
    this.getallratingagencypool();
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

  render() {
    const { classes, poolid } = this.props;
    console.log("poolid", poolid);

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
          console.log("table", value);
          return (
            <React.Fragment>
              <div>
                <span>
                  <button
                    className="popupbutton1"
                    onClick={() => this.PoolDetails(value)}
                  >
                    View Details
                  </button>
                  {value.status == "Pending" ? (
                    <React.Fragment>
                      <button
                        className="popupbuttons1 uw-popup-button"
                        onClick={() => this.onOpenModal(value)}
                      >
                        Accept
                      </button>
                      <button
                        className="popupbuttons1"
                        onClick={() => this.onOpenModal1(value)}
                      >
                        Reject
                      </button>
                    </React.Fragment>
                  ) : null}
                </span>
                {/* </Button> */}
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
              <Sidebar activeComponent={"Pools"} />
              <div className="content1">
                <div className="page-content">
                  <div className="row row1">
                    <div className="investor-heading-container">
                      <h1 className="headerdashboard">Pools</h1>
                    </div>

                    <div>
                      <div className="dashboard-top-right-container1">
                        <div className="search-bar-outer-container uw-search-button-container">
                          {this.state.showSearchBox == false ? (
                            <Button
                              variant="contained"
                              color="primary"
                              type="button"
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
                                : this.state.tableData.length * 50 + 90,
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
                                      width: `${column.length * 10}px`,
                                      whiteSpace: "nowrap",
                                      height: "50px",
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
                                        width: `${column.length * 10}px`,
                                        background: "white",
                                        whiteSpace: "nowrap",
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
                      <h2>Are you sure you want to Accept the Pool?</h2>
                      <div className="modalshiftcontent">
                        <p>
                          Once accepted, this Pool will be converted into a
                          Deal, and the Issuer will be notified that you have
                          agreed to underwrite this Deal.
                        </p>
                        <div className="modalsubmit">
                          <div className="submitbuttonbg">
                            <div className="row">
                              <div className="row justify-content-accept">
                                <button
                                  type="button"
                                  className="closePopup"
                                  onClick={this.onCloseModal}
                                >
                                  {" "}
                                  Cancel{" "}
                                </button>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  onClick={() =>
                                    this.UpdatePoolUWStatus(
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
                        {/* </form> */}

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
                      <h2>Are you sure you want to Reject the Pool?</h2>
                      <div className="modalshiftcontent">
                        <p>
                          Once rejected, the Issuer will be notified that you
                          have denied to underwrite this Deal.
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
                                className="closePopup"
                                onClick={this.onCloseModal1}
                              >
                                {" "}
                                Cancel{" "}
                              </button>
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={() =>
                                  this.UpdatePoolUWStatus(
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

export default withSnackbar(RA_DashboardPools);
