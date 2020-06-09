import React from 'react'
import Formsy from 'formsy-react'
import {Grid} from '@material-ui/core'
import {ImageInput} from '../../components'
import {AppBarSubTitle, Card, DefaultTitle, Loader, MainLayoutComponent, ProgressButton, Select, TextField} from '../../../../components'
import * as Resources from '../../../../Resources'

class RewardCreation extends MainLayoutComponent {
    componentDidMount() {
        this.props.handleTitle(Resources.REWARD_TITLE)
        this.props.handleSubHeader(<AppBarSubTitle title={Resources.REWARD_CREATION_SUBTITLE} />)
        this.props.handleMaxWidth('md')
        this.props.activateReturn()
    }

    renderLoader() {
        return <Loader centered />
    }

    renderForm() {
        return (
            <div>
                <Formsy>
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
                                                        <TextField name='name' label={Resources.REWARD_CREATION_NAME_LABEL} fullWidth required />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <TextField name='description' label={Resources.REWARD_CREATION_DESCRIPTION_LABEL} fullWidth required />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={4}>

                                            </Grid>
                                            <Grid item xs={6}>
                                                <Select name='category' label={Resources.REWARD_CREATION_CATEGORY_LABEL} fullWidth required />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Select name='type' label={Resources.REWARD_CREATION_TYPE_LABEL} fullWidth required />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField type='number' name='value' label={Resources.REWARD_CREATION_VALUE_LABEL} endAdornment={Resources.REWARD_CREATION_VALUE_SUFFIX_LABEL} fullWidth required />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField type='number' name='points' label={Resources.REWARD_CREATION_POINTS_LABEL} fullWidth required />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <ImageInput name='image' label={Resources.REWARD_CREATION_IMAGE_LABEL} required />
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
                                                <TextField name='deliveryPlace' label={Resources.REWARD_CREATION_DELIVERY_PLACE_LABEL} fullWidth required />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField name='deliveryMode' label={Resources.REWARD_CREATION_DELIVERY_MODE_LABEL} fullWidth required />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField name='deliveryTime' label={Resources.REWARD_CREATION_DELIVERY_TIME_LABEL} fullWidth required />
                                            </Grid>
                                        </Grid>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <ProgressButton text={Resources.REWARD_CREATION_SUBMIT_BUTTON} centered />
                        </Grid>
                    </Grid>
                </Formsy>
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.renderForm()}
            </div>
        )
    }
}

export default RewardCreation
