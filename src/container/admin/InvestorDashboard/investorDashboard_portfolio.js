/* eslint-disable require-jsdoc */
import React, { Component } from "react";
// import { connect } from 'react-redux';
import Sidebar from "../../../components/sidebar";
import MUIDataTable from "mui-datatables";
import TextField from "@material-ui/core/TextField";
import Loader from "../../../components/loader";
import axios from "axios";
import CloseIcon from "@material-ui/icons/Close";
import { withSnackbar } from "notistack";
import { getAllInvestmentsByInvId } from "../../../servies/services";
// import {  TrainRounded } from "@material-ui/icons";
import { createTheme, MuiThemeProvider } from "@material-ui/core/styles";
import "react-input-range/lib/css/index.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ReorderIcon from "@material-ui/icons/Reorder";
import BarChartIcon from "@material-ui/icons/BarChart";
import NumberComp2 from "../../../components/NumberComp2";
import Iframe from "react-iframe";

class InvestorDashboard_Portfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRecords: [],
      eligibleloans: {},
      tableData: [],
      tableData2: [],
      loading: false,
      getLoansLoader: false,
      open: false,
      openPopup: false,
      selectedLoanId: [],
      searchText: "",
      rowsSelected: null,
      open1: false,
      open2: false,
      poolName: sessionStorage.getItem("poolname"),
      token: sessionStorage.getItem("token"),
      UserId: sessionStorage.getItem("userid"),
      kycuploadstatus: sessionStorage.getItem("KycUploadStatus"),
      kycverifystatus: sessionStorage.getItem("KycVerifiedStatus"),
      countryofregistration: sessionStorage.getItem("countryofregistration"),
      TermsOfService: sessionStorage.getItem("TermsOfService"),
      EmailAddress: sessionStorage.getItem("EmailAddress"),
      activeInsights1: false,
      activeInsights2: true,
      activeInsights3: false,
      showSearchBox: false,
      reorderchart: true,
      barchart: false,
      interest: false,
      principal: true,
      bdbUrl: "",
    };
  }

  handleClickUpload = () => {
    // this.props.history.push({
    //   pathname: "/kycloginstep1",
    // });
    window.location.assign("/kycloginstep1");
  };
  handleClick = () => {
    // Accountlocked
    // this.props.history.push({
    //   pathname: "/pendingkyc",
    // });
    window.location.assign("/pendingkyc");
  };
  handleClickSubmitted = () => {
    console.log("handleClickSubmitted");
    // this.props.history.push({
    //   pathname: "/kycloginstep2",
    // });
    window.location.assign("/kycloginstep2");
  };

  handleClickInsights = () => {
    this.setState({
      activeInsights1: true,
      activeInsights2: false,
      activeInsights3: false,
    });
    window.location.assign("/admin/investorinsight");
  };

  handleClickInvested = () => {
    this.setState({
      activeInsights1: false,
      activeInsights2: true,
      activeInsights3: false,
    });
  };
  handleClickOpportunities = () => {
    this.setState({
      activeInsights1: false,
      activeInsights2: false,
      activeInsights3: true,
    });
    window.location.assign("/admin/investoropportunites");
  };

  handleClickReorder = () => {
    this.setState({
      reorderchart: true,
      barchart: false,
    });
  };

  handleClickbarchart = () => {
    console.log("hellooooo");
    this.setState({
      reorderchart: false,
      barchart: true,
    });
  };
  handleClickInterest = () => {
    this.setState({
      interest: true,
      principal: false,
    });
  };

  handleClickPrincipal = () => {
    this.setState({
      interest: false,
      principal: true,
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

  ViewDetails = (value) => {
    console.log("value", value);
    sessionStorage.setItem("dealId", value);
    window.location.assign("/admin/investorpooldetails");
  };
  getAllInvestmentsByInvId = async (value) => {
    var data = {};
    data.investorid = this.state.UserId;
    data.mailid = this.state.EmailAddress;
    this.setState({ loading: true });
    data.token = this.state.token;
    const APIResponse = await getAllInvestmentsByInvId(data);

    if (APIResponse.status === 200) {
      this.setState({ tableData: APIResponse.data, loading: false });
    } else {
      const message = "Something went wrong";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  bdbapi = async () => {
    //   let poolidold = JSON.stringify({
    //     'DealID': {
    //         'type': 'in',
    //         'value': ['IMHR22069'],
    //     },
    // });
    // console.log('poolidold', poolidold);
    let mailid = "support@bdb.ai";
    let password = "Intain@321";
    const res = await axios.get(
      "https://bdb.imtest.intainmarkets.us/api/v1/imarkets/link?type=" +
        "portfolio" +
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
        res.data;
      this.setState({ bdbUrl: UrlBdbNew, bdb_loader: false });
    }
  };

  async componentDidMount() {
    var component = window.location.pathname;
    sessionStorage.setItem("component", component);
    this.getAllInvestmentsByInvId();
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
              backgroundColor: " !important",
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
      // pagination: TrainRounded,

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
              <Loader msg={"Please wait, Loading Deal Data"} />
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
        name: "dealid",
        label: "Deal ID",
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
        name: "dealname",
        label: "Deal Name",
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
        name: "tranchename",
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
        name: "originalinvestment",
        label: "Original Investment",
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
        name: "interestrate",
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
        name: "interestpaid",
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
        name: "principalpaid",
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
        name: "outstandinginvestment",
        label: "Outstanding Investment",
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
        name: "dealid",
        label: "Actions",
        options: {
          filter: false,
          sort: false,
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
                <div className="text-center">
                  {/* <Button variant="outlined" id="optionalbutton" type="submit" onClick={this.onOpenModal1.bind(this)}> */}
                  <button
                    onClick={() => this.ViewDetails(value)}
                    className="login-sign_up-link"
                  >
                    View Details
                  </button>
                  {/* </Button> */}

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
        {this.state.TermsOfService == "Agree" ? (
          this.state.kycverifystatus == "Pending" ? (
            this.state.kycuploadstatus == "No" ? (
              this.handleClickUpload()
            ) : (
              this.handleClick()
            )
          ) : (
            <div className="page">
              <Sidebar activeComponent={"Portfolio"} />
              <div className="content1">
                <div className="page-content">
                  <div className="row row1">
                    <div className="investor-heading-container">
                      <h1 className="headerdashboard">Portfolio</h1>
                    </div>

                    <div>
                      <div className="dashboard-top-right-container1">
                        <div className="search-bar-outer-container">
                          {this.state.showSearchBox == false ? (
                            <button
                              className="search-mui-icons"
                              type="button"
                              onClick={this.onClickSearchButton}
                            >
                              <SearchOutlinedIcon className="reordersize" />
                            </button>
                          ) : (
                            this.searchBar()
                          )
                        }
                        </div>
                        <div className="buttonchartchanges">
                          <buton
                            onClick={() => this.handleClickReorder()}
                            className={
                              this.state.reorderchart == true
                                ? "reorder-chart-active"
                                : "reorder-chart"
                            }
                            type="button"
                          >
                            <ReorderIcon className="reordersize" />
                          </buton>
                          <buton
                            onClick={() => this.handleClickbarchart()}
                            className={
                              this.state.barchart == true
                                ? "barchart-chart-active"
                                : "barchart-chart"
                            }
                            type="button"
                          >
                            <BarChartIcon className="reordersize" />
                          </buton>
                        </div>
                        {/* <Button className="card__button2" type="submit" onClick={this.onOpenModal.bind(this)}>Add Loans</Button>
                    <Button variant="contained" color="primary" type="submit" onClick={this.onOpenModal1.bind(this)}>Set-up Pool</Button> */}
                      </div>
                    </div>
                  </div>

                  <React.Fragment>
                    {this.state.reorderchart == true ? (
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
                    ) : (
                      <div className="workbench-table-container">
                        <React.Fragment>
                          <Iframe
                            // allowtransparency="true"
                            // frameborder="0"
                            // style="background: #FFFFFF;"
                            url={this.state.bdbUrl}
                            // url={pdffile}
                            width="100%"
                            height="850px"
                            id="myId"
                            className="bdb-charts"
                            display="initial"
                            position="relative"
                          />
                        </React.Fragment>
                        {/* <div className="row graphs-container">
                          <div className="col-12 col-sm-6 col-md-4">
                            <div className="page-content3">
                              <div className="pieoutercontainers">
                                <h5 className="headingspace">
                                  Current Investments
                                </h5>
                                <div className="pieoutercontainer">
                                  <div className="pieinnercontainer1-detail">
                                    <PieChart width={340} height={350}>
                                      <Pie
                                        data={piedata}
                                        cx={120}
                                        cy={200}
                                        innerRadius={90}
                                        outerRadius={100}
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
                                  <div className="pieinnercontainerportfolio">
                                    <ul>
                                      <li>Interest Paid</li>
                                      <li>Principal Paid</li>
                                      <li>Outstanding Investment</li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-12 col-sm-6 col-md-4">
                            <div className="page-content3">
                              <div className="pieoutercontainers">
                                <h5 className="headingspace">Metrics</h5>

                                <BarChart
                                  layout="vertical"
                                  width={240}
                                  height={190}
                                  data={horizontalbarchart}
                                  margin={{
                                    top: 20,
                                    right: 20,
                                    bottom: 20,
                                    left: 20,
                                  }
                                  }
                                  className="barchart-chart-container"
                                >

                                  <XAxis type="number" opacity={0} width={120} />
                                  <YAxis

                                    dataKey="name"
                                    type="category"
                                    opacity={1}
                                  />

                                  <Bar
                                    dataKey="pv"
                                    barSize={10}
                                    fill="#FFC000"
                                    radius={10}
                                  />
                                  <Bar
                                    dataKey="pv"
                                    barSize={10}
                                    fill="#169414"
                                    radius={10}
                                  />
                                </BarChart>
                                <div className="pieinnercontainerportfolio">
                                  <ul className="metrics-flex">
                                    <li>Average</li>
                                    <li>Weighted Average</li>

                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-12 col-sm-6 col-md-4">
                            <div className="page-content3">
                              <div className="pieoutercontainer1">
                                <h5 className="headingspace">Cumulative Paid</h5>
                                <div className="interestprincipal">
                                  <buton
                                    type="button"
                                    onClick={() => this.handleClickInterest()}
                                    className={
                                      this.state.interest == true
                                        ? "issuerDashboard-table-top-button-rejected-active"
                                        : "issuerDashboard-table-top-button-rejected"
                                    }
                                  >
                                    Interest
                                  </buton>
                                  <buton
                                    type="button"
                                    onClick={() => this.handleClickPrincipal()}
                                    className={
                                      this.state.principal == true
                                        ? "issuerDashboard-table-top-button-workbench-active"
                                        : "issuerDashboard-table-top-button-workbench"
                                    }
                                  >
                                    Principal
                                  </buton>
                                </div>
                              </div>

                              <BarChart
                                width={500}
                                height={240}
                                data={bardata}
                                margin={{
                                  top: 5,
                                  right: 30,
                                  left: 20,
                                  bottom: 5,
                                }}
                                barSize={10}
                                className="bar-chart-container"
                              >
                                <XAxis
                                  dataKey="name"
                                  scale="point"
                                  padding={{ left: 20, right: 20 }}
                                  axisLine={false}
                                  className="xaxis-chart-container"
                                />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <CartesianGrid strokeDasharray="3 3" />
                                <Bar
                                  dataKey="pv"
                                  fill="#FFC000"
                                  // background={{ fill: "#eee" }}
                                  radius={10}
                                />
                              </BarChart>
                            </div>
                          </div>
                        </div>

                        <div className="row graphs-container">
                          <div className="col-12 col-sm-6 col-md-8">
                            <div className="page-content3">
                              <div className="pieoutercontainer1">
                                <h5 className="headingspace">Investment History</h5>
                                <Link className="login-sign_up-link">
                                  Select Year
                                </Link>
                              </div>
                              <div className="pieoutercontainer">
                                <div className="curvechart-graph">
                                  <AreaChart
                                    width={1000}
                                    height={240}
                                    data={curvechart}
                                    margin={{ top: 10, right: 0, left: 30, bottom: 0 }}
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
                                    <XAxis dataKey="name" />

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
                          </div>

                          <div className="col-12 col-sm-6 col-md-4">
                            <div className="page-content3">
                              <div className="pieoutercontainers">
                                <h5 className="headingspace">Asset Type</h5>
                                <div className="pieoutercontainer">
                                  <div className="pieinnercontainer1-detail">
                                    <PieChart width={340} height={350}>
                                      <Pie
                                        data={piedata1}
                                        cx={120}
                                        cy={200}
                                        innerRadius={90}
                                        outerRadius={100}
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
                                  <div className="pieinnercontainerportfolio">
                                    <ul>
                                      <li>CLO Loans</li>
                                      <li>Business Loans</li>
                                      <li>Consumer Loans</li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div> */}
                      </div>
                    )}
                  </React.Fragment>
                </div>
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

export default withSnackbar(InvestorDashboard_Portfolio);
