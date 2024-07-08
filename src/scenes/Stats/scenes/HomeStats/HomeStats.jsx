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

class HomeStats extends MainLayoutComponent {
  componentDidMount() {
    const { intl } = this.props;
    this.props.handleTitle(intl.formatMessage({ id: 'statistics.title' }));
  }

  handleClick(id) {
    this.props.history.push(`/stats/teams/${id}/categories`);
  }

  render() {
    const { account } = this.props.accountDetail;
    const { intl } = this.props;

    if (!account.hasStatisticsAccess) {
      return <Redirect to={'/'} />;
    }

    if (account.role.code === 'C') {
      return <Redirect to={`/stats/collaborators/${account.id}/categories`} />;
    }

    if (account.role.code === 'M' && account.team) {
      return <Redirect to={`/stats/teams/${account.team.id}/categories`} />;
    }

    if (account.role.code === 'A' || account.role.code == 'S') {
      return (
        <>
          <TeamSelector onClick={this.handleClick.bind(this)} />
        </>
      );
    }

    return <div></div>;
  }
}

const mapStateToProps = ({ accountDetail }) => ({
  accountDetail,
});

export default connect(mapStateToProps)(withRouter(injectIntl(HomeStats)));
