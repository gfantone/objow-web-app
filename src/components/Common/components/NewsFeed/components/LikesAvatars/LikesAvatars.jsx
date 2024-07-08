import React from 'react';
import { AvatarGroup } from '@material-ui/lab';
import { Avatar } from '../../..';
import { withStyles } from '@material-ui/core/styles';
import _ from 'lodash';

const styles = {
  avatarGroup: {},
  avatar: {
    width: 20,
    height: 20,
  },
};

const LikesAvatars = ({ likes, limit, classes, ...props }) => {
  const avatarLimit = limit || 6;

  return (
    <AvatarGroup className={classes.avatarGroup} max={15}>
      {_.take(likes, avatarLimit).map((like, index) => (
        <Avatar
          src={_.get(like, 'user.photo')}
          entityId={_.get(like, 'user.id')}
          className={classes.avatar}
          fallbackName={_.get(like, 'user.fullname')}
          fontSize={10}
          color={'#555'}
          tooltip={_.get(like, 'user.fullname')}
        />
      ))}

      {likes.length > avatarLimit && (
        <Avatar
          rawFallbackName={`+${likes.length - avatarLimit}`}
          className={classes.avatar}
          backgroundColor={'white'}
          fontSize={10}
          color={'#555'}
        />
      )}
    </AvatarGroup>
  );
};

export default withStyles(styles)(LikesAvatars);
