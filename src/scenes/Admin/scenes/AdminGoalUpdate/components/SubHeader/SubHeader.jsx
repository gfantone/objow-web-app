import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { DefaultText, RoundedTab, RoundedTabs } from '../../../../../../components'

const styles = {
    root: {
        padding: 16
    }
}

const SubHeader = ({ onChange, readonly, ...props }) => {
    const { classes } = props
    const [value, setValue] = React.useState(0)

    function handlePageChange(e, value) {
        setValue(value)
        if (onChange) onChange(value)
    }

    return (
        <div>
            <div className={classes.root}>
                <DefaultText align='center'>{!readonly ? 'Modification' : 'Visualisation'} d'un objectif</DefaultText>
            </div>
            <RoundedTabs value={value} onChange={handlePageChange} variant='fullWidth'>
                <RoundedTab label='Base' />
                <RoundedTab label='Personnalisation' />
            </RoundedTabs>
        </div>
    )
}

export default withStyles(styles)(SubHeader)
