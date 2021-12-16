import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import withWidth, {isWidthDown} from '@material-ui/core/withWidth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy, faEdit, faSlidersH, faTrash, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { Menu, MenuItem, ListItemText, ListItemIcon } from '@material-ui/core'
import { Redirect } from 'react-router-dom'
import { SubHeader } from './components'
import '../../../../helpers/DateHelper'
import { ChallengeCondition, CollaboratorChallengeRankList, ChallengeDetailFilter } from '../../components'
import { IconButton, MainLayoutComponent, Dialog, DialogActions, DialogContent, DialogTitle, Button, ProgressButton } from '../../../../components'
import * as Resources from '../../../../Resources'
import * as collaboratorChallengeRankListActions from '../../../../services/CollaboratorChallengeRanks/CollaboratorChallengeRankList/actions'
import * as teamCollaboratorChallengeDetailActions from '../../../../services/TeamCollaboratorChallenges/TeamCollaboratorChallengeDetail/actions'
import * as teamCollaboratorChallengeGoalListActions from '../../../../services/TeamCollaboratorChallengeGoals/TeamCollaboratorChallengeGoalList/actions'
import * as challengeDeleteActions from '../../../../services/Challanges/ChallengeDelete/actions'
import {Tooltip} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";

const styles = {
    iconMargin: {
        marginLeft: 16
    }
};

class TeamCollaboratorChallengeDetail extends MainLayoutComponent {
    constructor(props) {
        super(props);
        const { account } = this.props.accountDetail;
        this.initialized = false;
        this.state = {
            page: account.hasChallengeRankAccess ? 0 : 1,
            deletePromptOpen: false,
            mobileMenuAnchor: null
        }
    }

    handleDuplicate() {
        const { challenge } = this.props.teamCollaboratorChallengeDetail;
        var url = `/challenges/duplication/${challenge.sourceId}`;
        if (challenge.teamId) url += `?team=${challenge.teamId}`;
        this.props.history.push(url)
    }

    handleFilterOpen() {
        this.setState({
            ...this.state,
            filterOpen: true
        })
    }

    handleFilterClose() {
        this.setState({
            ...this.state,
            filterOpen: false
        })
    }

    handleEdit() {
        const { challenge } = this.props.teamCollaboratorChallengeDetail;
        this.props.history.push(`/challenges/modification/${challenge.sourceId}`)
    }
    async onDelete() {
        const { challenge } = this.props.teamCollaboratorChallengeDetail;

        await this.props.challengeDeleteActions.deleteChallenge(challenge);
        this.props.history.goBack();
    }
    setDeletePromptOpen(isOpen) {
      this.setState({
        ...this.state,
        deletePromptOpen: isOpen
      })
    }

    handlePageChange(page) {
        this.setState({
            ...this.state,
            page: page
        })
    }

    refresh(team) {
        const id = this.props.match.params.id
        var url = `/challenges/detail/team-collaborator/${id}`;
        if(team) url += `?team=${team}`;
        this.props.history.replace(url)
    }

    handleFilterChange(team) {
        this.refresh(team)
    }

    setMobileMenuAnchor = (el) => {
      this.initialized = false
      this.setState({
        ...this.state,
        mobileMenuAnchor: el
      })
    }

