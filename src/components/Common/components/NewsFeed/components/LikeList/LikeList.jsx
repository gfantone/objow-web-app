import React from 'react';
import { Grid } from '@material-ui/core';
import { AvatarGroup } from '@material-ui/lab';
import {
  Collaborator,
  DefaultText,
  Dialog,
  DialogContent,
  DialogTitle,
  Avatar,
} from '../../../../../../components';
import { withStyles } from '@material-ui/core/styles';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import _ from 'lodash';
import { useIntl } from 'react-intl';

const styles = {
  dialog: {
    width: 500,
    minWidth: 500,
  },
  avatar: {
    height: 50,
    width: 50,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userTitle: {
    fontSize: 14,
    color: '#9B9B9B',
  },
};

const LikesList = ({ likes, open, setOpen, classes, width, ...props }) => {
  const isMobile = isWidthDown('sm', width);
  const intl = useIntl();
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      classes={{ paper: isMobile ? '' : classes.dialog }}
    >
      <DialogTitle onClose={() => setOpen(false)}>
        {intl.formatMessage({ id: 'newsfeed.likes_list_title' })}
      </DialogTitle>
      <DialogContent>
        <div style={{ padding: 8 }}>
          <Grid container spacing={3}>
            {likes &&
              likes.map((like, index) => (
                <Grid
                  item
                  xs={12}
                  key={index}
                  style={{
                    borderBottom:
                      index < likes.length ? '1px solid #ccc' : 'none',
                  }}
                >
                  <Grid container alignItems="stretch" spacing={2}>
                    <Grid item>
                      <Avatar
                        src={like.user.photo}
                        className={classes.avatar}
                        entityId={like.user.id}
                        fallbackName={like.user.fullname}
                        fontSize={20}
                      />
                    </Grid>
                    <Grid item xs>
                      <Grid
                        container
                        justifyContent="stretch"
                        spacing={1}
                        alignItems="center"
                        style={{ height: '100%' }}
                      >
                        <Grid item xs={12}>
                          <div>
                            <DefaultText lowercase className={classes.userName}>
                              {like.user.fullname}
                            </DefaultText>
                          </div>
                          {like.user.title && (
                            <div>
                              <DefaultText
                                lowercase
                                className={classes.userTitle}
                              >
                                {like.user.title}
                              </DefaultText>
                            </div>
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              ))}
          </Grid>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default withStyles(styles)(withWidth()(LikesList));
