import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Formsy from 'formsy-react'
import { Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { CustomPlayerGoal } from './components'
import { ProgressButton } from '../../..'
import * as actions from '../../../../services/PlayerGoals/PlayerGoalListUpdate/actions'

const styles = {
    button: {
        marginTop: 32
    }
}

class CustomPlayerGoalList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            goals: props.goals
        }
    }

    onChange = index => value => {
        const goals = this.state.goals
        const targetSum = goals.map(goal => goal.target).reduce((a, b) => a+b)
        goals[index].target = value
        this.setState({
            ...this.state,
            goals: goals
        })
    }

    onSubmit(model) {
        const goals = []
        const keys = Object.keys(model)
        keys.map(key => {
            const goal = { id: key, target: model[key] }
            goals.push(goal)
        })
        this.props.actions.updatePlayerGoalList(goals)
    }

    render() {
        const { classes } = this.props

        return (
            <div>
                <Formsy onSubmit={this.onSubmit.bind(this)}>
                    <Grid container spacing={2}>
                        { this.state.goals.map((goal, index) => {
                            return (
                                <Grid key={index} item xs={3}>
                                    <CustomPlayerGoal key={index} goal={goal} onChange={this.onChange(index).bind(this)} />
                                </Grid>
                            )
                        }) }
                    </Grid>
                    <ProgressButton type='submit' centered text='Valider' classes={{root: classes.button}} />
                </Formsy>
            </div>
        )
    }
}

const mapStateToProps = ({playerGoalList}) => ({
    playerGoalList
})

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CustomPlayerGoalList))