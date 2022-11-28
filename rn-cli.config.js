// import blacklist from "metro-config/src/defaults/blacklist";
// export const resolver = {
//   blacklistRE: blacklist([/#current-cloud-backend\/.*/]),
// };
const blacklist = require('metro-config/src/defaults/blacklist');
module.exports = {
  resolver: {
    blacklistRE: blacklist()
  }
};