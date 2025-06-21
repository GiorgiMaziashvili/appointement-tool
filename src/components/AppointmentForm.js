import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { getDoctors, saveAppointment } from '../utils/localStorage';

const AppointmentForm = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm({
    defaultValues: {
      doctorId: doctorId || '',
      date: '',
      time: '',
      patientName: '',
      patientEmail: '',
      patientPhone: '',
      reason: ''
    }
  });

  const selectedDoctorId = watch('doctorId');

  useEffect(() => {
    const availableDoctors = getDoctors().filter(doctor => doctor.available);
    setDoctors(availableDoctors);
  }, []);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const selectedDoctor = doctors.find(d => d.id === parseInt(data.doctorId));
      const appointmentData = {
        ...data,
        doctorId: parseInt(data.doctorId),
        doctorName: selectedDoctor?.name || '',
        doctorSpecialty: selectedDoctor?.specialty || '',
        createdAt: new Date().toISOString()
      };

      saveAppointment(appointmentData);
      setIsSuccess(true);
      reset();
      
      setTimeout(() => {
        navigate('/appointments');
      }, 2000);
    } catch (error) {
      console.error('Error saving appointment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getMinTime = (selectedDate) => {
    const today = new Date();
    const selected = new Date(selectedDate);
    
    if (selected.toDateString() === today.toDateString()) {
      const currentHour = today.getHours();
      const currentMinute = today.getMinutes();
      return `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;
    }
    return '09:00';
  };

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h3 className="text-lg font-semibold text-green-900 mb-2">
            Appointment Booked Successfully!
          </h3>
          <p className="text-green-700 mb-4">
            Your appointment has been scheduled. You will be redirected to the appointments page shortly.
          </p>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white shadow-md rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Book New Appointment
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Fill in the details below to schedule your appointment
          </p>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* Doctor Selection */}
          <div>
            <label htmlFor="doctorId" className="block text-sm font-medium text-gray-700 mb-2">
              Select Doctor *
            </label>
            <select
              id="doctorId"
              {...register('doctorId', { required: 'Please select a doctor' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">Choose a doctor...</option>
              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.name} - {doctor.specialty}
                </option>
              ))}
            </select>
            {errors.doctorId && (
              <p className="mt-1 text-sm text-red-600">{errors.doctorId.message}</p>
            )}
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                Appointment Date *
              </label>
              <input
                type="date"
                id="date"
                min={getMinDate()}
                {...register('date', { required: 'Please select a date' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
              {errors.date && (
                <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
                Appointment Time *
              </label>
              <input
                type="time"
                id="time"
                min={getMinTime(watch('date'))}
                max="17:00"
                {...register('time', { required: 'Please select a time' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
              {errors.time && (
                <p className="mt-1 text-sm text-red-600">{errors.time.message}</p>
              )}
            </div>
          </div>

          {/* Patient Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
              Patient Information
            </h3>
            
            <div>
              <label htmlFor="patientName" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="patientName"
                {...register('patientName', { 
                  required: 'Please enter patient name',
                  minLength: { value: 2, message: 'Name must be at least 2 characters' }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                placeholder="Enter patient's full name"
              />
              {errors.patientName && (
                <p className="mt-1 text-sm text-red-600">{errors.patientName.message}</p>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="patientEmail" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="patientEmail"
                  {...register('patientEmail', { 
                    required: 'Please enter email address',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Please enter a valid email address'
                    }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="patient@example.com"
                />
                {errors.patientEmail && (
                  <p className="mt-1 text-sm text-red-600">{errors.patientEmail.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="patientPhone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="patientPhone"
                  {...register('patientPhone', { 
                    required: 'Please enter phone number',
                    pattern: {
                      value: /^[\+]?[1-9][\d]{0,15}$/,
                      message: 'Please enter a valid phone number'
                    }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="+1 (555) 123-4567"
                />
                {errors.patientPhone && (
                  <p className="mt-1 text-sm text-red-600">{errors.patientPhone.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Reason for Visit */}
          <div>
            <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-2">
              Reason for Visit
            </label>
            <textarea
              id="reason"
              rows={4}
              {...register('reason')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              placeholder="Please describe the reason for your visit (optional)"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate('/appointments')}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Booking...
                </div>
              ) : (
                'Book Appointment'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentForm; 