import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useIntl } from "react-intl";
import { withWidth, isWidthDown, makeStyles } from "@material-ui/core";
import * as coachingItemListActions from "../../../../../services/CoachingItems/CoachingItemList/actions";
import * as teamCollaboratorListActions from "../../../../../services/Teams/TeamCollaboratorList/actions";
import * as userListActions from "../../../../../services/Users/UserList/actions";
import { Collaborator } from "../../../../../components";
import { CoachingItem } from "../../../../../scenes/CoachingList/scenes/CoachingList/components/CoachingItem";
import api from "../../../../../data/api/api";
import {
  DefaultText,
  DefaultTitle,
  EmptyState,
  HalfRoundTab,
  HalfRoundTabs,
  Loader,
} from "../../../../Common";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import { ChallengeSearchBar } from "../../../../../scenes/Challenges/components";
import { Grid, withStyles } from "@material-ui/core";
import _ from "lodash";

const styles = {
  emptyState: {
    width: "70%",
    margin: "auto",
  },
  scrollWrapper: {
    overflow: "overlay",

    "&::-webkit-scrollbar-thumb": {
      background: "rgba(199, 199, 199, 0)",
      borderRadius: 5,
    },

    "&::-webkit-scrollbar-track": {
      background: "rgba(0, 0, 0, 0)",
    },
    "&::-webkit-scrollbar": {
      "-webkit-appearance": "none",
      "&:vertical": {
        // position: 'absolute',
        // right: -10,
        width: 10,
      },
    },
    "&:hover": {
      "&::-webkit-scrollbar-thumb": {
        background: "rgba(199, 199, 199, 1)",
        borderRadius: 5,
      },
    },
  },
};

const useStyles = makeStyles((theme) => {
  return {
    colorNumberCollaborator: {
      fontWeight: "bold",
      textTransform: "none",
      color: theme.palette.primary.main,
      paddingLeft: 10,
    },
    activeColorPrimary: {
      backgroundColor: theme.palette.primary.main,
    },
    activeColorBoard: {
      backgroundColor: theme.palette.primary.main,
      border: `solid 5px ${theme.palette.primary.main}`,
      filter: "opacity(40%)",
    },
  };
});

