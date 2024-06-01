import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { DefaultText, Card, TimerTag } from '../../../../components';
import { Grid } from '@material-ui/core';

const styles = {
  listItem: {
    padding: 10,
    minHeight: 40,
    cursor: 'pointer',
    position: 'relative',
    overflow: 'visible',
  },
  timer: {
    position: 'absolute',
    top: -7,
    right: 10,
  },
};

const CoachingItem = ({ item, hideTimer, classes }) => {
  const end =
    typeof item.end === 'object' && item.end
      ? String(
          Math.round(item.end.getTime() / 1000) +
            item.end.getTimezoneOffset() * 60
        )
      : item.end;
  return (
    <Card marginDisabled className={classes.listItem}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <DefaultText lowercase>
            <div
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                fontSize: 16,
              }}
            >
              {item.title}
            </div>
          </DefaultText>
        </Grid>
        {!hideTimer && (
          <div className={classes.timer}>
            <TimerTag date={end} overtime round />
          </div>
        )}
      </Grid>
    </Card>
  );
};

export default withStyles(styles)(CoachingItem);
