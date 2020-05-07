const formatTime = time => {
  const sUnit = 1000;
  const mUnit = sUnit * 60;
  const hUnit = mUnit * 60;
  const dUnit = hUnit * 24;

  ret = ''

  d = Math.floor(time / dUnit);
  time %= dUnit;
  if (d) {
    ret += `${d}D`;
  }

  h = Math.floor(time / hUnit);
  time %= hUnit;
  if (ret.length || h) {
    ret += `${h}H`;
  }

  m = Math.floor(time / mUnit);
  time %= mUnit;
  if (ret.length || m) {
    ret += `${m}M`;
  }

  s = Math.ceil(time / sUnit);
  time %= sUnit;
  ret += `${s}S`;
  return ret;
};

const formatFullTime = time => {
  date = new Date(time);
  return date.toTimeString().split(' ')[0] + '@' + date.toLocaleDateString();
};

const utils = {
  formatTime,
  formatFullTime,
};

module.exports = utils;
