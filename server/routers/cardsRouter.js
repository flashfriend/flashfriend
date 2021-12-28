const express = require('express');
const cardsController = require('../controllers/cardsController');

const router = express.Router();

router.get('/api/cards', cardsController.getCards, (req, res) => {
  res.status(200).json(res.locals.deck);
})

module.exports = router;