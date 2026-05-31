import React, { useState } from 'react';

function CreateWorker() {
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  function handleSubmit() {
    setError(null);
    setSuccess(false);

    if (!name) {
      setError('Jméno pracovníka je povinné.');
      return;
    }

    fetch('http://localhost:8888/worker/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setError(data.error);
        } else {
          setSuccess(true);
          setName('');
        }
      })
      .catch(() => setError('Nepodařilo se vytvořit pracovníka.'));
  }

  return (
    <div>
      <h1>Vytvořit pracovníka</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>Pracovník byl vytvořen.</p>}
      <div>
        <label>Jméno:</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>
      <button onClick={handleSubmit}>Vytvořit</button>
    </div>
  );
}

export default CreateWorker;