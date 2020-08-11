import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {CardMedia, Grid} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import {SubHeader} from './components'
import {Divider} from '../../components'
import {DefaultTitle, MainLayoutComponent, InfoText} from '../../../../components'
import * as Resources from '../../../../Resources'
import * as currentCollaboratorBadgeDetailActions from '../../../../services/CollaboratorBadges/CurrentCollaboratorBadgeDetail/actions'

const styles = {
    icon: {
        height: 100,
        width: 100
    }
};

class CurrentBadgeDetail extends MainLayoutComponent {
    constructor(props) {
        super(props);
        this.id = null
    }

    loadData(props) {
        const id = props.match.params.id;
        if (id != this.id) {
            this.id = id;
            this.props.currentCollaboratorBadgeDetailActions.getCurrentCollaboratorBadgeDetail(id)
        }
    }

    componentDidMount() {
        this.props.handleTitle(Resources.BADGE_SHORT_TITLE);
        this.props.handleSubHeader(<SubHeader />);
        this.props.handleMaxWidth('md');
        this.props.activateReturn();
        this.loadData(this.props)
    }

    renderData() {
        const {classes} = this.props;
        const {badge} = this.props.currentCollaboratorBadgeDetail;
        const iconData = require(`../../../../assets/img/system/badge/icons/${badge.code}.svg`);

        return (
            <Grid container direction='column' alignItems='center' spacing={2}>
                <Grid item>
                    <CardMedia image={iconData} className={classes.icon} />
                </Grid>
                <Grid item>
                    <DefaultTitle align='center'>{badge.publicTitle} #{badge.rank}</DefaultTitle>
                </Grid>
                <Grid item>
                    <Divider />
                </Grid>
                <Grid item>
                    <InfoText align='center'>{badge.description}</InfoText>
                </Grid>
            </Grid>
        )
    }

    render() {
        const {badge} = this.props.currentCollaboratorBadgeDetail;

        return (
            <div>
                {badge && this.renderData()}
            </div>
        )
    }
}

const mapStateToProps = ({accountDetail, currentCollaboratorBadgeDetail}) => ({
    accountDetail,
    currentCollaboratorBadgeDetail
});

const mapDispatchToProps = (dispatch) => ({
    currentCollaboratorBadgeDetailActions: bindActionCreators(currentCollaboratorBadgeDetailActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CurrentBadgeDetail))
