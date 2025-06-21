import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { initializeData } from './utils/localStorage';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import DoctorsList from './pages/DoctorsList';
import AddDoctor from './pages/AddDoctor';
import Appointments from './pages/Appointments';
import BookAppointment from './pages/BookAppointment';

function App() {
  useEffect(() => {
    initializeData();
  }, []);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/doctors" element={<DoctorsList />} />
          <Route path="/add-doctor" element={<AddDoctor />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/book-appointment" element={<BookAppointment />} />
          <Route path="/book-appointment/:doctorId" element={<BookAppointment />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App; 