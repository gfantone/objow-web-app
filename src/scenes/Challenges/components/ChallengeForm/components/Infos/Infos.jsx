import React from 'react';
import { connect } from 'react-redux';
import { CardMedia, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ImageInput } from './components';
import {
  Card,
  DatePicker,
  DefaultTitle,
  InfoText,
  Select,
  TextField,
  RichTextField,
} from '../../../../../../components';
import * as Resources from '../../../../../../Resources';
import { useIntl } from 'react-intl';
import _ from 'lodash';
const useStyles = makeStyles({
  image: {
    height: '100%',
    width: '100%',
    backgroundSize: 'contain',
    backgroundPosition: 'top',
  },
});

const Infos = ({
  description,
  end,
  customImage,
  image,
  images,
  isUpdate,
  name,
  period,
  onEndChange,
  onStartChange,
  onTypeChange,
  start,
  type,
  types,
  awardType,
  awardTypes,
  ...props
}) => {
  const intl = useIntl();
  const classes = useStyles();
  const { account } = props.accountDetail;
  const hasManager = account.role.code === 'M';
  const today = new Date();
  const startMinDate = new Date(today.getFullYear(), 0, 1);
  const startMaxDate = end ? end : period.end.toDate2();
  const endMinDate = start ? start : today;
  const [selectedImageId, setSelectedImageId] = React.useState(
    _.get(image, 'id', image)
  );
  const selectedImage = customImage
    ? { path: customImage }
    : images.find((x) => x.id === selectedImageId);

  const [selectedImagePath, setSelectedImagePath] = React.useState(
    selectedImage ? selectedImage.path : null
  );

  function handleImageChange(id) {
    if (id instanceof Blob) {
      var reader = new FileReader();
      reader.onloadend = function (e) {
        setSelectedImagePath(reader.result);
      }.bind(this);
      reader.readAsDataURL(id);
    } else {
      setSelectedImageId(Number(id));
      setSelectedImagePath(images.find((x) => x.id === Number(id)).path);
    }
  }

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <DefaultTitle isContrast>
            {intl.formatMessage({ id: 'challenge.form.info_area' })}
          </DefaultTitle>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <div>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        lowercase
                        fullWidth
                        initial={name}
                        label={intl.formatMessage({
                          id: 'challenge.form.info_name_label',
                        })}
                        name='name'
                        required
                        validationErrors={{
                          isDefaultRequiredValue: intl.formatMessage({
                            id: 'common.form.required_error',
                          }),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <RichTextField
                        fullWidth
                        initial={JSON.parse(description)}
                        label={intl.formatMessage({
                          id: 'challenge.form.info_description_label',
                        })}
                        name='description'
                        required
                        validationErrors={{
                          isDefaultRequiredValue: intl.formatMessage({
                            id: 'common.form.required_error',
                          }),
                        }}
                        allowTypeform
                      />
                    </Grid>
                  </Grid>
                </div>
              </Grid>
              <Grid item xs={4}>
                {!selectedImagePath && (
                  <Grid
                    alignItems={'center'}
                    container
                    justify={'center'}
                    style={{ height: '100%' }}
                  >
                    <Grid item>
                      <InfoText align={'center'}>
                        {intl.formatMessage({
                          id: 'challenge.form.info_no_image_text',
                        })}
                      </InfoText>
                    </Grid>
                  </Grid>
                )}
                {selectedImagePath && (
                  <div style={{ minHeight: 210, height: '100%' }}>
                    <CardMedia
                      className={classes.image}
                      image={selectedImagePath}
                    />
                  </div>
                )}
              </Grid>
              <Grid item xs={3}>
                <DatePicker
                  clearable
                  format='dd/MM/yyyy'
                  fullWidth
                  initial={start}
                  label={intl.formatMessage({
                    id: 'challenge.form.info_start_label',
                  })}
                  maxDate={startMaxDate}
                  minDate={startMinDate}
                  name='start'
                  required
                  validationErrors={{
                    isDefaultRequiredValue: intl.formatMessage({
                      id: 'common.form.required_error',
                    }),
                  }}
                  onChange={onStartChange}
                />
              </Grid>
              <Grid item xs={3}>
                <DatePicker
                  clearable
                  format='dd/MM/yyyy'
                  fullWidth
                  initial={end}
                  label={intl.formatMessage({
                    id: 'challenge.form.info_end_label',
                  })}
                  maxDate={period.end.toDate2()}
                  minDate={endMinDate}
                  name='end'
                  required
                  validationErrors={{
                    isDefaultRequiredValue: intl.formatMessage({
                      id: 'common.form.required_error',
                    }),
                  }}
                  onChange={onEndChange}
                />
              </Grid>
              <Grid item xs={6}>
                <Select
                  disabled={isUpdate}
                  fullWidth
                  initial={type}
                  label={intl.formatMessage({
                    id: 'challenge.form.info_type_label',
                  })}
                  name='type'
                  options={types}
                  optionTextName='name'
                  optionValueName='id'
                  required
                  validationErrors={{
                    isDefaultRequiredValue: intl.formatMessage({
                      id: 'common.form.required_error',
                    }),
                  }}
                  onChange={onTypeChange}
                />
              </Grid>
              <Grid item xs={6}>
                <Select
                  fullWidth
                  disabled
                  initial={awardType}
                  label={intl.formatMessage({
                    id: 'challenge.form.info_award_type_label',
                  })}
                  name='awardType'
                  options={awardTypes}
                  optionTextName='name'
                  optionValueName='id'
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <ImageInput
                  images={images}
                  initial={selectedImageId || customImage}
                  label={intl.formatMessage({
                    id: 'challenge.form.info_image_label',
                  })}
                  name={'image'}
                  required
                  onChange={handleImageChange}
                />
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = ({ accountDetail }) => ({
  accountDetail,
});

export default connect(mapStateToProps)(Infos);
