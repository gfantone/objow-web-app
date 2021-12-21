import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Grid } from '@material-ui/core'
import Formsy from 'formsy-react'
import {AppBarSubTitle, Card, DefaultTitle, Loader, MainLayoutComponent, ProgressButton, Switch, TextField, Select} from '../../../../components'
import * as configListActions from '../../../../services/Configs/ConfigList/actions'
import * as configListUpdateActions from '../../../../services/Configs/ConfigListUpdate/actions'
import * as Resources from '../../../../Resources'
import '../../../../helpers/StringHelper'
import { homePages } from './homePages'
import _ from 'lodash'

class AdminAccessRightList extends MainLayoutComponent {
    constructor(props) {
        super(props);
        this.state = {
            activateManagerGeneralRanking: false,
            activateManagerCategoryRankings: false,
            activateCollaboratorGeneralRanking: false,
            activateCollaboratorCategoryRanking: false,
            activateCollaboratorGoalsAccess: false,
            activateCollaboratorChallengeAccess: false,
            activateManagerGoalsAccess: false,
            activateManagerChallengeAccess: false

        };
        this.props.configListUpdateActions.clearConfigListUpdate()
    }

    componentDidMount() {
        this.props.handleTitle('Administration');
        this.props.handleSubHeader(<AppBarSubTitle title="Gestion des droits d'accès" />);
        this.props.handleMaxWidth('md');
        this.props.activateReturn();
        this.props.configListActions.getPermanentConfigList()
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const { configs } = nextProps.configList;
        if (configs) {
            const MGER = configs.filter(c => c.code == 'MGER')[0];
            const MCAR = configs.filter(c => c.code == 'MCAR')[0];
            const CGER = configs.filter(c => c.code == 'CGER')[0];
            const CCAR = configs.filter(c => c.code == 'CCAR')[0];

            const MGLR = configs.filter(c => c.code === 'MGLR')[0];
            const CGLR = configs.filter(c => c.code === 'CGLR')[0];
            const MCGR = configs.filter(c => c.code === 'MCGR')[0];
            const CCGR = configs.filter(c => c.code === 'CCGR')[0];

            this.state.activateManagerGeneralRanking = MGER.value.toBoolean();
            this.state.activateManagerCategoryRanking = MCAR.value.toBoolean();
            this.state.activateCollaboratorGeneralRanking = CGER.value.toBoolean();
            this.state.activateCollaboratorCategoryRanking = CCAR.value.toBoolean();

            this.state.activateCollaboratorGoalsAccess = CGLR.value.toBoolean();
            this.state.activateCollaboratorChallengeAccess = CCGR.value.toBoolean();
            this.state.activateManagerGoalsAccess = MGLR.value.toBoolean();
            this.state.activateManagerChallengeAccess = MCGR.value.toBoolean();
        }
    }

    handleChangeValue = name => value => {
        this.setState({
            ...this.state,
            [name]: value
        })
    };

    handleSubmit(model) {
        var configs = [];
        const keys = Object.keys(model);
        for (var i = 0; i < keys.length; i++) {
            const key = keys[i];
            configs.push({ id: key, value: model[key] })
        }

        this.props.configListUpdateActions.updateConfigList(configs)
    }

    renderLoader() {
        return <Loader centered />
    }

