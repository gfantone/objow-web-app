import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { DefaultText, RoundedTabs, RoundedTab } from '../../../../components';
import * as Resources from '../../../../Resources';
import { useIntl } from 'react-intl';

const styles = {
  root: {
    padding: 16,
  },
};

const TrackingSubHeader = ({ onChange, displayPending, ...props }) => {
  const intl = useIntl();
  const { classes } = props;
  const [value, setValue] = React.useState(0);

  const handleChange = (e, value) => {
    setValue(value);
    if (onChange) onChange(value);
  };

  return (
    <div>
      <div className={classes.root}>
        <DefaultText align={'center'}>
          {intl.formatMessage({
            id: 'collaborator.reward_order.tracking.sub_header_validated_title',
          })}
        </DefaultText>
      </div>
      <RoundedTabs value={value} onChange={handleChange} variant="fullWidth">
        <RoundedTab
          label={intl.formatMessage({
            id: 'collaborator.reward_order.tracking.sub_header_validated_tab',
          })}
        />
        {displayPending && (
          <RoundedTab
            label={intl.formatMessage({
              id: 'collaborator.reward_order.tracking.sub_header_pending_tab',
            })}
          />
        )}
        <RoundedTab
          label={intl.formatMessage({
            id: 'collaborator.reward_order.tracking.sub_header_waiting_tab',
          })}
        />
      </RoundedTabs>
    </div>
  );
};

export default withStyles(styles)(TrackingSubHeader);
