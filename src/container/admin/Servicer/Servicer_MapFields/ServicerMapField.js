/* eslint-disable require-jsdoc */
import React, { Component } from "react";
// import { connect } from 'react-redux';
import Sidebar from "../../../../components/sidebar";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import LinearLoader from "../../../../components/loader/LinearLoader";
import CloseIcon from "@material-ui/icons/Close";
import { withSnackbar } from "notistack";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Theme as MuiTheme } from "rjsf-material-ui";
import { RecurringsetupDateQuery,ServicerShowColumns,ServicerSaveMapping } from "../../../../servies/services";
import {
  ThemeProvider,
  createTheme,
  MuiThemeProvider,
} from "@material-ui/core/styles";
import "react-input-range/lib/css/index.css";
import Autocompete from "./Autocompete";
import $ from "jquery";
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';

class ServicerMapField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      downArrow: true,
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
      poolName: sessionStorage.getItem("poolname"),
      dealId: sessionStorage.getItem("dealId"),
      showSearchBox: false,
      stdfields: [],
      screenloader: false,
      formLoader: false,
      Mainarr: ["loan_trade_date", "unique_field", "property_city"],
      Mainarr2: ["loan_trade_date", "unique_field", "property_city"],
      token: sessionStorage.getItem('token'),

      // tableData: [
      //   {
      //     id: "2e8c53a5-3171-4ee9-ac42-78de4e148951",
      //     key: "Loan Number",
      //     value: "loan_trade_date",
      //     descp:
      //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      //   },
      //   {
      //     id: "b8d0a962-0bee-48b0-8429-8acbf2ea19d4",
      //     key: "Date Sold",
      //     value: "unique_field",
      //     descp: "loan_id_details1",
      //   },
      //   {
      //     id: "60eb5deb-d690-4ee2-9cf1-6073dd12f943",
      //     key: "Address",
      //     value: "",
      //     descp: "",
      //   },
      //   {
      //     id: "d0bea45d-5830-4ee4-887e-e0007b6b0f16",
      //     key: "City",
      //     value: "property_city",
      //     descp: "loan_id_details3",
      //   },
      //   {
      //     id: "1535158b-b4cf-4927-a923-51463f4d80ed",
      //     key: "State",
      //     value: "",
      //     descp: "",
      //   },

      //   {
      //     id: "2e8c53a5-3171-4ee9-ac42-78de4e148951",
      //     key: "Loan Number",
      //     value: "loan_trade_date",
      //     descp:
      //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      //   },
      //   {
      //     id: "b8d0a962-0bee-48b0-8429-8acbf2ea19d4",
      //     key: "Date Sold",
      //     value: "unique_field",
      //     descp: "loan_id_details1",
      //   },
      //   {
      //     id: "60eb5deb-d690-4ee2-9cf1-6073dd12f943",
      //     key: "Address",
      //     value: "",
      //     descp: "",
      //   },
      //   {
      //     id: "d0bea45d-5830-4ee4-887e-e0007b6b0f16",
      //     key: "City",
      //     value: "property_city",
      //     descp: "loan_id_details3",
      //   },
      //   {
      //     id: "1535158b-b4cf-4927-a923-51463f4d80ed",
      //     key: "State",
      //     value: "",
      //     descp: "",
      //   },
      //   {
      //     id: "2e8c53a5-3171-4ee9-ac42-78de4e148951",
      //     key: "Loan Number",
      //     value: "loan_trade_date",
      //     descp:
      //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      //   },
      //   {
      //     id: "b8d0a962-0bee-48b0-8429-8acbf2ea19d4",
      //     key: "Date Sold",
      //     value: "unique_field",
      //     descp: "loan_id_details1",
      //   },
      //   {
      //     id: "60eb5deb-d690-4ee2-9cf1-6073dd12f943",
      //     key: "Address",
      //     value: "",
      //     descp: "",
      //   },
      //   {
      //     id: "d0bea45d-5830-4ee4-887e-e0007b6b0f16",
      //     key: "City",
      //     value: "property_city",
      //     descp: "loan_id_details3",
      //   },
      //   {
      //     id: "1535158b-b4cf-4927-a923-51463f4d80ed",
      //     key: "State",
      //     value: "",
      //     descp: "",
      //   },
      // ],
    };
  }

  SaveCustomizeReport= async ()=>{
    var leftValues = []
    $('#mapCamp #unmatchedtable tbody tr').each(function (index, tr) {
        console.log("row tr", tr);
        leftValues[index] = {
            ['Key ' + index]: $(tr).find("td:eq(0)").text(),
            ['Value '+ index]:$(tr).find("td:eq(1) input").val()
        };
    });
    console.log("leftValues" + JSON.stringify(leftValues))
var Length=leftValues.length;

    // var rightValues = []
    $('#mapCamp #matchedtable tbody tr').each(function (index, tr) {
        console.log("row tr", tr);
        var index2=index+Length;
        leftValues[index2] = {
            ['Key ' +index2]: $(tr).find("td:eq(0)").text(),
            ['Value '+index2]:$(tr).find("td:eq(1) input").val()
        };
    });
    console.log("leftValues" + JSON.stringify(leftValues))

    var data = {};
    data.dealid = this.state.dealId
    data.confirmation = this.state.confirmation
    data.month = this.state.month
    data.year = this.state.year
    data.data = leftValues;
    console.log("DATAAAAAA" + JSON.stringify(data))

    this.setState({formLoader: true})
    data.token = this.state.token
        const APIResponse = await ServicerSaveMapping(data);
        if (APIResponse != null) {
            if (APIResponse.status == 204) {
              this.setState({formLoader: false})
                const message = "Missing Parameter or No content";
                this.props.enqueueSnackbar(message, {
                    variant: 'error',
                    autoHideDuration: 4000,
                });
            }
            else if (APIResponse.status !== 200) {
              this.setState({formLoader: false})
                const message = "Something went wrong, please try again";
                this.props.enqueueSnackbar(message, {
                    variant: 'error',
                    autoHideDuration: 5000,
                });
            }
            else {
                console.log("APIResponse.data.Success", APIResponse.data);
                if (APIResponse.data.success == true) {
                    // this.setState({ formLoader: false, IsOpen: false })
                    // this.history.push("/report/" + this.props.DealType + "/add-new/" + this.props.dealId + "/" + this.props.month + "/" + this.props.year);
                    this.setState({formLoader: false})
                    const message = "Data saved successfully";
                    this.props.enqueueSnackbar(message, {
                        variant: 'info',
                        autoHideDuration: 3000,
                    });
                    window.location.assign('/admin/servicer_servicerdata')
                } else {
                  this.setState({formLoader: false})
                    const message = "Data not saved successfully";
                    this.props.enqueueSnackbar(message, {
                        variant: 'error',
                        autoHideDuration: 3000,
                    });
                }
            }
    }
}


  matchedRows() {
    return Object.entries(this.state.tableData).map(
      ([columnId, column], index) => (
        <React.Fragment>
          {column.value == "" || column.key == "" ? (
            ""
          ) : (
            <React.Fragment>
              <tr>
                <td style={{ "white-space": "pre-wrap" }}>{column.key}</td>
                <td style={{ "white-space": "pre-wrap" }}>
                  {this.state.actionType == "edit" &&
                  this.state.currentIndex == index ? (
                    <Autocompete
                      suggestions={this.state.stdfields}
                      description={column.descp}
                      default={column.value}
                      divname="middiv"
                      onchange={(data, type) => {
                        this.onchange(data, type);
                      }}
                      disabled="false"
                    />
                  ) : (
                    <Autocompete
                      suggestions={this.state.stdfields}
                      description={column.descp}
                      default={column.value}
                      divname="middiv"
                      onchange={(data, type) => {
                        this.onchange(data, type);
                      }}
                      disabled="true"
                    />
                  )}
                </td>
                <td>
                  <div className="Actionrow">
                    {this.state.actionType == "edit" &&
                    this.state.currentIndex == index ? (
                      ""
                    ) : (
                      <React.Fragment>
                        <img
                          alt=""
                          src={require("../../../../images/edit.png")}
                          style={{ marginLeft: "10px" }}
                          height="25px"
                          width="25px"
                          x={index}
                          onClick={() => this.Edit(index)}
                        ></img>
                        {/* <img alt="" src={require('../../../images/delete.png')} style={{ marginLeft: "20px" }} height="25px" width="25px" x={index} onClick={() => this.Delete(index)}></img> */}
                      </React.Fragment>
                    )}
                    {this.state.actionType == "edit" &&
                    this.state.currentIndex == index ? (
                      <React.Fragment>
                        <button
                          className="float-center button-tick-css"
                          style={{ padding: "1px" }}
                          color="primary"
                          onClick={this.Cancel}
                        >
                          <CheckBoxRoundedIcon className="button-tick-size" />
                        </button>
                        {/* <Button className="float-center" style={{ marginLeft: "5px", padding: "1px"}} color="primary" variant="outlined" onClick={this.Cancel}><CloseIcon style={{ color:'red' }} /></Button> */}
                      </React.Fragment>
                    ) : (
                      ""
                    )}
                  </div>
                </td>
              </tr>
            </React.Fragment>
          )}
        </React.Fragment>
      )
    );
  }

  unmatchedRows() {
    return Object.entries(this.state.tableData).map(
      ([columnId, column], index) => (
        <React.Fragment>
          {column.value == "" && column.key != "" ? (
            <React.Fragment>
              <tr>
                <td style={{ "white-space": "pre-wrap" }}>{column.key}</td>
                <td style={{ "white-space": "pre-wrap" }}>
                  <Autocompete
                    suggestions={this.state.stdfields}
                    description={column.descp}
                    default={column.value}
                    divname="middiv"
                    onchange={(data, type) => {
                      this.onchange(data, type);
                    }}
                  />
                </td>
              </tr>
            </React.Fragment>
          ) : (
            ""
          )}
        </React.Fragment>
      )
    );
  }

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

  onchange = (data, type) => {
    console.log("Form>", data, "++++" + type);
    this.setState({ desc: data });
  };
  Edit = async (index) => {
    this.setState({ actionType: "edit", currentIndex: index });
  };
  Cancel = async () => {
    this.setState({ actionType: "add" });
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
      }
      else{
      this.setState({confirmation: '',month: '',year: ''});
      }
      this.ServicerShowColumns(APIResponse.data);
    } else {
      this.setState({ screenloader: false });
      const message = "Something went wrong, please try again";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };
  ServicerShowColumns = async (value) => {
    var data = {};
    data.dealid = this.state.dealId;
    data.month= this.state.month
    data.year = this.state.year
    // data.month = value.month != undefined ? value.month : ''
    // data.year = value.year != undefined ? value.year : ''
    data.assetclass = "Residential Real Estate"
    console.log("data", data);
    this.setState({ screenloader: true });
    data.token = this.state.token
    const APIResponse = await ServicerShowColumns(data);

    if (APIResponse.status === 200) {
      console.log("upload--", APIResponse);
      this.setState({ screenloader: false, tableData: APIResponse.data.key, stdfields: APIResponse.data.stdfields});
      let ArrayLeft = [];
      let ArrayRight = [];
    Object.entries(APIResponse.data.key).map(([columnId, column], index) => {
      if (column.value == "" && column.key != "") {
        ArrayLeft.push(column);
      } else if (column.value != "" && column.key != "") {
        ArrayRight.push(column);
      }
    });
    this.setState({
      ArrayLeft: ArrayLeft.length,
      ArrayRight: ArrayRight.length,
    });
      
    } else {
      this.setState({ screenloader: false });
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
        MuiCircularProgress: {
          colorSecondary: {
            color: "#048c88 !important",
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
      },
    });

  render() {
    function unmatchsearch() {
      console.log("inside search function");
      var input = document.getElementById("unmatchsearch");
      var filter = input.value.toUpperCase();
      var table = document.getElementById("unmatchedtable");
      var tr = table.getElementsByTagName("tr");
      var td, i;

      for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
          if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
        }
      }
    }

    function matchsearch() {
      console.log("inside search function");
      var input = document.getElementById("matchsearch");
      var filter = input.value.toUpperCase();
      var table = document.getElementById("matchedtable");
      var tr = table.getElementsByTagName("tr");
      var td, i;

      for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
          if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
        }
      }
    }
    return (
      <React.Fragment>
        <div className="page">
          <Sidebar activeComponent={"ServicerDashboardDeals"} />
          <div className="content1">
            <div className="page-contentofpool1">
              <div className="row1">
                <div className="col-12 col-sm-6 col-md-8 d-flex justigy-content-center align-center hellocard">
                  <h3 className="headerdashboard">
                    Map Master Database Fields
                  </h3>
                </div>
                <div className="col-12 col-sm-6 col-md-4 hellocard">
                  <div className="buttonsverified uw-deal-details-button-container">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.SaveCustomizeReport}
                    >
                      Save Mapping
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

              <div id="mapCamp">
                <div className="row">
                  <div className="col-md-6 col-sm-12">
                    <div className="headcount">
                      <h3>Unmatched Fields ({this.state.ArrayLeft})</h3>
                    </div>
                    <div className="card">
                      {/* <div className="row splittablehead">
                        <div className="col-md-4 HeadCount">
                          <p className="font-weight-bold">
                            Unmatched Fields ({this.state.ArrayLeft})
                          </p>
                        </div> */}
                      {/* <div className="col-md-4">
                          <Button
                            variant="outlined"
                            color="primary"
                            onClick={this.AddstdShow}
                          >
                            + Custom Field
                          </Button>
                        </div> */}

                      {/* <div className="col-md-4 tablesearch">
                          <input
                            type="text"
                            id="unmatchsearch"
                            onChange={unmatchsearch}
                            onkeyup={unmatchsearch}
                            className="form-control mb-3 "
                            placeholder="Search"
                          />
                        </div> */}
                      {/* </div> */}
                      {/* <div className="lefttable"> */}
                      <table className="mapcomptable" id="unmatchedtable">
                        <thead className="tablehead-data">
                          <tr>
                            <th scope="col">Servicer Tape Fields</th>
                            <th scope="col">Master Database Fields</th>
                          </tr>
                        </thead>
                        <tbody>{this.unmatchedRows()}</tbody>
                      </table>
                      {/* </div> */}
                    </div>
                  </div>

                  {/* <div className="col-md-1 col-sm-12 upperpart">
                    <Button
                      variant="outlined"
                      color="primary"
                      type="submit"
                      onClick={this.handlematch}
                    >
                      Match 
                    </Button>
                  </div> */}

                  <div className="col-md-6 col-sm-12">
                    <div className="headcount">
                      <h3>Matched Fields ({this.state.ArrayRight})</h3>
                    </div>
                    <div className="card">
                      {/* <div className="row splittablehead">
                        <div className="col-md-3 HeadCount">
                          <p className="font-weight-bold">
                            Matched Fields ({this.state.ArrayRight})
                          </p>
                        </div> */}
                      {/* <div className="col-md-5"></div> */}
                      {/* <div className="col-md-3 tablesearch">
                          <input
                            type="text"
                            id="matchsearch"
                            onChange={matchsearch}
                            onkeyup={matchsearch}
                            className="form-control mb-3"
                            placeholder="Search"
                          />
                        </div> */}
                      {/* </div> */}
                      <table className="mapcomptable" id="matchedtable">
                        <thead className="tablehead-data">
                          <tr>
                            <th scope="col">Servicer Tape Fields</th>
                            <th scope="col">Master Database Fields</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>{this.matchedRows()}</tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withSnackbar(ServicerMapField);
