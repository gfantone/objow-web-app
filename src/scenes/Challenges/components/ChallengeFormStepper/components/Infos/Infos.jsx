import React from 'react'
import {connect} from 'react-redux'
import {CardMedia, Grid} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import {ImageInput} from './components'
import {Card, DefaultTitle, InfoText, Select, TextField, RichTextField} from '../../../../../../components'
import * as Resources from '../../../../../../Resources'

const useStyles = makeStyles({
    image: {
        height: '100%',
        width: '100%'
    }
})

const Infos = ({description, end, customImage, image, images, isUpdate, name, period, onTypeChange, start, type, types, setCustomImage, ...props}) => {
    const classes = useStyles()
    const {account} = props.accountDetail
    const hasManager = account.role.code === 'M'

    const [selectedImageId, setSelectedImageId] = React.useState(image ? image : null)
    const selectedImage = customImage ? {path: customImage} : images.find(x => x.id === image)

    const [selectedImagePath, setSelectedImagePath] = React.useState(selectedImage ? selectedImage.path : null)

    function handleImageChange(id) {
      if (id instanceof Blob) {
          var reader = new FileReader()
          reader.onloadend = function (e) {
              setSelectedImagePath(reader.result)
              setCustomImage(reader.result)
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
                                            <RichTextField
                                              fullWidth
                                              initial={description}
                                              label={Resources.CHALLENGE_CREATION_INFO_DESCRIPTION_LABEL}
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


                            <Grid item xs={12}>
                                <ImageInput
                                    images={images}
                                    initial={selectedImageId || customImage}
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
