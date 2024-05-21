/* eslint-disable require-jsdoc */
import React, { Component } from "react";
// import { connect } from 'react-redux';
import Sidebar from "../../../../components/sidebar";
import Button from "@material-ui/core/Button";
import Loader from "../../../../components/loader";
import Snackbar from "../../../../components/snackbar";
import LinearLoader from "../../../../components/loader/LinearLoader";
import { withSnackbar } from "notistack";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Theme as MuiTheme } from "rjsf-material-ui";
import {RecurringsetupDateQuery,viewservicerdatadb,saveservicerdata,saveDealDetailsbyDealIdPostClosing} from "../../../../servies/services";
import { FullscreenExit, TrainRounded } from "@material-ui/icons";
import {
  ThemeProvider,
  createTheme,
  MuiThemeProvider,
} from "@material-ui/core/styles";
import "react-input-range/lib/css/index.css";
import NumberComp2 from "../../../../components/NumberComp2";
class ServicerData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      downArrow: true,
      selectedRecords: [],
      eligibleloans: {},
      tableData: [],
      servicerData: [],
      loading: false,
      getLoansLoader: false,
      open: false,
      openPopup: false,
      selectedLoanId: [],
      searchText: "",
      rowsSelected: null,
      formLoader: false,
      screenloader: true,
      dealId: sessionStorage.getItem("dealId"),
      token: sessionStorage.getItem('token'),
      poolName: sessionStorage.getItem("poolname"),
      showSearchBox: false,
    };
  }

  Cancel = (e) => {
    this.props.history.push({
      pathname: "/admin/servicer_deals_details",
    });
    // this.setState({ formData: value.formData })
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

  RecurringsetupDateQuery = async (value) => {
    var data = {};
    data.dealid = this.state.dealId;
    console.log("value", value);
    this.setState({ screenloader: true });
    data.token = this.state.token
    const APIResponse = await RecurringsetupDateQuery(data);

    if (APIResponse.status === 200) {
      console.log("upload--", APIResponse);
      if(APIResponse.data.length > 0) {
      this.setState({confirmation: APIResponse.data[0].confirmation,month: APIResponse.data[0].month,year: APIResponse.data[0].year });
      sessionStorage.setItem('month', this.state.month);
      sessionStorage.setItem('year', this.state.year);
      }
      else{
      this.setState({confirmation: '',month: '',year: ''});
      }
      this.viewservicerdatadb(APIResponse.data);
    } else {
      this.setState({ screenloader: false });
      const message = "Something went wrong, please try again";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };
  viewservicerdatadb = async (value) => {
    var data = {};
    data.dealid = this.state.dealId;
    data.confirmation = this.state.confirmation;
    data.month = this.state.month;
    data.year = this.state.year
    console.log("value", value);
    this.setState({ screenloader: true });
    data.token = this.state.token
    const APIResponse = await viewservicerdatadb(data);

    if (APIResponse.status === 200) {
      console.log("upload--", APIResponse);
      this.setState({screenloader: false ,servicerData: APIResponse.data.data, submit:APIResponse.data})
    } else {
      this.setState({ screenloader: false });
      const message = "Something went wrong, please try again";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  saveservicerdata = async (value) => {
    var data = {};
    data.dealid = this.state.dealId;
    data.confirmation = this.state.confirmation;
    data.month = this.state.month;
    data.year = this.state.year
    data.input=this.state.servicerData
    console.log("value", value);
    this.setState({ formLoader: true});
    data.token = this.state.token
    const APIResponse = await saveservicerdata(data);

    if (APIResponse.status === 200) {
    this.setState({ formLoader: true });
    const message = "Please wait Deal Data is getting saved";
    this.props.enqueueSnackbar(message, {
      variant: "info",
      autoHideDuration: 2000,
    });
    this.saveDealDetailsbyDealIdPostClosing()
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
  saveDealDetailsbyDealIdPostClosing = async (value) => {
    var data = {};
    data.dealid = this.state.dealId;
    data.month = this.state.month;
    data.year = this.state.year
    console.log("value", value);
    this.setState({ formLoader: true });
    data.token = this.state.token
    const APIResponse = await saveDealDetailsbyDealIdPostClosing(data);

    if (APIResponse.status === 200) {
    this.setState({ formLoader: false});
    const message = "Successfully saved";
    this.props.enqueueSnackbar(message, {
      variant: "info",
      autoHideDuration: 2000,
    });
    window.location.assign('/admin/servicer_pool_details')
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
  async componentDidMount() {
    var component = window.location.pathname
    sessionStorage.setItem('component', component)
    this.RecurringsetupDateQuery()
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
            marginRight: `${this.state.tableData.length < 10 ? "-122" : "-132"
              }px`,
            fontSize: "0.90rem",
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

  fistTableData = (tableData) => {
    const headingArr = Object.keys(tableData[0])
    console.log(tableData)
    return (
      <table className="table-servicer">
        <tr>
          {headingArr.map(heading => <th className="servicer-data-table-heading">{heading}</th>)}
        </tr>
        {tableData.map(data => (
          
          <tr>
            {headingArr.map(element => <td>{element == 'Balance' ?<NumberComp2 value={data[element]}></NumberComp2> : data[element]}</td>)}
          </tr>
        ))}
      </table>
    )
  }

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
          rowsPerPage: "",
          displayRows: "Of",
        },
      },
    };

    const columns = [
      {
        name: "trancheid",
        label: "Tranche ID",
        options: {
          filter: true,
          sort: true,
        },
      },

      {
        name: "tranchename",
        label: "Tranche Name",
        options: {
          filter: true,
          sort: true,
        },
      },

      {
        name: "creditenhancement",
        label: "Credit Enhancement",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "principalbalance",
        label: "Principal Balance",
        options: {
          filter: true,
          sort: true,
        },
      },

      {
        name: "interestrate",
        label: "Interest Rate",
        options: {
          filter: true,
          sort: true,
        },
      },

      {
        name: "investedamount",
        label: "Invested Amount",
        options: {
          filter: true,
          sort: true,
        },
      },

      {
        name: "trancheid",
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
                  <buton
                    type="button"
                    onClick={this.meta}
                    className="login-sign_up-links"
                  >
                    Invest
                  </buton>
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
          <Sidebar activeComponent={"ServicerDashboardDeals"} />
          <div className="content1">
            {/* {this.state.getLoansLoader == false ? (
              ""
            ) : (
              <LinearLoader></LinearLoader>
            )} */}
            <div className="page-contentofpool1">
              <div className="row1">
                <div className="col-12 col-sm-6 col-md-8 d-flex justigy-content-center align-center hellocard">
                  <h3 className="headerdashboard">Servicer Data</h3>
                </div>
                <div className="col-12 col-sm-6 col-md-4 hellocard">
                  <div className="buttonsverified uw-deal-details-button-container">
                  <Button variant="outlined" onClick={this.Cancel}>
                          Cancel
                        </Button>
                    <Button
                      variant="contained"
                      color="primary"
                    onClick={this.saveservicerdata}
                    >
                      Submit
                      {this.state.formLoader === true ? (
                                  <CircularProgress size='22px' color='primary' />
                                ) : (
                                  ''
                                )}
                    </Button>
                  </div>
                </div>

              </div>

              {this.state.screenloader == true ? (
              <LinearLoader></LinearLoader>
            ) : (
              <div className="servicer-data-main-container">
                <div className="servicer-data-left-container">
                  {/* table1 */}
                  <div className="outer-servicer-data-table-container ">
                    <div className="servicer-data-table-container servicer-first-table">
                      {this.fistTableData(this.state.servicerData.collateral)}
                    </div>
                  </div>


                  {/* table 2 */}
                  <div className="outer-servicer-data-table-container ">
                    <div className="servicer-data-table-container servicer-second-table">
                      {this.fistTableData(this.state.servicerData.interest)}
                    </div>
                  </div>
                </div>

                <div className="servicer-data-right-container">

                  {/* table1 */}
                  <div className="outer-servicer-data-table-container ">
                    <div className="servicer-data-table-container servicer-third-table">
                      {this.fistTableData(this.state.servicerData.collections)}

                    </div>
                  </div>

                  {/* table2 */}
                  <div className="outer-servicer-data-table-container ">
                    <div className="servicer-data-table-container servicer-forth-table">
                      {this.fistTableData(this.state.servicerData.principal)}
                    </div>
                  </div>
                </div>
              </div>
            )}



            </div>

          </div>
        </div>
      </React.Fragment >
    );
  }
}

export default withSnackbar(ServicerData);
