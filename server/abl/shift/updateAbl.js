const shiftDao = require("../../dao/shift-dao");
const workerDao = require("../../dao/worker-dao");

async function updateAbl(req, res) {
  try {
    const body = req.body;

    if (!body.id) {
      res.status(400).json({ error: "ID směny je povinné." });
      return;
    }

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

    if (!body.workerIds || !Array.isArray(body.workerIds) || body.workerIds.length === 0) {
      res.status(400).json({ error: "Seznam pracovníků je povinný." });
      return;
    }

    const shift = await shiftDao.get(body.id);
    if (!shift) {
      res.status(404).json({ error: "Směna nenalezena." });
      return;
    }

    for (const workerId of body.workerIds) {
      const worker = await workerDao.get(workerId);
      if (!worker) {
        res.status(404).json({ error: `Pracovník s ID ${workerId} nenalezen.` });
        return;
      }

      const allShifts = await shiftDao.list();
      const workerShifts = allShifts.filter(s => s.workerIds.includes(workerId) && s.date === body.date && s.id !== body.id);

      for (const s of workerShifts) {
        if (body.startTime < s.endTime && body.endTime > s.startTime) {
          res.status(400).json({ error: `Pracovník s ID ${workerId} již má směnu v tomto časovém rozmezí.` });
          return;
        }
      }
    }

    const updatedShift = await shiftDao.update(body);
    res.json(updatedShift);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

module.exports = updateAbl;