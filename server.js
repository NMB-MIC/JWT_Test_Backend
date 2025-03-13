const express = require("express");
const app = express();
const cors = require("cors");
const authen = require("./api/Authentication")

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use('/api', authen)//link API

const db = require("./models");

db.sequelize.sync().then((req) => {
  app.listen(4001, () => {
    console.log(`Application is running on port ${4001}`);
  });
});