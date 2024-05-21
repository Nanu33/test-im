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
import { customStylesauto, customStylesautosmallmodalpopup } from '../../../components/customscripts/customscript';
import FormLoader from '../../../components/loader/formLoader';
import { FullscreenExit, TrainRounded } from "@material-ui/icons";
import { ThemeProvider, createTheme, MuiThemeProvider } from "@material-ui/core/styles";
import "react-input-range/lib/css/index.css";
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Link } from 'react-router-dom'
class popup2 extends Component {
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
            activeInsights1: false,
            activeInsights2: false,
            activeInsights3: true,
            showSearchBox: false,
            showStartPopUp: true,
        };
    }

    handleClick1 = () => {
        this.props.history.push({
            pathname: '/'
        });
    }

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

        return (
            <React.Fragment>
                <div className="page">
                    <Sidebar activeComponent={"IssuerDashboard"} />
                    <div className="content1">
                        <div className="header"><Header></Header></div>
                        {/* {this.state.getLoansLoader == false ? '' : <LinearLoader></LinearLoader>} */}
                        <div className="page-content">



                            <div className="row row1">

                                <div className="investor-heading-container">
                                    {this.state.showSearchBox == true ? this.searchBar() : <h1 className='headerdashboard'>Dashboard</h1>}
                                </div>

                                <div>
                                    <div className='tablechangebutton'>
                                        <buton
                                            type="button"
                                            onClick={() => this.handleClickInsights()}
                                            className={this.state.activeInsights1 == true ? "issuerDashboard-table-top-button-insights-active" : "issuerDashboard-table-top-button-insights"}>
                                            Portfolio
                                        </buton>
                                        
                                        <buton
                                            type="button"
                                            onClick={() => this.handleClickPools()}
                                            className={this.state.activeInsights3 == true ? "issuerDashboard-table-top-button-workbench-active" : "issuerDashboard-table-top-button-workbench"}>
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
                                        <Button className="card__button2" type="submit">Add Loans</Button>
                                        <Button variant="contained" color="primary" type="submit">Set-up Pool</Button>
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


                    {this.state.showStartPopUp && (
                        <ReactModal
                            isOpen={this.state.showStartPopUp}
                            onRequestClose={this.onCloseModal}
                            // contentLabel="Minimal Modal Example"
                            style={customStylesautosmallmodalpopup}
                        >
                            <React.Fragment>
                                {/* <div className="shiftingpopup"> */}
                                    {/* <div className="card__container2"> */}
                                        <div className='popupheading'><h4>Request Submitted!</h4></div>
                                        <h6 className="card1__title">Thank you for completing your KYC process. You will receive an email once we verify your application.</h6>
                                        <div className='popupbutton'>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                type="submit"
                                            onClick={this.handleClick1}
                                            > Okay
                                            </Button>
                                        </div>
                                    {/* </div> */}
                                {/* </div> */}
                            </React.Fragment>
                        </ReactModal>
                    )}

                </div>


            </React.Fragment>
        );
    }
}


export default withSnackbar(popup2);
