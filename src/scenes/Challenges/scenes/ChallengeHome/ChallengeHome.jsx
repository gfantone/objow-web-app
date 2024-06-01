import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import _ from 'lodash';
import {
  IconButton,
  MainLayoutComponent,
  TeamSelector,
  Loader,
  AppBarSubTitle,
  AdministratorCollaboratorSelector,
  DefaultTitle,
} from '../../../../components';
import { Grid } from '@material-ui/core';

import { FilterSelector } from './components';
import { useIntl, injectIntl } from 'react-intl';
import * as configListActions from '../../../../services/Configs/ConfigList/actions';

class ChallengeHome extends MainLayoutComponent {
  constructor(props) {
    super(props);
    this.state = {
      team: null,
      filter: null,
    };
  }

  handleAdd() {
    this.props.history.push('/challenges/creation');
  }

  handleClick(id, type) {
    this.setState({
      ...this.state,
      team: id,
    });
    this.props.history.push(
      `/challenges/${type === 'teamGroup' ? 'department' : 'team'}/${id}`
    );
  }

  selectFilter = (filter) => {
    this.setState({
      ...this.state,
      filter: filter,
    });
  };

  componentDidMount() {
    const { intl } = this.props;
    const { account } = this.props.accountDetail;

    this.props.handleTitle(
      account.challengeWording || intl.formatMessage({ id: 'challenge.title' })
    );
    if (account.role.code == 'A' || account.role.code == 'S') {
      this.props.handleButtons(
        <IconButton size='small' onClick={this.handleAdd.bind(this)}>
          <FontAwesomeIcon icon={faPlus} />
        </IconButton>
      );
    }
    // this.props.configListActions.getPermanentConfigList();
  }

  render() {
    const { account } = this.props.accountDetail;
    const { configs, loading } = this.props.configList;
    const { intl } = this.props;

    const handleCollaboratorClick = (collaborator) => {
      const collaboratorUrl = `/challenges/collaborator/${collaborator.id}`;
      this.props.history.push(collaboratorUrl);
    };

    if (!account.hasChallengeAccess) {
      return <Redirect to={'/'} />;
    }

    if (
      account.role.code == 'A' ||
      (account.role.code == 'S' && !this.state.team)
    ) {
      return (
        <>
          <Grid container spacing={1}>
            <Grid item xs>
              <AdministratorCollaboratorSelector
                contextUrl='challenges/department/'
                contextUrlOptions={{ page: 0 }}
                onClickCollaborator={handleCollaboratorClick}
                onClick={this.handleClick.bind(this)}
                teamGroupSelectable
              />
            </Grid>
          </Grid>
        </>
      );
    }

    if (account.role.code == 'C') {
      return (
        <Redirect
          to={`/challenges/collaborator/${account.id}${
            this.state.filter ? this.state.filter : ''
          }`}
        />
      );
    }

    return (
      <Redirect
        to={`/challenges/team/${_.get(account, 'team.id') || this.state.team}${
          this.state.filter ? this.state.filter : ''
        }`}
      />
    );

    // if (account.role.code == 'C') {
    //     return <Redirect to={`/challenges/collaborator/${account.id}`} />
    // } else if (account.role.code == 'M' && account.team) {
    // } else if (account.role.code == 'A') {
    //     return (
    //         <div>
    //             <TeamSelector onClick={this.handleClick.bind(this)} />
    //         </div>
    //     )
    // } else {
    //     return <div></div>
    // }
  }
}

const mapStateToProps = ({ accountDetail, configList }) => ({
  accountDetail,
  configList,
});

const mapDispatchToProps = (dispatch) => ({
  configListActions: bindActionCreators(configListActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(injectIntl(ChallengeHome)));
