import React, { useEffect, useContext, useRef } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Grow from '@mui/material/Grow';
import { Grid, CardMedia, IconButton } from '@material-ui/core';
import {
  Card,
  DefaultText,
  RichText,
  Avatar,
  PostCommentForm,
  PostComment,
  Loader,
  TimeAgo,
  Chip,
  Linkify,
} from '../../../../components';
import { I18nWrapper } from '../../../../../';
import {
  LikesAvatars,
  PostMenu,
  PostFormDialog,
  LinkPreview,
  Content,
} from '../../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faImage,
  faPlayCircle,
  faThumbsUp,
  faComment,
  faTrash,
  faEdit,
} from '@fortawesome/free-solid-svg-icons';
import {
  faThumbsUp as faThumbsUpEmpty,
  faComment as faCommentEmpty,
  faClock,
} from '@fortawesome/free-regular-svg-icons';
import { withStyles } from '@material-ui/core/styles';
import { useIntl } from 'react-intl';
import api from '../../../../../../data/api/api';
import _ from 'lodash';

const styles = (theme) => {
  return {
    card: {
      borderRadius: 10,
      overflow: 'hidden',
    },
    link: {
      textDecoration: 'none',
      cursor: 'pointer',
      '&:hover p': {
        color: 'rgb(15,111,222)',
        textDecoration: 'underline',
      },
    },
    noLink: {
      textDecoration: 'none',
      cursor: 'unset',
    },
    wrapper: {
      position: 'relative',
      paddingBottom: 10,
    },
    banner: {
      height: 60,
      background: theme.palette.secondary.main,
    },
    avatar: {
      position: 'absolute',
      width: 70,
      height: 70,
      left: '50%',
      top: 25,
      transform: 'translateX(-50%)',
      border: '2px solid #fff',
      fontSize: 20,
    },
    userName: {
      textAlign: 'center',
      fontSize: 16,
      fontWeight: 'bold',
    },
    title: {
      textAlign: 'center',
      fontSize: 12,
      color: '#888',
    },
  };
};

const ProfileThumb = ({ classes, ...props }) => {
  const intl = useIntl();
  const { account } = props.accountDetail;

  const hasProfile = (user) =>
    _.get(user, 'role.code') === 'C' && _.get(user, 'team');

  const goToUserProfile = (user) => {
    if (!hasProfile(user)) return;
    props.history.push(
      `/teams/${user.team.id}/collaborators/${user.id}/detail`
    );
  };

  return (
    <div>
      <Card marginDisabled className={classes.card}>
        <div className={classes.wrapper}>
          <a
            href=''
            onClick={() => goToUserProfile(account)}
            className={hasProfile(account) ? classes.link : classes.noLink}
          >
            <Avatar
              src={account.photo}
              onClick={() => goToUserProfile(account)}
              fallbackName={account.fullname}
              className={classes.avatar}
            />
          </a>

          <Grid container spacing={1}>
            <Grid item xs={12} className={classes.banner}></Grid>
            <Grid
              item
              xs={12}
              container
              spacing={0}
              style={{ paddingLeft: 15, paddingRight: 15 }}
            >
              <Grid item xs={12} style={{ marginTop: 40 }}>
                <a
                  href=''
                  onClick={() => goToUserProfile(account)}
                  className={
                    hasProfile(account) ? classes.link : classes.noLink
                  }
                >
                  <DefaultText lowercase className={classes.userName}>
                    {account.fullname}
                  </DefaultText>
                </a>
              </Grid>
              <Grid item xs={12}>
                <DefaultText lowercase className={classes.title}>
                  {account.title}
                </DefaultText>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Card>
    </div>
  );
};

const mapStateToProps = ({ accountDetail }) => ({
  accountDetail,
});

export default connect(mapStateToProps)(
  withStyles(styles)(withRouter(ProfileThumb))
);
