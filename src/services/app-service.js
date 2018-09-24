const CustomError = require("../error/custom-error");
const { STATUS_CODES } = require("../constants");
const formidable = require("formidable");
const debug = require("debug")("main-server:server");
const os = require("os");
const request = Promise.promisify(require("request"));
Promise.promisifyAll(request);

const sendRequest = params => {
  // TODO: change to async\await
  new Promise((resolve, reject) => {
    request(params, (error, res, body) => {
      if (!error && res.statusCode === STATUS_CODES.SUCCESS) {
        try {
          return resolve(JSON.parse(body));
        } catch (e) {
          return resolve(body);
        }
      } else {
        if (res) {
          debug(
            "in send request status code = " +
              res.statusCode +
              " message = " +
              res.message
          );
        }
        if (!error) {
          try {
            return reject(new CustomError(JSON.parse(body)));
          } catch (e) {
            return reject(new CustomError(body));
          }
        }
        reject(error);
      }
    });
  });
};

const parseForm = req => {
  return new Promise((resolve, reject) => {
    let form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
      }
      if (!fields) {
        reject(new Error("No fields."));
      }
      if (!files) {
        reject(new Error("No files."));
      }
      resolve([fields, files]);
    });
  });
};

const printIP = () => {
  const ifaces = os.networkInterfaces();

  Object.keys(ifaces).forEach(function(ifname) {
    let alias = 0;

    ifaces[ifname].forEach(function(iface) {
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
  printIP
};
