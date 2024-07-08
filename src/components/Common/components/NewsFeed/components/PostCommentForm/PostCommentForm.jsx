import React, { useState, useRef, useEffect } from 'react';
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
  TextField,
} from '../../..';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { useIntl, injectIntl } from 'react-intl';

const styles = {
  newPostButton: {
    padding: '5px 15px',
    border: '1px solid #ccc',
    borderRadius: 25,
    '& .MuiInput-underline:before, .MuiInput-underline:after': {
      display: 'none',
    },
  },
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
};

const PostCommentForm = ({
  loading: creationLoading,
  classes,
  onSubmit,
  created,
  ...props
}) => {
  const { account } = props.accountDetail;
  const [content, setContent] = useState('');
  const intl = useIntl();
  const submitComment = (model) => {
    onSubmit(
      Object.assign({}, model, {
        author: { fullname: account.fullname, photo: account.photo },
      }),
    );
    setContent('');
  };
  return (
    <div>
      <Grid container spacing={1}>
        <Grid item>
          <Avatar src={account.photo} fallbackName={account.fullname} />
        </Grid>
        <Grid item xs>
          <div>
            <Formsy onValidSubmit={submitComment}>
              <Grid container spacing={1} justifyContent="flex-end">
                <Grid item xs={12}>
                  <div className={classes.newPostButton}>
                    <TextField
                      name="content"
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
                  </div>
                </Grid>
                {content && (
                  <Grid item>
                    <ProgressButton
                      type="submit"
                      loading={creationLoading}
                      text={intl.formatMessage({ id: 'common.submit' })}
                    />
                  </Grid>
                )}
              </Grid>
            </Formsy>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = ({ accountDetail }) => ({
  accountDetail,
});

export default connect(mapStateToProps)(withStyles(styles)(PostCommentForm));
