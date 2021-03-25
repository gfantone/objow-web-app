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

const Infos = ({description, end, image, images, isUpdate, name, period, onEndChange, onStartChange, onTypeChange, start, type, types, ...props}) => {
    const classes = useStyles()
    const {account} = props.accountDetail
    const hasManager = account.role.code === 'M'
    const today = new Date()
    const startMinDate = new Date(today.getFullYear(), today.getMonth(), 1)
    const startMaxDate = end ? end : period.end.toDate2()
    const endMinDate = start ? start : today
    const [selectedImageId, setSelectedImageId] = React.useState(image ? image.id : null)
    const selectedImage = images.find(x => x.id === selectedImageId)
    const [selectedImagePath, setSelectedImagePath] = React.useState(selectedImage ? selectedImage.path : null)

    function handleImageChange(id) {
      if (id instanceof Blob) {
          var reader = new FileReader()
          reader.onloadend = function (e) {
              setSelectedImagePath(reader.result)
          }.bind(this)
          reader.readAsDataURL(id)
      } else {
        setSelectedImageId(Number(id))
        setSelectedImagePath(images.find(x => x.id === Number(id)).path)
      }
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
                                            <TextField
                                                fullWidth
                                                initial={name}
                                                label={Resources.CHALLENGE_CREATION_INFO_NAME_LABEL}
                                                name='name'
                                                required
                                                validationErrors={{isDefaultRequiredValue: Resources.COMMON_REQUIRED_ERROR}}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                initial={description}
                                                label={Resources.CHALLENGE_CREATION_INFO_DESCRIPTION_LABEL}
                                                multiline
                                                name='description'
                                                required
                                                validationErrors={{isDefaultRequiredValue: Resources.COMMON_REQUIRED_ERROR}}
                                            />
                                        </Grid>
                                    </Grid>
                                </div>
                            </Grid>
                            <Grid item xs={4}>
                                {!selectedImagePath && <Grid alignItems={'center'} container justify={'center'} style={{height: '100%'}}>
                                    <Grid item>
                                        <InfoText align={'center'}>{Resources.CHALLENGE_CREATION_INFO_NO_IMAGE_TEXT}</InfoText>
                                    </Grid>
                                </Grid>}
                                {selectedImagePath && <CardMedia className={classes.image} image={selectedImagePath} />}
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
                                <Select
                                    disabled={isUpdate}
                                    fullWidth
                                    initial={type}
                                    label={Resources.CHALLENGE_CREATION_INFO_TYPE_LABEL}
                                    name='type'
                                    options={types}
                                    optionTextName='name'
                                    optionValueName='id'
                                    required
                                    validationErrors={{isDefaultRequiredValue: Resources.COMMON_REQUIRED_ERROR}}
                                    onChange={onTypeChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <ImageInput
                                    images={images}
                                    initial={selectedImageId}
                                    label={Resources.CHALLENGE_CREATION_INFO_IMAGE_LABEL}
                                    name={'image'}
                                    required
                                    onChange={handleImageChange}
                                />
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
