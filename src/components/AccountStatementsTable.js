import React from 'react';
import NumberComp from './NumberComp';
class AcquisitionCriteriaTable extends React.PureComponent {
    render() {
        console.log("AccountStatementsTable", this.props.section_title + "------------ " + JSON.stringify(this.props.data[0]))
        return (
            <React.Fragment>

                <div className="wrapper-pdf" id={this.props.section_id}>
                    <h4 class="sectiontitle">{this.props.section_title.replace(/([A-Z])/g, " $1")}</h4>

                    <table class="table100 nopadding noborder">
                        <tbody><tr>
                            <td class="w50">
                                <table className="table table-bordered">
                                    {this.props.data[1] == null ? '' :
                                        this.props.data[1] == null ? '' :
                                            Object.entries(this.props.data[1]).map(([key, value]) => {
                                                return (
                                                    <React.Fragment>
                                                        {value.length == 0 ?
                                                            <thead className="">
                                                                <tr>
                                                                    <th className="" colSpan="2">{key}</th>
                                                                </tr>
                                                            </thead>
                                                            :
                                                            <tr>
                                                                <td>{key}</td>
                                                                <td>
                                                                    
                                                                    <NumberComp value={value}></NumberComp></td>
                                                            </tr>
                                                        }

                                                    </React.Fragment>
                                                );
                                            })
                                    }
                                </table>

                            </td>

                            <td class="w50">

                                <table className="table table-bordered">
                                    {this.props.data[2] == null ? '' :
                                        this.props.data[2] == null ? '' :
                                            Object.entries(this.props.data[2]).map(([key, value]) => {
                                                return (
                                                    <React.Fragment>
                                                        {value.length == 0 ?
                                                            <thead className="">
                                                                <tr>
                                                                    <th className="" colSpan="2">{key}</th>
                                                                </tr>
                                                            </thead>
                                                            :
                                                            <tr>
                                                                <td>{key}</td>
                                                                <td><NumberComp value={value}></NumberComp></td>
                                                            </tr>
                                                        }

                                                    </React.Fragment>
                                                );
                                            })
                                    }
                                </table>

                            </td>
                        </tr>
                        </tbody></table>

                    <table class="table100 nopadding noborder">
                        <tbody><tr>
                            <td class="w50">

                                <table className="table table-bordered">
                                    {this.props.data[0] == null ? '' :
                                        this.props.data[0].map((tr_item) => {
                                            return (
                                                <React.Fragment>
                                                    {tr_item.value1.length == 0 && tr_item.value2.length == 0 ?
                                                        <thead className="">
                                                            <tr>
                                                                <React.Fragment>
                                                                    <th colSpan="3">{tr_item.key}</th>
                                                                </React.Fragment>
                                                            </tr>
                                                        </thead>
                                                        :
                                                        <tbody>
                                                            <tr>
                                                                <React.Fragment>
                                                                    {tr_item == null ? '' :
                                                                        Object.entries(tr_item).map(([key, value]) => {
                                                                            return (
                                                                                <td><NumberComp value={value}></NumberComp></td>
                                                                            );
                                                                        })
                                                                    }
                                                                </React.Fragment>
                                                            </tr>
                                                        </tbody>
                                                    }
                                                </React.Fragment>
                                            );
                                        })
                                    }
                                </table>
                            </td>
                            <td class="w50">

                            </td>
                        </tr>
                        </tbody></table>


                </div>
            </React.Fragment>
        )
    }
}

export default AcquisitionCriteriaTable;
