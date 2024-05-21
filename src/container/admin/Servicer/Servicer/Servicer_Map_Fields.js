/* eslint-disable require-jsdoc */
import React, { Component } from "react";
// import { connect } from 'react-redux';
import Sidebar from "../../../../components/sidebar";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import { withSnackbar } from "notistack";
import { createTheme, MuiThemeProvider } from "@material-ui/core/styles";
import "react-input-range/lib/css/index.css";
import MUIDataTable from "mui-datatables";
import Switch from "@mui/material/Switch";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import {
  StdfieldsQuery,
  getMapping,
  saveMapping,
  // SaveLoanProcessDate,
} from "../../../../servies/services";
import * as moment from "moment";
import CircularProgress from "@material-ui/core/CircularProgress";
import LinearLoader from "../../../../components/loader/LinearLoader";

class Map_Fields extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDropdown: {},
      isFullScreen: false,
      loading: false,
      searchText: "",
      inputValue: "",
      data1: [],
      mappingData: [],
      inputMappingData: [],
      screenloader: false,
      saveScreenMapping: false,
      isChecked: false,
      dontCheck: false,
      isToggle: false,
      DealName:
        sessionStorage.getItem("dealname") === null
          ? sessionStorage.getItem("servicerdealname")
          : sessionStorage.getItem("dealname"),
      ServicerName:
        sessionStorage.getItem("Servicer") === null
          ? sessionStorage.getItem("servicerdashboardname")
          : sessionStorage.getItem("Servicer"),
      detailsDate:
        sessionStorage.getItem("selectdate") === null
          ? sessionStorage.getItem("selectservicerdate")
          : sessionStorage.getItem("selectdate"),
      peer: sessionStorage.getItem("peer_insurer"),
      peers: JSON.parse(sessionStorage.getItem("peers")),
      AssetType: sessionStorage.getItem("assettype"),
      StdFieldsQuerys: [],
      StdHeaders: [],
      formData: {
        valueRight: "",
      },
      activeInsights2: false,
      activeInsights3: true,
      activeInsights4: false,
      activeInsights5: false,
      screendisplay: true,
      servicerDealName: sessionStorage.getItem('dealName'),
      servicerPaymentDate: sessionStorage.getItem('paymentDate'),
      userid: sessionStorage.getItem('userid'),
      token : sessionStorage.getItem('token'),
      assetClass : sessionStorage.getItem('assetClass')
    };
  }

  handleClickUploadLoanTapes = () => {
    this.setState({
      activeInsights1: true,
      activeInsights2: false,
      activeInsights3: false,
      activeInsights4: false,
      activeInsights5: false,
    });
    window.location.assign("/admin/uploadLoanTape");
  };

  handleClickPreviewLoanTape = () => {
    this.setState({
      activeInsights1: false,
      activeInsights2: true,
      activeInsights3: false,
      activeInsights4: false,
      activeInsights5: false,
    });
    window.location.assign("/admin/previewloantapedetails");
  };
  handleClickMapFields = () => {
    this.setState({
      activeInsights1: false,
      activeInsights2: false,
      activeInsights3: true,
      activeInsights4: false,
      activeInsights5: false,
    });
  };
  handleClickPreviewMappedFields = () => {
    this.setState({
      activeInsights1: false,
      activeInsights2: false,
      activeInsights3: false,
      activeInsights4: true,
      activeInsights5: false,
    });
    window.location.assign("/admin/previewmapfields");
  };
  handleClickSummarize = () => {
    this.setState({
      activeInsights1: false,
      activeInsights2: false,
      activeInsights3: false,
      activeInsights4: false,
      activeInsights5: true,
    });
    window.location.assign("/admin/summarize");
  };

  onchange = (e) => {
    this.setState({ searchText: e.target.value, searchType: true });
    console.log("search: e.target.value", e.target.value);
  };

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
        // MUIDataTableBodyRow: {
        //   root: {
        //     "&:nth-child(even)": {
        //       backgroundColor: "rgb(229,229,229,0.3) !important",
        //     },
        //     "&.Mui-selected": {
        //       backgroundColor: "white !important",
        //     },
        //   },
        //   hoverCursor: {
        //     cursor: "auto !important",
        //   },
        // },
        MuiTableCell: {
          root: {
            fontFamily: "Mulish, sans-serif !important",
            padding: "20px",
            fontSize: "0.980rem !important",
            borderBottom: "none !important",
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
            backgroundColor: "white !important",
            backgroundClip: "padding-box",
            borderBottom: "none !important",
            paddingBottom: "5px !important",
            paddingTop: "5px !important",
            paddingLeft: "15px !important",
            position: "relative",
            zIndex: 1000,
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
        MUIDataTableSelectCell: {
          headerCell: {
            backgroundColor: "rgba(1, 142, 130, 0.1) !important",
          },
          checkboxRoot: {
            "&$checked": {
              color: "#FFC000 !important",
            },
          },
          checked: {},
          disabled: {},
        },
      },
    });
  getMuiTheme1 = () =>
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
            borderBottom: "none !important",
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
            backgroundColor: "white !important",
            backgroundClip: "padding-box",
            borderBottom: "none !important",
            paddingBottom: "5px !important",
            paddingTop: "10px !important",
            paddingLeft: "20px !important",
            position: "relative",
            fontSize: "15px !important",
            fontWeight: "600 !important",
            zIndex: 1000,
            height: "3rem",
            "&::after": {
              content: "''",
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(1, 142, 130, 0.1) !important",
              height: "3rem",
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
        MUIDataTableSelectCell: {
          headerCell: {
            backgroundColor: "rgba(1, 142, 130, 0.1) !important",
          },
          checkboxRoot: {
            "&$checked": {
              color: "#FFC000 !important",
            },
          },
          checked: {},
          disabled: {},
        },
      },
    });

  // toggleDropdown = () => {
  //   this.setState((prevState) => ({
  //     showDropdown: !prevState.showDropdown,
  //   }));
  // };

  toggleDropdown = (index) => {
    console.log(this.state.mappingData[index]);
    this.state.mappingData[index].Value = "";
    if (this.state.mappingData[index].Expression === "Yes") {
      this.state.mappingData[index].Expression = "No";
    } else {
      this.state.mappingData[index].Expression = "Yes";
    }
    this.setState((prevState) => {
      const updatedShowDropdown = { ...prevState.showDropdown };
      if (this.state.mappingData[index].Expression === "No") {
        prevState.showDropdown[index] = true;
      } else {
        prevState.showDropdown[index] = false;
      }
      console.log(prevState.showDropdown[index]);
      updatedShowDropdown[index] = !prevState.showDropdown[index];
      console.log(updatedShowDropdown);
      return { showDropdown: updatedShowDropdown };
    });
  };
  goBackToDashBoard = () => {
    // if (sessionStorage.getItem("user_name") === "Trustee") {
    //   this.props.history.push({
    //     pathname: "/admin/viewdetails",
    //     state: { details: this.state.detailsDate },
    //   });
    // } else {
    //   this.props.history.push({
    //     pathname: "/dashboard/servicer",
    //   });
    // }
    window.location.assign("/admin/previewloantapedetails")
  };

  StdfieldsQuery = async () => {
    let x = moment(this.state.servicerPaymentDate)
      .subtract(1, "months")
      .format("MM/DD/YYYY")
      .toString();
    let month = x.slice(0, 2);
    let year = x.slice(6, 10);
    var data = {};
    data.DealName = this.state.servicerDealName;
    data.Month = month;
    data.Year = year;
    data.ServicerName = this.state.userid;
    data.peer = this.state.peer;
    data.AssetType = this.state.assetClass;

    console.log("datata", data);
    this.setState({ screenloader: true });
    const APIResponse = await StdfieldsQuery(data , this.state.token);
    const leftMappingData = [...new Set(APIResponse.data?.stdfields)];
    console.log(leftMappingData);
    console.log(this.state.mappingData);
    const rightMappingData = this.state.mappingData.map((v) => v.Key);
    const filteredLeftData = leftMappingData.filter(
      (item) => !rightMappingData.includes(item)
    );
    console.log(filteredLeftData);
    const getData = filteredLeftData
      .map((Key) => ({ Key }))
      .filter(
        (item) => item.Key !== this.state.mappingData.map((v) => v.Key)[0]
      );
    console.log(getData);
    if (APIResponse.status === 200) {
      this.setState({
        StdFieldsQuerys: getData,
        StdHeaders: APIResponse.data?.loantapefields.map((Key) => ({ Key })),
        screenloader: false,
      });
      const message = "Deal Document Update Success";
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

  getMapping = async () => {
    let x = moment(this.state.servicerPaymentDate)
      .subtract(1, "months")
      .format("MM/DD/YYYY")
      .toString();
    let month = x.slice(0, 2);
    let year = x.slice(6, 10);
    var data = {};
    data.DealName = this.state.servicerDealName;
    data.Month = month;
    data.Year = year;
    data.ServicerName = this.state.userid;
    // data.CurrentPaymentDate = this.state?.detailsDate;

    const saveData = this.state.mappingData.map((obj, index) => ({
      [`Key ${index}`]: obj.Key,
      [`Value ${index}`]: obj.Value,
      Expression: obj.Expression,
    }));
    // data.MappingData = saveData;
    data.peer = this.state.peer;

    console.log("datata", data);
    this.setState({
      formLoader: true,
      screenloader: true,
      saveScreenMapping: true,
    });
    const APIResponse = await getMapping(data , this.state.token);

    console.log("SaveMapping", APIResponse.data);
    if (APIResponse.status === 200) {
      this.setState({
        formLoader: false,
        screenloader: true,
        saveScreenMapping: true,
        mappingData: APIResponse.data,
      });
      this.StdfieldsQuery();
      // const message = "Deal Document Update Success";
      // this.props.enqueueSnackbar(message, {
      //   variant: "info",
      //   autoHideDuration: 3000,
      // });
      //window.location.assign("/admin/previewmapfields");
    } else {
      this.setState({ formLoader: false, screenloader: false });
      const message = APIResponse.data.message;
      console.log(message)
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  SaveLoanProcessDate = async () => {
    let x = moment(this.state.servicerPaymentDate)
      .subtract(1, "months")
      .format("MM/DD/YYYY")
      .toString();
    let month = x.slice(0, 2);
    let year = x.slice(6, 10);
    var data = {};
    data.DealName = this.state.servicerDealName;
    data.Month = month;
    data.Year = year;
    data.ServicerName = this.state.userid;
    data.peers = this.state.peer;
    const saveData = this.state.mappingData.map((obj, index) => ({
      [`Key ${index}`]: obj.Key,
      [`Value ${index}`]: obj.Value,
      Expression: obj.Expression,
    }));
    data.MappingData = saveData;
    data.CurrentPaymentDate = this.state.servicerPaymentDate;

    console.log("datata", data);
    this.setState({ formLoader: true });
    const APIResponse = await saveMapping(data , this.state.token);

    console.log("SaveMapping", APIResponse.data);
    if (APIResponse.status === 200) {
      this.setState({ formLoader: false });
      const message = "Deal Document Update Success";
      this.props.enqueueSnackbar(message, {
        variant: "info",
        autoHideDuration: 3000,
      });
      window.location.assign("/admin/previewmapfields");
    } else {
      this.setState({ formLoader: false });
      const message = APIResponse.data.message;
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  componentDidMount() {
    // this.StdfieldsQuery()
    this.getMapping();
  }

  render() {
    // const reqData = this.state.data.map(name => ({name}));
    // const reqHeader = this.state.header.map(name => ({name}));
    // console.log(reqHeader);
    // const getdropDownData = reqHeader.map(item=>Object.keys(item).map(key=>({value: item[key]})));
    // console.log(getdropDownData);
    //   console.log(this.state.inputValue);
    console.log(
      this.state.StdFieldsQuerys.filter(
        (item) => item.Key !== this.state.mappingData.map((v) => v.Key)[0]
      )
    );
    // const stdFields = this.state.StdFieldsQuerys.map(item=>item.Key)
    // //.filter((item)=>item !== this.state.map(item=>item.Key));
    const mapFields = this.state.mappingData;
    console.log(this.state.mappingData.map((v) => v.Key)[0]);
    // .filter((item)=>!this.state.mappingData.includes(item))
    // const filteredStdFields = stdFields.filter((item)=>!mapFields.includes(item));
    // console.log(filteredStdFields);

    // console.log(std.filter((item)=>item !== mpd[0]));
    // console.log(mpd);

    const columns = [
      {
        name: "Key",
        label: "Select Intain Fields",
        options: {
          filter: true,
          sort: true,

          customBodyRender: (value, tableMeta, updateValue) => {
             console.log(value);
              console.log('tableMeta',tableMeta.rowData[0]);
             // console.log(tableMeta.tableData.flat(1));
             const filtereData = this.state.mappingData.map(item=>item.Key !== value ? value : null);
            //  console.log(this.state.mappingData);
              console.log(filtereData);
            console.log([value]);
            return (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <input
                  type="checkbox"
                  id={tableMeta.rowData[0]}
                  style={{ cursor: "pointer", marginRight: "2rem" }}
                  onChange={(e) => pushData(e, value, tableMeta)}
                  checked={this.state.dontCheck}
                />
                <label for={tableMeta.rowData[0]}>{value}</label>
              </div>
            );
          },
        },
      },
    ];
    console.log("Valueee", this.state.mappingData[0]);
    const columns1 = [
      {
        name: "Key",
        label: "Selected Intain Fields",
        options: {
          filter: true,
          sort: false,
          customBodyRender: (value, tableMeta, updateValue) => {
            console.log('tableMeta',value);
            return (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <input
                  type="checkbox"
                  id={tableMeta.rowData[0]}
                  style={{ cursor: "pointer", marginRight: "2rem" }}
                  onChange={(e) => removeData(e, value, tableMeta)}
                  // checked={this.state.isChecked}
                  checked
                />
                <label for={tableMeta.rowData[0]}>{value}</label>
              </div>
            );
          },
        },
      },
      {
        name: "Servicer",
        label: "Servicer Tape Fields",
        options: {
          filter: true,
          sort: false,

          customBodyRender: (value, tableMeta, updateValue) => {
            const index = tableMeta.rowIndex;
            console.log(tableMeta);

            return (
              <div
                style={{ display: "flex", gap: "1rem", alignItems: "center" }}
              >
                {/*  || this.state.mappingData[index].Expression === 'Yes' */}
                <Switch
                  checked={
                    this.state.showDropdown[index] ||
                    this.state.mappingData[index].Expression === "Yes"
                  }
                  onClick={() => this.toggleDropdown(index)}
                />
                {this.state.showDropdown[index] ||
                this.state.mappingData[index].Expression === "Yes" ? (
                  <input
                    type="text"
                    value={
                      this.state.mappingData[index].Expression === "Yes"
                        ? this.state.mappingData[index].Value
                        : value
                    }
                    onChange={(e) => {
                      console.log(e.target.value);
                      this.setState(
                        {
                          mappingData: this.state.mappingData.map(
                            (item, i) => ({
                              ...item,
                              Value: index === i ? e.target.value : item.Value,
                              Expression: index === i ? "Yes" : item.Expression,
                            })
                          ),
                        },
                        () => console.log("logI", this.state.mappingData)
                      );
                    }}
                    className="input-select"
                    placeholder="Type Formula"
                  />
                ) : (
                  <select
                    className="input-select"
                    onChange={(event) => {
                      console.log(event.target.value);
                      this.setState(
                        {
                          mappingData: this.state.mappingData.map(
                            (item, i) => ({
                              ...item,
                              Value:
                                index === i ? event.target.value : item.Value,
                              Expression: index === i ? "No" : item.Expression,
                            })
                          ),
                          isToggle: false,
                        },
                        () => console.log("logs", this.state.mappingData)
                      );
                      // this.setState((prevState) => {
                      //   const updatedShowDropdown = {
                      //     ...prevState.showDropdown,
                      //   };
                      //   updatedShowDropdown[index] = false;
                      //   return { showDropdown: updatedShowDropdown };
                      // });
                    }}
                    value={this.state.mappingData[index].Value}
                  >
                    <option value="" disabled className="selectclass">
                      Select Any One
                    </option>
                    {this.state.StdHeaders.map((item, index) => {
                      return (
                        <option key={index} value={item.Key}>
                          {item.Key}
                        </option>
                      );
                    })}
                  </select>
                )}
              </div>
            );
          },
        },
      },
    ];
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
      rowsPerPageOptions: false,
      jumpToPage: false,
      pagination: false,
      selectToolbarPlacement: "none",
      selectableRowsHeader: false,
      tableBodyHeight: "90vh",
    };

    const pushData = (e, value, tableData) => {
      console.log(e.target.checked);
      console.log(tableData);
      const newData = [
        ...this.state.mappingData,
        { Key: value, Value: "", Expression: "No" },
      ];
      const removeData = this.state.StdFieldsQuerys.filter(
        (v) => v.Key !== value
      );
      // console.log(removeData.map((item)=>item.name));
      // console.log(newData.map((obj,index)=>({[`Key${index}`]: obj.Key, [`Value${index}`]: obj.Value,Expression:obj.Expression})));

      //console.log(newData);
      this.setState({
        data1: newData,
        StdFieldsQuerys: removeData,
        isChecked: e.target.checked,
      });
      this.setState({
        ...this.state.mappingData,
        mappingData: newData.map((item) => ({ ...item })),
      });
    };
    console.log(this.state.mappingData);
    const removeData = (e, value, tableData) => {
      console.log(e.target.checked);
      console.log(tableData.rowIndex);
      const removeData = this.state.mappingData.filter((v) => v.Key !== value);
      // console.log(this.state.showDropdown);
      this.state.showDropdown[tableData.rowIndex] = false;
      console.log(removeData);
      console.log(this.state.data1);
      const newData = [{ Key: value }, ...this.state.StdFieldsQuerys];
      console.log([...new Set(newData)]);
      this.setState({ ...this.state.mappingData, mappingData: removeData });
      this.setState({ data1: removeData, StdFieldsQuerys: newData });
    };

    return (
      <React.Fragment>
        <div className="page">
          <Sidebar
            activeComponent={'ServicerDashboardDeals'}
          />
          <div className="content1">
            {this.state.screenloader == true ? (
                 <LinearLoader></LinearLoader>
            ) : (
              <div className="page-contentofpool1">
                <div className="row1">
                  <div className="col-12 col-sm-6 col-md-2 d-flex justigy-content-center align-center hellocard">
                    <KeyboardBackspaceIcon
                      onClick={() => this.goBackToDashBoard()}
                      className="left-arrow-muis1 left-arrow-servicer"
                    ></KeyboardBackspaceIcon>
                    <h3 className="headerdashboard">Servicer Details</h3>
                  </div>
                  <div className="col-12 col-sm-6 col-md-10 hellocard">
                    {/* <div className="buttonsverified uw-deal-details-button-container">
                  <div style={{
                     display: "flex",
                     justifyContent: "space-around",
                     alignItems: "center",
                     width:"50rem",
                     marginTop:"20px"
                   }}>
                       <div style={{"display":"flex"}}>
                         <label className="dealInfo">Deal Name : </label>
                         <h5>{this.state.DealName}</h5>
                       </div>
                       <div style={{"display":"flex"}}>
                         <label className="dealInfo">Payment Date : </label>
                         <h5>{this.state.detailsDate}</h5>
                       </div>
                     </div>
                  </div> */}
                    <div className="recurring_details">
                      <div>
                        <label className="dealInfo">Deal Name : </label>
                        <h6 className="dealInfo1">{this.state.servicerDealName}</h6>
                      </div>
                      <div>
                        <label className="dealInfo">Payment Date : </label>
                        <h6 className="dealInfo1">{this.state.servicerPaymentDate}</h6>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row row1">
                  <div>
                    <div className="tablechangebuttonloans">
                      <button
                        type="button"
                        onClick={() => this.handleClickUploadLoanTapes()}
                        className={
                          this.state.activeInsights1 == true
                            ? "issuerDashboard-table-top-button-insights-active"
                            : "issuerDashboard-table-top-button-insights"
                        }
                      >
                        Upload Loan Tapes
                      </button>

                      <button
                        type="button"
                        onClick={() => this.handleClickPreviewLoanTape()}
                        className={
                          this.state.activeInsights2 == true
                            ? "issuerDashboard-table-top-button-rejected-active"
                            : "issuerDashboard-table-top-button-rejected"
                        }
                      >
                        Preview Loan Tape
                      </button>
                      <button
                        type="button"
                        onClick={() => this.handleClickMapFields()}
                        className={
                          this.state.activeInsights3 == true
                            ? "issuerDashboard-table-top-button-workbench-active"
                            : "issuerDashboard-table-top-button-workbench"
                        }
                      >
                        Map Fields
                      </button>
                      <button
                        type="button"
                        onClick={() => this.handleClickPreviewMappedFields()}
                        className={
                          this.state.activeInsights4 == true
                            ? "issuerDashboard-table-top-button-rejected-active"
                            : "issuerDashboard-table-top-button-rejected"
                        }
                      >
                        Preview Map Fields
                      </button>
                      <button
                        type="button"
                        onClick={() => this.handleClickSummarize()}
                        className={
                          this.state.activeInsights5 == true
                            ? "issuerDashboard-table-top-button-rejected-active"
                            : "issuerDashboard-table-top-button-rejected"
                        }
                      >
                        Summarize
                      </button>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => this.SaveLoanProcessDate()}
                    >
                      Save Mapping
                      {this.state.formLoader === true ? (
                        <CircularProgress size="25px" color="primary" />
                      ) : (
                        ""
                      )}
                    </Button>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "2rem" }}>
                  <div style={{ width: "420px" }}>
                    <MuiThemeProvider theme={this.getMuiTheme}>
                      <MUIDataTable
                        columns={columns}
                        options={options}
                        data={this.state.StdFieldsQuerys}
                      />
                    </MuiThemeProvider>
                  </div>

                  <div style={{ width: "1230px" }}>
                    <MuiThemeProvider theme={this.getMuiTheme1}>
                      <MUIDataTable
                        columns={columns1}
                        options={options}
                        data={this.state.mappingData}
                      />
                    </MuiThemeProvider>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withSnackbar(Map_Fields);
