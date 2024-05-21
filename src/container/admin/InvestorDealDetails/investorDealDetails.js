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
  customStylesPopupInvest,
  customStylesPopupInveststep,
} from "../../../components/customscripts/customscript";
import FormLoader from "../../../components/loader/formLoader";
import {
  NextAPI,
  getInvestorDealDetailsByDealId,
  InvestmentCommit,
  EditCommit,
  Invest,
  downloadDealTemplate,
  getcommitmentdetails,
  PoolDetails,
  getwiretransferdetails,
  transferUSDCtoInvestor,
  layerzerosendmessage,
  getinvestorsoffchainwiredetails,
  savetransactiondetailsoffchain,
  DownloadIPFSFile,
} from "../../../servies/services";
import Match from "../../../images/match.png";
import Mismatch from "../../../images/mismatch.png";
import PropTypes from "prop-types";
import { FullscreenExit, TrainRounded } from "@material-ui/icons";
import {
  ThemeProvider,
  createTheme,
  MuiThemeProvider,
} from "@material-ui/core/styles";
import {
  withStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  PieChart,
  Pie,
  Cell,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Link } from "react-router-dom";
import Slider from "@material-ui/core/Slider";
import { SliderThumb } from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import AddCircleOutlinedIcon from "@material-ui/icons/AddCircleOutlined";
import VisibilityIcon from "@material-ui/icons/Visibility";
import DownloadIcon from "@mui/icons-material/Download";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ethers } from "ethers";
import { TODO_LIST_ABI, TODO_LIST_ADDRESS } from "./config";
import Web3 from "web3";
import NumberComp from "../../../components/NumberComp";
import DoneIcon from "@mui/icons-material/Done";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { CopyToClipboard } from "react-copy-to-clipboard";
import NumberComp2 from "../../../components/NumberComp2";
import Iframe from "react-iframe";
import Logo2 from "../../../images/wellslogored.png";
const piedata = [
  { name: "Group A", value: 200 },
  { name: "Group B", value: 500 },
  { name: "Group C", value: 200 },
];
const COLORS = ["#FFC000", "#AE2E2E", "#169414"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const data = [
  {
    name: "2015",
    uv: 4000,
    pv: 8400,
    amt: 8400,
  },
  {
    name: "2016",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "2017",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "2018",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "2019",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "2020",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "2021",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "2022",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const curvedata = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
class InvestorDealDetails extends Component {
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
      open1: false,
      open2: false,
      open3: false,
      open4: false,
      open5: false,
      open6: false,
      open7: false,
      open8: false,
      formData: {
        commitamount: "",
      },
      modalData: {
        contractdata: true,
      },
      formData1: {
        documentname: "",
        description: "",
        privacymode: "",
      },
      UserId: sessionStorage.getItem("userid"),
      dealId: sessionStorage.getItem("dealId"),
      token: sessionStorage.getItem("token"),

      activeInsights1: true,
      activeInsights2: false,
      activeInsights3: false,
      editpopupdetails: [],
      paymentRules: [],
      dealData: {},
      dealDocuments: [],
      poolName: sessionStorage.getItem("poolname"),
      Redirection: sessionStorage.getItem("component"),
      showSearchBox: false,
      screenloader: false,
      copied: false,
      formloadmetamask: false,
      step3nextbutton: false,
      bdbUrl: "",
      processingTimePopup1: false,
      importantPopup1: false,
      furtherStepsPopup1: false,
      allStepsPopup1: false,
      importantDetailsPopup2: false,
      importantDetailsPopup3: false,
      allStepsPopup2: false,
      allStepsPopup3: false,
      step: "",
      step2status: false,
      step3statusmetamask: false,
      step3statuslayerzero: false,
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

  blockInvalidChar = (e) => {
    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();
  };

  onOpenModal2 = (e) => {
    console.log("e", e);
    this.setState({
      open8: true,
      documentDetail: e,
      formData1: {
        documentname: e.documentname,
        description: e.description,
        privacymode: e.privacymode,
      },
    });
  };

  onOpenModal = (
    trancheId,
    trancheName,
    principalbalance,
    currentcommitments,
    availablecommitments,
    closingdate
  ) => {
    console.log("addinvest modal");
    this.getcommitmentdetails(trancheId, closingdate);
    this.setState({
      open1: true,
      trancheId: trancheId,
      trancheName: trancheName,
      principalbalance: principalbalance,
      formData: {
        commitamount: currentcommitments,
      },
    });

    // this.setState({ showRenderPopUp1: true, showRenderPopUp2: false, showRenderPopUp3: false })
  };
  onOpenModal1 = (
    CommitStatus,
    trancheId,
    trancheName,
    principalbalance,
    currentcommitments,
    availablecommitments,
    closingdate
  ) => {
    console.log("addcommit modal1");
    this.getcommitmentdetails(trancheId, closingdate);
    if (CommitStatus == "Edit Commit") {
      this.setState({
        formData: {
          commitamount: currentcommitments,
        },
      });
    }
    this.setState({
      open2: true,
      CommitStatus: CommitStatus,
      trancheId: trancheId,
      trancheName: trancheName,
      principalbalance: principalbalance,
      formData: {
        commitamount: currentcommitments,
      },
    });
  };

  Step1ModalOpen = () => {
    console.log("step1/4 modal1");
    this.setState({
      open3: true,
      open6: false,
      open5: false,
      open4: false,
      open1: false,
      step: "step1",
    });
    this.getwiretransferdetails();
  };
  Step2ModalOpen = () => {
    console.log("step2/4 modal2");
    this.setState({
      open4: true,
      open6: false,
      open3: false,
      open5: false,
      open1: false,
      step: "step2",
    });
  };
  Step3ModalOpen = () => {
    console.log("step3/4 modal3");
    this.setState({
      open5: true,
      open6: false,
      open4: false,
      open3: false,
      open1: false,
      step: "step3",
    });
  };
  Step4ModalOpen = () => {
    console.log("step4/4 modal4");
    this.setState({
      open6: true,
      open5: false,
      open4: false,
      open3: false,
      open1: false,
    });
  };

  OffChainOpenPopup = (value, committedamount) => {
    console.log("offchain popup");
    this.setState({
      open7: true,
      trancheid: value,
      committedamount: committedamount,
    });
  };
  OffChainClosePopup = () => {
    console.log("offchain close popup");
    this.setState({ open7: false });
  };

  onCloseModal = () => {
    this.setState({ open1: false });
  };
  onCloseModal1 = () => {
    this.setState({ open2: false });
  };
  Step1ModalClose = () => {
    this.setState({ open3: false });
  };
  Step2ModalClose = () => {
    this.setState({ open4: false });
  };
  Step3ModalClose = () => {
    this.setState({ open5: false });
  };
  Step4ModalClose = () => {
    this.setState({ open6: false });
  };
  onCloseModal2 = () => {
    this.setState({ open8: false });
  };

  onSubmit1 = (e) => {
    e.preventDefault();
    console.log(this.state.formData);
    console.log("hello we have clicked the button");
    if (this.state.CommitStatus == "Edit Commit") {
      this.EditCommit();
    } else {
      this.InvestmentCommit();
    }
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
  handleClicks = () => {
    console.log("hello we have clicked the button");
    window.location.assign("/admin/investoropportunites");
    // this.props.history.push({
    //   pathname: this.state.Redirection,
    // });
  };

  meta = async () => {
    this.setState({ formloadmetamask: true, step3statusmetamask: true });
    const web3 = new Web3(Web3.givenProvider || "http://localhost:3000");
    // Asking if metamask is already present or not
    // if (window.ethereum) {
    // res[0] for fetching a first wallet
    // window.ethereum
    //   .request({ method: "eth_requestAccounts" })

    //   .then((res) => this.newfun(res[0]));

    // const web3 = new Web3(Web3.givenProvider || "http://localhost:3000");

    // web3.eth
    //   .getBalance("0xEda08e33E2ED957D1C2a611435ED355D8B603B96")
    //   .then((val) => console.log(parseInt(val) / Math.pow(10, -18)));
    // } else {
    //   const message = "Please Install Metamask!";

    //   this.props.enqueueSnackbar(message, {
    //     variant: "error",
    //     autoHideDuration: 5000,
    //   });
    //   this.setState({ formloadmetamask: false });
    // }

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
    this.setState({ formloadmetamask: true, step3statusmetamask: true });
    // web3.eth
    //   .getBalance("0xC60B683D1835B72A1f3CdAE3ac29b49607F0176D")
    //   .then(console.log);

    const web3 = new Web3(Web3.givenProvider || "http://localhost:3000");
    let accounts = await web3.eth.getAccounts();

    if (accounts[0] == this.state.InvestorCchainAddress) {
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
    this.setState({ formloadmetamask: true, step3statusmetamask: true });

    const web3 = new Web3(Web3.givenProvider || "http://localhost:3000");
    // web3.eth
    //   .getBalance("0xC60B683D1835B72A1f3CdAE3ac29b49607F0176D")
    //   .then(console.log);

    const todoList = new web3.eth.Contract(TODO_LIST_ABI, TODO_LIST_ADDRESS);
    todoList.methods
      .transfer(
        this.state.IssuerCchainAddress,
        Math.round(parseFloat(this.state.Amount) * Math.pow(10, 6)).toString()
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
          step3statusmetamask: false,
        });
        const message = "Metamask Transaction Successfull";

        this.props.enqueueSnackbar(message, {
          variant: "info",
          autoHideDuration: 5000,
        });
        // this.layerzerosendmessage(receipt);
      })
      .then("receipt", (receipt) => {
        this.setState({ formloadmetamask: false, step3statusmetamask: false });

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

  layerzerosendmessage = async () => {
    console.log("hello");
    this.setState({ formLoader: true, step3statuslayerzero: true });
    var data = {};
    var receipt = this.state.receipt;
    data.investoraddress = receipt.events.Transfer.returnValues.from;
    data.issueraddress = receipt.events.Transfer.returnValues.to;
    data.amount = receipt.events.Transfer.returnValues.value;
    data.txhash = receipt.events.Transfer.transactionHash;
    data.tokenaddress = this.state.tokendeployedaddress;
    data.status = receipt.status;
    console.log("world");
    // console.log("NEXT API REQ",from,to,value,transactionHash,tokendeployedaddress)
    data.token = this.state.token;
    const APIResponse = await layerzerosendmessage(data);
    if (APIResponse.data.success == true) {
      const message = "Token Transfer Success";

      this.props.enqueueSnackbar(message, {
        variant: "info",
        autoHideDuration: 5000,
      });
      this.Invest();
    } else {
      const message = "Token Transfer Failed";

      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 5000,
      });
      this.setState({ formLoader: false, step3statuslayerzero: false });
    }
  };

  // Invest = async () => {
  //   var data = {};
  //   data.trancheid = this.state.trancheId;
  //   data.investorid = this.state.UserId;
  //   data.investamount = this.state.formData.commitamount;
  //   console.log("datata", data);
  //   const APIResponse = await Invest(data);

  //   if (APIResponse.status === 200) {
  //     const message = "Invest Successfull";
  //     this.props.enqueueSnackbar(message, {
  //       variant: "info",
  //       autoHideDuration: 3000,
  //     });
  //     this.setState({ formLoader: false });
  //     this.Step4ModalOpen();

  //   } else {
  //     this.setState({ formLoader: false });
  //     const message = "Invest UnSuccessfull";
  //     this.props.enqueueSnackbar(message, {
  //       variant: "error",
  //       autoHideDuration: 3000,
  //     });
  //   }
  // };

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
  getInvestorDealDetailsByDealId = async () => {
    var data = {};
    data.dealid = this.state.dealId;
    data.investorid = this.state.UserId;
    console.log("datata", data);
    this.setState({ screenloader: true, open6: false });
    data.token = this.state.token;
    // this.setState({
    //   screenloader: false,
    //   dealData: [],
    //   tableData: [{"trancheId": "54ac34e7-1637-4ac8-b076-f7f2bd62143e",
    //   "dealId": "222IMIR11",
    //   "trancheName": "Certificate A",
    //   "creditEnhancement": "0",
    //   "pricipalBalance": "12407247",
    //   "interestRate": "0.0135655154902504",
    //   "investedAmount": "0",
    //   "status": "active",
    //   "deployedaddress": "0x5E17E7F593920F799305AFF94C7EDc0DE80fD322",
    //   "closingdate": "08-13-2021",
    //   "currentcommitments": "10",
    //   "availablecommitments": "12407197"}],
    //   paymentRules: [],
    //   dealDocuments: [],
    // });
    const APIResponse = await getInvestorDealDetailsByDealId(data);

    if (APIResponse.status === 200) {
      this.setState({
        screenloader: false,
        dealData: APIResponse.data.dealData,
        tableData: APIResponse.data.trancheData,
        paymentRules: APIResponse.data.paymentRules,
        dealDocuments: APIResponse.data.dealDocuments,
      });
      sessionStorage.setItem(
        "paymentmode",
        APIResponse.data.dealData.paymentmode
      );

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
  InvestmentCommit = async () => {
    var data = {};
    data.dealid = this.state.dealId;
    data.tranchename = this.state.trancheName;
    data.trancheid = this.state.trancheId;
    data.investorid = this.state.UserId;
    data.commitamount = this.state.formData.commitamount;
    console.log("datata", data);
    this.setState({ formLoader: true });
    data.token = this.state.token;
    const APIResponse = await InvestmentCommit(data);

    if (APIResponse.status === 200) {
      this.setState({
        formLoader: false,
      });
      const message = "Tranche Commit Successfull";
      this.props.enqueueSnackbar(message, {
        variant: "info",
        autoHideDuration: 3000,
      });
      this.onCloseModal1();
      this.getInvestorDealDetailsByDealId();
    } else {
      this.setState({ formLoader: false });

      const message = "Tranche Commit UnSuccessfull";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
      this.onCloseModal1();
    }
  };
  EditCommit = async () => {
    var data = {};
    data.trancheid = this.state.trancheId;
    data.investorid = this.state.UserId;
    data.commitamount = this.state.formData.commitamount;
    console.log("datata", data);
    this.setState({ formLoader: true });
    data.token = this.state.token;
    const APIResponse = await EditCommit(data);

    if (APIResponse.status === 200) {
      this.setState({
        formLoader: false,
      });
      const message = "Commit Update Successfull";
      this.props.enqueueSnackbar(message, {
        variant: "info",
        autoHideDuration: 3000,
      });
      this.onCloseModal1();
      this.getInvestorDealDetailsByDealId();
    } else {
      this.setState({ formLoader: false });

      const message = "Commit Update UnSuccessfull";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
      this.onCloseModal1();
    }
  };
  Invest = async () => {
    var data = {};
    data.trancheid = this.state.trancheId;
    data.investorid = this.state.UserId;
    data.investamount = this.state.formData.commitamount;
    data.token = this.state.token;
    console.log("datata", data);

    const APIResponse = await Invest(data);

    if (APIResponse.status === 200) {
      this.setState({
        formLoader: false,
        step3statuslayerzero: false,
      });
      const message = "Invest Successfull";
      this.props.enqueueSnackbar(message, {
        variant: "info",
        autoHideDuration: 3000,
      });
      this.Step4ModalOpen();
    } else {
      this.setState({ formLoader: false, step3statuslayerzero: false });

      const message = "Invest UnSuccessfull";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  getcommitmentdetails = async (trancheId, closingdate) => {
    var data = {};
    data.trancheid = trancheId;
    data.closingdate = closingdate;
    data.token = this.state.token;
    console.log("datata", data);
    this.setState({
      currentcommitments: "",
      availablecommitments: "",
    });
    const APIResponse = await getcommitmentdetails(data);

    if (APIResponse.status === 200) {
      this.setState({
        currentcommitments: APIResponse.data.currentcommitments,
        availablecommitments: APIResponse.data.availablecommitments,
      });
    } else {
      const message = "Commit Update UnSuccessfull";
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
    // this.props.history.push("/admin/investorPreviewPooldetails");
    window.location.assign("/admin/investorPreviewPooldetails");
    // } else {
    //   const message = "Couldn't fetch the record";
    //   this.props.enqueueSnackbar(message, {
    //     variant: "error",
    //     autoHideDuration: 3000,
    //   });
    // }
  };

  getwiretransferdetails = async () => {
    var data = {};
    data.trancheid = this.state.trancheId;
    data.investorid = this.state.UserId;
    data.issuerid = this.state.dealData.issuerId;
    data.token = this.state.token;
    console.log("datata", data);
    const APIResponse = await getwiretransferdetails(data);

    if (APIResponse.status === 200) {
      this.setState({
        Amount: APIResponse.data.Commitments,
        TrackingRef: APIResponse.data.TrackingRef,
        VAN: APIResponse.data.VAN,
        InvestorCchainAddress: APIResponse.data.InvestorCchainAddress,
        SubnetCchainAddress: APIResponse.data.SubnetCchainAddress,
        IssuerCchainAddress: APIResponse.data.IssuerCchainAddress,
        tokendeployedaddress: APIResponse.data.tokendeployedaddress,
      });
    } else {
      const message = "Commit Update UnSuccessfull";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };
  transferUSDCtoInvestor = async () => {
    var data = {};
    data.trancheid = this.state.trancheId;
    data.investorid = this.state.UserId;
    console.log("datata", data);
    data.token = this.state.token;
    this.setState({ formLoader: true, step2status: true });
    const APIResponse = await transferUSDCtoInvestor(data);

    if (APIResponse.status === 200) {
      this.setState({
        formLoader: false,
        step2status: false,
      });
      this.Step3ModalOpen();
    } else {
      this.setState({
        formLoader: false,
        step2status: false,
      });
      const message = "Something went wrong";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  downloadDealTemplate = async () => {
    let url =
      "http://165.227.5.156:8080/ipfs/QmfC72NfTMyTDNTk9SNCF6AsGeL9Y9h7zYs5zgzZEZwj7A";

    // const APIResponse = await downloadDealTemplate();
    const file_name = "Structuring Template" + ".xls";

    startDownload(url);
    function startDownload(link) {
      var element = document.createElement("a");
      element.setAttribute("href", link);

      element.style.display = "none";
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    }
  };
  onChange1 = ({ target: { value } }) => {
    this.setState({ value, copied: false });
  };

  onClick = ({ target: { innerHTML } }) => {
    console.log(`Clicked on "${innerHTML}"!`); // eslint-disable-line
  };

  onCopy = () => {
    console.log("Copy");
    this.setState({ copied: true });
    setTimeout(() => {
      this.setState({ copied: false });
    }, 2000);
  };
  bdbapi = async () => {
    let poolidold = JSON.stringify({
      DealID: {
        type: "in",
        value: [this.state.dealId],
      },
    });
    console.log("poolidold", poolidold);
    let mailid = "support@bdb.ai";
    let password = "Intain@321";
    const res = await axios.get(
      "https://bdb.imtest.intainmarkets.us/api/v1/imarkets/link?type=" +
        "preclosing" +
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

  getinvestorsoffchainwiredetails = async () => {
    var data = {};
    data.dealid = this.state.dealId;
    data.token = this.state.token;
    console.log("formdata", data);
    const APIResponse = await getinvestorsoffchainwiredetails(data);

    if (APIResponse.status === 200) {
      console.log("AllGetAllPoolsdata--", APIResponse);
      let bankdetails1 = APIResponse.data[0].bankdetails;
      if (bankdetails1 == "") {
        console.log("if", bankdetails1);
        this.setState({
          BankData: {
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
          BankData: {
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
            BankData: {
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
      // let Bank = JSON.parse(APIResponse.data[0].bankdetails);
      // this.setState({ BankData: Bank });
    } else {
      const message = "Couldn't fetch the record";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  savetransactiondetailsoffchain = async () => {
    this.setState({ formLoader: true });
    let newData = [
      {
        trancheid: this.state.trancheid,
        senderid: this.state.UserId,
        dealid: this.state.dealId,
        paymenttype: "Investment",
        account: "Closing",
        description: "Investor's Transaction",
        amount: this.state.committedamount,
        status: "Pending",
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
      this.OffChainClosePopup();
    } else {
      this.setState({ formLoader: false });
      const message = "Something went wrong";
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
        let data = new Uint8Array(file); // Use Uint8Array instead of Buffer
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
    var component = window.location.pathname;
    sessionStorage.setItem("component", component);
    this.getInvestorDealDetailsByDealId();
    this.getinvestorsoffchainwiredetails();
    this.bdbapi();
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

  handleChange11 = (e) => {
    console.log(e);
    this.setState({ value1: e.target.value });
  };

  handleClickAccepted = () => {
    this.setState({
      activeInsights1: true,
      activeInsights2: false,
      activeInsights3: false,
    });
  };

  handleClickPending = () => {
    this.setState({
      activeInsights1: false,
      activeInsights2: true,
      activeInsights3: false,
    });
  };
  handleClickRejected = () => {
    this.setState({
      activeInsights1: false,
      activeInsights2: false,
      activeInsights3: true,
    });
  };

  handlePopupInvest = () => {
    if (this.state.modalData.contractdata)
      this.setState({
        showRenderPopUp1: false,
        showRenderPopUp2: true,
        showRenderPopUp3: false,
      });
  };

  handleProcessingTime1 = () => {
    if (this.state.dealData.paymentmode == "onchain") {
      this.setState({ processingTimePopup1: true, open3: false });
    } else {
      this.setState({ processingTimePopup1: true, open7: false });
    }
  };

  handleOkProcessingTime1 = () => {
    if (this.state.dealData.paymentmode == "onchain") {
      this.setState({ processingTimePopup1: false, open3: true });
    } else {
      this.setState({ processingTimePopup1: false, open7: true });
    }
  };

  hadleImportantPopup = () => {
    if (this.state.dealData.paymentmode == "onchain") {
      this.setState({ importantPopup1: true, open3: false });
    } else {
      this.setState({ importantPopup1: true, open7: false });
    }
  };

  handleOkImportantPopup = () => {
    if (this.state.dealData.paymentmode == "onchain") {
      this.setState({ importantPopup1: false, open3: true });
    } else {
      this.setState({ importantPopup1: false, open7: true });
    }
  };

  handleAllSteps1 = () => {
    if (this.state.step == "step1") {
      this.setState({ allStepsPopup1: true, open3: false });
    } else if (this.state.step == "step2") {
      this.setState({ allStepsPopup1: true, open4: false });
    } else if (this.state.step == "step3") {
      this.setState({ allStepsPopup1: true, open5: false });
    }
  };

  handleOkAllSteps1 = () => {
    if (this.state.step == "step1") {
      this.setState({ allStepsPopup1: false, open3: true });
    } else if (this.state.step == "step2") {
      this.setState({ allStepsPopup1: false, open4: true });
    } else if (this.state.step == "step3") {
      this.setState({ allStepsPopup1: false, open5: true });
    }
  };

  handleImportantDetails = () => {
    this.setState({ importantDetailsPopup2: true, open4: false });
  };

  handleOkImportantDetailsPopup2 = () => {
    this.setState({ importantDetailsPopup2: false, open4: true });
  };

  handleImportantDetails3 = () => {
    this.setState({ importantDetailsPopup3: true, open5: false });
  };

  handleOkImportantDetailsPopup3 = () => {
    this.setState({ importantDetailsPopup3: false, open5: true });
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

    const columns = [
      {
        name: "trancheId",
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
        name: "trancheName",
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
        name: "creditEnhancement",
        label: "Credit Enhancement",
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
                <div className="text-center">{value + "%"}</div>
              </React.Fragment>
            );
          },
        },
      },
      {
        name: "pricipalBalance",
        label: "Principal Balance",
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
        name: "interestRate",
        label: "Interest Rate",
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
        name: "investedAmount",
        label: "Invested Amount",
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
        name: "currentcommitments",
        label: "Committed Amount",
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
                <div className="text-center">
                  <NumberComp2 value={value}></NumberComp2>
                </div>
              </React.Fragment>
            );
          },
        },
      },

      {
        name: "trancheId",
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
            let closingdate = tableMeta.rowData[8];
            // let closingdate = "01-15-2023";
            let committedamount = parseInt(tableMeta.rowData[6]);
            let investedAmount = parseInt(tableMeta.rowData[5]);
            // let availablecommitments = parseInt(tableMeta.rowData[9]);
            let availablecommitments = parseInt("0");

            // let investedAmount = parseInt("0");

            let closeD = new Date(closingdate);

            let cdt = new Date(closingdate);
            cdt.setDate(cdt.getDate() - 10);

            console.log("closing date", cdt);

            let closingstatus;
            if (new Date() > new Date(closeD)) {
              closingstatus = "crosseddate";
            } else {
              closingstatus = "stillcaninvest";
            }
            let datestatus;
            console.log("todays date", new Date());
            console.log("CLosingDATE", new Date(cdt));
            if (new Date() > new Date(cdt) || new Date() == new Date(cdt)) {
              datestatus = "greater";
            } else {
              datestatus = "smaller";
            }
            console.log("status", datestatus, closingstatus);

            // console.log(new Date(todayDate1) > new Date(cdt1));

            return (
              <React.Fragment>
                {this.state.dealData.paymentmode == "offchain" ? (
                  <div className="text-center">
                    {this.state.dealData.commitORinvest == "commit" ? (
                      committedamount == 0 ? (
                        <button
                          type="button"
                          onClick={() =>
                            this.onOpenModal1(
                              "Commit",
                              value,
                              tableMeta.rowData[1],
                              tableMeta.rowData[3],
                              tableMeta.rowData[6],
                              tableMeta.rowData[9],
                              tableMeta.rowData[8]
                            )
                          }
                          className="login-sign_up-links"
                        >
                          Commit
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() =>
                            this.onOpenModal1(
                              "Edit Commit",
                              value,
                              tableMeta.rowData[1],
                              tableMeta.rowData[3],
                              tableMeta.rowData[6],
                              tableMeta.rowData[9],
                              tableMeta.rowData[8]
                            )
                          }
                          className="login-sign_up-links"
                        >
                          Edit Commit
                        </button>
                      )
                    ) : this.state.dealData.commitORinvest == "invest" &&
                      committedamount > 0 ? (
                      investedAmount == 0 ? (
                        <button
                          type="button"
                          onClick={() =>
                            this.OffChainOpenPopup(value, tableMeta.rowData[6])
                          }
                          className="login-sign_up-links"
                        >
                          Invest
                        </button>
                      ) : (
                        <button
                          type="button"
                          disabled
                          className="login-sign_up-links button-disabled"
                        >
                          Invested
                        </button>
                      )
                    ) : (
                      <button className="login-sign_up-links">-</button>
                    )}
                  </div>
                ) : (
                  <div className="text-center">
                    {/* <Button variant="outlined" id="optionalbutton" type="submit" onClick={this.onOpenModal1.bind(this)}> */}
                    {closingstatus == "crosseddate" && investedAmount == 0 ? (
                      <button
                        type="button"
                        disabled
                        className="login-sign_up-links button-disabled"
                      >
                        Invest
                      </button>
                    ) : datestatus == "greater" &&
                      investedAmount == 0 &&
                      availablecommitments == 0 ? (
                      committedamount > 0 ? (
                        <button
                          type="button"
                          //  onClick={this.meta}
                          onClick={() => {
                            this.state.dealData.paymentmode == "onchain"
                              ? this.onOpenModal(
                                  value,
                                  tableMeta.rowData[1],
                                  tableMeta.rowData[3],
                                  tableMeta.rowData[6],
                                  tableMeta.rowData[9],
                                  tableMeta.rowData[8]
                                )
                              : this.OffChainOpenPopup(
                                  value,
                                  tableMeta.rowData[6]
                                );
                          }}
                          className="login-sign_up-links"
                        >
                          Invest
                        </button>
                      ) : (
                        <button className="login-sign_up-links">-</button>
                      )
                    ) : datestatus == "greater" && investedAmount > 0 ? (
                      <button
                        type="button"
                        disabled
                        className="login-sign_up-links button-disabled"
                      >
                        Invested
                      </button>
                    ) : datestatus == "smaller" ? (
                      committedamount > 0 ? (
                        <button
                          type="button"
                          onClick={() =>
                            this.onOpenModal1(
                              "Edit Commit",
                              value,
                              tableMeta.rowData[1],
                              tableMeta.rowData[3],
                              tableMeta.rowData[6],
                              tableMeta.rowData[9],
                              tableMeta.rowData[8]
                            )
                          }
                          className="login-sign_up-links"
                        >
                          Edit Commit
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() =>
                            this.onOpenModal1(
                              "Commit",
                              value,
                              tableMeta.rowData[1],
                              tableMeta.rowData[3],
                              tableMeta.rowData[6],
                              tableMeta.rowData[9],
                              tableMeta.rowData[8]
                            )
                          }
                          className="login-sign_up-links"
                        >
                          Commit
                        </button>
                      )
                    ) : (
                      <button
                        type="button"
                        disabled
                        className="login-sign_up-links button-disabled"
                      >
                        Invest
                      </button>
                    )}

                    {/* </Button> */}
                  </div>
                )}
              </React.Fragment>
            );
          },
        },
      },

      {
        name: "closingdate",
        label: "Closing Date",
        options: {
          filter: true,
          sort: true,
          display: false,
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
        name: "availablecommitments",
        label: "Avaliable Commitments",
        options: {
          filter: true,
          sort: true,
          display: false,
          // customBodyRender: (value, tableMeta, updateValue) => {
          //   return (
          //     <React.Fragment>
          //       <NumberComp value={value}></NumberComp>
          //     </React.Fragment>
          //   );
          // },
        },
      },
    ];

    return (
      <React.Fragment>
        <div className="page">
          <Sidebar activeComponent={"Opportunities"} />
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
                    <div className="buttonsverified">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.PoolDetails}
                        // onClick={this.OffChainOpenPopup}
                      >
                        View Pool Details
                      </Button>
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
                        <div className="editcontainer1">
                          <h5 className="headingpayment">Payment Rules</h5>
                        </div>
                        {/* <h3 className="headingpayment">Payment Rules</h3> */}
                      </AccordionSummary>
                      {this.state.paymentRules.length == 0 ? (
                        ""
                      ) : (
                        // <AccordionDetails>
                        //   <Typography>
                        //     <div className="bulletpoints1_container1">
                        //       <p className="bulletpoints11">
                        //         Add the data by clicking on the “Edit” button
                        //       </p>
                        //     </div>
                        //   </Typography>
                        // </AccordionDetails>
                        <AccordionDetails>
                          <Typography>
                            <ul className="bulletpoints">
                              {this.state.paymentRules.map((e) => {
                                return <li>{e.paymentRule}</li>;
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
                        // <AccordionDetails>
                        //   <Typography>
                        //     <div className="bulletpoints1_container1">
                        //       <p className="bulletpoints11">
                        //         Add the data by clicking on the “Edit” button
                        //       </p>
                        //     </div>
                        //   </Typography>
                        // </AccordionDetails>
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
                                    onClick={() => this.onOpenModal2(e)}
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
                              {this.state.dealData.dealName
                                ? this.state.dealData.dealName
                                : "-"}
                            </h6>
                          </div>
                          <div className="headingspaces1">
                            <p className="sizeofp">Asset Class</p>
                            <h6 className="headingspace1">
                              {" "}
                              {this.state.dealData.assetclass
                                ? this.state.dealData.assetclass
                                : "-"}
                            </h6>
                          </div>
                          <div className="headingspaces1">
                            <p className="sizeofp">Closing Date</p>
                            <h6 className="headingspace1">
                              {this.state.dealData.closingDate
                                ? this.state.dealData.closingDate
                                : "-"}
                            </h6>
                          </div>
                          <div className="headingspaces1">
                            <p className="sizeofp">Maturity Date</p>
                            <h6 className="headingspace1">
                              {this.state.dealData.maturityDate
                                ? this.state.dealData.maturityDate
                                : "-"}
                            </h6>
                          </div>
                        </div>

                        <div className="col">
                          <div className="headingspaces1">
                            <p className="sizeofp">Status</p>
                            <h6 className="headingspace1">
                              {this.state.dealData.status
                                ? this.state.dealData.status
                                : "-"}
                            </h6>
                          </div>
                          <div className="headingspaces1">
                            <p className="sizeofp">
                              Pool Original Principal Balance
                            </p>
                            <h6 className="headingspace1">
                              {this.state.dealData.originalbalance ? (
                                <NumberComp
                                  value={this.state.dealData.originalbalance}
                                ></NumberComp>
                              ) : (
                                "-"
                              )}
                            </h6>
                          </div>
                          <div className="headingspaces1">
                            <p className="sizeofp">1st Payment Date</p>
                            <h6 className="headingspace1">
                              {this.state.dealData.firstPaymentDate
                                ? this.state.dealData.firstPaymentDate
                                : "-"}
                            </h6>
                          </div>
                          <div className="headingspaces1">
                            <p className="sizeofp">Payment Frequency</p>
                            <h6 className="headingspace1">
                              {this.state.dealData.paymentFrequency
                                ? this.state.dealData.paymentFrequency
                                : "-"}
                            </h6>
                          </div>
                        </div>

                        <div className="col">
                          <div className="headingspaces1">
                            <p className="sizeofp">Verification Agent</p>
                            <h6 className="headingspace1">
                              {this.state.dealData.VAUserName
                                ? this.state.dealData.VAUserName
                                : "-"}
                            </h6>
                          </div>
                          <div className="headingspaces1">
                            <p className="sizeofp">Servicer</p>
                            <h6 className="headingspace1">
                              {this.state.dealData.ServicerUserName
                                ? this.state.dealData.ServicerUserName
                                : "-"}
                            </h6>
                          </div>
                          <div className="headingspaces1">
                            <p className="sizeofp">Underwriter</p>
                            <h6 className="headingspace1">
                              {this.state.dealData.UnderWriterUserName
                                ? this.state.dealData.UnderWriterUserName
                                : "-"}
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
                  {/* <div className="col-12 col-sm-6 col-md-4">
                    <div className="page-content3">
                      <div className="pieoutercontainer1">
                        <h5 className="headingspace">Asset Type</h5>
                        <Link to={""} className="login-sign_up-link">
                          Filter
                        </Link>
                      </div>

                      <div className="pieoutercontainer">
                        <div className="pieinnercontainer1-details1">
                          <PieChart width={340} height={350}>
                            <Pie
                              data={piedata}
                              cx={120}
                              cy={200}
                              innerRadius={100}
                              outerRadius={110}
                              fill="#8884d8"
                              paddingAngle={0}
                              dataKey="value"
                            >
                              {piedata.map((entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={COLORS[index % COLORS.length]}
                                />
                              ))}
                            </Pie>
                          </PieChart>
                        </div>
                        <div className="pieinnercontainer2">
                          <ul>
                            <li>Term Loans</li>
                            <li>Bridge Loans</li>
                            <li>Revolving Facilities</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6 col-md-4">
                    <div className="page-content3">
                      <div className="pieoutercontainer1">
                        <h5 className="headingspace">Issuer Performance</h5>
                        <Link to={""} className="login-sign_up-link">
                          Filter
                        </Link>
                      </div>
                      <div className="pieoutercontainer">
                        <div className="pieinnercontainer1-details1 areachart-graph">
                          <AreaChart
                            width={730}
                            height={250}
                            data={data}
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                          >
                            <defs>
                              <linearGradient
                                id="colorPv"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                              >
                                <stop
                                  offset="5%"
                                  stopColor="#FFC000"
                                  stopOpacity={0.8}
                                />
                                <stop
                                  offset="95%"
                                  stopColor="#FFC000"
                                  stopOpacity={0}
                                />
                              </linearGradient>
                            </defs>
                            <Area
                              // type="monotone"
                              dataKey="pv"
                              stroke="#FFC000"
                              fillOpacity={1}
                              fill="url(#colorPv)"
                            />
                          </AreaChart>
                        </div>
                      </div>
                    </div>
                  </div> */}
                </div>

                <div className="row row1">
                  <div>
                    {this.state.showSearchBox == true ? (
                      this.searchBar()
                    ) : (
                      <h1 className="headerdashboard1">Tranches</h1>
                    )}
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
            )}
          </div>
          <div id="modal">
            <ReactModal
              isOpen={this.state.open1}
              onRequestClose={this.onCloseModal}
              contentLabel="Minimal Modal Example"
              style={customStylesPopupInvest}
            >
              <React.Fragment>
                <div className="modalPopup2">
                  <div className="popupTitle">
                    <h2>Proceed to Invest</h2>
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
                    <div className="pending-pool-popup-card-bottom-container">
                      <div className="popup-card-bottom-container-first-invest">
                        <div className="first-inner-container">
                          <p className="sizeofp">Tranche Name</p>
                          <h6 className="headingspace1">
                            {this.state.trancheName}
                          </h6>
                        </div>

                        <div className="first-inner-container">
                          <p className="sizeofp">Current Commitments</p>
                          <h6 className="headingspace1">
                            <NumberComp
                              value={this.state.currentcommitments}
                            ></NumberComp>
                          </h6>
                        </div>
                      </div>

                      <div className="popup-card-bottom-container-second-invest">
                        <div className="first-inner-container">
                          <p className="sizeofp">Original Principal Balance</p>
                          <h6 className="headingspace1">
                            <NumberComp
                              value={this.state.principalbalance}
                            ></NumberComp>
                          </h6>
                        </div>

                        <div className="first-inner-container">
                          <p className="sizeofp">Available Commitments</p>
                          <h6 className="headingspace1">
                            <NumberComp
                              value={this.state.availablecommitments}
                            ></NumberComp>
                          </h6>
                        </div>
                      </div>
                    </div>
                    <div className="input-container">
                      <label className="label grey-text">
                        Committed Amount
                      </label>
                      <div className="flex input disabled-input">
                        <input
                          disabled
                          required
                          placeholder={this.state.formData.commitamount}
                          className="input-none"
                          type="number"
                          value={this.state.formData.commitamount}
                        />
                        {this.state.dealData.paymentmode == "offchain" ? (
                          <p className="grey-text">USD</p>
                        ) : (
                          <p className="grey-text">USDC</p>
                        )}
                      </div>
                    </div>

                    <div className="modalsubmit">
                      <div className="submitbuttonbg">
                        <div className="row">
                          <div className="row justify-content-invest">
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
                              onClick={this.Step1ModalOpen}
                            >
                              Invest
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

                    {/* {this.state.getLoansLoader === false ? '' : <FormLoader></FormLoader>} */}
                    {/* {this.state.openPopup === true ? <React.Fragment><Snackbar msg={"Processor addded Successfully" || this.state.message} open="true" /> </React.Fragment> : ' '} */}
                  </div>
                </div>
                {/* {this.state.showRenderPopUp1 && this.renderpopup1()} */}
                {/* {this.state.showRenderPopUp2 && this.renderpopup2()} */}
                {/* {this.state.showRenderPopUp3 && this.renderpopup3()} */}
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
              onRequestClose={this.Step1ModalClose}
              contentLabel="Minimal Modal Example"
              style={customStylesPopupInveststep}
            >
              <React.Fragment>
                <div className="modalPopup2">
                  <div className="popupTitle">
                    <h2>Investment in-progress...</h2>
                    <button
                      type="button"
                      className="closePopup"
                      style={{ minWidth: "30px" }}
                      onClick={this.Step1ModalClose}
                    >
                      {" "}
                      <CloseIcon></CloseIcon>{" "}
                    </button>
                  </div>
                  <div className="render-popup-2">
                    <div className="render-popup-2-inner-top-container">
                      <div className="render-popup-text-container">
                        <div className="flex-container3">
                          <p className="stepText">
                            Step 1: Send funds to Circle
                          </p>
                          <div className="circle-line-container">
                            <div className="ver-line" />
                            <div className="circle-container">
                              <div className="circle-1">
                                <div className="inner-circle1" />
                              </div>
                              <div className="circle-1"></div>
                              <div className="circle-1"></div>
                              <div className="circle-1"></div>
                            </div>
                          </div>
                        </div>

                        <p className="render-popup-small-text">
                          Please initiate a Wire Transfer in the amount of{" "}
                          {this.state.Amount} USD from your online bank account
                          to Circle using the Wire Instructions.{" "}
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
                        <p className="setup-popup-p">Wire Amount</p>
                        <span className="setup-popup-p-icon">
                          <p>{this.state.Amount}</p>{" "}
                          <CopyToClipboard
                            onCopy={this.onCopy}
                            text={this.state.Amount}
                          >
                            <ContentCopyIcon className="contentcopyicon" />
                          </CopyToClipboard>
                        </span>
                      </div>

                      {/* <div className="setup-inner-container">
                        <p className="setup-popup-p">Reference ID</p>
                        <span className="setup-popup-p-icon">
                          <p>{this.state.TrackingRef}</p>{" "}
                          <CopyToClipboard
                            onCopy={this.onCopy}
                            text={this.state.TrackingRef}
                          >
                            <ContentCopyIcon className="contentcopyicon" />
                          </CopyToClipboard>
                        </span>
                      </div> */}
                      <div className="setup-inner-container">
                        <p className="setup-popup-p">Account Number</p>
                        <span className="setup-popup-p-icon">
                          <p>{this.state.VAN}</p>{" "}
                          <CopyToClipboard
                            onCopy={this.onCopy}
                            text={this.state.VAN}
                          >
                            <ContentCopyIcon className="contentcopyicon" />
                          </CopyToClipboard>
                        </span>
                      </div>

                      <div className="setup-inner-container">
                        <p className="setup-popup-p">SWIFT/BIC Code</p>
                        <span className="setup-popup-p-icon">
                          <p>SIVGUS66</p>{" "}
                          <CopyToClipboard
                            onCopy={this.onCopy}
                            text={"SIVGUS66"}
                          >
                            <ContentCopyIcon className="contentcopyicon" />
                          </CopyToClipboard>
                        </span>
                      </div>

                      <div className="setup-inner-container">
                        <p className="setup-popup-p">Routing Number</p>
                        <span className="setup-popup-p-icon">
                          <p>322286803</p>{" "}
                          <CopyToClipboard
                            onCopy={this.onCopy}
                            text={"322286803"}
                          >
                            <ContentCopyIcon className="contentcopyicon" />
                          </CopyToClipboard>
                        </span>
                      </div>

                      <div className="setup-inner-container">
                        <p className="setup-popup-p">Beneficiary Name</p>
                        <span className="setup-popup-p-icon">
                          <p>CIRCLE INTERNET FINANCIAL INC</p>{" "}
                          <CopyToClipboard
                            onCopy={this.onCopy}
                            text={"CIRCLE INTERNET FINANCIAL INC"}
                          >
                            <ContentCopyIcon className="contentcopyicon" />
                          </CopyToClipboard>
                        </span>
                      </div>

                      <div className="setup-inner-container">
                        <p className="setup-popup-p">Beneficiary Address</p>
                        <span className="setup-popup-p-icon">
                          <p>99 HIGH STREET BOSTON MA 02110</p>{" "}
                          <CopyToClipboard
                            onCopy={this.onCopy}
                            text={"99 HIGH STREET BOSTON MA 02110"}
                          >
                            <ContentCopyIcon className="contentcopyicon" />
                          </CopyToClipboard>
                        </span>
                      </div>

                      <div className="setup-inner-container">
                        <p className="setup-popup-p">Bank Name</p>
                        <span className="setup-popup-p-icon">
                          <p>SILVERGATE BANK</p>{" "}
                          <CopyToClipboard
                            onCopy={this.onCopy}
                            text={"SILVERGATE BANK"}
                          >
                            <ContentCopyIcon className="contentcopyicon" />
                          </CopyToClipboard>
                        </span>
                      </div>
                      {/* 
                      <div className="setup-inner-container">
                        <p className="setup-popup-p">Bank Address</p>
                        <span className="setup-popup-p-icon">
                          <p>1 MONEY STREET NEW YORK, 1001 US</p>{" "}
                          <CopyToClipboard
                            onCopy={this.onCopy}
                            text={"1 MONEY STREET NEW YORK, 1001 US"}
                          >
                            <ContentCopyIcon className="contentcopyicon" />
                          </CopyToClipboard>
                        </span>
                      </div> */}
                    </div>
                  </div>

                  {this.state.copied ? (
                    <span className="copiedcss">Copied.</span>
                  ) : null}
                  <div className="render-popup-2">
                    <p className="popup-heading1">Find out more info here :</p>
                    <div className="render-popup-2-inner-top-container">
                      <div className="render-popup-text-container flex-container1 container-1">
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
                            onClick={this.hadleImportantPopup}
                          >
                            <b className="processing-time-bold color-text">
                              Important Details
                            </b>
                          </button>
                        </p>
                        <div className="mid-line" />
                        <p className="render-popup-small-text">
                          <button onClick={this.handleAllSteps1} type="button">
                            <b className="processing-time-bold color-text">
                              All Steps
                            </b>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="render-popup-2-button-container">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.Step2ModalOpen}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </React.Fragment>
            </ReactModal>
          </div>

          {/* processing time popup */}
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
                          Funds will be credited to Circle on the same day if
                          your Wire Transfer is submitted before 4PM ET.
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

          {/* Important popup */}
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
                            Do not send funds via ACH. An actual Wire Transfer
                            must be submitted.
                          </li>
                          <li className="render-popup-small-text lidatashift">
                            Do not forget to include the ‘trackingRef’ from Wire
                            Instructions as part of your Wire Transfer.
                          </li>
                          <li className="render-popup-small-text lidatashift">
                            Once your Wire Transfer is initiated, please email a
                            copy of your Wire Transfer confirmation page to
                            im_admin@intainft.com to ensure proper settlement of
                            your Wire Transfer.{" "}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="render-popup-2-button-container">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleOkImportantPopup}
                    >
                      Okay
                    </Button>
                  </div>
                </div>
              </React.Fragment>
            </ReactModal>
          </div>

          {/* All Steps popup */}
          <div id="modal">
            <ReactModal
              isOpen={this.state.allStepsPopup1}
              onRequestClose={this.Step1ModalClose}
              contentLabel="Minimal Modal Example"
              style={customStylesPopupInveststep}
            >
              <React.Fragment>
                <div className="modalPopup2">
                  <h3>All Steps</h3>

                  <div className="render-popup-2">
                    <div className="render-popup-2-inner-top-container flex-container-2">
                      <div className="hr-line" />
                      <div className="render-popup-text-container all-details-container">
                        <ul
                          style={{ marginTop: "10px" }}
                          className="shift-data-important"
                        >
                          <li className="render-popup-small-text type-disc">
                            <div className="circle" />
                            Step 1: Send Funds to circle
                          </li>
                          <li className="render-popup-small-text type-disc">
                            <div className="circle" />
                            Step 2: Recieve USDC in your wallet
                          </li>
                          <li className="render-popup-small-text type-disc">
                            <div className="circle" />
                            Step 3: Invest your USDC
                          </li>
                          <li className="render-popup-small-text type-disc">
                            <div className="circle" />
                            Step 4: Successfully Invested
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="render-popup-2-button-container">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleOkAllSteps1}
                    >
                      Okay
                    </Button>
                  </div>
                </div>
              </React.Fragment>
            </ReactModal>
          </div>

          {/* 2/4 */}

          {/* Important Details popup */}
          <div id="modal">
            <ReactModal
              isOpen={this.state.importantDetailsPopup2}
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
                          <li className="render-popup-small-text">
                            Only click Next once you have confirmed that your
                            Wire Transfer has settled with Circle.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="render-popup-2-button-container">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleOkImportantDetailsPopup2}
                    >
                      Okay
                    </Button>
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
              isOpen={this.state.open4}
              onRequestClose={this.Step2ModalClose}
              contentLabel="Minimal Modal Example"
              style={customStylesPopupInveststep}
            >
              <React.Fragment>
                <div className="modalPopup2">
                  <div className="popupTitle">
                    <h2>Investment in-progress...</h2>
                    <button
                      type="button"
                      className="closePopup"
                      style={{ minWidth: "30px" }}
                      onClick={this.Step2ModalClose}
                    >
                      {" "}
                      <CloseIcon></CloseIcon>{" "}
                    </button>
                  </div>

                  <div className="render-popup-2">
                    <div className="render-popup-2-inner-top-container">
                      <div className="render-popup-text-container">
                        <div className="flex-container3">
                          <p className="stepText">
                            Step 2: Recieve USDC in your wallet
                          </p>
                          <div className="circle-line-container">
                            <div className="ver-line" />
                            <div className="circle-container">
                              <div className="circle-1">
                                <div className="inner-circle1" />
                              </div>
                              <div className="circle-1">
                                <div className="inner-circle1" />
                              </div>
                              <div className="circle-1"></div>
                              <div className="circle-1"></div>
                            </div>
                          </div>
                        </div>
                        <p className="render-popup-small-text">
                          Please confirm that your C-Chain Wallet Address is
                          correct. Once you click Next, your C-Chain Wallet will
                          receive {this.state.Amount} USDC.
                        </p>

                        <div className="setup-popup-card small-card">
                          <div className="setup-popup-card-top-container">
                            <p
                              className="stepText"
                              style={{ marginBottom: "8px" }}
                            >
                              Wallet Details
                            </p>
                            <p
                              className="render-popup-small-text"
                              style={{ marginBottom: "2px" }}
                            >
                              C-Chain Wallet Address
                            </p>

                            <p className="render-popup-small-text">
                              {this.state.InvestorCchainAddress}
                            </p>
                          </div>
                        </div>

                        <p className="popup-heading1">
                          Find out more info here :
                        </p>

                        <div className="flex-container1 small-container">
                          <p className="render-popup-small-text">
                            <button
                              type="button"
                              onClick={this.handleImportantDetails}
                            >
                              <b className="processing-time-bold color-text">
                                Important Details
                              </b>
                            </button>
                          </p>
                          <div className="mid-line" />
                          <p className="render-popup-small-text">
                            <button
                              onClick={this.handleAllSteps1}
                              type="button"
                            >
                              <b className="processing-time-bold color-text">
                                All Steps
                              </b>
                            </button>
                          </p>
                        </div>

                        {/* <p>Find out more info here :</p>
                        <div className="flex-container1 small-container">
                          <p
                            className="render-popup-small-text"
                          >
                            <button type="button" onClick={this.handleImportantDetails}>
                              <b className="processing-time-bold color-text">Important Details</b>
                            </button>
                          </p>

                          <div className="mid-line" />

                          <p
                            className="render-popup-small-text"
                          >
                            <button type="button" onClick={this.handleAllSteps2}>
                              <b className="processing-time-bold color-text">
                                All Steps
                              </b>
                            </button>
                          </p>
                        </div> */}
                        {/* <p
                          style={{ marginTop: "10px" }}
                          className="render-popup-small-text"
                        >
                          <b className="processing-time-bold">Important :</b>
                        </p>
                        <ul
                          style={{ marginTop: "10px" }}
                          className="shift-data-important"
                        >
                          <li className="render-popup-small-text">
                            Only click Next once you have confirmed that your
                            Wire Transfer has settled with Circle.
                          </li>
                        </ul>
                        <p
                          style={{ marginTop: "10px" }}
                          className="render-popup-small-text"
                        >
                          <b className="processing-time-bold">
                            Further Steps :
                          </b>
                        </p>
                        <ul
                          style={{ marginTop: "10px" }}
                          className="shift-data-important"
                        >
                          <li className="render-popup-small-text">
                            Step 3/4: Send USDC to Issuer
                          </li>
                          <li className="render-popup-small-text">
                            Step 4/4: Receive Tokens
                          </li>
                        </ul> */}
                      </div>
                    </div>
                  </div>

                  <div className="render-popup-2-button-container">
                    <div className="status-pending-text">
                      <button
                        type="button"
                        className="popupbutton22 backshift"
                        onClick={this.Step1ModalOpen}
                      >
                        {" "}
                        Back{" "}
                      </button>
                      <Button
                        variant="contained"
                        color="primary"
                        disabled={this.state.step2status == true ? true : false}
                        onClick={this.transferUSDCtoInvestor}
                        // onClick={this.Step3ModalOpen}
                      >
                        Next
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
            {/* <Modal open={open1} onClose={this.onCloseModal1} center>
                    <div id="modalheader">
                      <h5>Create a Pool</h5>

                    </div> */}
            <ReactModal
              isOpen={this.state.open5}
              onRequestClose={this.Step3ModalClose}
              contentLabel="Minimal Modal Example"
              style={customStylesPopupInveststep}
            >
              <React.Fragment>
                <div className="modalPopup2">
                  <div className="popupTitle">
                    <h2>Investment in-progress...</h2>
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
                        <div className="flex-container3">
                          <p className="stepText">Step 3: Invest your USDC</p>
                          <div className="circle-line-container">
                            <div className="ver-line" />
                            <div className="circle-container">
                              <div className="circle-1">
                                <div className="inner-circle1" />
                              </div>
                              <div className="circle-1">
                                <div className="inner-circle1" />
                              </div>
                              <div className="circle-1">
                                <div className="inner-circle1" />
                              </div>
                              <div className="circle-1"></div>
                            </div>
                          </div>
                        </div>

                        <p
                          style={{ marginTop: "10px" }}
                          className="render-popup-small-text"
                        >
                          To complete your investment, please send{" "}
                          {this.state.Amount} USDC to the Issuer Wallet using
                          the ‘Proceed to Metamask’ button.
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outlined"
                      color="black"
                      disabled={
                        this.state.step3statusmetamask == true ? true : false
                      }
                      className="disabled-metamask-button"
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
                    <p className="popup-heading1">Find out more info here :</p>
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
                        <div
                          className="mid-line"
                          style={{ marginTop: "-15px" }}
                        />
                        <p className="render-popup-small-text">
                          <button onClick={this.handleAllSteps1} type="button">
                            <b className="processing-time-bold color-text">
                              All Steps
                            </b>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* <div className="render-popup-2">
                    <div className="render-popup-2-inner-top-container">
                      <div className="render-popup-text-container">
                        <div className="setup-inner-container">
                          {/* <span className="setup-popup-p-icon"> */}
                  {/* <p className="setup-popup-p processing-time-bold">C Chain Address : </p> */}
                  {/* <p style={{ marginLeft: '20px' }}>0fjg2958duitf</p> <CopyToClipboard onCopy={this.onCopy} text={"0fjg2958duitf"}><ContentCopyIcon className="contentcopyicon" /></CopyToClipboard></span> */}
                  {/* </div>
                        <p
                          style={{ marginTop: "10px" }}
                          className="render-popup-small-text"
                        >
                          <b className="processing-time-bold">
                            Important Details :{" "}
                          </b>
                        </p>
                        <p
                          style={{ marginTop: "10px" }}
                          className="render-popup-small-text"
                        >
                          Please make sure that your wallet contains enough AVAX
                          to cover transaction costs, and that the transaction
                          details pre-populated in Metamask match the below:
                        </p>
                        <ul
                          style={{ marginTop: "10px" }}
                          className="shift-data-important"
                        >
                          <li className="render-popup-small-text">
                            Network: Avalanche
                          </li>
                          <li className="render-popup-small-text">
                            Send To: {this.state.IssuerCchainAddress}
                          </li>
                          <li className="render-popup-small-text">
                            Asset: USDC
                          </li>
                          <li className="render-popup-small-text">
                            Amount: {this.state.Amount} USDC
                          </li>
                        </ul>
                        <p
                          style={{ marginTop: "10px" }}
                          className="render-popup-small-text"
                        >
                          <b className="processing-time-bold">
                            Further Steps :
                          </b>
                        </p>
                        <ul
                          style={{ marginTop: "10px" }}
                          className="shift-data-important"
                        >
                          <li className="render-popup-small-text">
                            Step 4/4: Receive Tokens
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div> */}

                  <div className="render-popup-2-button-container">
                    <div className="status-pending-text">
                      <button
                        type="button"
                        className="popupbutton22 backshift"
                        onClick={this.Step2ModalOpen}
                      >
                        {" "}
                        Back{" "}
                      </button>
                      {this.state.step3nextbutton == false ? (
                        <Button
                          disabled
                          variant="contained"
                          color="primary"
                          // onClick={this.Step4ModalOpen}
                        >
                          Next
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          color="primary"
                          disabled={
                            this.state.step3statuslayerzero == true
                              ? true
                              : false
                          }
                          onClick={this.layerzerosendmessage}
                          // onClick={this.Invest}
                        >
                          Next
                          {this.state.formLoader === true ? (
                            <CircularProgress size="22px" color="primary" />
                          ) : (
                            ""
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </React.Fragment>
            </ReactModal>
          </div>

          {/* 3/4 */}

          {/* Important Details popup */}
          <div id="modal">
            <ReactModal
              isOpen={this.state.importantDetailsPopup3}
              contentLabel="Minimal Modal Example"
              style={customStylesPopupInveststep}
            >
              <React.Fragment>
                <div className="modalPopup2">
                  <h3>Important Details</h3>

                  <div className="render-popup-2">
                    <div className="render-popup-2-inner-top-container">
                      <div className="render-popup-text-container">
                        <p
                          style={{ marginTop: "10px" }}
                          className="render-popup-small-text"
                        >
                          Please make sure that your wallet contains enough AVAX
                          to cover transaction costs, and that the transaction
                          details pre-populated in Metamask match the below:
                        </p>

                        <ul
                          style={{ marginTop: "10px" }}
                          className="shift-data-important"
                        >
                          <li className="render-popup-small-text lidatashift">
                            Network: Avalanche
                          </li>
                          <li className="render-popup-small-text lidatashift">
                            Send To: {this.state.IssuerCchainAddress}
                          </li>
                          <li className="render-popup-small-text lidatashift">
                            Asset: USDC
                          </li>
                          <li className="render-popup-small-text lidatashift">
                            Amount: {this.state.Amount} USDC
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
            {/* <Modal open={open1} onClose={this.onCloseModal1} center>
                    <div id="modalheader">
                      <h5>Create a Pool</h5>

                    </div> */}
            <ReactModal
              isOpen={this.state.open6}
              onRequestClose={this.Step4ModalClose}
              contentLabel="Minimal Modal Example"
              style={customStylesPopupInveststep}
            >
              <React.Fragment>
                <div className="modalPopup2">
                  {/* <h2>Investment in-progress...</h2>
                  <button
                    type="button"
                    className="closePopup"
                    style={{ minWidth: "30px" }}
                    onClick={this.Step4ModalClose}
                  >
                    {" "}
                    <CloseIcon></CloseIcon>{" "}
                  </button> */}

                  <div className="render-popup-2">
                    <div className="render-popup-2-inner-top-container">
                      {/* radio button type container */}

                      <div className="render-popup-text-container">
                        <div className="flex-container3 success-invest">
                          <p className="stepText success-text">
                            Successfully Invested!
                          </p>
                          {/* <div className="circle-line-container">
                            <div className="ver-line" />
                            <div className="circle-container">
                              <div className="circle-1"><div className="inner-circle1" /></div>
                              <div className="circle-1"><div className="inner-circle1" /></div>
                              <div className="circle-1"><div className="inner-circle1" /></div>
                              <div className="circle-1"><div className="inner-circle1" /></div>
                            </div>
                          </div> */}
                        </div>

                        <p
                          style={{ marginTop: "10px" }}
                          className="render-popup-small-text"
                        >
                          Congratulations, you are now successfully invested.
                          This investment can now be monitored under your
                          Dashboard page and this Deal Details page.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="render-popup-2-button-container">
                    {/* <p className="status-pending">
                      Status : <span>Pending</span>
                    </p> */}
                    <div className="status-pending-text">
                      {/* <button
                        type="button"
                        className="popupbutton22 backshift"
                        onClick={this.Step3ModalOpen}
                      >
                        {" "}
                        Back{" "}
                      </button> */}
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.getInvestorDealDetailsByDealId}
                      >
                        Great!
                      </Button>
                    </div>
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
              style={customStylesPopupInvest}
            >
              <React.Fragment>
                <div className="modalPopup2">
                  <div className="popupTitle">
                    <h2>Commit for Investment</h2>
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
                    <div className="pending-pool-popup-card-bottom-container">
                      <div className="popup-card-bottom-container-first-invest">
                        <div className="first-inner-container">
                          <p className="sizeofp">Tranche Name</p>
                          <h6 className="headingspace1">
                            {this.state.trancheName}
                          </h6>
                        </div>

                        <div className="first-inner-container">
                          <p className="sizeofp">Current Commitments</p>
                          <h6 className="headingspace1">
                            <NumberComp
                              value={this.state.currentcommitments}
                            ></NumberComp>
                          </h6>
                        </div>
                      </div>

                      <div className="popup-card-bottom-container-second-invest">
                        <div className="first-inner-container">
                          <p className="sizeofp">Original Principal Balance</p>
                          <h6 className="headingspace1">
                            <NumberComp
                              value={this.state.principalbalance}
                            ></NumberComp>
                          </h6>
                        </div>

                        <div className="first-inner-container">
                          <p className="sizeofp">Available Commitments</p>
                          <h6 className="headingspace1">
                            <NumberComp
                              value={this.state.availablecommitments}
                            ></NumberComp>
                          </h6>
                        </div>
                      </div>
                    </div>
                    <form className="form-container" onSubmit={this.onSubmit1}>
                      <div className="input-container">
                        <label className="label">Commit Amount</label>
                        <div className="flex input">
                          <input
                            required
                            type="number"
                            onKeyDown={this.blockInvalidChar}
                            placeholder="Type here"
                            className="input-none"
                            onChange={(e) => {
                              this.setState({
                                formData: {
                                  ...this.state.formData,
                                  commitamount: e.target.value,
                                },
                              });
                            }}
                            value={this.state.formData.commitamount}
                          />

                          {this.state.dealData.paymentmode == "offchain" ? (
                            <p>USD</p>
                          ) : (
                            <p>USDC</p>
                          )}
                        </div>
                      </div>

                      <div className="modalsubmit">
                        <div className="submitbuttonbg">
                          <div className="row">
                            <div
                              className={
                                this.state.CommitStatus == "Edit Commit"
                                  ? "row justify-content-editcommit"
                                  : "row justify-content-commit"
                              }
                            >
                              <button
                                type="button"
                                className="popupbutton22"
                                onClick={this.onCloseModal1}
                              >
                                {" "}
                                Cancel{" "}
                              </button>
                              {this.state.CommitStatus == "Edit Commit" ? (
                                <Button
                                  variant="contained"
                                  color="primary"
                                  type="submit"
                                  // onClick={this.EditCommit}
                                >
                                  Edit Commit
                                  {this.state.formLoader === true ? (
                                    <CircularProgress
                                      size="22px"
                                      color="primary"
                                    />
                                  ) : (
                                    ""
                                  )}
                                </Button>
                              ) : (
                                <Button
                                  variant="contained"
                                  color="primary"
                                  type="submit"
                                  // onClick={this.InvestmentCommit}
                                >
                                  Commit
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
                    </form>

                    {/* {this.state.getLoansLoader === false ? '' : <FormLoader></FormLoader>} */}
                    {/* {this.state.openPopup === true ? <React.Fragment><Snackbar msg={"Processor addded Successfully" || this.state.message} open="true" /> </React.Fragment> : ' '} */}
                  </div>
                </div>
              </React.Fragment>
            </ReactModal>
          </div>

          <div id="modal">
            <ReactModal
              isOpen={this.state.open7}
              onRequestClose={this.OffChainClosePopup}
              contentLabel="Minimal Modal Example"
              style={customStylesPopupInveststep}
            >
              <React.Fragment>
                <div className="modalPopup2">
                  <div className="popupTitle">
                    <h2>Invest</h2>
                    <button
                      type="button"
                      className="closePopup"
                      style={{ minWidth: "30px" }}
                      onClick={this.OffChainClosePopup}
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
                          {this.state.committedamount} USD using the below Wire
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
                          <p>{this.state.BankData?.billingDetails?.name}</p>{" "}
                          <CopyToClipboard
                            onCopy={this.onCopy}
                            text={this.state.BankData?.billingDetails?.name}
                          >
                            <ContentCopyIcon className="contentcopyicon" />
                          </CopyToClipboard>
                        </span>
                      </div>

                      <div className="setup-inner-container">
                        <p className="setup-popup-p">Billing Address Line 1</p>
                        <span className="setup-popup-p-icon">
                          <p>{this.state.BankData?.billingDetails?.line1}</p>{" "}
                          <CopyToClipboard
                            onCopy={this.onCopy}
                            text={this.state.BankData?.billingDetails?.line1}
                          >
                            <ContentCopyIcon className="contentcopyicon" />
                          </CopyToClipboard>
                        </span>
                      </div>

                      <div className="setup-inner-container">
                        <p className="setup-popup-p">Billing Address Line 2</p>
                        <span className="setup-popup-p-icon">
                          <p>{this.state.BankData?.billingDetails?.line2}</p>{" "}
                          <CopyToClipboard
                            onCopy={this.onCopy}
                            text={this.state.BankData?.billingDetails?.line2}
                          >
                            <ContentCopyIcon className="contentcopyicon" />
                          </CopyToClipboard>
                        </span>
                      </div>

                      <div className="setup-inner-container">
                        <p className="setup-popup-p">Billing City</p>
                        <span className="setup-popup-p-icon">
                          <p>{this.state.BankData?.billingDetails?.city}</p>{" "}
                          <CopyToClipboard
                            onCopy={this.onCopy}
                            text={this.state.BankData?.billingDetails?.city}
                          >
                            <ContentCopyIcon className="contentcopyicon" />
                          </CopyToClipboard>
                        </span>
                      </div>

                      <div className="setup-inner-container">
                        <p className="setup-popup-p"> Billing District</p>
                        <span className="setup-popup-p-icon">
                          <p>{this.state.BankData?.billingDetails?.district}</p>{" "}
                          <CopyToClipboard
                            onCopy={this.onCopy}
                            text={this.state.BankData?.billingDetails?.district}
                          >
                            <ContentCopyIcon className="contentcopyicon" />
                          </CopyToClipboard>
                        </span>
                      </div>

                      <div className="setup-inner-container">
                        <p className="setup-popup-p">Billing Country Code</p>
                        <span className="setup-popup-p-icon">
                          <p>{this.state.BankData?.billingDetails?.country}</p>{" "}
                          <CopyToClipboard
                            onCopy={this.onCopy}
                            text={this.state.BankData?.billingDetails?.country}
                          >
                            <ContentCopyIcon className="contentcopyicon" />
                          </CopyToClipboard>
                        </span>
                      </div>

                      <div className="setup-inner-container">
                        <p className="setup-popup-p"> Billing Postalcode</p>
                        <span className="setup-popup-p-icon">
                          <p>
                            {this.state.BankData?.billingDetails?.postalCode}
                          </p>{" "}
                          <CopyToClipboard
                            onCopy={this.onCopy}
                            text={
                              this.state.BankData?.billingDetails?.postalCode
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
                        <p className="setup-popup-p">Bank Address Line 1</p>
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
                        <p className="setup-popup-p">Bank Address Line 2</p>
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
                        <p className="setup-popup-p">Bank Address District</p>
                        <span className="setup-popup-p-icon">
                          <p>{this.state.BankData?.bankAddress?.district}</p>{" "}
                          <CopyToClipboard
                            onCopy={this.onCopy}
                            text={this.state.BankData?.bankAddress?.district}
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
                          <p>{this.state.BankData?.bankAddress?.country}</p>{" "}
                          <CopyToClipboard
                            onCopy={this.onCopy}
                            text={this.state.BankData?.bankAddress?.country}
                          >
                            <ContentCopyIcon className="contentcopyicon" />
                          </CopyToClipboard>
                        </span>
                      </div>

                      <div className="setup-inner-container">
                        <p className="setup-popup-p">Bank Postalcode</p>
                        <span className="setup-popup-p-icon">
                          <p>{this.state.BankData?.bankAddress?.postalCode}</p>{" "}
                          <CopyToClipboard
                            onCopy={this.onCopy}
                            text={this.state.BankData?.bankAddress?.postalCode}
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
                    <p className="popup-heading1">Find out more info here :</p>
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
                            onClick={this.hadleImportantPopup}
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
                      <button
                        type="button"
                        className="popupbutton22 backshift"
                        onClick={this.OffChainClosePopup}
                      >
                        {" "}
                        Cancel{" "}
                      </button>

                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.savetransactiondetailsoffchain}
                      >
                        Completed
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
              isOpen={this.state.open8}
              onRequestClose={this.onCloseModal2}
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
                      onClick={this.onCloseModal2}
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
                                onClick={this.onCloseModal2}
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
      </React.Fragment>
    );
  }
}

export default withSnackbar(InvestorDealDetails);
