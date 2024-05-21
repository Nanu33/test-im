/* eslint-disable require-jsdoc */
import React, { Component } from "react";
// import { connect } from 'react-redux';
import Sidebar from "../../../../components/sidebar";
import MUIDataTable from "mui-datatables";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Loader from "../../../../components/loader";
import Snackbar from "../../../../components/snackbar";
import LinearLoader from "../../../../components/loader/LinearLoader";
import axios from "axios";
import CloseIcon from "@material-ui/icons/Close";
import { withSnackbar } from "notistack";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Theme as MuiTheme } from "rjsf-material-ui";
import ReactModal from "react-modal";
import {
  customStylesautosmallmodal,
  customStylesServicer,
  customStylesPAPopup,
  customStylesPATablePopup,
  customStylesPopupInveststep,
  customStylesServicerTablePopup,
} from "../../../../components/customscripts/customscript";
import FormLoader from "../../../../components/loader/formLoader";
import {
  NextAPI,
  getPreviousDealDetails,
  getDealDetailsbyDealIdPostClosing,
  RecurringsetupDateQuery,
  PoolDetails,
  getwiretransferdetails,
  downloadpayagentdetails,
  updatedealreviewstatus,
  SaveTransactionDetails,
  getTransferTableDetails,
  getpayingagenttransactiondetails,
  updateUSDCtransferstatus,
  transferUSDCtoInvestor,
  getaccountdetailsbydealidoffchain,
  getpayingagentoffchainwiredetails,
  savetransactiondetailsoffchain,
  updatepostclosingscreenstatus,
  DownloadIPFSFile,
} from "../../../../servies/services";
import Match from "../../../../images/match.png";
import Mismatch from "../../../../images/mismatch.png";
import PropTypes from "prop-types";
import { FullscreenExit, TrainRounded } from "@material-ui/icons";
import {
  ThemeProvider,
  createTheme,
  MuiThemeProvider,
} from "@material-ui/core/styles";
import "react-input-range/lib/css/index.css";
import VisibilityIcon from "@material-ui/icons/Visibility";
import DownloadIcon from "@mui/icons-material/Download";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ethers } from "ethers";
import { TODO_LIST_ABI, TODO_LIST_ADDRESS } from "./config";

import Web3 from "web3";
import NumberComp from "../../../../components/NumberComp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Iframe from "react-iframe";
import NumberComp2 from "../../../../components/NumberComp2";
import Logo2 from "../../../../images/wellslogored.png";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { CopyToClipboard } from "react-copy-to-clipboard";
import $ from "jquery";

class PaymentAgentDealDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      downArrow: true,
      selectedRecords: [],
      eligibleloans: {},
      tableData: [],
      tableData1: [],
      tableDataTransfer: [],
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
      open8: false,
      open9: false,
      formData1: {
        note: "",
      },
      formData: {
        date: "",
      },
      formData2: {
        account: "",
      },
      formData3: {
        documentname: "",
        description: "",
        privacymode: "",
      },
      approach: ".xlsx",
      poolName: sessionStorage.getItem("poolname"),
      dealId: sessionStorage.getItem("dealId"),
      token: sessionStorage.getItem("token"),
      UserId: sessionStorage.getItem("userid"),

      Redirection: sessionStorage.getItem("component"),
      activeInsights1: true,
      activeInsights2: false,
      activeInsights3: false,
      showSearchBox: false,
      file: "",
      initialSetUpApproach1: true,
      initialSetUpApproach2: false,
      initialSetUpApproach3: false,
      editpopupdetails: [],
      paymentRules: [],
      dealData: {},
      importantDetails: {},
      poolCollections: {},
      loanData: [],
      servicerData: {},
      dealDocuments: [],
      screenloader: true,
      DateFilter: [],
      bdbUrl: "",
      transferbuttonstatus: "Transfered",
      step3status: false,
      processingTimePopup1: false,
      importantPopup1: false,
      AccountDropdown: [],
      BankData: [
        {
          AccountDetails: {
            beneficiaryName: "",
            accountNumber: "11111111111",
            routingNumber: "121000248",
            iban: "",
            billingDetails: {
              name: "Satoshi Nakamoto",
              line1: "100 Money Street",
              line2: "Suite 1",
              city: "Boston",
              district: "MA",
              country: "US",
              postalCode: "01234",
            },
            bankAddress: {
              bankName: "San Francisco",
              line1: "100 Money Street",
              line2: "Suite 1",
              city: "Boston",
              district: "MA",
              country: "US",
              postalCode: "01234",
            },
          },
        },
      ],
    };
  }

  onOpenModal5 = (e) => {
    console.log("e", e);
    this.setState({
      open9: true,
      documentDetail: e,
      formData3: {
        documentname: e.documentname,
        description: e.description,
        privacymode: e.privacymode,
      },
    });
  };
  onCloseModal5 = () => {
    this.setState({ open9: false });
  };

  TransferPopupOpen = () => {
    console.log("transfer popup");
    this.setState({ open7: true, open8: false });
  };
  WireInstructionPopupOpen = (index) => {
    console.log("Wire intructions popup");
    var amount, bankdetails;
    $("#viewServicerData2 tbody tr")
      .eq(index)
      .each(function (row, tr) {
        console.log("ROW", row, "tr", tr);
        amount = $(tr).find("td:eq(2)").text();
        bankdetails = $(tr).find("td:eq(3)").text();
        console.log("amountttt", amount, bankdetails);
        // senddata[row] = {
        //     'id': $(tr).find("td:eq(0) input[type='text']").val(),
        //     'def': $(tr).find("td:eq(1) input[type='text']").val(),
        //     'fieldcode': $(tr).find("td:eq(2) input[type='text']").val(),
        //     'section': $(tr).find('td:eq(3)').find('select').val(),
        //     'descp': $(tr).find("td:eq(4) textarea[type='text']").val(),
        // };
      });
    this.setState({
      open8: true,
      open7: false,
      amount: amount,
      BankData: JSON.parse(bankdetails),
    });
  };

  CompleteTransferPopupData = async () => {
    let fromarr = [];
    $("#viewServicerData2 tbody tr").each(function (row, tr) {
      console.log("ROW", row, "tr", tr);
      fromarr[row] = {
        from: $(tr).find("td:eq(0)").find("select").val(),
        amount: $(tr).find("td:eq(2)").text(),
      };
    });
    console.log("fromarr", fromarr);
    this.setState({ formLoader: true });
    let y = [];
    fromarr.map((data) => {
      console.log("data", data);
      let paying = {
        trancheid: "",
        senderid: this.state.UserId,
        dealid: this.state.dealId,
        paymenttype: "Payments",
        account: data.from,
        description: "Paying Agent's Transaction",
        amount: data.amount,
        status: "Pending",
      };
      y.push(paying);
    });
    console.log("y", y);
    const APIResponse = await savetransactiondetailsoffchain(
      y,
      this.state.token
    );

    if (APIResponse.status === 200) {
      // const message = "Transaction details save success";
      // this.props.enqueueSnackbar(message, {
      //   variant: "info",
      //   autoHideDuration: 3000,
      // });
      this.setState({ formLoader: true });
      this.updatepostclosingscreenstatus();
    } else {
      this.setState({ formLoader: false });
      const message = "Something went wrong";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };
  updatepostclosingscreenstatus = async () => {
    this.setState({ formLoader: true });
    var data = {};
    data.dealid = this.state.dealId;
    data.month = this.state.month;
    data.year = this.state.year;
    data.PAstatusoffhain = "Completed";
    data.token = this.state.token;
    console.log("datata", data);
    const APIResponse = await updatepostclosingscreenstatus(data);

    if (APIResponse.status === 200) {
      const message = "Transaction details save success";
      this.props.enqueueSnackbar(message, {
        variant: "info",
        autoHideDuration: 3000,
      });
      this.setState({ formLoader: false });
      this.TransferPopupClose();
      this.getDealDetailsbyDealIdPostClosing();
    } else {
      this.setState({ formLoader: false });
      const message = "Something went wrong";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  TransferPopupClose = () => {
    this.setState({ open7: false, open8: false });
  };
  WireInstructionPopupClose = () => {
    this.setState({ open8: false, open7: true });
  };
  handleProcessingTime1 = () => {
    this.setState({ processingTimePopup1: true, open8: false });
  };
  handleOkProcessingTime1 = () => {
    this.setState({ processingTimePopup1: false, open8: true });
  };
  onOpenModal = () => {
    console.log("inside modal1");
    this.setState({ open1: true });
  };
  onOpenModal1 = () => {
    console.log("inside modal1");
    this.setState({ open2: true });
  };
  onOpenModal2 = () => {
    console.log("Reject modal");
    this.setState({ open3: true, open2: false });
  };
  onOpenModal3 = () => {
    console.log("Approve Modal");
    this.setState({ open4: true, open2: false });
  };
  onOpenModal4 = () => {
    console.log("Approve Modal");
    this.setState({ open5: true });
  };
  Step3ModalOpen = (trancheid, investorid, totalpaid, transferbuttonstatus) => {
    console.log("step3/4 modal3");
    this.setState({
      open6: true,
      open5: false,
      step: "step3",
      trancheid: trancheid,
      investorid: investorid,
      totalpaid: totalpaid,
      transferbuttonstatus: transferbuttonstatus,
    });
    this.getpayingagenttransactiondetails(investorid);
  };
  Step3ModalClose = () => {
    this.setState({ open6: false });
  };
  handleImportantDetails3 = () => {
    if (this.state.dealData.paymentmode == "offchain") {
      this.setState({ importantPopup1: true, open8: false });
    } else {
      this.setState({ importantPopup1: true, open6: false });
    }
  };

  handleOkImportantDetailsPopup3 = () => {
    if (this.state.dealData.paymentmode == "offchain") {
      this.setState({ importantPopup1: false, open8: true });
    } else {
      this.setState({ importantPopup1: false, open6: true });
    }
  };

  onCloseModal = () => {
    this.setState({ open1: false });
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
  onCloseModal4 = () => {
    this.setState({ open5: false });
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
  handleClicks = () => {
    this.props.history.push({
      pathname: this.state.Redirection,
    });
  };
  onSubmit1 = (e) => {
    e.preventDefault();
    console.log(this.state.formData);
    console.log("hello we have clicked the button");
    this.SubmitDate();
    // this.setState({ formData: value.formData })
  };

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

  SubmitDate = () => {
    console.log("submitdate", this.state.formData.date);
    let selectdate = this.state.formData.date;
    let month = selectdate.slice(0, 2);
    let year = selectdate.slice(6, 10);
    console.log("date", year, month);
    this.setState({ month: month, year: year });
    this.getDealDetailsbyDealIdPostClosing();
  };

  updatedealreviewstatus = async (value) => {
    var data = {};
    data.dealid = this.state.dealId;
    data.status = value;
    console.log("value", value);
    this.setState({ formLoader: true });
    data.token = this.state.token;
    const APIResponse = await updatedealreviewstatus(data);

    if (APIResponse.status === 200) {
      console.log("upload--", APIResponse);
      this.getDealDetailsbyDealIdPostClosing();
      this.setState({ formLoader: false, open4: false, open5: false });

      const message = "Status Update Successful";
      this.props.enqueueSnackbar(message, {
        variant: "info",
        autoHideDuration: 2000,
      });
    } else {
      this.setState({ formLoader: false });
      const message = "Something went wrong, please try again";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  getPreviousDealDetails = async () => {
    var data = {};
    data.dealid = this.state.dealId;
    this.setState({ formLoader: true });
    data.token = this.state.token;
    const APIResponse = await getPreviousDealDetails(data);

    if (APIResponse.status === 200) {
      this.setState({ formLoader: false, DateFilter: APIResponse.data });
      // const message = "Successfully saved";
      // this.props.enqueueSnackbar(message, {
      //   variant: "info",
      //   autoHideDuration: 2000,
      // });
      console.log("upload--", APIResponse);
    } else {
      this.setState({ formLoader: false });
      const message = "Something went wrong, please try again";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  RecurringsetupDateQuery = async (value) => {
    var data = {};
    data.dealid = this.state.dealId;
    console.log("value", value);
    this.setState({ screenloader: true });
    data.token = this.state.token;
    const APIResponse = await RecurringsetupDateQuery(data);

    if (APIResponse.status === 200) {
      console.log("upload--", APIResponse);
      this.setState({
        screenloader: true,
        month: APIResponse.data[0].month,
        year: APIResponse.data[0].year,
      });
      this.getDealDetailsbyDealIdPostClosing();
      this.bdbapi();
      this.getTransferTableDetails();
    } else {
      this.setState({ screenloader: false });
      const message = "Something went wrong, please try again";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  downloadpayagentdetails = async () => {
    let data = {};
    data.dealid = this.state.dealId;
    data.month = this.state.month;
    data.year = this.state.year;
    data.token = this.state.token;
    const APIResponse = await downloadpayagentdetails(data);
    const file_name =
      this.state.dealData.dealName +
      "-" +
      this.state.month +
      "-" +
      this.state.year +
      ".xls";

    startDownload(APIResponse.data, file_name);
    function startDownload(file, fileName) {
      const url = window.URL.createObjectURL(new Blob([file]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    }
  };

  getDealDetailsbyDealIdPostClosing = async () => {
    var data = {};
    data.dealid = this.state.dealId;
    data.month = this.state.month;
    data.year = this.state.year;
    console.log("datata", data);
    this.setState({ screenloader: true, open1: false });
    data.token = this.state.token;
    // this.setState({
    //   screenloader: false,
    //   importantDetails:{},
    //   poolCollections:{},
    //   loanData: [],
    //   servicerData: {},
    //   dealData:{},
    //   tableData: [],
    //   paymentRules: [],
    //   dealDocuments:[],
    // });
    const APIResponse = await getDealDetailsbyDealIdPostClosing(data);

    if (APIResponse.status === 200) {
      this.setState({
        screenloader: false,
        importantDetails: APIResponse.data.importantDetails,
        poolCollections: APIResponse.data.poolCollections,
        loanData: APIResponse.data.loanData,
        servicerData: APIResponse.data.servicerData,
        dealData: APIResponse.data.dealData,
        tableData: APIResponse.data.trancheData,
        paymentRules: APIResponse.data.paymentRules,
        dealDocuments: APIResponse.data.dealDocuments,
        reviewstatus: APIResponse.data.reviewstatus,
        PAstatusoffhain: APIResponse.data.PAstatusoffhain,
      });
      sessionStorage.setItem(
        "paymentmode",
        APIResponse.data.dealData.paymentmode
      );
      if (APIResponse.data.dealData.paymentmode == "offchain") {
        this.getpayingagentoffchainwiredetails();
      }
      console.log("servicerData", APIResponse.data.servicerData);
      // const message = "Deal Document Update Success";
      // this.props.enqueueSnackbar(message, {
      //   variant: "info",
      //   autoHideDuration: 3000,
      // });
    } else {
      this.setState({ screenloader: false });

      const message = "Couldn't create the deal";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  getpayingagentoffchainwiredetails = async () => {
    var data = {};
    data.dealid = this.state.dealId;
    data.month = this.state.month;
    data.year = this.state.year;
    console.log("datata", data);
    data.token = this.state.token;
    const APIResponse = await getpayingagentoffchainwiredetails(data);

    if (APIResponse.status === 200) {
      this.setState({
        tableDataTransfer: APIResponse.data,
      });
    } else {
      const message = "Something went wrong";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  PoolDetails = async () => {
    // var data = {};
    // data.contractaddress = "0xFD6380543eDc62EB255746DED6b7d39baAa414a1"
    // data.poolid = this.state.dealId;
    // data.token = this.state.token;
    // console.log("formdata", data);
    // this.setState({getLoansLoader: true});
    // const APIResponse = await PoolDetails(data);

    // if (APIResponse.status === 200) {
    //   console.log("AllGetAllPoolsdata--", APIResponse);
    //   sessionStorage.setItem(
    //     "pooldetailsdata",
    //     JSON.stringify(APIResponse.data)
    //   );
    this.props.history.push("/admin/pooldetails");
    // } else {
    //   const message = "Couldn't fetch the record";
    //   this.props.enqueueSnackbar(message, {
    //     variant: "error",
    //     autoHideDuration: 3000,
    //   });
    // }
  };
  bdbapi = async () => {
    let poolidold = JSON.stringify({
      DealID: {
        type: "in",
        value: [this.state.dealId],
      },
      Month: {
        type: "in",
        value: [this.state.month],
      },
      Year: {
        type: "in",
        value: [this.state.year],
      },
    });
    console.log("poolidold", poolidold);
    let mailid = "support@bdb.ai";
    let password = "Intain@321";
    const res = await axios.get(
      "https://bdb.imtest.intainmarkets.us/api/v1/imarkets/link?type=" +
        "postclosing" +
        "&mailid=" +
        mailid +
        "&password=" +
        password
    );
    if (res.status == 204) {
      this.setState({ bdbUrl: "UrlBdbNew", bdb_loader: false });
    } else {
      let UrlBdbNew =
        "https://analytics.intainmarkets.us/home/#/opendocument?data=" +
        res.data +
        "&customGlobalFilter=" +
        encodeURIComponent(poolidold);
      this.setState({ bdbUrl: UrlBdbNew, bdb_loader: false });
    }
  };

  meta = async () => {
    this.setState({ formloadmetamask: true, step3status: true });
    const web3 = new Web3(Web3.givenProvider || "http://localhost:3000");

    let chainId = 43113;
    console.log("net v", window.ethereum.networkVersion);
    if (window.ethereum.networkVersion !== chainId) {
      console.log("BEFORE TRYY");
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: web3.utils.toHex(chainId) }],
        });
        console.log("TRYYY");
        this.newfun();
      } catch (err) {
        console.log("BEFORE error code", err.code);
        // This error code indicates that the chain has not been added to MetaMask
        if (err.code === 4902) {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainName: "Avalanche FUJI C-Chain",
                chainId: web3.utils.toHex(chainId),
                nativeCurrency: { name: "AVAX", decimals: 18, symbol: "AVAX" },
                rpcUrls: ["https://api.avax-test.network/ext/bc/C/rpc"],
              },
            ],
          });
          console.log("CATCH");
          this.newfun();
        }
      }
      console.log("After CATCH");
    } else {
      this.newfun();
    }
  };

  newfun = async (account) => {
    this.setState({ formloadmetamask: true, step3status: true });
    // web3.eth
    //   .getBalance("0xC60B683D1835B72A1f3CdAE3ac29b49607F0176D")
    //   .then(console.log);

    const web3 = new Web3(Web3.givenProvider || "http://localhost:3000");
    let accounts = await web3.eth.getAccounts();

    if (accounts[0] == this.state.PayingagentCchain) {
      this.setState({ account: accounts[0] });
      console.log("DYnamic value" + accounts[0]);
      this.transfer(accounts[0]);
    } else {
      accounts = await window.ethereum
        .request({
          method: "wallet_requestPermissions",
          params: [{ eth_accounts: {} }],
        })
        .then(() => window.ethereum.request({ method: "eth_requestAccounts" }));
      console.log("request permission1", accounts);
      this.setState({ account: accounts[0] });
      console.log("request permission2" + accounts[0]);
      this.transfer(accounts[0]);
    }
  };

  transfer = async (account) => {
    this.setState({ formloadmetamask: true, step3status: true });

    const web3 = new Web3(Web3.givenProvider || "http://localhost:3000");
    // web3.eth
    //   .getBalance("0xC60B683D1835B72A1f3CdAE3ac29b49607F0176D")
    //   .then(console.log);

    const todoList = new web3.eth.Contract(TODO_LIST_ABI, TODO_LIST_ADDRESS);
    todoList.methods
      .transfer(
        this.state.InvestorCchain,
        Math.round(
          parseFloat(this.state.totalpaid) * Math.pow(10, 6)
        ).toString()
      )
      .send({ from: account })
      .once("receipt", (receipt) => {
        console.log("SUccess", JSON.stringify(receipt));
        var from = receipt.events.Transfer.returnValues.from;
        var to = receipt.events.Transfer.returnValues.to;
        var value = (
          parseInt(receipt.events.Transfer.returnValues.value) *
          Math.pow(10, -6)
        ).toString();
        var transactionHash = receipt.events.Transfer.transactionHash;
        var tokendeployedaddress = this.state.tokendeployedaddress;
        console.log(
          "NEXT API REQ",
          from,
          to,
          value,
          transactionHash,
          tokendeployedaddress
        );
        this.setState({
          formloadmetamask: false,
          receipt: receipt,
          step3nextbutton: true,
          step3status: false,
        });
        const message = "Metamask Transaction Successfull";

        this.props.enqueueSnackbar(message, {
          variant: "info",
          autoHideDuration: 5000,
        });
        this.SaveTransactionDetails();
      })
      .then("receipt", (receipt) => {
        this.setState({ formloadmetamask: false, step3status: false });

        console.log("Reject", JSON.stringify(receipt));
        if (receipt.message.includes("User denied transaction signature")) {
          const message = "User Denied Transaction Signature";

          this.props.enqueueSnackbar(message, {
            variant: "error",
            autoHideDuration: 5000,
          });
        } else {
        }
        // this.setState({ loading: false })
      })
      .catch((e) => alert(e.message));
  };

  SaveTransactionDetails = async () => {
    console.log("hello");
    this.setState({
      formloadmetamask: true,
      step3status: true,
      step3statuslayerzero: true,
    });
    var data = {};
    var receipt = this.state.receipt;
    data.senderid = receipt.events.Transfer.returnValues.from;
    data.receiverid = receipt.events.Transfer.returnValues.to;
    data.amountpaid = receipt.events.Transfer.returnValues.value;
    data.transactionHash = receipt.events.Transfer.transactionHash;
    data.dealid = this.state.dealId;
    data.trancheid = this.state.trancheid;
    console.log("world");
    // console.log("NEXT API REQ",from,to,value,transactionHash,tokendeployedaddress)
    data.token = this.state.token;
    const APIResponse = await SaveTransactionDetails(data);
    if (APIResponse.data.success == true) {
      this.setState({ formloadmetamask: true, step3status: true });
      this.updateUSDCtransferstatus();
    } else {
      const message = "Token Transfer Failed";

      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 5000,
      });
      this.setState({ formloadmetamask: false, step3status: false });
    }
  };

  updateUSDCtransferstatus = async () => {
    console.log("hello");
    this.setState({ formloadmetamask: true, step3status: true });
    var data = {};
    data.dealid = this.state.dealId;
    data.trancheid = this.state.trancheid;
    data.investorid = this.state.investorid;
    data.month = this.state.month;
    data.year = this.state.year;
    data.transferUSDCstatus = "Transfered";
    data.token = this.state.token;
    console.log("data", data);
    const APIResponse = await updateUSDCtransferstatus(data);
    if (APIResponse.data.success == true) {
      this.setState({ formloadmetamask: false, step3status: false });
      this.getTransferTableDetails();
    } else {
      const message = "USDC transfer Status Failed";

      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 5000,
      });
      this.setState({ formloadmetamask: false, step3status: false });
    }
  };

  getTransferTableDetails = async () => {
    this.setState({ tableData1: [] });
    var data = {};
    data.dealid = this.state.dealId;
    data.month = this.state.month;
    data.year = this.state.year;

    data.token = this.state.token;
    const APIResponse = await getTransferTableDetails(data);

    if (APIResponse.status == 200) {
      console.log("upload--", APIResponse);
      this.setState({ tableData1: APIResponse.data });
    } else {
      const message = "Something went wrong, please try again";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  getpayingagenttransactiondetails = async (value) => {
    var data = {};
    data.investorid = value;
    data.payingagentid = this.state.UserId;
    data.token = this.state.token;
    const APIResponse = await getpayingagenttransactiondetails(data);

    if (APIResponse.status === 200) {
      console.log("upload--", APIResponse);
      this.setState({
        PayingagentCchain: APIResponse.data.PayingagentCchain,
        InvestorCchain: APIResponse.data.InvestorCchain,
      });
    } else {
      const message = "Something went wrong, please try again";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  renderRows() {
    return this.state.tableDataTransfer
      ? this.state.tableDataTransfer.map((item, index) => (
          <React.Fragment>
            <React.Fragment>
              <tr key={item.key}>
                <td>
                  {this.state.getLoansLoader == false ? (
                    <select
                      required
                      className="input-select"
                      value={item.value}
                    >
                      <option value="" disabled className="selectclass">
                        Select any one
                      </option>
                      {this.state.AccountDropdown.map((item) => {
                        return <option value={item.value}>{item.label}</option>;
                      })}
                    </select>
                  ) : (
                    <FormLoader></FormLoader>
                  )}
                </td>
                <td>{item.investorname}</td>
                <td>{item.totalpaid}</td>
                <td hidden>{item.bankdetails}</td>
                <td>
                  <buton
                    type="button"
                    onClick={() => this.WireInstructionPopupOpen(index)}
                    className="login-sign_up-links"
                  >
                    Wire Instruction
                  </buton>
                </td>
              </tr>
            </React.Fragment>
          </React.Fragment>
        ))
      : null;
  }
  getaccountdetailsbydealidoffchain = async () => {
    this.setState({ getLoansLoader: true, tableData: [], loading: true });
    var data = {};
    data.dealid = this.state.dealId;
    data.token = this.state.token;
    const APIResponse = await getaccountdetailsbydealidoffchain(data);

    if (APIResponse.status === 200) {
      console.log("AllGetAllPoolsdata--", APIResponse);
      this.setState({
        getLoansLoader: false,
        loading: false,
      });
      let z = [];
      let y = [];
      APIResponse.data.forEach(function (key, value) {
        console.log("key", key.accountname);
        console.log("value", value);
        z.push({ label: key.accountname, value: key.accountname });
      });
      console.log("z", z);
      this.setState({ AccountDropdown: z });
    } else {
      this.setState({ getLoansLoader: false, loading: false });
      const message = "Couldn't fetch the record";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };
  DownloadIPFSFile = async (e) => {
    let filetype = e.filetype.split(".");
    let path = e.documentpath;
    console.log("filetype", filetype[1], path);
    if (filetype[1] === "pdf") {
      let data = {};
      data.documentid = e.documentid;
      data.token = this.state.token;
      const APIResponse = await DownloadIPFSFile(data, filetype[1]);
      const file_name = e.filetype;
      const token = this.state.token;
      console.log("token", token);
      startDownload(APIResponse.data, file_name);
      console.log("APIResponse", APIResponse.data);
      function startDownload(file, file_name) {
        let data = new Buffer.from(file);
        const pdffile = new Blob([data], { type: "application/pdf" });
        const downloadLink = document.createElement("a");
        const url = window.URL.createObjectURL(pdffile);
        downloadLink.href = url;
        downloadLink.download = file_name;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      }
    } else {
      let data = {};
      data.documentid = e.documentid;
      data.token = this.state.token;
      const APIResponse = await DownloadIPFSFile(data, filetype[1]);
      const file_name = e.filetype;
      startDownload(APIResponse.data, file_name);
      function startDownload(file, file_name) {
        const url = window.URL.createObjectURL(new Blob([file]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", file_name);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      }
    }
  };

  async componentDidMount() {
    this.RecurringsetupDateQuery();
    this.getPreviousDealDetails();
    this.getaccountdetailsbydealidoffchain();
    // this.getpayingagenttransactiondetails()
    // this.getDealDetailsbyDealIdPostClosing()
    this.bdbapi();
    var component = window.location.pathname;
    sessionStorage.setItem("component", component);

    // const APIResponse = {
    //   message: "successfull",
    //   isSuccess: true,
    //   data: [
    //     {
    //       to: "Credit Capital Corp",
    //       amount: "1000",
    //       bankdetails: "{\"beneficiaryName\":\"Satoshi Nakamoto\",\"accountNumber\":\"11111111111\",\"routingNumber\":\"121000248\",\"iban\":\"\",\"billingDetails\":{\"name\":\"Satoshi Nakamoto\",\"line1\":\"100 Money Street\",\"line2\":\"Suite 1\",\"city\":\"Boston\",\"district\":\"MA\",\"country\":\"US\",\"postalCode\":\"01234\"},\"bankAddress\":{\"bankName\":\"San Francisco\",\"line1\":\"100 Money Street\",\"line2\":\"Suite 1\",\"city\":\"testcity\",\"district\":\"MA\",\"country\":\"US\",\"postalCode\":\"01234\"}}"
    //     },
    //     {
    //       to: "Money Lender Inc",
    //       amount: "2000",
    //       bankdetails: "{\"beneficiaryName\":\"Satoshi Nakamoto\",\"accountNumber\":\"11111111111\",\"routingNumber\":\"121000248\",\"iban\":\"\",\"billingDetails\":{\"name\":\"Satoshi Nakamoto\",\"line1\":\"100 Money Street\",\"line2\":\"Suite 1\",\"city\":\"Boston\",\"district\":\"MA\",\"country\":\"US\",\"postalCode\":\"01234\"},\"bankAddress\":{\"bankName\":\"San Francisco\",\"line1\":\"100 Money Street\",\"line2\":\"Suite 1\",\"city\":\"testcity\",\"district\":\"MA\",\"country\":\"US\",\"postalCode\":\"01234\"}}"
    //     },
    //     {
    //       to: "Money Lender Inc",
    //       amount: "3000",
    //       bankdetails: "{\"beneficiaryName\":\"Satoshi Nakamoto\",\"accountNumber\":\"11111111111\",\"routingNumber\":\"121000248\",\"iban\":\"\",\"billingDetails\":{\"name\":\"Satoshi Nakamoto\",\"line1\":\"100 Money Street\",\"line2\":\"Suite 1\",\"city\":\"Boston\",\"district\":\"MA\",\"country\":\"US\",\"postalCode\":\"01234\"},\"bankAddress\":{\"bankName\":\"San Francisco\",\"line1\":\"100 Money Street\",\"line2\":\"Suite 1\",\"city\":\"testcity\",\"district\":\"MA\",\"country\":\"US\",\"postalCode\":\"01234\"}}"

    //     },
    //     {
    //       to: "Credit Capital Corp",
    //       amount: "4000",
    //       bankdetails: "{\"beneficiaryName\":\"Satoshi Nakamoto\",\"accountNumber\":\"11111111111\",\"routingNumber\":\"121000248\",\"iban\":\"\",\"billingDetails\":{\"name\":\"Satoshi Nakamoto\",\"line1\":\"100 Money Street\",\"line2\":\"Suite 1\",\"city\":\"Boston\",\"district\":\"MA\",\"country\":\"US\",\"postalCode\":\"01234\"},\"bankAddress\":{\"bankName\":\"San Francisco\",\"line1\":\"100 Money Street\",\"line2\":\"Suite 1\",\"city\":\"testcity\",\"district\":\"MA\",\"country\":\"US\",\"postalCode\":\"01234\"}}"

    //     },
    //   ],
    // };
    // this.setState({ tableDataTransfer: APIResponse.data });
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
              backgroundColor: "#FAFAFA !important",
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

  popoverBottom = () => {
    return (
      <Popover className="servicer-popover-container">
        <button style={{ paddingTop: "15px" }} onClick={() => this.PoolDetails()}>View Pool Details</button>
        <hr className="servicer-popover-hr" />
        <button onClick={() => this.onOpenModal()}>
          View Previous Deal Details
        </button>
        <hr className="servicer-popover-hr" />
        <button style={{ paddingBottom: "15px" }} onClick={() => this.Redirect()}>View Account Details</button>
      </Popover>
    );
  };
  Redirect = () => {
    this.props.history.push({
      pathname: "/admin/account",
    });
  };

  fistTableData = (tableData) => {
    if (tableData == undefined) {
      return <div></div>;
    } else {
      console.log("tableData", tableData);
      const headingArr = Object.keys(tableData[0]);
      console.log(tableData);
      return (
        <table className="table-servicer">
          <tr>
            {headingArr.map((heading) => (
              <th className="servicer-data-table-heading">{heading}</th>
            ))}
          </tr>
          {tableData.map((data) => (
            <tr>
              {headingArr.map((element) => (
                <td>{data[element]}</td>
              ))}
            </tr>
          ))}
        </table>
      );
    }
  };

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
      rowsPerPage: [5],
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

    const columns = [
      {
        name: "Tranche ID",
        label: "Tranche ID",
        options: {
          filter: true,
          sort: true,
          customHeadRender: (columnMeta, updateDirection) => (
            <th
              style={{
                backgroundColor: "rgba(1, 142, 130, 0.1)",
                borderBottom: "none",
                paddingBottom: "10px",
                paddingTop: "10px",
                textAlign: "center",
              }}
            >
              {columnMeta.label}
            </th>
          ),
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <React.Fragment>
                <div className="text-left">{value}</div>
              </React.Fragment>
            );
          },
        },
      },

      {
        name: "Tranche Name",
        label: "Tranche Name",
        options: {
          filter: true,
          sort: true,
          customHeadRender: (columnMeta, updateDirection) => (
            <th
              style={{
                backgroundColor: "rgba(1, 142, 130, 0.1)",
                borderBottom: "none",
                paddingBottom: "10px",
                paddingTop: "10px",
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
        name: "Beginning Balance",
        label: "Beginning Balance",
        options: {
          filter: true,
          sort: true,
          customHeadRender: (columnMeta, updateDirection) => (
            <th
              style={{
                backgroundColor: "rgba(1, 142, 130, 0.1)",
                borderBottom: "none",
                paddingBottom: "10px",
                paddingTop: "10px",
                textAlign: "center",
              }}
            >
              {columnMeta.label}
            </th>
          ),
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <React.Fragment>
                <div className="text-right">
                  <NumberComp2 value={value}></NumberComp2>
                </div>
              </React.Fragment>
            );
          },
        },
      },

      {
        name: "Interest Paid",
        label: "Interest Paid",
        options: {
          filter: true,
          sort: true,
          customHeadRender: (columnMeta, updateDirection) => (
            <th
              style={{
                backgroundColor: "rgba(1, 142, 130, 0.1)",
                borderBottom: "none",
                paddingBottom: "10px",
                paddingTop: "10px",
                textAlign: "center",
              }}
            >
              {columnMeta.label}
            </th>
          ),
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <React.Fragment>
                <div className="text-right">
                  <NumberComp2 value={value}></NumberComp2>
                </div>
              </React.Fragment>
            );
          },
        },
      },

      {
        name: "Principal Paid",
        label: "Principal Paid",
        options: {
          filter: true,
          sort: true,
          customHeadRender: (columnMeta, updateDirection) => (
            <th
              style={{
                backgroundColor: "rgba(1, 142, 130, 0.1)",
                borderBottom: "none",
                paddingBottom: "10px",
                paddingTop: "10px",
                textAlign: "center",
              }}
            >
              {columnMeta.label}
            </th>
          ),
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <React.Fragment>
                <div className="text-right">
                  <NumberComp2 value={value}></NumberComp2>
                </div>
              </React.Fragment>
            );
          },
        },
      },
      {
        name: "Total Paid",
        label: "Total Paid",
        options: {
          filter: true,
          sort: true,
          customHeadRender: (columnMeta, updateDirection) => (
            <th
              style={{
                backgroundColor: "rgba(1, 142, 130, 0.1)",
                borderBottom: "none",
                paddingBottom: "10px",
                paddingTop: "10px",
                textAlign: "center",
              }}
            >
              {columnMeta.label}
            </th>
          ),
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <React.Fragment>
                <div className="text-right">
                  <NumberComp2 value={value}></NumberComp2>
                </div>
              </React.Fragment>
            );
          },
        },
      },
      {
        name: "Ending Balance",
        label: "Ending Balance",
        options: {
          filter: true,
          sort: true,
          customHeadRender: (columnMeta, updateDirection) => (
            <th
              style={{
                backgroundColor: "rgba(1, 142, 130, 0.1)",
                borderBottom: "none",
                paddingBottom: "10px",
                paddingTop: "10px",
                textAlign: "center",
              }}
            >
              {columnMeta.label}
            </th>
          ),
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <React.Fragment>
                <div className="text-right">
                  <NumberComp2 value={value}></NumberComp2>
                </div>
              </React.Fragment>
            );
          },
        },
      },

      // {
      //   name: "Tranche ID",
      //   label: "Actions",
      //   options: {
      //     filter: false,
      //     sort: false,
      //     customHeadRender: (columnMeta, updateDirection) => (
      //       <th
      //         style={{
      //           backgroundColor: "rgba(1, 142, 130, 0.1)",
      //           borderBottom: "none",
      //           paddingBottom: "5px",
      //           paddingTop: "5px",
      //           textAlign: "center",
      //         }}
      //       >
      //         {columnMeta.label}
      //       </th>
      //     ),
      //     customBodyRender: (value, tableMeta, updateValue) => {
      //       return (
      //         <React.Fragment>
      //           <div className="text-center">
      //             {/* <Button variant="outlined" id="optionalbutton" type="submit" onClick={this.onOpenModal1.bind(this)}> */}
      //             <buton
      //               type="button"
      //               onClick={this.meta}
      //               className="login-sign_up-links"
      //             >
      //               View Details
      //             </buton>
      //             {/* </Button> */}
      //           </div>
      //         </React.Fragment>
      //       );
      //     },
      //   },
      // },
    ];

    const columns1 = [
      {
        name: "trancheid",
        label: "Tranche Name",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "tranchename",
        label: "Tranche Name",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "investorid",
        label: "Investor Name",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
      {
        name: "investorname",
        label: "Investor Name",
        options: {
          filter: true,
          sort: true,
        },
      },

      {
        name: "totalpaid",
        label: "Total Paid",
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
        name: "trancheid",
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
                  {tableMeta.rowData[6] == "Transfered" ? (
                    <buton
                      type="button"
                      disabled
                      //  onClick={()=>this.Step3ModalOpen(value,
                      //    tableMeta.rowData[2],
                      //    tableMeta.rowData[4],
                      //    tableMeta.rowData[6])}
                      className="login-sign_up-links button-disabled"
                    >
                      Transfer Link
                    </buton>
                  ) : (
                    <buton
                      type="button"
                      onClick={() =>
                        this.Step3ModalOpen(
                          value,
                          tableMeta.rowData[2],
                          tableMeta.rowData[4],
                          tableMeta.rowData[6]
                        )
                      }
                      className="login-sign_up-links"
                    >
                      Transfer Link
                    </buton>
                  )}
                  {/* </Button> */}
                </div>
              </React.Fragment>
            );
          },
        },
      },
      {
        name: "USDCtransferstatus",
        label: "USDCtransferstatus",
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
          <Sidebar activeComponent={"PayingAgentDeal"} />
          <div className="content1">
            {this.state.screenloader == true ? (
              <LinearLoader></LinearLoader>
            ) : (
              <div className="page-contentofpool1">
                <div className="row1">
                  <div className="col-12 col-sm-6 col-md-8 d-flex justigy-content-center align-center hellocard">
                    <KeyboardBackspaceIcon
                      onClick={this.handleClicks}
                      className="left-arrow-muis1 left-arrow-servicer"
                    ></KeyboardBackspaceIcon>
                    <h3 className="headerdashboard">Deal Details</h3>
                  </div>
                  <div className="col-12 col-sm-6 col-md-4 hellocard">
                    <div className="buttonsverified uw-deal-details-button-container">
                      <OverlayTrigger
                        rootClose
                        trigger="click"
                        placement="bottom"
                        overlay={this.popoverBottom()}
                      >
                        <Button
                          variant="outlined"
                          onClick={() =>
                            this.setState((prevState) => ({
                              downArrow: !prevState.downArrow,
                            }))
                          }
                        >
                          More{" "}
                          {this.state.downArrow ? (
                            <ArrowDropDownIcon />
                          ) : (
                            <ArrowDropUpIcon />
                          )}
                        </Button>
                      </OverlayTrigger>
                      {this.state.dealData.paymentmode == "onchain" ? (
                        this.state.reviewstatus == "pending" ? (
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={this.onOpenModal1}
                          >
                            Review
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={this.onOpenModal4}
                          >
                            Transfer
                          </Button>
                        )
                      ) : (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={this.TransferPopupOpen}
                        >
                          Transfer
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="abovepart1">
                  <div className="part1">
                    <Accordion defaultExpanded={true}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <div className="servicer_deal_details-top_heading_container">
                          <h3 className="headingpayment">Payment Rules</h3>
                          {this.state.dealData.paymentmode == "offchain" ? (
                            <h3 className="headingpaymentAmount">
                              Amount Paid(USD)
                            </h3>
                          ) : (
                            <h3 className="headingpaymentAmount">
                              Amount Paid(USDC)
                            </h3>
                          )}
                        </div>
                      </AccordionSummary>

                      {this.state.paymentRules.length == 0 ? (
                        ""
                      ) : (
                        <AccordionDetails>
                          <Typography>
                            <ul className="bulletpoints">
                              {this.state.paymentRules.map((e) => {
                                return (
                                  <span className="payment-rules-li-elements">
                                    <li>{e.paymentRule}</li>

                                    <p className="payment-rules-li-elements-para">
                                      <NumberComp2
                                        value={e.amountPaid}
                                      ></NumberComp2>
                                    </p>
                                  </span>
                                );
                              })}
                            </ul>
                          </Typography>
                        </AccordionDetails>
                      )}
                    </Accordion>
                  </div>
                  <div className="part2">
                    <Accordion defaultExpanded={true}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <div className="editcontainer1">
                          <h5 className="headingpayment">Summary</h5>
                        </div>
                      </AccordionSummary>

                      {this.state.dealData.dealsummary == " " ? (
                        ""
                      ) : (
                        <AccordionDetails>
                          <Typography>
                            <div className="bulletpoints1_container1">
                              <div className="rowdealsummary">
                                <img
                                  src={
                                    process.env.react_app_base_url +
                                    "root_folder/" +
                                    this.state.dealData.logo
                                  }
                                  alt="logo"
                                  className="wellslogodeal"
                                />

                                <p className="bulletpoints11-black-1">
                                  {this.state.dealData.dealsummary}
                                </p>
                              </div>
                            </div>
                          </Typography>
                        </AccordionDetails>
                      )}
                    </Accordion>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12 col-sm-6 col-md-4">
                    <div className="page-content3 documents-section">
                      <div className="editcontainer">
                        <h5 className="headingspace">
                          Documents ({this.state.dealDocuments?.length})
                        </h5>
                      </div>
                      <div>
                        {this.state.dealDocuments.map((e) => {
                          return (
                            <div>
                              <div className="pool-box">
                                <div className="pool-box-text-container">
                                  <div className="lockicondivcss">
                                    <h6 className="headingspace11">
                                      {e.documentname}
                                    </h6>
                                    {/* {e.privacymode == 'public' ?  <PublicIcon className="lockicon"></PublicIcon>:
                              <LockIcon className="lockicon"></LockIcon>} */}
                                  </div>

                                  <p className="text-secondary sizeofp1">
                                    {e.description}
                                  </p>
                                </div>
                                <div className="pool-box-icons-container">
                                  <DownloadIcon
                                    className="eye-btn1"
                                    type="button"
                                    onClick={() => this.DownloadIPFSFile(e)}
                                  ></DownloadIcon>
                                  <VisibilityIcon
                                    type="button"
                                    onClick={() => this.onOpenModal5(e)}
                                    className="eye-btn1"
                                  ></VisibilityIcon>
                                </div>
                              </div>

                              <div className="horizontal-divider" />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-sm-6 col-md-8">
                    <div className="page-content3 basic-details-container">
                      <div className="editcontainer">
                        <h5 className="headingspace">Basic Details</h5>
                      </div>
                      {/* <h5 className="headingspace">Basic Details</h5> */}
                      <div className="row">
                        <div className="col">
                          <div className="headingspaces1">
                            <p className="sizeofp">Deal Name</p>
                            <h6 className="headingspace1">
                              {this.state.dealData.dealName}
                            </h6>
                          </div>
                          <div className="headingspaces1">
                            <p className="sizeofp">Asset Class</p>
                            <h6 className="headingspace1">
                              {" "}
                              {this.state.dealData.assetclass}
                            </h6>
                          </div>
                          <div className="headingspaces1">
                            <p className="sizeofp">Closing Date</p>
                            <h6 className="headingspace1">
                              {this.state.dealData.colsingDate}
                            </h6>
                          </div>
                          <div className="headingspaces1">
                            <p className="sizeofp">Maturity Date</p>
                            <h6 className="headingspace1">
                              {this.state.dealData.maturityDate}
                            </h6>
                          </div>
                        </div>

                        <div className="col">
                          <div className="headingspaces1">
                            <p className="sizeofp">Status</p>
                            <h6 className="headingspace1">
                              {this.state.dealData.status}
                            </h6>
                          </div>
                          <div className="headingspaces1">
                            <p className="sizeofp">
                              Pool Original Principal Balance
                            </p>
                            <h6 className="headingspace1">
                              <NumberComp
                                value={this.state.dealData.originalbalance}
                              ></NumberComp>
                            </h6>
                          </div>
                          <div className="headingspaces1">
                            <p className="sizeofp">1st Payment Date</p>
                            <h6 className="headingspace1">
                              {this.state.dealData.firstPaymentDate}
                            </h6>
                          </div>
                          <div className="headingspaces1">
                            <p className="sizeofp">Payment Frequency</p>
                            <h6 className="headingspace1">
                              {this.state.dealData.paymentFrequency}
                            </h6>
                          </div>
                        </div>

                        <div className="col">
                          <div className="headingspaces1">
                            <p className="sizeofp">Verification Agent</p>
                            <h6 className="headingspace1">
                              {this.state.dealData.VAUserName}
                            </h6>
                          </div>
                          <div className="headingspaces1">
                            <p className="sizeofp">Servicer</p>
                            <h6 className="headingspace1">
                              {this.state.dealData.ServicerUserName}
                            </h6>
                          </div>
                          <div className="headingspaces1">
                            <p className="sizeofp">Underwriter</p>
                            <h6 className="headingspace1">
                              {this.state.dealData.UnderWriterUserName}
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row graphs-container">
                  <React.Fragment>
                    <Iframe
                      // allowtransparency="true"
                      // frameborder="0"
                      // style="background: #FFFFFF;"
                      url={this.state.bdbUrl}
                      // url={pdffile}
                      width="100%"
                      height="450px"
                      id="myId"
                      className="bdb-charts"
                      display="initial"
                      position="relative"
                    />
                  </React.Fragment>
                </div>

                {/* here comes the extra containers */}
                <div className="servicer-detail-pool-activity-container">
                  <div className="servicer-detail-pool-activity-first-container">
                    <div className="servicer-detail-pool-activity-first-top-container">
                      <h3 className="servicer-card-heading">
                        Important Details
                      </h3>
                      <div className="important-details-text-container">
                        <p className="servicer-card-inner-heading">
                          Pool Current Princial Balance
                        </p>
                        <p>
                          <NumberComp
                            value={
                              this.state.importantDetails
                                .PoolCurrentPrincipalBalance
                            }
                          ></NumberComp>
                        </p>
                      </div>
                      <div className="container-full-width-1">
                        <div className="important-details-text-container">
                          <p className="servicer-card-inner-heading">
                            Next Payment Date
                          </p>
                          <p>{this.state.importantDetails.NextPaymentDate}</p>
                        </div>
                        <div className="important-details-text-container">
                          <p className="servicer-card-inner-heading">
                            As of Date
                          </p>
                          <p>{this.state.importantDetails.AsOfDate}</p>
                        </div>
                      </div>
                    </div>
                    <div className="servicer-detail-pool-activity-first-bottom-container">
                      <h3 className="servicer-card-heading">Pool Collection</h3>
                      <div className="container-full-width-2">
                        <div className="important-details-text-container">
                          <p className="servicer-card-inner-heading">
                            Interest Collected
                          </p>
                          <p>
                            <NumberComp
                              value={
                                this.state.poolCollections.InterestCollected
                              }
                            ></NumberComp>
                          </p>
                        </div>
                        <div className="important-details-text-container">
                          <p className="servicer-card-inner-heading">
                            Principal Collected
                          </p>
                          <p>
                            <NumberComp
                              value={
                                this.state.poolCollections.PrincipalCollected
                              }
                            ></NumberComp>
                          </p>
                        </div>
                      </div>
                      <div className="important-details-text-container">
                        <p className="servicer-card-inner-heading">
                          Total Collections
                        </p>
                        <p>
                          <NumberComp
                            value={this.state.poolCollections.TotalCollections}
                          ></NumberComp>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="outer-servicer-detail-pool-activity-second-container">
                    <div className="servicer-detail-pool-activity-second-container">
                      {this.state.servicerData == undefined ? (
                        <div></div>
                      ) : (
                        this.fistTableData(this.state.servicerData.collateral)
                      )}
                    </div>
                  </div>
                </div>

                <div className="row row1">
                  <div>
                    <h1 className="headerdashboard1">Tranches(s) </h1>
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

                <div id="modal">
                  <ReactModal
                    isOpen={this.state.open1}
                    onRequestClose={this.onCloseModal}
                    contentLabel="Minimal Modal Example"
                    style={customStylesautosmallmodal}
                  >
                    <React.Fragment>
                      <div className="modalPopup2">
                        <div className="popupTitle">
                          <h2>View Previous Deal Details</h2>
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

                        <div className="modalshiftcontent">
                          <form
                            className="form-container"
                            onSubmit={this.onSubmit1}
                          >
                            <div className="input-container">
                              <label className="label">Select Date</label>
                              {this.state.getLoansLoader == false ? (
                                <select
                                  required
                                  placeholder="select any one"
                                  className="input-select"
                                  onChange={(e) => {
                                    this.setState({
                                      formData: {
                                        ...this.state.formData,
                                        date: e.target.value,
                                      },
                                    });
                                  }}
                                  value={this.state.formData.date}
                                >
                                  <option
                                    value=""
                                    disabled
                                    className="selectclass"
                                  >
                                    Select any one
                                  </option>
                                  {this.state.DateFilter.map((value) => {
                                    return (
                                      <option value={value}>{value}</option>
                                    );
                                  })}
                                </select>
                              ) : (
                                <FormLoader></FormLoader>
                              )}
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
                                      // onClick={this.SubmitDate}
                                    >
                                      Submit
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
                  <ReactModal
                    isOpen={this.state.open2}
                    onRequestClose={this.onCloseModal1}
                    contentLabel="Minimal Modal Example"
                    style={customStylesPAPopup}
                  >
                    <React.Fragment>
                      <div className="modalPopup2">
                        <div className="popupTitle">
                          <h2>Review the Payment Rules</h2>
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

                        <div className="modalshiftcontent">
                          <div className="pa_popup-main-body-container">
                            <div className="pa_popup-sngle-row-container">
                              <div className="pa_popup-payment-rule-container">
                                <p className="pa_popup-inner-heading">
                                  Payment Rules
                                </p>
                              </div>
                              <div className="pa_popup-amount-container">
                                <p className="pa_popup-inner-heading">
                                  Amount Paid
                                </p>
                              </div>
                            </div>
                            {this.state.paymentRules.length == 0
                              ? ""
                              : this.state.paymentRules.map((element) => (
                                  <div className="pa_popup-sngle-row-container">
                                    <div className="pa_popup-payment-rule-container">
                                      <p>{element.paymentRule}</p>
                                    </div>
                                    <div className="pa_popup-amount-container">
                                      <p>
                                        <NumberComp2
                                          value={element.amountPaid}
                                        ></NumberComp2>
                                      </p>
                                    </div>
                                  </div>
                                ))}
                            <div className="pa_popup-sngle-row-container">
                              <div className="pa_popup-payment-rule-container">
                                <p className="pa_popup-inner-heading">
                                  Tranche Name
                                </p>
                              </div>
                              <div className="pa_popup-amount-container">
                                <p className="pa_popup-inner-heading">
                                  Total Paid
                                </p>
                              </div>
                            </div>
                            {this.state.tableData.length == 0
                              ? ""
                              : this.state.tableData.map((element) => (
                                  <div className="pa_popup-sngle-row-container">
                                    <div className="pa_popup-payment-rule-container">
                                      <p>{element["Tranche Name"]}</p>
                                    </div>
                                    <div className="pa_popup-amount-container">
                                      <p>
                                        <NumberComp2
                                          value={element["Total Paid"]}
                                        ></NumberComp2>
                                      </p>
                                    </div>
                                  </div>
                                ))}
                          </div>

                          <div className="pa_pop-button-container">
                            <button
                              className="pa_popup-reject-btn"
                              onClick={this.onOpenModal2}
                            >
                              Reject
                            </button>
                            <Button
                              variant="contained"
                              color="primary"
                              type="button"
                              onClick={this.onOpenModal3}
                            >
                              {" "}
                              Approve
                            </Button>
                          </div>
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
                    style={customStylesautosmallmodal}
                  >
                    <React.Fragment>
                      <div className="modalPopup2">
                        <h3>
                          Are you sure you want to Approve the Payment Rules?
                        </h3>
                        {/* <button
                    type="button"
                    className="closePopup"
                    style={{ minWidth: "30px" }}
                    onClick={this.onCloseModal}
                  >
                    {" "}
                    <CloseIcon></CloseIcon>{" "}
                  </button> */}

                        {/* {this.state.popupLoader === true ? <CircularProgress size="30px" color="secondary" /> : ' '} */}

                        <div className="modalshiftcontent">
                          {/* <form className="form-container" onSubmit={this.onSubmit2}> */}

                          <p>
                            Once you accept, it will be notify to Underwritter
                            to review and publish the deal.
                          </p>

                          <div className="modalsubmit">
                            <div className="submitbuttonbg">
                              <div className="row">
                                <div className="row justify-content-accept-pa">
                                  <button
                                    type="button"
                                    className="popupbutton2"
                                    onClick={this.onCloseModal3}
                                  >
                                    {" "}
                                    No{" "}
                                  </button>
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() =>
                                      this.updatedealreviewstatus("Approved")
                                    }
                                  >
                                    Yes, Approve it
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
                          {/* </form> */}

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
                    isOpen={this.state.open3}
                    onRequestClose={this.onCloseModal2}
                    contentLabel="Minimal Modal Example"
                    style={customStylesautosmallmodal}
                  >
                    <React.Fragment>
                      <div className="modalPopup2">
                        <h3>
                          Are you sure you want to Reject the Payment Rules?
                        </h3>
                        {/* <button
                    type="button"
                    className="closePopup"
                    style={{ minWidth: "30px" }}
                    onClick={this.onCloseModal}
                  >
                    {" "}
                    <CloseIcon></CloseIcon>{" "}
                  </button> */}

                        {/* {this.state.popupLoader === true ? <CircularProgress size="30px" color="secondary" /> : ' '} */}

                        <div className="modalshiftcontent">
                          {/* <form className="form-container" onSubmit={this.onSubmit2}> */}

                          <p>
                            Once you reject, it will be returned to the
                            Underwritter. You can also mention the reason below.
                          </p>

                          <div className="input-container">
                            <label className="label">Note (Optional)</label>
                            <input
                              placeholder="Type here"
                              className="input"
                              type="text"
                              onChange={(e) => {
                                this.setState({
                                  formData: {
                                    ...this.state.formData,
                                    note: e.target.value,
                                  },
                                });
                              }}
                              value={this.state.formData.note}
                            />
                          </div>

                          <div className="modalsubmit">
                            <div className="submitbuttonbg">
                              <div className="row">
                                <div className="row justify-content-accept-pa">
                                  <button
                                    type="button"
                                    className="popupbutton2"
                                    onClick={this.onCloseModal2}
                                  >
                                    {" "}
                                    No{" "}
                                  </button>
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() =>
                                      this.updatedealreviewstatus("Rejected")
                                    }
                                  >
                                    Yes, Reject it
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
                          {/* </form> */}

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

                <div id="modal">
                  <ReactModal
                    isOpen={this.state.open5}
                    onRequestClose={this.onCloseModal4}
                    contentLabel="Minimal Modal Example"
                    style={customStylesPATablePopup}
                  >
                    <React.Fragment>
                      <div className="modalPopup2">
                        <div className="popupTitle">
                          <h2>Transfer</h2>
                          <button
                            type="button"
                            className="closePopup"
                            style={{ minWidth: "30px" }}
                            onClick={this.onCloseModal4}
                          >
                            {" "}
                            <CloseIcon></CloseIcon>{" "}
                          </button>
                        </div>
                        <div className="modalshiftcontent">
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
                    </React.Fragment>
                  </ReactModal>
                </div>

                <div id="modal">
                  {/* <Modal open={open1} onClose={this.onCloseModal1} center>
                    <div id="modalheader">
                      <h5>Create a Pool</h5>

                    </div> */}
                  <ReactModal
                    isOpen={this.state.open6}
                    onRequestClose={this.Step3ModalClose}
                    contentLabel="Minimal Modal Example"
                    style={customStylesPopupInveststep}
                  >
                    <React.Fragment>
                      <div className="modalPopup2">
                        <div className="popupTitle">
                          <h2>Transfer in-progress...</h2>
                          <button
                            type="button"
                            className="closePopup"
                            style={{ minWidth: "30px" }}
                            onClick={this.Step3ModalClose}
                          >
                            {" "}
                            <CloseIcon></CloseIcon>{" "}
                          </button>
                        </div>

                        <div className="render-popup-2">
                          <div className="render-popup-2-inner-top-container loreamipsum">
                            {/* radio button type container */}

                            <div className="render-popup-text-container">
                              <p className="stepText">Transfer USDC</p>

                              <p
                                style={{ marginTop: "10px" }}
                                className="render-popup-small-text"
                              >
                                To complete this period’s Payments, please
                                transfer {this.state.totalpaid} USDC to Investor{" "}
                                {this.state.InvestorName} Wallet using the
                                ‘Proceed to Metamask’ button.
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="outlined"
                            color="black"
                            className="disabled-metamask-button"
                            disabled={
                              this.state.step3status == true ? true : false
                            }
                            onClick={this.meta}
                          >
                            Proceed to Metamask
                            {this.state.formloadmetamask === true ? (
                              <CircularProgress size="22px" color="primary" />
                            ) : (
                              ""
                            )}
                          </Button>
                        </div>

                        <div className="render-popup-2">
                          <p className="popup-heading1">
                            Find out more info here :
                          </p>
                          <div className="render-popup-2-inner-top-container">
                            <div className="flex-container1 small-container">
                              <p className="render-popup-small-text">
                                <button
                                  type="button"
                                  onClick={this.handleImportantDetails3}
                                >
                                  <b className="processing-time-bold color-text">
                                    Important Details
                                  </b>
                                </button>
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="render-popup-2-button-container">
                          <div className="status-pending-text">
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={this.handleOkImportantDetailsPopup3}
                            >
                              Okay
                              {this.state.formLoader === true ? (
                                <CircularProgress size="22px" color="primary" />
                              ) : (
                                ""
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  </ReactModal>
                </div>

                <div id="modal">
                  <ReactModal
                    isOpen={this.state.importantPopup1}
                    onRequestClose={this.Step1ModalClose}
                    contentLabel="Minimal Modal Example"
                    style={customStylesPopupInveststep}
                  >
                    <React.Fragment>
                      <div className="modalPopup2">
                        <h3>Important Details</h3>

                        <div className="render-popup-2">
                          <div className="render-popup-2-inner-top-container">
                            <div className="render-popup-text-container">
                              <ul
                                style={{ marginTop: "10px" }}
                                className="shift-data-important"
                              >
                                <li className="render-popup-small-text lidatashift">
                                  Do not send funds via ACH. An actual Wire
                                  Transfer must be submitted.
                                </li>
                                <li className="render-popup-small-text lidatashift">
                                  Do not forget to include the ‘trackingRef’
                                  from Wire Instructions as part of your Wire
                                  Transfer.
                                </li>
                                <li className="render-popup-small-text lidatashift">
                                  Once your Wire Transfer is initiated, please
                                  email a copy of your Wire Transfer
                                  confirmation page to im_admin@intainft.com to
                                  ensure proper settlement of your Wire
                                  Transfer.{" "}
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="render-popup-2-button-container">
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={this.handleOkImportantDetailsPopup3}
                          >
                            Okay
                          </Button>
                        </div>
                      </div>
                    </React.Fragment>
                  </ReactModal>
                </div>

                <div id="modal">
                  <ReactModal
                    isOpen={this.state.open7}
                    onRequestClose={this.TransferPopupClose}
                    contentLabel="Minimal Modal Example"
                    style={customStylesPATablePopup}
                  >
                    <React.Fragment>
                      <div className="modalPopup2">
                        <div className="popupTitle">
                          <h2>Suggested Transactions</h2>
                          <button
                            type="button"
                            className="closePopup"
                            style={{ minWidth: "30px" }}
                            onClick={this.TransferPopupClose}
                          >
                            {" "}
                            <CloseIcon></CloseIcon>{" "}
                          </button>
                        </div>

                        <div className="modalshiftcontent">
                          <Button
                            onClick={this.downloadpayagentdetails}
                            variant="outlined"
                            className="exportbutton"
                          >
                            Export
                          </Button>
                          <React.Fragment>
                            <table
                              className="table text-left"
                              id="viewServicerData2"
                            >
                              <thead>
                                <tr className="tablehead">
                                  <th className="headerclass">From</th>
                                  <th className="headerclass">To</th>
                                  <th className="headerclass">Amount</th>
                                  <th className="headerclass">
                                    Wire Instruction
                                  </th>
                                </tr>
                              </thead>
                              <tbody>{this.renderRows()}</tbody>
                            </table>
                          </React.Fragment>
                        </div>

                        <div className="modalsubmit">
                          <div className="submitbuttonbg">
                            <div className="row">
                              <div className="row justify-content-payingagentsave">
                                <button
                                  type="button"
                                  className="popupbutton22"
                                  onClick={this.TransferPopupClose}
                                >
                                  {" "}
                                  Cancel{" "}
                                </button>
                                {this.state.PAstatusoffhain == "Completed" ? (
                                  <Button
                                    disabled
                                    variant="contained"
                                    color="primary"
                                  >
                                    Completed
                                  </Button>
                                ) : (
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={this.CompleteTransferPopupData}
                                  >
                                    Completed
                                    {this.state.formLoader === true ? (
                                      <CircularProgress
                                        size="22px"
                                        color="primary"
                                      />
                                    ) : (
                                      ""
                                    )}
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  </ReactModal>
                </div>

                <div id="modal">
                  <ReactModal
                    isOpen={this.state.open8}
                    onRequestClose={this.WireInstructionPopupClose}
                    contentLabel="Minimal Modal Example"
                    style={customStylesPopupInveststep}
                  >
                    <React.Fragment>
                      <div className="modalPopup2">
                        <div className="popupTitle">
                          <h2>Transfer</h2>
                          <button
                            type="button"
                            className="closePopup"
                            style={{ minWidth: "30px" }}
                            onClick={this.WireInstructionPopupClose}
                          >
                            {" "}
                            <CloseIcon></CloseIcon>{" "}
                          </button>
                        </div>

                        <div className="render-popup-2">
                          <div className="render-popup-2-inner-top-container">
                            <div className="render-popup-text-container">
                              <p className="render-popup-small-text">
                                Please initiate a Wire Transfer in the amount of{" "}
                                {this.state.amount} USD using the below Wire
                                Instructions.
                              </p>
                            </div>
                          </div>
                          <div className="setup-popup-card">
                            <div className="setup-popup-card-top-container">
                              <p className="setup-popup-card-title">
                                Wire Instructions
                              </p>
                            </div>

                            <div className="setup-inner-container">
                              <p className="setup-popup-p">Beneficiary Name</p>
                              <span className="setup-popup-p-icon">
                                <p>{this.state.BankData?.beneficiaryName}</p>{" "}
                                <CopyToClipboard
                                  onCopy={this.onCopy}
                                  text={this.state.BankData?.beneficiaryName}
                                >
                                  <ContentCopyIcon className="contentcopyicon" />
                                </CopyToClipboard>
                              </span>
                            </div>

                            <div className="setup-inner-container">
                              <p className="setup-popup-p">Account Number</p>
                              <span className="setup-popup-p-icon">
                                <p>{this.state.BankData?.accountNumber}</p>{" "}
                                <CopyToClipboard
                                  onCopy={this.onCopy}
                                  text={this.state.BankData?.accountNumber}
                                >
                                  <ContentCopyIcon className="contentcopyicon" />
                                </CopyToClipboard>
                              </span>
                            </div>

                            <div className="setup-inner-container">
                              <p className="setup-popup-p">Routing Number</p>
                              <span className="setup-popup-p-icon">
                                <p>{this.state.BankData?.routingNumber}</p>{" "}
                                <CopyToClipboard
                                  onCopy={this.onCopy}
                                  text={this.state.BankData?.routingNumber}
                                >
                                  <ContentCopyIcon className="contentcopyicon" />
                                </CopyToClipboard>
                              </span>
                            </div>

                            <div className="setup-inner-container">
                              <p className="setup-popup-p">IBAN</p>
                              <span className="setup-popup-p-icon">
                                <p>{this.state.BankData?.iban}</p>{" "}
                                <CopyToClipboard
                                  onCopy={this.onCopy}
                                  text={this.state.BankData?.iban}
                                >
                                  <ContentCopyIcon className="contentcopyicon" />
                                </CopyToClipboard>
                              </span>
                            </div>

                            <div className="setup-inner-container">
                              <p className="setup-popup-p"> Billing Name</p>
                              <span className="setup-popup-p-icon">
                                <p>
                                  {this.state.BankData?.billingDetails?.name}
                                </p>{" "}
                                <CopyToClipboard
                                  onCopy={this.onCopy}
                                  text={
                                    this.state.BankData?.billingDetails?.name
                                  }
                                >
                                  <ContentCopyIcon className="contentcopyicon" />
                                </CopyToClipboard>
                              </span>
                            </div>

                            <div className="setup-inner-container">
                              <p className="setup-popup-p">
                                Billing Address Line 1
                              </p>
                              <span className="setup-popup-p-icon">
                                <p>
                                  {this.state.BankData?.billingDetails?.line1}
                                </p>{" "}
                                <CopyToClipboard
                                  onCopy={this.onCopy}
                                  text={
                                    this.state.BankData?.billingDetails?.line1
                                  }
                                >
                                  <ContentCopyIcon className="contentcopyicon" />
                                </CopyToClipboard>
                              </span>
                            </div>

                            <div className="setup-inner-container">
                              <p className="setup-popup-p">
                                Billing Address Line 2
                              </p>
                              <span className="setup-popup-p-icon">
                                <p>
                                  {this.state.BankData?.billingDetails?.line2}
                                </p>{" "}
                                <CopyToClipboard
                                  onCopy={this.onCopy}
                                  text={
                                    this.state.BankData?.billingDetails?.line2
                                  }
                                >
                                  <ContentCopyIcon className="contentcopyicon" />
                                </CopyToClipboard>
                              </span>
                            </div>

                            <div className="setup-inner-container">
                              <p className="setup-popup-p">Billing City</p>
                              <span className="setup-popup-p-icon">
                                <p>
                                  {this.state.BankData?.billingDetails?.city}
                                </p>{" "}
                                <CopyToClipboard
                                  onCopy={this.onCopy}
                                  text={
                                    this.state.BankData?.billingDetails?.city
                                  }
                                >
                                  <ContentCopyIcon className="contentcopyicon" />
                                </CopyToClipboard>
                              </span>
                            </div>

                            <div className="setup-inner-container">
                              <p className="setup-popup-p"> Billing District</p>
                              <span className="setup-popup-p-icon">
                                <p>
                                  {
                                    this.state.BankData?.billingDetails
                                      ?.district
                                  }
                                </p>{" "}
                                <CopyToClipboard
                                  onCopy={this.onCopy}
                                  text={
                                    this.state.BankData?.billingDetails
                                      ?.district
                                  }
                                >
                                  <ContentCopyIcon className="contentcopyicon" />
                                </CopyToClipboard>
                              </span>
                            </div>

                            <div className="setup-inner-container">
                              <p className="setup-popup-p">
                                Billing Country Code
                              </p>
                              <span className="setup-popup-p-icon">
                                <p>
                                  {this.state.BankData?.billingDetails?.country}
                                </p>{" "}
                                <CopyToClipboard
                                  onCopy={this.onCopy}
                                  text={
                                    this.state.BankData?.billingDetails?.country
                                  }
                                >
                                  <ContentCopyIcon className="contentcopyicon" />
                                </CopyToClipboard>
                              </span>
                            </div>

                            <div className="setup-inner-container">
                              <p className="setup-popup-p">
                                {" "}
                                Billing Postalcode
                              </p>
                              <span className="setup-popup-p-icon">
                                <p>
                                  {
                                    this.state.BankData?.billingDetails
                                      ?.postalCode
                                  }
                                </p>{" "}
                                <CopyToClipboard
                                  onCopy={this.onCopy}
                                  text={
                                    this.state.BankData?.billingDetails
                                      ?.postalCode
                                  }
                                >
                                  <ContentCopyIcon className="contentcopyicon" />
                                </CopyToClipboard>
                              </span>
                            </div>

                            <div className="setup-inner-container">
                              <p className="setup-popup-p">Bank Name</p>
                              <span className="setup-popup-p-icon">
                                <p>{this.state.BankData?.bankAddress?.name}</p>{" "}
                                <CopyToClipboard
                                  onCopy={this.onCopy}
                                  text={this.state.BankData?.bankAddress?.name}
                                >
                                  <ContentCopyIcon className="contentcopyicon" />
                                </CopyToClipboard>
                              </span>
                            </div>

                            <div className="setup-inner-container">
                              <p className="setup-popup-p">
                                Bank Address Line 1
                              </p>
                              <span className="setup-popup-p-icon">
                                <p>{this.state.BankData?.bankAddress?.line1}</p>{" "}
                                <CopyToClipboard
                                  onCopy={this.onCopy}
                                  text={this.state.BankData?.bankAddress?.line1}
                                >
                                  <ContentCopyIcon className="contentcopyicon" />
                                </CopyToClipboard>
                              </span>
                            </div>

                            <div className="setup-inner-container">
                              <p className="setup-popup-p">
                                Bank Address Line 2
                              </p>
                              <span className="setup-popup-p-icon">
                                <p>{this.state.BankData?.bankAddress?.line2}</p>{" "}
                                <CopyToClipboard
                                  onCopy={this.onCopy}
                                  text={this.state.BankData?.bankAddress?.line2}
                                >
                                  <ContentCopyIcon className="contentcopyicon" />
                                </CopyToClipboard>
                              </span>
                            </div>

                            <div className="setup-inner-container">
                              <p className="setup-popup-p">Bank Address City</p>
                              <span className="setup-popup-p-icon">
                                <p>{this.state.BankData?.bankAddress?.city}</p>{" "}
                                <CopyToClipboard
                                  onCopy={this.onCopy}
                                  text={this.state.BankData?.bankAddress?.city}
                                >
                                  <ContentCopyIcon className="contentcopyicon" />
                                </CopyToClipboard>
                              </span>
                            </div>

                            <div className="setup-inner-container">
                              <p className="setup-popup-p">
                                Bank Address District
                              </p>
                              <span className="setup-popup-p-icon">
                                <p>
                                  {this.state.BankData?.bankAddress?.district}
                                </p>{" "}
                                <CopyToClipboard
                                  onCopy={this.onCopy}
                                  text={
                                    this.state.BankData?.bankAddress?.district
                                  }
                                >
                                  <ContentCopyIcon className="contentcopyicon" />
                                </CopyToClipboard>
                              </span>
                            </div>

                            <div className="setup-inner-container">
                              <p className="setup-popup-p">
                                Bank Address Country Code
                              </p>
                              <span className="setup-popup-p-icon">
                                <p>
                                  {this.state.BankData?.bankAddress?.country}
                                </p>{" "}
                                <CopyToClipboard
                                  onCopy={this.onCopy}
                                  text={
                                    this.state.BankData?.bankAddress?.country
                                  }
                                >
                                  <ContentCopyIcon className="contentcopyicon" />
                                </CopyToClipboard>
                              </span>
                            </div>

                            <div className="setup-inner-container">
                              <p className="setup-popup-p">Bank Postalcode</p>
                              <span className="setup-popup-p-icon">
                                <p>
                                  {this.state.BankData?.bankAddress?.postalCode}
                                </p>{" "}
                                <CopyToClipboard
                                  onCopy={this.onCopy}
                                  text={
                                    this.state.BankData?.bankAddress?.postalCode
                                  }
                                >
                                  <ContentCopyIcon className="contentcopyicon" />
                                </CopyToClipboard>
                              </span>
                            </div>
                          </div>
                        </div>

                        {this.state.copied ? (
                          <span className="copiedcss">Copied.</span>
                        ) : null}
                        <div className="render-popup-2">
                          <p className="popup-heading1">
                            Find out more info here :
                          </p>
                          <div className="render-popup-2-inner-top-container">
                            <div className="render-popup-text-container flex-container1-account container-1">
                              <p className="render-popup-small-text">
                                <button
                                  type="button"
                                  onClick={this.handleProcessingTime1}
                                >
                                  <b className="processing-time-bold color-text">
                                    Processing Time
                                  </b>
                                </button>
                              </p>
                              <div className="mid-line" />
                              <p className="render-popup-small-text">
                                <button
                                  type="button"
                                  onClick={this.handleImportantDetails3}
                                >
                                  <b className="processing-time-bold color-text">
                                    Important Details
                                  </b>
                                </button>
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="render-popup-2-button-container">
                          <div className="status-pending-text">
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={this.WireInstructionPopupClose}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  </ReactModal>
                </div>

                <div id="modal">
                  <ReactModal
                    isOpen={this.state.processingTimePopup1}
                    onRequestClose={this.Step1ModalClose}
                    contentLabel="Minimal Modal Example"
                    style={customStylesPopupInveststep}
                  >
                    <React.Fragment>
                      <div className="modalPopup2">
                        <h3>Processing Time</h3>

                        <div className="render-popup-2">
                          <div className="render-popup-2-inner-top-container">
                            <div className="render-popup-text-container">
                              <p className="render-popup-small-text">
                                Funds will be credited to Circle on the same day
                                if your Wire Transfer is submitted before 4PM
                                ET.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="render-popup-2-button-container">
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={this.handleOkProcessingTime1}
                          >
                            Okay
                          </Button>
                        </div>
                      </div>
                    </React.Fragment>
                  </ReactModal>
                </div>

                <div id="modal">
                  <ReactModal
                    isOpen={this.state.open9}
                    onRequestClose={this.onCloseModal5}
                    contentLabel="Minimal Modal Example"
                    style={customStylesautosmallmodal}
                  >
                    <React.Fragment>
                      <div className="modalPopup2">
                        <div className="popupTitle">
                          <h2>View the Document Details</h2>
                          <button
                            type="button"
                            className="closePopup"
                            style={{ minWidth: "30px" }}
                            onClick={this.onCloseModal5}
                          >
                            {" "}
                            <CloseIcon></CloseIcon>{" "}
                          </button>
                        </div>

                        {/* {this.state.popupLoader === true ? <CircularProgress size="30px" color="secondary" /> : ' '} */}

                        <div className="modalshiftcontent">
                          <form className="form-container">
                            <div className="Modal-Data">
                              <div className="headingspaces1">
                                <p className="sizeofp">Document Name</p>
                                <h6 className="headingspace1">
                                  {this.state.formData1.documentname}
                                </h6>
                              </div>
                              <div className="headingspaces1">
                                <p className="sizeofp">Description</p>
                                <h6 className="headingspace1">
                                  {this.state.formData1.description}
                                </h6>
                              </div>
                              <div className="headingspaces1">
                                <p className="sizeofp">Privacy Mode</p>
                                <h6 className="headingspace1">
                                  {this.state.formData1.privacymode}
                                </h6>
                              </div>
                            </div>

                            <div className="modalsubmit">
                              <div className="submitbuttonbg">
                                <div className="row">
                                  <div className="row justify-content-addedit1">
                                    <button
                                      type="button"
                                      className="popupbutton22"
                                      onClick={this.onCloseModal5}
                                    >
                                      {" "}
                                      Cancel{" "}
                                    </button>
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
              </div>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withSnackbar(PaymentAgentDealDetails);
