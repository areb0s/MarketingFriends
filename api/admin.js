const express = require('express');

const router = express.Router();

const User = require('../models/user');
const Sales = require('../models/sales');
const Spends = require('../models/spends');

router.post('/create', (req, res) => {
  if (req.user.admin) {
    const user = new User();
    user.userID = req.body.userID;
    user.userPW = req.body.userPW;
    user.userAKA = req.body.userAKA;
    user.admin = req.body.admin;
    user.save((err) => {
      if (err) {
        console.error(err);
        res.json({ result: 0 });
        return;
      }
      res.json({ result: 1 });
    });
  } else {
    res.redirect('/');
  }
});

router.get('/fatch', (req, res) => {
  if (req.user.admin) {
    User.find({})
      .then(user => res.json(user))
      .catch(err => console.error(err));
  }
});

router.get('/fatchall', (req, res) => {
  if (req.user.admin) {
    Sales.find({})
      .then(sales => Spends.find({})
          .then(spends => res.json({ sales, spends }))
          .catch(err => console.error(err)),)
      .catch(err => console.error(err));
  }
});

router.post('/edit', (req, res) => {
  if (req.user.admin) {
    User.updateOne(
      // eslint-disable-next-line no-underscore-dangle
      { _id: req.body._id },
      { $set: req.body },
    )
      .then(res.json('success'))
      .catch(err => console.error(err));
  }
});

router.post('/delete', (req, res) => {
  if (req.user.admin) {
    // eslint-disable-next-line no-underscore-dangle
    User.deleteOne({ _id: req.body._id })
      .then(res.json('success'))
      .catch(err => console.error(err));
  }
});

module.exports = router;
