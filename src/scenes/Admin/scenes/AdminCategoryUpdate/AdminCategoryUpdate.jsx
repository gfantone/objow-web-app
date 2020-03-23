import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Formsy from 'formsy-react'
import {Grid} from '@material-ui/core'
import {CategoryIconInput} from '../../components'
import {AppBarSubTitle, Card, Loader, ProgressButton, TextField} from '../../../../components'
import * as categoryDetailActions from '../../../../services/Categories/CategoryDetail/actions'
import * as categoryIconListActions from "../../../../services/CategoryIcons/CategoryIconList/actions";

var initialized = false;

const AdminCategoryUpdate = ({...props}) => {
    const {category, loading: categoryDetailLoading} = props.categoryDetail;
    const {icons, loading: categoryIconListLoading} = props.categoryIconList;
    const loading = categoryDetailLoading || categoryIconListLoading;

    const init = () => {
        if (!initialized) {
            initialized = true;
            props.handleTitle('Administration');
            props.handleSubHeader(<AppBarSubTitle title="Modification d'une catégorie" />);
            props.handleMaxWidth('sm');
            props.activateReturn();
            props.categoryDetailActions.getCategoryDetail(props.match.params.id);
            props.categoryIconListActions.getUnusedCategoryIconList()
        }
    };

    useEffect(() => {
        init()
    });

    const renderLoader = () => {
        return <Loader centered />
    };

    const renderForm = () => {
        return (
            <Formsy>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Card>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField name='name' label='Nom' initial={category.name} fullWidth />
                                </Grid>
                                <Grid item xs={12}>
                                    {category.icon.id}
                                    <CategoryIconInput name='icon' label='Icône' icons={icons} initial={category.icon.id} />
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <ProgressButton text='Valider' centered />
                    </Grid>
                </Grid>
            </Formsy>
        )
    };

    return (
        <div>
            {loading && renderLoader()}
            {!loading && renderForm()}
        </div>
    )
};

const mapStateToProps = ({categoryDetail, categoryIconList}) => ({
    categoryDetail,
    categoryIconList
});

const mapDispatchToProps = (dispatch) => ({
    categoryDetailActions: bindActionCreators(categoryDetailActions, dispatch),
    categoryIconListActions: bindActionCreators(categoryIconListActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminCategoryUpdate)
