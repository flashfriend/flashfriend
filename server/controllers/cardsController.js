const db = require('../models/cardModel');

const cardsController = {};

cardsController.getCards = (req, res, next) => {
  const { userId } = req.params;
  const queryStr = 'SELECT * FROM cards INNER JOIN users ON cards.userid = users.id WHERE users.id = $1';
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

module.exports = cardsController;
