const shiftDao = require("../../dao/shift-dao");
const workerDao = require("../../dao/worker-dao");

async function listAbl(req, res) {
  try {
    const shiftList = await shiftDao.list();
    const workerList = await workerDao.list();

    const workerMap = {};
    for (const worker of workerList) {
      workerMap[worker.id] = worker;
    }

    res.json({ itemList: shiftList, workerMap });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

module.exports = listAbl;