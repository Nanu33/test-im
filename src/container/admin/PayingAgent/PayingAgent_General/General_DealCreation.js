// /* eslint-disable require-jsdoc */
import React, { Component } from "react";
import Sidebar from "../../../../components/sidebar";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import AddCircleOutlinedIcon from "@material-ui/icons/AddCircleOutlined";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import CircularProgress from "@material-ui/core/CircularProgress";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import MUIDataTable from "mui-datatables";
import Loader from "../../../../components/loader";
import DatePicker from "react-datepicker";
import { withSnackbar } from "notistack";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import {
  dealCreationTable,
  dealCreation_BC_Status,
  viewPdfLogo,
  dealCreationSaveForNow,
  savedealservicerdate,
  uploadpdflogo,
  dealCreationCreateUpdate,
  dealCreationAutoSave,
} from "../../../../servies/services";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Button from "@material-ui/core/Button";
import MomentUtils from "@date-io/moment";
import { SketchPicker, ChromePicker } from "react-color";
import reactCSS from "reactcss";
import LinearLoader from "../../../../components/loader/LinearLoader";
import * as moment from "moment";
import { debounce } from "lodash";
import { data } from "jquery";
import Select from "react-select";
import ReactModal from "react-modal";
import BeanEater from "../../../../images/BeanEater.gif";
import AccordIcon from "../../../../images/AccordIcon.png";
import Upload_Logo from "../../../../images/Upload_Logo.svg";
import DownloadLogo from "../../../../images/DownloadLogo.svg";
import checkedImg from "../../../../images/checked.png";
import add_circle from "../../../../images/add_circle.png";
import remove_circle from "../../../../images/remove_circle.png";
import * as XLSX from "xlsx";

