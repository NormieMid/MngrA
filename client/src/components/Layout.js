import React from 'react';
import { Outlet, Link } from 'react-router-dom';

function Layout() {
  return (
    <div>
      <nav>
        <Link to="/">Dashboard</Link>
        <Link to="/create-shift">Vytvořit směnu</Link>
        <Link to="/create-worker">Vytvořit pracovníka</Link>
        <Link to="/assign-worker">Přiřadit pracovníka</Link>
        <Link to="/worker-schedule">Rozvrh pracovníka</Link>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;