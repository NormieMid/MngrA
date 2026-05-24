const workerDao = require("../../dao/worker-dao");

async function deleteAbl(req, res) {
  try {
    const body = req.body;

    if (!body.id) {
      res.status(400).json({ error: "ID pracovníka je povinné." });
      return;
    }

    const worker = await workerDao.get(body.id);

    if (!worker) {
      res.status(404).json({ error: "Pracovník nenalezen." });
      return;
    }

    await workerDao.delete(body.id);
    res.json({ message: "Pracovník byl smazán." });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

module.exports = deleteAbl;