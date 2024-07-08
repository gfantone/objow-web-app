import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import {
  DefaultText,
  DefaultTitle,
  ErrorText,
  InfoText,
  Loader,
  Avatar,
  TeamSimple,
} from '../../../../../../components';
import * as Resources from '../../../../../../Resources';
import '../../../../../../helpers/StringHelper';
import { Grid } from '@material-ui/core';
import { Tag } from '../../../../../../components/Teams/components/Team/components/Tag';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFireAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';

import _ from 'lodash';

const styles = {
  root: {
    padding: 16,
  },
  tag: {
    borderRadius: 5,
  },
};

const SubHeader = ({ ...props }) => {
  const { classes } = props;
  const { team, loading } = props.teamDetail;

  const renderLoader = () => {
    return <Loader centered />;
  };

  const renderData = () => {
    const { team } = props.teamDetail;
    const players = team.collaborators.length;
    const managerPhoto =
      team.manager && team.manager.photo
        ? team.manager.photo
        : '/assets/img/user/avatar.svg';

    return (
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <div>
            <TeamSimple team={team} />
          </div>
        </Grid>
      </Grid>
    );
  };

  return (
    <div className={classes.root}>
      {loading && renderLoader()}
      {!loading && team && renderData()}
    </div>
  );
};

const mapStateToProps = ({ teamDetail }) => ({
  teamDetail,
});

export default connect(mapStateToProps)(withStyles(styles)(SubHeader));
