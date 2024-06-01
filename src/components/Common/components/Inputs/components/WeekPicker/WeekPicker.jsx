import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import { withFormsy } from 'formsy-react';
import { createMuiTheme } from '@material-ui/core';
import isBetweenPlugin from 'dayjs/plugin/isBetween';
import { styled } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';

import { ThemeProvider } from '@material-ui/styles';
import DateFnsUtils from '@date-io/date-fns';
import frLocale from 'date-fns/locale/fr';

dayjs.extend(isBetweenPlugin);

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

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) =>
    prop !== 'dayIsBetween' && prop !== 'isFirstDay' && prop !== 'isLastDay',
})(({ theme, dayIsBetween, isFirstDay, isLastDay }) => ({
  ...(dayIsBetween && {
    borderRadius: 0,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.primary.dark,
    },
  }),
  ...(isFirstDay && {
    borderTopLeftRadius: '50%',
    borderBottomLeftRadius: '50%',
  }),
  ...(isLastDay && {
    borderTopRightRadius: '50%',
    borderBottomRightRadius: '50%',
  }),
}));

const CustomDatePicker = ({
  clearable,
  disabled,
  format,
  initial = null,
  fullWidth,
  minDate,
  maxDate,
  label,
  required,
  name,
  onChange,
  ...props
}) => {
  const [value, setValue] = React.useState(dayjs(initial));
  const hasError = props.isFormSubmitted && !props.isValid;
  const errorMessage = hasError ? props.errorMessage : null;

  useEffect(() => {
    if (initial) {
      props.setValue(dateToWeekRange(dayjs(initial)));
    }
  }, [initial]);

  const dateToWeekRange = (date) => {
    return {
      start: date.startOf('week').add(1, 'day')['$d'],
      end: date.endOf('week').add(1, 'day')['$d'],
    };
  };
  const handleChange = (date) => {
    const value = dateToWeekRange(date);
    props.setValue(value);
    setValue(date);
    if (onChange) onChange(value);
  };
  const renderWeekPickerDay = (date, selectedDates, pickersDayProps) => {
    if (!value) {
      return <PickersDay {...pickersDayProps} />;
    }

    const start = value.subtract(1, 'day').startOf('week').add(1, 'day');
    const end = value.subtract(1, 'day').endOf('week').add(1, 'day');
    const dayIsBetween = date.isBetween(start, end, null, '[]');
    const isFirstDay = date.isSame(start, 'day');
    const isLastDay = date.isSame(end, 'day');

    return (
      <CustomPickersDay
        {...pickersDayProps}
        disableMargin
        dayIsBetween={dayIsBetween}
        isFirstDay={isFirstDay}
        isLastDay={isLastDay}
      />
    );
  };
  return (
    <div>
      <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider
          utils={DateFnsUtils}
          locale={frLocale}
          fullWidth={fullWidth}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDatePicker
              name={name}
              label={required ? `${label} *` : label}
              displayStaticWrapperAs="desktop"
              minDate={minDate}
              disabled={disabled}
              maxDate={maxDate}
              format={format}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth={fullWidth}
              clearable={clearable}
              onChange={handleChange}
              value={value}
              helperText={errorMessage}
              error={hasError}
              renderDay={renderWeekPickerDay}
            />
          </LocalizationProvider>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </div>
  );
};

export default withFormsy(CustomDatePicker);
