// /* eslint-disable require-jsdoc */
// import React, { Component } from 'react';
// import Button from '@material-ui/core/Button';
// import axios from 'axios';
// import MUIDataTable from 'mui-datatables';
// import GetAppIcon from '@material-ui/icons/GetApp';
// import VisibilityIcon from '@material-ui/icons/Visibility';
// import { NavLink } from 'react-router-dom';
// import DescriptionIcon from '@material-ui/icons/Description';
// import noMatch from '../../../images/noMatch.png';
// import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
// import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
// import FileCopyIcon from '@material-ui/icons/FileCopy';
// import CloseIcon from '@material-ui/icons/Close';
// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
// import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
// import ListAltIcon from '@material-ui/icons/ListAlt';
// import UserHeader from '../../../components/header/UserHeader';
// import { customStyles, customStylesauto } from '../../../components/customscripts/customscript';
// import ReactModal from 'react-modal';
// import { withSnackbar } from 'notistack';
// import moment from 'moment';
// import ItemDetails from './Details';
// import { UserList } from '../../../components/StaticData';
// import TextField from '@material-ui/core/TextField';

// // import { getAllUser } from '../../../servies/services';
// import LinearLoader from '../../../components/loader/LinearLoader';
// import Loader from '../../../components/loader';

// import HighlightOffIcon from '@material-ui/icons/HighlightOff';
// import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
// import Tooltip from '@material-ui/core/Tooltip';

// class Users extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       token: sessionStorage.getItem('token'),
//       peers: JSON.parse(sessionStorage.getItem('peers')),
//       userid: sessionStorage.getItem("userid"),
//       loading: true,
//       getLoansLoader: false,
//       open: false,
//       message: '',
//       table_data: [],
//       ApproveStatus: '',
//       OrgName: '',
//       status: ''
//     };
//   }

//   // async componentDidMount() {
//   //   this.setState({ loading: true });
//   //   const data = { 'token': this.state.token };
//   // }

//   async selectedpoolid(selected) {
//     const arr = []
//     for (var i = 0; i < selected.length; i++) {
//       var j = selected[i];
//       let PoolID = this.state.table_data[j].UserID;
//       arr.push(PoolID);
//     }
//     console.log("selected Loans", arr);
//     sessionStorage.setItem("user_list", JSON.stringify(arr));
//   }


//   approveUserAction = async (UserID, UserName, ApproveStatus, ChannelName) => {
//     const data =
//     {
//       "UserName": UserName,
//       "OrgName": this.state.OrgName,
//       "token": this.state.token,
//       "peers": this.state.peers,
//       "UserID": UserID,
//       "ApproveStatus": ApproveStatus,
//       "channelname": ChannelName,
      
//     }


//     const APIResponse = await approveUser(data)
//     console.log("approveUser", APIResponse)

//     if (APIResponse.data.success == "true") {
//       const message = "Submitted Successfully";
//       this.props.enqueueSnackbar(message, {
//         variant: 'info',
//         autoHideDuration: 2000,
//       });

//     } else {
//       const message = "Not saved";
//       this.props.enqueueSnackbar(message, {
//         variant: 'error',
//         autoHideDuration: 2000,
//       });
//     }

//     // this.setState({ OrgName: orgname, status: status })

//     const orgname = this.state.OrgName
//     const status = this.state.status
//     this.filterMethod(orgname, status)

//   }

//   onOpenModal1(value) {
//     console.log("MODAL " + value);
//     this.setState({ open1: true, value: value });
//   };

//   onCloseModal1 = () => {
//     this.setState({ open1: false, loadingmodal: false });
//   };


//   async componentDidMount() {


//     console.log("this.props.match.params.orgname", this.props.match.params.orgname)
//     console.log("this.props.match.params.status", this.props.match.params.status)
//     const orgname = this.props.match.params.orgname;
//     const status = this.props.match.params.status;
//     this.setState({ OrgName: orgname, status: status })
//     this.filterMethod(orgname, status)

//   }

//   componentWillReceiveProps(nextProps) {

//     console.log("componentWillReceiveProps.orgname", nextProps.match.params.orgname)
//     console.log("componentWillReceiveProps.status", nextProps.match.params.status)
//     const orgname = nextProps.match.params.orgname;
//     const status = nextProps.match.params.status;
//     this.setState({ OrgName: orgname, status: status })
//     this.setState({
//       loading: false,
//       table_data: [],
//     })
//     this.filterMethod(orgname, status)
//   }

//   async filterMethod(orgname, status) {

//     this.setState({ orgname: orgname, ApproveStatus: status });

//     if (orgname !== undefined) {



//       if (status !== "Approved") {

