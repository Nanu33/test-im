/* eslint-disable require-jsdoc */
import React, { Component } from "react";
// import { connect } from 'react-redux';
import Sidebar from "../../../components/sidebar";
import MUIDataTable from "mui-datatables";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Loader from "../../../components/loader";
import Snackbar from "../../../components/snackbar";
import LinearLoader from "../../../components/loader/LinearLoader";
import axios from "axios";
import CloseIcon from "@material-ui/icons/Close";
import moment from "moment";
import { withSnackbar } from "notistack";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddIcon from "@material-ui/icons/Add";
import { withTheme } from "react-jsonschema-form";
import { Theme as MuiTheme } from "rjsf-material-ui";
import ReactModal from "react-modal";
import {
  widgets,
  CustomFieldTemplate,
  customStyles,
  customStylesauto,
  customStylesautosmallmodal,
  customStylesautosmallmodal1,
  customStylesautoAccount,
  customStylesautosmallmodalpopup,
} from "../../../components/customscripts/customscript";
import FormLoader from "../../../components/loader/formLoader";
import {
  savetransactiondetailsoffchain,
  gettransactiondetailsoffchainbydealid,
  updatetransactiondetailsoffchain,
  updateaccountsoffchain,
  getaccountdetailsbydealidoffchain,
  getUserOffchainBankDetails,
  addaccountdetailsoffchain,
  deletetransactiondetailsoffchain,
  deleteaccountsoffchain,
  getaccountdetailsbydealidoffchainpendingtransaction,
} from "../../../servies/services";
import { FullscreenExit, TrainRounded } from "@material-ui/icons";
import {
  ThemeProvider,
  createTheme,
  MuiThemeProvider,
} from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import { SliderThumb } from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import { Link } from "react-router-dom";
import NumberComp2 from "../../../components/NumberComp2";
import NumberComp from "../../../components/NumberComp";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import Switch from "@material-ui/core/Switch";

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: sessionStorage.getItem("token"),
      selectedRecords: [],
      eligibleloans: {},
      tableData: [],
      tableData1: [],
      loading: false,
      getLoansLoader: false,
      open: false,
      openPopup: false,
      selectedLoanId: [],
      searchText: "",
      rowsSelected: null,
      open1: false,
      open2: false,
      open3: false,
      open4: false,
      open5: false,
      open6: false,
      open7: false,
      formData: {
        paymenttype: "",
        account: "",
        amount: "",
        description: "",
      },
      formData2: {
        paymenttype: "",
        account: "",
        amount: "",
        description: "",
      },
      formData1: {
        accountname: "",
      },
      formData3: {
        accountname: "",
      },
      offline: {
        beneficiaryName: "",
        accountNumber: "",
        routingNumber: "",
        iban: "",
        billingDetails: {
          name: "",
          line1: "",
          line2: "",
          city: "",
          district: "",
          country: "",
          postalCode: "",
        },
        bankAddress: {
          bankName: "",
          line1: "",
          line2: "",
          city: "",
          district: "",
          country: "",
          postalCode: "",
        },
      },
      offlineedit: {
        beneficiaryName: "",
        accountNumber: "",
        routingNumber: "",
        iban: "",
        billingDetails: {
          name: "",
          line1: "",
          line2: "",
          city: "",
          district: "",
          country: "",
          postalCode: "",
        },
        bankAddress: {
          bankName: "",
          line1: "",
          line2: "",
          city: "",
          district: "",
          country: "",
          postalCode: "",
        },
      },
      Redirection: sessionStorage.getItem("component"),
      poolName: sessionStorage.getItem("poolname"),
      firstname: sessionStorage.getItem("firstname"),
      UserId: sessionStorage.getItem("userid"),
      DealId: sessionStorage.getItem("dealId"),
      EmailAddress: sessionStorage.getItem("EmailAddress"),
      AccountStatus: sessionStorage.getItem("accountstatus"),
      UserRole: sessionStorage.getItem("userrole"),
      showSearchBox: false,
      screendisplay: true,
      AccountDropdown: [],
      togglevat: false,
      toggleadd: false,
      toggleinclude: false,
      wireinstructions: false,
      editwireinstructions: false,
    };
  }
  // thirdFormNumberValidate = () => {
  //   const { amount } = this.state.formData;
  //   const NumberValid = amount.match(/^[0-9]*$/i);
  //   if (NumberValid) {
  //     this.setState({ thirdFormNumberErrorMsg: "" });
  //   } else {
  //     this.setState({ thirdFormNumberErrorMsg: "Enter only positive number" });
  //   }
  // };

  // thirdFormHandleChangeNumber = (e) => {
  //   this.setState(
  //     {
  //       formData: {
  //         ...this.state.formData,
  //         amount: e.target.value,
  //       },
  //     },
  //     this.thirdFormNumberValidate
  //   );
  // };

  blockInvalidChar = (e) => {
    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();
  };

  onOpenModal = () => {
    console.log("add account popup");
    this.setState({ open1: true });
  };
  onOpenModal1 = () => {
    console.log("add transaction popup");
    this.setState({ open2: true });
  };
  EditTransaction = (
    date,
    paymenttype,
    account,
    amount,
    description,
    status,
    uniqueid
  ) => {
    console.log(
      "e",
      date,
      paymenttype,
      account,
      amount,
      description,
      status,
      uniqueid
    );
    console.log("edit transaction popup");
    console.log("togglevat", this.state.togglevat);
    console.log("status", status);
    this.setState(
      {
        date: date,
        uniqueid: uniqueid,
        togglevat: status == "Pending" ? false : true,
        formData2: {
          paymenttype: paymenttype,
          account: account,
          amount: amount,
          description: description,
        },
      },
      () => {
        console.log("togllleeeeeee", this.state.togglevat);
      }
    );
    setTimeout(() => {
      this.onOpenModal2();
    }, 1000);
  };
  onOpenModal2 = () => {
    console.log("edit transaction popup");
    console.log("togglevat222222222222", this.state.togglevat);
    this.setState({ open3: true });
  };
  handleChange = (e) => {
    // togglevat
    if (this.state.togglevat == false) {
      this.setState({ togglevat: true });
    } else {
      this.setState({ togglevat: false });
    }
  };
  handleChange1 = (e) => {
    // togglevat
    if (this.state.toggleadd == false) {
      this.setState({ toggleadd: true });
    } else {
      this.setState({ toggleadd: false });
    }
  };

  handleChange2 = (e) => {
    // togglevat
    if (this.state.wireinstructions == false) {
      this.setState({ wireinstructions: true });
    } else {
      this.setState({ wireinstructions: false });
    }
  };
  handleChange3 = (e) => {
    // togglevat
    if (this.state.editwireinstructions == false) {
      this.setState({ editwireinstructions: true });
    } else {
      this.setState({ editwireinstructions: false });
    }
  };
  handleChange4 = (e) => {
    // togglevat
    if (this.state.toggleinclude == false) {
      this.setState({ toggleinclude: true, open7: false });
      this.getaccountdetailsbydealidoffchainpendingtransaction();
    } else {
      this.setState({ toggleinclude: false, open7: false });
      this.getaccountdetailsbydealidoffchain();
    }
  };

  onOpenModal3 = (accountname, uniqueid, bankdetails1, wireinstructions) => {
    console.log("e", accountname, uniqueid, bankdetails1);
    console.log("edit account popup");
    // let xyz = JSON.parse(bankdetails1)
    // console.log("xyz", xyz)
    if (bankdetails1 == "") {
      console.log("if", bankdetails1);
      this.setState({
        open4: true,
        editwireinstructions: false,
        uniqueid: uniqueid,
        formData3: {
          accountname: accountname,
        },
        offlineedit: {
          beneficiaryName: "",
          accountNumber: "",
          routingNumber: "",
          iban: "",
          billingDetails: {
            name: "",
            line1: "",
            line2: "",
            city: "",
            district: "",
            country: "",
            postalCode: "",
          },
          bankAddress: {
            bankName: "",
            line1: "",
            line2: "",
            city: "",
            district: "",
            country: "",
            postalCode: "",
          },
        },
      });
    } else if (JSON.parse(bankdetails1).beneficiaryName == "") {
      console.log("elseif", bankdetails1);
      this.setState({
        open4: true,
        editwireinstructions: false,
        uniqueid: uniqueid,
        formData3: {
          accountname: accountname,
        },
        offlineedit: {
          beneficiaryName: "",
          accountNumber: "",
          routingNumber: "",
          iban: "",
          billingDetails: {
            name: "",
            line1: "",
            line2: "",
            city: "",
            district: "",
            country: "",
            postalCode: "",
          },
          bankAddress: {
            bankName: "",
            line1: "",
            line2: "",
            city: "",
            district: "",
            country: "",
            postalCode: "",
          },
        },
      });
    } else {
      console.log("else", bankdetails1);
      let bankdetails = JSON.parse(bankdetails1);
      console.log("bankdetails", bankdetails);
      this.setState(
        {
          open4: true,
          editwireinstructions: true,
          uniqueid: uniqueid,
          formData3: {
            accountname: accountname,
          },
          offlineedit: {
            beneficiaryName: bankdetails?.beneficiaryName
              ? bankdetails?.beneficiaryName
              : "",
            accountNumber: bankdetails?.accountNumber
              ? bankdetails?.accountNumber
              : "",
            routingNumber: bankdetails?.routingNumber
              ? bankdetails?.routingNumber
              : "",
            iban: bankdetails?.iban ? bankdetails?.iban : "",
            billingDetails: {
              name: bankdetails?.billingDetails?.name
                ? bankdetails?.billingDetails?.name
                : "",
              line1: bankdetails?.billingDetails?.line1
                ? bankdetails?.billingDetails?.line1
                : "",
              line2: bankdetails?.billingDetails?.line2
                ? bankdetails?.billingDetails?.line2
                : "",
              city: bankdetails?.billingDetails?.city
                ? bankdetails?.billingDetails?.city
                : "",
              district: bankdetails?.billingDetails?.district
                ? bankdetails?.billingDetails?.district
                : "",
              country: bankdetails?.billingDetails?.country
                ? bankdetails?.billingDetails?.country
                : "",
              postalCode: bankdetails?.billingDetails?.postalCode
                ? bankdetails?.billingDetails?.postalCode
                : "",
            },
            bankAddress: {
              bankName: bankdetails?.bankAddress?.bankName
                ? bankdetails?.bankAddress?.bankName
                : "",
              line1: bankdetails?.bankAddress?.line1
                ? bankdetails?.bankAddress?.line1
                : "",
              line2: bankdetails?.bankAddress?.line2
                ? bankdetails?.bankAddress?.line2
                : "",
              city: bankdetails?.bankAddress?.city
                ? bankdetails?.bankAddress?.city
                : "",
              district: bankdetails?.bankAddress?.district
                ? bankdetails?.bankAddress?.district
                : "",
              country: bankdetails?.bankAddress?.country
                ? bankdetails?.bankAddress?.country
                : "",
              postalCode: bankdetails?.bankAddress?.postalCode
                ? bankdetails?.bankAddress?.postalCode
                : "",
            },
          },
        },
        () => {
          console.log("togllleeeeeee", this.state.offlineedit);
        }
      );
    }
    if (wireinstructions == "no") {
      let bankdetails = this.state.offlineedit;
      console.log("bankdetails11111", bankdetails);
      this.setState(
        {
          offlineedit: {
            // beneficiaryName: bankdetails?.beneficiaryName
            //   ? bankdetails?.beneficiaryName
            //   : "",
            // accountNumber: bankdetails?.accountNumber
            //   ? bankdetails?.accountNumber
            //   : "",
            // routingNumber: bankdetails?.routingNumber
            //   ? bankdetails?.routingNumber
            //   : "",
            // iban: bankdetails?.iban ? bankdetails?.iban : "",
            billingDetails: {
              name: bankdetails?.billingDetails?.name
                ? bankdetails?.billingDetails?.name
                : "",
              line1: bankdetails?.billingDetails?.line1
                ? bankdetails?.billingDetails?.line1
                : "",
              line2: bankdetails?.billingDetails?.line2
                ? bankdetails?.billingDetails?.line2
                : "",
              city: bankdetails?.billingDetails?.city
                ? bankdetails?.billingDetails?.city
                : "",
              district: bankdetails?.billingDetails?.district
                ? bankdetails?.billingDetails?.district
                : "",
              country: bankdetails?.billingDetails?.country
                ? bankdetails?.billingDetails?.country
                : "",
              postalCode: bankdetails?.billingDetails?.postalCode
                ? bankdetails?.billingDetails?.postalCode
                : "",
            },
            // bankAddress: {
            //   bankName: bankdetails?.bankAddress?.bankName
            //     ? bankdetails?.bankAddress?.bankName
            //     : "",
            //   line1: bankdetails?.bankAddress?.line1
            //     ? bankdetails?.bankAddress?.line1
            //     : "",
            //   line2: bankdetails?.bankAddress?.line2
            //     ? bankdetails?.bankAddress?.line2
            //     : "",
            //   city: bankdetails?.bankAddress?.city
            //     ? bankdetails?.bankAddress?.city
            //     : "",
            //   district: bankdetails?.bankAddress?.district
            //     ? bankdetails?.bankAddress?.district
            //     : "",
            //   country: bankdetails?.bankAddress?.country
            //     ? bankdetails?.bankAddress?.country
            //     : "",
            //   postalCode: bankdetails?.bankAddress?.postalCode
            //     ? bankdetails?.bankAddress?.postalCode
            //     : "",
            // },
          },
        },
        () => {
          console.log("togllleeeeeee11", this.state.offlineedit);
        }
      );
    }
  };
  onOpenModal4 = (accountname, uniqueid) => {
    console.log("delete account popup");
    this.setState({
      open5: true,
      uniqueid: uniqueid,
      accountname: accountname,
    });
  };
  onOpenModal5 = (uniqueid) => {
    console.log("delete transaction popup");
    this.setState({ open6: true, uniqueid: uniqueid });
  };
  onOpenModal6 = (uniqueid) => {
    console.log("pending transaction popup");
    this.setState({ open7: true });
  };

  onCloseModal = () => {
    this.setState({
      open1: false,
      wireinstructions: false,
      formData1: {
        accountname: "",
      },
      offline: {
        beneficiaryName: "",
        accountNumber: "",
        routingNumber: "",
        iban: "",
        billingDetails: {
          name: "",
          line1: "",
          line2: "",
          city: "",
          district: "",
          country: "",
          postalCode: "",
        },
        bankAddress: {
          bankName: "",
          line1: "",
          line2: "",
          city: "",
          district: "",
          country: "",
          postalCode: "",
        },
      },
    });
  };
  onCloseModal1 = () => {
    this.setState({ open2: false });
    this.setState({
      formData: {
        paymenttype: "",
        account: "",
        amount: "",
        description: "",
      },
    });
  };
  onCloseModal2 = () => {
    this.setState({ open3: false });
  };
  onCloseModal3 = () => {
    this.setState({ open4: false });
  };
  onCloseModal4 = () => {
    this.setState({ open5: false });
  };
  onCloseModal5 = () => {
    this.setState({ open6: false });
  };
  onCloseModal6 = () => {
    this.setState({ open7: false });
  };
  onSubmit1 = (e) => {
    e.preventDefault();
    this.addaccountdetailsoffchain();
    console.log("add account");
  };
  onSubmit2 = (e) => {
    e.preventDefault();
    console.log(this.state.formData);
    console.log("add transaction");
    this.savetransactiondetailsoffchain();
  };
  onSubmit3 = (e) => {
    e.preventDefault();
    console.log("edit transaction");
    this.updatetransactiondetailsoffchain();
  };
  onSubmit4 = (e) => {
    e.preventDefault();
    this.updateaccountsoffchain();
    console.log("edit account");
  };

  handleClicks = () => {
    console.log("hello we have clicked the button");
    // this.props.history.push({
    //   pathname: this.state.Redirection,
    // });
    window.location.assign(this.state.Redirection);
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

  savetransactiondetailsoffchain = async () => {
    this.setState({ formLoader: true });
    let newData = [
      {
        trancheid: "",
        senderid: this.state.UserId,
        dealid: this.state.DealId,
        ...this.state.formData,
        status: this.state.toggleadd == false ? "Pending" : "Completed",
      },
    ];
    console.log("datata", newData);
    const APIResponse = await savetransactiondetailsoffchain(
      newData,
      this.state.token
    );

    if (APIResponse.status === 200) {
      const message = "Transaction details save success";
      this.props.enqueueSnackbar(message, {
        variant: "info",
        autoHideDuration: 3000,
      });
      this.setState({ formLoader: false });
      this.onCloseModal1();
      this.gettransactiondetailsoffchainbydealid();
      this.getaccountdetailsbydealidoffchain();
    } else {
      this.setState({ formLoader: false });
      const message = "Something went wrong";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  updatetransactiondetailsoffchain = async () => {
    this.setState({ formLoader: true });
    let newData = {
      trancheid: "",
      senderid: this.state.UserId,
      dealid: this.state.DealId,
      date: this.state.date,
      uniqueid: this.state.uniqueid,
      ...this.state.formData2,
      status: this.state.togglevat == false ? "Pending" : "Completed",
      token: this.state.token,
    };
    console.log("datata", newData);
    const APIResponse = await updatetransactiondetailsoffchain(newData);

    if (APIResponse.status === 200) {
      const message = "Transaction details update success";
      this.props.enqueueSnackbar(message, {
        variant: "info",
        autoHideDuration: 3000,
      });
      this.setState({ formLoader: false });
      this.onCloseModal2();
      this.gettransactiondetailsoffchainbydealid();
      this.getaccountdetailsbydealidoffchain();
    } else {
      this.setState({ formLoader: false });
      const message = "Something went wrong";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  gettransactiondetailsoffchainbydealid = async () => {
    this.setState({ tableData1: [], loading: true });
    var data = {};
    data.dealid = this.state.DealId;
    data.token = this.state.token;
    const APIResponse = await gettransactiondetailsoffchainbydealid(data);

    if (APIResponse.status === 200) {
      console.log("AllGetAllPoolsdata--", APIResponse);
      this.setState({
        tableData1: APIResponse.data,
        loading: false,
      });
    } else {
      this.setState({ loading: false });
      const message = "Couldn't fetch the record";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  updateaccountsoffchain = async () => {
    this.setState({ formLoader: true });
    let newData = {
      trancheid: "",
      uniqueid: this.state.uniqueid,
      ...this.state.formData3,
      AccountDetails: this.state.offlineedit,
      token: this.state.token,
    };
    console.log("datata", newData);
    const APIResponse = await updateaccountsoffchain(newData);

    if (APIResponse.status === 200) {
      const message = "Account details update success";
      this.props.enqueueSnackbar(message, {
        variant: "info",
        autoHideDuration: 3000,
      });
      this.setState({ formLoader: false });
      this.onCloseModal3();
      this.gettransactiondetailsoffchainbydealid();
      this.getaccountdetailsbydealidoffchain();
    } else {
      this.setState({ formLoader: false });
      const message = "Something went wrong";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  addaccountdetailsoffchain = async () => {
    this.setState({ formLoader: true });
    let newData = {
      dealid: this.state.DealId,
      ...this.state.formData1,
      AccountDetails: this.state.offline,
      token: this.state.token,
    };
    console.log("datata", newData);
    const APIResponse = await addaccountdetailsoffchain(newData);

    if (APIResponse.status === 200) {
      const message = "Account details save success";
      this.props.enqueueSnackbar(message, {
        variant: "info",
        autoHideDuration: 3000,
      });
      this.setState({ formLoader: false });
      this.onCloseModal();
      this.gettransactiondetailsoffchainbydealid();
      this.getaccountdetailsbydealidoffchain();
    } else {
      this.setState({ formLoader: false });
      const message = "Something went wrong";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  getaccountdetailsbydealidoffchain = async () => {
    this.setState({ tableData: [], loading: true });
    var data = {};
    data.dealid = this.state.DealId;
    data.token = this.state.token;
    const APIResponse = await getaccountdetailsbydealidoffchain(data);

    if (APIResponse.status === 200) {
      console.log("AllGetAllPoolsdata--", APIResponse);
      this.setState({
        tableData: APIResponse.data,
        loading: false,
      });
      let y = [];
      APIResponse.data.forEach(function (key, value) {
        console.log("key", key.accountname);
        console.log("value", value);
        y.push({ label: key.accountname, value: key.accountname });
      });
      console.log("y", y);
      this.setState({ AccountDropdown: y });
    } else {
      this.setState({ loading: false });
      const message = "Couldn't fetch the record";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  deletetransactiondetailsoffchain = async () => {
    this.setState({ formLoader: true });
    let newData = {
      uniqueid: this.state.uniqueid,
      token: this.state.token,
    };
    console.log("datata", newData);
    const APIResponse = await deletetransactiondetailsoffchain(newData);

    if (APIResponse.status === 200) {
      const message = "Transaction details update success";
      this.props.enqueueSnackbar(message, {
        variant: "info",
        autoHideDuration: 3000,
      });
      this.setState({ formLoader: false });
      this.onCloseModal5();
      this.gettransactiondetailsoffchainbydealid();
      this.getaccountdetailsbydealidoffchain();
    } else {
      this.setState({ formLoader: false });
      const message = "Something went wrong";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  deleteaccountsoffchain = async () => {
    this.setState({ formLoader: true });
    let newData = {
      uniqueid: this.state.uniqueid,
      token: this.state.token,
    };
    console.log("datata", newData);
    const APIResponse = await deleteaccountsoffchain(newData);

    if (APIResponse.status === 200) {
      const message = "Account details update success";
      this.props.enqueueSnackbar(message, {
        variant: "info",
        autoHideDuration: 3000,
      });
      this.setState({ formLoader: false });
      this.onCloseModal4();
      this.gettransactiondetailsoffchainbydealid();
      this.getaccountdetailsbydealidoffchain();
    } else {
      this.setState({ formLoader: false });
      const message = "Something went wrong";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  getaccountdetailsbydealidoffchainpendingtransaction = async () => {
    this.setState({ tableData: [], loading: true });
    var data = {};
    data.dealid = this.state.DealId;
    data.token = this.state.token;
    const APIResponse =
      await getaccountdetailsbydealidoffchainpendingtransaction(data);

    if (APIResponse.status === 200) {
      console.log("AllGetAllPoolsdata--", APIResponse);
      this.setState({
        tableData: APIResponse.data,
        loading: false,
      });
    } else {
      this.setState({ loading: false });
      const message = "Couldn't fetch the record";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  getUserOffchainBankDetails = async (value) => {
    var data = {};
    data.userid = this.state.UserId;
    data.token = this.state.token;
    console.log("value", value);
    data.token = this.state.token;
    const APIResponse = await getUserOffchainBankDetails(data);

    if (APIResponse.status === 200) {
      console.log("upload--", APIResponse);
      if (APIResponse.data !== {}) {
        if (this.state.UserRole == "Paying Agent") {
          let bankdetails = JSON.parse(APIResponse.data.accountdetails);
          console.log("bankdetails", bankdetails);
          this.setState(
            {
              offline: {
                // beneficiaryName: bankdetails?.beneficiaryName
                //   ? bankdetails?.beneficiaryName
                //   : "",
                // accountNumber: bankdetails?.accountNumber
                //   ? bankdetails?.accountNumber
                //   : "",
                // routingNumber: bankdetails?.routingNumber
                //   ? bankdetails?.routingNumber
                //   : "",
                // iban: bankdetails?.iban ? bankdetails?.iban : "",
                billingDetails: {
                  name: bankdetails?.billingDetails?.name
                    ? bankdetails?.billingDetails?.name
                    : "",
                  line1: bankdetails?.billingDetails?.line1
                    ? bankdetails?.billingDetails?.line1
                    : "",
                  line2: bankdetails?.billingDetails?.line2
                    ? bankdetails?.billingDetails?.line2
                    : "",
                  city: bankdetails?.billingDetails?.city
                    ? bankdetails?.billingDetails?.city
                    : "",
                  district: bankdetails?.billingDetails?.district
                    ? bankdetails?.billingDetails?.district
                    : "",
                  country: bankdetails?.billingDetails?.country
                    ? bankdetails?.billingDetails?.country
                    : "",
                  postalCode: bankdetails?.billingDetails?.postalCode
                    ? bankdetails?.billingDetails?.postalCode
                    : "",
                },
                // bankAddress: {
                //   bankName: bankdetails?.bankAddress?.bankName
                //     ? bankdetails?.bankAddress?.bankName
                //     : "",
                //   line1: bankdetails?.bankAddress?.line1
                //     ? bankdetails?.bankAddress?.line1
                //     : "",
                //   line2: bankdetails?.bankAddress?.line2
                //     ? bankdetails?.bankAddress?.line2
                //     : "",
                //   city: bankdetails?.bankAddress?.city
                //     ? bankdetails?.bankAddress?.city
                //     : "",
                //   district: bankdetails?.bankAddress?.district
                //     ? bankdetails?.bankAddress?.district
                //     : "",
                //   country: bankdetails?.bankAddress?.country
                //     ? bankdetails?.bankAddress?.country
                //     : "",
                //   postalCode: bankdetails?.bankAddress?.postalCode
                //     ? bankdetails?.bankAddress?.postalCode
                //     : "",
                // },
              },
            },
            () => {
              console.log("togllleeeeeee", this.state.offlineedit);
            }
          );
          this.setState({
            offlineedit: JSON.parse(APIResponse.data.accountdetails),
          });
        }
      }
    } else {
      const message = "Something went wrong, please try again";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  async componentDidMount() {
    var component = window.location.pathname;
    sessionStorage.setItem("component", component);
    this.gettransactiondetailsoffchainbydealid();
    this.getaccountdetailsbydealidoffchain();
    this.getUserOffchainBankDetails();
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
      onRowsSelect: this.onRowsSelect,
      onChangePage: this.onChangePage,
      rowsSelected: this.state.rowsSelected,
      rowsPerPage: [10],
      rowsPerPageOptions: false,
      jumpToPage: false,
      pagination: false,

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
    const options1 = {
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
        name: "accountname",
        label: "Name",
        options: {
          filter: false,
          sort: true,
        },
      },
      {
        name: "beginningbalance",
        label: "Beginning Balance",
        options: {
          filter: false,
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
        name: "endingbalance",
        label: "Ending Balance",
        options: {
          filter: false,
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
        name: "wirestatus",
        label: "Wire Instructions",
        options: {
          filter: false,
          sort: true,
        },
      },
      {
        name: "accountname",
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
                <div className="">
                  {this.state.UserRole == "Underwriter" ? (
                    this.state.AccountStatus == "Active" ||
                    this.state.AccountStatus == "Created" ? (
                      <span>
                        <button
                          className="popupbutton1"
                          onClick={() =>
                            this.onOpenModal3(
                              value,
                              tableMeta.rowData[5],
                              tableMeta.rowData[6]
                            )
                          }
                        >
                          Edit
                        </button>
                        <button
                          className="popupbuttons1"
                          onClick={() =>
                            this.onOpenModal4(value, tableMeta.rowData[5])
                          }
                        >
                          Delete
                        </button>
                      </span>
                    ) : (
                      <span>
                        <button
                          className="popupbutton1 login-sign_up-links button-disabled"
                          disabled
                        >
                          Edit
                        </button>
                        <button
                          className="popupbuttons1 login-sign_up-links button-disabled"
                          disabled
                        >
                          Delete
                        </button>
                      </span>
                    )
                  ) : (
                    <span>
                      <button
                        className="popupbutton1"
                        onClick={() =>
                          this.onOpenModal3(
                            value,
                            tableMeta.rowData[5],
                            tableMeta.rowData[6],
                            tableMeta.rowData[3]
                          )
                        }
                      >
                        Edit
                      </button>
                      <button
                        className="popupbuttons1"
                        onClick={() =>
                          this.onOpenModal4(value, tableMeta.rowData[5])
                        }
                      >
                        Delete
                      </button>
                    </span>
                  )}
                  {/* </Button> */}
                </div>
              </React.Fragment>
            );
          },
        },
      },
      {
        name: "uniqueid",
        label: "uniqueid",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "bankdetails",
        label: "bankdetails",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
    ];
    const columns1 = [
      {
        name: "date",
        label: "Date",
        options: {
          filter: true,
          sort: true,
        },
      },

      {
        name: "paymenttype",
        label: "Type",
        options: {
          filter: true,
          sort: true,
        },
      },

      {
        name: "account",
        label: "Account",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "amount",
        label: "Amount",
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
        name: "description",
        label: "Description",
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
        name: "date",
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
                <div className="">
                  {this.state.UserRole == "Underwriter" ? (
                    this.state.AccountStatus == "Active" ||
                    this.state.AccountStatus == "Created" ? (
                      <span>
                        <button
                          className="popupbutton1"
                          onClick={() =>
                            this.EditTransaction(
                              value,
                              tableMeta.rowData[1],
                              tableMeta.rowData[2],
                              tableMeta.rowData[3],
                              tableMeta.rowData[4],
                              tableMeta.rowData[5],
                              tableMeta.rowData[7]
                            )
                          }
                        >
                          Edit
                        </button>
                        <button
                          className="popupbuttons1"
                          onClick={() =>
                            this.onOpenModal5(tableMeta.rowData[7])
                          }
                        >
                          Delete
                        </button>
                      </span>
                    ) : (
                      <span>
                        <button
                          className="popupbutton1 login-sign_up-links button-disabled"
                          disabled
                        >
                          Edit
                        </button>
                        <button
                          className="popupbuttons1 login-sign_up-links button-disabled"
                          disabled
                        >
                          Delete
                        </button>
                      </span>
                    )
                  ) : (
                    <span>
                      <button
                        className="popupbutton1"
                        onClick={() =>
                          this.EditTransaction(
                            value,
                            tableMeta.rowData[1],
                            tableMeta.rowData[2],
                            tableMeta.rowData[3],
                            tableMeta.rowData[4],
                            tableMeta.rowData[5],
                            tableMeta.rowData[7]
                          )
                        }
                      >
                        Edit
                      </button>
                      <button
                        className="popupbuttons1"
                        onClick={() => this.onOpenModal5(tableMeta.rowData[7])}
                      >
                        Delete
                      </button>
                    </span>
                  )}
                  {/* </Button> */}
                </div>
              </React.Fragment>
            );
          },
        },
      },
      {
        name: "uniqueid",
        label: "uniqueid",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
    ];

    return (
      <React.Fragment>
        <div className="page">
          <Sidebar activeComponent={"IssuerDashboard"} />
          <div className="content1">

            <div className="page-contentofpool">
              <div className="row">
                <div className="col-12 col-sm-6 col-md-8">
                  <div className="d-flex">
                    <KeyboardBackspaceIcon
                      onClick={this.handleClicks}
                      className="left-arrow-muis1 left-arrow-servicer"
                    ></KeyboardBackspaceIcon>
                    <h3 className="headerdashboard">Deal Creation</h3>
                  </div>
                </div>
              </div>
            </div>
            {/* {this.state.getLoansLoader == false ? '' : <LinearLoader></LinearLoader>} */}

            <div className="page-content">
              <div className="row row1">
                <div className="investor-heading-container">
                  <h1 className="headerdashboard1">List of Accounts</h1>
                </div>

                <div>
                  <div className="dashboard-top-right-container1">
                    <div className="radio-input-include-pending">
                      <div className="radio1-container">
                        <Switch
                          checked={this.state.toggleinclude}
                          onChange={this.handleChange4}
                          name="togglevat"
                          inputProps={{ "aria-label": "secondary checkbox" }}
                        />
                        <p>Include Pending Transactions</p>
                      </div>
                    </div>
                    {this.state.UserRole == "Underwriter" ? (
                      this.state.AccountStatus == "Active" ||
                      this.state.AccountStatus == "Created" ? (
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          onClick={this.onOpenModal.bind(this)}
                        >
                          Add Account
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          disabled
                        >
                          Add Account
                        </Button>
                      )
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        onClick={this.onOpenModal.bind(this)}
                      >
                        Add Account
                      </Button>
                    )}
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

            <div className="page-content">
              <div className="row row1">
                <div className="investor-heading-container">
                  <h1 className="headerdashboard1">List of Transactions</h1>
                </div>

                <div>
                  <div className="dashboard-top-right-container1">
                    {this.state.UserRole == "Underwriter" ? (
                      this.state.AccountStatus == "Active" ||
                      this.state.AccountStatus == "Created" ? (
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          onClick={this.onOpenModal1.bind(this)}
                        >
                          Add Transaction
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          disabled
                        >
                          Add Transaction
                        </Button>
                      )
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        onClick={this.onOpenModal1.bind(this)}
                      >
                        Add Transaction
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              <React.Fragment>
                <div className="workbench-table-container">
                  <MuiThemeProvider theme={this.getMuiTheme()}>
                    <MUIDataTable
                      // title={'Dashboard'}
                      data={this.state.tableData1}
                      columns={columns1}
                      options={options1}
                    />
                  </MuiThemeProvider>
                </div>
              </React.Fragment>
            </div>
          </div>

          <div id="modal1">
            <ReactModal
              isOpen={this.state.open1}
              onRequestClose={this.onCloseModal}
              contentLabel="Minimal Modal Example"
              style={customStylesautoAccount}
            >
              <React.Fragment>
                <div className="modalPopup2">
                  <div className="popupTitle">
                    <h2>Add Account</h2>
                    <button
                      type="button"
                      className="closePopup"
                      style={{ minWidth: "30px" }}
                      onClick={this.onCloseModal}
                    >
                      {" "}
                      <CloseIcon></CloseIcon>{" "}
                    </button>
                  </div>

                  {/* {this.state.popupLoader === true ? <CircularProgress size="30px" color="secondary" /> : ' '} */}

                  <div className="modalshiftcontent">
                    <form className="form-container" onSubmit={this.onSubmit1}>
                      <div
                        className={
                          this.state.wireinstructions == true
                            ? "modalshiftcontent1"
                            : "modalshiftcontent2"
                        }
                      >
                        <div className="input-container-account">
                          <label className="label">Name</label>
                          <input
                            required
                            placeholder="Type here"
                            className="input"
                            type="text"
                            onChange={(e) => {
                              this.setState({
                                formData1: {
                                  ...this.state.formData1,
                                  accountname: e.target.value,
                                },
                              });
                            }}
                            value={this.state.formData1.accountname}
                          />
                        </div>

                        <div className="radio-input-container">
                          <div className="radio1-container">
                            <p>Add Wire Instructions</p>
                            <Switch
                              checked={this.state.wireinstructions}
                              onChange={this.handleChange2}
                              name="togglevat"
                              inputProps={{
                                "aria-label": "secondary checkbox",
                              }}
                            />
                          </div>
                        </div>
                        {this.state.wireinstructions == true ? (
                          <div>
                            {/* Beneficiery name */}
                            <div className="input-container-account">
                              <label className="label">Beneficiary Name</label>
                              <input
                                placeholder="Type here"
                                className="input"
                                type="text"
                                onChange={(e) => {
                                  this.setState({
                                    offline: {
                                      ...this.state.offline,
                                      beneficiaryName: e.target.value,
                                    },
                                  });
                                }}
                                value={this.state.offline.beneficiaryName}
                                required
                              />
                            </div>

                            {/* Account Number */}
                            <div className="input-container-account">
                              <label className="label">Account Number</label>
                              <input
                                onKeyDown={this.blockInvalidChar}
                                placeholder="Type here"
                                className="input"
                                type="number"
                                onChange={(e) => {
                                  this.setState({
                                    offline: {
                                      ...this.state.offline,
                                      accountNumber: e.target.value,
                                    },
                                  });
                                }}
                                value={this.state.offline.accountNumber}
                                required
                              />
                            </div>

                            {/* Routing Number */}
                            <div className="input-container-account">
                              <label className="label">Routing Number</label>
                              <input
                                onKeyDown={this.blockInvalidChar}
                                placeholder="Type here"
                                className="input"
                                type="number"
                                onChange={(e) => {
                                  this.setState({
                                    offline: {
                                      ...this.state.offline,
                                      routingNumber: e.target.value,
                                    },
                                  });
                                }}
                                value={this.state.offline.routingNumber}
                                required
                              />
                            </div>
                            {/* IBAN*/}
                            <div className="input-container-account">
                              <label className="label">
                                IBAN (if applicable)
                              </label>
                              <input
                                placeholder="Type here"
                                className="input"
                                type="text"
                                onChange={(e) => {
                                  this.setState({
                                    offline: {
                                      ...this.state.offline,
                                      iban: e.target.value,
                                    },
                                  });
                                }}
                                value={this.state.offline.iban}
                                // required
                              />
                            </div>
                            {/* Billing Name */}
                            <div className="input-container-account">
                              <label className="label">Billing Name</label>
                              <input
                                placeholder="Type here"
                                className="input"
                                type="text"
                                onChange={(e) => {
                                  this.setState({
                                    offline: {
                                      ...this.state.offline,
                                      billingDetails: {
                                        ...this.state.offline.billingDetails,
                                        name: e.target?.value,
                                      },
                                    },
                                  });
                                }}
                                value={this.state.offline?.billingDetails?.name}
                                required
                              />
                            </div>

                            {/* Billing Add Line 1 */}
                            <div className="input-container-account">
                              <label className="label">
                                Billing Address Line 1
                              </label>
                              <input
                                placeholder="Type here"
                                className="input"
                                type="text"
                                onChange={(e) => {
                                  this.setState({
                                    offline: {
                                      ...this.state.offline,
                                      billingDetails: {
                                        ...this.state.offline.billingDetails,
                                        line1: e.target?.value,
                                      },
                                    },
                                  });
                                }}
                                value={
                                  this.state.offline?.billingDetails?.line1
                                }
                                required
                              />
                            </div>

                            {/* Billing Address Line 2 */}
                            <div className="input-container-account">
                              <label className="label">
                                Billing Address Line 2
                              </label>
                              <input
                                placeholder="Type here"
                                className="input"
                                type="text"
                                onChange={(e) => {
                                  this.setState({
                                    offline: {
                                      ...this.state.offline,
                                      billingDetails: {
                                        ...this.state.offline.billingDetails,
                                        line2: e.target?.value,
                                      },
                                    },
                                  });
                                }}
                                value={
                                  this.state.offline?.billingDetails?.line2
                                }
                                required
                              />
                            </div>

                            {/* Billing City */}
                            <div className="input-container-account">
                              <label className="label">Billing City</label>
                              <input
                                placeholder="Type here"
                                className="input"
                                type="text"
                                onChange={(e) => {
                                  this.setState({
                                    offline: {
                                      ...this.state.offline,
                                      billingDetails: {
                                        ...this.state.offline.billingDetails,
                                        city: e.target?.value,
                                      },
                                    },
                                  });
                                }}
                                value={this.state.offline?.billingDetails?.city}
                                required
                              />
                            </div>

                            {/* Billing District */}
                            <div className="input-container-account">
                              <label className="label">
                                Billing State/District
                              </label>
                              <input
                                placeholder="Type here"
                                className="input"
                                type="text"
                                onChange={(e) => {
                                  this.setState({
                                    offline: {
                                      ...this.state.offline,
                                      billingDetails: {
                                        ...this.state.offline.billingDetails,
                                        district: e.target?.value,
                                      },
                                    },
                                  });
                                }}
                                value={
                                  this.state.offline?.billingDetails?.district
                                }
                                required
                              />
                            </div>
                            {/* Billing Country */}
                            <div className="input-container-account">
                              <label className="label">
                                Billing Country Code
                              </label>
                              <input
                                placeholder="Type here"
                                className="input"
                                type="number"
                                onKeyDown={this.blockInvalidChar}
                                onChange={(e) => {
                                  this.setState({
                                    offline: {
                                      ...this.state.offline,
                                      billingDetails: {
                                        ...this.state.offline.billingDetails,
                                        country: e.target?.value,
                                      },
                                    },
                                  });
                                }}
                                value={
                                  this.state.offline?.billingDetails?.country
                                }
                                required
                              />
                            </div>

                            {/* Billing Postalcode */}
                            <div className="input-container-account">
                              <label className="label">
                                Billing Postal Code
                              </label>
                              <input
                                onKeyDown={this.blockInvalidChar}
                                placeholder="Type here"
                                className="input"
                                type="number"
                                onChange={(e) => {
                                  this.setState({
                                    offline: {
                                      ...this.state.offline,
                                      billingDetails: {
                                        ...this.state.offline.billingDetails,
                                        postalCode: e.target?.value,
                                      },
                                    },
                                  });
                                }}
                                value={
                                  this.state.offline?.billingDetails?.postalCode
                                }
                                required
                              />
                            </div>

                            {/* Bank Name */}
                            <div className="input-container-account">
                              <label className="label">Bank Name</label>
                              <input
                                placeholder="Type here"
                                className="input"
                                type="text"
                                onChange={(e) => {
                                  this.setState({
                                    offline: {
                                      ...this.state.offline,
                                      bankAddress: {
                                        ...this.state.offline.bankAddress,
                                        bankName: e.target?.value,
                                      },
                                    },
                                  });
                                }}
                                value={
                                  this.state.offline?.bankAddress?.bankName
                                }
                                required
                              />
                            </div>

                            {/* Bank Addres Line 1 */}
                            <div className="input-container-account">
                              <label className="label">
                                Bank Address Line 1
                              </label>
                              <input
                                placeholder="Type here"
                                className="input"
                                type="text"
                                onChange={(e) => {
                                  this.setState({
                                    offline: {
                                      ...this.state.offline,
                                      bankAddress: {
                                        ...this.state.offline.bankAddress,
                                        line1: e.target?.value,
                                      },
                                    },
                                  });
                                }}
                                value={this.state.offline?.bankAddress?.line1}
                                required
                              />
                            </div>

                            {/* Bank Addres Line 2 */}
                            <div className="input-container-account">
                              <label className="label">
                                Bank Address Line 2
                              </label>
                              <input
                                required
                                placeholder="Type here"
                                className="input"
                                type="text"
                                onChange={(e) => {
                                  this.setState({
                                    offline: {
                                      ...this.state.offline,
                                      bankAddress: {
                                        ...this.state.offline.bankAddress,
                                        line2: e.target?.value,
                                      },
                                    },
                                  });
                                }}
                                value={this.state.offline?.bankAddress?.line2}
                              />
                            </div>

                            {/* Bank Address City */}
                            <div className="input-container-account">
                              <label className="label">Bank Address City</label>
                              <input
                                placeholder="Type here"
                                className="input"
                                type="text"
                                onChange={(e) => {
                                  this.setState({
                                    offline: {
                                      ...this.state.offline,
                                      bankAddress: {
                                        ...this.state.offline.bankAddress,
                                        city: e.target?.value,
                                      },
                                    },
                                  });
                                }}
                                value={this.state.offline?.bankAddress?.city}
                                required
                              />
                            </div>

                            {/* Bank Address District */}
                            <div className="input-container-account">
                              <label className="label">
                                Bank Address District/State
                              </label>
                              <input
                                placeholder="Type here"
                                className="input"
                                type="text"
                                onChange={(e) => {
                                  this.setState({
                                    offline: {
                                      ...this.state.offline,
                                      bankAddress: {
                                        ...this.state.offline.bankAddress,
                                        district: e.target?.value,
                                      },
                                    },
                                  });
                                }}
                                value={
                                  this.state.offline?.bankAddress?.district
                                }
                                required
                              />
                            </div>

                            {/* Bank Address Country Code */}
                            <div className="input-container-account">
                              <label className="label">
                                Bank Address Country Code{" "}
                              </label>
                              <input
                                placeholder="Type here"
                                className="input"
                                type="number"
                                onKeyDown={this.blockInvalidChar}
                                onChange={(e) => {
                                  this.setState({
                                    offline: {
                                      ...this.state.offline,
                                      bankAddress: {
                                        ...this.state.offline.bankAddress,
                                        country: e.target?.value,
                                      },
                                    },
                                  });
                                }}
                                value={this.state.offline?.bankAddress?.country}
                                required
                              />
                            </div>
                            {/* Bank PostalCode */}
                            <div className="input-container-account">
                              <label className="label">Bank Postal Code</label>
                              <input
                                onKeyDown={this.blockInvalidChar}
                                placeholder="Type here"
                                className="input"
                                type="number"
                                onChange={(e) => {
                                  this.setState({
                                    offline: {
                                      ...this.state.offline,
                                      bankAddress: {
                                        ...this.state.offline.bankAddress,
                                        postalCode: e.target?.value,
                                      },
                                    },
                                  });
                                }}
                                value={
                                  this.state.offline?.bankAddress?.postalCode
                                }
                                required
                              />
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>

                      <div className="modalsubmit">
                        <div className="submitbuttonbg">
                          <div className="row">
                            <div className="row justify-content-addtrans">
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

          <div id="modal1">
            <ReactModal
              isOpen={this.state.open4}
              onRequestClose={this.onCloseModal3}
              contentLabel="Minimal Modal Example"
              style={customStylesautoAccount}
            >
              <React.Fragment>
                <div className="modalPopup2">
                  <div className="popupTitle">
                    <h2>Edit Account</h2>
                    <button
                      type="button"
                      className="closePopup"
                      style={{ minWidth: "30px" }}
                      onClick={this.onCloseModal3}
                    >
                      {" "}
                      <CloseIcon></CloseIcon>{" "}
                    </button>
                  </div>
                  {/* {this.state.popupLoader === true ? <CircularProgress size="30px" color="secondary" /> : ' '} */}

                  <div className="modalshiftcontent">
                    <form className="form-container" onSubmit={this.onSubmit4}>
                      <div
                        className={
                          this.state.editwireinstructions == true
                            ? "modalshiftcontent1"
                            : "modalshiftcontent2"
                        }
                      >
                        <div className="input-container-account">
                          <label className="label">Name</label>
                          <input
                            required
                            placeholder="Type here"
                            className="input"
                            type="text"
                            onChange={(e) => {
                              this.setState({
                                formData3: {
                                  ...this.state.formData3,
                                  accountname: e.target.value,
                                },
                              });
                            }}
                            value={this.state.formData3.accountname}
                          />
                        </div>

                        <div className="radio-input-container">
                          <div className="radio1-container">
                            <p>Add Wire Instructions</p>
                            <Switch
                              checked={this.state.editwireinstructions}
                              onChange={this.handleChange3}
                              name="togglevat"
                              inputProps={{
                                "aria-label": "secondary checkbox",
                              }}
                            />
                          </div>
                        </div>

                        {this.state.editwireinstructions == true ? (
                          <div>
                            {/* Beneficiery name */}
                            <div className="input-container-account">
                              <label className="label">Beneficiary Name</label>
                              <input
                                required
                                placeholder="Type here"
                                className="input"
                                type="text"
                                onChange={(e) => {
                                  this.setState({
                                    offlineedit: {
                                      ...this.state.offlineedit,
                                      beneficiaryName: e.target.value,
                                    },
                                  });
                                }}
                                value={this.state.offlineedit.beneficiaryName}
                                // required
                              />
                            </div>

                            {/* Account Number */}
                            <div className="input-container-account">
                              <label className="label">Account Number</label>
                              <input
                                onKeyDown={this.blockInvalidChar}
                                required
                                placeholder="Type here"
                                className="input"
                                type="number"
                                onChange={(e) => {
                                  this.setState({
                                    offlineedit: {
                                      ...this.state.offlineedit,
                                      accountNumber: e.target.value,
                                    },
                                  });
                                }}
                                value={this.state.offlineedit.accountNumber}
                                // required
                              />
                            </div>

                            {/* Routing Number */}
                            <div className="input-container-account">
                              <label className="label">Routing Number</label>
                              <input
                                required
                                onKeyDown={this.blockInvalidChar}
                                placeholder="Type here"
                                className="input"
                                type="number"
                                onChange={(e) => {
                                  this.setState({
                                    offlineedit: {
                                      ...this.state.offlineedit,
                                      routingNumber: e.target.value,
                                    },
                                  });
                                }}
                                value={this.state.offlineedit.routingNumber}
                                // required
                              />
                            </div>
                            {/* IBAN*/}
                            <div className="input-container-account">
                              <label className="label">
                                IBAN (if applicable)
                              </label>
                              <input
                                placeholder="Type here"
                                className="input"
                                type="text"
                                onChange={(e) => {
                                  this.setState({
                                    offlineedit: {
                                      ...this.state.offlineedit,
                                      iban: e.target.value,
                                    },
                                  });
                                }}
                                value={this.state.offlineedit.iban}
                                // required
                              />
                            </div>
                            {/* Billing Name */}
                            <div className="input-container-account">
                              <label className="label">Billing Name</label>
                              <input
                                required
                                placeholder="Type here"
                                className="input"
                                type="text"
                                onChange={(e) => {
                                  this.setState({
                                    offlineedit: {
                                      ...this.state.offlineedit,
                                      billingDetails: {
                                        ...this.state.offlineedit
                                          .billingDetails,
                                        name: e.target?.value,
                                      },
                                    },
                                  });
                                }}
                                value={
                                  this.state.offlineedit?.billingDetails?.name
                                }
                                // required
                              />
                            </div>

                            {/* Billing Add Line 1 */}
                            <div className="input-container-account">
                              <label className="label">
                                Billing Address Line 1
                              </label>
                              <input
                                required
                                placeholder="Type here"
                                className="input"
                                type="text"
                                onChange={(e) => {
                                  this.setState({
                                    offlineedit: {
                                      ...this.state.offlineedit,
                                      billingDetails: {
                                        ...this.state.offlineedit
                                          .billingDetails,
                                        line1: e.target?.value,
                                      },
                                    },
                                  });
                                }}
                                value={
                                  this.state.offlineedit?.billingDetails?.line1
                                }
                                // required
                              />
                            </div>

                            {/* Billing Address Line 2 */}
                            <div className="input-container-account">
                              <label className="label">
                                Billing Address Line 2
                              </label>
                              <input
                                required
                                placeholder="Type here"
                                className="input"
                                type="text"
                                onChange={(e) => {
                                  this.setState({
                                    offlineedit: {
                                      ...this.state.offlineedit,
                                      billingDetails: {
                                        ...this.state.offlineedit
                                          .billingDetails,
                                        line2: e.target?.value,
                                      },
                                    },
                                  });
                                }}
                                value={
                                  this.state.offlineedit?.billingDetails?.line2
                                }
                                // required
                              />
                            </div>

                            {/* Billing City */}
                            <div className="input-container-account">
                              <label className="label">Billing City</label>
                              <input
                                required
                                placeholder="Type here"
                                className="input"
                                type="text"
                                onChange={(e) => {
                                  this.setState({
                                    offlineedit: {
                                      ...this.state.offlineedit,
                                      billingDetails: {
                                        ...this.state.offlineedit
                                          .billingDetails,
                                        city: e.target?.value,
                                      },
                                    },
                                  });
                                }}
                                value={
                                  this.state.offlineedit?.billingDetails?.city
                                }
                                // required
                              />
                            </div>

                            {/* Billing District */}
                            <div className="input-container-account">
                              <label className="label">
                                Billing State/District
                              </label>
                              <input
                                required
                                placeholder="Type here"
                                className="input"
                                type="text"
                                onChange={(e) => {
                                  this.setState({
                                    offlineedit: {
                                      ...this.state.offlineedit,
                                      billingDetails: {
                                        ...this.state.offlineedit
                                          .billingDetails,
                                        district: e.target?.value,
                                      },
                                    },
                                  });
                                }}
                                value={
                                  this.state.offlineedit?.billingDetails
                                    ?.district
                                }
                                // required
                              />
                            </div>
                            {/* Billing Country */}
                            <div className="input-container-account">
                              <label className="label">
                                Billing Country Code
                              </label>
                              <input
                                required
                                placeholder="Type here"
                                className="input"
                                type="number"
                                onKeyDown={this.blockInvalidChar}
                                onChange={(e) => {
                                  this.setState({
                                    offlineedit: {
                                      ...this.state.offlineedit,
                                      billingDetails: {
                                        ...this.state.offlineedit
                                          .billingDetails,
                                        country: e.target?.value,
                                      },
                                    },
                                  });
                                }}
                                value={
                                  this.state.offlineedit?.billingDetails
                                    ?.country
                                }
                                // required
                              />
                            </div>

                            {/* Billing Postalcode */}
                            <div className="input-container-account">
                              <label className="label">
                                Billing Postal Code
                              </label>
                              <input
                                onKeyDown={this.blockInvalidChar}
                                required
                                placeholder="Type here"
                                className="input"
                                type="number"
                                onChange={(e) => {
                                  this.setState({
                                    offlineedit: {
                                      ...this.state.offlineedit,
                                      billingDetails: {
                                        ...this.state.offlineedit
                                          .billingDetails,
                                        postalCode: e.target?.value,
                                      },
                                    },
                                  });
                                }}
                                value={
                                  this.state.offlineedit?.billingDetails
                                    ?.postalCode
                                }
                                // required
                              />
                            </div>

                            {/* Bank Name */}
                            <div className="input-container-account">
                              <label className="label">Bank Name</label>
                              <input
                                required
                                placeholder="Type here"
                                className="input"
                                type="text"
                                onChange={(e) => {
                                  this.setState({
                                    offlineedit: {
                                      ...this.state.offlineedit,
                                      bankAddress: {
                                        ...this.state.offlineedit.bankAddress,
                                        bankName: e.target?.value,
                                      },
                                    },
                                  });
                                }}
                                value={
                                  this.state.offlineedit?.bankAddress?.bankName
                                }
                                // required
                              />
                            </div>

                            {/* Bank Addres Line 1 */}
                            <div className="input-container-account">
                              <label className="label">
                                Bank Address Line 1
                              </label>
                              <input
                                placeholder="Type here"
                                className="input"
                                type="text"
                                onChange={(e) => {
                                  this.setState({
                                    offlineedit: {
                                      ...this.state.offlineedit,
                                      bankAddress: {
                                        ...this.state.offlineedit.bankAddress,
                                        line1: e.target?.value,
                                      },
                                    },
                                  });
                                }}
                                value={
                                  this.state.offlineedit?.bankAddress?.line1
                                }
                                required
                              />
                            </div>

                            {/* Bank Addres Line 2 */}
                            <div className="input-container-account">
                              <label className="label">
                                Bank Address Line 2
                              </label>
                              <input
                                required
                                placeholder="Type here"
                                className="input"
                                type="text"
                                onChange={(e) => {
                                  this.setState({
                                    offlineedit: {
                                      ...this.state.offlineedit,
                                      bankAddress: {
                                        ...this.state.offlineedit.bankAddress,
                                        line2: e.target?.value,
                                      },
                                    },
                                  });
                                }}
                                value={
                                  this.state.offlineedit?.bankAddress?.line2
                                }
                              />
                            </div>

                            {/* Bank Address City */}
                            <div className="input-container-account">
                              <label className="label">Bank Address City</label>
                              <input
                                placeholder="Type here"
                                className="input"
                                type="text"
                                onChange={(e) => {
                                  this.setState({
                                    offlineedit: {
                                      ...this.state.offlineedit,
                                      bankAddress: {
                                        ...this.state.offlineedit.bankAddress,
                                        city: e.target?.value,
                                      },
                                    },
                                  });
                                }}
                                value={
                                  this.state.offlineedit?.bankAddress?.city
                                }
                                required
                              />
                            </div>

                            {/* Bank Address District */}
                            <div className="input-container-account">
                              <label className="label">
                                Bank Address District/State
                              </label>
                              <input
                                placeholder="Type here"
                                className="input"
                                type="text"
                                onChange={(e) => {
                                  this.setState({
                                    offlineedit: {
                                      ...this.state.offlineedit,
                                      bankAddress: {
                                        ...this.state.offlineedit.bankAddress,
                                        district: e.target?.value,
                                      },
                                    },
                                  });
                                }}
                                value={
                                  this.state.offlineedit?.bankAddress?.district
                                }
                                required
                              />
                            </div>

                            {/* Bank Address Country Code */}
                            <div className="input-container-account">
                              <label className="label">
                                Bank Address Country Code{" "}
                              </label>
                              <input
                                required
                                placeholder="Type here"
                                className="input"
                                type="number"
                                onKeyDown={this.blockInvalidChar}
                                onChange={(e) => {
                                  this.setState({
                                    offlineedit: {
                                      ...this.state.offlineedit,
                                      bankAddress: {
                                        ...this.state.offlineedit.bankAddress,
                                        country: e.target?.value,
                                      },
                                    },
                                  });
                                }}
                                value={
                                  this.state.offlineedit?.bankAddress?.country
                                }
                                // required
                              />
                            </div>
                            {/* Bank PostalCode */}
                            <div className="input-container-account">
                              <label className="label">Bank Postal Code</label>
                              <input
                                onKeyDown={this.blockInvalidChar}
                                placeholder="Type here"
                                className="input"
                                type="number"
                                onChange={(e) => {
                                  this.setState({
                                    offlineedit: {
                                      ...this.state.offlineedit,
                                      bankAddress: {
                                        ...this.state.offlineedit.bankAddress,
                                        postalCode: e.target?.value,
                                      },
                                    },
                                  });
                                }}
                                value={
                                  this.state.offlineedit?.bankAddress
                                    ?.postalCode
                                }
                                required
                              />
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>

                      <div className="modalsubmit">
                        <div className="submitbuttonbg">
                          <div className="row">
                            <div className="row justify-content-addacc">
                              <button
                                type="button"
                                className="popupbutton22"
                                onClick={this.onCloseModal3}
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
          </div>

          <div id="modal">
            {/* <Modal open={open1} onClose={this.onCloseModal1} center>
                    <div id="modalheader">
                      <h5>Create a Pool</h5>

                    </div> */}
            <ReactModal
              isOpen={this.state.open2}
              onRequestClose={this.onCloseModal1}
              contentLabel="Minimal Modal Example"
              style={customStylesauto}
            >
              <React.Fragment>
                <div className="modalPopup2">
                  <div className="popupTitle">
                    <h2>Add Transaction</h2>
                    <button
                      type="button"
                      className="closePopup"
                      style={{ minWidth: "30px" }}
                      onClick={this.onCloseModal1}
                    >
                      {" "}
                      <CloseIcon></CloseIcon>{" "}
                    </button>
                  </div>
                  {/* {this.state.popupLoader === true ? <CircularProgress size="30px" color="secondary" /> : ' '} */}

                  <div className="modalshiftcontent">
                    <form className="form-container" onSubmit={this.onSubmit2}>
                      <div className="input-container">
                        <label className="label">Type</label>
                        <select
                          required
                          className="input-select"
                          onChange={(e) => {
                            this.setState({
                              formData: {
                                ...this.state.formData,
                                paymenttype: e.target.value,
                              },
                            });
                          }}
                          value={this.state.formData.paymenttype}
                        >
                          <option value="" disabled>
                            Select any one
                          </option>
                          <option value="Investment">Investment</option>
                          <option value="Remittance">Remittance</option>
                          <option value="Payments">Payments</option>
                          <option value="Outgoing">Outgoing</option>
                          <option value="Incoming">Incoming</option>
                        </select>
                      </div>

                      <div className="input-container">
                        <label className="label">Account</label>
                        {this.state.getLoansLoader == false ? (
                          <select
                            required
                            className="input-select"
                            onChange={(e) => {
                              this.setState({
                                formData: {
                                  ...this.state.formData,
                                  account: e.target.value,
                                },
                              });
                            }}
                            value={this.state.formData.account}
                          >
                            <option value="" disabled className="selectclass">
                              Select any one
                            </option>
                            {this.state.AccountDropdown.map((item) => {
                              return (
                                <option value={item.value}>{item.label}</option>
                              );
                            })}
                          </select>
                        ) : (
                          <FormLoader></FormLoader>
                        )}
                      </div>

                      <div className="input-container">
                        <label className="label">Amount</label>

                        <input
                          required
                          placeholder="Type here"
                          className="input"
                          type="number"
                          onKeyDown={this.blockInvalidChar}
                          onChange={(e) => {
                            this.setState({
                              formData: {
                                ...this.state.formData,
                                amount: e.target.value,
                              },
                            });
                          }}
                          value={this.state.formData.amount}
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
                                description: e.target.value,
                              },
                            });
                          }}
                          value={this.state.formData.description}
                        />
                      </div>

                      <div className="radio-input-container">
                        <p>Status</p>
                        <div className="radio1-container">
                          <p>Pending</p>
                          <Switch
                            checked={this.state.toggleadd}
                            onChange={this.handleChange1}
                            name="togglevat"
                            inputProps={{ "aria-label": "secondary checkbox" }}
                          />
                          <p>Completed</p>
                        </div>
                      </div>

                      <div className="modalsubmit">
                        <div className="submitbuttonbg">
                          <div className="row">
                            <div className="row justify-content-addedit">
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
          </div>

          <div id="modal">
            {/* <Modal open={open1} onClose={this.onCloseModal1} center>
                    <div id="modalheader">
                      <h5>Create a Pool</h5>

                    </div> */}
            <ReactModal
              isOpen={this.state.open3}
              onRequestClose={this.onCloseModal2}
              contentLabel="Minimal Modal Example"
              style={customStylesauto}
            >
              <React.Fragment>
                <div className="modalPopup2">
                  <div className="popupTitle">
                  <h2>Edit Transaction</h2>
                  <button
                    type="button"
                    className="closePopup"
                    style={{ minWidth: "30px" }}
                    onClick={this.onCloseModal2}
                  >
                    {" "}
                    <CloseIcon></CloseIcon>{" "}
                  </button>
</div>
                  {/* {this.state.popupLoader === true ? <CircularProgress size="30px" color="secondary" /> : ' '} */}

                  <div className="modalshiftcontent">
                    <form className="form-container" onSubmit={this.onSubmit3}>
                      <div className="input-container">
                        <label className="label">Type</label>
                        <select
                          required
                          className="input-select"
                          onChange={(e) => {
                            this.setState({
                              formData2: {
                                ...this.state.formData2,
                                paymenttype: e.target.value,
                              },
                            });
                          }}
                          value={this.state.formData2.paymenttype}
                        >
                          <option value="" disabled className="selectclass">
                            Select Any One{" "}
                          </option>
                          <option value="Investment">Investment</option>
                          <option value="Remittance">Remittance</option>
                          <option value="Payments">Payments</option>
                          <option value="Outgoing">Outgoing</option>
                          <option value="Incoming">Incoming</option>
                        </select>
                      </div>

                      <div className="input-container">
                        <label className="label">Account</label>
                        {this.state.getLoansLoader == false ? (
                          <select
                            required
                            className="input-select"
                            onChange={(e) => {
                              this.setState({
                                formData2: {
                                  ...this.state.formData2,
                                  account: e.target.value,
                                },
                              });
                            }}
                            value={this.state.formData2.account}
                          >
                            <option value="" disabled className="selectclass">
                              Select Any One{" "}
                            </option>
                            {this.state.AccountDropdown.map((item) => {
                              return (
                                <option value={item.value}>{item.label}</option>
                              );
                            })}
                          </select>
                        ) : (
                          <FormLoader></FormLoader>
                        )}
                      </div>

                      <div className="input-container">
                        <label className="label">Amount</label>

                        <input
                          required
                          placeholder="Type here"
                          className="input"
                          type="number"
                          onKeyDown={this.blockInvalidChar}
                          onChange={(e) => {
                            this.setState({
                              formData2: {
                                ...this.state.formData2,
                                amount: e.target.value,
                              },
                            });
                          }}
                          value={this.state.formData2.amount}
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
                              formData2: {
                                ...this.state.formData2,
                                description: e.target.value,
                              },
                            });
                          }}
                          value={this.state.formData2.description}
                        />
                      </div>

                      {/* <div className="radio-input-container">
                        <p>Status</p>
                        <div className="radio1-container">
                          <p>Pending</p>
                          <div class="switch1">
                            <label for="three" class="switch1__label"></label>
                            {this.state.formData2.status == false ?
                            <input
                              name="switch1"
                              id="three"
                              type="radio"
                              value={false}
                              onChange={(e) => {
                                this.setState({
                                  formData2: {
                                    ...this.state.formData2,
                                    status: false,
                                  },
                                });
                              }}
                            />:
                            <input
                              name="switch1"
                              id="four"
                              type="radio"
                              value={true}
                              onChange={(e) => {
                                this.setState({
                                  formData2: {
                                    ...this.state.formData2,
                                    status: true,
                                  },
                                });
                              }}
                            />}
                            <label for="four" class="switch1__label"></label>
                            <div class="switch1__indicator">
                              <div className="fields-radion-button-center" />
                            </div>
                          </div>
                          <p>Completed</p>
                        </div>
                      </div> */}
                      <div className="radio-input-container">
                        <p>Status</p>
                        <div className="radio1-container">
                          <p>Pending</p>
                          <Switch
                            checked={this.state.togglevat}
                            onChange={this.handleChange}
                            name="togglevat"
                            inputProps={{ "aria-label": "secondary checkbox" }}
                          />
                          <p>Completed</p>
                        </div>
                      </div>

                      <div className="modalsubmit">
                        <div className="submitbuttonbg">
                          <div className="row">
                            <div className="row justify-content-addedit">
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

                    {/* {this.state.getLoansLoader === false ? '' : <FormLoader></FormLoader>} */}
                    {/* {this.state.openPopup === true ? <React.Fragment><Snackbar msg={"Processor addded Successfully" || this.state.message} open="true" /> </React.Fragment> : ' '} */}
                  </div>
                </div>
              </React.Fragment>
            </ReactModal>
          </div>

          <div id="modal1">
            <ReactModal
              isOpen={this.state.open5}
              onRequestClose={this.onCloseModal4}
              contentLabel="Minimal Modal Example"
              style={customStylesautosmallmodal1}
            >
              <React.Fragment>
                <div className="modalPopup2">
                  <h3 className="popupheading">
                    Are you sure, you want to Delete the "
                    {this.state.accountname}" Account?
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
                              onClick={this.onCloseModal4}
                            >
                              {" "}
                              No{" "}
                            </button>

                            <Button
                              variant="contained"
                              color="primary"
                              type="submit"
                              onClick={this.deleteaccountsoffchain}
                            >
                              Yes, Delete it
                              {this.state.formLoader === true ? (
                                <CircularProgress size="25px" color="primary" />
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

          <div id="modal1">
            <ReactModal
              isOpen={this.state.open6}
              onRequestClose={this.onCloseModal5}
              contentLabel="Minimal Modal Example"
              style={customStylesautosmallmodal1}
            >
              <React.Fragment>
                <div className="modalPopup2">
                  <h3 className="popupheading">
                    Are you sure, you want to Delete this Transaction?
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
                              onClick={this.onCloseModal5}
                            >
                              {" "}
                              No{" "}
                            </button>

                            <Button
                              variant="contained"
                              color="primary"
                              type="submit"
                              onClick={this.deletetransactiondetailsoffchain}
                            >
                              Yes, Delete it
                              {this.state.formLoader === true ? (
                                <CircularProgress size="25px" color="primary" />
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
        </div>
      </React.Fragment>
    );
  }
}

export default withSnackbar(Account);
