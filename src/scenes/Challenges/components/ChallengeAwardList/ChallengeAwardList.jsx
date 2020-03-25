import React from 'react'
import {Grid} from '@material-ui/core'
import {DefaultTitle} from "../../../../components/Common/components/Texts/components/DefaultTitle";
import {Card} from "../../../../components/Common/components/Card";
import {DefaultText} from "../../../../components/Common/components/Texts/components/DefaultText";
import {HiddenInput} from "../../../../components/Common/components/Inputs/components/HiddenInput";
import {Select} from "../../../../components/Common/components/Inputs/components/Select";
import {TextField} from "../../../../components/Common/components/Inputs/components/TextField";

const ChallengeAwardList = ({awards = [], awardTypes, initialAwardTypeId = null, challengeTypeCode, readonly, usablePoints, usablePointsLoading, ...props}) => {
    const maxAwardTypeId = awardTypes[0].id;
    const finalInitialAwardTypeId = initialAwardTypeId ? initialAwardTypeId : maxAwardTypeId;
    const [awardType, setAwardType] = React.useState(finalInitialAwardTypeId);
    const participantName = challengeTypeCode == 'CT' ? 'équipe' : 'joueur';
    const isMaxAward = awardType == maxAwardTypeId;
    const hasAwards = awards && awards.length > 0;

    const onAwardTypeChange = (type) => {
        setAwardType(type)
    };

    return (
        <div>
            Hello
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <DefaultTitle>Récompenses</DefaultTitle>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                { usablePointsLoading && <DefaultText>Calcul des pts utilisables...</DefaultText> }
                                { !usablePointsLoading && <DefaultText>{usablePoints} pts utilisables</DefaultText> }
                                <HiddenInput name='usablePoints' value={usablePoints} />
                            </Grid>
                            <Grid item xs={3}>
                                <Select name='awardType' label='Type' options={awardTypes} initial={finalInitialAwardTypeId} emptyDisabled onChange={onAwardTypeChange} optionValueName='id' optionTextName='name' fullWidth required disabled={readonly}
                                        validationErrors={{isDefaultRequiredValue: 'Ce champ est requis.'}}
                                />
                            </Grid>
                            { isMaxAward && <Grid item xs={3}>
                                <TextField name='award[0]' label={`Maximum / ${participantName}`} fullWidth required initial={hasAwards ? awards[0].points : null}
                                           validations='isLessThanOrEquals:usablePoints'
                                           validationErrors={{
                                               isDefaultRequiredValue: 'Ce champ est requis.',
                                               isLessThanOrEquals: 'La récompense est trop élevée'
                                           }}
                                />
                            </Grid> }
                            { !isMaxAward && <Grid item xs={3}>
                                <TextField name='award[0]' label={`Gain ${participantName} #1`} fullWidth required initial={hasAwards ? awards[0].points : null}
                                           validations='isRankingValid'
                                           validationErrors={{
                                               isDefaultRequiredValue: 'Ce champ est requis.',
                                               isRankingValid: 'La récompense est trop élevée'
                                           }}
                                />
                            </Grid> }
                            { !isMaxAward && <Grid item xs={3}>
                                <TextField name='award[1]' label={`Gain ${participantName} #2`} fullWidth required initial={hasAwards ? awards[1].points : null}
                                           validations='isRankingValid'
                                           validationErrors={{
                                               isDefaultRequiredValue: 'Ce champ est requis.',
                                               isRankingValid: 'La récompense est trop élevée'
                                           }}
                                />
                            </Grid> }
                            { !isMaxAward && <Grid item xs={3}>
                                <TextField name='award[2]' label={`Gain ${participantName} #3`} fullWidth required initial={hasAwards ? awards[2].points : null}
                                           validations='isRankingValid'
                                           validationErrors={{
                                               isDefaultRequiredValue: 'Ce champ est requis.',
                                               isRankingValid: 'La récompense est trop élevée'
                                           }}
                                />
                            </Grid> }
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
};

export default ChallengeAwardList
