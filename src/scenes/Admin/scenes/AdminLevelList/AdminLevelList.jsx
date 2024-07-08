import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as levelListActions from '../../../../services/Levels/LevelList/actions';

import * as configListActions from '../../../../services/Configs/ConfigList/actions';
import { SubHeader } from './components';
import {
  DataTable,
  IconButton,
  Loader,
  AppBarSubTitle,
} from '../../../../components';
import { CardMedia } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { injectIntl } from 'react-intl';

const styles = {
  icon: {
    height: 34,
    width: 34,
  },
};

class AdminLevelList extends Component {
  onAdd() {
    const periodId = this.props.match.params.periodId;

    this.props.history.push(`/admin/periods/${periodId}/levels/creation`);
  }

  loadData() {
    this.props.levelListActions.getLevelList();
  }

  componentDidMount() {
    const periodId = this.props.match.params.periodId;
    this.props.activateReturn();
    this.props.handleTitle('Administration');
    this.props.handleSubHeader(
      <AppBarSubTitle title='Configuration des levels' />
    );
    this.props.handleButtons(
      <IconButton size='small' onClick={this.onAdd.bind(this)}>
        <FontAwesomeIcon icon={faPlus} />
      </IconButton>
    );
    this.props.levelListActions.getLevelList(periodId);
    this.props.configListActions.getConfigList(periodId);
  }

  renderLoader() {
    return <Loader centered />;
  }

  renderData() {
    const { classes, intl } = this.props;
    const { levels } = this.props.levelList;
    const periodId = this.props.match.params.periodId;

    const columns = [
      { name: 'id', options: { display: false, filter: false } },
      {
        name: 'number',
        label: intl.formatMessage({ id: 'levels.columns.level' }),
        options: {
          customBodyRender: (value) => {
            return `${intl.formatMessage({
              id: 'levels.columns.level',
            })} ${value}`;
          },
        },
      },
      {
        name: 'title',
        label: intl.formatMessage({ id: 'levels.columns.name' }),
      },
      {
        name: 'citation',
        label: intl.formatMessage({ id: 'levels.columns.citation' }),
      },
      {
        name: 'icon',
        label: intl.formatMessage({ id: 'levels.columns.icon' }),
        options: {
          customBodyRender: (value) => {
            return (
              <CardMedia
                image={value ? value.path : ''}
                className={classes.icon}
              />
            );
          },
          filter: false,
        },
      },
      {
        name: 'players',
        label: intl.formatMessage({ id: 'levels.columns.percent' }),
        options: {
          customBodyRender: (value) => {
            return value.toPercentage();
          },
        },
      },
      {
        name: 'points',
        label: intl.formatMessage({ id: 'levels.columns.points' }),
      },
    ];
    const options = {
      selectableRows: 'none',
      onRowClick: (colData, cellMeta) => {
        this.props.history.push(
          `/admin/periods/${periodId}/levels/modification/${colData[0]}`
        );
      },
    };
    return <DataTable data={levels} columns={columns} options={options} />;
  }

  render() {
    const { levels, loading } = this.props.levelList;
    return (
      <div>
        {loading && this.renderLoader()}
        {!loading && levels && this.renderData()}
      </div>
    );
  }
}

const mapStateToProps = ({ configList, levelList, levelListCreation }) => ({
  configList,
  levelList,
});

const mapDispatchToProps = (dispatch) => ({
  configListActions: bindActionCreators(configListActions, dispatch),
  levelListActions: bindActionCreators(levelListActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(injectIntl(AdminLevelList)));
