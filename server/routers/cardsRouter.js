const express = require('express');
const cardsController = require('../controllers/cardsController');
const authController = require('../controllers/authController');
const db = require('../models/cardModel');

const router = express.Router();


router.get('/:userId', authController.isLoggedIn, cardsController.getCards, (req, res) => {
  res.status(200).json(res.locals)
})

router.post('/add', authController.isLoggedIn, cardsController.addCard, (req, res) => {
  res.status(200).redirect('/home')
})

router.put('/edit', authController.isLoggedIn, cardsController.editCard, (req, res) => {
res.status(200).redirect('/home')
})

router.delete('/delete', authController.isLoggedIn, cardsController.deleteCard, (req, res) => {
res.status(200).redirect('/home')
})

module.exports = router;