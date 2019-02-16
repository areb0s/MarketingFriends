const express = require('express');
const moment = require('moment');

const router = express.Router();

const Sales = require('../models/sales');

router.post('/create', (req, res) => {
  if (req.user) {
    const sales = new Sales();
    sales.userID = req.user.userID;
    sales.goods = req.body.goods;
    sales.company = req.body.company;
    sales.name = req.body.name;
    sales.contact = req.body.contact;
    sales.price = req.body.price;
    sales.spend = req.body.spend;
    sales.homepage = req.body.homepage;
    sales.description = req.body.description;
    sales.deposit = req.body.deposit;
    sales
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
    Sales.find({
      userID: req.user.userID,
    })
      .then((allSales) => {
        const allResults = allSales.map(sale => ({
          margin: sale.price - sale.spend,
          deposit: sale.deposit,
        }));
        Sales.find({
          userID: req.user.userID,
          date: {
            $gte: postDateStart,
            $lte: postDateEnd,
          },
        })
          .then((sales) => {
            const results = sales.map(sale => ({
              // eslint-disable-next-line no-underscore-dangle
              ...sale._doc,
              margin: sale.price - sale.spend,
              date: moment(sale.date).format('YYYY/MM/DD'),
            }));
            res.json({ results, allResults });
          })
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
  }
});

router.post('/edit', (req, res) => {
  if (req.user) {
    Sales.updateOne(
      // eslint-disable-next-line no-underscore-dangle
      { _id: req.body._id, userID: req.user.userID },
      { $set: req.body },
    )
      .then(res.json('success'))
      .catch(err => console.error(err));
  }
});

router.post('/delete', (req, res) => {
  if (req.user) {
    // eslint-disable-next-line no-underscore-dangle
    Sales.deleteOne({ userID: req.user.userID, _id: req.body._id })
      .then(res.json('success'))
      .catch(err => console.error(err));
  }
});

module.exports = router;
