const express = require('express');
const moment = require('moment');

const router = express.Router();

const Spends = require('../models/spends');

router.post('/create', (req, res) => {
  if (req.user) {
    const spends = new Spends();
    spends.userID = req.user.userID;
    spends.goods = req.body.goods;
    spends.name = req.body.name;
    spends.price = req.body.price;
    spends
      .save()
      .then(res.json('success'))
      .catch(err => console.error(err));
  }
});

router.post('/fatch', (req, res) => {
  if (req.user) {
    const postDate = moment(req.body.date, 'YYYY/MM');
    const postDateStart = moment(postDate).startOf('month');
    const postDateEnd = moment(postDate).endOf('month');
    Spends.find({
      userID: req.user.userID,
      date: {
        $gte: postDateStart,
        $lte: postDateEnd,
      },
    })
      .then((spends) => {
        const results = spends.map(spend => ({
          // eslint-disable-next-line no-underscore-dangle
          ...spend._doc,
          date: moment(spend.date).format('YYYY/MM/DD'),
        }));
        res.json(results);
      })
      .catch(err => console.error(err));
  }
});

router.post('/edit', (req, res) => {
  if (req.user) {
    Spends.updateOne(
      // eslint-disable-next-line no-underscore-dangle
      { userID: req.user.userID, _id: req.body._id },
      { $set: req.body },
    )
      .then(res.json('success'))
      .catch(err => console.error(err));
  }
});

router.post('/delete', (req, res) => {
  if (req.user) {
    // eslint-disable-next-line no-underscore-dangle
    Spends.deleteOne({ userID: req.user.userID, _id: req.body._id })
      .then(res.json('success'))
      .catch(err => console.error(err));
  }
});

module.exports = router;
