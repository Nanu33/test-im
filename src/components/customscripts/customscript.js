import React, { Component } from 'react';
import Loader from '../../components/loader';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
// import DateFnsUtils from '@date-io/date-fns';
import ReactFlagsSelect from 'react-flags-select';
import 'react-flags-select/css/react-flags-select.css';
import 'react-flags-select/scss/react-flags-select.scss';
import ReactCountryFlag from "react-country-flag";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import ListSubheader from '@material-ui/core/ListSubheader';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import ReactNumeric from 'react-numeric';



import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

import * as moment from 'moment';

export function CustomFieldTemplate(props) {
  const { id, classNames, label, help, required, description, errors, children } = props;
  return (
    <div className={classNames + ' customWrapper'}>
      <label htmlFor={id} className={classNames + ' customLabel'}>{label}{required ? "*" : null}</label>
      {children}
      {description}
      {errors}
      {help}
    </div>
  );
}


export const autocomplete = props => {
  const { onChange } = props;
  console.log("autocomplete options", props.options.enumOptions)
  const cars = props.options.enumOptions;
  // const options = []
  // var i;
  // for (let i = 0; i < cars.length; i++) {
  //   options.push(cars[i].value)
  // }

  // console.log("props", props)

  const handleCountryChange = (data) => {
    console.log("handleCountryChange", data)
  };

  const options = cars.map((option) => {
    const firstLetter = option.value[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  });


  const handleAutocompleteChange = (value) => {
    alert("asdas")
    console.log("handleAutocompleteChange", value)
    // const dateChangeFormat = moment(value).format('MM/DD/YYYY').toString();
    // console.log("dateChangeFormat", dateChangeFormat)
    // onChange(dateChangeFormat)
  };



  return (

    <FormControl variant="outlined">
      <Autocomplete
        labelId={props.id}
        id={props.id}
        options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
        groupBy={(option) => option.firstLetter}
        freeSolo={true}
        // groupBy={(option) => option.firstLetter}
        getOptionLabel={(option) => option.value}
        // getOptionLabel={option => option}
        renderInput={(params) => <TextField
          onInputChange={handleAutocompleteChange}
          onChange={(event) => props.onChange(event.target.value)}
          // getOptionSelected={handleAutocompleteChange}

          {...params} label={props.label} variant="outlined" />
        }
      />
    </FormControl>

  )
}

export const select = props => {
  const { onChange } = props;
  console.log("Select props value", props.label + " ------- " + props.value);

  const handleChange = val => evt => {
    evt.preventDefault()
    onChange(val)
  }

  let selectValue = null
  if (props.value != undefined) {
    selectValue = props.value;
  }

  return (

    <FormControl variant="filled" >
      <InputLabel id={props.id}>{props.label} {props.required ? '*' : ''} </InputLabel>
      <Select
        labelId={props.id}
        id={props.id}
        value={selectValue}
        required={props.required}
        onChange={(event) => props.onChange(event.target.value)}
      >
        {console.log("enum", JSON.stringify(props.options.enumOptions))}
        {props.options.enumOptions.map((item) =>
          <MenuItem value={item.value}>{item.label}</MenuItem>
        )}
      </Select>
    </FormControl>

  )
}


// export const text = props => {
//   const { onChange } = props;
//   console.log("text props value", props.label + " ------- " + props.value);

//   const handleChange = val => evt => {
//     evt.preventDefault()
//     onChange(val)
//   }

//   return (
//     <FormControl variant="filled">
//       <TextField
//         labelId={props.id}
//         id={props.id}
//         value={props.value}
//         required={props.required}
//         onChange={(event) => props.onChange(event.target.value)}
//         label={props.label}
//         variant="filled"
//          />
//     </FormControl>

//   )
// }


export const text = props => {
  const { onChange } = props;
  console.log("text props value", props.label + " ------- " + props.value);

  const handleChange = val => evt => {
    evt.preventDefault()
    onChange(val)
  }

  return (
    <FormControl variant="filled">
      <TextField
        labelId={props.id}
        id={props.id}
        value={props.value}
        required={props.required}
        onChange={(event) => props.onChange(event.target.value)}
        label={props.label}
        variant="filled"
      />
    </FormControl>

  )
}

export const selectGroup = props => {
  const { onChange } = props;
  console.log("Select props value", props.label + " ------- " + props.value);

  const handleChange = val => evt => {
    evt.preventDefault()
    onChange(val)
  }

  let selectValue = null
  if (props.value != undefined) {
    selectValue = props.value;
  }

  return (
    <FormControl variant="filled" >
      <InputLabel id={props.id}>{props.label}</InputLabel>
      <Select
        labelId={props.id}
        id={props.id}
        value={selectValue}
        required={props.required}
        onChange={(event) => props.onChange(event.target.value)}
      >
        {console.log("enum", JSON.stringify(props.options.enumOptions))}
        <ListSubheader>Category 1</ListSubheader>
        {props.options.enumOptions.map((item) =>
          <MenuItem value={item.value}>{item.label}</MenuItem>
        )}
      </Select>
    </FormControl>

  )
}


export const country = props => {
  const { onChange, } = props

  const handleChange = val => evt => {
    evt.preventDefault()
    onChange(val)
  }

  const onSelectFlag = (countryCode) => {
    console.log(countryCode)
    onChange(countryCode)
  }


  return (
    <React.Fragment>
      <ReactFlagsSelect
        labelId={props.id}
        id={props.id}
        value={props.value}
        required={props.required}
        defaultCountry="IN"
        searchable={true}
        onSelect={onSelectFlag}
      />
    </React.Fragment>
  )
}



export const date = props => {
  const { onChange, } = props
  // const newDate = new Date('2020-01-18');
  console.log("date value", props.value)
  console.log("date value", moment(props.value).format('MM-DD-YYYY'))

  let selectedDateNew = null
  if (props.value != undefined) {
    selectedDateNew = moment(props.value).format('MM-DD-YYYY');
  }
  // console.log("newDate", newDate)

  const handleDateChange = (value) => {
    console.log(new Date(value))
    const dateChangeFormat = moment(value).format('MM-DD-YYYY').toString();
    console.log("dateChangeFormat", dateChangeFormat)
    onChange(dateChangeFormat)
  };

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <KeyboardDatePicker
        disableToolbar
        margin="normal"
        id="date-picker-inline"
        label={props.label}
        value={selectedDateNew}
        onChange={handleDateChange}
        keyboard
        placeholder="MM-DD-YYYY"
        format={"MM-DD-YYYY"}
        disableOpenOnEnter
        animateYearScrolling={false}
        autoOk={true}
        clearable
        variant="filled"
      />
    </MuiPickersUtilsProvider>
  );

}

