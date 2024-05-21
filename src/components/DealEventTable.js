import React from 'react';
import NumberComp from './NumberComp';

class DealEventTable extends React.PureComponent {
    render() {
        console.log("PercentageStat", this.props.section_title + "------------ " + JSON.stringify(this.props.data))
        return (
            <React.Fragment>
                <div className="wrapper-pdf" id={this.props.section_id}>
                    <h4 class="sectiontitle">{this.props.section_title.replace(/([A-Z])/g, " $1")}</h4>
                    <table className="table table-bordered">
                        <tbody>
                            {this.props.data == null ? '' :
                                this.props.data.map((tr_item) => {
                                    return (
                                        <React.Fragment>
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
                                        </React.Fragment>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </React.Fragment>
        )
    }
}

export default DealEventTable;
