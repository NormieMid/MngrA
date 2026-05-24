const workerDao = require("../../dao/worker-dao");

async function getAbl(req, res) {
  try {
    const id = req.query.id;

    if (!id) {
      res.status(400).json({ error: "ID pracovníka je povinné." });
      return;
    }

    const worker = await workerDao.get(id);

    if (!worker) {
      res.status(404).json({ error: "Pracovník nenalezen." });
      return;
    }

    res.json(worker);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

module.exports = getAbl;