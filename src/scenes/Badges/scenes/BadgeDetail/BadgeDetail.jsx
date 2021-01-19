import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {CardMedia, Grid} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import { Redirect } from 'react-router-dom'
import {CollaboratorList, SubHeader} from './components'
import {Divider} from '../../components'
import {DefaultTitle, InfoText, MainLayoutComponent} from '../../../../components'
import * as Resources from '../../../../Resources'
import * as collaboratorBadgeSummaryDetailActions from '../../../../services/CollaboratorBadges/CollaboratorBadgeSummaryDetail/actions'

const styles = {
    icon: {
        height: 100,
        width: 100
    }
}

class BadgeDetail extends MainLayoutComponent {
    componentDidMount() {
        this.badgeId = this.props.match.params.id
        this.props.handleTitle(Resources.BADGE_SHORT_TITLE)
        this.props.handleSubHeader(<SubHeader />)
        this.props.activateReturn()
        this.props.collaboratorBadgeSummaryDetailActions.getCollaboratorBadgeSummary(this.badgeId)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const badgeId = this.props.match.params.id
        if (this.badgeId != badgeId) {
            this.badgeId = badgeId
            this.props.collaboratorBadgeSummaryDetailActions.getCollaboratorBadgeSummary(this.badgeId)
        }
    }

    renderData() {
        const {classes} = this.props
        const {summary} = this.props.collaboratorBadgeSummaryDetail
        const iconData = require(`../../../../assets/img/system/badge/icons/${summary.code}.svg`)

        const { account } = this.props.accountDetail;

        if(!account.hasBadgeAccess) {
          return <Redirect to={'/'} />
        }

        return (
            <Grid container spacing={2} justify='center'>
                <Grid item>
                    <Grid container direction='column' alignItems='center' spacing={2}>
                        <Grid item>
                            <CardMedia image={iconData} className={classes.icon} />
                        </Grid>
                        <Grid item>
                            <DefaultTitle align='center'>{summary.publicTitle} #{summary.rank}</DefaultTitle>
                        </Grid>
                        <Grid item>
                            <Divider />
                        </Grid>
                        <Grid item>
                            <InfoText align='center'>{summary.description}</InfoText>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <CollaboratorList colaborators={summary.collaborators} />
                </Grid>
            </Grid>
        )
    }

    render() {
        const {summary} = this.props.collaboratorBadgeSummaryDetail
        const {collaborator} = this.props.collaboratorDetail

        return (
            <div>
                {collaborator && summary && this.renderData()}
            </div>
        )
    }
}

const mapStateToProps = ({collaboratorBadgeSummaryDetail, collaboratorDetail}) => ({
    collaboratorBadgeSummaryDetail,
    collaboratorDetail
})

const mapDispatchToProps = (dispatch) => ({
    collaboratorBadgeSummaryDetailActions: bindActionCreators(collaboratorBadgeSummaryDetailActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BadgeDetail))
