import React from 'react';
import { CardMedia, Grid, Card } from '@material-ui/core';
import { DefaultTitle, FileInput } from '../../../../../../components';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as systemImageUpdateActions from '../../../../../../services/SystemImages/SystemImageUpdate/actions';
import * as configListActions from '../../../../../../services/Configs/ConfigList/actions';
import * as configListUpdateActions from '../../../../../../services/Configs/ConfigListUpdate/actions';
import _ from 'lodash';

const styles = {
  logo: {
    height: 100,
    width: 200,
    backgroundSize: 'contain',
  },
};

const LogoSettings = ({ systemImageList, ...props }) => {
  const { images } = systemImageList;
  const { classes } = props;

  var logo = images
    ? _.get(
        images.find((x) => x.code == 'LOGO'),
        'src'
      )
    : null;

  if (!logo) {
    logo = '/assets/img/system/logo.png';
  }
  return (
    <>
      <DefaultTitle isContrast>Logo</DefaultTitle>
      <Card>
        <Grid container spacing={2} style={{ margin: 20 }}>
          <Grid item xs={12} container justifyContent='center'>
            <Grid item>
              <CardMedia image={logo} className={classes.logo} />
            </Grid>
          </Grid>
          <Grid item xs={12} container justifyContent='center'>
            <Grid item>
              <FileInput name='logo' accept='image/*' />
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

const mapStateToProps = ({
  systemImageList,
  systemImageUpdate,
  configList,
  configListUpdate,
}) => ({
  systemImageList,
  systemImageUpdate,
  configList,
  configListUpdate,
});

const mapDispatchToProps = (dispatch) => ({
  systemImageUpdateActions: bindActionCreators(
    systemImageUpdateActions,
    dispatch
  ),
  configListActions: bindActionCreators(configListActions, dispatch),
  configListUpdateActions: bindActionCreators(
    configListUpdateActions,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(LogoSettings));
