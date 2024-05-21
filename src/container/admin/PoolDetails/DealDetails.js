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
  customStylesautosmallmodalpopup,
  customStylesautosmallmodal,
  customStylesAcceptPopup,
} from "../../../components/customscripts/customscript";
import FormLoader from "../../../components/loader/formLoader";
import {
  getDealDetailsByDealId,
  PoolDetails,
  PublishUW,
  updatetranchestatus,
  approvetranche,
  approvetranchebywalletfile,
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
import LockIcon from "@material-ui/icons/Lock";
import PublicIcon from "@material-ui/icons/Public";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import NumberComp from "../../../components/NumberComp";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import NumberComp2 from "../../../components/NumberComp2";
import { TODO_LIST_ABI, TODO_LIST_ADDRESS } from "./config";
import Web3 from "web3";
import Iframe from "react-iframe";
import Logo2 from "../../../images/wellslogored.png";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import CryptoJS from "crypto-js";
import ReactBetterPassword from "react-better-password";

const history = require("history").createBrowserHistory();

const demoTranche = [
  {
    name: "Senior (22UAE16)",
    status: "Done",
  },
  {
    name: "Senior (22UAE22)",
    status: "Remaining",
  },
  {
    name: "Senior (22UAE08)",
    status: "Remaining",
  },
];

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
// const token = sessionStorage.getItem("token");

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

class Issuer_Deals_Details extends Component {
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
      screenloader: false,
      searchText: "",
      rowsSelected: null,
      open1: false,
      open2: false,
      open3: false,
      open4: false,
      open5: false,
      formData: {
        selectType: "Private Key",
        privateKey: "",
        PrivatePassword: "",
      },
      formData1: {
        documentname: "",
        description: "",
        privacymode: "",
      },
      UserId: sessionStorage.getItem("userid"),
      dealId: sessionStorage.getItem("dealId"),
      token: sessionStorage.getItem("token"),
      poolName: sessionStorage.getItem("poolname"),
      Redirection: sessionStorage.getItem("component"),
      issueraddress: sessionStorage.getItem("subnetaccaddress"),
      activeInsights1: true,
      activeInsights2: false,
      activeInsights3: false,
      showSearchBox: false,
      paymentRules: [],
      dealData: {},
      dealDocuments: [],
      publishButton: true,
      formloadmetamask: false,
      bdbUrl: "",
      selectedData: [],
      metamaskstatus: false,
      investorstatus: false,
      showPassword1: false,
      showPassword2: false,
      file1: "",
      show: false,
      show1: false,
      showMessage: false,
      theme: sessionStorage.getItem("dark-theme"),
    };
    this.onChange = this.onChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onChange1 = this.onChange1.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);
  }
  onChange(value) {
    this.setState({ password: value });
  }

  handleChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }
  onChange1(value) {
    this.setState({ password1: value });
  }

  handleChange1(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }
  handleOnChangeAdd = (data) => {
    this.setState((prevState) => ({
      selectedData: [...prevState.selectedData, data],
    }));
  };

  handleOnChnageRemove = (data) => {
    const newArr = this.state.selectedData;
    if (newArr.length > 0) {
      let indexPosition = newArr.findIndex(
        (element) => element.name === data.name
      );
      newArr.splice(indexPosition, 1);
      this.setState({ selectedData: newArr });
    }
  };
  onOpenModal4 = (e) => {
    console.log("e", e);
    this.setState({
      open5: true,
      documentDetail: e,
      formData1: {
        documentname: e.documentname,
        description: e.description,
        privacymode: e.privacymode,
      },
    });
  };
  onCloseModal4 = () => {
    this.setState({ open5: false });
  };

  onOpenModal = (value, principalBalance, deployedaddress) => {
    console.log("aprrove issuer");
    this.setState({
      open1: true,
      trancheId: value,
      principalBalance: principalBalance,
      deployedaddress: deployedaddress,
    });
  };
  onOpenModal3 = (value, principalBalance, deployedaddress) => {
    console.log("aprrove issuer");
    this.setState({
      open4: true,
      trancheId: value,
      principalBalance: principalBalance,
      deployedaddress: deployedaddress,
    });
  };
  onOpenModal1 = () => {
    console.log("publish popup");
    this.setState({ open2: true });
  };
  onOpenModal2 = (value, principalBalance, deployedaddress) => {
    console.log("new aprrove issuer");
    this.setState({
      open3: true,
      trancheId: value,
      principalBalance: principalBalance,
      deployedaddress: deployedaddress,
    });
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
    this.setState({
      open4: false,
      formData: {
        selectType: "Private Key",
        privateKey: "",
        PrivatePassword: "",
      },
      file1: "",
      password: "",
      password1: "",
      showMessageData1: "",
      showMessageData: "",
    });
  };

  onSubmit1 = (e) => {
    e.preventDefault();
    console.log(this.state.formData);
    var ciphertext = CryptoJS.AES.encrypt(
      JSON.stringify(this.state.password1),
      "ALtReKQqUH1VTh43vNomog=="
    ).toString();
    console.log("ciphertext", ciphertext);
    if (this.state.formData.selectType == "Private Key") {
      this.approvetranche(ciphertext);
    } else {
      this.approvetranchebywalletfile();
    }
  };
  handleOnChange2 = (e) => {
    this.setState({
      file1: e.target.files[0],
      filename1: e.target.files[0].name,
    });
    console.log("eeee", e.target.files[0].name, this.state.file1);
  };
  handleOnClick1 = (e) => {
    this.setState({
      formData: { ...this.state.formData, privateKey: e.target.value },
    });
  };
  handleButtonClick1 = () => {
    this.setState((prevState) => ({
      showPassword1: !prevState.showPassword1,
    }));
  };
  handleOnClick2 = (e) => {
    this.setState({
      formData: { ...this.state.formData, PrivatePassword: e.target.value },
    });
  };
  handleButtonClick2 = () => {
    this.setState((prevState) => ({
      show: !prevState.show,
    }));
  };
  async selectedpoolid(selected) {
    const arr = [];

    for (var i = 0; i < selected.length; i++) {
      var j = selected[i];
      let PoolID = this.state.tableData[j];
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
  handleClicks = () => {
    window.location.assign("/admin/issuerinsights");
    // this.props.history.push( '/admin/issuerinsights');
  };
  getDealDetailsByDealId = async () => {
    var data = {};
    data.dealid = this.state.dealId;
    data.userid = this.state.UserId;
    console.log("datata", data);
    this.setState({ screenloader: true });
    data.token = this.state.token;
    const APIResponse = await getDealDetailsByDealId(data);

    if (APIResponse.status === 200) {
      this.setState({
        screenloader: false,
        IssuerCChainAddress: APIResponse.data.dealData.UserAccountAddress,
        dealData: APIResponse.data.dealData,
        tableData: APIResponse.data.trancheData,
        paymentRules: APIResponse.data.paymentRules,
        dealDocuments: APIResponse.data.dealDocuments,
      });
      sessionStorage.setItem(
        "paymentmode",
        APIResponse.data.dealData.paymentmode
      );
      console.log(
        "IssuerCChainAddress",
        APIResponse.data.dealData.UserAccountAddress
      );
      for (var i = 0; i < APIResponse.data.trancheData.length; i++) {
        if (APIResponse.data.trancheData[i].approvestatus === "Approved") {
          this.setState({ publishButton: false });
        } else {
          this.setState({ publishButton: true });
          break;
        }
      }
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
    // this.props.history.push("/admin/pooldetails");
    window.location.assign("/admin/pooldetails");
    // } else {
    //   const message = "Couldn't fetch the record";
    //   this.props.enqueueSnackbar(message, {
    //     variant: "error",
    //     autoHideDuration: 3000,
    //   });
    // }
  };

  PublishUW = async () => {
    var data = {};

    data.dealid = this.state.dealId;
    data.status = "Open";
    console.log("datata", data);
    this.setState({ formLoader: true, investorstatus: true });
    data.token = this.state.token;
    const APIResponse = await PublishUW(data);

    if (APIResponse.status == 200) {
      this.setState({ formLoader: false, investorstatus: false });
      const message = "Deal Update Status Success";
      this.props.enqueueSnackbar(message, {
        variant: "info",
        autoHideDuration: 3000,
      });
      this.onCloseModal1();
    } else {
      this.setState({ formLoader: false, investorstatus: false });
      const message = "Couldn't fetch the record";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  meta = async () => {
    this.setState({ formloadmetamask: true, metamaskstatus: true });
    const web3 = new Web3(Web3.givenProvider || "http://localhost:3000");

    let chainId = 101122;
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
          console.log("Inside error 4902");
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainName: "IntainMarketsTest",
                chainId: web3.utils.toHex(chainId),
                nativeCurrency: { name: "IMA", decimals: 18, symbol: "IMA" },
                rpcUrls: [
                  "http://104.42.155.78:9650/ext/bc/2ALtzRYgRpRWnTgjdrMArkMvU6RTpcjs7VWmupqYaPrHDrHLSd/rpc",
                ],
              },
            ],
          });
          console.log("CATCH");
          // this.newfun()
        }
      }
      console.log("After CATCH");
    } else {
      this.newfun();
    }
  };

  newfun = async (account) => {
    this.setState({ formloadmetamask: true, metamaskstatus: true });
    // web3.eth
    //   .getBalance("0xC60B683D1835B72A1f3CdAE3ac29b49607F0176D")
    //   .then(console.log);

    const web3 = new Web3(Web3.givenProvider || "http://localhost:3000");
    let accounts = await web3.eth.getAccounts();

    if (accounts[0] == this.state.IssuerCChainAddress) {
      this.setState({ account: accounts[0] });
      console.log("DYnamic value" + accounts[0]);
      this.approve(accounts[0]);
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
      this.approve(accounts[0]);
    }
  };

  approve = async (account) => {
    this.setState({ formloadmetamask: true, metamaskstatus: true });
    const web3 = new Web3(Web3.givenProvider || "http://localhost:3000");

    const todoList = new web3.eth.Contract(
      TODO_LIST_ABI,
      this.state.deployedaddress
    );
    todoList.methods
      .approve(
        "0xC60B683D1835B72A1f3CdAE3ac29b49607F0176D",
        (parseFloat(this.state.principalBalance) * Math.pow(10, 6)).toString()
      )
      .send({ from: account })
      .once("receipt", (receipt) => {
        console.log("SUccess", JSON.stringify(receipt));
        this.setState({ formloadmetamask: true, metamaskstatus: true });

        const message = "Metamask Transaction Successfull";

        this.props.enqueueSnackbar(message, {
          variant: "info",
          autoHideDuration: 5000,
        });
        this.updatetranchestatus();
      })
      .then("receipt", (receipt) => {
        this.setState({ formloadmetamask: false, metamaskstatus: false });

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

  updatetranchestatus = async () => {
    var data = {};
    data.trancheid = this.state.trancheId;
    data.approvestatus = "Approved";
    data.token = this.state.token;
    console.log("datata", data);
    this.setState({ formloadmetamask: true, metamaskstatus: true });
    const APIResponse = await updatetranchestatus(data);

    if (APIResponse.status === 200) {
      this.setState({
        formloadmetamask: false,
        metamaskstatus: false,
      });
      const message = "Tranche Update Status Successfull";
      this.props.enqueueSnackbar(message, {
        variant: "info",
        autoHideDuration: 3000,
      });
      this.onCloseModal();
      this.getDealDetailsByDealId();
    } else {
      this.setState({ formloadmetamask: false, metamaskstatus: false });

      const message = "Something went wrong";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
      this.onCloseModal();
    }
  };
  approvetranche = async (value) => {
    var data = {};
    data.trancheid = this.state.trancheId;
    data.privatekey = value;
    data.token = this.state.token;
    data.issueraddress = this.state.issueraddress;
    console.log("datata", data);
    this.setState({ formLoader: true });
    const APIResponse = await approvetranche(data);

    if (APIResponse.status === 200) {
      this.setState({ formLoader: false });
      const message = "Tranche Approval Success";
      this.props.enqueueSnackbar(message, {
        variant: "info",
        autoHideDuration: 3000,
      });
      this.onCloseModal3();
      this.getDealDetailsByDealId();
    } else if (APIResponse.status === 201) {
      this.setState({
        showMessage: true,
        showMessageData1: APIResponse.data.message,
        formLoader: false,
      });
      // const message = APIResponse.data.message
      // this.props.enqueueSnackbar(message, {
      //   variant: "error",
      //   autoHideDuration: 3000,
      // });
      // this.onCloseModal3();
      // this.getDealDetailsByDealId();
    } else {
      this.setState({ formLoader: false });
      const message = "Something went wrong";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
      this.onCloseModal3();
    }
  };

  approvetranchebywalletfile = async () => {
    const newdata = new FormData();
    newdata.append("filename", this.state.file1);
    newdata.append("trancheid", this.state.trancheId);
    newdata.append("password", this.state.password);
    newdata.append("issueraddress", this.state.issueraddress);
    newdata.append("token", this.state.token);
    console.log("newdata", newdata);
    this.setState({ formLoader: true });
    const APIResponse = await approvetranchebywalletfile(
      newdata,
      this.state.token
    );

    if (APIResponse.status === 200) {
      this.setState({ formLoader: false });
      const message = "Tranche Approval Success";
      this.props.enqueueSnackbar(message, {
        variant: "info",
        autoHideDuration: 3000,
      });
      this.onCloseModal3();
      this.getDealDetailsByDealId();
    } else if (APIResponse.status === 201) {
      this.setState({
        showMessage: true,
        showMessageData: APIResponse.data.message,
        formLoader: false,
      });
      // const message = APIResponse.data.message
      // this.props.enqueueSnackbar(message, {
      //   variant: "error",
      //   autoHideDuration: 3000,
      // });
      // this.onCloseModal3();
      // this.getDealDetailsByDealId();
    } else {
      this.setState({ formLoader: false });
      const message = "Something went wrong";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
      this.onCloseModal3();
    }
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
    this.getDealDetailsByDealId();
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
              backgroundColor: "var(--tablerow-even-bg)",
            },
            "&.Mui-selected": {
              backgroundColor: "var(--white)",
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
            backgroundColor: "var(--white)",
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
            color: "var(--text-color)",
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
        MUIDataTableBody: {
          emptyTitle: {
            fontSize: "15px !important",
            fontFamily: "Mulish, sans-serif !important",
            color: "#8C8C8C !important",
          },
        },
      },
    });

  render() {
    const { password, password1 } = this.state;
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
              "Sorry, there is no matching deal data to display"
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
        name: "approvestatus",
        label: "Approve Status",
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
            return (
              <React.Fragment>
                <div className="text-center">
                  {/* <Button variant="outlined" id="optionalbutton" type="submit" onClick={this.onOpenModal1.bind(this)}> */}
                  {tableMeta.rowData[6] == "pending" ? (
                    <button
                      type="button"
                      className="login-sign_up-links"
                      onClick={() =>
                        this.state.paymentmode == "onchain"
                          ? this.onOpenModal(
                              value,
                              tableMeta.rowData[3],
                              tableMeta.rowData[8]
                            )
                          : this.onOpenModal3(
                              value,
                              tableMeta.rowData[3],
                              tableMeta.rowData[8]
                            )
                      }
                    >
                      Approve
                    </button>
                  ) : (
                    <button
                      disabled
                      type="button"
                      className="login-sign_up-links button-disabled"
                      // onClick={() => this.onOpenModal(value, tableMeta.rowData[3],tableMeta.rowData[8])}
                    >
                      Approve
                    </button>
                  )}
                  {/* </Button> */}
                </div>
              </React.Fragment>
            );
          },
        },
      },
      {
        name: "deployedaddress",
        label: "Deploy Address",
        options: {
          filter: true,
          sort: true,
          display: false,
        },
      },
    ];
    const { theme } = this.state;
    return (
      <React.Fragment>
        <div className="page">
          <Sidebar activeComponent={"Portfolio"} />
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
                      <Button
                        variant="outlined"
                        color="black"
                        onClick={this.PoolDetails}
                      >
                        View Pool Details
                      </Button>
                      {this.state.publishButton === false ? (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={this.onOpenModal1}
                        >
                          Publish
                        </Button>
                      ) : this.state.dealData.status === "Open" ? (
                        <Button
                          disabled
                          variant="contained"
                          color="primary"
                          // onClick={this.onOpenModal1}
                        >
                          Deal Published
                        </Button>
                      ) : (
                        <Button
                          disabled
                          variant="contained"
                          color="primary"
                          onClick={this.onOpenModal1}
                        >
                          Publish
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="abovepart1">
                  <div className="part1">
                    <Accordion
                      defaultExpanded={true}
                      style={{
                        height: "273px",
                        // background : theme === "light" ? "#FFFFFF" : "#191F22",
                        // color :  theme === "light" ? "#212121" : "#FFFFFF"
                      }}
                    >
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
                    <Accordion
                      defaultExpanded={true}
                      style={{ height: "273px" }}
                    >
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
                                    {e.privacymode == "public" ? (
                                      <PublicIcon className="lockicon"></PublicIcon>
                                    ) : (
                                      <LockIcon className="lockicon"></LockIcon>
                                    )}
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
                                    onClick={() => this.onOpenModal4(e)}
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
                  {/* <div className="col-12 col-sm-6 col-md-4 all-width">
                    <div className="page-content3 graph-title-1">
                      <div className="pieoutercontainer1">
                        <h5 className="headingspace">Issuer Originations</h5>
                        <Link to={""} className="login-sign_up-link">
                          Filter
                        </Link>
                      </div>
                      <BarChart
                        width={500}
                        height={240}
                        data={data}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                        barSize={10}
                        className="bar-chart-container"
                      >
                        <XAxis
                          dataKey="name"
                          scale="point"
                          padding={{ left: 20, right: 20 }}
                          axisLine={false}
                          className="xaxis-chart-container"
                        />
                        {/* <YAxis /> */}
                  {/* <Tooltip /> */}
                  {/* <Legend /> */}
                  {/* <CartesianGrid strokeDasharray="3 3" /> */}
                  {/* <Bar
                          dataKey="pv"
                          fill="#FFC000"
                          // background={{ fill: "#eee" }}
                          radius={10}
                        />
                      </BarChart>
                    </div>
                  </div> */}
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
                              {this.state.dealData.closingDate}
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
                  </div> */}
                  {/* <div className="col-12 col-sm-6 col-md-4">
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
                    <h1 className="headerdashboard1">Tranches</h1>
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
                    style={customStylesAcceptPopup}
                  >
                    <React.Fragment>
                      <div className="modalPopup2">
                        <div className="popupTitle">
                          <h2>Approve the Issuance</h2>
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
                          <div className="pa_popup-main-body-container">
                            Each tranche in this deal is represented by Fungible
                            Tokens (FTs) that are currently held in your IM
                            Subnet Wallet; once this deal is published, those
                            FTs will be exchanged with Investors for USDC.
                            <br></br>
                            <br></br>
                            By signing the Approve Transaction below, you agree
                            to allow IM to automatically debit the corresponding
                            amount of FTs from your IM Subnet Wallet as
                            Investors credit your C-Chain Wallet with USDC.”
                          </div>

                          {/* //<div className="pa_popup-main-body-container">
                            //   Each tranche in this deal is represented by Fungible
                            //   Tokens (FTs) that are currently held in your IM
                            //   Subnet Wallet; once this deal is published, those
                            //   FTs will be exchanged with Investors for USD.
                            //   <br></br>
                            //   <br></br>
                            //   By signing the Approve Transaction below, you agree
                            //   to allow IM to automatically debit the corresponding
                            //   amount of FTs from your IM Subnet Wallet as
                            //   Investors credit your C-Chain Wallet with USD.”
                            // </div>
                             */}

                          <div className="accept_pop-button-container">
                            <button
                              className="pa_popup-reject-btn"
                              onClick={this.onCloseModal}
                            >
                              Cancel
                            </button>

                            <Button
                              variant="contained"
                              color="primary"
                              type="button"
                              disabled={
                                this.state.metamaskstatus == true ? true : false
                              }
                              onClick={this.meta}
                            >
                              {" "}
                              Sign with MetaMask
                              {this.state.formloadmetamask === true ? (
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
                    isOpen={this.state.open4}
                    onRequestClose={this.onCloseModal3}
                    contentLabel="Minimal Modal Example"
                    style={customStylesautosmallmodal}
                  >
                    <React.Fragment>
                      <div className="modalPopup2">
                        <div className="popupTitle">
                          <h2>Approve the Issuance</h2>
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

                        <div className="modalshiftcontent">
                          <form
                            className="form-container"
                            onSubmit={this.onSubmit1}
                          >
                            <div className="input-container-select-type">
                              <label className="label-private-key">
                                Select Type
                              </label>
                              <select
                                required
                                className="input-select-private-key"
                                onChange={(e) => {
                                  this.setState({
                                    formData: {
                                      ...this.state.formData,
                                      selectType: e.target.value,
                                    },
                                  });
                                }}
                                value={this.state.formData.selectType}
                              >
                                <option value="" disabled>
                                  Select any one
                                </option>
                                <option value="Private Key">Private Key</option>
                                <option value="JSON File">JSON File</option>
                              </select>
                            </div>
                            {this.state.formData.selectType == "Private Key" ? (
                              <div className="input-container">
                                <label className="label">
                                  Enter your private key for{" "}
                                  {this.state.issueraddress} account:
                                </label>
                                <div className="flex input">
                                  <ReactBetterPassword
                                    required
                                    placeholder="Type here"
                                    show={this.state.show1}
                                    name="password"
                                    value={password1}
                                    onChange={this.onChange1}
                                    className="input-none"
                                  />
                                  {/* <input
                                  required
                                  placeholder="Type here"
                                  className="input-none"
                                  type={
                                    this.state.showPassword1
                                      ? "text"
                                      : "password"
                                  }
                                  onChange={this.handleOnClick1}
                                  value={this.state.formData.privateKey}
                                  // required
                                /> */}
                                  <button
                                    type="button"
                                    className="eye-btn"
                                    onClick={this.handleButtonClick1}
                                  >
                                    {this.state.show1 ? (
                                      <VisibilityOffIcon />
                                    ) : (
                                      <VisibilityIcon />
                                    )}
                                  </button>
                                </div>
                                <p className="error-msg">
                                  {this.state.showMessageData1}
                                </p>
                                <div>
                                  <p className="label1">
                                    Note: The private key will be used only for
                                    transaction signing purpose and will not be
                                    stored it in our DB.
                                    <br></br>
                                    By Approving, you are providing access to
                                    Intain admin to transfer the tranche tokens.
                                  </p>
                                </div>
                              </div>
                            ) : (
                              <React.Fragment>
                                <div className="">
                                  <div className="kyc-card__button-container1">
                                    <div>
                                      <button
                                        className="card__button"
                                        style={{
                                          position: "relative",
                                        }}
                                      >
                                        <label
                                          htmlFor="icon-button-file-id2"
                                          className="upload-button-label"
                                        >
                                          Upload
                                        </label>
                                        <input
                                          required
                                          id="icon-button-file-id2"
                                          type="file"
                                          // accept=".json, text/plain"
                                          // style={{ display: "none" }}
                                          style={{
                                            position: "absolute",
                                            width: "60%",
                                            height: "100%",
                                            cursor: "pointer",
                                            top: "0",
                                            right: "0px",
                                            opacity: "0",
                                            border: "1.2px solid #212121",
                                          }}
                                          onChange={this.handleOnChange2}
                                        />
                                      </button>
                                    </div>
                                    {this.state.file1 !== "" && (
                                      <div className="kyc-card__select_name-container">
                                        <p>{this.state.filename1}</p>
                                        {/* <button type="button" onClick={handleClickCross}>
                          x
                      </button> */}
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div className="input-container">
                                  <div className="flex input">
                                    {/* <input id="i0" onChange={this.maskInput()}>Enter text</input> */}
                                    <ReactBetterPassword
                                      required
                                      placeholder="Enter Password"
                                      show={this.state.show}
                                      name="password"
                                      value={password}
                                      onChange={this.onChange}
                                      className="input-none"
                                    />
                                    <button
                                      type="button"
                                      className="eye-btn"
                                      onClick={this.handleButtonClick2}
                                    >
                                      {this.state.show ? (
                                        <VisibilityOffIcon />
                                      ) : (
                                        <VisibilityIcon />
                                      )}
                                    </button>
                                    {/* <input
                                  required
                                  placeholder="Enter Password"
                                  className="input-none"
                                  type={
                                    this.state.showPassword2
                                      ? "text"
                                      : "password"
                                  }
                                  autocomplete="off"
                                  onChange={this.handleOnClick2}
                                  value={this.state.formData.PrivatePassword}
                                  // required
                                />
                                <button
                                  type="button"
                                  className="eye-btn"
                                  onClick={this.handleButtonClick2}
                                >
                                  {this.state.showPassword2 ? (
                                    <VisibilityOffIcon />
                                  ) : (
                                    <VisibilityIcon />
                                  )}
                                </button> */}
                                  </div>

                                  <p className="error-msg">
                                    {this.state.showMessageData}
                                  </p>
                                  <div>
                                    <p className="label1">
                                      Note: The private key will be used only
                                      for transaction signing purpose and will
                                      not be stored it in our DB.
                                      <br></br>
                                      By Approving, you are providing access to
                                      Intain admin to transfer the tranche
                                      tokens.
                                    </p>
                                  </div>
                                </div>
                              </React.Fragment>
                            )}

                            <div className="accept_pop-button-container">
                              <button
                                className="pa_popup-reject-btn"
                                onClick={this.onCloseModal3}
                              >
                                Cancel
                              </button>

                              <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                              >
                                {this.state.formLoader === true ? (
                                  <CircularProgress
                                    size="22px"
                                    color="primary"
                                  />
                                ) : (
                                  <span> Approve</span>
                                )}
                              </Button>
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
                    style={customStylesautosmallmodal}
                  >
                    <React.Fragment>
                      <div className="modalPopup2">
                        <div className="popupTitle">
                          <h2>Publish Deal to Investors</h2>
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
                            In order to publish this deal, you will first need
                            to approve the issuance of each of its tranches;
                            please go to the Tranche(s) section to accomplish
                            this
                          </div>

                          <div className="accept_pop-button-container">
                            <button
                              className="pa_popup-reject-btn"
                              onClick={this.onCloseModal1}
                            >
                              Cancel
                            </button>
                            <Button
                              variant="contained"
                              color="primary"
                              type="button"
                              disabled={
                                this.state.investorstatus == true ? true : false
                              }
                              onClick={this.PublishUW}
                            >
                              {" "}
                              Confirm
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
                    isOpen={this.state.open3}
                    onRequestClose={this.onCloseModal2}
                    contentLabel="Minimal Modal Example"
                    style={customStylesAcceptPopup}
                  >
                    <React.Fragment>
                      <div className="modalPopup2">
                        <div className="popupTitle">
                          <h2>Approve the Issuance</h2>
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

                        <div className="modalshiftcontent">
                          <ul>
                            <li className="t-flex-container">
                              <div className="td-first">
                                <p>Select any one Tranche</p>
                              </div>
                              <div className="td-second">
                                <p>Status</p>
                              </div>
                            </li>
                            {demoTranche.map((element) => (
                              <li
                                className="t-flex-container"
                                key={element.name}
                              >
                                <div className="td-first">
                                  <input
                                    type="checkbox"
                                    className="t-select"
                                    disabled={
                                      element.status
                                        .toLocaleLowerCase()
                                        .includes("done")
                                        ? true
                                        : false
                                    }
                                    onChange={(e) => {
                                      if (e.target.checked === true) {
                                        this.handleOnChangeAdd(element);
                                      } else {
                                        this.handleOnChnageRemove(element);
                                      }
                                    }}
                                  />
                                  <p className="t-name">{element.name}</p>
                                </div>
                                <div className="td-second">
                                  <p
                                    className={
                                      element.status
                                        .toLocaleLowerCase()
                                        .includes("done")
                                        ? "t-text-color-green"
                                        : "t-text-color-red"
                                    }
                                  >
                                    {element.status}
                                  </p>
                                </div>
                              </li>
                            ))}
                          </ul>

                          <p>Note:</p>
                          <ul>
                            <li>
                              Each tranche in this deal is represented by
                              Fungible Tokens (FTs) that are currently held in
                              your IM Subnet Wallet; once this deal is
                              published, those FTs will be exchanged with
                              Investors for USDC.{" "}
                            </li>
                            <li>
                              By signing the Approve Transaction below, you
                              agree to allow IM to automatically debit the
                              corresponding amount of FTs from your IM Subnet
                              Wallet as Investors credits your C-Chain Wallet
                              with USDC.”
                            </li>
                          </ul>
                        </div>

                        <div className="modalshiftcontent">
                          <div className="accept_pop-button-container">
                            <button
                              className="pa_popup-reject-btn"
                              onClick={this.onCloseModal}
                            >
                              Cancel
                            </button>
                            <Button
                              variant="contained"
                              color="primary"
                              type="button"
                              onClick={this.meta}
                            >
                              {" "}
                              Sign with MetaMask
                              {this.state.formloadmetamask === true ? (
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
                    isOpen={this.state.open5}
                    onRequestClose={this.onCloseModal4}
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
                            onClick={this.onCloseModal4}
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
                                      onClick={this.onCloseModal4}
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

export default withSnackbar(Issuer_Deals_Details);
