const express = require('express');
const cardsController = require('../controllers/cardsController');
const db = require('../models/cardModel');

const router = express.Router();

<<<<<<< HEAD
router.get('/', cardsController.getCards, (req, res) => {
  res.status(200).json(res.locals.deck);
=======

router.get('/:userId', cardsController.getCards, (req, res) => {
  res.status(200).json(res.locals)
>>>>>>> d655e853d854fcae7dad746e1260e132856501ca
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