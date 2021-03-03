import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Grid } from '@material-ui/core'
import { SubHeader } from './components'
import {Collaborator, EmptyState, GridLink, InfoText, MainLayoutComponent} from '../../../../components'
import * as Resources from '../../../../Resources'
import * as teamDetailActions from '../../../../services/Teams/TeamDetail/actions'

class TeamDetail extends MainLayoutComponent {
    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.handleTitle(Resources.TEAM_TITLE);
        this.props.handleSubHeader(<SubHeader />);
        this.props.activateReturn();
        this.props.teamDetailActions.getTeamDetail(id)
    }

    renderEmptyState() {
        return <EmptyState title={Resources.TEAM_DETAIL_EMPTY_STATE_TITLE} message='' />
    }

    renderData() {
        const { team } = this.props.teamDetail;

        return (
            <Grid container spacing={2} style={{marginTop: 8}}>
                { team.manager && team.manager.citation && <Grid xs={12} style={{marginBottom: 8}}>
                    <InfoText align='center'>
                        « {team.manager.citation} »
                    </InfoText>
                </Grid> }
                { team.collaborators.map(collaborator => {
                    return (
                        <GridLink key={collaborator.id} item xs={12} sm={6} md={4} component={Link} to={`/teams/${this.props.match.params.id}/collaborators/${collaborator.id}/detail`}>
                            <Collaborator collaborator={collaborator} />
                        </GridLink>
                    )
                }) }
            </Grid>
        )
    }

    render() {
        const { team, loading } = this.props.teamDetail;
        const { account } = this.props.accountDetail;

        if(!account.hasTeamsAccess) {
          return <Redirect to={'/'} />
        }

        return (
            <div>
                { !loading && team && this.renderData() }
                { !loading && !team && this.renderEmptyState() }
            </div>
        )
    }
}

const mapStateToProps = ({ teamDetail, accountDetail }) => ({
    accountDetail,
    teamDetail
});

const mapDispatchToProps = (dispatch) => ({
    teamDetailActions: bindActionCreators(teamDetailActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamDetail)
