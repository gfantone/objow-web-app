import React, {useState} from "react";
import {ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Grid, IconButton} from "@material-ui/core";
import {
  Card,
  Dialog,
  DefaultTitle,
  DialogTitle, Collaborator, Button, Avatar, TextField, Loader, DialogActions, ProgressButton, TransferList,
} from "../../../../components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faChevronUp, faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles";
import {useIntl} from "react-intl";
import {TeamPersonalizedCreationForm} from "./components/TeamPersonalizedCreationForm";
import {AvatarGroup} from "@material-ui/lab";
import _ from 'lodash';
import {ChallengeSearchBar} from "../ChallengeSearchBar";
import Formsy from "formsy-react";

// const styles = {
//   teamDialog: {
//     width: "90%",
//     "& .MuiFormControlLabel-root": {
//       marginLeft: 0,
//     },
//   },
// };

const styles = (theme) => {
  return {
    teamDialog: {
      width: "90%",
      "& .MuiFormControlLabel-root": {
        marginLeft: 0,
      },
    },
    itemIcon: {
      position: 'relative',
      left: '50%',
      top: '-25px',
      marginTop: '-10px',
      zIndex: 40,
    },
    addIcon: {
      color: theme.palette.primary.main,
    },
    deleteIcon: {
      color: '#E50000',
    },
  }
};

