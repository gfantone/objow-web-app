import * as Formsy from 'formsy-react'

Formsy.addValidationRule('isConditionalRequired', function (values, value, condition) {
    return false
})

Formsy.addValidationRule('isLessThan', function (values, value, otherField) {
    const number = Number(otherField)
    if (!Number.isNaN(number)) {
        return Number(value) < number
    } else if (otherField) {
        return Number(value) < Number(values[otherField]);
    } else {
        return true
    }
})

Formsy.addValidationRule('isLessThanOrEquals', function (values, value, otherField) {
    const number = Number(otherField)
    if (!Number.isNaN(number)) {
        return Number(value) <= number
    } else if (otherField) {
        return Number(value) <= Number(values[otherField]);
    } else {
        return true
    }
})

Formsy.addValidationRule('isMoreThan', function (values, value, otherField) {
    const number = Number(otherField)
    if (!Number.isNaN(number)) {
        return Number(value) > number
    } else if (otherField) {
        return Number(value) > Number(values[otherField]);
    } else {
        return true
    }
})

Formsy.addValidationRule('isMoreThanOrEquals', function (values, value, otherField) {
    const number = Number(otherField)
    if (!Number.isNaN(number)) {
        return Number(value) >= number
    } else if (otherField) {
        return Number(value) >= Number(values[otherField]);
    } else {
        return true
    }
})