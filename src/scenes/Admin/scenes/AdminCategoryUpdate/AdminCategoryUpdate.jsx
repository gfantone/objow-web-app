import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Formsy from 'formsy-react'
import {Grid} from '@material-ui/core'
import {CategoryIconInput} from '../../components'
import {AppBarSubTitle, Card, Loader, ProgressButton, TextField} from '../../../../components'
import * as categoryDetailActions from '../../../../services/Categories/CategoryDetail/actions'
import * as categoryUpdateActions from '../../../../services/Categories/CategoryUpdate/actions'
import * as categoryIconListActions from "../../../../services/CategoryIcons/CategoryIconList/actions";

class AdminCategoryUpdate extends Component {
    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.handleTitle('Administration');
        this.props.handleSubHeader(<AppBarSubTitle title="Modification d'une catégorie" />);
        this.props.handleMaxWidth('sm');
        this.props.activateReturn();
        this.props.categoryUpdateActions.clearCategoryUpdate();
        this.props.categoryDetailActions.getCategoryDetail(id);
        this.props.categoryIconListActions.getUsableListForCategory(id)
    }

    renderLoader() {
        return <Loader centered />
    };

    onSubmit(model) {
        const category = {id: this.props.match.params.id, name: model.name, icon: model.icon};
        this.props.categoryUpdateActions.updateCategory(category)
    };

    renderForm() {
        const {category} = this.props.categoryDetail;
        const {icons} = this.props.categoryIconList;
        const {loading} = this.props.categoryUpdate;

        return (
            <Formsy onValidSubmit={this.onSubmit.bind(this)}>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Card>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField name='name' label='Nom' initial={category.name} fullWidth required />
                                </Grid>
                                <Grid item xs={12}>
                                    {category.icon.id}
                                    <CategoryIconInput name='icon' label='Icône' icons={icons} initial={category.icon.id} required />
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
        const {category, loading: categoryDetailLoading} = this.props.categoryDetail;
        const {icons, loading: categoryIconListLoading} = this.props.categoryIconList;
        const loading = categoryDetailLoading || categoryIconListLoading;
        const {success} = this.props.categoryUpdate;

        if (success) {
            this.props.categoryUpdateActions.clearCategoryUpdate();
            this.props.history.goBack();
        }

        return (
            <div>
                {loading && this.renderLoader()}
                {!loading && category && icons && this.renderForm()}
            </div>
        )
    }
}

const mapStateToProps = ({categoryDetail, categoryUpdate, categoryIconList}) => ({
    categoryDetail,
    categoryUpdate,
    categoryIconList
});

const mapDispatchToProps = (dispatch) => ({
    categoryDetailActions: bindActionCreators(categoryDetailActions, dispatch),
    categoryUpdateActions: bindActionCreators(categoryUpdateActions, dispatch),
    categoryIconListActions: bindActionCreators(categoryIconListActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminCategoryUpdate)
