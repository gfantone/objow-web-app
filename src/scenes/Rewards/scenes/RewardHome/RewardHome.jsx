import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const RewardHome = ({ ...props }) => {
  const { account } = props.accountDetail;
  const role = account.role.code;

  if (role === 'A' || role === 'S') {
    return <Redirect to="/rewards/management" />;
  } else if (role === 'M' && account.team) {
    return <Redirect to={`/rewards/teams/${account.team.id}`} />;
  } else if (role === 'C') {
    return <Redirect to={`/rewards/collaborators/${account.id}`} />;
  } else {
    return <div></div>;
  }
};

const mapStateToProps = ({ accountDetail }) => ({
  accountDetail,
});

export default connect(mapStateToProps)(RewardHome);
