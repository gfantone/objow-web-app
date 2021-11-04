import React, {useEffect} from 'react'
import {Grid} from '@material-ui/core'
import {EvolutionRequest, IncidentReporting} from './components'
import {Card, DefaultTitle, Select} from "../../components";
import * as Resources from "../../Resources";
import Formsy from 'formsy-react'

const types = [
    {id: 1, text: Resources.CONTACT_FORM_TYPE_EVOLUTION_OPTION},
    {id: 2, text: Resources.CONTACT_FORM_TYPE_INCIDENT_OPTION}
];

const Contact = ({...props}) => {
    const [selectedType, setSelectedType] = React.useState(null);

    useEffect(() => {
        props.clear();
        props.handleTitle(Resources.CONTACT_TITLE);
        props.handleMaxWidth('md')
    });

    const handleTypeChange = (type) => {
        setSelectedType(type)
    };

    const iframeUrl = 'https://firetiger.fr/help'

    return (
        <div>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <div>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <DefaultTitle>{Resources.CONTACT_QUESTION}</DefaultTitle>
                            </Grid>
                            <Grid item xs={12}>
                                <Card>
                                    <Formsy>
                                        <Select name='type' label={Resources.CONTACT_FORM_TYPE_LABEL} options={types} optionValueName='id' optionTextName='text' onChange={handleTypeChange} fullWidth />
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
                <Grid item xs={12}>
                  <iframe
                    src={ iframeUrl }
                    scrolling='no'
                    frameborder="0"
                    id="myframe1"
                    onLoad={() => {

                      console.log(document.getElementById('myframe1').contentWindow.document.getElementById('pass'))
                    }}
                    allowtransparency
                  />

                </Grid>
            </Grid>
        </div>
    )
};

export default Contact
