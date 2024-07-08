import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Challenge, ChallengeSimple } from '../../../../components';
import { Loader, RoundedTab, RoundedTabs } from '../../../../../../components';
import { MainContainer } from '../../../../../../components/Common/components/MainLayout/components/MainLayout/components/';
import { useIntl } from 'react-intl';
import api from '../../../../../../data/api/api';
import _ from 'lodash';

const styles = {
  loaderContainer: {
    padding: 16,
  },
  challengeContainer: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
  },
};

const SubHeader = ({ activateRank, onChange, ...props }) => {
  const intl = useIntl();
  const { classes } = props;
  const [value, setValue] = React.useState(0);
  const [rankLoading, setRankLoading] = React.useState(true);
  const [scroll, _setScroll] = React.useState(0);
  const [windowScroll, setWindowScroll] = React.useState(0);
  const [windowHeight, setWindowHeight] = React.useState(0);
  const [scrollLimit, _setScrollLimit] = React.useState(null);
  const scrollLimitRef = React.useRef(scrollLimit);
  const setScrollLimit = (value) => {
    scrollLimitRef.current = value;
    _setScrollLimit(value);
  };
  const scrollRef = React.useRef(scroll);
  const setScroll = (value) => {
    if (scrollRef.current !== value) {
      scrollRef.current = value;
      _setScroll(value);
    }
  };
  const baseRef = React.useRef();

  const [initialized, setInitialized] = React.useState(false);

  var { challenge, loading: teamChallengeDetailLoading } =
    props.teamGroupChallengeDetail;
  const { loading: teamChallengeGoalListLoading } = props.teamChallengeGoalList;
  const { loading: teamChallengeRankListLoading } = props.teamChallengeRankList;
  const loading = teamChallengeDetailLoading || teamChallengeGoalListLoading;

  if (!teamChallengeGoalListLoading && rankLoading) {
    setRankLoading(false);
  }

  if (!rankLoading) {
    const body = document.body;
    const html = document.documentElement;
    // const height = Math.max(body.scrollHeight, body.offsetHeight,
    //   html.clientHeight, html.scrollHeight, html.offsetHeight);

    const tableBody = document.getElementsByTagName('tbody');

    const height =
      tableBody.length > 0 ? tableBody[0].getClientRects()[0].height : 0;
    const viewportHeight = window.innerHeight;

    if (height && height > windowHeight && !scrollLimit) {
      // console.log(height);
      const limit = height - viewportHeight / 2;
      setWindowHeight(height);
      // if(limit > 215) {
      //   setScrollLimit(215)
      // } else {
      //   setScrollLimit(limit)
      // }
      setScrollLimit(206);
    }
  }

  const handleScroll = (event) => {
    const scrollLimit = scrollLimitRef.current;
    const newScroll = document.getElementById('challenge-scroll').scrollTop;

    if (scrollLimit) {
      if (newScroll >= scrollLimit) {
        setScroll(scrollLimit);
      } else if (newScroll < scrollLimit) {
        setScroll(0);
      }
    }
    setWindowScroll(window.scrollY);
  };

  const handleChange = (e, value) => {
    setValue(value);
    if (onChange) onChange(value);
  };

  const renderLoader = () => {
    return (
      <div className={classes.loaderContainer}>
        <Loader centered />
      </div>
    );
  };

  if (!initialized && document.getElementById('challenge-scroll')) {
    document
      .getElementById('challenge-scroll')
      .addEventListener('scroll', handleScroll);
    setInitialized(true);
  }

  const renderData = () => {
    return (
      <React.Fragment>
        <div style={{ opacity: scroll > 0 ? 0 : 1 }} ref={baseRef}>
          <div className={classes.challengeContainer}>
            <ChallengeSimple
              challenge={challenge}
              fetchGoalPoints={() =>
                api.challenges.goal_points(challenge.sourceId, {
                  team_group_id: challenge.teamGroupId,
                })
              }
            />
          </div>
          {activateRank && (
            <RoundedTabs
              value={value}
              onChange={handleChange}
              variant="fullWidth"
            >
              <RoundedTab
                label={intl.formatMessage({ id: 'challenge.detail.rank_tab' })}
              />
              <RoundedTab
                label={intl.formatMessage({
                  id: 'challenge.detail.condition_tab',
                })}
              />
            </RoundedTabs>
          )}
        </div>

        {scroll > 0 && (
          <MainContainer
            style={{
              opacity: scroll > 0 ? 1 : 0,
              padding: 0,
              position: 'fixed',
              top: 62,
              width: _.get(baseRef, 'current')
                ? baseRef.current.getBoundingClientRect().width
                : 0,
              background: 'white',
              borderRadius: 20,
              boxShadow: '0 2px 16px 0 rgba(16,61,92,0.38)',
            }}
            maxWidth="xs"
          >
            {activateRank && (
              <RoundedTabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
              >
                <RoundedTab
                  label={intl.formatMessage({
                    id: 'challenge.detail.rank_tab',
                  })}
                />
                <RoundedTab
                  label={intl.formatMessage({
                    id: 'challenge.detail.condition_tab',
                  })}
                />
              </RoundedTabs>
            )}
          </MainContainer>
        )}
      </React.Fragment>
    );
  };

  return (
    <div>
      {loading && renderLoader()}
      {!loading && challenge && renderData()}
    </div>
  );
};

const mapStateToProps = ({
  teamGroupChallengeDetail,
  teamChallengeGoalList,
  teamChallengeRankList,
}) => ({
  teamGroupChallengeDetail,
  teamChallengeGoalList,
  teamChallengeRankList,
});

export default connect(mapStateToProps)(withStyles(styles)(SubHeader));
