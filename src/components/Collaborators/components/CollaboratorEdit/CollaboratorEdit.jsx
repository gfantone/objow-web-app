import React, { useContext, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Formsy from 'formsy-react';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import {
  Grid,
  MenuItem,
  Select,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import {
  AccentText,
  Card,
  FileInput,
  InfoText,
  MainLayoutComponent,
  ProgressButton,
  TextField,
  RefreshButton,
  Avatar,
  LanguageSelect,
  I18nWrapper,
  DefaultTitle,
  PasswordField,
  Switch,
  Button,
  Loader,
} from '../../../../components';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import * as Resources from '../../../../Resources';
import * as accountUpdateActions from '../../../../services/Account/AccountUpdate/actions';
import * as userUpdatePasswordActions from '../../../../services/Users/UserUpdatePassword/actions';
import * as userIdentifierDefinitionListActions from '../../../../services/Users/UserIdentifierDefinitionList/actions';
import '../../../../helpers/FormsyHelper';
import { useIntl, injectIntl } from 'react-intl';
import { toast } from 'react-toastify';
import api from '../../../../data/api/api';
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
  photo: {
    height: 100,
    width: 100,
  },
  refreshButton: {
    textAlign: 'center',
  },
};

const CollaboratorEdit = ({
  account,
  classes,
  width,
  loading,
  onSubmit,
  hidePassword,
  hideNotification,
  disableEmail,
  hideRefresh,
  displaySendEmail,
  ...props
}) => {
  const intl = useIntl();
  const mobileScreen = isWidthDown('xs', width);

  const photo = account.photo ? account.photo : '/assets/img/user/avatar.svg';

  const isJti = account.isJtiEnv;

  const [password, setPassword] = useState('');

  const { definitions, loading: userIdentifierDefinitionLoading } =
    props.userIdentifierList;

  useEffect(() => {
    props.userIdentifierDefinitionListActions.getUserIdentifierDefinitionList();
  }, []);

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

  const handleSendEmail = () => {
    api.users.sendNewPassword(account.id).then(() => {
      toast.success(
        intl.formatMessage({
          id: 'admin.user.update.create_new_password_success',
        })
      );
      window.history.back();
    });
  };

  return (
    <Formsy onValidSubmit={onSubmit}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item>
              <DefaultTitle isContrast>
                {intl.formatMessage({ id: 'admin.user.information_title' })}
              </DefaultTitle>
            </Grid>
            <Grid item xs={12}>
              <Card>
                <Grid container spacing={2}>
                  <Grid item xs={12} container justify='center'>
                    <Grid item>
                      <Avatar
                        src={photo}
                        className={classes.photo}
                        entityId={account.id}
                        fallbackName={account.fullname}
                        fontSize={48}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12} container justify='center'>
                    <Grid item>
                      <InfoText>
                        {intl.formatMessage({
                          id: `roles.${account.role.code}`,
                        })}
                      </InfoText>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} container justify='center'>
                    <Grid item>
                      <FileInput
                        name='photo'
                        accept='image/*'
                        onChange={(photo) => {
                          onSubmit({ photo });
                        }}
                      />
                    </Grid>
                  </Grid>

                  <Grid item xs={12} container justify='flex-start'>
                    <Grid item>
                      <LanguageField initial={account.locale} />
                    </Grid>
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      name='firstname'
                      label={intl.formatMessage({
                        id: 'account.first_name_label',
                      })}
                      initial={account.firstname}
                      fullWidth
                      required
                      validationErrors={{
                        isDefaultRequiredValue: intl.formatMessage({
                          id: 'common.form.required_error',
                        }),
                      }}
                      disabled={account.isJtiEnv}
                      lowercase
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      name='lastname'
                      label={intl.formatMessage({
                        id: 'account.last_name_label',
                      })}
                      initial={account.lastname}
                      fullWidth
                      required
                      validationErrors={{
                        isDefaultRequiredValue: intl.formatMessage({
                          id: 'common.form.required_error',
                        }),
                      }}
                      disabled={account.isJtiEnv}
                      lowercase
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      lowercase
                      name='email'
                      disabled={disableEmail || account.isJtiEnv}
                      label={intl.formatMessage({ id: 'account.email_label' })}
                      validations='isEmail'
                      initial={account.email}
                      fullWidth
                      required
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
                  {account.role.code != 'A' && (
                    <Grid item xs={12}>
                      <TextField
                        name='citation'
                        label={intl.formatMessage({
                          id: 'account.citation_label',
                        })}
                        initial={account.citation}
                        fullWidth
                        multiline
                        lowercase
                      />
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    {isJti && (
                      <TextField
                        name='title'
                        label={intl.formatMessage({
                          id: 'account.title_label_pseudo',
                        })}
                        initial={account.title}
                        fullWidth
                        lowercase
                      />
                    )}
                    {!isJti && (
                      <TextField
                        name='title'
                        label={intl.formatMessage({
                          id: 'account.title_label',
                        })}
                        initial={account.title}
                        fullWidth
                        lowercase
                      />
                    )}
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} style={{ paddingTop: 0, paddingBottom: 0 }}>
          {!definitions && userIdentifierDefinitionLoading && (
            <Loader centered />
          )}
          {definitions && (
            <ExpansionPanel className={classes.panel}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                className={classes.panelSummary}
              >
                <DefaultTitle isContrast>
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
                            initial={
                              _.get(account, `identifiers`, []).filter(
                                (i) => i.definition.order == order
                              )[0]?.value
                            }
                            disabled={
                              !_.get(definition, `player_editable`) ||
                              account.isJtiEnv
                            }
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
          )}
        </Grid>
        {!hidePassword && (
          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item>
                <DefaultTitle isContrast>
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
                        {intl.formatMessage({ id: 'admin.user.password_info' })}
                      </InfoText>
                    </Grid>
                    <Grid item xs={6}>
                      <PasswordField
                        lowercase
                        type='password'
                        name='password'
                        onChange={setPassword}
                        label={intl.formatMessage({
                          id: 'account.password_label',
                        })}
                        fullWidth
                        validations={{
                          hasUppercaseCharacter: true,
                          hasLowercaseCharacter: true,
                          hasSpecialCharacter: true,
                          hasMoreCharactersThan: 8,
                          hasDigitCharacter: true,
                        }}
                        validationErrors={{
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
                        lowercase
                        type='password'
                        name='paswwordConfirm'
                        label={intl.formatMessage({
                          id: 'account.confirm_password_label',
                        })}
                        fullWidth
                        validations={password ? 'equalsField:password' : null}
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
        )}
        {!hideNotification && (
          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item>
                <DefaultTitle isContrast>
                  {intl.formatMessage({
                    id: 'admin.user.update.notifications_title',
                  })}
                </DefaultTitle>
              </Grid>
              <Grid item xs={12}>
                <Card>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      {account && 'allow_pending_notifications' in account && (
                        <Switch
                          style={{ width: '100%' }}
                          name='allow_pending_notifications'
                          initial={account.allow_pending_notifications}
                          label={intl.formatMessage({
                            id: 'admin.user.update.allow_pending_notifications',
                          })}
                        />
                      )}
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        )}

        <Grid item xs={12}>
          <Grid container spacing={2} justify='center'>
            {!hideRefresh && (
              <Grid item style={{ order: mobileScreen ? 2 : 1 }}>
                <RefreshButton
                  color='secondary'
                  className={classes.refreshButton}
                />
              </Grid>
            )}
            {displaySendEmail && (
              <Grid item>
                <Button color='secondary' onClick={handleSendEmail}>
                  {intl.formatMessage({
                    id: 'admin.user.update.create_new_password',
                  })}
                </Button>
              </Grid>
            )}
            <Grid item style={{ order: mobileScreen ? 1 : 2 }}>
              <ProgressButton
                type='submit'
                text={intl.formatMessage({ id: 'common.submit' })}
                centered
                loading={loading}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Formsy>
  );
};

const mapStateToProps = ({ userIdentifierList }) => ({
  userIdentifierList,
});

const mapDispatchToProps = (dispatch) => ({
  userIdentifierDefinitionListActions: bindActionCreators(
    userIdentifierDefinitionListActions,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withWidth()(injectIntl(CollaboratorEdit))));
