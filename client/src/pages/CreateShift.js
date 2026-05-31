import React, { useState, useEffect } from 'react';

function CreateShift() {
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [workerIds, setWorkerIds] = useState([]);
  const [workerList, setWorkerList] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8888/worker/list')
      .then(res => res.json())
      .then(data => setWorkerList(data)); // ?
  }, []);

  function handleSubmit() {
    setError(null);
    setSuccess(false);

    fetch('http://localhost:8888/shift/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date, startTime, endTime, workerIds })
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setError(data.error);
        } else {
          setSuccess(true);
          setDate('');
          setStartTime('');
          setEndTime('');
          setWorkerIds([]);
        }
      })
      .catch(() => setError('Nepodařilo se vytvořit směnu.'));
  }

  function handleWorkerToggle(id) {
    setWorkerIds(prev =>
      prev.includes(id) ? prev.filter(w => w !== id) : [...prev, id]
    );
  }

  return (
    <div>
      <h1>Vytvořit směnu</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>Směna byla vytvořena.</p>}
      <div>
        <label>Datum:</label>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} />
      </div>
      <div>
        <label>Začátek:</label>
        <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} />
      </div>
      <div>
        <label>Konec:</label>
        <input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} />
      </div>
      <div>
        <label>Pracovníci:</label>
        {workerList.map(worker => (
          <div key={worker.id}>
            <input
              type="checkbox"
              checked={workerIds.includes(worker.id)}
              onChange={() => handleWorkerToggle(worker.id)}
            />
            {worker.name}
          </div>
        ))}
      </div>
      <button onClick={handleSubmit}>Vytvořit</button>
    </div>
  );
}

export default CreateShift;