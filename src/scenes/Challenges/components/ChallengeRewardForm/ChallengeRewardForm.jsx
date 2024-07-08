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
  HiddenInput,
} from '../../../../components';
import * as Resources from '../../../../Resources';
import { injectIntl } from 'react-intl';
import * as rewardCategoryListActions from '../../../../services/RewardCategories/RewardCategoryList/actions';
import * as rewardImageListActions from '../../../../services/RewardImages/RewardImageList/actions';
import * as rewardTypeListActions from '../../../../services/RewardTypes/RewardTypeList/actions';
import _ from 'lodash';

const styles = {
  image: {
    height: '100%',
    width: '100%',
  },
};

class ChallengeRewardForm extends React.Component {
  state = { image: null };

  componentDidMount() {
    this.props.rewardCategoryListActions.getActiveRewardCategoryList();
    this.props.rewardImageListActions.getRewardImageList();
    this.props.rewardTypeListActions.getRewardTypeList();
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

  renderForm() {
    const { intl } = this.props;
    const { classes } = this.props;
    const { categories } = this.props.rewardCategoryList;
    const { images } = this.props.rewardImageList;
    const { types } = this.props.rewardTypeList;
    const { reward } = this.props;
    let image;

    if (_.get(reward, 'image.path')) {
      image = _.get(reward, 'image.path');
    } else if (_.get(reward, 'image')) {
      const selectedImage = images.find(
        (x) => x.id === parseInt(_.get(reward, 'image')),
      );
      const path = selectedImage ? selectedImage.path : null;
      image = path;
    }
    image = this.state.image ? this.state.image : image;
    const imageId = _.get(reward, 'image.id', _.get(reward, 'image'));
    return (
      <div>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <DefaultTitle>
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
                            lowercase
                            name="name"
                            initial={_.get(reward, 'name')}
                            label={intl.formatMessage({
                              id: 'reward.form.name_label',
                            })}
                            fullWidth
                            required
                            validations="maxLength:128"
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
                            name="description"
                            label={intl.formatMessage({
                              id: 'reward.form.description_label',
                            })}
                            initial={
                              _.isString(_.get(reward, 'description'))
                                ? JSON.parse(_.get(reward, 'description'))
                                : _.get(reward, 'description')
                            }
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
                      {!image && (
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
                      {image && (
                        <CardMedia image={image} className={classes.image} />
                      )}
                    </Grid>
                    <Grid item xs={6}>
                      <Select
                        name="category"
                        initial={_.get(
                          reward,
                          'category.id',
                          _.get(reward, 'category'),
                        )}
                        label={intl.formatMessage({
                          id: 'reward.form.category_label',
                        })}
                        options={categories}
                        optionValueName={'id'}
                        optionTextName={'name'}
                        fullWidth
                        validationErrors={{
                          isDefaultRequiredValue: intl.formatMessage({
                            id: 'common.form.required_error',
                          }),
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Select
                        name="type"
                        disabled
                        initial={_.get(reward, 'type')}
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
                      <HiddenInput name="type" value={_.get(reward, 'type')} />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        lowercase
                        type="number"
                        name="value"
                        initial={_.get(reward, 'value')}
                        label={intl.formatMessage({
                          id: 'reward.form.value_label',
                        })}
                        endAdornment={intl.formatMessage({
                          id: 'reward.form.value_suffix_label',
                        })}
                        fullWidth
                        required
                        validations="isInt"
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
                        name="image"
                        initial={imageId}
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
                <DefaultTitle>
                  {intl.formatMessage({ id: 'reward.form.delivery_area' })}
                </DefaultTitle>
              </Grid>
              <Grid item xs={12}>
                <Card>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        lowercase
                        name="deliveryPlace"
                        initial={_.get(reward, 'deliveryPlace')}
                        label={intl.formatMessage({
                          id: 'reward.form.delivery_place_label',
                        })}
                        fullWidth
                        validations="maxLength:128"
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
                        name="deliveryMode"
                        initial={_.get(reward, 'deliveryMode')}
                        label={intl.formatMessage({
                          id: 'reward.form.delivery_mode_label',
                        })}
                        fullWidth
                        validations="maxLength:128"
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
                        name="deliveryTime"
                        initial={_.get(reward, 'deliveryTime')}
                        label={intl.formatMessage({
                          id: 'reward.form.delivery_time_label',
                        })}
                        fullWidth
                        validations="maxLength:128"
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
        </Grid>
      </div>
    );
  }

  render() {
    const { categories, loading: rewardCategoryListLoading } =
      this.props.rewardCategoryList;
    const { images, loading: rewardImageListLoading } =
      this.props.rewardImageList;
    const { types, loading: rewardTypeListLoading } = this.props.rewardTypeList;
    const loading =
      rewardCategoryListLoading ||
      rewardImageListLoading ||
      rewardTypeListLoading;

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
  rewardImageList,
  rewardTypeList,
}) => ({
  rewardCategoryList,

  rewardImageList,
  rewardTypeList,
});

const mapDispatchToProps = (dispatch) => ({
  rewardCategoryListActions: bindActionCreators(
    rewardCategoryListActions,
    dispatch,
  ),
  rewardImageListActions: bindActionCreators(rewardImageListActions, dispatch),
  rewardTypeListActions: bindActionCreators(rewardTypeListActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(injectIntl(ChallengeRewardForm)));
