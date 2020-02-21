import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import {DefaultText, RoundedTabs, RoundedTab} from '../../../../../../components'

const styles = {
    title: {
        paddingTop: 16,
        paddingBottom: 16
    }
}

const ParticipantTypeFilter = (props) => {
    const {classes, handleTypeChange} = props
    const [value, setValue] = React.useState(0);

    function handleChange(e, value) {
        let type = value == 0 ? 'P' : 'T'
        setValue(value)
        handleTypeChange(type)
    }

    return (
        <div>
            <DefaultText align='center' className={classes.title}>Règles de gestion des points</DefaultText>
            <RoundedTabs value={value} onChange={handleChange} variant='fullWidth'>
                <RoundedTab label="Joueurs" />
                <RoundedTab label="Équipes" />
            </RoundedTabs>
        </div>
    )
}

export default withStyles(styles)(ParticipantTypeFilter)