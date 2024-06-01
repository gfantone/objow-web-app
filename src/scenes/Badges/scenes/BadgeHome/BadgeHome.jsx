import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  AdministratorCollaboratorSelector,
  DefaultTitle,
  MainLayoutComponent,
  ManagerCollaboratorSelector,
} from '../../../../components';
import { Grid } from '@material-ui/core';

import { useIntl, injectIntl } from 'react-intl';

class BadgeHome extends MainLayoutComponent {
  componentDidMount() {
    const { intl } = this.props;
    const { account } = this.props.accountDetail;
    this.props.handleTitle(
      account.badgeWording || intl.formatMessage({ id: 'badge.title' })
    );
  }

  handleClick(id) {
    this.props.history.push(`/badges/collaborator/${id}`);
  }

  render() {
    const { account } = this.props.accountDetail;
    const { intl } = this.props;

    const handleCollaboratorClick = (collaborator) => {
      const collaboratorUrl = `/badges/collaborator/${collaborator.id}`;
      this.props.history.push(collaboratorUrl);
    };

    if (!account.hasBadgeAccess) {
      return <Redirect to={'/'} />;
    }
    return (
      <div>
        {account.role.code == 'C' && (
          <Redirect to={`/badges/collaborator/${account.id}`} />
        )}
        {account.role.code == 'M' && (
          <ManagerCollaboratorSelector onClick={this.handleClick.bind(this)} />
        )}
        {(account.role.code == 'A' || account.role.code == 'S') && (
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <AdministratorCollaboratorSelector
                contextUrl='badges/'
                contextUrlOptions={{ page: 0 }}
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

export default connect(mapStateToProps)(withRouter(injectIntl(BadgeHome)));
