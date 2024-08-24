const multer = require("multer");

const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpeg",
    "image/png": "png"
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        console.log('Multer: Storing file in images directory');
        callback(null, "images");
    },
    filename: (req, file, callback) => {
        console.log('Multer: Generating filename');
        const name = file.originalname.split(" ").join("_").replace(/\.[^/.]+$/, "");
        const extension = MIME_TYPES[file.mimetype];
        const filename = name + '_' + Date.now() + '.' + extension;
        console.log('Generated filename:', filename);
        callback(null, filename);
    }
});

module.exports = multer({ storage }).single("image");
