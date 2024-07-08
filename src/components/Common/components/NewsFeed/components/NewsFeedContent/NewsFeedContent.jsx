import React, { useState, useEffect, useRef } from 'react';
import { Grid } from '@material-ui/core';
import Post from '../Post/Post';
import EmptyState from '../../../EmptyState/EmptyState';
import DefaultText from '../../../Texts/components/DefaultText/DefaultText';
import { DefaultTitle } from '../../../../components';
import Loader from '../../../Loader/Loader';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { injectIntl } from 'react-intl';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';

import * as newsFeedListActions from '../../../../../../services/NewsFeed/NewsFeedList/actions';
import * as newsFeedCreationActions from '../../../../../../services/NewsFeed/NewsFeedCreation/actions';
import * as newsFeedDeleteActions from '../../../../../../services/NewsFeed/NewsFeedDelete/actions';
import * as newsFeedUpdateActions from '../../../../../../services/NewsFeed/NewsFeedUpdate/actions';
import * as newsFeedLikeActions from '../../../../../../services/NewsFeed/NewsFeedLike/actions';
import * as newsFeedReportActions from '../../../../../../services/NewsFeed/NewsFeedReport/actions';
import * as newsFeedCommentCreationActions from '../../../../../../services/NewsFeed/NewsFeedCommentCreation/actions';
import * as newsFeedCommentDeleteActions from '../../../../../../services/NewsFeed/NewsFeedCommentDelete/actions';
import * as newsFeedCommentLikeActions from '../../../../../../services/NewsFeed/NewsFeedCommentLike/actions';
import * as newsFeedCommentReportActions from '../../../../../../services/NewsFeed/NewsFeedCommentReport/actions';
import * as newsFeedCommentUpdateActions from '../../../../../../services/NewsFeed/NewsFeedCommentUpdate/actions';

