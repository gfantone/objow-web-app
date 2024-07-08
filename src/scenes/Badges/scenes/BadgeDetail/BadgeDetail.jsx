import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CardMedia, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { Redirect } from 'react-router-dom';
import { CollaboratorList, SubHeader } from './components';
import { Divider } from '../../components';
import {
  DefaultTitle,
  InfoText,
  MainLayoutComponent,
} from '../../../../components';
import { useIntl, injectIntl } from 'react-intl';
import * as collaboratorBadgeSummaryDetailActions from '../../../../services/CollaboratorBadges/CollaboratorBadgeSummaryDetail/actions';
import _ from 'lodash';

const styles = {
  icon: {
    height: 100,
    width: 100,
    overflow: 'hidden',
    borderRadius: 50,
  },
};

class BadgeDetail extends MainLayoutComponent {
  componentDidMount() {
    const { intl } = this.props;
    const { account } = this.props.accountDetail;

    this.badgeId = this.props.match.params.id;
    this.props.handleTitle(
      account.badgeWording || intl.formatMessage({ id: 'badge.title' })
    );
    this.props.handleSubHeader(<SubHeader />);
    this.props.activateReturn();
    this.props.collaboratorBadgeSummaryDetailActions.getCollaboratorBadgeSummary(
      this.badgeId
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const badgeId = this.props.match.params.id;
    if (this.badgeId != badgeId) {
      this.badgeId = badgeId;
      this.props.collaboratorBadgeSummaryDetailActions.getCollaboratorBadgeSummary(
        this.badgeId
      );
    }
  }

  renderData() {
    const { classes } = this.props;
    const { summary } = this.props.collaboratorBadgeSummaryDetail;

    const iconData = summary.code
      ? require(`../../../../assets/img/system/badge/icons/${summary.code}.svg`)
      : _.get(summary, 'icon.path');

    const { account } = this.props.accountDetail;

    if (!account.hasBadgeAccess) {
      return <Redirect to={'/'} />;
    }

    return (
      <Grid container spacing={2} justify='center'>
        <Grid item>
          <Grid container direction='column' alignItems='center' spacing={2}>
            <Grid item>
              <CardMedia image={iconData} className={classes.icon} />
            </Grid>
            <Grid item>
              <DefaultTitle isContrast align='center'>
                {summary.publicTitle} #{summary.rank}
              </DefaultTitle>
            </Grid>
            <Grid item>
              <Divider />
            </Grid>
            <Grid item>
              <InfoText isContrast align='center'>
                {summary.description}
              </InfoText>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <CollaboratorList colaborators={summary.collaborators} />
        </Grid>
      </Grid>
    );
  }

  render() {
    const { summary } = this.props.collaboratorBadgeSummaryDetail;
    const { collaborator } = this.props.collaboratorDetail;

    return <div>{collaborator && summary && this.renderData()}</div>;
  }
}

const mapStateToProps = ({
  collaboratorBadgeSummaryDetail,
  collaboratorDetail,
  accountDetail,
}) => ({
  collaboratorBadgeSummaryDetail,
  accountDetail,
  collaboratorDetail,
});

const mapDispatchToProps = (dispatch) => ({
  collaboratorBadgeSummaryDetailActions: bindActionCreators(
    collaboratorBadgeSummaryDetailActions,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(injectIntl(BadgeDetail)));
