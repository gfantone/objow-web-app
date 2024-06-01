import * as Formsy from 'formsy-react';

Formsy.addValidationRule('isTeamPointsValid', function (values) {
  const global = Number(values['global']) || 0;
  const goals = Number(values['goals']) || 0;
  const challenges = Number(values['challenges']) || 0;
  return global >= goals + challenges;
});
