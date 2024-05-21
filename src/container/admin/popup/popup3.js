/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import React, { Component } from 'react';
import { withSnackbar } from 'notistack';
import Button from '@material-ui/core/Button';

class popup3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      OrgLoading: false,
      tableData:[]
    };
  }


  async componentDidMount() {
   
  }

  handleClick =()=>{
    this.props.history.push({
        pathname: "/admin/issuerdashboard"
      });
  }


  render() {
    return (
      <React.Fragment>
          <div className="shiftingpopup">
        <div className="card__container2">
            <div className='popupheading'><h4>Request submitted for Verification!</h4></div>
            <h6 className="card1__title">The assigned verification agent will review your pool and it will be offered to investors once it’s approved.</h6>
            <div className='popupbutton'>
            <Button variant="contained" color="primary" type="submit" onClick={this.handleClick}> Go to Dashboard 
                                </Button>
                                </div>
        </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withSnackbar(popup3);
