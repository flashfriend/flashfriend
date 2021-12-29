const express = require('express');
const cardsController = require('../controllers/cardsController');
const authController = require('../controllers/authController');
const db = require('../models/cardModel');

const router = express.Router();

router.get('/:userId', cardsController.getCards, (req, res) => {
  console.log('getCards')
  res.status(200).json(res.locals)
})

router.post('/:userId', 
  authController.isLoggedIn,
  cardsController.addCard, (req, res) => {
    console.log('addCard')
    res.status(200).json(res.locals.card)
})

router.put('/:userId/:cardId', cardsController.editCard, (req, res) => {
res.status(200).json(res.locals)
})

router.delete('/:userId/:cardId', cardsController.deleteCard, (req, res) => {
res.status(200).json(res.locals)
})

module.exports = router;