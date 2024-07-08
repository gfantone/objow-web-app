import React, { useState, useRef, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Formsy from 'formsy-react';
import { Grid, CardMedia, IconButton } from '@material-ui/core';
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
  Linkify,
  TextField,
  Button,
} from '../../../../../../components';
import { PostMenu, Content } from '../../../../../../components';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEdit,
  faImage,
  faPlayCircle,
  faTrash,
  faFlag,
} from '@fortawesome/free-solid-svg-icons';
import { useIntl, injectIntl } from 'react-intl';
import _ from 'lodash';
import { is } from 'date-fns/locale';

const styles = {
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
  commentWrapper: {
    padding: '5px 15px',
    background: '#f5f5f5',
    borderRadius: 10,
    height: '100%',
  },
  commentContent: {
    background: '#f5f5f5',
  },
  commentField: {
    '& .MuiInput-underline:before, .MuiInput-underline:after': {
      display: 'none',
    },
  },
};

const PostCommentContent = ({
  classes,
  comment,
  onDelete,
  onReport,
  isAuthor,
  onUpdate,
  ...props
}) => {
  const intl = useIntl();
  const [edit, setEdit] = useState(false);
  const [content, setContent] = useState(comment.content);

  useEffect(() => {
    setContent(comment.content);
  }, [comment]);

  const menuEntries = _.compact([
    isAuthor
      ? {
          title: intl.formatMessage({ id: 'common.delete' }),
          onClick: () => onDelete(comment.id),
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
          onClick: () => onReport(comment.id),
          icon: <FontAwesomeIcon icon={faFlag} />,
        }
      : null,
  ]);

  const hasProfile = (user) =>
    _.get(user, 'role_code') === 'C' && _.get(user, 'team');

  const goToUserProfile = (user) => {
    if (hasProfile(user)) {
      props.history.push(
        `/teams/${user.team.id}/collaborators/${user.id}/detail`
      );
    }
  };

  return (
    <Grid item xs={12}>
      <Grid container spacing={1}>
        <Grid item>
          <span
            onClick={() => goToUserProfile(comment.author)}
            className={
              hasProfile(comment.author) ? classes.link : classes.noLink
            }
          >
            <Avatar
              src={comment.author.photo}
              fallbackName={comment.author.fullname}
            />
          </span>
        </Grid>
        <Grid item xs>
          <div className={classes.commentWrapper}>
            <Grid container>
              <Grid item xs={12} container>
                <Grid item xs>
                  <Grid container>
                    <Grid item xs={12}>
                      <span
                        onClick={() => goToUserProfile(comment.author)}
                        className={
                          hasProfile(comment.author)
                            ? classes.link
                            : classes.noLink
                        }
                      >
                        <DefaultText bold>
                          {comment.author.fullname}
                        </DefaultText>
                      </span>
                    </Grid>
                    <Grid item xs={12}>
                      {comment.author.title && (
                        <Grid item>
                          <DefaultText
                            lowercase
                            style={{
                              fontSize: 11,
                              marginBottom: 5,
                              color: '#888',
                            }}
                          >
                            {comment.author.title}
                          </DefaultText>
                        </Grid>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <PostMenu entries={menuEntries} />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                {edit && (
                  <Formsy
                    onValidSubmit={(model) => {
                      onUpdate(Object.assign({}, comment, model));
                      setEdit(false);
                    }}
                  >
                    <Grid container spacing={1}>
                      <Grid item xs={12} className={classes.commentField}>
                        <TextField
                          name='content'
                          initial={content}
                          updateInitial
                          multiline
                          lowercase
                          style={{ width: '100%' }}
                          onChange={(value) => setContent(value)}
                          placeholder={intl.formatMessage({
                            id: 'newsfeed.comment_placeholder',
                          })}
                        />
                      </Grid>
                      {content && (
                        <Grid
                          item
                          xs={12}
                          container
                          spacing={1}
                          justifyContent='flex-end'
                        >
                          <Grid item>
                            <ProgressButton
                              type='submit'
                              text={intl.formatMessage({ id: 'common.submit' })}
                            />
                          </Grid>
                          <Grid item>
                            <Button
                              onClick={() => setEdit(false)}
                              color='secondary'
                            >
                              {intl.formatMessage({ id: 'common.cancel' })}
                            </Button>
                          </Grid>
                        </Grid>
                      )}
                    </Grid>
                  </Formsy>
                )}

                {!edit && (
                  <Content
                    content={comment.content}
                    seeMoreClass={classes.commentContent}
                  />
                )}
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(withRouter(PostCommentContent));
