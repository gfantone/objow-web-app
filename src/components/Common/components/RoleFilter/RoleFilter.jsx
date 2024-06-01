import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { RoundedTab, RoundedTabs } from '../Tabs';
import { DefaultText } from '../Texts';

const RoleFilter = ({ onRoleChange }) => {
  const intl = useIntl();
  const [selectedRole, setSelectedRole] = useState(0);
  const history = useHistory();

  useEffect(() => {
    history.replace(`?current=${selectedRole}`);
  }, [selectedRole, history]);

  const handleChange = (event, newValue) => {
    setSelectedRole(newValue);
    if (onRoleChange) {
      onRoleChange(newValue);
    }
  };

  return (
    <div>
      <div style={{ padding: 16 }}>
        <DefaultText align={'center'}>
          {intl.formatMessage({ id: 'admin.notifications_rights.sub_title' })}
        </DefaultText>
      </div>
      <RoundedTabs
        value={selectedRole}
        onChange={handleChange}
        variant='fullWidth'
      >
        <RoundedTab label={intl.formatMessage({ id: 'roles.C' })} />
        <RoundedTab label={intl.formatMessage({ id: 'roles.M' })} />
        <RoundedTab label={intl.formatMessage({ id: 'roles.A' })} />
      </RoundedTabs>
    </div>
  );
};

export default RoleFilter;
