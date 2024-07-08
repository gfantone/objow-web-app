import React, { useContext, useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withFormsy } from 'formsy-react';
import {
  Grid,
  MenuItem,
  Select,
  FormControl,
  CardMedia,
  InputLabel,
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { I18nWrapper, Card } from '../../../../..';

const styles = {
  wrapper: {
    paddingLeft: 5,
    paddingBottom: 0,
    '& .MuiInput-underline:before': {
      display: 'none',
    },
    '& .MuiInput-underline.Mui-focused:after': {
      display: 'none',
    },
  },
  dropdown: {
    marginLeft: -7,
  },
};

const LanguageSelect = ({
  initial,
  classes,
  name,
  onChange,
  bigLabel,
  label,
  required,
  noCard,
  updateInitial,
  ...props
}) => {
  const [initialized, setInitialized] = useState(false);
  const [initialValue, setInitialValue] = useState(initial);
  const hasError = props.isFormSubmitted && !props.isValid;
  const finalLabel = label ? (required ? `${label} *` : label) : null;
  const selectRef = React.createRef();
  const context = useContext(I18nWrapper.Context);
  const CardComponent = noCard ? React.Fragment : Card;
  const langs = [
    {
      id: 'fr',
      name: 'Français',
      icon: require(`../../../../../../assets/img/system/flags/fr.svg`),
    },
    {
      id: 'en',
      name: 'English',
      icon: require(`../../../../../../assets/img/system/flags/gb.svg`),
    },
    {
      id: 'es',
      name: 'Español',
      icon: require(`../../../../../../assets/img/system/flags/es.svg`),
    },
    {
      id: 'hr',
      name: 'Croatian',
      icon: require(`../../../../../../assets/img/system/flags/hr.svg`),
    },
    {
      id: 'cs',
      name: 'Czech',
      icon: require(`../../../../../../assets/img/system/flags/cz.svg`),
    },
    {
      id: 'da',
      name: 'Danish',
      icon: require(`../../../../../../assets/img/system/flags/dk.svg`),
    },
    {
      id: 'de',
      name: 'Deutsch',
      icon: require(`../../../../../../assets/img/system/flags/de.svg`),
    },
    {
      id: 'nl',
      name: 'Dutch',
      icon: require(`../../../../../../assets/img/system/flags/nl.svg`),
    },
    {
      id: 'fi',
      name: 'Finnish',
      icon: require(`../../../../../../assets/img/system/flags/fi.svg`),
    },
    {
      id: 'el',
      name: 'Greek',
      icon: require(`../../../../../../assets/img/system/flags/gr.svg`),
    },
    {
      id: 'hu',
      name: 'Hungarian',
      icon: require(`../../../../../../assets/img/system/flags/hu.svg`),
    },
    {
      id: 'it',
      name: 'Italiano',
      icon: require(`../../../../../../assets/img/system/flags/it.svg`),
    },
    {
      id: 'pt',
      name: 'Português',
      icon: require(`../../../../../../assets/img/system/flags/pt.svg`),
    },
    {
      id: 'ro',
      name: 'Romanian',
      icon: require(`../../../../../../assets/img/system/flags/ro.svg`),
    },
    {
      id: 'sk',
      name: 'Slovak',
      icon: require(`../../../../../../assets/img/system/flags/sk.svg`),
    },
    {
      id: 'sv',
      name: 'Swedish',
      icon: require(`../../../../../../assets/img/system/flags/se.svg`),
    },
  ];

  // const handleChange = (val) => {
  //   props.setValue(val)
  //   context.selectLanguage(val)
  //   setInitialValue(val)
  //   if(onChange) {
  //
  //     onChange(val)
  //   }
  // }

  // useEffect(() => {
  //   if(!initialized) {
  //     selectRef.current.value = 'en'
  //     setInitialized(true)
  //   }
  // }, [])

  // useEffect(() => {
  //   props.setValue(initial)
  //   setInitialValue(initial)
  // }, [initial])

  useEffect(() => {
    props.setValue(initial);
    if (updateInitial) setInitialValue(initial);
  }, [initial]);

  const handleChange = (value) => {
    setInitialValue(value);
    props.setValue(value);
    if (onChange) onChange(value);
  };

  return (
    <CardComponent marginDisabled className={classes.wrapper}>
      <FormControl>
        {label && (
          <InputLabel
            shrink={!bigLabel}
            error={hasError}
            className={`${classes.label} ${bigLabel ? classes.bigLabel : ''}`}
          >
            {finalLabel}
          </InputLabel>
        )}
        <Select
          name={name}
          ref={selectRef}
          className={classes.select}
          onChange={(e) => {
            const val = e.target.value;
            handleChange(val);
          }}
          value={initialValue}
          MenuProps={{
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left',
            },
            transformOrigin: {
              vertical: 'top',
              horizontal: 'left',
            },
            getContentAnchorEl: null,
            classes: { paper: classes.dropdown },
          }}
        >
          {langs.map((lang) => (
            <MenuItem value={lang.id} key={lang.id}>
              <Grid container>
                <Grid item>
                  <CardMedia
                    image={lang.icon}
                    style={{ height: 20, width: 20, marginRight: 5 }}
                  />
                </Grid>
                <Grid item>{lang.name}</Grid>
              </Grid>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </CardComponent>
  );
};

export default withStyles(styles)(withFormsy(LanguageSelect));
