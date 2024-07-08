import React from 'react';
import { Grid, Hidden } from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import {
  MainLayoutComponent,
  PostForm,
  ProfileThumb,
  NewsFeedContent,
} from '../../components';
import { injectIntl } from 'react-intl';
import * as newsFeedListActions from '../../services/NewsFeed/NewsFeedList/actions';
import * as newsFeedCreationActions from '../../services/NewsFeed/NewsFeedCreation/actions';
import { toast } from 'react-toastify';
import _ from 'lodash';

class NewsFeed extends MainLayoutComponent {
  constructor(props) {
    super(props);
    this.state = {
      newsFeedKey: 'newsfeed_1',
    };
  }

  handleSuccess() {
    const { intl } = this.props;
    const { success } = this.props.newsFeedCreation;
    if (success) {
      this.props.newsFeedCreationActions.createNewsFeedClear();
      this.props.newsFeedListActions.getNewsFeedList();
      const { newsFeedKey } = this.state;
      this.setState({
        ...this.state,
        resetPosts: true,
        newsFeedKey: `${newsFeedKey.split('_')[0]}_${
          parseInt(newsFeedKey.split('_')[1]) + 1
        }`,
      });
      toast.success(
        intl.formatMessage({ id: 'newsfeed.post_creation_success' })
      );
    }
  }

  componentDidMount() {
    const { intl } = this.props;
    const isMobile = isWidthDown('sm', this.props.width);

    this.props.handleTitle(intl.formatMessage({ id: 'newsfeed.title' }));
    this.props.handleMaxWidth(!isMobile);
  }

  componentDidUpdate() {
    this.handleSuccess();
  }

  handleSubmit = (model) => {
    const data = new FormData();
    if (model.image) {
      data.append('image', model.image);
    }
    if (model.video) {
      data.append('video', model.video);
    }
    if (model.file) {
      data.append('file', model.file);
    }
    if (model.embed) {
      data.append('embed', model.embed);
    }
    if (model.gif) {
      data.append('gif', model.gif);
    }
    data.append('description', model.description);

    const team = _.get(
      model,
      'visibility.team.id',
      _.get(model, 'visibility.team')
    );
    const teamGroup = _.get(
      model,
      'visibility.team_group.id',
      _.get(model, 'visibility.team_group')
    );

    if (team && parseInt(team)) {
      data.append('team', parseInt(team));
    }

    if (teamGroup && parseInt(teamGroup)) {
      data.append('team_group', parseInt(teamGroup));
    }

    if (model.visibility.role) {
      data.append('role', parseInt(model.visibility.role));
    }
    if (model.visibility.all) {
      data.append('visibility_all', model.visibility.all);
    }

    if (model.link_preview) {
      data.append('link_preview', JSON.stringify(model.link_preview));
    }

    this.props.newsFeedCreationActions.createNewsFeed(data);
  };

  render() {
    const { success, loading } = this.props.newsFeedCreation;
    const { account } = this.props.accountDetail;

    return (
      <div style={{ overflow: 'hidden' }}>
        <Grid container spacing={3}>
          <Hidden smDown>
            <Grid item md={3} container>
              <Grid item xs={3} />
              <Grid item xs={9}>
                <ProfileThumb />
              </Grid>
            </Grid>
          </Hidden>
          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {account.newsFeedPostCreation && (
                  <PostForm
                    onSubmit={this.handleSubmit}
                    loading={loading}
                    created={success}
                  />
                )}
              </Grid>
              <Grid item xs={12} key={this.state.newsFeedKey}>
                <NewsFeedContent />
              </Grid>
            </Grid>
          </Grid>
          <Hidden smDown>
            <Grid item md={3}></Grid>
          </Hidden>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = ({
  newsFeedList,
  newsFeedCreation,
  accountDetail,
}) => ({
  newsFeedList,
  newsFeedCreation,
  accountDetail,
});

const mapDispatchToProps = (dispatch) => ({
  newsFeedListActions: bindActionCreators(newsFeedListActions, dispatch),
  newsFeedCreationActions: bindActionCreators(
    newsFeedCreationActions,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(withWidth()(NewsFeed)));
