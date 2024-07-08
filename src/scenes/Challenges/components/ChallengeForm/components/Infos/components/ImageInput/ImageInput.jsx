import React, { useEffect } from 'react';
import { withFormsy } from 'formsy-react';
import {
  CardMedia,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Grid,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  InfoText,
  ErrorText,
  DefaultText,
} from '../../../../../../../../components/Common/components/Texts/components';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import * as Resources from '../../../../../../../../Resources';
import { useIntl } from 'react-intl';

const styles = {
  image: {
    height: 80,
    opacity: 0.25,
    '&:hover': {
      opacity: 1,
    },
    cursor: 'pointer',
  },
  customImage: {
    height: '100%',
    backgroundColor: '#f7f8fc',
    cursor: 'pointer',
    opacity: 0.75,
    '&:hover': {
      opacity: 1,
    },
  },
  customImageInput: {
    display: 'none',
  },
  selectedImage: {
    height: 80,
    cursor: 'pointer',
  },
  panel: {
    backgroundColor: 'initial',
    borderRadius: 'initial',
    boxShadow: 'none',
  },
  panelSummary: {
    padding: 'initial',
  },
  panelDetails: {
    padding: 'initial',
  },
};

const ImageInput = ({
  images = [],
  initial,
  label,
  name,
  onChange,
  required,
  ...props
}) => {
  const intl = useIntl();
  const { classes } = props;
  const customImageInput = React.useRef();
  const [expanded, setExpanded] = React.useState(false);
  const [value, setValue] = React.useState(initial);
  const errorMessage = !(!props.isFormSubmitted && value == null)
    ? props.errorMessage
    : null;
  const hasError = !(
    (!props.isFormSubmitted && value == null) ||
    props.isValid
  );
  const finalLabel = required ? `${label} *` : label;
  useEffect(() => {
    props.setValue(initial);
  }, []);

  function handleCustomImageChange(event) {
    const files = event.currentTarget.files;

    if (files && files.length > 0) {
      const file = files[0];
      props.setValue(file);
      setValue(file);
      setExpanded(false);
      if (onChange) onChange(file);
    }
  }

  const handleExpansionChange = (event, expanded) => {
    setExpanded(expanded);
  };

  function handleImport() {
    customImageInput.current.click();
  }

  const handleValue = (value) => () => {
    props.setValue(value);
    setValue(value);
    setExpanded(false);
    if (onChange) onChange(value);
  };

  return (
    <div>
      <ExpansionPanel
        expanded={expanded}
        onChange={handleExpansionChange}
        className={classes.panel}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          className={classes.panelSummary}
        >
          {!hasError && <InfoText>{finalLabel}</InfoText>}
          {hasError && <ErrorText>{finalLabel}</ErrorText>}
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.panelDetails}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InfoText>
                {intl.formatMessage({ id: 'reward.image_input_infos' })}
              </InfoText>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Grid
                container
                justify='center'
                alignItems='center'
                onClick={handleImport}
                className={classes.customImage}
              >
                <Grid item>
                  <DefaultText align='center'>
                    <FontAwesomeIcon icon={faUpload} />
                  </DefaultText>
                  <DefaultText align='center'>
                    {intl.formatMessage({ id: 'common.import' })}
                  </DefaultText>
                  <input
                    ref={customImageInput}
                    type='file'
                    accept='image/*'
                    className={classes.customImageInput}
                    onChange={handleCustomImageChange}
                    multiple={false}
                  />
                </Grid>
              </Grid>
            </Grid>
            {images.map((image) => {
              const imageClass =
                value == image.id ? classes.selectedImage : classes.image;
              return (
                <Grid
                  key={image.id}
                  item
                  xs={6}
                  sm={3}
                  onClick={handleValue(image.id)}
                >
                  <CardMedia image={image.path} className={imageClass} />
                </Grid>
              );
            })}
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <input type='hidden' name={name} value={value} />
      {hasError && <ErrorText>{errorMessage}</ErrorText>}
    </div>
  );
};

export default withStyles(styles)(withFormsy(ImageInput));
