const { LogEvents, logEvents } = require("./logEvents");

const errorHandeler = (err, req, res, next) => {
  logEvents(`${err.name}: ${err.message}`, "errLog.txt");
  console.log(err.stack);
  res.status(500).send(err.message);
};

module.exports = errorHandeler;
