import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Formsy from 'formsy-react';
import { withStyles } from '@material-ui/core/styles';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Grid,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  AppBarSubTitle,
  Card,
  Loader,
  MainLayoutComponent,
  ProgressButton,
  Select,
  TextField,
  LanguageSelect,
  I18nWrapper,
  DefaultTitle,
  InfoText,
  PasswordField,
  HiddenInput,
  Switch,
} from '../../../../components';
import * as roleListActions from '../../../../services/Roles/RoleList/actions';
import * as teamDetailActions from '../../../../services/Teams/TeamDetail/actions';
import * as userCreationActions from '../../../../services/Users/UserCreation/actions';
import '../../../../helpers/FormsyHelper';
import * as Resources from '../../../../Resources';
import { injectIntl } from 'react-intl';
import _ from 'lodash';
import { toast } from 'react-toastify';

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

class CollaboratorCreation extends MainLayoutComponent {
  constructor(props) {
    super(props);
    this.state = {
      display: true,
      role: null,
    };
    this.props.userCreationActions.clearUserCreation();
  }

  componentDidMount() {
    const { intl } = this.props;
    const id = this.props.match.params.teamId;

    this.props.handleTitle(intl.formatMessage({ id: 'menu.admin_button' }));
    this.props.handleSubHeader(
      <AppBarSubTitle
        title={intl.formatMessage({ id: 'admin.user.creation.title' })}
      />
    );
    this.props.handleMaxWidth('sm');
    this.props.activateReturn();
    this.props.roleListActions.getRoleList();

    this.props.teamDetailActions.getTeamDetail(id);
  }

  handleValueChange = (name) => (value) => {
    this.setState(
      {
        ...this.state,
        [name]: value,
        display: false,
      },
      () => {
        this.setState({
          ...this.state,
          display: true,
        });
      }
    );
  };

  handleSubmit(model) {
    const payload = Object.assign({}, model, {
      identifiers: model.identifiers.map((identifier, index) => {
        return { order: index, value: identifier ? identifier : '' };
      }),
    });
    this.props.userCreationActions.createUser(payload);
  }

  renderLoader() {
    return <Loader centered />;
  }

  renderData() {
    const { intl, classes } = this.props;
    const { loading } = this.props.userCreation;
    const { roles } = this.props.roleList;
    const { team } = this.props.teamDetail;
    const collaboratorRole = roles.find((r) => r.code == 'C');
    const managerRole = roles.find((r) => r.code == 'M');

    const LanguageField = () => {
      const context = useContext(I18nWrapper.Context);
      return (
        <LanguageSelect
          name='locale'
          label={intl.formatMessage({ id: 'admin.user.locale' })}
          initial={context.locale}
          noCard
        />
      );
    };

    return (
      <div>
        <Formsy onValidSubmit={this.handleSubmit.bind(this)}>
          <Grid container spacing={4}>
            <Grid item>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <DefaultTitle isContrast>
                    {intl.formatMessage({ id: 'admin.user.information_title' })}
                  </DefaultTitle>
                </Grid>
                <Grid item xs={12}>
                  <Card>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <LanguageField />
                      </Grid>
                      <Grid item xs={6}></Grid>
                      <Grid item xs={6}>
                        <TextField
                          name='firstname'
                          label={intl.formatMessage({
                            id: 'admin.user.firstname',
                          })}
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
                          label={intl.formatMessage({ id: 'admin.user.email' })}
                          validations='isEmail'
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

                      <HiddenInput
                        name='role'
                        value={roles.find((r) => r.code == 'C').id}
                      />
                      <Grid item xs={6}>
                        <Select
                          name='team'
                          label={intl.formatMessage({ id: 'admin.user.team' })}
                          options={[team]}
                          initial={team.id}
                          optionValueName='id'
                          optionTextName='name'
                          fullWidth
                          disabled
                        />
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
                      {[...Array(5).keys()].map((order) => (
                        <Grid item xs={6} key={`identifier_${order}`}>
                          <TextField
                            name={`identifiers[${order}]`}
                            label={intl
                              .formatMessage({ id: 'admin.user.identifier' })
                              .format(order + 1)}
                            fullWidth
                            lowercase
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </Card>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </Grid>
            <Grid item>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <DefaultTitle isContrast>
                    {intl.formatMessage({
                      id: 'admin.user.creation.password_title',
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
                            id: 'admin.user.password_field',
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
                            this.state.password ? 'equalsField:password' : null
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
                    </Grid>
                  </Card>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Switch
                name={'send_email'}
                initial={false}
                label={intl.formatMessage({
                  id: 'admin.user.creation.send_email',
                })}
              />
            </Grid>

            <Grid item xs={12}>
              <ProgressButton
                type='submit'
                text={intl.formatMessage({ id: 'common.submit' })}
                centered
                loading={loading}
              />
            </Grid>
          </Grid>
        </Formsy>
      </div>
    );
  }

  render() {
    const { intl } = this.props;
    const { roles, loading: roleListLoading } = this.props.roleList;
    const { team, loading: teamLoading } = this.props.teamDetail;
    const { success } = this.props.userCreation;
    const loading = roleListLoading || teamLoading;

    if (success) {
      this.props.userCreationActions.clearUserCreation();
      this.props.history.goBack();
      toast.success(intl.formatMessage({ id: 'admin.user.creation.success' }));
    }

    return (
      <div>
        {loading && this.renderLoader()}
        {!loading && roles && team && this.renderData()}
      </div>
    );
  }
}

const mapStateToProps = ({ roleList, teamDetail, userCreation }) => ({
  roleList,
  teamDetail,
  userCreation,
});

const mapDispatchToProps = (dispatch) => ({
  roleListActions: bindActionCreators(roleListActions, dispatch),
  teamDetailActions: bindActionCreators(teamDetailActions, dispatch),
  userCreationActions: bindActionCreators(userCreationActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(withStyles(styles)(CollaboratorCreation)));
