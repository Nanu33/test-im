/* eslint-disable require-jsdoc */
import React, { Component } from "react";
import Pagination from "@mui/material/Pagination";
// import { connect } from 'react-redux';
import Sidebar from "../../../../components/sidebar";
import Button from "@material-ui/core/Button";
import { withSnackbar } from "notistack";
import { Theme as MuiTheme } from "rjsf-material-ui";
import ReactModal from "react-modal";
import { Form } from "react-bootstrap";
import Iframe from "react-iframe";
import {
  customStylesautosmallmodal,
} from "../../../../components/customscripts/customscript";
import FormLoader from "../../../../components/loader/formLoader";
import {
  UpdateLoanStatus,
  UpdateData,
  UpdateReviewedResults,
} from "../../../../servies/services";
import {
  ThemeProvider,
  createTheme,
  MuiThemeProvider,
} from "@material-ui/core/styles";
import CompareItem from "../../../../components/pageTitle/CompareItem";
import "react-input-range/lib/css/index.css";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import pdffile from "../VA_Review/TWO27487_Sidhartha.pdf";

const APIResponse = {
  desc: "Completed!!!",
  res: {
    message: "Successful!",
    data: [
      {
        lmsloan: {
          App_ID: "87C65CA5-56CE",
          Pri_Name: "NUNEZ-JESSIE",
          Contract: "UOWN286844",
          E_Signature: "Yes",
        },
        agreementloan: {
          App_ID: "87C65CA5-56CE",
          Pri_Name: "NA",
          Contract: "UOWN286844",
          E_Signature: "Yes",
        },
        matched: 1,
        attributewise_matched: [1, 0, 1, 1],
      },
      {
        lmsloan: {
          App_ID: "539403",
          Pri_Name: "739FD595",
          Contract: "FRC Transport LLC",
          E_Signature: "13300",
        },
        agreementloan: {
          App_ID: "539403",
          Pri_Name: "739FD595",
          Contract: "FRC Transport LLC",
          E_Signature: "$13,300.00",
        },
        matched: 1,
        attributewise_matched: [1, 1, 1, 1],
      },
    ],
  },
};

