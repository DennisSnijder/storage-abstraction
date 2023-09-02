"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateName = exports.getProtocol = exports.parseMode = exports.parseIntFromString = exports.parseUrl = exports.parseQuerystring = void 0;
/**
 * @param: url
 *
 * strips off the querystring of an url and returns it as an object
 */
const parseQuerystring = (url) => {
    let options = {};
    const questionMark = url.indexOf("?");
    if (questionMark !== -1) {
        options = url
            .substring(questionMark + 1)
            .split("&")
            .map((pair) => pair.split("="))
            .reduce((acc, val) => {
            // acc[val[0]] = `${val[1]}`.valueOf();
            acc[val[0]] = val[1];
            return acc;
        }, {});
    }
    return options;
};
exports.parseQuerystring = parseQuerystring;
/**
 * @param url
 * Parses a url string into fragments and parses the query string into a
 * key-value object.
 */
const parseUrl = (url) => {
    if (url === "" || typeof url === "undefined") {
        throw new Error("please provide a configuration url");
    }
    const type = url.substring(0, url.indexOf("://"));
    let config = url.substring(url.indexOf("://") + 3);
    const at = config.indexOf("@");
    const questionMark = config.indexOf("?");
    const colon = config.indexOf(":");
    let part1 = "";
    let part2 = "";
    let part3 = "";
    let bucketName = "";
    // parse options
    const queryString = (0, exports.parseQuerystring)(url);
    if (questionMark !== -1) {
        config = config.substring(0, questionMark);
    }
    console.log("config", config);
    // get bucket name and region
    let bucketString = "";
    if (at !== -1) {
        bucketString = config.substring(at + 1);
        const slash = bucketString.indexOf("/");
        if (slash !== -1) {
            // Amazon S3 @region/bucket
            bucketName = bucketString.substring(slash + 1);
            part3 = bucketString.substring(0, slash);
        }
        else {
            bucketName = bucketString;
        }
        config = config.substring(0, at);
    }
    // get credentials
    if (colon !== -1) {
        [part1, part2] = config.split(":");
    }
    else {
        part1 = config;
    }
    // console.log(type, part1, part2, region, bucketName, queryString);
    return { type, part1, part2, part3, bucketName, queryString };
};
exports.parseUrl = parseUrl;
/**
 * @param s
 *
 * Parses a string that contains a radix prefix to a number
 *
 */
const parseIntFromString = (s) => {
    if (s.startsWith("0o")) {
        return parseInt(s, 8);
    }
    if (s.startsWith("0x") || s.startsWith("0X")) {
        return parseInt(s, 16);
    }
    if (s.startsWith("0b") || s.startsWith("0B")) {
        return parseInt(s, 2);
    }
    return parseInt(s);
};
exports.parseIntFromString = parseIntFromString;
const parseMode = (s) => {
    if (typeof s === "number") {
        if (s < 0) {
            throw new Error(`The argument 'mode' must be a 32-bit unsigned integer or an octal string. Received ${s}`);
        }
        return s;
    }
    if (s.startsWith("0o")) {
        return s.substring(2);
    }
    return s;
};
exports.parseMode = parseMode;
/**
 * @param: url
 *
 * strips off the protocol of an url and returns it
 */
const getProtocol = (url) => {
    return;
};
exports.getProtocol = getProtocol;
/**
 * @param name
 *
 * Checks if the value of the name is not null or undefined
 */
const validateName = (name) => {
    if (name === null) {
        // throw new Error("Can not use `null` as bucket name");
        return "Can not use `null` as bucket name";
    }
    if (name === "null") {
        return 'Can not use "null" as bucket name';
    }
    if (name === "undefined") {
        return 'Can not use "undefined" as bucket name';
    }
    if (name === "" || typeof name === "undefined") {
        // throw new Error("Please provide a bucket name");
        return "Please provide a bucket name";
    }
    return null;
};
exports.validateName = validateName;
/*
// not in use, keep for reference
export const getGCSProjectIdAsync = async (config: string): Promise<string> => {
  const data = await fs.promises.readFile(config).catch(e => {
    throw e;
  });
  const json = JSON.parse(data.toString("utf-8"));
  return json.project_id;
};

// not in use, keep for reference
export const readFilePromise = (path: string): Promise<Buffer> =>
  new Promise(function(resolve, reject) {
    fs.readFile(path, function(err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
*/
//# sourceMappingURL=util.js.map