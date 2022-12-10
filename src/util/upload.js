const multer = require("multer");
const path = require("path");

// home
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
    if (file.fieldname === "photoURL" ||
      file.fieldname === "images" ||
      file.fieldname === "gallery" ||
      file.fieldname === "avater_1" ||
      file.fieldname === "avater_2" ||
      file.fieldname === "imgUrl" ||
      file.filename === "coverPhoto") {
        
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

// About 
const Aboutstorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./About_file");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const AboutUpload = multer({
  storage: Aboutstorage,
  limits: {
    fileSize: 1024 * 1024 * 15,
  },
  fileFilter: (req, file, cb) => {
    console.log(file)
    if (file.fieldname === "imgUrl") {
      if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/png"
      ) {
        cb(null, true);
      } else {
        cb(new Error("only jpg, png, jpeg file allowed !!"));
      }
    } else {
      cb(new Error("There was an unknown error !!"));
    }
  },
});

// Industries
const IndustriesStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./Industries_upload");
  },
  filename: (req, file, cb) => {
    // const fileExtension = path.extname(file.originalname);
    // const fileName = file.originalname.replace(fileExtension, "").toLowerCase().split(" ").join("-") + Date.now();

    // cb(null, fileName + fileExtension);
    cb(null, file.originalname);
  },
});
const IndustriesUpload = multer({
  storage: IndustriesStorage,
  limits: {
    fileSize: 1024 * 1024 * 15,
  },
  fileFilter: (req, file, cb) => {
    console.log(file)
    if (file.fieldname === "coverPhoto") {
      if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/png"
      ) {
        cb(null, true);
      } else {
        cb(new Error("only jpg, png, jpeg file allowed !!"));
      }
    } else {
      cb(new Error("There was an unknown error !!"));
    }
  },
});

// Trainning 

// Assesment
const AssesmentStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./Trainnig/Assessment");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const AssesmentUpload = multer({
  storage: AssesmentStorage,
  limits: {
    fileSize: 1024 * 1024 * 15,
  },
  fileFilter: (req, file, cb) => {
    console.log(file)
    if (file.fieldname === "coverPhoto") {
      if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/png"
      ) {
        cb(null, true);
      } else {
        cb(new Error("only jpg, png, jpeg file allowed !!"));
      }
    } else {
      cb(new Error("There was an unknown error !!"));
    }
  },
});

// Customized
const CustomizedStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./Trainnig/Customized");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const CustomizedUpload = multer({
  storage: CustomizedStorage,
  limits: {
    fileSize: 1024 * 1024 * 15,
  },
  fileFilter: (req, file, cb) => {
    console.log(file)
    if (file.fieldname === "coverPhoto") {
      if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/png"
      ) {
        cb(null, true);
      } else {
        cb(new Error("only jpg, png, jpeg file allowed !!"));
      }
    } else {
      cb(new Error("There was an unknown error !!"));
    }
  },
});

// Management
const ManagementStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./Trainnig/Management");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const ManagementUpload = multer({
  storage: ManagementStorage,
  limits: {
    fileSize: 1024 * 1024 * 15,
  },
  fileFilter: (req, file, cb) => {
    console.log(file)
    if (file.fieldname === "coverPhoto") {
      if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/png"
      ) {
        cb(null, true);
      } else {
        cb(new Error("only jpg, png, jpeg file allowed !!"));
      }
    } else {
      cb(new Error("There was an unknown error !!"));
    }
  },
});

// Security
const SecurityStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./Trainnig/Security");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const SecurityUpload = multer({
  storage: SecurityStorage,
  limits: {
    fileSize: 1024 * 1024 * 15,
  },
  fileFilter: (req, file, cb) => {
    console.log(file)
    if (file.fieldname === "coverPhoto") {
      if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/png"
      ) {
        cb(null, true);
      } else {
        cb(new Error("only jpg, png, jpeg file allowed !!"));
      }
    } else {
      cb(new Error("There was an unknown error !!"));
    }
  },
});
// Services

// Auditing
const AuditingStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./Services/Auditing");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const AuditingUpload = multer({
  storage: AuditingStorage,
  limits: {
    fileSize: 1024 * 1024 * 15,
  },
  fileFilter: (req, file, cb) => {
    console.log(file)
    if (file.fieldname === "coverPhoto") {
      if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/png"
      ) {
        cb(null, true);
      } else {
        cb(new Error("only jpg, png, jpeg file allowed !!"));
      }
    } else {
      cb(new Error("There was an unknown error !!"));
    }
  },
});
// Certification
const CertificationStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./Services/Certification");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const CertificationUpload = multer({
  storage: CertificationStorage,
  limits: {
    fileSize: 1024 * 1024 * 15,
  },
  fileFilter: (req, file, cb) => {
    console.log(file)
    if (file.fieldname === "coverPhoto") {
      if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/png"
      ) {
        cb(null, true);
      } else {
        cb(new Error("only jpg, png, jpeg file allowed !!"));
      }
    } else {
      cb(new Error("There was an unknown error !!"));
    }
  },
});
// Consultation
const ConsultationStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./Services/Consultation");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const ConsultationUpload = multer({
  storage: ConsultationStorage,
  limits: {
    fileSize: 1024 * 1024 * 15,
  },
  fileFilter: (req, file, cb) => {
    console.log(file)
    if (file.fieldname === "coverPhoto") {
      if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/png"
      ) {
        cb(null, true);
      } else {
        cb(new Error("only jpg, png, jpeg file allowed !!"));
      }
    } else {
      cb(new Error("There was an unknown error !!"));
    }
  },
});
// SecurityTesting
const SecurityTestingStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./Services/SecurityTesting");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const SecurityTestingUpload = multer({
  storage: SecurityTestingStorage,
  limits: {
    fileSize: 1024 * 1024 * 15,
  },
  fileFilter: (req, file, cb) => {
    console.log(file)
    if (file.fieldname === "coverPhoto") {
      if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/png"
      ) {
        cb(null, true);
      } else {
        cb(new Error("only jpg, png, jpeg file allowed !!"));
      }
    } else {
      cb(new Error("There was an unknown error !!"));
    }
  },
});

module.exports = {
  upload,
  AboutUpload,
  IndustriesUpload,
  AssesmentUpload,
  CustomizedUpload,
  ManagementUpload,
  SecurityUpload,
  AuditingUpload,
  CertificationUpload,
  ConsultationUpload,
  SecurityTestingUpload
};