class VA_Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRecords: [],
      eligibleloans: {},
      msgNewData: JSON.parse(sessionStorage.getItem('reviewdata')),
      url: JSON.parse(sessionStorage.getItem('loandocpath')),
      loading: false,
      getLoansLoader: false,
      open: false,
      open1: false,
      openPopup: false,
      selectedLoanId: [],
      loandetails: [],
      searchText: "",
      rowsSelected: null,
      open1: false,
      compare:[],
      active_pool: 0,
      anchorEl: null,
      formData: {
        note: "",
      },
      showSearchBox: false,
      token: sessionStorage.getItem('token'),

    };
  }
  onOpenModal = () => {
    this.setState({ formData: [] });
    console.log("inside modal1");
    this.setState({ open1: true });
  };

  onCloseModal = () => {
    this.setState({ open1: false });
  };

  handleClicks = () => {
    console.log("hello we have clicked the button");
    this.props.history.push({
      pathname: "/admin/va_listofloans",
    });
  };

  async selectedpoolid(selected) {
    const arr = [];

    for (var i = 0; i < selected.length; i++) {
      var j = selected[i];
      let PoolID = this.state.tableData[j];
      arr.push(PoolID);
    }
    this.setState({ loandetails: arr });
    console.log("selected Loans", arr);
    sessionStorage.setItem("rundd", JSON.stringify(arr));
  }

  onchange = (e) => {
    this.setState({ searchText: e.target.value, searchType: true });
    console.log("search: e.target.value", e.target.value);
  };
  UpdateLoanStatus = async (value) => {
    var data = {};
    // data.contractaddress = "0xFD6380543eDc62EB255746DED6b7d39baAa414a1";
    data.loanid = this.state.msgNewData['Deal Id'];
    data.status = value;
    console.log("datata", data);
    data.token = this.state.token
    const APIResponse = await UpdateLoanStatus(data);

    if (APIResponse.status === 200) {
      this.updateReviewdResults();
     
    } else {
      const message = "Couldn't fetch the record";
      this.props.enqueueSnackbar(message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };
  saveData = async () =>{
    var senddata = {}
    let dups = {}
    dups['lmsloan']=this.state.msgNewData.lmsloan
    dups['agreementloan']=this.state.msgNewData.agreementloan
    
    // $('#viewMore tbody tr').each(function (row, tr) {
    //     senddata[row] = {
    //         'lms': $(tr).find("td:eq(0) input[type='text']").val(),
    //         'contract': $(tr).find("td:eq(1) input[type='text']").val()
    //     };
    // });
    let change = JSON.parse(sessionStorage.getItem('fieldss'))
    console.log('changes',change)
    if(change!=null){
    Object.keys(change).map((value)=>{
      console.log('chnagess',change[value].lmsLoan)
      dups.lmsloan[value]=change[value].lmsLoan;
      dups.agreementloan[value]=change[value].agreementLoan
      console.log('dd',dups.lmsloan[value])
      if(dups.lmsloan[value] == dups.agreementloan[value]){
        dups.matched = 1
      }
      else{
        dups.matched = 0
      }
    })
  }
  else{
    dups.matched = this.state.msgNewData.matched
  }

    // dups.lmsloan[change[3]]=change[4]
    // dups.agreementloan[change[3]]=change[5]
    dups['poolid']=sessionStorage.getItem('poolid')
    console.log('dups',dups)
    // console.log('lmsloan',Object.values(dups.lmsloan))
    // console.log('agreementloan',Object.values(dups.agreementloan))
    // let arr = [];
    //   Object.values(dups.lmsloan).map((zone) => {
    //     Object.values(dups.agreementloan).map((obj) => {
    //               if(zone == obj){
    //                 console.log('1')
    //               }
    //               else{
    //                 console.log('2')
    //               }
    //           })
    //       })
    console.log("save button::" + JSON.stringify(senddata))

   
    console.log('saveeeeeeeeeeeeee',dups)
    dups.token = this.state.token
   const res = await UpdateData(dups)
    if (res.status === 200) {
      if(res.data.isSuccess == true){
        const message = "Data Updated";
            this.UpdateLoanStatus("Reviewed")
            
        this.props.enqueueSnackbar(message, {
          variant: 'info',
          autoHideDuration: 4000,
        });

      }else {

        const message = "Something went Wrong Please Try Again!!";
        this.props.enqueueSnackbar(message, {
          variant: 'info',
          autoHideDuration: 3000,
        });
      }
    }
    else {
      
      alert('Saving Failed');
    }

    


  }

  updateReviewdResults = async ()=>{
    var payLoad = {}
    let lmsData = JSON.parse(sessionStorage.getItem('reviewdata'))
    payLoad.loanid = lmsData.lmsloan.Loan_ID
    payLoad.poolid = sessionStorage.getItem('poolid')
    payLoad.aitrainedpoolname = sessionStorage.getItem('aitrainedpoolname')
    payLoad.token = this.state.token

    await UpdateReviewedResults(payLoad);
    window.location.assign("/admin/va_listofloans");
    
  }

  async componentDidMount() {
    var component = window.location.pathname
    sessionStorage.setItem('component', component)
    console.log('masgnewdata',this.state.msgNewData);
    let varies = Object.keys(this.state.msgNewData.lmsloan)
    console.log('varies',varies)
    this.setState({compare:varies})

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
        },
        MuiInput: {
          underline: {
            "&:after": {
              borderBottom: "2px solid #018E82 !important",
            },
          },
        },

        MuiCheckbox: {
          root: {
            color: "#212121ab !important",
          },
          indeterminate: {
            color: "#FFC000 !important",
            border: "1.2px solid #212121 !important",
            borderRadius: "3px !important",
            width: "28px !important",
            height: "28px !important",
            marginLeft: "8px !important",
          },
          colorPrimary: {
            "&.Mui-checked": {
              color: "#FFC000 !important",
              border: "1.2px solid #212121 !important",
              borderRadius: "3px !important",
              width: "30px !important",
              height: "30px !important",
              marginLeft: "8px !important",
            },
            "&.Mui-checked:hover": {
              backgroundColor: "#fff !important",
            },
          },
        },

        MuiTableCell: {
          root: {
            padding: "20px",
            fontSize: "0.980rem !important",
          },
        },
        MUIDataTableBodyCell: {
          root: {
            borderBottom: "none !important",
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
            fontFamily: "Catamaran, sans-serif !important",
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
            marginBottom: "15px !important",
            paddingLeft: "5px !important",
            paddingRight: "5px !important",
          },
          titleText: {
            fontFamily: "Catamaran, sans-serif !important",
            fontSize: "24px",
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
            color: "#212121 !important",
            backgroundColor: "#FFC000 !important",
            padding: "5px 30px !important",
            marginLeft: "10px !important",
            textTransform: "none !important",
            border: "1.2px solid #212121 !important",
            borderRadius: "20px !important",
            boxShadow: "none !important",
          },
          outlined: {
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
              this.state.tableData.length < 10 ? "-122" : "-132"
            }px`,
            fontSize: "0.90rem",
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

        MUIDataTableSearch: {
          main: {
            marginLeft: "-30px !important",
            marginRight: "300px !important",
            marginTop: "15px !important",
          },
          clearIcon: {
            color: "#018E82 !important",
            "&:hover": {
              color: "#018E82 !important",
            },
          },
          searchIcon: {
            color: "#fff !important",
          },
        },

        MUIDataTableSelectCell: {
          headerCell: {
            backgroundColor: "rgba(1, 142, 130, 0.1) !important",
            borderBottom: "none !important",
            paddingLeft: "20px !important",
          },
          fixedLeft: {
            borderBottom: "none !important",
            paddingLeft: "20px !important",
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
    comparision = (i)=>{
  
      return(
        <CompareItem id={i+1} mask={false} title={Object.keys(this.state.msgNewData.agreementloan)[i]} lmsLoan={this.state.msgNewData.lmsloan[Object.keys(this.state.msgNewData.agreementloan)[i]]} agreementLoan={this.state.msgNewData.agreementloan[Object.keys(this.state.msgNewData.agreementloan)[i]]} match={this.state.msgNewData.attributewise_matched[Object.keys(this.state.msgNewData.agreementloan)[i]]}></CompareItem>
      )
    
  }


  // comparision = () => {
  //   return (
  //     <div className="tbodydata">
  //       <CompareItem
  //         id="1"
  //         mask={false}
  //         title={Object.keys(this.state.msgNewData.lmsloan)[0]}
  //         lmsLoan={this.state.msgNewData.lmsloan.App_ID}
  //         agreementLoan={this.state.msgNewData.agreementloan.App_ID}
  //         match={this.state.msgNewData.attributewise_matched[0]}
  //       ></CompareItem>
  //       <CompareItem
  //         id="2"
  //         mask={false}
  //         title={Object.keys(this.state.msgNewData.lmsloan)[1]}
  //         lmsLoan={this.state.msgNewData.lmsloan.Pri_Name}
  //         agreementLoan={this.state.msgNewData.agreementloan.Pri_Name}
  //         match={this.state.msgNewData.attributewise_matched[1]}
  //       ></CompareItem>
  //       <CompareItem
  //         id="3"
  //         mask={false}
  //         title={Object.keys(this.state.msgNewData.lmsloan)[2]}
  //         lmsLoan={this.state.msgNewData.lmsloan.Contract}
  //         agreementLoan={this.state.msgNewData.agreementloan.Contract}
  //         match={this.state.msgNewData.attributewise_matched[2]}
  //       ></CompareItem>
  //       <CompareItem
  //         id="4"
  //         mask={false}
  //         title={Object.keys(this.state.msgNewData.lmsloan)[3]}
  //         lmsLoan={this.state.msgNewData.lmsloan.E_Signature}
  //         agreementLoan={this.state.msgNewData.agreementloan.E_Signature}
  //         match={this.state.msgNewData.attributewise_matched[3]}
  //       ></CompareItem>
  //     </div>
  //   );
  // };
  render() {
    console.log("fffff", this.state.msgNewData);
    return (
      <React.Fragment>
        <div className="page">
          <Sidebar activeComponent={"VA_Dashboard"} />
          <div className="content1">
            <div className="page-content">
              <div className="row rowreview">
                <div className="investor-heading-container">
                  <div className="arrowtextclass">
                    <KeyboardBackspaceIcon
                      onClick={this.handleClicks}
                      className="left-arrow-muis Reviewdata"
                    ></KeyboardBackspaceIcon>
                    <h1 className="headerdashboard">
                      Reviewing the Match Result
                    </h1>
                  </div>
                </div>

                <div>
                  <div className="dashboard-top-right-container1">
                    <Button
                      className="card__button2"
                      type="submit"
                      onClick={this.onOpenModal.bind(this)}
                    >
                      Report
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      onClick={this.saveData}
                      //   onClick={this.onOpenModal1.bind(this)}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </div>

              <div className="matchscroll">
                <div id="content_pdfconent" className="viewmorecolumnpdf">
                  <Form id="labelform" className="labelform">
                    {/* {JSON.stringify(this.state.msgNewData)} */}
                    <div className="content_pdfconentss">
                      <h5>Loan Data</h5>
                      <h5>Loan Contract</h5>
                    </div>
                    <table className="data_table" id="viewMore">
                  
                      {/* <thead>
                        <tr className="data_tabletr">
                          <th className="th_data_table">Loan Data</th>
                          <th className="th_data_table">Loan Contract</th>
                          <th className="thirdthdatatable"></th>
                        </tr>
                      </thead> */}
                      <tbody>
                        {" "}
                        {this.state.compare.map((item, index) =>
                          this.comparision(index)
                        )}
                      </tbody>
                    </table>
                  </Form>
                </div>

                <div className="viewmorecolumnpdf viewmorecolumn">
                  <React.Fragment>
                    <Iframe
                      // allowtransparency="true"
                      // frameborder="0"
                      // style="background: #FFFFFF;"
                      url={process.env.react_app_base_url + "root_folder/uploads/" + this.state.url}
                      // url={pdffile}
                      width="850px"
                      height="592px"
                      id="myId"
                      className="myClassname"
                      display="initial"
                      position="relative"
                    />
                  </React.Fragment>
                </div>
              </div>
            </div>
          </div>

          <div id="modal1">
            <ReactModal
              isOpen={this.state.open1}
              onRequestClose={this.onCloseModal}
              contentLabel="Minimal Modal Example"
              style={customStylesautosmallmodal}
            >
              <React.Fragment>
                <div className="modalPopup2">
                  <h3 className="popupheading">
                    Are you sure, you want to Report this Loan?
                  </h3>

                  <div className="modalshiftcontent">
                    <h6 className="card1__title">
                      Reporting the loan will record it as having an error and
                      be sent back to the Issuer.
                    </h6>

                    <form className="form-container">
                      <div className="input-container">
                        <label className="label">Note (Optional)</label>
                        <input
                          placeholder="Would you like to mention the reason?"
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
                            <div className="row justify-content-end1">
                              <button
                                type="button"
                                className="popupbutton1"
                                onClick={this.onCloseModal}
                              >
                                {" "}
                                No{" "}
                              </button>
                              <Button
                                variant="contained"
                                color="primary"
                               
                                onClick={() => this.UpdateLoanStatus("Reported")}
                              >
                                Yes, Report it
                                {/* {this.state.formLoader === true ? (
                                  <CircularProgress
                                    size="22px"
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
        </div>
      </React.Fragment>
    );
  }
}

export default withSnackbar(VA_Review);
