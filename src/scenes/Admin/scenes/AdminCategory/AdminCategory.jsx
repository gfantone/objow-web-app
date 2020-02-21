import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Formsy from 'formsy-react'
import { Grid } from '@material-ui/core'
import { IconInput } from './components'
import { AppBarSubTitle, Card, Loader, MainLayoutComponent, ProgressButton, TextField } from '../../../../components'
import * as categoryCreationActions from '../../../../services/Categories/CategoryCreation/actions'
import * as categoryIconListActions from '../../../../services/CategoryIcons/CategoryIconList/actions'

class AdminCategory extends MainLayoutComponent {
    constructor(props) {
        super(props);
        this.props.categoryCreationActions.clearCategoryCreation()
    }

    componentDidMount() {
        this.props.activateReturn();
        this.props.handleTitle('Administration');
        this.props.handleSubHeader(<AppBarSubTitle title="Création d'une catégorie" />);
        this.props.handleMaxWidth('sm');
        this.props.categoryIconListActions.getCategoryIconList()
    }

    handleSubmit(model) {
        this.props.categoryCreationActions.createCategory(model)
    }

    renderLoader() {
        return <Loader centered />
    }

    renderData() {
        const { loading } = this.props.categoryCreation;
        const { icons } = this.props.categoryIconList;

        return (
            <Formsy onValidSubmit={this.handleSubmit.bind(this)}>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Card>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField name='name' label='Nom' fullWidth required
                                        validationErrors={{isDefaultRequiredValue: 'Ce champ est requis.'}}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <IconInput name='icon' label='Icône' icons={icons} required
                                        validationErrors={{isDefaultRequiredValue: 'Ce champ est requis.'}}
                                    />
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <ProgressButton text='Valider' loading={loading} centered />
                    </Grid>
                </Grid>
            </Formsy>
        )
    }

    render() {
        const { success } = this.props.categoryCreation;
        const { icons, loading } = this.props.categoryIconList;

        if (success) {
            this.props.categoryCreationActions.clearCategoryCreation();
            this.props.history.goBack()
        }

        return (
            <div>
                { loading && this.renderLoader() }
                { !loading && icons && this.renderData() }
            </div>
        )
    }
}

const mapStateToProps = ({ categoryCreation, categoryIconList }) => ({
    categoryCreation,
    categoryIconList
});

const mapDispatchToProps = (dispatch) => ({
    categoryCreationActions: bindActionCreators(categoryCreationActions, dispatch),
    categoryIconListActions: bindActionCreators(categoryIconListActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminCategory)