const {extname,resolve} = require('path')
const {diskStorage} = require('multer');
let destination = folder => (req, file, callback) => callback(null, resolve(__dirname,folder))
let filename = (req, file, callback) => callback(null, file.fieldname + '-' + Date.now() +extname(file.originalname));
const storage = folder => diskStorage({
    destination: destination(folder),
    filename: filename
});

module.exports = storage;