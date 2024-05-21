import React from 'react';
import NumberComp from './NumberComp';
class CreateAdditonalTable extends React.PureComponent {
    render() {
        return (
            <div className="wrapper-pdf" id={this.props.section_id}>
                <h4 class="sectiontitle">{this.props.section_title}</h4>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                        {this.props.data == null ? '' :
                            Object.entries(this.props.data[0]).map(([key, value]) => {
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
                        {this.props.data == null ? '' :
                            this.props.data.map((tr_item) => {
                                return (
                                    <React.Fragment>
                                        <tr>
                                            <React.Fragment>
                                                {tr_item == null ? '' :
                                                    Object.entries(tr_item).map(([key, value]) => {
                                                        return (
                                                           <td> <NumberComp value={value}></NumberComp> </td>
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
        )
    }
}

export default CreateAdditonalTable;
