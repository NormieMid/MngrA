const shiftDao = require("../../dao/shift-dao");

async function getAbl(req, res) {
  try {
    const id = req.query.id;

    if (!id) {
      res.status(400).json({ error: "ID směny je povinné." });
      return;
    }

    const shift = await shiftDao.get(id);

    if (!shift) {
      res.status(404).json({ error: "Směna nenalezena." });
      return;
    }

    res.json(shift);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

module.exports = getAbl;