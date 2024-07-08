import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid } from '@material-ui/core';
import Formsy from 'formsy-react';
import {
  AppBarSubTitle,
  Card,
  DefaultTitle,
  Loader,
  MainLayoutComponent,
  ProgressButton,
  Switch,
  TextField,
  Select,
} from '../../../../components';
import * as configListActions from '../../../../services/Configs/ConfigList/actions';
import * as configListUpdateActions from '../../../../services/Configs/ConfigListUpdate/actions';
import * as Resources from '../../../../Resources';
import '../../../../helpers/StringHelper';
import { homePages } from './homePages';
import { useIntl, injectIntl } from 'react-intl';
import _ from 'lodash';
import { toast } from 'react-toastify';

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
      activateManagerChallengeAccess: false,
    };
    this.props.configListUpdateActions.clearConfigListUpdate();
  }

  componentDidMount() {
    const { intl } = this.props;
    this.props.handleTitle(intl.formatMessage({ id: 'admin.title' }));
    this.props.handleSubHeader(
      <AppBarSubTitle
        title={intl.formatMessage({ id: 'admin.access_rights.title' })}
      />
    );
    this.props.handleMaxWidth('md');
    this.props.activateReturn();
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const { configs } = nextProps.configList;
    if (configs) {
      const MGER = configs.filter((c) => c.code == 'MGER')[0];
      const MCAR = configs.filter((c) => c.code == 'MCAR')[0];
      const CGER = configs.filter((c) => c.code == 'CGER')[0];
      const CCAR = configs.filter((c) => c.code == 'CCAR')[0];

      const MGLR = configs.filter((c) => c.code === 'MGLR')[0];
      const CGLR = configs.filter((c) => c.code === 'CGLR')[0];
      const MCGR = configs.filter((c) => c.code === 'MCGR')[0];
      const CCGR = configs.filter((c) => c.code === 'CCGR')[0];

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

  handleChangeValue = (name) => (value) => {
    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  handleSubmit(model) {
    var configs = [];
    const keys = Object.keys(model);
    for (var i = 0; i < keys.length; i++) {
      const key = keys[i];
      configs.push({ id: key, value: model[key] });
    }

    this.props.configListUpdateActions.updateConfigList(configs);
  }

  renderLoader() {
    return <Loader centered />;
  }

  renderData() {
    const { configs } = this.props.configList;
    const { loading } = this.props.configListUpdate;

    const MNCA = configs.filter((c) => c.code == 'MNCA')[0];
    const MCLR = configs.filter((c) => c.code == 'MCLR')[0];
    const MCLE = configs.filter((c) => c.code == 'MCLE')[0];
    const MGOR = configs.filter((c) => c.code == 'MGOR')[0];
    const MCHR = configs.filter((c) => c.code == 'MCHR')[0];
    const MGER = configs.filter((c) => c.code == 'MGER')[0];
    const MCAR = configs.filter((c) => c.code == 'MCAR')[0];
    const MPWD = configs.filter((c) => c.code == 'MPWD')[0];
    const MTER = configs.filter((c) => c.code == 'MTER')[0];
    const CNCA = configs.filter((c) => c.code == 'CNCA')[0];
    const CCLR = configs.filter((c) => c.code == 'CCLR')[0];
    const CCLE = configs.filter((c) => c.code == 'CCLE')[0];
    const CGOR = configs.filter((c) => c.code == 'CGOR')[0];
    const CCHR = configs.filter((c) => c.code == 'CCHR')[0];
    const CGER = configs.filter((c) => c.code == 'CGER')[0];
    const CCAR = configs.filter((c) => c.code == 'CCAR')[0];
    const CTER = configs.filter((c) => c.code == 'CTER')[0];
    const MGRR = configs.filter((c) => c.code == 'MGRR')[0];
    const MCRR = configs.filter((c) => c.code == 'MCRR')[0];
    const CGRR = configs.filter((c) => c.code == 'CGRR')[0];
    const CCRR = configs.filter((c) => c.code == 'CCRR')[0];
    const MFGR = configs.filter((c) => c.code == 'MFGR')[0];
    const CFGR = configs.filter((c) => c.code == 'CFGR')[0];
    const MHA = configs.filter((c) => c.code == 'MHA')[0];
    const MDA = configs.filter((c) => c.code == 'MDA')[0];
    const NCCC = configs.filter((c) => c.code == 'NCCC')[0];
    const NCCM = configs.filter((c) => c.code == 'NCCM')[0];
    const NPCC = configs.filter((c) => c.code == 'NPCC')[0];
    const NPCM = configs.filter((c) => c.code == 'NPCM')[0];

    // Menu entries activations
    const MGLR = configs.filter((c) => c.code === 'MGLR')[0];
    const CGLR = configs.filter((c) => c.code === 'CGLR')[0];
    const MCGR = configs.filter((c) => c.code === 'MCGR')[0];
    const CCGR = configs.filter((c) => c.code === 'CCGR')[0];
    const MBAR = configs.filter((c) => c.code === 'MBAR')[0];
    const CBAR = configs.filter((c) => c.code === 'CBAR')[0];
    const MSTR = configs.filter((c) => c.code === 'MSTR')[0];
    const CSTR = configs.filter((c) => c.code === 'CSTR')[0];
    const MRUR = configs.filter((c) => c.code === 'MRUR')[0];
    const CRUR = configs.filter((c) => c.code === 'CRUR')[0];
    const MTMR = configs.filter((c) => c.code === 'MTMR')[0];
    const CTMR = configs.filter((c) => c.code === 'CTMR')[0];
    const MRKR = configs.filter((c) => c.code === 'MRKR')[0];
    const CRKR = configs.filter((c) => c.code === 'CRKR')[0];
    const NFCA = configs.filter((c) => c.code === 'NFCA')[0];
    const NFMA = configs.filter((c) => c.code === 'NFMA')[0];
    const CHA = configs.filter((c) => c.code === 'CHA')[0];
    const CDA = configs.filter((c) => c.code === 'CDA')[0];

    // Homepage
    const CHPG = configs.filter((c) => c.code === 'CHPG')[0];
    const MHPG = configs.filter((c) => c.code === 'MHPG')[0];

    // Goal Filter
    const GDTF = configs.filter((c) => c.code === 'GDTF')[0];

    // Wording
    const CHAW = configs.filter((c) => c.code === 'CHAW')[0];
    const RULW = configs.filter((c) => c.code === 'RULW')[0];
    const BDGW = configs.filter((c) => c.code === 'BDGW')[0];
    const GOAW = configs.filter((c) => c.code === 'GOAW')[0];
    const DBW = configs.filter((c) => c.code === 'DBW')[0];

    // Notifications

    // Display users count in activity widget
    const IUCD = configs.filter((c) => c.code === 'IUCD')[0];

    const { account } = this.props.accountDetail;
    const { intl } = this.props;

    const homePagesOptions = homePages(account, intl);
    const goalTimeFilters = [
      {
        value: '0',
        description: 'Objectifs en cours',
      },
      {
        value: '1',
        description: 'Objectifs passés',
      },
      {
        value: '2',
        description: 'Objectifs futurs',
      },
    ];

    return (
      <Formsy onValidSubmit={this.handleSubmit.bind(this)}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <div>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <DefaultTitle isContrast>
                    {intl.formatMessage({
                      id: 'admin.access_rights.manager_title',
                    })}
                  </DefaultTitle>
                </Grid>
                <Grid item xs={12}>
                  <Card>
                    <Select
                      name={MHPG.id}
                      initial={MHPG.value}
                      label={intl.formatMessage({
                        id: 'admin.access_rights.home_page',
                      })}
                      options={homePagesOptions.filter(
                        (homePage) => homePage.availability.indexOf('M') >= 0
                      )}
                      optionValueName='path'
                      optionTextName='title'
                      fullWidth
                    />
                    <Switch
                      name={MNCA.id}
                      initial={MNCA.value.toBoolean()}
                      label={intl.formatMessage({
                        id: 'admin.access_rights.future_challenge',
                      })}
                    />
                    <Switch
                      name={MFGR.id}
                      initial={MFGR.value.toBoolean()}
                      label={intl.formatMessage({
                        id: 'admin.access_rights.future_goals',
                      })}
                    />
                    <Switch
                      name={MCLR.id}
                      initial={MCLR.value.toBoolean()}
                      label={intl.formatMessage({
                        id: 'admin.access_rights.coaching_list',
                      })}
                    />
                    <Switch
                      name={MCLE.id}
                      initial={MCLE.value.toBoolean()}
                      label={intl.formatMessage({
                        id: 'admin.access_rights.edit_coaching_list',
                      })}
                    />
                    <Switch
                      name={MDA.id}
                      initial={MDA.value.toBoolean()}
                      label={intl.formatMessage({
                        id: 'admin.access_rights.home',
                      })}
                    />
                    <Switch
                      name={MGLR.id}
                      initial={MGLR.value.toBoolean()}
                      label={intl.formatMessage({
                        id: 'admin.access_rights.goals',
                      })}
                      disabled={
                        !this.state.activateManagerChallengeAccess &&
                        this.state.activateManagerGoalsAccess
                      }
                      onChange={this.handleChangeValue(
                        'activateManagerGoalsAccess'
                      ).bind(this)}
                    />
                    <Switch
                      name={MCGR.id}
                      initial={MCGR.value.toBoolean()}
                      label={intl.formatMessage({
                        id: 'admin.access_rights.challenge',
                      })}
                      disabled={
                        !this.state.activateManagerGoalsAccess &&
                        this.state.activateManagerChallengeAccess
                      }
                      onChange={this.handleChangeValue(
                        'activateManagerChallengeAccess'
                      ).bind(this)}
                    />
                    <Switch
                      name={MTMR.id}
                      initial={MTMR.value.toBoolean()}
                      label={intl.formatMessage({
                        id: 'admin.access_rights.teams',
                      })}
                    />

                    <Switch
                      name={MBAR.id}
                      initial={MBAR.value.toBoolean()}
                      label={intl.formatMessage({
                        id: 'admin.access_rights.badges',
                      })}
                    />
                    <Switch
                      name={NFMA.id}
                      initial={NFMA.value.toBoolean()}
                      label={intl.formatMessage({
                        id: 'admin.access_rights.news_feed',
                      })}
                    />
                    <Switch
                      name={NCCM.id}
                      initial={NCCM.value.toBoolean()}
                      label={intl.formatMessage({
                        id: 'admin.access_rights.news_feed_comments_creation',
                      })}
                    />
                    <Switch
                      name={NPCM.id}
                      initial={NPCM.value.toBoolean()}
                      label={intl.formatMessage({
                        id: 'admin.access_rights.news_feed_post_creation',
                      })}
                    />
                    <Switch
                      name={MSTR.id}
                      initial={MSTR.value.toBoolean()}
                      label={intl.formatMessage({
                        id: 'admin.access_rights.stats',
                      })}
                    />
                    <Switch
                      name={MRKR.id}
                      initial={MRKR.value.toBoolean()}
                      label={intl.formatMessage({
                        id: 'admin.access_rights.rankings',
                      })}
                    />
                    <Switch
                      name={MRUR.id}
                      initial={MRUR.value.toBoolean()}
                      label={intl.formatMessage({
                        id: 'admin.access_rights.rules',
                      })}
                    />
                    <Switch
                      name={MHA.id}
                      initial={MHA.value.toBoolean()}
                      label={intl.formatMessage({
                        id: 'admin.access_rights.help',
                      })}
                    />
                    <Switch
                      name={MGOR.id}
                      initial={MGOR.value.toBoolean()}
                      label={intl.formatMessage({
                        id: 'admin.access_rights.goal_rankings',
                      })}
                    />

                    <Switch
                      name={MCHR.id}
                      initial={MCHR.value.toBoolean()}
                      label={intl.formatMessage({
                        id: 'admin.access_rights.challenge_rankings',
                      })}
                    />
                    <Switch
                      name={MGER.id}
                      initial={MGER.value.toBoolean()}
                      label={intl.formatMessage({
                        id: 'admin.access_rights.general_rankings',
                      })}
                      onChange={this.handleChangeValue(
                        'activateManagerGeneralRanking'
                      ).bind(this)}
                    />
                    {this.state.activateManagerGeneralRanking && (
                      <TextField
                        type={'number'}
                        name={MGRR.id}
                        initial={MGRR.value}
                        label={intl.formatMessage({
                          id: 'admin.access_rights.general_rankings_limit',
                        })}
                        fullWidth
                      />
                    )}
                    <Switch
                      name={MCAR.id}
                      initial={MCAR.value.toBoolean()}
                      label={intl.formatMessage({
                        id: 'admin.access_rights.category_rankings',
                      })}
                      onChange={this.handleChangeValue(
                        'activateManagerCategoryRanking'
                      ).bind(this)}
                    />
                    {this.state.activateManagerCategoryRanking && (
                      <TextField
                        type={'number'}
                        name={MCRR.id}
                        initial={MCRR.value}
                        label={intl.formatMessage({
                          id: 'admin.access_rights.category_rankings_limit',
                        })}
                        fullWidth
                      />
                    )}
                    <Switch
                      name={MPWD.id}
                      initial={MPWD.value.toBoolean()}
                      label={intl.formatMessage({
                        id: 'admin.access_rights.reset_password',
                      })}
                    />
                    <Switch
                      name={MTER.id}
                      initial={MTER.value.toBoolean()}
                      label={intl.formatMessage({
                        id: 'admin.access_rights.team_rankings',
                      })}
                    />
                  </Card>
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <div>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <DefaultTitle isContrast>
                    {intl.formatMessage({
                      id: 'admin.access_rights.collaborator_title',
                    })}
                  </DefaultTitle>
                </Grid>
                <Grid item xs={12}>
                  <Card>
                    <Select
                      name={CHPG.id}
                      initial={CHPG.value}
                      label={intl.formatMessage({
                        id: 'admin.access_rights.home_page',
                      })}
                      options={homePagesOptions.filter(
                        (homePage) => homePage.availability.indexOf('C') >= 0
                      )}
                      optionValueName='path'
                      optionTextName='title'
                      fullWidth
                    />
                    <Switch
                      name={CNCA.id}
                      initial={CNCA.value.toBoolean()}
                      label={intl.formatMessage({
                        id: 'admin.access_rights.future_challenge',
                      })}
                    />
                    <Switch
                      name={CFGR.id}
                      initial={CFGR.value.toBoolean()}
                      label={intl.formatMessage({
                        id: 'admin.access_rights.future_goals',
                      })}
                    />
                    <Switch
                      name={CCLR.id}
                      initial={CCLR.value.toBoolean()}
                      label={intl.formatMessage({
                        id: 'admin.access_rights.coaching_list',
                      })}
                    />
                    <Switch
                      name={CCLE.id}
                      initial={CCLE.value.toBoolean()}
                      label={intl.formatMessage({
                        id: 'admin.access_rights.edit_coaching_list',
                      })}
                    />
                    <Switch
                      name={CDA.id}
                      initial={CDA.value.toBoolean()}
                      label={intl.formatMessage({
                        id: 'admin.access_rights.home',
                      })}
                    />
                    <Switch
                      name={CGLR.id}
                      initial={CGLR.value.toBoolean()}
                      label={intl.formatMessage({
                        id: 'admin.access_rights.goals',
                      })}
                      disabled={
                        !this.state.activateCollaboratorChallengeAccess &&
                        this.state.activateCollaboratorGoalsAccess
                      }
                      onChange={this.handleChangeValue(
                        'activateCollaboratorGoalsAccess'
                      ).bind(this)}
                    />
                    <Switch
                      name={CCGR.id}
                      initial={CCGR.value.toBoolean()}
                      label={intl.formatMessage({
                        id: 'admin.access_rights.challenge',
                      })}
                      disabled={
                        this.state.activateCollaboratorChallengeAccess &&
                        !this.state.activateCollaboratorGoalsAccess
                      }
                      onChange={this.handleChangeValue(
                        'activateCollaboratorChallengeAccess'
                      ).bind(this)}
                    />
                    <Switch
                      name={CTMR.id}
                      initial={CTMR.value.toBoolean()}
                      label={intl.formatMessage({
                        id: 'admin.access_rights.teams',
                      })}
                    />
                    <Switch
                      name={CBAR.id}
                      initial={CBAR.value.toBoolean()}
                      label={intl.formatMessage({
                        id: 'admin.access_rights.badges',
                      })}
                    />
                    <Switch
                      name={NFCA.id}
                      initial={NFCA.value.toBoolean()}
                      label={intl.formatMessage({
                        id: 'admin.access_rights.news_feed',
                      })}
                    />
                    <Switch
                      name={NCCC.id}
                      initial={NCCC.value.toBoolean()}
                      label={intl.formatMessage({
                        id: 'admin.access_rights.news_feed_comments_creation',
                      })}
                    />
                    <Switch
                      name={NPCC.id}
                      initial={NPCC.value.toBoolean()}
                      label={intl.formatMessage({
                        id: 'admin.access_rights.news_feed_post_creation',
                      })}
                    />

                    <Switch
                      name={CSTR.id}
                      initial={CSTR.value.toBoolean()}
                      label={intl.formatMessage({
                        id: 'admin.access_rights.stats',
                      })}
                    />

                    <Switch
                      name={CRKR.id}
                      initial={CRKR.value.toBoolean()}
                      label={intl.formatMessage({
                        id: 'admin.access_rights.rankings',
                      })}
                    />
                    <Switch
                      name={CRUR.id}
                      initial={CRUR.value.toBoolean()}
                      label={intl.formatMessage({
                        id: 'admin.access_rights.rules',
                      })}
                    />
                    <Switch
                      name={CHA.id}
                      initial={CHA.value.toBoolean()}
                      label={intl.formatMessage({
                        id: 'admin.access_rights.help',
                      })}
                    />
                    <Switch
                      name={CGOR.id}
                      initial={CGOR.value.toBoolean()}
                      label={intl.formatMessage({
                        id: 'admin.access_rights.goal_rankings',
                      })}
                    />
                    <Switch
                      name={CCHR.id}
                      initial={CCHR.value.toBoolean()}
                      label={intl.formatMessage({
                        id: 'admin.access_rights.challenge_rankings',
                      })}
                    />
                    <Switch
                      name={CGER.id}
                      initial={CGER.value.toBoolean()}
                      label={intl.formatMessage({
                        id: 'admin.access_rights.general_rankings',
                      })}
                      onChange={this.handleChangeValue(
                        'activateCollaboratorGeneralRanking'
                      ).bind(this)}
                    />
                    {this.state.activateCollaboratorGeneralRanking && (
                      <TextField
                        type={'number'}
                        name={CGRR.id}
                        initial={CGRR.value}
                        label={intl.formatMessage({
                          id: 'admin.access_rights.general_rankings_limit',
                        })}
                        fullWidth
                      />
                    )}
                    <Switch
                      name={CCAR.id}
                      initial={CCAR.value.toBoolean()}
                      label={intl.formatMessage({
                        id: 'admin.access_rights.category_rankings',
                      })}
                      onChange={this.handleChangeValue(
                        'activateCollaboratorCategoryRanking'
                      ).bind(this)}
                    />
                    {this.state.activateCollaboratorCategoryRanking && (
                      <TextField
                        type={'number'}
                        name={CCRR.id}
                        initial={CCRR.value}
                        label={intl.formatMessage({
                          id: 'admin.access_rights.category_rankings_limit',
                        })}
                        fullWidth
                      />
                    )}
                    <Switch
                      name={CTER.id}
                      initial={CTER.value.toBoolean()}
                      label={intl.formatMessage({
                        id: 'admin.access_rights.team_rankings',
                      })}
                    />
                  </Card>
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <DefaultTitle isContrast>
                    {intl.formatMessage({
                      id: 'admin.access_rights.all_users',
                    })}
                  </DefaultTitle>
                </Grid>
                <Grid item xs={12}>
                  <Card>
                    <Grid container direction='column' spacing={1}>
                      <Grid item xs={6}>
                        <Switch
                          name={IUCD.id}
                          initial={IUCD.value.toBoolean()}
                          label={intl.formatMessage({
                            id: 'admin.access_rights.activate_users_count',
                          })}
                        />
                      </Grid>
                      <Grid item>
                        <Select
                          name={GDTF.id}
                          initial={GDTF.value}
                          label={intl.formatMessage({
                            id: 'admin.access_rights.goal_filter',
                          })}
                          options={goalTimeFilters}
                          optionValueName='value'
                          optionTextName='description'
                          fullWidth
                          emptyDisabled
                        />
                      </Grid>
                      <Grid item>
                        <Grid container spacing={1}>
                          <Grid item xs={6}>
                            <TextField
                              type='text'
                              name={CHAW.id}
                              initial={CHAW.value}
                              placeholder={intl.formatMessage({
                                id: 'challenge.title',
                              })}
                              label={intl.formatMessage({
                                id: 'admin.access_rights.wording_challenge',
                              })}
                              fullWidth
                              lowercase
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <TextField
                              type='text'
                              name={GOAW.id}
                              initial={GOAW.value}
                              placeholder={intl.formatMessage({
                                id: 'admin.goal.title',
                              })}
                              label={intl.formatMessage({
                                id: 'admin.access_rights.wording_goal',
                              })}
                              fullWidth
                              lowercase
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <TextField
                              type='text'
                              name={BDGW.id}
                              initial={BDGW.value}
                              placeholder={intl.formatMessage({
                                id: 'badge.title',
                              })}
                              label={intl.formatMessage({
                                id: 'admin.access_rights.wording_badge',
                              })}
                              fullWidth
                              lowercase
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <TextField
                              type='text'
                              name={RULW.id}
                              initial={RULW.value}
                              placeholder={intl.formatMessage({
                                id: 'menu.rules_button',
                              })}
                              label={intl.formatMessage({
                                id: 'admin.access_rights.wording_rules',
                              })}
                              fullWidth
                              lowercase
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <TextField
                              type='text'
                              name={DBW.id}
                              initial={DBW.value}
                              placeholder={intl.formatMessage({
                                id: 'common.home',
                              })}
                              label={intl.formatMessage({
                                id: 'admin.access_rights.wording_dashboard',
                              })}
                              fullWidth
                              lowercase
                            />
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
            <ProgressButton
              type='submit'
              text={intl.formatMessage({ id: 'common.submit' })}
              loading={loading}
              centered
            />
          </Grid>
        </Grid>
      </Formsy>
    );
  }

  render() {
    const { intl } = this.props;
    const { configs, loading } = this.props.configList;
    const { success, error } = this.props.configListUpdate;

    if (success) {
      this.props.configListUpdateActions.clearConfigListUpdate();
      this.props.history.goBack();
      toast.success(
        intl.formatMessage({ id: 'common.update_success_message' })
      );
    }
    if (error) {
      toast.error(intl.formatMessage({ id: 'common.update_error_message' }));
    }

    return (
      <div>
        {loading && this.renderLoader()}
        {!loading && configs && this.renderData()}
      </div>
    );
  }
}

const mapStateToProps = ({ accountDetail, configList, configListUpdate }) => ({
  accountDetail,
  configList,
  configListUpdate,
});

const mapDispatchToProps = (dispatch) => ({
  configListActions: bindActionCreators(configListActions, dispatch),
  configListUpdateActions: bindActionCreators(
    configListUpdateActions,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(AdminAccessRightList));
