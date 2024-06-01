import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Formsy from 'formsy-react';
import { CardMedia, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { ImageInput } from '../../components';
import {
  AppBarSubTitle,
  Card,
  DefaultTitle,
  IconButton,
  InfoText,
  Loader,
  MainLayoutComponent,
  ProgressButton,
  Select,
  TextField,
  RichTextField,
} from '../../../../components';
import * as Resources from '../../../../Resources';
import { injectIntl } from 'react-intl';
import * as rewardCategoryListActions from '../../../../services/RewardCategories/RewardCategoryList/actions';
import * as rewardDetailActions from '../../../../services/Rewards/RewardDetail/actions';
import * as rewardImageListActions from '../../../../services/RewardImages/RewardImageList/actions';
import * as rewardTypeListActions from '../../../../services/RewardTypes/RewardTypeList/actions';
import * as rewardUpdateActions from '../../../../services/Rewards/RewardUpdate/actions';
import { toast } from 'react-toastify';

const styles = {
  image: {
    height: '100%',
    width: '100%',
  },
};

class RewardUpdate extends MainLayoutComponent {
  state = { image: null };

  handleDisable() {
    this.props.rewardUpdateActions.updateRewardActivation(
      this.props.match.params.id,
      false
    );
  }

  componentDidMount() {
    const { intl } = this.props;
    this.initialized = false;
    this.props.handleTitle(intl.formatMessage({ id: 'reward.title' }));
    this.props.handleSubHeader(
      <AppBarSubTitle title={intl.formatMessage({ id: 'reward.edit.title' })} />
    );
    this.props.handleButtons(
      <IconButton size='small' onClick={this.handleDisable.bind(this)}>
        <FontAwesomeIcon icon={faTrashAlt} />
      </IconButton>
    );
    this.props.handleMaxWidth('md');
    this.props.activateReturn();
    this.props.rewardCategoryListActions.getActiveRewardCategoryList();
    this.props.rewardDetailActions.getReward(this.props.match.params.id);
    this.props.rewardImageListActions.getRewardImageList();
    this.props.rewardTypeListActions.getRewardTypeList();
    this.props.rewardUpdateActions.clearRewardUpdate();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { reward } = this.props.rewardDetail;
    if (!this.initialized && reward) {
      this.initialized = true;
      this.setState({
        ...this.state,
        image: reward.image ? reward.image.path : reward.customImage,
      });
    }
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
    }
    if (model.image instanceof Blob) {
      data.append('customImage', model.image, model.image.name);
    }
    data.append('deliveryPlace', model.deliveryPlace);
    data.append('deliveryMode', model.deliveryMode);
    if (model.deliveryTime) data.append('deliveryTime', model.deliveryTime);
    data.append('isActive', true);
    this.props.rewardUpdateActions.updateReward(
      this.props.match.params.id,
      data
    );
  }

  renderForm() {
    const { intl } = this.props;
    const { classes } = this.props;
    const { categories } = this.props.rewardCategoryList;
    const { reward } = this.props.rewardDetail;
    const { images } = this.props.rewardImageList;
    const { types } = this.props.rewardTypeList;
    const { loading } = this.props.rewardUpdate;

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
                              initial={reward.name}
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
                              initial={JSON.parse(reward.description)}
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
                          initial={reward.category.id}
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
                          initial={reward.type.id}
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
                          initial={reward.value}
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
                          initial={reward.points}
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
                          initial={
                            reward.image ? reward.image.id : reward.customImage
                          }
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
                          initial={reward.deliveryPlace}
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
                          initial={reward.deliveryMode}
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
                          initial={reward.deliveryTime}
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
    const { intl } = this.props;
    const { categories, loading: rewardCategoryListLoading } =
      this.props.rewardCategoryList;
    const { reward, loading: rewardDetailLoading } = this.props.rewardDetail;
    const { images, loading: rewardImageListLoading } =
      this.props.rewardImageList;
    const { types, loading: rewardTypeListLoading } = this.props.rewardTypeList;
    const { success, error } = this.props.rewardUpdate;
    const loading =
      rewardCategoryListLoading ||
      rewardDetailLoading ||
      rewardImageListLoading ||
      rewardTypeListLoading;

    if (!loading && reward && !reward.isActive) {
      this.props.history.push('/');
    }

    if (success) {
      this.props.rewardUpdateActions.clearRewardUpdate();
      this.props.history.goBack();
      toast.success(
        intl.formatMessage({ id: 'common.update_success_message' })
      );
    }
    if (error) {
      toast.error(intl.formatMessage({ id: 'common.update_error_message' }));
    }

    return (
      <div>
        {loading && this.renderLoader()}
        {!loading &&
          categories &&
          reward &&
          images &&
          types &&
          this.renderForm()}
      </div>
    );
  }
}

const mapStateToProps = ({
  rewardCategoryList,
  rewardDetail,
  rewardImageList,
  rewardTypeList,
  rewardUpdate,
}) => ({
  rewardCategoryList,
  rewardDetail,
  rewardImageList,
  rewardTypeList,
  rewardUpdate,
});

const mapDispatchToProps = (dispatch) => ({
  rewardCategoryListActions: bindActionCreators(
    rewardCategoryListActions,
    dispatch
  ),
  rewardDetailActions: bindActionCreators(rewardDetailActions, dispatch),
  rewardImageListActions: bindActionCreators(rewardImageListActions, dispatch),
  rewardTypeListActions: bindActionCreators(rewardTypeListActions, dispatch),
  rewardUpdateActions: bindActionCreators(rewardUpdateActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(injectIntl(RewardUpdate)));