// export const eye = () => (
//   <h1>USD</h1>
// )



export const widgets = {
  select: select,
  // text: text,
  date: date,
  country: country,
  autocomplete: autocomplete
}


export const customEditSpreadsheet = {
  content: {
    left: '50%',
    // top: '100%',
    // // right: 'auto',
    // bottom: 'auto',
    // marginTop:"5%",
    // marginRight: '-50%',
    transform: 'translate(-48%, -8%)',
    zIndex: '10000',
    padding:"0px",
    // height:"35.5rem",
    width:"92rem",
    height:"50rem",
    border:"none",
    backgroundColor:"transparent",
    bordeRadius:"none"
  }
};
export const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    // marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '470px',
    zIndex: '10000',
    height: '600px',
    yOverflow: 'scroll',
    xOverflow: 'hidden'
  }
};

export const customStylesauto = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    // marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '470px',
    zIndex: '10000',
  }
};
export const customStylesauto3 = {
  content: {
    top: '149px',
    left: '658px',
    height : '522px',
    // right: 'auto',
    bottom: 'auto',
    // marginRight: '-50%',
    transform: 'translate(-50%, 0%)',
    width: '458px',
    zIndex: '10000',
  }
};
export const customStylesauto2 = {
  content: {
    top: '25%',
    left: '50%',
    // right: 'auto',
    bottom: 'auto',
    // marginRight: '-50%',
    transform: 'translate(-50%, 0%)',
    width: '470px',
    zIndex: '10000',
  }
};
export const customStylesServicer = {
  content: {
    // top: '50%',
    left: '50%',
    // right: 'auto',
    bottom: 'auto',
    // marginRight: '-50%',
    transform: 'translate(-50%, 0%)',
    width: '500px',
    zIndex: '10000',


  }
};

