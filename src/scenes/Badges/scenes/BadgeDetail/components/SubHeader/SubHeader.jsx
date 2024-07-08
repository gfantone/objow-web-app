import React from 'react';
import { connect } from 'react-redux';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { BadgeLevel } from '../../../../components';
import { Loader } from '../../../../../../components';

const useStyles = makeStyles({
  root: {
    padding: 16,
  },
});

const SubHeader = ({ ...props }) => {
  const classes = useStyles();
  const { summary, loading } = props.collaboratorBadgeSummaryDetail;
  const { collaborator } = props.collaboratorDetail;

  const renderLoader = () => {
    return (
      <div className={classes.root}>
        <Loader centered />
      </div>
    );
  };

  const renderData = () => {
    return (
      <Box p={2}>
        <BadgeLevel level={summary} />
      </Box>
    );
  };

  return (
    <div>
      {loading && renderLoader()}
      {!loading && collaborator && summary && renderData()}
    </div>
  );
};

const mapStateToProps = ({
  collaboratorBadgeSummaryDetail,
  collaboratorDetail,
}) => ({
  collaboratorBadgeSummaryDetail,
  collaboratorDetail,
});

export default connect(mapStateToProps)(SubHeader);
