import React from 'react';
class FirstTable extends React.PureComponent {
    render() {
        return (
            <React.Fragment>
                <div class="index">
                    <div class="wrapper-pdf">
                        <ul> 
                            

                            <React.Fragment>
                                                {this.props.data == null ? '' :
                                                    this.props.data.map((item) => {
                                                        return (
                                                            <li> <a> <div class="inner">{item.title.replace("_"," ")}</div> </a> </li>
                                                        );
                                                    })
                                                }
                                            </React.Fragment>
                        </ul>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default FirstTable;
