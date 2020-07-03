Date.prototype.getQuarterNumber = function() {
    var month = this.getMonth() + 1;
    return (Math.ceil(month / 3));
};

Date.prototype.getSemesterNumber = function() {
    const s1Start = Date.UTC(this.getFullYear(), 0, 1);
    const s1End = Date.UTC(this.getFullYear(), 5, 30);

    if (s1Start <= this && this <= s1End) {
        return 1
    } else {
        return 2
    }
};

Date.prototype.toUTCJSON = function() {
    const date = new Date(this.getTime());
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return date.toJSON()
};

Date.prototype.toUTCJSON2 = function() {
    const date = new Date(this.getTime())
    return date.toJSON()
}

Date.prototype.getWeekNumber = function() {
    var d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
    var dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    return Math.ceil((((d - yearStart) / 86400000) + 1)/7)
};

export const getDifferenceWithToday = (date) => {
    const day = 24 * 60 * 60 * 1000;
    const now = new Date();
    const target = new Date(date * 1000);
    now.setHours(0, 0, 0, 0);
    target.setMinutes(target.getMinutes() + target.getTimezoneOffset());
    target.setHours(0, 0, 0, 0);
    return Math.round((now.getTime() - target.getTime()) / day);
};

export const getWeeksOfYear = () => {
    const year = new Date().getFullYear();
    const lastYear = new Date(year, 11, 31);
    var weeks = lastYear.getWeekNumber();
    if (weeks == 1) {
        lastYear.setDate(lastYear.getDate() - lastYear.getDay());
        weeks = lastYear.getWeekNumber()
    }
    return weeks
};

export const getStartDateOfWeek = (week, year) => {
    var date, numOfdaysPastSinceLastMonday, startDate;
    date = new Date('' + year + '');
    numOfdaysPastSinceLastMonday = date.getDay() - 1;
    date.setDate(date.getDate() - numOfdaysPastSinceLastMonday);
    date.setDate(date.getDate() + (7 * (week - date.getWeekNumber())));
    startDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    return startDate
};
