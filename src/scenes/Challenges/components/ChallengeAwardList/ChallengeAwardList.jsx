import React from 'react'
import {connect} from 'react-redux'
import {Grid, IconButton} from '@material-ui/core'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {DefaultTitle} from "../../../../components/Common/components/Texts/components/DefaultTitle";
import {Card} from "../../../../components/Common/components/Card";
import {DefaultText} from "../../../../components/Common/components/Texts/components/DefaultText";
import {HiddenInput} from "../../../../components/Common/components/Inputs/components/HiddenInput";
import {Select} from "../../../../components/Common/components/Inputs/components/Select";
import {TextField} from "../../../../components/Common/components/Inputs/components/TextField";
import {uuidv4} from '../../../../helpers/UUIDHelper'

const ChallengeAwardList = ({initialAwards = [], awardTypes, initialAwardTypeId = null, challengeTypeCode, readonly, ...props}) => {
    const getInitialAwards = () => {
        if (initialAwards && initialAwards.length > 0) {
            return initialAwards.map(x => ({key: uuidv4(), points: x.points}))
        } else {
            return [{key: uuidv4(), points: null}]
        }
    };

    const maxAwardTypeId = awardTypes[0].id;
    const finalInitialAwardTypeId = initialAwardTypeId ? initialAwardTypeId : maxAwardTypeId;
    const [awardType, setAwardType] = React.useState(finalInitialAwardTypeId);
    const [awards, setAwards] = React.useState(getInitialAwards);
    const participantName = challengeTypeCode == 'CT' ? 'équipe' : 'joueur';
    const isMaxAward = awardType == maxAwardTypeId;
    const {points, loading} = props.challengeTypeUsablePoints;
    const usablePoints = points ? (!isMaxAward ? points.all : points.participant) : 0;

    const onAddClick = () => {
        setAwards(x => x.concat([{key: uuidv4(), points: null}]))
    };

    const onAwardTypeChange = (type) => {
        setAwardType(type);
        setAwards(x => x.filter(y => x.indexOf(y) == 0))
    };

    const onRemoveClick = (key) => {
        setAwards(x => x.filter(y => y.key != key))
    };

    return (
        <div>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item>
                            <DefaultTitle>Récompenses</DefaultTitle>
                        </Grid>
                        {!isMaxAward && <Grid item>
                            <IconButton size='small' onClick={onAddClick}>
                                <FontAwesomeIcon size='xs' icon={faPlus} />
                            </IconButton>
                        </Grid>}
                    </Grid>

                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                { loading && <DefaultText>Calcul des pts utilisables...</DefaultText> }
                                { !loading && <DefaultText>{usablePoints} pts utilisables</DefaultText> }
                                <HiddenInput name='usablePoints' value={usablePoints} />
                            </Grid>
                            <Grid item xs={3}>
                                <Select name='awardType' label='Type' options={awardTypes} initial={finalInitialAwardTypeId} emptyDisabled onChange={onAwardTypeChange} optionValueName='id' optionTextName='name' fullWidth required disabled={readonly}
                                        validationErrors={{isDefaultRequiredValue: 'Ce champ est requis.'}}
                                />
                            </Grid>
                            {awards.map((award, index) => {
                                const number = index + 1;
                                const label = isMaxAward ? `Maximum / ${participantName}` : `Gain ${participantName} #${number}`;
                                const validations = isMaxAward ? 'isLessThanOrEquals:usablePoints' : 'isRankingValid';
                                const validationErrors = isMaxAward ? {isDefaultRequiredValue: 'Ce champ est requis.', isLessThanOrEquals: 'La récompense est trop élevée',} : {isDefaultRequiredValue: 'Ce champ est requis.', isRankingValid: 'La récompense est trop élevée'};
                                return (
                                    <Grid key={award.key} item xs={3}>
                                        <Grid container spacing={1} alignItems='flex-end'>
                                            <Grid item xs>
                                                <TextField name={`award[${index}]`} label={label} fullWidth required initial={award.points}
                                                           validations={validations}
                                                           validationErrors={validationErrors}
                                                />
                                            </Grid>
                                            {!isMaxAward && awards.length > 1 && <Grid item>
                                                <IconButton size='small' onClick={() => onRemoveClick(award.key)}>
                                                    <FontAwesomeIcon icon={faTrashAlt} />
                                                </IconButton>
                                            </Grid>}
                                        </Grid>
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
};

const mapStateToProps = ({challengeTypeUsablePoints}) => ({
    challengeTypeUsablePoints
});

export default connect(mapStateToProps)(ChallengeAwardList)
