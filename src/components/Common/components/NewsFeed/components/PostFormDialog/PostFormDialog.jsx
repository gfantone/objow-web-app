<<<<<<< HEAD
import React, { useState, useRef, useEffect } from 'react';
import Formsy from 'formsy-react';
import { Grid, IconButton, Chip } from '@material-ui/core';
=======
import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import Formsy from 'formsy-react';
import { Grid, IconButton, Chip } from '@material-ui/core';
import EmojiPicker from 'emoji-picker-react';
>>>>>>> dev
import {
  DefaultText,
  Dialog,
  DialogTitle,
  DialogContent,
  Avatar,
  ProgressButton,
  HiddenInput,
  TextField,
  Loader,
  PostFormDialogParams,
  Tooltip,
  BlueText,
} from '../../..';
import { LinkPreview } from '../LinkPreview';
import { withStyles } from '@material-ui/core/styles';
<<<<<<< HEAD
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
=======
import withWidth, { isWidthDown, isWidthUp } from '@material-ui/core/withWidth';
>>>>>>> dev
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faImage,
  faPaperclip,
  faPlayCircle,
  faTimes,
  faCode,
  faChevronDown,
  faInfoCircle,
<<<<<<< HEAD
} from '@fortawesome/free-solid-svg-icons';
=======
  faLaughBeam,
} from '@fortawesome/free-solid-svg-icons';
import GifBoxIcon from '@mui/icons-material/GifBox';
import ReactGiphySearchbox from 'react-giphy-searchbox';
>>>>>>> dev
import * as roleListActions from '../../../../../../services/Roles/RoleList/actions';
import { useIntl, injectIntl } from 'react-intl';
import { toast } from 'react-toastify';
import api from '../../../../../../data/api/api';
import _ from 'lodash';

const styles = (theme) => {
  return {
    newPostButton: {
      padding: 10,
      border: '1px solid #ccc',
      borderRadius: 25,
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: '#f5f5f5',
      },
    },
    titleContainer: {
      cursor: 'pointer',
      width: 400,
      '&:hover': {
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
      },
    },
    dialog: {
      width: 700,
      minWidth: 700,
<<<<<<< HEAD
=======
      height: 500,
>>>>>>> dev
    },
    dialogParams: {
      width: 550,
      minWidth: 500,
    },
    iconButton: {
      width: 40,
      height: 40,
    },
    textField: {
      width: '100%',

      '& .MuiInput-underline:before, .MuiInput-underline:after': {
        display: 'none',
      },
      '& textarea': {
        minHeight: 10,
        maxHeight: 200,
        overflowY: 'auto !important',
      },
    },
    mediaCloseIcon: {
      position: 'absolute',
      color: 'white',
      top: -10,
      right: -10,
      width: 25,
      height: 25,
      fontSize: 20,
      zIndex: 100,
      background: theme.palette.primary.main,
      '&:hover': {
        background: theme.palette.primary.main,
        color: 'white',
      },
    },
    link: {
      fontSize: 18,
      cursor: 'pointer',
      '&:hover, &.active': {
        color: 'rgb(15,111,222)',
        opacity: 1,
      },
    },
    filterChip: {
      marginRight: 5,
      marginBottom: 5,
      textTransform: 'none',
    },
    filterChips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
  };
};
<<<<<<< HEAD
=======

