const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const users = require("./users.js")
const items = require("./books.js");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// connect to the database
mongoose.connect('mongodb://localhost:27017/museum', {
  useNewUrlParser: true
});

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const cookieSession = require('cookie-session');
app.use(cookieSession({
  name: 'session',
  keys: [
    'secretValue'
  ],
  cookie: {
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Configure multer so that it will upload to '../front-end/public/images'
const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 10000000
  }
});

app.post('/api/photos', upload.single('photo'), async (req, res) => {
  console.log("api/photos ", req.file);
  // Just a safety check
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: "/images/" + req.file.filename
  });
});

app.use("/api/users", users.routes);
app.use("/api/items", items.routes);

app.listen(3040, () => console.log('Server listening on port 3040!'));
