import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Formsy from 'formsy-react'
import {Grid} from '@material-ui/core'
import {ProgressButton} from "../../../../components/Common/components/Buttons/components/ProgressButton";
import {Card, DefaultTitle, ErrorText, Switch} from "../../../../components";
import {Link} from "react-router-dom";
import '../../../../helpers/FormsyHelper'
import * as termsAcceptanceActions from '../../../../services/Account/TermsAcceptance/actions'

const AcceptTerms = ({ ...props }) => {
    const { loading } = props.termsAcceptance;
    const [isInvalid, setIsInvalid] = React.useState(false);

    const onCancelClick = () => {
        localStorage.clear();
        window.location = '/'
    };

    const onInvalidSubmit = () => {
        setIsInvalid(true)
    };

    const onValidSubmit = (model) => {
        setIsInvalid(false);
        props.termsAcceptanceActions.acceptTerms(model.useTerms, model.privacyPolicy);
    };

    return (
        <div>
            <Formsy onValidSubmit={onValidSubmit} onInvalidSubmit={onInvalidSubmit}>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Card>
                            <Grid container spacing={4}>
                                <Grid item xs={12}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <DefaultTitle>Conditions générales d'utilisation</DefaultTitle>
                                            <Link to='/use-terms'>Voir document</Link>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Switch name='useTerms' label="J'accepte les conditions générales d'utilisation" validations='isTrue' />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <DefaultTitle>Politique de confidentialité</DefaultTitle>
                                            <Link to='/privacy-policy'>Voir document</Link>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Switch name='privacyPolicy' label="J'accepte la politique de confidentialité" validations='isTrue' />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                    { isInvalid && <Grid item xs={12}>
                        <ErrorText align='center'>
                            Pour utiliser la solution vous devez tout accepter
                        </ErrorText>
                    </Grid> }
                    <Grid item xs={12}>
                        <div>
                            <Grid container justify='space-between'>
                                <Grid item>
                                    <ProgressButton type='button' text='Annuler' color='primary' centered onClick={onCancelClick} />
                                </Grid>
                                <Grid item>
                                    <ProgressButton type='submit' text='Valider' centered loading={loading} />
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
            </Formsy>
        </div>
    )
};

const mapStateToProps = ({ termsAcceptance }) => ({
    termsAcceptance
});

const mapDispatchToProps = (dispatch) => ({
    termsAcceptanceActions: bindActionCreators(termsAcceptanceActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AcceptTerms)
