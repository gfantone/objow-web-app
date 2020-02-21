import React from 'react'
import {Grid} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBalanceScale, faFolderOpen} from '@fortawesome/free-solid-svg-icons'
import {Card, DefaultText, DefaultTitle, InfoText} from '../../../../../../../../components'

const styles = {
    title: {
        marginBottom: 8
    },
    category: {
        marginRight: 16
    },
    indications: {
        margin: 16
    },
    description: {
        marginTop: 16
    }
}

const GoalDescription = (props) => {
    const {classes, definition} = props

    return (
        <div>
            <DefaultTitle className={classes.title}>Description</DefaultTitle>
            <Card>
                <div className={classes.indications}>
                    <Grid container>
                        <Grid item xs zeroMinWidth className={classes.category}>
                            <DefaultText noWrap>
                                <FontAwesomeIcon icon={faFolderOpen} /> {definition.category}
                            </DefaultText>
                        </Grid>
                        <Grid item>
                            <DefaultText>
                                <FontAwesomeIcon icon={faBalanceScale} /> Unité : {definition.unit}
                            </DefaultText>
                        </Grid>
                    </Grid>
                    <InfoText className={classes.description}>{definition.indication}</InfoText>
                </div>
            </Card>
        </div>
    )
}

export default withStyles(styles)(GoalDescription)