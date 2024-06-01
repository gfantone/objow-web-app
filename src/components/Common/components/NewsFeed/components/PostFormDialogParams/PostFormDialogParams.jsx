import React, { useState, useEffect } from 'react';
import Formsy from 'formsy-react';

import { DefaultTitle, GreenRadio, ProgressButton, Select } from '../../../..';
import { useIntl } from 'react-intl';
import {
  Chip,
  FormControl,
  FormControlLabel,
  Grid,
  RadioGroup,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import { ChallengeCollaboratorFilter } from '../../../../../../scenes/Challenges/components';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as roleListActions from '../../../../../../services/Roles/RoleList/actions';

const styles = () => {
  return {
    filterChip: {
      marginRight: 5,
      marginBottom: 5,
      textTransform: 'none',
    },
  };
};

const PostFormDialogParams = ({
  post,
  width,
  classes,
  updateVisibility,
  onSubmitTeamAndTeamGroup,
  selectedRadioButton,
  onRadioButtonChange,
  team,
  teamGroup,
  ...props
}) => {
  const { account } = props.accountDetail;
  const { roles } = props.roleList;
  const isMobile = isWidthDown('sm', width);
  const [visibleOptions, setVisibleOptions] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [visibilityAll, setVisibilityAll] = useState(selectedRadioButton);
  const [radioButtonSelected, setRadioButtonSelected] = useState(false);
  const [filterSelected, setFilterSelected] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(
    account.team ? account.team : team
  );
  const [selectedTeamGroup, setSelectedTeamGroup] = useState(
    account.team_group ? account.team_group : teamGroup
  );
  const [teamId, setTeamId] = useState(
    _.get(post, 'visibility.team.id') ||
      _.get(post, 'visibility.team') ||
      _.get(account, 'team.id')
  );
  const [teamGroupId, setTeamGroupId] = useState(
    _.get(
      post,
      'visibility.team_group.id',
      _.get(post, 'visibility.team_group')
    )
  );
  const [role, setRole] = useState(_.get(post, 'visibility.role'));

  const intl = useIntl();

  const isCollaborator = account.role.code === 'C';
  const isAdministrator = account.role.code === 'A';
  const isSuperManager = account.role.code === 'S';
  const isManager = account.role.code === 'M';

  const fullVisibility = intl.formatMessage({ id: 'newsfeed.for_everybody' });

  useEffect(() => {
    if (visibilityAll === 'selected team') {
      setIsFilterVisible(true);
    }
  }, []);

  const handleShareSelect = (e) => {
    setIsFilterVisible(e.target.value === 'selected team' ? true : false);
    setVisibilityAll(
      e.target.value === fullVisibility ? fullVisibility : 'selected team'
    );
    if (e.target.value === fullVisibility) {
      setTeamId();
      setTeamGroupId();
    }
    setRadioButtonSelected(true);
    onRadioButtonChange(e.target.value);
  };
  const handleFilterChange = (
    teamId,
    collaborator,
    year,
    start,
    end,
    type,
    teamGroupId
  ) => {
    if (teamId) {
      setTeamId(teamId);
    } else if (teamGroupId) {
      setTeamGroupId(teamGroupId);
    }
    setFilterSelected(true);
  };

  const handleChangeTeamGroupAndTeem = (team, teamGroup) => {
    setSelectedTeam(team);

    setSelectedTeamGroup(teamGroup);

    setTeamGroupId(teamGroup?.id);
  };

  const handleOpenOptions = () => {
    setVisibleOptions(!visibleOptions);
  };

  const handleValidate = () => {
    const selectedDataTeamGroup = selectedTeamGroup;
    const selectedDataTeam = selectedTeam;

    const isFullVisibilitySelected = visibilityAll === fullVisibility;

    if (isFullVisibilitySelected) {
      onSubmitTeamAndTeamGroup(
        selectedDataTeamGroup,
        selectedDataTeam,
        teamId,
        teamGroupId,
        isFullVisibilitySelected ? true : false,
        role
      );
    } else {
      onSubmitTeamAndTeamGroup(
        selectedDataTeamGroup,
        selectedDataTeam,
        teamId,
        teamGroupId,
        isFullVisibilitySelected,
        role
      );
    }

    updateVisibility(false);
  };

  const handleBackButtonClick = () => {
    updateVisibility(false);
  };

  return (
    <>
      <Grid container style={{ display: 'flex', flexDirection: 'column' }}>
        <Grid item>
          <DefaultTitle
            lowercase
            style={{
              color: 'rgb(15,111,222)',
              cursor: 'pointer',
              marginBottom: 10,
            }}
            onClick={handleBackButtonClick}
          >
            <Grid container alignItems='center'>
              <Grid item>
                <ChevronLeftRoundedIcon
                  style={{
                    fontSize: 30,
                    marginBottom: -3,
                  }}
                />
              </Grid>
              <Grid item>
                {intl.formatMessage({
                  id: 'challenge.kpi_results.back_button',
                })}
              </Grid>
            </Grid>
          </DefaultTitle>
        </Grid>
        <Grid item>
          <FormControl style={{ width: '100%' }}>
            <DefaultTitle lowercase style={{ marginBottom: 10 }}>
              {intl.formatMessage({
                id: 'newsfeed.who_can_see_your_post',
              })}
            </DefaultTitle>

            <RadioGroup
              aria-labelledby='demo-radio-buttons-group-label'
              defaultValue={
                visibilityAll === fullVisibility
                  ? fullVisibility
                  : 'selected team'
              }
              name='radio-buttons-group'
              onChange={(e) => handleShareSelect(e)}
            >
              <FormControlLabel
                style={{
                  justifyContent: 'space-between',
                  textTransform: 'none',
                }}
                value={fullVisibility}
                control={<GreenRadio />}
                label={fullVisibility}
                labelPlacement='start'
              />
              <FormControlLabel
                style={{
                  justifyContent: 'space-between',
                  textTransform: 'none',
                }}
                value='selected team'
                control={<GreenRadio />}
                label={intl.formatMessage({
                  id: 'common.selection',
                })}
                labelPlacement='start'
              />
            </RadioGroup>
          </FormControl>
        </Grid>

        {isFilterVisible && (
          <Grid container style={{ minHeight: 150 }}>
            <Grid item style={{ position: 'relative' }}>
              <ChallengeCollaboratorFilter
                open={false}
                team={teamId}
                teamGroup={teamGroupId}
                onClose={() => {}}
                onChange={handleFilterChange}
                onChangeTeamGroupAndTeem={handleChangeTeamGroupAndTeem}
                disableCollaborators
                dropdownWidth={isMobile ? '70vw' : '30vw'}
                buttonText={intl.formatMessage({
                  id: 'newsfeed.share_button',
                })}
              />
              {roles &&
                (teamId || teamGroupId) &&
                ['C', 'M'].indexOf(_.get(account, 'role.code')) < 0 && (
                  <Grid
                    item
                    style={{
                      position: 'absolute',
                      top: -18,
                      left: 155,
                      width: 200,
                      zIndex: 100,
                    }}
                  >
                    <Formsy onValidSubmit={() => {}}>
                      <Select
                        name='role'
                        options={roles
                          .filter((r) => r.code !== 'A')
                          .map((role) => ({
                            id: role.id,
                            name: intl.formatMessage({
                              id: `roles.${role.code}`,
                            }),
                          }))}
                        optionValueName='id'
                        optionTextName='name'
                        initial={role}
                        updateInitial
                        onChange={setRole}
                        onClick={handleOpenOptions}
                        emptyText={intl.formatMessage({
                          id: 'newsfeed.all_roles',
                        })}
                      />
                    </Formsy>
                  </Grid>
                )}
            </Grid>

            {isCollaborator && (
              <Chip
                size='small'
                label={
                  isCollaborator
                    ? intl.formatMessage({
                        id: 'filter.my_team_label',
                      })
                    : selectedTeam?.name
                }
                style={{
                  marginLeft: 10,
                  borderColor: isCollaborator
                    ? account.team.color.hex
                    : _.get(selectedTeam, 'color.hex'),
                }}
                variant='outlined'
                className={classes.filterChip}
              />
            )}
          </Grid>
        )}
        <Grid item style={{ display: 'flex', justifyContent: 'center' }}>
          <ProgressButton
            type='submit'
            text={intl.formatMessage({
              id: 'common.submit',
            })}
            onClick={handleValidate}
            disabled={
              visibilityAll !== fullVisibility &&
              (((isCollaborator || isManager) && !radioButtonSelected) ||
                ((isAdministrator || isSuperManager) && !filterSelected))
            }
          />
        </Grid>
      </Grid>
    </>
  );
};

const mapStateToProps = ({ accountDetail, roleList }) => ({
  accountDetail,
  roleList,
});

const mapDispatchToProps = (dispatch) => ({
  roleListActions: bindActionCreators(roleListActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withWidth()(PostFormDialogParams)));
