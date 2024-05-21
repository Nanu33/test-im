import React, { Component } from "react";
import * as XLSX from "xlsx";
import Sidebar from "../../../../components/sidebar";
import './PayingAgent.css'
import MUIDataTable from "mui-datatables";
import Button from "@material-ui/core/Button";
import Loader from "../../../../components/loader";
import CloseIcon from "@material-ui/icons/Close";
import { withSnackbar } from "notistack";
import CircularProgress from "@material-ui/core/CircularProgress";
// import LinearLoader from "../../../../../components/loader/LinearLoader";
import ReactModal from "react-modal";
import {
  dealCreationTable,
  dealCreationAddSave,
  dealCreationCreateUpdate,
  dealCreationDelete,
  dealCreationSaveForNow,
  dealCreationAutoSave,
  dealCreationEdit,
  savedealservicerdate,
  dealCreation_BC_Status
} from "../../../../servies/services";
// import {
//   customStylesServicer,
//   customStylesauto,
//   customStylesautoTranches,
// } from "../../../../../components/customscripts/customscript";
import { TrainRounded } from "@material-ui/icons";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
// import NumberComp4 from "../../../../../components/NumberComp4";
import NumberComp from "../../../../components/NumberComp";
import Switch from "@material-ui/core/Switch";
// import { customStylesautosmallmodal1 } from "../../../../../components/customscripts/customscript";
import FormLoader from "../../../../components/loader/formLoader";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import * as moment from "moment";
import AccordIcon from "../../../../images/AccordIcon.png";
import Upload_Logo from "../../../../images/Upload_Logo.svg";
import DownloadLogo from "../../../../images/DownloadLogo.svg";
import checkedImg from "../../../../images/checked.png";

