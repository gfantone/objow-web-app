import React from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import _ from 'lodash'
import { IconButton, MainLayoutComponent, TeamSelector, Loader, AppBarSubTitle } from '../../../../components'
import { FilterSelector } from './components'
import * as Resources from '../../../../Resources'
import * as configListActions from '../../../../services/Configs/ConfigList/actions'


class ChallengeHome extends MainLayoutComponent {
    constructor(props) {
        super(props)
        this.state = {
            team: null,
            filter: null
        }
    }

    handleAdd() {
        this.props.history.push('/challenges/creation')
    }

    handleClick(id) {
        this.setState({
          ...this.state,
          team: id
        })
        // this.props.history.push(`/challenges/team/${id}`)
    }

    selectFilter = (filter) => {
      this.setState({
        ...this.state,
        filter: filter
      })
    }

    componentDidMount() {

        const { account } = this.props.accountDetail;
        this.props.handleTitle(account.challengeWording || Resources.CHALLENGE_LONG_TITLE);
        this.props.handleSubHeader(<AppBarSubTitle title={Resources.CHALLENGE_CATEGORY_LIST_TITLE} />)
        if (account.role.code == 'A') {
            this.props.handleButtons(<IconButton size='small' onClick={this.handleAdd.bind(this)}><FontAwesomeIcon icon={faPlus}/></IconButton>)
        }
        this.props.configListActions.getPermanentConfigList()
    }

    renderLoader() {
      return <Loader centered />
    }
    render() {
        const { account } = this.props.accountDetail;
        const { configs, loading } = this.props.configList;

        if(loading || !configs) {
          return this.renderLoader()
        }

        const displayFilterSelector = configs.find(c => c.code === 'CFIP').value.toBoolean()

        if(!account.hasChallengeAccess) {
          return <Redirect to={'/'} />
        }


        if(this.state.filter === null && displayFilterSelector) {
          this.props.handleMaxWidth('sm')
          return(
            <FilterSelector selectFilter={this.selectFilter}/>
          )
        }
        this.props.handleMaxWidth('lg')

        if (account.role.code == 'A' && !this.state.team) {
          return (
            <div>
              <TeamSelector onClick={this.handleClick.bind(this)} />
            </div>
          )
        }

        if(account.role.code == 'C') {
          return <Redirect to={`/challenges/collaborator/${account.id}${ this.state.filter ? this.state.filter : '' }`} />
        }
        return <Redirect to={`/challenges/team/${_.get(account, 'team.id') || this.state.team}${ this.state.filter ? this.state.filter : '' }`} />

        // if (account.role.code == 'C') {
        //     return <Redirect to={`/challenges/collaborator/${account.id}`} />
        // } else if (account.role.code == 'M' && account.team) {
        // } else if (account.role.code == 'A') {
        //     return (
        //         <div>
        //             <TeamSelector onClick={this.handleClick.bind(this)} />
        //         </div>
        //     )
        // } else {
        //     return <div></div>
        // }
    }
}

const mapStateToProps = ({ accountDetail, configList }) => ({
    accountDetail,
    configList
});

const mapDispatchToProps = (dispatch) => ({
    configListActions: bindActionCreators(configListActions, dispatch),
})


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ChallengeHome))
