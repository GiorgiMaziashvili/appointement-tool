import React from 'react';
import AppointmentForm from '../components/AppointmentForm';

const BookAppointment = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Book Appointment</h1>
        <p className="mt-1 text-sm text-gray-600">
          Schedule a new appointment with one of our available doctors.
        </p>
      </div>

      {/* Appointment Form */}
      <AppointmentForm />
    </div>
  );
};

export default BookAppointment; 