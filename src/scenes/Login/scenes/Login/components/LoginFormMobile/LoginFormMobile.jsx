import React from 'react'
import {connect} from 'react-redux'
import {Grid} from "@material-ui/core";
import {Logo, Title} from './components'
import {BoldSpan, ErrorText, ProgressButton, TextField} from "../../../../../../components";
import * as Resources from "../../../../../../Resources";
import * as authErrors from "../../../../../../services/Auth/errors";
import Formsy from "formsy-react";

const LoginFormMobile = ({onSubmit, ...props}) => {
    const {loading, error} = props.auth

    return (
        <div>
            <Formsy onValidSubmit={onSubmit}>
                <Grid container spacing={4} style={{width: 'initial', margin: 'initial'}}>
                    <Grid item xs={12}>
                        <Logo />
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={4}>
                            <Grid item xs={12}>
                                <Title><BoldSpan>S'identifier</BoldSpan></Title>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField name='code' label={Resources.LOGIN_CODE_LABEL} fullWidth required
                                                       validationErrors={{isDefaultRequiredValue: Resources.COMMON_REQUIRED_ERROR}}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField lowercase name='email' label={Resources.LOGIN_EMAIL_LABEL} fullWidth required
                                                       validationErrors={{isDefaultRequiredValue: Resources.COMMON_REQUIRED_ERROR}}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField lowercase type='password' name='password' label={Resources.LOGIN_PASSWORD_LABEL} fullWidth required
                                                       validationErrors={{isDefaultRequiredValue: Resources.COMMON_REQUIRED_ERROR}}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            {error === authErrors.LOGIN_ERROR && <Grid item xs={12}>
                                <ErrorText align='center'>{Resources.LOGIN_ERROR}</ErrorText>
                            </Grid>}
                            <Grid item xs={12}>
                                <ProgressButton type='submit' text={Resources.LOGIN_SUBMIT_BUTTON} centered loading={loading} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Formsy>
        </div>
    )
}

const mapStateToProps = ({auth}) => ({
    auth
})

export default connect(mapStateToProps)(LoginFormMobile)
