const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const storageDir = path.join(__dirname, "storage", "workerList");

function getFilePath(id) {
  return path.join(storageDir, `${id}.json`);
}

async function create(worker) {
  const id = crypto.randomBytes(16).toString("hex");
  const newWorker = { id, ...worker };
  fs.writeFileSync(getFilePath(id), JSON.stringify(newWorker));
  return newWorker;
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

async function update(worker) {
  const filePath = getFilePath(worker.id);
  fs.writeFileSync(filePath, JSON.stringify(worker));
  return worker;
}

async function remove(id) {
  fs.unlinkSync(getFilePath(id));
}

module.exports = { create, get, list, update, delete: remove };