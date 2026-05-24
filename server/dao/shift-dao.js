const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const storageDir = path.join(__dirname, "storage", "shiftList");

function getFilePath(id) {
  return path.join(storageDir, `${id}.json`);
}

async function create(shift) {
  const id = crypto.randomBytes(16).toString("hex");
  const newShift = { id, ...shift };
  fs.writeFileSync(getFilePath(id), JSON.stringify(newShift));
  return newShift;
}

async function get(id) {
  const filePath = getFilePath(id);
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

async function list() {
  const files = fs.readdirSync(storageDir);
  return files.map(file => JSON.parse(fs.readFileSync(path.join(storageDir, file), "utf-8")));
}

async function update(shift) {
  const filePath = getFilePath(shift.id);
  fs.writeFileSync(filePath, JSON.stringify(shift));
  return shift;
}

async function remove(id) {
  fs.unlinkSync(getFilePath(id));
}

module.exports = { create, get, list, update, delete: remove };