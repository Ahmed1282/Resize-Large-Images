const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');

const app = express();
const PORT = 3000;

upload_path = '/Users/ahmed.baig/Desktop/Practice/Task1/upload'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, upload_path); 
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); 
  }
});

const upload = multer({ storage });

app.post('/upload', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  const filePath = path.join(upload_path, req.file.filename);
  const sizes = [22000, 1080, 720, 512, 256]; 
  const originalFileName = req.file.filename;
  const name = path.parse(originalFileName).name;
  const ext = path.extname(originalFileName);

  res.send('Image uploaded and resized.');
  const promise = new Promise((resolve,reject) =>  {
    setTimeout( () => {
      resolve(true)
    }, 20000)
  });
 await promise;
 console.log("s")
  try {
    for (const size of sizes) {
      const outputPath = path.join(upload_path, `${name}-${size}${ext}`);
      await sharp(filePath)
        .resize(size)
        .toFile(outputPath);
        console.log(`File resized: ${outputPath}`)
    }
  } catch (error) {
    res.status(500).send('Error processing image.');
  }
});

// Default route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
