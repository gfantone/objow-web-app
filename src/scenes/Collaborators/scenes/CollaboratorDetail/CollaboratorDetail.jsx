import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { SubHeader } from './components'
import {Grid, Tooltip} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEdit, faFlagCheckered, faSlidersH} from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-regular-svg-icons'
import { Badge, CollaboratorFilter } from './components'
import {AccentText, Card, DefaultText, DefaultTitle, EmptyState, IconButton, InfoText, MainLayoutComponent, ProgressBar} from '../../../../components'
import * as currentCollaboratorBadgeSummaryListActions from '../../../../services/CollaboratorBadges/CurrentCollaboratorBadgeSummaryList/actions'
import * as collaboratorDetailActions from '../../../../services/Collaborators/CollaboratorDetail/actions'

const styles = {
    iconMargin: {
        marginRight: 16
    }
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
            const { account } = this.props.auth;
            this.buttonInitialized = true;
            if (account.canUpdateCollaboratorPassword && (account.role.code == 'A' || account.role.code == 'M' && account.team && collaborator.team && account.team.id == collaborator.team.id)) {
                const { classes } = this.props;
                this.props.handleButtons(<div>
                    <Tooltip title='Modifier le mot de passe'>
                        <IconButton size='small' onClick={this.handleEditCollaborator.bind(this)} classes={{root: classes.iconMargin}}><FontAwesomeIcon icon={faEdit} /></IconButton>
                    </Tooltip>
                    <Tooltip title='Filtrer'>
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
        const collaboratorId = this.props.auth.account.role.code == 'C' ? this.id : collaborator;
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
        return <EmptyState title={'Aucune donnée disponible'} />
    }

    renderData() {
        const { account } = this.props.auth;
        const { badges } = this.props.currentCollaboratorBadgeSummaryList;
        const { collaborator } = this.props.collaboratorDetail;
        const levelProgression = collaborator.nextLevel ? Math.round((collaborator.generalRank.points / collaborator.nextLevel.points) * 100) : 100;
        const nextLevelInfo = collaborator.nextLevel ? `Level ${collaborator.nextLevel.number} / ${collaborator.nextLevel.points} PTS` : 'Level max atteint';

        return (
            <div>
                <Grid container spacing={2} style={{marginTop: 8}}>
                    { collaborator.citation && <Grid item xs={12}>
                        <InfoText align='center'>
                            « {collaborator.citation} »
                        </InfoText>
                    </Grid> }
                    <Grid item container spacing={1} xs={12}>
                        <Grid item xs={12}>
                            <DefaultTitle>Informations générales</DefaultTitle>
                        </Grid>
                        <Grid item xs={12}>
                            <Card>
                                <Grid container spacing={1}>
                                    <Grid container item spacing={1} xs={12}>
                                        <Grid item container xs={12}>
                                            <Grid item xs>
                                                <DefaultText>Level {collaborator.generalRank.level} / {collaborator.generalRank.points} PTS</DefaultText>
                                            </Grid>
                                            <Grid item>
                                                <AccentText>{nextLevelInfo}</AccentText>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <ProgressBar value={levelProgression} />
                                        </Grid>
                                    </Grid>
                                    <Grid container item spacing={2} xs={12}>
                                        { account.hasGeneralRankAccess && collaborator.generalRank.rank && <Grid item>
                                            <DefaultText>
                                                <FontAwesomeIcon icon={faFlagCheckered} /> {collaborator.generalRank.rank}{ collaborator.generalRank.rank == 1 ? 'er' : 'ème' } <InfoText component='span'>/ {collaborator.collaborators}</InfoText>
                                            </DefaultText>
                                        </Grid> }
                                        <Grid item>
                                            <DefaultText>
                                                <FontAwesomeIcon icon={faStar} /> {collaborator.generalRank.victories} victoire(s)
                                            </DefaultText>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                    </Grid>
                    <Grid item container spacing={1} xs={12}>
                        <Grid item xs={12}>
                            <DefaultTitle>Défis</DefaultTitle>
                        </Grid>
                        <Grid item xs={12}>
                            <Card>
                                { badges.length > 0 && <Grid container spacing={2}>
                                    { badges.map(badge => {
                                        return (
                                            <Grid key={badge.id} item xs={6} sm={4} md={3}>
                                                <Badge badge={badge} />
                                            </Grid>
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

const mapStateToProps = ({ auth, currentCollaboratorBadgeSummaryList, collaboratorDetail }) => ({
    auth,
    currentCollaboratorBadgeSummaryList,
    collaboratorDetail
});

const mapDispatchToProps = (dispatch) => ({
    currentCollaboratorBadgeSummaryListActions: bindActionCreators(currentCollaboratorBadgeSummaryListActions, dispatch),
    collaboratorDetailActions: bindActionCreators(collaboratorDetailActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CollaboratorDetail))
