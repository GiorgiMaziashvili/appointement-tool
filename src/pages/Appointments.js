import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAppointments } from '../utils/localStorage';
import AppointmentCard from '../components/AppointmentCard';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [filters, setFilters] = useState({
    status: 'all',
    doctor: '',
    date: '',
    patient: ''
  });
  const [sortBy, setSortBy] = useState('date-desc');

  const loadAppointments = () => {
    const allAppointments = getAppointments();
    setAppointments(allAppointments);
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  useEffect(() => {
    let filtered = [...appointments];

    // Filter by status
    if (filters.status !== 'all') {
      filtered = filtered.filter(appointment => appointment.status === filters.status);
    }

    // Filter by doctor
    if (filters.doctor) {
      filtered = filtered.filter(appointment =>
        appointment.doctorName.toLowerCase().includes(filters.doctor.toLowerCase())
      );
    }

    // Filter by date
    if (filters.date) {
      filtered = filtered.filter(appointment => appointment.date === filters.date);
    }

    // Filter by patient
    if (filters.patient) {
      filtered = filtered.filter(appointment =>
        appointment.patientName.toLowerCase().includes(filters.patient.toLowerCase())
      );
    }

    // Sort appointments
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date-asc':
          return new Date(a.date + ' ' + a.time) - new Date(b.date + ' ' + b.time);
        case 'date-desc':
          return new Date(b.date + ' ' + b.time) - new Date(a.date + ' ' + a.time);
        case 'doctor':
          return a.doctorName.localeCompare(b.doctorName);
        case 'patient':
          return a.patientName.localeCompare(b.patientName);
        case 'status':
          return a.status.localeCompare(b.status);
        default:
          return 0;
      }
    });

    setFilteredAppointments(filtered);
  }, [appointments, filters, sortBy]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      status: 'all',
      doctor: '',
      date: '',
      patient: ''
    });
  };

  const getStatusCounts = () => {
    return {
      all: appointments.length,
      scheduled: appointments.filter(a => a.status === 'scheduled').length,
      'in-progress': appointments.filter(a => a.status === 'in-progress').length,
      completed: appointments.filter(a => a.status === 'completed').length,
      cancelled: appointments.filter(a => a.status === 'cancelled').length,
    };
  };

  const statusCounts = getStatusCounts();
  const uniqueDoctors = [...new Set(appointments.map(a => a.doctorName))];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
          <p className="mt-1 text-sm text-gray-600">
            Manage and track all patient appointments.
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link
            to="/book-appointment"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Book New Appointment
          </Link>
        </div>
      </div>

      {/* Status Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {[
          { key: 'all', label: 'All', color: 'bg-gray-100 text-gray-800' },
          { key: 'scheduled', label: 'Scheduled', color: 'bg-blue-100 text-blue-800' },
          { key: 'in-progress', label: 'In Progress', color: 'bg-yellow-100 text-yellow-800' },
          { key: 'completed', label: 'Completed', color: 'bg-green-100 text-green-800' },
          { key: 'cancelled', label: 'Cancelled', color: 'bg-red-100 text-red-800' },
        ].map((status) => (
          <button
            key={status.key}
            onClick={() => handleFilterChange('status', status.key)}
            className={`p-3 rounded-lg text-center transition-colors duration-200 ${
              filters.status === status.key
                ? 'ring-2 ring-primary-500 ' + status.color
                : 'hover:bg-gray-50 ' + status.color
            }`}
          >
            <div className="text-lg font-semibold">{statusCounts[status.key]}</div>
            <div className="text-xs font-medium">{status.label}</div>
          </button>
        ))}
      </div>

      {/* Filters and Sort */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900 mb-2 sm:mb-0">Filter & Sort</h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={clearFilters}
              className="text-sm font-medium text-primary-600 hover:text-primary-500 transition-colors duration-200"
            >
              Clear filters
            </button>
            <div className="flex items-center space-x-2">
              <label htmlFor="sort-select" className="text-sm font-medium text-gray-700">
                Sort by:
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-sm"
              >
                <option value="date-desc">Date (Newest first)</option>
                <option value="date-asc">Date (Oldest first)</option>
                <option value="doctor">Doctor name</option>
                <option value="patient">Patient name</option>
                <option value="status">Status</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Doctor Filter */}
          <div>
            <label htmlFor="doctor-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Doctor
            </label>
            <select
              id="doctor-filter"
              value={filters.doctor}
              onChange={(e) => handleFilterChange('doctor', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-sm"
            >
              <option value="">All doctors</option>
              {uniqueDoctors.map(doctor => (
                <option key={doctor} value={doctor}>
                  {doctor}
                </option>
              ))}
            </select>
          </div>

          {/* Date Filter */}
          <div>
            <label htmlFor="date-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              id="date-filter"
              value={filters.date}
              onChange={(e) => handleFilterChange('date', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-sm"
            />
          </div>

          {/* Patient Filter */}
          <div>
            <label htmlFor="patient-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Patient Name
            </label>
            <input
              type="text"
              id="patient-filter"
              value={filters.patient}
              onChange={(e) => handleFilterChange('patient', e.target.value)}
              placeholder="Search by patient name..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-sm"
            />
          </div>

          {/* Results Count */}
          <div className="flex items-end">
            <div className="text-sm text-gray-600">
              <span className="font-medium">{filteredAppointments.length}</span> appointment{filteredAppointments.length !== 1 ? 's' : ''} found
            </div>
          </div>
        </div>
      </div>

      {/* Appointments List */}
      {filteredAppointments.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredAppointments.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              onUpdate={loadAppointments}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-12 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No appointments found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {appointments.length === 0
              ? "No appointments have been booked yet. Start by creating your first appointment."
              : "No appointments match your current filter criteria. Try adjusting your filters."}
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/book-appointment"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Book New Appointment
            </Link>
            {appointments.length > 0 && (
              <button
                onClick={clearFilters}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments; 