import React from 'react';
import NumberComp from './NumberComp';
class AcquisitionCriteriaTable extends React.PureComponent {
    render() {
        console.log("AcquisitionCriteriaTable", this.props.section_title + "------------ " + JSON.stringify(this.props.data))
        return (
            <React.Fragment>
                <div className="wrapper-pdf" id={this.props.section_id}>
                    <h4 class="sectiontitle">{this.props.section_title.replace(/([A-Z])/g, " $1")}</h4>
                    {this.props.data == null ? '' :
                        this.props.data.map((tr_item) => {
                            return (
                                <React.Fragment>
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                {Object.entries(tr_item[0]).map(([key, value]) => {
                                                    return (
                                                        <React.Fragment>
                                                            <th> {key.replace(/([a-z])([A-Z])/g, '$1 $2')} </th>
                                                        </React.Fragment>
                                                    );
                                                })
                                                }
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {tr_item.map((tr_item1) => {
                                                return (
                                                    <React.Fragment>

                                                        <tr>
                                                            <React.Fragment>
                                                                {Object.entries(tr_item1).map(([key, value]) => {
                                                                    return (
                                                                        <td><NumberComp value={value}></NumberComp></td>
                                                                    );
                                                                })
                                                                }
                                                            </React.Fragment>
                                                        </tr>
                                                    </React.Fragment>
                                                )
                                            })
                                            }
                                        </tbody>
                                    </table>
                                </React.Fragment>
                            );
                        })
                    }
                </div>
            </React.Fragment>
        )
    }
}

export default AcquisitionCriteriaTable;
