/* eslint-disable require-jsdoc */
import React, {Component} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
// import Button from '@material-ui/core/Button';

export default class snackbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
    };
  }


  render() {
    const handleClose = (event, reason) => {
      // alert("HI")
      this.setState({open: false});
      if (reason === 'clickaway') {
        return;
      }
    };
    return (
      <React.Fragment>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={handleClose}
          message={this.props.msg}
          action={
            <React.Fragment>
              <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        />
      </React.Fragment>

    );
  }
}
// export default connect(
//     ({ snackbar }) => ({ ...snackbar }),
//     dispatch => bindActionCreators({ ...snackbarActions }, dispatch)
//   )( snackbar );
