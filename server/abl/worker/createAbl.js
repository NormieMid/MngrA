const workerDao = require("../../dao/worker-dao");

async function createAbl(req, res) {
  try {
    const body = req.body;

    if (!body.name) {
      res.status(400).json({ error: "Jméno pracovníka je povinné." });
      return;
    }

    const worker = await workerDao.create(body);
    res.json(worker);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

module.exports = createAbl;