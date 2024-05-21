// RemoteDDReportWithStyles.js
import React, { Component } from 'react';
const RemoteDDReport = React.lazy(() => import('Remote/DDReport'));

class RemoteDDReportWithStyles extends Component {
    componentDidMount() {
        this.loadStyleSheet();
    }

    componentWillUnmount() {
        this.removeStyleSheet();
    }

    loadStyleSheet() {
        const styleSheet = document.createElement('link');
        styleSheet.rel = 'stylesheet';
        styleSheet.href = '/path/to/remote/styles.css'; // Adjust the path as necessary
        styleSheet.id = 'remoteDDReportStyles'; // An ID to help find and remove it later
        document.head.appendChild(styleSheet);
    }

    removeStyleSheet() {
        const styleSheet = document.getElementById('remoteDDReportStyles');
        if (styleSheet) {
            document.head.removeChild(styleSheet);
        }
    }

    render() {
        return (
            <React.Suspense fallback={<div>Loading Report...</div>}>
                <RemoteDDReport />
            </React.Suspense>
        );
    }
}

export default RemoteDDReportWithStyles;
