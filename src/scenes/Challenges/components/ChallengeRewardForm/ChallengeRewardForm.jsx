import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Formsy from 'formsy-react'
import {CardMedia, Grid} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import {ImageInput} from '../../components'
import {AppBarSubTitle, Card, DefaultTitle, InfoText, Loader, MainLayoutComponent, ProgressButton, Select, TextField, RichTextField, HiddenInput} from '../../../../components'
import * as Resources from '../../../../Resources'
import * as rewardCategoryListActions from '../../../../services/RewardCategories/RewardCategoryList/actions'
import * as rewardImageListActions from '../../../../services/RewardImages/RewardImageList/actions'
import * as rewardTypeListActions from '../../../../services/RewardTypes/RewardTypeList/actions'
import _ from 'lodash'

const styles = {
    image: {
        height: '100%',
        width: '100%'
    }
}

class ChallengeRewardForm extends React.Component {
    state = {image: null}

    componentDidMount() {
        this.props.rewardCategoryListActions.getActiveRewardCategoryList()
        this.props.rewardImageListActions.getRewardImageList()
        this.props.rewardTypeListActions.getRewardTypeList()
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

    renderForm() {
        const {classes} = this.props
        const {categories} = this.props.rewardCategoryList
        const {images} = this.props.rewardImageList
        const {types} = this.props.rewardTypeList
        const {reward} = this.props
        let image

        if(_.get(reward, 'image.path')) {
          image = _.get(reward, 'image.path')
        }else if(_.get(reward, 'image')) {
          const selectedImage = images.find(x => x.id === parseInt(_.get(reward, 'image')))
          const path = selectedImage ? selectedImage.path : null
          image = path
        }
        image = this.state.image ? this.state.image : image
        const imageId = _.get(reward, 'image.id', _.get(reward, 'image'))
        return (
            <div>

                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <DefaultTitle>{Resources.REWARD_CREATION_INFOS_AREA}</DefaultTitle>
                                </Grid>
                                <Grid item xs={12}>
                                    <Card>
                                        <Grid container spacing={2}>
                                            <Grid item xs={8}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12}>
                                                        <TextField name='name' initial={_.get(reward, 'name')} label={Resources.REWARD_CREATION_NAME_LABEL} fullWidth required
                                                                   validations='maxLength:128'
                                                                   validationErrors={{
                                                                       isDefaultRequiredValue: Resources.COMMON_REQUIRED_ERROR,
                                                                       maxLength: Resources.COMMON_MAX_LENGTH_128_ERROR
                                                                   }}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>

                                                        <RichTextField
                                                          name='description'
                                                          label={Resources.REWARD_CREATION_DESCRIPTION_LABEL}
                                                          initial={
                                                            _.isString(_.get(reward, 'description')) ?
                                                            JSON.parse(_.get(reward, 'description')) :
                                                            _.get(reward, 'description')
                                                          }
                                                          multiline
                                                          fullWidth
                                                          required
                                                          validationErrors={{
                                                             isDefaultRequiredValue: Resources.COMMON_REQUIRED_ERROR
                                                          }}/>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={4}>
                                                { !image && <Grid container justify={'center'} alignItems={'center'} style={{height: '100%'}}>
                                                    <Grid item>
                                                        <InfoText align={'center'}>{Resources.REWARD_CREATION_EMPTY_IMAGE_TEXT}</InfoText>
                                                    </Grid>
                                                </Grid> }
                                                { image && <CardMedia image={image} className={classes.image} /> }
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Select name='category' initial={_.get(reward, 'category')} label={Resources.REWARD_CREATION_CATEGORY_LABEL} options={categories} optionValueName={'id'} optionTextName={'name'} fullWidth
                                                        validationErrors={{
                                                            isDefaultRequiredValue: Resources.COMMON_REQUIRED_ERROR
                                                        }}
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Select name='type' disabled initial={_.get(reward, 'type')} label={Resources.REWARD_CREATION_TYPE_LABEL} options={types} optionValueName={'id'} optionTextName={'name'} fullWidth required
                                                        validationErrors={{
                                                            isDefaultRequiredValue: Resources.COMMON_REQUIRED_ERROR
                                                        }}
                                                />
                                              <HiddenInput
                                                name='type'
                                                value={_.get(reward, 'type')}
                                              />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField type='number' name='value' initial={_.get(reward, 'value')} label={Resources.REWARD_CREATION_VALUE_LABEL} endAdornment={Resources.REWARD_CREATION_VALUE_SUFFIX_LABEL} fullWidth required
                                                           validations='isInt'
                                                           validationErrors={{
                                                               isDefaultRequiredValue: Resources.COMMON_REQUIRED_ERROR,
                                                               isInt: Resources.COMMON_IS_INT_ERROR
                                                           }}
                                                />
                                            </Grid>

                                            <Grid item xs={12}>
                                                <ImageInput name='image' initial={imageId} label={Resources.REWARD_CREATION_IMAGE_LABEL} images={images} onChange={this.handleImageChange.bind(this)} required />
                                            </Grid>
                                        </Grid>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <DefaultTitle>{Resources.REWARD_CREATION_DELIVERY_AREA}</DefaultTitle>
                                </Grid>
                                <Grid item xs={12}>
                                    <Card>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <TextField name='deliveryPlace' initial={_.get(reward, 'deliveryPlace')} label={Resources.REWARD_CREATION_DELIVERY_PLACE_LABEL} fullWidth
                                                           validations='maxLength:128'
                                                           validationErrors={{
                                                               isDefaultRequiredValue: Resources.COMMON_REQUIRED_ERROR,
                                                               maxLength: Resources.COMMON_MAX_LENGTH_128_ERROR
                                                           }}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField name='deliveryMode' initial={_.get(reward, 'deliveryMode')} label={Resources.REWARD_CREATION_DELIVERY_MODE_LABEL} fullWidth
                                                           validations='maxLength:128'
                                                           validationErrors={{
                                                               isDefaultRequiredValue: Resources.COMMON_REQUIRED_ERROR,
                                                               maxLength: Resources.COMMON_MAX_LENGTH_128_ERROR
                                                           }}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField name='deliveryTime' initial={_.get(reward, 'deliveryTime')} label={Resources.REWARD_CREATION_DELIVERY_TIME_LABEL} fullWidth
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
                    </Grid>
            </div>
        )
    }

    render() {
        const {categories, loading: rewardCategoryListLoading} = this.props.rewardCategoryList
        const {images, loading: rewardImageListLoading} = this.props.rewardImageList
        const {types, loading: rewardTypeListLoading} = this.props.rewardTypeList
        const loading = rewardCategoryListLoading || rewardImageListLoading ||rewardTypeListLoading

        return (
            <div>
                {loading && this.renderLoader()}
                {!loading && categories && images && types && this.renderForm()}
            </div>
        )
    }
}

const mapStateToProps = ({rewardCategoryList, rewardImageList, rewardTypeList}) => ({
    rewardCategoryList,

    rewardImageList,
    rewardTypeList
})

const mapDispatchToProps = (dispatch) => ({
    rewardCategoryListActions: bindActionCreators(rewardCategoryListActions, dispatch),
    rewardImageListActions: bindActionCreators(rewardImageListActions, dispatch),
    rewardTypeListActions: bindActionCreators(rewardTypeListActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ChallengeRewardForm))
