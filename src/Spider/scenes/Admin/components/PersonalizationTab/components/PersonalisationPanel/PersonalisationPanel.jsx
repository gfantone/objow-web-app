import React, {useState} from "react";
import {createTheme, withStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import {updateTeamGroupKeyClear, updateTeamGroupKeyStart} from "../../../../../../features/teamGroup/updateTeamGroup/slices";
import {EditableImage} from "../EditableImage";
import {useIntl} from "react-intl";
import {Typography} from "@material-ui/core";
import UseHelperLimitedLength from "../../../../../../hooks/UseHelperLimitedLength";
import TextField from "../../../../../../components/TextField/TextField";
import Formsy from "formsy-react";
import Button from "../../../../../../components/Button";
import useHandleToast from "../../../../../../hooks/UseHandleToast";
import {gradients} from "../../../../../../themes/colors";

const styles = {
    personalizedBlock: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
    },
    editableBlock: {
        display: 'flex',
        flexDirection: 'column',
        border: '#D4DCE6FF solid 2px',
        borderRadius: '1rem',
        overflow: 'clip'
    },
    editableFields: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        padding: '1rem',
        [createTheme().breakpoints.up('md')]: {
            flexDirection: 'row'
        },
    },
    banner: {
        minHeight: '10rem',
        height: '10rem'
    },
    logoSide: {
        display: 'flex',
        width: '100%',
        height: 'auto',
        flex: 12,
        [createTheme().breakpoints.up('md')]: {
            flex: 1
        }
    },
    logo: {
        margin: 'auto',
        width: '178px',
        height: '172px',
        borderRadius: '12px',
        borderColor: '#8596AD',
        border: '2px solid',
        overflow: 'clip'
    },
    textEdit: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        flex: 12,
        [createTheme().breakpoints.up('md')]: {
            flex: 11
        },
    },
    actions: {
        display: 'flex',
        flexDirection: 'row',
        gap: '1rem',
        justifyContent: 'center',
        alignItems: 'center'
    }
}

const PersonalisationPanel = ({...props}) => {
    const dispatch = useDispatch();
    const intl = useIntl();

    const useHelperLimitedLength = UseHelperLimitedLength();
    const maxTitleLength = 110;
    const maxDescriptionLength = 350;
    const CODE_LOGO = 'LOGO'
    const CODE_BANNER = 'BANNER'

    const useTeamGroup = useSelector(state => state.getTeamGroupKey);
    const updateTeamGroupKey = useSelector(state => state.updateTeamGroupKey);
    const systemFiles = useSelector(state => state.getSystemFilesKey);

    const [titleValue, setTitleValue] = useState(useTeamGroup.teamGroup.name ?? '');
    const [descriptionValue, setDescriptionValue] = useState(useTeamGroup.teamGroup.description ?? '');

    const [logoFile, setLogoFile] = useState(systemFiles.systemFiles.find((file) => file.code === CODE_LOGO) ?? null)
    const [bannerFile, setBannerFile] = useState(systemFiles.systemFiles.find((file) => file.code === CODE_BANNER) ?? null)

    useHandleToast(updateTeamGroupKey, dispatch, updateTeamGroupKeyClear,
        'spider.hierarchy_node.platform_customization.personalization.update.success',
        'spider.hierarchy_node.platform_customization.personalization.update.error')

    const saveAppPersonalization = () => {
        dispatch(updateTeamGroupKeyStart({
            teamGroup: {
                id: useTeamGroup.teamGroup.id,
                name: titleValue,
                description: descriptionValue
            }
        }))
    };

    const onImageUpdate = (imageUpdated) => {
        if (imageUpdated.code === CODE_LOGO) {
            setLogoFile(imageUpdated)
        } else if (imageUpdated.code === CODE_BANNER) {
            setBannerFile(imageUpdated)
        }
    }

    return (
        <Formsy name={'personalization-panel-admin'} onValidSubmit={saveAppPersonalization} className={props.classes.personalizedBlock}>
            <Typography variant={'h2'} component={'h2'}>
                {intl.formatMessage({id: 'spider.hierarchy_node.platform_customization.personalization.title'})}
            </Typography>

            <Typography variant={'body1'}>
                {intl.formatMessage({id: 'spider.hierarchy_node.platform_customization.personalization.subtitle'})}
            </Typography>

            <div className={props.classes.editableBlock}>
                <div className={props.classes.banner}>
                    <EditableImage imageData={bannerFile}
                                   code={CODE_BANNER}
                                   teamGroupId={useTeamGroup.teamGroup.id}
                                   title={intl.formatMessage({id: 'spider.hierarchy_node.platform_customization.personalization.rightDialogUploadTitleBanner'})}
                                   defaultColor={gradients.gradientLeftToRight100}
                                   altImage={intl.formatMessage({id: 'spider.imageAlt.banner'})}
                                   imageHeight={'100%'}
                                   imageWidth={''}
                                   onImageUpdate={onImageUpdate}
                    />
                </div>
                <div className={props.classes.editableFields}>
                    <div className={props.classes.logoSide}>
                        <div className={props.classes.logo}>
                            <EditableImage imageData={logoFile}
                                           code={CODE_LOGO}
                                           teamGroupId={useTeamGroup.teamGroup.id}
                                           title={intl.formatMessage({id: 'spider.hierarchy_node.platform_customization.personalization.rightDialogUploadTitleLogo'})}
                                           altImage={intl.formatMessage({id: 'spider.imageAlt.logo'})}
                                           imageWidth={'100%'}
                                           onImageUpdate={onImageUpdate}
                            />
                        </div>
                    </div>
                    <div className={props.classes.textEdit}>
                        <TextField
                            name={'title'}
                            value={titleValue}
                            label={intl.formatMessage({id: 'spider.hierarchy_node.platform_customization.personalization.form.title'})}
                            variant={'outlined'}
                            helperText={useHelperLimitedLength.getHelper(titleValue, maxTitleLength)}
                            required
                            validations={{
                                maxLength: maxTitleLength
                            }}
                            validationErrors={{
                                isDefaultRequiredValue: intl.formatMessage({
                                    id: 'common.form.required_error',
                                }),
                                maxLength: intl.formatMessage({
                                    id: 'common.form.max_length_custom_error',
                                }).format(maxTitleLength),
                            }}
                            onChange={(e) => setTitleValue(e.target.value)}
                        />
                        <TextField
                            name={'description'}
                            value={descriptionValue}
                            label={intl.formatMessage({id: 'spider.hierarchy_node.platform_customization.personalization.form.description'})}
                            variant={'outlined'}
                            helperText={useHelperLimitedLength.getHelper(descriptionValue, maxDescriptionLength)}
                            multiline
                            minRows={8}
                            required
                            validations={{
                                maxLength: maxDescriptionLength
                            }}
                            validationErrors={{
                                isDefaultRequiredValue: intl.formatMessage({
                                    id: 'common.form.required_error',
                                }),
                                maxLength: intl.formatMessage({
                                    id: 'common.form.max_length_custom_error',
                                }).format(maxDescriptionLength),
                            }}
                            onChange={(e) => setDescriptionValue(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className={props.classes.actions}>
                <Button color={'primary'} variant={'contained'} size={'small'} type={'submit'}>
                    {intl.formatMessage({id: 'spider.hierarchy_node.platform_customization.personalization.save_method.label'})}
                </Button>
            </div>
        </Formsy>
    )
}

export default withStyles(styles)(PersonalisationPanel);