class Tranches_DealCreation extends Component {
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
      isAccordian: false,
      open1: false,
      open2: false,
      open3: false,
      open4: false,
      fileUploaded: false,
      screenloader: false,
      isAdded: false,
      isTranches: false,
      TableName: "Tranches",
      peer: sessionStorage.getItem("peer_insurer"),
      peers: JSON.parse(sessionStorage.getItem("peers")),
      dealid: sessionStorage.getItem("dealID"),
      DealName : sessionStorage.getItem("dealName"),
      // DealName: !sessionStorage.getItem("dealname")
      //   ? JSON.parse(sessionStorage.getItem("getDashboardDeals")).map(
      //       (item) => item[0]
      //     )[0]
      //   : sessionStorage.getItem("dealname"),
      isRecurring: sessionStorage.getItem("isAddDeal"),
      isSecuritisation: sessionStorage.getItem("isSecuritisation"),
      isESMA: sessionStorage.getItem("isESMA_Flag"),
      formData: {
        Name: "",
        Cusip: "",
        "Original Principal Balance": "",
        "Interest Type": "",
        "Interest Rate": "",
        "Index Code": "",
        Margin: "",
        "Day Count Method": "",
        "Loss Allocation Method": "",
        "Maturity Date": sessionStorage.getItem("LegalMaturityDate"),
        "Coupon Cap1": "",
        "Coupon Cap2": "",
        "Interest On Shortfall Flag": "",
        "Interest On WAC Shortfall Flag": "",
        "Deferral Allocation Method": "",
        "Stepup Margin": "",
        "Class Type": "",
        "Index Determination Date Logic": "",
        "Stepup Date": "",
        "Loss Allocation Sequence": "",
        "Interest Accrual Start Date Logic": "",
        "Interest Accrual End Date Logic": "",
        "Facility Type": "",
        "Original Commitment Balance": "",
        "Commitment Fee Rate": "",
        "Commitment Fee Basis": "",
        "Notional Flag": "",
        "Original Notional Balance": "",
        "Beginning Notional Balance Logic": "",
        "Ending Notional Balance Logic": "",
        "International Securities Identification Number": "",
        "Tranche/Bond Type": "",
        Currency: "",
        "Coupon Floor": "",
        "Coupon Cap": "",
        "Business Day Convention": "",
        "Current Interest Rate Index": "",
        "Current Interest Rate Index Tenor": "",
        "Extension Clause": "",
        "Next Call Date": "",
        "Clean-Up Call Threshold": "",
        "Next Put date": "",
        "Settlement Convention": "",
        "Current Attachment Point": "",
        "Original Attachment Point": "",
        "Credit Enhancement Formula": "",
        "Pari-Passu Tranches": "",
        "Senior Tranches": "",
        "Outstanding Principal Deficiency Ledger Balance": "",
        "Guarantor Legal Entity Identifier": "",
        "Guarantor Name": "",
        "Guarantor ESA Subsector": "",
        "Protection Type": "",
      },
      formData1: {
        Name: "",
        Cusip: "",
        "Original Principal Balance": "",
        "Interest Type": "",
        "Interest Rate": "",
        "Index Code": "",
        Margin: "",
        "Day Count Method": "",
        "Loss Allocation Method": "",
        "Maturity Date": sessionStorage.getItem("LegalMaturityDate"),
        "Coupon Cap1": "",
        "Coupon Cap2": "",
        "Interest On Shortfall Flag": "",
        "Interest On WAC Shortfall Flag": "",
        "Deferral Allocation Method": "",
        "Stepup Margin": "",
        "Class Type": "",
        "Index Determination Date Logic": "",
        "Stepup Date": "",
        "Loss Allocation Sequence": "",
        "Interest Accrual Start Date Logic": "",
        "Interest Accrual End Date Logic": "",
        "Facility Type": "",
        "Original Commitment Balance": "",
        "Commitment Fee Rate": "",
        "Commitment Fee Basis": "",
        "Notional Flag": "",
        "Original Notional Balance": "",
        "Beginning Notional Balance Logic": "",
        "Ending Notional Balance Logic": "",
        "International Securities Identification Number": "",
        "Tranche/Bond Type": "",
        Currency: "",
        "Coupon Floor": "",
        "Coupon Cap": "",
        "Business Day Convention": "",
        "Current Interest Rate Index": "",
        "Current Interest Rate Index Tenor": "",
        "Extension Clause": "",
        "Next Call Date": "",
        "Clean-Up Call Threshold": "",
        "Next Put date": "",
        "Settlement Convention": "",
        "Current Attachment Point": "",
        "Original Attachment Point": "",
        "Credit Enhancement Formula": "",
        "Pari-Passu Tranches": "",
        "Senior Tranches": "",
        "Outstanding Principal Deficiency Ledger Balance": "",
        "Guarantor Legal Entity Identifier": "",
        "Guarantor Name": "",
        "Guarantor ESA Subsector": "",
        "Protection Type": "",
      },
      activeInsights1: false,
      activeInsights2: true,
      activeInsights3: false,
      activeInsights4: false,
      activeInsights5: false,
      activeInsights6: false,
      activeInsights7: false,
      activeInsights8: false,
      activeInsightsBB: false,
      addswitchtoggle: false,
      editswitchtoggle: false,
      activeInsightsMI: false,
      deleteRowVal: {
        Name: "",
      },
      ViewStatus: false,
    };
  }

  blockInvalidChar = (e) => {
    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();
  };

  handleChange1 = (e) => {
    // togglevat
    if (this.state.addswitchtoggle === false) {
      this.setState({ addswitchtoggle: true });
    } else {
      this.setState({ addswitchtoggle: false });
    }
  };
  handleChange2 = (e) => {
    // togglevat
    if (this.state.editswitchtoggle === false) {
      this.setState({ editswitchtoggle: true });
    } else {
      this.setState({ editswitchtoggle: false });
    }
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
      activeInsightsMI: false,
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
      activeInsightsMI: false,
    });
    this.dealCreationAutoSave();
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
      activeInsightsMI: false,
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
      activeInsightsMI: false,
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
      activeInsightsMI: false,
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
      activeInsightsMI: false,
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
      activeInsightsMI: false,
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
      activeInsightsMI: false,
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
      activeInsightsMI: false,
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
      activeInsightsMI: true,
    });
    this.dealCreationAutoSave();
    // window.location.assign("/admin/paymentrules");
  };
  dealCreationTable = async () => {
    this.setState({
      getLoansLoader: true,
      tableData: [],
      loading: true,
      screenloader: true,
    });
    var data = {};
    data.DealName = this.state.DealName;
    data.TableName = this.state.TableName;
    data.dealid = this.state.dealid;

    console.log("datata", data);
    const APIResponse = await dealCreationTable(data,this.state.token);

    if (APIResponse.status === 200) {
      this.setState(
        {
          getLoansLoader: false,
          tableData: APIResponse.data,
          loading: false,
          isTranches: true,
        },
        () =>
          sessionStorage.setItem(
            "TranchItems",
            JSON.stringify(this.state.tableData)
          )
      );
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

  onOpenModal = () => {
    console.log("add tranche modal");
    this.setState({
      open1: true,
      isAccordian: false,
      formData: {
        Name: "",
        Cusip: "",
        "Original Principal Balance": "",
        "Interest Type": "",
        "Interest Rate": "",
        "Index Code": "",
        Margin: "",
        "Day Count Method": "",
        "Loss Allocation Method": "",
        "Maturity Date": sessionStorage.getItem("LegalMaturityDate"),
        "Coupon Cap1": "",
        "Coupon Cap2": "",
        "Interest On Shortfall Flag": "",
        "Interest On WAC Shortfall Flag": "",
        "Deferral Allocation Method": "",
        "Stepup Margin": "",
        "Class Type": "",
        "Index Determination Date Logic": "",
        "Stepup Date": "",
        "Loss Allocation Sequence": "",
        "Interest Accrual Start Date Logic": "",
        "Interest Accrual End Date Logic": "",
        "Facility Type": "",
        "Original Commitment Balance": "",
        "Commitment Fee Rate": "",
        "Commitment Fee Basis": "",
        "Notional Flag": "NA",
        "Original Notional Balance": "",
        "Beginning Notional Balance Logic": "",
        "Ending Notional Balance Logic": "",
        "International Securities Identification Number": "",
        "Tranche/Bond Type": "",
        Currency: "",
        "Coupon Floor": "",
        "Coupon Cap": "",
        "Business Day Convention": "",
        "Current Interest Rate Index": "",
        "Current Interest Rate Index Tenor": "",
        "Extension Clause": "",
        "Next Call Date": "",
        "Clean-Up Call Threshold": "",
        "Next Put date": "",
        "Settlement Convention": "",
        "Current Attachment Point": "",
        "Original Attachment Point": "",
        "Credit Enhancement Formula": "",
        "Pari-Passu Tranches": "",
        "Senior Tranches": "",
        "Outstanding Principal Deficiency Ledger Balance": "",
        "Guarantor Legal Entity Identifier": "",
        "Guarantor Name": "",
        "Guarantor ESA Subsector": "",
        "Protection Type": "",
      },
      addswitchtoggle: false,
    });
  };

  onOpenModal1 = (value, editValue) => {
    console.log("value: ", value, editValue);
    console.log("view tranche modal");
    this.setState({
      open2: true,
      ViewStatus: true,
      formData1: {
        Name: value,
        Cusip: editValue[0],
        "Original Principal Balance": editValue[1],
        "Class Type": editValue[2],
        "Interest Type": editValue[3],
        "Interest Rate": editValue[4],
        "Index Code": editValue[5],
        Margin: editValue[6],
        "Day Count Method": editValue[7],
        "Maturity Date": editValue[8],
        "Loss Allocation Method": editValue[9],
        "Coupon Cap1": editValue[10],
        "Coupon Cap2": editValue[11],
        "Interest On Shortfall Flag": editValue[12],
        "Interest On WAC Shortfall Flag": editValue[13],
        "Deferral Allocation Method": editValue[14],
        "Stepup Margin": editValue[15],
        "Index Determination Date Logic": editValue[16],
        "Stepup Date": editValue[17],
        "Loss Allocation Sequence": editValue[18],
        "Interest Accrual Start Date Logic": editValue[19],
        "Interest Accrual End Date Logic": editValue[20],
        "Facility Type": editValue[21],
        "Original Commitment Balance": editValue[22],
        "Commitment Fee Rate": editValue[23],
        "Commitment Fee Basis": editValue[24],
        "Notional Flag": editValue[25],
        "Original Notional Balance": editValue[26],
        "Beginning Notional Balance Logic": editValue[27],
        "Ending Notional Balance Logic": editValue[28],
        "International Securities Identification Number": editValue[29],
        "Tranche/Bond Type": editValue[30],
        Currency: editValue[31],
        "Coupon Floor": editValue[32],
        "Coupon Cap": editValue[33],
        "Business Day Convention": editValue[34],
        "Current Interest Rate Index": editValue[35],
        "Current Interest Rate Index Tenor": editValue[36],
        "Extension Clause": editValue[37],
        "Next Call Date": editValue[38],
        "Clean-Up Call Threshold": editValue[39],
        "Next Put date": editValue[40],
        "Settlement Convention": editValue[41],
        "Current Attachment Point": editValue[42],
        "Original Attachment Point": editValue[43],
        "Credit Enhancement Formula": editValue[44],
        "Pari-Passu Tranches": editValue[45],
        "Senior Tranches": editValue[46],
        "Outstanding Principal Deficiency Ledger Balance": editValue[47],
        "Guarantor Legal Entity Identifier": editValue[48],
        "Guarantor Name": editValue[49],
        "Guarantor ESA Subsector": editValue[50],
        "Protection Type": editValue[51],
      },
      EditPreviousName: value,
    });
  };

  onOpenModal2 = (value, editValue, getKeys) => {
    const getKeyData = getKeys.find((obj) => obj.Name === value);
    console.log("value: ", value, editValue, getKeyData);
    console.log("edit tranche modal");

    if (this.state.ViewStatus === false) {
      const marginChange =
        getKeyData["Margin"] !== undefined && getKeyData["Margin"] !== ""
          ? getKeyData["Margin"].replace(/%?/g, "")
          : getKeyData["Margin"] === undefined
          ? ""
          : getKeyData["Margin"];
      const CouponCap1Change =
        getKeyData["Coupon Cap1"] !== undefined &&
        getKeyData["Coupon Cap1"] !== ""
          ? getKeyData["Coupon Cap1"].replace(/%?/g, "")
          : getKeyData["Coupon Cap1"] === undefined
          ? ""
          : getKeyData["Coupon Cap1"];
      const CouponCap2Change =
        getKeyData["Coupon Cap2"] !== undefined &&
        getKeyData["Coupon Cap2"] !== ""
          ? getKeyData["Coupon Cap2"].replace(/%?/g, "")
          : getKeyData["Coupon Cap2"] === undefined
          ? ""
          : getKeyData["Coupon Cap2"];
      const StepUpMarginChange =
        getKeyData["Stepup Margin"] !== undefined &&
        getKeyData["Stepup Margin"] !== ""
          ? getKeyData["Stepup Margin"].replace(/%?/g, "")
          : getKeyData["Stepup Margin"] === undefined
          ? ""
          : getKeyData["Stepup Margin"];
      this.setState(
        {
          EditPreviousName: value,
          open3: true,
          open2: false,
          isAccordian: false,
          formData1: {
            Name: value,
            Cusip: getKeyData["Cusip"] === undefined ? "" : getKeyData["Cusip"],
            "Original Principal Balance":
              getKeyData["Original Principal Balance"] === undefined ||
              getKeyData["Original Principal Balance"] === null
                ? ""
                : getKeyData["Original Principal Balance"]
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            "Class Type":
              getKeyData["Class Type"] === undefined
                ? ""
                : getKeyData["Class Type"],
            "Interest Type":
              getKeyData["Interest Type"] === undefined
                ? ""
                : getKeyData["Interest Type"],
            "Interest Rate":
              getKeyData["Interest Rate"] === undefined
                ? ""
                : getKeyData["Interest Rate"],
            "Index Code":
              getKeyData["Index Code"] === undefined
                ? ""
                : getKeyData["Index Code"],
            Margin: marginChange,
            "Day Count Method":
              getKeyData["Day Count Method"] === undefined
                ? ""
                : getKeyData["Day Count Method"],
            "Maturity Date":
              getKeyData["Maturity Date"] === undefined
                ? ""
                : getKeyData["Maturity Date"],
            "Loss Allocation Method":
              getKeyData["Loss Allocation Method"] === undefined
                ? ""
                : getKeyData["Loss Allocation Method"],
            "Coupon Cap1": CouponCap1Change,
            "Coupon Cap2": CouponCap2Change,
            "Interest On Shortfall Flag":
              getKeyData["Interest On Shortfall Flag"] === undefined
                ? ""
                : getKeyData["Interest On Shortfall Flag"],
            "Interest On WAC Shortfall Flag":
              getKeyData["Interest On WAC Shortfall Flag"] === undefined
                ? ""
                : getKeyData["Interest On WAC Shortfall Flag"],
            "Deferral Allocation Method":
              getKeyData["Deferral Allocation Method"] === undefined
                ? ""
                : getKeyData["Deferral Allocation Method"],
            "Stepup Margin": StepUpMarginChange,
            "Index Determination Date Logic":
              getKeyData["Index Determination Date Logic"] === undefined
                ? ""
                : getKeyData["Index Determination Date Logic"],
            "Stepup Date":
              getKeyData["Stepup Date"] === undefined
                ? ""
                : getKeyData["Stepup Date"],
            "Loss Allocation Sequence":
              getKeyData["Loss Allocation Sequence"] === undefined
                ? ""
                : getKeyData["Loss Allocation Sequence"],
            "Interest Accrual Start Date Logic":
              getKeyData["Interest Accrual Start Date Logic"] === undefined
                ? ""
                : getKeyData["Interest Accrual Start Date Logic"],
            "Interest Accrual End Date Logic":
              getKeyData["Interest Accrual End Date Logic"] === undefined
                ? ""
                : getKeyData["Interest Accrual End Date Logic"],
            "Facility Type":
              getKeyData["Facility Type"] === undefined
                ? ""
                : getKeyData["Facility Type"],
            "Original Commitment Balance":
              getKeyData["Original Commitment Balance"] === undefined ||
              getKeyData["Original Commitment Balance"] === null
                ? ""
                : getKeyData["Original Commitment Balance"]
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            "Commitment Fee Rate":
              getKeyData["Commitment Fee Rate"] === undefined
                ? ""
                : getKeyData["Commitment Fee Rate"],
            "Commitment Fee Basis":
              getKeyData["Commitment Fee Basis"] === undefined
                ? ""
                : getKeyData["Commitment Fee Basis"],
            "Notional Flag": !getKeyData["Notional Flag"]
              ? "NA"
              : getKeyData["Notional Flag"],
            "Original Notional Balance":
              getKeyData["Original Notional Balance"] === undefined ||
              getKeyData["Original Notional Balance"] === null
                ? ""
                : getKeyData["Original Notional Balance"]
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            "Beginning Notional Balance Logic":
              getKeyData["Beginning Notional Balance Logic"] === undefined
                ? ""
                : getKeyData["Beginning Notional Balance Logic"],
            "Ending Notional Balance Logic":
              getKeyData["Ending Notional Balance Logic"] === undefined
                ? ""
                : getKeyData["Ending Notional Balance Logic"],
            "International Securities Identification Number":
              getKeyData["International Securities Identification Number"] ===
              undefined
                ? ""
                : getKeyData["International Securities Identification Number"],
            "Tranche/Bond Type":
              getKeyData["Tranche/Bond Type"] === undefined
                ? ""
                : getKeyData["Tranche/Bond Type"],
            Currency:
              getKeyData["Currency"] === undefined
                ? ""
                : getKeyData["Currency"],
            "Coupon Floor":
              getKeyData["Coupon Floor"] === undefined
                ? ""
                : getKeyData["Coupon Floor"],
            "Coupon Cap":
              getKeyData["Coupon Cap"] === undefined
                ? ""
                : getKeyData["Coupon Cap"],
            "Business Day Convention":
              getKeyData["Business Day Convention"] === undefined
                ? ""
                : getKeyData["Business Day Convention"],
            "Current Interest Rate Index":
              getKeyData["Current Interest Rate Index"] === undefined
                ? ""
                : getKeyData["Current Interest Rate Index"],
            "Current Interest Rate Index Tenor":
              getKeyData["Current Interest Rate Index Tenor"] === undefined
                ? ""
                : getKeyData["Current Interest Rate Index Tenor"],
            "Extension Clause":
              getKeyData["Extension Clause"] === undefined
                ? ""
                : getKeyData["Extension Clause"],
            "Next Call Date":
              getKeyData["Next Call Date"] === undefined
                ? ""
                : getKeyData["Next Call Date"],
            "Clean-Up Call Threshold":
              getKeyData["Clean-Up Call Threshold"] === undefined
                ? ""
                : getKeyData["Clean-Up Call Threshold"],
            "Next Put date":
              getKeyData["Next Put date"] === undefined
                ? ""
                : getKeyData["Next Put date"],
            "Settlement Convention":
              getKeyData["Settlement Convention"] === undefined
                ? ""
                : getKeyData["Settlement Convention"],
            "Current Attachment Point":
              getKeyData["Current Attachment Point"] === undefined
                ? ""
                : getKeyData["Current Attachment Point"],
            "Original Attachment Point":
              getKeyData["Original Attachment Point"] === undefined
                ? ""
                : getKeyData["Original Attachment Point"],
            "Credit Enhancement Formula":
              getKeyData["Credit Enhancement Formula"] === undefined
                ? ""
                : getKeyData["Credit Enhancement Formula"],
            "Pari-Passu Tranches":
              getKeyData["Pari-Passu Tranches"] === undefined
                ? ""
                : getKeyData["Pari-Passu Tranches"],
            "Senior Tranches":
              getKeyData["Senior Tranches"] === undefined
                ? ""
                : getKeyData["Senior Tranches"],
            "Outstanding Principal Deficiency Ledger Balance":
              getKeyData["Outstanding Principal Deficiency Ledger Balance"] ===
              undefined
                ? ""
                : getKeyData["Outstanding Principal Deficiency Ledger Balance"],
            "Guarantor Legal Entity Identifier":
              getKeyData["Guarantor Legal Entity Identifier"] === undefined
                ? ""
                : getKeyData["Guarantor Legal Entity Identifier"],
            "Guarantor Name":
              getKeyData["Guarantor Name"] === undefined
                ? ""
                : getKeyData["Guarantor Name"],
            "Guarantor ESA Subsector":
              getKeyData["Guarantor ESA Subsector"] === undefined
                ? ""
                : getKeyData["Guarantor ESA Subsector"],
            "Protection Type":
              getKeyData["Protection Type"] === undefined
                ? ""
                : getKeyData["Protection Type"],
          },
        },
        () => console.log(this.state.ViewStatus)
      );
    } else {
      this.setState(
        {
          open3: true,
          open2: false,
          ViewStatus: false,
          formData1: {
            ...this.state.formData1,
            "Stepup Margin": this.state.formData1["Stepup Margin"].replace(
              /%?/g,
              ""
            ),
            Margin: this.state.formData1.Margin.replace(/%?/g, ""),
            "Original Principal Balance": this.state.formData1[
              "Original Principal Balance"
            ]
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            "Original Commitment Balance": this.state.formData1[
              "Original Commitment Balance"
            ]
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            "Original Notional Balance": this.state.formData1[
              "Original Notional Balance"
            ]
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          },
        },
        () => console.log(this.state.ViewStatus)
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

  AddSubmit = (e) => {
    e.preventDefault();
    const renameStepUpMargin =
      this.state.formData["Stepup Margin"] !== ""
        ? `${this.state.formData["Stepup Margin"]}%`
        : this.state.formData["Stepup Margin"];
    delete this.state.formData["Stepup Margin"];
    this.state.formData["Stepup Margin"] = renameStepUpMargin;

    const renameMargin =
      this.state.formData.Margin !== ""
        ? `${this.state.formData.Margin}%`
        : this.state.formData.Margin;
    delete this.state.formData.Margin;
    this.state.formData.Margin = renameMargin;

    const renameCouponCap1 =
      this.state.formData["Coupon Cap1"] !== "" &&
      typeof this.state.formData["Coupon Cap1"] !== "string"
        ? `${this.state.formData["Coupon Cap1"]}%`
        : this.state.formData["Coupon Cap1"];
    delete this.state.formData["Coupon Cap1"];
    this.state.formData["Coupon Cap1"] = renameCouponCap1;

    const renameCouponCap2 =
      this.state.formData["Coupon Cap2"] !== "" &&
      typeof this.state.formData["Coupon Cap2"] !== "string"
        ? `${this.state.formData["Coupon Cap2"]}%`
        : this.state.formData["Coupon Cap2"];
    delete this.state.formData["Coupon Cap2"];
    this.state.formData["Coupon Cap2"] = renameCouponCap2;

    let renameOPB;

    if (this.state.formData["Original Principal Balance"].trim() === "") {
      // If nothing is entered, set Original Principal Balance as empty string
      renameOPB = "";
    } else {
      // If a value is entered, parse and rename Original Principal Balance
      renameOPB = parseFloat(
        this.state.formData["Original Principal Balance"].replace(/,/g, "")
      );
    }

    delete this.state.formData["Original Principal Balance"];
    this.state.formData["Original Principal Balance"] = renameOPB;

    // For Original Commitment Balance
    let renameOCB;

    if (this.state.formData["Original Commitment Balance"].trim() === "") {
      // If nothing is entered, set Original Commitment Balance as empty string
      renameOCB = "";
    } else {
      // If a value is entered, parse and rename Original Commitment Balance
      renameOCB = parseFloat(
        this.state.formData["Original Commitment Balance"].replace(/,/g, "")
      );
    }

    delete this.state.formData["Original Commitment Balance"];
    this.state.formData["Original Commitment Balance"] = renameOCB;

    // For Original Notional Balance
    let renameONB;

    if (this.state.formData["Original Notional Balance"].trim() === "") {
      // If nothing is entered, set Original Notional Balance as empty string
      renameONB = "";
    } else {
      // If a value is entered, parse and rename Original Notional Balance
      renameONB = parseFloat(
        this.state.formData["Original Notional Balance"].replace(/,/g, "")
      );
    }

    delete this.state.formData["Original Notional Balance"];
    this.state.formData["Original Notional Balance"] = renameONB;

    // For Maturity Date

    let renameMaturityDate;

    if (this.state.formData["Maturity Date"] === null) {
      // If nothing is entered, set Maturity Date as empty string
      renameMaturityDate = "";
    }

    delete this.state.formData["Maturity Date"];
    this.state.formData["Maturity Date"] = renameMaturityDate;

    console.log("check", this.state.formData);
    this.dealCreationAddSave();
    console.log("hello we have clicked the button");
  };
  EditSubmit = (e) => {
    e.preventDefault();
    const renameStepUpMargin =
      this.state.formData1["Stepup Margin"] !== ""
        ? `${this.state.formData1["Stepup Margin"]}%`
        : this.state.formData1["Stepup Margin"];
    delete this.state.formData1["Stepup Margin"];
    this.state.formData1["Stepup Margin"] = renameStepUpMargin;

    const renameMargin =
      this.state.formData1.Margin !== ""
        ? `${this.state.formData1.Margin}%`
        : this.state.formData1.Margin;
    delete this.state.formData1.Margin;
    this.state.formData1.Margin = renameMargin;

    const renameCouponCap1 =
      this.state.formData1["Coupon Cap1"] !== "" &&
      typeof this.state.formData1["Coupon Cap1"] !== "string"
        ? `${this.state.formData1["Coupon Cap1"]}%`
        : this.state.formData1["Coupon Cap1"];
    delete this.state.formData1["Coupon Cap1"];
    this.state.formData1["Coupon Cap1"] = renameCouponCap1;

    const renameCouponCap2 =
      this.state.formData1["Coupon Cap2"] !== "" &&
      typeof this.state.formData1["Coupon Cap2"] !== "string"
        ? `${this.state.formData1["Coupon Cap2"]}%`
        : this.state.formData1["Coupon Cap2"];
    delete this.state.formData1["Coupon Cap2"];
    this.state.formData1["Coupon Cap2"] = renameCouponCap2;

    const renameOPB = this.state.formData1["Original Principal Balance"]
      .toString()
      .includes(",")
      ? parseFloat(
          this.state.formData1["Original Principal Balance"].replace(/,/g, "")
        )
      : this.state.formData1["Original Principal Balance"];
    delete this.state.formData1["Original Principal Balance"];
    this.state.formData1["Original Principal Balance"] = renameOPB;

    const renameOCB = this.state.formData1["Original Commitment Balance"]
      .toString()
      .includes(",")
      ? parseFloat(
          this.state.formData1["Original Commitment Balance"].replace(/,/g, "")
        )
      : this.state.formData1["Original Commitment Balance"];
    delete this.state.formData1["Original Commitment Balance"];
    this.state.formData1["Original Commitment Balance"] = renameOCB;

    const renameONB = this.state.formData1["Original Notional Balance"]
      .toString()
      .includes(",")
      ? parseFloat(
          this.state.formData1["Original Notional Balance"].replace(/,/g, "")
        )
      : this.state.formData1["Original Notional Balance"];
    delete this.state.formData1["Original Notional Balance"];
    this.state.formData1["Original Notional Balance"] = renameONB;

    console.log(this.state.formData1);
    this.dealCreationEdit();
    console.log("hello we have clicked the Edit button");
  };

  showNext = (e) => {
    e.preventDefault();
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
      activeInsightsMI: false,
    });
    this.dealCreationAutoSave();
    // window.location.assign("/admin/fees");
  };
  showPrev = (e) => {
    e.preventDefault();
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
      activeInsightsMI: false,
    });
    this.dealCreationAutoSave();
    // window.location.assign("/admin/general");
  };
  onOpenModal3 = (value, deleteValue) => {
    console.log("value: ", value, deleteValue);
    console.log("delete tranche modal");
    this.setState({
      open4: true,
      isAccordian: false,
      deleteRowVal: {
        Name: value,
        Cusip: deleteValue[0],
        "Original Principal Balance": deleteValue[1],
        "Class Type": deleteValue[2],
        "Interest Type": deleteValue[3],
        "Interest Rate": deleteValue[4],
        "Index Code": deleteValue[5],
        Margin: deleteValue[6],
        "Day Count Method": deleteValue[7],
        "Maturity Date": deleteValue[8],
        "Loss Allocation Method": deleteValue[9],
        "Coupon Cap1": deleteValue[10],
        "Coupon Cap2": deleteValue[11],
        "Interest On Shortfall Flag": deleteValue[12],
        "Interest On WAC Shortfall Flag": deleteValue[13],
        "Deferral Allocation Method": deleteValue[14],
        "Stepup Margin": deleteValue[15],
        "Index Determination Date Logic": deleteValue[16],
        "Stepup Date": deleteValue[17],
        "Loss Allocation Sequence": deleteValue[18],
        "Interest Accrual Start Date Logic": deleteValue[19],
        "Interest Accrual End Date Logic": deleteValue[20],
        "Facility Type": deleteValue[21],
        "Original Commitment Balance": deleteValue[22],
        "Commitment Fee Rate": deleteValue[23],
        "Commitment Fee Basis": deleteValue[24],
        "Notional Flag": deleteValue[25],
        "Original Notional Balance": deleteValue[26],
        "Beginning Notional Balance Logic": deleteValue[27],
        "Ending Notional Balance Logic": deleteValue[28],
        "International Securities Identification Number": deleteValue[29],
        "Tranche/Bond Type": deleteValue[30],
        Currency: deleteValue[31],
        "Coupon Floor": deleteValue[32],
        "Coupon Cap": deleteValue[33],
        "Business Day Convention": deleteValue[34],
        "Current Interest Rate Index": deleteValue[35],
        "Current Interest Rate Index Tenor": deleteValue[36],
        "Extension Clause": deleteValue[37],
        "Next Call Date": deleteValue[38],
        "Clean-Up Call Threshold": deleteValue[39],
        "Next Put date": deleteValue[40],
        "Settlement Convention": deleteValue[41],
        "Current Attachment Point": deleteValue[42],
        "Original Attachment Point": deleteValue[43],
        "Credit Enhancement Formula": deleteValue[44],
        "Pari-Passu Tranches": deleteValue[45],
        "Senior Tranches": deleteValue[46],
        "Outstanding Principal Deficiency Ledger Balance": deleteValue[47],
        "Guarantor Legal Entity Identifier": deleteValue[48],
        "Guarantor Name": deleteValue[49],
        "Guarantor ESA Subsector": deleteValue[50],
        "Protection Type": deleteValue[51],
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

    const deleteRowVal = this.state.deleteRowVal; // Assuming deleteRowVal contains the key-value pair you want to delete based on

    // Retrieve existing added content from sessionStorage if any
    let existingAddedContent = [];

    // Check if sessionStorage contains an item with key "AddedContent"
    const sessionStorageItem = sessionStorage.getItem("AddedContent");
    if (sessionStorageItem) {
      // Parse the sessionStorage item if it exists
      existingAddedContent = JSON.parse(sessionStorageItem);
    }

    // Filter out the object based on the key-value pair from deleteRowVal
    existingAddedContent = existingAddedContent.filter((item) => {
      for (let key in deleteRowVal) {
        if (item[key] !== deleteRowVal[key]) {
          return true; // Keep the item if any key-value pair doesn't match
        }
      }
      return false; // Exclude the item if all key-value pairs match
    });

    // Store the updated added content in sessionStorage
    sessionStorage.setItem(
      "AddedContent",
      JSON.stringify(existingAddedContent)
    );

    if (APIResponse.status === 200) {
      const message = APIResponse.data.message;
      this.props.enqueueSnackbar(message, {
        variant: "info",
        autoHideDuration: 3000,
      });
      this.setState({ formLoader: false });
      this.onCloseModal3();
      this.savedealservicerdate();
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
    // Make a copy of formData
    const formDataCopy = { ...this.state.formData };

    // Retrieve existing added content from sessionStorage if any
    const existingAddedContentString = sessionStorage.getItem("AddedContent");
    const existingAddedContent = existingAddedContentString
      ? JSON.parse(existingAddedContentString)
      : [];

    // Combine existing added content with new content and store it in sessionStorage
    const updatedAddedContent = [...existingAddedContent, formDataCopy];
    sessionStorage.setItem("AddedContent", JSON.stringify(updatedAddedContent));

    data.TableData = ObjAdd;
    // data.peers = this.state.peer;
    console.log("dataAddddd", data);

    const APIResponse = await dealCreationAddSave(data, this.state.token);
    console.log("ress", APIResponse);

    if (APIResponse.status === 200) {
      if (APIResponse.data.isSuccess === true) {
        const message = APIResponse.data.message;
        this.props.enqueueSnackbar(message, {
          variant: "info",
          autoHideDuration: 3000,
        });
        this.setState({ formLoader: false, isAdded: true });
        this.savedealservicerdate();
        this.dealCreationTable();
        this.onCloseModal();
      } else {
        const message = APIResponse.data.message;
        this.props.enqueueSnackbar(message, {
          variant: "error",
          autoHideDuration: 3000,
        });
        this.setState({ formLoader: false });
        this.onCloseModal();
      }
    } else {
      const message = "Something went Wrong";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
      this.setState({ formLoader: false });
      this.onCloseModal();
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
    console.log("ress", APIResponse);

    if (APIResponse.status === 200) {
      if (APIResponse.data.isSuccess === true) {
        const message = APIResponse.data.message;
        this.props.enqueueSnackbar(message, {
          variant: "info",
          autoHideDuration: 3000,
        });
        this.setState({ formLoader: false });
        this.savedealservicerdate();
        this.dealCreationTable();
        this.onCloseModal2();
      } else {
        const message = APIResponse.data.message;
        this.props.enqueueSnackbar(message, {
          variant: "error",
          autoHideDuration: 3000,
        });
        this.setState({ formLoader: false });
        this.onCloseModal2();
      }
    } else {
      const message = "Something went Wrong";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
      this.setState({ formLoader: false });
      this.onCloseModal2();
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
    if (!this.state.fileUploaded) {
      this.savedealservicerdate();
    }

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    if (this.state.fileUploaded) {
      await delay(3000); // Wait for 3 seconds
      window.location.reload();
    }

    this.setState({ fileUploaded: false }, () => {
      if (!this.state.fileUploaded) {
        sessionStorage.setItem("AddedContent", []);
        sessionStorage.setItem("TranchItems", []);
      }
    });
    console.log("ress", APIResponse);
  };

  dealCreationCreateUpdate = async () => {
    this.setState({ formLoader2: true });
    var data = {};
    data.DealName = this.state.DealName;
    data.TableName = this.state.TableName;
    // data.peers = this.state.peer;
    let Obj = {};
    this.state.tableData.forEach((item) => {
      // let modifiedItem = {};
      // Object.keys(item).forEach((key) => {
      //   let modifiedKey = key.replace(/([a-z])([A-Z])/g, '$1 $2');
      //   modifiedItem[modifiedKey] = item[key];
      // });
      // Obj = {
      //   ...Obj,
      //   [`${item.Name}`]: modifiedItem,
      // };

      Obj = {
        ...Obj,
        [`${item.Name}`]: item,
      };
    });
    data.TableData = Obj;
    console.log(data);
    const APIResponse = await dealCreationCreateUpdate(data, this.state.token);
    console.log("ress", APIResponse);
    if (APIResponse.status === 200) {
      if (APIResponse.data.isSuccess === true) {
        const message = APIResponse.data.message;
        this.props.enqueueSnackbar(message, {
          variant: "info",
          autoHideDuration: 3000,
        });
        this.setState({ formLoader2: false });
        this.dealCreation_BC_Status();
        this.savedealservicerdate();
        // this.dealCreationTable()
      } else {
        const message = APIResponse.data.message;
        this.props.enqueueSnackbar(message, {
          variant: "error",
          autoHideDuration: 3000,
        });
        this.setState({ formLoader2: false });
      }
    } else {
      const message = "Something went Wrong";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
      this.setState({ formLoader2: false });
    }
  };

  dealCreationSaveForNow = async () => {
    this.setState({ formLoader1: true });
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
    console.log("ress", APIResponse);
    if (APIResponse.status === 200) {
      if (APIResponse.data.isSuccess === true) {
        const message = APIResponse.data.message;
        this.props.enqueueSnackbar(message, {
          variant: "info",
          autoHideDuration: 3000,
        });
        this.setState({ formLoader1: false });
        this.savedealservicerdate();
      } else {
        const message = APIResponse.data.message;
        this.props.enqueueSnackbar(message, {
          variant: "error",
          autoHideDuration: 3000,
        });
        this.setState({ formLoader1: false });
      }
    } else {
      const message = "Something went Wrong";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
      this.setState({ formLoader1: false });
    }
  };

  handleFileUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      // Handle the case where no file is selected
      this.setState({ fileUploaded: false });
      return;
    }

    const reader = new FileReader();
    reader.readAsArrayBuffer(file);

    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(new Uint8Array(data), {
        type: "array",
        cellDates: true,
      });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      const range = XLSX.utils.decode_range(sheet["!ref"]);
      const parsedData = [];

      // Extract headers
      const headers = [];
      for (let colIndex = range.s.c; colIndex <= range.e.c; colIndex++) {
        const headerCellAddress = XLSX.utils.encode_cell({
          r: range.s.r,
          c: colIndex,
        });
        const headerCellValue = sheet[headerCellAddress]
          ? sheet[headerCellAddress].v
          : "";
        headers.push(headerCellValue);
      }

      // console.log(">>>>>>>>>>>", headers);

      // Parse each row
      for (let rowIndex = range.s.r + 1; rowIndex <= range.e.r; rowIndex++) {
        const rowData = {};
        for (let colIndex = range.s.c; colIndex <= range.e.c; colIndex++) {
          const cellAddress = XLSX.utils.encode_cell({
            r: rowIndex,
            c: colIndex,
          });
          const cell = sheet[cellAddress];
          const header = headers[colIndex - range.s.c];
          rowData[header] = cell ? cell.v : ""; // If cell doesn't exist, set empty string
        }
        parsedData.push(rowData);
      }

      // Handle missing keys by filling them with empty strings
      parsedData.forEach((row) => {
        headers.forEach((header) => {
          if (!row.hasOwnProperty(header)) {
            row[header] = "";
          }
        });
      });
      // console.log(">>>>>>>>>>>", parsedData);

      const sessionStorageItem = sessionStorage.getItem("AddedContent");
      const sessionStorageItemTranches = sessionStorage.getItem("TranchItems");
      let AddedData = sessionStorageItem ? JSON.parse(sessionStorageItem) : [];
      let sessionTranches = sessionStorageItemTranches
        ? JSON.parse(sessionStorageItemTranches)
        : [];

      // console.log("???????",sessionTranches);

      let filteredParsedData = [];
      let newParsedAddedData = [];

      if (this.state.isAdded) {
        // Compare every key-value pair for filteredParsedData
        filteredParsedData = sessionTranches.filter((tranche) => {
          return !AddedData.some((added) => {
            return Object.keys(tranche).every((key) => {
              // Check if the key exists in the added data, otherwise set its value to an empty string
              const addedValue = added[key] !== undefined ? added[key] : "";
              return addedValue === tranche[key];
            });
          });
        });
        newParsedAddedData = [...filteredParsedData, ...AddedData];
      } else if (this.state.isTranches) {
        // Compare every key-value pair for filteredParsedData
        // filteredParsedData = parsedData.filter((data) => {
        //   console.log("ParsedData", data);
        //   return !sessionTranches.some((tranche) => {
        //     console.log("sessionTranches", tranche);
        //     return Object.keys(data).every((key) => {
        //       // Check if the key exists in the tranche data, otherwise set its value to an empty string
        //       const trancheValue =
        //         tranche[key] !== undefined ? tranche[key] : "";
        //       return trancheValue === data[key];
        //     });
        //   });
        // });
        // newParsedAddedData = [...sessionTranches, ...filteredParsedData];
        newParsedAddedData = parsedData;
      }
      // console.log(">>>>>>>>>>>", newParsedAddedData);

      this.setState(
        {
          fileUploaded: true,
          tableData: newParsedAddedData,
          isTranches: false,
          isAdded: false,
        },
        async () => await this.dealCreationAutoSave()
      );
    };
  };

  handleDownloadClick = () => {
    // Create a worksheet
    const ws = XLSX.utils.json_to_sheet(this.state.tableData);

    // Create a workbook with the worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    // Save the workbook as an Excel file
    XLSX.writeFile(wb, "Tranches.xlsx");
  };

  dealCreation_BC_Status = async () => {
    var data = {};
    data.DealName = this.state.DealName;
    // data.peer = this.state.peer;
    // console.log(data);
    const APIResponse = await dealCreation_BC_Status(data, this.state.token);
    console.log("ress", APIResponse);
    this.setState({
      createStatus: APIResponse.data.status,
      screenloader: false,
    });
  };

  savedealservicerdate = async () => {
    let data = {};
    data.DealName = this.state.DealName;
    // data.peers = this.state.peer;
    console.log(data);
    const APIResponse = await savedealservicerdate(data, this.state.token);
    console.log("ress", APIResponse);
    if (this.state.activeInsights1 === true) {
      // this.props.history.push({
      //   pathname: "/admin/general",
      //   state: { checkDeal: false },
      // });
      window.location.assign("/admin/general")
    } else if (this.state.activeInsights2 === true) {
      // this.props.history.push({
      //   pathname: "/admin/tranches",
      //   state: { checkDeal: false },
      // });
      window.location.assign("/admin/tranches")
    } else if (this.state.activeInsights3 === true) {
      // this.props.history.push({
      //   pathname: "/admin/fees",
      //   state: { checkDeal: false },
      // });
      window.location.assign("/admin/fees")
    } else if (this.state.activeInsights4 === true) {
      // this.props.history.push({
      //   pathname: "/admin/expenses",
      //   state: { checkDeal: false },
      // });
      window.location.assign("/admin/expenses")
    } else if (this.state.activeInsights5 === true) {
      // this.props.history.push({
      //   pathname: "/admin/account",
      //   state: { checkDeal: false },
      // });
      window.location.assign("/admin/account")
    } else if (this.state.activeInsights6 === true) {
      // this.props.history.push({
      //   pathname: "/admin/tests",
      //   state: { checkDeal: false },
      // });
      window.location.assign("/admin/tests")
    } else if (this.state.activeInsightsBB === true) {
      // this.props.history.push({
      //   pathname: "/admin/borrowingBase",
      //   state: { checkDeal: false },
      // });
      window.location.assign("/admin/borrowingBase")
    } else if (this.state.activeInsights7 === true) {
      // this.props.history.push({
      //   pathname: "/admin/variables",
      // });
      window.location.assign("/admin/variables")
    } else if (this.state.activeInsights8 === true) {
      // this.props.history.push({
      //   pathname: "/admin/paymentrules",
      //   state: { checkDeal: false },
      // });
      window.location.assign("/admin/paymentrules")
    } else if (this.state.activeInsightsMI === true) {
      // this.props.history.push({
      //   pathname: "/admin/manualinput",
      //   state: { checkDeal: false },
      // });
      window.location.assign("/admin/manualinput")
    }
  };
  handleAccordian = () => {
    this.setState((prevState) => {
      return { isAccordian: !prevState.isAccordian };
    });
  };
  async componentDidMount() {
    var component = window.location.pathname;
    sessionStorage.setItem("component", component);
    this.dealCreationTable();
  }
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
            "&:nth-child(even) > td:first-child": {
              backgroundColor: "white !important",
              position: "relative",
              "&::before": {
                content: "''",
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                backgroundColor: "rgb(229, 229, 229, 0.3) !important",
              },
              "&:first-child": {
                position: "sticky",
                left: 0,
                top: 0,
                zIndex: 1,
                backgroundColor: "rgba(255, 255, 255, 1)",
              },
              "& > *": {
                color: "#000 !important",
              },
            },
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
            "&::after": {
              content: "",
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "white",
              zIndex: -99,
            },
            "@media (min-width: 800px)": {
              "&:first-child": {
                position: "sticky",
                left: 0,
                top: 0,
                zIndex: 1,
                backgroundColor: "rgba(255, 255, 255, 1)", // Adjust the alpha value to your preference
              },
            },
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
            backgroundColor: "white !important",
            backgroundClip: "padding-box",
            borderBottom: "none !important",
            paddingBottom: "5px !important",
            paddingTop: "5px !important",
            paddingLeft: "15px !important",
            position: "relative",
            zIndex: 1,
            "&:first-child": {
              position: "sticky",
              left: 0,
              zIndex: 500,
              top: 0,
            },
            "&::after": {
              content: "''",
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(1, 142, 130, 0.1) !important",
              zIndex: -1,
            },
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
            position: "relative",
            overflowX: "auto",
            maxHeight: "600px",
            overflowY:
              "auto" /* Use "auto" to enable scrollbar only when needed */,
            "-ms-overflow-style": "none",
            borderRadius: "10px" /* Set the border radius to the scroll area */,
            "&::-webkit-scrollbar": {
              width: "1em" /* Adjust to hide the scrollbar */,
              display: "none" /* Hide the scrollbar */,
            },
          },
          responsiveBase: {
            border: "1px solid #212121 !important",
            borderRadius: "10px !important",
            position: "relative",
            overflowX: "auto",
            maxHeight: "600px",
            overflowY:
              "auto" /* Use "auto" to enable scrollbar only when needed */,
            scrollbarWidth: "thin",
            "-ms-overflow-style": "none",
            borderRadius: "10px" /* Set the border radius to the scroll area */,
            "&::-webkit-scrollbar": {
              width: "1em" /* Adjust to hide the scrollbar */,
              display: "none" /* Hide the scrollbar */,
            },
          },
        },
      },
    });
  goBackToDashBoard = () => {
    this.state.isRecurring
      ? this.props.history.push({
          isRecurring: sessionStorage.removeItem("isAddDeal"),
          pathname: "/dashboard",
        })
      : this.props.history.push({
          pathname: "/admin/tranches_recurring",
        });
  };
  render() {
    const customStylesautosmallmodal1 = {
      content: {
        top: "30%",
        left: "50%",
        // right: 'auto',
        bottom: "auto",
        // marginRight: '-50%',
        transform: "translate(-50%, 0%)",
        width: "515px",
        zIndex: "10000",
      },
    };
    const customStylesautoTranches = {
      content: {
        // top: '50%',
        left: "52%",
        // right: 'auto',
        bottom: "auto",
        // marginRight: '-50%',
        transform: "translate(-50%, 0%)",
        width: "1200px",
        // display: "flex",
        zIndex: "10000",
      },
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
      selectableRows: "none",
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
        name: "Name",
        label: "Name",
        options: {
          filter: true,
          sort: true,
        },
      },

      {
        name: "Cusip",
        label: "Cusip",
        options: {
          filter: true,
          sort: true,
        },
      },

      {
        name: "Original Principal Balance",
        label: "Original Principal Balance",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <React.Fragment>
                <NumberComp value={value}></NumberComp>
              </React.Fragment>
            );
          },
        },
      },
      {
        name: "Class Type",
        label: "Class Type",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <React.Fragment>
                <div style={{ paddingLeft: "1rem" }}>{value}</div>
              </React.Fragment>
            );
          },
        },
      },
      {
        name: "Interest Type",
        label: "Interest Type",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <React.Fragment>
                <div style={{ paddingLeft: "1rem" }}>{value}</div>
              </React.Fragment>
            );
          },
        },
      },
      {
        name: "Interest Rate",
        label: "Interest Rate",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <React.Fragment>
                <div style={{ paddingLeft: "1rem" }}>{value}</div>
              </React.Fragment>
            );
          },
        },
      },
      {
        name: "Index Code",
        label: "Index Code",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <React.Fragment>
                <div style={{ paddingLeft: "0.5rem" }}>{value}</div>
              </React.Fragment>
            );
          },
        },
      },
      {
        name: "Margin",
        label: "Margin",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <React.Fragment>
                <NumberComp value={value}></NumberComp>
              </React.Fragment>
            );
          },
        },
      },
      {
        name: "Day Count Method",
        label: "Day Count Method",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <React.Fragment>
                <div style={{ paddingLeft: "0.5rem" }}>{value}</div>
              </React.Fragment>
            );
          },
        },
      },
      {
        name: "Maturity Date",
        label: "Maturity Date",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <React.Fragment>
                {value !== "Invalid date" && value !== null ? (
                  <div style={{ paddingRight: "2rem" }}>{value}</div>
                ) : (
                  ""
                )}
              </React.Fragment>
            );
          },
        },
      },

      {
        name: "Loss Allocation Method",
        label: "Loss Allocation Method",
        options: {
          filter: true,
          sort: true,
          display:
            this.state.isSecuritisation === "Securitisation" ? true : false,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <React.Fragment>
                <div style={{ paddingLeft: "2rem" }}>{value}</div>
              </React.Fragment>
            );
          },
        },
      },
      {
        name: "Coupon Cap1",
        label: "Coupon Cap1",
        options: {
          filter: true,
          sort: true,
          display:
            this.state.isSecuritisation === "Securitisation" ? true : false,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <React.Fragment>
                <div style={{ paddingLeft: "1rem" }}>
                  {value === "" ? (
                    "NA"
                  ) : (
                    <NumberComp value={value}></NumberComp>
                  )}
                </div>
              </React.Fragment>
            );
          },
        },
      },
      {
        name: "Coupon Cap2",
        label: "Coupon Cap2",
        options: {
          filter: true,
          sort: true,
          display:
            this.state.isSecuritisation === "Securitisation" ? true : false,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <React.Fragment>
                <div style={{ paddingLeft: "1rem" }}>
                  {value === "" ? (
                    "NA"
                  ) : (
                    <NumberComp value={value}></NumberComp>
                  )}
                </div>
              </React.Fragment>
            );
          },
        },
      },
      {
        name: "Interest On Shortfall Flag",
        label: "Interest on Shortfall Flag",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <React.Fragment>
                <div style={{ paddingLeft: "1rem" }}>{value}</div>
              </React.Fragment>
            );
          },
        },
      },
      {
        name: "Interest On WAC Shortfall Flag",
        label: "Interest on WAC Shortfall Flag",
        options: {
          filter: true,
          sort: true,
          display:
            this.state.isSecuritisation === "Securitisation" ? true : false,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <React.Fragment>
                <div style={{ paddingLeft: "1rem" }}>{value}</div>
              </React.Fragment>
            );
          },
        },
      },
      {
        name: "Deferral Allocation Method",
        label: "Deferral Allocation Method",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <React.Fragment>
                <div style={{ paddingLeft: "1.5rem" }}>{value}</div>
              </React.Fragment>
            );
          },
        },
      },
      {
        name: "Stepup Margin",
        label: "Stepup Margin",
        options: {
          filter: true,
          sort: true,
          display:
            this.state.isSecuritisation === "Securitisation" ? true : false,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <React.Fragment>
                <NumberComp value={value}></NumberComp>
              </React.Fragment>
            );
          },
        },
      },
      {
        name: "Index Determination Date Logic",
        label: "Index Determination Date Logic",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <React.Fragment>
                <div style={{ paddingLeft: "2rem" }}>{value}</div>
              </React.Fragment>
            );
          },
        },
      },
      {
        name: "Stepup Date",
        label: "Stepup Date",
        options: {
          filter: true,
          sort: true,
          display:
            this.state.isSecuritisation === "Securitisation" ? true : false,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <React.Fragment>
                {value !== "Invalid date" ? (
                  <div style={{ paddingRight: "2rem" }}>{value}</div>
                ) : (
                  ""
                )}
              </React.Fragment>
            );
          },
        },
      },
      {
        name: "Loss Allocation Sequence",
        label: "Loss Allocation Sequence",
        options: {
          filter: true,
          sort: true,
          display:
            this.state.isSecuritisation === "Securitisation" ? true : false,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <React.Fragment>
                <div style={{ paddingRight: "2rem" }}>{value}</div>
              </React.Fragment>
            );
          },
        },
      },
      {
        name: "Interest Accrual Start Date Logic",
        label: "Interest Accrual Start Date Logic",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <React.Fragment>
                <div style={{ paddingLeft: "0.5rem" }}>{value}</div>
              </React.Fragment>
            );
          },
        },
      },
      {
        name: "Interest Accrual End Date Logic",
        label: "Interest Accrual End Date Logic",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <React.Fragment>
                <div style={{ paddingLeft: "0.5rem" }}>{value}</div>
              </React.Fragment>
            );
          },
        },
      },
      {
        name: "Facility Type",
        label: "Facility Type",
        options: {
          filter: true,
          sort: true,
          display:
            this.state.isSecuritisation === "Securitisation" ? false : true,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <React.Fragment>
                <div style={{ paddingLeft: "1rem" }}>{value}</div>
              </React.Fragment>
            );
          },
        },
      },
      {
        name: "Original Commitment Balance",
        label: "Original Commitment Balance",
        options: {
          filter: true,
          sort: true,
          display:
            this.state.isSecuritisation === "Securitisation" ? false : true,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <React.Fragment>
                <NumberComp value={value}></NumberComp>
              </React.Fragment>
            );
          },
        },
      },
      {
        name: "Commitment Fee Rate",
        label: "Commitment Fee Rate",
        options: {
          filter: true,
          sort: true,
          display:
            this.state.isSecuritisation === "Securitisation" ? false : true,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <React.Fragment>
                <div style={{ paddingLeft: "2rem" }}>{value}</div>
              </React.Fragment>
            );
          },
        },
      },
      {
        name: "Commitment Fee Basis",
        label: "Commitment Fee Basis",
        options: {
          filter: true,
          sort: true,
          display:
            this.state.isSecuritisation === "Securitisation" ? false : true,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <React.Fragment>
                <div style={{ paddingLeft: "2rem" }}>{value}</div>
              </React.Fragment>
            );
          },
        },
      },
      {
        name: "Notional Flag",
        label: "Notional Flag",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <React.Fragment>
                <div style={{ paddingLeft: "1rem" }}>{value}</div>
              </React.Fragment>
            );
          },
        },
      },
      {
        name: "Original Notional Balance",
        label: "Original Notional Balance",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <React.Fragment>
                <NumberComp value={value}></NumberComp>
              </React.Fragment>
            );
          },
        },
      },
      {
        name: "Beginning Notional Balance Logic",
        label: "Beginning Notional Balance Logic",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <React.Fragment>
                <div style={{ paddingLeft: "0.5rem" }}>{value}</div>
              </React.Fragment>
            );
          },
        },
      },
      {
        name: "Ending Notional Balance Logic",
        label: "Ending Notional Balance Logic",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <React.Fragment>
                <div style={{ paddingLeft: "0.5rem" }}>{value}</div>
              </React.Fragment>
            );
          },
        },
      },
      {
        name: "International Securities Identification Number",
        label: "International Securities Identification Number",
        options: {
          filter: true,
          sort: true,
          display: this.state.isESMA === "Yes" ? true : false,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <React.Fragment>
                <div style={{ paddingLeft: "0.5rem" }}>{value}</div>
              </React.Fragment>
            );
          },
        },
      },
      {
        name: "Tranche/Bond Type",
        label: "Tranche/Bond Type",
        options: {
          filter: true,
          sort: true,
          display: this.state.isESMA === "Yes" ? true : false,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <React.Fragment>
                <div style={{ paddingLeft: "0.5rem" }}>{value}</div>
              </React.Fragment>
            );
          },
        },
      },
      {
        name: "Currency",
        label: "Currency",
        options: {
          filter: true,
          sort: true,
          display: this.state.isESMA === "Yes" ? true : false,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <React.Fragment>
                <div style={{ paddingLeft: "0.5rem" }}>{value}</div>
              </React.Fragment>
            );
          },
        },
      },
      {
        name: "Coupon Floor",
        label: "Coupon Floor",
        options: {
          filter: true,
          sort: true,
          display: this.state.isESMA === "Yes" ? true : false,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <React.Fragment>
                <div style={{ paddingLeft: "0.5rem" }}>{value}</div>
              </React.Fragment>
            );
          },
        },
      },
      {
        name: "Coupon Cap",
        label: "Coupon Cap",
        options: {
          filter: true,
          sort: true,
          display: this.state.isESMA === "Yes" ? true : false,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <React.Fragment>
                <div style={{ paddingLeft: "0.5rem" }}>{value}</div>
              </React.Fragment>
            );
          },
        },
      },
      {
        name: "Business Day Convention",
        label: "Business Day Convention",
        options: {
          filter: true,
          sort: true,
          display: this.state.isESMA === "Yes" ? true : false,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <React.Fragment>
                <div style={{ paddingLeft: "0.5rem" }}>{value}</div>
              </React.Fragment>
            );
          },
        },
      },
      {
        name: "Current Interest Rate Index",
        label: "Current Interest Rate Index",
        options: {
          filter: true,
          sort: true,
          display: this.state.isESMA === "Yes" ? true : false,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <React.Fragment>
                <div style={{ paddingLeft: "0.5rem" }}>{value}</div>
              </React.Fragment>
            );
          },
        },
      },
      {
        name: "Current Interest Rate Index Tenor",
        label: "Current Interest Rate Index Tenor",
        options: {
          filter: true,
          sort: true,
          display: this.state.isESMA === "Yes" ? true : false,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <React.Fragment>
                <div style={{ paddingLeft: "0.5rem" }}>{value}</div>
              </React.Fragment>
            );
          },
        },
      },
      {
        name: "Extension Clause",
        label: "Extension Clause",
        options: {
          filter: true,
          sort: true,
          display: this.state.isESMA === "Yes" ? true : false,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <React.Fragment>
                <div style={{ paddingLeft: "0.5rem" }}>{value}</div>
              </React.Fragment>
            );
          },
        },
      },
      {
        name: "Next Call Date",
        label: "Next Call Date",
        options: {
          filter: true,
          sort: true,
          display: this.state.isESMA === "Yes" ? true : false,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <React.Fragment>
                {value !== "Invalid date" ? (
                  <div style={{ paddingRight: "2rem" }}>{value}</div>
                ) : (
                  ""
                )}
              </React.Fragment>
            );
          },
        },
      },
      {
        name: "Clean-Up Call Threshold",
        label: "Clean-Up Call Threshold",
        options: {
          filter: true,
          sort: true,
          display: this.state.isESMA === "Yes" ? true : false,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <React.Fragment>
                <div style={{ paddingLeft: "0.5rem" }}>{value}</div>
              </React.Fragment>
            );
          },
        },
      },
      {
        name: "Next Put date",
        label: "Next Put date",
        options: {
          filter: true,
          sort: true,
          display: this.state.isESMA === "Yes" ? true : false,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <React.Fragment>
                {value !== "Invalid date" ? (
                  <div style={{ paddingRight: "2rem" }}>{value}</div>
                ) : (
                  ""
                )}
              </React.Fragment>
            );
          },
        },
      },
      {
        name: "Settlement Convention",
        label: "Settlement Convention",
        options: {
          filter: true,
          sort: true,
          display: this.state.isESMA === "Yes" ? true : false,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <React.Fragment>
                <div style={{ paddingLeft: "0.5rem" }}>{value}</div>
              </React.Fragment>
            );
          },
        },
      },
      {
        name: "Current Attachment Point",
        label: "Current Attachment Point",
        options: {
          filter: true,
          sort: true,
          display: this.state.isESMA === "Yes" ? true : false,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <React.Fragment>
                <div style={{ paddingLeft: "0.5rem" }}>{value}</div>
              </React.Fragment>
            );
          },
        },
      },
      {
        name: "Original Attachment Point",
        label: "Original Attachment Point",
        options: {
          filter: true,
          sort: true,
          display: this.state.isESMA === "Yes" ? true : false,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <React.Fragment>
                <div style={{ paddingLeft: "0.5rem" }}>{value}</div>
              </React.Fragment>
            );
          },
        },
      },
      {
        name: "Credit Enhancement Formula",
        label: "Credit Enhancement Formula",
        options: {
          filter: true,
          sort: true,
          display: this.state.isESMA === "Yes" ? true : false,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <React.Fragment>
                <div style={{ paddingLeft: "0.5rem" }}>{value}</div>
              </React.Fragment>
            );
          },
        },
      },
      {
        name: "Pari-Passu Tranches",
        label: "Pari-Passu Tranches",
        options: {
          filter: true,
          sort: true,
          display: this.state.isESMA === "Yes" ? true : false,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <React.Fragment>
                <div style={{ paddingLeft: "0.5rem" }}>{value}</div>
              </React.Fragment>
            );
          },
        },
      },
      {
        name: "Senior Tranches",
        label: "Senior Tranches",
        options: {
          filter: true,
          sort: true,
          display: this.state.isESMA === "Yes" ? true : false,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <React.Fragment>
                <div style={{ paddingLeft: "0.5rem" }}>{value}</div>
              </React.Fragment>
            );
          },
        },
      },
      {
        name: "Outstanding Principal Deficiency Ledger Balance",
        label: "Outstanding Principal Deficiency Ledger Balance",
        options: {
          filter: true,
          sort: true,
          display: this.state.isESMA === "Yes" ? true : false,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <React.Fragment>
                <div style={{ paddingLeft: "0.5rem" }}>{value}</div>
              </React.Fragment>
            );
          },
        },
      },
      {
        name: "Guarantor Legal Entity Identifier",
        label: "Guarantor Legal Entity Identifier",
        options: {
          filter: true,
          sort: true,
          display: this.state.isESMA === "Yes" ? true : false,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <React.Fragment>
                <div style={{ paddingLeft: "0.5rem" }}>{value}</div>
              </React.Fragment>
            );
          },
        },
      },
      {
        name: "Guarantor Name",
        label: "Guarantor Name",
        options: {
          filter: true,
          sort: true,
          display: this.state.isESMA === "Yes" ? true : false,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <React.Fragment>
                <div style={{ paddingLeft: "0.5rem" }}>{value}</div>
              </React.Fragment>
            );
          },
        },
      },
      {
        name: "Guarantor ESA Subsector",
        label: "Guarantor ESA Subsector",
        options: {
          filter: true,
          sort: true,
          display: this.state.isESMA === "Yes" ? true : false,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <React.Fragment>
                <div style={{ paddingLeft: "0.5rem" }}>{value}</div>
              </React.Fragment>
            );
          },
        },
      },
      {
        name: "Protection Type",
        label: "Protection Type",
        options: {
          filter: true,
          sort: true,
          display: this.state.isESMA === "Yes" ? true : false,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <React.Fragment>
                <div style={{ paddingLeft: "0.5rem" }}>{value}</div>
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
          // customHeadRender: (columnMeta, updateDirection) => (
          //   <th
          //     style={{
          //       backgroundColor: "rgba(1, 142, 130, 0.1)",
          //       borderBottom: "none",
          //       paddingBottom: "5px",
          //       paddingTop: "5px",
          //       paddingLeft: "4rem",
          //     }}
          //   >
          //     {columnMeta.label}
          //   </th>
          // ),
          customBodyRender: (value, tableMeta, updateValue) => {
            const getKey = this.state.tableData;

            return (
              <React.Fragment>
                <div className="">
                  <span
                    style={{
                      textAlign: "center",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      paddingRight: "3rem",
                    }}
                  >
                    {/* <Button variant="outlined" id="optionalbutton" type="submit" onClick={this.onOpenModal1.bind(this)}> */}
                    {/* <button
                      className="popupbutton1"
                      onClick={() =>
                        this.onOpenModal1(
                          value,
                          tableMeta.rowData.splice(1, 10)
                        )
                      }
                    >
                      View
                    </button> */}
                    <button
                      className="popupbutton1"
                      onClick={() =>
                        this.onOpenModal2(
                          value,
                          tableMeta.rowData.splice(1, 52),
                          getKey
                        )
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="popupbuttons1"
                      onClick={() =>
                        this.onOpenModal3(
                          value,
                          tableMeta.rowData.splice(1, 52)
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
      <>
        <div className="page">
          <Sidebar activeComponent={"PayingAgentDeal"} />
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

              <div className="TrancheHeadBtns">
                <div className="investor-heading-container-tranches">
                  <h1 className="headerdashboard1">List of Tranches</h1>
                </div>
                <div className="Tranches_right_btns">
                  <div className="">
                    <div className="TranBtns">
                      {
                        <Button
                          variant="outlined"
                          // color="primary"
                          type="button"
                          onClick={this.handleDownloadClick}
                        >
                          <img src={DownloadLogo} />
                          Template
                        </Button>
                      }
                    </div>
                  </div>
                  <div className="">
                    <div className="TranBtns">
                      <label htmlFor="icon-button-file-id21">
                        <Button
                          variant="contained"
                          color="primary"
                          type="button"
                        >
                          <img src={Upload_Logo} />
                          Upload
                          {this.state.fileUploaded && (
                            <span className="UploadedFileTranche">
                              <img
                                src={checkedImg}
                                alt="upload_Icon"
                                className="UploadedFileImgTranche"
                              />
                            </span>
                          )}
                        </Button>
                      </label>
                      <input
                        id="icon-button-file-id21"
                        type="file"
                        accept=".csv,.xlsx,.xls, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                        style={{
                          position: "relative",
                          width: "90%",
                          height: "2.5rem",
                          cursor: "pointer",
                          left: "7px",
                          top: "-47px",
                          right: "0px",
                          opacity: "0",
                          border: "1.2px solid #212121",
                        }}
                        onChange={(e) => this.handleFileUpload(e)}
                      />
                    </div>
                  </div>
                  <div className="">
                    <div className="">
                      {
                        <Button
                          variant="contained"
                          color="primary"
                          type="button"
                          onClick={() => this.onOpenModal()}
                        >
                          Add Tranche
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
                style={customStylesautoTranches}
                appElement={document.getElementById("root")}
              >
                <React.Fragment>
                  <div className="modalPopup">
                    <h2>Add Tranche</h2>
                    <button
                      type="button"
                      className="closePopup1"
                      style={{ minWidth: "30px" }}
                      onClick={this.onCloseModal}
                    >
                      <CloseIcon></CloseIcon>{" "}
                    </button>

                    {/* {this.state.popupLoader === true ? <CircularProgress size="30px" color="secondary" /> : ' '} */}

                    <div className="modalshiftcontent3">
                      <form
                        className="form-container-tranches"
                        onSubmit={this.AddSubmit}
                      >
                        <div className="input-container">
                          <label className="label"> Name</label>
                          <input
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
                          <label className="label">CUSIP</label>
                          <input
                            placeholder="Type here"
                            className="input"
                            type="text"
                            onChange={(e) => {
                              this.setState({
                                formData: {
                                  ...this.state.formData,
                                  Cusip: e.target.value,
                                },
                              });
                            }}
                            value={this.state.formData.Cusip}
                          />
                        </div>

                        <div className="input-container">
                          <label className="label">
                            Original Principal Balance
                          </label>
                          <input
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
                                  "Original Principal Balance": formattedValue,
                                },
                              });
                            }}
                            value={
                              this.state.formData["Original Principal Balance"]
                            }
                          />
                        </div>

                        <div className="input-container">
                          <label className="label">Class Type</label>
                          <select
                            className="input-select"
                            onChange={(e) => {
                              this.setState({
                                formData: {
                                  ...this.state.formData,
                                  "Class Type": e.target.value,
                                },
                              });
                            }}
                            value={this.state.formData["Class Type"]}
                          >
                            <option value="">Select any one</option>
                            <option value="Senior">Senior</option>
                            <option value="Mezzanine">Mezzanine</option>
                            <option value="Subordinate">Subordinate</option>
                            <option value="PO">PO</option>
                            <option value="IO">IO</option>
                            <option value="Excess Interest">
                              Excess Interest
                            </option>
                            <option value="Residual">Residual</option>
                            <option value="Combination Notes">
                              Combination Notes
                            </option>
                          </select>
                        </div>

                        <div className="input-container">
                          <label className="label">Interest Type</label>
                          <select
                            className="input-select"
                            onChange={(e) => {
                              this.setState({
                                formData: {
                                  ...this.state.formData,
                                  "Interest Type": e.target.value,
                                },
                              });
                            }}
                            value={this.state.formData["Interest Type"]}
                          >
                            <option value="">Select any one</option>
                            <option value="Fixed">Fixed</option>
                            <option value="Floating">Floating</option>
                            <option value="Excess Interest">
                              Excess Interest
                            </option>
                          </select>
                        </div>
                        {/* <div className="input-container">
                         <div className="radio-input-container">
                           <div className="radio1-container">
                             <p>Alternate Interest Basis</p>
                             <Switch
                               className="addswitch"
                               checked={this.state.addswitchtoggle}
                               onChange={this.handleChange1}
                               name="togglevat"
                               inputProps={{
                                 "aria-label": "secondary checkbox",
                               }}
                             />
                           </div>
                         </div>

                         <input
                           
                           placeholder="Type Expression here"
                           className="input"
                           type="text"
                           disabled={
                             this.state.addswitchtoggle === false
                               ? true
                               : false
                           }
                           onChange={(e) => {
                             this.setState({
                               formData: {
                                 ...this.state.formData,
                                 AlternateInterestBasis: e.target.value,
                               },
                             });
                           }}
                           value={this.state.formData.AlternateInterestBasis}
                           // 
                         />
                       </div> */}

                        <div className="input-container">
                          <label className="label">Interest Rate</label>
                          <input
                            placeholder="Type Rate or Expression"
                            className="input"
                            type="text"
                            onChange={(e) => {
                              this.setState({
                                formData: {
                                  ...this.state.formData,
                                  "Interest Rate": e.target.value,
                                },
                              });
                            }}
                            value={this.state.formData["Interest Rate"]}
                          />
                        </div>

                        <div className="input-container">
                          <label className="label">Index Code</label>
                          <input
                            placeholder="Type here"
                            className="input"
                            type="text"
                            onChange={(e) => {
                              this.setState({
                                formData: {
                                  ...this.state.formData,
                                  "Index Code": e.target.value,
                                },
                              });
                            }}
                            value={this.state.formData["Index Code"]}
                          />
                        </div>

                        <div className="input-container">
                          <label className="label">Margin</label>
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
                                    Margin: e.target.value,
                                  },
                                });
                              }}
                              value={this.state.formData.Margin}
                            />
                            <p>%</p>
                          </div>
                        </div>

                        <div className="input-container">
                          <label className="label">Day Count Method</label>
                          <select
                            className="input-select"
                            onChange={(e) => {
                              this.setState({
                                formData: {
                                  ...this.state.formData,
                                  "Day Count Method": e.target.value,
                                },
                              });
                            }}
                            value={this.state.formData["Day Count Method"]}
                          >
                            <option value="">Select any one</option>
                            <option value="30/360">30/360</option>
                            <option value="30E/360">30E/360</option>
                            <option value="Act/360">Act/360</option>
                            <option value="Act/365">Act/365</option>
                            <option value="Act/365L">Act/365L</option>
                          </select>
                        </div>
                        <div
                          className="input-generalContainer"
                          style={{
                            left: "0.1rem",
                            bottom: "0.2rem",
                            position: "relative",
                          }}
                        >
                          <label
                            className="label"
                            style={{ left: "-0.2rem", position: "relative" }}
                          >
                            {" "}
                            Maturity Date
                          </label>
                          <MuiPickersUtilsProvider utils={MomentUtils}>
                            <KeyboardDatePicker
                              className="input-Datepickercss-tranches"
                              disableToolbar
                              margin="normal"
                              id="date1"
                              value={this.state.formData["Maturity Date"] ?? ""}
                              onChange={(date) =>
                                this.setState({
                                  formData: {
                                    ...this.state.formData,
                                    ["Maturity Date"]: moment(date)
                                      .format("MM/DD/YYYY")
                                      .toString(),
                                  },
                                })
                              }
                              keyboard
                              placeholder="MM/DD/YYYY"
                              format={"MM/DD/YYYY"}
                              disableopenonenter
                              animateYearScrolling={false}
                              autoOk={true}
                              clearable
                              variant="filled"
                              helperText={""}
                            />
                          </MuiPickersUtilsProvider>
                        </div>

                        {this.state.isSecuritisation !==
                        "Securitisation" ? null : (
                          <div className="input-container">
                            <label className="label">
                              Loss Allocation Method
                            </label>
                            <input
                              placeholder="Type Expression"
                              className="input"
                              type="text"
                              onChange={(e) => {
                                this.setState({
                                  formData: {
                                    ...this.state.formData,
                                    "Loss Allocation Method": e.target.value,
                                  },
                                });
                              }}
                              value={
                                this.state.formData["Loss Allocation Method"]
                              }
                            />
                          </div>
                        )}

                        {this.state.isSecuritisation !==
                        "Securitisation" ? null : (
                          <div className="input-container">
                            <label className="label">Coupon Cap1</label>
                            <input
                              placeholder="Type Expression"
                              className="input"
                              type="text"
                              onChange={(e) => {
                                this.setState({
                                  formData: {
                                    ...this.state.formData,
                                    "Coupon Cap1": e.target.value,
                                  },
                                });
                              }}
                              value={this.state.formData["Coupon Cap1"]}
                            />
                          </div>
                        )}

                        {this.state.isSecuritisation !==
                        "Securitisation" ? null : (
                          <div className="input-container">
                            <label className="label">Coupon Cap2</label>
                            <input
                              placeholder="Type Expression"
                              className="input"
                              type="text"
                              onChange={(e) => {
                                this.setState({
                                  formData: {
                                    ...this.state.formData,
                                    "Coupon Cap2": e.target.value,
                                  },
                                });
                              }}
                              value={this.state.formData["Coupon Cap2"]}
                            />
                          </div>
                        )}

                        <div className="input-container">
                          <label className="label">
                            Interest on Shortfall Flag
                          </label>
                          <select
                            className="input-select"
                            onChange={(e) => {
                              this.setState({
                                formData: {
                                  ...this.state.formData,
                                  "Interest On Shortfall Flag": e.target.value,
                                },
                              });
                            }}
                            value={
                              this.state.formData["Interest On Shortfall Flag"]
                            }
                          >
                            <option value="">Select any one</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </div>
                        {this.state.isSecuritisation !==
                        "Securitisation" ? null : (
                          <div className="input-container">
                            <label className="label">
                              Interest on WAC Shortfall Flag
                            </label>
                            <select
                              className="input-select"
                              onChange={(e) => {
                                this.setState({
                                  formData: {
                                    ...this.state.formData,
                                    "Interest On WAC Shortfall Flag":
                                      e.target.value,
                                  },
                                });
                              }}
                              value={
                                this.state.formData[
                                  "Interest On WAC Shortfall Flag"
                                ]
                              }
                            >
                              <option value="">Select any one</option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </select>
                          </div>
                        )}

                        <div className="input-container">
                          <label className="label">
                            Deferral Allocation Method
                          </label>
                          <input
                            placeholder="Type Expression"
                            className="input"
                            type="text"
                            onChange={(e) => {
                              this.setState({
                                formData: {
                                  ...this.state.formData,
                                  "Deferral Allocation Method": e.target.value,
                                },
                              });
                            }}
                            value={
                              this.state.formData["Deferral Allocation Method"]
                            }
                          />
                        </div>

                        {this.state.isSecuritisation !==
                        "Securitisation" ? null : (
                          <div className="input-container">
                            <label className="label">Stepup Margin</label>
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
                                      "Stepup Margin": e.target.value,
                                    },
                                  });
                                }}
                                value={this.state.formData["Stepup Margin"]}
                              />
                              <p>%</p>
                            </div>
                          </div>
                        )}

                        <div className="input-container">
                          <label className="label">
                            Index Determination Date Logic
                          </label>
                          <input
                            placeholder="Type Expression"
                            className="input"
                            type="text"
                            onChange={(e) => {
                              this.setState({
                                formData: {
                                  ...this.state.formData,
                                  "Index Determination Date Logic":
                                    e.target.value,
                                },
                              });
                            }}
                            value={
                              this.state.formData[
                                "Index Determination Date Logic"
                              ]
                            }
                          />
                        </div>

                        {this.state.isSecuritisation !==
                        "Securitisation" ? null : (
                          <div
                            className="input-generalContainer"
                            style={{
                              left: "0.1rem",
                              bottom: "0.2rem",
                              position: "relative",
                            }}
                          >
                            <label
                              className="label"
                              style={{
                                left: "-0.2rem",
                                position: "relative",
                              }}
                            >
                              Stepup Date
                            </label>
                            <MuiPickersUtilsProvider utils={MomentUtils}>
                              <KeyboardDatePicker
                                className="input-Datepickercss-tranches"
                                disableToolbar
                                margin="normal"
                                id="date1"
                                value={this.state.formData["Stepup Date"] ?? ""}
                                onChange={(date) =>
                                  this.setState((prevState) => {
                                    const formattedDate = moment(date)
                                      .format("MM/DD/YYYY")
                                      .toString();
                                    return {
                                      formData: {
                                        ...prevState.formData,
                                        ["Stepup Date"]: formattedDate,
                                      },
                                    };
                                  })
                                }
                                keyboard
                                placeholder="MM/DD/YYYY"
                                format={"MM/DD/YYYY"}
                                disableopenonenter
                                animateYearScrolling={false}
                                autoOk={true}
                                clearable
                                variant="filled"
                                helperText={""}
                              />
                            </MuiPickersUtilsProvider>
                          </div>
                        )}

                        {this.state.isSecuritisation !==
                        "Securitisation" ? null : (
                          <div className="input-container">
                            <label className="label">
                              Loss Allocation Sequence
                            </label>
                            <input
                              placeholder="Type here"
                              className="input"
                              type="text"
                              onChange={(e) => {
                                this.setState({
                                  formData: {
                                    ...this.state.formData,
                                    "Loss Allocation Sequence": e.target.value,
                                  },
                                });
                              }}
                              value={
                                this.state.formData["Loss Allocation Sequence"]
                              }
                            />
                          </div>
                        )}

                        <div className="input-container">
                          <label className="label">
                            Interest Accrual Start Date Logic
                          </label>
                          <input
                            placeholder="Type here"
                            className="input"
                            type="text"
                            onChange={(e) => {
                              this.setState({
                                formData: {
                                  ...this.state.formData,
                                  "Interest Accrual Start Date Logic":
                                    e.target.value,
                                },
                              });
                            }}
                            value={
                              this.state.formData[
                                "Interest Accrual Start Date Logic"
                              ]
                            }
                          />
                        </div>

                        <div className="input-container">
                          <label className="label">
                            Interest Accrual End Date Logic
                          </label>
                          <input
                            placeholder="Type here"
                            className="input"
                            type="text"
                            onChange={(e) => {
                              this.setState({
                                formData: {
                                  ...this.state.formData,
                                  "Interest Accrual End Date Logic":
                                    e.target.value,
                                },
                              });
                            }}
                            value={
                              this.state.formData[
                                "Interest Accrual End Date Logic"
                              ]
                            }
                          />
                        </div>

                        {this.state.isSecuritisation !== "Securitisation" ? (
                          <div className="input-container">
                            <label className="label">Facility Type</label>
                            <select
                              className="input-select"
                              onChange={(e) => {
                                this.setState({
                                  formData: {
                                    ...this.state.formData,
                                    "Facility Type": e.target.value,
                                  },
                                });
                              }}
                              value={this.state.formData["Facility Type"]}
                            >
                              <option value="">Select any one</option>
                              <option value="Term">Term</option>
                              <option value="Revolving">Revolving</option>
                            </select>
                          </div>
                        ) : null}

                        {this.state.isSecuritisation !== "Securitisation" ? (
                          <div className="input-container">
                            <label className="label">
                              Original Commitment Balance
                            </label>
                            <input
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
                                    "Original Commitment Balance":
                                      formattedValue,
                                  },
                                });
                              }}
                              value={
                                this.state.formData[
                                  "Original Commitment Balance"
                                ]
                              }
                            />
                          </div>
                        ) : null}

                        {this.state.isSecuritisation !== "Securitisation" ? (
                          <div className="input-container">
                            <label className="label">Commitment Fee Rate</label>
                            <input
                              placeholder="Type here"
                              className="input"
                              type="text"
                              onChange={(e) => {
                                this.setState({
                                  formData: {
                                    ...this.state.formData,
                                    "Commitment Fee Rate": e.target.value,
                                  },
                                });
                              }}
                              value={this.state.formData["Commitment Fee Rate"]}
                            />
                          </div>
                        ) : null}

                        {this.state.isSecuritisation !== "Securitisation" ? (
                          <div className="input-container">
                            <label className="label">
                              Commitment Fee Basis
                            </label>
                            <input
                              placeholder="Type here"
                              className="input"
                              type="text"
                              onChange={(e) => {
                                this.setState({
                                  formData: {
                                    ...this.state.formData,
                                    "Commitment Fee Basis": e.target.value,
                                  },
                                });
                              }}
                              value={
                                this.state.formData["Commitment Fee Basis"]
                              }
                            />
                          </div>
                        ) : null}

                        <div className="input-container">
                          <label className="label">Notional Flag</label>
                          <select
                            className="input-select"
                            onChange={(e) => {
                              this.setState({
                                formData: {
                                  ...this.state.formData,
                                  "Notional Flag": e.target.value,
                                },
                              });
                            }}
                            value={this.state.formData["Notional Flag"]}
                          >
                            <option value="NA">Select any one</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </div>

                        <div className="input-container">
                          <label className="label">
                            Original Notional Balance
                          </label>
                          <input
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
                                  "Original Notional Balance": formattedValue,
                                },
                              });
                            }}
                            value={
                              this.state.formData["Original Notional Balance"]
                            }
                          />
                        </div>

                        <div className="input-container">
                          <label className="label">
                            Beginning Notional Balance Logic
                          </label>
                          <input
                            placeholder="Type Expression"
                            className="input"
                            type="text"
                            onChange={(e) => {
                              this.setState({
                                formData: {
                                  ...this.state.formData,
                                  "Beginning Notional Balance Logic":
                                    e.target.value,
                                },
                              });
                            }}
                            value={
                              this.state.formData[
                                "Beginning Notional Balance Logic"
                              ]
                            }
                          />
                        </div>

                        <div className="input-container">
                          <label className="label">
                            Ending Notional Balance Logic
                          </label>
                          <input
                            placeholder="Type Expression"
                            className="input"
                            type="text"
                            onChange={(e) => {
                              this.setState({
                                formData: {
                                  ...this.state.formData,
                                  "Ending Notional Balance Logic":
                                    e.target.value,
                                },
                              });
                            }}
                            value={
                              this.state.formData[
                                "Ending Notional Balance Logic"
                              ]
                            }
                          />
                        </div>

                        {this.state.isESMA === "Yes" ? (
                          <>
                            <div className="Accordian">
                              <img
                                src={AccordIcon}
                                alt="Accordian"
                                className={
                                  this.state.isAccordian
                                    ? "AccordImg"
                                    : "AccordImgReverse"
                                }
                                onClick={this.handleAccordian}
                              />
                            </div>

                            {!this.state.isAccordian ? (
                              <>
                                <div className="input-container">
                                  <label className="label">
                                    International Securities Identification
                                    Number
                                  </label>
                                  <input
                                    placeholder="Type here"
                                    className="input"
                                    type="text"
                                    onChange={(e) => {
                                      this.setState({
                                        formData: {
                                          ...this.state.formData,
                                          "International Securities Identification Number":
                                            e.target.value,
                                        },
                                      });
                                    }}
                                    value={
                                      this.state.formData[
                                        "International Securities Identification Number"
                                      ]
                                    }
                                  />
                                </div>
                                <div className="input-container">
                                  <label className="label">
                                    Tranche/Bond Type
                                  </label>
                                  <select
                                    className="input-select"
                                    onChange={(e) => {
                                      this.setState({
                                        formData: {
                                          ...this.state.formData,
                                          "Tranche/Bond Type": e.target.value,
                                        },
                                      });
                                    }}
                                    value={
                                      this.state.formData["Tranche/Bond Type"]
                                    }
                                  >
                                    <option value="NA">Select any one</option>
                                    <option value="HBUL">HBUL</option>
                                    <option value="SBUL">SBUL</option>
                                    <option value="SAMO">SAMO</option>
                                    <option value="CAMM">CAMM</option>
                                    <option value="OTHR">OTHR</option>
                                  </select>
                                </div>

                                <div className="input-container">
                                  <label className="label">Currency</label>
                                  <input
                                    placeholder="Type here"
                                    className="input"
                                    type="text"
                                    onChange={(e) => {
                                      this.setState({
                                        formData: {
                                          ...this.state.formData,
                                          Currency: e.target.value,
                                        },
                                      });
                                    }}
                                    value={this.state.formData["Currency"]}
                                  />
                                </div>

                                <div className="input-container">
                                  <label className="label">Coupon Floor</label>
                                  <input
                                    placeholder="Type here"
                                    className="input"
                                    type="text"
                                    onChange={(e) => {
                                      this.setState({
                                        formData: {
                                          ...this.state.formData,
                                          "Coupon Floor": e.target.value,
                                        },
                                      });
                                    }}
                                    value={this.state.formData["Coupon Floor"]}
                                  />
                                </div>

                                <div className="input-container">
                                  <label className="label">Coupon Cap</label>
                                  <input
                                    placeholder="Type here"
                                    className="input"
                                    type="text"
                                    onChange={(e) => {
                                      this.setState({
                                        formData: {
                                          ...this.state.formData,
                                          "Coupon Cap": e.target.value,
                                        },
                                      });
                                    }}
                                    value={this.state.formData["Coupon Cap"]}
                                  />
                                </div>

                                <div className="input-container">
                                  <label className="label">
                                    Business Day Convention
                                  </label>
                                  <select
                                    className="input-select"
                                    onChange={(e) => {
                                      this.setState({
                                        formData: {
                                          ...this.state.formData,
                                          "Business Day Convention":
                                            e.target.value,
                                        },
                                      });
                                    }}
                                    value={
                                      this.state.formData[
                                        "Business Day Convention"
                                      ]
                                    }
                                  >
                                    <option value="NA">Select any one</option>
                                    <option value="FWNG">FWNG</option>
                                    <option value="MODF">MODF</option>
                                    <option value="NEAR">NEAR</option>
                                    <option value="PREC">PREC</option>
                                    <option value="OTHR">OTHR</option>
                                  </select>
                                </div>

                                <div className="input-container">
                                  <label className="label">
                                    Current Interest Rate Index
                                  </label>
                                  <select
                                    className="input-select"
                                    onChange={(e) => {
                                      this.setState({
                                        formData: {
                                          ...this.state.formData,
                                          "Current Interest Rate Index":
                                            e.target.value,
                                        },
                                      });
                                    }}
                                    value={
                                      this.state.formData[
                                        "Current Interest Rate Index"
                                      ]
                                    }
                                  >
                                    <option value="NA">Select any one</option>
                                    <option value="MAAA">MAAA</option>
                                    <option value="FUSW">FUSW</option>
                                    <option value="LIBI">LIBI</option>
                                    <option value="LIBO">LIBO</option>
                                    <option value="SWAP">SWAP</option>
                                    <option value="TREA">TREA</option>
                                    <option value="EURI">EURI</option>
                                    <option value="PFAN">PFAN</option>
                                    <option value="EONA">EONA</option>
                                    <option value="EONS">EONS</option>
                                    <option value="EUUS">EUUS</option>
                                    <option value="EUCH">EUCH</option>
                                    <option value="TIBO">TIBO</option>
                                    <option value="ISDA">ISDA</option>
                                    <option value="GCFR">GCFR</option>
                                    <option value="STBO">STBO</option>
                                    <option value="BBSW">BBSW</option>
                                    <option value="JIBA">JIBA</option>
                                    <option value="BUBO">BUBO</option>
                                    <option value="CDOR">CDOR</option>
                                    <option value="CIBO">CIBO</option>
                                    <option value="MOSP">MOSP</option>
                                    <option value="NIBO">NIBO</option>
                                    <option value="PRBO">PRBO</option>
                                    <option value="TLBO">TLBO</option>
                                    <option value="WIBO">WIBO</option>
                                    <option value="BOER">BOER</option>
                                    <option value="ECBR">ECBR</option>
                                    <option value="LDOR">LDOR</option>
                                    <option value="OTHR">OTHR</option>
                                  </select>
                                </div>

                                <div className="input-container">
                                  <label className="label">
                                    Current Interest Rate Index Tenor
                                  </label>
                                  <select
                                    className="input-select"
                                    onChange={(e) => {
                                      this.setState({
                                        formData: {
                                          ...this.state.formData,
                                          "Current Interest Rate Index Tenor":
                                            e.target.value,
                                        },
                                      });
                                    }}
                                    value={
                                      this.state.formData[
                                        "Current Interest Rate Index Tenor"
                                      ]
                                    }
                                  >
                                    <option value="NA">Select any one</option>
                                    <option value="MNTH">MNTH</option>
                                    <option value="TOMN">TOMN</option>
                                    <option value="QUTR">QUTR</option>
                                    <option value="FOMN">FOMN</option>
                                    <option value="SEMI">SEMI</option>
                                    <option value="YEAR">YEAR</option>
                                    <option value="ONDE">ONDE</option>
                                    <option value="OTHR">OTHR</option>
                                  </select>
                                </div>

                                <div className="input-container">
                                  <label className="label">
                                    Extension Clause
                                  </label>
                                  <select
                                    className="input-select"
                                    onChange={(e) => {
                                      this.setState({
                                        formData: {
                                          ...this.state.formData,
                                          "Extension Clause": e.target.value,
                                        },
                                      });
                                    }}
                                    value={
                                      this.state.formData["Extension Clause"]
                                    }
                                  >
                                    <option value="NA">Select any one</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                  </select>
                                </div>

                                <div
                                  className="input-generalContainer"
                                  style={{
                                    left: "0.1rem",
                                    bottom: "0.2rem",
                                    position: "relative",
                                  }}
                                >
                                  <label
                                    className="label"
                                    style={{
                                      left: "-0.2rem",
                                      position: "relative",
                                    }}
                                  >
                                    Next Call Date
                                  </label>
                                  <MuiPickersUtilsProvider utils={MomentUtils}>
                                    <KeyboardDatePicker
                                      className="input-Datepickercss-tranches"
                                      disableToolbar
                                      margin="normal"
                                      id="date1"
                                      value={
                                        this.state.formData["Next Call Date"] ??
                                        ""
                                      }
                                      onChange={(date) =>
                                        this.setState((prevState) => {
                                          const formattedDate = moment(date)
                                            .format("MM/DD/YYYY")
                                            .toString();
                                          return {
                                            formData: {
                                              ...prevState.formData,
                                              ["Next Call Date"]: formattedDate,
                                            },
                                          };
                                        })
                                      }
                                      keyboard
                                      placeholder="MM/DD/YYYY"
                                      format={"MM/DD/YYYY"}
                                      disableopenonenter
                                      animateYearScrolling={false}
                                      autoOk={true}
                                      clearable
                                      variant="filled"
                                      helperText={""}
                                    />
                                  </MuiPickersUtilsProvider>
                                </div>

                                <div className="input-container">
                                  <label className="label">
                                    Clean-Up Call Threshold
                                  </label>
                                  <select
                                    className="input-select"
                                    onChange={(e) => {
                                      this.setState({
                                        formData: {
                                          ...this.state.formData,
                                          "Clean-Up Call Threshold":
                                            e.target.value,
                                        },
                                      });
                                    }}
                                    value={
                                      this.state.formData[
                                        "Clean-Up Call Threshold"
                                      ]
                                    }
                                  >
                                    <option value="NA">Select any one</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                  </select>
                                </div>

                                <div
                                  className="input-generalContainer"
                                  style={{
                                    left: "0.1rem",
                                    bottom: "0.2rem",
                                    position: "relative",
                                  }}
                                >
                                  <label
                                    className="label"
                                    style={{
                                      left: "-0.2rem",
                                      position: "relative",
                                    }}
                                  >
                                    Next Put date
                                  </label>
                                  <MuiPickersUtilsProvider utils={MomentUtils}>
                                    <KeyboardDatePicker
                                      className="input-Datepickercss-tranches"
                                      disableToolbar
                                      margin="normal"
                                      id="date1"
                                      value={
                                        this.state.formData["Next Put date"] ??
                                        ""
                                      }
                                      onChange={(date) =>
                                        this.setState((prevState) => {
                                          const formattedDate = moment(date)
                                            .format("MM/DD/YYYY")
                                            .toString();
                                          return {
                                            formData: {
                                              ...prevState.formData,
                                              ["Next Put date"]: formattedDate,
                                            },
                                          };
                                        })
                                      }
                                      keyboard
                                      placeholder="MM/DD/YYYY"
                                      format={"MM/DD/YYYY"}
                                      disableopenonenter
                                      animateYearScrolling={false}
                                      autoOk={true}
                                      clearable
                                      variant="filled"
                                      helperText={""}
                                    />
                                  </MuiPickersUtilsProvider>
                                </div>

                                <div className="input-container">
                                  <label className="label">
                                    Settlement Convention
                                  </label>
                                  <select
                                    className="input-select"
                                    onChange={(e) => {
                                      this.setState({
                                        formData: {
                                          ...this.state.formData,
                                          "Settlement Convention":
                                            e.target.value,
                                        },
                                      });
                                    }}
                                    value={
                                      this.state.formData[
                                        "Settlement Convention"
                                      ]
                                    }
                                  >
                                    <option value="NA">Select any one</option>
                                    <option value="TONE">TONE</option>
                                    <option value="TTWO">TTWO</option>
                                    <option value="TTRE">TTRE</option>
                                    <option value="ASAP">ASAP</option>
                                    <option value="ENDC">ENDC</option>
                                    <option value="MONT">MONT</option>
                                    <option value="FUTU">FUTU</option>
                                    <option value="NXTD">NXTD</option>
                                    <option value="REGU">REGU</option>
                                    <option value="TFIV">TFIV</option>
                                    <option value="TFOR">TFOR</option>
                                    <option value="WHIF">WHIF</option>
                                    <option value="WDIS">WDIS</option>
                                    <option value="WISS">WISS</option>
                                    <option value="WHID">WHID</option>
                                    <option value="OTHR">OTHR</option>
                                  </select>
                                </div>

                                <div className="input-container">
                                  <label className="label">
                                    Current Attachment Point
                                  </label>
                                  <input
                                    placeholder="Type here"
                                    className="input"
                                    type="text"
                                    onChange={(e) => {
                                      this.setState({
                                        formData: {
                                          ...this.state.formData,
                                          "Current Attachment Point":
                                            e.target.value,
                                        },
                                      });
                                    }}
                                    value={
                                      this.state.formData[
                                        "Current Attachment Point"
                                      ]
                                    }
                                  />
                                </div>

                                <div className="input-container">
                                  <label className="label">
                                    Original Attachment Point
                                  </label>
                                  <input
                                    placeholder="Type here"
                                    className="input"
                                    type="text"
                                    onChange={(e) => {
                                      this.setState({
                                        formData: {
                                          ...this.state.formData,
                                          "Original Attachment Point":
                                            e.target.value,
                                        },
                                      });
                                    }}
                                    value={
                                      this.state.formData[
                                        "Original Attachment Point"
                                      ]
                                    }
                                  />
                                </div>

                                <div className="input-container">
                                  <label className="label">
                                    Credit Enhancement Formula
                                  </label>
                                  <input
                                    placeholder="Type here"
                                    className="input"
                                    type="text"
                                    onChange={(e) => {
                                      this.setState({
                                        formData: {
                                          ...this.state.formData,
                                          "Credit Enhancement Formula":
                                            e.target.value,
                                        },
                                      });
                                    }}
                                    value={
                                      this.state.formData[
                                        "Credit Enhancement Formula"
                                      ]
                                    }
                                  />
                                </div>

                                <div className="input-container">
                                  <label className="label">
                                    Pari-Passu Tranches
                                  </label>
                                  <input
                                    placeholder="Type here"
                                    className="input"
                                    type="text"
                                    onChange={(e) => {
                                      this.setState({
                                        formData: {
                                          ...this.state.formData,
                                          "Pari-Passu Tranches": e.target.value,
                                        },
                                      });
                                    }}
                                    value={
                                      this.state.formData["Pari-Passu Tranches"]
                                    }
                                  />
                                </div>
                                <div className="input-container">
                                  <label className="label">
                                    Senior Tranches
                                  </label>
                                  <input
                                    placeholder="Type here"
                                    className="input"
                                    type="text"
                                    onChange={(e) => {
                                      this.setState({
                                        formData: {
                                          ...this.state.formData,
                                          "Senior Tranches": e.target.value,
                                        },
                                      });
                                    }}
                                    value={
                                      this.state.formData["Senior Tranches"]
                                    }
                                  />
                                </div>

                                <div className="input-container">
                                  <label className="label">
                                    Outstanding Principal Deficiency Ledger
                                    Balance
                                  </label>
                                  <input
                                    placeholder="Type here"
                                    className="input"
                                    type="text"
                                    onChange={(e) => {
                                      this.setState({
                                        formData: {
                                          ...this.state.formData,
                                          "Outstanding Principal Deficiency Ledger Balance":
                                            e.target.value,
                                        },
                                      });
                                    }}
                                    value={
                                      this.state.formData[
                                        "Outstanding Principal Deficiency Ledger Balance"
                                      ]
                                    }
                                  />
                                </div>

                                <div className="input-container">
                                  <label className="label">
                                    Guarantor Legal Entity Identifier
                                  </label>
                                  <input
                                    placeholder="Type here"
                                    className="input"
                                    type="text"
                                    onChange={(e) => {
                                      this.setState({
                                        formData: {
                                          ...this.state.formData,
                                          "Guarantor Legal Entity Identifier":
                                            e.target.value,
                                        },
                                      });
                                    }}
                                    value={
                                      this.state.formData[
                                        "Guarantor Legal Entity Identifier"
                                      ]
                                    }
                                  />
                                </div>

                                <div className="input-container">
                                  <label className="label">
                                    Guarantor Name
                                  </label>
                                  <input
                                    placeholder="Type here"
                                    className="input"
                                    type="text"
                                    onChange={(e) => {
                                      this.setState({
                                        formData: {
                                          ...this.state.formData,
                                          "Guarantor Name": e.target.value,
                                        },
                                      });
                                    }}
                                    value={
                                      this.state.formData["Guarantor Name"]
                                    }
                                  />
                                </div>

                                <div className="input-container">
                                  <label className="label">
                                    Guarantor ESA Subsector
                                  </label>
                                  <input
                                    placeholder="Type here"
                                    className="input"
                                    type="text"
                                    onChange={(e) => {
                                      this.setState({
                                        formData: {
                                          ...this.state.formData,
                                          "Guarantor ESA Subsector":
                                            e.target.value,
                                        },
                                      });
                                    }}
                                    value={
                                      this.state.formData[
                                        "Guarantor ESA Subsector"
                                      ]
                                    }
                                  />
                                </div>

                                <div className="input-container">
                                  <label className="label">
                                    Protection Type
                                  </label>
                                  <select
                                    className="input-select"
                                    onChange={(e) => {
                                      this.setState({
                                        formData: {
                                          ...this.state.formData,
                                          "Protection Type": e.target.value,
                                        },
                                      });
                                    }}
                                    value={
                                      this.state.formData["Protection Type"]
                                    }
                                  >
                                    <option value="NA">Select any one</option>
                                    <option value="CDSX">CDSX</option>
                                    <option value="CLKN">CLKN</option>
                                    <option value="FGUA">FGUA</option>
                                    <option value="CINS">CINS</option>
                                    <option value="OTHR">OTHR</option>
                                  </select>
                                </div>
                              </>
                            ) : null}
                          </>
                        ) : null}

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
                isOpen={this.state.open3}
                onRequestClose={this.onCloseModal2}
                contentLabel="Minimal Modal Example"
                style={customStylesautoTranches}
                appElement={document.getElementById("root")}
              >
                <React.Fragment>
                  <div className="modalPopup">
                   <div className="popupTitle">
                   <h2>Edit Tranche</h2>
                    <button
                      type="button"
                      className="closePopup"
                      style={{ minWidth: "30px" }}
                      onClick={this.onCloseModal2}
                    >
                      <CloseIcon></CloseIcon>{" "}
                    </button>
                   </div>


                    <div className="modalshiftcontent">
                      <form
                        className="form-container-tranches"
                        onSubmit={this.EditSubmit}
                      >
                        {/* <div className="input-container">
                         <label className="label">ID</label>
                         <input
                           disabled
                           placeholder="Type here"
                           className="input"
                           type="text"
                           onChange={(e) => {
                             this.setState({
                               formData1: {
                                 ...this.state.formData1,
                                 id: e.target.value,
                               },
                             });
                           }}
                           value={this.state.formData1.id}
                         />
                       </div> */}
                        <div className="input-container">
                          <label className="label"> Name</label>
                          <input
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
                          <label className="label">CUSIP</label>
                          <input
                            placeholder="Type here"
                            className="input"
                            type="text"
                            onChange={(e) => {
                              this.setState({
                                formData1: {
                                  ...this.state.formData1,
                                  Cusip: e.target.value,
                                },
                              });
                            }}
                            value={this.state.formData1.Cusip}
                          />
                        </div>

                        <div className="input-container">
                          <label className="label">
                            Original Principal Balance
                          </label>
                          <input
                            placeholder="Type here"
                            className="input"
                            type="text"
                            onKeyDown={this.blockInvalidChar}
                            onChange={(e) => {
                              let removeCharC = e.target.value.replace(
                                /[^0-9\.]/g,
                                ""
                              );
                              // let remove = removeCharC.replace(/\./g, "");
                              let formattedValue = removeCharC.replace(
                                /\B(?=(\d{3})+(?!\d))/g,
                                ","
                              );

                              this.setState({
                                formData1: {
                                  ...this.state.formData1,
                                  "Original Principal Balance": formattedValue,
                                },
                              });
                            }}
                            value={
                              this.state.formData1["Original Principal Balance"]
                            }
                          />
                        </div>

                        <div className="input-container">
                          <label className="label">Class Type</label>
                          <select
                            className="input-select"
                            onChange={(e) => {
                              this.setState({
                                formData1: {
                                  ...this.state.formData1,
                                  "Class Type": e.target.value,
                                },
                              });
                            }}
                            value={this.state.formData1["Class Type"]}
                          >
                            <option value="">Select any one</option>
                            <option value="Senior">Senior</option>
                            <option value="Mezzanine">Mezzanine</option>
                            <option value="Subordinate">Subordinate</option>
                            <option value="PO">PO</option>
                            <option value="IO">IO</option>
                            <option value="Excess Interest">
                              Excess Interest
                            </option>
                            <option value="Residual">Residual</option>
                            <option value="Combination Notes">
                              Combination Notes
                            </option>
                          </select>
                        </div>

                        <div className="input-container">
                          <label className="label">Interest Type</label>
                          <select
                            className="input-select"
                            onChange={(e) => {
                              this.setState({
                                formData1: {
                                  ...this.state.formData1,
                                  "Interest Type": e.target.value,
                                },
                              });
                            }}
                            value={this.state.formData1["Interest Type"]}
                          >
                            <option value="">Select any one</option>
                            <option value="Fixed">Fixed</option>
                            <option value="Floating">Floating</option>
                            <option value="Excess Interest">
                              Excess Interest
                            </option>
                            <option value="WAC">WAC</option>
                            <option value="Residual">Residual</option>
                          </select>
                        </div>
                        {/* <div className="input-container">
                         <div className="radio-input-container">
                           <div className="radio1-container">
                             <p>Alternate Interest Basis</p>
                             <Switch
                               className="addswitch"
                               checked={this.state.addswitchtoggle}
                               onChange={this.handleChange1}
                               name="togglevat"
                               inputProps={{
                                 "aria-label": "secondary checkbox",
                               }}
                             />
                           </div>
                         </div>

                         <input
                           
                           placeholder="Type Expression here"
                           className="input"
                           type="text"
                           disabled={
                             this.state.addswitchtoggle === false
                               ? true
                               : false
                           }
                           onChange={(e) => {
                             this.setState({
                               formData1: {
                                 ...this.state.formData1,
                                 AlternateInterestBasis: e.target.value,
                               },
                             });
                           }}
                           value={this.state.formData1.AlternateInterestBasis}
                           // 
                         />
                       </div> */}

                        <div className="input-container">
                          <label className="label">Interest Rate</label>
                          <input
                            placeholder="Type Rate or Expression"
                            className="input"
                            type="text"
                            onChange={(e) => {
                              this.setState({
                                formData1: {
                                  ...this.state.formData1,
                                  "Interest Rate": e.target.value,
                                },
                              });
                            }}
                            value={this.state.formData1["Interest Rate"]}
                          />
                        </div>

                        <div className="input-container">
                          <label className="label">Index Code</label>
                          <input
                            placeholder="Type here"
                            className="input"
                            type="text"
                            onChange={(e) => {
                              this.setState({
                                formData1: {
                                  ...this.state.formData1,
                                  "Index Code": e.target.value,
                                },
                              });
                            }}
                            value={this.state.formData1["Index Code"]}
                          />
                        </div>

                        <div className="input-container">
                          <label className="label">Margin</label>
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
                                    Margin: e.target.value,
                                  },
                                });
                              }}
                              value={this.state.formData1.Margin}
                            />
                            <p>%</p>
                          </div>
                        </div>

                        <div className="input-container">
                          <label className="label">Day Count Method</label>
                          <select
                            className="input-select"
                            onChange={(e) => {
                              this.setState({
                                formData1: {
                                  ...this.state.formData1,
                                  "Day Count Method": e.target.value,
                                },
                              });
                            }}
                            value={this.state.formData1["Day Count Method"]}
                          >
                            <option value="">Select any one</option>
                            <option value="30/360">30/360</option>
                            <option value="30E/360">30E/360</option>
                            <option value="Act/360">Act/360</option>
                            <option value="Act/365">Act/365</option>
                            <option value="Act/365L">Act/365L</option>
                          </select>
                        </div>

                        <div
                          className="input-generalContainer"
                          style={{
                            left: "0.1rem",
                            bottom: "0.2rem",
                            position: "relative",
                          }}
                        >
                          <label
                            className="label"
                            style={{ left: "-0.2rem", position: "relative" }}
                          >
                            {" "}
                            Maturity Date
                          </label>
                          <MuiPickersUtilsProvider utils={MomentUtils}>
                            <KeyboardDatePicker
                              className="input-Datepickercss-tranches"
                              disableToolbar
                              margin="normal"
                              id="date1"
                              value={
                                this.state.formData1["Maturity Date"] ?? ""
                              }
                              onChange={(date) =>
                                this.setState({
                                  formData1: {
                                    ...this.state.formData1,
                                    "Maturity Date": moment(date)
                                      .format("MM/DD/YYYY")
                                      .toString(),
                                  },
                                })
                              }
                              keyboard
                              placeholder="MM/DD/YYYY"
                              format={"MM/DD/YYYY"}
                              disableopenonenter
                              animateYearScrolling={false}
                              autoOk={true}
                              clearable
                              variant="filled"
                              helperText={""}
                            />
                          </MuiPickersUtilsProvider>
                        </div>

                        {this.state.isSecuritisation !==
                        "Securitisation" ? null : (
                          <div className="input-container">
                            <label className="label">
                              Loss Allocation Method
                            </label>
                            <input
                              placeholder="Type Expression"
                              className="input"
                              type="text"
                              onChange={(e) => {
                                this.setState({
                                  formData1: {
                                    ...this.state.formData1,
                                    "Loss Allocation Method": e.target.value,
                                  },
                                });
                              }}
                              value={
                                this.state.formData1["Loss Allocation Method"]
                              }
                            />
                          </div>
                        )}

                        {this.state.isSecuritisation !==
                        "Securitisation" ? null : (
                          <div className="input-container">
                            <label className="label">Coupon Cap1</label>
                            <input
                              placeholder="Type Expression"
                              className="input"
                              type="text"
                              onChange={(e) => {
                                this.setState({
                                  formData1: {
                                    ...this.state.formData1,
                                    "Coupon Cap1": e.target.value,
                                  },
                                });
                              }}
                              value={this.state.formData1["Coupon Cap1"]}
                            />
                          </div>
                        )}

                        {this.state.isSecuritisation !==
                        "Securitisation" ? null : (
                          <div className="input-container">
                            <label className="label">Coupon Cap2</label>
                            <input
                              placeholder="Type Expression"
                              className="input"
                              type="text"
                              onChange={(e) => {
                                this.setState({
                                  formData1: {
                                    ...this.state.formData1,
                                    "Coupon Cap2": e.target.value,
                                  },
                                });
                              }}
                              value={this.state.formData1["Coupon Cap2"]}
                            />
                          </div>
                        )}

                        <div className="input-container">
                          <label className="label">
                            Interest on Shortfall Flag
                          </label>
                          <select
                            className="input-select"
                            onChange={(e) => {
                              this.setState({
                                formData1: {
                                  ...this.state.formData1,
                                  "Interest On Shortfall Flag": e.target.value,
                                },
                              });
                            }}
                            value={
                              this.state.formData1["Interest On Shortfall Flag"]
                            }
                          >
                            <option value="">Select any one</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </div>

                        {this.state.isSecuritisation !==
                        "Securitisation" ? null : (
                          <div className="input-container">
                            <label className="label">
                              Interest on WAC Shortfall Flag
                            </label>
                            <select
                              className="input-select"
                              onChange={(e) => {
                                this.setState({
                                  formData1: {
                                    ...this.state.formData1,
                                    "Interest On WAC Shortfall Flag":
                                      e.target.value,
                                  },
                                });
                              }}
                              value={
                                this.state.formData1[
                                  "Interest On WAC Shortfall Flag"
                                ]
                              }
                            >
                              <option value="">Select any one</option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </select>
                          </div>
                        )}

                        <div className="input-container">
                          <label className="label">
                            Deferral Allocation Method
                          </label>
                          <input
                            placeholder="Type Expression"
                            className="input"
                            type="text"
                            onChange={(e) => {
                              this.setState({
                                formData1: {
                                  ...this.state.formData1,
                                  "Deferral Allocation Method": e.target.value,
                                },
                              });
                            }}
                            value={
                              this.state.formData1["Deferral Allocation Method"]
                            }
                          />
                        </div>

                        {this.state.isSecuritisation !==
                        "Securitisation" ? null : (
                          <div className="input-container">
                            <label className="label">Stepup Margin</label>
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
                                      "Stepup Margin": e.target.value,
                                    },
                                  });
                                }}
                                value={this.state.formData1["Stepup Margin"]}
                              />
                              <p>%</p>
                            </div>
                          </div>
                        )}

                        <div className="input-container">
                          <label className="label">
                            Index Determination Date Logic
                          </label>
                          <input
                            placeholder="Type Expression"
                            className="input"
                            type="text"
                            onChange={(e) => {
                              this.setState({
                                formData1: {
                                  ...this.state.formData1,
                                  "Index Determination Date Logic":
                                    e.target.value,
                                },
                              });
                            }}
                            value={
                              this.state.formData1[
                                "Index Determination Date Logic"
                              ]
                            }
                          />
                        </div>

                        {this.state.isSecuritisation !==
                        "Securitisation" ? null : (
                          <div
                            className="input-generalContainer"
                            style={{
                              left: "0.1rem",
                              bottom: "0.2rem",
                              position: "relative",
                            }}
                          >
                            <label
                              className="label"
                              style={{
                                left: "-0.2rem",
                                position: "relative",
                              }}
                            >
                              Stepup Date
                            </label>
                            <MuiPickersUtilsProvider utils={MomentUtils}>
                              <KeyboardDatePicker
                                className="input-Datepickercss-tranches"
                                disableToolbar
                                margin="normal"
                                id="date1"
                                value={
                                  this.state.formData1["Stepup Date"] ?? ""
                                }
                                onChange={(date) =>
                                  this.setState((prevState) => {
                                    const formattedDate = moment(date)
                                      .format("MM/DD/YYYY")
                                      .toString();
                                    return {
                                      formData1: {
                                        ...prevState.formData1,
                                        ["Stepup Date"]: formattedDate,
                                      },
                                    };
                                  })
                                }
                                keyboard
                                placeholder="MM/DD/YYYY"
                                format={"MM/DD/YYYY"}
                                disableopenonenter
                                animateYearScrolling={false}
                                autoOk={true}
                                clearable
                                variant="filled"
                                helperText={""}
                              />
                            </MuiPickersUtilsProvider>
                          </div>
                        )}

                        {this.state.isSecuritisation !==
                        "Securitisation" ? null : (
                          <div className="input-container">
                            <label className="label">
                              Loss Allocation Sequence
                            </label>
                            <input
                              placeholder="Type here"
                              className="input"
                              type="text"
                              onChange={(e) => {
                                this.setState({
                                  formData1: {
                                    ...this.state.formData1,
                                    "Loss Allocation Sequence": e.target.value,
                                  },
                                });
                              }}
                              value={
                                this.state.formData1["Loss Allocation Sequence"]
                              }
                            />
                          </div>
                        )}

                        <div className="input-container">
                          <label className="label">
                            Interest Accrual Start Date Logic
                          </label>
                          <input
                            placeholder="Type here"
                            className="input"
                            type="text"
                            onChange={(e) => {
                              this.setState({
                                formData1: {
                                  ...this.state.formData1,
                                  "Interest Accrual Start Date Logic":
                                    e.target.value,
                                },
                              });
                            }}
                            value={
                              this.state.formData1[
                                "Interest Accrual Start Date Logic"
                              ]
                            }
                          />
                        </div>

                        <div className="input-container">
                          <label className="label">
                            Interest Accrual End Date Logic
                          </label>
                          <input
                            placeholder="Type here"
                            className="input"
                            type="text"
                            onChange={(e) => {
                              this.setState({
                                formData1: {
                                  ...this.state.formData1,
                                  "Interest Accrual End Date Logic":
                                    e.target.value,
                                },
                              });
                            }}
                            value={
                              this.state.formData1[
                                "Interest Accrual End Date Logic"
                              ]
                            }
                          />
                        </div>

                        {this.state.isSecuritisation !== "Securitisation" ? (
                          <div className="input-container">
                            <label className="label">Facility Type</label>
                            <select
                              className="input-select"
                              onChange={(e) => {
                                this.setState({
                                  formData1: {
                                    ...this.state.formData1,
                                    "Facility Type": e.target.value,
                                  },
                                });
                              }}
                              value={this.state.formData1["Facility Type"]}
                            >
                              <option value="">Select any one</option>
                              <option value="Term">Term</option>
                              <option value="Revolving">Revolving</option>
                            </select>
                          </div>
                        ) : null}

                        {this.state.isSecuritisation !== "Securitisation" ? (
                          <div className="input-container">
                            <label className="label">
                              Original Commitment Balance
                            </label>
                            <input
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
                                    "Original Commitment Balance":
                                      formattedValue,
                                  },
                                });
                              }}
                              value={
                                this.state.formData1[
                                  "Original Commitment Balance"
                                ]
                              }
                            />
                          </div>
                        ) : null}

                        {this.state.isSecuritisation !== "Securitisation" ? (
                          <div className="input-container">
                            <label className="label">Commitment Fee Rate</label>
                            <input
                              placeholder="Type here"
                              className="input"
                              type="text"
                              onChange={(e) => {
                                this.setState({
                                  formData1: {
                                    ...this.state.formData1,
                                    "Commitment Fee Rate": e.target.value,
                                  },
                                });
                              }}
                              value={
                                this.state.formData1["Commitment Fee Rate"]
                              }
                            />
                          </div>
                        ) : null}

                        {this.state.isSecuritisation !== "Securitisation" ? (
                          <div className="input-container">
                            <label className="label">
                              Commitment Fee Basis
                            </label>
                            <input
                              placeholder="Type here"
                              className="input"
                              type="text"
                              onChange={(e) => {
                                this.setState({
                                  formData1: {
                                    ...this.state.formData1,
                                    "Commitment Fee Basis": e.target.value,
                                  },
                                });
                              }}
                              value={
                                this.state.formData1["Commitment Fee Basis"]
                              }
                            />
                          </div>
                        ) : null}

                        <div className="input-container">
                          <label className="label">Notional Flag</label>
                          <select
                            className="input-select"
                            onChange={(e) => {
                              this.setState({
                                formData1: {
                                  ...this.state.formData1,
                                  "Notional Flag": e.target.value,
                                },
                              });
                            }}
                            value={this.state.formData1["Notional Flag"]}
                          >
                            <option value="NA">Select any one</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </div>

                        <div className="input-container">
                          <label className="label">
                            Original Notional Balance
                          </label>
                          <input
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
                                  "Original Notional Balance": formattedValue,
                                },
                              });
                            }}
                            value={
                              this.state.formData1["Original Notional Balance"]
                            }
                          />
                        </div>

                        <div className="input-container">
                          <label className="label">
                            Beginning Notional Balance Logic
                          </label>
                          <input
                            placeholder="Type Expression"
                            className="input"
                            type="text"
                            onChange={(e) => {
                              this.setState({
                                formData1: {
                                  ...this.state.formData1,
                                  "Beginning Notional Balance Logic":
                                    e.target.value,
                                },
                              });
                            }}
                            value={
                              this.state.formData1[
                                "Beginning Notional Balance Logic"
                              ]
                            }
                          />
                        </div>

                        <div className="input-container">
                          <label className="label">
                            Ending Notional Balance Logic
                          </label>
                          <input
                            placeholder="Type Expression"
                            className="input"
                            type="text"
                            onChange={(e) => {
                              this.setState({
                                formData1: {
                                  ...this.state.formData1,
                                  "Ending Notional Balance Logic":
                                    e.target.value,
                                },
                              });
                            }}
                            value={
                              this.state.formData1[
                                "Ending Notional Balance Logic"
                              ]
                            }
                          />
                        </div>

                        {this.state.isESMA === "Yes" ? (
                          <>
                            <div className="Accordian">
                              <img
                                src={AccordIcon}
                                alt="Accordian"
                                className={
                                  this.state.isAccordian
                                    ? "AccordImg"
                                    : "AccordImgReverse"
                                }
                                onClick={this.handleAccordian}
                              />
                            </div>

                            {!this.state.isAccordian ? (
                              <>
                                <div className="input-container">
                                  <label className="label">
                                    International Securities Identification
                                    Number
                                  </label>
                                  <input
                                    placeholder="Type here"
                                    className="input"
                                    type="text"
                                    onChange={(e) => {
                                      this.setState({
                                        formData1: {
                                          ...this.state.formData1,
                                          "International Securities Identification Number":
                                            e.target.value,
                                        },
                                      });
                                    }}
                                    value={
                                      this.state.formData1[
                                        "International Securities Identification Number"
                                      ]
                                    }
                                  />
                                </div>
                                <div className="input-container">
                                  <label className="label">
                                    Tranche/Bond Type
                                  </label>
                                  <select
                                    className="input-select"
                                    onChange={(e) => {
                                      this.setState({
                                        formData1: {
                                          ...this.state.formData1,
                                          "Tranche/Bond Type": e.target.value,
                                        },
                                      });
                                    }}
                                    value={
                                      this.state.formData1["Tranche/Bond Type"]
                                    }
                                  >
                                    <option value="NA">Select any one</option>
                                    <option value="HBUL">HBUL</option>
                                    <option value="SBUL">SBUL</option>
                                    <option value="SAMO">SAMO</option>
                                    <option value="CAMM">CAMM</option>
                                    <option value="OTHR">OTHR</option>
                                  </select>
                                </div>

                                <div className="input-container">
                                  <label className="label">Currency</label>
                                  <input
                                    placeholder="Type here"
                                    className="input"
                                    type="text"
                                    onChange={(e) => {
                                      this.setState({
                                        formData1: {
                                          ...this.state.formData1,
                                          Currency: e.target.value,
                                        },
                                      });
                                    }}
                                    value={this.state.formData1["Currency"]}
                                  />
                                </div>

                                <div className="input-container">
                                  <label className="label">Coupon Floor</label>
                                  <input
                                    placeholder="Type here"
                                    className="input"
                                    type="text"
                                    onChange={(e) => {
                                      this.setState({
                                        formData1: {
                                          ...this.state.formData1,
                                          "Coupon Floor": e.target.value,
                                        },
                                      });
                                    }}
                                    value={this.state.formData1["Coupon Floor"]}
                                  />
                                </div>

                                <div className="input-container">
                                  <label className="label">Coupon Cap</label>
                                  <input
                                    placeholder="Type here"
                                    className="input"
                                    type="text"
                                    onChange={(e) => {
                                      this.setState({
                                        formData1: {
                                          ...this.state.formData1,
                                          "Coupon Cap": e.target.value,
                                        },
                                      });
                                    }}
                                    value={this.state.formData1["Coupon Cap"]}
                                  />
                                </div>

                                <div className="input-container">
                                  <label className="label">
                                    Business Day Convention
                                  </label>
                                  <select
                                    className="input-select"
                                    onChange={(e) => {
                                      this.setState({
                                        formData1: {
                                          ...this.state.formData1,
                                          "Business Day Convention":
                                            e.target.value,
                                        },
                                      });
                                    }}
                                    value={
                                      this.state.formData1[
                                        "Business Day Convention"
                                      ]
                                    }
                                  >
                                    <option value="NA">Select any one</option>
                                    <option value="FWNG">FWNG</option>
                                    <option value="MODF">MODF</option>
                                    <option value="NEAR">NEAR</option>
                                    <option value="PREC">PREC</option>
                                    <option value="OTHR">OTHR</option>
                                  </select>
                                </div>

                                <div className="input-container">
                                  <label className="label">
                                    Current Interest Rate Index
                                  </label>
                                  <select
                                    className="input-select"
                                    onChange={(e) => {
                                      this.setState({
                                        formData1: {
                                          ...this.state.formData1,
                                          "Current Interest Rate Index":
                                            e.target.value,
                                        },
                                      });
                                    }}
                                    value={
                                      this.state.formData1[
                                        "Current Interest Rate Index"
                                      ]
                                    }
                                  >
                                    <option value="NA">Select any one</option>
                                    <option value="MAAA">MAAA</option>
                                    <option value="FUSW">FUSW</option>
                                    <option value="LIBI">LIBI</option>
                                    <option value="LIBO">LIBO</option>
                                    <option value="SWAP">SWAP</option>
                                    <option value="TREA">TREA</option>
                                    <option value="EURI">EURI</option>
                                    <option value="PFAN">PFAN</option>
                                    <option value="EONA">EONA</option>
                                    <option value="EONS">EONS</option>
                                    <option value="EUUS">EUUS</option>
                                    <option value="EUCH">EUCH</option>
                                    <option value="TIBO">TIBO</option>
                                    <option value="ISDA">ISDA</option>
                                    <option value="GCFR">GCFR</option>
                                    <option value="STBO">STBO</option>
                                    <option value="BBSW">BBSW</option>
                                    <option value="JIBA">JIBA</option>
                                    <option value="BUBO">BUBO</option>
                                    <option value="CDOR">CDOR</option>
                                    <option value="CIBO">CIBO</option>
                                    <option value="MOSP">MOSP</option>
                                    <option value="NIBO">NIBO</option>
                                    <option value="PRBO">PRBO</option>
                                    <option value="TLBO">TLBO</option>
                                    <option value="WIBO">WIBO</option>
                                    <option value="BOER">BOER</option>
                                    <option value="ECBR">ECBR</option>
                                    <option value="LDOR">LDOR</option>
                                    <option value="OTHR">OTHR</option>
                                  </select>
                                </div>

                                <div className="input-container">
                                  <label className="label">
                                    Current Interest Rate Index Tenor
                                  </label>
                                  <select
                                    className="input-select"
                                    onChange={(e) => {
                                      this.setState({
                                        formData1: {
                                          ...this.state.formData1,
                                          "Current Interest Rate Index Tenor":
                                            e.target.value,
                                        },
                                      });
                                    }}
                                    value={
                                      this.state.formData1[
                                        "Current Interest Rate Index Tenor"
                                      ]
                                    }
                                  >
                                    <option value="NA">Select any one</option>
                                    <option value="MNTH">MNTH</option>
                                    <option value="TOMN">TOMN</option>
                                    <option value="QUTR">QUTR</option>
                                    <option value="FOMN">FOMN</option>
                                    <option value="SEMI">SEMI</option>
                                    <option value="YEAR">YEAR</option>
                                    <option value="ONDE">ONDE</option>
                                    <option value="OTHR">OTHR</option>
                                  </select>
                                </div>

                                <div className="input-container">
                                  <label className="label">
                                    Extension Clause
                                  </label>
                                  <select
                                    className="input-select"
                                    onChange={(e) => {
                                      this.setState({
                                        formData1: {
                                          ...this.state.formData1,
                                          "Extension Clause": e.target.value,
                                        },
                                      });
                                    }}
                                    value={
                                      this.state.formData1["Extension Clause"]
                                    }
                                  >
                                    <option value="NA">Select any one</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                  </select>
                                </div>

                                <div
                                  className="input-generalContainer"
                                  style={{
                                    left: "0.1rem",
                                    bottom: "0.2rem",
                                    position: "relative",
                                  }}
                                >
                                  <label
                                    className="label"
                                    style={{
                                      left: "-0.2rem",
                                      position: "relative",
                                    }}
                                  >
                                    Next Call Date
                                  </label>
                                  <MuiPickersUtilsProvider utils={MomentUtils}>
                                    <KeyboardDatePicker
                                      className="input-Datepickercss-tranches"
                                      disableToolbar
                                      margin="normal"
                                      id="date1"
                                      value={
                                        this.state.formData1[
                                          "Next Call Date"
                                        ] ?? ""
                                      }
                                      onChange={(date) =>
                                        this.setState((prevState) => {
                                          const formattedDate = moment(date)
                                            .format("MM/DD/YYYY")
                                            .toString();
                                          return {
                                            formData1: {
                                              ...prevState.formData1,
                                              ["Next Call Date"]: formattedDate,
                                            },
                                          };
                                        })
                                      }
                                      keyboard
                                      placeholder="MM/DD/YYYY"
                                      format={"MM/DD/YYYY"}
                                      disableopenonenter
                                      animateYearScrolling={false}
                                      autoOk={true}
                                      clearable
                                      variant="filled"
                                      helperText={""}
                                    />
                                  </MuiPickersUtilsProvider>
                                </div>

                                <div className="input-container">
                                  <label className="label">
                                    Clean-Up Call Threshold
                                  </label>
                                  <select
                                    className="input-select"
                                    onChange={(e) => {
                                      this.setState({
                                        formData1: {
                                          ...this.state.formData1,
                                          "Clean-Up Call Threshold":
                                            e.target.value,
                                        },
                                      });
                                    }}
                                    value={
                                      this.state.formData1[
                                        "Clean-Up Call Threshold"
                                      ]
                                    }
                                  >
                                    <option value="NA">Select any one</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                  </select>
                                </div>

                                <div
                                  className="input-generalContainer"
                                  style={{
                                    left: "0.1rem",
                                    bottom: "0.2rem",
                                    position: "relative",
                                  }}
                                >
                                  <label
                                    className="label"
                                    style={{
                                      left: "-0.2rem",
                                      position: "relative",
                                    }}
                                  >
                                    Next Put date
                                  </label>
                                  <MuiPickersUtilsProvider utils={MomentUtils}>
                                    <KeyboardDatePicker
                                      className="input-Datepickercss-tranches"
                                      disableToolbar
                                      margin="normal"
                                      id="date1"
                                      value={
                                        this.state.formData1["Next Put date"] ??
                                        ""
                                      }
                                      onChange={(date) =>
                                        this.setState((prevState) => {
                                          const formattedDate = moment(date)
                                            .format("MM/DD/YYYY")
                                            .toString();
                                          return {
                                            formData1: {
                                              ...prevState.formData1,
                                              ["Next Put date"]: formattedDate,
                                            },
                                          };
                                        })
                                      }
                                      keyboard
                                      placeholder="MM/DD/YYYY"
                                      format={"MM/DD/YYYY"}
                                      disableopenonenter
                                      animateYearScrolling={false}
                                      autoOk={true}
                                      clearable
                                      variant="filled"
                                      helperText={""}
                                    />
                                  </MuiPickersUtilsProvider>
                                </div>

                                <div className="input-container">
                                  <label className="label">
                                    Settlement Convention
                                  </label>
                                  <select
                                    className="input-select"
                                    onChange={(e) => {
                                      this.setState({
                                        formData1: {
                                          ...this.state.formData1,
                                          "Settlement Convention":
                                            e.target.value,
                                        },
                                      });
                                    }}
                                    value={
                                      this.state.formData1[
                                        "Settlement Convention"
                                      ]
                                    }
                                  >
                                    <option value="NA">Select any one</option>
                                    <option value="TONE">TONE</option>
                                    <option value="TTWO">TTWO</option>
                                    <option value="TTRE">TTRE</option>
                                    <option value="ASAP">ASAP</option>
                                    <option value="ENDC">ENDC</option>
                                    <option value="MONT">MONT</option>
                                    <option value="FUTU">FUTU</option>
                                    <option value="NXTD">NXTD</option>
                                    <option value="REGU">REGU</option>
                                    <option value="TFIV">TFIV</option>
                                    <option value="TFOR">TFOR</option>
                                    <option value="WHIF">WHIF</option>
                                    <option value="WDIS">WDIS</option>
                                    <option value="WISS">WISS</option>
                                    <option value="WHID">WHID</option>
                                    <option value="OTHR">OTHR</option>
                                  </select>
                                </div>

                                <div className="input-container">
                                  <label className="label">
                                    Current Attachment Point
                                  </label>
                                  <input
                                    placeholder="Type here"
                                    className="input"
                                    type="text"
                                    onChange={(e) => {
                                      this.setState({
                                        formData1: {
                                          ...this.state.formData1,
                                          "Current Attachment Point":
                                            e.target.value,
                                        },
                                      });
                                    }}
                                    value={
                                      this.state.formData1[
                                        "Current Attachment Point"
                                      ]
                                    }
                                  />
                                </div>

                                <div className="input-container">
                                  <label className="label">
                                    Original Attachment Point
                                  </label>
                                  <input
                                    placeholder="Type here"
                                    className="input"
                                    type="text"
                                    onChange={(e) => {
                                      this.setState({
                                        formData1: {
                                          ...this.state.formData1,
                                          "Original Attachment Point":
                                            e.target.value,
                                        },
                                      });
                                    }}
                                    value={
                                      this.state.formData1[
                                        "Original Attachment Point"
                                      ]
                                    }
                                  />
                                </div>

                                <div className="input-container">
                                  <label className="label">
                                    Credit Enhancement Formula
                                  </label>
                                  <input
                                    placeholder="Type here"
                                    className="input"
                                    type="text"
                                    onChange={(e) => {
                                      this.setState({
                                        formData1: {
                                          ...this.state.formData1,
                                          "Credit Enhancement Formula":
                                            e.target.value,
                                        },
                                      });
                                    }}
                                    value={
                                      this.state.formData1[
                                        "Credit Enhancement Formula"
                                      ]
                                    }
                                  />
                                </div>

                                <div className="input-container">
                                  <label className="label">
                                    Pari-Passu Tranches
                                  </label>
                                  <input
                                    placeholder="Type here"
                                    className="input"
                                    type="text"
                                    onChange={(e) => {
                                      this.setState({
                                        formData1: {
                                          ...this.state.formData1,
                                          "Pari-Passu Tranches": e.target.value,
                                        },
                                      });
                                    }}
                                    value={
                                      this.state.formData1[
                                        "Pari-Passu Tranches"
                                      ]
                                    }
                                  />
                                </div>
                                <div className="input-container">
                                  <label className="label">
                                    Senior Tranches
                                  </label>
                                  <input
                                    placeholder="Type here"
                                    className="input"
                                    type="text"
                                    onChange={(e) => {
                                      this.setState({
                                        formData1: {
                                          ...this.state.formData1,
                                          "Senior Tranches": e.target.value,
                                        },
                                      });
                                    }}
                                    value={
                                      this.state.formData1["Senior Tranches"]
                                    }
                                  />
                                </div>

                                <div className="input-container">
                                  <label className="label">
                                    Outstanding Principal Deficiency Ledger
                                    Balance
                                  </label>
                                  <input
                                    placeholder="Type here"
                                    className="input"
                                    type="text"
                                    onChange={(e) => {
                                      this.setState({
                                        formData1: {
                                          ...this.state.formData1,
                                          "Outstanding Principal Deficiency Ledger Balance":
                                            e.target.value,
                                        },
                                      });
                                    }}
                                    value={
                                      this.state.formData1[
                                        "Outstanding Principal Deficiency Ledger Balance"
                                      ]
                                    }
                                  />
                                </div>

                                <div className="input-container">
                                  <label className="label">
                                    Guarantor Legal Entity Identifier
                                  </label>
                                  <input
                                    placeholder="Type here"
                                    className="input"
                                    type="text"
                                    onChange={(e) => {
                                      this.setState({
                                        formData1: {
                                          ...this.state.formData1,
                                          "Guarantor Legal Entity Identifier":
                                            e.target.value,
                                        },
                                      });
                                    }}
                                    value={
                                      this.state.formData1[
                                        "Guarantor Legal Entity Identifier"
                                      ]
                                    }
                                  />
                                </div>

                                <div className="input-container">
                                  <label className="label">
                                    Guarantor Name
                                  </label>
                                  <input
                                    placeholder="Type here"
                                    className="input"
                                    type="text"
                                    onChange={(e) => {
                                      this.setState({
                                        formData1: {
                                          ...this.state.formData1,
                                          "Guarantor Name": e.target.value,
                                        },
                                      });
                                    }}
                                    value={
                                      this.state.formData1["Guarantor Name"]
                                    }
                                  />
                                </div>

                                <div className="input-container">
                                  <label className="label">
                                    Guarantor ESA Subsector
                                  </label>
                                  <input
                                    placeholder="Type here"
                                    className="input"
                                    type="text"
                                    onChange={(e) => {
                                      this.setState({
                                        formData1: {
                                          ...this.state.formData1,
                                          "Guarantor ESA Subsector":
                                            e.target.value,
                                        },
                                      });
                                    }}
                                    value={
                                      this.state.formData1[
                                        "Guarantor ESA Subsector"
                                      ]
                                    }
                                  />
                                </div>

                                <div className="input-container">
                                  <label className="label">
                                    Protection Type
                                  </label>
                                  <select
                                    className="input-select"
                                    onChange={(e) => {
                                      this.setState({
                                        formData1: {
                                          ...this.state.formData1,
                                          "Protection Type": e.target.value,
                                        },
                                      });
                                    }}
                                    value={
                                      this.state.formData1["Protection Type"]
                                    }
                                  >
                                    <option value="NA">Select any one</option>
                                    <option value="CDSX">CDSX</option>
                                    <option value="CLKN">CLKN</option>
                                    <option value="FGUA">FGUA</option>
                                    <option value="CINS">CINS</option>
                                    <option value="OTHR">OTHR</option>
                                  </select>
                                </div>
                              </>
                            ) : null}
                          </>
                        ) : null}

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
                  appElement={document.getElementById("root")}
                >
                  <React.Fragment>
                    <div className="modalPopup">
                      <h3 className="popupheading">
                        Are you sure, you want to Delete this Tranche "
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
        </div>
      </>
    );
  }
}

export default withSnackbar(Tranches_DealCreation);
