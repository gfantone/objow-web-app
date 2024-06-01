import React, { useState, useRef, useEffect, useContext } from 'react';
import { Grid } from '@material-ui/core';
import {
  DefaultText,
  PostCommentForm,
  Loader,
  TimeAgo,
  Tooltip,
} from '../../..';
import { I18nWrapper } from '../../../../../';
import { PostCommentContent, PostCommentReply } from './components';
import { LikeList } from '../LikeList';
import { LikesAvatars } from '../../..';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faComment,
  faThumbsUp,
  faClock,
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';
import { useIntl } from 'react-intl';
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

const PostComment = ({
  classes,
  comment: commentInput,
  index,
  onSubmit,
  onLike,
  onDislike,
  onReport,
  onDelete,
  onUpdate,
  ...props
}) => {
  const { account } = props.accountDetail;
  const context = useContext(I18nWrapper.Context);
  const timeAgo = new TimeAgo(context.locale);
  const [displaySubCommentForm, setDisplaySubCommentForm] = useState(false);
  const [comment, setComment] = useState(commentInput);
  const [replies, setReplies] = useState(comment.replies);
  const [likes, setLikes] = useState(comment.likes);
  const [likesCount, setLikesCount] = useState(comment.likes_count);
  const [likeState, setLikeState] = useState(comment.current_user_like);
  const [likeListOpen, setLikeListOpen] = useState(false);
  const isAuthor =
    account.id === comment.author.id || _.get(account, 'role.code') === 'A';
  const date = comment.date.toDate();

  const intl = useIntl();

  useEffect(() => {
    setComment(commentInput);
    setReplies(commentInput.replies);
    setLikes(commentInput.likes);
    setLikesCount(commentInput.likes_count);
    setLikeState(commentInput.current_user_like);
  }, [commentInput]);

  // useEffect(() => {
  //     if (!initialized) {
  //         setInitialized(true)
  //     }
  //     if (initialized) {
  //         if (likeState) {
  //             onLike(comment.id)
  //             setLikesCount(likesCount + 1)
  //         } else {
  //             onDislike(comment.id)
  //             setLikesCount(likesCount - 1)
  //         }
  //     }
  // }, [likeState])
  const commentLike = (state) => {
    setLikeState(state);
    setLikesCount(state ? likesCount + 1 : likesCount - 1);
    setLikes(
      state
        ? [...likes, { user: account }]
        : likes.filter((like) => like.user.id !== account.id)
    );
    if (state) {
      onLike(comment.id);
    } else {
      onDislike(comment.id);
    }
  };
  const commentCreate = (comment) => {
    onSubmit(comment);
    setReplies(
      replies
        ? [...replies, Object.assign({}, comment, { date: Date.now() })]
        : [comment]
    );
  };

  const deleteReply = (replyId) => {
    onDelete(replyId);
    setReplies(replies.filter((reply) => reply.id !== replyId));
  };

  const updateComment = (comment) => {
    onUpdate(comment);
    setComment(comment);
  };

  const reportWarning =
    _.get(account, 'role.code') === 'A' && comment.report_count > 0;
  return (
    <div>
      <Grid container spacing={1} justifyContent='flex-end'>
        <PostCommentContent
          comment={comment}
          onDelete={onDelete}
          onReport={onReport}
          isAuthor={isAuthor}
          isAdmin={_.get(account, 'role.code') === 'A'}
          onUpdate={updateComment}
        />
        <Grid item xs={12}>
          <Grid container spacing={1} justifyContent='flex-end'>
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
            {!comment.id && (
              <Grid item>
                <Loader />
              </Grid>
            )}
            {comment.id && (
              <React.Fragment>
                <Grid item>
                  <Grid container spacing={1}>
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
                        <Grid
                          item
                          onClick={() => setLikeListOpen(true)}
                          className={classes.link}
                        >
                          <Grid container spacing={1}>
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
                  </Grid>
                </Grid>

                <Grid item className={classes.commentReactionSeparator}>
                  |
                </Grid>
                <Grid item>
                  <Grid container spacing={1}>
                    <Grid item>
                      <DefaultText
                        lowercase
                        onClick={() => setDisplaySubCommentForm(true)}
                        className={classes.commentButton}
                      >
                        {intl.formatMessage({ id: 'newsfeed.reply' })}
                      </DefaultText>
                    </Grid>
                    {replies && replies.length > 0 && (
                      <React.Fragment>
                        <Grid item className={classes.commentReactionSeparator}>
                          ·
                        </Grid>
                        <Grid item>
                          <Grid container spacing={1}>
                            <Grid item>
                              <DefaultText lowercase>
                                <FontAwesomeIcon icon={faComment} />
                              </DefaultText>
                            </Grid>
                            <Grid item>
                              <DefaultText lowercase>
                                {replies.length}
                              </DefaultText>
                            </Grid>
                          </Grid>
                        </Grid>
                      </React.Fragment>
                    )}
                  </Grid>
                </Grid>
              </React.Fragment>
            )}
          </Grid>
        </Grid>
        {displaySubCommentForm && (
          <Grid item xs={12}>
            <div className={classes.subCommentWrapper}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <PostCommentForm
                    onSubmit={(model) =>
                      commentCreate(
                        Object.assign({}, model, { parent: comment.id })
                      )
                    }
                  />
                </Grid>
                {replies &&
                  replies.map((reply, index) => (
                    <React.Fragment>
                      <Grid item xs={12}>
                        <PostCommentReply
                          reply={reply}
                          onLike={onLike}
                          onDislike={onDislike}
                          onDelete={deleteReply}
                          onUpdate={onUpdate}
                          onReport={onReport}
                        />
                      </Grid>
                    </React.Fragment>
                  ))}
              </Grid>
            </div>
          </Grid>
        )}
      </Grid>
      <LikeList open={likeListOpen} likes={likes} setOpen={setLikeListOpen} />
    </div>
  );
};

const mapStateToProps = ({ accountDetail }) => ({
  accountDetail,
});

export default connect(mapStateToProps)(withStyles(styles)(PostComment));
