const db = require('../models/cardModel');

const cardsController = {};

cardsController.getCards = (req, res, next) => {
  const { userId } = req.params;
  const queryStr = 'SELECT * FROM cards WHERE userid = ($1)';
  const values = [userId];

  try {
    db.query(queryStr, values)
      .then(data => {
        res.locals.deck = data.rows
        return next();
      })
  } catch (err) {
    console.log(err.stack)
    return next(err.stack);
  }
};

cardsController.addCard = (req, res, next) => {
  // manually accessing route without sending card id
  if (!req.body) return next();

  const { userId, cardInfo } = req.body;
   
  const queryStr = 'INSERT INTO cards (userid, front, back, tags) VALUES($1, $2, $3, $4) RETURNING *';
  const values = [userId];

  for (let key in cardInfo) {
    values.push(cardInfo[key]);
  }

  try {
    db.query(queryStr, values)
      .then(data => {
        res.locals.deck = data.rows
        return next();
      })
  } catch (err) {
    console.log(err.stack)
    return next(err.stack);
  }
};

cardsController.editCard = (req, res, next) => {
  // manually accessing route without sending card id
  if (!req.body) return next();

  const { cardInfo } = req.body;
  const queryStr = 'UPDATE cards SET front = ($2), back = ($3), tags = ($4), WHERE id = ($1) RETURNING *';
  const values = [];

  for (let key in cardInfo) {
    values.push(cardInfo[key]);
  }

  try {
    db.query(queryStr, values)
      .then(data => {
        res.locals.deck = data.rows
        return next();
      })
  } catch (err) {
    console.log(err.stack)
    return next(err.stack);
  }
};

cardsController.deleteCard = (req, res, next) => {
  // manually accessing route without sending card id
  if (!req.body) return next();

  const { cardId } = req.params;
  const queryStr = 'DELETE FROM cards WHERE id = ($1) RETURNING *';
  const values = [cardId];

  try {
    db.query(queryStr, values)
      .then(data => {
        res.locals.deck = data.rows
        return next();
      })
  } catch (err) {
    console.log(err.stack)
    return next(err.stack);
  }
};

module.exports = cardsController;
