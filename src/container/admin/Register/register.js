/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import FormLoader from "../../../components/formLoader";
import { withTheme } from "react-jsonschema-form";
import { Theme as MuiTheme } from "rjsf-material-ui";
import LinkItem from "../../../components/linkItem";
import {
  customStylesautosmallmodal,
  customStylesautosmallmodal1,
  customStylesRegisterPopup,
} from "../../../components/customscripts/customscript";
import { withSnackbar } from "notistack";
import {
  createNewAccount,
  Register,
  updateTermsOfService,
  SetUpPoolRoles,
} from "../../../servies/services";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import ReactModal from "react-modal";
import Progress from "../../../images/progress.png";
import Completed from "../../../images/completed.png";
import GreenTick from "../../../images/greentick.png";
import MySelect from "./MySelect.js";
import { components } from "react-select";
import Select from "react-select";

const customStyle = {
  option: (provided, state) => ({
    ...provided,
    // minHeight: 20,
    // height: 20,
    color: state.isSelected ? "black" : "black",
    backgroundColor: state.isSelected ? "#eee" : "#fff",
  }),
  control: (base) => ({
    ...base,
    height: 53,
    minHeight: 53,
    fontWeight: "bold",
    borderStyle: "solid",
    border: "1px solid #212121",
    borderRadius: "8px",
    borderBottom: "1px solid #212121",
  }),
};

