import React from 'react';
import DoctorForm from '../components/DoctorForm';

const AddDoctor = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Add New Doctor</h1>
        <p className="mt-1 text-sm text-gray-600">
          Add a new doctor to the clinic staff directory.
        </p>
      </div>

      {/* Doctor Form */}
      <DoctorForm />
    </div>
  );
};

export default AddDoctor; 