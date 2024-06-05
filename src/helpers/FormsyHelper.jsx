import * as Formsy from 'formsy-react';
import _ from 'lodash';

Formsy.addValidationRule(
  'isConditionalRequired',
  function (values, value, condition) {
    return false;
  },
);

Formsy.addValidationRule(
  'isAlreadyUsedIn',
  function (values, value, array) {
    return array.find(item => item === value) === undefined;
  },
);

Formsy.addValidationRule('isLessThan', function (values, value, otherField) {
  const number = Number(otherField);
  if (!Number.isNaN(number)) {
    return Number(value) < number;
  } else if (otherField) {
    return Number(value) < Number(values[otherField]);
  } else {
    return true;
  }
});

Formsy.addValidationRule(
  'isLessThanOrEquals',
  function (values, value, otherField) {
    const number = Number(otherField);
    if (!Number.isNaN(number)) {
      return Number(value) <= number;
    } else if (otherField) {
      return Number(value) <= Number(values[otherField]);
    } else {
      return true;
    }
  },
);

Formsy.addValidationRule('isMoreThan', function (values, value, otherField) {
  const number = Number(otherField);
  if (!Number.isNaN(number)) {
    return Number(value) > number;
  } else if (otherField) {
    return Number(value) > Number(values[otherField]);
  } else {
    return true;
  }
});

Formsy.addValidationRule(
  'isMoreThanOrEquals',
  function (values, value, otherField) {
    const number = Number(otherField);
    if (!Number.isNaN(number)) {
      return Number(value) >= number;
    } else if (otherField) {
      return Number(value) >= Number(values[otherField]);
    } else {
      return true;
    }
  },
);

// Password validation

Formsy.addValidationRule(
  'hasLowercaseCharacter',
  function (values, value, otherField) {
    if (!value) {
      return true;
    }
    const regex = /(?=.*[a-z])/;
    return regex.test(value);
  },
);

Formsy.addValidationRule(
  'hasUppercaseCharacter',
  function (values, value, otherField) {
    if (!value) {
      return true;
    }
    const regex = /(?=.*[A-Z])/;

    return regex.test(value);
  },
);

Formsy.addValidationRule(
  'hasSpecialCharacter',
  function (values, value, otherField) {
    if (!value) {
      return true;
    }
    const regex = /(?=.*[^A-Za-z0-9])/;
    return regex.test(value);
  },
);

Formsy.addValidationRule(
  'hasDigitCharacter',
  function (values, value, otherField) {
    if (!value) {
      return true;
    }
    const regex = /(?=.*[0-9])/;
    return regex.test(value);
  },
);

Formsy.addValidationRule(
  'hasMoreCharactersThan',
  function (values, value, minimum) {
    if (!value) {
      return true;
    }
    const regex = new RegExp(`(?=.{${minimum},})`);
    return regex.test(value);
  },
);

Formsy.addValidationRule(
  'hasLessCharactersThan',
  function (values, value, maximum) {
    if (!value) {
      return true;
    }

    const regex = new RegExp(`^(?=.{1,${maximum}}$).*`);
    return regex.test(value);
  },
);

Formsy.addValidationRule('isNumeric', function (values, value, otherField) {
  if (!value) {
    return true;
  }

  return !isNaN(_.toString(value).replace(',', '.'));
});

Formsy.addValidationRule('isTrue', function (values, value, otherField) {
  return value == true;
});