export const customStylesauto1 = {
  content: {
    // top: '50%',
    left: '50%',
    // right: 'auto',
    bottom: 'auto',
    // marginRight: '-50%',
    transform: 'translate(-50%, 0%)',
    width: '470px',
    zIndex: '10000',


  }
};

export const customStylesautosmallmodal = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    // marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '470px',
    zIndex: '10000',
  }
};
export const customStylesautoAccount = {
  content: {
    top: '5%',
    left: '50%',
    // right: 'auto',
    bottom: 'auto',
    // marginRight: '-50%',
    transform: 'translate(-50%, 0%)',
    width: '530px',
    zIndex: '10000',


  }
};
export const customStylesPAPopup = {
  content: {
    top: '10%',
    left: '50%',
    // right: 'auto',
    bottom: 'auto',
    // marginRight: '-50%',
    transform: 'translate(-50%, 0%)',
    width: '570px',
    zIndex: '10000',
  }
};
export const customStylesPATablePopup = {
  content: {
    top: '10%',
    left: '50%',
    // right: 'auto',
    bottom: 'auto',
    // marginRight: '-50%',
    transform: 'translate(-50%, 0%)',
    width: '1000px',
    zIndex: '10000',
  }
};
export const customStylesRegisterPopup = {
  content: {
    top : '0',
    left: '50%',
    // right: 'auto',
    bottom: 'auto',
    // marginRight: '-50%',
    transform: 'translate(-50%, 0%)',
    width: '1000px',
    zIndex: '10000',
  }
};
export const customStylesServicerTablePopup = {
  content: {
    top: '10%',
    left: '50%',
    // right: 'auto',
    bottom: 'auto',
    // marginRight: '-50%',
    transform: 'translate(-50%, 0%)',
    width: '700px',
    zIndex: '10000',
  }
};
export const customStylesAcceptPopup = {
  content: {
    top: '20%',
    left: '50%',
    // right: 'auto',
    bottom: 'auto',
    // marginRight: '-50%',
    transform: 'translate(-50%, 0%)',
    width: '610px',
    zIndex: '10000',


  }
};
export const customStylesautosmallmodalpopup = {
  content: {
    top: '30%',
    left: '50%',
    // right: 'auto',
    bottom: 'auto',
    // marginRight: '-50%',
    transform: 'translate(-50%, 0%)',
    width: '470px',
    zIndex: '10000',


  }
};
export const customStylesautosmallmodalpopupBorrow = {
  content: {
    top: '30%',
    left: '50%',
    // right: 'auto',
    bottom: 'auto',
    // marginRight: '-50%',
    transform: 'translate(-50%, 0%)',
    width: '450px',
    zIndex: '10000',
  }
};
export const customStylesautosmallmodal1 = {
  content: {
    top: '30%',
    left: '50%',
    // right: 'auto',
    bottom: 'auto',
    // marginRight: '-50%',
    transform: 'translate(-50%, 0%)',
    width: '515px',
    zIndex: '10000',
  }
};
export const customStylesautosmallmodal2 = {
  content: {
    top: '30%',
    left: '50%',
    // right: 'auto',
    bottom: 'auto',
    // marginRight: '-50%',
    transform: 'translate(-50%, 0%)',
    width: '450px',
    zIndex: '10000',
  }
};

