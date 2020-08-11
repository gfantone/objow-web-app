import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Grid} from '@material-ui/core'
import {Collaborator} from '..'
import {Loader} from '../../../../components'
import * as teamDetailActions from '../../../../services/Teams/TeamDetail/actions'

class ManagerCollaboratorSelector extends Component {
    componentDidMount() {
        if (!this.props.loadDisabled) {
            this.props.teamDetailActions.getTeamDetailByAccount()
        }
    }

    handleClick(id) {
        this.props.onClick(id)
    }

    render() {
        const {team, loading} = this.props.teamDetail

        return (
            <div>
                {loading && <Loader centered />}
                {!loading && team && (
                    <Grid container spacing={2}>
                        {team.collaborators.map(collaborator => {
                            return (
                                <Grid key={collaborator.id} item xs={12} sm={6} md={4} lg={3} onClick={() => this.handleClick(collaborator.id)}>
                                    <Collaborator key={collaborator.id} collaborator={collaborator} />
                                </Grid>
                            )
                        })}
                    </Grid>
                )}
            </div>
        )
    }
}

const mapStateToProps = ({teamDetail}) => ({
    teamDetail
})

const mapDisptchToProps = (dispatch) => ({
    teamDetailActions: bindActionCreators(teamDetailActions, dispatch)
})

export default connect(mapStateToProps, mapDisptchToProps)(ManagerCollaboratorSelector)
