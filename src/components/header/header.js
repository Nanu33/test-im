/* eslint-disable require-jsdoc */
import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { NavLink, Link } from "react-router-dom";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import AddIcon from "@material-ui/icons/Add";
import PublishIcon from "@material-ui/icons/Publish";
import {
  customStyles,
  customStylesauto,
} from "../../components/customscripts/customscript";
import ReactModal from "react-modal";
import { withSnackbar } from "notistack";
import CloseIcon from "@material-ui/icons/Close";
import Logo from "../../images/MadeTranparent 2.png";
import Logo1 from "../../images/wellslogo.png";

import LinkItem from "../linkItem";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Breadcrumb from "../breadcrumb";
import PopupState, {
  bindTrigger,
  bindMenu,
  close,
} from "material-ui-popup-state";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import Stack from "@mui/material/Stack";
import Badge from "@mui/material/Badge";
import { history, downloadlogo } from "../../servies/services";
import UW_Dashboard_Pools from "../../container/admin/Underwriter/UW_Dashboard_Pools/UW_Dashboard_Pools";
import { Api } from "@mui/icons-material";
class header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      open1: false,
      value: null,
      message: "",
      inputVal: "",
      anchorEl: false,
      downArrow: true,
      poolName: sessionStorage.getItem("poolname"),
      DealType: sessionStorage.getItem("DealType"),
      OrgName: sessionStorage.getItem("OrgName") || null,
      currentUser: sessionStorage.getItem("firstname"),
      fullName:
        sessionStorage.getItem("firstname") +
        sessionStorage.getItem("lastname"),
      UserId: sessionStorage.getItem("userid"),
      notificationdata: [],
      logo: sessionStorage.getItem("logo") || "",
      token: sessionStorage.getItem("token"),
      isDarkMode: false,
    };
  }

  onOpenModal1(value) {
    console.log("MODAL " + value);
    this.setState({ open1: true, value: value });
  }
  downloadlogo = async () => {
    var data = {
      userid: this.state.UserId,
      token: this.state.token,
    };
    const APIResponse = await downloadlogo(data);
    console.log("APIResponse status:", APIResponse.status);
    console.log("APIResponse data:", APIResponse.data);
    if (APIResponse.status === 200) {
      if (APIResponse.data.byteLength === 49) {
        this.setState({ logo: "" });
        sessionStorage.setItem("logo", "");
      } else {
        const blob = new Blob([APIResponse.data], { type: "image/png" });
        const imageUrl = URL.createObjectURL(blob);

        this.setState({ logo: imageUrl });
        sessionStorage.setItem("logo", imageUrl);
      }
    }
  };

  onCloseModal1 = () => {
    this.setState({ open1: false, loadingmodal: false });
  };

  async componentDidMount() {
    history.go(1);
    if (this.state.currentUser !== null) {
      const firstname = this.state.currentUser;
      const namefirstletter = firstname.charAt(0).toUpperCase();
      this.setState({ currentUser: namefirstletter });
    }
    if (sessionStorage.getItem("isLogin")) {
      this.downloadlogo();
    }
  }
  popoverBottom = (
    <Popover className="header-popover-container">
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          marginLeft: "-40px",
        }}
      >
        <li className="userinfo">
          {this.state?.logo === "" ? (
            <p>{sessionStorage.getItem("firstname").charAt(0).toUpperCase()}</p>
          ) : (
            <img src={sessionStorage.getItem("logo")} alt="logo" />
          )}
        </li>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "5px",
          }}
        >
          <span className="userName">
            {sessionStorage.getItem("firstname") +
              " " +
              sessionStorage.getItem("lastname")}
          </span>
          <button onClick={() => this.handleClicks1()}>View Profile</button>
        </div>
      </div>
      <div>
        <div className="radio1-container">
          <p>Light</p>
          <div class="switch1">
            <label htmlFor="three" class="switch1__label"></label>
            <input
              name="switch1"
              id="three"
              type="radio"
              // value={!this.state.isDarkMode}
              // onChange={toggleTheme}
              // checked={!this.state.isDarkMode}
            />

            <input
              name="switch1"
              id="four"
              type="radio"
              // value={this.state.isDarkMode}
              // onChange={toggleTheme}
              // checked={this.state.isDarkMode}
            />

            <label htmlFor="four" class="switch1__label"></label>
            <div class="switch1__indicator">
              <div className="fields-radion-button-center" />
            </div>
          </div>
          <p>Dark</p>
        </div>
      </div>
      <hr className="header-popover-hr" />
      <button onClick={() => this.handleClicks()}>Payment Settings</button>
      <hr className="header-popover-hr" />
      <button onClick={() => this.logoutBtn()}>Logout</button>
    </Popover>
  );
  handleClicks = () => {
    console.log("hello we have clicked the button");
    window.location.assign("/admin/payment");
  };
  handleClicks1 = () => {
    console.log("hello we have clicked the button");
    window.location.assign("/admin/profile");
  };
  logoutBtn() {
    localStorage.clear();
    sessionStorage.clear();
    window.location.replace("/");
  }

  render() {
    const toggleTheme = () => {
      this.setState(
        (prevState) => ({
          isDarkMode: !prevState.isDarkMode,
        }),
        () => {
          const theme = this.state.isDarkMode ? "dark" : "light";
          document.documentElement.setAttribute("dark-theme", theme);
          sessionStorage.setItem("dark-theme", theme);
        }
      );
    };
    return (
      <React.Fragment>
        <div className="row2">
          <div className="col-md-5 col-sm-12 align-self-center">
            <Link to={"#nogo"} className="logo_img" title={""}>
              <img src={Logo} alt="hello" />
            </Link>
            <button onClick={toggleTheme}>Dark</button>
          </div>

          <div className="col-md-7 col-sm-12 text-right">
            <React.Fragment>
              {this.state.OrgName == "originator" ? (
                <React.Fragment>
                  <div className="float-right header_right">
                    <React.Fragment>
                      <p className="orgname1">
                        Logged in as <span> {this.state.OrgName} </span>{" "}
                      </p>
                      <ul className="preprocessing_menu">
                        <li>
                          <Button variant="outlined" color="primary">
                            Pre Processing <MoreVertIcon />{" "}
                          </Button>
                          <ul>
                            <li>
                              <MenuItem>
                                <NavLink
                                  to={"/preprocessingviewloans/"}
                                  id="viewloanlink"
                                >
                                  {" "}
                                  View LMS Data
                                </NavLink>
                              </MenuItem>
                            </li>
                            <li>
                              <MenuItem>
                                <NavLink to={"/bulkupload/"} id="viewloanlink">
                                  {" "}
                                  Bulk Document Uploads
                                </NavLink>
                              </MenuItem>
                            </li>
                          </ul>
                        </li>
                        <li className="userInfo">
                          <LinkItem to={"#nogo"} title={this.state.currentUser}>
                            {" "}
                          </LinkItem>
                        </li>
                      </ul>
                    </React.Fragment>
                  </div>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <div className="float-right header_right">
                    <React.Fragment>
                      <p className="orgname1">
                        {/* <OverlayTrigger
                            rootClose
                            trigger="click"
                            placement="bottom"
                            overlay={this.popoverBottomNotification()}
                          >
                          <Stack direction="row" sx={{ color: 'action.active' }}>
                          <Badge color="error" badgeContent={this.state.notificationlength} showZero> */}
                        {/* Notification icon is commented coz of non-functionality */}
                        {/* <NotificationsIcon className="notificationcolor"></NotificationsIcon> */}
                        {/* </Badge>
                          </Stack>
                        </OverlayTrigger> */}
                        <span> {this.state.OrgName} </span>{" "}
                      </p>
                      <ul className="preprocessing_menu">
                        <li className="userInfo currentuser">
                          {this.state.logo === "" ? (
                            <p>{this.state.currentUser}</p>
                          ) : (
                            <img
                              src={this.state?.logo}
                              alt="logo"
                              className="userinfo"
                            />
                          )}
                        </li>
                        <li>
                          <OverlayTrigger
                            rootClose
                            trigger="click"
                            placement="bottom"
                            overlay={this.popoverBottom}
                          >
                            <button
                              className="userinfo-currentuser"
                              onClick={() =>
                                this.setState((prevState) => ({
                                  downArrow: !prevState.downArrow,
                                }))
                              }
                            >
                              {this.state.downArrow ? (
                                <ExpandMoreIcon />
                              ) : (
                                <ExpandLessIcon />
                              )}
                            </button>
                          </OverlayTrigger>
                        </li>
                      </ul>
                    </React.Fragment>
                  </div>
                </React.Fragment>
              )}
            </React.Fragment>
          </div>
        </div>

        <div className="row align-items-center">
          <div className="col-md-4 col-sm-12">
            {this.props.pageTitle === "REPORTS" ? (
              <React.Fragment>
                <div className="pageHeading">
                  {/* <NavLink className="back-to-link" to={this.props.backButton} >
                      <span>
                        <ArrowBackIcon></ArrowBackIcon> {this.props.backTitle}
                      </span>

                    </NavLink>
                     */}
                  {this.state.poolName === undefined ? (
                    " "
                  ) : (
                    <React.Fragment>
                      <div>
                        <p>
                          Deals&nbsp;
                          <ArrowForwardIosIcon fontSize="small"></ArrowForwardIosIcon>
                          <span className="dealId">{this.state.poolName}</span>
                        </p>
                      </div>
                    </React.Fragment>
                  )}
                  <span className="pageTitle">
                    {" "}
                    {this.props.pageTitle}
                    {this.props.total_deals === undefined ? (
                      " "
                    ) : (
                      <span className="total_deals">
                        {this.props.total_deals}
                      </span>
                    )}
                  </span>
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <div className="pageHeading ">
                  <span className="pageTitle">
                    {" "}
                    {this.props.pageTitle}
                    {this.props.total_deals === undefined ? (
                      " "
                    ) : (
                      <span className="total_deals">
                        {this.props.total_deals}
                      </span>
                    )}
                    {this.props.dealId === undefined ? (
                      " "
                    ) : (
                      <span className="dealId">{this.props.dealId}</span>
                    )}
                  </span>
                </div>
              </React.Fragment>
            )}
          </div>

          <div className="col-md-8 col-sm-12">
            {this.props.pageTitle !== "REPORTS" ? (
              " "
            ) : (
              <div className="page-contents11">
                <p className="fontsizeset">
                  &nbsp;
                  <InfoOutlinedIcon
                    fontSize="large"
                    className="imgcolor"
                  ></InfoOutlinedIcon>{" "}
                  &nbsp;In the event 5% did not equal a whole number,additional
                  files are verified to ensure meeting verification requirements
                </p>
              </div>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withSnackbar(header);
