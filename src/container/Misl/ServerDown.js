import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withSnackbar } from 'notistack';

class ServerDown extends Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    render() {
        return (
            <React.Fragment>
                <div class="thanks-message">
                    <h2>Sorry, we're down for maintenance</h2>
                    <p>Website is temporarily unavailable due to planned maintenance.</p>
                    <p>Have a great day!</p>
                    
                    <Button color="primary" variant="outlined" href="/">Back to Home </Button>
                    </div>

            </React.Fragment>
        );
    }
}

export default withSnackbar(ServerDown);