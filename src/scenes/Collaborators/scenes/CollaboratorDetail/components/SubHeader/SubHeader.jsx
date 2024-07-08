import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Loader, UserProfile } from '../../../../../../components';

const styles = {
  root: {
    padding: 16,
  },
};

const SubHeader = ({ ...props }) => {
  const { classes } = props;
  const { collaborator, loading: collaboratorDetailLoading } =
    props.collaboratorDetail;
  const { badges, loading: currentCollaboratorBadgeSummaryListLoading } =
    props.currentCollaboratorBadgeSummaryList;
  const loading =
    collaboratorDetailLoading || currentCollaboratorBadgeSummaryListLoading;

  const renderLoader = () => {
    return (
      <div className={classes.root}>
        <Loader centered />
      </div>
    );
  };

  const renderData = () => {
    return <UserProfile user={collaborator} />;
  };

  return (
    <div>
      {loading && renderLoader()}
      {!loading && collaborator && badges && renderData()}
    </div>
  );
};

const mapStateToProps = ({
  collaboratorDetail,
  currentCollaboratorBadgeSummaryList,
}) => ({
  collaboratorDetail,
  currentCollaboratorBadgeSummaryList,
});

export default connect(mapStateToProps)(withStyles(styles)(SubHeader));
