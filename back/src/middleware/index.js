const authJwt = require("./Auth/authJwt.middleware");
const upload = require("./Upload/upload.middleware");

module.exports = {
    authJwt,
    upload,
};
