import React, { useEffect } from 'react'
import { withFormsy } from 'formsy-react'
import { createMuiTheme } from '@material-ui/core'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import { ThemeProvider } from '@material-ui/styles'
import DateFnsUtils from '@date-io/date-fns'
import frLocale from 'date-fns/locale/fr'

const theme = createMuiTheme({
    overrides: {
        MuiPickersToolbar: {
            toolbar: {
                backgroundColor: '#103D5C',
            }
        },
        MuiPickersDay: {
            daySelected: {
                backgroundColor: '#00E58D',
                '&:hover': {
                    backgroundColor: '#00E58D'
                }
            },
            current: {
                color: '#00E58D'
            }
        },
        MuiPickersYear: {
            yearSelected: {
                color: '#00E58D'
            }
        },
        MuiPickersModal: {
            withAdditionalAction: {
                '& > button': {
                    color: '#00E58D'
                }
            }
        }
    }
});

const CustomDatePicker = ({ clearable, disabled, format, initial = null, fullWidth, minDate, maxDate, label, required, name, onChange, ...props }) => {
    const [value, setValue] = React.useState(initial);
    const hasError = props.isFormSubmitted && !props.isValid;
    const errorMessage = hasError ? props.getErrorMessage : null;

    useEffect(() => {
        props.setValue(initial)
    }, [initial]);

    const handleChange = (date) => {
        const value = date;
        props.setValue(value);
        setValue(value);
        if (onChange) onChange(value)
    };

    return (
        <div>
            <ThemeProvider theme={theme}>
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={frLocale} fullWidth={fullWidth}>
                    <DatePicker
                        name={name}
                        label={required ? `${label} *` : label}
                        clearLabel='Effacer'
                        cancelLabel='Annuler'
                        okLabel='Ok'
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
    )
};

export default withFormsy(CustomDatePicker)
