import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  MainLayoutComponent,
  TeamSelector,
  AdministratorCollaboratorSelector,
  DefaultTitle,
} from '../../../../components';
import { Grid } from '@material-ui/core';

import * as Resources from '../../../../Resources';
import { injectIntl } from 'react-intl';
import _ from 'lodash';

class GoalListHome extends MainLayoutComponent {
  componentDidMount() {
    const { intl } = this.props;
    const { account } = this.props.accountDetail;
    this.props.handleTitle(
      _.get(account, 'goalWording') ||
        intl.formatMessage({ id: 'admin.goal.title' })
    );
  }

  handleClick(id) {
    const { account } = this.props.accountDetail;
    const isJti = account.isJtiEnv;
    if (isJti) {
      this.props.history.push(`/goals/teams/${id}/list`);
    } else {
      this.props.history.push(`/goals/teams/${id}/categories`);
    }
  }

  render() {
    const { account } = this.props.accountDetail;
    const isJti = account.isJtiEnv;
    const { intl } = this.props;

    const handleCollaboratorClick = (collaborator) => {
      const collaboratorUrl = `/goals/collaborators/${collaborator.id}/list`;
      this.props.history.push(collaboratorUrl);
    };

    if (!account.hasGoalAccess) {
      return <Redirect to={'/challenges'} />;
    }

    if (account.role.code == 'C') {
      return <Redirect to={`/goals/collaborators/${account.id}/categories`} />;
    }

    if (account.role.code == 'M' && account.team) {
      return <Redirect to={`/goals/teams/${account.team.id}/categories`} />;
    }

    if (account.role.code == 'A' || account.role.code == 'S') {
      return (
        <>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <AdministratorCollaboratorSelector
                onClickCollaborator={handleCollaboratorClick}
                onClick={this.handleClick.bind(this)}
              />
            </Grid>
          </Grid>
        </>
      );
    }

    return <div></div>;
  }
}

const mapStateToProps = ({ accountDetail, configList }) => ({
  accountDetail,
  configList,
});

export default connect(mapStateToProps)(withRouter(injectIntl(GoalListHome)));
