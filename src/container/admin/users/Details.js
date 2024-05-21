/* eslint-disable require-jsdoc */
import React, { Component } from 'react';
import { withSnackbar } from 'notistack';
import { UserList } from '../../../components/StaticData';

class ItemDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: sessionStorage.getItem('reactToken'),
            loading: false,
            getLoansLoader: false,
            open: false,
            message: '',
        };
    }

    handleInit() {
        console.log('FilePond instance has initialised', this.pond);
    }

    async componentDidMount() {

    }

    singleDeails = Object.entries(UserList[0]).map(([key, value]) => {
        return (
            <React.Fragment>
                <div class="form-group row">
                    <label class="col-sm-4 col-form-label">{key.replace(/_/g, " ")}</label>
                    <div class="col-sm-8">
                        <div className="col-form-label">
                        {value}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    })


    render() {
        return (
            <React.Fragment>
                <div className="container-fluid">
                   
                        {this.singleDeails}
                  
                </div>
            </React.Fragment>
        );
    }
}

export default withSnackbar(ItemDetails);