import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Formsy from 'formsy-react'
import {Grid} from '@material-ui/core'
import {CategoryIconInput} from '../../components'
import {AppBarSubTitle, Card, Loader, ProgressButton, TextField} from '../../../../components'
import * as categoryCreationActions from '../../../../services/Categories/CategoryCreation/actions'
import * as categoryIconListActions from "../../../../services/CategoryIcons/CategoryIconList/actions";

class AdminCategoryCreation extends Component {
    componentDidMount() {
        this.props.handleTitle('Administration');
        this.props.handleSubHeader(<AppBarSubTitle title="Création d'une catégorie" />);
        this.props.handleMaxWidth('sm');
        this.props.activateReturn();
        this.props.categoryCreationActions.clearCategoryCreation();
        this.props.categoryIconListActions.getUsableList()
    }

    renderLoader() {
        return <Loader centered />
    };

    onSubmit(model) {
        const category = {id: this.props.match.params.id, name: model.name, icon: model.icon};
        this.props.categoryCreationActions.createCategory(category)
    };

    renderForm() {
        const {icons} = this.props.categoryIconList;
        const {loading} = this.props.categoryCreation;

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
        const {icons, loading} = this.props.categoryIconList;
        const {success} = this.props.categoryCreation;

        if (success) {
            this.props.categoryCreationActions.clearCategoryCreation();
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

const mapStateToProps = ({categoryCreation, categoryIconList}) => ({
    categoryCreation,
    categoryIconList
});

const mapDispatchToProps = (dispatch) => ({
    categoryCreationActions: bindActionCreators(categoryCreationActions, dispatch),
    categoryIconListActions: bindActionCreators(categoryIconListActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminCategoryCreation)
