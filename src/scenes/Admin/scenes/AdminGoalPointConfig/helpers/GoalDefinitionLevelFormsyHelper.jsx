import * as Formsy from 'formsy-react';

Formsy.addValidationRule(
  'isGoalDefinitionLevelValid',
  function (values, value, otherField) {
    if (!('usablePoints' in values)) {
      return true;
    }
    const usablePoints = values['usablePoints'];
    var maxPoints = 0;
    const pointNames = Object.keys(values).filter((x) =>
      x.startsWith('points'),
    );
    pointNames.map((pointName) => {
      const currentPoints = values[pointName];
      if (currentPoints && Number(currentPoints) > maxPoints) {
        maxPoints = Number(currentPoints);
      }
    });
    return usablePoints >= maxPoints;
  },
);
