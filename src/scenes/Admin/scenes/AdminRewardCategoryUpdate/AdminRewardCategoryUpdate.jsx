import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Formsy from 'formsy-react';
import { Grid } from '@material-ui/core';
import { RewardCategoryIconInput } from '../../components';
import {
  AppBarSubTitle,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Loader,
  MainLayoutComponent,
  ProgressButton,
  TextField,
} from '../../../../components';
import { useIntl, injectIntl } from 'react-intl';
import * as Resources from '../../../../Resources';
import * as rewardCategoryActions from '../../../../services/RewardCategories/RewardCategory/actions';
import * as rewardCategoryIconListActions from '../../../../services/RewardCategoryIcons/RewardCategoryIconList/actions';
import * as rewardCategoryUpdateActions from '../../../../services/RewardCategories/RewardCategoryUpdate/actions';
import { toast } from 'react-toastify';

class AdminRewardCategoryUpdate extends MainLayoutComponent {
  state = { open: false };

  componentDidMount() {
    const { intl } = this.props;
    this.isUpdate = true;
    const id = this.props.match.params.id;
    this.props.handleTitle(intl.formatMessage({ id: 'admin.title' }));
    this.props.handleSubHeader(
      <AppBarSubTitle
        title={intl.formatMessage({
          id: 'admin.reward_category.update.subtitle',
        })}
      />,
    );
    this.props.handleMaxWidth('sm');
    this.props.activateReturn();
    this.props.rewardCategoryActions.getRewardCategory(id);
    this.props.rewardCategoryIconListActions.getUsableRewardCategoryIconListForRewardCategory(
      id,
    );
  }

  renderLoader() {
    return <Loader centered />;
  }

  handleArchive() {
    this.isUpdate = false;
    this.props.rewardCategoryUpdateActions.updateRewardCategoryActivation(
      this.props.match.params.id,
      false,
    );
  }

  handleSubmit(model) {
    const category = {
      id: this.props.match.params.id,
      name: model.name,
      icon: model.icon,
    };
    this.props.rewardCategoryUpdateActions.updateRewardCategory(category);
  }

  setOpen(open) {
    const { loading } = this.props.rewardCategoryUpdate;
    if (!loading) {
      this.setState({
        ...this.state,
        open: open,
      });
    }
  }

  renderForm() {
    const { intl } = this.props;
    const { category } = this.props.rewardCategory;
    const { icons } = this.props.rewardCategoryIconList;
    const { loading } = this.props.rewardCategoryUpdate;

    return (
      <div>
        <Formsy onValidSubmit={this.handleSubmit.bind(this)}>
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
                      initial={category.name}
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
                      initial={category.icon ? category.icon.id : null}
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
              <Grid
                container
                justify={category.isActive ? 'space-between' : 'center'}
              >
                {category.isActive && (
                  <Grid item>
                    <ProgressButton
                      type="button"
                      text="Archiver"
                      color="secondary"
                      centered
                      onClick={() => this.setOpen(true)}
                    />
                  </Grid>
                )}
                <Grid item>
                  <ProgressButton
                    type="submit"
                    text={intl.formatMessage({ id: 'common.submit' })}
                    centered
                    loading={this.isUpdate && loading}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Formsy>
        {category.isActive && (
          <Dialog open={this.state.open} onClose={() => this.setOpen(false)}>
            <DialogTitle>
              Êtes-vous sûr de vouloir archiver la catégorie de récompenses «{' '}
              {category.name} » ?
            </DialogTitle>
            <DialogContent>
              Après l’archivage de cette catégorie de récompenses, il ne sera
              plus possible de la réactiver.
            </DialogContent>
            <DialogActions>
              <Button onClick={() => this.setOpen(false)} color="secondary">
                {intl.formatMessage({ id: 'common.no' })}
              </Button>
              <ProgressButton
                type="button"
                text={intl.formatMessage({ id: 'common.yes' })}
                loading={loading}
                onClick={this.handleArchive.bind(this)}
              />
            </DialogActions>
          </Dialog>
        )}
      </div>
    );
  }

  render() {
    const { intl } = this.props;
    const { category, loading: rewardCategoryLoading } =
      this.props.rewardCategory;
    const { icons, loading: rewardCategoryIconListLoading } =
      this.props.rewardCategoryIconList;
    const { success } = this.props.rewardCategoryUpdate;
    const loading = rewardCategoryLoading || rewardCategoryIconListLoading;

    if (success) {
      this.props.rewardCategoryUpdateActions.clearRewardCategoryUpdate();
      toast.success(
        intl.formatMessage({ id: 'common.update_success_message' }),
      );
      this.props.history.goBack();
    }

    return (
      <div>
        {loading && this.renderLoader()}
        {!loading && category && icons && this.renderForm()}
      </div>
    );
  }
}

const mapStateToProps = ({
  rewardCategory,
  rewardCategoryIconList,
  rewardCategoryUpdate,
}) => ({
  rewardCategory,
  rewardCategoryIconList,
  rewardCategoryUpdate,
});

const mapDispatchToProps = (dispatch) => ({
  rewardCategoryActions: bindActionCreators(rewardCategoryActions, dispatch),
  rewardCategoryIconListActions: bindActionCreators(
    rewardCategoryIconListActions,
    dispatch,
  ),
  rewardCategoryUpdateActions: bindActionCreators(
    rewardCategoryUpdateActions,
    dispatch,
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(AdminRewardCategoryUpdate));
