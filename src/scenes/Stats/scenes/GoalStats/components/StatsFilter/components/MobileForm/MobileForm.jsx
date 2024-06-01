import React from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import Formsy from 'formsy-react';
import { Select } from '../../../../../../../../components';
import * as Resources from '../../../../../../../../Resources';
import { useIntl } from 'react-intl';

const MobileForm = ({
  categories,
  category,
  categoryLoading,
  collaborator,
  collaborators,
  definition,
  definitionDisabled,
  definitions,
  period,
  periods,
  team,
  teams,
  onCategoryChange,
  onCollaboratorChange,
  onDefinitionChange,
  onPeriodChange,
  onTeamChange,
  ...props
}) => {
  const intl = useIntl();
  const { account } = props.accountDetail;

  return (
    <Formsy>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Select
            disabled={categoryLoading}
            emptyDisabled
            fullWidth
            initial={category}
            label={intl.formatMessage({ id: 'filter.category_label' })}
            name="category"
            options={categories}
            optionValueName="categoryId"
            optionTextName="name"
            updateInitial
            onChange={onCategoryChange}
          />
        </Grid>
        {(account.role.code === 'A' || account.role.code === 'S') && (
          <Grid item xs={12}>
            <Select
              emptyDisabled
              fullWidth
              initial={team}
              label={intl.formatMessage({ id: 'filter.team_label' })}
              name="team"
              options={teams}
              optionValueName="id"
              optionTextName="name"
              updateInitial
              onChange={onTeamChange}
            />
          </Grid>
        )}
        {account.role.code !== 'C' && (
          <Grid item xs={12}>
            <Select
              emptyText={intl.formatMessage({
                id: 'filter.collaborator_all_option',
              })}
              fullWidth
              initial={collaborator}
              label={intl.formatMessage({ id: 'filter.collaborator_label' })}
              name="collaborator"
              options={collaborators}
              optionValueName="id"
              optionTextName="fullname"
              updateInitial
              onChange={onCollaboratorChange}
            />
          </Grid>
        )}
        <Grid item xs={12}>
          <Select
            disabled={definitionDisabled}
            fullWidth
            initial={definition}
            label={intl.formatMessage({ id: 'filter.goal_label' })}
            name="definition"
            options={definitions}
            optionValueName="id"
            optionTextName="name"
            updateInitial
            onChange={onDefinitionChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Select
            emptyDisabled
            fullWidth
            initial={period}
            label={intl.formatMessage({ id: 'filter.period_label' })}
            name="period"
            options={periods}
            optionValueName="id"
            optionTextName="name"
            updateInitial
            onChange={onPeriodChange}
          />
        </Grid>
      </Grid>
    </Formsy>
  );
};

const mapStateToProps = ({ accountDetail }) => ({
  accountDetail,
});

export default connect(mapStateToProps)(MobileForm);
