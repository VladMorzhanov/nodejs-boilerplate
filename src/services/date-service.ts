module.exports = {
  convert: (d: any) =>
    d.constructor === Date
      ? d
      : d.constructor === Array
        ? new Date(d[0], d[1], d[2])
        : d.constructor === Number
          ? new Date(d)
          : d.constructor === String
            ? new Date(d)
            : typeof d === "object"
              ? new Date(d.year, d.month, d.date)
              : NaN,

  compare: (a: number, b: number) =>
    isFinite((a = this.convert(a).valueOf())) &&
    isFinite((b = this.convert(b).valueOf()))
      ? (a > b) - (a < b)
      : NaN,

  inRange: (d: Date, start: Date, end: Date) =>
    isFinite((d = this.convert(d).valueOf())) &&
    isFinite((start = this.convert(start).valueOf())) &&
    isFinite((end = this.convert(end).valueOf()))
      ? start <= d && d <= end
      : NaN
};
