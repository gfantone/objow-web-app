import React from 'react'
import {Grid} from '@material-ui/core'
import {Card, DefaultText, DefaultTitle, InfoText, Linkify, TableChip} from '../../../../../../components'
import * as Resources from '../../../../../../Resources'

const ReadonlyAdviceList = ({advices}) => {
    const renderData = () => {
        return (
            <div>
                <Grid container spacing={2}>
                    {advices.map(advice => {
                        return (
                            <Grid key={advice.id} item xs={12}>
                                <Grid container spacing={2}>
                                    <Grid item>
                                        <TableChip label='>' />
                                    </Grid>
                                    <Grid item xs>
                                        <Linkify>
                                            <DefaultText>{advice.text}</DefaultText>
                                        </Linkify>
                                    </Grid>
                                </Grid>
                            </Grid>
                        )
                    })}
                </Grid>
            </div>
        )
    };

    const renderEmptyState = () => {
        return <InfoText>{Resources.GOAL_INDICATION_COACHING_EMPTY_STATE}</InfoText>
    };

    return (
        <div>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <DefaultTitle>{Resources.GOAL_INDICATION_COACHING_AREA}</DefaultTitle>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        {advices && advices.length > 0 && renderData()}
                        {(!advices || advices.length == 0) && renderEmptyState()}
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
};

export default ReadonlyAdviceList
