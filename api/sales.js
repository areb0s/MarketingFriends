const express = require('express');

const router = express.Router();

const Sales = require('../models/sales');

router.post('/create', (req, res) => {
  if (req.user) {
    const type = 'sales';
    const sale = new Sales({
      ...req.body,
      userID: req.user.userID,
    });
    sale
      .save()
      .then(sales => res.json({ type, sales }))
      .catch(err => console.error(err));
  }
});

router.get('/fatch', (req, res) => {
  if (req.user) {
    const type = 'sales';
    Sales.find({
      userID: req.user.userID,
    })
      .then(sales => res.json({ type, sales }))
      .catch(err => console.error(err));
  }
});

router.post('/edit', (req, res) => {
  if (req.user) {
    const type = 'sales';
    const sales = req.body;
    Sales.updateOne(
      // eslint-disable-next-line no-underscore-dangle
      { _id: sales._id, userID: req.user.userID },
      { $set: sales },
    )
      .then(res.json({ type, sales }))
      .catch(err => console.error(err));
  }
});

router.post('/delete', (req, res) => {
  if (req.user) {
    const type = 'sales';
    const sales = req.body;
    // eslint-disable-next-line no-underscore-dangle
    Sales.deleteOne({ userID: req.user.userID, _id: req.body._id })
      .then(res.json({ type, sales }))
      .catch(err => console.error(err));
  }
});

module.exports = router;
