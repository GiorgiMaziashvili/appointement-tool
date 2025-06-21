import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDoctors } from '../utils/localStorage';
import DoctorCard from '../components/DoctorCard';

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [filters, setFilters] = useState({
    name: '',
    specialty: '',
    availability: 'all'
  });

  const loadDoctors = () => {
    const allDoctors = getDoctors();
    setDoctors(allDoctors);
    setFilteredDoctors(allDoctors);
  };

  useEffect(() => {
    loadDoctors();
  }, []);

  useEffect(() => {
    let filtered = doctors;

    // Filter by name
    if (filters.name) {
      filtered = filtered.filter(doctor =>
        doctor.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }

    // Filter by specialty
    if (filters.specialty) {
      filtered = filtered.filter(doctor =>
        doctor.specialty.toLowerCase().includes(filters.specialty.toLowerCase())
      );
    }

    // Filter by availability
    if (filters.availability !== 'all') {
      const isAvailable = filters.availability === 'available';
      filtered = filtered.filter(doctor => doctor.available === isAvailable);
    }

    setFilteredDoctors(filtered);
  }, [doctors, filters]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      name: '',
      specialty: '',
      availability: 'all'
    });
  };

  const specialties = [...new Set(doctors.map(doctor => doctor.specialty))];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Our Doctors</h1>
          <p className="mt-1 text-sm text-gray-600">
            Find and book appointments with our qualified medical professionals.
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link
            to="/add-doctor"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add New Doctor
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900 mb-2 sm:mb-0">Filter Doctors</h2>
          <button
            onClick={clearFilters}
            className="text-sm font-medium text-primary-600 hover:text-primary-500 transition-colors duration-200"
          >
            Clear all filters
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Name Filter */}
          <div>
            <label htmlFor="name-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Doctor Name
            </label>
            <input
              type="text"
              id="name-filter"
              value={filters.name}
              onChange={(e) => handleFilterChange('name', e.target.value)}
              placeholder="Search by name..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-sm"
            />
          </div>

          {/* Specialty Filter */}
          <div>
            <label htmlFor="specialty-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Specialty
            </label>
            <select
              id="specialty-filter"
              value={filters.specialty}
              onChange={(e) => handleFilterChange('specialty', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-sm"
            >
              <option value="">All specialties</option>
              {specialties.map(specialty => (
                <option key={specialty} value={specialty}>
                  {specialty}
                </option>
              ))}
            </select>
          </div>

          {/* Availability Filter */}
          <div>
            <label htmlFor="availability-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Availability
            </label>
            <select
              id="availability-filter"
              value={filters.availability}
              onChange={(e) => handleFilterChange('availability', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-sm"
            >
              <option value="all">All doctors</option>
              <option value="available">Available only</option>
              <option value="busy">Busy only</option>
            </select>
          </div>

          {/* Results Count */}
          <div className="flex items-end">
            <div className="text-sm text-gray-600">
              <span className="font-medium">{filteredDoctors.length}</span> doctor{filteredDoctors.length !== 1 ? 's' : ''} found
            </div>
          </div>
        </div>
      </div>

      {/* Doctors Grid */}
      {filteredDoctors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-12 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No doctors found</h3>
          <p className="mt-1 text-sm text-gray-500">
            No doctors match your current filter criteria. Try adjusting your filters or clearing them.
          </p>
          <div className="mt-6">
            <button
              onClick={clearFilters}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
            >
              Clear Filters
            </button>
          </div>
        </div>
      )}

      {/* Statistics */}
      <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-primary-600">{doctors.length}</div>
            <div className="text-sm text-primary-700">Total Doctors</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">
              {doctors.filter(d => d.available).length}
            </div>
            <div className="text-sm text-green-700">Available Now</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary-600">{specialties.length}</div>
            <div className="text-sm text-primary-700">Specialties</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorsList; 