    handleResize = () => {
      if(this.mobileScreen !== this.props.width) {
        this.initialized = false
        this.mobileScreen = this.props.width
      }
    }
    componentDidMount() {
        const { account } = this.props.accountDetail;
        const id = this.props.match.params.id;
        this.props.handleTitle(account.challengeWording || Resources.CHALLENGE_SHORT_TITLE);
        this.props.handleSubHeader(<SubHeader onChange={this.handlePageChange.bind(this)} activateRank={account.hasChallengeRankAccess} />);
        this.props.handleMaxWidth('md');
        this.props.activateReturn();
        this.props.collaboratorChallengeRankListActions.getCollaboratorChallengeRankListByTeamCollaboratorChallenge(id);
        this.props.teamCollaboratorChallengeDetailActions.getTeamCollaboratorChallengeDetail(id);
        this.props.teamCollaboratorChallengeGoalListActions.getTeamCollaboratorChallengeGoalList(id)
        window.addEventListener('resize', this.handleResize);
        this.mobileScreen = this.props.width
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { challenge } = this.props.teamCollaboratorChallengeDetail;
        const { account } = this.props.accountDetail;

        const mobileScreen = isWidthDown('xs', this.props.width)


        if ((!this.initialized) && challenge) {

            const { classes } = this.props;
            this.initialized = true;
            const includesManagerTeam = account.team && challenge.participantTeamIds.length === 1 && challenge.participantTeamIds.indexOf(account.team.id) >= 0
            const canEdit = account.hasManagerChallengeEditAccess && includesManagerTeam || account.role.code === 'A'


            const desktopMenu = (
              <div>
                {
                  canEdit && (
                    <Tooltip title={Resources.TEAM_COLLABORATOR_CHALLENGE_DETAIL_DUPLICATE_BUTTON}>
                      <IconButton size={'small'} onClick={this.handleDuplicate.bind(this)}><FontAwesomeIcon icon={faCopy}/></IconButton>
                    </Tooltip>
                  )
                }
                { canEdit && challenge.end.toDate2().getTime() > new Date().getTime() &&
                  (
                    <React.Fragment>
                      <Tooltip title={Resources.TEAM_COLLABORATOR_CHALLENGE_DETAIL_DELETE_BUTTON}>
                        <IconButton size={'small'} onClick={() => this.setDeletePromptOpen(true)} className={classes.iconMargin}><FontAwesomeIcon icon={faTrash}/></IconButton>
                      </Tooltip>
                      <Tooltip title={Resources.TEAM_COLLABORATOR_CHALLENGE_DETAIL_UPDATE_BUTTON}>
                        <IconButton size={'small'} onClick={this.handleEdit.bind(this)} className={classes.iconMargin}><FontAwesomeIcon icon={faEdit}/></IconButton>
                      </Tooltip>
                    </React.Fragment>
                  )
                }

                <IconButton size='small' onClick={this.handleFilterOpen.bind(this)} className={classes.iconMargin}><FontAwesomeIcon icon={faSlidersH} /></IconButton>
              </div>
            )
            const open = Boolean(this.state.mobileMenuAnchor)
            const arrowIcon = open ? faChevronUp : faChevronDown
            const mobileMenu = (
              <div>
                <IconButton
                  aria-controls="basic-menu"
                  aria-haspopup="true"
                  size={'small'}
                  onClick={(event) => this.setMobileMenuAnchor(open ? null : event.currentTarget)}
                  className={classes.iconMargin}
                >
                  <FontAwesomeIcon icon={arrowIcon}/>
                </IconButton>
                <Menu
                  id="basic-menu"
                  anchorEl={this.state.mobileMenuAnchor}
                  open={open}
                  onClose={() => this.setMobileMenuAnchor()}
                  elevation={0}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  style={{marginTop: 30}}
                >
                  {
                    canEdit && (
                      <MenuItem onClick={this.handleDuplicate.bind(this)}>
                        <ListItemIcon style={{color: '#333', minWidth: 0, marginRight: 10}}>
                          <FontAwesomeIcon icon={faCopy}/>
                        </ListItemIcon>
                        <ListItemText>
                          {Resources.TEAM_COLLABORATOR_CHALLENGE_DETAIL_DUPLICATE_BUTTON}
                        </ListItemText>
                      </MenuItem>
                    )
                  }
                  { canEdit && challenge.end.toDate2().getTime() > new Date().getTime() &&
                    (
                      <React.Fragment>
                        <MenuItem onClick={() => this.setDeletePromptOpen(true)}>
                          <ListItemIcon style={{color: '#333', minWidth: 0, marginRight: 10}}>
                            <FontAwesomeIcon icon={faTrash}/>
                          </ListItemIcon>
                          <ListItemText>
                            {Resources.TEAM_COLLABORATOR_CHALLENGE_DETAIL_DELETE_BUTTON}
                          </ListItemText>
                        </MenuItem>
                        <MenuItem onClick={this.handleEdit.bind(this)}>
                          <ListItemIcon style={{color: '#333', minWidth: 0, marginRight: 10}}>
                            <FontAwesomeIcon icon={faEdit}/>
                          </ListItemIcon>
                          <ListItemText>
                            {Resources.TEAM_COLLABORATOR_CHALLENGE_DETAIL_UPDATE_BUTTON}
                          </ListItemText>
                        </MenuItem>

                      </React.Fragment>
                    )
                  }
                  <MenuItem onClick={this.handleFilterOpen.bind(this)}>
                    <ListItemIcon style={{color: '#333', minWidth: 0, marginRight: 10}}>
                      <FontAwesomeIcon icon={faSlidersH}/>
                    </ListItemIcon>
                    <ListItemText>
                      Filtrer
                    </ListItemText>
                  </MenuItem>
                </Menu>
              </div>
            )
            this.props.handleButtons(
              mobileScreen ? mobileMenu : desktopMenu
            );

        }
    }

