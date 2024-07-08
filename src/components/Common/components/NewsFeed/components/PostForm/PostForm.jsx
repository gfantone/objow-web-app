import React, { useState, useRef, useEffect } from 'react';
import Formsy from 'formsy-react';
import { Grid } from '@material-ui/core';
import { Card, DefaultText, Avatar } from '../../../../components';
import { PostFormDialog } from '../PostFormDialog';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { useIntl } from 'react-intl';
import _ from 'lodash';

const styles = {
  newPostButton: {
    padding: 10,
    border: '1px solid #ccc',
    borderRadius: 25,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#f5f5f5',
    },
  },
  dialog: {
    width: 700,
    minWidth: 700,
  },
  iconButton: {
    width: 40,
    height: 40,
  },
  textField: {
    minHeight: 80,
  },
  card: {
    borderRadius: 10,
    padding: 10,
  },
};

const PostForm = ({
  loading: creationLoading,
  classes,
  onSubmit,
  created,
  ...props
}) => {
  const { account } = props.accountDetail;
  const [dialogOpen, setDialogOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [team, setTeam] = useState(_.get(account, 'team.id'));
  const [teamGroup, setTeamGroup] = useState();
  const imageInput = useRef();
  const intl = useIntl();

  const openFileInput = () => {
    imageInput.current.click();
  };

  useEffect(() => {
    setImage(null);
  }, [dialogOpen]);

  useEffect(() => {
    if (created && dialogOpen) {
      setDialogOpen(false);
    }
  }, [created]);

  return (
    <div>
      <Card className={classes.card} marginDisabled>
        <Grid container spacing={1}>
          <Grid item>
            <Avatar src={account.photo} fallbackName={account.fullname} />
          </Grid>
          <Grid item xs>
            <div className={classes.newPostButton}>
              <DefaultText lowercase onClick={() => setDialogOpen(true)}>
                {intl.formatMessage({ id: 'newsfeed.post_placeholder' })}
              </DefaultText>
            </div>
          </Grid>
        </Grid>
      </Card>
      <PostFormDialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        onSubmit={onSubmit}
        loading={creationLoading}
        title={intl.formatMessage({ id: 'newsfeed.new_post_title' })}
        {...props}
      />
    </div>
  );
};

const mapStateToProps = ({ accountDetail }) => ({
  accountDetail,
});

export default connect(mapStateToProps)(withStyles(styles)(PostForm));
