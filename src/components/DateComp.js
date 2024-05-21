import * as React from 'react';
import moment from 'moment';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';

export default function Status(props) {
    return (
        <React.Fragment>
            <Tooltip title={props.date} aria-label="add">
                <React.Fragment>
                    {moment(props.date, "MMDDYYYY").format('MM/DD/YYYY')}
                </React.Fragment>
            </Tooltip>
        </React.Fragment>
    );
}