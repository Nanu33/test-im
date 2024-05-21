import React, { Component, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import AIcon1 from './AIcon1.xlsx';
import {UploadKyc} from '../../../servies/services';

class KycIssuer3 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file1: "",
            file2: "",
            file3: "",
            file4: "",
            token: sessionStorage.getItem("token"),
      userid : sessionStorage.getItem('userid'),


        }
    }

    handleClick = () => {
        this.props.handleClickKyc1()
    }

    // 1
    handleOnChange1 = (e) => {
        this.setState({ file1: e.target.files[0], filename1:e.target.files[0].name});
    };

    // 2
    handleOnChange2 = (e) => {
        this.setState({ file2: e.target.files[0],filename2:e.target.files[0].name });
    };

    // 3
    handleOnChange3 = (e) => {
        this.setState({ file3: e.target.files[0], filename3:e.target.files[0].name});
    };

    // 4
    handleOnChange4 = (e) => {
        this.setState({ file4: e.target.files[0], filename4:e.target.files[0].name });
    };

    UploadKyc = async() => {

        console.log('uplaodlms')
       const files = []
       files.push(this.state.file1)
       files.push(this.state.file2)
       files.push(this.state.file3)
       files.push(this.state.file4)
        console.log('ffff',files)
        const newdata = new FormData();
        newdata.append('userid', this.state.userid)
        Array.from(files).forEach(file => {
            newdata.append('filename', file);
        });
        console.log('newdata',newdata)

        this.setState({ formLoader: true })
        newdata.append('token', this.state.token)

        const APIResponse = await UploadKyc(newdata)
    
        if (APIResponse.status === 200) {
        this.setState({ formLoader: true})
          console.log('upload--', APIResponse);
            this.props.handleClickKyc1()  
          }
          else{
            this.setState({ formLoader: false })
            const message = "Something went wrong, please try again";
            this.props.enqueueSnackbar(message, {
              variant: 'error',
              autoHideDuration: 2000,
            });
          }
      }

    card1 = () => (
        <div className="card__container">
            <h6 className="card1__title">Upload the W8 Form</h6>
            <ol className="card1__list">
                <li><a href={AIcon1} download className='login-sign_up-links'>Click here</a> to view the form</li>
                <li>Fill it and download</li>
                <li>Upload the filled form</li>
            </ol>
            <div className="kyc-card__button-container">
                <div>
                    <input
                        id="icon-button-file-issuer3-1"
                        type="file"
                        style={{ display: "none" }}
                        onChange={this.handleOnChange1}
                    />
                    <button className="card__button" type="submit">
                        <label htmlFor="icon-button-file-issuer3-1" className="upload-button-label">Upload</label>
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
    )

    card3 = () => (
        <div className="card__container">
            <h6 className="card1__title">Upload the Organization Document (such as Operating Agreement or a copy of your 10K if a US publicly traded entity)</h6>
            <div className="kyc-card__button-container">
                <div>
                    <input
                        id="icon-button-file-issuer3-2"
                        type="file"
                        style={{ display: "none" }}
                        onChange={this.handleOnChange2}
                    />
                    <button className="card__button" type="submit">
                        <label htmlFor="icon-button-file-issuer3-2" className="upload-button-label">Upload</label>
                    </button>
                </div>
                {this.state.file2 !== "" && (
                    <div className="kyc-card__select_name-container">
                        <p>{this.state.filename2}</p>
                        {/* <button type="button" onClick={handleClickCross}>
                            x
                        </button> */}
                    </div>
                )}
            </div>
        </div>
    )

    card4 = () => (
        <div className="card__container">
            <h6 className="card1__title">Upload the Business License / Country Authorization Document</h6>
            <div className="kyc-card__button-container">
                <div>
                    <input
                        id="icon-button-file-issuer3-3"
                        type="file"
                        style={{ display: "none" }}
                        onChange={this.handleOnChange3}
                    />
                    <button className="card__button" type="submit">
                        <label htmlFor="icon-button-file-issuer3-3" className="upload-button-label">Upload</label>
                    </button>
                </div>
                {this.state.file3 !== "" && (
                    <div className="kyc-card__select_name-container">
                        <p>{this.state.filename3}</p>
                        {/* <button type="button" onClick={handleClickCross}>
                            x
                        </button> */}
                    </div>
                )}
            </div>
        </div>
    )

    card5 = () => (
        <div className="card__container">
            <h6 className="card1__title">Upload the evidence of OFAC and FinCen clearance</h6>
            <div className="kyc-card__button-container">
                <div>
                    <input
                        id="icon-button-file-issuer3-4"
                        type="file"
                        style={{ display: "none" }}
                        onChange={this.handleOnChange4}
                    />
                    <button className="card__button" type="submit">
                        <label htmlFor="icon-button-file-issuer3-4" className="upload-button-label">Upload</label>
                    </button>
                </div>
                {this.state.file4 !== "" && (
                    <div className="kyc-card__select_name-container">
                        <p>{this.state.filename4}</p>
                        {/* <button type="button" onClick={handleClickCross}>
                            x
                        </button> */}
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
                                {this.card3()}
                                {this.card4()}
                                {this.card5()}
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

export default KycIssuer3