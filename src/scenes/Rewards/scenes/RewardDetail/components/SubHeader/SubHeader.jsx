import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Reward } from '../../../../components';
import { Loader } from '../../../../../../components';

const styles = {
  button: {
    margin: 4,
  },
  buttonContainer: {
    textAlign: 'right',
  },
  root: {
    padding: 16,
  },
};
const SubHeader = ({ onAddClick, disableButton, ...props }) => {
  const { classes } = props;
  const { reward, loading } = props.rewardDetail;

  function renderLoader() {
    return (
      <div className={classes.root}>
        <Loader centered />
      </div>
    );
  }

  function renderData() {
    return (
      <div className={classes.root}>
        <Reward
          reward={reward}
          onAddClick={!disableButton ? onAddClick : null}
          detailDisabled
        />
      </div>
    );
  }

  return (
    <div>
      {loading && renderLoader()}
      {!loading && reward && renderData()}
    </div>
  );
};

const mapStateToProps = ({ rewardDetail }) => ({
  rewardDetail,
});

export default connect(mapStateToProps)(withStyles(styles)(SubHeader));
