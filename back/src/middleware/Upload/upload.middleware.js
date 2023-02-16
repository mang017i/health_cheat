const multer = require('multer');
const maxSize = 1024 * 1024 * 5; // 5MB
const util = require('util');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __basedir + '/public/images/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: maxSize,
  },
  fileFilter: fileFilter,
}).single("file");

const uploadFileMiddleware = util.promisify(upload);
module.exports = uploadFileMiddleware;
