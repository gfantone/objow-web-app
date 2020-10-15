import React from 'react'
import Formsy from 'formsy-react'
import {Grid} from '@material-ui/core'
import {ProgressButton, Switch, TextField} from '../../../../../../components'

const AircallForm = ({kpis, ...props}) => {
    const acGetCallsKpi = kpis.find(x => x.code === 'AC-GET-CALLS')
    const initialParams = JSON.parse(acGetCallsKpi.params)
    const [acGetCallsActivation, setAcGetCallsActivation] = React.useState(acGetCallsKpi.isActive)

    function handleValidSubmit(model) {
        alert('submit...')
    }

    return (
        <div>
            <Formsy onValidSubmit={handleValidSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Switch name='acGetCallsActivation' label='Activer le KPI de récupération des appels aboutis' initial={acGetCallsActivation} onChange={setAcGetCallsActivation} />
                    </Grid>
                    {acGetCallsActivation && <Grid item xs={12}>
                        <TextField
                            fullWidth
                            initial={initialParams.duration}
                            label='Durée minimale d’un appel abouti'
                            name='acGetCallsDuration'
                            type='number'
                        />
                    </Grid>}
                    <Grid item xs={12}>
                        <ProgressButton text='Valider' />
                    </Grid>
                </Grid>
            </Formsy>
        </div>
    )
}

export default AircallForm
