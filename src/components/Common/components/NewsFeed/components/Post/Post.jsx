import React, { useEffect, useContext, useRef } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Grid } from '@material-ui/core';
import {
  Card,
  DefaultText,
  Avatar,
  PostCommentForm,
  PostComment,
  Loader,
  TimeAgo,
  Chip,
  Tooltip,
  BlueText,
} from '../../../../components';
import { I18nWrapper } from '../../../../../';
import {
  LikesAvatars,
  PostMenu,
  PostFormDialog,
  LinkPreview,
  Content,
  LikeList,
} from '../../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faThumbsUp,
  faTrash,
  faEdit,
  faFlag,
  faExclamationTriangle,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import {
  faThumbsUp as faThumbsUpEmpty,
  faComment as faCommentEmpty,
  faClock,
} from '@fortawesome/free-regular-svg-icons';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useIntl } from 'react-intl';
import api from '../../../../../../data/api/api';
import _ from 'lodash';

const styles = {
  card: {
    borderRadius: 10,
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
  image: {
    width: '100%',
  },
  gifImage: {
    // maxWidth: '500px',
    // maxHeight: '500px',
    width: '100%',
    // height: 'auto',
  },
  postText: {
    padding: 10,
  },
  filterChip: {
    fontSize: 10,
    background: 'transparent',
    color: '#333',
    padding: '0 4px',
    height: 'auto',
    marginTop: '-3px',
    textTransform: 'none',
  },
  content: {
    background: 'white',
  },
  buttonWrapper: {
    padding: 5,
    alignItems: 'center',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#f5f5f5',
    },
    borderRadius: 10,
  },
};

const useStyles = makeStyles((theme) => {
  return {
    buttonText: {
      fontSize: 18,
      color: '#757575',
      '&.active': {
        color: theme.palette.primary.main,
      },
    },
    buttonIcon: {
      fontSize: 18,
      color: '#757575',
      marginRight: 10,
      '&.active': {
        color: theme.palette.primary.main,
      },
    },
  };
});

