import React, { Component, Suspense, lazy } from 'react'
import Sidebar from "./../../../components/sidebar";
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles'

import 'Remote/styles'
const RemoteDDReport = lazy(() => import('Remote/DDReport'))

export default class VA_Loans extends Component {
    constructor(props) {
        super(props);
        this.state = { theme: null };
    }

    componentDidMount() {
        import('Remote/theme')
            .then((sharedTheme) => {
                console.log('Imported Theme', sharedTheme.theme)
                this.setState({ theme: sharedTheme.theme });
            })
            .catch((error) => console.error('Error loading shared theme', error));
    }
    componentWillUnmount() {
        this.setState({ theme: null });
        window.location.reload();
    }
    render() {
        const { theme } = this.state;
        console.log(theme, "theme")

        if (!theme) {
            return <div>Loading theme...</div>;
        }

        return (
            <>
                <MuiThemeProvider theme={theme}>
                    <div>
                        <Sidebar activeComponent={"VA_Dashboard"} />
                        <div className="content1">
                            <div className="remoteDDReport">
                                <React.Fragment>
                                    <Suspense fallback={<div style={{ textAlign: 'center' }}>Loading...</div>}>
                                        <RemoteDDReport />
                                    </Suspense>
                                </React.Fragment>
                            </div>
                        </div>
                    </div>
                </MuiThemeProvider>
            </>
        )
    }
}
