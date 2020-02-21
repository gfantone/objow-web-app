import * as Formsy from 'formsy-react'

Formsy.addValidationRule('isTeamPointsValid', function (values) {
    const global = Number(values['global'])
    const goals = Number(values['goals'])
    const challenges = Number(values['challenges'])
    return global >= goals + challenges
})