const express = require('express');
const cardsController = require('../controllers/cardsController');
const db = require('../models/cardModel');

const router = express.Router();

router.get('/:userId', cardsController.getCards, (req, res) => {
  // console.log(res.locals.deck)
  // res.status(200).json(res.locals.deck);
  res.status(200).json(res.locals)
})


module.exports = router;