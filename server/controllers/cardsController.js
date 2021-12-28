const db = require('../models/cardModel');

const cardsController = {};

cardsController.getCards = (req, res, next) => {
  res.locals.deck = 'getting cards'
  return next();
}



module.exports = cardsController;