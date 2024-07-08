import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Formsy from 'formsy-react';
import { Grid } from '@material-ui/core';
import { RewardCategoryIconInput } from '../../components';
import {
  AppBarSubTitle,
  Card,
  Loader,
  MainLayoutComponent,
  ProgressButton,
  TextField,
} from '../../../../components';
import { useIntl, injectIntl } from 'react-intl';
import * as Resources from '../../../../Resources';
import * as rewardCategoryCreationActions from '../../../../services/RewardCategories/RewardCategoryCreation/actions';
import * as rewardCategoryIconListActions from '../../../../services/RewardCategoryIcons/RewardCategoryIconList/actions';
import { toast } from 'react-toastify';

class AdminRewardCategoryCreation extends MainLayoutComponent {
  componentDidMount() {
    const { intl } = this.props;
    this.props.handleTitle(intl.formatMessage({ id: 'admin.title' }));
    this.props.handleSubHeader(
      <AppBarSubTitle
        title={intl.formatMessage({
          id: 'admin.reward_category.creation.subtitle',
        })}
      />,
    );
    this.props.handleMaxWidth('sm');
    this.props.activateReturn();
    this.props.rewardCategoryCreationActions.clearRewardCategoryCreation();
    this.props.rewardCategoryIconListActions.getUsableRewardCategoryIconList();
  }

  renderLoader() {
    return <Loader centered />;
  }

  onSubmit(model) {
    const category = { name: model.name, icon: model.icon };
    this.props.rewardCategoryCreationActions.createRewardCategory(category);
  }

  renderForm() {
    const { intl } = this.props;
    const { icons } = this.props.rewardCategoryIconList;
    const { loading } = this.props.rewardCategoryCreation;

    return (
      <Formsy onValidSubmit={this.onSubmit.bind(this)}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Card>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    name="name"
                    label={intl.formatMessage({
                      id: 'admin.reward_category.list.name_column',
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
                  <RewardCategoryIconInput
                    name="icon"
                    label={intl.formatMessage({
                      id: 'admin.reward_category.list.icon_column',
                    })}
                    icons={icons}
                    required
                    validationErrors={{
                      isDefaultRequiredValue: intl.formatMessage({
                        id: 'common.form.required_error',
                      }),
                    }}
                  />
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <ProgressButton
              type="submit"
              text={intl.formatMessage({ id: 'common.submit' })}
              centered
              loading={loading}
            />
          </Grid>
        </Grid>
      </Formsy>
    );
  }

  render() {
    const { intl } = this.props;
    const { icons, loading } = this.props.rewardCategoryIconList;
    const { success } = this.props.rewardCategoryCreation;

    if (success) {
      this.props.rewardCategoryCreationActions.clearRewardCategoryCreation();
      toast.success(
        intl.formatMessage({ id: 'common.create_success_message' }),
      );
      this.props.history.goBack();
    }

    return (
      <div>
        {loading && this.renderLoader()}
        {!loading && icons && this.renderForm()}
      </div>
    );
  }
}

const mapStateToProps = ({
  rewardCategoryCreation,
  rewardCategoryIconList,
}) => ({
  rewardCategoryCreation,
  rewardCategoryIconList,
});

const mapDispatchToProps = (dispatch) => ({
  rewardCategoryCreationActions: bindActionCreators(
    rewardCategoryCreationActions,
    dispatch,
  ),
  rewardCategoryIconListActions: bindActionCreators(
    rewardCategoryIconListActions,
    dispatch,
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(AdminRewardCategoryCreation));
