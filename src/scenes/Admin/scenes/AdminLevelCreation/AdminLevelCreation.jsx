import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Formsy from 'formsy-react'
import {Grid} from '@material-ui/core'
import {CategoryIconInput} from '../../components'
import {AppBarSubTitle, Card, Loader, ProgressButton, TextField} from '../../../../components'
import * as levelCreationActions from '../../../../services/Levels/LevelListCreation/actions'
import * as levelIconListActions from "../../../../services/LevelIcons/LevelIconList/actions";

class AdminLevelCreation extends Component {
    componentDidMount() {
        this.props.handleTitle('Administration');
        this.props.handleSubHeader(<AppBarSubTitle title="Création d'une catégorie" />);
        this.props.handleMaxWidth('sm');
        this.props.activateReturn();
        this.props.levelCreationActions.clearLevelListCreation();
        this.props.levelIconListActions.getUsableList()
    }

    renderLoader() {
        return <Loader centered />
    };

    onSubmit(model) {
        const level = {id: this.props.match.params.id, name: model.name, icon: model.icon};
        this.props.levelCreationActions.createLevel(level)
    };

    renderForm() {
        const {icons} = this.props.levelIconList;
        const {loading} = this.props.levelListCreation;

        return (
            <Formsy onValidSubmit={this.onSubmit.bind(this)}>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Card>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField name='name' label='Nom' fullWidth required />
                                </Grid>
                                <Grid item xs={12}>
                                    <CategoryIconInput name='icon' label='Icône' icons={icons} required />
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <ProgressButton type='submit' text='Valider' centered loading={loading} />
                    </Grid>
                </Grid>
            </Formsy>
        )
    };

    render() {
        const {icons, loading} = this.props.levelIconList;
        const {success} = this.props.levelListCreation;

        if (success) {
            this.props.levelCreationActions.clearLevelListCreation();
            this.props.history.goBack();
        }

        return (
            <div>
                {loading && this.renderLoader()}
                {!loading && icons && this.renderForm()}
            </div>
        )
    }
}

const mapStateToProps = ({levelListCreation, levelIconList}) => ({
    levelListCreation,
    levelIconList
});

const mapDispatchToProps = (dispatch) => ({
    levelCreationActions: bindActionCreators(levelCreationActions, dispatch),
    levelIconListActions: bindActionCreators(levelIconListActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminLevelCreation)
