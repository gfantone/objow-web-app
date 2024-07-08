import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid } from '@material-ui/core';
import {
  Collaborator,
  EmptyState,
  GridLink,
  InfoText,
  MainLayoutComponent,
} from '../../../../../../components';
import * as Resources from '../../../../../../Resources';
import { injectIntl } from 'react-intl';
import * as teamDetailActions from '../../../../../../services/Teams/TeamDetail/actions';

class CollaboratorSelect extends React.Component {
  componentDidMount() {
    const { intl } = this.props;
    const id = this.props.team;
    this.props.teamDetailActions.getTeamDetail(id);
  }

  renderEmptyState() {
    const { intl } = this.props;
    return (
      <EmptyState
        title={intl.formatMessage({ id: 'team.empty_state_title' })}
        message=""
      />
    );
  }

  renderData() {
    const { team } = this.props.teamDetail;

    return (
      <Grid container spacing={2} style={{ marginTop: 8 }}>
        {team.manager && team.manager.citation && (
          <Grid xs={12} style={{ marginBottom: 8 }}>
            <InfoText align="center">« {team.manager.citation} »</InfoText>
          </Grid>
        )}
        {team.collaborators.map((collaborator) => {
          return (
            <Grid
              key={collaborator.id}
              item
              xs={12}
              sm={6}
              md={3}
              onClick={() => this.props.onClick(collaborator)}
            >
              <Collaborator collaborator={collaborator} />
            </Grid>
          );
        })}
      </Grid>
    );
  }

  render() {
    const { team, loading } = this.props.teamDetail;
    const { account } = this.props.accountDetail;

    if (!account.hasTeamsAccess) {
      return <Redirect to={'/'} />;
    }

    return (
      <div>
        {!loading && team && this.renderData()}
        {!loading && !team && this.renderEmptyState()}
      </div>
    );
  }
}

const mapStateToProps = ({ teamDetail, accountDetail }) => ({
  accountDetail,
  teamDetail,
});

const mapDispatchToProps = (dispatch) => ({
  teamDetailActions: bindActionCreators(teamDetailActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(CollaboratorSelect));
