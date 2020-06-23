import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Formsy from 'formsy-react'
import { Grid } from '@material-ui/core'
import { Card, MainLayoutComponent, ProgressButton, TextField } from '../../../../components'
import * as userUpdatePasswordActions from '../../../../services/Users/UserUpdatePassword/actions'
import * as Resources from "../../../../Resources";

class CollaboratorPassword extends MainLayoutComponent {
    constructor(props) {
        super(props)
        this.id = null
    }

    componentDidMount() {
        this.id = this.props.match.params.id
        this.props.handleTitle('Modification du mot de passe')
        this.props.handleMaxWidth('sm')
        this.props.activateReturn()
    }

    handleSubmit(model) {
        this.props.userUpdatePasswordActions.updateUserPassword(this.id, model.password)
        this.props.history.goBack()
    }

    render() {
        const { loading } = this.props.userUpdatePassword

        return (
            <div>
                <Formsy onValidSubmit={this.handleSubmit.bind(this)}>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Card>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <TextField type='password' name='password' label='Mot de passe' fullWidth required
                                            validationErrors={{
                                                isDefaultRequiredValue: Resources.COMMON_REQUIRED_ERROR,
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField type='password' name='confirmPassword' label='Confirmation du mot de passe' fullWidth required
                                            validations='equalsField:password'
                                            validationErrors={{
                                                isDefaultRequiredValue: Resources.COMMON_REQUIRED_ERROR,
                                                equalsField: 'Les mots de passe ne correspondent pas'
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                        <Grid item xs={12}>
                            <ProgressButton type='submit' text='Valider' loading={loading} centered />
                        </Grid>
                    </Grid>
                </Formsy>
            </div>
        )
    }
}

const mapStateToProps = ({ userUpdatePassword }) => ({
    userUpdatePassword
})

const mapDispatchToProps = (dispatch) => ({
    userUpdatePasswordActions: bindActionCreators(userUpdatePasswordActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(CollaboratorPassword)
