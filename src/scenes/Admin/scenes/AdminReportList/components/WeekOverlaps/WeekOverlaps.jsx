import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import Formsy from 'formsy-react';
import { bindActionCreators } from 'redux';
import {
  Loader,
  DataTable,
  MonthPicker,
  WeekPicker,
  Button,
  ProgressButton,
  IconButton,
} from '../../../../../../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { injectIntl } from 'react-intl';
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import * as weekOverlapListActions from '../../../../../../services/WeekOverlaps/WeekOverlapList/actions';
import * as weekOverlapCreationActions from '../../../../../../services/WeekOverlaps/WeekOverlapCreation/actions';
import * as weekOverlapDeleteActions from '../../../../../../services/WeekOverlaps/WeekOverlapDelete/actions';
import _ from 'lodash';
import { toast } from 'react-toastify';

class WeekOverlaps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
    };
  }

  componentDidMount() {
    this.props.weekOverlapListActions.getWeekOverlapList();
  }

  createOverlap = (model) => {
    const { start, end } = model.week ? model.week : {};
    const month = new Date(model.month.setDate(1));

    this.props.weekOverlapCreationActions.createWeekOverlap({
      start,
      end,
      month,
    });
  };

  componentDidUpdate() {
    const { success } = this.props.weekOverlapCreation;
    const { success: deleteSuccess } = this.props.weekOverlapDelete;
    if (success && this.state.page === 1) {
      this.setState({
        ...this.state,
        page: 0,
      });
      toast.success('La configuration de la semaine a été créée avec succès');
      this.props.weekOverlapCreationActions.clearWeekOverlapCreation();
      this.props.weekOverlapListActions.getWeekOverlapList();
    }
    if (deleteSuccess) {
      toast.success(
        'La configuration de la semaine a été supprimée avec succès',
      );
      this.props.weekOverlapDeleteActions.clearWeekOverlapDelete();
      this.props.weekOverlapListActions.getWeekOverlapList();
    }
  }

  renderData() {
    const { overlaps } = this.props.weekOverlapList;
    const { intl } = this.props;
    const columns = [
      {
        name: 'start',
        label: 'Semaine',
        options: {
          customBodyRender: (value) => {
            // get week number from date
            const currentDate = new Date(value * 1000);
            const startDate = new Date(currentDate.getFullYear(), 0, 1);
            var days = Math.floor(
              (currentDate - startDate) / (24 * 60 * 60 * 1000),
            );

            var weekNumber = Math.ceil(days / 7);

            return (
              <div>
                <span>
                  Semaine {weekNumber} {currentDate.getFullYear()}
                </span>
              </div>
            );
          },
        },
      },
      {
        name: 'month',
        label: 'Mois',
        options: {
          customBodyRender: (value) => {
            // get week number from date
            const currentDate = new Date(value * 1000);

            return (
              <div>
                <span>
                  {_.capitalize(
                    currentDate.toLocaleString('default', { month: 'long' }),
                  )}{' '}
                  {currentDate.getFullYear()}
                </span>
              </div>
            );
          },
        },
      },
      {
        name: 'id',
        label: 'Actions',
        options: {
          customBodyRender: (value) => {
            return (
              <Grid container justifyContent="flex-start">
                <Grid item>
                  <IconButton
                    style={{ color: '#555555' }}
                    size="small"
                    onClick={() =>
                      this.props.weekOverlapDeleteActions.deleteWeekOverlap(
                        value,
                      )
                    }
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </IconButton>
                </Grid>
              </Grid>
            );
          },
        },
      },
    ];
    const options = {
      selectableRows: false,
    };
    return (
      <div>
        {this.state.page === 0 && (
          <React.Fragment>
            <Grid container spacing={1} justify="flex-end">
              <Grid item>
                <Button
                  onClick={() => this.setState({ page: 1 })}
                  text="nouveau"
                >
                  <FontAwesomeIcon icon={faPlus} style={{ marginRight: 5 }} />
                  Ajouter une semaine
                </Button>
              </Grid>

              <Grid item xs={12}>
                <DataTable
                  data={overlaps}
                  columns={columns}
                  options={options}
                />
              </Grid>
            </Grid>
          </React.Fragment>
        )}
        {this.state.page === 1 && (
          <div>
            <Formsy onValidSubmit={this.createOverlap}>
              <Grid container spacing={2} justify="flex-end">
                <Grid item xs={12} sm={6}>
                  <WeekPicker
                    name="week"
                    label="Semaine"
                    initial={new Date()}
                    weekSelector
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <MonthPicker
                    name="month"
                    label="Mois"
                    style={{ width: '100%' }}
                  />
                </Grid>

                <Grid item>
                  <ProgressButton
                    type="submit"
                    text={intl.formatMessage({ id: 'common.submit' })}
                  />
                </Grid>
              </Grid>
            </Formsy>
          </div>
        )}
      </div>
    );
  }

  render() {
    const { overlaps, loading } = this.props.weekOverlapList;
    return (
      <div>
        {loading && <Loader centered />}
        {!loading && this.renderData()}
      </div>
    );
  }
}

const mapStateToProps = ({
  weekOverlapList,
  weekOverlapCreation,
  weekOverlapDelete,
}) => ({
  weekOverlapList,
  weekOverlapCreation,
  weekOverlapDelete,
});

const mapDispatchToProps = (dispatch) => ({
  weekOverlapListActions: bindActionCreators(weekOverlapListActions, dispatch),
  weekOverlapCreationActions: bindActionCreators(
    weekOverlapCreationActions,
    dispatch,
  ),
  weekOverlapDeleteActions: bindActionCreators(
    weekOverlapDeleteActions,
    dispatch,
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(WeekOverlaps));
