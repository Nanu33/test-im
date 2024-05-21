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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TableContainer,
} from "@material-ui/core";
import { withSnackbar } from "notistack";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddIcon from "@material-ui/icons/Add";
import { withTheme } from "react-jsonschema-form";
import { Theme as MuiTheme } from "rjsf-material-ui";
import FormLoader from "../../../../components/loader/formLoader";
import { getDealsByUnderwriter } from "../../../../servies/services";
import PropTypes from "prop-types";
import { FullscreenExit, TrainRounded } from "@material-ui/icons";
import {
  ThemeProvider,
  createTheme,
  MuiThemeProvider,
} from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import { SliderThumb } from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import AddCircleOutlinedIcon from "@material-ui/icons/AddCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import NumberComp2 from "../../../../components/NumberComp2";
import { TableVirtuoso } from "react-virtuoso";
import Arrow from "../../../../images/Arrow.png";

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
class UW_Dashboard_Deals extends Component {
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
      UserId: sessionStorage.getItem("userid"),
      poolName: sessionStorage.getItem("poolname"),
      token: sessionStorage.getItem("token"),
      EmailAddress: sessionStorage.getItem('EmailAddress'),
      activePools: false,
      activeDeals: true,
      showSearchBox: false,
    };
  }

  handleClickDeals = () => {
    this.setState({
      activePools: false,
      activeDeals: true,
      activeInsights3: false,
    });
    window.location.assign("/admin/uw_dashboard_deals");
  };
  handleClickPools = () => {
    this.setState({
      activePools: false,
      activeDeals: false,
      activeInsights3: true,
    });
    window.location.assign("/admin/uw_dashboard_pools");
  };
  handleSort = (column) => {
    const {
      sortColumn,
      sortAscending,
      tableData,
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
      const sortedPoolDetails = tableData.slice().sort((a, b) => {
        const indexA = notificationlist.indexOf(a["poolID"]);
        const indexB = notificationlist.indexOf(b["poolID"]);
        const sortOrder = newSortAscending ? indexB - indexA : indexA - indexB;
        return sortOrder;
      });

      this.setState({
        tableData: sortedPoolDetails,
        sortColumn: column,
        sortAscending: newSortAscending,
      });
      return;
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

  getDealsByUnderwriter = async () => {

    this.setState({ getLoansLoader: true, tableData: [], loading: true });
    var data = {}
    data.underwriterId = this.state.UserId
    data.mailid = this.state.EmailAddress
    data.token = this.state.token
    const APIResponse = await getDealsByUnderwriter(data);

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
  ViewDetails = (value) => {
    console.log('value', value);
    sessionStorage.setItem("dealId", value);
    window.location.assign('/admin/uw_deal_details')
  }

  async componentDidMount() {
    var component = window.location.pathname
    sessionStorage.setItem('component', component)
    this.getDealsByUnderwriter()
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
        MuiCircularProgress: {
          colorSecondary: {
            color: "#048c88 !important",
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
            fontFamily: "Catamaran !important",
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
            fontFamily: "Mulish !important",
            paddingLeft: "5px !important",
            paddingRight: "5px !important",
          },
          titleText: {
            fontFamily: "Mulish !important",
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
            fontFamily: "Mulish !important",
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
            marginRight: `${this.state.currentPage >= 1 && this.state.currentPage <= 9 ? "-138" : this.state.currentPage >= 10 ? '-142' : "-130"}px`,
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
        this.setState({ currentPage: currentPage })
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
              <Loader msg={"Please wait, Loading Deal Data"} />) : (
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
        name: "dealId",
        label: "Deal Id",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "dealName",
        label: "Deal Name",
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
        name: "originalbalance",
        label: "Principal Balance",
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
        name: "numberofloans",
        label: "No. of Loans",
        options: {
          filter: true,
          sort: true,
        },
      },

      {
        name: "numberofTranches",
        label: "No. of Tranches",
        options: {
          filter: true,
          sort: true,
        },
      },

      {
        name: "createdDate",
        label: "Set-Up On",
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
        key: '1',
        bodyRenderer: (value, tableMeta, updateValue) => {
          console.log('vvvvvvvvvvv', value)
          return (
            <React.Fragment>
              <div>
                {/* <Button variant="outlined" id="optionalbutton" type="submit" onClick={this.onOpenModal1.bind(this)}> */}
                <button
                  onClick={() => this.ViewDetails(value['dealId'])}
                  // to={"/admin/uw_deals_details"}
                  className="login-sign_up-link"
                >
                  View Details
                </button>
                {/* </Button> */}
              </div>
            </React.Fragment>
          );
        },
      },
    ];

    return (
      <React.Fragment>
        <div className="page">
          <Sidebar activeComponent={"Deals"} />
          <div className="content1">
            {/* {this.state.getLoansLoader == false ? (
              ""
            ) : (
              <LinearLoader></LinearLoader>
            )} */}
            <div className="page-content">
              <div className="row row1">
                <div className="investor-heading-container">
                <h1 className="headerdashboard">Deals</h1>
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
                      )
                    }
                    </div>
                  </div>
                </div>
              </div>

              {/* <React.Fragment>
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
              </React.Fragment> */}
              <React.Fragment>
                <div>
                  {this.state.loading ? (
                    <center>
                      <Loader msg={"Please wait, Loading Pool Data"} />
                    </center>
                  ) : (
                    <div id="table-container" style={{ height: "100%", borderRadius: '1rem', overflow: 'auto', border: '1px solid black' }}>
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
                          overflow: 'auto',
                          borderRadius: '1rem',
                          overflowAnchor: 'none'
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
                                    fontWeight: '600',
                                    fontSize: '15px'
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
        </div>
      </React.Fragment>
    );
  }
}

export default withSnackbar(UW_Dashboard_Deals);
