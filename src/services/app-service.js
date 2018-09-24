const CustomError = require("../error/custom-error");
const { STATUS_CODES } = require("../constants");
const debug = require("debug")("main-server:server");
const os = require("os");
const request = Promise.promisify(require("request"));
Promise.promisifyAll(request);

const sendRequest = async params => {
  const { res, body } = await request(params);

  if (res.statusCode === STATUS_CODES.SUCCESS) {
    try {
      return JSON.parse(body);
    } catch (e) {
      return body;
    }
  } else {
    return new CustomError(body);
  }
};

const printIp = () => {
  const ifaces = os.networkInterfaces();

  Object.keys(ifaces).forEach(ifname => {
    let alias = 0;
    ifaces[ifname].forEach(iface => {
      if (iface.family !== "IPv4" || iface.internal !== false) {
        return;
      }
      if (alias >= 1) {
        debug(ifname + ":" + alias, iface.address);
      } else {
        debug(ifname, iface.address);
      }
      ++alias;
    });
  });
};

module.exports = {
  sendRequest,
  parseForm,
  printIp
};
