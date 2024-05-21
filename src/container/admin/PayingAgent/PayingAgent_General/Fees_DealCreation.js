/* eslint-disable require-jsdoc */
import React, { Component } from "react";
import "./PayingAgent.css"
import {
  dealCreationAddSave,
  dealCreationTable,
  dealCreationCreateUpdate,
  dealCreationDelete,
  dealCreationSaveForNow,
  dealCreation_BC_Status,
  dealCreationAutoSave,
  dealCreationEdit,
  savedealservicerdate
} from "../../../../servies/services";
import { connect } from "react-redux";
import Sidebar from "../../../../components/sidebar";
import MUIDataTable from "mui-datatables";
import Button from "@material-ui/core/Button";
// import Loader from "../../../../../components/loader";
import CloseIcon from "@material-ui/icons/Close";
import { withSnackbar } from "notistack";
import CircularProgress from "@material-ui/core/CircularProgress";
// import LinearLoader from "../../../../../components/loader/LinearLoader";
import ReactModal from "react-modal";
// import {
//   customStylesServicer,
//   customStylesauto,
// } from "../../../../../components/customscripts/customscript";
import { TrainRounded } from "@material-ui/icons";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import NumberComp2 from "../../../../components/NumberComp2";
import Switch from "@material-ui/core/Switch";
// import { customStylesautosmallmodal1 } from "../../../../../components/customscripts/customscript";
// import FormLoader from "../../../../../components/loader/formLoader";

