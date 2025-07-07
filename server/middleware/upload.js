const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, 'server/uploads'),
  filename: (_, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});

module.exports = multer({ storage });
