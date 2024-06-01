import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import policy from '../../../../assets/files/politique_confidentialite.pdf';
import policyYoplait from '../../../../assets/files/politique_confidentialite_yoplait.pdf';

const PrivacyPolicy = ({ ...props }) => {
  const { account } = props.accountDetail;

  useEffect(() => {
    props.onTitle('Politique de confidentialité');
    props.onFile(account.isYoplaitEnv ? policyYoplait : policy);
  });

  return <div></div>;
};

const mapStateToProps = ({ accountDetail }) => ({
  accountDetail,
});

export default connect(mapStateToProps)(PrivacyPolicy);
