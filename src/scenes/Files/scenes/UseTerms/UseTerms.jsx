import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import terms from '../../../../assets/files/cgu.pdf';
import termsYoplait from '../../../../assets/files/cgu_yoplait.pdf';

const UseTerms = ({ ...props }) => {
  const { account } = props.accountDetail;

  useEffect(() => {
    props.onTitle('Condition générales');
    props.onFile(account.isYoplaitEnv ? termsYoplait : terms);
  });

  return <div></div>;
};

const mapStateToProps = ({ accountDetail }) => ({
  accountDetail,
});

export default connect(mapStateToProps)(UseTerms);
