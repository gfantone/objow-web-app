import React, { useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { useClearCache } from 'react-clear-cache';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { Button, ThemeWrapper } from '../../../../components';
import configureStore from '../../../../store/configureStore';
import local from '../../../../data/local/local';
import { useIntl } from 'react-intl';
import tinycolor from 'tinycolor2';

const styles = {
  reloadIcon: {
    cursor: 'pointer',
    textTransform: 'none',
    fontSize: 16,
  },
};

const RefreshButton = ({ color, ...props }) => {
  const intl = useIntl();
  const { emptyCacheStorage } = useClearCache();
  const { classes } = props;
  // const { backgroundColor } = useContext(ThemeWrapper.Context);
  // const getContrastColor = (backgroundColor) => {
  //   return tinycolor(backgroundColor).isDark();
  // };
  // const { store, persistor } = configureStore();
  return (
    <Button
      className={classes.reloadIcon}
      color={color}
      onClick={() => {
        // local.removeAccessToken()
        // local.removeRefreshToken()
        // local.removeStore()
        emptyCacheStorage();
        // window.location = '/'
      }}
    >
      <FontAwesomeIcon icon={faSyncAlt} />
      &nbsp;
      {intl.formatMessage({ id: 'common.refresh_button' })}
    </Button>
  );
};

export default withStyles(styles)(RefreshButton);