>>>>>>> dev
const PostFormDialog = ({
  loading: creationLoading,
  classes,
  onSubmit,
  created,
  dialogOpen,
  setDialogOpen,
  post,
  width,
  title,
  ...props
}) => {
  const { account } = props.accountDetail;
  const { roles } = props.roleList;
<<<<<<< HEAD
  const isMobile = isWidthDown('sm', width);
=======

  const isMobile = isWidthDown('xs', width);
  const isTablet = isWidthUp('sm', width) && isWidthDown('md', width);
  const isDesktop = isWidthUp('lg', width);

>>>>>>> dev
  const [image, setImage] = useState(_.get(post, 'image'));
  const [video, setVideo] = useState(_.get(post, 'video'));
  const [file, setFile] = useState(_.get(post, 'file'));
  const [embed, setEmbed] = useState(_.get(post, 'embed'));
<<<<<<< HEAD
  const [description, setDescription] = useState(_.get(post, 'description'));
=======
  const [description, setDescription] = useState(
    _.get(post, 'description', '')
  );
>>>>>>> dev
  const [linkPreview, setLinkPreview] = useState(_.get(post, 'link_preview'));
  const [openGraphLoading, setOpenGraphLoading] = useState(false);
  const [visibleOptions, setVisibleOptions] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [visibilityAll, setVisibilityAll] = useState(true);
  const [teamId, setTeamId] = useState(
    _.get(post, 'visibility.team.id') ||
      _.get(post, 'visibility.team') ||
      _.get(account, 'team.id')
  );
  const [teamGroupId, setTeamGroupId] = useState(
    _.get(
      post,
      'visibility.team_group.id',
      _.get(post, 'visibility.team_group')
    )
  );
  const [role, setRole] = useState(_.get(post, 'visibility.role'));
  const [selectedFromParamsTeamGroup, setSelectedFromParamsTeamGroup] =
    useState(
      account.team_group
        ? account.team_group
        : _.get(post, 'visibility.team_group', {})
    );
  const [selectedFromParamsTeam, setSelectedFromParamsTeam] = useState(
    account.team ? account.team : _.get(post, 'visibility.team', {})
  );
  const [selectedRadioButton, setSelectedRadioButton] = useState('');
<<<<<<< HEAD

=======
  const [showGiphyPicker, setShowGiphyPicker] = useState(false);
  const [gif, setGif] = useState(_.get(post, 'gif'));
  const gifApiKey = process.env.REACT_APP_GIF_API_KEY;
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
>>>>>>> dev
  const isCollaborator = account.role.code === 'C';
  const isAdministrator = account.role.code === 'A';
  const isSuperManager = account.role.code === 'S';
  const isManager = account.role.code === 'M';
<<<<<<< HEAD
  const imageInput = useRef();
  const videoInput = useRef();
  const fileInput = useRef();
  const intl = useIntl();
=======
  const emojiInputRef = useRef();
  const gifInputRef = useRef();
  const imageInput = useRef();
  const videoInput = useRef();
  const fileInput = useRef();
  const textFieldRef = useRef();
  const intl = useIntl();
  const gifIconRef = useRef(null);
  const emojiIconRef = useRef(null);
  const [positions, setPositions] = useState({
    gif: { top: 0, left: 0 },
    emoji: { top: 0, left: 0 },
  });

  const updatePosition = (type) => {
    const ref = type === 'gif' ? gifIconRef : emojiIconRef;
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setPositions((prev) => ({
        ...prev,
        [type]: {
          top: rect.top + window.scrollY,
          left: rect.left + window.scrollX,
        },
      }));
    }
  };

  useLayoutEffect(() => {
    updatePosition('emoji');
  }, [emojiIconRef.current, showEmojiPicker, width]);

  useLayoutEffect(() => {
    updatePosition('gif');
  }, [gifIconRef.current, showGiphyPicker, width]);

  useEffect(() => {
    const handleResize = () => {
      updatePosition('emoji');
      updatePosition('gif');
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
>>>>>>> dev

  const fullVisibility = intl.formatMessage({ id: 'newsfeed.for_everybody' });
  useEffect(() => {
    if (visibilityAll) {
      setSelectedRadioButton(fullVisibility);
    } else {
      setSelectedRadioButton('selected team');
    }
  }, [visibilityAll]);

  const handleOpenOptions = () => {
    setVisibleOptions(!visibleOptions);
<<<<<<< HEAD

=======
>>>>>>> dev
    if (!visibilityAll) {
      setIsFilterVisible(true);
    }
  };
<<<<<<< HEAD

=======
  const openGifPicker = () => {
    setShowGiphyPicker(!showGiphyPicker);
  };
  const openEmojiInput = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };
>>>>>>> dev
  const openImageInput = () => {
    imageInput.current.click();
  };

  const openVideoInput = () => {
    videoInput.current.click();
  };

  const openFileInput = () => {
    fileInput.current.click();
  };

  const regexCheck = (text) => {
    if (text) {
      const regex =
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gm;
      const urls = text.match(regex);
      if (!linkPreview && !openGraphLoading && urls && urls.length > 0) {
        setOpenGraphLoading(true);
        api.openGraph
          .get(urls[0])
          .then((response) => {
            setOpenGraphLoading(false);
            if (!response.data.error) {
              setLinkPreview(response.data);
            }
          })
          .catch(() => {
            setOpenGraphLoading(false);
            setLinkPreview();
          });
      }
    }
  };
<<<<<<< HEAD

  useEffect(() => {
    setDescription(_.get(post, 'description'));
    setImage(_.get(post, 'image'));
    setVideo(_.get(post, 'video'));
    setFile(_.get(post, 'file'));
=======
  useEffect(() => {
    setDescription(_.get(post, 'description', ''));
    setImage(_.get(post, 'image'));
    setVideo(_.get(post, 'video'));
    setFile(_.get(post, 'file'));
    setGif(_.get(post, 'gif'));
>>>>>>> dev
    setLinkPreview(_.get(post, 'link_preview'));
    setTeamId(
      _.get(post, 'visibility.team.id') ||
        _.get(post, 'visibility.team') ||
        _.get(account, 'team.id')
    );
    setTeamGroupId(
      _.get(post, 'visibility.team_group.id') ||
        _.get(post, 'visibility.team_group')
    );
    if (post) {
      setSelectedFromParamsTeam(_.get(post, 'visibility.team'));
      setSelectedFromParamsTeamGroup(_.get(post, 'visibility.team_group'));
      setVisibilityAll(_.get(post, 'visibility.all'));
    }

    setRole(_.get(post, 'visibility.role'));
  }, [dialogOpen]);

  useEffect(() => {
    if (created && dialogOpen) {
      setDialogOpen(false);
    }
  }, [created]);

  useEffect(() => {
    if (video) {
      setImage();
      setFile();
      setLinkPreview();
      setEmbed();
<<<<<<< HEAD
=======
      setGif();
>>>>>>> dev

      if (video.size > 300000000) {
        const videoSize = `${parseInt(video.size / 1000000)} Mo`;
        toast.error(
          intl
            .formatMessage({ id: 'newsfeed.video_size_error' })
            .format(videoSize)
        );
        setVideo();
      }
    }
  }, [video]);

  useEffect(() => {
    if (image) {
      setVideo();
      setFile();
      setLinkPreview();
      setEmbed();
<<<<<<< HEAD
=======
      setGif();
>>>>>>> dev
    }
  }, [image]);

  useEffect(() => {
    if (file) {
      setVideo();
      setImage();
      setLinkPreview();
      setEmbed();
<<<<<<< HEAD
=======
      setGif();
>>>>>>> dev
    }
  }, [file]);

  useEffect(() => {
    if (linkPreview) {
      setVideo();
      setImage();
      setFile();
      setEmbed();
<<<<<<< HEAD
=======
      setGif();
>>>>>>> dev
    }
  }, [linkPreview]);

  useEffect(() => {
    if (embed) {
      setVideo();
      setImage();
      setFile();
      setLinkPreview();
<<<<<<< HEAD
=======
      setGif();
>>>>>>> dev
    }
  }, [embed]);

  useEffect(() => {
<<<<<<< HEAD
=======
    if (gif) {
      setVideo();
      setImage();
      setFile();
      setLinkPreview();
      setEmbed();
    }
  }, [gif]);

  useEffect(() => {
>>>>>>> dev
    if (!roles && !props.roleList.loading) {
      props.roleListActions.getRoleList();
    }
  }, []);

<<<<<<< HEAD
=======
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiInputRef.current &&
        !emojiInputRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
      if (gifInputRef.current && !gifInputRef.current.contains(event.target)) {
        setShowGiphyPicker(false);
      }
    };

    if (emojiInputRef.current || gifInputRef.current) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showEmojiPicker, showGiphyPicker]);

>>>>>>> dev
  const resetFormState = () => {
    setSelectedRadioButton(fullVisibility);
    setVisibilityAll(true);
  };

  const handleSubmitForm = (model) => {
    const { url, title, image, site_name } = linkPreview || {};
<<<<<<< HEAD
=======
    const gifUrl = gif ? _.get(gif, 'images.fixed_height.url', null) : null;
>>>>>>> dev
    if (teamId || teamGroupId || visibilityAll) {
      onSubmit(
        Object.assign(
          {},
          model,
          {
            visibility: {
              team: selectedFromParamsTeam,
              team_group: selectedFromParamsTeamGroup,
              role: role,
              all: visibilityAll,
            },
          },
          {
            link_preview: linkPreview ? { url, title, image, site_name } : null,
<<<<<<< HEAD
=======
            gif: gifUrl,
>>>>>>> dev
          }
        )
      );
    }
    resetFormState();
  };
  const updateVisibility = (isVisible) => {
    setVisibleOptions(isVisible);
  };

  const onTextChange = (value) => {
<<<<<<< HEAD
    setDescription(value);
    regexCheck(value);
=======
    const newValue = value || '';
    setDescription(newValue);
    regexCheck(newValue);
>>>>>>> dev
  };

  const onSubmitTeamAndTeamGroup = (
    selectedDataTeamGroup,
    selectedDataTeam,
    teamId,
    teamGroupId,
    isFullVisibilitySelected,
    role
  ) => {
    setSelectedFromParamsTeamGroup(selectedDataTeamGroup);
    setSelectedFromParamsTeam(selectedDataTeam);

    setTeamId(teamId);
    setTeamGroupId(teamGroupId);

    setVisibilityAll(isFullVisibilitySelected);

    setRole(role);
  };

  const handleRadioButtonChange = (value) => {
    setSelectedRadioButton(value);
  };

  const getRoleNameById = (roleId) => {
    return intl.formatMessage({
      id: `roles.${roles.find((r) => r.id === parseInt(roleId))?.code}`,
    });
  };

<<<<<<< HEAD
=======
  const onEmojiClick = (emojiObject, event) => {
    const currentDescription = description || '';
    const position = parseInt(textFieldRef.current.selectionStart);
    const newDescription = `${currentDescription.slice(0, position)}${
      emojiObject.emoji || ''
    }${currentDescription.slice(position)}`;
    setDescription(newDescription);
    regexCheck(newDescription);
    setShowEmojiPicker(!showEmojiPicker);
  };

>>>>>>> dev
  return (
    <div>
      {dialogOpen && (
        <Dialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          classes={{
            paper: isMobile
              ? ''
              : visibleOptions
              ? classes.dialogParams
              : classes.dialog,
          }}
        >
          <DialogTitle
            onClose={() => {
              setDialogOpen(false);
              setVisibleOptions(false);
            }}
          >
            {visibleOptions ? (
              <DialogTitle>
                {intl.formatMessage({ id: 'newsfeed.post_settings' })}
              </DialogTitle>
            ) : (
              title
            )}
          </DialogTitle>
          <DialogContent style={{ position: 'relative' }}>
            <Grid container spacing={2} style={{ margin: 0, width: '100%' }}>
              {visibleOptions ? (
                <PostFormDialogParams
                  post={post}
                  teamGroup={selectedFromParamsTeamGroup}
                  team={selectedFromParamsTeam}
                  updateVisibility={updateVisibility}
                  onSubmitTeamAndTeamGroup={onSubmitTeamAndTeamGroup}
                  selectedRadioButton={selectedRadioButton}
                  onRadioButtonChange={handleRadioButtonChange}
                />
              ) : (
                <>
                  <Grid item xs={12}>
                    <Grid
                      className={classes.titleContainer}
                      container
                      spacing={2}
                      onClick={handleOpenOptions}
                    >
                      <Grid item>
                        {!post ? (
                          <Avatar
                            src={account.photo}
                            fallbackName={account.fullname}
                          />
                        ) : (
                          <Avatar
                            src={post.author.photo}
                            fallbackName={post.author.fullname}
                          />
                        )}
                      </Grid>
                      <Grid item xs container direction='column'>
                        <Grid container>
                          <Grid item>
                            <DefaultText lowercase style={{ fontSize: 16 }}>
                              {!post ? account.fullname : post.author.fullname}
                            </DefaultText>
                          </Grid>
                          <Grid item>
                            <FontAwesomeIcon
                              size='xs'
                              icon={faChevronDown}
                              style={{
                                marginLeft: 5,
                                fontSize: 11,
                                fontWeight: 'bold',
                              }}
                            />
                          </Grid>
                          {!visibilityAll && role != null && (
                            <Grid item style={{ marginLeft: 5 }}>
                              <Tooltip
                                title={intl
                                  .formatMessage({
                                    id: 'newsfeed.post_visibility_role_tooltip',
                                  })
                                  .format(getRoleNameById(role))}
                              >
                                <BlueText>
                                  <FontAwesomeIcon icon={faInfoCircle} />
                                </BlueText>
                              </Tooltip>
                            </Grid>
                          )}
                        </Grid>
                        {account.title && (
                          <Grid item style={{ marginBottom: 5 }}>
                            <DefaultText lowercase style={{ fontSize: 12 }}>
                              {account.title}
                            </DefaultText>
                          </Grid>
                        )}
                        <Grid item style={{ marginBottom: 5 }}>
                          <div className={classes.filterChips}>
                            <DefaultText
                              lowercase
                              style={{ fontSize: 12, marginRight: 5 }}
                            >
                              {intl.formatMessage({
                                id: 'newsfeed.share_button',
                              })}{' '}
                              :
                            </DefaultText>

                            {selectedFromParamsTeamGroup?.name &&
                              selectedFromParamsTeamGroup?.id !== 1 &&
                              !visibilityAll && (
                                <Chip
                                  size='small'
                                  label={selectedFromParamsTeamGroup.name}
                                  style={{ borderColor: '#333' }}
                                  variant='outlined'
                                  className={classes.filterChip}
                                />
                              )}
                            {selectedRadioButton === fullVisibility ||
                            selectedFromParamsTeamGroup?.id === 1 ? (
                              <Chip
                                size='small'
                                label={fullVisibility}
                                style={{ borderColor: '#333' }}
                                variant='outlined'
                                className={classes.filterChip}
                              />
                            ) : (
                              (isManager || isCollaborator) && (
                                <Chip
                                  size='small'
                                  label={intl.formatMessage({
                                    id: 'filter.my_team_label',
                                  })}
                                  style={{
                                    borderColor: account.team.color.hex,
                                  }}
                                  variant='outlined'
                                  className={classes.filterChip}
                                />
                              )
                            )}
                            {!visibilityAll && selectedFromParamsTeam?.name ? (
                              <Chip
                                size='small'
                                label={selectedFromParamsTeam?.name}
                                style={{
                                  borderColor:
                                    _.get(
                                      selectedFromParamsTeam,
                                      'color.hex'
                                    ) || selectedFromParamsTeam.color,
                                }}
                                variant='outlined'
                                className={classes.filterChip}
                              />
                            ) : (
                              ''
                            )}
                          </div>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Formsy onValidSubmit={handleSubmitForm}>
                      <input
                        accept='image/*'
                        type='file'
                        onChange={(e) => setImage(e.target.files[0])}
                        ref={imageInput}
                        style={{ display: 'none' }}
                      />
                      <HiddenInput
                        name='image'
                        value={image}
                        style={{ margin: 0 }}
                      />

                      <input
                        accept='video/*'
                        type='file'
                        onChange={(e) => setVideo(e.target.files[0])}
                        ref={videoInput}
                        style={{ display: 'none' }}
                      />
                      <HiddenInput
                        name='video'
                        value={video}
                        style={{ margin: 0 }}
                      />

                      <input
                        accept='*'
                        type='file'
                        onChange={(e) => setFile(e.target.files[0])}
                        ref={fileInput}
                        style={{ display: 'none' }}
                      />
                      <HiddenInput
                        name='file'
                        value={file}
                        style={{ margin: 0 }}
                      />
                      <HiddenInput
                        name='embed'
                        value={embed}
                        style={{ margin: 0 }}
                      />
<<<<<<< HEAD
=======
                      <HiddenInput
                        name='gif'
                        value={gif}
                        style={{ margin: 0 }}
                      />
>>>>>>> dev
                      <Grid container spacing={2}>
                        <Grid
                          item
                          xs={12}
                          style={{
                            paddingBottom: 80,
                            minHeight: 120,
                            // maxHeight: isMobile ? 600 : 300,
                            maxHeight: 600,

                            overflowY: 'auto',
                          }}
                        >
                          <TextField
                            lowercase
                            name='description'
                            initial={description}
                            updateInitial
                            className={classes.textField}
                            multiline
                            onChange={onTextChange}
                            placeholder={intl.formatMessage({
                              id: 'newsfeed.post_content_placeholder',
                            })}
                            autoFocus
<<<<<<< HEAD
                          />
                          {(image || video || file || linkPreview || embed) && (
=======
                            inputRef={textFieldRef}
                          />
                          {(image ||
                            video ||
                            file ||
                            linkPreview ||
                            embed ||
                            gif) && (
>>>>>>> dev
                            <Grid item xs={12} style={{ position: 'relative' }}>
                              <IconButton
                                size='medium'
                                onClick={() => {
                                  setImage();
                                  setVideo();
                                  setFile();
                                  setLinkPreview();
                                  setEmbed();
<<<<<<< HEAD
=======
                                  setGif();
>>>>>>> dev
                                }}
                                className={classes.mediaCloseIcon}
                                style={{
                                  position: 'absolute',
                                  top: 0,
                                  right: 0,
                                }}
                              >
                                <FontAwesomeIcon icon={faTimes} />
                              </IconButton>
                              {image && (
                                <img
                                  src={
                                    typeof image === 'string'
                                      ? image
                                      : URL.createObjectURL(image)
                                  }
                                  style={{ width: '100%' }}
                                />
                              )}
                              {video && (
                                <Grid item xs={12}>
                                  <video width='100%' controls>
                                    <source
                                      src={
                                        typeof video === 'string'
                                          ? video
                                          : URL.createObjectURL(video)
                                      }
                                      type='video/mp4'
                                    />
                                  </video>
                                </Grid>
                              )}
                              {file && (
                                <Grid item xs={12}>
                                  <div
                                    style={{
                                      borderRadius: 5,
                                      overflow: 'hidden',
                                    }}
                                  >
                                    <LinkPreview
                                      openGraph={{
                                        title:
                                          _.get(file, 'name') ||
                                          _.last(file.split('/')),
                                      }}
                                    />
                                  </div>
                                </Grid>
                              )}
                              {linkPreview && (
                                <Grid item xs={12}>
                                  <div
                                    style={{
                                      borderRadius: 5,
                                      overflow: 'hidden',
                                    }}
                                  >
                                    <LinkPreview openGraph={linkPreview} />
                                  </div>
                                </Grid>
                              )}
                              {embed && (
                                <Grid item xs={12}>
                                  <iframe
                                    width='100%'
                                    height='315'
                                    src={embed}
                                    frameBorder='0'
                                    allowFullScreen
                                  />
                                </Grid>
                              )}
<<<<<<< HEAD
=======
                              {gif && (
                                <Grid
                                  item
                                  xs={12}
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                  }}
                                >
                                  <img
                                    src={
                                      typeof gif === 'string'
                                        ? gif
                                        : _.get(gif, 'images.fixed_height.url')
                                    }
                                    alt='gif'
                                    style={{ width: '100%' }}
                                  />
                                </Grid>
                              )}
>>>>>>> dev
                            </Grid>
                          )}
                        </Grid>
                        {openGraphLoading && (
                          <Grid item xs={12}>
                            <Loader centered />
                          </Grid>
                        )}

                        <Grid
                          item
                          xs={12}
                          style={{
                            padding: 0,
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            backgroundColor: 'white',
                          }}
                        >
                          <Grid
                            container
                            spacing={1}
                            alignItems='center'
                            justifyContent='space-between'
                            direction='column'
                          >
                            <Grid item xs>
                              <Grid
                                container
                                spacing={1}
                                alignItems='flex-start'
                              >
<<<<<<< HEAD
=======
                                {isDesktop && (
                                  <Grid item>
                                    <IconButton
                                      size='medium'
                                      onClick={openEmojiInput}
                                      className={classes.iconButton}
                                      ref={emojiIconRef}
                                    >
                                      <FontAwesomeIcon icon={faLaughBeam} />
                                    </IconButton>
                                  </Grid>
                                )}
                                <Grid item ref={gifIconRef}>
                                  <IconButton
                                    size='medium'
                                    onClick={openGifPicker}
                                    className={classes.iconButton}
                                  >
                                    <GifBoxIcon fontSize='large' />
                                  </IconButton>
                                </Grid>
>>>>>>> dev
                                <Grid item>
                                  <IconButton
                                    size='medium'
                                    onClick={openImageInput}
                                    className={classes.iconButton}
                                  >
                                    <FontAwesomeIcon icon={faImage} />
                                  </IconButton>
                                </Grid>
                                <Grid item>
                                  <IconButton
                                    size='medium'
                                    onClick={openVideoInput}
                                    className={classes.iconButton}
                                  >
                                    <FontAwesomeIcon icon={faPlayCircle} />
                                  </IconButton>
                                </Grid>
                                <Grid item>
                                  <IconButton
                                    size='medium'
                                    onClick={openFileInput}
                                    className={classes.iconButton}
                                  >
                                    <FontAwesomeIcon icon={faPaperclip} />
                                  </IconButton>
                                </Grid>
                                <Grid item>
                                  <IconButton
                                    size='medium'
                                    onClick={() =>
                                      setEmbed(
                                        window.prompt(
                                          intl.formatMessage({
                                            id: 'newsfeed.embed_prompt',
                                          })
                                        )
                                      )
                                    }
                                    className={classes.iconButton}
                                  >
                                    <FontAwesomeIcon icon={faCode} />
                                  </IconButton>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item>
                              <ProgressButton
                                type='submit'
                                loading={creationLoading}
                                text={intl.formatMessage({
                                  id: 'common.submit',
                                })}
                                disabled={!description}
                              />
                            </Grid>
                          </Grid>
                        </Grid>
<<<<<<< HEAD
=======
                        <Grid
                          item
                          style={{
                            position: 'fixed',
                            top: 225,
                            left: 503,
                          }}
                        >
                          {showEmojiPicker && (
                            <Grid
                              item
                              style={{
                                position: 'fixed',
                                top: positions.emoji.top - 300,
                                left: positions.emoji.left - 105,
                              }}
                              ref={emojiInputRef}
                            >
                              <EmojiPicker
                                // reactionsDefaultOpen
                                searchDisabled={true}
                                previewConfig={{ showPreview: false }}
                                width={250}
                                height={300}
                                onEmojiClick={onEmojiClick}
                              />
                            </Grid>
                          )}
                        </Grid>
                        {showGiphyPicker && (
                          <Grid
                            item
                            xs={12}
                            style={{
                              position: 'fixed',
                              top: isMobile ? '190px' : positions.gif.top - 365,
                              left: isMobile
                                ? '30px'
                                : positions.gif.left - 110,
                              zIndex: 1000,
                            }}
                            ref={gifInputRef}
                          >
                            <ReactGiphySearchbox
                              apiKey={gifApiKey}
                              onSelect={(item) => {
                                setGif(item);
                                setShowGiphyPicker(false);
                              }}
                            />
                          </Grid>
                        )}
>>>>>>> dev
                      </Grid>
                    </Formsy>
                  </Grid>
                </>
              )}
            </Grid>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

const mapStateToProps = ({ accountDetail, roleList }) => ({
  accountDetail,
  roleList,
});

const mapDispatchToProps = (dispatch) => ({
  roleListActions: bindActionCreators(roleListActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withWidth()(PostFormDialog)));
