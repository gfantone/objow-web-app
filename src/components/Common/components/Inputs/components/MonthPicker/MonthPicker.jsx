import React, { Component } from 'react';
import { withFormsy } from 'formsy-react';
import { createMuiTheme } from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ThemeProvider } from '@material-ui/styles';
import DateFnsUtils from '@date-io/date-fns';
import frLocale from 'date-fns/locale/fr';

import {} from '@material-ui/pickers/typings/overrides';

import lightBlue from '@material-ui/core/colors/lightBlue';

const theme = createMuiTheme({
  overrides: {
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: '#103D5C',
      },
    },
    MuiPickersDay: {
      daySelected: {
        backgroundColor: '#00E58D',
        '&:hover': {
          backgroundColor: '#00E58D',
        },
      },
      current: {
        color: '#00E58D',
      },
    },
    MuiPickersYear: {
      yearSelected: {
        color: '#00E58D',
      },
    },
    MuiPickersModal: {
      withAdditionalAction: {
        '& > button': {
          color: '#00E58D',
        },
      },
    },
  },
});

class MonthPicker extends Component {
  componentDidMount() {
    if (this.props.clearable) {
      this.props.setValue(null);
    } else {
      this.props.setValue(new Date());
    }
  }

  handleChange(date) {
    this.props.setValue(date);
    if (this.props.onChange != null) {
      this.props.onChange(date);
    }
  }

  render() {
    const { clearable, format, fullWidth, label, name } = this.props;
    const value = this.props.value != null ? this.props.value : null;

    return (
      <div>
        <ThemeProvider theme={theme}>
          <MuiPickersUtilsProvider
            utils={DateFnsUtils}
            locale={frLocale}
            fullWidth={fullWidth}
          >
            <DatePicker
              name={name}
              label={label}
              clearLabel="Effacer"
              cancelLabel="Annuler"
              okLabel="Ok"
              views={['year', 'month']}
              format={format}
              fullWidth={fullWidth}
              InputLabelProps={{
                shrink: true,
              }}
              clearable={clearable}
              onChange={this.handleChange.bind(this)}
              value={value}
            />
          </MuiPickersUtilsProvider>
        </ThemeProvider>
      </div>
    );
  }
}

export default withFormsy(MonthPicker);
