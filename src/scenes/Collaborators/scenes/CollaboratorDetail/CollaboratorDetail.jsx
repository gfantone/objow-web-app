import React from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash';
import { SubHeader } from './components'
import {Grid, Avatar, Tooltip} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFireAlt, faEdit, faFlagCheckered, faSlidersH} from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-regular-svg-icons'
import { Badge, CollaboratorFilter } from './components'
import { AccentText, Card, DefaultText, DefaultTitle, EmptyState, GridLink, IconButton, InfoText, MainLayoutComponent, ProgressBar} from '../../../../components'
import * as Resources from '../../../../Resources'
import '../../../../helpers/StringHelper'
import * as currentCollaboratorBadgeSummaryListActions from '../../../../services/CollaboratorBadges/CurrentCollaboratorBadgeSummaryList/actions'
import * as collaboratorDetailActions from '../../../../services/Collaborators/CollaboratorDetail/actions'

const styles = {
    iconMargin: {
        marginRight: 16
    },
    levelIcon: {
        height: 100,
        width: 100,
        border: '3px solid #00E58D'
    },
    levelTitle: {
        fontSize: 20,
        marginTop: 8,
        fontWeight: 'bold',
        lineHeight: 1
    },
    levelNumber: {
        fontSize: 17,
        fontWeight: 'bold',
        marginTop: 8,
        lineHeight: 1
    },
    levelPoints: {
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: 8,
        lineHeight: 1
    },
    progressInfo: {
        fontSize: 15
    },

};

class CollaboratorDetail extends MainLayoutComponent {
    constructor(props) {
        super(props);
        this.id = null;
        this.year = null;
        this.buttonInitialized = false;
        this.state = {
            filterOpen: false
        }
    }

    refresh(id, year) {
        const teamId = this.props.match.params.teamId;
        var url = teamId ? `/teams/${teamId}/collaborators/${id}/detail` : `/collaborators/${id}/detail`;
        if (year) url += `?year=${year}`;
        this.props.history.replace(url)
    }

    loadData(props) {
        const id = props.match.params.id;
        const params = new URLSearchParams(window.location.search);
        const year = params.get('year');
        if (id != this.id || year != this.year) {
            this.id = id;
            this.year = year;
            this.props.collaboratorDetailActions.getCollaboratorDetail(id, year);
            this.props.currentCollaboratorBadgeSummaryListActions.getCurrentCollaboratorBadgeSummaryList(id, year)
        }
    }

