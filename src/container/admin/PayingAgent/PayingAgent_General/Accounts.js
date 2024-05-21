/* eslint-disable require-jsdoc */
import React, { Component } from "react";
import "./PayingAgent.css";
import Sidebar from "../../../../components/sidebar/sidebar";
import MUIDataTable from "mui-datatables";
import Button from "@material-ui/core/Button";
import Loader from "../../../../components/loader";
import CloseIcon from "@material-ui/icons/Close";
import { withSnackbar } from "notistack";
import CircularProgress from "@material-ui/core/CircularProgress";
import ReactModal from "react-modal";
import {
  customStylesServicer,
  customStylesauto,
} from "../../../../components/customscripts/customscript";
import { TrainRounded } from "@material-ui/icons";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import NumberComp2 from "../../../../components/NumberComp2";
import {
  dealCreationAddSave,
  ViewAccountTable,
  dealCreationCreateUpdate,
  dealCreationDelete,
  dealCreationSaveForNow,
  dealCreation_BC_Status,
  dealCreationAutoSave,
  dealCreationEdit,
  savedealservicerdate
} from "../../../../servies/services";
import LinearLoader from "../../../../components/loader/LinearLoader";
import { customStylesautosmallmodal1 } from "../../../../components/customscripts/customscript";
import FormLoader from "../../../../components/loader/formLoader";

