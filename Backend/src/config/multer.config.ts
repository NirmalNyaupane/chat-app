import multer from "multer";
import path from "path";

const setUpMulter = () => {
  const storageConfig = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./temp");
    },
    filename: function (req, file, cb) {
      //finding extension
      const ext = path.extname(file.originalname);
      const fileNameWithOutExtension = file.originalname.replace(ext, "");

      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, `${fileNameWithOutExtension}-${uniqueSuffix}${ext}`);
    },
  });

  const upload = multer({storage:storageConfig}).single("file")

  return {storageConfig, upload};
};

export {setUpMulter};