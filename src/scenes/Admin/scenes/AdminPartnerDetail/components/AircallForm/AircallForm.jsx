import React from 'react'
import Formsy from 'formsy-react'
import {Grid} from '@material-ui/core'
import {ProgressButton, Switch, TextField} from '../../../../../../components'
import * as Resources from '../../../../../../Resources'

const AircallForm = ({kpis, onUpdate, updating, ...props}) => {
    const acGetCallsKpi = kpis.find(x => x.code === 'AC-GET-CALLS')
    const initialParams = JSON.parse(acGetCallsKpi.params)
    const [acGetCallsActivation, setAcGetCallsActivation] = React.useState(acGetCallsKpi.isActive)

    function handleValidSubmit(model) {
        const duration = Number(model.acGetCallsDuration)
        const params = duration ? JSON.stringify({duration}) : null
        const kpis = [{id: acGetCallsKpi.id, isActive: model.acGetCallsActivation, params: params}]
        if (onUpdate) onUpdate(kpis)
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
                            required
                            type='number'
                            validationErrors={{isDefaultRequiredValue: Resources.COMMON_REQUIRED_ERROR}}
                        />
                    </Grid>}
                    <Grid item xs={12}>
                        <ProgressButton text={Resources.ADMIN_AIRCALL_FORM_SUBMIT_BUTTON} loading={updating} />
                    </Grid>
                </Grid>
            </Formsy>
        </div>
    )
}

export default AircallForm
