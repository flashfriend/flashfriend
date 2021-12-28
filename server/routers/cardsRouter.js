const express = require('express');
const cardsController = require('../controllers/cardsController');

const router = express.Router();

router.get('/', cardsController.getCards, (req, res) => {
  res.status(200).json(res.locals.deck);
})

module.exports = router;