class Account_DealCreation extends Component {
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
      screenloader: false,
      TableName: "Accounts",
      dealid: sessionStorage.getItem("dealID"),
      DealName : sessionStorage.getItem("dealName"),
      // DealName: !sessionStorage.getItem("dealname")
      //   ? JSON.parse(sessionStorage.getItem("getDashboardDeals")).map(
      //       (item) => item[0]
      //     )[0]
      //   : sessionStorage.getItem("dealname"),
      isRecurring: sessionStorage.getItem("isAddDeal"),
      isSecuritisation: sessionStorage.getItem("isSecuritisation"),
      peer: sessionStorage.getItem("peer_insurer"),
      peers: JSON.parse(sessionStorage.getItem("peers")),
      formData: {
        "Account Name": "",
        "Original Balance": "",
        Description: "",
        "Account Type": "",
        "Required Balance Logic": "",
        "Report Flag": "",
      },
      formData1: {
        "Account Name": "",
        "Original Balance": "",
        Description: "",
        "Account Type": "",
        "Required Balance Logic": "",
        "Report Flag": "",
      },
      deleteRowVal: {
        "Account Name": "",
      },
      activeInsights1: false,
      activeInsights2: false,
      activeInsights3: false,
      activeInsights4: false,
      activeInsights5: true,
      activeInsights6: false,
      activeInsights7: false,
      activeInsights8: false,
      activeInsightsBB: false,
    };
  }
  blockInvalidChar = (e) => {
    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();
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
    });
    this.dealCreationAutoSave();
    // window.location.assign("/admin/fees");
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
    });
    this.dealCreationAutoSave();
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
    });
    this.dealCreationAutoSave();
    // window.location.assign("/admin/paymentrules");
  };

  onOpenModal = () => {
    console.log("add account modal");
    this.setState({
      open1: true,
      formData: {
        "Account Name": "",
        "Original Balance": "",
        Description: "",
        "Account Type": "NA",
        "Required Balance Logic": "",
        "Report Flag": "No",
      },
    });
  };

  onOpenModal1 = (value, editValue) => {
    console.log("value: ", value, editValue);
    console.log("edit account modal");
    this.setState({
      open2: true,
      EditPreviousName: value,
      formData1: {
        "Account Name": value,
        "Original Balance": editValue[0] === undefined ? "" : editValue[0],
        Description: editValue[1] === undefined ? "" : editValue[1],
        "Account Type":
          !editValue[2]
            ? "NA"
            : editValue[2],
        "Required Balance Logic": editValue[3] === undefined ? "" : editValue[3],
        "Report Flag": !editValue[4] ? "No" : editValue[4],
      },
    });
  };

  onOpenModal2 = (value, deleteValue) => {
    console.log("value: ", value, deleteValue);
    console.log("delete account modal");
    this.setState({
      open3: true,
      deleteRowVal: {
        "Account Name": value,
        "Original Balance": deleteValue[0],
        Description: deleteValue[1],
        "Account Type": deleteValue[2],
        "Required Balance Logic": deleteValue[3],
        "Report Flag": deleteValue[4],
      },
    });
  };

  dealCreationDelete = async () => {
    this.setState({ formLoader: true });
    let data = {};
    // data.peers = this.state.peer;
    data.DealName = this.state.DealName;
    data.TableName = this.state.TableName;
    const NameAdd1 = this.state.deleteRowVal["Account Name"];
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
      this.onCloseModal2();
      this.savedealservicerdate()
      this.ViewAccountTable();
    } else {
      this.setState({ formLoader: false });
      const message = "Something went wrong";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };
  onCloseModal = () => {
    this.setState({ open1: false});
  };

  onCloseModal1 = () => {
    this.setState({ open2: false });
  };

  onCloseModal2 = () => {
    this.setState({ open3: false });
  };

  AddSubmit = (e) => {
    e.preventDefault();
    const renameOB = this.state.formData["Original Balance"].replace(/,/g, '');
    delete this.state.formData["Original Balance"];
    this.state.formData["Original Balance"] = renameOB;

    console.log(this.state.formData);
    this.dealCreationAddSave();
    console.log("hello we have clicked the button");
  };
  EditSubmit = (e) => {
    e.preventDefault();
    const renameOB = this.state.formData1["Original Balance"].toString().includes(",") ? this.state.formData1["Original Balance"].replace(/,/g, '') : this.state.formData1["Original Balance"];
    delete this.state.formData1["Original Balance"];
    this.state.formData1["Original Balance"] = renameOB;
    
    console.log(this.state.formData1);
    this.dealCreationEdit();
    console.log("hello we have clicked the Edit button");
  };
  dealCreationAddSave = async () => {
    this.setState({ formLoader: true });
      let data = {};
      data.DealName = this.state.DealName;
      data.TableName = this.state.TableName;
      const NameAdd = this.state.formData["Account Name"];
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
        this.ViewAccountTable();
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
      const NameAdd = this.state.formData1["Account Name"];
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
        this.ViewAccountTable();
    this.onCloseModal1()
      }else{
        const message = APIResponse.data.message;
        this.props.enqueueSnackbar(message, {
          variant: "error",
          autoHideDuration: 3000,
        });
    this.setState({formLoader: false})
    this.onCloseModal1()
      }

    } else {
      const message = "Something went Wrong";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    this.setState({formLoader: false})
    this.onCloseModal1()
    }
  };
  ViewAccountTable = async () => {
    this.setState({ getLoansLoader: true, tableData: [], loading: true,screenloader:true });
    var data = {};
    data.DealName = this.state.DealName;
    data.TableName = this.state.TableName;
    // data.peers = this.state.peer;

    console.log("datata", data);
    this.setState({ screenloader: true });
    const APIResponse = await ViewAccountTable(data, this.state.token);

    if (APIResponse.status === 200) {
      this.setState({
        getLoansLoader: false,
        tableData: APIResponse.data,
        loading: false,
      });
      await this.savedealservicerdate();
      await this.dealCreation_BC_Status();


      // const message = "Deal Document Update Success";
      // this.props.enqueueSnackbar(message, {
      //   variant: "info",
      //   autoHideDuration: 3000,
      // });
    } else {
      this.setState({ getLoansLoader: false, loading: false });
      const message = "Something went wrong";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
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
        [`${item["Account Name"]}`]: item,
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
        [`${item["Account Name"]}`]: item,
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
    this.ViewAccountTable()
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
        ...Obj,
        [`${item["Account Name"]}`]: item,
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
        this.savedealservicerdate()
    this.setState({formLoader1: false})
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

  showNext = (e) => {
    e.preventDefault();
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
    })
    this.dealCreationAutoSave();
    // window.location.assign("/admin/tests");
  };
  showPrev = (e) => {
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
      // this.props.history.push({
      //   pathname: "/admin/general",
      //   state:{checkDeal:false}
      // });
      window.location.assign("/admin/general");
    }else if(this.state.activeInsights2 === true){
      // this.props.history.push({
      //   pathname: "/admin/tranches",
      //   state:{checkDeal:false}
      // });
      window.location.assign("/admin/tranches");
    }else if(this.state.activeInsights3 === true){
      // this.props.history.push({
      //   pathname: "/admin/fees",
      //   state:{checkDeal:false}
      // });
      window.location.assign("/admin/fees");
    }else if(this.state.activeInsights4 === true){
      // this.props.history.push({
      //   pathname: "/admin/expenses",
      //   state:{checkDeal:false}
      // });
      window.location.assign("/admin/expenses");
    }else if(this.state.activeInsights6 === true){
      // this.props.history.push({
      //   pathname: "/admin/tests",
      //   state:{checkDeal:false}
      // });
      window.location.assign("/admin/tests");
    }else if(this.state.activeInsightsBB === true){
      // this.props.history.push({
      //   pathname: "/admin/borrowingBase",
      //   state:{checkDeal:false}
      // });
      window.location.assign("/admin/borrowingBase");
    }else if(this.state.activeInsights7 === true){
      // this.props.history.push({
      //   pathname: "/admin/variables",
      // });
      window.location.assign("/admin/variables");
    }else if(this.state.activeInsights8 === true){
      // this.props.history.push({
      //   pathname: "/admin/paymentrules",
      //   state:{checkDeal:false}
      // });
      window.location.assign("/admin/paymentrules");
    }

};
  async componentDidMount() {
    var component = window.location.pathname;
    sessionStorage.setItem("component", component);
    this.ViewAccountTable();
  }
  goBackToDashBoard = () => {
    this.state.isRecurring
      ? this.props.history.push({
          isRecurring: sessionStorage.removeItem("isAddDeal"),
          pathname: "/dashboard",
        })
      : this.props.history.push({
      pathname: "/admin/accounts_recurring",
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

    const columns = [
      {
        name: "Account Name",
        label: "Account Name",
        options: {
          filter: true,
          sort: true,
        },
      },

      {
        name: "Original Balance",
        label: "Original Balance",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <div style={{ paddingLeft: "1.5rem" }}>
                <NumberComp2 value={value}></NumberComp2>
              </div>
            );
          },
        },
      },

      {
        name: "Description",
        label: "Description",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "Account Type",
        label: "Account Type",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            return <div style={{ paddingLeft: "1.5rem" }}>{value}</div>;
          },
        },
      },
      {
        name: "Required Balance Logic",
        label: "Required Balance Logic",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            const isNumber = /^-?\d*\.?\d+$/.test(value);

            return isNumber ? (
              <div style={{ paddingLeft: "2rem" }}>{value}</div>
            ) : (
              <div style={{ paddingLeft: "0.2rem" }}>{value}</div>
            );
          },
        },
      },
      {
        name: "Report Flag",
        label: "Report Flag",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <div style={{ paddingLeft: "1.5rem" }}>
                <input
                  type="checkbox"
                  checked={value === "Yes" ? true : false}
                  disabled={value === "No" ? true : false}
                />
              </div>
            );
          },
        },
      },
      {
        name: "Account Name",
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
                <div className="CreateActions">
                  <span>
                    <button
                      className="popupbutton1"
                      onClick={() =>
                        this.onOpenModal1(value, tableMeta.rowData.splice(1, 5))
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="popupbuttons1"
                      onClick={() =>
                        this.onOpenModal2(value, tableMeta.rowData.splice(1, 5))
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
    ];

    return (
      <React.Fragment>
        <div className="page">
          <Sidebar activeComponent={"SetUpDeal"} />
          {this.state.screenloader === true ? (
            <LinearLoader msg={""} />
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
                    <h1 className="headerdashboard1">List of Accounts</h1>
                  </div>
                  <div>
                    <div className="dashboard-top-right-container1">
                      <div className="search-bar-outer-container uw-search-button-container">
                        {
                          <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            className="submitbuttoncss"
                            onClick={() => this.onOpenModal()}
                          >
                            Add Account
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
                  <>
                    <div className="btn_move">
                      <div
                        className="btn_prev"
                        onClick={(e) => this.showPrev(e)}
                      >
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
                </React.Fragment>
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
                     <h2>Add Account</h2>
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
                            <label className="label">Account Name</label>
                            <input
                              required
                              placeholder="Type here"
                              className="input"
                              type="text"
                              onChange={(e) => {
                                this.setState({
                                  formData: {
                                    ...this.state.formData,
                                    "Account Name": e.target.value,
                                  },
                                });
                              }}
                              value={this.state.formData["Account Name"]}
                            />
                          </div>

                          <div className="input-container">
                            <label className="label">Original Balance</label>
                            <input
                              required
                              placeholder="Type here"
                              className="input"
                              type="text"
                              onKeyDown={this.blockInvalidChar}
                              onChange={(e) => {
                                let removeCharC = e.target.value.replace(
                                  /[^0-9\.]/g,
                                  ""
                                );
                                let formattedValue = removeCharC.replace(
                                  /\B(?=(\d{3})+(?!\d))/g,
                                  ","
                                );

                                this.setState({
                                  formData: {
                                    ...this.state.formData,
                                    "Original Balance": formattedValue,
                                  },
                                });
                              }}
                              value={this.state.formData["Original Balance"]}
                            />
                          </div>

                          <div className="input-container">
                            <label className="label">Description</label>
                            <input
                              required
                              placeholder="Type here"
                              className="input"
                              type="text"
                              onChange={(e) => {
                                this.setState({
                                  formData: {
                                    ...this.state.formData,
                                    Description: e.target.value,
                                  },
                                });
                              }}
                              value={this.state.formData.Description}
                            />
                          </div>

                          <div className="input-container">
                            <label className="label">Account Type</label>
                            <select
                              className="input-select"
                              onChange={(e) => {
                                this.setState({
                                  formData: {
                                    ...this.state.formData,
                                    "Account Type": e.target.value,
                                  },
                                });
                              }}
                              value={this.state.formData["Account Type"]}
                            >
                              <option value="NA">Select any one</option>
                              <option value="CARE">CARE</option>
                              <option value="CORE">CORE</option>
                              <option value="SORE">SORE</option>
                              <option value="LQDF">LQDF</option>
                              <option value="MGAC">MGAC</option>
                              <option value="OTHR">OTHR</option>
                            </select>
                          </div>

                          <div className="input-container">
                            <label className="label">
                              Required Balance Logic
                            </label>
                            <input
                              placeholder="Type Expression"
                              className="input"
                              type="text"
                              onChange={(e) => {
                                this.setState({
                                  formData: {
                                    ...this.state.formData,
                                    "Required Balance Logic": e.target.value,
                                  },
                                });
                              }}
                              value={
                                this.state.formData["Required Balance Logic"]
                              }
                            />
                          </div>

                          <div className="checkbox-container">
                            <label className="label">Report Flag</label>
                            <input
                              className="checkbox-input"
                              type="checkbox"
                              onChange={(e) => {
                                const reportFlagValue = e.target.checked
                                  ? "Yes"
                                  : "No";

                                this.setState({
                                  formData: {
                                    ...this.state.formData,
                                    "Report Flag": reportFlagValue,
                                  },
                                });
                              }}
                              checked={
                                this.state.formData["Report Flag"] === "Yes" ||
                                this.state.formData["Report Flag"] === undefined
                              } // Check for 'Yes' or undefined (default)
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
                                    Cancel
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

                        {/* {this.state.getLoansLoader === false ? '' : <FormLoader></FormLoader>} */}
                        {/* {this.state.openPopup === true ? <React.Fragment><Snackbar msg={"Processor addded Successfully" || this.state.message} open="true" /> </React.Fragment> : ' '} */}
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
                  style={customStylesauto}
                >
                  <React.Fragment>
                    <div className="modalPopup">
                      <div className="popupTitle">
                      <h2>Edit Accounts</h2>
                      <button
                        type="button"
                        className="closePopup"
                        style={{ minWidth: "30px" }}
                        onClick={this.onCloseModal1}
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
                            <label className="label">Account Name</label>
                            <input
                              required
                              placeholder="Type here"
                              className="input"
                              type="text"
                              onChange={(e) => {
                                this.setState({
                                  formData1: {
                                    ...this.state.formData1,
                                    "Account Name": e.target.value,
                                  },
                                });
                              }}
                              value={this.state.formData1["Account Name"]}
                            />
                          </div>

                          <div className="input-container">
                            <label className="label">Original Balance</label>
                            <input
                              required
                              placeholder="Type here"
                              className="input"
                              type="text"
                              onKeyDown={this.blockInvalidChar}
                              onChange={(e) => {
                                let removeCharC = e.target.value.replace(
                                  /[^0-9\.]/g,
                                  ""
                                );
                                let formattedValue = removeCharC.replace(
                                  /\B(?=(\d{3})+(?!\d))/g,
                                  ","
                                );

                                this.setState({
                                  formData1: {
                                    ...this.state.formData1,
                                    "Original Balance": formattedValue,
                                  },
                                });
                              }}
                              value={this.state.formData1["Original Balance"]}
                            />
                          </div>

                          <div className="input-container">
                            <label className="label">Description</label>
                            <input
                              required
                              placeholder="Type here"
                              className="input"
                              type="text"
                              onChange={(e) => {
                                this.setState({
                                  formData1: {
                                    ...this.state.formData1,
                                    Description: e.target.value,
                                  },
                                });
                              }}
                              value={this.state.formData1.Description}
                            />
                          </div>

                          <div className="input-container">
                            <label className="label">Account Type</label>
                            <select
                              className="input-select"
                              onChange={(e) => {
                                this.setState({
                                  formData1: {
                                    ...this.state.formData1,
                                    "Account Type": e.target.value,
                                  },
                                });
                              }}
                              value={this.state.formData1["Account Type"]}
                            >
                              <option value="NA">Select any one</option>
                              <option value="CARE">CARE</option>
                              <option value="CORE">CORE</option>
                              <option value="SORE">SORE</option>
                              <option value="LQDF">LQDF</option>
                              <option value="MGAC">MGAC</option>
                              <option value="OTHR">OTHR</option>
                            </select>
                          </div>

                          <div className="input-container">
                            <label className="label">
                              Required Balance Logic
                            </label>
                            <input
                              placeholder="Type Expression"
                              className="input"
                              type="text"
                              onChange={(e) => {
                                this.setState({
                                  formData1: {
                                    ...this.state.formData1,
                                    "Required Balance Logic": e.target.value,
                                  },
                                });
                              }}
                              value={
                                this.state.formData1["Required Balance Logic"]
                              }
                            />
                          </div>

                          <div className="checkbox-container">
                            <label className="label">Report Flag</label>
                            <input
                              className="checkbox-input"
                              type="checkbox"
                              onChange={(e) => {
                                const reportFlagValue = e.target.checked
                                  ? "Yes"
                                  : "No";

                                this.setState({
                                  formData1: {
                                    ...this.state.formData1,
                                    "Report Flag": reportFlagValue,
                                  },
                                });
                              }}
                              checked={
                                this.state.formData1["Report Flag"] === "Yes" ||
                                this.state.formData1["Report Flag"] ===
                                  undefined
                              } // Check for 'Yes' instead of true
                            />
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
                                    Cancel
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

                        {/* {this.state.getLoansLoader === false ? '' : <FormLoader></FormLoader>} */}
                        {/* {this.state.openPopup === true ? <React.Fragment><Snackbar msg={"Processor addded Successfully" || this.state.message} open="true" /> </React.Fragment> : ' '} */}
                      </div>
                    </div>
                  </React.Fragment>
                </ReactModal>

                <div id="modal1">
                  <ReactModal
                    isOpen={this.state.open3}
                    onRequestClose={this.onCloseModal2}
                    contentLabel="Minimal Modal Example"
                    style={customStylesautosmallmodal1}
                  >
                    <React.Fragment>
                      <div className="modalPopup">
                        <h3 className="popupheading">
                          Are you sure, you want to Delete this Account "
                          {this.state.deleteRowVal["Account Name"]}"?
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
                                    onClick={this.onCloseModal2}
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
                            <FormLoader></FormLoader>
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

export default withSnackbar(Account_DealCreation);
