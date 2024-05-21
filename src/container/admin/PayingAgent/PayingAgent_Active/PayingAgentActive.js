/* eslint-disable require-jsdoc */
import React, { Component } from "react";
// import { connect } from 'react-redux';
import Sidebar from "../../../../components/sidebar";
import MUIDataTable from "mui-datatables";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Loader from "../../../../components/loader";
import CloseIcon from "@material-ui/icons/Close";
import { withSnackbar } from "notistack";
import { FullscreenExit, TrainRounded } from "@material-ui/icons";
import {
  ThemeProvider,
  createTheme,
  MuiThemeProvider,
} from "@material-ui/core/styles";
import "react-input-range/lib/css/index.css";
class PayingAgentActive extends Component {
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
            Redirection: sessionStorage.getItem("component"),  
            activeDeals: false,
            activePools: true,
            showSearchBox: false,
        };
    }

    handleClickDeals = () => {
        this.setState({
            activePools: false,
            activeDeals: true,
           
        });
        window.location.assign("/admin/payingagent_deals");
    };
    handleClickActive = () => {
        this.setState({
            activePools: true,
            activeDeals: false,
            
        });
        window.location.assign("/admin/payingagent_active");
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

    ViewDetails = async (value) => {
        // console.log('value', value);
        // sessionStorage.setItem("dealId", value);
        sessionStorage.setItem('component', '/admin/servicer_deals')
        window.location.assign('/admin/payingagent_dealdetails')
        // var data ={}
        // data.dealid = value

        // const APIResponse = await DealDetailsRedirect(data);

        //   if (APIResponse.status === 200) {
        //      if(APIResponse.data.Dealdetails == "Post Closing"){
        //       window.location.assign('/admin/servicer_pool_details')
        //      }
        //      else{
        //       window.location.assign('/admin/servicer_deals_details')
        //      }
        //     console.log("AllGetAllPoolsdata--", APIResponse);

        //   } else {
        //     const message = "Something went wrong";
        //     this.props.enqueueSnackbar(message, {
        //       variant: "error",
        //       autoHideDuration: 3000,
        //     });
        //   }
    }
    // UpdatePoolUWStatus = async (value, poolid) => {
    //     var data = {};

    //     data.poolid = poolid
    //     data.status = value;
    //     console.log("datata", data);
    //     this.setState({ formLoader: true })
    //     const APIResponse = await UpdatePoolUWStatus(data);

    //     // if (APIResponse.status === 200) {
    //     //   if(value == 'Accepted By Underwriter'){
    //     //     this.CreateDealUW(poolid)
    //     //   }
    //     //   else{
    //     //     this.getpoolsfrombcbyunderwriter()
    //     //   }
    //     //   this.onCloseModal()
    //     //   this.onCloseModal1()
    //     // this.setState({formLoader:false})

    //     // } else {
    //     // this.setState({formLoader:false})

    //     //   const message = "Couldn't change the status";
    //     //   this.props.enqueueSnackbar(message, {
    //     //     variant: "error",
    //     //     autoHideDuration: 3000,
    //     //   });
    //     // }
    // };
    async componentDidMount() {
        // this.getDealsbyServicerId()
        var component = window.location.pathname
        sessionStorage.setItem('component', component)
        // const APIResponse = {
        //   message: "successfull",
        //   isSuccess: true,
        //   data: [
        //     {
        //       dealname: "Credit Capital Corp",
        //       assetclass: "Consumer Loans",
        //       principalbalance: "$8,230,540",
        //       noofloans: "162",
        //       nooftranches: "2",
        //       setupon: "18th Apr’22",
        //       status: "Accepted",
        //     },
        //     {
        //       dealname: "Money Lender Inc",
        //       assetclass: "Business Loans",
        //       principalbalance: "$10,465,730",
        //       noofloans: "150",
        //       nooftranches: "3",
        //       setupon: "15th Apr’22",
        //       status: "Pending",
        //     },
        //     {
        //       dealname: "Money Lender Inc",
        //       assetclass: "Business Loans",
        //       principalbalance: "$2,039,280",
        //       noofloans: "101",
        //       nooftranches: "1",
        //       setupon: "15th Apr’22",
        //       status: "Rejected",
        //     },
        //     {
        //       dealname: "Credit Capital Corp",
        //       assetclass: "Consumer Loans",
        //       principalbalance: "$5,230,540",
        //       noofloans: "124",
        //       nooftranches: "1",
        //       setupon: "11th Apr’22",
        //       status: "Accepted",
        //     },
        //     {
        //       dealname: "Money Lender Inc",
        //       assetclass: "Consumer Loans",
        //       principalbalance: "$12,465,730",
        //       noofloans: "185",
        //       nooftranches: "2",
        //       setupon: "7th Apr’22",
        //       status: "Pending",
        //     },
        //     {
        //       dealname: "Credit Capital Corp",
        //       assetclass: "Business Loans",
        //       principalbalance: "$3,039,280",
        //       noofloans: "203",
        //       nooftranches: "3",
        //       setupon: "4th Apr’22",
        //       status: "Pending",
        //     },
        //     {
        //       dealname: "Credit Capital Corp",
        //       assetclass: "Consumer Loans",
        //       principalbalance: "$6,639,690",
        //       noofloans: "133",
        //       nooftranches: "1",
        //       setupon: "28th Apr’22",
        //       status: "Accepted",
        //     },
        //     {
        //       dealname: "Money Lender Inc",
        //       assetclass: "Business Loans",
        //       principalbalance: "$1,239,430",
        //       noofloans: "248",
        //       nooftranches: "3",
        //       setupon: "28th Apr’22",
        //       status: "Accepted",
        //     },
        //     {
        //       dealname: "Credit Capital Corp",
        //       assetclass: "Consumer Loans",
        //       principalbalance: "$10,210,750",
        //       noofloans: "135",
        //       nooftranches: "2",
        //       setupon: "26th Apr’22",
        //       status: "Rejected",
        //     },
        //     {
        //       dealname: "Money Lender Inc",
        //       assetclass: "Consumer Loans",
        //       principalbalance: "$4,426,170",
        //       noofloans: "145",
        //       nooftranches: "3",
        //       setupon: "15th Apr’22",
        //       status: "Pending",
        //     },
        //   ],
        // };
        // this.setState({ tableData: APIResponse.data });
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
                      marginRight: `${this.state.currentPage >= 1 && this.state.currentPage <= 9 ? "-138" : this.state.currentPage >= 10 ?'-142':"-130"}px`,
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
                this.setState({currentPage:currentPage})
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

        return (
            <React.Fragment>
                <div className="page">
                    <Sidebar activeComponent={"PayingAgentDeal"} />
                    <div className="content1">
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

export default withSnackbar(PayingAgentActive);