const NewsFeedContent = ({ smallPages, ...props }) => {
  const { posts, loading } = props.newsFeedList;
  const { intl } = props;
  const [postsPage, setPostsPage] = useState(1);
  const [lastPageState, setLastPageState] = useState(false);
  const [resetPosts, setResetPosts] = useState(false);
  const [postList, setPostList] = useState([]);

  const pageRef = useRef(postsPage);
  const lastPageStateRef = useRef(lastPageState);

  useEffect(() => {
    pageRef.current = postsPage;
  }, [postsPage]);

  useEffect(() => {
    lastPageStateRef.current = lastPageState;
  }, [lastPageState]);

  const loadNextPage = () => {
    props.newsFeedListActions.getNewsFeedList({
      page: pageRef.current,
      smallPages,
    });
  };

  const handleObserver = () => {
    if (!loading && !lastPageStateRef.current && pageRef.current) {
      props.newsFeedListActions.getNewsFeedList({
        page: pageRef.current,
        smallPages,
      });
    }
  };

  const observer = new IntersectionObserver(handleObserver);

  useEffect(() => {
    loadNextPage();
  }, []);

  useEffect(() => {
    if (!loading && posts) {
      props.newsFeedListActions.getNewsFeedListClear();
      if (resetPosts) {
        setPostList(posts);
        setPostsPage(2);
      } else {
        setPostList([...postList, ...posts]);
        setPostsPage(postsPage + 1);
      }
    }
  }, [posts]);

  const handleHasError = () => {
    const { hasError } = props.newsFeedList;
    if (hasError) {
      props.newsFeedListActions.getNewsFeedListClear();
      setLastPageState(true);
    }
  };

  const handleUpdateSuccess = () => {
    const { success: updateSuccess } = props.newsFeedUpdate;
    if (updateSuccess) {
      props.newsFeedUpdateActions.updateNewsFeedClear();
      toast.success(intl.formatMessage({ id: 'newsfeed.post_update_success' }));
    }
  };

  const handleDeleteSuccess = () => {
    const { success: deleteSuccess } = props.newsFeedDelete;

    if (deleteSuccess) {
      props.newsFeedDeleteActions.deleteNewsFeedClear();
      setPostList([]);
      setPostsPage(1);
      props.newsFeedListActions.getNewsFeedList({ smallPages });
      toast.success(intl.formatMessage({ id: 'newsfeed.post_delete_success' }));
    }
  };
  const handleReportSuccess = () => {
    const { success: reportSuccess } = props.newsFeedReport;
    if (reportSuccess) {
      props.newsFeedReportActions.reportNewsFeedClear();
      toast.success(intl.formatMessage({ id: 'newsfeed.post_report_success' }));
      setPostList([]);
      setPostsPage(1);
      props.newsFeedListActions.getNewsFeedList({ smallPages });
    }
  };

  const handleReportCommentSuccess = () => {
    const { success: reportCommentSuccess } = props.newsFeedCommentReport;
    if (reportCommentSuccess) {
      props.newsFeedCommentReportActions.reportNewsFeedCommentClear();
      toast.success(intl.formatMessage({ id: 'newsfeed.post_report_success' }));
      setPostList([]);
      setPostsPage(1);
      props.newsFeedListActions.getNewsFeedList({ smallPages });
    }
  };

  const handleCommentSuccess = () => {
    const { success: commentSuccess } = props.newsFeedCommentCreation;
    if (commentSuccess) {
      props.newsFeedCommentCreationActions.createNewsFeedCommentClear();
      toast.success(
        intl.formatMessage({ id: 'newsfeed.comment_creation_success' })
      );
    }
  };

  const handleDeleteCommentSuccess = () => {
    const { success: deleteCommentSuccess } = props.newsFeedCommentDelete;
    if (deleteCommentSuccess) {
      props.newsFeedCommentDeleteActions.deleteNewsFeedCommentClear();
      toast.success(
        intl.formatMessage({ id: 'newsfeed.comment_delete_success' })
      );
    }
  };

  const handleUpdateCommentSuccess = () => {
    const { success: updateCommentSuccess } = props.newsFeedCommentUpdate;
    if (updateCommentSuccess) {
      props.newsFeedCommentUpdateActions.updateNewsFeedCommentClear();
      toast.success(
        intl.formatMessage({ id: 'newsfeed.comment_update_success' })
      );
    }
  };

  useEffect(() => {
    handleHasError();
  }, [props.newsFeedList]);

  useEffect(() => {
    handleUpdateSuccess();
  }, [props.newsFeedUpdate]);

  useEffect(() => {
    handleDeleteSuccess();
  }, [props.newsFeedDelete]);

  useEffect(() => {
    handleReportSuccess();
  }, [props.newsFeedReport]);

  useEffect(() => {
    handleReportCommentSuccess();
  }, [props.newsFeedCommentReport]);

  useEffect(() => {
    handleCommentSuccess();
  }, [props.newsFeedCommentCreation]);

  useEffect(() => {
    handleDeleteCommentSuccess();
  }, [props.newsFeedCommentDelete]);

  useEffect(() => {
    handleUpdateCommentSuccess();
  }, [props.newsFeedCommentUpdate]);

  const handleDelete = (postId) => {
    props.newsFeedDeleteActions.deleteNewsFeed(postId);
  };

  const handleLike = (postId) => {
    props.newsFeedLikeActions.likeNewsFeed(postId);
  };

  const handleDislike = (postId) => {
    props.newsFeedLikeActions.likeNewsFeed(postId, false);
  };

  const handleReport = (postId) => {
    props.newsFeedReportActions.reportNewsFeed(postId);
  };

  const handleUpdate = (post) => {
    const data = new FormData();
    if (post.image && !(typeof post.image === 'string')) {
      data.append('image', post.image);
    }

    if (post.video && !(typeof post.video === 'string')) {
      data.append('video', post.video);
    }
    if (post.file && !(typeof post.file === 'string')) {
      data.append('file', post.file);
    }
    if (post.embed) {
      data.append('embed', post.embed);
    }
    if (post.gif) {
      data.append('gif', post.gif);
    }
    data.append('description', post.description);

    const team = _.get(
      post,
      'visibility.team.id',
      _.get(post, 'visibility.team')
    );
    const teamGroup = _.get(
      post,
      'visibility.team_group.id',
      _.get(post, 'visibility.team_group')
    );

    if (team) {
      data.append('team', parseInt(team));
    }

    if (teamGroup) {
      data.append('team_group', parseInt(teamGroup));
    }

    if (post.visibility.role) {
      data.append('role', parseInt(post.visibility.role));
    }

    if (post.visibility.all) {
      data.append('visibility_all', post.visibility.all);
    }

    if (post.link_preview) {
      data.append('link_preview', JSON.stringify(post.link_preview));
    }
    props.newsFeedUpdateActions.updateNewsFeed(post.id, data);
  };

  const handleCommentCreate = (postId, comment) => {
    props.newsFeedCommentCreationActions.createNewsFeedComment(
      postId,
      Object.assign({}, comment, {})
    );
  };

  const handleCommentLike = (commentId) => {
    props.newsFeedCommentLikeActions.likeNewsFeedComment(commentId);
  };

  const handleCommentDislike = (commentId) => {
    props.newsFeedCommentLikeActions.likeNewsFeedComment(commentId, false);
  };

  const handleCommentReport = (commentId) => {
    props.newsFeedCommentReportActions.reportNewsFeedComment(commentId);
  };

  const handleCommentDelete = (commentId) => {
    props.newsFeedCommentDeleteActions.deleteNewsFeedComment(commentId);
  };

  const handleCommentUpdate = (comment) => {
    props.newsFeedCommentUpdateActions.updateNewsFeedComment(comment);
  };

  return (
    <Grid container spacing={3}>
      {!loading && (!postList || !postList.length) && (
        <Grid item xs={12}>
          <EmptyState
            title={intl.formatMessage({ id: 'newsfeed.empty_state_title' })}
            message={intl.formatMessage({ id: 'newsfeed.empty_state_message' })}
          />
        </Grid>
      )}

      {postList && (
        <>
          {postList.map((post, index) => (
            <Grid item xs={12} key={`post-${post.id}`}>
              <Post
                post={post}
                onLike={handleLike}
                onDislike={handleDislike}
                onReport={handleReport}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
                onCommentCreate={handleCommentCreate}
                onCommentLike={handleCommentLike}
                onCommentDislike={handleCommentDislike}
                onCommentReport={handleCommentReport}
                onCommentDelete={handleCommentDelete}
                onCommentUpdate={handleCommentUpdate}
                commentCreateSuccess={handleCommentSuccess}
                commentDeleteSuccess={handleDeleteCommentSuccess}
              />
            </Grid>
          ))}
        </>
      )}
      {!loading && !lastPageState && (
        <Grid item xs={12} container justifyContent='center'>
          <Grid item>
            <DefaultTitle
              isContrast
              lowercase
              style={{ color: 'rgb(15,111,222)', cursor: 'pointer' }}
              onClick={() => loadNextPage()}
            >
              <Grid container justifyContent='center'>
                <Grid item style={{ fontSize: 18 }}>
                  {intl.formatMessage({ id: 'common.see_more' })}
                </Grid>
              </Grid>
            </DefaultTitle>
          </Grid>
        </Grid>
      )}
      {!loading && lastPageState && (
        <Grid item xs={12} container justifyContent='center'>
          <DefaultText isContrast lowercase>
            {intl.formatMessage({ id: 'newsfeed.no_more_posts' })}
          </DefaultText>
        </Grid>
      )}
      {loading && (
        <Grid item xs={12} container justifyContent='center'>
          <Grid container alignItems='center' justifyContent='center'>
            <Grid item>
              <Loader centered />
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

const mapStateToProps = ({
  newsFeedList,
  newsFeedDelete,
  newsFeedLike,
  newsFeedReport,
  newsFeedCommentCreation,
  newsFeedCommentDelete,
  newsFeedCommentReport,
  newsFeedCreation,
  newsFeedUpdate,
  newsFeedCommentUpdate,
}) => ({
  newsFeedList,
  newsFeedDelete,
  newsFeedLike,
  newsFeedReport,
  newsFeedCommentCreation,
  newsFeedCommentDelete,
  newsFeedCommentReport,
  newsFeedCreation,
  newsFeedUpdate,
  newsFeedCommentUpdate,
});
const mapDispatchToProps = (dispatch) => ({
  newsFeedListActions: bindActionCreators(newsFeedListActions, dispatch),
  newsFeedCreationActions: bindActionCreators(
    newsFeedCreationActions,
    dispatch
  ),
  newsFeedDeleteActions: bindActionCreators(newsFeedDeleteActions, dispatch),
  newsFeedLikeActions: bindActionCreators(newsFeedLikeActions, dispatch),
  newsFeedReportActions: bindActionCreators(newsFeedReportActions, dispatch),
  newsFeedCommentCreationActions: bindActionCreators(
    newsFeedCommentCreationActions,
    dispatch
  ),
  newsFeedCommentDeleteActions: bindActionCreators(
    newsFeedCommentDeleteActions,
    dispatch
  ),
  newsFeedCommentLikeActions: bindActionCreators(
    newsFeedCommentLikeActions,
    dispatch
  ),
  newsFeedCommentReportActions: bindActionCreators(
    newsFeedCommentReportActions,
    dispatch
  ),
  newsFeedUpdateActions: bindActionCreators(newsFeedUpdateActions, dispatch),
  newsFeedCommentUpdateActions: bindActionCreators(
    newsFeedCommentUpdateActions,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(withWidth()(NewsFeedContent)));
