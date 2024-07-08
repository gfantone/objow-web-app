import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Formsy from 'formsy-react';
import { CardMedia, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { ImageInput } from '../../components';
import {
  AppBarSubTitle,
  Card,
  DefaultTitle,
  InfoText,
  Loader,
  MainLayoutComponent,
  ProgressButton,
  Select,
  TextField,
  RichTextField,
} from '../../../../components';
import { injectIntl } from 'react-intl';
import * as Resources from '../../../../Resources';
import * as rewardCategoryListActions from '../../../../services/RewardCategories/RewardCategoryList/actions';
import * as rewardCreationActions from '../../../../services/Rewards/RewardCreation/actions';
import * as rewardImageListActions from '../../../../services/RewardImages/RewardImageList/actions';
import * as rewardTypeListActions from '../../../../services/RewardTypes/RewardTypeList/actions';
import { toast } from 'react-toastify';

const styles = {
  image: {
    height: '100%',
    width: '100%',
  },
};

class RewardCreation extends MainLayoutComponent {
  state = { image: null };

  componentDidMount() {
    const { intl } = this.props;
    this.props.handleTitle(intl.formatMessage({ id: 'reward.title' }));
    this.props.handleSubHeader(
      <AppBarSubTitle
        title={intl.formatMessage({ id: 'reward.creation.subtitle' })}
      />
    );
    this.props.handleMaxWidth('md');
    this.props.activateReturn();
    this.props.rewardCategoryListActions.getActiveRewardCategoryList();
    this.props.rewardImageListActions.getRewardImageList();
    this.props.rewardTypeListActions.getRewardTypeList();
    this.props.rewardCreationActions.clearRewardCreation();
  }

  renderLoader() {
    return <Loader centered />;
  }

  setImage(image) {
    this.setState({
      ...this.state,
      image: image,
    });
  }

  handleImageChange(image) {
    if (image instanceof Blob) {
      var reader = new FileReader();
      reader.onloadend = function (e) {
        this.setImage(reader.result);
      }.bind(this);
      reader.readAsDataURL(image);
    } else {
      const { images } = this.props.rewardImageList;
      const selectedImage = images.find((x) => x.id === image);
      const path = selectedImage ? selectedImage.path : null;
      this.setImage(path);
    }
  }

  handleSubmit(model) {
    const data = new FormData();
    data.append('name', model.name);
    data.append('description', JSON.stringify(model.description));
    data.append('category', model.category);
    data.append('type', model.type);
    data.append('value', model.value);
    data.append('points', model.points);
    if (Number.isInteger(model.image)) {
      data.append('image', model.image);
    } else {
      data.append('customImage', model.image, model.image.name);
    }
    data.append('deliveryPlace', model.deliveryPlace);
    data.append('deliveryMode', model.deliveryMode);
    if (model.deliveryTime) data.append('deliveryTime', model.deliveryTime);
    data.append('isActive', true);
    this.props.rewardCreationActions.createReward(data);
  }

  renderForm() {
    const { intl } = this.props;
    const { classes } = this.props;
    const { categories } = this.props.rewardCategoryList;
    const { images } = this.props.rewardImageList;
    const { types } = this.props.rewardTypeList;
    const { loading } = this.props.rewardCreation;

    return (
      <div>
        <Formsy onValidSubmit={this.handleSubmit.bind(this)}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <DefaultTitle isContrast>
                    {intl.formatMessage({ id: 'reward.form.infos_area' })}
                  </DefaultTitle>
                </Grid>
                <Grid item xs={12}>
                  <Card>
                    <Grid container spacing={2}>
                      <Grid item xs={8}>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <TextField
                              lowercase
                              name='name'
                              label={intl.formatMessage({
                                id: 'reward.form.name_label',
                              })}
                              fullWidth
                              required
                              validations='maxLength:128'
                              validationErrors={{
                                isDefaultRequiredValue: intl.formatMessage({
                                  id: 'common.form.required_error',
                                }),
                                maxLength: intl.formatMessage({
                                  id: 'common.form.max_length_128_error',
                                }),
                              }}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <RichTextField
                              name='description'
                              label={intl.formatMessage({
                                id: 'reward.form.description_label',
                              })}
                              multiline
                              fullWidth
                              required
                              validationErrors={{
                                isDefaultRequiredValue: intl.formatMessage({
                                  id: 'common.form.required_error',
                                }),
                              }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={4}>
                        {!this.state.image && (
                          <Grid
                            container
                            justify={'center'}
                            alignItems={'center'}
                            style={{ height: '100%' }}
                          >
                            <Grid item>
                              <InfoText align={'center'}>
                                {intl.formatMessage({
                                  id: 'reward.form.empty_image_text',
                                })}
                              </InfoText>
                            </Grid>
                          </Grid>
                        )}
                        {this.state.image && (
                          <CardMedia
                            image={this.state.image}
                            className={classes.image}
                          />
                        )}
                      </Grid>
                      <Grid item xs={6}>
                        <Select
                          name='category'
                          label={intl.formatMessage({
                            id: 'reward.form.category_label',
                          })}
                          options={categories}
                          optionValueName={'id'}
                          optionTextName={'name'}
                          fullWidth
                          required
                          validationErrors={{
                            isDefaultRequiredValue: intl.formatMessage({
                              id: 'common.form.required_error',
                            }),
                          }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Select
                          name='type'
                          label={intl.formatMessage({
                            id: 'reward.form.type_label',
                          })}
                          options={types}
                          optionValueName={'id'}
                          optionTextName={'name'}
                          fullWidth
                          required
                          validationErrors={{
                            isDefaultRequiredValue: intl.formatMessage({
                              id: 'common.form.required_error',
                            }),
                          }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          lowercase
                          type='number'
                          name='value'
                          label={intl.formatMessage({
                            id: 'reward.form.value_label',
                          })}
                          endAdornment={intl.formatMessage({
                            id: 'reward.form.value_suffix_label',
                          })}
                          fullWidth
                          required
                          validations='isInt'
                          validationErrors={{
                            isDefaultRequiredValue: intl.formatMessage({
                              id: 'common.form.required_error',
                            }),
                            isInt: intl.formatMessage({
                              id: 'common.form.is_int_error',
                            }),
                          }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          lowercase
                          type='number'
                          name='points'
                          label={intl.formatMessage({
                            id: 'reward.form.points_label',
                          })}
                          fullWidth
                          required
                          validations='isInt'
                          validationErrors={{
                            isDefaultRequiredValue: intl.formatMessage({
                              id: 'common.form.required_error',
                            }),
                            isInt: intl.formatMessage({
                              id: 'common.form.is_int_error',
                            }),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <ImageInput
                          name='image'
                          label={intl.formatMessage({
                            id: 'reward.form.image_label',
                          })}
                          images={images}
                          onChange={this.handleImageChange.bind(this)}
                          required
                        />
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <DefaultTitle isContrast>
                    {intl.formatMessage({ id: 'reward.form.delivery_area' })}
                  </DefaultTitle>
                </Grid>
                <Grid item xs={12}>
                  <Card>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          lowercase
                          name='deliveryPlace'
                          label={intl.formatMessage({
                            id: 'reward.form.delivery_place_label',
                          })}
                          fullWidth
                          required
                          validations='maxLength:128'
                          validationErrors={{
                            isDefaultRequiredValue: intl.formatMessage({
                              id: 'common.form.required_error',
                            }),
                            maxLength: intl.formatMessage({
                              id: 'common.form.max_length_128_error',
                            }),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          lowercase
                          name='deliveryMode'
                          label={intl.formatMessage({
                            id: 'reward.form.delivery_mode_label',
                          })}
                          fullWidth
                          required
                          validations='maxLength:128'
                          validationErrors={{
                            isDefaultRequiredValue: intl.formatMessage({
                              id: 'common.form.required_error',
                            }),
                            maxLength: intl.formatMessage({
                              id: 'common.form.max_length_128_error',
                            }),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          lowercase
                          name='deliveryTime'
                          label={intl.formatMessage({
                            id: 'reward.form.delivery_time_label',
                          })}
                          fullWidth
                          validations='maxLength:128'
                          validationErrors={{
                            maxLength: intl.formatMessage({
                              id: 'common.form.max_length_128_error',
                            }),
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <ProgressButton
                text={intl.formatMessage({ id: 'common.submit' })}
                loading={loading}
                centered
              />
            </Grid>
          </Grid>
        </Formsy>
      </div>
    );
  }

  render() {
    const { categories, loading: rewardCategoryListLoading } =
      this.props.rewardCategoryList;
    const { images, loading: rewardImageListLoading } =
      this.props.rewardImageList;
    const { types, loading: rewardTypeListLoading } = this.props.rewardTypeList;
    const { success, error } = this.props.rewardCreation;
    const { intl } = this.props;
    const loading =
      rewardCategoryListLoading ||
      rewardImageListLoading ||
      rewardTypeListLoading;

    if (success) {
      this.props.rewardCreationActions.clearRewardCreation();
      this.props.history.goBack();
      toast.success(intl.formatMessage({ id: 'reward.creation.success' }));
    }
    if (error) {
      toast.error(intl.formatMessage({ id: 'reward.creation.error' }));
    }

    return (
      <div>
        {loading && this.renderLoader()}
        {!loading && categories && images && types && this.renderForm()}
      </div>
    );
  }
}

const mapStateToProps = ({
  rewardCategoryList,
  rewardCreation,
  rewardImageList,
  rewardTypeList,
}) => ({
  rewardCategoryList,
  rewardCreation,
  rewardImageList,
  rewardTypeList,
});

const mapDispatchToProps = (dispatch) => ({
  rewardCategoryListActions: bindActionCreators(
    rewardCategoryListActions,
    dispatch
  ),
  rewardCreationActions: bindActionCreators(rewardCreationActions, dispatch),
  rewardImageListActions: bindActionCreators(rewardImageListActions, dispatch),
  rewardTypeListActions: bindActionCreators(rewardTypeListActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(injectIntl(RewardCreation)));
