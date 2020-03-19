import React from 'react'
import {Grid} from '@material-ui/core'
import {Card, DefaultText, DefaultTitle, InfoText, TableChip} from '../../../../../../components'

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
                                        <DefaultText>{advice.text}</DefaultText>
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
        return <InfoText>Aucun conseil trouvé</InfoText>
    };

    return (
        <div>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <DefaultTitle>Les conseils du coach</DefaultTitle>
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
