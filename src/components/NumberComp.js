import * as React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import CurrencyFormat from 'react-currency-format';

export default function NumberComp(props) {
    let mode = sessionStorage.getItem('paymentmode')
    console.log('props', props,mode);
    return (
        <React.Fragment>
            <Tooltip title={props.value} aria-label="add">
                {mode == "onchain" ? 
                <React.Fragment>
                    {/* {moment(props.date, "YYYYMMDD").format('MM/DD/YYYY')} */}
                    <CurrencyFormat value={props.value} displayType={'text'} suffix={' USDC'} thousandSeparator={true} renderText={value => <div>{value}</div>} />
                </React.Fragment>
                :
                <React.Fragment>
                {/* {moment(props.date, "YYYYMMDD").format('MM/DD/YYYY')} */}
                <CurrencyFormat value={parseFloat(props.value).toFixed(2)} displayType={'text'} suffix={' USD'} thousandSeparator={true} renderText={value => <div>{value}</div>} />
            </React.Fragment>
}

            </Tooltip>
        </React.Fragment>
    );
}