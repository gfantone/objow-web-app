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
  const { items, loading: coachingItemListLoading } = props.coachingItemList;
  const { user, loading: userDetailLoading } = props.userDetail;
  const loading = coachingItemListLoading || userDetailLoading;

  const renderLoader = () => {
    const { classes } = props;
    return (
      <div className={classes.root}>
        <Loader centered />
      </div>
    );
  };

  const renderData = () => {
    return <UserProfile user={user} />;
  };

  return (
    <div>
      {loading && renderLoader()}
      {!loading && items && user && renderData()}
    </div>
  );
};

const mapStateToProps = ({ coachingItemList, userDetail }) => ({
  coachingItemList,
  userDetail,
});

export default connect(mapStateToProps)(withStyles(styles)(SubHeader));
