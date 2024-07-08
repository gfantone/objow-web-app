import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Formsy from 'formsy-react';
import { Grid } from '@material-ui/core';
import _ from 'lodash';
import { CategoryIconInput } from '../../components';
import {
  AppBarSubTitle,
  Card,
  Loader,
  ProgressButton,
  TextField,
} from '../../../../components';
import * as levelListActions from '../../../../services/Levels/LevelList/actions';
import * as levelCreationActions from '../../../../services/Levels/LevelListCreation/actions';
import * as levelIconListActions from '../../../../services/LevelIcons/LevelIconList/actions';
import { injectIntl } from 'react-intl';
import { toast } from 'react-toastify';

class AdminLevelCreation extends Component {
  componentDidMount() {
    const { levels } = this.props.levelList;
    const levelNumber = levels.length + 1;

    this.props.handleTitle('Administration');
    this.props.handleSubHeader(
      <AppBarSubTitle title={`Création du level ${levelNumber}`} />,
    );
    this.props.handleMaxWidth('sm');
    this.props.activateReturn();
    this.props.levelCreationActions.clearLevelListCreation();
    this.props.levelIconListActions.getUsableList();
  }

  renderLoader() {
    return <Loader centered />;
  }

  onSubmit(model) {
    const periodId = this.props.match.params.periodId;
    const { levels } = this.props.levelList;
    const level = {
      id: this.props.match.params.id,
      title: model.title,
      citation: model.citation,
      icon: model.icon,
      points: model.points,
      period: periodId,
    };

    this.props.levelCreationActions.createLevelList([
      ...levels.map((item) => {
        return Object.assign(item, { icon: _.get(item, 'icon.id') });
      }),
      level,
    ]);
  }

  renderForm() {
    const { intl } = this.props;
    const { icons } = this.props.levelIconList;
    const { loading } = this.props.levelListCreation;
    const { levels } = this.props.levelList;
    const minimumPoints = _.max(levels.map((level) => level.points));

    return (
      <Formsy onValidSubmit={this.onSubmit.bind(this)}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Card>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField name="title" label="Nom" fullWidth />
                </Grid>
                <Grid item xs={12}>
                  <TextField name="citation" label="Citation" fullWidth />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="points"
                    label={`Points à atteindre (minimum ${minimumPoints})`}
                    fullWidth
                    validations={{ isMoreThan: minimumPoints }}
                    validationErrors={{
                      isMoreThan: `Le nombre de points doit être supérieur au niveau précédent : ${minimumPoints}`,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CategoryIconInput
                    name="icon"
                    label="Icône"
                    icons={[icons]}
                  />
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <ProgressButton
              type="submit"
              text={intl.formatMessage({ id: 'common.submit' })}
              centered
              loading={loading}
            />
          </Grid>
        </Grid>
      </Formsy>
    );
  }

  render() {
    const { intl } = this.props;
    const { icons, loading } = this.props.levelIconList;
    const { success } = this.props.levelListCreation;

    if (success) {
      this.props.levelCreationActions.clearLevelListCreation();
      toast.success(
        intl.formatMessage({ id: 'common.create_success_message' }),
      );
      this.props.history.goBack();
    }

    return (
      <div>
        {loading && this.renderLoader()}
        {!loading && icons && this.renderForm()}
      </div>
    );
  }
}

const mapStateToProps = ({ levelListCreation, levelIconList, levelList }) => ({
  levelListCreation,
  levelList,
  levelIconList,
});

const mapDispatchToProps = (dispatch) => ({
  levelCreationActions: bindActionCreators(levelCreationActions, dispatch),
  levelIconListActions: bindActionCreators(levelIconListActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(AdminLevelCreation));
