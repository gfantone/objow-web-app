import React, {useEffect} from 'react'
import {Grid} from '@material-ui/core'
import {EvolutionRequest, IncidentReporting} from './components'
import {Card, DefaultTitle, Select} from "../../components";
import Formsy from 'formsy-react'

const types = [
    {id: 1, text: 'Demander une évolution'},
    {id: 2, text: 'Déclarer un incident'}
];

const Contact = ({...props}) => {
    const [selectedType, setSelectedType] = React.useState(null);

    useEffect(() => {
        props.clear();
        props.handleTitle('Aide');
        props.handleMaxWidth('md')
    });

    const handleTypeChange = (type) => {
        setSelectedType(type)
    };

    return (
        <div>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <div>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <DefaultTitle>Comment pouvons-nous vous aider ?</DefaultTitle>
                            </Grid>
                            <Grid item xs={12}>
                                <Card>
                                    <Formsy>
                                        <Select name='type' label="Motif" options={types} optionValueName='id' optionTextName='text' onChange={handleTypeChange} fullWidth />
                                    </Formsy>
                                </Card>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    { selectedType == 1 && <EvolutionRequest /> }
                    { selectedType == 2 && <IncidentReporting /> }
                </Grid>
            </Grid>
        </div>
    )
};

export default Contact
