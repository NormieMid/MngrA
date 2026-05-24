const workerDao = require("../../dao/worker-dao");

async function listAbl(req, res) {
  try {
    const workerList = await workerDao.list();
    res.json(workerList);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

module.exports = listAbl;