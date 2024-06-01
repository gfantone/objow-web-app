import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Formsy from 'formsy-react';
import { Grid } from '@material-ui/core';
import { CategoryIconInput } from '../../components';
import { injectIntl } from 'react-intl';
import {
  AppBarSubTitle,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Loader,
  ProgressButton,
  TextField,
} from '../../../../components';
import * as categoryDetailActions from '../../../../services/Categories/CategoryDetail/actions';
import * as categoryUpdateActions from '../../../../services/Categories/CategoryUpdate/actions';
import * as categoryActivationUpdateActions from '../../../../services/Categories/CategoryActivationUpdate/actions';
import * as categoryIconListActions from '../../../../services/CategoryIcons/CategoryIconList/actions';
import { toast } from 'react-toastify';

class AdminCategoryUpdate extends Component {
  state = { open: false };

  componentDidMount() {
    const { intl } = this.props;
    const id = this.props.match.params.id;
    this.props.handleTitle(intl.formatMessage({ id: 'admin.title' }));
    this.props.handleSubHeader(
      <AppBarSubTitle
        title={intl.formatMessage({ id: 'admin.categories.update.title' })}
      />,
    );
    this.props.handleMaxWidth('sm');
    this.props.activateReturn();
    this.props.categoryUpdateActions.clearCategoryUpdate();
    this.props.categoryDetailActions.getCategoryDetail(id);
    this.props.categoryIconListActions.getUsableListForCategory(id);
  }

  renderLoader() {
    return <Loader centered />;
  }

  setOpen(open) {
    const { loading } = this.props.categoryActivationUpdate;
    if (!loading) {
      this.setState({
        ...this.state,
        open: open,
      });
    }
  }

  onArchive() {
    this.props.categoryActivationUpdateActions.updateCategoryActivation(
      this.props.match.params.id,
      false,
    );
  }

  onSubmit(model) {
    const category = {
      id: this.props.match.params.id,
      name: model.name,
      icon: model.icon,
    };
    this.props.categoryUpdateActions.updateCategory(category);
  }

  renderForm() {
    const { intl } = this.props;
    const { category } = this.props.categoryDetail;
    const { icons } = this.props.categoryIconList;
    const { loading: updateLoading } = this.props.categoryUpdate;
    const { loading: archiveLoading } = this.props.categoryActivationUpdate;

    return (
      <div>
        <Formsy onValidSubmit={this.onSubmit.bind(this)}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Card>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      name="name"
                      label={intl.formatMessage({
                        id: 'admin.categories.columns.name',
                      })}
                      initial={category.name}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CategoryIconInput
                      name="icon"
                      label={intl.formatMessage({
                        id: 'admin.categories.columns.icon',
                      })}
                      icons={icons}
                      initial={category.icon.id}
                      required
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
                      text={intl.formatMessage({ id: 'common.archive' })}
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
                    loading={updateLoading}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Formsy>
        {category.isActive && (
          <Dialog open={this.state.open} onClose={() => this.setOpen(false)}>
            <DialogTitle>
              {intl
                .formatMessage({ id: 'admin.categories.archive_confirm' })
                .format(category.name)}
            </DialogTitle>
            <DialogContent>
              {intl.formatMessage({ id: 'admin.categories.archive_confirm2' })}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => this.setOpen(false)} color="secondary">
                {intl.formatMessage({ id: 'common.no' })}
              </Button>
              <ProgressButton
                type="button"
                text={intl.formatMessage({ id: 'common.yes' })}
                loading={archiveLoading}
                onClick={this.onArchive.bind(this)}
              />
            </DialogActions>
          </Dialog>
        )}
      </div>
    );
  }

  render() {
    const { intl } = this.props;
    const { category, loading: categoryDetailLoading } =
      this.props.categoryDetail;
    const { icons, loading: categoryIconListLoading } =
      this.props.categoryIconList;
    const loading = categoryDetailLoading || categoryIconListLoading;
    const { success: categoryUpdateSuccess, error: categoryUpdateError } =
      this.props.categoryUpdate;
    const {
      success: categoryActivationUpdateSuccess,
      error: categoryActivationUpdateError,
    } = this.props.categoryActivationUpdate;
    const success = categoryUpdateSuccess || categoryActivationUpdateSuccess;
    const error = categoryUpdateError || categoryActivationUpdateError;

    if (success) {
      this.props.categoryUpdateActions.clearCategoryUpdate();
      this.props.categoryActivationUpdateActions.clearCategoryActivationUpdate();
      this.props.history.goBack();
      toast.success(
        intl.formatMessage({ id: 'admin.categories.update.success' }),
      );
    }

    if (error) {
      toast.success(
        intl.formatMessage({ id: 'admin.categories.update.error' }),
      );
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
  categoryDetail,
  categoryUpdate,
  categoryActivationUpdate,
  categoryIconList,
}) => ({
  categoryDetail,
  categoryUpdate,
  categoryActivationUpdate,
  categoryIconList,
});

const mapDispatchToProps = (dispatch) => ({
  categoryDetailActions: bindActionCreators(categoryDetailActions, dispatch),
  categoryUpdateActions: bindActionCreators(categoryUpdateActions, dispatch),
  categoryActivationUpdateActions: bindActionCreators(
    categoryActivationUpdateActions,
    dispatch,
  ),
  categoryIconListActions: bindActionCreators(
    categoryIconListActions,
    dispatch,
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(AdminCategoryUpdate));
