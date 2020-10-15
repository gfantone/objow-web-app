import React from 'react'
import Formsy from 'formsy-react'
import {Grid} from '@material-ui/core'
import {ProgressButton, Switch, TextField} from '../../../../../../components'
import * as Resources from '../../../../../../Resources'

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
                        <Switch
                            initial={acGetCallsActivation}
                            label={Resources.ADMIN_AIRCALL_FORM_AC_GET_CALLS_ACTIVATION}
                            name='acGetCallsActivation'
                            onChange={setAcGetCallsActivation}
                        />
                    </Grid>
                    {acGetCallsActivation && <Grid item xs={12}>
                        <TextField
                            fullWidth
                            initial={initialParams.duration}
                            label={Resources.ADMIN_AIRCALL_FORM_AC_GET_CALLS_DURATION}
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
