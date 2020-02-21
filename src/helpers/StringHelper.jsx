import local from '../data/local/local'

String.prototype.toBoolean = function() {
    switch (this.toLowerCase()) {
        case 'true':
            return true
        case 'false':
            return false
        default:
            throw 'String is not a boolean'
    }
}

String.prototype.toDate = function() {
    return new Date(this * 1000)
}

String.prototype.toDate2 = function() {
    const date =  new Date(this * 1000)
    const timezoneOffset = date.getTimezoneOffset()
    date.setMinutes(date.getMinutes() + timezoneOffset)
    return date
}