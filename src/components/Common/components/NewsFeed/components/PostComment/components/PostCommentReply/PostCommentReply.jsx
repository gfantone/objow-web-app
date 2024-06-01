import React, { useState, useRef, useEffect, useContext } from 'react';
import Formsy from 'formsy-react';
import { Grid, CardMedia, TextField, IconButton } from '@material-ui/core';
import { I18nWrapper } from '../../../../../../../';
import {
  Card,
  DefaultText,
  Dialog,
  Avatar,
  RichText,
  RichTextField,
  ProgressButton,
  FileInput,
  HiddenInput,
  PostCommentForm,
  Loader,
  TimeAgo,
  Tooltip,
} from '../../../../../';
import { PostCommentContent } from '../../components';
import { LikesAvatars } from '../../../../../';
import { LikeList } from '../../../LikeList';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faImage,
  faPlayCircle,
  faComment,
  faThumbsUp,
  faClock,
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';
import { useIntl, injectIntl } from 'react-intl';

import _ from 'lodash';

const styles = {
  dialog: {
    width: 500,
  },
  iconButton: {
    width: 40,
    height: 40,
  },
  textField: {
    width: '100%',
  },
  commentButton: {
    cursor: 'pointer',
  },

  subCommentWrapper: {
    marginLeft: 50,
    marginBottom: 20,
  },
  commentReactionSeparator: {
    userSelect: 'none',
    color: '#ccc',
  },
  link: {
    textDecoration: 'none',
    cursor: 'pointer',
    '&:hover p': {
      color: 'rgb(15,111,222)',
      textDecoration: 'underline',
    },
  },
};

const PostCommentReply = ({
  classes,
  reply: replyInput,
  onLike,
  onDislike,
  onDelete,
  onReport,
  onUpdate,
  ...props
}) => {
  const { account } = props.accountDetail;
  const context = useContext(I18nWrapper.Context);
  const timeAgo = new TimeAgo(context.locale);
  const [reply, setReply] = useState(replyInput);
  const [likesCount, setLikesCount] = useState(reply.likes_count);
  const [likeState, setLikeState] = useState(reply.current_user_like);
  const [likes, setLikes] = useState(reply.likes);
  const [initialized, setInitialized] = useState(false);
  const [likeListOpen, setLikeListOpen] = useState(false);
  const isAuthor =
    account.id === reply.author.id || _.get(account, 'role.code') === 'A';
  const intl = useIntl();

  const date = reply.date.toDate();

  useEffect(() => {
    setReply(replyInput);
    setLikesCount(replyInput.likes_count);
    setLikeState(replyInput.current_user_like);
    setLikes(replyInput.likes);
  }, [replyInput]);

  const commentLike = (state) => {
    setLikeState(state);
    setLikesCount(state ? likesCount + 1 : likesCount - 1);
    setLikes(
      state
        ? [...likes, { user: account }]
        : likes.filter((like) => like.id !== account.id),
    );

    if (state) {
      onLike(reply.id);
    } else {
      onDislike(reply.id);
    }
  };

  const updateComment = (reply) => {
    onUpdate(reply);
    setReply(reply);
  };
  const reportWarning =
    _.get(account, 'role.code') === 'A' && reply.report_count > 0;
  return (
    <div>
      <Grid container spacing={1} justifyContent="flex-end">
        <PostCommentContent
          comment={reply}
          onDelete={onDelete}
          onReport={onReport}
          isAuthor={isAuthor}
          onUpdate={updateComment}
        />
        <Grid item xs={12}>
          <Grid container spacing={1} justifyContent="flex-end">
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs container>
                  <Grid item style={{ marginLeft: 50 }}>
                    {reportWarning ? (
                      <Tooltip
                        title={
                          reportWarning
                            ? intl.formatMessage({
                                id: 'newsfeed.reported_comment',
                              })
                            : null
                        }
                      >
                        <div>
                          <DefaultText
                            lowercase
                            style={{ fontSize: 12, color: '#f44336' }}
                          >
                            <FontAwesomeIcon
                              icon={faExclamationTriangle}
                              style={{ marginRight: 5 }}
                            />
                            {timeAgo.format(date, 'twitter')}
                          </DefaultText>
                        </div>
                      </Tooltip>
                    ) : (
                      <DefaultText lowercase style={{ fontSize: 12 }}>
                        <FontAwesomeIcon
                          icon={faClock}
                          style={{ marginRight: 5 }}
                        />
                        {timeAgo.format(date, 'twitter')}
                      </DefaultText>
                    )}
                  </Grid>
                </Grid>
                {!reply.id && (
                  <Grid item>
                    <Loader />
                  </Grid>
                )}
                {reply.id && (
                  <React.Fragment>
                    <Grid item>
                      <DefaultText
                        lowercase
                        onClick={() => commentLike(!likeState)}
                        className={classes.commentButton}
                        style={{ color: likeState ? '#00E58D' : '' }}
                      >
                        {intl.formatMessage({ id: 'newsfeed.like' })}
                      </DefaultText>
                    </Grid>
                    {likesCount > 0 && (
                      <React.Fragment>
                        <Grid item className={classes.commentReactionSeparator}>
                          ·
                        </Grid>
                        <Grid item>
                          <Grid
                            container
                            spacing={1}
                            onClick={() => setLikeListOpen(true)}
                            className={classes.link}
                          >
                            <Grid item>
                              <DefaultText lowercase>
                                <FontAwesomeIcon icon={faThumbsUp} />
                              </DefaultText>
                            </Grid>
                            <Grid item>
                              <LikesAvatars likes={likes} limit={3} />
                            </Grid>
                          </Grid>
                        </Grid>
                      </React.Fragment>
                    )}
                  </React.Fragment>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <LikeList open={likeListOpen} likes={likes} setOpen={setLikeListOpen} />
    </div>
  );
};

const mapStateToProps = ({ accountDetail }) => ({
  accountDetail,
});

export default connect(mapStateToProps)(withStyles(styles)(PostCommentReply));
