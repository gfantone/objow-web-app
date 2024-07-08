import React, { useState, useRef, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid, CardMedia, IconButton } from '@material-ui/core';
import {
  DefaultText,
  InfoText,
  HiddenInput,
} from '../../../../../../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faFile, faTimes } from '@fortawesome/free-solid-svg-icons';
import { hasImageExtension } from '../../../../../../helpers/UrlHelper';
import { useIntl } from 'react-intl';
import _ from 'lodash';

const styles = {
  spreadsheet: {
    paddingLeft: 0,
    width: '100%',
    minHeight: 200,
  },
  userAvatar: {
    width: 30,
    height: 30,
  },
  customImageInput: {
    display: 'none',
  },
  customImage: {
    height: '100%',
    backgroundColor: '#f7f8fc',
    cursor: 'pointer',
    opacity: 0.75,
    '&:hover': {
      opacity: 1,
    },
  },
  image: {
    height: '100%',
    width: '100%',
    backgroundSize: 'contain',
    backgroundPosition: 'middle',
  },
  link: {
    fontSize: 16,
    cursor: 'pointer',
    alignSelf: 'flex-start',
    color: 'rgb(15,111,222)',
    opacity: 1,
  },
  tooltip: {
    display: 'block',
  },
  searchBar: {
    width: '40vw',
    maxWidth: '40vw',
  },
  coverImage: {
    position: 'absolute',
    top: '-12px',
    height: 'calc(100% + 20px)',
    width: 'calc(50% + 20px)',
    borderRadius: '0 4px 4px 0',
  },
  inputs: {
    '& label, & label.Mui-focused, & input:not(.Mui-error), & textarea:not(.Mui-error)':
      {
        textTransform: 'none',
        fontWeight: 'bold',
        fontSize: 16,
        fontFamily: 'Avenir',
        color: '#555555',
      },
  },
  imageDeleteIcon: {
    position: 'absolute',
    top: -3,
    right: -3,
    color: 'white',
    width: 25,
    height: 25,

    background: '#00E58D',
    '&:hover': {
      background: '#00E58D',
      color: 'white',
    },
  },
};

const CollaboratorInputImage = ({ image, classes }) => {
  const intl = useIntl();
  return (
    <div>
      {image && (
        <React.Fragment>
          {image &&
          (hasImageExtension(_.get(image, 'path')) ||
            hasImageExtension(_.get(image, 'file.name'))) ? (
            <Grid
              item
              xs={12}
              style={{
                height: 100,
                padding: 4,
                borderRadius: 5,
                background: '#F9FAFD',
              }}
            >
              {image.file && (
                <CardMedia className={classes.image} image={image.blob} />
              )}
              {image.path && (
                <CardMedia className={classes.image} image={image.path} />
              )}
            </Grid>
          ) : (
            <Grid
              item
              xs={12}
              style={{
                overflow: 'hidden',
                height: 100,
                padding: 4,
                borderRadius: 5,
                background: '#F9FAFD',
              }}
            >
              <InfoText lowercase>
                <FontAwesomeIcon icon={faFile} style={{ marginRight: 5 }} />

                {_.last(
                  _.get(image, 'path', _.get(image, 'file.name'), '').split(
                    '/',
                  ),
                )}
              </InfoText>
            </Grid>
          )}
        </React.Fragment>
      )}
    </div>
  );
};

const CollaboratorInputImageList = ({
  images: imagesInput,
  onChange,
  classes,
}) => {
  const intl = useIntl();
  const customImageInput = useRef(null);
  const StyledCollaboratorInputImage = withStyles(styles)(
    CollaboratorInputImage,
  );
  const [newImage, setNewImage] = useState(null);
  const [images, setImages] = useState(imagesInput);

  const handleImport = () => {
    customImageInput.current.click();
  };

  const handleCustomImageChange = (event) => {
    const files = event.currentTarget.files;
    if (files && files.length > 0) {
      const file = files[0];

      if (file instanceof Blob) {
        setNewImage(file);
        var reader = new FileReader();
        reader.onloadend = function (e) {
          setImages([...images, { blob: reader.result, file }]);
        }.bind(this);
        reader.readAsDataURL(file);
      }
    }
  };

  const onDeleteImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };
  return (
    <Grid container spacing={2}>
      {images.map((image, index) => (
        <Grid item xs={3} key={index} style={{ position: 'relative' }}>
          <IconButton
            size="small"
            onClick={() => onDeleteImage(index)}
            className={classes.imageDeleteIcon}
          >
            <FontAwesomeIcon icon={faTimes} />
          </IconButton>
          <StyledCollaboratorInputImage image={image} />
        </Grid>
      ))}
      <Grid item xs={12}>
        <InfoText>
          {intl.formatMessage({ id: 'challenge.kpi_results.form.data_image' })}
        </InfoText>
        <Grid
          container
          justify="center"
          alignItems="center"
          onClick={handleImport}
          className={classes.customImage}
        >
          <Grid item>
            <DefaultText align="center">
              <FontAwesomeIcon icon={faUpload} />
            </DefaultText>

            <DefaultText align="center">
              {intl.formatMessage({ id: 'common.import' })}
            </DefaultText>
            <input
              ref={customImageInput}
              type="file"
              accept="image/*,video/*,audio/*,.doc,.docx,.xls,.xlsx,.pdf,.ppt,.pptx"
              className={classes.customImageInput}
              onChange={handleCustomImageChange}
              multiple={false}
            />
            {images.map((image, index) => (
              <HiddenInput
                name={`images[${index + 1}]`}
                value={_.get(image, 'file', image)}
              />
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(CollaboratorInputImageList);
