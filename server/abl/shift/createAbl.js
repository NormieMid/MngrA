const shiftDao = require("../../dao/shift-dao");
const workerDao = require("../../dao/worker-dao");

async function createAbl(req, res) {
  try {
    const body = req.body;

    if (!body.date) {
      res.status(400).json({ error: "Datum směny je povinné." });
      return;
    }

    if (!body.startTime) {
      res.status(400).json({ error: "Začátek směny je povinný." });
      return;
    }

    if (!body.endTime) {
      res.status(400).json({ error: "Konec směny je povinný." });
      return;
    }

    if (!body.workerId) {
      res.status(400).json({ error: "ID pracovníka je povinné." });
      return;
    }

    const worker = await workerDao.get(body.workerId);
    if (!worker) {
      res.status(404).json({ error: "Pracovník nenalezen." });
      return;
    }

    const allShifts = await shiftDao.list();
    const workerShifts = allShifts.filter(s => s.workerId === body.workerId && s.date === body.date);

    for (const shift of workerShifts) {
      if (body.startTime < shift.endTime && body.endTime > shift.startTime) {
        res.status(400).json({ error: "Pracovník již má směnu v tomto časovém rozmezí." });
        return;
      }
    }

    const shift = await shiftDao.create(body);
    res.json(shift);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

module.exports = createAbl;