//         const APIResponse = await getAllUsers(orgname)
//         console.log("getAllUsers", getAllUsers)
//         const orgname_details = APIResponse.data.filter(item => item.OrgName == orgname)
//         console.log("orgname_details", orgname_details)
//         const users = APIResponse.data.filter(item => item.ApproveStatus !== "Approved")
//         console.log("users", users)
//         this.setState({ loading: false, table_data: users })
//       } else {

//         const APIResponse = await getAllUsers(orgname)
//         console.log("getAllUsers", getAllUsers)
//         const orgname_details = APIResponse.data.filter(item => item.OrgName == orgname)
//         console.log("orgname_details", orgname_details)
//         const users = APIResponse.data.filter(item => item.ApproveStatus == status)
//         console.log("users", users)
//         this.setState({ loading: false, table_data: users })


//       }


//     } else {
//       // this.setState({ formAction: "add", pageTitle: "Create a Invoice" })
//       const APIResponse = await getAllUsers(orgname)
//       console.log("getAllUsers", getAllUsers)

//       const orgname_details = APIResponse.data.filter(item => item.OrgName == orgname)
//       console.log("orgname_details", orgname_details)
//       const users = orgname_details.filter(item => item.ApproveStatus == status)
//       console.log("users", users)
//       this.setState({ loading: false, table_data: users })




//     }
//   }


//   onCloseModal1 = () => {
//     this.setState({ open1: false, loadingmodal: false });
//   };




//   render() {

//     const options = {
//       responsive: 'stacked',
//       fixedHeader: true,
//       fixedSelectColumn: true,
//       tableBodyHeight: '580px',
//       filterType: 'dropdown',
//       search: true,
//       print: true,
//       viewColumns: true,
//       download: true,
//       rowHover: false,
//       selectableRowsOnClick: false,
//       selectableRows: false,
//       // onRowClick: this.onRowClick,
//       onRowsSelect: this.onRowsSelect,
//       rowsSelected: this.state.rowsSelected,
//       onRowsSelect: (rowsSelected, allRows) => {
//         console.log("allRows", allRows);
//         console.log("rowsSelected", rowsSelected);
//         this.setState({ rowsSelected: allRows.map(row => row.dataIndex) });
//         const selected = allRows.map(row => row.dataIndex);
//         console.log("selected" + selected);
//         this.selectedpoolid(selected);
//       },

     
//       searchText: this.state.searchText,
//       searchPlaceholder: 'Search Users',
//       customSearch: (searchQuery, currentRow, columns) => {
//         let isFound = false;
//         currentRow.forEach(col => {
//           if (col.toString().indexOf(searchQuery) >= 0) {
//             isFound = true;
//           }
//         });
//         return isFound;
//       },


//       loading: false,
//       textLabels: {
//         body: {
//           noMatch: this.state.loading === false ?
//             'Sorry, there is no matching data to display' :
//             <Loader msg={"Please wait, loading data"} />,
//           toolTip: 'Sort',
//           columnHeaderTooltip: (column) => `Sort for ${column.label}`,
//         },
//         filter: {
//           all: 'All',
//           title: 'FILTERS',
//           reset: 'RESET',
//         },

//         selectedRows: {
//           text: 'row(s) selected',
//           delete: 'Delete',
//           deleteAria: 'Delete Selected Rows',
//         },
//       },
//     };

//     const columns = [
//       {
//         name: 'UserID',
//         label: 'User Id',
//         options: {
//           filter: false,
//           sort: true,
//           customBodyRender: (value, tableMeta) => (
//             <div>
//               <React.Fragment>
//                 <Tooltip title={value+"123"} aria-label="add">
//                   <React.Fragment>
//                     {value.slice(0, 7) + "..."}
//                   </React.Fragment>
//                 </Tooltip>
//               </React.Fragment>
//             </div>
//           ),
//         },
//       },
//       {
//         name: 'UserName',
//         label: 'User Name',
//         options: {
//           filter: true,
//           sort: true,
//         },
//       },
//       {
//         name: 'FirstName',
//         label: 'First Name',
//         options: {
//           filter: true,
//           sort: true,
//         },
//       },
//       {
//         name: 'LastName',
//         label: 'Last Name',
//         options: {
//           filter: true,
//           sort: true,
//         },
//       },
//       {
//         name: 'EmailID',
//         label: 'Email Id',
//         options: {
//           filter: true,
//           sort: true,
//         },
//       },

//       {
//         name: 'OrgName',
//         label: 'Org Name',
//         options: {
//           filter: false,
//           sort: false
//         },
//       },

