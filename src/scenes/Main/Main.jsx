import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';

const Main = (props) => {
  const { account } = props.accountDetail;

  if (account.homePage) {
    return (
      <Redirect
        to={`/${account.homePage
          .replace(':id', account.id)
          .replace(':teamId', _.get(account, 'team.id'))}`}
      />
    );
  }

  return <Redirect to="/goals" />;
};

const mapStateToProps = ({ accountDetail }) => ({
  accountDetail,
});

export default connect(mapStateToProps)(Main);
