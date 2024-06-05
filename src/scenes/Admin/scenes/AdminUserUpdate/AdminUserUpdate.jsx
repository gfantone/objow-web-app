import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toast } from 'react-toastify';
import Formsy from 'formsy-react';
import { withStyles } from '@material-ui/core/styles';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Grid,
  Link,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { GoalDuplicationDialog } from './components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import {
  AppBarSubTitle,
  Card,
  Loader,
  MainLayoutComponent,
  ProgressButton,
  Select,
  TextField,
  I18nWrapper,
  LanguageSelect,
  DefaultTitle,
  InfoText,
  Avatar,
  FileInput,
  Button,
  Checkbox,
  HiddenInput,
  Tooltip,
  BlueText,
  PasswordField,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '../../../../components';
import { useIntl, injectIntl } from 'react-intl';
import * as roleListActions from '../../../../services/Roles/RoleList/actions';
import * as teamListActions from '../../../../services/Teams/TeamList/actions';
import * as userIdentifierDefinitionListActions from '../../../../services/Users/UserIdentifierDefinitionList/actions';
import * as userDetailActions from '../../../../services/Users/UserDetail/actions';
import * as userUpdateActions from '../../../../services/Users/UserUpdate/actions';
import * as userUpdateActivationActions from '../../../../services/Users/UserUpdateActivation/actions';
import * as userUpdatePasswordActions from '../../../../services/Users/UserUpdatePassword/actions';
import * as Resources from '../../../../Resources';
import '../../../../helpers/FormsyHelper';
import _ from 'lodash';

const styles = {
  panel: {
    backgroundColor: 'initial',
    borderRadius: 'initial',
    boxShadow: 'none',
  },
  panelSummary: {
    padding: 0,
  },
  panelDetails: {
    padding: 0,
  },
};

class AdminUserUpdate extends MainLayoutComponent {
  state = {
    role: null,
    deletePromptOpen: false,
  };

  constructor(props) {
    super(props);
    this.id = null;
    this.initialized = false;
    this.props.userUpdateActions.clearUserUpdate();
    this.props.userUpdateActivationActions.clearUserActivationUpdate();
    this.fileInputRef = React.createRef();
    this.forceResetPasswordForm = React.createRef();
  }

  componentDidMount() {
    const { intl, classes } = this.props;
    const { user } = this.props.userDetail;
    this.id = this.props.match.params.id;
    this.props.handleTitle(intl.formatMessage({ id: 'admin.title' }));
    this.props.handleSubHeader(
      <AppBarSubTitle
        title={intl.formatMessage({ id: 'admin.user.update.title' })}
      />
    );
    this.props.handleMaxWidth('sm');
    this.props.activateReturn();

    this.props.roleListActions.getRoleList();
    this.props.teamListActions.getTeamList({ disableCollaborators: true });
    this.props.userDetailActions.getUserDetail(this.id);
    this.props.userIdentifierDefinitionListActions.getUserIdentifierDefinitionList();
  }

  componentWillReceiveProps(props) {
    const { intl, classes } = this.props;
    const { user } = props.userDetail;
    if (!this.initialized && user) {
      this.state.role = user.role.id;
      const activationButtonText = _.get(user, 'isActive')
        ? intl.formatMessage({ id: 'admin.user.update.disable_button' })
        : intl.formatMessage({ id: 'admin.user.update.enable_button' });
      this.props.handleButtons(
        <div>
          {user.isActive && (
            <Tooltip title={activationButtonText}>
              <IconButton
                size={'small'}
                onClick={() => this.setDeletePromptOpen(true)}
                className={classes.iconMargin}
              >
                <FontAwesomeIcon icon={faTrash} />
              </IconButton>
            </Tooltip>
          )}
        </div>
      );
      this.initialized = true;
    }
  }

