import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid } from '@material-ui/core';
import { Team } from './components';
import {
  EmptyState,
  Loader,
  MainLayoutComponent,
  TeamSelector,
  Collaborator,
  DefaultTitle,
  AdministratorCollaboratorSelector,
} from '../../../../components';
import { injectIntl } from 'react-intl';
import * as Resources from '../../../../Resources';
import * as teamListActions from '../../../../services/Teams/TeamList/actions';

class TeamList extends MainLayoutComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    const { intl } = this.props;
    this.props.handleTitle(intl.formatMessage({ id: 'team.title' }));
    this.props.teamListActions.getTeamList({
      disableCollaborators: true,
      full: true,
    });
  }

  handleClick(id) {
    this.props.history.push(`/teams/${id}`);
  }

  renderLoader() {
    return <Loader centered />;
  }

  renderEmptyState() {
    const { intl } = this.props;

    return (
      <EmptyState
        title={intl.formatMessage({ id: 'team.empty_state_title' })}
        message={intl.formatMessage({ id: 'team.empty_state_message' })}
      />
    );
  }

  renderData() {
    const { teams } = this.props.teamList;
    const { intl } = this.props;

    const handleCollaboratorClick = (collaborator) => {
      const collaboratorUrl = `/teams/${collaborator.team.id}/collaborators/${collaborator.id}/detail`;
      this.props.history.push(collaboratorUrl);
    };

    return (
      <>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <AdministratorCollaboratorSelector
              contextUrl='teams/'
              onClickCollaborator={handleCollaboratorClick}
              full
            />
          </Grid>
        </Grid>
      </>
    );
  }

  render() {
    const { teams, loading } = this.props.teamList;
    const { account } = this.props.accountDetail;

    if (!account.hasTeamsAccess) {
      return <Redirect to={'/'} />;
    }
    return (
      <div>
        {loading && this.renderLoader()}
        {!loading && teams && teams.length > 0 && this.renderData()}
        {!loading && teams && teams.length == 0 && this.renderEmptyState()}
      </div>
    );
  }
}

const mapStateToProps = ({ teamList, accountDetail }) => ({
  teamList,
  accountDetail,
});

const mapsDispatchToProps = (dispatch) => ({
  teamListActions: bindActionCreators(teamListActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapsDispatchToProps
)(injectIntl(TeamList));