const Post = ({
  post: postInput,
  classes,
  onLike,
  onDislike,
  onReport,
  onDelete,
  onUpdate,
  onCommentCreate,
  onCommentDelete,
  onCommentLike,
  onCommentDislike,
  onCommentReport,
  onCommentUpdate,
  commentCreateSuccess,
  commentLikeSuccess,
  commentDeleteSuccess,
  ...props
}) => {
  const intl = useIntl();
  const context = useContext(I18nWrapper.Context);
  const themeClasses = useStyles();
  const timeAgo = new TimeAgo(context.locale);
  const { account } = props.accountDetail;
  const [edit, setEdit] = React.useState(false);
  const [post, setPost] = React.useState(postInput);
  const [imagePath, setImagePath] = React.useState();
  const [videoPath, setVideoPath] = React.useState();
  const [filePath, setFilePath] = React.useState();
  const [gifPath, setGifPath] = React.useState();
  const [likeState, setLikeState] = React.useState(post.current_user_like);
  const [likesCount, setLikesCount] = React.useState(post.likes_count);
  const [likes, setLikes] = React.useState(post.likes);
  const [initialized, setInitialized] = React.useState(false);
  const [commentFormDisplay, setCommentFormDisplay] = React.useState(false);
  const [comments, setComments] = React.useState();
  const [initialComments, setInitialComments] = React.useState([]);
  const [commentsCount, setCommentsCount] = React.useState(post.comments_count);
  const [likeListOpen, setLikeListOpen] = React.useState(false);
  const date = post.date.toDate();
  const isAuthor =
    account.id === post.author.id || _.get(account, 'role.code') === 'A';
  const menuEntries = _.compact([
    isAuthor
      ? {
          title: intl.formatMessage({ id: 'common.delete' }),
          onClick: () => onDelete(post.id),
          icon: <FontAwesomeIcon icon={faTrash} />,
        }
      : null,
    isAuthor
      ? {
          title: intl.formatMessage({ id: 'common.edit' }),
          onClick: () => setEdit(true),
          icon: <FontAwesomeIcon icon={faEdit} />,
        }
      : null,
    !isAuthor
      ? {
          title: intl.formatMessage({ id: 'common.report' }),
          onClick: () => onReport(post.id),
          icon: <FontAwesomeIcon icon={faFlag} />,
        }
      : null,
  ]);

  const getComments = () => {
    api.posts.comments(post.id).then((response) => {
      if (initialComments.length === 0) {
        setInitialComments(response.data);
        setComments(response.data);
      } else {
        setComments([
          ..._.orderBy(
            response.data.filter(
              (comment) =>
                initialComments.map((c) => c.id).indexOf(comment.id) < 0
            ),
            ['id'],
            ['desc']
          ),
          ...response.data.filter(
            (comment) =>
              initialComments.map((c) => c.id).indexOf(comment.id) >= 0
          ),
        ]);
      }
    });
  };

  useEffect(() => {
    if (commentFormDisplay && !comments) {
      getComments();
    }
  }, [commentFormDisplay]);

  useEffect(() => {
    if (!initialized) {
      setInitialized(true);
    }
    if (initialized) {
      if (likeState) {
        onLike(post.id);
        setLikesCount(likesCount + 1);
        setLikes([{ user: account }, ...likes]);
      } else {
        onDislike(post.id);
        setLikesCount(likesCount - 1);
        setLikes(_.filter(likes, (like) => like.user.id !== account.id));
      }
    }
  }, [likeState]);

  const commentCreate = (postId, comment) => {
    onCommentCreate(postId, comment);
    if (!comment.parent) {
      setComments(
        comments
          ? [Object.assign({}, comment, { date: Date.now() }), ...comments]
          : [comment]
      );
    }
  };

  const commentDelete = (commentId) => {
    onCommentDelete(commentId);
    setComments(
      comments.filter((comment) => {
        if (comment.id !== commentId) {
          return Object.assign({}, comment, {
            comments: comment.replies.filter((reply) => reply.id !== commentId),
          });
        }
      })
    );
  };

  const handleUpdate = (model) => {
    const newPost = Object.assign({}, post, model);
    setPost(newPost);
    onUpdate(newPost);
    setEdit(false);
  };
  useEffect(() => {
    if (post.image) {
      if (typeof post.image === 'string') {
        setImagePath(post.image);
      } else {
        const reader = new FileReader();
        reader.onloadend = function (e) {
          setImagePath(reader.result);
        }.bind(this);
        reader.readAsDataURL(post.image);
      }
    }
    if (post.video) {
      if (typeof post.video === 'string') {
        setVideoPath(post.video);
      } else {
        const reader = new FileReader();
        reader.onloadend = function (e) {
          setVideoPath(reader.result);
        }.bind(this);
        reader.readAsDataURL(post.video);
      }
    }
    if (post.file) {
      if (typeof post.file === 'string' || post.file.name) {
        setFilePath(post.file);
      } else {
        const reader = new FileReader();
        reader.onloadend = function (e) {
          setFilePath(reader.result);
        }.bind(this);
        reader.readAsDataURL(post.file);
      }
    }
    if (post.gif) {
      if (typeof post.gif === 'string') {
        setGifPath(post.gif);
      } else {
        setGifPath(_.get(post.gif, 'images.fixed_height.url'));
      }
    }
  }, [post]);

  useEffect(() => {
    if (commentCreateSuccess) {
      getComments();
    }
  }, [commentCreateSuccess]);

  useEffect(() => {
    if (commentLikeSuccess) {
      getComments();
    }
  }, [commentLikeSuccess]);

  useEffect(() => {
    if (commentDeleteSuccess) {
      getComments();
    }
  }, [commentDeleteSuccess]);

  useEffect(() => {
    const newCommentsCount = comments
      ? comments.length +
        _.sum(comments.map((c) => (c.replies ? c.replies.length : 0)))
      : post.comments_count;
    if (newCommentsCount !== commentsCount) {
      setCommentsCount(newCommentsCount);
    }
  }, [comments]);

  const hasProfile = (user) =>
    _.get(user, 'role_code') === 'C' && _.get(user, 'team');

  const goToUserProfile = (user) => {
    if (hasProfile(user)) {
      props.history.push(
        `/teams/${user.team.id}/collaborators/${user.id}/detail`
      );
    }
  };
  const reportWarning =
    _.get(account, 'role.code') === 'A' && post.report_count > 0;

  return (
    <div>
      <Card marginDisabled className={classes.card}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Grid container spacing={2} className={classes.postText}>
              <Grid item>
                <span
                  onClick={() => goToUserProfile(post.author)}
                  className={
                    hasProfile(post.author) ? classes.link : classes.noLink
                  }
                >
                  <Avatar
                    src={post.author.photo}
                    fallbackName={post.author.fullname}
                  />
                </span>
              </Grid>

              <Grid item xs container direction='column'>
                <Grid item>
                  <Grid container>
                    <Grid item>
                      <span
                        onClick={() => goToUserProfile(post.author)}
                        className={
                          hasProfile(post.author)
                            ? classes.link
                            : classes.noLink
                        }
                      >
                        <DefaultText lowercase style={{ fontSize: 16 }}>
                          {post.author.fullname}
                        </DefaultText>
                      </span>
                    </Grid>
                    {post.visibility?.role !== null && (
                      <Grid item style={{ marginLeft: 5 }}>
                        <Tooltip
                          title={intl
                            .formatMessage({
                              id: 'newsfeed.post_visibility_role_tooltip',
                            })
                            .format(
                              intl.formatMessage({
                                id: `roles.${post.visibility?.role_code}`,
                              })
                            )}
                        >
                          <BlueText>
                            <FontAwesomeIcon icon={faInfoCircle} />
                          </BlueText>
                        </Tooltip>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
                {post.author.title && (
                  <Grid item>
                    <DefaultText
                      lowercase
                      style={{ fontSize: 12, marginBottom: 5 }}
                    >
                      {post.author.title}
                    </DefaultText>
                  </Grid>
                )}
                <Grid item>
                  <Grid container style={{ alignItems: 'center' }} spacing={1}>
                    <Grid item>
                      {reportWarning ? (
                        <Tooltip
                          title={
                            reportWarning
                              ? intl.formatMessage({
                                  id: 'newsfeed.reported_post',
                                })
                              : null
                          }
                        >
                          <div>
                            <DefaultText
                              lowercase
                              style={{ fontSize: 11, color: '#f44336' }}
                            >
                              <FontAwesomeIcon
                                icon={faExclamationTriangle}
                                style={{ marginRight: 5 }}
                              />
                              {timeAgo.format(date)}
                            </DefaultText>
                          </div>
                        </Tooltip>
                      ) : (
                        <DefaultText lowercase style={{ fontSize: 11 }}>
                          <FontAwesomeIcon
                            icon={faClock}
                            style={{ marginRight: 5 }}
                          />
                          {timeAgo.format(date)}
                        </DefaultText>
                      )}
                    </Grid>

                    <Grid item style={{ marginTop: 2 }}>
                      <Chip
                        size='small'
                        label={
                          _.get(post, 'visibility.all')
                            ? intl.formatMessage({
                                id: 'newsfeed.for_everybody',
                              })
                            : _.get(post, 'visibility.team.name') ||
                              _.get(post, 'visibility.team_group.name')
                        }
                        style={{
                          borderColor:
                            _.get(post, 'visibility.team.color') || '#333',
                        }}
                        variant='outlined'
                        className={classes.filterChip}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid item>
                  <PostMenu entries={menuEntries} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <div className={classes.postText} style={{ paddingBottom: 0 }}>
              <Content
                content={post.description}
                seeMoreClass={classes.content}
              />
            </div>
          </Grid>
          {post.image && (
            <Grid item xs={12}>
              <img src={imagePath} className={classes.image} />
            </Grid>
          )}
          {post.video && (
            <Grid item xs={12}>
              <video width='100%' controls>
                <source src={videoPath} type='video/mp4' />
              </video>
            </Grid>
          )}
          {post.gif && (
            <Grid
              item
              xs={12}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <img src={gifPath} className={classes.gifImage} />
            </Grid>
          )}

          {filePath && (
            <Grid item xs={12}>
              <LinkPreview
                openGraph={{
                  url: typeof filePath === 'string' ? filePath : null,
                  title: _.get(filePath, 'name') || _.last(filePath.split('/')),
                }}
              />
            </Grid>
          )}
          {post.link_preview && (
            <Grid item xs={12}>
              <LinkPreview openGraph={post.link_preview} />
            </Grid>
          )}
          {post.embed && (
            <Grid item xs={12}>
              <iframe
                width='100%'
                height={500}
                src={post.embed}
                frameBorder='0'
                allowFullScreen
              />
            </Grid>
          )}
          {(commentsCount > 0 || likes.length > 0) && (
            <Grid item xs={12}>
              <div style={{ paddingLeft: 10 }}>
                <Grid
                  container
                  spacing={2}
                  style={{
                    justifyContent: 'space-between',
                    paddingRight: 25,
                    paddingLeft: 15,
                  }}
                >
                  <Grid item>
                    {likes.length > 0 && (
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

                        <Grid item style={{ alignSelf: 'center' }}>
                          <LikesAvatars likes={likes} limit={3} />
                        </Grid>
                      </Grid>
                    )}
                  </Grid>

                  <Grid
                    item
                    onClick={() => setCommentFormDisplay(true)}
                    className={classes.link}
                  >
                    {commentsCount > 0 && account.newsFeedCommentsCreation && (
                      <Grid container spacing={1}>
                        <Grid item>
                          <DefaultText lowercase style={{ fontSize: 12 }}>
                            {commentsCount}{' '}
                            {intl.formatMessage({ id: 'newsfeed.comments' })}
                          </DefaultText>
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              </div>
            </Grid>
          )}
          <div
            style={{
              marginTop: 10,
              borderTop: '1px solid #EBEBEB',
              width: '100%',
              marginLeft: 25,
              marginRight: 25,
            }}
          />

          <Grid item xs={12}>
            <Grid
              container
              spacing={1}
              alignItems='flex-start'
              style={{ padding: '5px 10px' }}
            >
              <Grid
                item
                style={{ width: 'auto' }}
                onClick={() => setLikeState(!likeState)}
              >
                <Grid container className={`${classes.buttonWrapper}`}>
                  <Grid item>
                    <FontAwesomeIcon
                      icon={likeState ? faThumbsUp : faThumbsUpEmpty}
                      className={`${themeClasses.buttonIcon} ${
                        likeState ? 'active' : ''
                      }`}
                    />
                  </Grid>
                  <Grid item>
                    <DefaultText lowercase>
                      <span
                        className={`${themeClasses.buttonText} ${
                          likeState ? 'active' : ''
                        }`}
                      >
                        Like
                      </span>
                    </DefaultText>
                  </Grid>
                </Grid>
              </Grid>
              {account.newsFeedCommentsCreation && (
                <Grid
                  item
                  style={{ width: 'auto' }}
                  onClick={() => setCommentFormDisplay(true)}
                >
                  <Grid container className={classes.buttonWrapper}>
                    <Grid item>
                      <FontAwesomeIcon
                        icon={faCommentEmpty}
                        className={`${themeClasses.buttonIcon}`}
                      />
                    </Grid>
                    <Grid item>
                      <DefaultText lowercase>
                        <span className={`${themeClasses.buttonText}`}>
                          {intl.formatMessage({
                            id: 'newsfeed.comment_action',
                          })}
                        </span>
                      </DefaultText>
                    </Grid>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>
          {commentFormDisplay && (
            <React.Fragment>
              <Grid item xs={12}>
                <div className={classes.postText}>
                  <PostCommentForm
                    onSubmit={(model) => commentCreate(post.id, model)}
                  />
                </div>
              </Grid>
              <Grid item xs={12}>
                <div className={classes.postText}>
                  {!comments && <Loader centered />}
                  {comments && (
                    <Grid container spacing={2}>
                      {comments.map((comment, index) => (
                        <Grid item xs={12} key={`post-${index}`}>
                          <PostComment
                            comment={comment}
                            onSubmit={(model) => commentCreate(post.id, model)}
                            onLike={onCommentLike}
                            onDislike={onCommentDislike}
                            onDelete={commentDelete}
                            onUpdate={onCommentUpdate}
                            onReport={onCommentReport}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  )}
                </div>
              </Grid>
            </React.Fragment>
          )}
        </Grid>
      </Card>
      <PostFormDialog
        dialogOpen={edit}
        setDialogOpen={setEdit}
        onSubmit={handleUpdate}
        post={post}
        title={intl.formatMessage({ id: 'newsfeed.edit_post_title' })}
        {...props}
      />
      <LikeList open={likeListOpen} likes={likes} setOpen={setLikeListOpen} />
    </div>
  );
};

const mapStateToProps = ({ accountDetail }) => ({
  accountDetail,
});

export default connect(mapStateToProps)(withStyles(styles)(withRouter(Post)));
