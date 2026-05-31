import React, { useEffect, useState } from 'react';

function Dashboard() {
  const [shiftList, setShiftList] = useState([]);
  const [workerMap, setWorkerMap] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8888/shift/list')
      .then(res => res.json())
      .then(data => {
        setShiftList(data.itemList);
        setWorkerMap(data.workerMap);
        setLoading(false);
      })
      .catch(err => {
        setError('Nepodařilo se načíst směny.');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Načítám...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>Datum</th>
            <th>Čas</th>
            <th>Pracovníci</th>
          </tr>
        </thead>
        <tbody>
          {shiftList.map(shift => (
            <tr key={shift.id}>
              <td>{shift.date}</td>
              <td>{shift.startTime} - {shift.endTime}</td>
              <td>
                {shift.workerIds.map(id => workerMap[id]?.name).join(', ')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;