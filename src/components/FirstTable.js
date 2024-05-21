import React from 'react';
class FirstTable extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            ChannelName: sessionStorage.getItem('ChannelName') || null,

        };
      }
    render() {
        return (
            <React.Fragment>
                <div className="" id={this.props.section_id}>
                    <div id="pageHeader-first">
                        <div class="page-header-right">
                            {/* {this.state.ChannelName} */}
                            <div class="logo"><a href="#nogo"> <img id="wsfs_logo_first" 
                            src={this.state.ChannelName == "WSFS" ? process.env.react_app_base_url_image + 'wsfs-logo.jpg' :
                            this.state.ChannelName == "UMB" ? process.env.react_app_base_url_image + 'umb-logo.jpg':
                             process.env.react_app_base_url_image + 'logo.jpg' }
                             /> </a> </div>
                        </div>
                    </div>

                    <div class="page-first">
                        <div class="wrapper-pdf">
                            <table class="dealinfo">
                                <tbody><tr>
                                    <td colspan="3">
                                        <h1 class="pagetitle"><span id="value0">{this.props.data.dealid}</span></h1>
                                    </td>
                                </tr>
                                    <tr>
                                        <td> <label>Distribution Date</label>
                                            <span id="value1">{this.props.data.distributiondate}</span></td>
                                        <td> </td>
                                        <td>
                                            <label>Report Type</label>
                                            <span id="value2">{this.props.data.reporttype}</span></td>
                                    </tr>
                                </tbody></table>

                            <table>
                                <tbody><tr>
                                    <td><span class="investor_title"> {this.props.report_type ? this.props.report_type : 'Trustee Report'}</span> </td>
                                </tr>

                                </tbody></table>
                            <h3>Deal Contact Information</h3>
                            <table class="dealcontactinfo">

                                <tbody><tr>
                                    <td> <label>Relationship Manager</label>
                                        <span id="value3">{this.props.data.relationshipmanager}</span></td>
                                    <td> </td>
                                    <td> <label>Address</label>
                                        <span id="value4">{this.props.data.address}</span></td>
                                </tr>

                                    <tr>
                                        <td colspan="3" class="divider"> </td>
                                    </tr>

                                    <tr>
                                        <td> <label>Email</label>
                                            <a id="value5" href={"mailto:" + this.props.data.email} title={this.props.data.email}>{this.props.data.email}</a>
                                        </td>
                                        <td> </td>
                                        <td> <label>Website Reporting</label>
                                            <a id="value6" href={"http://" + this.props.data.websitereporting} title={this.props.data.websitereporting}>{this.props.data.websitereporting}</a>
                                        </td>
                                    </tr>
                                </tbody></table>
                            <table class="footernote" style={{ width: "750px", margin: "56px auto 0px auto" }}>
                                <tbody>
                                    <tr>
                                        <td class="footertext"> In the preparation of this report,
                                        Wilmington Savings Fund Society, FSB is conclusively
                                        relying on
                                        information provided to it by third parties, including the
                                        Servicer and other parties to the
                                        transaction.
                                        Such third parties are believed to be reliable, but the
                                        information is not independently
                                        verified and
                                        no representation is made as to its accuracy, suitability, or
                                        completeness. Descriptions for
                                        the
                                        fields
                                        included in the report are provided in the issue’s governing
                                        documents. Additional information
                                        is
                                        available via the contact information above.
                                            </td>
                                    </tr>
                                </tbody></table>

                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default FirstTable;
