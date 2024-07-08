import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, isWidthUp, withWidth } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import {
  Button,
  IconButton as AppBarIconButton,
  Loader,
  MainLayoutComponent,
  ProgressButton,
  RichText,
} from '../../components';
import { injectIntl } from 'react-intl';
import * as configListActions from '../../services/Configs/ConfigList/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import * as configUpdateActions from '../../services/Configs/ConfigUpdate/actions';

class GameRules extends MainLayoutComponent {
  state = { edition: false, rules: null, renderKey: 'wrapper0' };

  constructor(props) {
    super(props);
    this.props.configUpdateActions.clearConfigUpdate();
  }

  componentDidMount() {
    const { intl } = this.props;
    const { account } = this.props.accountDetail;
    this.props.handleTitle(
      account.rulesWording || intl.formatMessage({ id: 'game_rules.title' })
    );
    if (account.role.code === 'A') {
      this.props.handleButtons(
        <AppBarIconButton
          size='small'
          onClick={this.handleEditClick(true).bind(this)}
        >
          <FontAwesomeIcon icon={faEdit} />
        </AppBarIconButton>
      );
    }
    this.props.handleMaxWidth('md');
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { configs } = this.props.configList;
    const config = configs && configs.find((x) => x.code === 'GR');
    const rules = config && JSON.parse(config.value);
    if (rules && !this.state.initialized) {
      if (rules.filter((x) => x.type === 'embed-large').length > 0) {
        this.props.handleMaxWidth(false);

        this.setState({
          ...this.state,
          initialized: true,
          renderKey: 'wrapper1',
        });
      }
    }
  }

  handleEditClick = (edition) => () => {
    this.setState({
      ...this.state,
      edition: edition,
    });
  };

  handleRulesChange(newRules) {
    this.setState({
      ...this.state,
      rules: newRules,
    });
  }

  handleSaveClick() {
    const { configs } = this.props.configList;
    const config = configs.find((x) => x.code === 'GR');
    const rules = JSON.stringify(this.state.rules);
    this.props.configUpdateActions.updateConfig(config.id, rules);
  }

  renderLoader() {
    return <Loader centered />;
  }

  renderData() {
    const { intl } = this.props;
    const { configs } = this.props.configList;
    const { loading } = this.props.configUpdate;
    const config = configs.find((x) => x.code === 'GR');
    const rules = JSON.parse(config.value);

    const { account } = this.props.accountDetail;

    if (!account.hasRulesAccess) {
      return <Redirect to={'/'} />;
    }

    return (
      <Grid
        container
        spacing={this.state.edition ? 2 : 0}
        justify='space-between'
      >
        <Grid item xs={12} style={{ marginTop: -1 }} key={this.state.renderKey}>
          <RichText
            initial={rules}
            readOnly={!this.state.edition}
            onChange={this.handleRulesChange.bind(this)}
          />
        </Grid>
        {this.state.edition && (
          <Grid item>
            <Button color='secondary' onClick={() => this.props.history.go(0)}>
              {intl.formatMessage({ id: 'common.cancel' })}
            </Button>
          </Grid>
        )}
        {this.state.edition && (
          <Grid item>
            <ProgressButton
              loading={loading}
              text={intl.formatMessage({ id: 'common.submit' })}
              onClick={this.handleSaveClick.bind(this)}
            />
          </Grid>
        )}
      </Grid>
    );
  }

  render() {
    const { configs, loading } = this.props.configList;
    const { success } = this.props.configUpdate;

    if (success) {
      this.props.configUpdateActions.clearConfigUpdate();
      this.handleEditClick(false)();
    }

    return (
      <div>
        {loading && this.renderLoader()}
        {!loading && configs && this.renderData()}
      </div>
    );
  }
}

const mapStateToProps = ({ accountDetail, configList, configUpdate }) => ({
  accountDetail,
  configList,
  configUpdate,
});

const mapDispatchToProps = (dispatch) => ({
  configListActions: bindActionCreators(configListActions, dispatch),
  configUpdateActions: bindActionCreators(configUpdateActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(GameRules));