    render() {
        const { account } = this.props.accountDetail;
        const { ranks, loading } = this.props.collaboratorChallengeRankList;
        const { challenge } = this.props.teamCollaboratorChallengeDetail;
        const { goals } = this.props.teamCollaboratorChallengeGoalList;

        if(!account.hasChallengeAccess) {
          return <Redirect to={'/'} />
        }

        // Filter by team
        const params = new URLSearchParams(window.location.search);
        const team = params.get('team');

        return (
            <div>
                { account.hasChallengeRankAccess && this.state.page == 0 && ranks &&
                  <CollaboratorChallengeRankList ranks={team ? ranks.filter(rank => rank.collaborator.team.id === parseInt(team)) : ranks} />
                }
                { this.state.page == 1 && challenge && goals && <ChallengeCondition challenge={challenge} goals={goals} /> }
                {
                  this.state.filterOpen &&
                  <ChallengeDetailFilter
                    open={this.state.filterOpen}
                    onClose={this.handleFilterClose.bind(this)}
                    onChange={this.handleFilterChange.bind(this)}
                    team={team}
                    myTeam={account.team}
                  />
                }
                <Dialog open={this.state.deletePromptOpen} onClose={() => this.setDeletePromptOpen(false)}>
                    <DialogTitle>Êtes-vous sûr de vouloir supprimer ce challenge ?</DialogTitle>
                    <DialogActions>
                        <Button onClick={() => this.setDeletePromptOpen(false)} color='secondary'>Non</Button>
                        <ProgressButton type='button' text='Oui' loading={loading} onClick={this.onDelete.bind(this)}/>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

const mapStateToProps = ({ accountDetail, collaboratorChallengeRankList, teamCollaboratorChallengeDetail, teamCollaboratorChallengeGoalList }) => ({
    accountDetail,
    collaboratorChallengeRankList,
    teamCollaboratorChallengeDetail,
    teamCollaboratorChallengeGoalList
});

const mapDispatchToProps = (dispatch) => ({
    collaboratorChallengeRankListActions: bindActionCreators(collaboratorChallengeRankListActions, dispatch),
    teamCollaboratorChallengeDetailActions: bindActionCreators(teamCollaboratorChallengeDetailActions, dispatch),
    teamCollaboratorChallengeGoalListActions: bindActionCreators(teamCollaboratorChallengeGoalListActions, dispatch),
    challengeDeleteActions: bindActionCreators(challengeDeleteActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withWidth()(TeamCollaboratorChallengeDetail)))
