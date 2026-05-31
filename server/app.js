const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const port = 8888;

const workerController = require("./controller/worker");
const shiftController = require("./controller/shift");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/worker", workerController);
app.use("/shift", shiftController);

app.listen(port, () => {
  console.log(`Server běží na portu ${port}`);
});