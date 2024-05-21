/* eslint-disable require-jsdoc */
import React, { Component } from "react";
import Pagination from "@mui/material/Pagination";
// import { connect } from 'react-redux';
import Sidebar from "../../../../components/sidebar";
import MUIDataTable from "mui-datatables";
import Button from "@material-ui/core/Button";
import Loader from "../../../../components/loader";
import { withSnackbar } from "notistack";
import { Theme as MuiTheme } from "rjsf-material-ui";
import {
  ViewLoans,
  ViewLoansAI,
  updateArrayofLoanStatus,
  GetValidateResults ,
  VAExceptionalReport
} from "../../../../servies/services";
import { FullscreenExit, TrainRounded } from "@material-ui/icons";
import {
  ThemeProvider,
  createTheme,
  MuiThemeProvider,
} from "@material-ui/core/styles";
import "react-input-range/lib/css/index.css";
import Popover from "react-bootstrap/Popover";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { error } from "jquery";

class VA_ListOfLoans extends Component {
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
      loandetails: [],
      loaniddetails: [],
      searchText: "",
      rowsSelected: null,
      open1: false,
      active_pool: 0,
      anchorEl: null,
      formData: {
        note: "",
      },
      aitrainedpoolname : sessionStorage.getItem('poolname'),
      UserId: sessionStorage.getItem("userid"),
      token: sessionStorage.getItem("token"),
      exportdata : null,
    };
  }

  onOpenModal = () => {
    this.setState({ formData: [] });
    console.log("inside modal1");
    this.setState({ open1: true });
  };

  onCloseModal = () => {
    this.setState({ open1: false });
  };

  onSubmit1 = (e) => {
    e.preventDefault();
    console.log(this.state.formData);
    console.log("hello we have clicked the button");
  };

  async selectedpoolid(selected) {
    const arr = [];
    const loanId = [];

    for (var i = 0; i < selected.length; i++) {
      var j = selected[i];
      let PoolID = this.state.tableData[j];
      let LoanID = this.state.tableData[j].Loan_ID;
      arr.push(PoolID);
      loanId.push(LoanID);
    }
    let x = loanId;
    this.setState({ loandetails: arr, loaniddetails: loanId });
    console.log("selected Loans", arr);
    console.log("loanid", loanId);
    sessionStorage.setItem("rundd", JSON.stringify(arr));
  }

  onchange = (e) => {
    this.setState({ searchText: e.target.value, searchType: true });
    console.log("search: e.target.value", e.target.value);
  };
  ViewLoans = async () => {
    console.log("helllllllllooooooooo");
    var data = {};
    data.poolid = sessionStorage.getItem("poolid");
    data.VAId = this.state.UserId;
    this.setState({ getLoansLoader: true, loading: true, tableData: [] });
    data.token = this.state.token;
    const APIResponse = await ViewLoans(data);

    if (APIResponse.status === 200) {
      console.log("Allpoolonboardingdata--", APIResponse);
      this.setState({
        getLoansLoader: false,
        open: true,
        tableData: APIResponse.data.loandetails,
        PoolDetails: APIResponse.data.pooldetails,
        loading: true,
      });
      // const message = "Record Fetched Successfully";
      // this.props.enqueueSnackbar(message, {
      //   variant: "info",
      //   autoHideDuration: 3000,
      // });

      let display = [];
      if (APIResponse.data.loandetails.length != 0) {
        Object.keys(APIResponse.data.loandetails[0]).map((val) => {
          console.log("valllllll", val);

          if (
            val == "_id" ||
            val == "issuerId" ||
            val == "poolid" ||
            val == "LMSStatus" ||
            val == "matched"
          ) {
            return;
          }
          let column = {
            name: val,
            label: val,
            options: {
              filter: true,
              sort: true,
              customBodyRender: (value, tableMeta, updateValue) => {
                console.log("values", value);
                return <React.Fragment>{value}</React.Fragment>;
              },
            },
          };
          display.push(column);
        });
        console.log("display", display);
        const restdata = [
          {
            name: "Matched",
            label: "Matched Result",
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
                    paddingLeft: "20px",
                  }}
                >
                  {columnMeta.label}
                </th>
              ),
              customBodyRender: (value, tableMeta, updateValue) => {
                return (
                  <React.Fragment>
                    <div className="">
                      <span>
                        {value === 1 ? (
                          <CheckCircleIcon className="tick-icon" />
                        ) : (
                          <CancelIcon className="cross-icon" />
                        )}
                      </span>
                      <span>{value === 1 ? "Matched" : "Mismatched"}</span>
                    </div>
                  </React.Fragment>
                );
              },
            },
          },

          {
            name: "Loan_ID",
            label: "Actions",
            options: {
              filter: false,
              sort: false,
              customBodyRender: (value, tableMeta, updateValue) => {
                console.log("valueee", { value, tableMeta });
                return (
                  <React.Fragment>
                    <div className="">
                      <span>
                        {/* <Button variant="outlined" id="optionalbutton" type="submit" onClick={this.onOpenModal1.bind(this)}> */}
                        <button
                          className="popupbutton1"
                          onClick={() => this.handleClick1(value)}
                        >
                          {" "}
                          Review
                        </button>
                      </span>
                      {/* </Button> */}
                    </div>
                  </React.Fragment>
                );
              },
            },
          },
        ];
        restdata.map((json) => {
          display.push(json);
        });

        let lastElem = display.pop();
        let secondLastElem = display.pop();
        const insert = (arr, index, ...newItems) => [
          // part of the array before the specified index
          ...arr.slice(0, index),
          // inserted items
          ...newItems,
          // part of the array after the specified index
          ...arr.slice(index)
        ];
        
        const result = insert(display, 1, lastElem, secondLastElem);
        console.log("display", display);
        this.setState({ columns: result });
      } else {
        this.setState({ tableData: [],loading:false });
      }
    } else {
      const message = "Couldn't fetch the record";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  updateArrayofLoanStatus = async () => {
    var data = {};
    data.loanid = this.state.loaniddetails;
    data.status = "Reviewed";
    console.log("dattata", data);
    this.setState({ getLoansLoader: true, loading: true });
    data.token = this.state.token;
    // if(Number(this.state.loandetails[0].Matched )=== 0){
    //   return
    // }else{
    //   var APIResponse = await updateArrayofLoanStatus(data);
    // }
    var APIResponse = await updateArrayofLoanStatus(data);
    if (APIResponse.status === 200) {
      console.log("Allpoolonboardingdata--", APIResponse);
      this.setState({ getLoansLoader: false, loading: true });
      this.ViewLoans();
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

  async componentDidMount() {
    var component = window.location.pathname;
    sessionStorage.setItem("component", component);
    sessionStorage.removeItem("fieldss");
    sessionStorage.removeItem("reviewdata");

    this.ViewLoans();
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
          paddingCheckbox:{
            position: "static !important",
          },
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
            marginTop: "55px !important",
            marginBottom: "15px !important",
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

        MuiCircularProgress: {
          colorSecondary: {
            color: "#048c88 !important",
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

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  handleClicks = () => {
    console.log("hello we have clicked the button");
    this.props.history.push({
      pathname: "/admin/va_dashboard",
    });
  };

  handleClick1 = async (value) => {
    console.log('datatata', this.state.PoolDetails)
    console.log("helllllllllooooooooo", value);
    var data = {};
    data.poolid = sessionStorage.getItem("poolid");
    data.loanid = value;
    data.aitrainedpoolname = this.state.PoolDetails[0].aitrainedpoolname
    sessionStorage.setItem("aitrainedpoolname",this.state.PoolDetails[0].aitrainedpoolname)
    //data.aitrainedpoolname = sessionStorage.getItem("aitrainedpoolname")
    // this.setState({ getLoansLoader: true, loading: true, tableData: [] });
    data.token = this.state.token;
    const APIResponse = await ViewLoansAI(data);

    if (APIResponse.status === 200) {
      console.log("Allpoolonboardingdata--", APIResponse);
      // this.setState({
      //     getLoansLoader: false,
      //     open: true,
      //     tableData: APIResponse.data.res.data,
      //     loading: true,
      // });
      console.log("hello we have clicked the button", value);
      let result = APIResponse.data.res.data.filter(
        (e) => e["Deal Id"] === value
      )[0];
      let loandocpath = APIResponse.data.res.data[0].loandocpath;
      console.log("result", result);
      sessionStorage.setItem("reviewdata", JSON.stringify(result));
      sessionStorage.setItem("loandocpath", JSON.stringify(loandocpath));
      //sessionStorage.setItem('aitrainedpoolname',this.state.aitrainedpoolname)
      this.props.history.push({
        pathname: "/admin/va_review",
      });
    } else {
      const message = "Couldn't fetch the record";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
    // console.log("hello we have clicked the button", value, loandocpath);
    // let result = this.state.tableData.filter(e => e["Deal Id"] === value)[0]
    // console.log('result', result)
    // sessionStorage.setItem('reviewdata', JSON.stringify(result))
    // sessionStorage.setItem('loandocpath', JSON.stringify(loandocpath))
    // this.props.history.push({
    //     pathname: "/admin/va_review",
    // });
  };

  handleClick2 = async ()=>{
    console.log('handleclcik2 is clicked')
    let data = {};
    data.poolid = sessionStorage.getItem('poolid');
    data.token = this.state.token;

    const APIResponse = await GetValidateResults(data);

    console.log('getvalidateresult',APIResponse)

    if(APIResponse.status === 200){
      let exportdata = [];
  
      APIResponse.data.res.data.map((data, index) => {
        let dupjson = {}
  
        Object.keys(data.lmsloan).map((value) => {
          dupjson[value] = data.lmsloan[value]
        })
  
        Object.keys(data.lmsloan).map((value) => {
          dupjson[value + " "] =
            data.attributewise_matched[value] === 1 ? "YES" : "NO";
        });
        dupjson["Exception"] = data.matched === 1 ? "NO" : "YES";
        exportdata.push(dupjson);
      });
  
      //console.log('exportdata',exportdata)

      this.setState({exportdata : exportdata})

      let poolname = sessionStorage.getItem('poolname')
      let data = {
        data: exportdata,
        poolname: poolname,
        token : this.state.token
      };
      console.log("exportdata", data);

      const res = await VAExceptionalReport(data);
      
      if(res.status === 200){
        const file_name = poolname + sessionStorage.getItem("poolid") + ".xlsx";
        startDownload(res.data,file_name);
        function startDownload(file, fileName) {
          const url = window.URL.createObjectURL(new Blob([file]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", fileName);
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
        }
      }

    }


   
    
    // if(APIResponse.status === 200){
    //   console.log("Apiresonse is working")
    //   let exportData = APIResponse.data.res.data.map((data)=>{
    //     let dupjson = {
    //       "Loan_ID" : data.lmsloan.Loan_ID,
    //       "Interest Rate" : data.lmsloan["Interest Rate"],
    //       "City" : data.lmsloan.City,
    //       "State" : data.lmsloan.State,
    //       "Borrower Name" : data.lmsloan["Borrower Name"],
    //       "Amount" : data.lmsloan.Amount,
    //       "Date" : data.lmsloan.Date,
    //       "Exception" : data.matched === 1 ? "NO" : "YES",
    //     }
    //     return{
    //       ...dupjson,
    //       "Loan_ID" : "Yes",
    //       "Amount ": "YES",
    //       "Interest Rate ": "YES",
    //       "City ": "YES",
    //       "State ": "YES",
    //       "Borrower Name ": "YES",
    //       "Date ": "YEs",
    //       "Exception": "No"
    //     }
    //   })
    //   console.log('exportData',exportData)
    // }else{
    //   console.log(error)
    // }

    

  }

 

  render() {
    const { loandetails } = this.state;
    const selectedArrLen = loandetails.length;
    const open = Boolean(this.state.anchorEl);
    const id = open ? "simple-popover" : undefined;

    const { classes } = this.props;
    const options = {
      customToolbar: () => {
        return (
          <span>
            <Button variant="outlined" type="submit" onClick={this.handleClick2}>
              Export
            </Button>
            {selectedArrLen > 0 ? (
              <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={this.updateArrayofLoanStatus}
              >
                Validate
              </Button>
            ) : (
              <Button
                variant="contained1"
                color="primary"
                type="submit"
                className="buttoncss"
                disabled
              >
                Validate
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

    return (
      <React.Fragment>
        <div className="page">
          <Sidebar activeComponent={"VA_Dashboard"} />
          <div className="content1">
            {/* {this.state.getLoansLoader == false ? (
                            ""
                        ) : (
                            <LinearLoader></LinearLoader>
                        )} */}
            <div className="page-content">
              <React.Fragment>
                <div className="workbench-table-container">
                  <MuiThemeProvider theme={this.getMuiTheme()}>
                    <MUIDataTable
                      title={
                        <div className="d-flex justigy-content-center align-center">
                          <KeyboardBackspaceIcon
                            onClick={this.handleClicks}
                            className="left-arrow-muis"
                          />
                          <h1 className="headerdashboard2">List Of Loans</h1>
                        </div>
                      }
                      data={this.state.tableData}
                      columns={this.state.columns}
                      options={options}
                    />
                  </MuiThemeProvider>
                </div>
              </React.Fragment>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withSnackbar(VA_ListOfLoans);
