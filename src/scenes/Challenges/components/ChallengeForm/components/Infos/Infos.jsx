import React from 'react'
import {connect} from 'react-redux'
import {CardMedia, Grid} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import {ImageInput} from './components'
import {Card, DatePicker, DefaultTitle, InfoText, Select, TextField} from '../../../../../../components'
import * as Resources from '../../../../../../Resources'

const useStyles = makeStyles({
    image: {
        height: '100%',
        width: '100%'
    }
})

const Infos = ({description, end, image, images, name, period, onEndChange, onStartChange, onTypeChange, start, readonly, type, types, ...props}) => {
    const classes = useStyles()
    const {account} = props.accountDetail
    const hasManager = account.role.code === 'M'
    const today = new Date()
    const startMinDate = new Date(today.getFullYear(), today.getMonth(), 1)
    const startMaxDate = end ? end : period.end.toDate2()
    const endMinDate = start ? start : today
    const [selectedImageId, setSelectedImageId] = React.useState(image ? image.id : null)
    const selectedImage = images.find(x => x.id === selectedImageId)
    const selectedImagePath = selectedImage ? selectedImage.path : null
    const selectedTypeId = type ? type.id : null

    function handleImageChange(id) {
        setSelectedImageId(Number(id))
    }

    return (
        <div>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <DefaultTitle>{Resources.CHALLENGE_CREATION_INFO_AREA}</DefaultTitle>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <Grid container spacing={2}>
                            <Grid item xs={8}>
                                <div>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField name='name' label={Resources.CHALLENGE_CREATION_INFO_NAME_LABEL} fullWidth required initial={name}
                                                       validationErrors={{isDefaultRequiredValue: Resources.COMMON_REQUIRED_ERROR}}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField name='description' label={Resources.CHALLENGE_CREATION_INFO_DESCRIPTION_LABEL} fullWidth multiline required initial={description}
                                                       validationErrors={{isDefaultRequiredValue: Resources.COMMON_REQUIRED_ERROR}}
                                            />
                                        </Grid>
                                    </Grid>
                                </div>
                            </Grid>
                            <Grid item xs={4}>
                                {!selectedImagePath && <Grid container justify={'center'} alignItems={'center'} style={{height: '100%'}}>
                                    <Grid item>
                                        <InfoText align={'center'}>{Resources.CHALLENGE_CREATION_INFO_NO_IMAGE_TEXT}</InfoText>
                                    </Grid>
                                </Grid>}
                                {selectedImagePath && <CardMedia image={selectedImagePath} className={classes.image} />}
                            </Grid>
                            <Grid item xs={3}>
                                <DatePicker
                                    clearable
                                    format='dd/MM/yyyy'
                                    fullWidth
                                    initial={start}
                                    label={Resources.CHALLENGE_CREATION_INFO_START_LABEL}
                                    maxDate={startMaxDate}
                                    minDate={startMinDate}
                                    name='start'
                                    required
                                    validationErrors={{isDefaultRequiredValue: Resources.COMMON_REQUIRED_ERROR}}
                                    onChange={onStartChange}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <DatePicker
                                    clearable
                                    format='dd/MM/yyyy'
                                    fullWidth
                                    initial={end}
                                    label={Resources.CHALLENGE_CREATION_INFO_END_LABEL}
                                    maxDate={period.end.toDate2()}
                                    minDate={endMinDate}
                                    name='end'
                                    required
                                    validationErrors={{isDefaultRequiredValue: Resources.COMMON_REQUIRED_ERROR}}
                                    onChange={onEndChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Select name='type' label={Resources.CHALLENGE_CREATION_INFO_TYPE_LABEL} options={types} initial={selectedTypeId} optionValueName='id' optionTextName='name' disabled={hasManager || readonly} fullWidth required
                                        onChange={onTypeChange}
                                        validationErrors={{isDefaultRequiredValue: Resources.COMMON_REQUIRED_ERROR}}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <ImageInput name={'image'} label={Resources.CHALLENGE_CREATION_INFO_IMAGE_LABEL} images={images} required initial={selectedImageId} onChange={handleImageChange} />
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}

const mapStateToProps = ({accountDetail}) => ({
    accountDetail
})

export default connect(mapStateToProps)(Infos)
