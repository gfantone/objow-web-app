import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  AdministratorCollaboratorSelector,
  MainLayoutComponent,
  ManagerCollaboratorSelector,
  DefaultTitle,
} from '../../../../components';
import { Grid } from '@material-ui/core';

import * as Resources from '../../../../Resources';
import { injectIntl } from 'react-intl';

class RankingList extends MainLayoutComponent {
  componentDidMount() {
    const { intl } = this.props;
    this.props.handleTitle(intl.formatMessage({ id: 'ranking.title' }));
  }

  handleClick(id) {
    this.props.history.push(`/rankings/collaborators/${id}/list`);
  }

  render() {
    const { account } = this.props.accountDetail;
    const { intl } = this.props;

    const handleCollaboratorClick = (collaborator) => {
      const collaboratorUrl = `/rankings/collaborators/${collaborator.id}/list`;
      this.props.history.push(collaboratorUrl);
    };

    if (!account.hasRankingAccess) {
      return <Redirect to={`/`} />;
    }

    if (account.role.code == 'C') {
      return <Redirect to={`/rankings/collaborators/${account.id}/list`} />;
    }

    return (
      <div>
        {account.role.code == 'M' && (
          <ManagerCollaboratorSelector onClick={this.handleClick.bind(this)} />
        )}
        {(account.role.code == 'A' || account.role.code == 'S') && (
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <AdministratorCollaboratorSelector
                contextUrl='rankings/team/'
                onClickCollaborator={handleCollaboratorClick}
              />
            </Grid>
          </Grid>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ accountDetail }) => ({
  accountDetail,
});

export default connect(mapStateToProps)(withRouter(injectIntl(RankingList)));
