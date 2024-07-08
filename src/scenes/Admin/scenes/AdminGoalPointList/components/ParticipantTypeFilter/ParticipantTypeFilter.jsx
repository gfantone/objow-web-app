import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { useIntl } from 'react-intl';
import {
  DefaultText,
  RoundedTabs,
  RoundedTab,
} from '../../../../../../components';

const styles = {
  title: {
    paddingTop: 16,
    paddingBottom: 16,
  },
};

const ParticipantTypeFilter = (props) => {
  const intl = useIntl();
  const { classes, handleTypeChange, defaultType } = props;
  const [value, setValue] = React.useState(defaultType === 'C' ? 0 : 1);

  function handleChange(e, value) {
    let type = value == 0 ? 'C' : 'T';
    setValue(value);
    handleTypeChange(type);
  }

  return (
    <div>
      <DefaultText align="center" className={classes.title}>
        {intl.formatMessage({ id: 'admin.points.title' })}
      </DefaultText>
      <RoundedTabs value={value} onChange={handleChange} variant="fullWidth">
        <RoundedTab label={intl.formatMessage({ id: 'common.players' })} />
        <RoundedTab label={intl.formatMessage({ id: 'common.teams' })} />
      </RoundedTabs>
    </div>
  );
};

export default withStyles(styles)(ParticipantTypeFilter);
