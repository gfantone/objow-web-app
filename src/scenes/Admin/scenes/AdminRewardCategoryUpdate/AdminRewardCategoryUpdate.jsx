import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Formsy from "formsy-react";
import {Grid} from "@material-ui/core";
import {RewardCategoryIconInput} from "../../components";
import {AppBarSubTitle, Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, Loader, MainLayoutComponent, ProgressButton, TextField} from '../../../../components'
import * as Resources from '../../../../Resources'
import * as rewardCategoryActions from '../../../../services/RewardCategories/RewardCategory/actions'
import * as rewardCategoryIconListActions from '../../../../services/RewardCategoryIcons/RewardCategoryIconList/actions'
import * as rewardCategoryUpdateActions from '../../../../services/RewardCategories/RewardCategoryUpdate/actions'

class AdminRewardCategoryUpdate extends MainLayoutComponent {
    state = {open: false}

    componentDidMount() {
        this.isUpdate = true
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

    handleArchive() {
        this.isUpdate = false
        this.props.rewardCategoryUpdateActions.updateRewardCategoryActivation(this.props.match.params.id, false)
    }

    handleSubmit(model) {
        const category = {id: this.props.match.params.id, name: model.name, icon: model.icon};
        this.props.rewardCategoryUpdateActions.updateRewardCategory(category)
    }

    setOpen(open) {
        const {loading} = this.props.rewardCategoryUpdate;
        if (!loading) {
            this.setState({
                ...this.state,
                open: open
            })
        }
    }

    renderForm() {
        const {category} = this.props.rewardCategory;
        const {icons} = this.props.rewardCategoryIconList;
        const {loading} = this.props.rewardCategoryUpdate;

        return (
            <div>
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
                            <Grid container justify={category.isActive ? 'space-between' : 'center'}>
                                {category.isActive && <Grid item>
                                    <ProgressButton type='button' text='Archiver' color='secondary' centered onClick={() => this.setOpen(true)} />
                                </Grid>}
                                <Grid item>
                                    <ProgressButton type='submit' text={Resources.ADMIN_REWARD_CATEGORY_UPDATE_SUBMIT_BUTTON} centered loading={this.isUpdate && loading} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Formsy>
                {category.isActive && <Dialog open={this.state.open} onClose={() => this.setOpen(false)}>
                    <DialogTitle>Êtes-vous sûr de vouloir archiver la catégorie de récompenses « {category.name} » ?</DialogTitle>
                    <DialogContent>Après l’archivage de cette catégorie de récompenses, il ne sera plus possible de la réactiver.</DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.setOpen(false)} color='secondary'>Non</Button>
                        <ProgressButton type='button' text='Oui' loading={loading} onClick={this.handleArchive.bind(this)} />
                    </DialogActions>
                </Dialog>}
            </div>
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