const CoachingTabs = ({
  loadingCollaborator,
  setUrl,
  classes,
  width,
  ...props
}) => {
  const [coachingList, setCoachingList] = useState([]);
  const [tabIndex, SetTabIndex] = useState(0);
  const [search, setSearch] = useState("");
  const [selectedCollaborator, setSelectedCollaborator] = useState(null);

  const [nextPage, setNextPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [totalUsers, setTotalUsers] = useState(0);

  const { items } = props.coachingItemList;
  const { account } = props.accountDetail;
  const intl = useIntl();
  const [notDesktop, setNotDesktop] = useState(window.innerWidth < 1280);

  const isCollaborator = account.role.code === "C";
  const isAdministrator = account.role.code === "A";
  const isSuperManager = account.role.code === "S";
  const isManager = account.role.code === "M";

  const isMobile = isWidthDown("xs", width);

  const themeClasses = useStyles();

  const colorsTabs = [
    "#728B9E",
    "#0F3D5C",
    themeClasses.activeColorPrimary,
    "#DFDFDF",
  ];
  const colorsBody = ["#dde3ea", "#a5b3c1", themeClasses.activeColorBoard];

  const loadNextUsersPage = () => {
    setUsersLoading(true);
    api.users
      .list(true, false, nextPage + 1, search, null, "C", null, true)
      .then((response) => {
        setUsersLoading(false);
        const newUsers = _.get(response, "data.users");
        setUsers([...users, ...newUsers]);
        setNextPage(nextPage + 1);
      });
  };

  useEffect(() => {
    if (selectedCollaborator) {
      setUrl(`/coaching/${selectedCollaborator.id}`);
      props.coachingItemListActions.getCoachingItemList(
        selectedCollaborator.id
      );
    } else {
      setUrl("/coaching");
    }
  }, [selectedCollaborator]);

  useEffect(() => {
    if (isCollaborator) {
      props.coachingItemListActions.getCoachingItemList(account.id);
    } else {
      setUsersLoading(true);
      api.users
        .list(true, false, 1, search, null, "C", null, true)
        .then((response) => {
          setUsersLoading(false);
          const newUsers = _.get(response, "data.users");
          setTotalUsers(_.get(response, "data.filtered_total"));
          setUsers(newUsers);
        });
    }
  }, [search]);

  useEffect(() => {
    setCoachingList(items);
  }, [items]);
  const tabs = [
    coachingList?.filter((item) => item.state === 1),
    coachingList?.filter((item) => item.state === 2),
    coachingList?.filter((item) => item.state === 3),
  ];

  const handleChangeTab = (event, newIndex) => {
    SetTabIndex(newIndex);
  };

  const handleSearch = (newValue) => {
    setSearch(newValue);
  };

  const activeBackgroundColor = colorsBody[tabIndex];
  const activeBorderColor = `solid 5px ${colorsBody[tabIndex]}`;

  const numberCollaborator = `${totalUsers} ${intl
    .formatMessage({
      id: "collaborator.title",
    })
    .toLowerCase()}`;

  const handleCollaboratorClick = (collaborator) => {
    setSelectedCollaborator(collaborator);
    setSearch("");
  };

  const handleResize = () => {
    setNotDesktop(window.innerWidth < 1280);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const tabLabels = [
    intl.formatMessage({
      id: "coaching_list.state.pending",
    }),
    intl.formatMessage({
      id: "coaching_list.state.in_progress",
    }),
    intl.formatMessage({ id: "coaching_list.state.done" }),
  ];

  const TableWithTabs = () => (
    <>
      <HalfRoundTabs
        value={tabIndex}
        onChange={handleChangeTab}
        indicatorColor={colorsTabs[tabIndex]}
        textColor="primary"
      >
        {tabLabels.map((label, index) => (
          <HalfRoundTab
            style={{
              backgroundColor: tabIndex === index ? colorsTabs[index] : "",
              color: tabIndex === index ? "white" : "",
            }}
            classes={{ root: tabIndex === index ? colorsTabs[index] : "" }}
            label={label}
            key={index}
          />
        ))}
      </HalfRoundTabs>
      <div
        style={{
          height: 310,
          maxHeight: notDesktop ? "350px" : "650px",
          overflowY: notDesktop ? "hidden" : "auto",
          overflowX: "hidden",
          backgroundColor: activeBackgroundColor,
          border: activeBorderColor,
        }}
        className={colorsBody[tabIndex]}
      >
        {tabs[tabIndex]?.length === 0 ? (
          <Grid
            container
            style={{
              padding: 5,
              backgroundColor: "white",
              width: "100%",
              height: "100%",
            }}
            alignItems="center"
          >
            <Grid item xs>
              <EmptyState rootClass={classes.emptyState} />
            </Grid>
          </Grid>
        ) : (
          tabs[tabIndex]?.map((item, index) => (
            <div
              style={{
                padding: 5,
              }}
              key={index}
            >
              <CoachingItem item={item} />
            </div>
          ))
        )}
      </div>
    </>
  );

  return (
    <>
      {isCollaborator ? (
        <div style={{ borderRadius: 20, height: 350 }}>
          {loadingCollaborator || !items ? (
            <Grid
              container
              style={{ height: "100%" }}
              alignItems="center"
              justifyContent="center"
            >
              <Grid item>
                <Loader centered />
              </Grid>
            </Grid>
          ) : (
            <TableWithTabs />
          )}
        </div>
      ) : (
        <>
          {selectedCollaborator ? (
            <>
              <DefaultTitle
                lowercase
                style={{ color: "rgb(15,111,222)", cursor: "pointer" }}
                onClick={() => setSelectedCollaborator(null)}
              >
                <Grid container alignItems="center">
                  <Grid item>
                    <ChevronLeftRoundedIcon
                      style={{
                        fontSize: 30,
                        marginBottom: -3,
                      }}
                    />
                  </Grid>
                  <Grid item>
                    {intl.formatMessage({
                      id: "challenge.kpi_results.back_button",
                    })}
                  </Grid>
                </Grid>
              </DefaultTitle>
              <TableWithTabs />
            </>
          ) : (
            <>
              <div style={{ width: "100%" }}>
                <ChallengeSearchBar
                  search={search}
                  onChange={handleSearch}
                  fullSize
                />
              </div>

              <div
                className={isMobile ? "" : classes.scrollWrapper}
                style={{
                  borderRadius: 20,
                  padding: 10,
                  // paddingRight: 10,
                  height: 280,
                  maxHeight: notDesktop ? "350px" : "650px",
                  overflowX: "hidden",
                  overflowY: "overlay",
                }}
              >
                {users.length > 0 && (
                  <DefaultText className={themeClasses.colorNumberCollaborator}>
                    {numberCollaborator}
                  </DefaultText>
                )}

                {users?.map((collaborator) => {
                  return (
                    <div
                      style={{ marginBottom: 10 }}
                      onClick={() => handleCollaboratorClick(collaborator)}
                    >
                      <Collaborator
                        key={collaborator.id}
                        collaborator={collaborator}
                        wrapName
                      />
                    </div>
                  );
                })}
                {usersLoading && (
                  <Grid
                    container
                    style={{ minHeight: users.length > 0 ? "auto" : "300px" }}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Grid item>
                      <Loader centered />
                    </Grid>
                  </Grid>
                )}
                {!usersLoading && users.length < totalUsers && (
                  <Grid container>
                    <Grid item xs={12}>
                      <DefaultTitle
                        lowercase
                        style={{
                          color: "rgb(15,111,222)",
                          cursor: "pointer",
                        }}
                        onClick={loadNextUsersPage}
                      >
                        <Grid container justifyContent="center">
                          <Grid item style={{ fontSize: 18 }}>
                            {intl.formatMessage({ id: "common.see_more" })}
                          </Grid>
                        </Grid>
                      </DefaultTitle>
                    </Grid>
                  </Grid>
                )}
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

const mapStateToProps = ({
  accountDetail,
  coachingItemList,
  teamCollaboratorList,
  userList,
}) => ({
  accountDetail,
  coachingItemList,
  teamCollaboratorList,
  userList,
  loadingCollaborator: coachingItemList.loading,
});
const mapDispatchToProps = (dispatch) => ({
  coachingItemListActions: bindActionCreators(
    coachingItemListActions,
    dispatch
  ),
  teamCollaboratorListActions: bindActionCreators(
    teamCollaboratorListActions,
    dispatch
  ),
  userListActions: bindActionCreators(userListActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withWidth()(CoachingTabs)));
