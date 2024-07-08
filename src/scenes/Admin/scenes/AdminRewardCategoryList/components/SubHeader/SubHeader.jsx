import React from 'react';
import {
  DefaultText,
  RoundedTab,
  RoundedTabs,
} from '../../../../../../components';
import { useIntl } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    padding: 16,
  },
};

const SubHeader = ({ onChange, ...props }) => {
  const intl = useIntl();
  const { classes } = props;
  const [value, setValue] = React.useState(0);

  const handleChange = (e, value) => {
    setValue(value);
    if (onChange) onChange(value == 0);
  };

  return (
    <div>
      <div className={classes.root}>
        <DefaultText align={'center'}>
          {intl.formatMessage({ id: 'admin.reward_category.list.subtitle' })}
        </DefaultText>
      </div>
      <RoundedTabs value={value} onChange={handleChange} variant="fullWidth">
        <RoundedTab
          label={intl.formatMessage({
            id: 'admin.reward_category.list.active_tab',
          })}
        />
        <RoundedTab
          label={intl.formatMessage({
            id: 'admin.reward_category.list.inactive_tab',
          })}
        />
      </RoundedTabs>
    </div>
  );
};
export default withStyles(styles)(SubHeader);
