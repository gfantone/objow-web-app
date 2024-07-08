import React, { useEffect, useContext } from "react";
import { withFormsy } from "formsy-react";
import { createMuiTheme } from "@material-ui/core";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { ThemeProvider } from "@material-ui/styles";
import DateFnsUtils from "@date-io/date-fns";
import fr from "date-fns/locale/fr";
import en from "date-fns/locale/en-US";
import it from "date-fns/locale/it";
import es from "date-fns/locale/es";
import cs from "date-fns/locale/cs";
import da from "date-fns/locale/da";
import de from "date-fns/locale/de";
import el from "date-fns/locale/el";
import fi from "date-fns/locale/fi";
import hr from "date-fns/locale/hr";
import hu from "date-fns/locale/hu";
import nl from "date-fns/locale/nl";
import pt from "date-fns/locale/pt";
import ro from "date-fns/locale/ro";
import sk from "date-fns/locale/sk";
import sv from "date-fns/locale/sv";
import { useIntl } from "react-intl";
import { I18nWrapper } from "../../../../../../components";

const theme = createMuiTheme({
  overrides: {
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: "#103D5C",
      },
    },
    MuiPickersDay: {
      daySelected: {
        backgroundColor: "#00E58D",
        "&:hover": {
          backgroundColor: "#00E58D",
        },
      },
      current: {
        color: "#00E58D",
      },
    },
    MuiPickersYear: {
      yearSelected: {
        color: "#00E58D",
      },
    },
    MuiPickersModal: {
      withAdditionalAction: {
        "& > button": {
          color: "#00E58D",
        },
      },
    },
  },
});

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
  const [value, setValue] = React.useState(initial);
  const hasError = props.isFormSubmitted && !props.isValid;
  const errorMessage = hasError ? props.errorMessage : null;
  const intl = useIntl();
  const context = useContext(I18nWrapper.Context);

  const fnsLocales = {
    fr,
    en,
    it,
    es,
    cs,
    da,
    de,
    el,
    fi,
    hr,
    hu,
    nl,
    pt,
    ro,
    sk,
    sv,
  };

  useEffect(() => {
    props.setValue(initial);
  }, [initial]);

  const handleChange = (date) => {
    const value = date;
    props.setValue(value);
    setValue(value);
    if (onChange) onChange(value);
  };
  // const renderWeekPickerDay = (date, selectedDates, pickersDayProps) => {
  //     if (!value) {
  //       return <PickersDay {...pickersDayProps} />;
  //     }

  //     const start = value.startOf('week');
  //     const end = value.endOf('week');

  //     const dayIsBetween = date.isBetween(start, end, null, '[]');
  //     const isFirstDay = date.isSame(start, 'day');
  //     const isLastDay = date.isSame(end, 'day');

  //     return (
  //       <CustomPickersDay
  //         {...pickersDayProps}
  //         disableMargin
  //         dayIsBetween={dayIsBetween}
  //         isFirstDay={isFirstDay}
  //         isLastDay={isLastDay}
  //       />
  //     );
  //   };
  return (
    <div>
      <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider
          utils={DateFnsUtils}
          locale={fnsLocales[context.locale] || fnsLocales["fr"]}
          fullWidth={fullWidth}
        >
          <DatePicker
            name={name}
            label={required ? `${label} *` : label}
            clearLabel={intl.formatMessage({ id: "common.erase" })}
            cancelLabel={intl.formatMessage({ id: "common.cancel" })}
            okLabel={intl.formatMessage({ id: "common.ok" })}
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
          />
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </div>
  );
};

export default withFormsy(CustomDatePicker);
