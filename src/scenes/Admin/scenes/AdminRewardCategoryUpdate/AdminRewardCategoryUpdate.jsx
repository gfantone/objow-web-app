import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Formsy from "formsy-react";
import {Grid} from "@material-ui/core";
import {RewardCategoryIconInput} from "../../components";
import {AppBarSubTitle, Card, Loader, MainLayoutComponent, ProgressButton, TextField} from '../../../../components'
import * as Resources from '../../../../Resources'
import * as rewardCategoryActions from '../../../../services/RewardCategories/RewardCategory/actions'
import * as rewardCategoryIconListActions from '../../../../services/RewardCategoryIcons/RewardCategoryIconList/actions'
import * as rewardCategoryUpdateActions from '../../../../services/RewardCategories/RewardCategoryUpdate/actions'

class AdminRewardCategoryUpdate extends MainLayoutComponent {
    componentDidMount() {
        const id = this.props.match.params.id
        this.props.handleTitle(Resources.ADMIN_TITLE)
        this.props.handleSubHeader(<AppBarSubTitle title={Resources.ADMIN_REWARD_CATEGORY_UPDATE_SUBTITLE} />)
        this.props.handleMaxWidth('sm');
        this.props.activateReturn();
        this.props.rewardCategoryActions.getRewardCategory(id)
        this.props.rewardCategoryIconListActions.getUsableRewardCategoryIconListForRewardCategory(id)
    }

    renderLoader() {
        return <Loader centered />
    }

    handleSubmit(model) {
        const category = {id: this.props.match.params.id, name: model.name, icon: model.icon};
        this.props.rewardCategoryUpdateActions.updateRewardCategory(category)
    }

    renderForm() {
        const {category} = this.props.rewardCategory;
        const {icons} = this.props.rewardCategoryIconList;
        const {loading} = this.props.rewardCategoryUpdate;

        return (
            <Formsy onValidSubmit={this.handleSubmit.bind(this)}>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Card>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField name='name' label={Resources.ADMIN_REWARD_CATEGORY_UPDATE_NAME_LABEL} initial={category.name} fullWidth required
                                               validations='maxLength:128'
                                               validationErrors={{
                                                   isDefaultRequiredValue: Resources.COMMON_REQUIRED_ERROR,
                                                   maxLength: Resources.COMMON_MAX_LENGTH_128_ERROR
                                               }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <RewardCategoryIconInput name='icon' label={Resources.ADMIN_REWARD_CATEGORY_UPDATE_ICON_LABEL} initial={category.icon ? category.icon.id : null} icons={icons} required
                                                             validationErrors={{
                                                                 isDefaultRequiredValue: Resources.COMMON_REQUIRED_ERROR,
                                                             }}
                                    />
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <ProgressButton type='submit' text={Resources.ADMIN_REWARD_CATEGORY_UPDATE_SUBMIT_BUTTON} centered loading={loading} />
                    </Grid>
                </Grid>
            </Formsy>
        )
    }

    render() {
        const {category, loading: rewardCategoryLoading} = this.props.rewardCategory;
        const {icons, loading: rewardCategoryIconListLoading} = this.props.rewardCategoryIconList;
        const {success} = this.props.rewardCategoryUpdate;
        const loading = rewardCategoryLoading || rewardCategoryIconListLoading

        if (success) {
            this.props.rewardCategoryUpdateActions.clearRewardCategoryUpdate();
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

const mapStateToProps = ({rewardCategory, rewardCategoryIconList, rewardCategoryUpdate}) => ({
    rewardCategory,
    rewardCategoryIconList,
    rewardCategoryUpdate
})

const mapDispatchToProps = (dispatch) => ({
    rewardCategoryActions: bindActionCreators(rewardCategoryActions, dispatch),
    rewardCategoryIconListActions: bindActionCreators(rewardCategoryIconListActions, dispatch),
    rewardCategoryUpdateActions: bindActionCreators(rewardCategoryUpdateActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminRewardCategoryUpdate)