class Fees_DealCreation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      selectedRow: null,
      token: sessionStorage.getItem("token"),
      loading: false,
      getLoansLoader: false,
      openPopup: false,
      searchText: "",
      rowsSelected: null,
      open1: false,
      open2: false,
      open3: false,
      open4: false,
      screenloader: false,
      TableName: "Fees",
      peer: sessionStorage.getItem('peer_insurer'),
      peers: JSON.parse(sessionStorage.getItem("peers")),
      dealid: sessionStorage.getItem('dealID'),
      DealName : sessionStorage.getItem("dealName"),
    //   DealName: !sessionStorage.getItem("dealname")
    //     ? JSON.parse(sessionStorage.getItem("getDashboardDeals")).map(
    //         (item) => item[0]
    //       )[0]
    //     : sessionStorage.getItem("dealname"),
      isRecurring: sessionStorage.getItem("isAddDeal"), 
      isSecuritisation: sessionStorage.getItem("isSecuritisation"),
      formData: {
        Name: "",
        Type: "",
        Basis: "",
        Rate: "",
        Amount: "",
      },
      formData1: {
        Name: "",
        Type: "",
        Basis: "",
        Rate: "",
        Amount: "",
      },
      activeInsights1: false,
      activeInsights2: false,
      activeInsights3: true,
      activeInsights4: false,
      activeInsights5: false,
      activeInsights6: false,
      activeInsights7: false,
      activeInsights8: false,
      activeInsightsBB: false,
            activeInsightsMI:false,

      ViewStatus: false,
      deleteRowVal: {
        Name: "",
      },
    };
  }
  blockInvalidChar = (e) => {
    ["e", "E", "+","-"].includes(e.key) && e.preventDefault();
  };

  handleClickGeneral = () => {
    this.setState({
      activeInsights1: true,
      activeInsights2: false,
      activeInsights3: false,
      activeInsights4: false,
      activeInsights5: false,
      activeInsights6: false,
      activeInsights7: false,
      activeInsights8: false,
      activeInsightsBB: false,
            activeInsightsMI:false,

    });
    this.dealCreationAutoSave();
    // window.location.assign("/admin/general");
  };

  handleClickTranches = () => {
    this.setState({
      activeInsights1: false,
      activeInsights2: true,
      activeInsights3: false,
      activeInsights4: false,
      activeInsights5: false,
      activeInsights6: false,
      activeInsights7: false,
      activeInsights8: false,
      activeInsightsBB: false,
            activeInsightsMI:false,

    });
    this.dealCreationAutoSave();
    // window.location.assign("/admin/tranches");
  };
  handleClickFees = () => {
    this.setState({
      activeInsights1: false,
      activeInsights2: false,
      activeInsights3: true,
      activeInsights4: false,
      activeInsights5: false,
      activeInsights6: false,
      activeInsights7: false,
      activeInsights8: false,
      activeInsightsBB: false,
            activeInsightsMI:false,

    });
    this.dealCreationAutoSave();
  };
  handleClickExpenses = () => {
    this.setState({
      activeInsights1: false,
      activeInsights2: false,
      activeInsights3: false,
      activeInsights4: true,
      activeInsights5: false,
      activeInsights6: false,
      activeInsights7: false,
      activeInsights8: false,
      activeInsightsBB: false,
            activeInsightsMI:false,

    });
    this.dealCreationAutoSave();
    // window.location.assign("/admin/expenses");
  };
  handleClickAccounts = () => {
    this.setState({
      activeInsights1: false,
      activeInsights2: false,
      activeInsights3: false,
      activeInsights4: false,
      activeInsights5: true,
      activeInsights6: false,
      activeInsights7: false,
      activeInsights8: false,
      activeInsightsBB: false,
            activeInsightsMI:false,

    });
    this.dealCreationAutoSave();
    // window.location.assign("/admin/account");
  };

  handleClickTests = () => {
    this.setState({
      activeInsights1: false,
      activeInsights2: false,
      activeInsights3: false,
      activeInsights4: false,
      activeInsights5: false,
      activeInsights6: true,
      activeInsights7: false,
      activeInsights8: false,
      activeInsightsBB: false,
            activeInsightsMI:false,

    });
    this.dealCreationAutoSave();
    // window.location.assign("/admin/tests");
  };
  handleClickBorrowingBase = () => {
    this.setState({
      activeInsights1: false,
      activeInsights2: false,
      activeInsights3: false,
      activeInsights4: false,
      activeInsights5: false,
      activeInsights6: false,
      activeInsights7: false,
      activeInsights8: false,
      activeInsightsBB: true,
            activeInsightsMI:false,

    });
    this.dealCreationAutoSave();
    // window.location.assign("/admin/tests");
  };
  handleClickVariables = () => {
    this.setState({
      activeInsights1: false,
      activeInsights2: false,
      activeInsights3: false,
      activeInsights4: false,
      activeInsights5: false,
      activeInsights6: false,
      activeInsights7: true,
      activeInsights8: false,
      activeInsightsBB: false,
            activeInsightsMI:false,

    });
    this.dealCreationAutoSave();
    // window.location.assign("/admin/variables");
  };
  handleClickPaymentRules = () => {
    this.setState({
      activeInsights1: false,
      activeInsights2: false,
      activeInsights3: false,
      activeInsights4: false,
      activeInsights5: false,
      activeInsights6: false,
      activeInsights7: false,
      activeInsights8: true,
      activeInsightsBB: false,
            activeInsightsMI:false,

    });
    this.dealCreationAutoSave();
    // window.location.assign("/admin/paymentrules");
  };
    handleClickManualInputs = () => {
    this.setState({
      activeInsights1: false,
      activeInsights2: false,
      activeInsights3: false,
      activeInsights4: false,
      activeInsights5: false,
      activeInsights6: false,
      activeInsights7: false,
      activeInsights8: false,
      activeInsightsBB: false,
            activeInsightsMI:true,

    });
    this.dealCreationAutoSave();
    // window.location.assign("/admin/paymentrules");
  };


  onOpenModal = () => {
    console.log("add Fees modal");
    this.setState({
      open1: true,
      formData: {
        Name: "",
        Type: "",
        Basis: "",
        Rate: "",
        Amount: "",
      },
    });
  };

  onOpenModal1 = (value, editValue) => {
    console.log("value: ", value, editValue);
    console.log("view Fees modal");
    this.setState({
      ViewStatus: true,
      open2: true,
      formData1: {
        Name: value,
        Type: editValue[0] === undefined ? "" : editValue[0],
        Basis: editValue[1] === undefined ? "" : editValue[1],
        Rate: editValue[2] === undefined ? "" : editValue[2],
        Amount: editValue[3] === undefined ? "" : editValue[3]
      },
      EditPreviousName: value,
    });
  };

  onOpenModal2 = (value, editValue) => {
    console.log("value: ", value, editValue);
    console.log(this.state.formData1);
    console.log("edit fees modal");
    // console.log('rateChange',editValue);
    if (this.state.ViewStatus === false) {
      const rateChange = editValue[2] !== "" ? editValue[2].replace(/%?/g, "") : editValue[2] === undefined ? "" : editValue[2];
      this.setState(
        {
          EditPreviousName: value,
          open3: true,
          open2: false,
          formData1: {
            Name: value,
            Type: editValue[0] === undefined ? "" : editValue[0],
            Basis: editValue[1] === undefined ? "" : editValue[1],
            Rate: rateChange,
            Amount: editValue[3] === undefined ? "" : editValue[3]
            // .toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          },
        },
        () => console.log(this.state.ViewStatus, this.state.formData1.Amount)
      );
    } else {
      this.setState({ open3: true, open2: false,
        ViewStatus:false,
        formData1: {
          ...this.state.formData1,
          Rate: this.state.formData1.Rate.replace(/%?/g, ""),
          Amount: this.state.formData1.Amount
          // .toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        },
      }, () =>
        console.log(this.state.ViewStatus)
      );
    }
  };
  shiftUp = (value, tableRowData) => {
    const { tableData } = this.state;
    console.log(this.state);
    const index1 = tableRowData.rowIndex;
    const temp = tableData[index1];
    const index2 = index1 - 1;
    tableData[index1] = tableData[index2];
    tableData[index2] = temp;
    this.setState([...tableData]);
  };
  shiftDown = (value, tableRowData) => {
    const { tableData } = this.state;
    const index1 = tableRowData.rowIndex;
    const temp = tableData[index1];
    const index2 = index1 + 1;
    tableData[index1] = tableData[index2];
    tableData[index2] = temp;
    this.setState([...tableData]);
  };
  onCloseModal = () => {
    this.setState({ open1: false, open4: false });
  };

  onCloseModal1 = () => {
    this.setState({ open2: false });
  };

  onCloseModal2 = () => {
    this.setState({ open3: false });
  };
  onCloseModal3 = () => {
    this.setState({ open4: false });
  };

  AddSubmit = (e) => {
    e.preventDefault();
    const renameRate = this.state.formData.Rate !== "" ? `${this.state.formData.Rate}%` : this.state.formData.Rate;
    delete this.state.formData.Rate;
    this.state.formData.Rate = renameRate; 

    // const renameAmount = parseFloat(this.state.formData.Amount.replace(/,/g, ''));
    // delete this.state.formData.Amount;
    // this.state.formData.Amount = renameAmount;

    console.log(this.state.formData);
    this.dealCreationAddSave();
    console.log("hello we have clicked the button");
  };
  EditSubmit = (e) => {
    e.preventDefault();
    const renameRate = this.state.formData1.Rate !== "" ? `${this.state.formData1.Rate}%` : this.state.formData1.Rate;
    delete this.state.formData1.Rate;
    this.state.formData1.Rate = renameRate; 


    // const renameAmount = this.state.formData1.Amount.toString().includes(",") ? parseFloat(this.state.formData1.Amount.replace(/,/g, '')) : this.state.formData1.Amount;
    // delete this.state.formData1.Amount;
    // this.state.formData1.Amount = renameAmount;
    
    console.log(this.state.formData1);
    this.dealCreationEdit();
    console.log("hello we have clicked the Edit button");
  };

  showNext = (e) => {
    e.preventDefault();
    this.setState({
      activeInsights1: false,
      activeInsights2: false,
      activeInsights3: false,
      activeInsights4: true,
      activeInsights5: false,
      activeInsights6: false,
      activeInsights7: false,
      activeInsights8: false,
      activeInsightsBB: false,
    })
    this.dealCreationAutoSave();
    // window.location.assign("/admin/expenses");
  };
  showPrev = (e) => {
    e.preventDefault();
    this.setState({
      activeInsights1: false,
      activeInsights2: true,
      activeInsights3: false,
      activeInsights4: false,
      activeInsights5: false,
      activeInsights6: false,
      activeInsights7: false,
      activeInsights8: false,
      activeInsightsBB: false,
    })
    this.dealCreationAutoSave();
    // window.location.assign("/admin/tranches");
  };
  onOpenModal3 = (value, deleteValue) => {
    console.log("value: ", value, deleteValue);
    console.log("delete fees modal");
    this.setState({
      open4: true,
      deleteRowVal: {
        Name: value,
        Type: deleteValue[0],
        Basis: deleteValue[1],
        Rate: deleteValue[2],
        Amount: deleteValue[3],
      },
    });
  };

  dealCreationDelete = async () => {
    this.setState({ formLoader: true });
    let data = {};
    // data.peers = this.state.peer;
    data.DealName = this.state.DealName;
    data.TableName = this.state.TableName;
    const NameAdd1 = this.state.deleteRowVal.Name;
    const Obj = {
      [`${NameAdd1}`]: {
        ...this.state.deleteRowVal,
      },
    };
    data.Deleterow = Obj;
    console.log("dataDelete", data);
    const APIResponse = await dealCreationDelete(data, this.state.token);

    if (APIResponse.status === 200) {
      const message = APIResponse.data.message;
      this.props.enqueueSnackbar(message, {
        variant: "info",
        autoHideDuration: 3000,
      });
      this.setState({ formLoader: false });
      this.onCloseModal3();
      this.savedealservicerdate()
      this.dealCreationTable();
    } else {
      this.setState({ formLoader: false });
      const message = "Something went wrong";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };
  dealCreationAddSave = async () => {
    this.setState({ formLoader: true });
      let data = {};
      data.DealName = this.state.DealName;
      data.TableName = this.state.TableName;
      const NameAdd = this.state.formData.Name;
      const ObjAdd = {
        [`${NameAdd}`]: {
          ...this.state.formData,
        },
      };
      data.TableData = ObjAdd;
      // data.peers = this.state.peer;
      console.log("dataAddddd", data);
  
    const APIResponse = await dealCreationAddSave(data, this.state.token);
    console.log('ress',APIResponse);

    if (APIResponse.status === 200) {
      if(APIResponse.data.isSuccess === true){
        const message = APIResponse.data.message;
        this.props.enqueueSnackbar(message, {
          variant: "info",
          autoHideDuration: 3000,
        });
    this.setState({formLoader: false})
    this.savedealservicerdate()
        this.dealCreationTable();
    this.onCloseModal()
      }else{
        const message = APIResponse.data.message;
        this.props.enqueueSnackbar(message, {
          variant: "error",
          autoHideDuration: 3000,
        });
    this.setState({formLoader: false})
    this.onCloseModal()
      }

    } else {
      const message = "Something went Wrong";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    this.setState({formLoader: false})
    this.onCloseModal()
    }
  };

  dealCreationEdit = async () => {
    this.setState({ formLoader: true });
      let data = {};
      data.DealName = this.state.DealName;
      data.TableName = this.state.TableName;
      data.EditKey = this.state.EditPreviousName;
      const NameAdd = this.state.formData1.Name;
      const ObjAdd = {
        [`${NameAdd}`]: {
          ...this.state.formData1,
        },
      };
      data.TableData = ObjAdd;
      // data.peers = this.state.peer;
      console.log("dataAddddd", data);

    const APIResponse = await dealCreationEdit(data, this.state.token);
    console.log('ress',APIResponse);

    if (APIResponse.status === 200) {
      if(APIResponse.data.isSuccess === true){
        const message = APIResponse.data.message;
        this.props.enqueueSnackbar(message, {
          variant: "info",
          autoHideDuration: 3000,
        });
    this.setState({formLoader: false})
    this.savedealservicerdate()
        this.dealCreationTable();
    this.onCloseModal2()
      }else{
        const message = APIResponse.data.message;
        this.props.enqueueSnackbar(message, {
          variant: "error",
          autoHideDuration: 3000,
        });
    this.setState({formLoader: false})
    this.onCloseModal2()
      }

    } else {
      const message = "Something went Wrong";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    this.setState({formLoader: false})
    this.onCloseModal2()
    }
  };

  dealCreationAutoSave = async () => {
    var data = {};
    data.DealName = this.state.DealName;
    // data.peers = this.state.peer;
    data.TableName = this.state.TableName;
    let Obj = {};
    this.state.tableData.forEach((item) => {
      Obj = {
        ...Obj,
        [`${item.Name}`]: item,
      };
    });
    data.TableData = Obj;
    console.log(data);
    const APIResponse = await dealCreationAutoSave(data, this.state.token);
    this.savedealservicerdate()
    console.log('ress',APIResponse);
  };

  dealCreationCreateUpdate = async () => {
    this.setState({formLoader2: true})
    var data = {};
    data.DealName = this.state.DealName;
    data.TableName = this.state.TableName;
    // data.peers = this.state.peer;
    let Obj = {};
    this.state.tableData.forEach((item) => {
      Obj = {
        ...Obj,
        [`${item.Name}`]: item,
      };
    });
    data.TableData = Obj;
    console.log(data);
    const APIResponse = await dealCreationCreateUpdate(data, this.state.token);
    console.log('ress',APIResponse);
    if (APIResponse.status === 200) {
      if(APIResponse.data.isSuccess === true){
        const message = APIResponse.data.message;
        this.props.enqueueSnackbar(message, {
          variant: "info",
          autoHideDuration: 3000,
        });
    this.setState({formLoader2: false})
    this.dealCreation_BC_Status()
    this.savedealservicerdate()
       this.dealCreationTable()
      }else{
        const message = APIResponse.data.message;
        this.props.enqueueSnackbar(message, {
          variant: "error",
          autoHideDuration: 3000,
        });
    this.setState({formLoader2: false})
      }
    } else {
      const message = "Something went Wrong";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    this.setState({formLoader2: false})
    }
  };

  dealCreationSaveForNow = async () => {
    this.setState({formLoader1: true})
    var data = {};
    data.DealName = this.state.DealName;
    data.TableName = this.state.TableName;
    // data.peers = this.state.peer;
    let Obj = {};
    this.state.tableData.forEach((item) => {
      Obj = {
        [`${item.Name}`]: item,
        ...Obj,
      };
    });
    data.TableData = Obj;
    console.log(data);
    const APIResponse = await dealCreationSaveForNow(data, this.state.token);
    console.log('ress',APIResponse);
    if (APIResponse.status === 200) {
      if(APIResponse.data.isSuccess === true){
        const message = APIResponse.data.message;
        this.props.enqueueSnackbar(message, {
          variant: "info",
          autoHideDuration: 3000,
        });
    this.setState({formLoader1: false})
    this.savedealservicerdate()
      }else{
        const message = APIResponse.data.message;
        this.props.enqueueSnackbar(message, {
          variant: "error",
          autoHideDuration: 3000,
        });
    this.setState({formLoader1: false})
      }
    } else {
      const message = "Something went Wrong";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    this.setState({formLoader1: false})
    }
  };

  dealCreationTable = async () => {
    this.setState({ getLoansLoader: true, tableData: [], loading: true,screenloader:true });
    var data = {};
    data.DealName = this.state.DealName;
    data.TableName = this.state.TableName;
    data.dealid = this.state.dealid;

    console.log("datata", data);
    this.setState({ screenloader: true });
    const APIResponse = await dealCreationTable(data,this.state.token);

    if (APIResponse.status === 200) {
      this.setState({
        getLoansLoader: false,
        tableData: APIResponse.data,
        loading: false,
      });
      this.dealCreation_BC_Status();
    } else {
      this.setState({ getLoansLoader: false, loading: false });
      const message = "Something went wrong";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  dealCreation_BC_Status = async () => {
    var data = {};
    data.DealName = this.state.DealName;
    // data.peer = this.state.peer;
    console.log(data);
    const APIResponse = await dealCreation_BC_Status(data,this.state.token);
    console.log('ress',APIResponse);
    this.setState({createStatus: APIResponse.data.status,screenloader:false})
  };
  savedealservicerdate = async () => {
    let data = {};
    data.DealName = this.state.DealName;
    console.log(data);
    const APIResponse = await savedealservicerdate(data, this.state.token);
    console.log("ress", APIResponse);
    if(this.state.activeInsights1 === true){
    //   this.props.history.push({
    //     pathname: "/admin/general",
    //     state:{checkDeal:false}
    //   });
    window.location.assign("/admin/general");
    }else if(this.state.activeInsights2 === true){
    //   this.props.history.push({
    //     pathname: "/admin/tranches",
    //     state:{checkDeal:false}
    //   });
    window.location.assign("/admin/tranches");
    }else if(this.state.activeInsights3 === true){
    //   this.props.history.push({
    //     pathname: "/admin/fees",
    //     state:{checkDeal:false}
    //   });
    window.location.assign("/admin/fees");
    }else if(this.state.activeInsights4 === true){
    //   this.props.history.push({
    //     pathname: "/admin/expenses",
    //     state:{checkDeal:false}
    //   });
    window.location.assign("/admin/expenses");

    }else if(this.state.activeInsights5 === true){
    //   this.props.history.push({
    //     pathname: "/admin/account",
    //     state:{checkDeal:false}
    //   });
    window.location.assign("/admin/account");
    }else if(this.state.activeInsights6 === true){
    //   this.props.history.push({
    //     pathname: "/admin/tests",
    //     state:{checkDeal:false}
    //   });
    window.location.assign("/admin/tests");
    }else if(this.state.activeInsightsBB === true){
    //   this.props.history.push({
    //     pathname: "/admin/borrowingBase",
    //     state:{checkDeal:false}
    //   });
    window.location.assign("/admin/borrowingBase");
    }else if(this.state.activeInsights7 === true){
    //   this.props.history.push({
    //     pathname: "/admin/variables",
    //   });
    window.location.assign("/admin/variables");
    }else if(this.state.activeInsights8 === true){
    //   this.props.history.push({
    //     pathname: "/admin/paymentrules",
    //     state:{checkDeal:false}
    //   });
    window.location.assign("/admin/paymentrules");
    }else if(this.state.activeInsightsMI === true){
    //   this.props.history.push({
    //     pathname: "/admin/manualinput",
    //     state:{checkDeal:false}
    //   });
    window.location.assign("/admin/manualinput");
    }
};

  async componentDidMount() {
    var component = window.location.pathname;
    sessionStorage.setItem("component", component);
    this.dealCreationTable();
  }
  goBackToDashBoard = () =>{
    this.state.isRecurring
      ? this.props.history.push({
          isRecurring: sessionStorage.removeItem("isAddDeal"),
          pathname: "/dashboard",
        })
      : this.props.history.push({
      pathname: '/admin/fees_recurring',
    });
  };
  getMuiTheme = () =>
    createMuiTheme({
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
    const customStylesauto = {
        content: {
          // top: '50%',
          left: '50%',
          // right: 'auto',
          bottom: 'auto',
          // marginRight: '-50%',
          transform: 'translate(-50%, 0%)',
          width: '470px',
          zIndex: '10000',
      
      
        }
      };
      
    const customStylesServicer = {
        content: {
          // top: '50%',
          left: '50%',
          // right: 'auto',
          bottom: 'auto',
          // marginRight: '-50%',
          transform: 'translate(-50%, 0%)',
          width: '480px',
          zIndex: '10000',
          overflowWrap: "break-word"
        }
      };
    const customStylesautosmallmodal1 = {
        content: {
          top: '30%',
          left: '50%',
          // right: 'auto',
          bottom: 'auto',
          // marginRight: '-50%',
          transform: 'translate(-50%, 0%)',
          width: '515px',
          zIndex: '10000',
        }
      };
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
      onRowSelectionChange: this.onRowSelectionChange,
      onChangePage: this.onChangePage,
      rowsSelected: this.state.rowsSelected,
      rowsPerPage: [10],
      rowsPerPageOptions: false,
      jumpToPage: false,
      pagination: false,

      onRowSelectionChange: (rowsSelected, allRows) => {
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
            //   <Loader msg={"Please wait, Loading Loan Data"} />
            ''
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
        name: "Name",
        label: "Name",
        options: {
          filter: true,
          sort: true,
        },
      },

      {
        name: "Type",
        label: "Type",
        options: {
          filter: true,
          sort: true,
        },
      },

      {
        name: "Basis",
        label: "Basis",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "Rate",
        label: "Rate",
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
        name: "Amount",
        label: "Amount",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <React.Fragment>
                {
                  isNaN(value) ? value :(<NumberComp2 value={value}></NumberComp2>)
                }
              </React.Fragment>
            );
          },
        },
      },
      {
        name: "Name",
        label: "Actions",
        options: {
          filter: true,
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
                <div className="">
                  <span>
                    {/* <Button variant="outlined" id="optionalbutton" type="submit" onClick={this.onOpenModal1.bind(this)}> */}
                    <button
                      className="popupbutton1"
                      onClick={() =>
                        this.onOpenModal1(value, tableMeta.rowData.splice(1, 4))
                      }
                    >
                      View
                    </button>
                    <button
                      className="popupbutton1"
                      onClick={() =>
                        this.onOpenModal2(value, tableMeta.rowData.splice(1, 4))
                      }
                    >
                      /Edit
                    </button>
                    <button
                      className="popupbuttons1"
                      onClick={() =>
                        this.onOpenModal3(
                          value,
                          tableMeta.rowData.splice(1, 4)
                        )
                      }
                    >
                      Delete
                    </button>
                  </span>
                  {/* </Button> */}
                </div>
              </React.Fragment>
            );
          },
        },
      },
      {
        name: "Name",
        label: "Priority",
        options: {
          filter: true,
          sort: false,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <React.Fragment>
                <div className="login-sign_up-links">
                  {tableMeta.rowIndex === 0 ? (
                    <ArrowUpwardIcon
                      style={{ cursor: "pointer", color: "grey" }}
                    />
                  ) : (
                    <ArrowUpwardIcon
                      style={{ cursor: "pointer" }}
                      onClick={() => this.shiftUp(value, tableMeta)}
                    />
                  )}
                  {tableMeta.rowIndex === this.state.tableData.length - 1 ? (
                    <ArrowDownwardIcon
                      style={{ cursor: "pointer", color: "grey" }}
                    />
                  ) : (
                    <ArrowDownwardIcon
                      style={{ cursor: "pointer" }}
                      onClick={() => this.shiftDown(value, tableMeta)}
                    />
                  )}
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
          <Sidebar activeComponent={"SetUpDeal"} />
          {this.state.screenloader === true ? (
            // <LinearLoader msg={""} />
            <>
            </>
          ) : (
            <div className="content1">
             

              <div className="page-content">
                <div className="row1">
                  <div className="col-12 col-sm-6 col-md-8 d-flex justigy-content-center align-center hellocard">
                    <KeyboardBackspaceIcon
                      onClick={() => this.goBackToDashBoard()}
                      className="left-arrow-muis1 left-arrow-servicer"
                    ></KeyboardBackspaceIcon>
                    <h3 className="headerdashboard">Deal Creation</h3>
                  </div>
                  <div className="col-12 col-sm-6 col-md-4 hellocard">
                    <div className="buttonsverified uw-deal-details-button-container">
                      {this.state.createStatus === "Update" ? null : (
                        <Button
                          variant="outlined"
                          color="black"
                          onClick={this.dealCreationSaveForNow}
                        >
                          Save for Now
                          {this.state.formLoader1 === true ? (
                            <CircularProgress size="22px" color="primary" />
                          ) : (
                            ""
                          )}
                        </Button>
                      )}
                      {this.state.createStatus === "Update" ? (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={this.dealCreationCreateUpdate}
                        >
                          Update
                          {this.state.formLoader2 === true ? (
                            <CircularProgress size="22px" color="primary" />
                          ) : (
                            ""
                          )}
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={this.dealCreationCreateUpdate}
                        >
                          Create
                          {this.state.formLoader2 === true ? (
                            <CircularProgress size="22px" color="primary" />
                          ) : (
                            ""
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="row row1">
                  <div>
                    {/* <div className="tablechangebutton"> */}
                    <div className="tablechangebuttonloans">
                      <button
                        type="button"
                        onClick={() => this.handleClickGeneral()}
                        className={
                          this.state.activeInsights1 == true
                            ? "issuerDashboard-table-top-button-insights-active"
                            : "issuerDashboard-table-top-button-insights"
                        }
                      >
                        General
                      </button>

                      <button
                        type="button"
                        onClick={() => this.handleClickTranches()}
                        className={
                          this.state.activeInsights2 == true
                            ? "issuerDashboard-table-top-button-workbench-active"
                            : "issuerDashboard-table-top-button-workbench"
                        }
                      >
                        Tranches
                      </button>

                      <button
                        type="button"
                        onClick={() => this.handleClickFees()}
                        className={
                          this.state.activeInsights3 == true
                            ? "issuerDashboard-table-top-button-rejected-active"
                            : "issuerDashboard-table-top-button-rejected"
                        }
                      >
                        Fees
                      </button>
                      <button
                        type="button"
                        onClick={() => this.handleClickExpenses()}
                        className={
                          this.state.activeInsights4 == true
                            ? "issuerDashboard-table-top-button-rejected-active"
                            : "issuerDashboard-table-top-button-rejected"
                        }
                      >
                        Expenses
                      </button>
                      <button
                        type="button"
                        onClick={() => this.handleClickAccounts()}
                        className={
                          this.state.activeInsights5 == true
                            ? "issuerDashboard-table-top-button-rejected-active"
                            : "issuerDashboard-table-top-button-rejected"
                        }
                      >
                        Accounts
                      </button>
                      <button
                        type="button"
                        onClick={() => this.handleClickManualInputs()}
                        className={
                          this.state.activeInsightsMI == true
                            ? "issuerDashboard-table-top-button-rejected-active"
                            : "issuerDashboard-table-top-button-rejected"
                        }
                      >
                        Manual Input
                      </button>
                      <button
                        type="button"
                        onClick={() => this.handleClickTests()}
                        className={
                          this.state.activeInsights6 == true
                            ? "issuerDashboard-table-top-button-rejected-active"
                            : "issuerDashboard-table-top-button-rejected"
                        }
                      >
                        Tests
                      </button>
                      {this.state.isSecuritisation !== "Securitisation" ? (
                        <button
                          type="button"
                          onClick={() => this.handleClickBorrowingBase()}
                          className={
                            this.state.activeInsightsBB == true
                              ? "issuerDashboard-table-top-button-rejected-active"
                              : "issuerDashboard-table-top-button-rejected"
                          }
                        >
                          Borrowing Base
                        </button>
                      ) : null}
                      <button
                        type="button"
                        onClick={() => this.handleClickVariables()}
                        className={
                          this.state.activeInsights7 == true
                            ? "issuerDashboard-table-top-button-rejected-active"
                            : "issuerDashboard-table-top-button-rejected"
                        }
                      >
                        Variables
                      </button>
                      <button
                        type="button"
                        onClick={() => this.handleClickPaymentRules()}
                        className={
                          this.state.activeInsights8 == true
                            ? "issuerDashboard-table-top-button-rejected-active"
                            : "issuerDashboard-table-top-button-rejected"
                        }
                      >
                        Payment Rules
                      </button>
                    </div>
                  </div>
                </div>

                <div className="row row1">
                  <div className="investor-heading-container">
                    <h1 className="headerdashboard1">List of Fees</h1>
                  </div>
                  <div>
                    <div className="dashboard-top-right-container1">
                      <div className="search-bar-outer-container uw-search-button-container">
                        {
                          <Button
                            variant="contained"
                            color="primary"
                            type="button"
                            onClick={() => this.onOpenModal()}
                          >
                            Add Fees
                          </Button>
                        }
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
                <>
                  <div className="btn_move">
                    <div className="btn_prev" onClick={(e) => this.showPrev(e)}>
                      Previous
                    </div>
                    <button
                      className="btn_next"
                      onClick={(e) => this.showNext(e)}
                    >
                      Next
                    </button>
                  </div>
                </>
              </div>

              <>
                <ReactModal
                  isOpen={this.state.open1}
                  onRequestClose={this.onCloseModal}
                  contentLabel="Minimal Modal Example"
                  style={customStylesauto}
                >
                  <React.Fragment>
                    <div className="modalPopup">
                      <div className="popupTitle">
                      <h2>Add Fees</h2>
                      <button
                        type="button"
                        className="closePopup"
                        style={{ minWidth: "30px" }}
                        onClick={this.onCloseModal}
                      >
                        <CloseIcon></CloseIcon>{" "}
                      </button>
                      </div>

                      {/* {this.state.popupLoader === true ? <CircularProgress size="30px" color="secondary" /> : ' '} */}

                      <div className="modalshiftcontent">
                        <form
                          className="form-container"
                          onSubmit={this.AddSubmit}
                        >
                          <div className="input-container">
                            <label className="label"> Name</label>
                            <input
                              required
                              placeholder="Type here"
                              className="input"
                              type="text"
                              onChange={(e) => {
                                this.setState({
                                  formData: {
                                    ...this.state.formData,
                                    Name: e.target.value,
                                  },
                                });
                              }}
                              value={this.state.formData.Name}
                            />
                          </div>

                          <div className="input-container">
                            <label className="label">Type</label>
                            <select
                              required
                              className="input-select"
                              onChange={(e) => {
                                this.setState({
                                  formData: {
                                    ...this.state.formData,
                                    Type: e.target.value,
                                  },
                                });
                              }}
                              value={this.state.formData?.Type}
                            >
                              <option value="">Select any one</option>
                              <option value="Fixed">Fixed</option>
                              <option value="Floating">Floating</option>
                            </select>
                          </div>

                          <div className="input-container">
                            <label className="label">Basis</label>
                            <input
                              placeholder="Type Expression"
                              className="input"
                              type="text"
                              onChange={(e) => {
                                this.setState({
                                  formData: {
                                    ...this.state.formData,
                                    Basis: e.target.value,
                                  },
                                });
                              }}
                              value={this.state.formData.Basis}
                              {...(this.state.formData.Type === "Floating"
                                ? { required: true }
                                : { required: false })}
                            />
                          </div>

                          <div className="input-container">
                            <label className="label">Rate</label>
                            <div className="flex input">
                              <input
                                placeholder="Type here"
                                className="input-none"
                                type="number"
                                onKeyDown={this.blockInvalidChar}
                                onChange={(e) => {
                                  this.setState({
                                    formData: {
                                      ...this.state.formData,
                                      Rate: e.target.value,
                                    },
                                  });
                                }}
                                value={this.state.formData.Rate}
                              />
                              <p>%</p>
                            </div>
                          </div>

                          <div className="input-container">
                            <label className="label">Amount</label>
                            <input
                              placeholder="Type here"
                              className="input"
                              type="text"
                              // onKeyDown={this.blockInvalidChar}
                              onChange={(e) => {
                                // let removeCharC = e.target.value.replace(
                                //   /[^0-9\.]/g,
                                //   ""
                                // );
                                // let formattedValue = removeCharC.replace(
                                //   /\B(?=(\d{3})+(?!\d))/g,
                                //   ","
                                // );
                                this.setState({
                                  formData: {
                                    ...this.state.formData,
                                    Amount: e.target.value,
                                  },
                                });
                              }}
                              value={this.state.formData.Amount}
                              // Add the 'required' attribute conditionally
                              {...(this.state.formData.Type === "Fixed" &&
                              this.state.formData.Basis === "" // Check if Basis is empty
                                ? { required: true }
                                : { required: false })}
                            />
                          </div>

                          <div className="modalsubmit">
                            <div className="submitbuttonbg">
                              <div className="row">
                                <div className="row justify-content-end1">
                                  <button
                                    type="button"
                                    className="popupbutton22"
                                    onClick={this.onCloseModal}
                                  >
                                    {" "}
                                    Cancel{" "}
                                  </button>
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                  >
                                    Add
                                    {this.state.formLoader === true ? (
                                      <CircularProgress
                                        size="22px"
                                        color="primary"
                                      />
                                    ) : (
                                      ""
                                    )}
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </React.Fragment>
                </ReactModal>
              </>
              <>
                <ReactModal
                  isOpen={this.state.open2}
                  onRequestClose={this.onCloseModal1}
                  contentLabel="Minimal Modal Example"
                  style={customStylesServicer}
                >
                  <React.Fragment>
                    <div className="modalPopup">
                      <div className="popupTitle">
                      <h2>View Fees</h2>
                      <button
                        type="button"
                        className="closePopup"
                        style={{ minWidth: "30px" }}
                        onClick={this.onCloseModal1}
                      >
                        <CloseIcon></CloseIcon>{" "}
                      </button>
                      </div>
                    </div>

                    <div className="modalshiftcontent">
                      <form className="form-container">
                        <div className="Modal-Data">
                          <div className="headingspaces1">
                            <p className="sizeofp">Name</p>
                            <h6 className="headingspace1">
                              {!this.state.formData1.Name
                                ? "-"
                                : this.state.formData1.Name}
                            </h6>
                          </div>
                          <div className="headingspaces1">
                            <p className="sizeofp">Type</p>
                            <h6 className="headingspace1">
                              {!this.state.formData1.Type
                                ? "-"
                                : this.state.formData1.Type}
                            </h6>
                          </div>
                          <div className="headingspaces1">
                            <p className="sizeofp">Basis</p>
                            <h6 className="headingspace1">
                              {!this.state.formData1.Basis
                                ? "-"
                                : this.state.formData1.Basis}
                            </h6>
                          </div>
                          <div className="headingspaces1">
                            <p className="sizeofp">Rate</p>
                            <h6 className="headingspace1">
                              {!this.state.formData1.Rate
                                ? "-"
                                : this.state.formData1.Rate}
                            </h6>
                          </div>
                          <div className="headingspaces1">
                            <p className="sizeofp">Amount</p>
                            <h6 className="headingspace1">
                              {!this.state.formData1.Amount
                                ? "-"
                                : this.state.formData1.Amount}
                            </h6>
                          </div>
                        </div>

                        <div className="modalsubmit">
                          <div className="submitbuttonbg">
                            <div className="row">
                              <div className="row justify-content-end1">
                                <button
                                  type="button"
                                  className="popupbutton22"
                                  onClick={this.onCloseModal1}
                                >
                                  {" "}
                                  Cancel{" "}
                                </button>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  onClick={() => this.onOpenModal2()}
                                >
                                  Edit
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </React.Fragment>
                </ReactModal>
              </>
              <>
                <ReactModal
                  isOpen={this.state.open3}
                  onRequestClose={this.onCloseModal2}
                  contentLabel="Minimal Modal Example"
                  style={customStylesauto}
                >
                  <React.Fragment>
                    <div className="modalPopup">
                     <div className="popupTitle">
                     <h2>Edit Fees</h2>
                      <button
                        type="button"
                        className="closePopup"
                        style={{ minWidth: "30px" }}
                        onClick={this.onCloseModal2}
                      >
                        <CloseIcon></CloseIcon>{" "}
                      </button>
                     </div>

                      {/* {this.state.popupLoader === true ? <CircularProgress size="30px" color="secondary" /> : ' '} */}

                      <div className="modalshiftcontent">
                        <form
                          className="form-container"
                          onSubmit={this.EditSubmit}
                        >
                          <div className="input-container">
                            <label className="label"> Name</label>
                            <input
                              required
                              placeholder="Type here"
                              className="input"
                              type="text"
                              onChange={(e) => {
                                this.setState({
                                  formData1: {
                                    ...this.state.formData1,
                                    Name: e.target.value,
                                  },
                                });
                              }}
                              value={this.state.formData1.Name}
                            />
                          </div>

                          <div className="input-container">
                            <label className="label">Type</label>
                            <select
                              required
                              className="input-select"
                              onChange={(e) => {
                                this.setState({
                                  formData1: {
                                    ...this.state.formData1,
                                    Type: e.target.value,
                                  },
                                });
                              }}
                              value={this.state.formData1.Type}
                            >
                              <option value="">Select any one</option>
                              <option value="Fixed">Fixed</option>
                              <option value="Floating">Floating</option>
                            </select>
                          </div>

                          <div className="input-container">
                            <label className="label">Basis</label>
                            <input
                              placeholder="Type here"
                              className="input"
                              type="text"
                              onChange={(e) => {
                                this.setState({
                                  formData1: {
                                    ...this.state.formData1,
                                    Basis: e.target.value,
                                  },
                                });
                              }}
                              value={this.state.formData1.Basis}
                              {...(this.state.formData1.Type === "Floating"
                                ? { required: true }
                                : { required: false })}
                            />
                          </div>
                          <div className="input-container">
                            <label className="label">Rate</label>
                            <div className="flex input">
                              <input
                                placeholder="Type here"
                                className="input-none"
                                type="number"
                                onKeyDown={this.blockInvalidChar}
                                onChange={(e) => {
                                  this.setState({
                                    formData1: {
                                      ...this.state.formData1,
                                      Rate: e.target.value,
                                    },
                                  });
                                }}
                                value={this.state.formData1.Rate}
                              />
                              <p>%</p>
                            </div>
                          </div>

                          <div className="input-container">
                            <label className="label">Amount</label>
                            <input
                              placeholder="Type here"
                              className="input"
                              type="text"
                              // onKeyDown={this.blockInvalidChar}
                              onChange={(e) => {
                                // let removeCharC = e.target.value.replace(
                                //   /[^0-9\.]/g,
                                //   ""
                                // );
                                // let formattedValue = removeCharC.replace(
                                //   /\B(?=(\d{3})+(?!\d))/g,
                                //   ","
                                // );
                                this.setState({
                                  formData1: {
                                    ...this.state.formData1,
                                    Amount: e.target.value,
                                  },
                                });
                              }}
                              value={this.state.formData1.Amount}
                              // Add the 'required' attribute conditionally
                              {...(this.state.formData1.Type === "Fixed" &&
                              this.state.formData1.Basis === "" // Check if Basis is empty
                                ? { required: true }
                                : { required: false })}
                            />
                          </div>

                          <div className="modalsubmit">
                            <div className="submitbuttonbg">
                              <div className="row">
                                <div className="row justify-content-end1">
                                  <button
                                    type="button"
                                    className="popupbutton22"
                                    onClick={this.onCloseModal2}
                                  >
                                    {" "}
                                    Cancel{" "}
                                  </button>
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                  >
                                    Save
                                    {this.state.formLoader === true ? (
                                      <CircularProgress
                                        size="22px"
                                        color="primary"
                                      />
                                    ) : (
                                      ""
                                    )}
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </React.Fragment>
                </ReactModal>

                <div id="modal1">
                  <ReactModal
                    isOpen={this.state.open4}
                    onRequestClose={this.onCloseModal3}
                    contentLabel="Minimal Modal Example"
                    style={customStylesautosmallmodal1}
                  >
                    <React.Fragment>
                      <div className="modalPopup">
                        <h3 className="popupheading">
                          Are you sure, you want to Delete this Fee "
                          {this.state.deleteRowVal.Name}"?
                        </h3>

                        {/* {this.state.popupLoader === true ? <CircularProgress size="30px" color="secondary" /> : ' '} */}

                        <div className="modalshiftcontent">
                          <div className="modalsubmit">
                            <div className="submitbuttonbg">
                              <div className="row">
                                <div className="row justify-content-end11">
                                  <button
                                    type="button"
                                    className="popupbutton1"
                                    onClick={this.onCloseModal3}
                                  >
                                    No
                                  </button>

                                  <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    onClick={this.dealCreationDelete}
                                  >
                                    Yes, Delete it
                                    {this.state.formLoader === true ? (
                                      <CircularProgress
                                        size="25px"
                                        color="primary"
                                      />
                                    ) : (
                                      ""
                                    )}
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                          {this.state.getLoansLoader === false ? (
                            ""
                          ) : (
                            // <FormLoader></FormLoader>
                            ''
                          )}
                          {/* {this.state.openPopup === true ? <React.Fragment><Snackbar msg={"Processor addded Successfully" || this.state.message} open="true" /> </React.Fragment> : ' '} */}
                        </div>
                      </div>
                    </React.Fragment>
                  </ReactModal>
                </div>
              </>
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default withSnackbar(Fees_DealCreation);