import * as Formsy from 'formsy-react'

Formsy.addValidationRule('isCollaboratorPointsValid', function (values) {
    const global = Number(values['global'])
    const goals = Number(values['goals'])
    const badges = Number(values['badges'])
    const managerChallenges = Number(values['managerChallenges'])
    const globalChallenges = Number(values['globalChallenges'])
    return global >= goals + badges + managerChallenges + globalChallenges
})