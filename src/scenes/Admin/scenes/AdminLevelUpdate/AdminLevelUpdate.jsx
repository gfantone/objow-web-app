import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Formsy from 'formsy-react'
import {Grid} from '@material-ui/core'
import _ from 'lodash';
import {CategoryIconInput} from '../../components'
import {AppBarSubTitle, Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, Loader, ProgressButton, TextField} from '../../../../components'
import * as levelListActions from '../../../../services/Levels/LevelList/actions'
import * as levelCreationActions from '../../../../services/Levels/LevelListCreation/actions'
import * as levelIconListActions from "../../../../services/LevelIcons/LevelIconList/actions";

class AdminLevelUpdate extends Component {
    state = {open: false};

    componentDidMount() {
        const periodId = this.props.match.params.periodId;
        const id = this.props.match.params.id;
        this.props.handleTitle('Administration');
        this.props.handleSubHeader(<AppBarSubTitle title={`Modification d'un level`} />);
        this.props.handleMaxWidth('sm');
        this.props.activateReturn();
        this.props.levelCreationActions.clearLevelListCreation();
        this.props.levelListActions.getLevelList(periodId);
        this.props.levelIconListActions.getUsableList(id);
    }

    renderLoader() {
        return <Loader centered />
    };

    onSubmit(model) {
        const isUpdatable = !model.players;
        if(!isUpdatable) {
          return
        }
        const {levels} = this.props.levelList
        const level = {
          id: parseInt(this.props.match.params.id),
          title: model.title,
          icon: model.icon,
          points: model.points,
        };

        this.props.levelCreationActions.createLevelList(
          levels.map(item => item.id === parseInt(level.id) ? Object.assign({}, item, level) : Object.assign({}, item, {icon: _.get(item, 'icon.id')}))
        )
    };
    setOpen(open) {
        const {levels, loading: levelListLoading} = this.props.levelList
        if (!levelListLoading) {
            this.setState({
                ...this.state,
                open: open
            })
        }
    }
    onDelete() {
      const id = this.props.match.params.id;
      const {levels} = this.props.levelList
      const level = levels && levels.find(item => item.id === parseInt(id));
      const isUpdatable = level.players === 0;

      if(!isUpdatable) {
        return;
      }

      this.props.levelCreationActions.createLevelList(
        levels.filter(item => item.id !== parseInt(id)).map(item => {
          return Object.assign({}, item, {
            icon: _.get(item, 'icon.id')
          })
        })
      )
    }
    renderForm() {
        const id = this.props.match.params.id;
        const {levels, loading: levelListLoading} = this.props.levelList
        const level = levels && levels.find(item => item.id === parseInt(id));
        const isUpdatable = level.players === 0;

        const {icons} = this.props.levelIconList;

        return (
            <div>
                <Formsy onValidSubmit={this.onSubmit.bind(this)}>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Card>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField name='title' label='Nom' initial={level.title} fullWidth />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField name='points' label='Points à atteindre' initial={level.points} fullWidth />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <CategoryIconInput name='icon' label='Icône' icons={[icons]} initial={_.get(level, 'icon.id')}/>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                        <Grid item xs={12}>
                          <Grid container justify='space-between'>
                              <Grid item>
                                  <ProgressButton type='button' text='Supprimer' color='secondary' centered loading={levelListLoading} onClick={() => this.setOpen(true)} disabled={!isUpdatable} />
                              </Grid>
                              <Grid item>
                                  <ProgressButton type='submit' text='Valider' centered loading={levelListLoading} disabled={!isUpdatable}/>
                              </Grid>
                          </Grid>
                        </Grid>
                    </Grid>
                </Formsy>
                <Dialog open={this.state.open} onClose={() => this.setOpen(false)}>
                    <DialogTitle>Êtes-vous sûr de vouloir supprimer ce level ?</DialogTitle>
                    <DialogActions>
                        <Button onClick={() => this.setOpen(false)} color='secondary'>Non</Button>
                        <ProgressButton type='button' text='Oui' loading={levelListLoading} onClick={this.onDelete.bind(this)}/>
                    </DialogActions>
                </Dialog>
            </div>
        )
    };

    render() {
        const id = this.props.match.params.id;
        const {levels, loading: levelListLoading} = this.props.levelList
        const level = levels && levels.find(item => item.id === parseInt(id));
        const {icons, loading: levelIconListLoading} = this.props.levelIconList;
        const loading = levelListLoading || levelIconListLoading;

        const {success} = this.props.levelListCreation;

        if (success) {
            this.props.levelCreationActions.clearLevelListCreation();
            this.props.history.goBack();
        }

        return (
            <div>
                {loading && this.renderLoader()}
                {!loading && level && icons && this.renderForm()}
            </div>
        )
    }
}

const mapStateToProps = ({levelListCreation, levelList, levelIconList}) => ({
    levelList,
    levelListCreation,
    levelIconList
});

const mapDispatchToProps = (dispatch) => ({
    levelCreationActions: bindActionCreators(levelCreationActions, dispatch),
    levelListActions: bindActionCreators(levelListActions, dispatch),
    levelIconListActions: bindActionCreators(levelIconListActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminLevelUpdate)
