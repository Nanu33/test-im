/* eslint-disable require-jsdoc */
import React, { Component } from 'react';
// import { connect } from 'react-redux';
import Header from '../../../components/header';
import Sidebar from '../../../components/sidebar';
import MUIDataTable from 'mui-datatables';
import TextField from '@material-ui/core/TextField';
import Loader from '../../../components/loader';
import CloseIcon from '@material-ui/icons/Close';
import { withSnackbar } from 'notistack';
import { FullscreenExit, TrainRounded } from "@material-ui/icons";
import { ThemeProvider, createTheme, MuiThemeProvider } from "@material-ui/core/styles";
import "react-input-range/lib/css/index.css";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Link } from 'react-router-dom'

class InvestorDashboard_Insights extends Component {
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
      searchText: '',
      rowsSelected: null,
      open1: false,
      open2: false,
      poolName: sessionStorage.getItem('poolname'),
      activeInsights1: true,
      activeInsights2: false,
      activeInsights3: false,
      showSearchBox: false,
      token:sessionStorage.getItem('token'),
    };
  }

  handleClickInsights = () => {
    this.setState({
      activeInsights1: true,
      activeInsights2: false,
      activeInsights3: false,
    });
  };

  handleClickInvested = () => {
    this.setState({
      activeInsights1: false,
      activeInsights2: true,
      activeInsights3: false,
    });
    window.location.assign('/admin/investorinvested')
  };
  handleClickOpportunities = () => {
    this.setState({
      activeInsights1: false,
      activeInsights2: false,
      activeInsights3: true,
    });
    window.location.assign('/admin/investoropportunites')
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
          value={this.state.searchText}
          onChange={this.onchange}
          placeholder="Search"
          variant="standard"
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
    const APIResponse = {
      "message": "successfull",
      "isSuccess": true,
      "data": [
        {
          "dealname": "Credit Capital Corp",
          "tranchname": "Senior",
          "originalinvestment": "$8,230,540",
          'interestrate': "2.3%",
          "interestpaid": "$230,540",
          'principalpaid': "$130,540",
          "outstandinginvestment": '$4,230,540',
        }, {
          "dealname": "Money Lender Inc",
          "tranchname": "Subordinated",
          "originalinvestment": "$10,465,730",
          'interestrate': "4%",
          "interestpaid": "$465,730",
          'principalpaid': "$365,730",
          "outstandinginvestment": '$8,465,730',
        }, {
          "dealname": "Money Lender Inc",
          "tranchname": "Mezzanine",
          "originalinvestment": "$2,039,280",
          'interestrate': "5.1%",
          "interestpaid": "$39,280",
          'principalpaid': "$29,280",
          "outstandinginvestment": '$1,039,280',
        }, {
          "dealname": "Credit Capital Corp",
          "tranchname": "Mezzanine",
          "originalinvestment": "$5,230,540",
          'interestrate': "3%",
          "interestpaid": "$230,540",
          'principalpaid': "$130,540",
          "outstandinginvestment": '$3,230,540',
        }, {
          "dealname": "Money Lender Inc",
          "tranchname": "Subordinated",
          "originalinvestment": "$12,456,730",
          'interestrate': "4%",
          "interestpaid": "$2,456,730",
          'principalpaid': "$1,456,730",
          "outstandinginvestment": '$10,456,730',
        }, {
          "dealname": "Credit Capital Corp",
          "tranchname": "Senior",
          "originalinvestment": "$6,639,690",
          'interestrate': "5.1%",
          "interestpaid": "$639,690",
          'principalpaid': "$539,690",
          "outstandinginvestment": '$4,639,690',
        }, {
          "dealname": "Credit Capital Corp",
          "tranchname": "Subordinated",
          "originalinvestment": "$1,239,430",
          'interestrate': "5.1%",
          "interestpaid": "$239,430",
          'principalpaid': "$139,430",
          "outstandinginvestment": '$839,430',
        }, {
          "dealname": "Money Lender Inc",
          "tranchname": "Subordinated",
          "originalinvestment": "$1,239,430",
          'interestrate': "5.1%",
          "interestpaid": "$239,430",
          'principalpaid': "$139,430",
          "outstandinginvestment": '$839,430',
        }, {
          "dealname": "Credit Capital Corp",
          "tranchname": "Senior",
          "originalinvestment": "$5,540,540",
          'interestrate': "2.3%",
          "interestpaid": "$230,540",
          'principalpaid': "$130,540",
          "outstandinginvestment": '$4,230,540',
        }, {
          "dealname": "Money Lender Inc",
          "tranchname": "Mezzanine",
          "originalinvestment": "$4,260,540",
          'interestrate': "3%",
          "interestpaid": "$260,540",
          'principalpaid': "$230,540",
          "outstandinginvestment": '$2,230,540',
        },
      ],
    }
    this.setState({ tableData: APIResponse.data})
    // this.getAllProcessors(token)
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
            "&:nth-child(even)": {
              backgroundColor: "rgb(229,229,229,0.3) !important",
            },
            "&.Mui-selected": {
              backgroundColor: "white !important",
            },
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
            fontSize:'15px !important',
            borderBottom: 'none !important'
          }
        },
        MuiCircularProgress:{
          colorSecondary:{
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
            border: '1.2px solid #212121 !important',
            borderRadius: '20px !important',
            boxShadow: 'none !important'
          },
          outlined: {
            fontFamily: 'Mulish, sans-serif !important',
            backgroundColor: '#fff !important',
            padding: '5px 30px !important',
            marginLeft: '10px !important',
            textTransform: 'none !important',
            border: '1.2px solid #212121 !important',
            borderRadius: '20px !important',
            boxShadow: 'none !important'
          },
          label:{
            fontSize:'15px !important',
            fontWeight:'600 !important',
            fontFamily: 'Mulish, sans-serif !important',
          },
          textPrimary: {
            color: '#018E82 !important',
          }
        },
        MUIDataTablePagination: {
          tableCellContainer: {
            borderBottom: "none !important",
          },
          navContainer: {
            justifyContent: "center",
          },
          toolbar:{
            paddingLeft:'50px !important'
          }
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
            marginRight: `${this.state.currentPage >= 1 && this.state.currentPage <= 9 ? "-138" : this.state.currentPage >= 10 ?'-142':"-130"}px`,
            fontSize: "0.80rem",
          },
        },
        MuiIconButton: {
          colorInherit: {
            color: "#018E82 !important",
            zIndex: '1000',
            marginRight: "60px",
            paddingLeft: "-25px",
          },
        },

        MUIDataTable: {
          paper: {
            boxShadow: 'none !important'
          },
          responsiveBase: {
            border: '1px solid #212121 !important',
            borderRadius: '10px !important',
          }
        },

      }
    });

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
        this.setState({ rowsSelected: allRows.map(row => row.dataIndex) });
        const selected = allRows.map(row => row.dataIndex);
        console.log("selected" + selected);
        this.selectedpoolid(selected);
      },

      onChangePage: (currentPage) => {
        console.log("currentPage", currentPage);
        this.setState({currentPage:currentPage})
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
      loading: false,
      textLabels: {
        body: {
          noMatch: this.state.loading === true ?
            'Sorry, there is no matching data to display' :
            <Loader msg={"Please wait, Loading Loan Data"} />,
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
        name: "dealname",
        label: 'Deal Name',
        options: {
          filter: true,
          sort: true,
        }
      },

      {
        name: 'tranchname',
        label: 'Tranch Name',
        options: {
          filter: true,
          sort: true,
        }
      },

      {
        name: 'originalinvestment',
        label: 'Original Investment',
        options: {
          filter: true,
          sort: true,
        }
      },

      {
        name: 'interestrate',
        label: 'Interest Rate',
        options: {
          filter: true,
          sort: true,
        }
      },

      {
        name: 'interestpaid',
        label: 'Interest Paid',
        options: {
          filter: true,
          sort: true,
        }
      },

      {
        name: 'principalpaid',
        label: 'Principal Paid',
        options: {
          filter: true,
          sort: true,
        }
      },

      {
        name: "outstandinginvestment",
        label: 'Outstanding Investment',
        options: {
          filter: true,
          sort: true,

        },
      },

      {
        name: "dealname",
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
                  <Link to={'/admin/investorpooldetails'} className="login-sign_up-link">View Details</Link>
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
          <Sidebar activeComponent={"InvestorDashboard_Invested"} />
          <div className="content1">
            <div className="header"><Header></Header></div>
            {/* {this.state.getLoansLoader == false ? '' : <LinearLoader></LinearLoader>} */}
            <div className="page-content">



              <div className="row row1">

                <div  className="investor-heading-container">
                  {this.state.showSearchBox == true ? this.searchBar() : <h1 className='headerdashboard'>Dashboard</h1>}
                </div>

                <div>
                  <div className='tablechangebutton table_change-investor-buttons'>
                    <buton
                      type="button"
                      onClick={() => this.handleClickInsights()}
                      className={this.state.activeInsights1 == true ? "issuerDashboard-table-top-button-insights-active" : "issuerDashboard-table-top-button-insights"}>
                      Insights
                    </buton>
                    <buton
                      type="button"
                      onClick={() => this.handleClickInvested()}
                      className={
                        this.state.activeInsights2 == true
                          ? "issuerDashboard-table-top-button-rejected-active"
                          : "issuerDashboard-table-top-button-rejected"
                      }
                    >
                      Invested
                    </buton>
                    <buton
                      type="button"
                      onClick={() => this.handleClickOpportunities()}
                      className={this.state.activeInsights3 == true ? "issuerDashboard-table-top-button-workbench-active" : "issuerDashboard-table-top-button-workbench"}>
                      Opportunities
                    </buton>
                  </div>
                </div>

                <div>
                  <div className="dashboard-top-right-container1">
                    <div className="search-bar-outer-container">
                      {this.state.showSearchBox == false &&
                        <button className="search-mui-icons" type="button" onClick={this.onClickSearchButton}>
                          <SearchOutlinedIcon />
                        </button>
                      }
                    </div>
                    {/* <Button className="card__button2" type="submit" onClick={this.onOpenModal.bind(this)}>Add Loans</Button>
                    <Button variant="contained" color="primary" type="submit" onClick={this.onOpenModal1.bind(this)}>Set-up Pool</Button> */}
                  </div>
                </div>
              </div>




              <React.Fragment>
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
              </React.Fragment>
            </div>
          </div>

        </div>


      </React.Fragment>
    );
  }
}


export default withSnackbar(InvestorDashboard_Insights);