    handleButtons() {
        const { collaborator } = this.props.collaboratorDetail;
        if (!this.buttonInitialized && collaborator) {
            const { account } = this.props.accountDetail;
            this.buttonInitialized = true;
            if (account.canUpdateCollaboratorPassword && (account.role.code == 'A' || account.role.code == 'M' && account.team && collaborator.team && account.team.id == collaborator.team.id)) {
                const { classes } = this.props;
                this.props.handleButtons(<div>
                    <Tooltip title={Resources.COLLABORATOR_DETAIL_PASSWORD_BUTTON}>
                        <IconButton size='small' onClick={this.handleEditCollaborator.bind(this)} classes={{root: classes.iconMargin}}><FontAwesomeIcon icon={faEdit} /></IconButton>
                    </Tooltip>
                    <Tooltip title={Resources.COLLABORATOR_DETAIL_FILTER_BUTTON}>
                        <IconButton size='small' onClick={this.handleFilterOpen.bind(this)}><FontAwesomeIcon icon={faSlidersH} /></IconButton>
                    </Tooltip>
                </div>)
            } else {
                this.props.handleButtons(<IconButton size='small' onClick={this.handleFilterOpen.bind(this)}><FontAwesomeIcon icon={faSlidersH} /></IconButton>)
            }
        } else {
            this.props.handleButtons(<IconButton size='small' onClick={this.handleFilterOpen.bind(this)}><FontAwesomeIcon icon={faSlidersH} /></IconButton>)
        }
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

    handleFilterChange(collaborator, year) {
        const collaboratorId = this.props.accountDetail.account.role.code == 'C' ? this.id : collaborator;
        this.refresh(collaboratorId, year)
    }

    handleEditCollaborator = () => {
        this.props.history.push(`/collaborators/${this.id}/password`)
    };

    componentDidMount() {
        this.props.handleTitle('Collaborateurs');
        this.props.handleSubHeader(<SubHeader />);
        this.props.handleMaxWidth('md');
        this.props.activateReturn();
        this.handleButtons();
        this.loadData(this.props)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.loadData(this.props)
    }

    renderEmptyState() {
        return <EmptyState title={Resources.COLLABORATOR_DETAIL_EMPTY_STATE_TITLE} />
    }

    renderData() {
        const { account } = this.props.accountDetail;
        const { badges } = this.props.currentCollaboratorBadgeSummaryList;
        const { collaborator } = this.props.collaboratorDetail;
        const levelProgression = collaborator.nextLevel ? Math.round((collaborator.generalRank.points / collaborator.nextLevel.points) * 100) : 100;
        const nextLevelInfo = collaborator.nextLevel ? Resources.COLLABORATOR_DETAIL_INFO_NEXT_LEVEL.format(collaborator.nextLevel.number, collaborator.nextLevel.points) : Resources.COLLABORATOR_DETAIL_INFO_MAX_LEVEL;
        const { classes } = this.props

        return (
            <div>
                <Grid container spacing={2} style={{marginTop: 8}}>
                    { collaborator.citation && <Grid item xs={12}>
                        <InfoText align='center'>
                            « {collaborator.citation} »
                        </InfoText>
                    </Grid> }
                    <Grid item container spacing={1} xs={12}>
                          <Grid item align='center' xs={12}>
                              {
                                _.get(collaborator, 'level.icon.path') && (
                                  <Avatar src={collaborator.level.icon.path} className={classes.levelIcon} />
                                )
                              }

                              {
                                _.get(collaborator, 'level.title') && (
                                  <Grid item>
                                      <InfoText className={classes.levelTitle}>
                                        {collaborator.level.title}
                                      </InfoText>
                                  </Grid>
                                )
                              }
                              {
                                _.get(collaborator, 'generalRank.level') && (
                                  <Grid item>
                                    <AccentText className={classes.levelNumber}>
                                      {Resources.DRAWER_LEVEL_LABEL.format(collaborator.generalRank.level)}
                                    </AccentText>
                                  </Grid>
                                )
                              }
                              <Grid item>
                                <DefaultText className={classes.levelPoints}>
                                  <FontAwesomeIcon icon={faFireAlt} /> {Resources.COLLABORATOR_DETAIL_INFO_TOTAL_POINTS.format(collaborator.generalRank.points)}
                                </DefaultText>
                              </Grid>
                          </Grid>

                        <Grid item xs={12}>
                            <Card>
                                <Grid container spacing={1}>
                                    <Grid container item spacing={1} xs={12}>
                                        <Grid item container xs={12}>
                                            <Grid item xs>
                                                <DefaultText className={classes.progressInfo}>{Resources.COLLABORATOR_DETAIL_INFO_CURRENT_LEVEL.format(
                                                    collaborator.generalRank.points - collaborator.level.points
                                                  )}
                                                  <InfoText className={classes.progressInfo} component='span'>
                                                    {Resources.COLLABORATOR_DETAIL_INFO_CURRENT_LEVEL_MAX.format(
                                                      collaborator.nextLevel.points - collaborator.level.points
                                                    )}
                                                  </InfoText>
                                                </DefaultText>
                                            </Grid>
                                            <Grid item>
                                                <AccentText className={classes.progressInfo}>{nextLevelInfo}</AccentText>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <ProgressBar value={levelProgression} animate />
                                        </Grid>
                                    </Grid>
                                    <Grid container item spacing={1} xs={12} className={classes.progressWrapper}>
                                        { account.hasGeneralRankAccess && collaborator.generalRank.rank && <Grid item>
                                            <DefaultText>
                                                <FontAwesomeIcon icon={faFlagCheckered} /> {collaborator.generalRank.rank == 1 ? Resources.COLLABORATOR_DETAIL_INFO_FIRST_RANK_TEXT.format(collaborator.generalRank.rank) : Resources.COLLABORATOR_DETAIL_INFO_OTHER_RANK_TEXT.format(collaborator.generalRank.rank)} <InfoText component='span'>/ {collaborator.collaborators}</InfoText>
                                            </DefaultText>
                                        </Grid> }
                                        <Grid item>
                                            <DefaultText>
                                                <FontAwesomeIcon icon={faStar} /> {Resources.COLLABORATOR_DETAIL_INFO_VICTORIES.format(collaborator.generalRank.victories)}
                                            </DefaultText>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                    </Grid>
                    <Grid item container spacing={2} xs={12}>
                        <Grid item xs={12}>
                            <DefaultTitle>{Resources.COLLABORATOR_DETAIL_BADGE_AREA}</DefaultTitle>
                        </Grid>
                        <Grid item xs={12}>
                            <Card>
                                { badges.length > 0 && <Grid container spacing={2}>
                                    { badges.map(badge => {
                                        return (
                                            <GridLink key={badge.id} item xs={6} sm={4} md={3} component={Link} to={`/badges/detail/${badge.levelId}`}>
                                                <Badge badge={badge} />
                                            </GridLink>
                                        )
                                    }) }
                                </Grid> }
                                { badges.length == 0 && <DefaultText>Aucun défi réalisé</DefaultText> }
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        )
    }

    render() {
        const { badges, loading: currentCollaboratorBadgeSummaryListLoading } = this.props.currentCollaboratorBadgeSummaryList;
        const { collaborator, loading: collaboratorDetailLoading } = this.props.collaboratorDetail;

        const loading = currentCollaboratorBadgeSummaryListLoading || collaboratorDetailLoading;
        const teamId = collaborator && collaborator.team ? collaborator.team.id : null;
        const collaboratorId = collaborator ? collaborator.id : null;

        return (
            <div>
                { !loading && badges && collaborator && collaborator.generalRank && this.renderData() }
                { !loading && badges && collaborator && !collaborator.generalRank && this.renderEmptyState() }
                <CollaboratorFilter
                    open={this.state.filterOpen}
                    onClose={this.handleFilterClose.bind(this)}
                    onChange={this.handleFilterChange.bind(this)}
                    team={teamId}
                    collaborator={collaboratorId}
                    year={this.year}
                />
            </div>
        )
    }
}

const mapStateToProps = ({ accountDetail, currentCollaboratorBadgeSummaryList, collaboratorDetail }) => ({
    accountDetail,
    currentCollaboratorBadgeSummaryList,
    collaboratorDetail
});

const mapDispatchToProps = (dispatch) => ({
    currentCollaboratorBadgeSummaryListActions: bindActionCreators(currentCollaboratorBadgeSummaryListActions, dispatch),
    collaboratorDetailActions: bindActionCreators(collaboratorDetailActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CollaboratorDetail))
