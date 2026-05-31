import React, { useState, useEffect } from 'react';

function AssignWorker() {
  const [shiftList, setShiftList] = useState([]);
  const [workerList, setWorkerList] = useState([]);
  const [shiftId, setShiftId] = useState('');
  const [workerId, setWorkerId] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8888/shift/list')
      .then(res => res.json())
      .then(data => setShiftList(data.itemList));

    fetch('http://localhost:8888/worker/list')
      .then(res => res.json())
      .then(data => setWorkerList(data));
  }, []);

  function handleSubmit() {
    setError(null);
    setSuccess(false);

    const shift = shiftList.find(s => s.id === shiftId);
    if (!shift) {
      setError('Vyberte směnu.');
      return;
    }

    const updatedWorkerIds = shift.workerIds.includes(workerId)
      ? shift.workerIds
      : [...shift.workerIds, workerId];

    fetch('http://localhost:8888/shift/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...shift, workerIds: updatedWorkerIds })
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setError(data.error);
        } else {
          setSuccess(true);
          setShiftId('');
          setWorkerId('');
        }
      })
      .catch(() => setError('Nepodařilo se přiřadit pracovníka.'));
  }

  return (
    <div>
      <h1>Přiřadit pracovníka</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>Pracovník byl přiřazen.</p>}
      <div>
        <label>Směna:</label>
        <select value={shiftId} onChange={e => setShiftId(e.target.value)}>
          <option value="">Vyberte směnu</option>
          {shiftList.map(shift => (
            <option key={shift.id} value={shift.id}>
              {shift.date} {shift.startTime} - {shift.endTime}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Pracovník:</label>
        <select value={workerId} onChange={e => setWorkerId(e.target.value)}>
          <option value="">Vyberte pracovníka</option>
          {workerList.map(worker => (
            <option key={worker.id} value={worker.id}>
              {worker.name}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleSubmit}>Přiřadit</button>
    </div>
  );
}

export default AssignWorker;