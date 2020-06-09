import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Formsy from "formsy-react";
import {Grid} from "@material-ui/core";
import {RewardCategoryIconInput} from "../../components";
import {AppBarSubTitle, Card, Loader, MainLayoutComponent, ProgressButton, TextField} from '../../../../components'
import * as Resources from '../../../../Resources'
import * as rewardCategoryCreationActions from '../../../../services/RewardCategories/RewardCategoryCreation/actions'
import * as rewardCategoryIconListActions from '../../../../services/RewardCategoryIcons/RewardCategoryIconList/actions'


class AdminRewardCategoryCreation extends MainLayoutComponent {
    componentDidMount() {
        this.props.handleTitle(Resources.ADMIN_TITLE)
        this.props.handleSubHeader(<AppBarSubTitle title={Resources.ADMIN_REWARD_CATEGORY_CREATION_SUBTITLE} />)
        this.props.handleMaxWidth('sm');
        this.props.activateReturn();
        this.props.rewardCategoryCreationActions.clearRewardCategoryCreation();
        this.props.rewardCategoryIconListActions.getUsableRewardCategoryIconList()
    }

    renderLoader() {
        return <Loader centered />
    };

    onSubmit(model) {
        const category = {name: model.name, icon: model.icon};
        this.props.rewardCategoryCreationActions.createRewardCategory(category)
    };

    renderForm() {
        const {icons} = this.props.rewardCategoryIconList;
        const {loading} = this.props.rewardCategoryCreation;

        return (
            <Formsy onValidSubmit={this.onSubmit.bind(this)}>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Card>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField name='name' label={Resources.ADMIN_REWARD_CATEGORY_CREATION_NAME_LABEL} fullWidth required
                                               validations='maxLength:128'
                                               validationErrors={{
                                                   isDefaultRequiredValue: Resources.COMMON_REQUIRED_ERROR,
                                                   maxLength: Resources.ADMIN_REWARD_CATEGORY_CREATION_NAME_LENGTH_ERROR
                                               }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <RewardCategoryIconInput name='icon' label={Resources.ADMIN_REWARD_CATEGORY_CREATION_ICON_LABEL} icons={icons} required
                                                             validationErrors={{
                                                                 isDefaultRequiredValue: Resources.COMMON_REQUIRED_ERROR,
                                                             }}
                                    />
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <ProgressButton type='submit' text={Resources.ADMIN_REWARD_CATEGORY_CREATION_SUBMIT_BUTTON} centered loading={loading} />
                    </Grid>
                </Grid>
            </Formsy>
        )
    };

    render() {
        const {icons, loading} = this.props.rewardCategoryIconList;
        const {success} = this.props.rewardCategoryCreation;

        if (success) {
            this.props.rewardCategoryCreationActions.clearRewardCategoryCreation();
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

const mapStateToProps = ({rewardCategoryCreation, rewardCategoryIconList}) => ({
    rewardCategoryCreation,
    rewardCategoryIconList
})

const mapDispatchToProps = (dispatch) => ({
    rewardCategoryCreationActions: bindActionCreators(rewardCategoryCreationActions, dispatch),
    rewardCategoryIconListActions: bindActionCreators(rewardCategoryIconListActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminRewardCategoryCreation)
