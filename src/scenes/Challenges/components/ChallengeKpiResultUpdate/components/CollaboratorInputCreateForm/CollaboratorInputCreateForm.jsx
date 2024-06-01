import React, { useState, useRef, useEffect } from 'react';
import Formsy from 'formsy-react';
import {
  Spreadsheet,
  Loader,
  DefaultTitle,
  DefaultText,
  ProgressButton,
  Button,
  Avatar,
  TextField,
  InfoText,
  HiddenInput,
  DatePicker,
} from '../../../../../../components';
import { CollaboratorInputImageList } from '../';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { useIntl, injectIntl } from 'react-intl';
import {
  Grid,
  IconButton,
  withWidth,
  isWidthUp,
  CardMedia,
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUpload,
  faChevronLeft,
  faFile,
} from '@fortawesome/free-solid-svg-icons';
import * as collaboratorInputCreationActions from '../../../../../../services/CollaboratorInput/CollaboratorInputCreation/actions';
import { hasImageExtension } from '../../../../../../helpers/UrlHelper';
import _, { min } from 'lodash';

const styles = {
  spreadsheet: {
    paddingLeft: 0,
    width: '100%',
  },
  userAvatar: {
    width: 30,
    height: 30,
  },
  customImageInput: {
    display: 'none',
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
  image: {
    height: '100%',
    width: '100%',
    backgroundSize: 'contain',
    backgroundPosition: 'top',
  },
  link: {
    fontSize: 16,
    cursor: 'pointer',
    alignSelf: 'flex-start',
    color: 'rgb(15,111,222)',
    opacity: 1,
  },
  coverImage: {
    position: 'absolute',
    top: '-12px',
    height: 'calc(100% + 20px)',
    width: 'calc(50% + 20px)',
    borderRadius: '0 4px 4px 0',
  },
  inputs: {
    '& .MuiFormLabel-root.MuiInputLabel-root': {
      textTransform: 'none',
      fontWeight: 'bold',
      fontSize: 16,
      fontFamily: 'Avenir',
      color: '#555555',
    },
  },
};

const CollaboratorInputCreateForm = ({
  data,
  kpi,
  collaborator,
  width,
  classes,
  close,
  filterDate,
  filterData,
  minDate,
  maxDate,
  onSuccess,
  onError,
  image: coverImage,
  ...props
}) => {
  const intl = useIntl();
  const customImageInput = useRef();
  const [image, setImage] = useState();
  const [newImage, setNewImage] = useState();

  const { account } = props.accountDetail;

  const { loading, success, hasError: error } = props.collaboratorInputCreation;
  const isDesktop = isWidthUp('md', width);

  if (success) {
    props.collaboratorInputCreationActions.clearCollaboratorInputCreation();
    if (onSuccess) {
      onSuccess();
    }
  }

  if (error) {
    props.collaboratorInputCreationActions.clearCollaboratorInputCreation();
    if (onError) {
      onError();
    }
  }

  const handleSubmit = (model) => {
    // const payload = [Object.assign({collaborator_data_id: data.id}, model, image instanceof Blob ? { image } : {})]
    const formData = new FormData();
    const isCollaborator = _.get(account, 'role.code') === 'C';

    formData.append('collaborator_data', _.get(data, 'id', -1));
    formData.append('value', model.value);
    formData.append('description', model.description || '');
    formData.append(
      'collaborator_id',
      isCollaborator ? _.get(account, 'id') : collaborator
    );
    formData.append('kpi_id', _.get(kpi, 'id'));
    formData.append('date', filterDate);

    const image_uploads = model.images
      ? _.compact(
          model.images.map((image, index) => {
            if (image && !image.id) {
              return image;
            }
          })
        )
      : [];
    const imageUploadSizeReached = image_uploads.some(
      (image) => image.size > 20000000
    );
    image_uploads.forEach((image, index) => {
      formData.append(`image_uploads`, image);
    });

    if (imageUploadSizeReached) {
      toast.error(
        intl.formatMessage({
          id: 'challenge.kpi_results.form.file_size_error',
        })
      );
      return;
    }
    props.collaboratorInputCreationActions.createCollaboratorInput(formData);
  };

  const handleCustomImageChange = (event) => {
    const files = event.currentTarget.files;
    if (files && files.length > 0) {
      const file = files[0];

      if (file instanceof Blob) {
        setNewImage(file);
        var reader = new FileReader();
        reader.onloadend = function (e) {
          setImage(reader.result);
        }.bind(this);
        reader.readAsDataURL(file);
      }
    }
  };
  const handleImport = () => {
    customImageInput.current.click();
  };

  return (
    <div>
      <Formsy onValidSubmit={handleSubmit}>
        <Grid container spacing={2} justify='space-between'>
          <Grid item xs={12} sm={isDesktop && coverImage ? 6 : 12}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  format='dd/MM/yyyy'
                  fullWidth
                  initial={filterDate}
                  label={intl.formatMessage({ id: 'common.date' })}
                  maxDate={maxDate ? maxDate * 1000 - 8000000 : null}
                  minDate={minDate ? minDate * 1000 : null}
                  onChange={filterData}
                  name='filterDate'
                />
              </Grid>
              <Grid item xs={12}>
                <div
                  style={{
                    maxHeight: '45vh',
                    overflow: 'auto',
                    width: '100%',
                    paddingRight: 20,
                    paddingTop: 10,
                    paddingBottom: 20,
                  }}
                >
                  <Grid container spacing={2} justifyContent='space-between'>
                    <Grid item xs={12}>
                      <TextField
                        name='value'
                        variant='outlined'
                        label={intl.formatMessage({
                          id: 'challenge.kpi_results.form.data_value',
                        })}
                        placeholder={intl.formatMessage({
                          id: 'challenge.kpi_results.form.data_value_placeholder',
                        })}
                        type='number'
                        className={classes.inputs}
                        fullWidth
                        required
                        lowercase
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name='description'
                        variant='outlined'
                        label={intl.formatMessage({
                          id: 'challenge.kpi_results.form.data_description',
                        })}
                        placeholder={intl.formatMessage({
                          id: 'challenge.kpi_results.form.data_description_placeholder',
                        })}
                        className={classes.inputs}
                        fullWidth
                        lowercase
                        multiline
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <CollaboratorInputImageList images={[]} />
                    </Grid>
                  </Grid>
                </div>
              </Grid>

              <Grid item xs={12} style={{ marginTop: 15 }}>
                <ProgressButton
                  type='submit'
                  text={intl.formatMessage({ id: 'common.submit' })}
                  loading={loading}
                  centered
                  disabled={
                    !collaborator && _.get(account, 'role.code') !== 'C'
                  }
                />
              </Grid>
            </Grid>
          </Grid>
          {isDesktop && coverImage && (
            <Grid item xs={12} sm={6}>
              <CardMedia image={coverImage} className={classes.coverImage} />
            </Grid>
          )}
        </Grid>
      </Formsy>
    </div>
  );
};

const mapStateToProps = ({ collaboratorInputCreation, accountDetail }) => ({
  collaboratorInputCreation,
  accountDetail,
});

const mapDispatchToProps = (dispatch) => ({
  collaboratorInputCreationActions: bindActionCreators(
    collaboratorInputCreationActions,
    dispatch
  ),
});

export default withWidth()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(CollaboratorInputCreateForm))
);
