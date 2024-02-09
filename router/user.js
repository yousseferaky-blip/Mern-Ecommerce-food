const express = require("express");
const userController = require("../controller/user");
const router = express.Router();
const multer = require("multer");
const cors = require("cors")
router.use(cors());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      const Ext =  file.mimetype.split("/")[1]
      const fileName = `user-${Date.now()}.${Ext}` 
      cb(null, fileName)
    }
  })

const fileFilter = (req, file, cb)=>{
    const imageType = file.mimetype.split("/")[0]
    if(imageType == "image"){
        return  cb(null,true)
    }else{
        const error = new Error('Invalid file type. Only images are allowed.');
        error.status = 400;
        return cb(error, false);
    }
}

const upload = multer({
    storage,
    fileFilter
})

router.post("/signup", upload.single("avatar"), userController.SignUp);
router.post("/signin",  userController.SignIn);
router.get("/logout",  userController.LogOut);

module.exports = router;
