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

class CoachingHome extends MainLayoutComponent {
  componentDidMount() {
    const { intl } = this.props;
    this.props.handleTitle(intl.formatMessage({ id: 'coaching_list.title' }));
  }

  handleClick(id) {
    this.props.history.push(`/coaching/${id}`);
  }

  render() {
    const { account } = this.props.accountDetail;
    const { intl } = this.props;

    const handleCollaboratorClick = (collaborator) => {
      const collaboratorUrl = `/coaching/${collaborator.id}`;
      this.props.history.push(collaboratorUrl);
    };

    if (!account.hasCoachingAccess) {
      return <Redirect to={'/'} />;
    }

    if (account.role.code == 'C') {
      return <Redirect to={`/coaching/${account.id}`} />;
    }

    return (
      <>
        {account.role.code == 'M' && (
          <ManagerCollaboratorSelector onClick={this.handleClick.bind(this)} />
        )}
        {(account.role.code == 'A' || account.role.code == 'S') && (
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <AdministratorCollaboratorSelector
                contextUrl='coaching/team/'
                onClickCollaborator={handleCollaboratorClick}
              />
            </Grid>
          </Grid>
        )}
      </>
    );
  }
}

const mapStateToProps = ({ accountDetail }) => ({
  accountDetail,
});

export default connect(mapStateToProps)(withRouter(injectIntl(CoachingHome)));
