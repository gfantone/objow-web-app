import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {withStyles} from '@material-ui/core/styles'
import {Grid, isWidthUp} from '@material-ui/core'
import * as challengeTypeListActions from "../../../../../../services/ChallengeTypes/ChallengeTypeList/actions"
import { Loader, Category } from '../../../../../../components'


const styles = {
  icon: {
    cursor: 'pointer'
  },
  filterSelector: {
    marginTop: 80
  }
}

class FilterSelector extends Component {
  componentDidMount() {
      this.props.challengeTypeListActions.getUsableChallengeTypeList()
  }
  renderLoader() {
      return <Loader centered />
  }
  renderData() {
    const top_icon = require(`../../../../../../assets/img/system/filters/top.svg`)
    const my_challenges_icon = require(`../../../../../../assets/img/system/filters/my_challenges.svg`)

    const {types} = this.props.challengeTypeList;
    const { classes } = this.props;
    const globalType = types.find(t => t.code === 'CC')
    const managerType = types.find(t => t.code === 'CM')
    const spacing = isWidthUp('sm', this.props.width) ? 10 : 6

    return(
      <div className={classes.filterSelector}>
        <Grid container spacing={ spacing } justify="center">
          <Grid item xs={12} sm={6} md={6} onClick={() => { this.props.selectFilter(`?type=${globalType.id}`) }} className={classes.icon}>
            <Category bigIcon category={{ name: "Top 50", icon: top_icon }} />
          </Grid>
          <Grid item xs={12} sm={6} md={6} onClick={() => { this.props.selectFilter(`?type=${managerType.id}`) }} className={classes.icon}>
            <Category bigIcon category={{ name: "Challenges réseaux", icon: my_challenges_icon }} />
          </Grid>
        </Grid>
      </div>
    )
  }

  render() {
    const {types, loading} = this.props.challengeTypeList;
    const marginTop = isWidthUp('sm', this.props.width) ? 48 : 16
    return(
      <div style={{marginTop: marginTop}}>
        { loading && this.renderLoader() }
        { !loading && types && this.renderData() }
      </div>
    )
  }
}


const mapStateToProps = ({challengeTypeList}) => ({
  challengeTypeList
})

const mapDispatchToProps = (dispatch) => ({
  challengeTypeListActions: bindActionCreators(challengeTypeListActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(FilterSelector))