const TeamPersonalizedList = ({
  collaborators,
  onChange,
  selected,
  ...props
}) => {
  const intl = useIntl();
  const { classes } = props;
  const [newTeamOpen, setNewTeamOpen] = useState(false);
  const [teams, setTeams] = useState(selected || []);
  const [teamSelected, setTeamSelected] = useState(-1);
  const [expandIcon, setExpandIcon] = useState(faChevronDown);
  const [team, setTeam] = useState({
    name: '',
    lookup_id: '',
    collaborators: []
  });
  const [search, setSearch] = useState('');
  const [resultSearch, setResultSearch] = useState([]);

  const onExpand = (event, expanded, callback) => {
    setExpandIcon(expanded === true ? faChevronUp : faChevronDown);
  };

  const onTeamUpdated = (team) => {
    if (teamSelected !== -1 && teams[teamSelected]) {
      let newTeams = [...teams]
      newTeams[teamSelected] = team
      setTeams(newTeams);
    }
    onNewTeamClose();
  }

  const updateTeam = (collab) => {
    const index = team.collaborators.findIndex(c => c.id === collab.id);
    if (index !== -1) {
      team.collaborators.splice(index, 1);
    } else {
      team.collaborators.push(collab);
    }
    setResultSearch([]);
    // this.setState({ team: team, resultSearch: [] })
    this.handleSearch(search)
  }

  const handleSearch = () => {
    if (!search) {
      setResultSearch([]);
    } else {
      const result = []
      collaborators.forEach((c) => {
        if (c && c.collaborators) {
          c.collaborators.forEach((c1) => {
            if (c1.firstname.toLowerCase().includes(search.toLowerCase())
              || c1.lastname.toLowerCase().includes(search.toLowerCase())) {
              // Check collaborator is already in team
              const index = team.collaborators.findIndex(c2 => c2.id === c1.id);
              let isAlreadyInTeam = false;
              teams.forEach((t) => {
                const i = t.collaborators.findIndex(tc => tc.id === c1.id);
                if (i !== -1) isAlreadyInTeam = true;
              })
              if (index === -1 && !isAlreadyInTeam) {
                result.push(c1);
              }
            }
          })
        }
      })
      setResultSearch(result);
      // this.setState({ search: newValue, resultSearch: result })
    }
  };

  const onTeamAdded = (team) => {
    let newTeams = [...teams]
    newTeams.push(team);
    setTeams(newTeams);
    setTimeout(() => {
      onChange(newTeams)
    }, 600);
    onNewTeamClose();
  }

  const onDeleteTeam = (teamId) => {
    if (teams && teams[teamId]) {
      let newTeams = [...teams]
      newTeams.splice(teamId, 1);
      setTeams(newTeams);
    }
  };

  const onUpdateTeam = (teamId) => {
    setTeamSelected(teamId);
    setTeam({
      name: teams[teamId].name || '',
      lookup_id: teams[teamId].lookup_id || '',
      collaborators: teams[teamId].collaborators || []
    })
    setNewTeamOpen(true)
  };

  const onNewTeamOpen = () => {
    setTeam({
      name: '',
      lookup_id: '',
      collaborators: []
    })
    setSearch('')
    setResultSearch([])
    setNewTeamOpen(true)
    setTeamSelected(-1)
  }

  const onNewTeamClose = () => {
    setNewTeamOpen(false)
    setTeam({
      name: '',
      lookup_id: '',
      collaborators: []
    })
    setTeamSelected(-1)
  };

  const onSubmit = (model) => {
    // const team = this.state.team
    if (!team.collaborators || team.collaborators.length === 0) {
      return
    }
    team.name = model.name
    team.lookup_id = model.lookup_id
    if (teamSelected !== -1) {
      onTeamUpdated(team)
    } else {
      onTeamAdded(team)
    }
  }

  return (
    <div>
      <Dialog
        open={newTeamOpen}
        onClose={onNewTeamClose}
        classes={{ paper: classes.teamDialog }}
        maxWidth="md"
      >
        <DialogTitle>
          { intl.formatMessage({ id: "team.perso.creation_title" }) }
        </DialogTitle>

        <TeamPersonalizedCreationForm
          onNewTeamClose={onNewTeamClose}
          collaborators={collaborators}
          teams={teams}
          onTeamAdded={onTeamAdded}
          onTeamUpdated={onTeamUpdated}
          teamSelected={teamSelected}
        />
        {/*<Formsy onValidSubmit={onSubmit}>*/}
        {/*  <Grid container spacing={4}>*/}
        {/*    <Grid item xs={12} container spacing={2}>*/}
        {/*      <Grid item xs={12}>*/}
        {/*        <Card>*/}
        {/*          <Grid container spacing={2}>*/}
        {/*            <Grid item xs={6}>*/}
        {/*              <TextField*/}
        {/*                name='name'*/}
        {/*                initial={_.get(team, 'name')}*/}
        {/*                label={intl.formatMessage({ id: 'team.form.name' })}*/}
        {/*                fullWidth*/}
        {/*                required*/}
        {/*                lowercase*/}
        {/*                validationErrors={{*/}
        {/*                  isDefaultRequiredValue: intl.formatMessage({*/}
        {/*                    id: 'common.form.required_error',*/}
        {/*                  }),*/}
        {/*                }}*/}
        {/*              />*/}
        {/*            </Grid>*/}
        {/*            <Grid item xs={6}>*/}
        {/*              <TextField*/}
        {/*                name='lookup_id'*/}
        {/*                initial={_.get(team, 'lookup_id')}*/}
        {/*                label={intl.formatMessage({ id: 'team.form.id' })}*/}
        {/*                fullWidth*/}
        {/*                lowercase*/}
        {/*              />*/}
        {/*            </Grid>*/}
        {/*          </Grid>*/}
        {/*        </Card>*/}
        {/*      </Grid>*/}
        {/*    </Grid>*/}
        {/*    <Grid item xs={12} container spacing={2}>*/}
        {/*      <Grid item xs={12}>*/}
        {/*        <ChallengeSearchBar*/}
        {/*          search={search}*/}
        {/*          onChange={handleSearch}*/}
        {/*          fullSize*/}
        {/*        />*/}
        {/*        <Grid container spacing={2} style={{ marginTop: '10px' }}>*/}
        {/*          <Grid item xs={6} direction='column'>*/}
        {/*            <DefaultTitle>*/}
        {/*              Joueurs disponible*/}
        {/*            </DefaultTitle>*/}
        {/*            {search && resultSearch.length === 0 ? (*/}
        {/*              <Loader centered />*/}
        {/*            ) : (*/}
        {/*              <Grid container spacing={2} direction='column'>*/}
        {/*                {search && resultSearch?.map((collaborator) => {*/}
        {/*                    return (*/}
        {/*                      <Grid*/}
        {/*                        key={collaborator.id}*/}
        {/*                        item*/}
        {/*                        xs={12}*/}
        {/*                        onClick={() => updateTeam(collaborator)}*/}
        {/*                      >*/}
        {/*                        <Collaborator*/}
        {/*                          key={collaborator.id}*/}
        {/*                          collaborator={collaborator}*/}
        {/*                        />*/}
        {/*                        { team.collaborators.find((c) => {*/}
        {/*                          return c.id === collaborator.id*/}
        {/*                        }) !== undefined ? (*/}
        {/*                          <IconButton*/}
        {/*                            size='small'*/}
        {/*                            className={classes.itemIcon}*/}
        {/*                          >*/}
        {/*                            <FontAwesomeIcon*/}
        {/*                              icon={faMinus}*/}
        {/*                              className={classes.deleteIcon}*/}
        {/*                            />*/}
        {/*                          </IconButton>*/}
        {/*                        ) : (*/}
        {/*                          <IconButton*/}
        {/*                            size='small'*/}
        {/*                            className={classes.itemIcon}*/}
        {/*                          >*/}
        {/*                            <FontAwesomeIcon*/}
        {/*                              icon={faPlus}*/}
        {/*                              className={classes.addIcon}*/}
        {/*                            />*/}
        {/*                          </IconButton>*/}
        {/*                        )}*/}
        {/*                      </Grid>*/}
        {/*                    );*/}
        {/*                  })}*/}
        {/*              </Grid>*/}
        {/*            )}*/}
        {/*          </Grid>*/}
        {/*          <Grid item xs={6}>*/}
        {/*            <DefaultTitle>*/}
        {/*              Joueurs de l'équipe*/}
        {/*            </DefaultTitle>*/}
        {/*            {team.collaborators.length === 0 ? (*/}
        {/*              <DefaultTitle>*/}
        {/*                Aucun joueurs*/}
        {/*              </DefaultTitle>*/}
        {/*            ) : (*/}
        {/*              <Grid container spacing={2} direction='column'>*/}
        {/*                {team.collaborators?.map((collaborator) => {*/}
        {/*                  return (*/}
        {/*                    <Grid*/}
        {/*                      key={collaborator.id}*/}
        {/*                      item*/}
        {/*                      xs={12}*/}
        {/*                      onClick={() => updateTeam(collaborator)}*/}
        {/*                    >*/}
        {/*                      <Collaborator*/}
        {/*                        key={collaborator.id}*/}
        {/*                        collaborator={collaborator}*/}
        {/*                      />*/}
        {/*                      <IconButton*/}
        {/*                        size='small'*/}
        {/*                        className={classes.itemIcon}*/}
        {/*                      >*/}
        {/*                        <FontAwesomeIcon*/}
        {/*                          icon={faMinus}*/}
        {/*                          className={classes.deleteIcon}*/}
        {/*                        />*/}
        {/*                      </IconButton>*/}
        {/*                    </Grid>*/}
        {/*                  );*/}
        {/*                })}*/}
        {/*              </Grid>*/}
        {/*            )}*/}
        {/*          </Grid>*/}
        {/*        </Grid>*/}
        {/*      </Grid>*/}
        {/*    </Grid>*/}
        {/*  </Grid>*/}
        {/*  <DialogActions>*/}
        {/*    <ProgressButton*/}
        {/*      type="submit"*/}
        {/*      text={intl.formatMessage({ id: "common.submit" })}*/}
        {/*      centered*/}
        {/*    />*/}
        {/*    <Button onClick={onNewTeamClose} color="secondary">*/}
        {/*      {intl.formatMessage({ id: "common.cancel" })}*/}
        {/*    </Button>*/}
        {/*  </DialogActions>*/}
        {/*</Formsy>*/}
      </Dialog>
      {/*<TransferList*/}
      {/*  teamGroupMode={_.get(typeObject, 'code') === 'TG'}*/}
      {/*  enableCollaboratorSelect={*/}
      {/*    _.get(typeObject, 'code') === 'CC'*/}
      {/*  }*/}
      {/*  enableTeamSelect={_.includes(*/}
      {/*    ['CC', 'CT'],*/}
      {/*    _.get(typeObject, 'code')*/}
      {/*  )}*/}
      {/*  onChange={onChange}*/}
      {/*  selected={selected}*/}
      {/*  defaultChoicesExpanded={participantsChoiceExpanded}*/}
      {/*/>*/}
      <Card>
        <Grid container justifyContent="space-between">
          <Grid item>
            <DefaultTitle>
              { intl.formatMessage({ id: 'team.perso.list_title' }) }
            </DefaultTitle>
          </Grid>
          <Grid item>
            <Grid item xs={2}>
              <IconButton color="primary" size="small">
                <FontAwesomeIcon
                  icon={faPlus}
                  onClick={onNewTeamOpen}
                />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid container justifyContent="center">
          { teams.length === 0 ? (
            <DefaultTitle>Aucune équipe</DefaultTitle>
          ): (
            <Grid container>
              {teams?.map((team, idx) => {
                return (
                  <Grid item xs={12} key={team.name}>
                    <ExpansionPanel onChange={onExpand} style={{ marginBottom: '5px' }}>
                      <ExpansionPanelSummary>
                        <Grid container spacing={2} style={{ textAlign: 'left' }}>
                          <Grid item xs zeroMinWidth alignContent='center'>
                            <DefaultTitle>
                              {team.name}
                            </DefaultTitle>
                          </Grid>
                          <Grid item>
                            <AvatarGroup max={6}>
                              {team.collaborators.map((collaborator) => {
                                return (
                                  <Avatar
                                    key={collaborator.id}
                                    fontSize={12}
                                    src={collaborator.photo}
                                    entityId={collaborator.id}
                                  />
                                );
                              })}
                            </AvatarGroup>
                          </Grid>
                        </Grid>
                        <IconButton size='small'>
                          <FontAwesomeIcon icon={expandIcon} />
                        </IconButton>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <Grid container spacing={2}>
                          {team.collaborators?.map((collaborator) => {
                            return (
                              <Grid item xs={6}>
                                <Collaborator
                                  key={collaborator.id}
                                  collaborator={collaborator}
                                />
                              </Grid>
                            );
                          })}
                          <Grid container justifyContent='flex-end' style={{ marginTop: '10px' }} spacing={2}>
                            <Grid item>
                              <Button onClick={() => onDeleteTeam(idx)}>Supprimer l'équipe</Button>
                            </Grid>
                            <Grid item>
                              <Button onClick={() => onUpdateTeam(idx)}>Modifier l'équipe</Button>
                            </Grid>
                          </Grid>
                        </Grid>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  </Grid>
                );
              })}
            </Grid>
          )}
        </Grid>
      </Card>
    </div>
  );
}

const mapStateToProps = ({}) => ({});

export default connect(mapStateToProps)(withStyles(styles)(TeamPersonalizedList));
