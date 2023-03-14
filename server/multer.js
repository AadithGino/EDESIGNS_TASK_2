const multer = require("multer");

 const storage = multer.diskStorage({
    destination: path.join(__dirname, './public/', 'uploads'),
    filename: function (req, file, cb) {   
        // null as first argument means no error
        cb(null, Date.now() + '-' + file.originalname )  
    }
})

module.exports - storage;