import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import * as moment from 'moment';
import Tooltip from '@material-ui/core/Tooltip';

function myFunction(str) {
    //var str = "Hello world!";
    if (str.length > 2) {
        var res = str.substring(2, str.length);
        var rep = res.replace(/[a-z]/gi, 'x')
        return str.replace(res, rep);
    }
  
    return str;
  }


export default class CompareItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {
                lmsLoan: this.props.lmsLoan,
                agreementLoan: this.props.agreementLoan,
                match: this.props.match
            },
            
        };
        this.handleChange = this.handleChange.bind(this);
    }

    //  arr=sessionStorage.getItem('fieldss') === null ? [] : JSON.parse(sessionStorage.getItem("fieldss"));

    handleChange(e) {
        console.log('arrrrrr',this.arr)
        const fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({
            fields:fields
        });
        console.log('fields', this.state.fields,this.props.title);
        let x= this.props.title
        let local = sessionStorage.getItem('fieldss') === null ? {} : JSON.parse(sessionStorage.getItem("fieldss"))
        local[x] = this.state.fields
        // this.arr.push([this.props.title,this.state.fields.lmsLoan,this.state.fields.agreementLoan])
        sessionStorage.setItem('fieldss',JSON.stringify(local))
    }
    

    componentDidMount() {
        console.log(this.props.title + "-" + this.props.lmsLoan + "-" + this.state.fields.agreementLoan)
    }


    render() {
        return (
            <React.Fragment>
                {/* <tr>
                    <td colSpan="3">{this.props.title}</td>
                </tr> */}
                <tr className= "matchtick1">
                    <td className='matchdatafield'>
                        <Tooltip title={this.state.fields.lmsLoan}>

                            <React.Fragment>
                        <label>{this.props.title}</label>
                            <TextField 
                                // label={this.props.title}
                                id={"outlined-basic-lmsLoan"+this.props.id}
                                name="lmsLoan"
                                value={this.props.mask == false?  this.state.fields.lmsLoan : myFunction(this.state.fields.lmsLoan)}
                                onChange={this.handleChange}
                                variant="outlined"
                                size="small"
                                disabled={(this.state.fields.match === 1 || this.state.fields.lmsLoan == this.state.fields.agreementLoan) ? true : false}
                                // disabled={this.state.fields.agreementLoan?.length == 0 ? true : this.state.fields.agreementLoan === this.state.fields.lmsLoan ? true : false}
                                // disabled
                            />
                            </React.Fragment>
                        </Tooltip>
                    </td>
                    <td className='matchdatafield1'>
                        <Tooltip title={this.state.fields.lmsLoan}>
                        <React.Fragment>
                            <label>{this.props.title}</label>
                            <TextField 
                                // label={this.props.title}
                                id={"outlined-basic-agreementLoan"+this.props.id}
                                name="agreementLoan"
                                value={this.props.mask == false?  this.state.fields.agreementLoan : myFunction(this.state.fields.agreementLoan)}
                                onChange={this.handleChange}
                                variant="outlined"
                                size="small"
                                disabled={(this.state.fields.match === 1 || this.state.fields.lmsLoan == this.state.fields.agreementLoan) ? true : false }
                                // disabled={this.state.fields.agreementLoan?.length == 0 ? true : this.state.fields.agreementLoan === this.state.fields.lmsLoan ? true : false}
                                // disabled
                            />
                            </React.Fragment>
                        </Tooltip>
                    </td>
                    <td className='matchdatatick'>
                        <span id="lmsLoanContractNumberIcon" ></span>
                        {this.state.fields.agreementLoan?.length == 0 ? <CancelIcon className="cross-icon1" src={CancelIcon} /> : (this.state.fields.match === 1 || this.state.fields.lmsLoan == this.state.fields.agreementLoan)? <CheckCircleIcon className="tick-icon1"src={CheckCircleIcon} /> : <CancelIcon className="cross-icon1" src={CancelIcon} />}
                        {/* {this.state.fields.agreementLoan?.length == 0 ? <img src={match} /> : this.state.fields.agreementLoan === this.state.fields.lmsLoan ? <img src={match} /> : <img src={mismatch} />} */}

                    </td>
                </tr>
            </React.Fragment>
        )
    }
}
