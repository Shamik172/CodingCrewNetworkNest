
const multer = require('multer');

    const fileStorage = multer.diskStorage({
        destination: (req, file, cb) => cb(null, 'uploads'),
        filename: (req, file, cb) => cb(null,file.filename + '-' + file.originalname)
    });
    
    // const fileFilter = (req, file, cb) => {
    //     if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
    //         cb(null, true);
    //     } else {
    //         cb(null, false);        
    //     }
    // };

exports.upload = multer({
        fileStorage
    })