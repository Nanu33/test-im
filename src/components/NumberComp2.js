import * as React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import CurrencyFormat from 'react-currency-format';

export default function NumberComp(props) {
    return (
        <React.Fragment>
            <Tooltip title={props.value} aria-label="add">
                <React.Fragment>
                    {/* {moment(props.date, "YYYYMMDD").format('MM/DD/YYYY')} */}
                    <CurrencyFormat value={props.value} displayType={'text'} thousandSeparator={true} renderText={value => <div>{value}</div>} />
                </React.Fragment>
            </Tooltip>
        </React.Fragment>
    );
}