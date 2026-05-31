import React, { useState, useEffect } from 'react';

function WorkerSchedule() {
  const [workerList, setWorkerList] = useState([]);
  const [selectedWorker, setSelectedWorker] = useState('');
  const [shiftList, setShiftList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8888/worker/list')
      .then(res => res.json())
      .then(data => setWorkerList(data));
  }, []);

  function handleWorkerChange(e) {
    const id = e.target.value;
    setSelectedWorker(id);
    setError(null);
    setShiftList([]);

    if (!id) return;

    fetch('http://localhost:8888/shift/list')
      .then(res => res.json())
      .then(data => {
        const workerShifts = data.itemList.filter(shift =>
          shift.workerIds.includes(id)
        );
        setShiftList(workerShifts);
      })
      .catch(() => setError('Nepodařilo se načíst směny.'));
  }

  const worker = workerList.find(w => w.id === selectedWorker);

  return (
    <div>
      <h1>Rozvrh pracovníka</h1>
      <div>
        <label>Pracovník:</label>
        <select value={selectedWorker} onChange={handleWorkerChange}>
          <option value="">Vyberte pracovníka</option>
          {workerList.map(worker => (
            <option key={worker.id} value={worker.id}>
              {worker.name}
            </option>
          ))}
        </select>
      </div>
      {worker && (
        <div>
          <h2>{worker.name}</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {shiftList.length === 0
            ? <p>Žádné směny.</p>
            : (
              <table>
                <thead>
                  <tr>
                    <th>Datum</th>
                    <th>Čas</th>
                  </tr>
                </thead>
                <tbody>
                  {shiftList.map(shift => (
                    <tr key={shift.id}>
                      <td>{shift.date}</td>
                      <td>{shift.startTime} - {shift.endTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )
          }
        </div>
      )}
    </div>
  );
}

export default WorkerSchedule;