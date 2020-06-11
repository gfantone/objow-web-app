String.prototype.format = function() {
    var a = this;
    for (var k in arguments) {
        a = a.replace("{" + k + "}", arguments[k])
    }
    return a
}

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
