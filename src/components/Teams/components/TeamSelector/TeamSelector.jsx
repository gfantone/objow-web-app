import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Card, EmptyState, Loader, OrganizationMenu } from '../../..';
import { Team } from '..';
import { injectIntl } from 'react-intl';
import * as Resources from '../../../../Resources';
import * as teamListAction from '../../../../services/Teams/TeamList/actions';
import * as teamGroupTreeAction from '../../../../services/TeamGroups/TeamGroupTree/actions';
import _ from 'lodash';

const styles = {
  team: {
    cursor: 'pointer',
  },
};

class TeamSelector extends Component {
  componentDidMount() {
    const { account } = this.props.accountDetail;
    const { teamGroup, loading } = this.props.teamGroupTree;
    // prevent from loading multiple time in parallel
    if (!loading) {
      this.props.teamGroupTreeAction.getTeamGroupTree(this.props.full);
    }
  }

  handleClick(id, type) {
    this.props.onClick(id, type);
  }

  handleTeamGroupClick(id) {
    this.props.onTeamGroupClick(id);
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

  // renderOrganization(organization, previousLevel, type) {
  //   const level = previousLevel ? previousLevel + 1 : 1
  //   const NodeComponent = OrganizationNode
  //   const teamGroupChildren = organization.teamGroups ? organization.teamGroups.map(team => this.renderOrganization(team, level, 'teamGroup')) : []
  //   const teamChildren = organization.teams ? organization.teams.map(team => this.renderOrganization(team, level, 'team')) : []
  //   const mergedChildren = [...teamGroupChildren, ...teamChildren]
  //   const currentType = type || 'teamGroup'
  //   return(
  //     <NodeComponent
  //       lineHeight='30px'
  //       onClick={(team, type) => {
  //         if(type === 'team') {
  //           this.handleClick(team.id)
  //         }
  //       }} team={organization} rootNode={level === 1} type={ type || 'teamGroup' }
  //     >
  //       {mergedChildren}
  //     </NodeComponent>
  //   )
  // }

  renderData() {
    const { classes } = this.props;
    const { teamGroup } = this.props.teamGroupTree;

    return (
      <Grid container spacing={2}>
        {_.get(teamGroup, 'id') && (
          <OrganizationMenu
            organizationRoot={teamGroup}
            onClick={(team, type) => {
              this.handleClick(team.id, type);
            }}
            full={this.props.full}
            teamGroupSelectable={this.props.teamGroupSelectable}
          />
        )}
      </Grid>
    );
  }

  render() {
    // const {teams, loading} = this.props.teamList
    const { teamGroup, loading } = this.props.teamGroupTree;

    return (
      <div>
        {loading && this.renderLoader()}
        {!loading && teamGroup && this.renderData()}
        {!loading && !teamGroup && this.renderEmptyState()}
      </div>
    );
  }
}

const mapStateToProps = ({ teamList, teamGroupTree, accountDetail }) => ({
  teamList,
  teamGroupTree,
  accountDetail,
});

const mapDispatchToProps = (dispatch) => ({
  teamListAction: bindActionCreators(teamListAction, dispatch),
  teamGroupTreeAction: bindActionCreators(teamGroupTreeAction, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(injectIntl(TeamSelector)));
