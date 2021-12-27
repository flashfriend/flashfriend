const path = require('path');
const express = require('express');
const app = express();

const PORT = 3030;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res) =>
res.status(404).send("Not found")
);

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;