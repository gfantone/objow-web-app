import * as Formsy from 'formsy-react'

Formsy.addValidationRule('isRankingValid', function (values, value, condition) {
    return Number(values['usablePoints']) >= Number(values['award[0]']) + Number(values['award[1]']) + Number(values['award[2]'])
})