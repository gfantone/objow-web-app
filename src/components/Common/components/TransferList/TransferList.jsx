import {faEdit, faMinus, faPlus} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Grid,
  IconButton,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React, { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { connect } from 'react-redux';
import {
  Card,
  Collaborator,
  DefaultTitle,
  TeamGroup,
  TeamThumb,
  DefaultText, Avatar,
} from '../../..';
import { ChallengeSearchBar } from '../../../../scenes/Challenges/components';

import _ from 'lodash';
import {Tag} from "../../../Teams/components/TeamThumb/components";

const styles = (theme) => {
  return {
    thumbnail: {
      borderRadius: 20,
      zIndex: 10,
    },
    teamWrapper: {
      // width: '100%',
      flexWrap: 'nowrap',
      minWidth: '100%',
      // overflow: 'hidden',
    },
    title: {
      fontSize: 17,
      textAlign: 'center',
      margin: '5px 0',
    },
    boxWrapper: {
      padding: '15px',
      borderRadius: '6px',
      background: '#f7f8fc',
      height: '100%',
    },
    item: {
      marginBottom: 10,
      position: 'relative',
      zIndex: 10,
      maxWidth: 'calc(100vw - 100px)',
      '&:last-of-type': {
        marginBottom: '0',
      },
    },
    disabledItem: {
      opacity: 0.6,
      filter: 'grayscale(1)',
    },

    itemIcon: {
      position: 'absolute',
      right: 10,
      top: '50%',
      marginTop: '-10px',
      zIndex: 40,
    },
    teamItemIcon: {
      // right: 30,
      // top: 22,
      // zIndex: 10
    },
    addIcon: {
      color: theme.palette.primary.main,
    },
    editIcon: {
      color: theme.palette.primary.main,
    },
    deleteIcon: {
      color: '#E50000',
    },
    panelWrapper: {
      position: 'relative',
      width: '100%',
      marginBottom: '18px',
      '&:last-of-type': {
        marginBottom: '0',
      },
    },

    panel: {
      backgroundColor: 'initial',
      borderRadius: 'initial',
      boxShadow: 'none',
      position: 'relative',
      '&.MuiExpansionPanel-root:before': {
        display: 'none',
      },
      '& .MuiExpansionPanelSummary-expandIcon': {
        position: 'absolute',
        left: '135px',
        top: '22px',
      },
      '&.offsetIcon1  .MuiExpansionPanelSummary-expandIcon': {
        left: '145px',
      },
      '&.offsetIcon2  .MuiExpansionPanelSummary-expandIcon': {
        left: '152px',
      },
      '&.offsetIcon3  .MuiExpansionPanelSummary-expandIcon': {
        left: '160px',
      },
      '& .teamGroupOffset .MuiExpansionPanelSummary-expandIcon': {
        marginLeft: 60,
      },
      '& .teamOffset .MuiExpansionPanelSummary-expandIcon': {
        marginLeft: 10,
      },
      '& .MuiExpansionPanelSummary-expandIcon.Mui-expanded': {
        top: '16px',
      },
      '& .MuiExpansionPanelSummary-root': {
        zIndex: 20,
        height: '64px',
        marginRight: '42px',
      },
    },
    panelGroup: {
      position: 'relative',
      '& .MuiExpansionPanelSummary-expandIcon': {
        left: '155px',
      },
    },

    panelGroupTeamGroup: {
      position: 'relative',
      '& .MuiExpansionPanelSummary-expandIcon': {
        left: '205px',
      },
    },

    panelGroupTeam: {
      position: 'relative',
      '& .MuiExpansionPanelSummary-expandIcon': {
        left: '145px',
      },
    },

    panelSummary: {
      marginTop: '-80px',
      padding: 'initial',
      position: 'relative',
    },
    panelSummaryContent: {
      position: 'absolute',
    },
    panelDetails: {
      padding: '10px 0 0 15px',
      zIndex: 5,
    },
    animatedCounter: {
      animation: '$bounce 300ms',
    },
    '@keyframes bounce': {
      '0%': {
        transform: 'translateY(0)',
      },
      '50%': {
        transform: 'translateY(-10px)',
      },

      '100%': {
        transform: 'translateY(0)',
      },
    },
    dropdown: {
      width: '50%',
      overflowY: 'auto',
      position: 'absolute',
      top: 95,
      left: 17,
      padding: 20,
      background: 'white',
      zIndex: 2000,
      boxShadow: '0 2px 16px 0 rgba(16,61,92,0.25)',
      borderRadius: 10,
    },
    activeColorPrimary: {
      color: theme.palette.primary.main,
    },
    negativeColor: {
      color: '#E50000',
    },
  };
};

const ExpandableTeamGroup = ({
  classes,
  teamGroup,
  displayedTeamGroups,
  displayedTeams,
  enableTeamSelect,
  whiteList,
  displayTeamChoices,
  displayTeamGroupChoices,
}) => {
  const [expanded, setExpanded] = useState(whiteList);
  const hasTeamGroups = teamGroup.teamGroups && teamGroup.teamGroups.length > 0;
  const offsetClass = `offsetIcon${displayedTeams.length.toString().length}`;

  return (
    <ExpansionPanel
      className={`${classes.panel} ${offsetClass}`}
      onChange={(e, open) => {
        setExpanded(open);
      }}
      defaultExpanded={whiteList}
      {...expanded}
    >
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        className={`${classes.panelSummary} ${
          hasTeamGroups ? 'teamGroupOffset' : 'teamOffset'
        } ${
          displayedTeamGroups.length > 0
            ? classes.panelGroupTeamGroup
            : classes.panelGroup
        }`}
      ></ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.panelDetails}>
        <Grid container spacing={2}>
          {expanded && (
            <Grid item xs={12}>
              {enableTeamSelect &&
                (teamGroup.teamsCount > 0 ||
                  _.get(teamGroup, 'teams', []).length > 0) &&
                displayTeamChoices(displayedTeams, whiteList)}
              {displayedTeamGroups.map((tg) =>
                displayTeamGroupChoices(tg, whiteList)
              )}
            </Grid>
          )}
        </Grid>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

const ExpandableTeamCollaborators = ({
  classes,
  displayedCollaborators,
  defaultTeamExpanded,
  whiteList,
  selectItem,
  removeItem,
  selectedPersonalizedIds,
  teamPersonalizedMode,
  noSelection,
  selectedListIds,
  choiceKey,
  collaborators,
}) => {
  const [expanded, setExpanded] = useState(whiteList);
  collaborators = collaborators || [];
  displayedCollaborators = displayedCollaborators || [];
  const offsetClass = `offsetIcon${collaborators.length.toString().length}`;
  return (
    <ExpansionPanel
      className={`${classes.panel} ${offsetClass}`}
      onChange={(e, open) => setExpanded(open)}
      {...defaultTeamExpanded}
    >
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        className={`${classes.panelSummary} ${classes.panelGroupTeam}`}
      ></ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.panelDetails}>
        {expanded && (
          <Grid container key={choiceKey}>
            {displayedCollaborators.map((collaborator, collaboratorKey) => {
              const isCollaboratorSelected =
                selectedListIds.indexOf(collaborator.id) >= 0
                || (selectedPersonalizedIds && selectedPersonalizedIds.indexOf(collaborator.id) >= 0);

              return (
                <Grid
                  item
                  className={`${classes.item} ${
                    !whiteList && isCollaboratorSelected
                      ? classes.disabledItem
                      : ''
                  }`}
                  style={{ width: '100%' }}
                >
                  <Collaborator
                    key={collaboratorKey}
                    collaborator={collaborator}
                    noAnimation
                  />
                  {whiteList && !noSelection && (
                    <IconButton
                      size='small'
                      onClick={() => removeItem(collaborator)}
                      className={classes.itemIcon}
                    >
                      <FontAwesomeIcon
                        icon={faMinus}
                        className={classes.deleteIcon}
                      />
                    </IconButton>
                  )}
                  {!whiteList && !noSelection && (
                    <IconButton
                      size='small'
                      onClick={() => selectItem(collaborator)}
                      className={classes.itemIcon}
                    >
                      <FontAwesomeIcon
                        icon={faPlus}
                        className={classes.addIcon}
                      />
                    </IconButton>
                  )}
                </Grid>
              );
            })}
          </Grid>
        )}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

const TransferList = ({
  listIn,
  selected,
  onChange,
  enableCollaboratorSelect,
  enableTeamSelect,
  teamGroupMode,
  selectedPersonalizedIds,
  teamPersonalizedMode,
  noSelection,
  defaultChoicesExpanded,
  onSearch,
  maxHeight,
  enableSearch,
  onUpdateTeam,
  ...props
}) => {
  const intl = useIntl();
  const { classes } = props;
  const { account } = props.accountDetail;
  const { images } = props.systemImageList;
  const { teams: fetchedTeams } = props.teamList;
  const [teams, setTeams] = useState([]);
  const [teamsInitialized, setTeamsInitialized] = useState(false);

  const [selectedList, setSelectedList] = useState(selected || []);
  const filterCollaboratorsByScope = (collaborators) =>
    collaborators.filter(
      (c) =>
        (account.team &&
          _.get(account, 'role.code') === 'M' &&
          _.get(c, 'team.id', c.team) === account.team.id) ||
        (account.team_group &&
          _.get(account, 'role.code') === 'S' &&
          account.team_group.allTeamIds.indexOf(_.get(c, 'team.id', c.team)) >=
            0) ||
        _.get(account, 'role.code') === 'A'
    );
  const filterCollaboratorsTeamPersonalizedByScope = (teams) => {
    let collabs = []
    teams.forEach(
      (t) => {
        collabs = collabs.concat(t.collaborators)
      }
    );
    return collabs
  }
  const [selectedByScope, setSelectedByScope] = useState(
    (teamPersonalizedMode && noSelection)
    ? filterCollaboratorsTeamPersonalizedByScope(selectedList)
    : filterCollaboratorsByScope(selectedList)
  );

  const allCollaborators = _.flatten(teams.map((t) => t.collaborators));
  const allCollaboratorsByScope = allCollaborators.filter(
    (c) =>
      (account.team && _.get(c, 'team.id', c.team) === account.team.id) ||
      (account.team_group &&
        account.team_group.allTeamIds.indexOf(_.get(c, 'team.id', c.team)) >= 0)
  );

  useEffect(() => {
    if (fetchedTeams && !teamsInitialized) {
      setTeamsInitialized(true);
      setTeams(
        fetchedTeams
          .map((t) =>
            Object.assign({}, t, {
              collaborator_ids: t.collaborators.map((c) => c.id),
            })
          )
          .filter((t) => !account.team || t.id === account.team.id)
      );
    }
  }, [props.teamList]);

  useEffect(() => {
    setSelectedByScope(filterCollaboratorsByScope(selectedList));
  }, [selectedList]);

  const [choices, setChoices] = useState(listIn);
  const [search, setSearch] = useState('');
  const [searchPage, setSearchPage] = useState(1);
  const [searchMode, setSearchMode] = useState(false);
  const [baseCounter, setBaseCounter] = useState(selectedByScope.length);
  const [animation, setAnimation] = useState(false);
  const [teamsOpen, setTeamsOpen] = useState([]);

  // helps resetting search bar
  const [defaultSearchBarKey, setDefaultSearchBarKey] = useState(0);

  const dropdownRef = useRef();
  const searchBarRef = useRef();
  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      searchBarRef.current &&
      !searchBarRef.current.contains(event.target) &&
      searchMode
    ) {
      setSearchMode(false);
    }
  };

  document.addEventListener('click', handleClickOutside, true);

  let selectedListIds = []
  if (!teamPersonalizedMode || !noSelection) {
    selectedListIds = selectedList.map((c) => c.id)
  } else {
    selectedList.forEach((t) => {
      if (t.collaborators && t.collaborators.length > 0) {
        t.collaborators.forEach((c) => {
          selectedListIds.push(c.id)
        })
      }
    })
  }

  const selectedWholeTeams = teams
    .filter(
      (t) =>
        _.intersection(t.collaborator_ids, selectedListIds).length ===
        t.collaborators.length
    )
    .map((t) => t.id);

  // const choiceTeams = teams.filter(t => t.collaborators.length > _.intersection(t.collaborators.map(c => c.id), selectedList.map(c => c.id)).length).map(t => t.id)

  const defaultTeamExpanded =
    _.get(account, 'role.code') === 'M' ? { defaultExpanded: true } : {};
  const defaultTeamGroupExpanded =
    _.get(account, 'role.code') === 'S' ? { defaultExpanded: true } : {};

  const logo =
    images &&
    _.get(
      images.find((x) => x.code === 'LOGO'),
      'src'
    );

  const selectItem = (item) => {
    if (_.indexOf(selectedList, item) < 0 && selectedPersonalizedIds.indexOf(item.id) < 0) {
      setSelectedList([item, ...selectedList]);
    }
  };

  const selectTeamGroup = (teamGroup) => {
    if (teamGroupMode) {
      selectItem(teamGroup);
    } else {
      addList(
        _.flatten(
          teams
            .filter((t) => teamGroup.allTeamIds.includes(t.id))
            .map((t) => t.collaborators)
        )
      );
    }
  };

  const addList = (items) => {
    setSelectedList(_.uniqBy([...items, ...selectedList], 'id'));
  };

  const removeItemPersonalized = (item) => {
    let teams = []
    selectedList.forEach((team) => {
      if (team.collaborators && (team.collaborators.length - 1) > 0) {
        team.collaborators = team.collaborators.filter((selectedItem) => selectedItem.id !== item.id);
      }
      teams.push(team);
    })
    setSelectedList(teams);
  };

  const removeItem = (item) => {
    setSelectedList(
      selectedList.filter((selectedItem) => selectedItem.id !== item.id)
    );
  };

  const removeList = (items) => {
    setSelectedList(
      selectedList.filter(
        (selectedItem) =>
          items.map((item) => item.id).indexOf(selectedItem.id) < 0
      )
    );
  };
  React.useEffect(() => {
    setAnimation(true);
    setTimeout(() => {
      setAnimation(false);
    }, 300);

    onChange(selectedList);
    setChoices(listIn);
  }, [selectedList]);

  React.useEffect(() => {
    if (
      _.differenceBy(
        _.sortBy(selected, 'id'),
        _.sortBy(selectedList, 'id'),
        'id'
      ).length > 0 ||
      selected.length !== selectedList.length
    ) {
      setSelectedList(selected);
    }
  }, [selected]);

  React.useEffect(() => {
    setSearchPage(1);
    if (search) {
      setSearchMode(true);
    } else {
      setSearchMode(false);
    }
  }, [search]);

  React.useEffect(() => {
    if (onSearch) {
      onSearch(searchMode);
    }
  }, [searchMode]);

  const changeTeamOpen = (teamId, open) => {
    if (open) {
      setTeamsOpen([...teamsOpen, teamId]);
    }
  };
  const ExpandableTeamCollaboratorsWithStyle = withStyles(styles)(
    ExpandableTeamCollaborators
  );
  const displayTeamChoices = (teams, whiteList = false) => (
    <React.Fragment>
      {teams.map((choice, choiceKey) => {
        const isOpen =
          teamsOpen.indexOf(choice.id) >= 0 ||
          _.get(defaultTeamExpanded, 'defaultExpanded');

        const collaborators = choice.collaborators.filter((c) => {
          return whiteList
            ? selectedListIds.indexOf(c.id) >= 0
            : selectedListIds.indexOf(c.id) < 0;
        });
        const team = Object.assign({}, choice, { collaborators });
        const isSelected =
          _.intersection(choice.collaborator_ids, selectedListIds).length ===
          choice.collaborators.length;
        const displayedCollaborators = whiteList
          ? collaborators
          : choice.collaborators;

        return (
          <div className={classes.panelWrapper}>
            <div style={{ position: 'static' }}>
              <div
                className={`${classes.item} ${
                  !whiteList && isSelected ? classes.disabledItem : ''
                }`}
              >
                <TeamThumb team={team} />
                {whiteList && !noSelection && (
                  <IconButton
                    size='small'
                    onClick={() => removeList(choice.collaborators)}
                    className={classes.itemIcon}
                  >
                    <FontAwesomeIcon
                      icon={faMinus}
                      className={classes.deleteIcon}
                    />
                  </IconButton>
                )}
                {!whiteList && !noSelection && (
                  <IconButton
                    size='small'
                    onClick={() => addList(choice.collaborators)}
                    className={classes.itemIcon}
                  >
                    <FontAwesomeIcon
                      icon={faPlus}
                      className={classes.addIcon}
                    />
                  </IconButton>
                )}
              </div>
              {enableCollaboratorSelect && (
                <ExpandableTeamCollaboratorsWithStyle
                  displayedCollaborators={displayedCollaborators}
                  defaultTeamExpanded={defaultTeamExpanded}
                  whiteList={whiteList}
                  selectedPersonalizedIds={selectedPersonalizedIds}
                  selectItem={selectItem}
                  removeItem={removeItem}
                  teamPersonalizedMode={teamPersonalizedMode}
                  noSelection={noSelection}
                  selectedListIds={selectedListIds}
                  choiceKey={choiceKey}
                  collaborators={choice.collaborators}
                />
              )}
            </div>
          </div>
        );
      })}
    </React.Fragment>
  );

  const displayTeamPersonalizedChoices = (teamPersonalizedList) => (
    <React.Fragment>
      {teamPersonalizedList.map((team, teamKey) => {
        const displayedCollaborators = team.collaborators

        return (
          <div className={classes.panelWrapper}>
            <div style={{position: 'static'}}>
              <div
                className={`${classes.item}`}
              >
                <Card className={classes.thumbnail}>
                  <Grid container spacing={2} className={classes.teamWrapper}>
                    <Grid item xs={9} container alignItems='flex-start' justify='left'>
                      <Grid item xs={12} zeroMinWidth>
                        <Grid container justifyContent='space-between'>
                          <Grid item>
                            <DefaultTitle
                              style={{
                                textAlign: 'left',
                                fontWeight: 'bold',
                                textTransform: 'none',
                                fontSize: 16,
                              }}
                            >
                              {team.name}
                            </DefaultTitle>
                          </Grid>
                          <Grid item>
                            <IconButton
                              size='small'
                              onClick={() => onUpdateTeam(teamKey)}
                              className={classes.itemIcon}
                            >
                              <FontAwesomeIcon
                                icon={faEdit}
                                className={classes.editIcon}
                              />
                            </IconButton>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid
                        item
                        style={{ borderRadius: 5, overflow: 'hidden', height: 18 }}
                      >
                        <Tag className={classes.tag} color='#f2f5fc'>
                          <span style={{ color: '#43586c' }}>{intl
                            .formatMessage({ id: 'team.collaborators_text' })
                            .format((team.collaborators) ? team.collaborators.length : 0)}</span>
                        </Tag>
                      </Grid>
                    </Grid>
                  </Grid>
                </Card>
              </div>
              <ExpandableTeamCollaboratorsWithStyle
                displayedCollaborators={displayedCollaborators}
                defaultTeamExpanded={defaultTeamExpanded}
                whiteList={true}
                selectItem={() => {}}
                removeItem={removeItemPersonalized}
                teamPersonalizedMode={true}
                selectedListIds={[]}
                choiceKey={teamKey}
                collaborators={team.collaborators}
              />
            </div>
          </div>
        );
      })}
    </React.Fragment>
  );

  // White list mode determines whether to display filter or remove filter from the list
  const displayTeamGroupChoices = (teamGroup, whiteList = false) => {
    if (!teamGroup) return <div className={classes.panelWrapper} />;

    const selectedTeamIds = selectedByScope.map((c) =>
      _.isInteger(c.team) ? c.team : _.get(c, 'team.id')
    );

    const embeddedTeams = teams.filter(
      (team) =>
        team.parent.id === teamGroup.id &&
        (whiteList
          ? _.intersection(team.collaborator_ids, selectedListIds).length > 0
          : _.intersection(team.collaborator_ids, selectedWholeTeams).length <=
            0)
    );

    const subTeamGroups = whiteList
      ? _.get(teamGroup, 'teamGroups', []).filter(
          (tg) => _.intersection(tg.allTeamIds, selectedTeamIds).length > 0
        )
      : _.get(teamGroup, 'teamGroups', []).filter(
          (tg) =>
            tg.allTeamIds.length >
            _.intersection(tg.allTeamIds, selectedTeamIds).length
        );

    const allTeamIds = _.get(teamGroup, 'allTeamIds', []);
    const isSelected = whiteList
      ? _.intersection(allTeamIds, selectedTeamIds).length > 0
      : _.intersection(allTeamIds, selectedWholeTeams).length ===
        allTeamIds.length;

    const teamGroupSelected =
      teamGroupMode && selectedByScope.indexOf(teamGroup) >= 0;
    const expanded =
      whiteList || (!whiteList && defaultChoicesExpanded)
        ? { defaultExpanded: true }
        : defaultTeamGroupExpanded;

    const displayedTeams = whiteList
      ? embeddedTeams
      : teams.filter((team) => teamGroup.allTeamIds.indexOf(team.id) >= 0);

    const teamIds = teams.map((t) => t.id);
    const displayRootTeamGroup =
      (!whiteList || subTeamGroups.length > 1 || displayedTeams.length > 0) &&
      _.intersection(teamGroup.allTeamIds, teamIds).length > 0;
    const displayedTeamGroups = (
      whiteList ? subTeamGroups : _.get(teamGroup, 'teamGroups', [])
    ).filter((tg) => _.intersection(tg.allTeamIds, teamIds).length > 0);

    const hasTeamGroups =
      teamGroup.teamGroups && teamGroup.teamGroups.length > 0;

    const ExpandableTeamGroupWithStyle =
      withStyles(styles)(ExpandableTeamGroup);
    return (
      <React.Fragment>
        {displayRootTeamGroup ? (
          <div className={classes.panelWrapper}>
            <div style={{ position: 'static' }}>
              {((whiteList && isSelected) || !whiteList) && (
                <React.Fragment>
                  <div
                    className={`${classes.item} ${
                      teamGroupSelected || (!whiteList && isSelected)
                        ? classes.disabledItem
                        : ''
                    }`}
                  >
                    <Card className={classes.thumbnail}>
                      <TeamGroup
                        team={Object.assign({}, teamGroup, {
                          teams:
                            subTeamGroups && subTeamGroups.length > 0
                              ? subTeamGroups
                              : whiteList
                              ? _.intersection(
                                  teamGroup.allTeamIds,
                                  selectedTeamIds
                                )
                              : _.difference(
                                  teamGroup.allTeamIds,
                                  selectedWholeTeams
                                ),
                        })}
                        teamNumberWording={
                          hasTeamGroups ? 'team_groups' : 'teams'
                        }
                        hideTeamGroupUsers
                        teamNumber
                        image={teamGroup.parent ? null : logo}
                      />
                      {(whiteList && !noSelection) && (
                        <IconButton
                          size='small'
                          onClick={() =>
                            teamGroupMode
                              ? removeItem(teamGroup)
                              : setSelectedList(
                                  selectedList.filter(
                                    (collaborator) =>
                                      teamGroup.allTeamIds.indexOf(
                                        _.get(
                                          collaborator,
                                          'team.id',
                                          collaborator.team
                                        )
                                      ) < 0
                                  )
                                )
                          }
                          className={classes.itemIcon}
                        >
                          <FontAwesomeIcon
                            icon={faMinus}
                            className={classes.deleteIcon}
                          />
                        </IconButton>
                      )}
                      {!whiteList && !noSelection && (
                        <IconButton
                          size='small'
                          onClick={() =>
                            teamGroupMode
                              ? selectItem(teamGroup)
                              : selectTeamGroup(teamGroup)
                          }
                          className={classes.itemIcon}
                        >
                          <FontAwesomeIcon
                            icon={faPlus}
                            className={classes.addIcon}
                          />
                        </IconButton>
                      )}
                    </Card>
                  </div>
                  {(subTeamGroups.length > 0 || enableTeamSelect) && (
                    <ExpandableTeamGroupWithStyle
                      whiteList={whiteList}
                      teamGroup={teamGroup}
                      displayedTeamGroups={displayedTeamGroups}
                      displayedTeams={displayedTeams}
                      enableTeamSelect={enableTeamSelect}
                      displayTeamChoices={displayTeamChoices}
                      displayTeamGroupChoices={displayTeamGroupChoices}
                    />
                  )}
                </React.Fragment>
              )}
            </div>
          </div>
        ) : (
          <React.Fragment>
            {enableTeamSelect &&
              (teamGroup.teamsCount > 0 ||
                _.get(teamGroup, 'teams', []).length > 0) &&
              displayTeamChoices(displayedTeams, whiteList)}
            {subTeamGroups.map((tg) => displayTeamGroupChoices(tg, whiteList))}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  };

  const displaySelectedTeamGroups = () => {
    return (
      <div className={classes.panelWrapper}>
        <div style={{ position: 'static' }}>
          {selectedList.map((teamGroup) => (
            <div className={`${classes.item}`}>
              <Card className={classes.thumbnail}>
                <TeamGroup
                  team={Object.assign(teamGroup, {
                    teams:
                      teamGroup.teamGroups && teamGroup.teamGroups.length > 0
                        ? teamGroup.teamGroups
                        : teamGroup.allTeamIds,
                  })}
                  teamNumberWording={
                    teamGroup.teamGroups && teamGroup.teamGroups.length > 0
                      ? 'team_groups'
                      : 'teams'
                  }
                  hideTeamGroupUsers
                  teamNumber
                  image={teamGroup.parent ? null : logo}
                />

                <IconButton
                  size='small'
                  onClick={() => removeItem(teamGroup)}
                  className={classes.itemIcon}
                >
                  <FontAwesomeIcon
                    icon={faMinus}
                    className={classes.deleteIcon}
                  />
                </IconButton>
              </Card>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const displaySearchedCollaborators = (collaborators, whiteList) => {
    const orderedCollaborators = [
      ...collaborators.filter((c) => selectedListIds.indexOf(c.id) < 0),
      ...collaborators.filter((c) => selectedListIds.indexOf(c.id) >= 0),
    ];
    const filteredCollaborators = orderedCollaborators.filter(
      (c) => c.fullname.toLowerCase().indexOf(search.toLowerCase()) >= 0
    );
    const numberOfCollaborators = searchPage * 10;

    return (
      <div>
        <Grid container>
          {filteredCollaborators
            .slice(0, numberOfCollaborators)
            .map((collaborator) => {
              const isCollaboratorSelected =
                selectedListIds.indexOf(collaborator.id) >= 0;
              return (
                <Grid
                  item
                  className={`${classes.item}`}
                  style={{ width: '100%' }}
                >
                  <Collaborator
                    collaborator={collaborator}
                    displayTeam
                    noAnimation
                  />
                  {isCollaboratorSelected ? (
                    <IconButton
                      size='small'
                      onClick={() => removeItem(collaborator)}
                      className={classes.itemIcon}
                    >
                      <FontAwesomeIcon
                        icon={faMinus}
                        className={classes.deleteIcon}
                      />
                    </IconButton>
                  ) : (
                    <IconButton
                      size='small'
                      onClick={() => selectItem(collaborator)}
                      className={classes.itemIcon}
                    >
                      <FontAwesomeIcon
                        icon={faPlus}
                        className={classes.addIcon}
                      />
                    </IconButton>
                  )}
                </Grid>
              );
            })}
          {numberOfCollaborators < filteredCollaborators.length && (
            <Grid item xs={12} container justifyContent='center'>
              <Grid item>
                <DefaultTitle
                  lowercase
                  style={{ color: 'rgb(15,111,222)', cursor: 'pointer' }}
                  onClick={() => setSearchPage(searchPage + 1)}
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
        </Grid>
      </div>
    );
  };

  const counterDiff = selectedByScope.length - baseCounter;

  return (
    <Grid container direction='column' spacing={1}>
      {searchMode && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.4)',
            zIndex: 1000,
          }}
        ></div>
      )}
      <Grid item xs>
        <Grid
          container
          spacing={1}
          style={{ background: 'white', zIndex: 2000 }}
        >
          {enableCollaboratorSelect && enableSearch && (
            <Grid
              item
              style={{
                marginTop: 10,
                zIndex: 2000,
                background: 'white',
                padding: 5,
                borderRadius: 20,
                marginLeft: 4,
              }}
            >
              <div ref={searchBarRef}>
                <ChallengeSearchBar
                  key={`search${defaultSearchBarKey}`}
                  search={search}
                  onChange={setSearch}
                  delay={200}
                  fullSize
                />
              </div>
            </Grid>
          )}

          <Grid item xs={12}>
            <Grid
              container
              direction='row'
              spacing={4}
              justifyContent='space-between'
            >
              <Grid item xs={12} sm={6} container direction='column'>
                <Grid item>
                  <DefaultTitle className={classes.title}>
                    {teamGroupMode
                      ? intl.formatMessage({ id: 'common.team_groups' })
                      : enableCollaboratorSelect
                      ? intl.formatMessage({ id: 'common.collaborators' })
                      : intl.formatMessage({ id: 'common.teams' })}{' '}
                    {intl.formatMessage({ id: 'transfer_list.selection' })}
                    {enableCollaboratorSelect && !noSelection && (
                      <span>
                        {' '}
                        (
                        {allCollaboratorsByScope.length -
                          selectedByScope.length}
                        )
                        {parseInt(counterDiff) !== 0 && (
                          <span
                            style={{
                              display: 'inline-block',
                              marginLeft: 5,
                            }}
                            className={`${
                              animation ? classes.animatedCounter : null
                            } ${
                              counterDiff > 0
                                ? classes.negativeColor
                                : classes.activeColorPrimary
                            }`}
                          >
                            {counterDiff < 0 && '+'}
                            {counterDiff * -1}
                          </span>
                        )}
                      </span>
                    )}
                  </DefaultTitle>
                </Grid>
                <Grid xs item className={classes.boxWrapper}>
                  {displayTeamGroupChoices(choices, false)}
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6} container direction='column'>
                <Grid item>
                  { !teamPersonalizedMode && (
                    <DefaultTitle className={classes.title}>
                      {intl.formatMessage({ id: 'transfer_list.participants' })} (
                      {selectedByScope.length})
                      {parseInt(counterDiff) !== 0 && (
                        <span
                          style={{
                            display: 'inline-block',
                            marginLeft: 5,
                          }}
                          className={`${
                            animation ? classes.animatedCounter : null
                          } ${
                            counterDiff < 0
                              ? classes.negativeColor
                              : classes.activeColorPrimary
                          }`}
                        >
                        {counterDiff > 0 && '+'}
                          {counterDiff}
                      </span>
                      )}
                    </DefaultTitle>
                  )}
                  { teamPersonalizedMode && (
                    <DefaultTitle className={classes.title}>
                      {intl.formatMessage({ id: 'transfer_list.participants' })}
                    </DefaultTitle>
                  )}
                </Grid>
                <Grid xs item className={classes.boxWrapper}>
                  {teamGroupMode
                    ? displaySelectedTeamGroups()
                    : teamPersonalizedMode && noSelection
                    ? displayTeamPersonalizedChoices(selectedList)
                    : displayTeamGroupChoices(choices, true)}
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {searchMode && (
            <div
              style={{
                maxHeight: maxHeight ? maxHeight : '300px',
                padding: 10,
              }}
              className={classes.dropdown}
              ref={dropdownRef}
            >
              <Grid
                container
                direction='row'
                spacing={4}
                justifyContent='center'
              >
                <Grid item xs={12} container direction='column'>
                  <Grid xs item>
                    {displaySearchedCollaborators(allCollaborators, false)}
                  </Grid>
                </Grid>
              </Grid>
            </div>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = ({ accountDetail, systemImageList, teamList }) => ({
  accountDetail,
  systemImageList,
  teamList,
});

export default connect(mapStateToProps)(withStyles(styles)(TransferList));
