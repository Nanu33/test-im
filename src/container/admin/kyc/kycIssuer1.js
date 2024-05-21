import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import AIcon1 from './AIcon1.xlsx';
import { UploadKyc } from '../../../servies/services';


class KycIssuer1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file1: "",
            file2: "",
            file3: "",
            loading: false,
            getLoansLoader: false,
            token: sessionStorage.getItem("token"),
      userid : sessionStorage.getItem('userid'),



        }
    }

    handleClick = () => {
        this.props.handleClickKyc1()
    }

    UploadKyc = async () => {

        console.log('uplaodlms')
        const files = []
        files.push(this.state.file1)
        files.push(this.state.file2)
        files.push(this.state.file3)
        console.log('ffff', files)
        const newdata = new FormData();
        newdata.append('userid', this.state.userid)
        Array.from(files).forEach(file => {
            newdata.append('filename', file);
        });
        console.log('newdata', newdata)

        this.setState({ formLoader: true })
        newdata.append('token', this.state.token)

        const APIResponse = await UploadKyc(newdata)

        if (APIResponse.status === 200) {
            this.setState({ formLoader: true })
            console.log('upload--', APIResponse);
            this.props.handleClickKyc1()
        }
        else {
            this.setState({ formLoader: false })
            const message = "Something went wrong, please try again";
            this.props.enqueueSnackbar(message, {
                variant: 'error',
                autoHideDuration: 2000,
            });
        }
    }


    //1
    handleOnChange1 = (e) => {
        this.setState({ file1: e.target.files[0], filename1: e.target.files[0].name });
    };

    // 2
    handleOnChange2 = (e) => {
        this.setState({ file2: e.target.files[0], filename2: e.target.files[0].name });
    };

    // 3
    handleOnChange3 = (e) => {
        this.setState({ file3: e.target.files[0], filename3: e.target.files[0].name });
    };

    // download = () => {
    //      var res = this.state.subnetaccdata.data.subnet
    //       const file_name = "subnet" + ".csv";
    //       console.log(res.subnet);
    //       startDownload(JSON.stringify(res), file_name);
    //       function startDownload(file, fileName) {
    //         const url = window.URL.createObjectURL(new Blob([file]));
    //         const link = document.createElement("a");
    //         link.href = url;
    //         link.setAttribute("download", fileName);
    //         document.body.appendChild(link);
    //         link.click();
    //         link.parentNode.removeChild(link);
    //       }
    //   };

    card1 = () => (
        <div className="card__container">
            <h6 className="card1__title">Upload the W9 Form</h6>
            <ol className="card1__list">
                <li><a className='login-sign_up-links' href={AIcon1} download>Click here</a> to view the form</li>
                <li>Download, Fill in, Execute</li>
                <li>Upload the completed form</li>
            </ol>
            <div className="kyc-card__button-container">
                <div>
                    <input
                        id="icon-button-file-issuer1"
                        type="file"
                        style={{ display: "none" }}
                        onChange={this.handleOnChange1}
                    />
                    <button className="card__button" type="submit">
                        <label htmlFor="icon-button-file-issuer1" className="upload-button-label">Upload</label>
                    </button>
                </div>
                {this.state.file1 !== "" && (
                    <div className="kyc-card__select_name-container">
                        <p>{this.state.filename1}</p>
                    </div>
                )}
            </div>
        </div>
    )

    card2 = () => (
        <div className="card__container">
            <h6 className="card1__title">Upload the Good Standing Certificate</h6>
            <div className="kyc-card__button-container">
                <div>
                    <input
                        id="icon-button-file-issuer2"
                        type="file"
                        style={{ display: "none" }}
                        onChange={this.handleOnChange2}
                    />
                    <button className="card__button" type="submit">
                        <label htmlFor="icon-button-file-issuer2" className="upload-button-label">Upload</label>
                    </button>
                </div>
                {this.state.file2 !== "" && (
                    <div className="kyc-card__select_name-container">
                        <p>{this.state.filename2}</p>
                    </div>
                )}
            </div>
        </div>
    )

    card3 = () => (
        <div className="card__container">
            <h6 className="card1__title">Upload the Organization Document (such as Operating Agreement or a copy of your 10K if a US publicly traded entity)</h6>
            <div className="kyc-card__button-container">
                <div>
                    <input
                        id="icon-button-file-issuer3"
                        type="file"
                        style={{ display: "none" }}
                        onChange={this.handleOnChange3}
                    />
                    <button className="card__button" type="submit">
                        <label htmlFor="icon-button-file-issuer3" className="upload-button-label">Upload</label>
                    </button>
                </div>
                {this.state.file3 !== "" && (
                    <div className="kyc-card__select_name-container">
                        <p>{this.state.filename3}</p>
                    </div>
                )}
            </div>
        </div>
    )
    render() {
        return (
            <React.Fragment>
                <div className="outer-kycformwidth">
                    <div className='kycformwidth'>
                        <div className='topcontent1'>
                            <h2 className='text-center heading1'>KYC Process</h2>
                        </div>
                        <div className="kyc-title-container">
                            <h5>Submission of Documents</h5>
                            <i><b>1</b>/2</i>
                        </div>
                        <div id="form-btn">

                            <div className="container-fluid text-center">
                                <div className="row d-flex justify-content-center align-items-center">
                                    {this.card1()}
                                    {this.card2()}
                                    {this.card3()}
                                    <Button variant="contained" color="primary" type="submit" onClick={this.UploadKyc}> Next
                                        {this.state.formLoader === true ? (
                                            <CircularProgress size='22px' color='primary' />
                                        ) : (
                                            ''
                                        )}
                                    </Button>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </React.Fragment>
        )
    }
}

export default KycIssuer1