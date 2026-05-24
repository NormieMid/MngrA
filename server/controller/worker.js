const express = require("express");
const router = express.Router();

const createAbl = require("../abl/worker/createAbl");
const getAbl = require("../abl/worker/getAbl");
const listAbl = require("../abl/worker/listAbl");
const updateAbl = require("../abl/worker/updateAbl");
const deleteAbl = require("../abl/worker/deleteAbl");

router.post("/create", (req, res) => {
  createAbl(req, res);
});

router.get("/get", (req, res) => {
  getAbl(req, res);
});

router.get("/list", (req, res) => {
  listAbl(req, res);
});

router.post("/update", (req, res) => {
  updateAbl(req, res);
});

router.post("/delete", (req, res) => {
  deleteAbl(req, res);
});

module.exports = router;