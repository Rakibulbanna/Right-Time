const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploaded_file");
  },
  filename: (req, file, cb) => {
    // const fileExtension = path.extname(file.originalname);
    // const fileName = file.originalname.replace(fileExtension, "").toLowerCase().split(" ").join("-") + Date.now();
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 15,
  },
  fileFilter: (req, file, cb) => {
    console.log(file)
    if (file.fieldname === "photoURL" || file.fieldname === "images" || file.fieldname === "gallery" || file.fieldname === "avater_1" || file.fieldname === "avater_2") {
      if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/png"
      ) {
        cb(null, true);
      } else {
        cb(new Error("only jpg, png, jpeg file allowed !!"));
      }
    } else if (file.fieldname === "doc") {
      if (file.mimetype === "application/pdf") {
        cb(null, true);
      } else {
        cb(new Error("only pdf file allowed !!"));
      }
    } else {
      cb(new Error("There was an unknown error !!"));
    }
  },
});

module.exports = upload;