    renderData() {
        const { configs } = this.props.configList;
        const { loading } = this.props.configListUpdate;

        const MNCA = configs.filter(c => c.code == 'MNCA')[0];
        const MCLR = configs.filter(c => c.code == 'MCLR')[0];
        const MCLE = configs.filter(c => c.code == 'MCLE')[0];
        const MGOR = configs.filter(c => c.code == 'MGOR')[0];
        const MCHR = configs.filter(c => c.code == 'MCHR')[0];
        const MGER = configs.filter(c => c.code == 'MGER')[0];
        const MCAR = configs.filter(c => c.code == 'MCAR')[0];
        const MPWD = configs.filter(c => c.code == 'MPWD')[0];
        const MTER = configs.filter(c => c.code == 'MTER')[0];
        const CNCA = configs.filter(c => c.code == 'CNCA')[0];
        const CCLR = configs.filter(c => c.code == 'CCLR')[0];
        const CCLE = configs.filter(c => c.code == 'CCLE')[0];
        const CGOR = configs.filter(c => c.code == 'CGOR')[0];
        const CCHR = configs.filter(c => c.code == 'CCHR')[0];
        const CGER = configs.filter(c => c.code == 'CGER')[0];
        const CCAR = configs.filter(c => c.code == 'CCAR')[0];
        const CTER = configs.filter(c => c.code == 'CTER')[0];
        const MGRR = configs.filter(c => c.code == 'MGRR')[0];
        const MCRR = configs.filter(c => c.code == 'MCRR')[0];
        const CGRR = configs.filter(c => c.code == 'CGRR')[0];
        const CCRR = configs.filter(c => c.code == 'CCRR')[0];
        const MFGR = configs.filter(c => c.code == 'MFGR')[0];
        const CFGR = configs.filter(c => c.code == 'CFGR')[0];

        // Menu entries activations
        const MGLR = configs.filter(c => c.code === 'MGLR')[0];
        const CGLR = configs.filter(c => c.code === 'CGLR')[0];
        const MCGR = configs.filter(c => c.code === 'MCGR')[0];
        const CCGR = configs.filter(c => c.code === 'CCGR')[0];
        const MBAR = configs.filter(c => c.code === 'MBAR')[0];
        const CBAR = configs.filter(c => c.code === 'CBAR')[0];
        const MSTR = configs.filter(c => c.code === 'MSTR')[0];
        const CSTR = configs.filter(c => c.code === 'CSTR')[0];
        const MRUR = configs.filter(c => c.code === 'MRUR')[0];
        const CRUR = configs.filter(c => c.code === 'CRUR')[0];
        const MTMR = configs.filter(c => c.code === 'MTMR')[0];
        const CTMR = configs.filter(c => c.code === 'CTMR')[0];
        const MRKR = configs.filter(c => c.code === 'MRKR')[0];
        const CRKR = configs.filter(c => c.code === 'CRKR')[0];

        // Homepage
        const CHPG = configs.filter(c => c.code === 'CHPG')[0];
        const MHPG = configs.filter(c => c.code === 'MHPG')[0];

        // Goal Filter
        const GDTF = configs.filter(c => c.code === 'GDTF')[0];

        // Wording
        const CHAW = configs.filter(c => c.code === 'CHAW')[0];
        const RULW = configs.filter(c => c.code === 'RULW')[0];
        const BDGW = configs.filter(c => c.code === 'BDGW')[0];

        // Notifications
        const NTFE = configs.filter(c => c.code === 'NTFE')[0];

        const { account } = this.props.accountDetail;
        const homePagesOptions = homePages(account);
        const goalTimeFilters = [
          {
            value: '0',
            description: 'Objectifs en cours'
          },
          {
            value: '1',
            description: 'Objectifs passés'
          },
          {
            value: '2',
            description: 'Objectifs futurs'
          }
        ]

        return (
            <Formsy onValidSubmit={this.handleSubmit.bind(this)}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <div>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <DefaultTitle>Manager</DefaultTitle>
                                </Grid>
                                <Grid item xs={12}>
                                    <Card>
                                        <Select name={ MHPG.id } initial={MHPG.value} label={'Configuration de la page d\'accueil'} options={homePagesOptions.filter(homePage => homePage.availability.indexOf('M') >= 0)} optionValueName='path' optionTextName='title' fullWidth />
                                        <Switch name={MNCA.id} initial={MNCA.value.toBoolean()} label='Afficher les challenges futurs' />
                                        <Switch name={MFGR.id} initial={MFGR.value.toBoolean()} label='Afficher les objectifs futurs' />
                                        <Switch name={MCLR.id} initial={MCLR.value.toBoolean()} label='Accès à la coaching list' />
                                        <Switch name={MCLE.id} initial={MCLE.value.toBoolean()} label='Modifier la coaching list' />
                                        <Switch name={MGLR.id} initial={MGLR.value.toBoolean()} label='Accès aux objectifs' disabled={ !this.state.activateManagerChallengeAccess && this.state.activateManagerGoalsAccess } onChange={ this.handleChangeValue('activateManagerGoalsAccess').bind(this) } />
                                        <Switch name={MCGR.id} initial={MCGR.value.toBoolean()} label='Accès aux challenges' disabled={ !this.state.activateManagerGoalsAccess && this.state.activateManagerChallengeAccess } onChange={ this.handleChangeValue('activateManagerChallengeAccess').bind(this) } />
                                        <Switch name={MTMR.id} initial={MTMR.value.toBoolean()} label='Accès aux équipes' />
                                        <Switch name={MBAR.id} initial={MBAR.value.toBoolean()} label='Accès aux défis' />
                                        <Switch name={MSTR.id} initial={MSTR.value.toBoolean()} label='Accès aux statistiques' />
                                        <Switch name={MRKR.id} initial={MRKR.value.toBoolean()} label='Accès aux classements' />
                                        <Switch name={MRUR.id} initial={MRUR.value.toBoolean()} label='Accès aux règles du jeu' />
                                        <Switch name={MGOR.id} initial={MGOR.value.toBoolean()} label='Classement visible pour les objectifs' />
                                        <Switch name={MCHR.id} initial={MCHR.value.toBoolean()} label='Classement visible pour les challenges' />
                                        <Switch name={MGER.id} initial={MGER.value.toBoolean()} label='Classement général visible' onChange={this.handleChangeValue('activateManagerGeneralRanking').bind(this)} />
                                        { this.state.activateManagerGeneralRanking && <TextField type={'number'} name={MGRR.id} initial={MGRR.value} label={'Classement général limité aux X premiers'} fullWidth /> }
                                        <Switch name={MCAR.id} initial={MCAR.value.toBoolean()} label='Classement visible pour les catégories' onChange={this.handleChangeValue('activateManagerCategoryRanking').bind(this)} />
                                        { this.state.activateManagerCategoryRanking && <TextField type={'number'} name={MCRR.id} initial={MCRR.value} label={'Classements des catégories limités aux X premiers'} fullWidth /> }
                                        <Switch name={MPWD.id} initial={MPWD.value.toBoolean()} label='Réinitialisation MDP pour un collaborateur' />
                                        <Switch name={MTER.id} initial={MTER.value.toBoolean()} label='Classement de mon équipe' />
                                    </Card>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <div>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <DefaultTitle>Collaborateur</DefaultTitle>
                                </Grid>
                                <Grid item xs={12}>
                                    <Card>
                                        <Select name={ CHPG.id } initial={CHPG.value} label={'Configuration de la page d\'accueil'} options={homePagesOptions.filter(homePage => homePage.availability.indexOf('C') >= 0)} optionValueName='path' optionTextName='title' fullWidth />
                                        <Switch name={CNCA.id} initial={CNCA.value.toBoolean()} label='Afficher les challenges futurs' />
                                        <Switch name={CFGR.id} initial={CFGR.value.toBoolean()} label='Afficher les objectifs futurs' />
                                        <Switch name={CCLR.id} initial={CCLR.value.toBoolean()} label='Accès à la coaching list' />
                                        <Switch name={CCLE.id} initial={CCLE.value.toBoolean()} label='Modifier la coaching list' />
                                        <Switch name={CGLR.id} initial={CGLR.value.toBoolean()} label='Accès aux objectifs' disabled={ !this.state.activateCollaboratorChallengeAccess && this.state.activateCollaboratorGoalsAccess } onChange={ this.handleChangeValue('activateCollaboratorGoalsAccess').bind(this) } />
                                        <Switch name={CCGR.id} initial={CCGR.value.toBoolean()} label='Accès aux challenges' disabled={ this.state.activateCollaboratorChallengeAccess && !this.state.activateCollaboratorGoalsAccess } onChange={ this.handleChangeValue('activateCollaboratorChallengeAccess').bind(this) } />
                                        <Switch name={CTMR.id} initial={CTMR.value.toBoolean()} label='Accès aux équipes' />
                                        <Switch name={CBAR.id} initial={CBAR.value.toBoolean()} label='Accès aux défis' />
                                        <Switch name={CSTR.id} initial={CSTR.value.toBoolean()} label='Accès aux statistiques' />
                                        <Switch name={CRKR.id} initial={CRKR.value.toBoolean()} label='Accès aux classements' />
                                        <Switch name={CRUR.id} initial={CRUR.value.toBoolean()} label='Accès aux règles du jeu' />
                                        <Switch name={CGOR.id} initial={CGOR.value.toBoolean()} label='Classement visible pour les objectifs' />
                                        <Switch name={CCHR.id} initial={CCHR.value.toBoolean()} label='Classement visible pour les challenges' />
                                        <Switch name={CGER.id} initial={CGER.value.toBoolean()} label='Classement général visible' onChange={this.handleChangeValue('activateCollaboratorGeneralRanking').bind(this)} />
                                        { this.state.activateCollaboratorGeneralRanking && <TextField type={'number'} name={CGRR.id} initial={CGRR.value} label={'Classement général limité aux X premiers'} fullWidth /> }
                                        <Switch name={CCAR.id} initial={CCAR.value.toBoolean()} label='Classement visible pour les catégories' onChange={this.handleChangeValue('activateCollaboratorCategoryRanking').bind(this)} />
                                        { this.state.activateCollaboratorCategoryRanking && <TextField type={'number'} name={CCRR.id} initial={CCRR.value} label={'Classements des catégories limités aux X premiers'} fullWidth /> }
                                        <Switch name={CTER.id} initial={CTER.value.toBoolean()} label='Classement de mon équipe' />
                                    </Card>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <DefaultTitle>Tous les utilisateurs</DefaultTitle>
                                </Grid>
                                <Grid item xs={12}>
                                    <Card>
                                        <Grid container direction="column" spacing={1}>
                                          <Grid item xs={6}>
                                            <Switch name={NTFE.id} initial={NTFE.value.toBoolean()} label='Activer les notifications' />
                                          </Grid>
                                          <Grid item>
                                            <Select name={ GDTF.id } initial={GDTF.value} label={'Filtre par défaut sur les objectifs'} options={goalTimeFilters} optionValueName='value' optionTextName='description' fullWidth emptyDisabled />
                                          </Grid>
                                          <Grid item>
                                            <Grid container spacing={1}>
                                              <Grid item xs={6}>
                                                <TextField type='text' name={CHAW.id} initial={CHAW.value} placeholder={ Resources.DRAWER_CHALLENGES_BUTTON } label={'Wording des challenges'}  fullWidth lowercase />
                                              </Grid>
                                              <Grid item xs={6}>
                                                <TextField type='text' name={BDGW.id} initial={BDGW.value} placeholder={ Resources.DRAWER_BADGES_BUTTON } label={'Wording des Badges'}  fullWidth lowercase />
                                              </Grid>
                                              <Grid item xs={6}>
                                                <TextField type='text' name={RULW.id} initial={RULW.value} placeholder={ Resources.DRAWER_RULES_BUTTON } label={'Wording des Règles du jeu'}  fullWidth lowercase />
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                    </Card>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <ProgressButton type='submit' text='Valider' loading={loading} centered />
                    </Grid>
                </Grid>
            </Formsy>
        )
    }

    render() {
        const { configs, loading } = this.props.configList;
        const { success } = this.props.configListUpdate;

        if (success) {
            this.props.configListUpdateActions.clearConfigListUpdate();
            this.props.history.goBack()
        }

        return (
            <div>
                { loading && this.renderLoader() }
                { !loading && configs && this.renderData() }
            </div>
        )
    }
}

const mapStateToProps = ({ accountDetail, configList, configListUpdate }) => ({
    accountDetail,
    configList,
    configListUpdate
});

const mapDispatchToProps = (dispatch) => ({
    configListActions: bindActionCreators(configListActions, dispatch),
    configListUpdateActions: bindActionCreators(configListUpdateActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminAccessRightList)
