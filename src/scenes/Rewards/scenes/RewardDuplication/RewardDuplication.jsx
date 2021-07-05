import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Formsy from 'formsy-react'
import {CardMedia, Grid} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import {ImageInput} from '../../components'
import {AppBarSubTitle, Card, DefaultTitle, InfoText, Loader, MainLayoutComponent, ProgressButton, Select, TextField, RichTextField} from '../../../../components'
import * as Resources from '../../../../Resources'
import * as rewardCategoryListActions from '../../../../services/RewardCategories/RewardCategoryList/actions'
import * as rewardCreationActions from '../../../../services/Rewards/RewardCreation/actions'
import * as rewardDetailActions from '../../../../services/Rewards/RewardDetail/actions'
import * as rewardImageListActions from '../../../../services/RewardImages/RewardImageList/actions'
import * as rewardTypeListActions from '../../../../services/RewardTypes/RewardTypeList/actions'

const styles = {
    image: {
        height: '100%',
        width: '100%'
    }
}

class RewardDuplication extends MainLayoutComponent {
    state = {image: null}

    componentDidMount() {
        this.initialized = false
        this.props.handleTitle(Resources.REWARD_TITLE)
        this.props.handleSubHeader(<AppBarSubTitle title={Resources.REWARD_DUPLICATION_SUBTITLE} />)
        this.props.handleMaxWidth('md')
        this.props.activateReturn()
        this.props.rewardCategoryListActions.getActiveRewardCategoryList()
        this.props.rewardDetailActions.getReward(this.props.match.params.id)
        this.props.rewardImageListActions.getRewardImageList()
        this.props.rewardTypeListActions.getRewardTypeList()
        this.props.rewardCreationActions.clearRewardCreation()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {reward} = this.props.rewardDetail
        if (!this.initialized && reward) {
            this.initialized = true
            this.setState({
                ...this.state,
                image: reward.image ? reward.image.path : reward.customImage
            })
        }
    }

    renderLoader() {
        return <Loader centered />
    }

    setImage(image) {
        this.setState({
            ...this.state,
            image: image
        })
    }

    handleImageChange(image) {
        if (image instanceof Blob) {
            var reader = new FileReader()
            reader.onloadend = function (e) {
                this.setImage(reader.result)
            }.bind(this)
            reader.readAsDataURL(image)
        } else {
            const {images} = this.props.rewardImageList
            const selectedImage = images.find(x => x.id === image)
            const path = selectedImage ? selectedImage.path : null
            this.setImage(path)
        }
    }

    handleSubmit(model) {
        const data = new FormData()
        data.append('name', model.name)
        data.append('description', JSON.stringify(model.description))
        data.append('category', model.category)
        data.append('type', model.type)
        data.append('value', model.value)
        data.append('points', model.points)
        if (Number.isInteger(model.image)) {
            data.append('image', model.image)
        } else if (model.image instanceof Blob) {
            data.append('customImage', model.image, model.image.name)
        }
        data.append('deliveryPlace', model.deliveryPlace)
        data.append('deliveryMode', model.deliveryMode)
        if (model.deliveryTime) data.append('deliveryTime', model.deliveryTime)
        data.append('isActive', true)

        if (typeof model.image === 'string' || model.image instanceof String) {
            var filename = model.image.split('/').pop()
            var blob = null
            var xhr = new XMLHttpRequest()
            xhr.open("GET", model.image)
            xhr.responseType = "blob"
            xhr.onload = function()
            {
                blob = xhr.response
                data.append('customImage', blob, filename)
                this.props.rewardCreationActions.createReward(data)
            }.bind(this)
            xhr.send()
        } else {
            this.props.rewardCreationActions.createReward(data)
        }
    }

