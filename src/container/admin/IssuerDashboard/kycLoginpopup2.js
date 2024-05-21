/* eslint-disable require-jsdoc */
import React, { Component } from 'react';
// import { connect } from 'react-redux';
import Header from '../../../components/header';
import Sidebar from '../../../components/sidebar';
import MUIDataTable from 'mui-datatables';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import { withSnackbar } from 'notistack';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Theme as MuiTheme } from 'rjsf-material-ui';
import ReactModal from 'react-modal';
import { customStylesRegisterPopup } from '../../../components/customscripts/customscript';
import { updateTermsOfService } from '../../../servies/services';
import { FullscreenExit, TrainRounded } from "@material-ui/icons";
import { ThemeProvider, createTheme, MuiThemeProvider } from "@material-ui/core/styles";
import "react-input-range/lib/css/index.css";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Link } from 'react-router-dom'
import ReorderIcon from "@material-ui/icons/Reorder";
import OpprtunitiesCard from '../InvestorDashboard/Opportunities_card';
import ViewModuleIcon from "@material-ui/icons/ViewModule";
class KYCLoginPopupStep2 extends Component {
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
      searchText: '',
      rowsSelected: null,
      poolName: sessionStorage.getItem('poolname'),
      UserId: sessionStorage.getItem("userid"),
      activeInsights1: false,
      activeInsights2: false,
      activeInsights3: true,
      showSearchBox: false,
      showStartPopUp: true,
      investorInsights1: true,
      investorInsights2: false,
      activeDeals: true,
      reorderchart: true,
      activePools: false,
      activePoolsUnder: true,
      Submittoggle: false,
      userRole: sessionStorage.getItem('userrole'),
      file: null,
      formLoader2 : false
    };
    this.handleFileUpload = this.handleFileUpload.bind(this)
  }
  handleFileUpload = (e) => {
    const file = e.target.files[0];
    this.setState({ file }, () => {
      this.updateFileUpload();
    });
  }
  updateFileUpload = async () => {
    this.setState({
      formLoader2: true
    })
    let name = sessionStorage.getItem('organizationname')
    const newdata = new FormData();
    newdata.append("userid", this.state.UserId);
    newdata.append("filename", this.state.file);
    newdata.append("organizationname", name)
    const APIResponse = await updateTermsOfService(newdata);
    if (APIResponse.status === 200) {
      this.setState({ formLoader: false })
      this.props.history.push('/kycloginstep1')
    } else {
      this.setState({ formLoader: false })
      const message = "Something went wrong";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  }

  handleClickInsights = () => {
    this.setState({
      activeInsights1: true,
      activeInsights2: false,
      activeInsights3: false,
    });
  };

  handleClickLoans = () => {
    this.setState({
      activeInsights1: false,
      activeInsights2: true,
      activeInsights3: false,
    });
  };
  handleClickPools = () => {
    this.setState({
      activeInsights1: false,
      activeInsights2: false,
      activeInsights3: true,
    });
  };

  handleClick = () => {
    this.props.history.push({
      pathname: '/'
    });
  }
  updateTermsOfServiceDisagree = async () => {
    this.setState({ formLoader1: true })
    var data = {
      userid: this.state.UserId,
      termsofservice: "Disagree",
    };
    console.log("datata", data);
    const APIResponse = await updateTermsOfService(data);

    if (APIResponse.status === 200) {
      this.setState({ formLoader1: false })
      this.props.history.push('/')
    } else {
      this.setState({ formLoader1: false })
      const message = "Something went wrong";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  updateTermsOfService = async () => {
    let name = sessionStorage.getItem('organizationname')
    this.setState({ formLoader: true })
    var data = {
      userid: this.state.UserId,
      termsofservice: "Agree",
      organizationname: name
    };
    console.log("datata", data);
    const APIResponse = await updateTermsOfService(data);

    if (APIResponse.status === 200) {
      this.setState({ formLoader: false })
      this.props.history.push('/kycloginstep1')
    } else {
      this.setState({ formLoader: false })
      const message = "Something went wrong";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  async selectedpoolid(selected) {
    const arr = []

    for (var i = 0; i < selected.length; i++) {

      var j = selected[i];
      let PoolID = this.state.tableData[j].dealid;
      arr.push(PoolID);
    }
    console.log("selected Loans", arr);
    sessionStorage.setItem("rundd", JSON.stringify(arr));
  }

  onchange = e => {
    this.setState({ searchText: e.target.value, searchType: true });
    console.log("search: e.target.value", e.target.value);
  };
  searchBar = () => (
    <div className="search-bar-main-container" id="searchBox">
      <div className="tableSearch1">
        <TextField
          id="outlined-basic"
          value={this.state.searchText}
          onChange={this.onchange}
          label="Search"
          variant="filled"
          size="small" />
        {/* {this.state.searchTextDashboard.length !== 0 ? <CloseIcon className="closeiconstyle" onClick={() => this.setState({ searchTextDashboard: '' })} /> : ''} */}
      </div>
      <button type="button" onClick={this.onClickCloseSearchBar} className="close-mui-icon">
        <CloseIcon />
      </button>
    </div>
  )

  onClickCloseSearchBar = () => {
    this.setState({ searchText: '' })
    this.setState({ showSearchBox: false })
  }

  onClickSearchButton = () => {
    this.setState({ showSearchBox: true })
  }

  async componentDidMount() {
  }

  getMuiTheme = () =>
    createTheme({
      typography: {
        useNextVariants: true
      },
      overrides: {
        MUIDataTable: {
          root: {
            border: 'none !important'
          },
        },
        MUIDataTableBodyRow: {
          root: {
            "&:nth-child(odd)": {
              backgroundColor: "",
            }
          },
          hoverCursor: {
            cursor: 'auto !important'
          }
        },
        MuiTableCell: {
          root: {
            fontFamily: 'Mulish, sans-serif !important',
            padding: '20px',
            fontSize: '0.980rem !important'
          }
        },
        MUIDataTableBodyCell: {
          root: {
            fontFamily: 'Mulish, sans-serif !important',
            fontWeight: '400 !important',
            fontSize: '15px !important',
            borderBottom: 'none !important'
          }
        },
        MuiCircularProgress: {
          colorSecondary: {
            color: '#048c88 !important'
          }

        },
        MUIDataTableHeadCell: {
          root: {
            fontFamily: 'Mulish, sans-serif !important',
            backgroundColor: 'rgba(1, 142, 130, 0.1) !important',
            borderBottom: 'none !important',
            paddingBottom: '5px !important',
            paddingTop: '5px !important',
            paddingLeft: '15px !important'
          },
          toolButton: {
            fontWeight: '600 !important',
            fontSize: '15px !important',
            backgroundColor: 'none !important',
            padding: 'none !important',
            marginLeft: 'none !important',
            textTransform: 'none !important',
            border: 'none !important',
            borderRadius: 'none !important',
          }
        },
        MUIDataTableToolbar: {
          root: {
            fontFamily: 'Mulish, sans-serif !important',
            paddingLeft: '5px !important',
            paddingRight: '5px !important'
          },
          titleText: {
            fontFamily: 'Mulish, sans-serif !important',
            fontSize: '28px',
            color: '#212121',
            fontWeight: '600',
            fontFamily: 'arial',
            marginBottom: '20px',
            marginTop: '20px',
          },
          icon: {
            color: '#018E82',
            paddingRight: '14px !important',
            '&:hover': {
              color: "#018E82 !important",
            },
          },
          iconActive: {
            color: '#018E82 !important',
          }
        },
        MuiButton: {
          contained: {
            backgroundColor: '#FFC000 !important',
            padding: '5px 30px !important',
            marginLeft: '10px !important',
            textTransform: 'none !important',
            border: '2px solid #212121 !important',
            borderRadius: '20px !important',
            boxShadow: 'none !important'
          },
          outlined: {
            fontFamily: 'Mulish, sans-serif !important',
            backgroundColor: '#fff !important',
            padding: '5px 30px !important',
            marginLeft: '10px !important',
            textTransform: 'none !important',
            border: '2px solid #212121 !important',
            borderRadius: '20px !important',
            boxShadow: 'none !important'
          },
          label: {
            fontSize: '15px !important',
            fontWeight: '600 !important',
            fontFamily: 'Mulish, sans-serif !important',
          },
          textPrimary: {
            color: '#018E82 !important',
          }
        },
        MUIDataTablePagination: {
          tableCellContainer: {
            borderBottom: 'none !important'
          },
          navContainer: {
            justifyContent: 'center',
          }
        },
        MuiTableSortLabel: {
          icon: {
            color: '#018E82 !important',
          },
          active: {
            color: '#018E82 !important',
          }
        },
        MuiTablePagination: {
          caption: {
            fontFamily: 'Mulish, sans-serif !important',
            color: '#8C8C8C',
            marginRight: '-119px',
            fontSize: '0.90rem'
          }
        },
        MuiIconButton: {
          colorInherit: {
            color: '#018E82 !important',
            marginRight: '60px'
          },
        },



        MUIDataTable: {
          paper: {
            boxShadow: 'none !important'
          },
          responsiveBase: {
            border: '2px solid #212121 !important',
            borderRadius: '20px !important',
            height: "70vh!important"
          }
        },

      }
    });

  handleChange11 = (e) => {
    console.log(e);
    this.setState({ value1: e.target.value });
  };

  handleClickWorkBench = () => {
    this.setState({ activeInsights: false })

  }

  render() {

    const { classes } = this.props;
    const options = {

      filterType: 'dropdown',
      filter: false,
      search: false,
      print: false,
      viewColumns: false,
      download: false,
      rowHover: false,
      selectableRowsOnClick: true,
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
        this.setState({ rowsSelected: allRows.map(row => row.dataIndex) });
        const selected = allRows.map(row => row.dataIndex);
        console.log("selected" + selected);
        this.selectedpoolid(selected);
      },

      searchText: this.state.searchText,
      searchPlaceholder: 'Search',
      customSearch: (searchQuery, currentRow, columns) => {
        let isFound = false;
        currentRow.forEach(col => {
          if (col.toString().indexOf(searchQuery) >= 0) {
            isFound = true;
          }
        });
        return isFound;
      },


      //
      // loading: false,
      textLabels: {
        body: {
          noMatch: this.state.loading === true ?
            'Sorry, there is no matching data to display' :
            null,
          toolTip: 'Sort',
          columnHeaderTooltip: (column) => `Sort for ${column.label}`,
        },
        filter: {
          all: 'All',
          title: 'FILTERS',
          reset: 'RESET',
        },

        selectedRows: {
          text: 'row(s) selected',
          delete: 'Delete',
          deleteAria: 'Delete Selected Rows',
        },
        pagination: {
          next: "Next ",
          previous: "Previous",
          rowsPerPage: "",
          displayRows: "Of"
        }
      },
    };




    const columns = [

      {
        name: "pooid",
        label: 'Pool ID',
        options: {
          filter: true,
          sort: true,
        }
      },

      {
        name: 'poolname',
        label: 'Pool Name',
        options: {
          filter: true,
          sort: true,
        }
      },

      {
        name: 'assetclass',
        label: 'Asset Class',
        options: {
          filter: true,
          sort: true,
        }
      },

      {
        name: 'noofloans',
        label: 'No. of Loans',
        options: {
          filter: true,
          sort: true,
        }
      },

      {
        name: 'setupon',
        label: 'Set-up On',
        options: {
          filter: true,
          sort: true,
        }
      },

      {
        name: 'originalbalance',
        label: 'Original Balance',
        options: {
          filter: true,
          sort: true,
        }
      },

      {
        name: "status",
        label: 'Status',
        options: {
          filter: true,
          sort: true,

        },
      },

      {
        name: "pooid",
        label: 'Actions',
        options: {
          filter: false,
          sort: false,
          customHeadRender: (columnMeta, updateDirection) => (
            <th style={{ backgroundColor: 'rgba(1, 142, 130, 0.1)', borderBottom: 'none', paddingBottom: '5px', paddingTop: '5px', textAlign: 'center' }}>
              {columnMeta.label}
            </th>
          ),
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <React.Fragment>

                <div className='text-center'>

                  {/* <Button variant="outlined" id="optionalbutton" type="submit" onClick={this.onOpenModal1.bind(this)}> */}
                  <Link to={''} className="login-sign_up-link">View Details</Link>
                  {/* </Button> */}


                </div>
              </React.Fragment>
            );
          },
        },
      },

    ];

    const optionsVerify = {

      customToolbar: () => {
        return (<span><Button variant="outlined" type="submit">View Pending Pools</Button>
          {this.state.Submittoggle == 'true' ?
            <Button
              variant="contained"
              color="primary"
              type="submit"
            >
              Submit Verification
            </Button>
            :
            <Button
              variant="contained1"
              color="primary"
              type="submit"
              className="buttoncss"
              disabled
            >
              Submit Verification
            </Button>
          }
        </span>)
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
              "Please wait, Loading Loan Data"
            ) : (
              <div></div>
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



    const columnsAgent = [
      {
        name: "dealId",
        label: "Deal Id",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "dealname",
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
        name: "principalbalance",
        label: "Principal Balance",
        options: {
          filter: true,
          sort: true,
          // customBodyRender: (value, tableMeta, updateValue) => {
          //   return (
          //     <React.Fragment>
          //       <NumberComp value={value}></NumberComp>
          //     </React.Fragment>
          //   );
          // },
        },
      },

      {
        name: "noofloans",
        label: "No. of Loans",
        options: {
          filter: true,
          sort: true,
        },
      },

      {
        name: "nooftranches",
        label: "No. of Tranches",
        options: {
          filter: true,
          sort: true,
        },
      },

      {
        name: "setupon",
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
        name: "dealname",
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
                paddingLeft: "20px",
              }}
            >
              {columnMeta.label}
            </th>
          ),
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <React.Fragment>
                <React.Fragment>
                  <div className="">
                    <span>
                      {/* <Button variant="outlined" id="optionalbutton" type="submit" onClick={this.onOpenModal1.bind(this)}> */}
                      <button className="popupbutton1" onClick={() => this.ViewDetails(value)}>View Details</button>

                    </span>
                    {/* </Button> */}
                  </div>
                </React.Fragment>
              </React.Fragment>
            );
          },
        },
      },
    ];
    const columnsVerification = [
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
        name: "poolID",
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
                paddingLeft: "20px"

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
                    {/* <Button variant="outlined" id="optionalbutton" type="submit" onClick={this.onOpenModal1.bind(this)}> */}
                    <button className="popupbutton1" onClick={() => this.PoolDetails(value)}>
                      View Details
                    </button>
                    <button className="popupbuttons1" onClick={() => this.handleClick1(value, tableMeta.rowData[5], tableMeta.rowData[1])}>
                      View Loans
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

    const columnsInvestor = [
      {
        name: "dealid",
        label: "Deal Id",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "dealname",
        label: "Deal Name",
        options: {
          filter: true,
          sort: true,
        },
      },

      {
        name: "tranchename",
        label: "Tranch Name",
        options: {
          filter: true,
          sort: true,
        },
      },

      {
        name: "originalinvestment",
        label: "Original Investment",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <React.Fragment>
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
          customBodyRender: (value, tableMeta, updateValue) => {
            return <React.Fragment>{value}</React.Fragment>;
          },
        },
      },

      {
        name: "interestpaid",
        label: "Interest Paid",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <React.Fragment>
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
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <React.Fragment>
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
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <React.Fragment>
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

    const columnsUW = [
      {
        name: "poolid",
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
        name: "poolid",
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
                paddingLeft: "20px",
              }}
            >
              {columnMeta.label}
            </th>
          ),
          customBodyRender: (value, tableMeta, updateValue) => {
            console.log('table', tableMeta.rowData[6])
            return (
              <React.Fragment>
                <div className="">
                  <span>
                    {/* <Button variant="outlined" id="optionalbutton" type="submit" onClick={this.onOpenModal1.bind(this)}> */}
                    <button className="popupbutton1" onClick={() => this.PoolDetails(value)}>View Details</button>
                    {tableMeta.rowData[6] == 'Verified' ?
                      <React.Fragment>
                        <button
                          className="popupbuttons1 uw-popup-button"
                          onClick={() => this.onOpenModal(value)}
                        // onClick={() => this.UpdatePoolUWStatus("Accepted By Underwriter",value)}
                        >
                          Accept
                        </button>
                        <button
                          className="popupbuttons1"
                          onClick={() => this.onOpenModal1(value)}
                        // onClick={() => this.UpdatePoolUWStatus("Rejected By Underwriter",value)}
                        >
                          Reject
                        </button>
                      </React.Fragment> : null}
                  </span>
                  {/* </Button> */}
                </div>
              </React.Fragment>
            );
          },
        },
      },
    ];
    const columnsSerivcer = [
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
        name: "dealId",
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
                paddingLeft: "20px",
              }}
            >
              {columnMeta.label}
            </th>
          ),
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <React.Fragment>
                <React.Fragment>
                  <div className="">
                    <span>
                      {/* <Button variant="outlined" id="optionalbutton" type="submit" onClick={this.onOpenModal1.bind(this)}> */}
                      <button className="popupbutton1" onClick={() => this.ViewDetails(value)}>View Details</button>

                    </span>
                    {/* </Button> */}
                  </div>
                </React.Fragment>
              </React.Fragment>
            );
          },
        },
      },
    ];

    return (
      <React.Fragment>
        <div className="page">
          {this.state.userRole === "Issuer" ? (
            <div>
              <Sidebar activeComponent={"IssuerDashboard"} />
              <div className="content1">
                <div className="header">
                  <Header></Header>
                </div>
                {/* {this.state.getLoansLoader == false ? '' : <LinearLoader></LinearLoader>} */}
                <div className="page-content">
                  <div className="row row1">
                    <div className="investor-heading-container">
                      {this.state.showSearchBox == true ? (
                        this.searchBar()
                      ) : (
                        <h1 className="headerdashboard">Dashboard</h1>
                      )}
                    </div>

                    <div>
                      <div className="tablechangebutton">
                        <buton
                          type="button"
                          onClick={() => this.handleClickInsights()}
                          className={
                            this.state.activeInsights1 == true
                              ? "issuerDashboard-table-top-button-insights-active"
                              : "issuerDashboard-table-top-button-insights"
                          }
                        >
                          Portfolio
                        </buton>

                        <buton
                          type="button"
                          onClick={() => this.handleClickPools()}
                          className={
                            this.state.activeInsights3 == true
                              ? "issuerDashboard-table-top-button-workbench-active"
                              : "issuerDashboard-table-top-button-workbench"
                          }
                        >
                          Pools
                        </buton>

                        <buton
                          type="button"
                          onClick={() => this.handleClickLoans()}
                          className={
                            this.state.activeInsights2 == true
                              ? "issuerDashboard-table-top-button-rejected-active"
                              : "issuerDashboard-table-top-button-rejected"
                          }
                        >
                          Loans
                        </buton>
                        <buton
                          type="button"
                          onClick={() => this.handleClickLoans()}
                          className={
                            this.state.activeInsights2 == true
                              ? "issuerDashboard-table-top-button-rejected-active"
                              : "issuerDashboard-table-top-button-rejected"
                          }
                        >
                          Deals
                        </buton>
                      </div>
                    </div>

                    <div>
                      <div className="dashboard-top-right-container1">
                        <div className="search-bar-outer-container">
                          {this.state.showSearchBox == false && (
                            <button
                              className="search-mui-icons"
                              type="button"
                              onClick={this.onClickSearchButton}
                            >
                              <SearchOutlinedIcon />
                            </button>
                          )}
                        </div>
                        <Button className="card__button2" type="submit">
                          Add Loans
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                        >
                          Set-up Pool
                        </Button>
                      </div>
                    </div>
                  </div>

                  <React.Fragment>
                    {this.state.activeInsights1 == true ? (
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
                    ) : this.state.activeInsights2 == true ? (
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
                        <MuiThemeProvider theme={this.getMuiTheme()}>
                          <MUIDataTable
                            // title={'Dashboard'}
                            data={this.state.tableData}
                            columns={columns}
                            options={options}
                          />
                        </MuiThemeProvider>
                      </div>
                    )}
                  </React.Fragment>
                </div>
              </div>
            </div>
          ) : this.state.userRole === "Paying Agent" ? (
            <div>
              <Sidebar activeComponent={"PayingAgentDeal"} />

              <div className="content1">
                <div className="header">
                  <Header></Header>
                </div>
                <div className="page-content">
                  <div className="row row1">
                    <div className="investor-heading-container">
                      {this.state.showSearchBox == true ? (
                        this.searchBar()
                      ) : (
                        <h1 className="headerdashboard">Dashboard</h1>
                      )}
                    </div>

                    <div>
                      <div className="tablechangebutton3">
                        <buton
                          type="button"
                          onClick={() => this.handleClickDeals()}
                          className={
                            this.state.activeDeals == true
                              ? "issuerDashboard-table-top-button-workbench-active"
                              : "issuerDashboard-table-top-button-workbench"
                          }
                        >
                          Deals
                        </buton>

                        <buton
                          type="button"
                          onClick={() => this.handleClickActive()}
                          className={
                            this.state.activePools == true
                              ? "issuerDashboard-table-top-button-insights-active"
                              : "issuerDashboard-table-top-button-insights"
                          }
                        >
                          Active
                        </buton>
                      </div>
                    </div>

                    <div>
                      <div className="dashboard-top-right-container1">
                        <div className="search-bar-outer-container uw-search-button-container">
                          {this.state.showSearchBox == false && (
                            <Button
                              variant="contained"
                              color="primary"
                              type="button"
                              onClick={this.onClickSearchButton}
                            >
                              Search
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <React.Fragment>
                    <div className="workbench-table-container">
                      <MuiThemeProvider theme={this.getMuiTheme()}>
                        <MUIDataTable
                          // title={'Dashboard'}
                          data={this.state.tableData}
                          columns={columnsAgent}
                          options={options}
                        />
                      </MuiThemeProvider>
                    </div>
                  </React.Fragment>
                </div>
              </div>
            </div>
          ) : this.state.userRole === "Verification" ? (
            <div>
              <Sidebar activeComponent="VA_Dashboard" />
              <div className="content1">
                <div className="header">
                  <Header></Header>
                </div>
                <div className="page-content">
                  <React.Fragment>
                    <div className="workbench-table-container">
                      <MuiThemeProvider theme={this.getMuiTheme()}>
                        <MUIDataTable
                          title={"Dashboard"}
                          data={this.state.tableData}
                          columns={columnsVerification}
                          options={options}
                        />
                      </MuiThemeProvider>
                    </div>
                  </React.Fragment>
                </div>
              </div>
            </div>
          ) : this.state.userRole === "Investor" ? (
            <div>
              <Sidebar
                activeComponent={"InvestorDashboard_Opportunities"}
              />

              <div className="content1">
                <div className="header">
                  <Header></Header>
                </div>
                {/* {this.state.getLoansLoader == false ? (
              ""
            ) : (
              <LinearLoader></LinearLoader>
            )} */}
                <div className="page-content">
                  <div className="row row1">
                    <div className="investor-heading-container">
                      {this.state.showSearchBox == true ? (
                        this.searchBar()
                      ) : (
                        <h1 className="headerdashboard">Dashboard</h1>
                      )}
                    </div>

                    <div>
                      <div className="tablechangebutton table_change-investor-buttons">
                        {/* <buton
                      type="button"
                      onClick={() => this.handleClickInsights()}
                      className={this.state.activeInsights1 == true ? "issuerDashboard-table-top-button-insights-active" : "issuerDashboard-table-top-button-insights"}>
                      Insights
                    </buton> */}
                        <buton
                          type="button"
                          onClick={() => this.handleClickInvested()}
                          className={
                            this.state.investorInsights1 == true
                              ? "issuerDashboard-table-top-button-rejected-active"
                              : "issuerDashboard-table-top-button-rejected"
                          }
                        >
                          Portfolio
                        </buton>
                        <buton
                          type="button"
                          onClick={() => this.handleClickOpportunities()}
                          className={
                            this.state.investorInsights2 == true
                              ? "issuerDashboard-table-top-button-workbench-active"
                              : "issuerDashboard-table-top-button-workbench"
                          }
                        >
                          Opportunities
                        </buton>
                      </div>
                    </div>

                    <div>
                      <div className="dashboard-top-right-container1">
                        <div className="search-bar-outer-container">
                          {this.state.showSearchBox == false && (
                            <button
                              className="search-mui-icons"
                              type="button"
                              onClick={this.onClickSearchButton}
                            >
                              <SearchOutlinedIcon className="reordersize" />
                            </button>
                          )}
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
                            onClick={() => this.handleClickmoduleicon()}
                            className={
                              this.state.moduleicon == true
                                ? "barchart-chart-active"
                                : "barchart-chart"
                            }
                            type="button"
                          >
                            <ViewModuleIcon className="reordersize" />
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
                            columns={columnsInvestor}
                            options={options}
                          />
                        </MuiThemeProvider>
                      </div>
                    ) : (
                      <div className="workbench-table-container">
                        <div className="op-main-main-container">
                          {this.state.tableData.map((data) => (
                            <OpprtunitiesCard
                              data={data}
                              key={data.dealName}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                </div>
              </div>
            </div>
          ) : this.state.userRole === "Underwriter" ? (
            <div>
              <Sidebar activeComponent={"UW_Dashboard_Pools"} />
              <div className="content1">
                <div className="header">
                  <Header></Header>
                </div>

                <div className="page-content">
                  <div className="row row1">
                    <div className="investor-heading-container">
                      {this.state.showSearchBox == true ? (
                        this.searchBar()
                      ) : (
                        <h1 className="headerdashboard">Dashboard</h1>
                      )}
                    </div>

                    <div>
                      <div className="tablechangebutton3">
                        <buton
                          type="button"
                          onClick={() => this.handleClickPools()}
                          className={
                            this.state.activePoolsUnder == true
                              ? "issuerDashboard-table-top-button-workbench-active"
                              : "issuerDashboard-table-top-button-workbench"
                          }
                        >
                          Pools
                        </buton>

                        <buton
                          type="button"
                          onClick={() => this.handleClickDeals()}
                          className={
                            this.state.activePoolsUnder == false
                              ? "issuerDashboard-table-top-button-insights-active"
                              : "issuerDashboard-table-top-button-insights"
                          }
                        >
                          Deals
                        </buton>
                      </div>
                    </div>

                    <div>
                      <div className="dashboard-top-right-container1">
                        <div className="search-bar-outer-container uw-search-button-container">
                          {this.state.showSearchBox == false && (
                            <Button
                              variant="contained"
                              color="primary"
                              type="button"
                              onClick={this.onClickSearchButton}
                            >
                              Search
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <React.Fragment>
                    <div className="workbench-table-container">
                      <MuiThemeProvider theme={this.getMuiTheme()}>
                        <MUIDataTable
                          // title={'Dashboard'}
                          data={this.state.tableData}
                          columns={columnsUW}
                          options={options}
                        />
                      </MuiThemeProvider>
                    </div>
                  </React.Fragment>
                </div>
              </div>
            </div>
          ) : this.state.userRole === "Servicer" ? (
            <div>
              <Sidebar activeComponent={"ServicerDashboardDeals"} />
              <div className="content1">
                <div className="header">
                  <Header></Header>
                </div>
                {/* {this.state.getLoansLoader == false ? (
              ""
            ) : (
              <LinearLoader></LinearLoader>
            )} */}
                <div className="page-content">
                  <div className="row row1">
                    <div className="investor-heading-container">
                      {this.state.showSearchBox == true ? (
                        this.searchBar()
                      ) : (
                        <h1 className="headerdashboard">Dashboard</h1>
                      )}
                    </div>

                    <div>
                      <div className="tablechangebutton3">
                        <buton
                          type="button"
                          onClick={() => this.handleClickDeals()}
                          className={
                            this.state.activeDeals == true
                              ? "issuerDashboard-table-top-button-workbench-active"
                              : "issuerDashboard-table-top-button-workbench"
                          }
                        >
                          Deals
                        </buton>

                        <buton
                          type="button"
                          onClick={() => this.handleClickActive()}
                          className={
                            this.state.activePools == true
                              ? "issuerDashboard-table-top-button-insights-active"
                              : "issuerDashboard-table-top-button-insights"
                          }
                        >
                          Active
                        </buton>
                      </div>
                    </div>

                    <div>
                      <div className="dashboard-top-right-container1">
                        <div className="search-bar-outer-container uw-search-button-container">
                          {this.state.showSearchBox == false && (
                            <Button
                              variant="contained"
                              color="primary"
                              type="button"
                              onClick={this.onClickSearchButton}
                            >
                              Search
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <React.Fragment>
                    <div className="workbench-table-container">
                      <MuiThemeProvider theme={this.getMuiTheme()}>
                        <MUIDataTable
                          // title={'Dashboard'}
                          data={this.state.tableData}
                          columns={columnsSerivcer}
                          options={options}
                        />
                      </MuiThemeProvider>
                    </div>
                  </React.Fragment>
                </div>
              </div>
            </div>
          ) : null}


          {this.state.showStartPopUp && (
            <ReactModal
              isOpen={this.state.showStartPopUp}
              contentLabel="Minimal Modal Example"
              style={customStylesRegisterPopup}
            >

              <React.Fragment>

                <div className="modalPopup2">
                  <div className="modalshiftcontent">
                    <div className="modal-scroll">
                      <br />
                      <p>
                        <div className="modal-terms">
                          <div className="modal-terms-heading">Terms of Service</div>
                          {/* <div>
                            Effective Date: ___________, 2023
                          </div> */}
                          <div className="uploadBox">
                            <div className="uploadfile-section">
                              <span>
                                If you have already signed a Terms of Service agreement,
                                please upload here.
                              </span>
                              <button
                                className="card__button"
                                style={{
                                  position: "relative",
                                  backgroundColor: '#FFC000',
                                  cursor: 'pointer'
                                }}
                              >
                                <label htmlFor="fileInput" className="upload-button-label" >
                                  Upload
                                  {this.state.formLoader2 === true ? (
                                    <CircularProgress size="18px" color="primary !important" />
                                  ) : (
                                    ""
                                  )}
                                </label>
                                <input
                                  type="file"
                                  id="fileInput"
                                  accept=".csv,.xlsm, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                  style={{ display: 'none' }}
                                  onChange={this.handleFileUpload}
                                />
                              </button>
                            </div>

                            <hr></hr>

                            <p style={{ marginTop: '15px' }}>
                              Otherwise review the terms below.
                            </p>
                          </div>
                        </div>
                        <div className="modal-scroll2">
                          <div className="modal-scroll-main">
                            <div >
                              THESE TERMS OF SERVICE (“TOS”) FORM A LEGAL AGREEMENT
                              BETWEEN YOU, THE END USER (referenced herein as “You”)
                              AND INTAIN, INC. AND ITS AFFILIATES AND SUBSIDIARIES
                              (together, “Intain”) THAT APPLIES EACH TIME YOU USE OR
                              ACCESS INTAIN’S WEBSITES, ONLINE PLATFORM, SERVICES,
                              AND ASSOCIATED WEBPAGES, PORTALS, APPLICATIONS,
                              FEATURES, AND CONTENT (collectively, the “Content”).
                              YOU SHOULD THEREFORE READ THE FOLLOWING TERMS AND
                              CONDITIONS CAREFULLY, AS THEY GOVERN YOUR USE OF THE
                              CONTENT AND ITS FUNCTIONALITY. IF YOU DO NOT AGREE
                              WITH THIS TOS, YOU ARE NOT GRANTED PERMISSION TO
                              ACCESS OR OTHERWISE USE THE CONTENT AND ARE INSTRUCTED
                              TO EXIT AND/OR UNINSTALL THE CONTENT IMMEDIATELY.
                            </div>
                            <div className="modal-linethrough">1.Intain Platform</div>
                            <div>
                              Intain provides a proprietary software platform (the
                              “Intain Platform”) that connects various parties in
                              structured financial transactions, by utilizing certain
                              third-party blockchain protocols or service providers
                              (the “Supported Protocols”). Your interaction with
                              Supported Protocols on the Intain Platform is enabled by
                              smart contracts developed by Intain (the “Intain Smart
                              Contracts”) and which have been deployed by Intain to
                              the relevant blockchain and are accessible directly from
                              the Intain Platform. The Intain Smart Contracts
                              accessible through the Intain Platform may be updated or
                              altered from time to time, in Intain’s sole discretion,
                              in order to add new features and functionality, in
                              response to forks, chain migrations, or other changes to
                              the underlying blockchains, or in order to address
                              security incidents or vulnerabilities.
                            </div>

                            <div className="modal-linethrough">2.User Access</div>
                            <div>
                              You may access the Intain Platform through the Intain
                              website. You are responsible, at Your own expense, for
                              installing, operating, and maintaining all equipment,
                              software, services, and related technology necessary for
                              Your authorized users to access the Intain Platform via
                              the internet. You will be required to register an
                              account to use the Content or certain features of the
                              Content. Registration for access to and use of the
                              Content may also require access credentials, such as a
                              username and a password, or adherence to other access
                              requirements as designated by Intain in its sole
                              discretion from time to time. By submitting the
                              requested information to the registration form or
                              similar process on the Content, You represent and
                              warrant that the information You submit for registration
                              is complete, true, accurate, and current in all
                              respects. You must maintain and promptly update Your
                              submitted account information to ensure that such
                              information is complete, true, accurate, and current.
                              Intain reserves the right to suspend, terminate, or
                              otherwise discontinue Your account and/or pending
                              registration if Intain has reasonable grounds to suspect
                              that any information You have submitted is untrue,
                              inaccurate, not current, or incomplete, or that Your
                              registration, account, or use of the Content is in
                              violation of applicable law or this TOS. You are solely
                              responsible for ensuring the security of the internet
                              connections used by You and Your authorized users to
                              access the Intain Platform. You are also solely
                              responsible for ensuring that the passwords and login
                              credentials necessary for You and Your authorized users
                              to access the Intain Platform are securely maintained.
                              Intain will not be liable for any unauthorized access to
                              the Intain Platform that may occur as a result of the
                              failure of You, or one or more of Your authorized users,
                              to secure their password and login credentials. You
                              shall immediately notify Intain if You suspect or become
                              aware of any loss, theft, or unauthorized use of Your
                              login credentials. Intain will not be liable for any
                              loss or damage arising from Your failure (whether
                              intentional or unintentional) to comply with these
                              obligations.
                            </div>

                            <div className="modal-linethrough">3.User Wallet</div>
                            <div>
                              In order to participate on the Intain Platform, you may
                              be required to have or create a compatible wallet (the
                              “Wallet”) in order to use certain services provided on
                              the Intain Platform. When you create a Wallet, the
                              Wallet details will be stored in Your account. Once You
                              have created a Wallet, You will be provided with
                              instructions to back up your Wallet using private key or
                              keystore or a seed phrase consisting of twelve (12)
                              random words that should be written down on paper and
                              safeguarded such that only You have access to the seed
                              phrase. This private key, keystore, seed phrase will
                              allow You to restore your Wallet in the event You lose
                              Your device or forget Your password. It is Your
                              responsibility to maintain Your seed phrase, private
                              key, keystore and any PIN, and to prevent others from
                              obtaining them. If You lose your seed phrase, private
                              key, keystore, Intain will not be able to restore access
                              to Your Wallet and any assets affiliated with that
                              Wallet may be permanently lost. If anyone other than You
                              obtain access to Your device, PIN, and/or seed
                              phrase/private key/keystore, and transfers any assets
                              out of Your Wallet, Intain will not be able to reverse
                              the transfer and the assets may be permanently lost. The
                              Wallet is non-custodial. You will remain in control of
                              the digital assets stored in Your Wallet at all times
                              and Intain will never have custody of, or any control
                              over, those digital assets. For the avoidance of doubt,
                              You will at all times be responsible for securing the
                              private key(s) necessary to sign transactions from the
                              blockchain address(es) connected to the Intain Platform
                              and Intain will not have access to, or take possession
                              of, such private key(s) or otherwise have the ability to
                              control the digital assets stored in Your Wallet. You
                              may designate a Third-Party Custodian to control Your
                              Wallet and safeguard the digital assets, but such
                              designation must be disclosed to Intain in writing and
                              such Third-Party Custodian will be subject to the terms
                              of the TOS.
                            </div>

                            <div className="modal-linethrough">
                              4.License Grant and Restrictions
                            </div>
                            <div>
                              This TOS provides to You a revocable, limited,
                              non-exclusive, non-sublicensable, and non-transferable
                              license to use and access the Content during the Term
                              specified herein solely for Your internal business use,
                              conditioned on Your continued compliance with all
                              provisions of this TOS (including without limitation any
                              external terms and documentation linked or referenced
                              herein).
                              <div>
                                When using the Content in accordance with the
                                foregoing license, You shall not directly or
                                indirectly:
                                <p>
                                  (a)use the Content to create any service, software
                                  or documentation that performs substantially the
                                  same functionality as the Content or otherwise
                                  competes with or causes harm to Intain’s products,
                                  services, or other business operations;
                                  <br />
                                  (b)disassemble, decompile, reverse-engineer, or use
                                  any other means to attempt to discover any source
                                  code, algorithms, trade secrets, or applications
                                  underlying the Content or any of its webpages,
                                  content, or features;
                                  <br />
                                  (c)encumber, sublicense, transfer, distribute, rent,
                                  lease, time-share, or use the Content in any service
                                  bureau arrangement or otherwise for the benefit of
                                  any third party;
                                  <br />
                                  (d)adapt, combine, create derivative works of, or
                                  otherwise modify the Content;
                                  <br />
                                  (e)disable, circumvent, or otherwise avoid or
                                  undermine any security or authentication device,
                                  mechanism, protocol, or procedure implemented in the
                                  Content;
                                  <br />
                                  (f)misrepresent Your affiliation with or impersonate
                                  any person or entity;
                                  <br />
                                  (g)use or access the Content for any unlawful,
                                  fraudulent, deceptive, tortious, malicious, or
                                  otherwise harmful or injurious purpose;
                                  <br />
                                  (i)remove, obscure, deface, or alter any proprietary
                                  rights notices on any element of the Content or
                                  accompanying documentation;
                                  <br />
                                  (j)use the Content in any manner which could damage,
                                  disable, overburden, or impair the Content or
                                  interfere with any third party’s authorized use of
                                  the Content;
                                  <br />
                                  (k)engage in any “data mining,” “deep-link,”
                                  “page-scrape,” or use “bots,” “spiders,” or similar
                                  data gathering and extraction tools or methods in
                                  connection with the Content; or
                                  <br />
                                  (l)probe, scan, or test the vulnerability of the
                                  Content or any systems or network infrastructure
                                  connected with the Content, including without
                                  limitation by stress testing or penetration testing.
                                </p>
                              </div>
                            </div>

                            <div className="modal-linethrough">
                              5.User Representations
                            </div>
                            <div>
                              <p>
                                You represent and warrant that: (a)You are at least
                                eighteen (18) years of age or the legal age of
                                majority in Your jurisdiction (whichever is greater)
                                and will, at all times, provide true, accurate,
                                current, and complete information (which You have all
                                necessary rights, permission(s), prior express
                                consent, or authority to provide) when submitting
                                information through the Content;
                                <br />
                                (b)agreeing to the TOS and Your use of the Content
                                does not constitute, and that You do not expect it to
                                result in, a breach, default, or violation of any
                                contract or agreement to which you are a party or are
                                otherwise bound;
                                <br />
                                (c)You will comply with all applicable laws, rules,
                                and regulations in using the Content;
                                <br />
                                (d)You have and will maintain any and all licenses and
                                permissions required by applicable law to engage in
                                activity utilizing the Content during the term of
                                these TOS; and
                                <br />
                                (e)You are not a person, entity controlled by a
                                person, or entity identified on, or controlling a
                                blockchain address identified on, a list of persons or
                                blockchain addresses that have been specially
                                designated, considered parties of concern, or blocked
                                that is established and maintained by the United
                                Nations, the European Union, or the Office of Foreign
                                Asset Control of the United States Treasury
                                Department.
                                <br />
                                You hereby agree that (i) You will comply with all
                                applicable sanctions and export control laws, and (ii)
                                You are solely responsible for ensuring that the
                                Content is used, disclosed, and/or accessed only in
                                accordance with all applicable sanctions and export
                                control laws. In addition, You are responsible for
                                compliance with all applicable laws, rules, and
                                regulations, including but not limited to all laws and
                                regulations governing consumer protection, unfair
                                competition, commercial electronic mail (email) and
                                messages, advertising, privacy, and information
                                security with respect to Your use of the Content. If
                                You access the Content on behalf of any organization,
                                Your organization shall be bound to this TOS and be
                                liable for any breach by You, and You represent that
                                You have all rights, power, and authority to agree to
                                this TOS on behalf of Your organization.
                                <br />
                                The Content is not intended for use or access by any
                                individual under the age of thirteen (13) years, and
                                Intain does not knowingly, willingly, or intentionally
                                collect personal information from such individuals in
                                any medium for any purpose.
                              </p>
                            </div>
                            <div className="modal-linethrough">
                              6.Electronic Communications
                            </div>
                            <p>
                              Intain may send emails or other electronic messages to
                              You concerning Your use of the Content, including
                              without limitation by providing alerts or notifications
                              within the Content. You consent to receive such
                              electronic communications and You agree that all such
                              electronic communications constitute valid legal notices
                              satisfying any requirement that such notices be in
                              writing.
                            </p>

                            <div className="modal-linethrough">7.Submissions</div>
                            <div>
                              Certain features of the Content may permit You to
                              upload, post, display, transmit, or otherwise provide
                              certain requested information, content, links, files, or
                              other materials to the Content as part of messaging,
                              review, comment, discussion board, or similar
                              functionality on the Content, and/or as part of a
                              survey, questionnaire, promotion, or request for
                              feedback or input regarding the Content (each a
                              “Submission” and collectively “Submissions”). You hereby
                              grant to Intain a royalty-free, fully transferable,
                              fully sublicensable license to use, display, copy,
                              perform, reproduce, modify, record, distribute, and
                              create derivative works of Submissions in connection
                              with: (i) Intain’s operation of the Content and its
                              features and functionalities; (ii) Intain’s development,
                              promotion, and implementation of its products, services,
                              programs, and events; and (iii) Intain’s research,
                              development, and other business operations. In addition,
                              You agree that You will not upload, post, display, or
                              transmit any Submission(s) that:
                              <br />
                              <p>
                                (a)is illegal, defamatory, deceptive, fraudulent,
                                discriminatory, tortious, obscene, pornographic, or
                                otherwise objectionable;
                                <br />
                                (b)infringes, misappropriates, or otherwise violates
                                the personal or proprietary rights of others;
                                <br />
                                (c)contains any virus, malware, worm, Trojan horse,
                                disabling device, or any other harmful or malicious
                                script, code, or tool;
                                <br />
                                (d)impersonates any person or entity or falsely states
                                or otherwise misrepresents Your affiliation with a
                                person or entity;
                                <br />
                                (e)contains unsolicited communications, promotions, or
                                advertisements, or spam;
                                <br />
                                (f)harms, harasses, threatens, or violates the rights
                                of any third party, or promotes, provokes, or incites
                                violence;
                                <br />
                                (g)constitutes false advertising, false endorsement,
                                or is otherwise false, misleading, or likely to cause
                                consumer confusion; or
                                <br />
                                (h)manipulates data or identifiers in order to
                                misrepresent or disguise the origin of the Submission.
                              </p>
                              Intain may screen, review, edit, moderate, or monitor
                              Your Submissions from time to time at its discretion,
                              but has no obligation to do so. In any event, Intain is
                              not responsible to You under this TOS for Your or any
                              other user’s Submissions, and shall have no liability or
                              responsibility for the quality, content, accuracy,
                              legality, or effectiveness of any Submissions. You
                              acknowledge and agree that Intain shall have no
                              obligation of confidentiality whatsoever with respect to
                              Your Submissions.
                              <br />
                              By uploading, posting, displaying, transmitting, or
                              otherwise providing a Submission to the Content, You
                              represent and warrant that: (i) You possess all legal
                              rights required to upload, post, display, and/or
                              transmit each Submission and permit Intain to use such
                              Submission as set forth herein (including without
                              limitation any necessary third-party license rights or
                              required consents under applicable law); (ii) each
                              Submission is in full compliance with all applicable
                              laws and regulations; and (iii) Your Submissions do not
                              infringe, misappropriate, or otherwise violate the
                              personal or proprietary rights of any third party.
                            </div>

                            <div className="modal-linethrough">
                              8.Third Party Services
                            </div>
                            <div>
                              Certain services, features, or components made available
                              via the Content are delivered by third-party providers.
                              By using any feature, service, or functionality
                              originating from the Content, You hereby acknowledge and
                              consent that Intain may share information and data that
                              You submit or upload to the Content with the applicable
                              third-party provider as may be required to enable and
                              facilitate the requested third-party product, service,
                              or functionality, subject to Intain’s Privacy Policy.
                              Intain makes no representation or guarantee whatsoever
                              with respect to any third-party products or services.
                              <br />
                              <br />
                              <div className="modal-terms">
                                INTAIN EXPRESSLY DISCLAIMS RESPONSIBILITY AND
                                LIABILITY FOR ANY THIRD-PARTY MATERIALS, PROGRAMS,
                                APPLICATIONS, TOOLS, PRODUCTS, AND SERVICES SET FORTH,
                                DESCRIBED ON, OR ACCESSED THROUGH THE CONTENT, AND YOU
                                AGREE THAT INTAIN SHALL NOT BE RESPONSIBLE FOR ANY
                                LOSS OR DAMAGE INCURRED AS A RESULT OF ANY DEALINGS
                                BETWEEN YOU AND A THIRD PARTY, REGARDLESS OF WHETHER
                                SUCH DEALINGS WERE FACILITATED OR PERFORMED IN
                                CONNECTION WITH THE CONTENT.
                              </div>
                              <br />
                              Many different third-party service providers will use
                              the Content and provide services available via the
                              Content. These third-party service providers include,
                              but are not limited to, verification agents, servicers,
                              trustees or administrators, ratings agencies, and user
                              verification services. To the extent that You utilize
                              one or more of these third-party service providers, such
                              services will be subject to any agreement entered into
                              between You and the relevant third-party service
                              provider. You understand that any such third-party
                              services are not governed by these TOS and that You are
                              solely responsible for reviewing, understanding, and
                              accepting the terms, conditions and risks associated
                              with any such third-party agreement.
                              <br />
                              <br />
                              Additional notices, terms, and conditions may apply to
                              services, receipt of or access to certain materials,
                              participation in a particular program, and/or to
                              specific portions or features of the Content, including
                              without limitation the terms of third-party tools,
                              applications, and APIs utilized by or incorporated in
                              the Content, and the terms of app stores, digital
                              distribution services, or third-party payment
                              processors. Your use of any such third-party feature,
                              tool, application, or API is conditioned on Your
                              acceptance of all third-party terms applicable thereto,
                              and You agree to abide by all such terms in connection
                              with Your use of the Content. You hereby agree that: (i)
                              this TOS operates in addition to any terms of service
                              imposed or required by any such third-party provider;
                              and (ii) the terms of this TOS supplement and do not
                              alter or amend any such third-party terms of service.
                            </div>
                            <div className="modal-linethrough">9.Data Privacy</div>
                            <div>
                              You understand, acknowledge, and agree that the
                              operation of certain features of the Content may require
                              or involve the provision, use, and dissemination of
                              various items of personally identifiable information,
                              including without limitation personal contact
                              information. Please refer to Intain’s Privacy Policy,
                              available upon request (as updated from time to time),
                              for a summary of Intain’s policies and use practices
                              regarding personally identifiable information.
                            </div>

                            <div className="modal-linethrough">
                              10.Proprietary Rights
                            </div>
                            <div>
                              All content included as part of the Content, such as
                              text, graphics, logos, and images, as well as the
                              compilation thereof, and any software or other
                              proprietary materials used on or integrated with the
                              Content, are the property of Intain or its applicable
                              third-party licensors, and are protected by copyright
                              and other domestic and international laws governing
                              intellectual property and proprietary rights. Intain
                              reserves all rights in the Content not expressly granted
                              herein.
                              <br />
                              <br />
                              You agree that You do not acquire any ownership rights
                              in any part of the Content under this TOS or through
                              Your use of the Content. Intain does not grant You any
                              rights or licenses, express or implied, to any
                              intellectual property hereunder except as specifically
                              authorized by this TOS.
                            </div>
                            <div className="modal-linethrough">
                              11.Indemnification
                            </div>
                            <div>
                              You agree to indemnify, defend, and hold harmless Intain
                              and its officers, directors, employees, agents,
                              successors, and assigns from and against any losses,
                              costs, liabilities, damages, and expenses (including
                              reasonable attorneys’ fees) relating to or arising out
                              of (i) Your use of any Content, (ii) Your violation of
                              this TOS, (iii) Your infringement, misappropriation, or
                              violation of any personal or proprietary rights of a
                              third party, (iv) Your violation of applicable laws,
                              rules, or regulations, and/or (v) Your Submissions,
                              including without limitation the quality, content,
                              accuracy, legality, or effectiveness thereof, or any
                              communications, transactions, or results arising
                              therefrom. reserves the right, at its own cost, to
                              assume the exclusive defense and control of any matter
                              otherwise subject to indemnification by You, in which
                              event You will fully cooperate with Intain in asserting
                              any available defenses.
                            </div>

                            <div className="modal-linethrough">
                              12.Disclaimers and Excluded Liability
                            </div>
                            <div className="modal-terms">
                              INTAIN DOES NOT REPRESENT OR WARRANT THAT THE CONTENT
                              WILL OPERATE ERROR-FREE OR ON AN UNINTERRUPTED BASIS.
                              THE CONTENT IS PROVIDED “AS IS” AND “AS AVAILABLE,” AND
                              TO THE MAXIMUM EXTENT PERMITTED UNDER APPLICABLE LAW,
                              INTAIN HEREBY DISCLAIMS ANY AND ALL WARRANTIES, EXPRESS
                              OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
                              WARRANTIES OF TITLE, NON-INFRINGEMENT, MERCHANTABILITY,
                              OR FITNESS FOR A PARTICULAR PURPOSE. INTAIN DOES NOT
                              WARRANT THAT THE CONTENT WILL MEET YOUR EXPECTATIONS,
                              SPECIFICATIONS, OR REQUIREMENTS, OR THAT THE CONTENT
                              WILL BE FREE OF VIRUSES, MALWARE, OR ERRORS. INTAIN
                              FURTHER EXPRESSLY DISCLAIMS ANY WARRANTY REGARDING THE
                              LOSS OR CORRUPTION OF DATA OR CONTENT UPLOADED TO,
                              STORED BY, OR TRANSMITTED BY THE CONTENT OR SERVICES,
                              INCLUDING WITHOUT LIMITATION ANY SUBMISSIONS. INTAIN
                              DOES NOT ENDORSE ANY OTHER THIRD PARTY AND SHALL NOT BE
                              RESPONSIBLE IN ANY WAY FOR ANY TRANSACTIONS YOU ENTER
                              INTO WITH SUPPORTED PROTOCOLS OR ANY OTHER THIRD PARTY.
                              YOU AGREE THAT INTAIN WILL NOT BE LIABLE FOR ANY LOSS OR
                              DAMAGES OF ANY SORT INCURRED AS THE RESULT OF ANY
                              INTERACTIONS BETWEEN YOU AND SUPPORTED PROTOCOLS OR ANY
                              OTHER THIRD PARTY. IN NO EVENT SHALL INTAIN BE LIABLE
                              HEREUNDER, REGARDLESS OF THE FORM OF ANY CLAIM OR ACTION
                              (WHETHER IN CONTRACT, NEGLIGENCE, STATUTORY LIABILITY OR
                              OTHERWISE), FOR ANY: (A) LOSS OR INACCURACY OF DATA,
                              LOSS, OR INTERRUPTION OF USE, OR COST OF PROCURING
                              SUBSTITUTE TECHNOLOGY, GOODS OR SERVICES, OR ANY
                              INDIRECT, PUNITIVE, INCIDENTAL, RELIANCE, SPECIAL,
                              EXEMPLARY, OR CONSEQUENTIAL DAMAGES, INCLUDING WITHOUT
                              LIMITATION DAMAGES FOR LOSS OF BUSINESS, REVENUES,
                              PROFITS AND/OR GOODWILL, EVEN IF SUCH DAMAGES WERE
                              REASONABLY FORESEEABLE OR IF INTAIN WAS ADVISED OF THE
                              POSSIBILITY OF SUCH DAMAGES; OR (B) DAMAGES WHICH, IN
                              THE AGGREGATE, EXCEED [(I) THE TOTAL AMOUNTS PAID BY YOU
                              TO INTAIN FOR USE OF THE CONTENT OVER THE SIX (6) MONTHS
                              IMMEDIATELY PRIOR TO THE DATE ON WHICH THE APPLICABLE
                              CLAIM OR CAUSE OF ACTION FIRST ACCRUED, OR (II) IF THERE
                              IS NO SUCH AMOUNT PAID, TEN U.S. DOLLARS (USD$10.00)].
                              THESE LIMITATIONS SHALL APPLY NOTWITHSTANDING THE
                              INSUFFICIENCY OR FAILURE OF THE ESSENTIAL PURPOSE OF ANY
                              REMEDY PROVIDED HEREIN. CERTAIN JURISDICTIONS AND LAWS
                              MAY NOT PERMIT SOME OR ALL OF THE DISCLAIMERS OF
                              LIABILITY SET FORTH IN THIS SECTION. IN THE EVENT THAT
                              SUCH A JURISDICTION OR LAW APPLIES TO THE SUBJECT MATTER
                              OF THIS TOS, THE FOREGOING DISCLAIMERS WILL APPLY TO THE
                              MAXIMUM EXTENT PERMITTED UNDER APPLICABLE LAW.
                            </div>

                            <div className="modal-linethrough">
                              13.Potential Risks
                            </div>
                            <div>
                              You accept and acknowledge each of the following:
                              <p>
                                <br />
                                (a)Like all software, the Intain Platform and the
                                Intain Smart Contracts may be subject to exploits.
                                Intain is not responsible for exploits that are not
                                reasonably foreseeable. While Intain has taken a
                                number of precautions to ensure the security of the
                                Intain Platform and the Intain Smart Contracts, the
                                technology is relatively new, and it is not possible
                                to guarantee that the code is completely free from
                                bugs or errors. You accept all risks that arise from
                                using the Intain Platform and the Intain Smart
                                Contracts, including, and not limited to, the risk of
                                any funds being lost due to a failure or exploit of
                                the Intain Platform and the Intain Smart Contracts.
                                <br />
                                (b)You are solely responsible for securing Your login
                                credentials and any device You use to access Your
                                account on Intain. You understand that anyone who
                                obtains your login credentials and access to your
                                device may access your Wallet with or without your
                                authorization and may transfer any digital assets
                                accessible through your Wallet.
                                <br />
                                (c)The value of any digital asset, where value is
                                attached to such an asset, may fluctuate. Intain makes
                                no guarantees as to the price or value of any digital
                                asset on any secondary market.
                                <br />
                                (d)Risks associated with digital assets that may be
                                stored in Your Wallet include, but are not limited to,
                                the following: the risk of losing private keys, theft
                                resulting from third parties discovering your private
                                key, value fluctuation of digital assets on the
                                secondary market, disruptions to the blockchain
                                networks caused by network congestion, lack of
                                usability of, or loss of value with respect to,
                                digital assets due to a hard fork or other disruption
                                to the blockchain networks, or errors or
                                vulnerabilities in the smart contract code associated
                                with a given digital asset or transactions involving
                                digital assets. Transfers on a blockchain are likely
                                irreversible. Once an instruction, signed by the
                                required private key(s), to transfer a digital asset
                                from one blockchain address to another has been
                                executed it cannot be undone.
                                <br />
                                (e)Intain may modify or discontinue support for the
                                Intain Platform or the Intain Smart Contracts at any
                                time. Intain reserves the right, at any time, in its
                                sole discretion, to modify the Intain Platform and the
                                Intain Smart Contracts.
                                <br />
                                (f)In the event of a change to an underlying
                                blockchain network, or other network disruption,
                                resulting in a fork of the existing blockchain into
                                one (or more) additional blockchains, the Intain
                                Platform and the Intain Smart Contracts may not
                                support activity related to any new digital assets
                                created as a result of the fork. In addition, in the
                                event of a fork, transactions on the network may be
                                disrupted, including transactions involving the Intain
                                Smart Contracts.
                                <br />
                                (g)[Blockchain networks charge fees for engaging in a
                                transaction on the network. Those network transaction
                                fees fluctuate over time depending on a variety of
                                factors. Intain does not control the pricing metrics
                                for network fees that may be imposed by the
                                Blockchain. You are solely responsible for paying any
                                network transaction fees associated with transactions
                                you engage in using services provided on the Intain
                                Platform. You are also solely responsible for any
                                other third-party fees that may be incurred in
                                connection with your use of such services.]
                                <br />
                                (h)You are solely responsible for determining whether
                                and which taxes assessments, or duties (or other
                                similar charges) apply to your transactions.
                              </p>
                            </div>
                            <div className="modal-linethrough">
                              14.Term, Termination, and Suspension
                            </div>
                            <div>
                              This TOS takes effect (or re-takes effect) at the moment
                              You first access or use the Content. Intain reserves the
                              right, in its sole discretion, at any time and on any
                              grounds–including, without limitation, any reasonable
                              belief of fraudulent or unlawful activity, or if Intain
                              reasonably suspects or determines that you are in
                              violation of this TOS–to deny, terminate, or suspend
                              Your access to the Content or to any portion thereof.
                              Additionally, Intain may, in its sole discretion, remove
                              and discard any materials within the Content, for any
                              reason. Intain may also in its sole direction and at any
                              time discontinue providing the Content, or any part
                              thereof, with or without notice. You agree that any
                              suspension or termination of your access to the Content
                              under any provision of this TOS may be effected without
                              prior notice. Further, you agree that Intain will not be
                              liable to you or any third party for any such suspension
                              or termination of your access to the Content.
                              <br />
                              <br />
                              This TOS terminates automatically if You fail to comply
                              with any provision hereof, subject to the survival
                              rights of certain provisions identified below. You may
                              also terminate this TOS at any time by ceasing to use
                              the Content, but each re-access or renewed use of the
                              Content will reapply the TOS to You. Upon termination or
                              expiration of the TOS for any reason, all licenses
                              granted by Intain hereunder shall immediately terminate,
                              and You must immediately cease all use of the Content.
                              The provisions of this TOS concerning Intain’s
                              proprietary rights, licenses to Submissions, disclaimers
                              of warranty and liability, limitations of liability,
                              waiver and severability, entire agreement,
                              indemnification rights, injunctive relief, and governing
                              law will survive the termination of this TOS for any
                              reason.
                            </div>
                            <div className="modal-linethrough">
                              15.Class Action Waiver
                            </div>
                            <div className="modal-terms">
                              BY USING THIS SITE AND AGREEING TO THESE TERMS, YOU
                              HEREBY WILLINGLY, EXPRESSLY, AND KNOWINGLY WAIVE ALL
                              RIGHT TO BRING OR PARTICIPATE IN ANY CLASS-ACTION
                              LAWSUIT, CLASS-WIDE ARBITRATION, OR PRIVATE
                              ATTORNEY-GENERAL ACTION BROUGHT UNDER OR IN CONNECTION
                              WITH THIS TOS OR YOUR USE OF THE CONTENT. YOU MAY NOT
                              BRING ANY CLAIM, SUIT, OR OTHER PROCEEDING TO ENFORCE
                              THIS TOS AS THE MEMBER OF ANY CLASS OR AS PART OF ANY
                              SIMILAR COLLECTIVE OR CONSOLIDATED ACTION.
                            </div>
                            <div className="modal-linethrough">
                              16.Governing Law and Jurisdiction
                            </div>
                            <div>
                              This TOS is governed by the laws of the State of
                              Delaware, United States of America, without reference to
                              its principles of conflict of laws. The Content may not
                              be used or accessed from or in any jurisdiction that
                              does not give effect to all provisions of this TOS,
                              including without limitation this paragraph.
                              <br />
                              <br />
                              In the event the parties hereto are not able to resolve
                              any dispute between them arising out of or concerning
                              this TOS or any provisions hereof, whether arising in
                              contract, tort, or any other legal theory, then such
                              dispute shall be resolved exclusively through final,
                              binding, and confidential arbitration pursuant to the
                              Federal Arbitration Act, conducted by a single neutral
                              arbitrator and administered under the Commercial
                              Arbitration Rules of the American Arbitration
                              Association. The exclusive site of such arbitration
                              shall be in Wilmington, Delaware. The arbitrator’s award
                              shall be final, and judgment may be entered upon it in
                              any court having jurisdiction. The prevailing party
                              shall be entitled to recover its costs and reasonable
                              attorneys’ fees. The entire dispute, including the scope
                              and enforceability of this arbitration provision, shall
                              be determined by the arbitrator. This arbitration
                              provision shall survive the termination of this TOS for
                              any reason.
                            </div>
                            <div className="modal-linethrough">17.General</div>
                            <div>
                              (a)Relationship of the Parties. Nothing herein or in
                              Your use of the Content shall be construed as creating
                              any joint venture, partnership, employment, or agency
                              relationship.
                              <br />
                              (b)Security and Compliance. Intain reserves the right to
                              view, monitor, and record Your activity on the Content
                              without notice or permission from You. Intain’s
                              provision of the Content is subject to existing laws and
                              legal process, and nothing contained herein shall
                              restrict or reduce Intain’s ability to comply with
                              governmental, court, and law enforcement requests or
                              requirements involving Your use of the Content or
                              information provided to or gathered by Intain with
                              respect to such use.
                              <br />
                              (c)Severability and Waiver. If any part of this TOS is
                              determined to be invalid or unenforceable pursuant to
                              court order or other operation of applicable law, such
                              provision shall be deemed severed from this TOS, and the
                              remainder of this TOS shall continue in full force and
                              effect to the maximum extent permitted under applicable
                              law. Failure to insist on strict performance of any of
                              this TOS will not operate as a waiver of any subsequent
                              default or failure of performance. No waiver by Intain
                              of any right under this TOS will be deemed to be either
                              a waiver of any other right or provision or a waiver of
                              that same right or provision at any other time.
                              <br />
                              (d)Injunctive Relief. You acknowledge that any breach,
                              threatened or actual, of this TOS would cause
                              irreparable injury to Intain not readily quantifiable as
                              money damages, such that Intain would not have an
                              adequate remedy at law. You therefore agree that Intain
                              shall be entitled, in addition to other available
                              remedies, to seek and be awarded an injunction or other
                              appropriate equitable relief from a court of competent
                              jurisdiction restraining any such breach of Your
                              obligations, without the necessity of posting bond or
                              other security.
                              <br />
                              (e)Changes to Terms. Intain reserves the right to change
                              the terms and conditions of this TOS by posting a
                              revised set of terms or mailing and/or emailing notice
                              thereof to You (or such other method as may be required
                              by applicable law). In addition, Intain may add, modify,
                              or delete any aspect, component, or feature of the
                              Content, but Intain is not under any obligation to
                              provide any upgrade, enhancement, or modification. Your
                              continued use of the Content following any announced
                              change will be deemed as conclusive acceptance of any
                              change to the TOS. Accordingly, please review the TOS on
                              a periodic basis.
                              <br />
                              (f)Contact Us. If You have any questions or comments
                              regarding this TOS, please contact Intain at
                              explore@intainft.com.
                            </div>

                          </div>
                          <div className="modalsubmit">
                            <div className="submitbuttonbg">
                              <div className="row-accept">
                                <div className="row justify-content-confirmmail">
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={this.updateTermsOfServiceDisagree}
                                  >
                                    Disagree
                                    {this.state.formLoader1 === true ? (
                                      <CircularProgress size="22px" color="primary" />
                                    ) : (
                                      ""
                                    )}
                                  </Button>
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={this.updateTermsOfService}
                                  >
                                    Agree
                                    {this.state.formLoader === true ? (
                                      <CircularProgress size="22px" color="primary" />
                                    ) : (
                                      ""
                                    )}
                                  </Button>

                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </p>

                    </div>

                    {/* {this.state.openPopup === true ? <React.Fragment><Snackbar msg={"Processor addded Successfully" || this.state.message} open="true" /> </React.Fragment> : ' '} */}
                  </div>
                </div>

              </React.Fragment>



            </ReactModal>
          )}
        </div>


      </React.Fragment>
    );
  }
}


export default withSnackbar(KYCLoginPopupStep2);
