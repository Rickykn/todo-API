const express = require("express");
const app = express();
const cors = require("cors");
const todoRoutes = require("./routes");
const moment = require("moment");
const fs = require("fs");
app.use(express.json());
app.use(cors());
const PORT = 2000;

app.use((req, res, next) => {
  const httpMethod = req.method;
  const path = req.path;
  const logFormat = `TIME: ${moment().format("hh:mm DD/MM/YYYY")}`;

  fs.appendFileSync(
    `${__dirname}/../.logs`,
    `${httpMethod} ${path} ${logFormat}` + "\n"
  );

  next();
});

app.use("/todos", todoRoutes);

app.listen(PORT, () => {
  console.log("Listening in port", PORT);
});
