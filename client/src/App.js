import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import CreateShift from './pages/CreateShift';
import AssignWorker from './pages/AssignWorker';
import WorkerSchedule from './pages/WorkerSchedule';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="create-shift" element={<CreateShift />} />
          <Route path="assign-worker" element={<AssignWorker />} />
          <Route path="worker-schedule" element={<WorkerSchedule />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;