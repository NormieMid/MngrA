const express = require("express");
const router = express.Router();

const createAbl = require("../abl/shift/createAbl");
const getAbl = require("../abl/shift/getAbl");
const listAbl = require("../abl/shift/listAbl");
const updateAbl = require("../abl/shift/updateAbl");
const deleteAbl = require("../abl/shift/deleteAbl");

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