import React, {Component} from "react";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles";
import {injectIntl} from "react-intl";
import {
  HiddenInput,
  TextField,
  Card,
  DefaultTitle,
  Loader,
  Collaborator,
  ProgressButton, Button, DialogActions
} from "../../../../../../components";
import {Grid, IconButton} from "@material-ui/core";
import _ from "lodash";
import {ChallengeSearchBar} from "../../../ChallengeSearchBar";
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Formsy from "formsy-react";

const styles = (theme) => {
  return {
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

class TeamPersonalizedCreationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      team: {
        name: (props.teamSelected !== -1) ? props.teams[props.teamSelected].name : '',
        lookup_id: (props.teamSelected !== -1) ? props.teams[props.teamSelected].lookup_id : '',
        collaborators: (props.teamSelected !== -1) ? props.teams[props.teamSelected].collaborators : []
      },
      collaborators: props.collaborators,
      resultSearch: [],
      search: ''
    };
  }

  updateTeam = (collab) => {
    let team = this.state.team;
    const index = team.collaborators.findIndex(c => c.id === collab.id);
    if (index !== -1) {
      team.collaborators.splice(index, 1);
    } else {
      team.collaborators.push(collab);
    }
    this.setState({ team: team, resultSearch: [] })
    this.handleSearch(this.state.search)
  }

  onSubmit = (model) => {
    const team = this.state.team
    if (!team.collaborators || team.collaborators.length === 0) {
      return
    }
    team.name = model.name
    team.lookup_id = model.lookup_id
    if (this.props.teamSelected !== -1) {
      this.props.onTeamUpdated(team)
    } else {
      this.props.onTeamAdded(team)
    }
  }

  handleSearch = (newValue) => {
    if (!newValue) { this.setState({ search: '', resultSearch: [] }) }
    else {
      const result = []
      this.state.collaborators.forEach((c) => {
        if (c && c.collaborators) {
          c.collaborators.forEach((c1) => {
            if (c1.firstname.toLowerCase().includes(newValue.toLowerCase())
              || c1.lastname.toLowerCase().includes(newValue.toLowerCase())) {
              // Check collaborator is already in team
              const index = this.state.team.collaborators.findIndex(c2 => c2.id === c1.id);
              let isAlreadyInTeam = false;
              this.props.teams.forEach((t) => {
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
      this.setState({ search: newValue, resultSearch: result })
    }
  };

  renderData () {
    const { intl } = this.props;

    return (
      <Formsy onValidSubmit={this.onSubmit}>
        <Grid container spacing={4}>
          <Grid item xs={12} container spacing={2}>
            <Grid item xs={12}>
              <Card>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      name='name'
                      initial={_.get(this.state.team, 'name')}
                      label={intl.formatMessage({ id: 'team.form.name' })}
                      fullWidth
                      required
                      lowercase
                      validationErrors={{
                        isDefaultRequiredValue: intl.formatMessage({
                          id: 'common.form.required_error',
                        }),
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      name='lookup_id'
                      initial={_.get(this.state.team, 'lookup_id')}
                      label={intl.formatMessage({ id: 'team.form.id' })}
                      fullWidth
                      lowercase
                    />
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>
          <Grid item xs={12} container spacing={2}>
            <Grid item xs={12}>
              <ChallengeSearchBar
                search={this.state.search}
                onChange={this.handleSearch}
                fullSize
              />
              <Grid container spacing={2} style={{ marginTop: '10px' }}>
                <Grid item xs={6} direction='column'>
                  <DefaultTitle>
                    Joueurs disponible
                  </DefaultTitle>
                  {this.state.search && this.state.resultSearch.length === 0 ? (
                    <Loader centered />
                  ) : (
                    <Grid container spacing={2} direction='column'>
                      {this.state.search &&
                        this.state.resultSearch?.map((collaborator) => {
                          return (
                            <Grid
                              key={collaborator.id}
                              item
                              xs={12}
                              onClick={() => this.updateTeam(collaborator)}
                            >
                              <Collaborator
                                key={collaborator.id}
                                collaborator={collaborator}
                              />
                              { this.state.team.collaborators.find((c) => {
                                return c.id === collaborator.id
                              }) !== undefined ? (
                                <IconButton
                                  size='small'
                                  className={this.props.classes.itemIcon}
                                >
                                  <FontAwesomeIcon
                                    icon={faMinus}
                                    className={this.props.classes.deleteIcon}
                                  />
                                </IconButton>
                              ) : (
                                <IconButton
                                  size='small'
                                  className={this.props.classes.itemIcon}
                                >
                                  <FontAwesomeIcon
                                    icon={faPlus}
                                    className={this.props.classes.addIcon}
                                  />
                                </IconButton>
                              )}
                            </Grid>
                          );
                        })}
                    </Grid>
                  )}
                </Grid>
                <Grid item xs={6}>
                  <DefaultTitle>
                    Joueurs de l'équipe
                  </DefaultTitle>
                  {this.state.team.collaborators.length === 0 ? (
                    <DefaultTitle>
                      Aucun joueurs
                    </DefaultTitle>
                  ) : (
                    <Grid container spacing={2} direction='column'>
                      {this.state.team.collaborators?.map((collaborator) => {
                          return (
                            <Grid
                              key={collaborator.id}
                              item
                              xs={12}
                              onClick={() => this.updateTeam(collaborator)}
                            >
                              <Collaborator
                                key={collaborator.id}
                                collaborator={collaborator}
                              />
                              <IconButton
                                size='small'
                                className={this.props.classes.itemIcon}
                              >
                                <FontAwesomeIcon
                                  icon={faMinus}
                                  className={this.props.classes.deleteIcon}
                                />
                              </IconButton>
                            </Grid>
                          );
                        })}
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <DialogActions>
          <ProgressButton
            type="submit"
            text={intl.formatMessage({ id: "common.submit" })}
            centered
          />
          <Button onClick={this.props.onNewTeamClose} color="secondary">
            {intl.formatMessage({ id: "common.cancel" })}
          </Button>
        </DialogActions>
      </Formsy>
    );
  }

  render () {
    return this.renderData();
  }
}

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(injectIntl(TeamPersonalizedCreationForm)));


