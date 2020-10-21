import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Grid} from '@material-ui/core'
import {Partner} from './components'
import {AppBarSubTitle, GridLink, Loader, MainLayoutComponent} from '../../../../components'
import * as Resources from '../../../../Resources'
import * as partnerListActions from "../../../../services/Partners/PartnerList/actions"

class AdminPartnerList extends MainLayoutComponent {
    componentDidMount() {
        this.props.handleTitle(Resources.ADMIN_TITLE)
        this.props.handleSubHeader(<AppBarSubTitle title={Resources.ADMIN_PARTNER_LIST_SUBTITLE} />)
        this.props.handleMaxWidth('md')
        this.props.activateReturn()
        this.props.partnerListActions.getPartnerList()
    }

    renderLoader() {
        return <Loader centered />
    }

    renderData() {
        const {partners} = this.props.partnerList

        return (
            <div>
                <Grid container>
                    {partners.map(partner => {
                        const link = `/admin/partners/${partner.id}`

                        return (
                            <GridLink key={partner.id} item component={Link} to={link}>
                                <Partner partner={partner} />
                            </GridLink>
                        )
                    })}
                </Grid>
            </div>
        )
    }

    render() {
        const {partners, loading} = this.props.partnerList

        return (
            <div>
                {loading && this.renderLoader()}
                {!loading && partners && this.renderData()}
            </div>
        )
    }
}

const mapStateToProps = ({partnerList}) => ({
    partnerList
})

const mapDispatchToProps = (dispatch) => ({
    partnerListActions: bindActionCreators(partnerListActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminPartnerList)