//       {
//         name: 'ChannelName',
//         label: 'Channel Name',
//         options: {
//           filter: false,
//           sort: false
//         },
//       },

      
//       {
//         name: 'MobileNumber',
//         label: 'Mobile Number',
//         options: {
//           filter: false,
//           sort: false
//         },
//       },
//       {
//         name: 'ApproveStatus',
//         label: 'Status',
//         options: {
//           filter: false,
//           sort: false,
//           customBodyRender: (value, tableMeta) => (
//             <div style={{ position: 'relative' }}>
//               <React.Fragment>
//                 {value}
//               </React.Fragment> </div>
//           ),
//         }
//       },
//       {
//         name: 'ApproveStatus',
//         label: 'Action',
//         options: {
//           filter: false,
//           sort: false,
//           customBodyRender: (value, tableMeta) => (
//             <div className="action_cell" style={{ position: 'relative' }}>

//               <React.Fragment>
//                 {value == "Approved" ?
//                   <Tooltip title={"Reject User"} aria-label="Reject User">
//                     <Button variant="outlined" color="primary" disabled={tableMeta.rowData[1] == "admin" ? true : false} onClick={() => { this.approveUserAction(tableMeta.rowData[0], tableMeta.rowData[1], "Rejected",  tableMeta.rowData[6],); }}>
//                       <HighlightOffIcon></HighlightOffIcon>
//                     </Button>
//                   </Tooltip>
//                   : ''}

//                 {value == "Pending" ?
//                   <React.Fragment>
//                     <Tooltip title={"Approve User"} aria-label="Approve User">
//                       <Button variant="outlined" color="primary" onClick={() => { this.approveUserAction(tableMeta.rowData[0], tableMeta.rowData[1], "Approved",  tableMeta.rowData[6],); }}>
//                         <CheckCircleOutlineIcon></CheckCircleOutlineIcon>
//                       </Button>
//                     </Tooltip>

//                     <Tooltip title={"Reject User"} aria-label="Reject User">
//                       <Button variant="outlined" color="primary" disabled={tableMeta.rowData[1] == "admin" ? true : false} onClick={() => { this.approveUserAction(tableMeta.rowData[0], tableMeta.rowData[1], "Rejected",  tableMeta.rowData[6],); }}>
//                         <HighlightOffIcon></HighlightOffIcon>
//                       </Button>
//                     </Tooltip>
//                   </React.Fragment>
//                   : ''}


//                 {value == "Rejected" ?
//                   <Tooltip title={"Approve User"} aria-label="Approve User">
//                     <Button variant="outlined" color="primary" onClick={() => { this.approveUserAction(tableMeta.rowData[0], tableMeta.rowData[1], "Approved",  tableMeta.rowData[6]); }}>
//                       <CheckCircleOutlineIcon></CheckCircleOutlineIcon>
//                     </Button>
//                   </Tooltip>
//                   : ''}

//               </React.Fragment>

//             </div>
//           ),
//         }
//       }
//     ];

//     return (
//       <React.Fragment>
//         <div className="page">
//           <div className="content1">
//             {/* {JSON.stringify(this.state.OrgName)} */}
//             <div className="header"><UserHeader status={this.state.ApproveStatus} OrgName={this.state.orgname} pageTitle={this.state.status + ' Users'}></UserHeader></div>

//             {/* <div className="tableSearch">
//               <div className="row justify-content-left">
//                 <div className="col-md-4 col-sm-12">
//                   <div className="" id="searchBox"><TextField id="outlined-basic" label="Search for Users Name" variant="outlined" size="small" /></div>
//                 </div>
//                 <div className="col-md-6 col-sm-12">
//                 </div>
//               </div>
//             </div> */}

//             <div className="page-content">
//               {/* {JSON.stringify(this.state)} */}
//               <MUIDataTable
//                 title={this.state.status + ' Users'}
//                 data={this.state.table_data}
//                 columns={columns}
//                 options={options}
//               />
//             </div>
//           </div>
//         </div>

//         <ReactModal
//           isOpen={this.state.open1}
//           contentLabel="Minimal Modal Example"
//           style={customStyles}
//           onRequestClose={this.onCloseModal1}
//         >
//           <React.Fragment>
//             <div className="modalPopup2">
//               <h2>User Details</h2>
//               <Button className="closePopup" style={{ minWidth: '30px' }} variant="text" color="primary" onClick={this.onCloseModal1}> <CloseIcon></CloseIcon> </Button>
//               <div>
//                 <ItemDetails dataFromParent={this.state.value} />
//               </div>
//             </div>
//           </React.Fragment>
//         </ReactModal>

//       </React.Fragment>
//     );
//   }
// }

// export default withSnackbar(Users);