const Option = (props) => {
  return (
    <div>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />{" "}
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
};

const allOption = {
  label: "Select all",
  value: "*",
};
const ValueContainer = ({ children, ...props }) => {
  const currentValues = props.getValue();
  let toBeRendered = children;
  if (currentValues.some((val) => val.value === allOption.value)) {
    toBeRendered = [[children[0][0]], children[1]];
  }

  return (
    <components.ValueContainer {...props}>
      {toBeRendered}
    </components.ValueContainer>
  );
};

const MultiValue = (props) => {
  let labelToBeDisplayed = `${props.data.label} `;
  if (props.data.value === allOption.value) {
    labelToBeDisplayed = "All is selected";
  }
  return (
    <components.MultiValue {...props}>
      <span>{labelToBeDisplayed}</span>
    </components.MultiValue>
  );
};

class register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: sessionStorage.getItem("token"),
      peers: JSON.parse(sessionStorage.getItem("peers")),
      userid: sessionStorage.getItem("userid"),
      showfirstform1: true,
      showfirstform2: false,
      showfirstform3: false,
      formData1: null,
      openPopup: false,
      open1: false,
      open2: false,
      open3: false,
      subnetaccdata: [],
      showRegPopup1: false,
      showRegPopup2: false,
      showRegPopup3: false,
      // for 3/3 issuer signup
      formData: {
        organizationname: "",
        countryofregistration: "United States Of America",
        publiclytradedcompany: true,
        years: "10",
        primarybusiness: "",
        currentassetvaluation: "10,000",
        capitalraise: "$10,000",
        // servicer: true,
        // servicerValue: "",
        // underwriterPartner: true,
        // underwriterPartnerValue:"",
        // subnetacc: true,
        // subnetaccValue: "",
      },
      x: false,
      //for 2/3 signup page
      formData3: {
        FirstName: "",
        lastname: "",
        EmailAddress: "",
        Password: "",
        confirmPassword: "",
      },
      showPassword: false,
      showPassword1: false,

      //for 1/3 signup page
      formData2: {
        UserRole: "",
      },

      //for investor
      formData4: {
        organizationname: "",
        countryofregistration: "United States Of America",
        years: "10",
        currentassetvaluation: "10,000",
        // subnetacc: true,
        // subnetaccValue: "",
      },

      //for verification
      formData5: {
        organizationname: "",
        countryofregistration: "United States Of America",
        years: "10",
        // subnetacc: true,
        // subnetaccValue: "",
      },
      file: null,
      formLoader2: false,
      processorarrray: [],
      processoroption: [
        { value: "Residential Real Estate", label: "Residential Real Estate" },
        { value: "Commercial Mortgage", label: "Commercial Mortgage" },
        { value: "Corporate Loans", label: "Corporate Loans" },
        { value: "Auto Loans", label: "Auto Loans" },
        { value: "Consumer Loans", label: "Consumer Loans" },
        { value: "Credit Cards", label: "Credit Cards" },
        { value: "Leasing", label: "Leasing" },
        { value: "Esoteric", label: "Esoteric" },
        { value: "Non Performing Loans", label: "Non Performing Loans" },
        {
          value: "Asset Backed Commercial Papers",
          label: "Asset Backed Commercial Papers",
        },
        {
          value: "Other",
          label: "Other",
        },
      ],
    };
    this.handleFileUpload = this.handleFileUpload.bind(this);
  }
  handleFileUpload = (e) => {
    const file = e.target.files[0];
    this.setState({ file }, () => {
      this.updateFileUpload();
    });
  };
  updateFileUpload = async () => {
    this.setState({
      formLoader2: true,
    });
    let name = sessionStorage.getItem("organization");
    const newdata = new FormData();
    newdata.append("userid", this.state.userid);
    newdata.append("filename", this.state.file);
    newdata.append("organizationname", name);
    const APIResponse = await updateTermsOfService(newdata);
    if (APIResponse.status === 200) {
      this.setState({ formLoader: false });
      this.onOpenModal2();
    } else {
      this.setState({ formLoader2: false });
      const message = "Something went wrong";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  handleChange = (selected) => {
    this.setState({
      processorarrray: selected,
    });
    console.log("selecteddd", selected);
  };
  onCloseModalpopup = () => {
    this.setState({
      open1: true,
    });
  };
  handleOnClick = (e) => {
    this.setState({
      formData3: { ...this.state.formData3, Password: e.target.value },
    });
  };
  handleOnClick1 = (e) => {
    this.setState({
      formData3: { ...this.state.formData3, confirmPassword: e.target.value },
    });
    this.setState({ showErrMsg: true });
  };

  handleClickNext = () => {
    this.setState({ open1: false });
  };

  handleButtonClick = () => {
    this.setState((prevState) => ({
      showPassword: !prevState.showPassword,
    }));
  };
  handleButtonClick1 = () => {
    this.setState((prevState) => ({
      showPassword1: !prevState.showPassword1,
    }));
  };

  SetUpPoolRoles = async () => {
    var data = {};
    data.token = this.state.token;
    const APIResponse = await SetUpPoolRoles(data);
    if (APIResponse.status === 200) {
      console.log("SetUpPoolRoles--", APIResponse.data);
      this.setState({ RegisterData: APIResponse.data });
    } else {
      const message = "Couldn't fetch the record";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  async componentDidMount() {
    this.SetUpPoolRoles();
  }
  onOpenModal = () => {
    console.log("inside modal1");
    this.setState({ open1: true });
  };

  onCloseModal = () => {
    this.setState({ open1: false });
  };

  onOpenModal1 = (userid) => {
    console.log("terms and services");
    this.setState({ open2: true, userid: userid });
  };

  onCloseModal1 = () => {
    this.setState({ open2: false });
  };

  onOpenModal2 = () => {
    console.log("confirm mail");
    this.setState({ open3: true, open2: false });
  };

  onCloseModal2 = () => {
    this.setState({ open3: false });
  };

  onSubmit1 = (e) => {
    e.preventDefault();
    console.log(this.state.formData2);
    console.log("hello we have clicked the button");
    this.setState({
      showfirstform1: false,
      showfirstform2: true,
      showfirstform3: false,
      formData3: [],
    });
    sessionStorage.setItem("userrole", this.state.formData2.UserRole);
  };

  setKycdata = () => {
    if (this.state.formData2.UserRole === "Issuer") {
      if (
        this.state.formData.countryofregistration ===
          "United States Of America" &&
        this.state.formData.publiclytradedcompany === true
      ) {
        sessionStorage.setItem("kyctype", "type1");
      } else if (
        this.state.formData.countryofregistration ===
          "United States Of America" &&
        this.state.formData.publiclytradedcompany === false
      ) {
        sessionStorage.setItem("kyctype", "type2");
      } else {
        sessionStorage.setItem("kyctype", "type3");
      }
    } else if (this.state.formData2.UserRole === "Investor") {
      if (
        this.state.formData4.countryofregistration ===
        "United States Of America"
      ) {
        sessionStorage.setItem(
          "organization",
          this.state.formData4.organizationname
        );
        sessionStorage.setItem("kyctype", "type1");
      } else {
        sessionStorage.setItem(
          "organization",
          this.state.formData4.organizationname
        );
        sessionStorage.setItem("kyctype", "type2");
      }
    } else {
      sessionStorage.setItem("kyctype", "type1");
    }
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.formData2.UserRole == "Issuer") {
      sessionStorage.setItem(
        "organization",
        this.state.formData.organizationname
      );
    } else if (this.state.formData2.UserRole == "Investor") {
      sessionStorage.setItem(
        "organization",
        this.state.formData4.organizationname
      );
    } else {
      sessionStorage.setItem(
        "organization",
        this.state.formData5.organizationname
      );
    }
    this.setKycdata();
    this.Register();
    // if(this.state.formData2.UserRole == 'Issuer'){
    //   console.log(this.state.formData);

    //   if (this.state.formData.subnetacc == false) {
    //     this.newaccount();
    //   } else {
    //     this.existingaccount();
    //   }
    // }

    // else if(this.state.formData2.UserRole == 'Investor'){
    //   console.log(this.state.formData4);

    //   if (this.state.formData4.subnetacc == false) {
    //     this.newaccount();
    //   } else {
    //     this.existingaccount();
    //   }
    // }

    // else{
    //   console.log(this.state.formData5);

    //   if (this.state.formData5.subnetacc == false) {
    //     this.newaccount();
    //   } else {
    //     this.existingaccount();
    //   }
    // }
  };

  newaccount = async () => {
    var data = {
      username: this.state.formData3.EmailAddress,
      password: this.state.formData3.Password,
      token: this.state.token, //one
    };
    this.setState({ open1: true, showRegPopup1: true });
    console.log("GetAllPools---" + JSON.stringify(data));
    this.setState({ formLoader: true });
    const APIResponse = await createNewAccount(data);

    console.log(APIResponse);
    if (APIResponse.status !== 200) {
      const message = "Something went wrong, please try again";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 5000,
      });
      this.setState({ formLoader: false, showRegPopup1: false });
    } else {
      this.setState({ formLoader: true });
      this.setState({
        showRegPopup1: false,
        showRegPopup2: true,
        subnetaccdata: APIResponse,
      });
      setTimeout(() => {
        this.setState({ showRegPopup2: false, showRegPopup3: true });
        this.Register();
      }, 2000);
    }
  };

  existingaccount = async () => {
    let onsubmitdata;
    if (this.state.formData2.UserRole == "Issuer") {
      onsubmitdata = {
        username: this.state.formData3.EmailAddress,
        password: this.state.formData3.Password,
        cchainaddress: this.state.formData.subnetaccValue,
        token: this.state.token, //two
      };
    } else if (this.state.formData2.UserRole == "Investor") {
      onsubmitdata = {
        username: this.state.formData3.EmailAddress,
        password: this.state.formData3.Password,
        cchainaddress: this.state.formData4.subnetaccValue,
        token: this.state.token, //three
      };
    } else {
      onsubmitdata = {
        username: this.state.formData3.EmailAddress,
        password: this.state.formData3.Password,
        cchainaddress: this.state.formData5.subnetaccValue,
        token: this.state.token, //four
      };
    }
    console.log("GetAllPools---" + JSON.stringify(onsubmitdata));
    this.setState({ formLoader: true });
    const APIResponse = await createNewAccount(onsubmitdata);
    console.log(APIResponse);
    if (APIResponse.status !== 200) {
      const message = "Something went wrong, please try again";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 5000,
      });
      this.setState({ formLoader: false });
    } else {
      this.setState({ formLoader: true });
      this.setState({ subnetaccdata: APIResponse });
      this.Register();
      this.setpoupnextpage();
    }
  };

  updateTermsOfServiceDisagree = async () => {
    this.setState({ formLoader1: true });
    var data = {
      userid: this.state.userid,
      termsofservice: "Disagree",
    };
    console.log("datata", data);
    const APIResponse = await updateTermsOfService(data);

    if (APIResponse.status === 200) {
      this.setState({ formLoader1: false });
      this.props.history.push("/");
    } else {
      this.setState({ formLoader1: false });
      const message = "Something went wrong";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  updateTermsOfService = async () => {
    let name = sessionStorage.getItem("organization");
    this.setState({ formLoader: true });
    var data = {
      userid: this.state.userid,
      termsofservice: "Agree",
      organizationname: name,
    };
    console.log("datata", data);
    const APIResponse = await updateTermsOfService(data);

    if (APIResponse.status === 200) {
      this.setState({ formLoader: false });
      this.onOpenModal2();
    } else {
      this.setState({ formLoader: false });
      const message = "Something went wrong";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  Register = async () => {
    const { formData2, formData3, formData, formData4, formData5 } = this.state;
    // var data ={
    //   "UserAccAddress": this.state.subnetaccdata.data.address
    // }
    let newData;
    if (this.state.formData2.UserRole == "Issuer") {
      let proc = [];
      newData = {
        ...formData2,
        ...formData3,
        ...formData,
        token: this.state.token,
      };
      this.state.processorarrray.forEach(function (key, value) {
        console.log("key", key.userid);
        console.log("value", value);
        if (key.value !== "*") {
          proc.push(key.value);
        }
      });
      console.log(this.state.processorarrray);
      console.log("arrayproc", proc.join(","));
      newData.primarybusiness = proc.join(",");
    } else if (this.state.formData2.UserRole == "Investor") {
      let proc = [];
      newData = {
        ...formData2,
        ...formData3,
        ...formData4,
        token: this.state.token,
      };
      this.state.processorarrray.forEach(function (key, value) {
        console.log("key", key.userid);
        console.log("value", value);
        if (key.value !== "*") {
          proc.push(key.value);
        }
      });
      console.log(this.state.processorarrray);
      console.log("arrayproc", proc.join(","));
      newData.preferredassetclass = proc.join(",");
    } else {
      newData = {
        ...formData2,
        ...formData3,
        ...formData5,
        token: this.state.token,
      };
    }
    console.log("GetAllPools---" + JSON.stringify(newData));
    this.setState({ formLoader: true });
    const APIResponse = await Register(newData);
    console.log(APIResponse);
    if (APIResponse.status !== 200) {
      const message = "Something went wrong, please try again";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 5000,
      });
      this.setState({ formLoader: false });
    } else {
      const message = "User Registered successfully!";
      this.props.enqueueSnackbar(message, {
        variant: "info",
        autoHideDuration: 1000,
      });
      this.setState({ formLoader: false });
      this.onOpenModal1(APIResponse.data.UserId);
      // this.onOpenModal1()
      // sessionStorage.setItem('userid',APIResponse.data.UserId)
      // this.setpoupnextpage()
      // this.state.formData2.UserRole == "Issuer" ? this.state.formData.publiclytradedcompany == true ? this.setpoupnextpage1() : this.setpoupnextpage() : this.setpoupnextpage()
    }
  };

  // setpoupnextpage = () =>{
  //   this.props.history.push('/popup1')
  // }
  loginPage = () => {
    this.props.history.push("/");
  };
  // setpoupnextpage1 = () =>{
  //   this.props.history.push('/popupverifymail')
  // }

  download = () => {
    console.log(
      "subnet",
      this.state.subnetaccdata.subnet,
      "subhhh",
      this.state.subnetaccdata
    );
    var res = this.state.subnetaccdata.data.subnet;
    const file_name = "subnet" + ".csv";
    console.log(res.subnet);
    startDownload(JSON.stringify(res), file_name);
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

  popupclose = () => {
    this.setState({ showRegPopup3: false });
    this.setpoupnextpage();
  };

  onSubmit2 = (e) => {
    e.preventDefault();
    const fullname = `${this.state.formData3.FirstName} ${this.state.formData3.lastname}`;
    sessionStorage.setItem("fullname", fullname);
    this.state.formData3.Password === this.state.formData3.confirmPassword &&
    (this.state.secondFormEmailErrorMsg === null ||
      this.state.secondFormEmailErrorMsg === "") &&
    (this.state.secondFormPasswordErrorMsg === "" ||
      this.state.secondFormPasswordErrorMsg === null)
      ? this.myfunc()
      : alert("Enter Valid Inputs");
  };

  myfunc = () => {
    console.log(this.state.formData3);
    console.log(this.state.RegisterData.Issuer);
    let flag = 0;
    let Datakeys = Object.keys(this.state.RegisterData);
    // for (let i = 0; i < Datakeys.length; i++) {
    //   for (let j = 0; j < this.state.RegisterData[Datakeys[i]].length; j++) {
    //     if (this.state.RegisterData[Datakeys[i]][j].EmailAddress.includes(this.state.formData3.EmailAddress) == true) {
    //       console.log("email exists");
    //       const message = "Email Already Exists";
    //       this.props.enqueueSnackbar(message, {
    //         variant: "error",
    //         autoHideDuration: 1000,
    //       });
    //       flag = 1;
    //       break;
    //     }
    //   }
    // }
    for (let i = 0; i < Datakeys.length; i++) {
      for (let j = 0; j < this.state.RegisterData[Datakeys[i]].length; j++) {
        const existingEntry = this.state.RegisterData[Datakeys[i]][j];
        if (
          existingEntry.EmailAddress === this.state.formData3.EmailAddress &&
          existingEntry.UserRole === this.state.formData2.UserRole
        ) {
          console.log("Email with the same user role exists");
          const message = "Email Already Exists for the same user role";
          this.props.enqueueSnackbar(message, {
            variant: "error",
            autoHideDuration: 1000,
          });
          flag = 1;
          break;
        }
      }
    }
    if (flag == 0) {
      console.log("email not exists");
      console.log("hello we have clicked the button");
      this.setState({
        showfirstform1: false,
        showfirstform2: false,
        showfirstform3: true,
      });
    }

    //   this.state.RegisterData.Issuer.forEach((key, value) =>{
    //     if (key.EmailAddress.includes(this.state.formData3.EmailAddress) == true) {
    //       console.log("key", key);
    //       console.log("value", value);
    //       console.log('email exists')
    //    const message = "Email Already Exists";
    //     this.props.enqueueSnackbar(message, {
    //       variant: "error",
    //       autoHideDuration: 1000,
    //     });
    //     return false;
    //   }
    //   else{
    //     console.log('email not exists')
    //     console.log("hello we have clicked the button");
    //     this.setState({
    //       showfirstform1: false,
    //       showfirstform2: false,
    //       showfirstform3: true,
    //     });
    //   }
    // });
    // this.state.RegisterData.Issuer.forEach(function (key, value) {
    //   if (key.EmailAddress.includes(this.state.formData3.EmailAddress) == true) {
    //     console.log("key", key.EmailAddress);
    //     console.log("value", value);
    //     console.log('email exist')

    //   }
    //   else{
    //     console.log('email not exist')
    //   }
    // })
  };

  // onSubmit5 = (e) => {
  //   e.preventDefault();
  //   console.log(this.state.formData4);
  //   if (this.state.formData4.subnetacc == false) {
  //     this.newaccount();
  //   } else {
  //     this.existingaccount();
  //   }
  // };
  // onSubmit6 = (e) => {
  //   e.preventDefault();
  //   console.log(this.state.formData5);
  //   if (this.state.formData5.subnetacc == false) {
  //     this.newaccount();
  //   } else {
  //     this.existingaccount();
  //   }
  // };

  // onSubmit3 =() =>{
  //   this.props.history.push({
  //     pathname: '/popup1'
  //   });
  // }

  // onSubmit4 =() =>{
  //   this.props.history.push({
  //     pathname: '/popup1'
  //   });
  // }

  handleClick = () => {
    console.log("hello we have clicked the button");
    this.setState({
      showfirstform1: true,
      showfirstform2: false,
      showfirstform3: false,
    });
  };
  handleClicks = () => {
    console.log("hello we have clicked the button");
    this.setState({
      showfirstform1: false,
      showfirstform2: true,
      showfirstform3: false,
    });
  };

  firstform = () => {
    return (
      <React.Fragment>
        {this.state.loading === true ? <FormLoader></FormLoader> : ""}
        <div className="topcontent">
          <h2 className="text-center heading1">Create an Account</h2>
        </div>
        <div className="register1__title-container">
          <h5 className="heading2">Type of User</h5>
          <i>
            <b>1</b>/3
          </i>
        </div>
        <div className="outer-form-container">
          <form className="form-container" onSubmit={this.onSubmit1}>
            <div className="input-container">
              <label className="label">Role</label>
              <select
                required
                placeholder="select any one"
                className="input-select"
                onChange={(e) => {
                  this.setState({
                    formData2: {
                      ...this.state.formData2,
                      UserRole: e.target.value,
                    },
                  });
                }}
                value={this.state.formData2.UserRole}
              >
                <option value="" disabled className="selectclass">
                  Select any one{" "}
                </option>
                <option value="Issuer">Issuer</option>
                <option value="Investor">Investor</option>
                <option value="Servicer">Servicer</option>
                <option value="Verification">Verification Agent</option>
                {/* <option value="Custodian">Custodian</option> */}
                <option value="Underwriter">Underwriter</option>
                {/* <option value="Trustee">Trustee</option> */}
                {/* <option value="Brokerr/Dealer">Broker/Dealer</option> */}
                <option value="Paying Agent">Paying Agent</option>
                <option value="Rating Agency">Rating Agency</option>
              </select>
            </div>

            <div id="form-btn">
              <div className="container-fluid text-center">
                <div className="row d-flex justify-content-center align-items-center">
                  <Button variant="contained" color="primary" type="submit">
                    {" "}
                    Next
                    {this.state.formLoader === true ? (
                      <CircularProgress size="25px" color="primary" />
                    ) : (
                      ""
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div>
          <p className="login-sign-up-para">
            <Link to={"/"} className="login-sign_up-link">
              Sign In
            </Link>
            , If you already have an account
          </p>
        </div>

        <React.Fragment></React.Fragment>
      </React.Fragment>
    );
  };

  thirdFormNumberValidate = () => {
    const { years } = this.state.formData;
    const NumberValid = years.match(/^[0-9]*$/i);
    if (NumberValid) {
      this.setState({ thirdFormNumberErrorMsg: "" });
    } else {
      this.setState({ thirdFormNumberErrorMsg: "Enter only digits" });
    }
  };

  thirdFormHandleChangeNumber = (e) => {
    this.setState(
      {
        formData: {
          ...this.state.formData,
          years: e.target.value,
        },
      },
      this.thirdFormNumberValidate
    );
  };
  blockInvalidChar = (e) => {
    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();
  };

  secondFormEmailValidate = () => {
    const { EmailAddress } = this.state.formData3;
    const emailValid = EmailAddress.match(
      /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i
    );
    if (emailValid) {
      this.setState({ secondFormEmailErrorMsg: "" });
    } else {
      this.setState({
        secondFormEmailErrorMsg: "Enter valid main ,ex- emailadd@email.com ",
      });
    }
  };

  secondFormHandleChangeEmail = (e) => {
    this.setState(
      {
        formData3: {
          ...this.state.formData3,
          EmailAddress: e.target.value,
        },
      },
      this.secondFormEmailValidate
    );
  };

  secondFormPasswordValidate = () => {
    const { Password } = this.state.formData3;
    const PasswordValid = Password.match(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,16}$/gm
    );
    if (PasswordValid) {
      this.setState({ secondFormPasswordErrorMsg: "" });
    } else {
      this.setState({
        secondFormPasswordErrorMsg:
          "Password should contain Minimum 6 and Maximum 16 characters, at least 1 Uppercase Alphabet, 1 Lowercase Alphabet, 1 Number and 1 Special Character",
      });
    }
  };

  secondFormHandleChangePassword = (e) => {
    this.setState(
      {
        formData3: { ...this.state.formData3, Password: e.target.value },
      },
      this.secondFormPasswordValidate
    );
  };

  secondform = () => {
    return (
      <React.Fragment>
        {this.state.loading === true ? <FormLoader></FormLoader> : ""}
        <div className="topcontent1">
          <h2 className="text-center heading1">Create an Account</h2>
        </div>

        <div className="register1__title-container">
          <KeyboardBackspaceIcon
            className="left-arrow-mui"
            style={{ fontSize: "2rem", marginTop: "-3px" }}
            onClick={this.handleClick}
          ></KeyboardBackspaceIcon>

          <div className="register1__title-container1">
            <h5>{this.state.formData2.UserRole} Admin's details</h5>
            <i>
              <b>2</b>/3
            </i>
          </div>
        </div>
        <div className="outer-form-container">
          <form className="form-container" onSubmit={this.onSubmit2}>
            {/* <div className="input-container">
              <label className="label">First Name</label>
              <input
                required
                placeholder="Type here"
                className="input"
                type="text"
                // onChange={(e) => {
                //   this.setState({
                //     formData3: {
                //       ...this.state.formData3,
                //       FirstName: e.target.value,
                //     },
                //   });
                // }}
                onChange={(e) => {
                  const regex = /^[a-zA-Z]+$/; // Regex to match alphabets
                  const input = e.target.value;
                  if (regex.test(input) || input === "") {
                      // If input matches alphabets or input is empty, update state
                      this.setState({
                          formData3: {
                              ...this.state.formData3,
                              FirstName: input,
                          },
                          error: "" // Clear error message
                      });
                  } else {
                      // If input contains invalid characters, show error message
                      this.setState({
                          error: "Only alphabets are allowed."
                      });
                  }
              }}
                value={this.state.formData3.FirstName}
              // required
              />
                 {this.state.error && <div className="error-message">{this.state.error}</div>}

            </div> */}
            <div className="input-container">
              <label className="label">First Name</label>
              <input
                required
                placeholder="Type here"
                className="input"
                type="text"
                onKeyDown={(e) => {
                  const key = e.key;
                  const regex = /^[a-zA-Z]+$/; // Regex to match alphabets
                  if (
                    !regex.test(key) &&
                    key !== "Backspace" &&
                    key !== "Delete" &&
                    key !== "ArrowLeft" &&
                    key !== "ArrowRight"
                  ) {
                    // Prevent typing if the key is not an alphabet, Backspace, Delete, ArrowLeft, or ArrowRight
                    e.preventDefault();
                    this.setState({
                      error: "Only alphabets are allowed.",
                    });
                  } else {
                    this.setState({
                      error: "", // Clear error message
                    });
                  }
                }}
                onChange={(e) => {
                  const regex = /^[a-zA-Z]+$/; // Regex to match alphabets
                  const input = e.target.value;
                  if (regex.test(input) || input === "") {
                    // If input matches alphabets or input is empty, update state
                    this.setState({
                      formData3: {
                        ...this.state.formData3,
                        FirstName: input,
                      },
                      error: "", // Clear error message
                    });
                  } else {
                    // If input contains invalid characters, show error message
                    this.setState({
                      error: "Only alphabets are allowed.",
                    });
                  }
                }}
                value={this.state.formData3.FirstName}
              />
              {this.state.error && (
                <div className="error-message">{this.state.error}</div>
              )}
            </div>

            <div className="input-container">
              <label className="label">Last Name</label>
              <input
                required
                placeholder="Type here"
                className="input"
                type="text"
                onChange={(e) => {
                  const regex = /^[a-zA-Z]+$/; // Regex to match alphabets
                  const input = e.target.value;
                  if (regex.test(input) || input === "") {
                    // If input matches alphabets or input is empty, update state
                    this.setState({
                      formData3: {
                        ...this.state.formData3,
                        lastname: input,
                      },
                      errorLastName: "", // Clear error message
                    });
                  } else {
                    // If input contains invalid characters, show error message
                    this.setState({
                      errorLastName: "Only alphabets are allowed.",
                    });
                  }
                }}
                value={this.state.formData3.lastname}
              />
              {this.state.errorLastName && (
                <div className="error-message">{this.state.errorLastName}</div>
              )}
            </div>

            <div className="input-container">
              <label className="label">Email Address</label>
              <input
                required
                placeholder="Type here"
                className="input"
                type="text"
                onChange={this.secondFormHandleChangeEmail}
                value={this.state.formData3.EmailAddress}
              />
              {this.state.secondFormEmailErrorMsg === null ||
              this.state.secondFormEmailErrorMsg === "" ? null : (
                <p className="error-msg">
                  {this.state.secondFormEmailErrorMsg}
                </p>
              )}
            </div>

            <div className="input-container">
              <label className="label">Password</label>
              <div className="flex input">
                <input
                  required
                  placeholder="Type here"
                  className="input-none"
                  type={this.state.showPassword ? "text" : "Password"}
                  onChange={this.secondFormHandleChangePassword}
                  value={this.state.formData3.Password}
                />
                <button
                  type="button"
                  className="eye-btn"
                  onClick={this.handleButtonClick}
                >
                  { !this.state.formData3.Password  ? (
                    <VisibilityIcon className="disabled" />
                  ) : this.state.showPassword ? (
                    <VisibilityOffIcon />
                  ) : (
                    <VisibilityIcon />
                  )}
                </button>
              </div>
              {this.state.secondFormPasswordErrorMsg === null ||
              this.state.secondFormPasswordErrorMsg === "" ? null : (
                <p className="error-msg">
                  {this.state.secondFormPasswordErrorMsg}
                </p>
              )}
            </div>

            <div className="input-container">
              <label className="label">Confirm Password</label>
              <div className="flex input">
                <input
                  required
                  placeholder="Type here"
                  className="input-none"
                  type={this.state.showPassword1 ? "text" : "Password"}
                  onChange={this.handleOnClick1}
                  value={this.state.formData3.confirmPassword}
                />
                <button
                  type="button"
                  className="eye-btn"
                  onClick={this.handleButtonClick1}
                >
                  { !this.state.formData3.confirmPassword  ? (
                    <VisibilityIcon className="disabled" />
                  ) : this.state.showPassword1 ? (
                    <VisibilityOffIcon />
                  ) : (
                    <VisibilityIcon />
                  )}
                </button>
              </div>

              {this.state.showErrMsg && (
                <div className="error-msg-container">
                  {this.state.formData3.Password ===
                  this.state.formData3.confirmPassword ? null : (
                    <p className="error-msg">Do not match with Password</p>
                  )}
                </div>
              )}
            </div>

            <div id="form-btn">
              <div className="container-fluid text-center">
                <div
                  className="row d-flex justify-content-center align-items-center"
                  style={{ marginBottom: "6rem" }}
                >
                  <Button variant="contained" color="primary" type="submit">
                    {" "}
                    Next
                    {this.state.formLoader === true ? (
                      <CircularProgress size="25px" color="primary" />
                    ) : (
                      ""
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="loginCheckbox">
          <p className="login-sign-up-para">
            <Link to={"/"} className="login-sign_up-link">
              Sign In
            </Link>
            , If you already have an account
          </p>
        </div>

        <React.Fragment></React.Fragment>
      </React.Fragment>
    );
  };

  thirdform = () => {
    return (
      <React.Fragment>
        {this.state.loading === true ? <FormLoader></FormLoader> : ""}
        <div className="topcontent1">
          <h2 className="text-center heading1">Create an Account</h2>
        </div>

        <div className="register1__title-container">
          <div>
            <KeyboardBackspaceIcon
              className="left-arrow-mui"
              style={{ fontSize: "2rem", marginTop: "-3px" }}
              onClick={this.handleClicks}
            ></KeyboardBackspaceIcon>
          </div>

          <div className="register1__title-container1">
            <h5 className="heading2">
              {this.state.formData2.UserRole} details
            </h5>
            <i>
              <b>3</b>/3
            </i>
          </div>
        </div>
        <div className="outer-form-container">
          <form className="form-container" onSubmit={this.onSubmit}>
            <div className="input-container">
              <label className="label">Organization Name</label>
              <input
                required
                placeholder="Type here"
                className="input"
                type="text"
                onChange={(e) => {
                  this.setState({
                    formData: {
                      ...this.state.formData,
                      organizationname: e.target.value,
                    },
                  });
                }}
                value={this.state.formData.organizationname}
                // required
              />
            </div>

            <div className="input-container">
              <label className="label">Country of Registration</label>
              <select
                required
                className="input-select"
                onChange={(e) => {
                  this.setState({
                    formData: {
                      ...this.state.formData,
                      countryofregistration: e.target.value,
                    },
                  });
                }}
                value={this.state.formData.countryofregistration}
              >
                <option value="United States Of America">
                  United States of America
                </option>
                <option value="Non United States Of America">
                  Non United States of America
                </option>
              </select>
            </div>

            <div className="input-container">
              <label className="label">
                Is this a Publicly traded company?
              </label>
              <div className="flex-radio">
                <label className="label-radio-container">
                  Yes
                  <input
                    id="traded1"
                    type="radio"
                    name="publiclytradedcompany"
                    value={true}
                    checked={this.state.formData.publiclytradedcompany}
                    onChange={(e) => {
                      this.setState({
                        formData: {
                          ...this.state.formData,
                          publiclytradedcompany: true,
                        },
                      });
                    }}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="label-radio-container">
                  No
                  <input
                    id="traded2"
                    type="radio"
                    // className="simple-container"
                    name="publiclytradedcompany"
                    value={false}
                    onChange={(e) => {
                      this.setState({
                        formData: {
                          ...this.state.formData,
                          publiclytradedcompany: false,
                        },
                      });
                    }}
                  />
                  <span className="checkmark"></span>
                </label>
              </div>
            </div>

            <div className="input-container">
              <label className="label">Years in Operation</label>
              <div className="flex input">
                <input
                  required
                  placeholder="Type here"
                  className="input-none"
                  type="number"
                  onKeyDown={this.blockInvalidChar}
                  onChange={this.thirdFormHandleChangeNumber}
                  value={this.state.formData.years}
                />
                <p>Years</p>
              </div>
              {this.state.thirdFormNumberErrorMsg === null ||
              this.state.thirdFormNumberErrorMsg === "" ? null : (
                <p className="error-msg">
                  {this.state.thirdFormNumberErrorMsg}
                </p>
              )}
            </div>

            <div className="input-container">
              <label className="label">Primary Business</label>
              <Select
                isMulti
                name="colors"
                className="basic-multi-select"
                classNamePrefix="select"
                options={this.state.processoroption}
                placeholder="Type here"
                // closeMenuOnSelect={false}
                // hideSelectedOptions={false}
                components={{
                  Option,
                  // MultiValue,
                  // ValueContainer,
                }}
                onChange={this.handleChange}
                value={this.state.processorarrray}
              />
              {/* <select
              required
              className="input-select"
              onChange={(e) => {
                this.setState({
                  formData: {
                    ...this.state.formData,
                    primarybusiness: e.target.value,
                  },
                });
              }}
              value={this.state.formData.primarybusiness}
            >
             <option value="" disabled>Select any one</option>
             <option value="Residential Real Estate">Residential Real Estate</option>
                          <option value="Commercial Mortgage">Commercial Mortgage</option>
                          <option value="Corporate Loans">Corporate Loans</option>
                          <option value="Auto Loans">Auto Loans</option>
                          <option value="Consumer Loans">Consumer Loans</option>
                          <option value="Credit Cards">Credit Cards</option>
                          <option value="Leasing">Leasing</option>
                          <option value="Esoteric">Esoteric</option>
                          <option value="Non Performing Loans">Non Performing Loans</option>
                          <option value="Asset Backed Commercial Papers">Asset Backed Commercial Papers</option>
            </select> */}
            </div>

            {/* <div className="input-container">
            <label className="label">Current Asset Valuation</label>
            <div className="flex input">
              <div className="doller-input">
              <p>$</p>
              <input
                required
                placeholder='Type here'
                className="input-none"
                type="text"
                onChange={(e) => {
                  this.setState({
                    formData: {
                      ...this.state.formData,
                      currentassetvaluation: e.target.value
                    }
                  });
                }}
                value={this.state.formData.currentassetvaluation}
              />
              </div>
              <p>USD</p>
            </div>
          </div> */}

            {/* <div className="input-container">
            <label className="label">
              Target Amount of Offering/ Capital Raise
            </label>
            <div className="flex input">
              <input
                required
                placeholder='Type here'
                className="input-none"
                type="text"
                onChange={(e) => {
                  this.setState({
                    formData: {
                      ...this.state.formData,
                      capitalraise: e.target.value
                    }
                  });
                }}
                value={this.state.formData.capitalraise}
              />
              <p>USD</p>
            </div>
          </div> */}

            {/* <div className="input-container">
            <label className="label">Assigned any Servicer?</label>
            <div className="flex-radio">
              <label className="label-radio-container">
                Yes
               
                <input
          checked={this.state.formData.servicer}
                  type="radio"
                  name="servicer"
                  value={this.state.formData.servicer}
                  onChange={(e) => {
                    console.log('xxxxxxxxxxxxxx',this.state.x)
                    this.setState({
                      x:true,
                      formData: {
                        ...this.state.formData,
                        servicer: true
                      }
                    });
                  }}
                />
                <span className="checkmark"></span>
              </label>
             
              <label className="label-radio-container">
                No
                <input
              
                  type="radio"
                  // className="simple-container"
                  name="servicer"
                  value={false}
                  onChange={(e) => {
                    this.setState({
                      x:false,
                      formData: {
                        ...this.state.formData,
                        servicer: false
                      }
                    });
                  }}
                />
                <span className="checkmark"></span>
              </label>
              
            </div> */}
            {/* {this.state.formData.servicer === "true" &&
              this.state.formData.servicer ? (
                <input
                  placeholder='Type the Name here'
                  className="input"
                  type="text"
                  onChange={(e) => console.log(e.target.value)}
                />
              ) : null} */}
            {/* {this.state.formData.servicer && (
                <input
                  placeholder='Type the Name here'
                  className="input"
                  type="text"
                  value={this.state.formData.servicerValue}
                onChange={(e) => {
                  this.setState({
                    formData: {
                      ...this.state.formData,
                      servicerValue: e.target.value
                    }
                  });
                }}
              />
                
              )}
          </div> */}

            {/* <div className="input-container">
            <label className="label">Assigned any Underwriter Partner?</label>
            <div className="flex-radio">
              <label className="label-radio-container">
                Yes
               
                <input
                  checked={this.state.formData.underwriterPartner}
                  type="radio"
                  name="underwriterPartner"
                  value={this.state.formData.underwriterPartner}
                  onChange={(e) => {
                    this.setState({
                      formData: {
                        ...this.state.formData,
                        underwriterPartner: true
                      }
                    });
                  }}
                />
                <span className="checkmark"></span>
              </label>
             
              <label className="label-radio-container">
                No
                <input
                  type="radio"
                  // className="simple-container"
                  name="underwriterPartner"
                  value={false}
                  onChange={(e) => {
                    this.setState({
                      formData: {
                        ...this.state.formData,
                        underwriterPartner: false
                      }
                    });
                  }}
                />
                <span className="checkmark"></span>
              </label>
            
            </div>
            {this.state.formData.underwriterPartner && (
                <input 
                  placeholder='Type the Name here'
                  className="input"
                  type="text"
                  value={this.state.formData.underwriterPartnerValue}
                  onChange={(e) => {
                    this.setState({
                      formData: {
                        ...this.state.formData,
                        underwriterPartnerValue: e.target.value
                      }
                    });
                  }}
                />
              
            )}
          </div> */}

            {/* <div className="input-container">
            <label className="label">Active Avalanche C-Chain?</label>
            <div className="flex-radio">
              <label className="label-radio-container">
                Yes
                <input
                  type="radio"
                  name="subnetacc"
                  value={this.state.formData.subnetacc}
                  checked={this.state.formData.subnetacc}
                  onChange={(e) => {
                    this.setState({
                      formData: {
                        ...this.state.formData,
                        subnetacc: true,
                      },
                    });
                  }}
                />
                <span className="checkmark"></span>
              </label>
              <label className="label-radio-container">
                No
                <input
                  type="radio"
                  // className="simple-container"
                  name="subnetacc"
                  value={false}
                  onChange={(e) => {
                    this.setState({
                      formData: {
                        ...this.state.formData,
                        subnetacc: false,
                      },
                    });
                  }}
                />
                <span className="checkmark"></span>
              </label>
            </div>
            {this.state.formData.subnetacc && (
              <input
                required
                placeholder="Type the Name here"
                className="input"
                type="text"
                value={this.state.formData.subnetaccValue}
                onChange={(e) => {
                  this.setState({
                    formData: {
                      ...this.state.formData,
                      subnetaccValue: e.target.value,
                    },
                  });
                }}
              />
            )}
          </div> */}
            <div id="form-btn">
              <div className="container-fluid text-center">
                <div className="row d-flex justify-content-center align-items-center">
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    style={{ marginBottom: "1rem" }}
                  >
                    {" "}
                    Register
                    {this.state.formLoader === true ? (
                      <CircularProgress size="25px" color="primary" />
                    ) : (
                      ""
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* modal popup starts here */}

        {this.state.open1 && this.renderPopup()}

        {/* modal popup ends here */}

        <div className="loginCheckbox">
          <p className="login-sign-up-para">
            <Link to={"/"} className="login-sign_up-link">
              Sign In
            </Link>
            , If you already have an account
          </p>
        </div>

        <React.Fragment></React.Fragment>
      </React.Fragment>
    );
  };

  renderPopUpStep1 = () => {
    return (
      <div>
        <h3 className="popupheadingabc">Creating Your Subnet Account</h3>
        <div className="popup-center">
          <img alt="in progress" src={Progress} className="popup-progress" />
          <p className="card1__title">In Progress...</p>
        </div>
      </div>
    );
  };

  renderPopUpStep2 = () => {
    return (
      <div>
        <h3 className="popupheadingabc">Creating Your Subnet Account</h3>
        <div className="popup-center">
          <img alt="in progress" src={Completed} className="popup-progress" />
          <p className="card1__title">
            <img alt="checked" src={GreenTick} className="green-tick" />
            Successfully Completed
          </p>
        </div>
        {/* <button type='button' className="closePopup" style={{ minWidth: '30px' }} onClick={this.onCloseModal}> <CloseIcon></CloseIcon> </button> */}
      </div>
    );
  };

  renderPopUpStep3 = () => (
    <div className="render-popup-3">
      <h3 className="popupheadingabc">Subnet account has been created!</h3>
      <p className="card1__title">
        You have to download the Private Key and save in your computer or in a
        Hardware Wallet. This Key can be used to access Crypto/Token balances in
        your Subnet account.
      </p>
      <p className="card1__title">
        <b className="processing-time-bold">Private Key :</b>{" "}
        {this.state.subnetaccdata.data.subnet.privateKey.replace(
          "PrivateKey-",
          ""
        )}
      </p>
      <p className="card1__title">
        <b className="processing-time-bold">Address :</b>{" "}
        {this.state.subnetaccdata.data.subnet.address}
      </p>
      <Button
        className="private-key-btn"
        variant="contained"
        color="primary"
        type="button"
        onClick={this.download}
      >
        Download Private Key
      </Button>
      <Button className="popup-next-btn" onClick={this.popupclose}>
        Next
      </Button>
    </div>
  );

  renderPopup = () => (
    <div id="modal">
      <ReactModal
        isOpen={this.state.open1}
        onRequestClose={this.onCloseModalpopup}
        contentLabel="Minimal Modal Example"
        style={customStylesautosmallmodal1}
      >
        {this.state.showRegPopup1 && this.renderPopUpStep1()}
        {this.state.showRegPopup2 && this.renderPopUpStep2()}
        {this.state.showRegPopup3 && this.renderPopUpStep3()}
      </ReactModal>
    </div>
  );

  fouthform = () => {
    return (
      <React.Fragment>
        {this.state.loading === true ? <FormLoader></FormLoader> : ""}
        <div className="topcontent1">
          <h2 className="text-center heading1">Create an Account</h2>
        </div>

        <div className="register1__title-container">
          <div>
            <KeyboardBackspaceIcon
              onClick={this.handleClicks}
              style={{ fontSize: "2rem", marginTop: "-3px" }}
              className="left-arrow-mui"
            ></KeyboardBackspaceIcon>
          </div>

          <div className="register1__title-container1">
            <h5 className="heading2">
              {this.state.formData2.UserRole} details
            </h5>
            <i>
              <b>3</b>/3
            </i>
          </div>
        </div>
        <div className="outer-form-container">
          <form className="form-container" onSubmit={this.onSubmit}>
            <div className="input-container">
              <label className="label">Organization Name</label>
              <input
                required
                placeholder="Type here"
                className="input"
                type="text"
                onChange={(e) => {
                  this.setState({
                    formData4: {
                      ...this.state.formData4,
                      organizationname: e.target.value,
                    },
                  });
                }}
                value={this.state.formData4.organizationname}
                // required
              />
            </div>

            <div className="input-container">
              <label className="label">Country of Registration</label>
              <select
                required
                className="input-select"
                onChange={(e) => {
                  this.setState({
                    formData4: {
                      ...this.state.formData4,
                      countryofregistration: e.target.value,
                    },
                  });
                }}
                value={this.state.formData4.countryofregistration}
              >
                <option value="United States Of America">
                  United States of America
                </option>
                <option value="Non United States Of America">
                  Non United States of America
                </option>
              </select>
            </div>

            <div className="input-container">
              <label className="label">Years in Operation</label>
              <div className="flex input">
                <input
                  required
                  placeholder="Type here"
                  className="input-none"
                  onKeyDown={this.blockInvalidChar}
                  type="number"
                  onChange={(e) => {
                    this.setState({
                      formData4: {
                        ...this.state.formData4,
                        years: e.target.value,
                      },
                    });
                  }}
                  value={this.state.formData4.years}
                />
                <p>Years</p>
              </div>
            </div>

            <div className="input-container">
              <label className="label">Preferred Asset Class</label>

              <Select
                isMulti
                name="colors"
                className="basic-multi-select"
                classNamePrefix="select"
                options={this.state.processoroption}
                placeholder="Type here"
                // closeMenuOnSelect={false}
                // hideSelectedOptions={false}
                components={{
                  Option,
                  // MultiValue,
                  // ValueContainer,
                }}
                onChange={this.handleChange}
                value={this.state.processorarrray}
              />
              {/* <select
              required
              className="input-select"
              onChange={(e) => {
                this.setState({
                  formData4: {
                    ...this.state.formData4,
                    preferredassetclass: e.target.value,
                  },
                });
              }}
              value={this.state.formData4.preferredassetclass}
            >
              <option value="" disabled>Select any one</option>
              <option value="Residential Real Estate">Residential Real Estate</option>
                          <option value="Commercial Mortgage">Commercial Mortgage</option>
                          <option value="Corporate Loans">Corporate Loans</option>
                          <option value="Auto Loans">Auto Loans</option>
                          <option value="Consumer Loans">Consumer Loans</option>
                          <option value="Credit Cards">Credit Cards</option>
                          <option value="Leasing">Leasing</option>
                          <option value="Esoteric">Esoteric</option>
                          <option value="Non Performing Loans">Non Performing Loans</option>
                          <option value="Asset Backed Commercial Papers">Asset Backed Commercial Papers</option>
            </select> */}
            </div>
            {/* 
          <div className="input-container">
            <label className="label">Target Amount of  Investment</label>
            <div className="flex input">
              <input
                placeholder='Type here'
                className="input-none"
                type="text"
                onChange={(e) => {
                  this.setState({
                    formData4: {
                      ...this.state.formData4,
                      currentassetvaluation: e.target.value
                    }
                  });
                }}
                value={this.state.formData4.currentassetvaluation}
              />
              <p>USD</p>
            </div>
          </div> */}

            {/* <div className="input-container">
            <label className="label">Active Avalanche C-Chain?</label>
            <div className="flex-radio">
              <label className="label-radio-container">
                Yes
                <input
                  type="radio"
                  name="subnetacc"
                  value={this.state.formData4.subnetacc}
                  checked={this.state.formData4.subnetacc}
                  onChange={(e) => {
                    this.setState({
                      formData4: {
                        ...this.state.formData4,
                        subnetacc: true,
                      },
                    });
                  }}
                />
                <span className="checkmark"></span>
              </label>
              <label className="label-radio-container">
                No
                <input
                  type="radio"
                  // className="simple-container"
                  name="subnetacc"
                  value={false}
                  onChange={(e) => {
                    this.setState({
                      formData4: {
                        ...this.state.formData4,
                        subnetacc: false,
                      },
                    });
                  }}
                />
                <span className="checkmark"></span>
              </label>
            </div>
            {this.state.formData4.subnetacc && (
              <input
                required
                placeholder="Type the Name here"
                className="input"
                type="text"
                value={this.state.formData4.subnetaccValue}
                onChange={(e) => {
                  this.setState({
                    formData4: {
                      ...this.state.formData4,
                      subnetaccValue: e.target.value,
                    },
                  });
                }}
              />
            )}
          </div> */}

            <div id="form-btn">
              <div className="container-fluid text-center">
                <div className="row d-flex justify-content-center align-items-center">
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    style={{ marginBottom: "1rem" }}
                  >
                    {" "}
                    Register
                    {this.state.formLoader === true ? (
                      <CircularProgress size="25px" color="primary" />
                    ) : (
                      ""
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* modal popup starts here */}

        {this.state.open1 && this.renderPopup()}

        {/* modal popup ends here */}

        <div className="loginCheckbox">
          <p className="login-sign-up-para">
            <Link to={"/"} className="login-sign_up-link">
              Sign In
            </Link>
            , If you already have an account
          </p>
        </div>

        <React.Fragment></React.Fragment>
      </React.Fragment>
    );
  };

  fifthform = () => {
    return (
      <React.Fragment>
        {this.state.loading === true ? <FormLoader></FormLoader> : ""}
        <div className="topcontent1-3">
          <h2 className="text-center heading1">Create an Account</h2>
        </div>

        <div className="register1__title-container">
          <div>
            <KeyboardBackspaceIcon
              onClick={this.handleClicks}
              style={{ fontSize: "2rem", marginTop: "-3px" }}
              className="left-arrow-mui"
            ></KeyboardBackspaceIcon>
          </div>

          <div className="register1__title-container1">
            <h5 className="heading2">
              {this.state.formData2.UserRole} Agent details
            </h5>
            <i>
              <b>3</b>/3
            </i>
          </div>
        </div>
        <div className="outer-form-container">
          <form className="form-container" onSubmit={this.onSubmit}>
            <div className="input-container">
              <label className="label">Organization Name</label>
              <input
                required
                placeholder="Type here"
                className="input"
                type="text"
                onChange={(e) => {
                  this.setState({
                    formData5: {
                      ...this.state.formData5,
                      organizationname: e.target.value,
                    },
                  });
                }}
                value={this.state.formData5.organizationname}
                // required
              />
            </div>

            <div className="input-container">
              <label className="label">Country of Registration</label>
              <select
                required
                className="input-select"
                onChange={(e) => {
                  this.setState({
                    formData5: {
                      ...this.state.formData5,
                      countryofregistration: e.target.value,
                    },
                  });
                }}
                value={this.state.formData5.countryofregistration}
              >
                <option value="United States Of America">
                  United States of America
                </option>
                <option value="Non United States Of America">
                  Non United States of America
                </option>
              </select>
            </div>

            <div className="input-container">
              <label className="label">Years in Operation</label>
              <div className="flex input">
                <input
                  required
                  placeholder="Type here"
                  className="input-none"
                  type="number"
                  onKeyDown={this.blockInvalidChar}
                  onChange={(e) => {
                    this.setState({
                      formData5: {
                        ...this.state.formData5,
                        years: e.target.value,
                      },
                    });
                  }}
                  value={this.state.formData5.years}
                />
                <p>Years</p>
              </div>
            </div>

            {/* <div className="input-container">
            <label className="label">Active Avalanche C-Chain?</label>
            <div className="flex-radio">
              <label className="label-radio-container">
                Yes
                <input
                  type="radio"
                  name="subnetacc"
                  value={this.state.formData5.subnetacc}
                  checked={this.state.formData5.subnetacc}
                  onChange={(e) => {
                    this.setState({
                      formData5: {
                        ...this.state.formData5,
                        subnetacc: true,
                      },
                    });
                  }}
                />
                <span className="checkmark"></span>
              </label>
              <label className="label-radio-container">
                No
                <input
                  type="radio"
                  // className="simple-container"
                  name="subnetacc"
                  value={false}
                  onChange={(e) => {
                    this.setState({
                      formData5: {
                        ...this.state.formData5,
                        subnetacc: false,
                      },
                    });
                  }}
                />
                <span className="checkmark"></span>
              </label>
            </div>
            {this.state.formData5.subnetacc && (
              <input
                required
                placeholder="Type the Name here"
                className="input"
                type="text"
                value={this.state.formData5.subnetaccValue}
                onChange={(e) => {
                  this.setState({
                    formData5: {
                      ...this.state.formData5,
                      subnetaccValue: e.target.value,
                    },
                  });
                }}
              />
            )}
          </div> */}

            <div id="form-btn">
              <div className="container-fluid text-center">
                <div className="row d-flex justify-content-center align-items-center">
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    style={{ marginBottom: "1rem" }}
                  >
                    {" "}
                    Register
                    {this.state.formLoader === true ? (
                      <CircularProgress size="25px" color="primary" />
                    ) : (
                      ""
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* modal popup starts here */}

        {this.state.open1 && this.renderPopup()}

        {/* modal popup ends here */}
        <div className="loginCheckbox">
          <p className="login-sign-up-para">
            <Link to={"/"} className="login-sign_up-links">
              Sign In
            </Link>
            , If you already have an account
          </p>
        </div>

        <React.Fragment></React.Fragment>
      </React.Fragment>
    );
  };

  checkFunction = () => {
    if (this.state.formData2.UserRole === "Issuer") {
      return this.thirdform();
    } else if (this.state.formData2.UserRole === "Investor") {
      return this.fouthform();
    } else {
      return this.fifthform();
    }
  };

  render() {
    return (
      <React.Fragment>
        <div>
          {this.state.showfirstform1 && this.firstform()}
          {this.state.showfirstform2 && this.secondform()}
          {this.state.showfirstform3 && this.checkFunction()}
        </div>

        <div>
          <ReactModal
            isOpen={this.state.open2}
            contentLabel="Minimal Modal Example"
            style={customStylesRegisterPopup}
          >
            <React.Fragment>
              <div className="modalPopup2">
                <div className="modalshiftcontent">
                  <div className="modal-scroll">
                    <br />
                    <p>
                      <div className="modal-terms">
                        <div className="modal-terms-heading-register">
                          Terms of Service
                        </div>
                        {/* <div>
                            Effective Date: ___________, 2023
                          </div> */}
                        <div
                          className="uploadBox"
                          style={{ backgroundColor: "#FAFAFA" }}
                        >
                          <div className="uploadfile-section">
                            <span>
                              If you have already signed a Terms of Service
                              agreement, please upload here.
                            </span>
                            <button
                              className="card__button"
                              style={{
                                position: "relative",
                                backgroundColor: "#FFC000",
                                cursor: "pointer",
                              }}
                            >
                              <label
                                htmlFor="fileInput"
                                className="upload-button-label"
                              >
                                Upload
                                {this.state.formLoader2 === true ? (
                                  <CircularProgress
                                    size="18px"
                                    color="primary !important"
                                  />
                                ) : (
                                  ""
                                )}
                              </label>
                              <input
                                type="file"
                                id="fileInput"
                                accept=".csv,.xlsm, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                style={{ display: "none" }}
                                onChange={this.handleFileUpload}
                              />
                            </button>
                          </div>

                          <hr></hr>

                          <p style={{ marginTop: "15px" }}>
                            Otherwise review the terms below.
                          </p>
                        </div>
                      </div>
                      <div className="modal-scroll2">
                        <div className="modal-scroll-main">
                          <div>
                            THESE TERMS OF SERVICE (“TOS”) FORM A LEGAL
                            AGREEMENT BETWEEN YOU, THE END USER (referenced
                            herein as “You”) AND INTAIN, INC. AND ITS AFFILIATES
                            AND SUBSIDIARIES (together, “Intain”) THAT APPLIES
                            EACH TIME YOU USE OR ACCESS INTAIN’S WEBSITES,
                            ONLINE PLATFORM, SERVICES, AND ASSOCIATED WEBPAGES,
                            PORTALS, APPLICATIONS, FEATURES, AND CONTENT
                            (collectively, the “Content”). YOU SHOULD THEREFORE
                            READ THE FOLLOWING TERMS AND CONDITIONS CAREFULLY,
                            AS THEY GOVERN YOUR USE OF THE CONTENT AND ITS
                            FUNCTIONALITY. IF YOU DO NOT AGREE WITH THIS TOS,
                            YOU ARE NOT GRANTED PERMISSION TO ACCESS OR
                            OTHERWISE USE THE CONTENT AND ARE INSTRUCTED TO EXIT
                            AND/OR UNINSTALL THE CONTENT IMMEDIATELY.
                          </div>
                          <div className="modal-linethrough">
                            1.Intain Platform
                          </div>
                          <div>
                            Intain provides a proprietary software platform (the
                            “Intain Platform”) that connects various parties in
                            structured financial transactions, by utilizing
                            certain third-party blockchain protocols or service
                            providers (the “Supported Protocols”). Your
                            interaction with Supported Protocols on the Intain
                            Platform is enabled by smart contracts developed by
                            Intain (the “Intain Smart Contracts”) and which have
                            been deployed by Intain to the relevant blockchain
                            and are accessible directly from the Intain
                            Platform. The Intain Smart Contracts accessible
                            through the Intain Platform may be updated or
                            altered from time to time, in Intain’s sole
                            discretion, in order to add new features and
                            functionality, in response to forks, chain
                            migrations, or other changes to the underlying
                            blockchains, or in order to address security
                            incidents or vulnerabilities.
                          </div>

                          <div className="modal-linethrough">2.User Access</div>
                          <div>
                            You may access the Intain Platform through the
                            Intain website. You are responsible, at Your own
                            expense, for installing, operating, and maintaining
                            all equipment, software, services, and related
                            technology necessary for Your authorized users to
                            access the Intain Platform via the internet. You
                            will be required to register an account to use the
                            Content or certain features of the Content.
                            Registration for access to and use of the Content
                            may also require access credentials, such as a
                            username and a password, or adherence to other
                            access requirements as designated by Intain in its
                            sole discretion from time to time. By submitting the
                            requested information to the registration form or
                            similar process on the Content, You represent and
                            warrant that the information You submit for
                            registration is complete, true, accurate, and
                            current in all respects. You must maintain and
                            promptly update Your submitted account information
                            to ensure that such information is complete, true,
                            accurate, and current. Intain reserves the right to
                            suspend, terminate, or otherwise discontinue Your
                            account and/or pending registration if Intain has
                            reasonable grounds to suspect that any information
                            You have submitted is untrue, inaccurate, not
                            current, or incomplete, or that Your registration,
                            account, or use of the Content is in violation of
                            applicable law or this TOS. You are solely
                            responsible for ensuring the security of the
                            internet connections used by You and Your authorized
                            users to access the Intain Platform. You are also
                            solely responsible for ensuring that the passwords
                            and login credentials necessary for You and Your
                            authorized users to access the Intain Platform are
                            securely maintained. Intain will not be liable for
                            any unauthorized access to the Intain Platform that
                            may occur as a result of the failure of You, or one
                            or more of Your authorized users, to secure their
                            password and login credentials. You shall
                            immediately notify Intain if You suspect or become
                            aware of any loss, theft, or unauthorized use of
                            Your login credentials. Intain will not be liable
                            for any loss or damage arising from Your failure
                            (whether intentional or unintentional) to comply
                            with these obligations.
                          </div>

                          <div className="modal-linethrough">3.User Wallet</div>
                          <div>
                            In order to participate on the Intain Platform, you
                            may be required to have or create a compatible
                            wallet (the “Wallet”) in order to use certain
                            services provided on the Intain Platform. When you
                            create a Wallet, the Wallet details will be stored
                            in Your account. Once You have created a Wallet, You
                            will be provided with instructions to back up your
                            Wallet using private key or keystore or a seed
                            phrase consisting of twelve (12) random words that
                            should be written down on paper and safeguarded such
                            that only You have access to the seed phrase. This
                            private key, keystore, seed phrase will allow You to
                            restore your Wallet in the event You lose Your
                            device or forget Your password. It is Your
                            responsibility to maintain Your seed phrase, private
                            key, keystore and any PIN, and to prevent others
                            from obtaining them. If You lose your seed phrase,
                            private key, keystore, Intain will not be able to
                            restore access to Your Wallet and any assets
                            affiliated with that Wallet may be permanently lost.
                            If anyone other than You obtain access to Your
                            device, PIN, and/or seed phrase/private
                            key/keystore, and transfers any assets out of Your
                            Wallet, Intain will not be able to reverse the
                            transfer and the assets may be permanently lost. The
                            Wallet is non-custodial. You will remain in control
                            of the digital assets stored in Your Wallet at all
                            times and Intain will never have custody of, or any
                            control over, those digital assets. For the
                            avoidance of doubt, You will at all times be
                            responsible for securing the private key(s)
                            necessary to sign transactions from the blockchain
                            address(es) connected to the Intain Platform and
                            Intain will not have access to, or take possession
                            of, such private key(s) or otherwise have the
                            ability to control the digital assets stored in Your
                            Wallet. You may designate a Third-Party Custodian to
                            control Your Wallet and safeguard the digital
                            assets, but such designation must be disclosed to
                            Intain in writing and such Third-Party Custodian
                            will be subject to the terms of the TOS.
                          </div>

                          <div className="modal-linethrough">
                            4.License Grant and Restrictions
                          </div>
                          <div>
                            This TOS provides to You a revocable, limited,
                            non-exclusive, non-sublicensable, and
                            non-transferable license to use and access the
                            Content during the Term specified herein solely for
                            Your internal business use, conditioned on Your
                            continued compliance with all provisions of this TOS
                            (including without limitation any external terms and
                            documentation linked or referenced herein).
                            <div>
                              When using the Content in accordance with the
                              foregoing license, You shall not directly or
                              indirectly:
                              <p>
                                (a)use the Content to create any service,
                                software or documentation that performs
                                substantially the same functionality as the
                                Content or otherwise competes with or causes
                                harm to Intain’s products, services, or other
                                business operations;
                                <br />
                                (b)disassemble, decompile, reverse-engineer, or
                                use any other means to attempt to discover any
                                source code, algorithms, trade secrets, or
                                applications underlying the Content or any of
                                its webpages, content, or features;
                                <br />
                                (c)encumber, sublicense, transfer, distribute,
                                rent, lease, time-share, or use the Content in
                                any service bureau arrangement or otherwise for
                                the benefit of any third party;
                                <br />
                                (d)adapt, combine, create derivative works of,
                                or otherwise modify the Content;
                                <br />
                                (e)disable, circumvent, or otherwise avoid or
                                undermine any security or authentication device,
                                mechanism, protocol, or procedure implemented in
                                the Content;
                                <br />
                                (f)misrepresent Your affiliation with or
                                impersonate any person or entity;
                                <br />
                                (g)use or access the Content for any unlawful,
                                fraudulent, deceptive, tortious, malicious, or
                                otherwise harmful or injurious purpose;
                                <br />
                                (i)remove, obscure, deface, or alter any
                                proprietary rights notices on any element of the
                                Content or accompanying documentation;
                                <br />
                                (j)use the Content in any manner which could
                                damage, disable, overburden, or impair the
                                Content or interfere with any third party’s
                                authorized use of the Content;
                                <br />
                                (k)engage in any “data mining,” “deep-link,”
                                “page-scrape,” or use “bots,” “spiders,” or
                                similar data gathering and extraction tools or
                                methods in connection with the Content; or
                                <br />
                                (l)probe, scan, or test the vulnerability of the
                                Content or any systems or network infrastructure
                                connected with the Content, including without
                                limitation by stress testing or penetration
                                testing.
                              </p>
                            </div>
                          </div>

                          <div className="modal-linethrough">
                            5.User Representations
                          </div>
                          <div>
                            <p>
                              You represent and warrant that: (a)You are at
                              least eighteen (18) years of age or the legal age
                              of majority in Your jurisdiction (whichever is
                              greater) and will, at all times, provide true,
                              accurate, current, and complete information (which
                              You have all necessary rights, permission(s),
                              prior express consent, or authority to provide)
                              when submitting information through the Content;
                              <br />
                              (b)agreeing to the TOS and Your use of the Content
                              does not constitute, and that You do not expect it
                              to result in, a breach, default, or violation of
                              any contract or agreement to which you are a party
                              or are otherwise bound;
                              <br />
                              (c)You will comply with all applicable laws,
                              rules, and regulations in using the Content;
                              <br />
                              (d)You have and will maintain any and all licenses
                              and permissions required by applicable law to
                              engage in activity utilizing the Content during
                              the term of these TOS; and
                              <br />
                              (e)You are not a person, entity controlled by a
                              person, or entity identified on, or controlling a
                              blockchain address identified on, a list of
                              persons or blockchain addresses that have been
                              specially designated, considered parties of
                              concern, or blocked that is established and
                              maintained by the United Nations, the European
                              Union, or the Office of Foreign Asset Control of
                              the United States Treasury Department.
                              <br />
                              You hereby agree that (i) You will comply with all
                              applicable sanctions and export control laws, and
                              (ii) You are solely responsible for ensuring that
                              the Content is used, disclosed, and/or accessed
                              only in accordance with all applicable sanctions
                              and export control laws. In addition, You are
                              responsible for compliance with all applicable
                              laws, rules, and regulations, including but not
                              limited to all laws and regulations governing
                              consumer protection, unfair competition,
                              commercial electronic mail (email) and messages,
                              advertising, privacy, and information security
                              with respect to Your use of the Content. If You
                              access the Content on behalf of any organization,
                              Your organization shall be bound to this TOS and
                              be liable for any breach by You, and You represent
                              that You have all rights, power, and authority to
                              agree to this TOS on behalf of Your organization.
                              <br />
                              The Content is not intended for use or access by
                              any individual under the age of thirteen (13)
                              years, and Intain does not knowingly, willingly,
                              or intentionally collect personal information from
                              such individuals in any medium for any purpose.
                            </p>
                          </div>
                          <div className="modal-linethrough">
                            6.Electronic Communications
                          </div>
                          <p>
                            Intain may send emails or other electronic messages
                            to You concerning Your use of the Content, including
                            without limitation by providing alerts or
                            notifications within the Content. You consent to
                            receive such electronic communications and You agree
                            that all such electronic communications constitute
                            valid legal notices satisfying any requirement that
                            such notices be in writing.
                          </p>

                          <div className="modal-linethrough">7.Submissions</div>
                          <div>
                            Certain features of the Content may permit You to
                            upload, post, display, transmit, or otherwise
                            provide certain requested information, content,
                            links, files, or other materials to the Content as
                            part of messaging, review, comment, discussion
                            board, or similar functionality on the Content,
                            and/or as part of a survey, questionnaire,
                            promotion, or request for feedback or input
                            regarding the Content (each a “Submission” and
                            collectively “Submissions”). You hereby grant to
                            Intain a royalty-free, fully transferable, fully
                            sublicensable license to use, display, copy,
                            perform, reproduce, modify, record, distribute, and
                            create derivative works of Submissions in connection
                            with: (i) Intain’s operation of the Content and its
                            features and functionalities; (ii) Intain’s
                            development, promotion, and implementation of its
                            products, services, programs, and events; and (iii)
                            Intain’s research, development, and other business
                            operations. In addition, You agree that You will not
                            upload, post, display, or transmit any Submission(s)
                            that:
                            <br />
                            <p>
                              (a)is illegal, defamatory, deceptive, fraudulent,
                              discriminatory, tortious, obscene, pornographic,
                              or otherwise objectionable;
                              <br />
                              (b)infringes, misappropriates, or otherwise
                              violates the personal or proprietary rights of
                              others;
                              <br />
                              (c)contains any virus, malware, worm, Trojan
                              horse, disabling device, or any other harmful or
                              malicious script, code, or tool;
                              <br />
                              (d)impersonates any person or entity or falsely
                              states or otherwise misrepresents Your affiliation
                              with a person or entity;
                              <br />
                              (e)contains unsolicited communications,
                              promotions, or advertisements, or spam;
                              <br />
                              (f)harms, harasses, threatens, or violates the
                              rights of any third party, or promotes, provokes,
                              or incites violence;
                              <br />
                              (g)constitutes false advertising, false
                              endorsement, or is otherwise false, misleading, or
                              likely to cause consumer confusion; or
                              <br />
                              (h)manipulates data or identifiers in order to
                              misrepresent or disguise the origin of the
                              Submission.
                            </p>
                            Intain may screen, review, edit, moderate, or
                            monitor Your Submissions from time to time at its
                            discretion, but has no obligation to do so. In any
                            event, Intain is not responsible to You under this
                            TOS for Your or any other user’s Submissions, and
                            shall have no liability or responsibility for the
                            quality, content, accuracy, legality, or
                            effectiveness of any Submissions. You acknowledge
                            and agree that Intain shall have no obligation of
                            confidentiality whatsoever with respect to Your
                            Submissions.
                            <br />
                            By uploading, posting, displaying, transmitting, or
                            otherwise providing a Submission to the Content, You
                            represent and warrant that: (i) You possess all
                            legal rights required to upload, post, display,
                            and/or transmit each Submission and permit Intain to
                            use such Submission as set forth herein (including
                            without limitation any necessary third-party license
                            rights or required consents under applicable law);
                            (ii) each Submission is in full compliance with all
                            applicable laws and regulations; and (iii) Your
                            Submissions do not infringe, misappropriate, or
                            otherwise violate the personal or proprietary rights
                            of any third party.
                          </div>

                          <div className="modal-linethrough">
                            8.Third Party Services
                          </div>
                          <div>
                            Certain services, features, or components made
                            available via the Content are delivered by
                            third-party providers. By using any feature,
                            service, or functionality originating from the
                            Content, You hereby acknowledge and consent that
                            Intain may share information and data that You
                            submit or upload to the Content with the applicable
                            third-party provider as may be required to enable
                            and facilitate the requested third-party product,
                            service, or functionality, subject to Intain’s
                            Privacy Policy. Intain makes no representation or
                            guarantee whatsoever with respect to any third-party
                            products or services.
                            <br />
                            <br />
                            <div className="modal-terms">
                              INTAIN EXPRESSLY DISCLAIMS RESPONSIBILITY AND
                              LIABILITY FOR ANY THIRD-PARTY MATERIALS, PROGRAMS,
                              APPLICATIONS, TOOLS, PRODUCTS, AND SERVICES SET
                              FORTH, DESCRIBED ON, OR ACCESSED THROUGH THE
                              CONTENT, AND YOU AGREE THAT INTAIN SHALL NOT BE
                              RESPONSIBLE FOR ANY LOSS OR DAMAGE INCURRED AS A
                              RESULT OF ANY DEALINGS BETWEEN YOU AND A THIRD
                              PARTY, REGARDLESS OF WHETHER SUCH DEALINGS WERE
                              FACILITATED OR PERFORMED IN CONNECTION WITH THE
                              CONTENT.
                            </div>
                            <br />
                            Many different third-party service providers will
                            use the Content and provide services available via
                            the Content. These third-party service providers
                            include, but are not limited to, verification
                            agents, servicers, trustees or administrators,
                            ratings agencies, and user verification services. To
                            the extent that You utilize one or more of these
                            third-party service providers, such services will be
                            subject to any agreement entered into between You
                            and the relevant third-party service provider. You
                            understand that any such third-party services are
                            not governed by these TOS and that You are solely
                            responsible for reviewing, understanding, and
                            accepting the terms, conditions and risks associated
                            with any such third-party agreement.
                            <br />
                            <br />
                            Additional notices, terms, and conditions may apply
                            to services, receipt of or access to certain
                            materials, participation in a particular program,
                            and/or to specific portions or features of the
                            Content, including without limitation the terms of
                            third-party tools, applications, and APIs utilized
                            by or incorporated in the Content, and the terms of
                            app stores, digital distribution services, or
                            third-party payment processors. Your use of any such
                            third-party feature, tool, application, or API is
                            conditioned on Your acceptance of all third-party
                            terms applicable thereto, and You agree to abide by
                            all such terms in connection with Your use of the
                            Content. You hereby agree that: (i) this TOS
                            operates in addition to any terms of service imposed
                            or required by any such third-party provider; and
                            (ii) the terms of this TOS supplement and do not
                            alter or amend any such third-party terms of
                            service.
                          </div>
                          <div className="modal-linethrough">
                            9.Data Privacy
                          </div>
                          <div>
                            You understand, acknowledge, and agree that the
                            operation of certain features of the Content may
                            require or involve the provision, use, and
                            dissemination of various items of personally
                            identifiable information, including without
                            limitation personal contact information. Please
                            refer to Intain’s Privacy Policy, available upon
                            request (as updated from time to time), for a
                            summary of Intain’s policies and use practices
                            regarding personally identifiable information.
                          </div>

                          <div className="modal-linethrough">
                            10.Proprietary Rights
                          </div>
                          <div>
                            All content included as part of the Content, such as
                            text, graphics, logos, and images, as well as the
                            compilation thereof, and any software or other
                            proprietary materials used on or integrated with the
                            Content, are the property of Intain or its
                            applicable third-party licensors, and are protected
                            by copyright and other domestic and international
                            laws governing intellectual property and proprietary
                            rights. Intain reserves all rights in the Content
                            not expressly granted herein.
                            <br />
                            <br />
                            You agree that You do not acquire any ownership
                            rights in any part of the Content under this TOS or
                            through Your use of the Content. Intain does not
                            grant You any rights or licenses, express or
                            implied, to any intellectual property hereunder
                            except as specifically authorized by this TOS.
                          </div>
                          <div className="modal-linethrough">
                            11.Indemnification
                          </div>
                          <div>
                            You agree to indemnify, defend, and hold harmless
                            Intain and its officers, directors, employees,
                            agents, successors, and assigns from and against any
                            losses, costs, liabilities, damages, and expenses
                            (including reasonable attorneys’ fees) relating to
                            or arising out of (i) Your use of any Content, (ii)
                            Your violation of this TOS, (iii) Your infringement,
                            misappropriation, or violation of any personal or
                            proprietary rights of a third party, (iv) Your
                            violation of applicable laws, rules, or regulations,
                            and/or (v) Your Submissions, including without
                            limitation the quality, content, accuracy, legality,
                            or effectiveness thereof, or any communications,
                            transactions, or results arising therefrom. reserves
                            the right, at its own cost, to assume the exclusive
                            defense and control of any matter otherwise subject
                            to indemnification by You, in which event You will
                            fully cooperate with Intain in asserting any
                            available defenses.
                          </div>

                          <div className="modal-linethrough">
                            12.Disclaimers and Excluded Liability
                          </div>
                          <div className="modal-terms">
                            INTAIN DOES NOT REPRESENT OR WARRANT THAT THE
                            CONTENT WILL OPERATE ERROR-FREE OR ON AN
                            UNINTERRUPTED BASIS. THE CONTENT IS PROVIDED “AS IS”
                            AND “AS AVAILABLE,” AND TO THE MAXIMUM EXTENT
                            PERMITTED UNDER APPLICABLE LAW, INTAIN HEREBY
                            DISCLAIMS ANY AND ALL WARRANTIES, EXPRESS OR
                            IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
                            WARRANTIES OF TITLE, NON-INFRINGEMENT,
                            MERCHANTABILITY, OR FITNESS FOR A PARTICULAR
                            PURPOSE. INTAIN DOES NOT WARRANT THAT THE CONTENT
                            WILL MEET YOUR EXPECTATIONS, SPECIFICATIONS, OR
                            REQUIREMENTS, OR THAT THE CONTENT WILL BE FREE OF
                            VIRUSES, MALWARE, OR ERRORS. INTAIN FURTHER
                            EXPRESSLY DISCLAIMS ANY WARRANTY REGARDING THE LOSS
                            OR CORRUPTION OF DATA OR CONTENT UPLOADED TO, STORED
                            BY, OR TRANSMITTED BY THE CONTENT OR SERVICES,
                            INCLUDING WITHOUT LIMITATION ANY SUBMISSIONS. INTAIN
                            DOES NOT ENDORSE ANY OTHER THIRD PARTY AND SHALL NOT
                            BE RESPONSIBLE IN ANY WAY FOR ANY TRANSACTIONS YOU
                            ENTER INTO WITH SUPPORTED PROTOCOLS OR ANY OTHER
                            THIRD PARTY. YOU AGREE THAT INTAIN WILL NOT BE
                            LIABLE FOR ANY LOSS OR DAMAGES OF ANY SORT INCURRED
                            AS THE RESULT OF ANY INTERACTIONS BETWEEN YOU AND
                            SUPPORTED PROTOCOLS OR ANY OTHER THIRD PARTY. IN NO
                            EVENT SHALL INTAIN BE LIABLE HEREUNDER, REGARDLESS
                            OF THE FORM OF ANY CLAIM OR ACTION (WHETHER IN
                            CONTRACT, NEGLIGENCE, STATUTORY LIABILITY OR
                            OTHERWISE), FOR ANY: (A) LOSS OR INACCURACY OF DATA,
                            LOSS, OR INTERRUPTION OF USE, OR COST OF PROCURING
                            SUBSTITUTE TECHNOLOGY, GOODS OR SERVICES, OR ANY
                            INDIRECT, PUNITIVE, INCIDENTAL, RELIANCE, SPECIAL,
                            EXEMPLARY, OR CONSEQUENTIAL DAMAGES, INCLUDING
                            WITHOUT LIMITATION DAMAGES FOR LOSS OF BUSINESS,
                            REVENUES, PROFITS AND/OR GOODWILL, EVEN IF SUCH
                            DAMAGES WERE REASONABLY FORESEEABLE OR IF INTAIN WAS
                            ADVISED OF THE POSSIBILITY OF SUCH DAMAGES; OR (B)
                            DAMAGES WHICH, IN THE AGGREGATE, EXCEED [(I) THE
                            TOTAL AMOUNTS PAID BY YOU TO INTAIN FOR USE OF THE
                            CONTENT OVER THE SIX (6) MONTHS IMMEDIATELY PRIOR TO
                            THE DATE ON WHICH THE APPLICABLE CLAIM OR CAUSE OF
                            ACTION FIRST ACCRUED, OR (II) IF THERE IS NO SUCH
                            AMOUNT PAID, TEN U.S. DOLLARS (USD$10.00)]. THESE
                            LIMITATIONS SHALL APPLY NOTWITHSTANDING THE
                            INSUFFICIENCY OR FAILURE OF THE ESSENTIAL PURPOSE OF
                            ANY REMEDY PROVIDED HEREIN. CERTAIN JURISDICTIONS
                            AND LAWS MAY NOT PERMIT SOME OR ALL OF THE
                            DISCLAIMERS OF LIABILITY SET FORTH IN THIS SECTION.
                            IN THE EVENT THAT SUCH A JURISDICTION OR LAW APPLIES
                            TO THE SUBJECT MATTER OF THIS TOS, THE FOREGOING
                            DISCLAIMERS WILL APPLY TO THE MAXIMUM EXTENT
                            PERMITTED UNDER APPLICABLE LAW.
                          </div>

                          <div className="modal-linethrough">
                            13.Potential Risks
                          </div>
                          <div>
                            You accept and acknowledge each of the following:
                            <p>
                              <br />
                              (a)Like all software, the Intain Platform and the
                              Intain Smart Contracts may be subject to exploits.
                              Intain is not responsible for exploits that are
                              not reasonably foreseeable. While Intain has taken
                              a number of precautions to ensure the security of
                              the Intain Platform and the Intain Smart
                              Contracts, the technology is relatively new, and
                              it is not possible to guarantee that the code is
                              completely free from bugs or errors. You accept
                              all risks that arise from using the Intain
                              Platform and the Intain Smart Contracts,
                              including, and not limited to, the risk of any
                              funds being lost due to a failure or exploit of
                              the Intain Platform and the Intain Smart
                              Contracts.
                              <br />
                              (b)You are solely responsible for securing Your
                              login credentials and any device You use to access
                              Your account on Intain. You understand that anyone
                              who obtains your login credentials and access to
                              your device may access your Wallet with or without
                              your authorization and may transfer any digital
                              assets accessible through your Wallet.
                              <br />
                              (c)The value of any digital asset, where value is
                              attached to such an asset, may fluctuate. Intain
                              makes no guarantees as to the price or value of
                              any digital asset on any secondary market.
                              <br />
                              (d)Risks associated with digital assets that may
                              be stored in Your Wallet include, but are not
                              limited to, the following: the risk of losing
                              private keys, theft resulting from third parties
                              discovering your private key, value fluctuation of
                              digital assets on the secondary market,
                              disruptions to the blockchain networks caused by
                              network congestion, lack of usability of, or loss
                              of value with respect to, digital assets due to a
                              hard fork or other disruption to the blockchain
                              networks, or errors or vulnerabilities in the
                              smart contract code associated with a given
                              digital asset or transactions involving digital
                              assets. Transfers on a blockchain are likely
                              irreversible. Once an instruction, signed by the
                              required private key(s), to transfer a digital
                              asset from one blockchain address to another has
                              been executed it cannot be undone.
                              <br />
                              (e)Intain may modify or discontinue support for
                              the Intain Platform or the Intain Smart Contracts
                              at any time. Intain reserves the right, at any
                              time, in its sole discretion, to modify the Intain
                              Platform and the Intain Smart Contracts.
                              <br />
                              (f)In the event of a change to an underlying
                              blockchain network, or other network disruption,
                              resulting in a fork of the existing blockchain
                              into one (or more) additional blockchains, the
                              Intain Platform and the Intain Smart Contracts may
                              not support activity related to any new digital
                              assets created as a result of the fork. In
                              addition, in the event of a fork, transactions on
                              the network may be disrupted, including
                              transactions involving the Intain Smart Contracts.
                              <br />
                              (g)[Blockchain networks charge fees for engaging
                              in a transaction on the network. Those network
                              transaction fees fluctuate over time depending on
                              a variety of factors. Intain does not control the
                              pricing metrics for network fees that may be
                              imposed by the Blockchain. You are solely
                              responsible for paying any network transaction
                              fees associated with transactions you engage in
                              using services provided on the Intain Platform.
                              You are also solely responsible for any other
                              third-party fees that may be incurred in
                              connection with your use of such services.]
                              <br />
                              (h)You are solely responsible for determining
                              whether and which taxes assessments, or duties (or
                              other similar charges) apply to your transactions.
                            </p>
                          </div>
                          <div className="modal-linethrough">
                            14.Term, Termination, and Suspension
                          </div>
                          <div>
                            This TOS takes effect (or re-takes effect) at the
                            moment You first access or use the Content. Intain
                            reserves the right, in its sole discretion, at any
                            time and on any grounds–including, without
                            limitation, any reasonable belief of fraudulent or
                            unlawful activity, or if Intain reasonably suspects
                            or determines that you are in violation of this
                            TOS–to deny, terminate, or suspend Your access to
                            the Content or to any portion thereof. Additionally,
                            Intain may, in its sole discretion, remove and
                            discard any materials within the Content, for any
                            reason. Intain may also in its sole direction and at
                            any time discontinue providing the Content, or any
                            part thereof, with or without notice. You agree that
                            any suspension or termination of your access to the
                            Content under any provision of this TOS may be
                            effected without prior notice. Further, you agree
                            that Intain will not be liable to you or any third
                            party for any such suspension or termination of your
                            access to the Content.
                            <br />
                            <br />
                            This TOS terminates automatically if You fail to
                            comply with any provision hereof, subject to the
                            survival rights of certain provisions identified
                            below. You may also terminate this TOS at any time
                            by ceasing to use the Content, but each re-access or
                            renewed use of the Content will reapply the TOS to
                            You. Upon termination or expiration of the TOS for
                            any reason, all licenses granted by Intain hereunder
                            shall immediately terminate, and You must
                            immediately cease all use of the Content. The
                            provisions of this TOS concerning Intain’s
                            proprietary rights, licenses to Submissions,
                            disclaimers of warranty and liability, limitations
                            of liability, waiver and severability, entire
                            agreement, indemnification rights, injunctive
                            relief, and governing law will survive the
                            termination of this TOS for any reason.
                          </div>
                          <div className="modal-linethrough">
                            15.Class Action Waiver
                          </div>
                          <div className="modal-terms">
                            BY USING THIS SITE AND AGREEING TO THESE TERMS, YOU
                            HEREBY WILLINGLY, EXPRESSLY, AND KNOWINGLY WAIVE ALL
                            RIGHT TO BRING OR PARTICIPATE IN ANY CLASS-ACTION
                            LAWSUIT, CLASS-WIDE ARBITRATION, OR PRIVATE
                            ATTORNEY-GENERAL ACTION BROUGHT UNDER OR IN
                            CONNECTION WITH THIS TOS OR YOUR USE OF THE CONTENT.
                            YOU MAY NOT BRING ANY CLAIM, SUIT, OR OTHER
                            PROCEEDING TO ENFORCE THIS TOS AS THE MEMBER OF ANY
                            CLASS OR AS PART OF ANY SIMILAR COLLECTIVE OR
                            CONSOLIDATED ACTION.
                          </div>
                          <div className="modal-linethrough">
                            16.Governing Law and Jurisdiction
                          </div>
                          <div>
                            This TOS is governed by the laws of the State of
                            Delaware, United States of America, without
                            reference to its principles of conflict of laws. The
                            Content may not be used or accessed from or in any
                            jurisdiction that does not give effect to all
                            provisions of this TOS, including without limitation
                            this paragraph.
                            <br />
                            <br />
                            In the event the parties hereto are not able to
                            resolve any dispute between them arising out of or
                            concerning this TOS or any provisions hereof,
                            whether arising in contract, tort, or any other
                            legal theory, then such dispute shall be resolved
                            exclusively through final, binding, and confidential
                            arbitration pursuant to the Federal Arbitration Act,
                            conducted by a single neutral arbitrator and
                            administered under the Commercial Arbitration Rules
                            of the American Arbitration Association. The
                            exclusive site of such arbitration shall be in
                            Wilmington, Delaware. The arbitrator’s award shall
                            be final, and judgment may be entered upon it in any
                            court having jurisdiction. The prevailing party
                            shall be entitled to recover its costs and
                            reasonable attorneys’ fees. The entire dispute,
                            including the scope and enforceability of this
                            arbitration provision, shall be determined by the
                            arbitrator. This arbitration provision shall survive
                            the termination of this TOS for any reason.
                          </div>
                          <div className="modal-linethrough">17.General</div>
                          <div>
                            (a)Relationship of the Parties. Nothing herein or in
                            Your use of the Content shall be construed as
                            creating any joint venture, partnership, employment,
                            or agency relationship.
                            <br />
                            (b)Security and Compliance. Intain reserves the
                            right to view, monitor, and record Your activity on
                            the Content without notice or permission from You.
                            Intain’s provision of the Content is subject to
                            existing laws and legal process, and nothing
                            contained herein shall restrict or reduce Intain’s
                            ability to comply with governmental, court, and law
                            enforcement requests or requirements involving Your
                            use of the Content or information provided to or
                            gathered by Intain with respect to such use.
                            <br />
                            (c)Severability and Waiver. If any part of this TOS
                            is determined to be invalid or unenforceable
                            pursuant to court order or other operation of
                            applicable law, such provision shall be deemed
                            severed from this TOS, and the remainder of this TOS
                            shall continue in full force and effect to the
                            maximum extent permitted under applicable law.
                            Failure to insist on strict performance of any of
                            this TOS will not operate as a waiver of any
                            subsequent default or failure of performance. No
                            waiver by Intain of any right under this TOS will be
                            deemed to be either a waiver of any other right or
                            provision or a waiver of that same right or
                            provision at any other time.
                            <br />
                            (d)Injunctive Relief. You acknowledge that any
                            breach, threatened or actual, of this TOS would
                            cause irreparable injury to Intain not readily
                            quantifiable as money damages, such that Intain
                            would not have an adequate remedy at law. You
                            therefore agree that Intain shall be entitled, in
                            addition to other available remedies, to seek and be
                            awarded an injunction or other appropriate equitable
                            relief from a court of competent jurisdiction
                            restraining any such breach of Your obligations,
                            without the necessity of posting bond or other
                            security.
                            <br />
                            (e)Changes to Terms. Intain reserves the right to
                            change the terms and conditions of this TOS by
                            posting a revised set of terms or mailing and/or
                            emailing notice thereof to You (or such other method
                            as may be required by applicable law). In addition,
                            Intain may add, modify, or delete any aspect,
                            component, or feature of the Content, but Intain is
                            not under any obligation to provide any upgrade,
                            enhancement, or modification. Your continued use of
                            the Content following any announced change will be
                            deemed as conclusive acceptance of any change to the
                            TOS. Accordingly, please review the TOS on a
                            periodic basis.
                            <br />
                            (f)Contact Us. If You have any questions or comments
                            regarding this TOS, please contact Intain at
                            explore@intainft.com.
                          </div>
                        </div>
                        <div className="modalsubmit1">
                          <div className="submitbuttonbg">
                            <div className="row-accept">
                              <div className="row justify-content-confirmmail">
                                <Button
                                  variant="contained"
                                  color="primary"
                                  onClick={this.updateTermsOfServiceDisagree}
                                >
                                  Disagree
                                  {this.state.formLoader1 === true ? (
                                    <CircularProgress
                                      size="22px"
                                      color="primary"
                                    />
                                  ) : (
                                    ""
                                  )}
                                </Button>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  onClick={this.updateTermsOfService}
                                >
                                  Agree
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
                      </div>
                    </p>
                  </div>

                  {/* {this.state.openPopup === true ? <React.Fragment><Snackbar msg={"Processor addded Successfully" || this.state.message} open="true" /> </React.Fragment> : ' '} */}
                </div>
              </div>
            </React.Fragment>
          </ReactModal>
        </div>

        <div id="modal1">
          <ReactModal
            isOpen={this.state.open3}
            contentLabel="Minimal Modal Example"
            style={customStylesautosmallmodal}
          >
            <React.Fragment>
              <div className="modalPopup2">
                <h3>Confirm Email</h3>

                <div className="modalshiftcontent">
                  <p className="dataEmail">
                    We sent an email to {this.state.formData3.EmailAddress}.
                    Please check your inbox and click the Confirm Link.
                  </p>

                  {/* {this.state.openPopup === true ? <React.Fragment><Snackbar msg={"Processor addded Successfully" || this.state.message} open="true" /> </React.Fragment> : ' '} */}
                </div>
              </div>
            </React.Fragment>
          </ReactModal>
        </div>
      </React.Fragment>
    );
  }
}
export default withSnackbar(register);
