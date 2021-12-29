const express = require('express');
const cardsController = require('../controllers/cardsController');
const db = require('../models/cardModel');

const router = express.Router();


router.get('/:userId', cardsController.getCards, (req, res) => {
  res.status(200).json(res.locals)
})

// router.post('/:userId', cardsController.addCard, (req, res) => {
//   res.status(200).redirect('/home')
// })

// router.put('/edit', cardsController.editCard, (req, res) => {
// res.status(200).redirect('/home')
// })

// router.delete('/delete', cardsController.deleteCard, (req, res) => {
// res.status(200).redirect('/home')
// })

module.exports = router;