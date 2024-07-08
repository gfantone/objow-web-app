import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Formsy from 'formsy-react';
import { Grid } from '@material-ui/core';
import { injectIntl } from 'react-intl';
import { CategoryIconInput } from '../../components';
import {
  AppBarSubTitle,
  Card,
  Loader,
  ProgressButton,
  TextField,
} from '../../../../components';
import * as categoryCreationActions from '../../../../services/Categories/CategoryCreation/actions';
import * as categoryIconListActions from '../../../../services/CategoryIcons/CategoryIconList/actions';
import { toast } from 'react-toastify';

class AdminCategoryCreation extends Component {
  componentDidMount() {
    const { intl } = this.props;
    this.props.handleTitle(intl.formatMessage({ id: 'admin.title' }));
    this.props.handleSubHeader(
      <AppBarSubTitle
        title={intl.formatMessage({ id: 'admin.categories.creation.title' })}
      />,
    );
    this.props.handleMaxWidth('sm');
    this.props.activateReturn();
    this.props.categoryCreationActions.clearCategoryCreation();
    this.props.categoryIconListActions.getUsableList();
  }

  renderLoader() {
    return <Loader centered />;
  }

  onSubmit(model) {
    const category = {
      id: this.props.match.params.id,
      name: model.name,
      icon: model.icon,
    };
    this.props.categoryCreationActions.createCategory(category);
  }

  renderForm() {
    const { intl } = this.props;
    const { icons } = this.props.categoryIconList;
    const { loading } = this.props.categoryCreation;

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
                      id: 'admin.categories.columns.name',
                    })}
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
                    required
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
    const { icons, loading } = this.props.categoryIconList;
    const { success, error } = this.props.categoryCreation;
    const { intl } = this.props;

    if (success) {
      this.props.categoryCreationActions.clearCategoryCreation();
      this.props.history.goBack();
      toast.success(
        intl.formatMessage({ id: 'admin.categories.creation.success' }),
      );
    }
    if (error) {
      toast.error(
        intl.formatMessage({ id: 'admin.categories.creation.error' }),
      );
    }

    return (
      <div>
        {loading && this.renderLoader()}
        {!loading && icons && this.renderForm()}
      </div>
    );
  }
}

const mapStateToProps = ({ categoryCreation, categoryIconList }) => ({
  categoryCreation,
  categoryIconList,
});

const mapDispatchToProps = (dispatch) => ({
  categoryCreationActions: bindActionCreators(
    categoryCreationActions,
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
)(injectIntl(AdminCategoryCreation));