export const customStylesPopupPending = {
  content: {
    top: '20%',
    left: '50%',
    // right: 'auto',
    bottom: 'auto',
    // marginRight: '-50%',
    transform: 'translate(-50%, 0%)',
    width: '590px',
    zIndex: '10000',
    scroll: 'none !important'


  }
};
export const customStylesPopupInvest = {
  content: {
    top: '20%',
    left: '50%',
    // right: 'auto',
    bottom: 'auto',
    // marginRight: '-50%',
    transform: 'translate(-50%, 0%)',
    width: '500px',
    zIndex: '10000',
    scroll: 'none !important'
  }
};
export const customStylesPopupInveststep = {
  content: {
    top: '20%',
    left: '50%',
    // right: 'auto',
    bottom: 'auto',
    // marginRight: '-50%',
    transform: 'translate(-50%, 0%)',
    width: '500px',
    zIndex: '10000',
    scroll: 'none !important'
  }
};
export const customStylesSmall = {
  content: {
    // top: '50%',
    left: '50%',
    // right: 'auto',
    bottom: 'auto',
    // marginRight: '-50%',
    transform: 'translate(-50%, 0%)',
    width: '470px',
    zIndex: '10000',
    height: 'auto',
    yOverflow: 'scroll',
    xOverflow: 'hidden'
  }
};

export function ObjectFieldTemplate(props) {

  return (
    <div className="row" id="initialsetupform">

      {props.title !== null ? props.title !== undefined ? props.title.length !== 0 ? <React.Fragment> <div class="col-md-12 col-sm-12">  <h5 className="MuiTypography-root MuiTypography-h5">{props.title}</h5> </div>  </React.Fragment> : '' : '' : ''}

      {props.description !== null ? props.description !== undefined ? props.description.length !== 0 ? <React.Fragment> <div class="col-md-12 col-sm-12 text-left"> <p>{props.description}</p> </div>  </React.Fragment> : '' : '' : ''}
      {props.properties.map(element => <div className={element.name + " col-md-3 col-sm-12 mb-3 " + element.id} id={element.id}>
        <React.Fragment>
          {element.content}
        </React.Fragment>
      </div>)}
    </div>
  );
}


export const theme = createTheme({
  palette: {
    primary: {
      main: '#FFC000',
      light: '#FFC000',
      dark: '#FFC000'
    },
    secondary: {
      main: '#49ae46',
      light: '#d5f2f0',
      dark: '#2e9a2b'
    }
  },
  props: {
    MuiButton: {
      size: 'medium',
    },
    MuiFilledInput: {

    },
    MuiFormControl: {

    },
    MuiFormHelperText: {

    },
    MuiIconButton: {
      size: 'medium',
    },
    MuiInputBase: {

    },
    MuiInputLabel: {


    },
    MuiListItem: {
      dense: true,
    },
    MuiOutlinedInput: {

    },
    MuiFab: {
      size: 'medium',
    },
    MuiTable: {
      size: 'medium',
    },
    MuiTextField: {

      variant: "filled",
      size: "medium",
    },
    MuiToolbar: {
      variant: 'dense',
    },
  },

  overrides: {
  },
});



// export function TablePaginationActions(props) {
//   const classes = useStyles1();
//   const theme = useTheme();
//   const { count, page, rowsPerPage, onChangePage } = props;

//   function handleFirstPageButtonClick(event) {
//     onChangePage(event, 0);
//   }

//   function handleBackButtonClick(event) {
//     onChangePage(event, page - 1);
//   }

//   function handleNextButtonClick(event) {
//     onChangePage(event, page + 1);
//   }

//   function handleLastPageButtonClick(event) {
//     onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
//   }

//   return (
//     <div className={classes.root}>
//       <IconButton
//         onClick={handleFirstPageButtonClick}
//         disabled={page === 0}
//         aria-label="first page"
//       >
//         {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
//       </IconButton>
//       <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
//         {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
//       </IconButton>
//       <IconButton
//         onClick={handleNextButtonClick}
//         disabled={page >= Math.ceil(count / rowsPerPage) - 1}
//         aria-label="next page"
//       >
//         {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
//       </IconButton>
//       <IconButton
//         onClick={handleLastPageButtonClick}
//         disabled={page >= Math.ceil(count / rowsPerPage) - 1}
//         aria-label="last page"
//       >
//         {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
//       </IconButton>
//     </div>
//   );
// }