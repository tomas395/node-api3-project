const express = require("express");
const userRouter = require("./users/userRouter");
const server = express();

server.use(express.json());
server.get("/", logger, (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});
server.use("/user", logger, userRouter);
//custom middleware

function logger(req, res, next) {
  console.log(`${req.method} ${req.url} ${Date.now()}`);
  next();
}

module.exports = server;
