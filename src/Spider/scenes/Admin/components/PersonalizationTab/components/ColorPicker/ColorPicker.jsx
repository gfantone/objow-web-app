import React, {useState} from "react";
import {ColorButton} from "../../../../../../components/ColorButton";
import {ColorButtonGroup} from "../../../../../../components/ColorButtonGroup";
import {Button} from "../../../../../../components";
import {updateConfigKeyClear, updateConfigKeyStart} from "../../../../../../features/config/updateConfigs/slices";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import {Typography} from "@material-ui/core";
import {useIntl} from "react-intl";
import TextField from "../../../../../../components/TextField/TextField";
import Formsy from "formsy-react";
import useHandleToast from "../../../../../../hooks/UseHandleToast";

const styles = {
    mainColorBlock: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
    },
    actions: {
        display: 'flex',
        flexDirection: 'row',
        gap: '1rem',
        justifyContent: 'center',
        alignItems: 'center'
    }
}

const ColorPicker = ({ ...props }) => {
    const dispatch = useDispatch();
    const intl = useIntl();
    const params = useParams()

    const colors = ['#ee225cff', '#1e4bed', '#4f95e8', '#40a54a', '#edde00', '#fda013', '#fd4c00', '#fd1919', '#f987f4', '#763ada', '#1a1a1a']
    const useConfigs = useSelector(state => state.getConfigsKey);
    const updateConfigsKey = useSelector(state => state.updateConfigsKey);

    // todo: see if we need to create constant for the config codes -> 'CCPH' (to prevent hard coded string)
    // assume that the config code 'CCPH' exist in the list
    const configurationMainColor = (useConfigs.configs.find((config) => config.code === 'CCPH'))

    const [mainColor, setMainColor] = useState(configurationMainColor.value ?? '');

    useHandleToast(updateConfigsKey, dispatch, updateConfigKeyClear,
        'spider.hierarchy_node.platform_customization.mainColor.update.success',
        'spider.hierarchy_node.platform_customization.mainColor.update.error')

    const saveAppMainColor = () => {
        // todo: change teamGroupId to hierarchyNodeId
        dispatch(updateConfigKeyStart([
            { id: configurationMainColor.id, value: mainColor, teamGroupId: params.contract },
        ]))
    };

    return (
        <Formsy name={'main-color-admin'} onValidSubmit={saveAppMainColor} className={props.classes.mainColorBlock}>
            <Typography variant={'h2'} component={'h2'}>
                {intl.formatMessage({id: 'spider.hierarchy_node.platform_customization.mainColor.title'})}
            </Typography>
            <Typography variant={'body1'}>
                {intl.formatMessage({id: 'spider.hierarchy_node.platform_customization.mainColor.subtitle'})}
             </Typography>

            <div style={{display: 'flex', flexDirection: 'row', gap: '1rem', marginBottom: '1rem'}}>
                <TextField
                    name={'mainColor'}
                    value={mainColor}
                    label={intl.formatMessage({id: 'spider.hierarchy_node.platform_customization.mainColor.form.color'})}
                    variant={'outlined'}
                    size={'small'}
                    style={{ width: '20rem' }}
                    required
                    validationErrors={{
                        isDefaultRequiredValue: intl.formatMessage({
                            id: 'common.form.required_error',
                        })
                    }}
                    onChange={(e) => setMainColor(e.target.value)}
                />

                <ColorButton hexadecimalColor={mainColor} selected={mainColor && mainColor.length > 0 && colors.find(color => color === mainColor) === undefined}/>
            </div>

            <div>
                <ColorButtonGroup initialColor={mainColor} colors={colors} onSelectedColorChange={(color) => setMainColor(color)}/>
            </div>

            <div className={props.classes.actions}>
                <Button color={'primary'} variant={'contained'} size={'small'} type={'submit'}>
                    {intl.formatMessage({id: 'spider.hierarchy_node.platform_customization.mainColor.save_method.label'})}
                </Button>
            </div>
        </Formsy>
    )
}

export default withStyles(styles)(ColorPicker);
