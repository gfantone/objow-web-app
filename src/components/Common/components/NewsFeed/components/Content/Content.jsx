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
import { PostMenu } from '../../../../../../components';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEdit,
  faImage,
  faPlayCircle,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { useIntl, injectIntl } from 'react-intl';
import _ from 'lodash';

const styles = {
  seeMore: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    paddingLeft: 5,
    textAlign: 'right',
    paddingBottom: 5,
    cursor: 'pointer',
    '&:hover p': {
      color: 'rgb(15,111,222)',
      textDecoration: 'underline',
    },
  },
};

const Content = ({ classes, content, seeMoreClass, ...props }) => {
  const intl = useIntl();
  const [seeMore, setSeeMore] = React.useState(false);
  const descriptionWrapper = useRef();

  const descriptionHeightLimit = 68;
  const [initialized, setInitialized] = useState(false);
  const [descriptionIsLong, setDescriptionIsLong] = useState(
    descriptionWrapper.current &&
      descriptionWrapper.current.clientHeight >= descriptionHeightLimit
  );

  useEffect(() => {
    if (initialized) return;
    if (!descriptionWrapper.current) return;

    setInitialized(true);
    setDescriptionIsLong(
      descriptionWrapper.current &&
        descriptionWrapper.current.clientHeight >= descriptionHeightLimit
    );
  }, []);
  return (
    <div
      style={{
        paddingTop: 0,
        paddingBottom: 25,
        maxHeight:
          seeMore && descriptionIsLong ? 'none' : descriptionHeightLimit,
        position: 'relative',
        overflow: 'hidden',
      }}
      ref={descriptionWrapper}
    >
      {content.split('\n').map((line) => (
        <React.Fragment>
          <Grid container spacing={1}>
            <Grid item xs={12} style={{ overflowWrap: 'anywhere' }}>
              <div>
                <Linkify>
                  <DefaultText lowercase>{line}</DefaultText>
                </Linkify>
              </div>
            </Grid>
          </Grid>
        </React.Fragment>
      ))}
      {descriptionIsLong && !seeMore && (
        <div className={`${classes.seeMore} ${seeMoreClass}`}>
          <DefaultText lowercase onClick={() => setSeeMore(!seeMore)}>
            {intl.formatMessage({
              id: seeMore ? 'newsfeed.see_less' : 'newsfeed.see_more',
            })}
          </DefaultText>
        </div>
      )}
    </div>
  );
};

export default withStyles(styles)(Content);