class General_DealCreation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAccordian: false,
      selectedRow: null,
      token: sessionStorage.getItem("token"),
      loading: false,
      getLoansLoader: false,
      openPopup: false,
      searchText: "",
      fileUploaded: false,
      isStatus: this.props.location?.state?.checkDeal,
      actionUpload: false,
      inputValue1: [],
      inputValue2: [],
      inputValue3: [],
      inputValue4: [],
      inputValue5: [],
      inputValue6: [],
      inputValue7: [],
      inputValue8: [],
      rowsSelected: null,
      activeInsights1: true,
      activeInsights2: false,
      activeInsights3: false,
      activeInsights4: false,
      activeInsights5: false,
      activeInsights6: false,
      activeInsights7: false,
      activeInsights8: false,
      activeInsightsBB: false,
      screenloader: false,
      // demo:false,
      openModalPayment: false,
      TableName: "General",
      file1: "",
      FileName: "",
      filename1: "",
      isFileUploaded: false,
      showTable: true,
      dealId: sessionStorage.getItem("dealID"),
      peer: sessionStorage.getItem("peer_insurer"),
      peers: JSON.parse(sessionStorage.getItem("peers")),
      // DealName: !sessionStorage.getItem("dealname")
      //   ? JSON.parse(sessionStorage.getItem("getDashboardDeals"))?.map(
      //     (item) => item[0]
      //   )[0]
      //   : sessionStorage.getItem("dealname"),
      DealName: sessionStorage.getItem("dealName"),
      isRecurring: sessionStorage.getItem("isAddDeal"),
      isSecuritisation: sessionStorage.getItem("isSecuritisation"),
      Assetclass: sessionStorage.getItem("Assetclass"),
      isESMA_Flag: sessionStorage.getItem("isESMA_Flag"),
      ChannelName: sessionStorage.getItem("ChannelName"),
      Counterparty: [
        {
          "Counterparty Legal Entity Identifier": "",
          "Counterparty Country Of Establishment": "",
          "Counterparty Rating Source Legal Entity Identifier": "",
          "Counterparty Name": "",
          "Counterparty Rating Threshold": "",
          "Counterparty Rating Source Name": "",
          "Counterparty Type": "",
          "Counterparty Rating": "",
        },
      ],
      showcounterParty: false,

      "Deal Id": "",
      formData1: {
        "Deal Name": "",
        "Issuer Name": "",
        Servicer: {
          Servicer1: "",
        },
        "Rating Agency": {
          "Rating Agency1": "",
        },
        "Originator Name": {
          "Originator Name1": "",
        },
        "First Payment Date": "",
        "Closing Date": "",
        "Pricing Date": "",
        "Payment Date Logic": "CDN",
        "Legal Maturity Date": "",
        "Payment Frequency": "",
        "Financing Type": "",
        "Asset Class": "",
        "Initial Deal Size": "",
        "Delinquency Method": "",
        "Asset Type": "",
        "ESMA Compliant": "",
        "Master Trust Flag": "",
        "Stepup Date": "",
        "Cutoff Date": "",
        "Record Date Logic": "CDN",
        "Determination Date Logic": "CDN",
        "Relationship Manager": "",
        Investor: [],
      },
      formData2: {
        "Reporting Entity Contact Emails": "",
        "Underlying Exposure Type": "",
        "Obligor Probability Of Default in Range [0.00%,0.10%]": "",
        "Obligor Probability Of Default in Range [1.00%,7.50%]": "",
        "Internal Loss Given Default Estimate": "",
        "Administrative Actions": "",
        "Current Waterfall Type": "",
        "Funding Share": "",
        "Interest Rate Swap Maturity Date": "",
        "Currency Swap Receiver Currency": "",
        "Currency Swap Notional": "",
        "Reporting Entity Contact Person": "",
        "Risk Retention Method": "",
        "Risk Transfer Method": "",
        "Obligor Probability Of Default in Range [0.10%,0.25%]": "",
        "Obligor Probability Of Default in Range [7.50%,20.00%]": "",
        "No Longer STS": "",
        "Material Amendment to Transaction Documents": "",
        "Master Trust Type": "",
        "Revenue Allocated To This Series": "",
        "Interest Rate Swap Notional": "",
        "Exchange Rate For Currency Swap": "",
        "Reporting Entity Contact Telephone": "",
        "Risk Retention Holder": "",
        "Excess Spread Trapping Mechanism": "",
        "Risk Weight Approach": "",
        "Obligor Probability Of Default in Range [0.25%,1.00%]": "",
        "Obligor Probability Of Default in Range [20.00%,100.00%]": "",
        "Remedial Actions": "",
        "Perfection Of Sale": "",
        "Seller Share": "",
        "Interest Rate Swap Benchmark": "",
        "Currency Swap Payer Currency": "",
        "Currency Swap Maturity Date": "",
      },
      "Image Upload": "",
      "selected Color": {
        hex: "#048c88",
        rgba: {
          r: 4,
          g: 140,
          b: 136,
          a: 1,
        },
      },
      arr: [],
      color: "red",
      displayColorPicker: true,
      token: sessionStorage.getItem("token"),
      userId: sessionStorage.getItem("userid"),
      checkDealNameStatus: false,
      issuerDropdown : sessionStorage.getItem("IssuerDropdown")
    };
    this.checkDealName = debounce(this.checkDealName.bind(this), 800);
    this.fileInput = React.createRef();
    // this.removeCounterParty = this.removeCounterParty.bind(this);
  }
  blockInvalidChar = (e) => {
    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();
  };

  downloadExcel = () => {
    const { formData1, formData2, Counterparty } = this.state;

    // Flatten the nested objects and separate headers and values
    let headers = [];
    let values = [];

    const flattenData = (dataObject) => {
      Object.entries(dataObject).forEach(([key, value]) => {
        if (typeof value === "object" && !Array.isArray(value)) {
          Object.entries(value).forEach(([nestedKey, nestedValue]) => {
            headers.push(`${key} - ${nestedKey}`);
            values.push(nestedValue);
          });
        } else if (Array.isArray(value)) {
          headers.push(key);
          values.push(value.join(", "));
        } else {
          headers.push(key);
          values.push(value);
        }
      });
    };

    // Flatten formData1 and formData
    flattenData(formData1);
    flattenData(formData2);
    Counterparty.forEach((counterparty, index) => {
      return flattenData(counterparty);
    });
    // Create rows for the Excel sheet
    const rows = [headers, values];
    console.log("rows", headers);

    // Create a worksheet from the rows
    const ws = XLSX.utils.aoa_to_sheet(rows);

    // Create a new workbook and append the worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "TemplateData");
    console.log("wb", wb, ws);

    // Write the workbook and trigger a download
    XLSX.writeFile(wb, "template.xlsx");
  };

  // handleFileUpload = (e) => {
  //   console.log("heyyyyyy");
  //   const file = e.target.files[0];
  //   const reader = new FileReader();

  //   reader.onload = (event) => {
  //     const binaryString = event.target.result;
  //     const workbook = XLSX.read(binaryString, { type: "binary" });
  //     const firstSheetName = workbook.SheetNames[0];
  //     const worksheet = workbook.Sheets[firstSheetName];
  //     const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

  //     // Assuming the first row is headers and the second row is values
  //     if (data.length > 1) {
  //       const headers = data[0];
  //       const values = data[1];

  //       let newFormData1 = { ...this.state.formData1 };
  //       let newFormData2 = { ...this.state.formData2 };
  //       // let newFormData = { ...this.state.formData };
  //       let newCounterparty = [...this.state.Counterparty]; // Copy the existing Counterparty array

  //       headers.forEach((header, index) => {
  //         if (header.includes("-")) {
  //           const [parentKey, childKey] = header.split("-");
  //           if (newFormData1[parentKey]) {
  //             newFormData1[parentKey][childKey] = values[index];
  //           } else if (newFormData2[parentKey]) {
  //             newFormData2[parentKey][childKey] = values[index];
  //           } else {
  //             // Handling the Counterparty specific data
  //             console.log("Counterparty", parentKey, childKey);
  //             let counterpartyIndex = parseInt(childKey, 10) - 1; // Assuming the format is "Counterparty_1", "Counterparty_2", etc.
  //             let counterpartyKey = childKey;
  //             newCounterparty[counterpartyIndex] = {
  //               ...newCounterparty[counterpartyIndex],
  //               [counterpartyKey]: values[index],
  //             };
  //           }
  //         } else {
  //           if (newFormData1.hasOwnProperty(header.split("-"))) {
  //             newFormData1[header] = values[index];
  //           } else if (newFormData2.hasOwnProperty(header)) {
  //             newFormData2[header] = values[index];
  //           } else {
  //             newCounterparty[0][header] = values[index];
  //           }
  //         }
  //       });

  //       this.setState({
  //         formData1: newFormData1,
  //         formData2: newFormData2,
  //         Counterparty: newCounterparty,
  //         isFileUploaded: true,
  //       });
  //       console.log("formdata1", this.state.formData1);
  //       this.dealCreationAutoSave();
  //     }
  //   };

  //   if (file) {
  //     reader.readAsBinaryString(file);
  //   }
  // };

  handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const binaryString = event.target.result;
      const workbook = XLSX.read(binaryString, { type: "binary" });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      // Assuming the first row is headers and the second row is values
      if (data.length > 1) {
        const headers = data[0];
        const values = data.slice(1);
        console.log("fghjhgdcfghjhg", values);
        let newFormData1 = { ...this.state.formData1 };
        let newFormData2 = { ...this.state.formData2 };
        let newCounterparty = [];
        console.log("vaaaaaaaaaaaaaaa", newCounterparty[0]);
        values.forEach((row, i) => {
          let counterpartyObj = { ...this.state.Counterparty[0] };
          row.forEach((value, index) => {
            const header = headers[index];
            const trimmedHeader = header.trim();
            console.log("trimmedHeader", trimmedHeader);
            if (trimmedHeader === "Servicer") {
              if (!newFormData1.Servicer) {
                newFormData1.Servicer = {};
              }
              newFormData1.Servicer[`Servicer${i + 1}`] = value;
            } else if (trimmedHeader === "Rating Agency") {
              if (!newFormData1["Rating Agency"]) {
                newFormData1["Rating Agency"] = {};
              }
              newFormData1["Rating Agency"][`Rating Agency${i + 1}`] = value;
            } else if (trimmedHeader === "Originator Name") {
              if (!newFormData1["Originator Name"]) {
                newFormData1["Originator Name"] = {};
              }
              newFormData1["Originator Name"][`Originator Name${i + 1}`] =
                value;
            } else {
              if (header.includes("-")) {
                const [parentKey, childKey] = header.split("-");
                if (newFormData1[parentKey]) {
                  newFormData1[parentKey][childKey] = value;
                } else if (newFormData2[parentKey]) {
                  newFormData2[parentKey][childKey] = value;
                } else {
                  console.log("Counterparty", parentKey, childKey);
                  let counterpartyIndex = parseInt(childKey, 10) - 1; // Assuming the format is "Counterparty_1", "Counterparty_2", etc.
                  let counterpartyKey = childKey;
                  newCounterparty[counterpartyIndex] = {
                    ...newCounterparty[counterpartyIndex],
                    [counterpartyKey]: value,
                  };
                }
              } else {
                if (newFormData1.hasOwnProperty(header.split("-"))) {
                  newFormData1[header] = value;
                } else if (newFormData2.hasOwnProperty(header)) {
                  newFormData2[header] = value;
                } else {
                  if (counterpartyObj.hasOwnProperty(header)) {
                    console.log("newCounterparty", counterpartyObj, header, i);
                    counterpartyObj[header] = value;
                  }
                }
              }
            }
          });
          if (
            Object.values(counterpartyObj).every(
              (val) => val == "" || undefined
            )
          )
            return;
          newCounterparty.push(counterpartyObj);
        });
        this.setState({
          formData1: newFormData1,
          formData2: newFormData2,
          Counterparty: newCounterparty.splice(0, values.length),
          isFileUploaded: true,
        });
        console.log(
          "hhhjhhghghghghg",
          this.state.formData1,
          this.state.formData2,
          this.state.Counterparty
        );
        this.dealCreationAutoSave();
      }
    };

    if (file) {
      reader.readAsBinaryString(file);
    }
  };

  handleAccordian = () => {
    this.setState((prevState) => {
      return { isAccordian: !prevState.isAccordian };
    });
  };

  // Method to add a new counterparty section
  addNewInputCounterparty = () => {
    console.log("added counterparty");
    const newCounterparty = {
      "Counterparty Legal Entity Identifier": "",
      "Counterparty Country Of Establishment": "",
      "Counterparty Rating Source Legal Entity Identifier": "",
      "Counterparty Name": "",
      "Counterparty Rating Threshold": "",
      "Counterparty Rating Source Name": "",
      "Counterparty Type": "",
      "Counterparty Rating": "",
    };
    this.setState((prevState) => ({
      Counterparty: [...prevState.Counterparty, newCounterparty],
      showcounterParty: true,
    }));
  };

  // Method to remove a counterparty section by index
  removeCounterParty = (index) => {
    console.log("removeeeed ");
    this.setState((prevState) => ({
      Counterparty: prevState.Counterparty.filter((_, i) => i !== index),
      showcounterParty: false,
    }));
  };

  handleInputChange = (index, fieldName, event) => {
    const value = event.target.value;
    this.setState((prevState) => {
      const updatedCounterparty = prevState.Counterparty?.map((cp, i) => {
        if (i === index) {
          return { ...cp, [fieldName]: value };
        }
        return cp;
      });
      return { Counterparty: updatedCounterparty };
    });
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
  };

  handleClickTranches = (e) => {
    if (
      // !this.state.formData1["Payment Frequency"] ||
      // !this.state.formData1["Delinquency Method"] ||
      // !this.state.formData1["Closing Date"] ||
      // !this.state.formData1.Servicer.Servicer1 ||
      !this.state.formData1["Deal Name"] 
      // !this.state.formData1["Financing Type"] ||
      // !this.state.formData1["Asset Class"] ||
      // !this.state.formData1?.["ESMA Compliant"] ||
      // !this.state.formData1["Master Trust Flag"] ||
      // !this.state.formData1["Legal Maturity Date"] ||
      // !this.state.formData1["First Payment Date"] ||
      // this.state.formData1["Closing Date"] === "Invalid date" ||
      // this.state.formData1["Legal Maturity Date"] === "Invalid date" ||
      // this.state.formData1["First Payment Date"] === "Invalid date" ||
      // !this.state["Image Upload"] ||
      // !this.state["selected Color"]
    ) {
      const message = "Please Fill All the * Highlighted Fields before Saving";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    } else {
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
      });
      this.dealCreationAutoSave();
      // window.location.assign("/admin/tranches");
    }
  };
  handleClickFees = (e) => {
    if (
      !this.state.formData1["Payment Frequency"] ||
      !this.state.formData1["Closing Date"] ||
      !this.state.formData1["Delinquency Method"] ||
      !this.state.formData1.Servicer.Servicer1 ||
      !this.state.formData1["Deal Name"] ||
      !this.state.formData1["Financing Type"] ||
      !this.state.formData1["Asset Class"] ||
      !this.state.formData1["ESMA Compliant"] ||
      !this.state.formData1["Master Trust Flag"] ||
      !this.state.formData1["Legal Maturity Date"] ||
      !this.state.formData1["First Payment Date"] ||
      this.state.formData1["Closing Date"] === "Invalid date" ||
      this.state.formData1["Legal Maturity Date"] === "Invalid date" ||
      this.state.formData1["First Payment Date"] === "Invalid date" ||
      !this.state["Image Upload"] ||
      !this.state["selected Color"]
    ) {
      const message = "Please Fill All the * Highlighted Fields before Saving";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    } else {
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
      });
      this.dealCreationAutoSave();
      // window.location.assign("/admin/fees");
    }
  };
  handleClickExpenses = (e) => {
    if (
      !this.state.formData1["Payment Frequency"] ||
      !this.state.formData1["Closing Date"] ||
      !this.state.formData1["Delinquency Method"] ||
      !this.state.formData1.Servicer.Servicer1 ||
      !this.state.formData1["Deal Name"] ||
      !this.state.formData1["Financing Type"] ||
      !this.state.formData1["Asset Class"] ||
      !this.state.formData1["ESMA Compliant"] ||
      !this.state.formData1["Master Trust Flag"] ||
      !this.state.formData1["Legal Maturity Date"] ||
      !this.state.formData1["First Payment Date"] ||
      this.state.formData1["Closing Date"] === "Invalid date" ||
      this.state.formData1["Legal Maturity Date"] === "Invalid date" ||
      this.state.formData1["First Payment Date"] === "Invalid date" ||
      !this.state["Image Upload"] ||
      !this.state["selected Color"]
    ) {
      const message = "Please Fill All the * Highlighted Fields before Saving";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    } else {
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
      });
      this.dealCreationAutoSave();
      // window.location.assign("/admin/expenses");
    }
  };
  handleClickAccounts = (e) => {
    if (
      !this.state.formData1["Payment Frequency"] ||
      !this.state.formData1["Closing Date"] ||
      !this.state.formData1["Delinquency Method"] ||
      !this.state.formData1.Servicer.Servicer1 ||
      !this.state.formData1["Deal Name"] ||
      !this.state.formData1["Financing Type"] ||
      !this.state.formData1["Asset Class"] ||
      !this.state.formData1["ESMA Compliant"] ||
      !this.state.formData1["Master Trust Flag"] ||
      !this.state.formData1["Legal Maturity Date"] ||
      !this.state.formData1["First Payment Date"] ||
      this.state.formData1["Closing Date"] === "Invalid date" ||
      this.state.formData1["Legal Maturity Date"] === "Invalid date" ||
      this.state.formData1["First Payment Date"] === "Invalid date" ||
      !this.state["Image Upload"] ||
      !this.state["selected Color"]
    ) {
      const message = "Please Fill All the * Highlighted Fields before Saving";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    } else {
      e.preventDefault();
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
      // window.location.assign("/admin/account");
    }
  };

  handleClickTests = (e) => {
    if (
      !this.state.formData1["Payment Frequency"] ||
      !this.state.formData1["Closing Date"] ||
      !this.state.formData1["Delinquency Method"] ||
      !this.state.formData1.Servicer.Servicer1 ||
      !this.state.formData1["Deal Name"] ||
      !this.state.formData1["Financing Type"] ||
      !this.state.formData1["Asset Class"] ||
      !this.state.formData1["ESMA Compliant"] ||
      !this.state.formData1["Master Trust Flag"] ||
      !this.state.formData1["Legal Maturity Date"] ||
      !this.state.formData1["First Payment Date"] ||
      this.state.formData1["Closing Date"] === "Invalid date" ||
      this.state.formData1["Legal Maturity Date"] === "Invalid date" ||
      this.state.formData1["First Payment Date"] === "Invalid date" ||
      !this.state["Image Upload"] ||
      !this.state["selected Color"]
    ) {
      const message = "Please Fill All the * Highlighted Fields before Saving";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    } else {
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
      });
      this.dealCreationAutoSave();
      // window.location.assign("/admin/tests");
    }
  };
  handleClickBorrowingBase = (e) => {
    if (
      !this.state.formData1["Payment Frequency"] ||
      !this.state.formData1["Delinquency Method"] ||
      !this.state.formData1["Closing Date"] ||
      !this.state.formData1.Servicer.Servicer1 ||
      !this.state.formData1["Deal Name"] ||
      !this.state.formData1["Financing Type"] ||
      !this.state.formData1["Asset Class"] ||
      !this.state.formData1["ESMA Compliant"] ||
      !this.state.formData1["Master Trust Flag"] ||
      !this.state.formData1["Legal Maturity Date"] ||
      !this.state.formData1["First Payment Date"] ||
      this.state.formData1["Closing Date"] === "Invalid date" ||
      this.state.formData1["Legal Maturity Date"] === "Invalid date" ||
      this.state.formData1["First Payment Date"] === "Invalid date" ||
      !this.state["Image Upload"] ||
      !this.state["selected Color"]
    ) {
      const message = "Please Fill All the * Highlighted Fields before Saving";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    } else {
      e.preventDefault();
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
      // window.location.assign("/admin/tranches");
    }
  };
  handleClickVariables = (e) => {
    if (
      !this.state.formData1["Payment Frequency"] ||
      !this.state.formData1["Closing Date"] ||
      !this.state.formData1["Delinquency Method"] ||
      !this.state.formData1.Servicer.Servicer1 ||
      !this.state.formData1["Deal Name"] ||
      !this.state.formData1["Financing Type"] ||
      !this.state.formData1["Asset Class"] ||
      !this.state.formData1["ESMA Compliant"] ||
      !this.state.formData1["Master Trust Flag"] ||
      !this.state.formData1["Legal Maturity Date"] ||
      !this.state.formData1["First Payment Date"] ||
      this.state.formData1["Closing Date"] === "Invalid date" ||
      this.state.formData1["Legal Maturity Date"] === "Invalid date" ||
      this.state.formData1["First Payment Date"] === "Invalid date" ||
      !this.state["Image Upload"] ||
      !this.state["selected Color"]
    ) {
      const message = "Please Fill All the * Highlighted Fields before Saving";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    } else {
      e.preventDefault();
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
    }
  };
  handleClickPaymentRules = (e) => {
    if (
      !this.state.formData1["Payment Frequency"] ||
      !this.state.formData1["Closing Date"] ||
      !this.state.formData1["Delinquency Method"] ||
      !this.state.formData1.Servicer.Servicer1 ||
      !this.state.formData1["Deal Name"] ||
      !this.state.formData1["Financing Type"] ||
      !this.state.formData1["Asset Class"] ||
      !this.state.formData1["ESMA Compliant"] ||
      !this.state.formData1["Master Trust Flag"] ||
      !this.state.formData1["Legal Maturity Date"] ||
      !this.state.formData1["First Payment Date"] ||
      this.state.formData1["Closing Date"] === "Invalid date" ||
      this.state.formData1["Legal Maturity Date"] === "Invalid date" ||
      this.state.formData1["First Payment Date"] === "Invalid date" ||
      !this.state["Image Upload"] ||
      !this.state["selected Color"]
    ) {
      const message = "Please Fill All the * Highlighted Fields before Saving";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    } else {
      e.preventDefault();
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
    }
  };
  showNext = (e) => {
    if (
      !this.state.formData1["Master Trust Flag"] ||
      !this.state.formData1["Payment Frequency"] ||
      !this.state.formData1["Closing Date"] ||
      !this.state.formData1["Delinquency Method"] ||
      !this.state.formData1.Servicer.Servicer1 ||
      !this.state.formData1["Deal Name"] ||
      !this.state.formData1["Financing Type"] ||
      !this.state.formData1["Asset Class"] ||
      !this.state.formData1["ESMA Compliant"] ||
      !this.state.formData1["Legal Maturity Date"] ||
      !this.state.formData1["First Payment Date"] ||
      this.state.formData1["Closing Date"] === "Invalid date" ||
      this.state.formData1["Legal Maturity Date"] === "Invalid date" ||
      this.state.formData1["First Payment Date"] === "Invalid date" ||
      !this.state["Image Upload"] ||
      !this.state["selected Color"]
    ) {
      const message =
        "Please Fill All the * Highlighted Fields before moving to Next Tab";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    } else {
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
      });
      this.dealCreationAutoSave();
    }
  };
  showPrev = () => {
    if (
      this.state.formData1["Deal Name"] !== "" &&
      this.state.formData1["Closing Date"] !== ""
    ) {
      window.location.assign("/admin/paymentrules");
    } else {
      const message = "Fill the general detials first";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
      this.dealCreationAutoSave();
    }
  };

  dealCreationAutoSave = async () => {
    let finaldata = {
      ...this.state.formData1,
      ...this.state.formData2,

      "Deal Id": this.state["Deal Id"],
    };
    // finaldata.Counterparty = [...this.state.Counterparty];
    finaldata.Counterparty = Array.from(this.state.Counterparty);
    finaldata.Servicer = Object.values(this.state.formData1.Servicer);
    finaldata["Rating Agency"] = Object.values(
      this.state.formData1["Rating Agency"]
    );

    finaldata["Originator Name"] = Object.values(
      this.state.formData1["Originator Name"]
    );
    finaldata["Initial Deal Size"] = this.state.formData1[
      "Initial Deal Size"
    ].replace(/,/g, "");

    let data = {};
    data.DealName = this.state.formData1["Deal Name"];
    data.TableName = this.state.TableName;
    // data.peers = this.state.peer;
    data.TableData = {
      [`${this.state.TableName}`]: finaldata,
    };
    console.log("data", data);
    const APIResponse = await dealCreationAutoSave(data, this.state.token);

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    if (this.state.isFileUploaded) {
      await delay(3000); // Wait for 3 seconds
    }

    if (!this.state.isFileUploaded) {
      this.savedealservicerdate();
    }

    this.setState({ isFileUploaded: false });

    console.log("ress", APIResponse);
  };

  dealCreationCreateUpdate = async (e) => {
    if (
      // !this.state.formData1["Payment Frequency"] ||
      // !this.state.formData1["Closing Date"] ||
      // !this.state.formData1["Delinquency Method"] ||
      // !this.state.formData1.Servicer.Servicer1 ||
      !this.state.formData1["Deal Name"]
      // !this.state.formData1["Financing Type"] ||
      // !this.state.formData1["Asset Class"] ||
      // !this.state.formData1["ESMA Compliant"] ||
      // !this.state.formData1["Master Trust Flag"] ||
      // !this.state.formData1["Legal Maturity Date"] ||
      // !this.state.formData1["First Payment Date"] ||
      // this.state.formData1["Closing Date"] === "Invalid date" ||
      // this.state.formData1["Legal Maturity Date"] === "Invalid date" ||
      // this.state.formData1["First Payment Date"] === "Invalid date" ||
      // !this.state["Image Upload"] ||
      // !this.state["selected Color"]
    ) {
      const message =
        "Please Fill All the * Highlighted Fields before Updating";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    } else {
      e.preventDefault();
      // sessionStorage.setItem("colorTable",this.state.formData1["selected Color"].hex);
      this.setState({ formLoader2: true, openModalPayment: true });
      let finaldata = {
        ...this.state.formData1,
        ...this.state.formData2,

        "Deal Id": this.state["Deal Id"],
      };

      finaldata.Counterparty = [...this.state.Counterparty];

      finaldata.Servicer = Object.values(this.state.formData1.Servicer);
      finaldata["Rating Agency"] = Object.values(
        this.state.formData1["Rating Agency"]
      );
      finaldata["Originator Name"] = Object.values(
        this.state.formData1["Originator Name"]
      );
      finaldata["Initial Deal Size"] = this.state.formData1[
        "Initial Deal Size"
      ].replace(/,/g, "");

      let data = {};
      data.DealName = this.state.formData1["Deal Name"];
      data.TableName = this.state.TableName;
      // data.peers = this.state.peers;
      data.TableData = {
        [`${this.state.TableName}`]: finaldata,
      };
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
          this.setState({ formLoader2: false, activeInsights1: true });
          this.dealCreation_BC_Status();
          this.dealCreationAutoSave();
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
    }
  };

  toggleTableVisibility = () => {
    this.setState((prevState) => ({
      showTable: !prevState.showTable,
    }));
  };

  dealCreationSaveForNow = async (e) => {
    if (
      // !this.state.formData1["Payment Frequency"] ||
      // !this.state.formData1["Closing Date"] ||
      // !this.state.formData1["Delinquency Method"] ||
      // !this.state.formData1.Servicer.Servicer1 ||
      !this.state.formData1["Deal Name"]
      // !this.state.formData1["Financing Type"] ||
      // !this.state.formData1["Asset Class"] ||
      // !this.state.formData1["ESMA Compliant"] ||
      // !this.state.formData1["Master Trust Flag"] ||
      // !this.state.formData1["Legal Maturity Date"] ||
      // !this.state.formData1["First Payment Date"] ||
      // this.state.formData1["Closing Date"] === "Invalid date" ||
      // this.state.formData1["Legal Maturity Date"] === "Invalid date" ||
      // this.state.formData1["First Payment Date"] === "Invalid date" ||
      // !this.state["Image Upload"] ||
      // !this.state["selected Color"]
    ) {
      const message = "Please Fill All the * Highlighted Fields before Saving";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    } else {
      e.preventDefault();
      this.setState({ formLoader1: true });
      let finaldata = {
        ...this.state.formData1,
        ...this.state.formData2,

        "Deal Id": this.state["Deal Id"],
      };
      finaldata.Counterparty = [...this.state.Counterparty];

      finaldata.Servicer = Object.values(this.state.formData1.Servicer);
      finaldata["Rating Agency"] = Object.values(
        this.state.formData1["Rating Agency"]
      );
      finaldata["Originator Name"] = Object.values(
        this.state.formData1["Originator Name"]
      );

      finaldata["Initial Deal Size"] = this.state.formData1[
        "Initial Deal Size"
      ].replace(/,/g, "");

      let data = {};
      data.DealName = this.state.formData1["Deal Name"];
      data.TableName = this.state.TableName;
      // data.peers = this.state.peer;
      data.TableData = {
        [`${this.state.TableName}`]: finaldata,
      };
      console.log("data", data);
      const APIResponse = await dealCreationSaveForNow(data, this.state.token);
      console.log("ress", APIResponse);
      if (APIResponse.status === 200) {
        if (APIResponse.data.isSuccess === true) {
          const message = APIResponse.data.message;
          this.props.enqueueSnackbar(message, {
            variant: "info",
            autoHideDuration: 3000,
          });
          this.savedealservicerdate();
          this.setState({ formLoader1: false, checkDealNameStatus: true });
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
    }
  };

  savedealservicerdate = async () => {
    let finaldata = {
      ...this.state.formData1,
      ...this.state.formData2,
      // ...this.state.Counterparty,
      "Deal Id": this.state["Deal Id"],
    };
    finaldata.Counterparty = [...this.state.Counterparty];

    finaldata.Servicer = Object.values(this.state.formData1.Servicer);
    finaldata["Rating Agency"] = Object.values(
      this.state.formData1["Rating Agency"]
    );
    finaldata["Originator Name"] = Object.values(
      this.state.formData1["Originator Name"]
    );
    finaldata["Initial Deal Size"] = this.state.formData1[
      "Initial Deal Size"
    ].replace(/,/g, "");
    let data = {};
    data.DealName = this.state.formData1["Deal Name"];
    data.TableName = this.state.TableName;
    // data.peers = this.state.peers;
    data.TableData = {
      [`${this.state.TableName}`]: finaldata,
    };
    console.log(data);
    const APIResponse = await savedealservicerdate(data, this.state.token);
    console.log("ress", APIResponse);
    if (this.state.actionUpload === true) {
      await this.PostPDFLogoData();
      this.setState({ actionUpload: false });
    }
    if (this.state.activeInsights1 === true) {
      this.setState({ openModalPayment: false });
      window.location.assign("/admin/general");
    } else if (this.state.activeInsights2 === true) {
      window.location.assign("/admin/tranches");
    } else if (this.state.activeInsights3 === true) {
      window.location.assign("/admin/fees");
    } else if (this.state.activeInsights4 === true) {
      window.location.assign("/admin/expenses");
    } else if (this.state.activeInsights5 === true) {
      window.location.assign("/admin/account");
    } else if (this.state.activeInsights6 === true) {
      window.location.assign("/admin/tests");
    } else if (this.state.activeInsightsBB === true) {
      window.location.assign("/admin/borrowingBase");
    } else if (this.state.activeInsights7 === true) {
      window.location.assign("/admin/variables");
    } else if (this.state.activeInsights8 === true) {
      window.location.assign("/admin/paymentrules");
    }
  };
  PostPDFLogoData = async () => {
    const newdata = new FormData();
    newdata.append("userid", this.state.userId);
    // Assuming this.state["Image Upload"] is a Buffer or binary data;

    const binaryData = this.state["Image Upload"];
    // Assuming binaryData is either binary data or base64-encoded data

    let buffer;

    if (typeof binaryData === "string") {
      // Check if the data is a base64 string
      if (/^data:.+\/.+(;base64)?,/.test(binaryData)) {
        // If it's a base64 string, decode it
        buffer = Buffer.from(binaryData.split(",")[1], "base64");
      } else {
        // Handle other string formats or return an error if needed
        console.error("Unsupported data format");
      }
    } else if (binaryData instanceof ArrayBuffer) {
      // If it's already binary data (ArrayBuffer), just use it
      buffer = Buffer.from(binaryData);
    } else {
      // Handle other data formats or return an error if needed
      console.error("Unsupported data format");
    }

    if (buffer) {
      // Create a Blob from the Buffer
      const blob = new Blob([buffer], { type: "application/octet-stream" });

      const filename = this.state.FileName;

      // Create a File from the Blob
      const file = new File([blob], filename, {
        type: "application/octet-stream",
      });
      // console.log("?????????????????/",file);

      // Now you can append the 'file' object to your FormData
      newdata.append("filename", file);
    } else {
      newdata.append("filename", binaryData);
    }

    const selectedColorObject = this.state["selected Color"];
    const selectedColorString = JSON.stringify(selectedColorObject);
    newdata.append("SelectedColorCode", selectedColorString);
    // newdata.append("peer", this.state.peer);
    // Convert the binary data to a Blob
    // const blob = new Blob([binaryData], { type: "application/octet-stream" });

    // Append the Blob to the FormData

    console.log("newdata", newdata);
    const APIResponse = await uploadpdflogo(newdata, this.state.token);
    console.log("ressponseeee", APIResponse);
    if (APIResponse.status === 200) {
      if (APIResponse.data.Success === true) {
        const message = APIResponse.data.Result;
        this.props.enqueueSnackbar(message, {
          variant: "info",
          autoHideDuration: 3000,
        });
        this.setState({ formLoader1: false, checkDealNameStatus: true });
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

  getPDFLogoData = async () => {
    this.setState({ screenloader: true });
    var data = {};
    data.userid = this.state.userId;
    const APIResponse = await viewPdfLogo(data, this.state.token);
    if (APIResponse.status === 200) {
      const colorCode = APIResponse?.data["ColorCode"];
      const retrivedColor =
        colorCode !== "" ? JSON.parse(colorCode) : this.state["selected Color"];

      const bufferData = APIResponse?.data.PdfLogo;

      // Convert buffer data to base64 using FileReader
      const base64Image = await this.arrayBufferToBase64(bufferData);
      const dataURL =
        base64Image !== "" ? `data:image/jpeg;base64,${base64Image}` : "";

      this.setState({
        "Image Upload": dataURL,
        "selected Color": retrivedColor,
        FileName: APIResponse?.data["Filename"],
        screenloader: false,
      });
    } else {
      this.setState({ screenloader: false });
      const message = "Something went wrong";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  // Function to convert array buffer to base64
  arrayBufferToBase64 = (buffer) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result.split(",")[1];
        resolve(base64String);
      };
      reader.onerror = reject;
      reader.readAsDataURL(new Blob([buffer]));
    });
  };

  dealCreationTable = async () => {
    this.setState({ screenloader: true });
    var data = {};
    data.DealName = this.state.DealName;
    data.TableName = this.state.TableName;
    data.dealid = this.state.dealId;

    console.log("datata", data);
    const APIResponse = await dealCreationTable(data, this.state.token);
    if (APIResponse.status === 200) {
      // let issuer = [];
      // issuer = this.state.issuerDropdown.map((issuer,index)=>
      //   APIResponse.data[0]["Issuer Name"].includes(issuer.value) ? index : -1
      // );
      sessionStorage.setItem(
        "isSecuritisation",
        APIResponse?.data[0]["Financing Type"]
      );
      sessionStorage.setItem(
        "isESMA_Flag",
        APIResponse?.data[0]["ESMA Compliant"]
      );
      sessionStorage.setItem("Assetclass", APIResponse?.data[0]["Asset Class"]);
      this.setState({
        formData1: {
          "Deal Name": APIResponse?.data[0]["Deal Name"],
          "Issuer Name": APIResponse?.data[0]["Issuer Name"],
          Servicer: APIResponse?.data[0].Servicer,
          "Rating Agency": APIResponse?.data[0]["Rating Agency"],
          "Originator Name": APIResponse?.data[0]["Originator Name"],
          "First Payment Date": APIResponse?.data[0]["First Payment Date"],
          "Closing Date": APIResponse?.data[0]["Closing Date"],
          "Pricing Date": APIResponse?.data[0]["Pricing Date"],
          "Stepup Date": APIResponse?.data[0]["Stepup Date"],
          "Cutoff Date": APIResponse?.data[0]["Cutoff Date"],
          "Record Date Logic": APIResponse?.data[0]["Record Date Logic"],
          Investor: APIResponse?.data[0].Investor,
          "Determination Date Logic":
            APIResponse?.data[0]["Determination Date Logic"],
          "Relationship Manager": APIResponse?.data[0]["Relationship Manager"],
          "Payment Date Logic": APIResponse?.data[0]["Payment Date Logic"],
          "Legal Maturity Date": APIResponse?.data[0]["Legal Maturity Date"],
          "Payment Frequency": APIResponse?.data[0]["Payment Frequency"],
          "Financing Type": APIResponse?.data[0]["Financing Type"],
          "Asset Class": APIResponse?.data[0]["Asset Class"],
          "Initial Deal Size": APIResponse?.data[0]["Initial Deal Size"],
          "Delinquency Method": APIResponse?.data[0]["Delinquency Method"],
          "Asset Type": APIResponse?.data[0]["Asset Type"],
          "ESMA Compliant": APIResponse?.data[0]["ESMA Compliant"],
          "Master Trust Flag": APIResponse?.data[0]["Master Trust Flag"],
        },
        "Deal Id": APIResponse?.data[0]["Deal Id"],

        formData2: {
          "Reporting Entity Contact Emails":
            APIResponse?.data[0]["Reporting Entity Contact Emails"],
          "Underlying Exposure Type":
            APIResponse?.data[0]["Underlying Exposure Type"],
          "Obligor Probability Of Default in Range [0.00%,0.10%]":
            APIResponse?.data[0][
              "Obligor Probability Of Default in Range [0.00%,0.10%]"
            ],
          "Obligor Probability Of Default in Range [1.00%,7.50%]":
            APIResponse?.data[0][
              "Obligor Probability Of Default in Range [1.00%,7.50%]"
            ],
          "Internal Loss Given Default Estimate":
            APIResponse?.data[0]["Internal Loss Given Default Estimate"],
          "Administrative Actions":
            APIResponse?.data[0]["Administrative Actions"],
          "Current Waterfall Type":
            APIResponse?.data[0]["Current Waterfall Type"],
          "Funding Share": APIResponse?.data[0]["Funding Share"],
          "Interest Rate Swap Maturity Date":
            APIResponse?.data[0]["Interest Rate Swap Maturity Date"],
          "Currency Swap Receiver Currency":
            APIResponse?.data[0]["Currency Swap Receiver Currency"],
          "Currency Swap Notional":
            APIResponse?.data[0]["Currency Swap Notional"],
          "Reporting Entity Contact Person":
            APIResponse?.data[0]["Reporting Entity Contact Person"],
          "Risk Retention Method":
            APIResponse?.data[0]["Risk Retention Method"],
          "Risk Transfer Method": APIResponse?.data[0]["Risk Transfer Method"],
          "Obligor Probability Of Default in Range [0.10%,0.25%]":
            APIResponse?.data[0][
              "Obligor Probability Of Default in Range [0.10%,0.25%]"
            ],
          "Obligor Probability Of Default in Range [7.50%,20.00%]":
            APIResponse?.data[0][
              "Obligor Probability Of Default in Range [7.50%,20.00%]"
            ],
          "No Longer STS": APIResponse?.data[0]["No Longer STS"],
          "Material Amendment to Transaction Documents":
            APIResponse?.data[0]["Material Amendment to Transaction Documents"],
          "Master Trust Type": APIResponse?.data[0]["Master Trust Type"],
          "Revenue Allocated To This Series":
            APIResponse?.data[0]["Revenue Allocated To This Series"],
          "Interest Rate Swap Notional":
            APIResponse?.data[0]["Interest Rate Swap Notional"],
          "Exchange Rate For Currency Swap":
            APIResponse?.data[0]["Exchange Rate For Currency Swap"],
          "Reporting Entity Contact Telephone":
            APIResponse?.data[0]["Reporting Entity Contact Telephone"],
          "Risk Retention Holder":
            APIResponse?.data[0]["Risk Retention Holder"],
          "Excess Spread Trapping Mechanism":
            APIResponse?.data[0]["Excess Spread Trapping Mechanism"],
          "Risk Weight Approach": APIResponse?.data[0]["Risk Weight Approach"],
          "Obligor Probability Of Default in Range [0.25%,1.00%]":
            APIResponse?.data[0][
              "Obligor Probability Of Default in Range [0.25%,1.00%]"
            ],
          "Obligor Probability Of Default in Range [20.00%,100.00%]":
            APIResponse?.data[0][
              "Obligor Probability Of Default in Range [20.00%,100.00%]"
            ],
          "Remedial Actions": APIResponse?.data[0]["Remedial Actions"],
          "Perfection Of Sale": APIResponse?.data[0]["Perfection Of Sale"],
          "Seller Share": APIResponse?.data[0]["Seller Share"],
          "Interest Rate Swap Benchmark":
            APIResponse?.data[0]["Interest Rate Swap Benchmark"],
          "Currency Swap Payer Currency":
            APIResponse?.data[0]["Currency Swap Payer Currency"],
          "Currency Swap Maturity Date":
            APIResponse?.data[0]["Currency Swap Maturity Date"],
        },
        // Counterparty: modifiedResponse.Counterparty,
      });
      if (
        APIResponse &&
        APIResponse.data &&
        Array.isArray(APIResponse.data[0].Counterparty)
      ) {
        this.setState({
          Counterparty: APIResponse.data[0].Counterparty?.map(
            (Counterparty) => ({
              "Counterparty Legal Entity Identifier":
                Counterparty["Counterparty Legal Entity Identifier"],
              "Counterparty Country Of Establishment":
                Counterparty["Counterparty Country Of Establishment"],
              "Counterparty Rating Source Legal Entity Identifier":
                Counterparty[
                  "Counterparty Rating Source Legal Entity Identifier"
                ],
              "Counterparty Name": Counterparty["Counterparty Name"],
              "Counterparty Rating Threshold":
                Counterparty["Counterparty Rating Threshold"],
              "Counterparty Rating Source Name":
                Counterparty["Counterparty Rating Source Name"],
              "Counterparty Type": Counterparty["Counterparty Type"],
              "Counterparty Rating": Counterparty["Counterparty Rating"],
            })
          ),
        });
      }

      // const message = "Deal Document Update Success";
      // this.props.enqueueSnackbar(message, {
      //   variant: "info",
      //   autoHideDuration: 3000,
      // });
    } else {
      this.setState({ screenloader: false });
      const message = "Something went wrong";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  checkDealName = async (DealName) => {
    const term = DealName;
    if (term) {
      var res = {};
      res.DealName = term;
      // res.peer = this.state.peer;

      console.log("resss", res);

      const APIResponse = await checkDealName(res, this.state.token);
      console.log("resss", APIResponse);
      if (APIResponse.status === 200) {
        const message = APIResponse.data.message;
        this.props.enqueueSnackbar(message, {
          variant: "info",
          autoHideDuration: 3000,
        });
      } else {
        this.setState({ screenloader: false });
        const message = "Something went wrong";
        this.props.enqueueSnackbar(message, {
          variant: "error",
          autoHideDuration: 3000,
        });
      }
    }
  };

  generatedealid = async (e) => {
    sessionStorage.setItem("dealname", e["Deal Name"]);
    console.log("e", e);
    if (e["Deal Name"] != "" && e["Closing Date"] != "") {
      var data = {};
      data["DealName"] = e["Deal Name"];
      data["ClosingDate"] = e["Closing Date"];
      data.TableName = this.state.TableName;
      // data.peer = this.state.peer;

      console.log("datata", data);

      // const APIResponse = await generatedealid(data);

      // if (APIResponse.status === 200) {
      //   this.setState({
      //     "Deal Id": APIResponse?.data,
      //   });
      //   sessionStorage.setItem("dealid", APIResponse.data);

      //   // const message = "Deal Document Update Success";
      //   // this.props.enqueueSnackbar(message, {
      //   //   variant: "info",
      //   //   autoHideDuration: 3000,
      //   // });
      // } else {
      //   this.setState({ screenloader: false });
      //   const message = "Something went wrong";
      //   this.props.enqueueSnackbar(message, {
      //     variant: "error",
      //     autoHideDuration: 3000,
      //   });
      // }
    }
  };

  dealCreation_BC_Status = async () => {
    var data = {};
    data.DealName = this.state.DealName;
    console.log("dataaaaaaaa", data, this.state.token);
    const APIResponse = await dealCreation_BC_Status(data, this.state.token);
    console.log("ress", APIResponse);
    this.setState({
      createStatus: APIResponse.data.status,
      screenloader: false,
    });
  };

  AddNewInputRating = (index) => {
    console.log("Rating", index);
    this.setState({
      formData1: {
        ...this.state.formData1,
        "Rating Agency": {
          ...this.state.formData1["Rating Agency"],
          [`Rating Agency${index + 2}`]: "",
        },
      },
    });
  };
  AddNewInputServicer = (index) => {
    console.log("Servicer", index);
    this.setState({
      formData1: {
        ...this.state.formData1,
        Servicer: {
          ...this.state.formData1.Servicer,
          [`Servicer${index + 2}`]: "",
        },
      },
    });
  };
  RemoveInputRating = (index) => {
    console.log("remove", this.state.formData1["Rating Agency"]);
    const myObject = this.state.formData1["Rating Agency"];
    const filteredObject = Object.fromEntries(
      Object.entries(myObject).filter((item, i) => i !== index)
    );
    this.setState({
      formData1: {
        ...this.state.formData1,
        "Rating Agency": filteredObject,
      },
    });
  };
  RemoveInputServicer = (index) => {
    console.log("remove", this.state.formData1.Servicer);
    const myObject = this.state.formData1.Servicer;
    const filteredObject = Object.fromEntries(
      Object.entries(myObject).filter((item, i) => i !== index)
    );
    this.setState({
      formData1: {
        ...this.state.formData1,
        Servicer: filteredObject,
      },
    });
  };
  AddNewInputOrganizer = (index) => {
    console.log("Organizer", index);
    this.setState({
      formData1: {
        ...this.state.formData1,
        "Originator Name": {
          ...this.state.formData1["Originator Name"],
          ["Originator Name"]: "",
        },
      },
    });
  };
  RemoveInputOrganizer = (index) => {
    console.log("remove", this.state.formData1["Originator Name"]);
    const myObject = this.state.formData1["Originator Name"];
    const filteredObject = Object.fromEntries(
      Object.entries(myObject).filter((item, i) => i !== index)
    );
    this.setState({
      formData1: {
        ...this.state.formData1,
        "Originator Name": filteredObject,
      },
    });
  };
  async componentDidMount() {
    var component = window.location.pathname;
    sessionStorage.setItem("component", component);
    await this.dealCreationTable();
    await this.dealCreation_BC_Status();
    await this.getPDFLogoData();
    // if (this.state.isStatus === true) {
    //   this.getPDFLogoData();
    // }

    // // sessionStorage.removeItem("dealname");
    // const dashChanges = JSON.parse(sessionStorage.getItem("dashChanges"));
    // // const clickSide = JSON.parse(sessionStorage.getItem("clickSide"));

    // // if (clickSide) {
    // // }
    // // await this.getPDFLogoData();

    // if (this.state.DealName !== null && !dashChanges) {
    //   await this.dealCreationTable();
    //   await this.dealCreation_BC_Status();
    //   await this.getPDFLogoData();
    // } else {
    //   await this.getPDFLogoData();
    // }
  }

  goBackToDashBoard = () => {
    this.state.isRecurring
      ? this.props.history.push({
          isRecurring: sessionStorage.removeItem("isAddDeal"),
          pathname: "/dashboard",
        })
      : this.props.history.push({
          pathname: "/admin/general_recurring",
        });
  };

  // handleMultiSelectChange = (e) => {
  //   const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);

  //   this.setState({
  // 	formData1: {
  //   	...this.state.formData1,
  //   	Investor: selectedOptions,
  // 	},
  //   });
  // };

  // getAcceptedFormats() {
  //   const selectedFileType = this.state.formData1["Image Upload"];
  //   let acceptedFormats = "";

  //   if (selectedFileType === "PDF") {
  // 	acceptedFormats = ".pdf";
  //   } else if (selectedFileType === "CSV") {
  // 	acceptedFormats = ".csv";
  //   } else if (selectedFileType === "Excel") {
  // 	acceptedFormats =
  //   	"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  //   }

  //   return acceptedFormats;
  // }

  handleOnChange1 = (e) => {
    // var reader = new FileReader();
    // reader.readAsDataURL(e.target.files[0]);
    // reader.onload=()=>{
    //   this.setState({
    //   	"Image Upload": reader.result,
    //   });
    // }
    const selectedFile = e.target.files[0];

    this.setState(
      {
        "Image Upload": selectedFile,
        filename1: selectedFile ? selectedFile.name : "",
        actionUpload: true,
      },
      () => {
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>Action", this.state.actionUpload);
      }
    );
    // Assuming you want to store the selected file name in a property named "Investor" in formData

    console.log("eeee", selectedFile ? selectedFile.name : "");
    console.log("file1", selectedFile);
  };

  handleChange = (selectedOption) => {
    this.setState({
      formData1: {
        ...this.state.formData1,
        Investor: selectedOption, // Use the selectedOption directly as an array
      },
    });
  };

  // handleColorChange = (color) => {
  //   this.setState({
  // 	formData1: {
  //   	...this.state.formData1,
  //   	selectedColor: color.hex, // Update the Selected color in hex format
  // 	},
  // 	displayColorPicker: false, // Hide the color picker after selection
  //   });
  // };
  handleClickColorChange = () => {
    this.setState(
      { displayColorPicker: !this.state.displayColorPicker },
      () => {
        console.log(")))))))))))))))))))))))))))", this.state.actionUpload);
      }
    );
  };

  handleClick = () => {
    this.setState(
      { displayColorPicker: !this.state.displayColorPicker },
      () => {
        console.log(
          "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<",
          this.state.actionUpload
        );
      }
    );
  };

  options = [{ value: "Investor", label: "Investor" }];

  render() {
    const { "selected Color": selectedColor } = this.state;
    console.log(">>>>>>>>>>>", { selectedColor });
    const isHexFormat =
      selectedColor && selectedColor.hex && selectedColor.hex !== "";

    let isRgbaFormat = false;
    if (selectedColor && selectedColor.rgba) {
      isRgbaFormat = selectedColor.rgba.a !== undefined;
    }

    const colorDisplay = isHexFormat
      ? selectedColor.hex
      : isRgbaFormat
      ? `rgba(${selectedColor.rgba.r}, ${selectedColor.rgba.g}, ${selectedColor.rgba.b}, ${selectedColor.rgba.a})`
      : "#048c88";

    const styles = reactCSS({
      default: {
        color: {
          width: "36px",
          height: "14px",
          borderRadius: "2px",
          background: isHexFormat
            ? selectedColor.hex
            : isRgbaFormat
            ? `rgba(${selectedColor.rgba.r}, ${selectedColor.rgba.g}, ${selectedColor.rgba.b}, ${selectedColor.rgba.a})`
            : "#048c88",
        },
        swatch: {
          padding: "5px",
          background: "#fff",
          borderRadius: "1px",
          boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
          display: "inline-block",
          cursor: "pointer",
        },
        popover: {
          position: "relative", // Change this to "fixed" or "absolute"
          zIndex: 9999, // Set a higher zIndex value for the popover
        },
        cover: {
          position: "fixed",
          top: "0px",
          right: "0px",
          bottom: "0px",
          left: "0px",
        },
      },
    });

    const customStyles = {
      control: (provided) => ({
        ...provided,
        borderRadius: "8px",
        border: "1px solid #ccc",
        boxShadow: "none",
        border: "1.5px solid #212121",
        borderRadius: "8px",
        color: "#212121",
        backgroundColor: "#fff",
        width: "450px",
        height: "38px",
      }),
      option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? "#007bff" : "white",
        color: state.isSelected ? "white" : "black",
      }),
      dropdownIndicator: (provided) => ({
        ...provided,
        color: "#144e4a", // Change the color of the dropdown indicator
        // You can also add other styles here, such as padding, margin, etc.
      }),
    };
    const addCommas = (num) =>
      num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const removeNonNumeric = (num) => num.toString().replace(/[^0-9\.]/g, "");
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
        this.setState({ rowsSelected: allRows?.map((row) => row.dataIndex) });
        const selected = allRows?.map((row) => row.dataIndex);
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
    const commonStyles = {
      bgcolor: "#fafafa",
      border: "1px solid #212121",
      width: "1230px",
      height: "717px",
      boxSizing: "border-box",
      // width: '99rem',
      // height: '65rem',
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
    };

    console.log("sdsddddddddddddddddddddddddddddd", this.state.isStatus);

    const checkStatus1 = () => {
      console.log(this.state.isStatus);
      return this.state.isStatus ? this.state.inputValue1 : false;
    };

    const checkStatus2 = () => {
      // console.log(this.state.isStatus);
      return this.state.isStatus ? this.state.inputValue2 : false;
    };

    const checkStatus3 = () => {
      // console.log(this.state.isStatus);
      return this.state.isStatus ? this.state.inputValue3 : false;
    };

    const checkStatus4 = () => {
      // console.log(this.state.isStatus);
      return this.state.isStatus ? this.state.inputValue4 : false;
    };

    const checkStatus5 = () => {
      // console.log(this.state.isStatus);
      return this.state.isStatus ? this.state.inputValue5 : false;
    };

    const checkStatus6 = () => {
      console.log(this.state.isStatus);
      return this.state.isStatus ? this.state.inputValue6 : false;
    };

    const checkStatus7 = () => {
      console.log(this.state.isStatus);
      return this.state.isStatus ? this.state.inputValue7 : false;
    };

    const checkStatus8 = () => {
      console.log(this.state.isStatus);
      return this.state.isStatus ? this.state.inputValue8 : false;
    };
    // console.log(
    //   "************************************ImageContents",
    //   this.state["Image Upload"]
    // );
    // console.log(
    //   "************************************",
    //   this.state["selected Color"]
    // );

    // const hardcodedDate = ""; // Example hardcoded date
    // const formattedDate = moment(hardcodedDate).format("MM/DD/YYYY").toString();

    return (
      <React.Fragment>
        <div className="page">
          <Sidebar activeComponent={"SetUpDeal"} />
          {this.state.screenloader === true ? (
            <LinearLoader msg={""} />
          ) : (
            <>
              <div className="content1">
                <div className="page-content">
                  <div className="row row1">
                    <div className="col-12 col-sm-6 col-md-8 d-flex justigy-content-center align-center hellocard">
                      <KeyboardBackspaceIcon
                        onClick={() => {
                          this.goBackToDashBoard();
                        }}
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
                            form="myform"
                            type="submit"
                            onClick={(e) => this.dealCreationSaveForNow(e)}
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
                            form="myform"
                            type="submit"
                            onClick={(e) => this.dealCreationCreateUpdate(e)}
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
                          form="myform"
                          type="submit"
                          onClick={(e) => this.handleClickTranches(e)}
                          className={
                            this.state.activeInsights2 == true
                              ? "issuerDashboard-table-top-button-workbench-active"
                              : "issuerDashboard-table-top-button-workbench"
                          }
                        >
                          Tranches
                        </button>

                        <button
                          form="myform"
                          type="submit"
                          onClick={(e) => this.handleClickFees(e)}
                          className={
                            this.state.activeInsights3 == true
                              ? "issuerDashboard-table-top-button-rejected-active"
                              : "issuerDashboard-table-top-button-rejected"
                          }
                        >
                          Fees
                        </button>
                        <button
                          form="myform"
                          type="submit"
                          onClick={(e) => this.handleClickExpenses(e)}
                          className={
                            this.state.activeInsights4 == true
                              ? "issuerDashboard-table-top-button-rejected-active"
                              : "issuerDashboard-table-top-button-rejected"
                          }
                        >
                          Expenses
                        </button>
                        <button
                          form="myform"
                          type="submit"
                          onClick={(e) => this.handleClickAccounts(e)}
                          className={
                            this.state.activeInsights5 == true
                              ? "issuerDashboard-table-top-button-rejected-active"
                              : "issuerDashboard-table-top-button-rejected"
                          }
                        >
                          Accounts
                        </button>
                        <button
                          form="myform"
                          type="submit"
                          onClick={(e) => this.handleClickTests(e)}
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
                            form="myform"
                            type="submit"
                            onClick={(e) => this.handleClickBorrowingBase(e)}
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
                          form="myform"
                          type="submit"
                          onClick={(e) => this.handleClickVariables(e)}
                          className={
                            this.state.activeInsights7 == true
                              ? "issuerDashboard-table-top-button-rejected-active"
                              : "issuerDashboard-table-top-button-rejected"
                          }
                        >
                          Variables
                        </button>
                        <button
                          form="myform"
                          type="submit"
                          onClick={(e) => this.handleClickPaymentRules(e)}
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
                      <h1 className="headerdashboard1">General Details</h1>
                    </div>
                    <div className="TrancheHeadBtns">
                      <div className="Tranches_right_btns">
                        <div className="">
                          <div className="TranBtns">
                            {
                              <Button
                                variant="outlined"
                                // color="primary"
                                type="button"
                                onClick={this.downloadExcel}
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
                                form="myform"
                                onClick={() => this.fileInput.current.click()}
                              >
                                <img src={Upload_Logo} />
                                Upload
                                {this.state.isFileUploaded && (
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
                              ref={this.fileInput}
                              onChange={this.handleFileUpload}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <React.Fragment>
                    <div className="workbench-table-container css-general">
                      <form id="myform" onSubmit={this.dealCreationSaveForNow}>
                        <div className="row general-row">
                          <div className="col-12 col-sm-6 col-md-4">
                            <div className="input-generalContainer">
                              <label className="label">Deal ID</label>
                              <input
                                disabled
                                className="input-general"
                                type="text"
                                value={this.state["Deal Id"]}
                              />
                            </div>

                            {/* {Object.keys(this.state.formData1?.Servicer).map(
                              (item, index) => {
                                return (
                                  <>
                                    <div className="input-generalContainer">
                                      <label className="label">
                                        Servicer {index + 1} Name *
                                      </label>
                                      <div className="input-inline">
                                        <input
                                          required
                                          placeholder="Type here"
                                          className="input-general"
                                          type="text"
                                          onChange={(e) => {
                                            this.setState({
                                              formData1: {
                                                ...this.state.formData1,
                                                Servicer: {
                                                  ...this.state.formData1
                                                    ?.Servicer,
                                                  [`Servicer${index + 1}`]:
                                                    e.target?.value,
                                                },
                                              },
                                            });
                                          }}
                                          value={
                                            this.state.formData1?.Servicer[
                                              `Servicer${index + 1}`
                                            ]
                                          }
                                        />
                                        {Object.keys(
                                          this.state.formData1?.Servicer
                                        ).length ===
                                          index + 1 && (
                                          <AddCircleOutlinedIcon
                                            className="buttonissue1"
                                            onClick={() =>
                                              this.AddNewInputServicer(index)
                                            }
                                          ></AddCircleOutlinedIcon>
                                        )}
                                        {Object.keys(
                                          this.state.formData1?.Servicer
                                        ).length > 1 &&
                                          Object.keys(
                                            this.state.formData1?.Servicer
                                          ).length ===
                                            index + 1 && (
                                            <RemoveCircleOutlineIcon
                                              className="buttonissue1"
                                              onClick={() =>
                                                this.RemoveInputServicer(index)
                                              }
                                            ></RemoveCircleOutlineIcon>
                                          )}
                                      </div>
                                    </div>
                                  </>
                                );
                              }
                            )} */}

                            {Object.keys(
                              this.state.formData1["Originator Name"]
                            )?.map((item, index) => {
                              return (
                                <>
                                  <div className="input-generalContainer">
                                    <label className="label">
                                      Originator {index + 1} Name
                                    </label>
                                    <div className="input-inline">
                                      <input
                                        placeholder="Type here"
                                        className="input-general"
                                        type="text"
                                        onChange={(e) => {
                                          this.setState(
                                            {
                                              formData1: {
                                                ...this.state.formData1,
                                                "Originator Name": {
                                                  ...this.state.formData1[
                                                    "Originator Name"
                                                  ],
                                                  [`Originator Name${
                                                    index + 1
                                                  }`]: e.target?.value,
                                                },
                                              },
                                            },
                                            () =>
                                              console.log(this.state.formData1)
                                          );
                                        }}
                                        value={
                                          this.state.formData1[
                                            "Originator Name"
                                          ][`Originator Name${index + 1}`]
                                        }
                                      />
                                      {Object.keys(
                                        this.state.formData1["Originator Name"]
                                      ).length ===
                                        index + 1 && (
                                        <AddCircleOutlinedIcon
                                          className="buttonissue1"
                                          onClick={() =>
                                            this.AddNewInputOrganizer(index)
                                          }
                                        ></AddCircleOutlinedIcon>
                                      )}
                                      {Object.keys(
                                        this.state.formData1["Originator Name"]
                                      ).length > 1 &&
                                        Object.keys(
                                          this.state.formData1[
                                            "Originator Name"
                                          ]
                                        ).length ===
                                          index + 1 && (
                                          <RemoveCircleOutlineIcon
                                            className="buttonissue1"
                                            onClick={() =>
                                              this.RemoveInputOrganizer(index)
                                            }
                                          ></RemoveCircleOutlineIcon>
                                        )}
                                    </div>
                                  </div>
                                </>
                              );
                            })}

                            <div className="input-generalContainer">
                              <label className="label">
                                First Payment Date *
                              </label>
                              <MuiPickersUtilsProvider utils={MomentUtils}>
                                <KeyboardDatePicker
                                  disableToolbar
                                  margin="normal"
                                  id="date1"
                                  inputValue={checkStatus1()}
                                  value={
                                    this.state.formData1[
                                      "First Payment Date"
                                    ] ?? ""
                                  }
                                  onChange={(date, value) =>
                                    this.setState({
                                      formData1: {
                                        ...this.state.formData1,
                                        "First Payment Date": moment(date)
                                          .format("MM/DD/YYYY")
                                          .toString(),
                                      },
                                      inputValue1: value,
                                    })
                                  }
                                  required
                                  keyboard
                                  IsEditable={true}
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

                              {/* <DatePicker
                        	id="date"
                        	onChange={(date) =>
                          	this.setState({
                          	 
                            	formData1: {  ...this.state.formData1,FirstPaymentDate: date },
                          	})
                        	}
                        	value={this.state.formData1.FirstPaymentDate ?? ""}
                        	format="MM/dd/y"
                        	placeholderText="MM/dd/y"
                        	clearIcon={false}
                        	monthPlaceholder="MM"
                        	dayPlaceholder="DD"
                        	yearPlaceholder="YYYY"
                        	className="calendar"
                      	/> */}
                            </div>

                            <div className="input-generalContainer">
                              <label className="label">
                                Legal Maturity Date *
                              </label>
                              <MuiPickersUtilsProvider utils={MomentUtils}>
                                <KeyboardDatePicker
                                  disableToolbar
                                  margin="normal"
                                  id="date1"
                                  // inputValue={this.state.inputValue3}
                                  inputValue={checkStatus3()}
                                  value={
                                    this.state.formData1[
                                      "Legal Maturity Date"
                                    ] ?? ""
                                  }
                                  onChange={(date, value) =>
                                    this.setState(
                                      {
                                        formData1: {
                                          ...this.state.formData1,
                                          "Legal Maturity Date": moment(date)
                                            .format("MM/DD/YYYY")
                                            .toString(),
                                        },
                                        inputValue3: value,
                                      },
                                      () =>
                                        sessionStorage.setItem(
                                          "LegalMaturityDate",
                                          this.state?.formData1[
                                            "Legal Maturity Date"
                                          ]
                                        )
                                    )
                                  }
                                  required
                                  keyboard
                                  IsEditable={true}
                                  placeholder="MM/DD/YYYY"
                                  format={"MM/DD/YYYY"}
                                  disableopenonenter
                                  animateYearScrolling={true}
                                  autoOk={true}
                                  clearable
                                  variant="filled"
                                  helperText={""}
                                />
                              </MuiPickersUtilsProvider>
                            </div>

                            <div className="input-generalContainer">
                              <label className="label">Asset Class *</label>
                              <select
                                required
                                className="input-select-general"
                                onChange={(e) => {
                                  sessionStorage.setItem(
                                    "Assetclass",
                                    e.target.value
                                  );
                                  this.setState({
                                    formData1: {
                                      ...this.state.formData1,
                                      "Asset Class": e.target.value,
                                    },
                                  });
                                }}
                                value={
                                  this.state.formData1["Asset Class"] ===
                                  undefined
                                    ? sessionStorage.setItem("Assetclass", "")
                                    : this.state.formData1["Asset Class"]
                                }
                              >
                                <option value="">Select any one</option>
                                <option value="Residential Real Estate">
                                  Residential Real Estate
                                </option>
                                <option value="Commercial Mortgage">
                                  Commercial Mortgage
                                </option>
                                <option value="Corporate Loans">
                                  Corporate Loans
                                </option>
                                <option value="Auto Loans">Auto Loans</option>
                                <option value="Consumer Loans">
                                  Consumer Loans
                                </option>
                                <option value="Credit Cards">
                                  Credit Cards
                                </option>
                                <option value="Leasing">Leasing</option>
                                <option value="Esoteric">Esoteric</option>
                                <option value="Non Performing Loans">
                                  Non Performing Loans
                                </option>
                                <option value="Asset Backed Commercial Papers">
                                  Asset Backed Commercial Papers
                                </option>
                              </select>
                            </div>

                            <div className="input-generalContainer">
                              <label className="label">
                                Payment Date Logic
                              </label>
                              <input
                                required
                                className="input-general"
                                onChange={(e) => {
                                  this.setState({
                                    formData1: {
                                      ...this.state.formData1,
                                      "Payment Date Logic": e.target.value,
                                    },
                                  });
                                }}
                                value={
                                  this.state.formData1["Payment Date Logic"]
                                }
                              />
                            </div>

                            <div className="input-generalContainer">
                              <label className="label">
                                {" "}
                                Initial Deal Size
                              </label>
                              <div className="flex1 input">
                                <p>$</p>
                                <input
                                  placeholder="Type here"
                                  className="input-none1"
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
                                        "Initial Deal Size": formattedValue,
                                      },
                                    });
                                  }}
                                  value={this.state.formData1[
                                    "Initial Deal Size"
                                  ].replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                />
                              </div>

                              {/* <input
                        	placeholder="Type here"
                        	className="input-general"
                        	type="text"
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
                              	InitialDealSize: formattedValue,
                            	},
                          	});
                        	}}
                        	value={this.state.formData1?.InitialDealSize}
                      	/> */}
                            </div>

                            <div className="input-generalContainer">
                              <label className="label">Asset Type </label>
                              <select
                                className="input-select-general"
                                onChange={(e) => {
                                  this.setState({
                                    formData1: {
                                      ...this.state.formData1,
                                      "Asset Type": e.target.value,
                                    },
                                  });
                                }}
                                value={this.state.formData1["Asset Type"]}
                              >
                                <option value="">Select any one</option>
                              </select>
                            </div>

                            <div
                              className="file_item"
                              style={{
                                position: "relative",
                                top: "0.3rem",
                              }}
                            >
                              <label className="label">Upload Image * </label>
                              <div className="servicer-popup-upload-btn-contianer">
                                <div className="kyc-card__button-container1">
                                  <div>
                                    {this.state["Image Upload"] === "" ? (
                                      <button
                                        className="card__button"
                                        style={{
                                          position: "relative",
                                        }}
                                      >
                                        <label
                                          htmlFor="icon-button-file-id21"
                                          className="upload-button-label1"
                                        >
                                          Upload
                                        </label>
                                        <input
                                          required
                                          id="icon-button-file-id21"
                                          type="file"
                                          accept={"image/*"}
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
                                          onChange={this.handleOnChange1}
                                        />
                                      </button>
                                    ) : (
                                      <button
                                        className="card__button"
                                        style={{
                                          position: "relative",
                                        }}
                                      >
                                        <label
                                          htmlFor="icon-button-file-id21"
                                          className="upload-button-label1"
                                        >
                                          Upload
                                        </label>
                                        <input
                                          required
                                          id="icon-button-file-id21"
                                          type="file"
                                          accept={"image/*"}
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
                                          onChange={this.handleOnChange1}
                                        />
                                      </button>
                                    )}
                                  </div>
                                  {this.state["Image Upload"] !== "" && (
                                    <div className="kyc-card__select_name-container">
                                      <p>{this.state.filename1}</p>
                                      {/* <button type="button" onClick={handleClickCross}>
                      	x
                  	</button> */}
                                    </div>
                                  )}
                                  {this.state.FileName !== "" &&
                                  !this.state.filename1 ? (
                                    <p>{this.state.FileName}</p>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-12 col-sm-6 col-md-4">
                            <div className="input-generalContainer">
                              <label className="label">Deal Name *</label>
                              {this.state.checkDealNameStatus === true ? (
                                <input
                                  disabled
                                  placeholder="Type here"
                                  className="input-general"
                                  type="text"
                                  onChange={(e) => {
                                    this.setState(
                                      {
                                        formData1: {
                                          ...this.state.formData1,
                                          "Deal Name": e.target.value,
                                        },
                                      },
                                      () =>
                                        this.generatedealid(
                                          this.state.formData1
                                        )
                                    );
                                    this.checkDealName(e.target.value);
                                  }}
                                  value={this.state.formData1["Deal Name"]}
                                />
                              ) : this.state.isStatus === false ? (
                                <input
                                  disabled
                                  placeholder="Type here"
                                  className="input-general"
                                  type="text"
                                  onChange={(e) => {
                                    this.setState(
                                      {
                                        formData1: {
                                          ...this.state.formData1,
                                          "Deal Name": e.target.value,
                                        },
                                      },
                                      () =>
                                        this.generatedealid(
                                          this.state.formData1
                                        )
                                    );
                                    this.checkDealName(e.target.value);
                                  }}
                                  value={this.state.formData1["Deal Name"]}
                                />
                              ) : (
                                <input
                                  required
                                  placeholder="Type here"
                                  className="input-general"
                                  type="text"
                                  onChange={(e) => {
                                    this.setState(
                                      {
                                        formData1: {
                                          ...this.state.formData1,
                                          "Deal Name": e.target.value,
                                        },
                                      },
                                      () =>
                                        this.generatedealid(
                                          this.state.formData1
                                        )
                                    );
                                    this.checkDealName(e.target.value);
                                  }}
                                  value={this.state.formData1["Deal Name"]}
                                />
                              )}
                            </div>

                            {Object.keys(
                              this.state?.formData1["Rating Agency"]
                            )?.map((item, index) => {
                              return (
                                <>
                                  <div className="input-generalContainer">
                                    <label className="label">
                                      Rating Agency {index + 1} Name
                                    </label>
                                    <div className="input-inline">
                                      <input
                                        placeholder="Type here"
                                        className="input-general"
                                        type="text"
                                        onChange={(e) => {
                                          this.setState({
                                            formData1: {
                                              ...this.state.formData1,
                                              "Rating Agency": {
                                                ...this.state.formData1[
                                                  "Rating Agency"
                                                ],
                                                [`Rating Agency${index + 1}`]:
                                                  e.target?.value,
                                              },
                                            },
                                          });
                                        }}
                                        value={
                                          this.state.formData1["Rating Agency"][
                                            `Rating Agency${index + 1}`
                                          ]
                                        }
                                      />
                                      {Object.keys(
                                        this.state.formData1["Rating Agency"]
                                      ).length ===
                                        index + 1 && (
                                        <AddCircleOutlinedIcon
                                          className="buttonissue1"
                                          onClick={() =>
                                            this.AddNewInputRating(index)
                                          }
                                        ></AddCircleOutlinedIcon>
                                      )}
                                      {Object.keys(
                                        this.state.formData1["Rating Agency"]
                                      ).length > 1 &&
                                        Object.keys(
                                          this.state?.formData1["Rating Agency"]
                                        ).length ===
                                          index + 1 && (
                                          <RemoveCircleOutlineIcon
                                            className="buttonissue1"
                                            onClick={() =>
                                              this.RemoveInputRating(index)
                                            }
                                          ></RemoveCircleOutlineIcon>
                                        )}
                                    </div>
                                  </div>
                                </>
                              );
                            })}

                            <div className="input-generalContainer">
                              <label className="label">Closing Date *</label>
                              <MuiPickersUtilsProvider utils={MomentUtils}>
                                <KeyboardDatePicker
                                  disableToolbar
                                  margin="normal"
                                  id="date1"
                                  // inputValue={this.state.inputValue4}
                                  inputValue={checkStatus4()}
                                  value={
                                    this.state.formData1["Closing Date"] ?? ""
                                  }
                                  onChange={(date, value) =>
                                    this.setState(
                                      {
                                        formData1: {
                                          ...this.state.formData1,
                                          "Closing Date": moment(date)
                                            .format("MM/DD/YYYY")
                                            .toString(),
                                        },
                                        inputValue4: value,
                                      },
                                      () =>
                                        this.generatedealid(
                                          this.state.formData1
                                        )
                                    )
                                  }
                                  required
                                  keyboard
                                  IsEditable={true}
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

                            <div className="input-generalContainer">
                              <label className="label">Cut-Off Date</label>
                              <MuiPickersUtilsProvider utils={MomentUtils}>
                                <KeyboardDatePicker
                                  disableToolbar
                                  margin="normal"
                                  id="date1"
                                  inputValue={checkStatus6()}
                                  value={
                                    this.state.formData1["Cutoff Date"] ?? ""
                                  }
                                  onChange={(date, value) =>
                                    this.setState({
                                      formData1: {
                                        ...this.state.formData1,
                                        "Cutoff Date": moment(date)
                                          .format("MM/DD/YYYY")
                                          .toString(),
                                      },
                                      inputValue6: value,
                                    })
                                  }
                                  keyboard
                                  IsEditable={true}
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

                            {/* <div className="input-generalContainer">
                      	<label className="label">Step-up Date</label>
                      	<MuiPickersUtilsProvider utils={MomentUtils}>
                        	<KeyboardDatePicker
                          	disableToolbar
                          	margin="normal"
                          	id="date1"
                          	inputValue={checkStatus5()}
                          	value={this.state.formData1["Stepup Date"] ?? ""}
                          	onChange={(date, value) =>
                            	this.setState({
                              	formData1: {
                                	...this.state.formData1,
                                	"Stepup Date": moment(date)
                                  	.format("MM/DD/YYYY")
                                  	.toString(),
                              	},
                              	inputValue5: value,
                            	})
                          	}
                          	keyboard
                          	IsEditable={true}
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
                    	</div> */}

                            <div className="input-generalContainer">
                              <label className="label">
                                Delinquency Method *
                              </label>
                              <select
                                required
                                className="input-select-general"
                                onChange={(e) => {
                                  this.setState({
                                    formData1: {
                                      ...this.state.formData1,
                                      "Delinquency Method": e.target.value,
                                    },
                                  });
                                }}
                                value={
                                  this.state.formData1["Delinquency Method"]
                                }
                              >
                                <option value="">Select any one</option>
                                <option value="MBA">MBA</option>
                                <option value="OTS">OTS</option>
                              </select>
                            </div>

                            <div className="input-generalContainer">
                              <label className="label">
                                Determination Date Logic
                              </label>
                              <input
                                required
                                className="input-general"
                                onChange={(e) => {
                                  this.setState({
                                    formData1: {
                                      ...this.state.formData1,
                                      "Determination Date Logic":
                                        e.target.value,
                                    },
                                  });
                                }}
                                value={
                                  this.state.formData1[
                                    "Determination Date Logic"
                                  ]
                                }
                              />
                            </div>

                            <div className="input-generalContainer">
                              <label className="label">
                                Relationship Manager
                              </label>
                              <input
                                placeholder="Type here"
                                className="input-general"
                                onChange={(e) => {
                                  this.setState({
                                    formData1: {
                                      ...this.state.formData1,
                                      "Relationship Manager": e.target.value,
                                    },
                                  });
                                }}
                                value={
                                  this.state.formData1["Relationship Manager"]
                                }
                              />
                            </div>

                            <div className="input-generalContainer">
                              <label className="label">ESMA Compliant *</label>
                              <select
                                required
                                className="input-select-general"
                                onChange={(e) => {
                                  sessionStorage.setItem(
                                    "isESMA_Flag",
                                    e.target.value
                                  );
                                  this.setState({
                                    formData1: {
                                      ...this.state.formData1,
                                      "ESMA Compliant": e.target.value,
                                    },
                                  });
                                }}
                                value={
                                  this.state.formData1["ESMA Compliant"] ===
                                  undefined
                                    ? sessionStorage.setItem("isESMA_Flag", "")
                                    : this.state.formData1["ESMA Compliant"]
                                }
                              >
                                <option value="">Select any one</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                              </select>
                            </div>

                            <div
                              className="input-generalContainer"
                              style={{ position: "relative", top: "0.5rem" }}
                            >
                              <p>Selected Color * : {colorDisplay}</p>
                              <div
                                style={styles.swatch}
                                onClick={this.handleClick}
                              >
                                <div style={styles.color} />
                              </div>
                              {this.state.displayColorPicker ? (
                                <div style={styles.popover}>
                                  <div
                                    style={styles.cover}
                                    onClick={this.handleClickColorChange}
                                  />
                                  <ChromePicker
                                    height={10}
                                    width={420}
                                    color={selectedColor}
                                    onChange={(color) => {
                                      // Move the handleChange logic here
                                      this.setState({
                                        "selected Color": color,
                                        actionUpload: true,
                                      });
                                    }}
                                    // Add an additional event handler to close the picker when a color is selected
                                    onAccept={() => {
                                      this.setState({
                                        displayColorPicker: false,
                                      });
                                    }}
                                  />
                                </div>
                              ) : null}
                              <div className="selected-color-display">
                                <div
                                  className="selected-color"
                                  style={{
                                    backgroundColor: selectedColor
                                      ? isHexFormat
                                        ? selectedColor.hex
                                        : `rgba(${selectedColor.rgba.r}, ${selectedColor.rgba.g}, ${selectedColor.rgba.b}, ${selectedColor.rgba.a})`
                                      : "transparent", // Set a default color or handle this case as needed
                                  }}
                                ></div>
                              </div>
                            </div>
                          </div>

                          <div className="col-12 col-sm-6 col-md-4">
                            <div className="input-generalContainer">
                              <label className="label">Issuer Name</label>
                              <input
                                placeholder="Type here"
                                className="input-general"
                                type="text"
                                onChange={(e) => {
                                  this.setState({
                                    formData1: {
                                      ...this.state.formData1,
                                      "Issuer Name": e.target.value,
                                    },
                                  });
                                }}
                                value={this.state.formData1["Issuer Name"]}
                              />
                            </div>

                            {/* {Object.keys(
                              this.state.formData1["Originator Name"]
                            ).map((item, index) => {
                              return (
                                <>
                                  <div className="input-generalContainer">
                                    <label className="label">
                                      Originator {index + 1} Name
                                    </label>
                                    <div className="input-inline">
                                      <input
                                        placeholder="Type here"
                                        className="input-general"
                                        type="text"
                                        onChange={(e) => {
                                          this.setState(
                                            {
                                              formData1: {
                                                ...this.state.formData1,
                                                "Originator Name": {
                                                  ...this.state.formData1[
                                                    "Originator Name"
                                                  ],
                                                  [`Originator Name${
                                                    index + 1
                                                  }`]: e.target?.value,
                                                },
                                              },
                                            },
                                            () =>
                                              console.log(this.state.formData1)
                                          );
                                        }}
                                        value={
                                          this.state.formData1[
                                            "Originator Name"
                                          ][`Originator Name${index + 1}`]
                                        }
                                      />
                                      {Object.keys(
                                        this.state.formData1["Originator Name"]
                                      ).length ===
                                        index + 1 && (
                                        <AddCircleOutlinedIcon
                                          className="buttonissue1"
                                          onClick={() =>
                                            this.AddNewInputOrganizer(index)
                                          }
                                        ></AddCircleOutlinedIcon>
                                      )}
                                      {Object.keys(
                                        this.state.formData1["Originator Name"]
                                      ).length > 1 &&
                                        Object.keys(
                                          this.state.formData1[
                                            "Originator Name"
                                          ]
                                        ).length ===
                                          index + 1 && (
                                          <RemoveCircleOutlineIcon
                                            className="buttonissue1"
                                            onClick={() =>
                                              this.RemoveInputOrganizer(index)
                                            }
                                          ></RemoveCircleOutlineIcon>
                                        )}
                                    </div>
                                  </div>
                                </>
                              );
                            })} */}

                            {Object.keys(this.state.formData1?.Servicer)?.map(
                              (item, index) => {
                                return (
                                  <>
                                    <div className="input-generalContainer">
                                      <label className="label">
                                        Servicer {index + 1} Name *
                                      </label>
                                      <div className="input-inline">
                                        <input
                                          required
                                          placeholder="Type here"
                                          className="input-general"
                                          type="text"
                                          onChange={(e) => {
                                            this.setState({
                                              formData1: {
                                                ...this.state.formData1,
                                                Servicer: {
                                                  ...this.state.formData1
                                                    ?.Servicer,
                                                  [`Servicer${index + 1}`]:
                                                    e.target?.value,
                                                },
                                              },
                                            });
                                          }}
                                          value={
                                            this.state.formData1?.Servicer[
                                              `Servicer${index + 1}`
                                            ]
                                          }
                                        />
                                        {Object.keys(
                                          this.state.formData1?.Servicer
                                        ).length ===
                                          index + 1 && (
                                          <AddCircleOutlinedIcon
                                            className="buttonissue1"
                                            onClick={() =>
                                              this.AddNewInputServicer(index)
                                            }
                                          ></AddCircleOutlinedIcon>
                                        )}
                                        {Object.keys(
                                          this.state.formData1?.Servicer
                                        ).length > 1 &&
                                          Object.keys(
                                            this.state.formData1?.Servicer
                                          ).length ===
                                            index + 1 && (
                                            <RemoveCircleOutlineIcon
                                              className="buttonissue1"
                                              onClick={() =>
                                                this.RemoveInputServicer(index)
                                              }
                                            ></RemoveCircleOutlineIcon>
                                          )}
                                      </div>
                                    </div>
                                  </>
                                );
                              }
                            )}

                            <div className="input-generalContainer">
                              <label className="label"> Pricing Date</label>
                              <MuiPickersUtilsProvider utils={MomentUtils}>
                                <KeyboardDatePicker
                                  disableToolbar
                                  margin="normal"
                                  id="date1"
                                  // inputValue={this.state.inputValue2}
                                  inputValue={checkStatus2()}
                                  value={
                                    this.state.formData1["Pricing Date"] ?? ""
                                  }
                                  onChange={(date, value) =>
                                    this.setState({
                                      formData1: {
                                        ...this.state.formData1,
                                        "Pricing Date": moment(date)
                                          .format("MM/DD/YYYY")
                                          .toString(),
                                      },
                                      inputValue2: value,
                                    })
                                  }
                                  keyboard
                                  IsEditable={true}
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
                              {/* <DatePicker
                                required
                                id="date1"
                                placeholderText="MM/DD/YYYY"
                                dateFormat="MM/dd/yyyy"
                                variant="filled"
                                className="input-select"
                                selected={
                                  this.state.formData1["Pricing Date"] 
                                }
                                onChange={(date) =>
                                  this.setState({
                                    formData1: {
                                      ...this.state.formData1,
                                      "Pricing Date": date
                                    }
                        
                                  },()=>console.log('dateeeeeeeeeeee',date,this.state.formData1["Pricind Date"]))
                                }
                              /> */}
                            </div>

                            <div className="input-generalContainer">
                              <label for="multiSelect">Investor</label>
                              {/* <select
                        	required
                        	id="multiSelect"
                        	name="multiSelect"
                        	// className="input-select-general"
                        	onChange={this.handleMultiSelectChange}
                        	value={this.state.formData1?.Investor}
                        	multiple
                      	>
                        	<option value="">Select any one</option>
                        	<option value="Investor">Investor</option>
                        	<option value="Investor2">Investor2</option>
                      	</select> */}
                              <Select
                                isMulti
                                value={this.state.formData1?.Investor}
                                onChange={this.handleChange}
                                options={this.options}
                                styles={customStyles}
                                placeholder="Select Investor..."
                              />
                            </div>

                            <div className="input-generalContainer">
                              <label className="label">
                                Payment Frequency *
                              </label>
                              <select
                                required
                                className="input-select-general"
                                onChange={(e) => {
                                  this.setState({
                                    formData1: {
                                      ...this.state.formData1,
                                      "Payment Frequency": e.target.value,
                                    },
                                  });
                                }}
                                value={
                                  this.state.formData1["Payment Frequency"]
                                }
                              >
                                <option value="">Select any one</option>
                                <option value="Monthly">Monthly</option>
                                <option value="Quarterly">Quarterly</option>
                                <option value="Semi-Annually">
                                  Semi-Annually
                                </option>
                                <option value="Annually">Annually</option>
                              </select>
                            </div>

                            <div className="input-generalContainer">
                              <label className="label">Record Date Logic</label>
                              <input
                                required
                                className="input-general"
                                onChange={(e) => {
                                  this.setState({
                                    formData1: {
                                      ...this.state.formData1,
                                      "Record Date Logic": e.target.value,
                                    },
                                  });
                                }}
                                value={
                                  this.state.formData1["Record Date Logic"]
                                }
                              />
                            </div>

                            <div className="input-generalContainer">
                              <label className="label">Financing Type *</label>
                              <select
                                className="input-select-general"
                                onChange={(e) => {
                                  sessionStorage.setItem(
                                    "isSecuritisation",
                                    e.target.value
                                  );
                                  this.setState({
                                    formData1: {
                                      ...this.state.formData1,
                                      "Financing Type": e.target.value,
                                    },
                                  });
                                }}
                                value={
                                  this.state.formData1["Financing Type"] ===
                                  undefined
                                    ? sessionStorage.setItem(
                                        "isSecuritisation",
                                        ""
                                      )
                                    : this.state.formData1["Financing Type"]
                                }
                                required
                              >
                                <option value="">Select any one</option>
                                <option value="Securitisation">
                                  Securitisation
                                </option>
                                <option value="Warehouse">Warehouse</option>
                                <option value="Line of Credit">
                                  {" "}
                                  Line of Credit
                                </option>
                              </select>
                            </div>

                            <div className="input-generalContainer">
                              <label className="label">
                                Master Trust Flag *
                              </label>
                              <select
                                className="input-select-general"
                                onChange={(e) => {
                                  this.setState({
                                    formData1: {
                                      ...this.state.formData1,
                                      "Master Trust Flag": e.target.value,
                                    },
                                  });
                                }}
                                value={
                                  this.state.formData1["Master Trust Flag"] ===
                                  undefined
                                    ? ""
                                    : this.state.formData1["Master Trust Flag"]
                                }
                                required
                              >
                                <option value="">Select any one</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="AccordianGeneral">
                          <img
                            src={AccordIcon}
                            alt="Accordian"
                            className={
                              this.state.isAccordian
                                ? "AccordImgGen"
                                : "AccordImgGenReverse"
                            }
                            onClick={this.handleAccordian}
                          />
                        </div>
                        {this.state.formData1["ESMA Compliant"] === "Yes" &&
                          !this.state.isAccordian && (
                            <div>
                              <div>
                                <div className="row general-row">
                                  <div className="col-12 col-sm-6 col-md-4">
                                    <div className="input-generalContainer">
                                      <label className="label">
                                        Reporting Entity Contact Emails
                                      </label>
                                      <input
                                        placeholder="Type here"
                                        className="input-general"
                                        onChange={(e) => {
                                          this.setState({
                                            formData2: {
                                              ...this.state.formData2,
                                              "Reporting Entity Contact Emails":
                                                e.target.value,
                                            },
                                          });
                                        }}
                                        value={
                                          this.state.formData2[
                                            "Reporting Entity Contact Emails"
                                          ]
                                        }
                                      />
                                    </div>
                                    <div className="input-generalContainer">
                                      <label className="label">
                                        Underlying Exposure Type{" "}
                                      </label>
                                      <select
                                        className="input-select-general"
                                        onChange={(e) => {
                                          this.setState({
                                            formData2: {
                                              ...this.state.formData2,
                                              "Underlying Exposure Type":
                                                e.target.value,
                                            },
                                          });
                                        }}
                                        value={
                                          this.state.formData2[
                                            "Underlying Exposure Type"
                                          ]
                                        }
                                      >
                                        <option value="">Select any one</option>
                                        <option value="ALOL">ALOL</option>
                                        <option value="CONL">CONL</option>
                                        <option value="CMRT">CMRT</option>
                                        <option value="CCRR">CCRR</option>
                                        <option value="LEAS">LEAS</option>
                                        <option value="RMRT">RMRT</option>
                                        <option value="MIXD">MIXD</option>
                                        <option value="SMEL">SMEL</option>
                                        <option value="NSML">NSML</option>
                                        <option value="OTHR">OTHR</option>
                                      </select>
                                    </div>
                                    <div className="input-generalContainer">
                                      <label className="label">
                                        Obligor Probability Of Default in Range
                                        [0.00%,0.10%]
                                      </label>
                                      <input
                                        placeholder="Type here"
                                        className="input-general"
                                        onChange={(e) => {
                                          this.setState({
                                            formData2: {
                                              ...this.state.formData2,
                                              "Obligor Probability Of Default in Range [0.00%,0.10%]":
                                                e.target.value,
                                            },
                                          });
                                        }}
                                        value={
                                          this.state.formData2[
                                            "Obligor Probability Of Default in Range [0.00%,0.10%]"
                                          ]
                                        }
                                      />
                                    </div>
                                    <div className="input-generalContainer">
                                      <label className="label">
                                        Risk Weight Approach{" "}
                                      </label>
                                      <select
                                        className="input-select-general"
                                        onChange={(e) => {
                                          this.setState({
                                            formData2: {
                                              ...this.state.formData2,
                                              "Risk Weight Approach":
                                                e.target.value,
                                            },
                                          });
                                        }}
                                        value={
                                          this.state.formData2[
                                            "Risk Weight Approach"
                                          ]
                                        }
                                      >
                                        <option value="">Select any one</option>
                                        <option value="STND">STND</option>
                                        <option value="FIRB">FIRB</option>
                                        <option value="ADIR">ADIR</option>
                                      </select>
                                    </div>

                                    <div className="input-generalContainer">
                                      <label className="label">
                                        Obligor Probability Of Default in Range
                                        [0.25%,1.00%]
                                      </label>
                                      <input
                                        placeholder="Type here"
                                        className="input-general"
                                        onChange={(e) => {
                                          this.setState({
                                            formData2: {
                                              ...this.state.formData2,
                                              "Obligor Probability Of Default in Range [0.25%,1.00%]":
                                                e.target.value,
                                            },
                                          });
                                        }}
                                        value={
                                          this.state.formData2[
                                            "Obligor Probability Of Default in Range [0.25%,1.00%]"
                                          ]
                                        }
                                      />
                                    </div>
                                    <div className="input-generalContainer">
                                      <label className="label">
                                        Obligor Probability Of Default in Range
                                        [20.00%,100.00%]
                                      </label>
                                      <input
                                        placeholder="Type here"
                                        className="input-general"
                                        onChange={(e) => {
                                          this.setState({
                                            formData2: {
                                              ...this.state.formData2,
                                              "Obligor Probability Of Default in Range [20.00%,100.00%]":
                                                e.target.value,
                                            },
                                          });
                                        }}
                                        value={
                                          this.state.formData2[
                                            "Obligor Probability Of Default in Range [20.00%,100.00%]"
                                          ]
                                        }
                                      />
                                    </div>

                                    <div className="input-generalContainer">
                                      <label className="label">
                                        {" "}
                                        Remedial Actions
                                      </label>
                                      <input
                                        placeholder="Type here"
                                        className="input-general"
                                        onChange={(e) => {
                                          this.setState({
                                            formData2: {
                                              ...this.state.formData2,
                                              "Remedial Actions":
                                                e.target.value,
                                            },
                                          });
                                        }}
                                        value={
                                          this.state.formData2[
                                            "Remedial Actions"
                                          ]
                                        }
                                      />
                                    </div>
                                    <div className="input-generalContainer">
                                      <label className="label">
                                        {" "}
                                        Perfection Of Sale
                                      </label>
                                      <input
                                        placeholder="Type here"
                                        className="input-general"
                                        onChange={(e) => {
                                          this.setState({
                                            formData2: {
                                              ...this.state.formData2,
                                              "Perfection Of Sale":
                                                e.target.value,
                                            },
                                          });
                                        }}
                                        value={
                                          this.state.formData2[
                                            "Perfection Of Sale"
                                          ]
                                        }
                                      />
                                    </div>
                                    <div className="input-generalContainer">
                                      <label className="label">
                                        Seller Share{" "}
                                      </label>
                                      <input
                                        placeholder="Type here"
                                        className="input-general"
                                        onChange={(e) => {
                                          this.setState({
                                            formData2: {
                                              ...this.state.formData2,
                                              "Seller Share": e.target.value,
                                            },
                                          });
                                        }}
                                        value={
                                          this.state.formData2["Seller Share"]
                                        }
                                      />
                                    </div>
                                    <div className="input-generalContainer">
                                      <label className="label">
                                        Interest Rate Swap Benchmark{" "}
                                      </label>
                                      <select
                                        className="input-select-general"
                                        onChange={(e) => {
                                          this.setState({
                                            formData2: {
                                              ...this.state.formData2,
                                              "Interest Rate Swap Benchmark":
                                                e.target.value,
                                            },
                                          });
                                        }}
                                        value={
                                          this.state.formData2[
                                            "Interest Rate Swap Benchmark"
                                          ]
                                        }
                                      >
                                        <option value="">Select any one</option>
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
                                        <option value="PROB">PROB</option>
                                        <option value="TLBO">TLBO</option>
                                        <option value="WIBO">WIBO</option>
                                        <option value="BOER">BOER</option>
                                        <option value="ECBR">ECBR</option>
                                        <option value="LDOR">LDOR</option>
                                        <option value="OTHR">OTHR</option>
                                      </select>
                                    </div>

                                    <div className="input-generalContainer">
                                      <label className="label">
                                        Currency Swap Payer Currency
                                      </label>
                                      <input
                                        placeholder="Type here"
                                        className="input-general"
                                        onChange={(e) => {
                                          this.setState({
                                            formData2: {
                                              ...this.state.formData2,
                                              "Currency Swap Payer Currency":
                                                e.target.value,
                                            },
                                          });
                                        }}
                                        value={
                                          this.state.formData2[
                                            "Currency Swap Payer Currency"
                                          ]
                                        }
                                      />
                                    </div>

                                    <div className="input-generalContainer">
                                      <label className="label">
                                        Currency Swap Maturity Date
                                      </label>
                                      <input
                                        placeholder="Type here"
                                        className="input-general"
                                        onChange={(e) => {
                                          this.setState({
                                            formData2: {
                                              ...this.state.formData2,
                                              "Currency Swap Maturity Date":
                                                e.target.value,
                                            },
                                          });
                                        }}
                                        value={
                                          this.state.formData2[
                                            "Currency Swap Maturity Date"
                                          ]
                                        }
                                      />
                                    </div>
                                  </div>

                                  <div className="col-12 col-sm-6 col-md-4">
                                    <div className="input-generalContainer">
                                      <label className="label">
                                        Reporting Entity Contact Person
                                      </label>
                                      <input
                                        placeholder="Type here"
                                        className="input-general"
                                        onChange={(e) => {
                                          this.setState({
                                            formData2: {
                                              ...this.state.formData2,
                                              "Reporting Entity Contact Person":
                                                e.target.value,
                                            },
                                          });
                                        }}
                                        value={
                                          this.state.formData2[
                                            "Reporting Entity Contact Person"
                                          ]
                                        }
                                      />
                                    </div>
                                    <div className="input-generalContainer">
                                      <label className="label">
                                        {" "}
                                        Risk Retention Method
                                      </label>
                                      <select
                                        className="input-select-general"
                                        onChange={(e) => {
                                          this.setState({
                                            formData2: {
                                              ...this.state.formData2,
                                              "Risk Retention Method":
                                                e.target.value,
                                            },
                                          });
                                        }}
                                        value={
                                          this.state.formData2[
                                            "Risk Retention Method"
                                          ]
                                        }
                                      >
                                        <option value="">Select any one</option>
                                        <option value="VSLC">VSLC</option>
                                        <option value="SLLS">SLLS</option>
                                        <option value="RSEX">RSEX</option>
                                        <option value="FLTR">FLTR</option>
                                        <option value="FLEX">FLEX</option>
                                        <option value="NCOM">NCOM</option>
                                        <option value="OTHR">OTHR</option>
                                      </select>
                                    </div>
                                    <div className="input-generalContainer">
                                      <label className="label">
                                        Risk Transfer Method{" "}
                                      </label>
                                      <select
                                        className="input-select-general"
                                        onChange={(e) => {
                                          this.setState({
                                            formData2: {
                                              ...this.state.formData2,
                                              "Risk Transfer Method":
                                                e.target.value,
                                            },
                                          });
                                        }}
                                        value={
                                          this.state.formData2[
                                            "Risk Transfer Method"
                                          ]
                                        }
                                      >
                                        <option value="">Select any one</option>
                                        <option value="Y">Y</option>
                                        <option value="N">N</option>
                                      </select>
                                    </div>
                                    <div className="input-generalContainer">
                                      <label className="label">
                                        Obligor Probability Of Default in Range
                                        [1.00%,7.50%]
                                      </label>
                                      <input
                                        placeholder="Type here"
                                        className="input-general"
                                        onChange={(e) => {
                                          this.setState({
                                            formData2: {
                                              ...this.state.formData2,
                                              "Obligor Probability Of Default in Range [1.00%,7.50%]":
                                                e.target.value,
                                            },
                                          });
                                        }}
                                        value={
                                          this.state.formData2[
                                            "Obligor Probability Of Default in Range [1.00%,7.50%]"
                                          ]
                                        }
                                      />
                                    </div>
                                    <div className="input-generalContainer">
                                      <label className="label">
                                        Internal Loss Given Default Estimate
                                      </label>
                                      <input
                                        placeholder="Type here"
                                        className="input-general"
                                        onChange={(e) => {
                                          this.setState({
                                            formData2: {
                                              ...this.state.formData2,
                                              "Internal Loss Given Default Estimate":
                                                e.target.value,
                                            },
                                          });
                                        }}
                                        value={
                                          this.state.formData2[
                                            "Internal Loss Given Default Estimate"
                                          ]
                                        }
                                      />
                                    </div>
                                    <div className="input-generalContainer">
                                      <label className="label">
                                        {" "}
                                        Administrative Actions
                                      </label>
                                      <input
                                        placeholder="Type here"
                                        className="input-general"
                                        onChange={(e) => {
                                          this.setState({
                                            formData2: {
                                              ...this.state.formData2,
                                              "Administrative Actions":
                                                e.target.value,
                                            },
                                          });
                                        }}
                                        value={
                                          this.state.formData2[
                                            "Administrative Actions"
                                          ]
                                        }
                                      />
                                    </div>{" "}
                                    <div className="input-generalContainer">
                                      <label className="label">
                                        {" "}
                                        Current Waterfall Type
                                      </label>
                                      <select
                                        className="input-select-general"
                                        onChange={(e) => {
                                          this.setState({
                                            formData2: {
                                              ...this.state.formData2,
                                              "Current Waterfall Type":
                                                e.target.value,
                                            },
                                          });
                                        }}
                                        value={
                                          this.state.formData2[
                                            "Current Waterfall Type"
                                          ]
                                        }
                                      >
                                        <option value="">Select any one</option>
                                        <option value="TRWT">TRWT</option>
                                        <option value="SQWT">SQWT</option>
                                        <option value="PRWT">PRWT</option>
                                        <option value="SQPR">SQPR</option>
                                        <option value="PRSQ">PRSQ</option>
                                        <option value="OTHR">OTHR</option>
                                      </select>
                                    </div>{" "}
                                    <div className="input-generalContainer">
                                      <label className="label">
                                        Funding Share{" "}
                                      </label>
                                      <input
                                        placeholder="Type here"
                                        className="input-general"
                                        onChange={(e) => {
                                          this.setState({
                                            formData2: {
                                              ...this.state.formData2,
                                              "Funding Share": e.target.value,
                                            },
                                          });
                                        }}
                                        value={
                                          this.state.formData2["Funding Share"]
                                        }
                                      />
                                    </div>
                                    <div className="input-generalContainer">
                                      <label className="label">
                                        Interest Rate Swap Maturity Date
                                      </label>
                                      <input
                                        placeholder="Type here"
                                        className="input-general"
                                        onChange={(e) => {
                                          this.setState({
                                            formData2: {
                                              ...this.state.formData2,
                                              "Interest Rate Swap Maturity Date":
                                                e.target.value,
                                            },
                                          });
                                        }}
                                        value={
                                          this.state.formData2[
                                            "Interest Rate Swap Maturity Date"
                                          ]
                                        }
                                      />
                                    </div>
                                    <div className="input-generalContainer">
                                      <label className="label">
                                        Currency Swap Receiver Currency
                                      </label>
                                      <input
                                        placeholder="Type here"
                                        className="input-general"
                                        onChange={(e) => {
                                          this.setState({
                                            formData2: {
                                              ...this.state.formData2,
                                              "Currency Swap Receiver Currency":
                                                e.target.value,
                                            },
                                          });
                                        }}
                                        value={
                                          this.state.formData2[
                                            "Currency Swap Receiver Currency"
                                          ]
                                        }
                                      />
                                    </div>
                                    <div className="input-generalContainer">
                                      <label className="label">
                                        Currency Swap Notional
                                      </label>
                                      <input
                                        placeholder="Type here"
                                        className="input-general"
                                        onChange={(e) => {
                                          this.setState({
                                            formData2: {
                                              ...this.state.formData2,
                                              "Currency Swap Notional":
                                                e.target.value,
                                            },
                                          });
                                        }}
                                        value={
                                          this.state.formData2[
                                            "Currency Swap Notional"
                                          ]
                                        }
                                      />
                                    </div>
                                  </div>

                                  <div className="col-12 col-sm-6 col-md-4">
                                    <div className="input-generalContainer">
                                      <label className="label">
                                        Reporting Entity Contact Telephone
                                      </label>
                                      <input
                                        placeholder="Type here"
                                        className="input-general"
                                        onChange={(e) => {
                                          this.setState({
                                            formData2: {
                                              ...this.state.formData2,
                                              "Reporting Entity Contact Telephone":
                                                e.target.value,
                                            },
                                          });
                                        }}
                                        value={
                                          this.state.formData2[
                                            "Reporting Entity Contact Telephone"
                                          ]
                                        }
                                      />
                                    </div>

                                    <div className="input-generalContainer">
                                      <label className="label">
                                        {" "}
                                        Risk Retention Holder
                                      </label>
                                      <select
                                        className="input-select-general"
                                        onChange={(e) => {
                                          this.setState({
                                            formData2: {
                                              ...this.state.formData2,
                                              "Risk Retention Holder":
                                                e.target.value,
                                            },
                                          });
                                        }}
                                        value={
                                          this.state.formData2[
                                            "Risk Retention Holder"
                                          ]
                                        }
                                      >
                                        <option value="">Select any one</option>
                                        <option value="ORIG">ORIG</option>
                                        <option value="SPON">SPON</option>
                                        <option value="OLND">OLND</option>
                                        <option value="SELL">SELL</option>
                                        <option value="NCOM">NCOM</option>
                                        <option value="OTHR">OTHR</option>
                                      </select>
                                    </div>
                                    <div className="input-generalContainer">
                                      <label className="label">
                                        Excess Spread Trapping Mechanism
                                      </label>
                                      <select
                                        className="input-select-general"
                                        onChange={(e) => {
                                          this.setState({
                                            formData2: {
                                              ...this.state.formData2,
                                              "Excess Spread Trapping Mechanism":
                                                e.target.value,
                                            },
                                          });
                                        }}
                                        value={
                                          this.state.formData2[
                                            "Excess Spread Trapping Mechanism"
                                          ]
                                        }
                                      >
                                        <option value="">Select any one</option>
                                        <option value="Y">Y</option>
                                        <option value="N">N</option>
                                      </select>
                                    </div>
                                    <div className="input-generalContainer">
                                      <label className="label">
                                        Obligor Probability Of Default in Range
                                        [0.10%,0.25%]
                                      </label>
                                      <input
                                        placeholder="Type here"
                                        className="input-general"
                                        onChange={(e) => {
                                          this.setState({
                                            formData2: {
                                              ...this.state.formData2,
                                              "Obligor Probability Of Default in Range [0.10%,0.25%]":
                                                e.target.value,
                                            },
                                          });
                                        }}
                                        value={
                                          this.state.formData2[
                                            "Obligor Probability Of Default in Range [0.10%,0.25%]"
                                          ]
                                        }
                                      />
                                    </div>

                                    <div className="input-generalContainer">
                                      <label className="label">
                                        Obligor Probability Of Default in Range
                                        [7.50%,20.00%]
                                      </label>
                                      <input
                                        placeholder="Type here"
                                        className="input-general"
                                        onChange={(e) => {
                                          this.setState({
                                            formData2: {
                                              ...this.state.formData2,
                                              "Obligor Probability Of Default in Range [7.50%,20.00%]":
                                                e.target.value,
                                            },
                                          });
                                        }}
                                        value={
                                          this.state.formData2[
                                            "Obligor Probability Of Default in Range [7.50%,20.00%]"
                                          ]
                                        }
                                      />
                                    </div>

                                    <div className="input-generalContainer">
                                      <label className="label">
                                        No Longer STS{" "}
                                      </label>
                                      <input
                                        placeholder="Type here"
                                        className="input-general"
                                        onChange={(e) => {
                                          this.setState({
                                            formData2: {
                                              ...this.state.formData2,
                                              "No Longer STS": e.target.value,
                                            },
                                          });
                                        }}
                                        value={
                                          this.state.formData2["No Longer STS"]
                                        }
                                      />
                                    </div>
                                    <div className="input-generalContainer">
                                      <label className="label">
                                        {" "}
                                        Material Amendment to Transaction
                                        Documents
                                      </label>
                                      <input
                                        placeholder="Type here"
                                        className="input-general"
                                        onChange={(e) => {
                                          this.setState({
                                            formData2: {
                                              ...this.state.formData2,
                                              "Material Amendment to Transaction Documents":
                                                e.target.value,
                                            },
                                          });
                                        }}
                                        value={
                                          this.state.formData2[
                                            "Material Amendment to Transaction Documents"
                                          ]
                                        }
                                      />
                                    </div>
                                    <div className="input-generalContainer">
                                      <label className="label">
                                        {" "}
                                        Master Trust Type
                                      </label>
                                      <select
                                        className="input-select-general"
                                        onChange={(e) => {
                                          this.setState({
                                            formData2: {
                                              ...this.state.formData2,
                                              "Master Trust Type":
                                                e.target.value,
                                            },
                                          });
                                        }}
                                        value={
                                          this.state.formData2[
                                            "Master Trust Type"
                                          ]
                                        }
                                      >
                                        <option value="">Select any one</option>
                                        <option value="CSTR">CSTR</option>
                                        <option value="SSTR">SSTR</option>
                                        <option value="OTHR">OTHR</option>
                                      </select>
                                    </div>

                                    <div className="input-generalContainer">
                                      <label className="label">
                                        Revenue Allocated To This Series
                                      </label>
                                      <input
                                        placeholder="Type here"
                                        className="input-general"
                                        onChange={(e) => {
                                          this.setState({
                                            formData2: {
                                              ...this.state.formData2,
                                              "Revenue Allocated To This Series":
                                                e.target.value,
                                            },
                                          });
                                        }}
                                        value={
                                          this.state.formData2[
                                            "Revenue Allocated To This Series"
                                          ]
                                        }
                                      />
                                    </div>

                                    <div className="input-generalContainer">
                                      <label className="label">
                                        Interest Rate Swap Notional
                                      </label>
                                      <input
                                        placeholder="Type here"
                                        className="input-general"
                                        onChange={(e) => {
                                          this.setState({
                                            formData2: {
                                              ...this.state.formData2,
                                              "Interest Rate Swap Notional":
                                                e.target.value,
                                            },
                                          });
                                        }}
                                        value={
                                          this.state.formData2[
                                            "Interest Rate Swap Notional"
                                          ]
                                        }
                                      />
                                    </div>

                                    <div className="input-generalContainer">
                                      <label className="label">
                                        Exchange Rate For Currency Swap
                                      </label>
                                      <input
                                        placeholder="Type here"
                                        className="input-general"
                                        onChange={(e) => {
                                          this.setState({
                                            formData2: {
                                              ...this.state.formData2,
                                              "Exchange Rate For Currency Swap":
                                                e.target.value,
                                            },
                                          });
                                        }}
                                        value={
                                          this.state.formData2[
                                            "Exchange Rate For Currency Swap"
                                          ]
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>

                                {this.state.Counterparty?.map(
                                  (counterparty, index) => (
                                    <div>
                                      <div className="general-row1" key={index}>
                                        <div className="row general-row">
                                          <div className="col-12 col-sm-6 col-md-4">
                                            <div className="input-generalContainer">
                                              <label className="label">
                                                Counterparty Legal Entity
                                                Identifier
                                              </label>
                                              <input
                                                placeholder="Type here"
                                                className="input-general"
                                                value={
                                                  counterparty[
                                                    "Counterparty Legal Entity Identifier"
                                                  ]
                                                }
                                                onChange={(e) =>
                                                  this.handleInputChange(
                                                    index,
                                                    "Counterparty Legal Entity Identifier",
                                                    e
                                                  )
                                                }
                                              />
                                            </div>
                                            <div className="input-generalContainer">
                                              <label className="label">
                                                Counterparty Country Of
                                                Establishment
                                              </label>
                                              <input
                                                placeholder="Type here"
                                                className="input-general"
                                                value={
                                                  counterparty[
                                                    "Counterparty Country Of Establishment"
                                                  ]
                                                }
                                                onChange={(e) =>
                                                  this.handleInputChange(
                                                    index,
                                                    "Counterparty Country Of Establishment",
                                                    e
                                                  )
                                                }
                                              />
                                            </div>

                                            <div className="input-generalContainer">
                                              <label className="label">
                                                Counterparty Rating Source Legal
                                                Entity Identifier
                                              </label>
                                              <input
                                                placeholder="Type here"
                                                className="input-general"
                                                onChange={(e) =>
                                                  this.handleInputChange(
                                                    index,
                                                    "Counterparty Rating Source Legal Entity Identifier",
                                                    e
                                                  )
                                                }
                                                value={
                                                  counterparty[
                                                    "Counterparty Rating Source Legal Entity Identifier"
                                                  ]
                                                }
                                              />
                                            </div>
                                          </div>
                                          <div className="col-12 col-sm-6 col-md-4">
                                            <div className="input-generalContainer">
                                              <label className="label">
                                                Counterparty Name
                                              </label>
                                              <input
                                                placeholder="Type here"
                                                className="input-general"
                                                onChange={(e) =>
                                                  this.handleInputChange(
                                                    index,
                                                    "Counterparty Name",
                                                    e
                                                  )
                                                }
                                                value={
                                                  counterparty[
                                                    "Counterparty Name"
                                                  ]
                                                }
                                              />
                                            </div>

                                            <div className="input-generalContainer">
                                              <label className="label">
                                                Counterparty Rating Threshold
                                              </label>
                                              <input
                                                placeholder="Type here"
                                                className="input-general"
                                                onChange={(e) =>
                                                  this.handleInputChange(
                                                    index,
                                                    "Counterparty Rating Threshold",
                                                    e
                                                  )
                                                }
                                                value={
                                                  counterparty[
                                                    "Counterparty Rating Threshold"
                                                  ]
                                                }
                                              />
                                            </div>

                                            <div className="input-generalContainer">
                                              <label className="label">
                                                Counterparty Rating Source Name
                                              </label>
                                              <input
                                                placeholder="Type here"
                                                className="input-general"
                                                onChange={(e) =>
                                                  this.handleInputChange(
                                                    index,
                                                    "Counterparty Rating Source Name",
                                                    e
                                                  )
                                                }
                                                value={
                                                  counterparty[
                                                    "Counterparty Rating Source Name"
                                                  ]
                                                }
                                              />
                                            </div>
                                          </div>

                                          <div className="col-12 col-sm-6 col-md-4">
                                            <div className="input-generalContainer">
                                              <label className="label">
                                                Counterparty Type
                                              </label>
                                              <select
                                                className="input-select-general"
                                                onChange={(e) => {
                                                  const updatedCounterparty = [
                                                    ...this.state.Counterparty,
                                                  ];
                                                  updatedCounterparty[index][
                                                    "Counterparty Type"
                                                  ] = e.target.value;
                                                  this.setState({
                                                    Counterparty:
                                                      updatedCounterparty,
                                                  });
                                                }}
                                                value={
                                                  counterparty[
                                                    "Counterparty Type"
                                                  ]
                                                }
                                              >
                                                <option value="">
                                                  Select any one
                                                </option>

                                                <option value="ABNK">
                                                  ABNK
                                                </option>
                                                <option value="BABN">
                                                  BABN
                                                </option>
                                                <option value="ABFC">
                                                  ABFC
                                                </option>
                                                <option value="ABGR">
                                                  ABGR
                                                </option>
                                                <option value="CAGT">
                                                  CAGT
                                                </option>
                                                <option value="PAYA">
                                                  PAYA
                                                </option>
                                                <option value="CALC">
                                                  CALC
                                                </option>
                                                <option value="ADMI">
                                                  ADMI
                                                </option>
                                                <option value="ADSA">
                                                  ADSA
                                                </option>
                                                <option value="RANA">
                                                  RANA
                                                </option>
                                                <option value="VERI">
                                                  VERI
                                                </option>
                                                <option value="SECU">
                                                  SECU
                                                </option>
                                                <option value="CAPR">
                                                  CAPR
                                                </option>
                                                <option value="COLL">
                                                  COLL
                                                </option>
                                                <option value="GICP">
                                                  GICP
                                                </option>
                                                <option value="IPCP">
                                                  IPCP
                                                </option>
                                                <option value="LQFP">
                                                  LQFP
                                                </option>
                                                <option value="BLQP">
                                                  BLQP
                                                </option>
                                                <option value="SVMP">
                                                  SVMP
                                                </option>
                                                <option value="ISSR">
                                                  ISSR
                                                </option>
                                                <option value="ORIG">
                                                  ORIG
                                                </option>
                                                <option value="SELL">
                                                  SELL
                                                </option>
                                                <option value="SSSP">
                                                  SSSP
                                                </option>
                                                <option value="SERV">
                                                  SERV
                                                </option>
                                                <option value="BSER">
                                                  BSER
                                                </option>
                                                <option value="BSRF">
                                                  BSRF
                                                </option>
                                                <option value="SSRV">
                                                  SSRV
                                                </option>
                                                <option value="SUBS">
                                                  SUBS
                                                </option>
                                                <option value="IRSP">
                                                  IRSP
                                                </option>
                                                <option value="BIPR">
                                                  BIPR
                                                </option>
                                                <option value="CSPR">
                                                  CSPR
                                                </option>
                                                <option value="BCSP">
                                                  BCSP
                                                </option>
                                                <option value="AUDT">
                                                  AUDT
                                                </option>
                                                <option value="CNSL">
                                                  CNSL
                                                </option>
                                                <option value="TRUS">
                                                  TRUS
                                                </option>
                                                <option value="REPN">
                                                  REPN
                                                </option>
                                                <option value="UNDR">
                                                  UNDR
                                                </option>
                                                <option value="ARRG">
                                                  ARRG
                                                </option>
                                                <option value="DEAL">
                                                  DEAL
                                                </option>
                                                <option value="MNGR">
                                                  MNGR
                                                </option>
                                                <option value="LCPR">
                                                  LCPR
                                                </option>
                                                <option value="MSCD">
                                                  MSCD
                                                </option>
                                                <option value="SSPE">
                                                  SSPE
                                                </option>
                                                <option value="LQAG">
                                                  LQAG
                                                </option>
                                                <option value="EQOC">
                                                  EQOC
                                                </option>
                                                <option value="SWNG">
                                                  SWNG
                                                </option>
                                                <option value="SULP">
                                                  SULP
                                                </option>
                                                <option value="RAGC">
                                                  RAGC
                                                </option>
                                                <option value="CASM">
                                                  CASM
                                                </option>
                                                <option value="CACB">
                                                  CACB
                                                </option>
                                                <option value="COLA">
                                                  COLA
                                                </option>
                                                <option value="SBLP">
                                                  SBLP
                                                </option>
                                                <option value="CLOM">
                                                  CLOM
                                                </option>
                                                <option value="PRTA">
                                                  PRTA
                                                </option>
                                                <option value="SUBA">
                                                  SUBA
                                                </option>
                                                <option value="OTHR">
                                                  OTHR
                                                </option>
                                              </select>
                                            </div>

                                            <div className="input-generalContainer">
                                              <label className="label">
                                                Counterparty Rating
                                              </label>
                                              <input
                                                placeholder="Type here"
                                                className="input-general"
                                                onChange={(e) =>
                                                  this.handleInputChange(
                                                    index,
                                                    "Counterparty Rating",
                                                    e
                                                  )
                                                }
                                                value={
                                                  counterparty[
                                                    "Counterparty Rating"
                                                  ]
                                                }
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <button
                                        onClick={() =>
                                          this.removeCounterParty(index)
                                        }
                                        // className={
                                        //   this.state.showcounterParty
                                        //   ? "removeButton"
                                        //   : "removeButtonmove"
                                        // }
                                        className="removeButton"
                                      >
                                        <img src={remove_circle} alt="Remove" />
                                      </button>
                                    </div>
                                  )
                                )}
                              </div>
                              <button
                                onClick={this.addNewInputCounterparty}
                                className="addButton"
                              >
                                <img src={add_circle} alt="Add" />
                              </button>
                            </div>
                          )}
                      </form>
                    </div>
                  </React.Fragment>
                </div>
              </div>

              <ReactModal
                isOpen={this.state.openModalPayment}
                contentLabel="Minimal Modal Example"
                style={{
                  overlay: {
                    backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the alpha value for desired transparency
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "fixed", // Use fixed positioning for the overlay
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 9999, // Set a high z-index to ensure the modal appears on top
                  },
                  content: {
                    position: "absolute",
                    background: "transparent", // Make the modal content transparent
                    border: "none", // Optional: Remove any borders
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    justifyContent: "center",
                    overflow: "hidden",
                  },
                }}
              >
                <React.Fragment>
                  <img
                    src={BeanEater}
                    style={{
                      width: "8vw",
                      height: "9vh",
                      backgroundColor: "transparent",
                    }}
                  />
                  <h3 className="dot-loader">Loading.Please wait</h3>
                </React.Fragment>
              </ReactModal>

              <div className="move_general">
                <div className="btn_move">
                  <button
                    className="btn_next"
                    onClick={(e) => this.showNext(e)}
                    type="submit"
                    form="myform"
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default withSnackbar(General_DealCreation);
