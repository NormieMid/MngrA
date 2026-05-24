const workerDao = require("../../dao/worker-dao");

async function updateAbl(req, res) {
  try {
    const body = req.body;

    if (!body.id) {
      res.status(400).json({ error: "ID pracovníka je povinné." });
      return;
    }

    if (!body.name) {
      res.status(400).json({ error: "Jméno pracovníka je povinné." });
      return;
    }

    const worker = await workerDao.get(body.id);

    if (!worker) {
      res.status(404).json({ error: "Pracovník nenalezen." });
      return;
    }

    const updatedWorker = await workerDao.update(body);
    res.json(updatedWorker);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

module.exports = updateAbl;