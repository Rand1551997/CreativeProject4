const express = require("express");
const mongoose = require('mongoose');
const router = express.Router();

const users = require("./users.js");
const User = users.model;
const validUser = users.valid;

const itemSchema = new mongoose.Schema({
  user: {
  type: mongoose.Schema.ObjectId,
  ref: 'User'
},
  title: String,
  path: String,
  description: String,
  author: String,
});

// Create a model for items in the museum.
const Item = mongoose.model('Item', itemSchema);

// Create a new item in the museum: takes a title and a path to an image.
router.post('/', validUser, async (req, res) => {
  const item = new Item({
    title: req.body.title,
    path: req.body.path,
    description: req.body.description,
    author: req.body.author,
    user: req.user,
  });
  console.log(item);
  try {
    await item.save();
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//delete
router.delete('/:id', validUser, async (req, res) => {
  try {
    await Item.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//edit
router.put('/:id', validUser, async (req, res) => {
  try {
    let item = await Item.findOne({
      _id: req.params.id
    });

    item.title = req.body.title;
    item.description = req.body.description;
    item.author = req.body.author;

    item.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.get('/', async (req, res) => {
  console.log("Get Route");
  try {
    let items = await Item.find().populate("user");
    res.send(items);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = {
  routes: router,
  model: Item,
};
