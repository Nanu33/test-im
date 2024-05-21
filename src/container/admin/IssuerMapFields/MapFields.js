/* eslint-disable require-jsdoc */
import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import { withSnackbar } from "notistack";
import Loader from "../../../components/loader";
import { createTheme, MuiThemeProvider } from "@material-ui/core/styles";
import "react-input-range/lib/css/index.css";
import MUIDataTable from "mui-datatables";
import Switch from "@mui/material/Switch";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import * as moment from "moment";
import CircularProgress from "@material-ui/core/CircularProgress";
import { QueryStandardFieldnames, PreviewSaveMapping, PreviewQueryPoolMappingDetails } from "../../../servies/services";

class Map_Fields extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDropdown: {},
            isFullScreen: false,
            loading: true,
            searchText: "",
            inputValue: "",
            data1: [],
            mappingData: [],
            //previewMappingData : JSON.parse(sessionStorage.getItem('map')),
            previewMappingData: [],
            screenloader: false,
            saveScreenMapping: false,
            isChecked: false,
            dontCheck: false,
            isToggle: false,
            DealName: sessionStorage.getItem('dealname') === null ? sessionStorage.getItem('servicerdealname') : sessionStorage.getItem('dealname'),
            ServicerName: sessionStorage.getItem('Servicer') === null ? sessionStorage.getItem('servicerdashboardname') : sessionStorage.getItem('Servicer'),
            detailsDate: sessionStorage.getItem('selectdate') === null ? sessionStorage.getItem('selectservicerdate') : sessionStorage.getItem('selectdate'),
            peer: sessionStorage.getItem('peer'),
            peers: JSON.parse(sessionStorage.getItem("peers")),
            AssetType: sessionStorage.getItem('assettype'),
            StdFieldsQuerys: [],
            StdHeaders: [],
            formData: {
                valueRight: "",
            },
            screendisplay: true,
            dataArray: sessionStorage.getItem("addloandetails").split(","),
            token: sessionStorage.getItem("token"),
            checkedItems: {},
            showMessage: false,
            showMessageData: "",
            servicerField: ''
        };
        this.handleDropdownChange = this.handleDropdownChange.bind(this)
        this.previewQueryPoolMappingDetails = this.previewQueryPoolMappingDetails.bind(this)
        this.queryStandardFieldnames = this.queryStandardFieldnames.bind(this)
        console.log("propsss", props)
    }

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
                    }
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
                    }
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

    toggleDropdown = (index) => {
        console.log(this.state.mappingData[index]);
        this.state.mappingData[index].Value = "";
        if (this.state.mappingData[index].Expression === 'Yes') {
            this.state.mappingData[index].Expression = "No"
        } else {
            this.state.mappingData[index].Expression = "Yes"
        }
        this.setState((prevState) => {
            const updatedShowDropdown = { ...prevState.showDropdown };
            if (this.state.mappingData[index].Expression === 'No') {
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
    previewToggleDropdown = (index) => {
        //console.log(this.state.mappingData[index]);
        this.state.previewMappingData[index].Value = "";
        if (this.state.previewMappingData[index].Expression === 'Yes') {
            this.state.previewMappingData[index].Expression = "No"
        } else {
            this.state.previewMappingData[index].Expression = "Yes"
        }
        this.setState((prevState) => {
            const updatedShowDropdown = { ...prevState.showDropdown };
            if (this.state.previewMappingData[index].Expression === 'No') {
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

    handleDropdownChange = (index, event) => {
        const newValue = event.target.value;
        this.setState((prevState) => {
            const updatedPreviewMappingData = [...prevState.previewMappingData];
            updatedPreviewMappingData[index].Value = newValue;
            return { previewMappingData: updatedPreviewMappingData };
        });
    };

    // goBackToDashBoard = () => {
    //     if (sessionStorage.getItem('user_name') === "Trustee") {
    //         this.props.history.push({
    //             pathname: "/admin/viewdetails",
    //             state: { details: this.state.detailsDate }
    //         });
    //     } else {
    //         this.props.history.push({
    //             pathname: "/dashboard/servicer",
    //         });
    //     }
    // };

    backToEditLoanTape = () => {
        this.props.dataFromMappingField()
    }

    queryStandardFieldnames = async () => {
        this.setState({ screenloader: true, loading: true })
        var data = {}
        data.AssetType = this.state.dataArray[1] || this.props.assetclass
        const APIResponse = await QueryStandardFieldnames(data, this.state.token);

        if (APIResponse.status === 200) {
            const leftMappingData = APIResponse.data?.stdfields
            this.setState({
                screenloader: false,
                loading: false,
                StdFieldsQuerys: leftMappingData
            })
            if (sessionStorage.getItem('functiontodo') === "reupload") {
                this.previewQueryPoolMappingDetails()
            }
        }
        console.log('std', this.state.StdFieldsQuerys)
    }

    saveMapping = async () => {
        const originalDate = new Date(this.props.loandataupdtaedtill)
        const day = originalDate.getDate();
        const month = originalDate.getMonth() + 1; // Note: Months are zero-based, so add 1
        const year = originalDate.getFullYear();
        const formattedDate = `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year}`;
        var data = {}
        data.token = this.state.token;
        data.issuerId = sessionStorage.getItem('userid');
        data.IssuerName = sessionStorage.getItem("firstname") + sessionStorage.getItem("lastname");
        data.AsOfDate = formattedDate;
        // const saveData = this.state.mappingData.map((obj, index) => ({ [`Key ${index}`]: obj.Key, [`Value ${index}`]: obj.Key, Expression: obj.Expression }));
        // data.MappingData = saveData;

        if (sessionStorage.getItem('functiontodo') === "reupload") {
            data.filename = JSON.parse(sessionStorage.getItem('filename'))
            data.asset_class = this.props.assetclass;
            data.functiontodo = "reupload";
            data.verificationtemplate = JSON.parse(sessionStorage.getItem('verificationtemplate'));
            data.poolid = this.props.poolid;
            const saveData = this.state.previewMappingData.map((obj, index) => ({ [`Key ${index}`]: obj.Key, [`Value ${index}`]: obj.Value, Expression: obj.Expression }));
            data.MappingData = saveData;
            this.setState({ formLoader: true, screenloader: true, saveScreenMapping: true });
            const APIResponse = await PreviewSaveMapping(data);
            console.log('res', APIResponse)
            if (APIResponse.status === 200) {
                if (APIResponse.data.success === true) {
                    this.setState({ formLoader: false, screenloader: false, saveScreenMapping: false });
                    const message = "Standard loantape save success";
                    this.props.enqueueSnackbar(message, {
                        variant: "info",
                        autoHideDuration: 3000,
                    });
                    window.location.reload()
                } else {
                    this.setState(
                        {
                            formLoader: false,
                            showMessage: true,
                            ColumnName: APIResponse?.data?.ColumnName,
                            LoanIdData: APIResponse?.data?.["Loan ID's"],
                            showMessageData: APIResponse.data.message,
                        });
                }
            } else {
                this.setState({ formLoader: false, screenloader: false });
                const message = "Couldn't create the loan";
                this.props.enqueueSnackbar(message, {
                    variant: "error",
                    autoHideDuration: 3000,
                });
            }
        } else {
            data.filename = this.state.dataArray[0]
            data.asset_class = this.state.dataArray[1]
            data.functiontodo = sessionStorage.getItem("functiontodo")
            data.verificationtemplate = this.state.dataArray[2]
            data.poolid = ''
            const saveData = this.state.mappingData.map((obj, index) => ({ [`Key ${index}`]: obj.Key, [`Value ${index}`]: obj.Value, Expression: obj.Expression }));
            data.MappingData = saveData;
            this.setState({ formLoader: true, screenloader: true, saveScreenMapping: true });
            const APIResponse = await PreviewSaveMapping(data);
            if (APIResponse.status === 200) {
                if (APIResponse.data.success === true) {
                    this.setState({ formLoader: false, screenloader: false, saveScreenMapping: false });
                    const message = "Standard loantape save success";
                    this.props.enqueueSnackbar(message, {
                        variant: "info",
                        autoHideDuration: 3000,
                    });
                    window.location.reload()
                    // window.location.assign("/admin/issuerloans");
                } else {
                    console.log(APIResponse)
                    this.setState(
                        {
                            formLoader: false,
                            showMessage: true,
                            ColumnName: APIResponse?.data?.ColumnName,
                            LoanIdData: APIResponse?.data?.["Loan ID's"],
                            showMessageData: APIResponse.data.message,
                        });
                }
            } else {
                this.setState({ formLoader: false, screenloader: false });
                const message = "Couldn't create the loan";
                this.props.enqueueSnackbar(message, {
                    variant: "error",
                    autoHideDuration: 3000,
                });
            }
        }

    };

    previewQueryPoolMappingDetails = async () => {
        var data = {}
        data.poolid = sessionStorage.getItem("poolid")
        data.token = this.state.token;

        const APIResponse = await PreviewQueryPoolMappingDetails(data);

        console.log('map', APIResponse.data.mappingData);
        if (APIResponse.status === 200) {
            if (sessionStorage.getItem('functiontodo') === "reupload") {
                const filteredKeys = APIResponse.data.mappingData.map(item => item.Key);
                const updatedStdFieldsQuerys = this.state.StdFieldsQuerys.filter(key => !filteredKeys.includes(key));
                this.setState({
                    previewMappingData: APIResponse.data.mappingData,
                    StdFieldsQuerys: updatedStdFieldsQuerys
                });
            } else {
                this.setState({
                    previewMappingData: APIResponse.data.mappingData
                });
            }

        }
    }

    componentDidMount() {
        this.queryStandardFieldnames();
        console.log('date', this.props.loandataupdtaedtill)
    }

    render() {

        const columns = [
            {
                name: 'key',
                label: 'Select Intain Fields',
                options: {
                    filter: false,
                    sort: false,
                    customBodyRender: (value, tableMeta) => {
                        const { loading } = this.state;
                        return (
                            <div style={{ display: "flex", alignItems: "center" }}>
                                {loading === true ? (
                                    <Loader msg={"Please wait,Loading loan data!"} />
                                ) : (
                                    <>
                                        <input
                                            type="checkbox"
                                            id={tableMeta.tableData[tableMeta.rowIndex]}
                                            style={{ cursor: 'pointer', marginRight: "2rem" }}
                                            onChange={(e) => pushData(e, value, tableMeta)}
                                            checked={this.state.checkedItems[tableMeta.tableData[tableMeta.rowIndex]] || false}
                                        />
                                        <label htmlFor={tableMeta.tableData[tableMeta.rowIndex]}>{tableMeta.tableData[tableMeta.rowIndex]}</label>
                                    </>
                                )}
                            </div>
                        );
                    },
                },
            },
            // {
            //     name: 'Loader',
            //     label: 'Loading',
            //     options: {
            //         display: this.state.loading ? 'excluded' : 'false',
            //         empty: true,
            //         customBodyRender: () => {
            //             return (
            //                 <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100px" }}>
            //                     <Loader msg={"Please wait, Loading Loan Data"} />
            //                 </div>
            //             );
            //         },
            //     },
            // },
        ];

        const columns1 = [
            {
                name: "Key",
                label: "Selected Intain Fields",
                options: {
                    filter: true,
                    sort: true,
                    customBodyRender: (value, tableMeta, updateValue) => {
                        console.log(tableMeta.rowData[0]);
                        return (
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                            }}>
                                <input
                                    type="checkbox"
                                    id={tableMeta.rowData[0]}
                                    style={{ cursor: "pointer", marginRight: "2rem" }}
                                    onChange={(e) => removeData(e, value, tableMeta)}
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
                    sort: true,
                    customBodyRender: (value, tableMeta, updateValue) => {
                        const index = tableMeta.rowIndex;
                        return (
                            <div
                                style={{ display: "flex", gap: "1rem", alignItems: "center" }}
                            >
                                <Switch
                                    checked={this.state.showDropdown[index] || this.state.mappingData[index].Expression === 'Yes'}
                                    onClick={() => this.toggleDropdown(index)}
                                />
                                {this.state.showDropdown[index] || this.state.mappingData[index].Expression === 'Yes' ? (
                                    <input
                                        type="text"
                                        value={this.state.mappingData[index].Expression === 'Yes' ? this.state.mappingData[index].Value : value}
                                        onChange={(e) => {
                                            console.log(e.target.value);
                                            this.setState({
                                                mappingData:
                                                    this.state.mappingData.map((item, i) => ({
                                                        ...item,
                                                        Value: index === i ? e.target.value : item.Value,
                                                        Expression: index === i ? 'Yes' : item.Expression
                                                    }))
                                            }, () => console.log("logI", this.state.mappingData))
                                        }
                                        }
                                        className="input-select"
                                        placeholder="Type Formula"
                                    />
                                ) : (
                                    <select
                                        className="input-select"
                                        onChange={(event) => {
                                            this.setState({
                                                mappingData: this.state.mappingData.map((item, i) => ({
                                                    ...item,
                                                    Value: index === i ? event.target.value : item.Value,
                                                    Expression: index === i ? 'No' : item.Expression
                                                })),
                                                isToggle: false
                                            }, () => console.log("logs", this.state.mappingData));
                                        }}
                                        value={this.state.mappingData[index].Value}
                                    >
                                        <option value="" disabled className="selectclass">
                                            Select Column
                                        </option>
                                        {mappingDataKey.map((item, index) => {
                                            return (
                                                <option
                                                    key={index}
                                                    value={item}
                                                >
                                                    {item}
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
        const previewColumns = [
            {
                name: "Key",
                label: "Selected Intain Fields",
                options: {
                    filter: true,
                    sort: true,
                    customBodyRender: (value, tableMeta) => {
                        const keyLabel = value; // Get the "Key" value from the data
                        return (
                            <div style={{
                                display: "flex",
                                alignItems: "center"
                            }}>
                                <input
                                    type="checkbox"
                                    id={tableMeta.rowIndex}
                                    style={{ cursor: "pointer", marginRight: "2rem" }}
                                    onChange={(e) => removeData(e, value, tableMeta)}
                                    checked
                                />
                                <label htmlFor={tableMeta.rowIndex}>{keyLabel}</label>
                            </div>
                        )
                    }
                }
            },
            {
                name: "",
                label: "Servicer Tape Fields",
                options: {
                    filter: false,
                    sort: false,
                    customBodyRender: (value, tableMeta, updateValue) => {
                        console.log('val', value)
                        console.log('tb', tableMeta)
                        const index = tableMeta.rowIndex;
                        const expression = this.state.previewMappingData[tableMeta.rowIndex].Expression
                        return (
                            <div
                                style={{ display: "flex", gap: "1rem", alignItems: "center" }}
                            >
                                {/*  || this.state.mappingData[index].Expression === 'Yes' */}
                                <Switch
                                    checked={expression === "Yes"}
                                    onClick={() => this.previewToggleDropdown(index)}
                                />
                                {expression === 'Yes' ? (
                                    <input
                                        type="text"
                                        value={this.state.previewMappingData[index].Expression === 'Yes' ? this.state.previewMappingData[index].Value : ''}
                                        onChange={(e) => {
                                            console.log(e.target.value);
                                            this.setState({
                                                previewMappingData:
                                                    this.state.previewMappingData.map((item, i) => ({
                                                        ...item,
                                                        Value: index === i ? e.target.value : item.Value,
                                                        Expression: index === i ? 'Yes' : item.Expression
                                                    }))
                                            })
                                        }
                                        }
                                        className="input-select"
                                        placeholder="Type Formula"
                                    />
                                ) : (
                                    <select
                                        className="input-select"
                                        value={
                                            mappingDataKey.includes(this.state.previewMappingData[index]?.Value)
                                                ? this.state.previewMappingData[index]?.Value
                                                : ''
                                        }
                                        //value={this.state.previewMappingData[index].Value || ''}
                                        onChange={(event) => this.handleDropdownChange(index, event)}
                                    >
                                        <option value="" disabled className="selectclass">
                                            Select Column
                                        </option>
                                        {mappingDataKey.map((item, index) => {
                                            return (
                                                <option key={index} value={item}>
                                                    {item}
                                                </option>
                                            );
                                        })}
                                    </select>

                                )}
                            </div>
                        );
                    }
                }
            }
        ]

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
        const pushData = (e, value, tableMeta) => {
            if (sessionStorage.getItem('functiontodo') === "reupload") {
                console.log('e', e);
                console.log('val', value);
                console.log('table', tableMeta)
                const newData = [...this.state.previewMappingData, { Key: tableMeta.tableData[tableMeta.rowIndex], Value: "", Expression: "No" }];
                const removeData = this.state.StdFieldsQuerys.filter((v) => v !== tableMeta.tableData[tableMeta.rowIndex]);
                this.setState({
                    previewMappingData: newData,
                    StdFieldsQuerys: removeData,
                    checkedItems: {
                        ...this.state.checkedItems,
                        [tableMeta.tableData[tableMeta.rowIndex]]: false,
                    },
                })
            } else {
                const newData = [...this.state.mappingData, { Key: tableMeta.tableData[tableMeta.rowIndex], Value: "", Expression: 'No' }];
                const removeData = this.state.StdFieldsQuerys.filter((v) => v !== tableMeta.tableData[tableMeta.rowIndex]);
                this.setState({
                    data1: newData,
                    StdFieldsQuerys: removeData,
                    checkedItems: {
                        ...this.state.checkedItems,
                        [tableMeta.tableData[tableMeta.rowIndex]]: false,
                    },
                });
                this.setState({ ...this.state.mappingData, mappingData: newData.map((item) => ({ ...item })) });
            }
        };

        const removeData = (e, value, tableData) => {
            if (sessionStorage.getItem('functiontodo') === "reupload") {
                const removeData = this.state.previewMappingData.filter((item) => item.Key !== value);
                this.state.showDropdown[tableData.rowIndex] = false;
                const removeDataKeys = removeData.map((item) => item.Key);
                const newData = [value].concat(this.state.StdFieldsQuerys)
                const checkedItemsCopy = { ...this.state.checkedItems };
                delete checkedItemsCopy[value];
                this.setState({
                    previewMappingData: removeData,
                    StdFieldsQuerys: newData,
                    checkedItems: checkedItemsCopy,
                })
            } else {
                const removeData = this.state.mappingData.filter((item) => item.Key !== value);
                this.state.showDropdown[tableData.rowIndex] = false;
                const removeDataKeys = removeData.map((item) => item.Key);
                const newData = [value].concat(this.state.StdFieldsQuerys)
                const checkedItemsCopy = { ...this.state.checkedItems };
                delete checkedItemsCopy[value];
                this.setState({
                    mappingData: removeData,
                    data1: removeData,
                    StdFieldsQuerys: newData,
                    checkedItems: checkedItemsCopy,
                });
            }
        };

        const { mappingDataKey, poolid } = this.props;
        return (
            <React.Fragment>
                <div className="page">
                    <div className="content1">
                        <div style={{ display: "flex", gap: "2rem" }}>
                            <div style={{ width: "420px" }}>
                                <MuiThemeProvider theme={this.getMuiTheme}>
                                    <MUIDataTable
                                        columns={columns}
                                        options={options}
                                        data={this.state.StdFieldsQuerys?.sort()}
                                    />
                                </MuiThemeProvider>
                            </div>

                            {sessionStorage.getItem('functiontodo') === "reupload" ? (
                                <div style={{ width: "1230px" }}>
                                    <MuiThemeProvider theme={this.getMuiTheme1}>
                                        <MUIDataTable
                                            columns={previewColumns}
                                            options={options}
                                            data={this.state.previewMappingData}
                                        />
                                    </MuiThemeProvider>
                                </div>
                            ) : (
                                <div style={{ width: "1230px" }}>
                                    <MuiThemeProvider theme={this.getMuiTheme1}>
                                        <MUIDataTable
                                            columns={columns1}
                                            options={options}
                                            data={this.state.mappingData}
                                        />
                                    </MuiThemeProvider>
                                </div>
                            )}

                        </div>

                        <div style={{ marginTop: "10px" }}>
                            {this.state.showMessage && (
                                <p className="error-msg">
                                    {this.state.showMessageData}
                                    {this.state?.LoanIdData === undefined
                                        ? this.state?.ColumnName.map((name) => (
                                            <li key={name}>{name}</li>
                                        ))
                                        : this.state?.LoanIdData.map((name) => (
                                            <li key={name}>{name}</li>
                                        ))}
                                </p>
                            )}
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px' }}>
                            <Button
                                onClick={this.backToEditLoanTape}
                            >
                                Back
                            </Button>
                            <Button variant="contained" color="primary" onClick={() => this.saveMapping()}>
                                Add Loans
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
            </React.Fragment>

        );
    }
}

export default withSnackbar(Map_Fields);
