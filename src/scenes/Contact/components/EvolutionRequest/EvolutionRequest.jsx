import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Grid} from '@material-ui/core'
import {Card, DefaultTitle, FileInput, ProgressButton, TextField} from '../../../../components'
import * as Resources from '../../../../Resources'
import Formsy from 'formsy-react'
import * as evolutionRequestActions from '../../../../services/Mail/EvolutionRequest/actions'

const EvolutionRequest = ({...props}) => {
    const { loading } = props.evolutionRequest;

    const handleSubmit = (model) => {
        const request = new FormData();
        request.append('message', model.message);
        if (model.attachedFiles) {
            for (var i = 0; i < model.attachedFiles.length; i++) {
                const file = model.attachedFiles[i];
                request.append(`files[${i}]`, file, file.name)
            }
        }
        props.evolutionRequestActions.requestEvolution(request)
    };

    return (
        <div>
            <Formsy onValidSubmit={handleSubmit}>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <div>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <DefaultTitle>{Resources.CONTACT_EVOLUTION_FORM_TITLE}</DefaultTitle>
                                </Grid>
                                <Grid item xs={12}>
                                    <Card>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <TextField name='message' label={Resources.CONTACT_EVOLUTION_FORM_MESSAGE_LABEL} multiline fullWidth />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <FileInput name='attachedFiles' multiple />
                                            </Grid>
                                        </Grid>
                                    </Card>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <ProgressButton type='submit' text={Resources.CONTACT_EVOLUTION_FORM_SUBMIT_BUTTON} loading={loading} centered />
                    </Grid>
                </Grid>
            </Formsy>
        </div>
    )
};

const mapStateToProps = ({evolutionRequest}) => ({
    evolutionRequest
});

const mapDispatchToProps = (dispatch) => ({
    evolutionRequestActions: bindActionCreators(evolutionRequestActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(EvolutionRequest)
