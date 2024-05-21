/* eslint-disable require-jsdoc */
import React, { Component } from "react";
import Sidebar from "../../../../components/sidebar";
import Button from "@material-ui/core/Button";
import { withSnackbar } from "notistack";
import "react-input-range/lib/css/index.css";
import { Category } from "@material-ui/icons";
import { PreviewMappedFields } from "../../../../servies/services";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import LinearLoader from "../../../../components/loader/LinearLoader";
import * as moment from "moment";

import SearchIcon from "@material-ui/icons/Search";
import { TableVirtuoso } from "react-virtuoso";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

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
class Preview_Mapped_fields extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFullScreen: false,
      loading: false,
      tableData: [],
      servicerDealName: sessionStorage.getItem('dealName'),
      servicerPaymentDate: sessionStorage.getItem('paymentDate'),
      DealName:
        sessionStorage.getItem("dealname") === null
          ? sessionStorage.getItem("servicerdealname")
          : sessionStorage.getItem("dealname"),
      ServicerName:
        sessionStorage.getItem("Servicer") === null
          ? sessionStorage.getItem("servicerdashboardname")
          : sessionStorage.getItem("Servicer"),
      detailsDate:
        sessionStorage.getItem("selectdate") === null
          ? sessionStorage.getItem("selectservicerdate")
          : sessionStorage.getItem("selectdate"),
      peer: sessionStorage.getItem("peer_insurer"),
      peers: JSON.parse(sessionStorage.getItem("peers")),
      activeInsights1: false,
      activeInsights2: false,
      activeInsights3: false,
      activeInsights4: true,
      activeInsights5: false,
      screenloader: false,
      MapDataValues: [],
      MapDataKeys: [],
      data: [],
      searchTerm: "",
      isDataFound: true,
      isSearchOpen: false,
      sortColumn: "", // Track the currently sorted column
      sortAscending: true,
      userid: sessionStorage.getItem('userid'),
      token: sessionStorage.getItem('token')
    };
  }

  handleSort = (column) => {
    const { sortColumn, sortAscending, tableData } = this.state;

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

    // Sort the table data based on the selected column and sort order
    const sortedTableData = [...tableData].sort(compareFunc);

    this.setState({
      tableData: sortedTableData,
      sortColumn: column,
      sortAscending: newSortAscending,
    });
  };

  handleSearchIconClick = () => {
    this.setState({
      isSearchOpen: true,
    });
  };

  toggleFullScreen = () => {
    this.setState((prevState) => ({
      isFullScreen: !prevState.isFullScreen,
    }));

    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  handleClickUploadLoanTapes = () => {
    this.setState({
      activeInsights1: true,
      activeInsights2: false,
      activeInsights3: false,
      activeInsights4: false,
      activeInsights5: false,
    });
    window.location.assign("/admin/uploadLoanTape");
  };

  handleClickPreviewLoanTape = () => {
    this.setState({
      activeInsights1: false,
      activeInsights2: true,
      activeInsights3: false,
      activeInsights4: false,
      activeInsights5: false,
    });
    window.location.assign("/admin/previewloantapedetails");
  };
  handleClickMapFields = () => {
    this.setState({
      activeInsights1: false,
      activeInsights2: false,
      activeInsights3: true,
      activeInsights4: false,
      activeInsights5: false,
    });
    window.location.assign("/admin/mapfields");
  };
  handleClickPreviewMappedFields = () => {
    this.setState({
      activeInsights1: false,
      activeInsights2: false,
      activeInsights3: false,
      activeInsights4: true,
      activeInsights5: false,
    });
  };
  handleClickSummarize = () => {
    this.setState({
      activeInsights1: false,
      activeInsights2: false,
      activeInsights3: false,
      activeInsights4: false,
      activeInsights5: true,
    });
    window.location.assign("/admin/summarize");
  };

  PreviewMappedFields = async () => {
    this.setState({ screenloader: true });
    let x = moment(this.state.servicerPaymentDate)
      .subtract(1, "months")
      .format("MM/DD/YYYY")
      .toString();
    let month = x.slice(0, 2);
    let year = x.slice(6, 10);
    var data = {};
    data.DealName = this.state.servicerDealName;
    data.Month = month;
    data.Year = year;
    data.ServicerName = this.state.userid;
    data.peer = this.state.peer;
    data.AssetType = "RRE"

    console.log("datata", data);
    this.setState({ screenloader: true });
    const APIResponse = await PreviewMappedFields(data, this.state.token);
    console.log("APIResponse", APIResponse);

    if (APIResponse.status === 200) {
      if (APIResponse.data.isSuccess === true) {
        const tableData = APIResponse.data?.result || [];
        console.log("tableData", tableData);
        this.setState({
          MapDataKeys: tableData.length > 0 ? Object.keys(tableData[0]) : [],
          MapDataValues: APIResponse.data?.result?.map((item) =>
            Object.keys(item).map((key) => ({ value: item[key] }))
          ),
          screenloader: false,
          tableData: APIResponse.data?.result || ["no data"],
        });
      } else {
        this.setState({ screenloader: false });
        const message = APIResponse.data.result;
        this.props.enqueueSnackbar(message, {
          variant: "error",
          autoHideDuration: 3000,
        });
      }
    } else {
      this.setState({ screenloader: false });
      const message = APIResponse.data.message;
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  goBackToDashBoard = () => {
    // if (sessionStorage.getItem("user_name") === "Trustee") {
    //   this.props.history.push({
    //     pathname: "/admin/viewdetails",
    //     state: { details: this.state.detailsDate },
    //   });
    // } else {
    //   this.props.history.push({
    //     pathname: "/dashboard/servicer",
    //   });
    // }
    window.location.assign("/admin/mapfields")
  };

  componentDidMount() {
    // this.dealPreviewMapFields();
    this.PreviewMappedFields()
  }
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
      data: filteredData,
      isDataFound: filteredData.length > 0,
    });
  };

  clearSearch = () => {
    this.setState({
      searchTerm: "",
      data: this.state.tableData, // Reset the data to the original dataset
    });
  };

  filterData = (searchTerm) => {
    const { tableData } = this.state;

    const filteredData = tableData.filter((row) =>
      Object.values(row).some((value) => {
        if (typeof value === "string") {
          return value.toLowerCase().includes(searchTerm.toLowerCase());
        }
        return false;
      })
    );

    return filteredData;
  };

  render() {
    const {
      searchTerm,
      isDataFound,
      tableData,
      MapDataKeys,
      data,
      isSearchOpen,
      sortColumn,
      sortAscending,
    } = this.state;

    const filteredData = searchTerm ? this.filterData(searchTerm) : tableData;

    return (
      <React.Fragment>
        <div className="page">
          <Sidebar
            activeComponent={"ServicerDashboardDeals"}
          />
          <div className="content1">
            {this.state.screenloader == true ? (
              <LinearLoader></LinearLoader>
            ) : (
              <div className="page-contentofpool1">
                <div className="row1">
                  <div className="col-12 col-sm-6 col-md-2 d-flex justigy-content-center align-center hellocard">
                    <KeyboardBackspaceIcon
                      onClick={() => this.goBackToDashBoard()}
                      className="left-arrow-muis1 left-arrow-servicer"
                    ></KeyboardBackspaceIcon>
                    <h3 className="headerdashboard">Servicer Details</h3>
                  </div>
                  <div className="col-12 col-sm-6 col-md-10 hellocard">
                    <div className="recurring_details">
                      <div>
                        <label className="dealInfo">Deal Name : </label>
                        <h6 className="dealInfo1">{this.state.servicerDealName}</h6>
                      </div>
                      <div>
                        <label className="dealInfo">Payment Date : </label>
                        <h6 className="dealInfo1">{this.state.servicerPaymentDate}</h6>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row row1">
                  <div>
                    <div className="tablechangebuttonloans">
                      <button
                        type="button"
                        onClick={() => this.handleClickUploadLoanTapes()}
                        className={
                          this.state.activeInsights1 == true
                            ? "issuerDashboard-table-top-button-insights-active"
                            : "issuerDashboard-table-top-button-insights"
                        }
                      >
                        Upload Loan Tapes
                      </button>

                      <button
                        type="button"
                        onClick={() => this.handleClickPreviewLoanTape()}
                        className={
                          this.state.activeInsights2 == true
                            ? "issuerDashboard-table-top-button-rejected-active"
                            : "issuerDashboard-table-top-button-rejected"
                        }
                      >
                        Preview Loan Tape
                      </button>
                      <button
                        type="button"
                        onClick={() => this.handleClickMapFields()}
                        className={
                          this.state.activeInsights3 == true
                            ? "issuerDashboard-table-top-button-workbench-active"
                            : "issuerDashboard-table-top-button-workbench"
                        }
                      >
                        Map Fields
                      </button>
                      <button
                        type="button"
                        onClick={() => this.handleClickPreviewMappedFields()}
                        className={
                          this.state.activeInsights4 == true
                            ? "issuerDashboard-table-top-button-rejected-active"
                            : "issuerDashboard-table-top-button-rejected"
                        }
                      >
                        Preview Map Fields
                      </button>
                      <button
                        type="button"
                        onClick={() => this.handleClickSummarize()}
                        className={
                          this.state.activeInsights5 == true
                            ? "issuerDashboard-table-top-button-rejected-active"
                            : "issuerDashboard-table-top-button-rejected"
                        }
                      >
                        Summarize
                      </button>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <div>
                      <div className="search-container active">
                        <input
                          type="text"
                          value={searchTerm}
                          onChange={this.handleSearch}
                          placeholder="Search..."
                          className="search-input"
                        />
                        <span
                          className="search-icon"
                          onClick={this.handleSearchIconClick}
                        >
                          <SearchIcon />
                        </span>
                      </div>

                      {!isDataFound && <p>No data found.</p>}
                    </div>

                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      style={{ width: "7rem" }}
                      onClick={() => this.handleClickSummarize()}
                    >
                      Next
                    </Button>
                  </div>
                </div>

                {this.state.screenloader == true ? (
                  //   <LinearLoader></LinearLoader>
                  ''
                ) : (
                  <React.Fragment>
                    <div
                      style={{
                        overflow: "auto",
                        borderRadius: "10px",
                        border: "0.5px solid black",
                      }}
                    >

                      <TableVirtuoso
                        style={{ height: 800 }}
                        data={filteredData}
                        components={TableComponents}
                        fixedHeaderContent={() => (
                          <TableRow>
                            <>
                              <TableCell
                                style={{ background: "white", width: "100px" }}
                              ></TableCell>
                              {MapDataKeys.map((column, index) => (
                                <TableCell
                                  key={index}
                                  style={{
                                    background: "white",
                                    cursor: "pointer",
                                    width: `${column.length * 10}px`,
                                    whiteSpace: "nowrap",
                                  }}
                                  onClick={() => this.handleSort(column)}
                                >
                                  <div style={{ display: "flex", gap: "6px" }}>
                                    {column}
                                    {sortColumn === column && (
                                      <span>{sortAscending ? " ▲" : " ▼"}</span>
                                    )}
                                  </div>
                                </TableCell>
                              ))}
                            </>
                          </TableRow>
                        )}
                        itemContent={(index, row) => (
                          <>
                            <TableCell
                              style={{ background: "white", width: "100px" }}
                            >
                              {index + 1}
                            </TableCell>
                            {MapDataKeys.map((column, columnIndex) => (
                              <TableCell
                                key={columnIndex}
                                style={{
                                  background: "white",
                                  width: `${column.length * 10}px`,
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {row[column]}
                              </TableCell>
                            ))}
                          </>
                        )}
                      />
                    </div>
                    <div></div>
                  </React.Fragment>
                )}
              </div>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withSnackbar(Preview_Mapped_fields);
