Number.prototype.toFullPercentage = function (digits = 0) {
  return Number(Number(this * 100).toFixed(digits));
};

Number.prototype.toPercentage = function (digits = 0) {
  return `${Number(this * 100).toFixed(digits)}%`;
};

Number.prototype.toDate = function () {
  return new Date(this * 1000);
};

Number.prototype.toDate2 = function () {
  const date = new Date(this * 1000);
  const timezoneOffset = date.getTimezoneOffset();
  date.setMinutes(date.getMinutes() + timezoneOffset);
  return date;
};
