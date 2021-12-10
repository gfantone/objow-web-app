import * as Formsy from 'formsy-react'

Formsy.addValidationRule('isRankingValid', function (values, value, condition) {
    var points = 0;
    var index = 0;
    while (index >= 0) {
        const currentValue = values[`awards[${index}]`];
        if (currentValue) {
            points += Number(currentValue);
            index++
        } else {
            index = -1
        }
    }
    return Number(values['usablePoints']) >= points
});


Formsy.addValidationRule('isRankingIncreasing', function (values, value, condition) {
    var lastPoints = 0;
    var index = 0;


    while (index >= 0) {
        const currentValue = values[`award[${index}]`];

        if (currentValue !== undefined) {
            if(index > 0) {
              if (Number(currentValue) > lastPoints) {
                return false
              }
            }
            lastPoints = Number(currentValue);
            index++
        } else {
            index = -1
        }
    }
    return true
});


Formsy.addValidationRule('isStepsIncreasing', function (values, value, condition) {
    var lastPoints = 0;
    var index = 0;

    while (index >= 0) {
        const currentValue = values[`awardTarget[${index}]`];
        if (currentValue !== undefined) {
            if(index > 0) {
              if (Number(currentValue) <= lastPoints) {
                return false
              }
            }
            lastPoints = Number(currentValue);
            index++
        } else {
            index = -1
        }
    }
    return true
});
