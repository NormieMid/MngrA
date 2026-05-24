const shiftDao = require("../../dao/shift-dao");

async function listAbl(req, res) {
  try {
    const shiftList = await shiftDao.list();
    res.json(shiftList);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

module.exports = listAbl;