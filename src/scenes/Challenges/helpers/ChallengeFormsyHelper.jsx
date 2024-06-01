import * as Formsy from 'formsy-react';

Formsy.addValidationRule('isRankingValid', function (values, value, condition) {
  var points = 0;
  var index = 0;
  while (index >= 0) {
    const currentValue = values[`awards[${index}]`];
    if (currentValue) {
      points += Number(currentValue);
      index++;
    } else {
      index = -1;
    }
  }
  return Number(values['usablePoints']) >= points;
});