  handleValueChange = (name) => (value) => {
    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  handleChangeActivationClick = () => {
    const { user } = this.props.userDetail;

    this.props.userUpdateActivationActions.updateUserActivation(user);
  };

  handleValidSubmit(model) {
    model.id = this.id;

    const payload = Object.assign({}, model, {
      identifiers: model.identifiers.map((identifier, index) => {
        return { order: index, value: identifier ? identifier : '' };
      }),
      force_reset_password: this.state.force_reset_password,
    });
    const newAccountPhoto = new FormData();
    if (model.photo) {
      newAccountPhoto.append('photo', model.photo, model.photo.name);
    }
    this.props.userUpdateActions.updateUser(payload, newAccountPhoto);
    if (model.password && model.password != '') {
      this.props.userUpdatePasswordActions.updateUserPassword(
        this.id,
        model.password
      );
    }
  }

  handleForcePasswordResetSubmit(model) {
    model.id = this.id;
    this.props.userUpdateActions.updateUser(model);
  }

  onFileInputClick = () => {
    if (this.fileInputRef.current) {
      this.fileInputRef.current.getElementsByTagName('input')[0].click();
    }
  };

  renderLoader() {
    return <Loader centered />;
  }

  setDeletePromptOpen = (value) => {
    this.setState({
      ...this.state,
      deletePromptOpen: value,
    });
  };

  setDuplicationOpen = (value) => {
    this.setState({
      ...this.state,
      duplicationOpen: value,
    });
  };

  renderData() {
    const { intl, classes } = this.props;
    const { loading: userUpdateLoading } = this.props.userUpdate;
    const { roles } = this.props.roleList;
    const { teams } = this.props.teamList;
    const { user } = this.props.userDetail;
    const { definitions } = this.props.userIdentifierList;
    const collaboratorRole = roles.find((r) => r.code == 'C');
    const managerRole = roles.find((r) => r.code == 'M');

    let selectableTeams = [];
    if (teams) {
      selectableTeams =
        this.state.role == collaboratorRole.id
          ? teams
          : this.state.role == managerRole.id
          ? teams.filter(
              (t) => (t.manager && t.manager.id == user.id) || !t.manager
            )
          : null;
    }
    const initialTeam =
      selectableTeams &&
      user.team &&
      selectableTeams.find((x) => x.id == user.team.id) != null
        ? user.team.id
        : null;
    const { loading: userUpdateActivationLoading } =
      this.props.userUpdateActivation;
    const activationButtonText = user.isActive
      ? intl.formatMessage({ id: 'admin.user.update.disable_button' })
      : intl.formatMessage({ id: 'admin.user.update.enable_button' });

    const photo = user.photo ? user.photo : '/assets/img/user/avatar.svg';

    const LanguageField = ({ initial }) => {
      const context = useContext(I18nWrapper.Context);
      return (
        <LanguageSelect
          name='locale'
          label={intl.formatMessage({ id: 'admin.user.locale' })}
          initial={initial || context.locale}
          noCard
        />
      );
    };

    return (
      <div>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Formsy onValidSubmit={this.handleValidSubmit.bind(this)}>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <Grid container spacing={1}>
                    <Grid item>
                      <DefaultTitle>
                        {intl.formatMessage({
                          id: 'admin.user.information_title',
                        })}
                      </DefaultTitle>
                    </Grid>
                    <Grid item>
                      <Card>
                        <Grid container spacing={1} justify='space-between'>
                          <Grid
                            item
                            xs={8}
                            container
                            alignItems='center'
                            spacing={2}
                          >
                            <Grid item>
                              <Avatar
                                src={photo}
                                className={classes.photo}
                                entityId={user.id}
                                fallbackName={user.fullname}
                                fontSize={20}
                              />
                            </Grid>
                            <Grid item>
                              <FileInput name='photo' accept='image/*' />
                            </Grid>
                          </Grid>
                          <Grid item xs={4}>
                            <Grid container justify='flex-end'>
                              <Grid item>
                                <LanguageField initial={user.locale} />
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={6}>
                            <TextField
                              name='firstname'
                              label={intl.formatMessage({
                                id: 'admin.user.firstname',
                              })}
                              initial={user.firstname}
                              fullWidth
                              required
                              lowercase
                              validationErrors={{
                                isDefaultRequiredValue: intl.formatMessage({
                                  id: 'common.form.required_error',
                                }),
                              }}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <TextField
                              name='lastname'
                              label={intl.formatMessage({
                                id: 'admin.user.lastname',
                              })}
                              initial={user.lastname}
                              fullWidth
                              required
                              lowercase
                              validationErrors={{
                                isDefaultRequiredValue: intl.formatMessage({
                                  id: 'common.form.required_error',
                                }),
                              }}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              name='email'
                              label={intl.formatMessage({
                                id: 'admin.user.email',
                              })}
                              validations='isEmail'
                              initial={user.email}
                              fullWidth
                              required
                              lowercase
                              validationErrors={{
                                isDefaultRequiredValue: intl.formatMessage({
                                  id: 'common.form.required_error',
                                }),
                                isEmail: intl.formatMessage({
                                  id: 'common.form.email_error',
                                }),
                              }}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <Select
                              name='role'
                              label={intl.formatMessage({
                                id: 'admin.user.type',
                              })}
                              options={roles}
                              optionValueName='id'
                              optionTextName='name'
                              initial={user.role ? user.role.id : null}
                              fullWidth
                              required
                              onChange={this.handleValueChange('role').bind(
                                this
                              )}
                              validationErrors={{
                                isDefaultRequiredValue: intl.formatMessage({
                                  id: 'common.form.required_error',
                                }),
                              }}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <Select
                              name='team'
                              label={intl.formatMessage({
                                id: 'admin.user.team',
                              })}
                              options={selectableTeams}
                              optionValueName='id'
                              optionTextName='name'
                              initial={initialTeam}
                              fullWidth
                              updateInitial
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <Link
                              to='/'
                              onClick={() => this.setDuplicationOpen(true)}
                              style={{
                                textDecoration: 'none',
                                color: 'rgb(15,111,222)',
                                fontSize: 16,
                                cursor: 'pointer',
                              }}
                            >
                              {intl.formatMessage({
                                id: 'admin.goal.duplication.dialog_title',
                              })}
                            </Link>
                            {this.state.duplicationOpen && (
                              <div>
                                <GoalDuplicationDialog
                                  user={user}
                                  open={this.state.duplicationOpen}
                                  setOpen={this.setDuplicationOpen}
                                />
                              </div>
                            )}
                            <Grid>
                              <Checkbox
                                name='is_fictive'
                                label={intl.formatMessage({
                                  id: 'account.fictional_user',
                                })}
                                value={user.is_fictive || false}
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                      </Card>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12} style={{ paddingTop: 0, paddingBottom: 0 }}>
                  <ExpansionPanel className={classes.panel}>
                    <ExpansionPanelSummary
                      expandIcon={<ExpandMoreIcon />}
                      className={classes.panelSummary}
                    >
                      <DefaultTitle>
                        {intl.formatMessage({ id: 'admin.user.identifiers' })}
                      </DefaultTitle>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.panelDetails}>
                      <Card>
                        <Grid container spacing={4}>
                          {[...Array(5).keys()].map((order) => {
                            const definition = definitions.find(
                              (d) => d.order == order
                            );
                            return (
                              <Grid item xs={6} key={`identifier_${order}`}>
                                <TextField
                                  name={`identifiers[${order}]`}
                                  label={
                                    _.get(definition, `name`) ||
                                    intl
                                      .formatMessage({
                                        id: 'admin.user.identifier',
                                      })
                                      .format(order + 1)
                                  }
                                  initial={_.get(
                                    user,
                                    `identifiers[${order}].value`
                                  )}
                                  fullWidth
                                  lowercase
                                />
                              </Grid>
                            );
                          })}
                        </Grid>
                      </Card>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                </Grid>

                <Grid item xs={12}>
                  <Grid container spacing={1}>
                    <Grid item>
                      <DefaultTitle>
                        {intl.formatMessage({
                          id: 'admin.user.update.password_title',
                        })}
                      </DefaultTitle>
                    </Grid>
                    <Grid item xs={12}>
                      <Card>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <InfoText lowercase>
                              {intl.formatMessage({
                                id: 'admin.user.password_info',
                              })}
                            </InfoText>
                          </Grid>
                          <Grid item xs={6}>
                            <PasswordField
                              type='password'
                              name='password'
                              onChange={this.handleValueChange('password').bind(
                                this
                              )}
                              label={intl.formatMessage({
                                id: 'admin.user.password',
                              })}
                              fullWidth
                              lowercase
                              validations={{
                                hasUppercaseCharacter: true,
                                hasLowercaseCharacter: true,
                                hasSpecialCharacter: true,
                                hasMoreCharactersThan: 8,
                                hasDigitCharacter: true,
                              }}
                              validationErrors={{
                                isDefaultRequiredValue: intl.formatMessage({
                                  id: 'common.form.required_error',
                                }),
                                hasUppercaseCharacter: intl.formatMessage({
                                  id: 'common.form.has_uppercase_character',
                                }),
                                hasLowercaseCharacter: intl.formatMessage({
                                  id: 'common.form.has_lowercase_character',
                                }),
                                hasSpecialCharacter: intl.formatMessage({
                                  id: 'common.form.has_special_character',
                                }),
                                hasMoreCharactersThan: intl
                                  .formatMessage({
                                    id: 'common.form.has_more_characters_than',
                                  })
                                  .format(8),
                                hasDigitCharacter: intl.formatMessage({
                                  id: 'common.form.has_digit_character',
                                }),
                              }}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <PasswordField
                              type='password'
                              name='paswwordConfirm'
                              label={intl.formatMessage({
                                id: 'admin.user.password_confirm',
                              })}
                              fullWidth
                              lowercase
                              validations={
                                this.state.password
                                  ? 'equalsField:password'
                                  : null
                              }
                              validationErrors={{
                                isDefaultRequiredValue: intl.formatMessage({
                                  id: 'common.form.required_error',
                                }),
                                equalsField: intl.formatMessage({
                                  id: 'common.form.password_not_match_error',
                                }),
                              }}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <Link
                              to='/'
                              onClick={() =>
                                _.get(
                                  this.forceResetPasswordForm,
                                  'current.submit'
                                )()
                              }
                              style={{
                                textDecoration: 'none',
                                color: 'rgb(15,111,222)',
                                fontSize: 16,
                                cursor: 'pointer',
                              }}
                            >
                              {intl.formatMessage({
                                id: 'admin.user.force_reset_password',
                              })}
                            </Link>
                            <span
                              style={{
                                marginLeft: 5,
                                lineHeight: 1,
                                verticalAlign: 'middle',
                              }}
                            >
                              <Tooltip
                                title={intl.formatMessage({
                                  id: 'admin.user.force_reset_password_info',
                                })}
                                placement={'right'}
                              >
                                <BlueText
                                  style={{ width: 'fit-content' }}
                                  component={'span'}
                                >
                                  <FontAwesomeIcon icon={faInfoCircle} />
                                </BlueText>
                              </Tooltip>
                            </span>
                          </Grid>
                        </Grid>
                      </Card>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <div>
                    <Grid container justify='flex-end'>
                      <Grid item>
                        <ProgressButton
                          type='submit'
                          text={intl.formatMessage({ id: 'common.submit' })}
                          centered
                          loading={userUpdateLoading}
                        />
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
              </Grid>
            </Formsy>

            <Formsy
              ref={this.forceResetPasswordForm}
              onValidSubmit={this.handleForcePasswordResetSubmit.bind(this)}
            >
              <HiddenInput name='force_reset_password' value={true} />
            </Formsy>
          </Grid>
        </Grid>
      </div>
    );
  }

  render() {
    const { roles, loading: roleListLoading } = this.props.roleList;
    const { teams, loading: teamListLoading } = this.props.teamList;
    const { user, loading: userDetail } = this.props.userDetail;
    const { definitions, loading: userIdentifierListLoading } =
      this.props.userIdentifierList;
    const { success: userUpdateSuccess, hasError: userUpdateError } =
      this.props.userUpdate;
    const { success: userUpdateActivationSuccess, loading: activationLoading } =
      this.props.userUpdateActivation;
    const loading = roleListLoading || userDetail || userIdentifierListLoading;
    const { intl, classes } = this.props;

    if (userUpdateSuccess || userUpdateActivationSuccess) {
      this.props.userUpdateActions.clearUserUpdate();
      this.props.userUpdateActivationActions.clearUserActivationUpdate();
      this.props.history.goBack();
      toast.success(intl.formatMessage({ id: 'admin.user.update.success' }));
    }

    if (userUpdateError) {
      this.props.userUpdateActions.clearUserUpdate();
      this.props.userUpdateActivationActions.clearUserActivationUpdate();
      toast.error(intl.formatMessage({ id: 'admin.user.update.error' }));
    }

    return (
      <div>
        {loading && this.renderLoader()}
        {!loading && roles && user && definitions && this.renderData()}
        <Dialog
          open={this.state.deletePromptOpen}
          onClose={() => this.setDeletePromptOpen(false)}
        >
          <DialogTitle>
            {intl.formatMessage({ id: 'coaching_list.delete_prompt' })}
          </DialogTitle>
          <DialogContent>
            {intl.formatMessage({ id: 'coaching_list.delete_prompt2' })}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => this.setDeletePromptOpen(false)}
              color='secondary'
            >
              {intl.formatMessage({ id: 'common.no' })}
            </Button>
            <ProgressButton
              type='button'
              text={intl.formatMessage({ id: 'common.yes' })}
              onClick={() => this.handleChangeActivationClick()}
              loading={activationLoading}
            />
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = ({
  roleList,
  teamList,
  userIdentifierList,
  userDetail,
  userUpdate,
  userUpdateActivation,
}) => ({
  roleList,
  teamList,
  userIdentifierList,
  userDetail,
  userUpdate,
  userUpdateActivation,
});

const mapDispatchToProps = (dispatch) => ({
  roleListActions: bindActionCreators(roleListActions, dispatch),
  teamListActions: bindActionCreators(teamListActions, dispatch),
  userIdentifierDefinitionListActions: bindActionCreators(
    userIdentifierDefinitionListActions,
    dispatch
  ),
  userDetailActions: bindActionCreators(userDetailActions, dispatch),
  userUpdateActions: bindActionCreators(userUpdateActions, dispatch),
  userUpdateActivationActions: bindActionCreators(
    userUpdateActivationActions,
    dispatch
  ),
  userUpdatePasswordActions: bindActionCreators(
    userUpdatePasswordActions,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(withStyles(styles)(AdminUserUpdate)));
