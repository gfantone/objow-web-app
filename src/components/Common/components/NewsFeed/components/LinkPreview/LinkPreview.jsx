import React from 'react';
import { Grid, isWidthUp, withWidth } from '@material-ui/core';
import { AvatarGroup } from '@material-ui/lab';
import { DefaultTitle, DefaultText } from '../../..';
import { withStyles } from '@material-ui/core/styles';
import _ from 'lodash';

const styles = {
  link: {
    textDecoration: 'none',
  },
  wrapper: {
    background: '#EEF3F7',
  },
};

const LinkPreview = ({ openGraph, classes, width, ...props }) => {
  const isDesktop = isWidthUp('md', width);
  const target = isDesktop ? { target: '_blank' } : {};
  return (
    <div className={classes.wrapper}>
      <a href={openGraph.url} className={classes.link} {...target}>
        <Grid container>
          {openGraph.image && (
            <Grid item xs={12}>
              <img src={openGraph.image} style={{ width: '100%' }} />
            </Grid>
          )}
          <Grid item xs={12} container style={{ padding: '4px 10px' }}>
            <Grid item xs={12}>
              <DefaultTitle lowercase style={{ overflowWrap: 'anywhere' }}>
                {openGraph.title}
              </DefaultTitle>
            </Grid>
            <Grid item xs={12}>
              <DefaultText lowercase style={{ fontSize: 11 }}>
                {openGraph.site_name}
              </DefaultText>
            </Grid>
          </Grid>
        </Grid>
      </a>
    </div>
  );
};

export default withStyles(styles)(withWidth()(LinkPreview));