    renderForm() {
        const {classes} = this.props
        const {categories} = this.props.rewardCategoryList
        const {reward} = this.props.rewardDetail
        const {images} = this.props.rewardImageList
        const {types} = this.props.rewardTypeList
        const {loading} = this.props.rewardCreation

        return (
            <div>
                <Formsy onValidSubmit={this.handleSubmit.bind(this)}>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <DefaultTitle>{Resources.REWARD_DUPLICATION_INFOS_AREA}</DefaultTitle>
                                </Grid>
                                <Grid item xs={12}>
                                    <Card>
                                        <Grid container spacing={2}>
                                            <Grid item xs={8}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12}>
                                                        <TextField name='name' label={Resources.REWARD_DUPLICATION_NAME_LABEL} initial={reward.name} fullWidth required
                                                                   validations='maxLength:128'
                                                                   validationErrors={{
                                                                       isDefaultRequiredValue: Resources.COMMON_REQUIRED_ERROR,
                                                                       maxLength: Resources.COMMON_MAX_LENGTH_128_ERROR
                                                                   }}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                      <RichTextField
                                                        fullWidth
                                                        initial={JSON.parse(reward.description)}
                                                        label={Resources.CHALLENGE_CREATION_INFO_DESCRIPTION_LABEL}
                                                        name='description'
                                                        required

                                                        validationErrors={{
                                                          isDefaultRequiredValue: Resources.COMMON_REQUIRED_ERROR
                                                        }}
                                                      />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={4}>
                                                {!this.state.image && <Grid container justify={'center'} alignItems={'center'} style={{height: '100%'}}>
                                                    <Grid item>
                                                        <InfoText align={'center'}>{Resources.REWARD_DUPLICATION_EMPTY_IMAGE_TEXT}</InfoText>
                                                    </Grid>
                                                </Grid>}
                                                {this.state.image && <CardMedia image={this.state.image} className={classes.image} />}
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Select name='category' label={Resources.REWARD_DUPLICATION_CATEGORY_LABEL} options={categories} optionValueName={'id'} optionTextName={'name'} initial={reward.category.id} fullWidth required
                                                        validationErrors={{
                                                            isDefaultRequiredValue: Resources.COMMON_REQUIRED_ERROR
                                                        }}
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Select name='type' label={Resources.REWARD_DUPLICATION_TYPE_LABEL} options={types} optionValueName={'id'} optionTextName={'name'} initial={reward.type.id} fullWidth required
                                                        validationErrors={{
                                                            isDefaultRequiredValue: Resources.COMMON_REQUIRED_ERROR
                                                        }}
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField type='number' name='value' label={Resources.REWARD_DUPLICATION_VALUE_LABEL} endAdornment={Resources.REWARD_DUPLICATION_VALUE_SUFFIX_LABEL} initial={reward.value} fullWidth required
                                                           validations='isInt'
                                                           validationErrors={{
                                                               isDefaultRequiredValue: Resources.COMMON_REQUIRED_ERROR,
                                                               isInt: Resources.COMMON_IS_INT_ERROR
                                                           }}
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField type='number' name='points' label={Resources.REWARD_DUPLICATION_POINTS_LABEL} initial={reward.points} fullWidth required
                                                           validations='isInt'
                                                           validationErrors={{
                                                               isDefaultRequiredValue: Resources.COMMON_REQUIRED_ERROR,
                                                               isInt: Resources.COMMON_IS_INT_ERROR
                                                           }}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <ImageInput name='image' label={Resources.REWARD_DUPLICATION_IMAGE_LABEL} images={images} initial={reward.image ? reward.image.id : reward.customImage} onChange={this.handleImageChange.bind(this)} required />
                                            </Grid>
                                        </Grid>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <DefaultTitle>{Resources.REWARD_DUPLICATION_DELIVERY_AREA}</DefaultTitle>
                                </Grid>
                                <Grid item xs={12}>
                                    <Card>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <TextField name='deliveryPlace' label={Resources.REWARD_DUPLICATION_DELIVERY_PLACE_LABEL} initial={reward.deliveryPlace} fullWidth required
                                                           validations='maxLength:128'
                                                           validationErrors={{
                                                               isDefaultRequiredValue: Resources.COMMON_REQUIRED_ERROR,
                                                               maxLength: Resources.COMMON_MAX_LENGTH_128_ERROR
                                                           }}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField name='deliveryMode' label={Resources.REWARD_DUPLICATION_DELIVERY_MODE_LABEL} initial={reward.deliveryMode} fullWidth required
                                                           validations='maxLength:128'
                                                           validationErrors={{
                                                               isDefaultRequiredValue: Resources.COMMON_REQUIRED_ERROR,
                                                               maxLength: Resources.COMMON_MAX_LENGTH_128_ERROR
                                                           }}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField name='deliveryTime' label={Resources.REWARD_DUPLICATION_DELIVERY_TIME_LABEL} initial={reward.deliveryTime} fullWidth
                                                           validations='maxLength:128'
                                                           validationErrors={{
                                                               maxLength: Resources.COMMON_MAX_LENGTH_128_ERROR
                                                           }}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <ProgressButton text={Resources.REWARD_DUPLICATION_SUBMIT_BUTTON} loading={loading} centered />
                        </Grid>
                    </Grid>
                </Formsy>
            </div>
        )
    }

    render() {
        const {categories, loading: rewardCategoryListLoading} = this.props.rewardCategoryList
        const {reward, loading: rewardDetailLoading} = this.props.rewardDetail
        const {images, loading: rewardImageListLoading} = this.props.rewardImageList
        const {types, loading: rewardTypeListLoading} = this.props.rewardTypeList
        const {success} = this.props.rewardCreation
        const loading = rewardCategoryListLoading || rewardDetailLoading || rewardImageListLoading ||rewardTypeListLoading

        if (!loading && reward && !reward.isActive) {
            this.props.history.push('/')
        }

        if (success) {
            this.props.rewardCreationActions.clearRewardCreation()
            this.props.history.goBack()
        }

        return (
            <div>
                {loading && this.renderLoader()}
                {!loading && categories && reward && images && types && this.renderForm()}
            </div>
        )
    }
}

const mapStateToProps = ({rewardCategoryList, rewardCreation, rewardDetail, rewardImageList, rewardTypeList}) => ({
    rewardCategoryList,
    rewardCreation,
    rewardDetail,
    rewardImageList,
    rewardTypeList,
})

const mapDispatchToProps = (dispatch) => ({
    rewardCategoryListActions: bindActionCreators(rewardCategoryListActions, dispatch),
    rewardCreationActions: bindActionCreators(rewardCreationActions, dispatch),
    rewardDetailActions: bindActionCreators(rewardDetailActions, dispatch),
    rewardImageListActions: bindActionCreators(rewardImageListActions, dispatch),
    rewardTypeListActions: bindActionCreators(rewardTypeListActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(RewardDuplication))
