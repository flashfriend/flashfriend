const db = require('../models/cardModel');

const cardsController = {};

cardsController.getCards = (req, res, next) => {
  if (!req.params) return next();

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
  const { userid, front, back } = req.body;
  
  const queryStr = 'INSERT INTO cards (userid, front, back) VALUES($1, $2, $3) RETURNING id, userid, front, back';
  const values = [ userid, front, back ];

  try {
    db.query(queryStr, values)
      .then(data => {
        res.locals.card = data.rows[0]
        return next();
      })
  } catch (err) {
    return next(err.stack);
  }
};

cardsController.editCard = (req, res, next) => {
  // manually accessing route without sending card id
  if (!req.params) return next();

  const { cardInfo } = req.params;

  const queryStr = 'UPDATE cards SET front = ($2), back = ($3), WHERE id = ($1) RETURNING *';
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
  if (!req.params) return next();

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