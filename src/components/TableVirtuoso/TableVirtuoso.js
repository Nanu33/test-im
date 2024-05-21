import React, { Component } from 'react';
import { TableContainer, Paper, Table, TableBody, TableRow, TableCell ,TableHead } from '@material-ui/core';
import TableVirtuoso from 'react-virtuoso'; // Assuming this is imported correctly

class ReusableTable extends Component {
    render() {
        const { data, columns, searchText, filteredData, tableData, itemHeight, handleSort, onOpenStatusUpdate, onOpenFeedback, notificationlist } = this.props;

        return (
            <React.Fragment>
                <div id="table-container" style={{ height: "100%", borderRadius: '1rem', overflow: 'auto', border: '1px solid black' }}>
                    <TableVirtuoso
                        data={searchText ? filteredData : tableData}
                        columns={columns}
                        itemHeight={itemHeight}
                        components={TableComponents}
                        style={{
                            width: '100%',
                            height: searchText
                                ? (filteredData?.length * itemHeight) > 600
                                    ? 600
                                    : filteredData?.length * itemHeight + 90
                                : (tableData?.length * itemHeight) > 600
                                    ? 600 : (tableData?.length * itemHeight) + 90,
                            overflow: 'auto',
                            borderRadius: '1rem',
                            overflowAnchor: 'none'
                        }}
                        fixedHeaderContent={() => (
                            <TableRow>
                                {columns?.map((column) => (
                                    <TableCell
                                        key={column.key}
                                        style={{
                                            background: "white",
                                            cursor: "pointer",
                                            width: `${column.length * 10}px`,
                                            whiteSpace: "nowrap",
                                        }}
                                        onClick={() => handleSort(column.name)}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                                            {column.label}
                                            {column.name !== "actions" && (
                                                <SortIcon
                                                    sortAscending={
                                                        this.state.sortAscending
                                                    }
                                                />
                                            )}                                                                    </div>
                                    </TableCell>
                                ))}
                            </TableRow>
                        )}
                        itemContent={(index) => {
                            const rowData = searchText ? filteredData[index] : tableData[index];
                            const isOddRow = index % 2 !== 0;

                            return (
                                <>
                                    {columns?.map((column) => (
                                        <TableCell
                                            key={column.key}
                                            style={{
                                                width: `${column.length * 10}px`,
                                                background: "white",
                                                whiteSpace: "nowrap",
                                                backgroundColor: isOddRow ? "rgb(229,229,229,0.3)" : "",
                                            }}
                                        >
                                            {column.name === "Original Principal Balance"
                                                ? formatNumberWithCommas(rowData[column.name])
                                                : column.bodyRenderer
                                                    ? column.bodyRenderer(rowData)
                                                    : rowData[column.name]}
                                            {column.name === "Actions" && (
                                                <div style={{ display: 'flex', flexDirection: 'row', marginTop: '-5px' }}>
                                                    <button className="search-mui-icons">
                                                        <ClearOutlinedIcon onClick={() => onOpenStatusUpdate(rowData["Loan ID"])} />
                                                    </button>
                                                    {notificationlist.some((loanid) => loanid === rowData['Loan ID']) ? (
                                                        <button className="search-mui-icons-unread" style={{ color: '#CA2E55' }}>
                                                            <MessageOutlinedIcon onClick={() => onOpenFeedback(rowData["Loan ID"])} />
                                                        </button>
                                                    ) : (
                                                        <button className="search-mui-icons">
                                                            <MessageOutlinedIcon onClick={() => onOpenFeedback(rowData["Loan ID"])} />
                                                        </button>
                                                    )}
                                                </div>
                                            )}
                                        </TableCell>
                                    ))}
                                </>
                            )
                        }}
                    />
                </div>
            </React.Fragment>
        );
    }
}

const TableComponents = {
    Scroller: React.forwardRef((props, ref) => (
        <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => <Table {...props} style={{ borderCollapse: "separate" }} />,
    TableHead: TableHead,
    TableRow: TableRow,
    TableBody: React.forwardRef((props, ref) => (
        <TableBody {...props} ref={ref} />
    )),
};

export default ReusableTable;
