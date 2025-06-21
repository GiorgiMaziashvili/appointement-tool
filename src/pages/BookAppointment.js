import React from 'react';
import AppointmentForm from '../components/AppointmentForm';

const BookAppointment = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">ვიზიტის ჯავშნა</h1>
        <p className="mt-1 text-sm text-gray-600">
          დაჯავშნეთ ვიზიტი ჩვენი კვალიფიციური სამედიცინო სპეციალისტებთან.
        </p>
      </div>

      {/* Appointment Form */}
      <AppointmentForm />
    </div>
  );
};

export default BookAppointment; 