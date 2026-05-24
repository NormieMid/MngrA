const shiftDao = require("../../dao/shift-dao");

async function deleteAbl(req, res) {
  try {
    const body = req.body;

    if (!body.id) {
      res.status(400).json({ error: "ID směny je povinné." });
      return;
    }

    const shift = await shiftDao.get(body.id);

    if (!shift) {
      res.status(404).json({ error: "Směna nenalezena." });
      return;
    }

    await shiftDao.delete(body.id);
    res.json({ message: "Směna byla smazána." });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

module.exports = deleteAbl;