const express = require('express');

const router = express.Router();

const Spends = require('../models/spends');

router.post('/create', (req, res) => {
  if (req.user) {
    const type = 'spends';
    const spend = new Spends({
      ...req.body,
      userID: req.user.userID,
    });
    spend
      .save()
      .then(spends => res.json({ type, spends }))
      .catch(err => console.error(err));
  }
});

router.get('/fatch', (req, res) => {
  if (req.user) {
    const type = 'spends';
    Spends.find({
      userID: req.user.userID,
    })
      .then(spends => res.json({ type, spends }))
      .catch(err => console.error(err));
  }
});

router.post('/edit', (req, res) => {
  if (req.user) {
    const type = 'spends';
    const spends = req.body;
    Spends.updateOne(
      // eslint-disable-next-line no-underscore-dangle
      { _id: spends._id, userID: req.user.userID },
      { $set: spends },
    )
      .then(res.json({ type, spends }))
      .catch(err => console.error(err));
  }
});

router.post('/delete', (req, res) => {
  if (req.user) {
    const type = 'spends';
    const spends = req.body;
    // eslint-disable-next-line no-underscore-dangle
    Spends.deleteOne({ userID: req.user.userID, _id: req.body._id })
      .then(res.json({ type, spends }))
      .catch(err => console.error(err));
  }
});

module.exports = router;
