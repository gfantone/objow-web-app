import * as Formsy from 'formsy-react'

Formsy.addValidationRule('isCollaboratorPointsValid', function (values) {
    const global = Number(values['global']) || 0
    const goals = Number(values['goals']) || 0
    const badges = Number(values['badges']) || 0
    const managerChallenges = Number(values['managerChallenges']) || 0
    const globalChallenges = Number(values['globalChallenges']) || 0
    return global >= goals + badges + managerChallenges + globalChallenges
})
