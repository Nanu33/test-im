/* eslint-disable require-jsdoc */
import React, { Component } from "react";
import Sidebar from "../../../../components/sidebar";
import Button from "@material-ui/core/Button";
import { withSnackbar } from "notistack";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import LinearLoader from "../../../../components/loader/LinearLoader";
import * as moment from "moment";
import CircularProgress from "@material-ui/core/CircularProgress";
import NumberComp2 from "../../../../components/NumberComp2";
import ReactModal from "react-modal";
import { recurring , generalRecurring } from "../../../../servies/services";
import { customStylesautosmallmodalpopupBorrow } from "../../../../components/customscripts/customscript";

class General_Recurring extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRow: null,
      token: sessionStorage.getItem("token"),
      loading: false,
      getLoansLoader: false,
      openPopup: false,
      searchText: "",
      tableData: {
        Servicer: [],
        "Originator Name": [],
        "Rating Agency": [],
      },
      // DealName: !sessionStorage.getItem("dealname")
      //   ? JSON.parse(sessionStorage.getItem("getDashboardDeals"))?.map(
      //       (item) => item[0]
      //     )[0]
      //   : sessionStorage.getItem("dealname"),
      DealName : sessionStorage.getItem("dealName"),
      dealID : sessionStorage.getItem("dealId"),
      NextPaymentDate: sessionStorage.getItem("nextpaymentdate"),
      // LastPaymentDate: sessionStorage.getItem("lastpaymentdate"),
      LastPaymentDate: sessionStorage.getItem("firstPaymentDate"),
      isLoansProcessed: sessionStorage.getItem("isLoansProcessed"),
      Version: sessionStorage.getItem("version"),
      isSecuritisation: sessionStorage.getItem("isSecuritisation"),
      Assetclass: sessionStorage.getItem("Assetclass"),
      isESMA_Flag: sessionStorage.getItem("isESMA_Flag"),
      colorTable: sessionStorage.getItem("colorTable"),
      VersionsChange: [],
      isDisable: JSON.parse(sessionStorage.getItem("isdisable")),
      isTabChange: JSON.parse(sessionStorage.getItem("isTabChange")),
      TableName: "General",
      peer: sessionStorage.getItem("peer_insurer"),
      peers: JSON.parse(sessionStorage.getItem("peers")),
    //   checkLoadStatus: this.props.location.state?.checkLoadStatus,
      getDashboardDeals: JSON.parse(
        sessionStorage.getItem("getDashboardDeals")
      ),
      getDashboardDates: JSON.parse(
        sessionStorage.getItem("getDashboardDates")
      ),
      getDashboardVersions: JSON.parse(
        sessionStorage.getItem("getDashboardVersions")
      ),
      rowsSelected: null,
      isBorrow: false,
      BorrowingBase: "False",
      activeInsights1: true,
      activeInsights2: false,
      activeInsights3: false,
      activeInsights4: false,
      activeInsights5: false,
      activeInsights6: false,
      activeInsights7: false,
      activeInsights8: false,
      activeInsights9: false,
      activeInsights10: false,
      activeInsights11: false,
      activeInsights12: false,
      activeInsightsBB: false,
      screenloader: false,
      pooldetails: {},
      token : sessionStorage.getItem("token")
    };
  }
  blockInvalidChar = (e) => {
    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();
  };
  showPrev = () => {
    // window.location.assign("/admin/fees");
  };
  showNext = () => {
    window.location.assign("/admin/tranches_recurring");
  };
  popoverBottom = () => {
    return (
      <Popover className="servicer-popover-container">
        <button onClick={() => this.General(this.state.DealName)}>Deal</button>
        <hr className="servicer-popover-hr" />
        <button
          onClick={() =>
            this.Loans(this.state.DealName, this.state?.NextPaymentDate)
          }
        >
          Loan Tape
        </button>
        {/* <hr className="servicer-popover-hr" />
        <button>Change Period</button> */}
      </Popover>
    );
  };
  goBackToDashboard = () => {
    this.props.history.push({
      pathname: "/dashboard",
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
      activeInsights9: false,
      activeInsights10: false,
      activeInsights11: false,
      activeInsights12: false,
      activeInsightsBB: false,
    });
  };

  handleClickTranches = () => {
    this.setState(
      {
        activeInsights1: false,
        activeInsights2: true,
        activeInsights3: false,
        activeInsights4: false,
        activeInsights5: false,
        activeInsights6: false,
        activeInsights7: false,
        activeInsights8: false,
        activeInsights9: false,
        activeInsights10: false,
        activeInsights11: false,
        activeInsights12: false,
        activeInsightsBB: false,
      },
      () => sessionStorage.setItem("isTabChange", true)
    );
    window.location.assign("/admin/tranches_recurring");
  };
  handleClickFees = () => {
    this.setState(
      {
        activeInsights1: false,
        activeInsights2: false,
        activeInsights3: true,
        activeInsights4: false,
        activeInsights5: false,
        activeInsights6: false,
        activeInsights7: false,
        activeInsights8: false,
        activeInsights9: false,
        activeInsights10: false,
        activeInsights11: false,
        activeInsights12: false,
        activeInsightsBB: false,
      },
      () => sessionStorage.setItem("isTabChange", true)
    );
    window.location.assign("/admin/fees_recurring");
  };
  handleClickExpenses = () => {
    this.setState(
      {
        activeInsights1: false,
        activeInsights2: false,
        activeInsights3: false,
        activeInsights4: true,
        activeInsights5: false,
        activeInsights6: false,
        activeInsights7: false,
        activeInsights8: false,
        activeInsights9: false,
        activeInsights10: false,
        activeInsights11: false,
        activeInsights12: false,
        activeInsightsBB: false,
      },
      () => sessionStorage.setItem("isTabChange", true)
    );
    window.location.assign("/admin/expenses_recurring");
  };
  handleClickAccounts = () => {
    this.setState(
      {
        activeInsights1: false,
        activeInsights2: false,
        activeInsights3: false,
        activeInsights4: false,
        activeInsights5: true,
        activeInsights6: false,
        activeInsights7: false,
        activeInsights8: false,
        activeInsights9: false,
        activeInsights10: false,
        activeInsights11: false,
        activeInsights12: false,
        activeInsightsBB: false,
      },
      () => sessionStorage.setItem("isTabChange", true)
    );
    window.location.assign("/admin/accounts_recurring");
  };

  handleClickTests = () => {
    this.setState(
      {
        activeInsights1: false,
        activeInsights2: false,
        activeInsights3: false,
        activeInsights4: false,
        activeInsights5: false,
        activeInsights6: true,
        activeInsights7: false,
        activeInsights8: false,
        activeInsights9: false,
        activeInsights10: false,
        activeInsights11: false,
        activeInsights12: false,
        activeInsightsBB: false,
      },
      () => sessionStorage.setItem("isTabChange", true)
    );
    window.location.assign("/admin/tests_recurring");
  };
  handleBorrowingBase = () => {
    this.setState(
      {
        activeInsights1: false,
        activeInsights2: false,
        activeInsights3: false,
        activeInsights4: false,
        activeInsights5: false,
        activeInsights6: false,
        activeInsights7: false,
        activeInsights8: false,
        activeInsights9: false,
        activeInsights10: false,
        activeInsights11: false,
        activeInsights12: false,
        activeInsightsBB: true,
      },
      () => sessionStorage.setItem("isTabChange", true)
    );
    window.location.assign("/admin/borrowingbase_recurring");
  };
  handleClickVariables = () => {
    this.setState(
      {
        activeInsights1: false,
        activeInsights2: false,
        activeInsights3: false,
        activeInsights4: false,
        activeInsights5: false,
        activeInsights6: false,
        activeInsights7: true,
        activeInsights8: false,
        activeInsights9: false,
        activeInsights10: false,
        activeInsights11: false,
        activeInsights12: false,
        activeInsightsBB: false,
      },
      () => sessionStorage.setItem("isTabChange", true)
    );
    window.location.assign("/admin/variable_recurring");
  };
  handleClickPaymentRules = () => {
    this.setState(
      {
        activeInsights1: false,
        activeInsights2: false,
        activeInsights3: false,
        activeInsights4: false,
        activeInsights5: false,
        activeInsights6: false,
        activeInsights7: false,
        activeInsights8: true,
        activeInsights9: false,
        activeInsights10: false,
        activeInsights11: false,
        activeInsights12: false,
        activeInsightsBB: false,
      },
      () => sessionStorage.setItem("isTabChange", true)
    );
    window.location.assign("/admin/payment_recurring");
  };
  handleClickCollateral = () => {
    this.setState({
      activeInsights1: false,
      activeInsights2: false,
      activeInsights3: false,
      activeInsights4: false,
      activeInsights5: false,
      activeInsights6: false,
      activeInsights7: false,
      activeInsights8: false,
      activeInsights9: true,
      activeInsights10: false,
      activeInsights11: false,
      activeInsights12: false,
      activeInsightsBB: false,
    });
    window.location.assign("/admin/collateral_recurring");
  };

  handleClickLoanTape = () => {
    this.setState({
      activeInsights1: false,
      activeInsights2: false,
      activeInsights3: false,
      activeInsights4: false,
      activeInsights5: false,
      activeInsights6: false,
      activeInsights7: false,
      activeInsights8: false,
      activeInsights9: false,
      activeInsights10: true,
      activeInsights11: false,
      activeInsights12: false,
      activeInsightsBB: false,
    });
    window.location.assign("/admin/loantape_recurring");
  };

  handleClickConsolidated = () => {
    this.setState({
      activeInsights1: false,
      activeInsights2: false,
      activeInsights3: false,
      activeInsights4: false,
      activeInsights5: false,
      activeInsights6: false,
      activeInsights7: false,
      activeInsights8: false,
      activeInsights9: false,
      activeInsights10: false,
      activeInsights11: true,
      activeInsights12: false,
      activeInsightsBB: false,
    });
    window.location.assign("/admin/consolidated_recurring");
  };

  handleClickFiles = () => {
    this.setState({
      activeInsights1: false,
      activeInsights2: false,
      activeInsights3: false,
      activeInsights4: false,
      activeInsights5: false,
      activeInsights6: false,
      activeInsights7: false,
      activeInsights8: false,
      activeInsights9: false,
      activeInsights10: false,
      activeInsights11: false,
      activeInsights12: true,
      activeInsightsBB: false,
    });
    window.location.assign("/admin/files_recurring");
  };

  generalRecurring = async () => {
    // let x = this.state?.NextPaymentDate;
    let x = this.state?.LastPaymentDate;
    let month = x.slice(0, 2);
    let year = x.slice(6, 10);
    var data = {};
    data.DealName = this.state.DealName;
    data.Month = month;
    data.Year = year;
    data.Version = '';
    data.NextPaymentDate = '';
    data.LastPaymentDate = this.state.LastPaymentDate;
    data.peers = this.state.peer;

    console.log("datata", data);
    this.setState({ screenloader: true });

    if (this.state.isTabChange) {
      // Call DealRecurring API directly
      this.setState({ screenloader: true });
      this.recurring();
    } else {
      const APIResponse = await generalRecurring(data , this.state.token);
      console.log("generalOnPageReload", APIResponse.data);
      if (APIResponse.status === 200) {
        // const message = APIResponse.data.message;
        // this.props.enqueueSnackbar(message, {
        //   variant: "info",
        //   autoHideDuration: 3000,
        // });
        this.setState({ screenloader: true });
        this.recurring();
      } else {
        this.setState({ screenloader: false });
        const message = APIResponse.data.message;
        this.props.enqueueSnackbar(message, {
          variant: "error",
          autoHideDuration: 3000,
        });
      }
    }
  };

  DealRecurring = async () => {
    let x = this.state?.NextPaymentDate;
    let month = x.slice(0, 2);
    let year = x.slice(6, 10);
    var data = {};
    data.DealName = this.state.DealName;
    data.Month = month;
    data.Year = year;
    data.Version = this.state.Version;
    data.TableName = this.state.TableName;
    data.peer = this.state.peer;

    console.log("datata", data);
    this.setState({ screenloader: true });
    const APIResponse = await DealRecurring(data);

    console.log("generalDealRecurring", APIResponse.data);
    if (APIResponse.status === 200) {
      sessionStorage.setItem(
        "isSecuritisation",
        APIResponse.data["Financing Type"]
      );
      sessionStorage.setItem(
        "isESMA_Flag",  
        APIResponse.data["ESMA Compliant"] || "No"
      );
      sessionStorage.setItem(
        "Assetclass",
        APIResponse.data["Asset Class"] || undefined
      );

      // sessionStorage.setItem("colorTable",APIResponse.data["selected Color"].hex);
      this.setState({ tableData: APIResponse.data, screenloader: false });
    } else if (APIResponse.status === 201) {
      const message = APIResponse.data.message;
      this.props.enqueueSnackbar(message, {
        variant: "info",
        autoHideDuration: 3000,
      });
    } else {
      this.setState({ screenloader: false });
      const message = APIResponse.data.message;
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };
  recurring = async () => {
    let x = this.state?.LastPaymentDate;
    let month = x.slice(0, 2);
    let year = x.slice(6, 10);
    var data = {};
    data.DealName = this.state.DealName;
    data.Month = month;
    data.Year = year;
    data.Version = this.state.Version;
    data.TableName = this.state.TableName;
    data.peer = this.state.peer;

    console.log("datata", data);
    this.setState({ screenloader: true });
    const APIResponse = await recurring(data , this.state.token);

    console.log("generalDealRecurring", APIResponse.data);
    if (APIResponse.status === 200) {
      sessionStorage.setItem(
        "isSecuritisation",
        APIResponse.data["Financing Type"]
      );
      sessionStorage.setItem(
        "isESMA_Flag",  
        APIResponse.data["ESMA Compliant"] || "No"
      );
      sessionStorage.setItem(
        "Assetclass",
        APIResponse.data["Asset Class"] || undefined
      );

      // sessionStorage.setItem("colorTable",APIResponse.data["selected Color"].hex);
      this.setState({ tableData: APIResponse.data, screenloader: false });
    } else if (APIResponse.status === 201) {
      const message = APIResponse.data.message;
      this.props.enqueueSnackbar(message, {
        variant: "info",
        autoHideDuration: 3000,
      });
    } else {
      this.setState({ screenloader: false });
      const message = APIResponse.data.message;
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };
  onCloseModalBorrow = () => {
    this.setState({ isBorrow: false });
  };
  onOpenModalBorrow = () => {
    this.setState({ isBorrow: true });
  };
  checkBorrowBaseYes = async () => {
    this.setState(
      { calculateBorrow: true, BorrowingBase: "True", isBorrow: false },
      async () => {
        await this.CalculatePrePayments();
      }
    );
  };
  checkBorrowBaseNo = async () => {
    this.setState(
      { calculateBorrow: false, BorrowingBase: "False", isBorrow: false },
      async () => {
        await this.CalculatePrePayments();
      }
    );
  };

  CalculatePrePayments = async () => {
    this.setState({ getLoansLoader: true, formLoader: true, loading: true });
    let x = this.state?.NextPaymentDate;
    let month = x.slice(0, 2);
    let year = x.slice(6, 10);
    var data = {};
    data.DealName = this.state.DealName;
    data.Month = month;
    data.Year = year;
    data.peers = this.state.peers;
    data.NextPaymentDate = this.state?.NextPaymentDate;
    data.LastPaymentDate = this.state?.LastPaymentDate;

    console.log("datata", data);
    const APIResponse = await CalculatePrePayments(data);

    console.log("GeneralCalculatePayments", APIResponse.data);
    if (APIResponse.status === 200) {
      if (APIResponse.data.isSuccess === true) {
        this.setState({
          getLoansLoader: false,
          loading: false,
          formLoader: false,
        });
        // const message = APIResponse.data.message;
        // this.props.enqueueSnackbar(message, {
        //   variant: "info",
        //   autoHideDuration: 3000,
        // });
        this.CalculatePayments();
      } else {
        const message = APIResponse.data.message;
        this.props.enqueueSnackbar(message, {
          variant: "error",
          autoHideDuration: 3000,
        });
        this.setState({ formLoader: false });
      }
    }
    // else if (APIResponse.status === 201) {
    //   this.setState({ getLoansLoader: false, loading: false });
    //   const message = APIResponse.data.message;
    //   this.props.enqueueSnackbar(message, {
    //     variant: "error",
    //     autoHideDuration: 3000,
    //   });
    // }
    else {
      this.setState({ getLoansLoader: false, loading: false });
      const message = APIResponse.data.message;
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
      this.setState({ formLoader: false });
    }
  };

  CalculatePayments = async () => {
    this.setState({ getLoansLoader: true, formLoader: true, loading: true });
    let x = this.state?.NextPaymentDate;
    let month = x.slice(0, 2);
    let year = x.slice(6, 10);
    var data = {};
    data.DealName = this.state.DealName;
    data.Month = month;
    data.Year = year;
    data.BorrowingBase = this.state.BorrowingBase;
    data.peers = this.state.peers;
    data.CurrentPaymentDate = this.state?.NextPaymentDate;

    console.log("datata", data);
    const APIResponse = await CalculatePayments(data);

    console.log("GeneralCalculatePayments", APIResponse.data);
    if (APIResponse.status === 200) {
      if (APIResponse.data.isSuccess === true) {
        this.setState({
          getLoansLoader: false,
          loading: false,
          formLoader: false,
        });
        const message = APIResponse.data.message;
        this.props.enqueueSnackbar(message, {
          variant: "info",
          autoHideDuration: 3000,
        });
        this.CalculateCollateralPayments();
      } else {
        const message = APIResponse.data.message;
        this.props.enqueueSnackbar(message, {
          variant: "error",
          autoHideDuration: 3000,
        });
        this.setState({ formLoader: false });
      }
    }
    // else if (APIResponse.status === 201) {
    //   this.setState({ getLoansLoader: false, loading: false });
    //   const message = APIResponse.data.message;
    //   this.props.enqueueSnackbar(message, {
    //     variant: "error",
    //     autoHideDuration: 3000,
    //   });
    // }
    else {
      this.setState({ getLoansLoader: false, loading: false });
      const message = APIResponse.data.message;
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
      this.setState({ formLoader: false });
    }
  };

  CalculateCollateralPayments = async () => {
    this.setState({ getLoansLoader: true, formLoader: true, loading: true });
    let x = this.state?.NextPaymentDate;
    let month = x.slice(0, 2);
    let year = x.slice(6, 10);
    var data = {};
    data.DealName = this.state.DealName;
    data.Month = month;
    data.Year = year;
    data.peers = this.state.peers;
    data.userId = sessionStorage.getItem("user_id");
    data.CurrentPaymentDate = this.state?.NextPaymentDate;

    console.log("datata", data);
    const APIResponse = await CalculateCollateralPayments(data);

    console.log("GeneralCalculateCollateralPayments", APIResponse.data);
    if (APIResponse.status === 200) {
      if (APIResponse.data.isSuccess === true) {
        this.setState({
          getLoansLoader: false,
          loading: false,
          formLoader: false,
        });
        const message = APIResponse.data.message;
        this.props.enqueueSnackbar(message, {
          variant: "info",
          autoHideDuration: 3000,
        });
        await this.CalculateConsolidatedPayments();
      } else {
        const message = APIResponse.data.message;
        this.props.enqueueSnackbar(message, {
          variant: "error",
          autoHideDuration: 3000,
        });
        this.setState({ formLoader: false });
      }
    }
    // else if (APIResponse.status === 201) {
    //   this.setState({ getLoansLoader: false, loading: false });
    //   const message = APIResponse.data.message;
    //   this.props.enqueueSnackbar(message, {
    //     variant: "error",
    //     autoHideDuration: 3000,
    //   });
    // }
    else {
      this.setState({ getLoansLoader: false, loading: false });
      const message = APIResponse.data.message;
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
      this.setState({ formLoader: false });
    }
  };

  CalculateConsolidatedPayments = async () => {
    this.setState({ getLoansLoader: true, formLoader: true, loading: true });
    let x = this.state?.NextPaymentDate;
    let month = x.slice(0, 2);
    let year = x.slice(6, 10);
    var data = {};
    data.DealName = this.state.DealName;
    data.Month = month;
    data.Year = year;
    data.peers = this.state.peers;
    data.userId = sessionStorage.getItem("user_id");
    data.CurrentPaymentDate = this.state?.NextPaymentDate;

    console.log("datata", data);
    const APIResponse = await CalculateConsolidatedPayments(data);

    console.log("PaymentCalculateConsolidatedPayments", APIResponse.data);
    if (APIResponse.status === 200) {
      if (APIResponse.data.isSuccess === true) {
        this.setState({
          getLoansLoader: false,
          loading: false,
          formLoader: false,
        });
        const message = APIResponse.data.message;
        this.props.enqueueSnackbar(message, {
          variant: "info",
          autoHideDuration: 3000,
        });
        if (sessionStorage.getItem("isESMA_Flag") === "Yes") {
          await this.CalculateESMAPayments();
        } else {
          window.location.assign("/admin/general_recurring");
        }
      } else {
        const message = APIResponse.data.message;
        this.props.enqueueSnackbar(message, {
          variant: "error",
          autoHideDuration: 3000,
        });
        this.setState({ formLoader: false });
      }
    } else {
      this.setState({ getLoansLoader: false, loading: false });
      const message = APIResponse.data.message;
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
      this.setState({ formLoader: false });
    }
  };

  CalculateESMAPayments = async () => {
    this.setState({ getLoansLoader: true, formLoader: true, loading: true });
    let x = this.state?.NextPaymentDate;
    let month = x.slice(0, 2);
    let year = x.slice(6, 10);
    var data = {};
    data.DealName = this.state.DealName;
    data.Month = month;
    data.Year = year;
    data.peers = this.state.peers;
    data.userId = sessionStorage.getItem("user_id");
    data.CurrentPaymentDate = this.state?.NextPaymentDate;

    console.log("datata", data);
    const APIResponse = await CalculateESMAPayments(data);

    console.log("PaymentCalculateESMAPayments", APIResponse.data);
    if (APIResponse.status === 200) {
      if (APIResponse.data.isSuccess === true) {
        this.setState({
          getLoansLoader: false,
          loading: false,
          formLoader: false,
        });
        const message = APIResponse.data.message;
        this.props.enqueueSnackbar(message, {
          variant: "info",
          autoHideDuration: 3000,
        });
        window.location.assign("/admin/general_recurring");
      } else {
        const message = APIResponse.data.message;
        this.props.enqueueSnackbar(message, {
          variant: "error",
          autoHideDuration: 3000,
        });
        this.setState({ formLoader: false });
      }
    } else {
      this.setState({ getLoansLoader: false, loading: false });
      const message = APIResponse.data.message;
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
      this.setState({ formLoader: false });
    }
  };

  General = (value) => {
    sessionStorage.setItem("dealname", value);
    sessionStorage.setItem("dashChanges", false);
    window.location.assign("/admin/general");
    // this.props.history.push({
    //   pathname: "/admin/general",
    //   state: { checkRecurring: true },
    // });
  };

  Loans = (value, date) => {
    sessionStorage.setItem("dealname", value);
    sessionStorage.setItem("selectdate", date);
    let x = moment(date).subtract(1, "months").format("MM/DD/YYYY").toString();
    let month = x.slice(0, 2);
    let year = x.slice(6, 10);
    sessionStorage.setItem("month", month);
    sessionStorage.setItem("year", year);
    this.props.history.push({
      pathname: "/admin/viewdetails",
      state: {
        checkRecurring: true,
        checkRecurringGeneral: true,
        checkRecurringTranches: false,
        checkRecurringFees: false,
        checkRecurringExpenses: false,
        checkRecurringAccounts: false,
        checkRecurringTests: false,
        checkRecurringVariables: false,
        checkRecurringBorrowingBase: false,
        checkRecurringPaymentRules: false,
        Month: month,
        Year: year,
        ViewDate: date,
      },
    });
  };

  handleDealNameChange = async (event) => {
    const newValue = event.target.value;

    // Update the NextPaymentDate state with the selected value
    sessionStorage.setItem("dealname", newValue);
    this.setState({ DealName: newValue, isDisable: true }, async () => {
      console.log("pppppp", this.state.DealName);
      await this.getAllPaymentDatesByDealName();

      const { Version, getDashboardVersions } = this.state;

      if (
        (Version === "WIP" || Version === "V1") &&
        getDashboardVersions.length === 1
      ) {
        this.setState({ isDisable: false, Version: "WIP" }, async () => {
          await this.generalOnPageReload();
          this.setState({ checkLoadStatus: false });
        });
      } else {
        function getMaxVersion(versions) {
          let highestNumber = -1;
          let prefix = "";

          for (const version of versions) {
            const numberMatch = version.match(/\d+/); // Extract the number using regex
            if (numberMatch) {
              const number = parseInt(numberMatch[0]);
              if (number > highestNumber) {
                highestNumber = number;
                prefix = version.replace(/\d+/g, ""); // Extract the prefix from the current version
              }
            }
          }

          if (highestNumber >= 0) {
            return prefix + highestNumber;
          } else {
            // Handle the case where no valid version numbers were found
            return null;
          }
        }

        const latestVersion = getMaxVersion(getDashboardVersions); // Assuming the latest version is at the beginning of the array

        if (Version !== latestVersion) {
          // If the selected version is not the latest, call DealRecurring
          this.setState({ isDisable: this.state.isDisable });
          await this.DealRecurring();
        } else {
          this.setState({ isDisable: false, Version: "WIP" }, async () => {
            await this.generalOnPageReload();
            this.setState({ checkLoadStatus: false });
          });
        }
      }
    });
  };

  getAllPaymentDatesByDealName = async () => {
    this.setState({ getLoansLoader: true, loading: true, screenloader: true });
    console.log("ssssssssssssssssssssss", this.state.NextPaymentDate);
    var data = {};
    data.DealName = this.state.DealName;
    data.peer = this.state.peer;

    console.log("datata", data);
    const APIResponse = await getAllPaymentDatesByDealName(data);

    console.log("getAllPaymentDatesByDealName", APIResponse.data);
    if (APIResponse.status === 200) {
      sessionStorage.setItem(
        "nextpaymentdate",
        APIResponse.data.PaymentDates[0]
      );
      sessionStorage.setItem(
        "getDashboardDates",
        JSON.stringify(APIResponse.data.PaymentDates)
      );
      sessionStorage.setItem("version", APIResponse.data.Version[0]);
      sessionStorage.setItem(
        "getDashboardVersions",
        JSON.stringify(APIResponse.data.Version)
      );
      sessionStorage.setItem(
        "isLoansProcessed",
        APIResponse.data.LoanProcessed
      );

      this.setState(
        {
          getLoansLoader: false,
          loading: false,
          getDashboardDates: JSON.parse(
            sessionStorage.getItem("getDashboardDates")
          ),
          NextPaymentDate: sessionStorage.getItem("nextpaymentdate"),
          getDashboardVersions: JSON.parse(
            sessionStorage.getItem("getDashboardVersions")
          ),
          Version: sessionStorage.getItem("version"),
          isLoansProcessed: sessionStorage.getItem("isLoansProcessed"),
        },
        () => console.log("vvvvvvvvvvvvvvv", this.state.getDashboardVersions)
      );
    } else if (APIResponse.status === 201) {
      const message = APIResponse.data.message;
      this.props.enqueueSnackbar(message, {
        variant: "info",
        autoHideDuration: 3000,
      });
    } else {
      this.setState({ screenloader: false });
      const message = APIResponse.data.message;
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  handlePaymentDateChange = async (event) => {
    const newValue = event.target.value;

    // Update the NextPaymentDate state with the selected value
    sessionStorage.setItem("nextpaymentdate", newValue);
    this.setState({ NextPaymentDate: newValue, isDisable: true }, async () => {
      console.log("pppppp", this.state.NextPaymentDate);
      await this.getAllVersionsByPaymentDate();

      const { Version, getDashboardVersions } = this.state;

      if (
        (Version === "WIP" || Version === "V1") &&
        getDashboardVersions.length === 1
      ) {
        this.setState({ isDisable: false, Version: "WIP" }, async () => {
          await this.generalOnPageReload();
          this.setState({ checkLoadStatus: false });
        });
      } else {
        function getMaxVersion(versions) {
          let highestNumber = -1;
          let prefix = "";

          for (const version of versions) {
            const numberMatch = version.match(/\d+/); // Extract the number using regex
            if (numberMatch) {
              const number = parseInt(numberMatch[0]);
              if (number > highestNumber) {
                highestNumber = number;
                prefix = version.replace(/\d+/g, ""); // Extract the prefix from the current version
              }
            }
          }

          if (highestNumber >= 0) {
            return prefix + highestNumber;
          } else {
            // Handle the case where no valid version numbers were found
            return null;
          }
        }

        const latestVersion = getMaxVersion(getDashboardVersions); // Assuming the latest version is at the beginning of the array

        if (Version !== latestVersion) {
          // If the selected version is not the latest, call DealRecurring
          this.setState({ isDisable: this.state.isDisable });
          await this.DealRecurring();
        } else {
          this.setState({ isDisable: false, Version: "WIP" }, async () => {
            await this.generalOnPageReload();
            this.setState({ checkLoadStatus: false });
          });
        }
      }
    });
  };

  getAllVersionsByPaymentDate = async () => {
    this.setState({ getLoansLoader: true, loading: true, screenloader: true });
    console.log("ssssssssssssssssssssss", this.state.NextPaymentDate);
    var data = {};
    data.DealName = this.state.DealName;
    data.selectedDate = this.state.NextPaymentDate;
    data.peer = this.state.peer;

    console.log("datata", data);
    const APIResponse = await getAllVersionsByPaymentDate(data);

    console.log("PaymentgetAllVersionsByPaymentDate", APIResponse.data);
    if (APIResponse.status === 200) {
      sessionStorage.setItem("version", APIResponse.data.Version[0]);
      sessionStorage.setItem(
        "getDashboardVersions",
        JSON.stringify(APIResponse.data.Version)
      );
      sessionStorage.setItem(
        "isLoansProcessed",
        APIResponse.data.LoanProcessed
      );

      this.setState(
        {
          getLoansLoader: false,
          loading: false,
          getDashboardVersions: JSON.parse(
            sessionStorage.getItem("getDashboardVersions")
          ),
          Version: sessionStorage.getItem("version"),
          isLoansProcessed: sessionStorage.getItem("isLoansProcessed"),
        },
        () => console.log("vvvvvvvvvvvvvvv", this.state.getDashboardVersions)
      );
    } else if (APIResponse.status === 201) {
      const message = APIResponse.data.message;
      this.props.enqueueSnackbar(message, {
        variant: "info",
        autoHideDuration: 3000,
      });
    } else {
      this.setState({ screenloader: false });
      const message = APIResponse.data.message;
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  handleVersionChange = async (event) => {
    const { Version, getDashboardVersions } = this.state;
    const newValue = event.target.value;

    // Update the Version state with the selected value
    sessionStorage.setItem("version", newValue);
    this.setState(
      {
        Version: newValue,
        isDisable: true,
      },
      async () => {
        if (
          (Version === "WIP" || Version === "V1") &&
          getDashboardVersions.length === 1
        ) {
          this.setState({ isDisable: false, Version: "WIP" }, async () => {
            await this.generalOnPageReload();
            this.setState({ checkLoadStatus: false });
          });
        } else {
          function getMaxVersion(versions) {
            let highestNumber = -1;
            let prefix = "";

            for (const version of versions) {
              const numberMatch = version.match(/\d+/); // Extract the number using regex
              if (numberMatch) {
                const number = parseInt(numberMatch[0]);
                if (number > highestNumber) {
                  highestNumber = number;
                  prefix = version.replace(/\d+/g, ""); // Extract the prefix from the current version
                }
              }
            }

            if (highestNumber >= 0) {
              return prefix + highestNumber;
            } else {
              // Handle the case where no valid version numbers were found
              return null;
            }
          }

          const latestVersion = getMaxVersion(getDashboardVersions); // Assuming the latest version is at the beginning of the array

          if (sessionStorage.getItem("version") !== latestVersion) {
            // If the selected version is not the latest, call DealRecurring
            this.setState({ isDisable: this.state.isDisable });
            await this.DealRecurring();
          } else {
            this.setState({ isDisable: false, Version: "WIP" }, async () => {
              await this.generalOnPageReload();
              this.setState({ checkLoadStatus: false });
            });
          }
        }
      }
    );
  };

  async componentDidMount() {
    var component = window.location.pathname;
    sessionStorage.setItem("component", component);
    this.generalRecurring()
    this.recurring();
    // // sessionStorage.setItem("isTabChange", false);
    // const { Version, getDashboardVersions } = this.state;

    // if (
    //   (Version === "WIP" || Version === "V1") &&
    //   getDashboardVersions.length === 1
    // ) {
    //   this.setState({ isDisable: false, Version: "WIP" }, async () => {
    //     await this.generalOnPageReload();
    //     this.setState({ checkLoadStatus: false });
    //   });
    // } else {
    //   function getMaxVersion(versions) {
    //     let highestNumber = -1;
    //     let prefix = "";

    //     for (const version of versions) {
    //       const numberMatch = version.match(/\d+/); // Extract the number using regex
    //       if (numberMatch) {
    //         const number = parseInt(numberMatch[0]);
    //         if (number > highestNumber) {
    //           highestNumber = number;
    //           prefix = version.replace(/\d+/g, ""); // Extract the prefix from the current version
    //         }
    //       }
    //     }

    //     if (highestNumber >= 0) {
    //       return prefix + highestNumber;
    //     } else {
    //       // Handle the case where no valid version numbers were found
    //       return null;
    //     }
    //   }

    //   const latestVersion = getMaxVersion(getDashboardVersions); // Assuming the latest version is at the beginning of the array

    //   if (Version !== latestVersion) {
    //     // If the selected version is not the latest, call DealRecurring
    //     this.setState({ isDisable: this.state.isDisable });
    //     await this.DealRecurring();
    //   } else {
    //     this.setState({ isDisable: false, Version: "WIP" }, async () => {
    //       await this.generalOnPageReload();
    //       this.setState({ checkLoadStatus: false });
    //     });
    //   }
    // }
  }

  render() {
    return (
      <React.Fragment>
        <div className="page">
          <Sidebar activeComponent={"ReccuringDeals"} />
          <div className="content1">
            {this.state.screenloader == true ? (
              <LinearLoader></LinearLoader>
            ) : (
              <>
                <div className="page-content">
                  <div className="row row1">
                    <div
                      className="col-12 col-sm-6 col-md-7 d-flex hellocard"
                      style={{
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: "1.5rem",
                        width: "90rem",
                      }}
                    >
                      <div style={{ display: "flex", paddingBottom: "1.6rem" }}>
                        <KeyboardBackspaceIcon
                          onClick={this.goBackToDashboard}
                          className="left-arrow-muis1 left-arrow-servicer"
                        ></KeyboardBackspaceIcon>
                        <h3 className="headerdashboard">Deal Recurring</h3>
                      </div>
                    </div>
                  </div>

                  <div className="row1 css-recurring">
                    <div className="recurring_details_new">
                      <div>
                        <label className="dealInfo">Deal Name : </label>
                        {/* <h6 className="dealInfo1">{this.state.DealName}</h6> */}
                        <div>
                          <select
                            className="input-select-general-new1-deal"
                            value={this.state?.DealName}
                            onChange={this.handleDealNameChange}
                          >
                            {this.state.getDashboardDeals?.map(
                              (option, index) => (
                                <option key={index} value={option}>
                                  {option}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="dealInfo">Payment Date : </label>
                        {/* <h6 className="dealInfo1">
                          {this.state?.NextPaymentDate}
                        </h6> */}
                        <div>
                          <select
                            className="input-select-general-new1"
                            value={this.state?.NextPaymentDate}
                            onChange={this.handlePaymentDateChange}
                          >
                            {this.state.getDashboardDates?.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="dealInfo">Version : </label>
                        {/* <h6 className="dealInfo1">{this.state?.Version}</h6> */}
                        <div>
                          <select
                            className="input-select-general-new1"
                            value={
                              this.state.Version === "WIP"
                                ? sessionStorage.getItem("version")
                                : this.state.Version
                            }
                            onChange={this.handleVersionChange}
                          >
                            {this.state.getDashboardVersions?.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
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
                          Edit
                          {this.state.downArrow ? (
                            <ArrowDropDownIcon />
                          ) : (
                            <ArrowDropUpIcon />
                          )}
                        </Button>
                      </OverlayTrigger>
                      {this.state.isDisable === true ||
                      this.state.isLoansProcessed === "No" ? (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={this.CalculatePrePayments}
                          disabled
                        >
                          Calculate
                          {this.state.formLoader === true ? (
                            <CircularProgress size="22px" color="primary" />
                          ) : (
                            ""
                          )}
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={
                            sessionStorage.getItem("isSecuritisation") !==
                            "Securitisation"
                              ? this.onOpenModalBorrow
                              : this.CalculatePrePayments
                          }
                        >
                          Calculate
                          {this.state.formLoader === true ? (
                            <CircularProgress size="22px" color="primary" />
                          ) : (
                            ""
                          )}
                        </Button>
                      )}
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

                        {this.state.isLoansProcessed === "No" ? (
                          <button
                            type="button"
                            onClick={() => this.handleClickTranches()}
                            className={
                              this.state.activeInsights2 == true
                                ? "issuerDashboard-table-top-button-workbench-active"
                                : "issuerDashboard-table-top-button-workbench"
                            }
                            disabled
                          >
                            Tranches
                          </button>
                        ) : (
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
                        )}

                        {this.state.isLoansProcessed === "No" ? (
                          <button
                            type="button"
                            onClick={() => this.handleClickFees()}
                            className={
                              this.state.activeInsights3 == true
                                ? "issuerDashboard-table-top-button-rejected-active"
                                : "issuerDashboard-table-top-button-rejected"
                            }
                            disabled
                          >
                            Fees
                          </button>
                        ) : (
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
                        )}

                        {this.state.isLoansProcessed === "No" ? (
                          <button
                            type="button"
                            onClick={() => this.handleClickExpenses()}
                            className={
                              this.state.activeInsights4 == true
                                ? "issuerDashboard-table-top-button-rejected-active"
                                : "issuerDashboard-table-top-button-rejected"
                            }
                            disabled
                          >
                            Expenses
                          </button>
                        ) : (
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
                        )}

                        {this.state.isLoansProcessed === "No" ? (
                          <button
                            type="button"
                            onClick={() => this.handleClickAccounts()}
                            className={
                              this.state.activeInsights5 == true
                                ? "issuerDashboard-table-top-button-rejected-active"
                                : "issuerDashboard-table-top-button-rejected"
                            }
                            disabled
                          >
                            Accounts
                          </button>
                        ) : (
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
                        )}

                        {this.state.isLoansProcessed === "No" ? (
                          <button
                            type="button"
                            onClick={() => this.handleClickTests()}
                            className={
                              this.state.activeInsights6 == true
                                ? "issuerDashboard-table-top-button-rejected-active"
                                : "issuerDashboard-table-top-button-rejected"
                            }
                            disabled
                          >
                            Tests
                          </button>
                        ) : (
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
                        )}

                        {this.state.isLoansProcessed === "No" &&
                        sessionStorage.getItem("isSecuritisation") !==
                          "Securitisation" ? (
                          <button
                            type="button"
                            onClick={() => this.handleBorrowingBase()}
                            className={
                              this.state.activeInsightsBB == true
                                ? "issuerDashboard-table-top-button-rejected-active"
                                : "issuerDashboard-table-top-button-rejected"
                            }
                            disabled
                          >
                            Borrowing Base
                          </button>
                        ) : sessionStorage.getItem("isSecuritisation") !==
                          "Securitisation" ? (
                          <button
                            type="button"
                            onClick={() => this.handleBorrowingBase()}
                            className={
                              this.state.activeInsightsBB == true
                                ? "issuerDashboard-table-top-button-rejected-active"
                                : "issuerDashboard-table-top-button-rejected"
                            }
                          >
                            Borrowing Base
                          </button>
                        ) : null}

                        {this.state.isLoansProcessed === "No" ? (
                          <button
                            type="button"
                            onClick={() => this.handleClickVariables()}
                            className={
                              this.state.activeInsights7 == true
                                ? "issuerDashboard-table-top-button-rejected-active"
                                : "issuerDashboard-table-top-button-rejected"
                            }
                            disabled
                          >
                            Variables
                          </button>
                        ) : (
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
                        )}
                        {this.state.isLoansProcessed === "No" ? (
                          <button
                            type="button"
                            onClick={() => this.handleClickPaymentRules()}
                            className={
                              this.state.activeInsights8 == true
                                ? "issuerDashboard-table-top-button-rejected-active"
                                : "issuerDashboard-table-top-button-rejected"
                            }
                            disabled
                          >
                            Payment Rules
                          </button>
                        ) : (
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
                        )}
                        {/* {this.state.isLoansProcessed === "No" ? (
                          <button
                            type="button"
                            onClick={() => this.handleClickCollateral()}
                            className={
                              this.state.activeInsights9 == true
                                ? "issuerDashboard-table-top-button-rejected-active"
                                : "issuerDashboard-table-top-button-rejected"
                            }
                            disabled
                          >
                            Collateral
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => this.handleClickCollateral()}
                            className={
                              this.state.activeInsights9 == true
                                ? "issuerDashboard-table-top-button-rejected-active"
                                : "issuerDashboard-table-top-button-rejected"
                            }
                          >
                            Collateral
                          </button>
                        )}

                        {this.state.isLoansProcessed === "No" ? (
                          <button
                            type="button"
                            onClick={() => this.handleClickLoanTape()}
                            className={
                              this.state.activeInsights10 == true
                                ? "issuerDashboard-table-top-button-rejected-active"
                                : "issuerDashboard-table-top-button-rejected"
                            }
                            disabled
                          >
                            Loan Tape
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => this.handleClickLoanTape()}
                            className={
                              this.state.activeInsights10 == true
                                ? "issuerDashboard-table-top-button-rejected-active"
                                : "issuerDashboard-table-top-button-rejected"
                            }
                          >
                            Loan Tape
                          </button>
                        )}

                        {this.state.isLoansProcessed === "No" ? (
                          <button
                            type="button"
                            onClick={() => this.handleClickConsolidated()}
                            className={
                              this.state.activeInsights11 == true
                                ? "issuerDashboard-table-top-button-rejected-active"
                                : "issuerDashboard-table-top-button-rejected"
                            }
                            disabled
                          >
                            Consolidated
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => this.handleClickConsolidated()}
                            className={
                              this.state.activeInsights11 == true
                                ? "issuerDashboard-table-top-button-rejected-active"
                                : "issuerDashboard-table-top-button-rejected"
                            }
                          >
                            Consolidated
                          </button>
                        )}

                        {this.state.isLoansProcessed === "No" ? (
                          <button
                            type="button"
                            onClick={() => this.handleClickFiles()}
                            className={
                              this.state.activeInsights12 == true
                                ? "issuerDashboard-table-top-button-rejected-active"
                                : "issuerDashboard-table-top-button-rejected"
                            }
                            disabled
                          >
                            Files
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => this.handleClickFiles()}
                            className={
                              this.state.activeInsights12 == true
                                ? "issuerDashboard-table-top-button-rejected-active"
                                : "issuerDashboard-table-top-button-rejected"
                            }
                          >
                            Files
                          </button>
                        )} */}
                      </div>
                    </div>
                    {/* <div className="recurring_details">
                      <div>
                        <label className="dealInfo">Deal Name : </label>
                        <h6 className="dealInfo1">{this.state.DealName}</h6>
                      </div>
                      <div>
                        <label className="dealInfo">Payment Date : </label>
                        <h6 className="dealInfo1">
                          {this.state?.NextPaymentDate}
                        </h6>
                      </div>
                    </div> */}
                  </div>

                  <div className="row row1">
                    <div className="investor-heading-container">
                      <h1 className="headerdashboard1">General Details</h1>
                    </div>
                  </div>

                  <React.Fragment>
                    <div className="page-content1">
                      <h5 className="headingspace"></h5>
                      <div className="row">
                        <div className="col">
                          <div className="headingspaces1">
                            <p className="sizeofp">Deal ID</p>
                            <h6 className="headingspace1">
                              {this.state.tableData["Deal Id"] === undefined
                                ? "-"
                                : this.state.tableData["Deal Id"]}
                            </h6>
                          </div>
                          <div className="headingspaces1">
                            {this.state.tableData["Originator Name"]?.map(
                              (item, index) => (
                                <>
                                  <p className="sizeofp">
                                    Originator {index + 1} Name
                                  </p>
                                  <h6 className="headingspace1">
                                    {item === "" ? "-" : item}
                                  </h6>
                                </>
                              )
                            )}
                          </div>
                          <div className="headingspaces1">
                            <p className="sizeofp">Payment Date</p>
                            <h6 className="headingspace1">
                              {this.state.tableData["Payment Date"] ===
                              undefined
                                ? "-"
                                : this.state.tableData["Payment Date"]}
                            </h6>
                          </div>
                          <div className="headingspaces1">
                            <p className="sizeofp">Initial Deal Size</p>
                            <h6 className="headingspace1">
                              {this.state.tableData["Initial Deal Size"] !==
                                undefined &&
                              this.state.tableData["Initial Deal Size"] !==
                                "" ? (
                                <NumberComp2
                                  value={
                                    this.state.tableData["Initial Deal Size"]
                                  }
                                />
                              ) : (
                                "-"
                              )}
                            </h6>
                          </div>

                          <div className="headingspaces1">
                            <p className="sizeofp">Cut-off Date</p>
                            <h6 className="headingspace1">
                              {this.state.tableData["Cutoff Date"] !==
                                undefined &&
                              this.state.tableData["Cutoff Date"] !== "" ? (
                                <NumberComp2
                                  value={this.state.tableData["Cutoff Date"]}
                                />
                              ) : (
                                "-"
                              )}

                              {/* {} */}
                            </h6>
                          </div>

                          <div className="headingspaces1">
                            <p className="sizeofp">Master Trust Flag</p>
                            <h6 className="headingspace1">
                              {this.state.tableData["Master Trust Flag"] ===
                                undefined ||
                              this.state.tableData["Master Trust Flag"] === ""
                                ? "-"
                                : this.state.tableData["Master Trust Flag"]}
                            </h6>
                          </div>
                          {/* <div className="headingspaces1">
                        <p className="sizeofp">Model Analyst Name</p>
                        <h6 className="headingspace1">
                          {this.state.tableData.ModelAnalystName}
                        </h6>
                      </div> */}
                        </div>

                        <div className="col">
                          <div className="headingspaces1">
                            <p className="sizeofp">Deal Name</p>
                            <h6 className="headingspace1">
                              {this.state.tableData["Deal Name"] ===
                                undefined ||
                              this.state.tableData["Deal Name"] === ""
                                ? "-"
                                : this.state.tableData["Deal Name"]}
                            </h6>
                          </div>
                          <div className="headingspaces1">
                            <p className="sizeofp">First Payment Date</p>
                            <h6 className="headingspace1">
                              {this.state.tableData["First Payment Date"] ===
                                undefined ||
                              this.state.tableData["First Payment Date"] === ""
                                ? "-"
                                : this.state.tableData["First Payment Date"]}
                            </h6>
                          </div>
                          <div className="headingspaces1">
                            <p className="sizeofp">Legal Maturity Date</p>
                            <h6 className="headingspace1">
                              {this.state.tableData["Legal Maturity Date"] ===
                                undefined ||
                              this.state.tableData["Legal Maturity Date"] === ""
                                ? "-"
                                : this.state.tableData["Legal Maturity Date"]}
                            </h6>
                          </div>
                          <div className="headingspaces1">
                            <p className="sizeofp">Delinquency Method</p>
                            <h6 className="headingspace1">
                              {this.state.tableData["Delinquency Method"] ===
                                undefined ||
                              this.state.tableData["Delinquency Method"] === ""
                                ? "-"
                                : this.state.tableData["Delinquency Method"]}
                            </h6>
                          </div>

                          <div className="headingspaces1">
                            <p className="sizeofp">Determination Date</p>
                            <h6 className="headingspace1">
                              {this.state.tableData["Determination Date"] !==
                                undefined &&
                              this.state.tableData["Determination Date"] !==
                                "" ? (
                                <NumberComp2
                                  value={
                                    this.state.tableData["Determination Date"]
                                  }
                                />
                              ) : (
                                "-"
                              )}

                              {/* {} */}
                            </h6>
                          </div>
                          {/* <div className="headingspaces1">
                        <p className="sizeofp">SubPool Information</p>
                        <h6 className="headingspace1">
                          {this.state.tableData.SubPoolInformation}
                        </h6>
                      </div>
                      <div className="headingspaces1">
                        <p className="sizeofp">Reporting Analyst Name</p>
                        <h6 className="headingspace1">
                          {this.state.tableData.ReportingAnalystName}
                        </h6>
                      </div> */}
                        </div>

                        <div className="col">
                          <div className="headingspaces1">
                            <p className="sizeofp">Issuer Name</p>
                            <h6 className="headingspace1">
                              {this.state.tableData["Issuer Name"] ===
                                undefined ||
                              this.state.tableData["Issuer Name"] === ""
                                ? "-"
                                : this.state.tableData["Issuer Name"]}
                            </h6>
                          </div>
                          <div className="headingspaces1">
                            {this.state.tableData["Rating Agency"]?.map(
                              (item, index) => (
                                <>
                                  <p className="sizeofp">
                                    Rating Agency {index + 1} Name
                                  </p>
                                  <h6 className="headingspace1">
                                    {item === "" ? "-" : item}
                                  </h6>
                                </>
                              )
                            )}
                          </div>
                          <div className="headingspaces1">
                            <p className="sizeofp">Closing Date</p>
                            <h6 className="headingspace1">
                              {this.state.tableData["Closing Date"] ===
                                undefined ||
                              this.state.tableData["Closing Date"] === ""
                                ? "-"
                                : this.state.tableData["Closing Date"]}
                            </h6>
                          </div>
                          <div className="headingspaces1">
                            <p className="sizeofp">Payment Frequency</p>
                            <h6 className="headingspace1">
                              {this.state.tableData["Payment Frequency"] ===
                                undefined ||
                              this.state.tableData["Payment Frequency"] === ""
                                ? "-"
                                : this.state.tableData["Payment Frequency"]}
                            </h6>
                          </div>

                          <div className="headingspaces1">
                            <p className="sizeofp">Record Date</p>
                            <h6 className="headingspace1">
                              {this.state.tableData["Record Date"] !==
                                undefined &&
                              this.state.tableData["Record Date"] !== "" ? (
                                <NumberComp2
                                  value={this.state.tableData["Record Date"]}
                                />
                              ) : (
                                "-"
                              )}
                              {/* {} */}
                            </h6>
                          </div>
                          {/* <div className="headingspaces1">
                        <p className="sizeofp">Business Day Convention</p>
                        <h6 className="headingspace1">
                          {this.state.tableData.BusinessDayConvention}
                        </h6>
                      </div> */}
                        </div>

                        <div className="col">
                          <div className="headingspaces1">
                            {this.state.tableData?.Servicer?.map(
                              (item, index) => (
                                <>
                                  <p className="sizeofp">
                                    Servicer {index + 1} Name
                                  </p>
                                  <h6 className="headingspace1">
                                    {item === "" ? "-" : item}
                                  </h6>
                                </>
                              )
                            )}
                          </div>
                          <div className="headingspaces1">
                            <p className="sizeofp">Pricing Date</p>
                            <h6 className="headingspace1">
                              {this.state.tableData["Pricing Date"] ===
                                undefined ||
                              this.state.tableData["Pricing Date"] === ""
                                ? "-"
                                : this.state.tableData["Pricing Date"]}
                            </h6>
                          </div>
                          <div className="headingspaces1">
                            <p className="sizeofp">Asset Class</p>
                            <h6 className="headingspace1">
                              {this.state.tableData["Asset Class"] ===
                                undefined ||
                              this.state.tableData["Asset Class"] === ""
                                ? "-"
                                : this.state.tableData["Asset Class"]}
                            </h6>
                          </div>

                          <div className="headingspaces1">
                            <p className="sizeofp">Financing Type</p>
                            <h6 className="headingspace1">
                              {this.state.tableData["Financing Type"] ===
                                undefined ||
                              this.state.tableData["Financing Type"] === ""
                                ? "-"
                                : this.state.tableData["Financing Type"]}
                            </h6>
                          </div>

                          <div className="headingspaces1">
                            <p className="sizeofp">ESMA Compliant</p>
                            <h6 className="headingspace1">
                              {this.state.tableData["ESMA Compliant"] ===
                                undefined ||
                              this.state.tableData["ESMA Compliant"] === ""
                                ? "-"
                                : this.state.tableData["ESMA Compliant"]}
                            </h6>
                          </div>

                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                </div>
                <div id="modal1">
                  <ReactModal
                    isOpen={this.state.isBorrow}
                    onRequestClose={this.onCloseModalBorrow}
                    contentLabel="Minimal Modal Example"
                    style={customStylesautosmallmodalpopupBorrow}
                  >
                    <React.Fragment>
                      <div className="modalPopup">
                        <h3 className="popupheading">
                          Do you want to run Payment Waterfall?
                        </h3>

                        {/* {this.state.popupLoader === true ? <CircularProgress size="30px" color="secondary" /> : ' '} */}

                        <div className="modalshiftcontent">
                          <div className="modalsubmit">
                            <div className="submitbuttonbg">
                              <div className="row">
                                <div className="row justify-content-start11">
                                  <button
                                    type="button"
                                    className="popupbutton1"
                                    onClick={this.onCloseModalBorrow}
                                  >
                                    Cancel
                                  </button>
                                </div>
                                <div className="row justify-content-end11">
                                  <button
                                    type="button"
                                    className="popupbutton1"
                                    onClick={this.checkBorrowBaseNo}
                                  >
                                    No
                                  </button>

                                  <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    onClick={this.checkBorrowBaseYes}
                                  >
                                    Yes
                                    {/* {this.state.formLoader === true ? (
                                    <CircularProgress
                                      size="25px"
                                      color="primary"
                                    />
                                  ) : (
                                    ""
                                  )} */}
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  </ReactModal>
                </div>
                <>
                  <div className="btn_move">
                    {/* <div className="btn_prev" onClick={this.showPrev} disabled>
                      Previous
                    </div> */}
                    {this.state.isLoansProcessed === "No" ? (
                      <button
                        className="btn_next"
                        onClick={this.showNext}
                        disabled
                      >
                        Next
                      </button>
                    ) : (
                      <button className="btn_next" onClick={this.showNext}>
                        Next
                      </button>
                    )}
                  </div>
                </>
              </>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withSnackbar(General_Recurring);
