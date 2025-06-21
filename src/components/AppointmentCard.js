import React from 'react';
import { cancelAppointment, updateAppointmentStatus } from '../utils/localStorage';

const AppointmentCard = ({ appointment, onUpdate }) => {
  const handleCancel = () => {
    if (window.confirm('დარწმუნებული ხართ, რომ გსურთ ამ ვიზიტის გაუქმება?')) {
      cancelAppointment(appointment.id);
      onUpdate();
    }
  };

  const handleStatusChange = (newStatus) => {
    updateAppointmentStatus(appointment.id, newStatus);
    onUpdate();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'scheduled':
        return 'დაგეგმილი';
      case 'completed':
        return 'დასრულებული';
      case 'cancelled':
        return 'გაუქმებული';
      case 'in-progress':
        return 'მიმდინარე';
      default:
        return status;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ka-GE', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString('ka-GE', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: false
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-3">
              <h3 className="text-lg font-semibold text-gray-900">
                {appointment.doctorName}
              </h3>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(appointment.status)}`}>
                {getStatusText(appointment.status)}
              </span>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                პაციენტი: {appointment.patientName}
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {formatDate(appointment.date)}
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {formatTime(appointment.time)}
              </div>
              
              {appointment.reason && (
                <div className="flex items-start text-sm text-gray-600">
                  <svg className="w-4 h-4 mr-2 text-gray-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="flex-1">{appointment.reason}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {appointment.status === 'scheduled' && (
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={() => handleStatusChange('in-progress')}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors duration-200"
            >
              დაწყება
            </button>
            <button
              onClick={() => handleStatusChange('completed')}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
            >
              დასრულება
            </button>
            <button
              onClick={handleCancel}
              className="inline-flex items-center px-3 py-1.5 border border-red-300 text-xs font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
            >
              გაუქმება
            </button>
          </div>
        )}
        
        {appointment.status === 'in-progress' && (
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={() => handleStatusChange('completed')}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
            >
              დასრულება
            </button>
            <button
              onClick={handleCancel}
              className="inline-flex items-center px-3 py-1.5 border border-red-300 text-xs font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
            >
              გაუქმება
            </button>
          </div>
        )}

        {appointment.status === 'cancelled' && (
          <div className="mt-4 p-3 bg-red-50 rounded-md">
            <div className="flex items-center">
              <svg className="w-4 h-4 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <span className="text-sm text-red-700 font-medium">ეს ვიზიტი გაუქმებულია</span>
            </div>
          </div>
        )}

        {appointment.status === 'completed' && (
          <div className="mt-4 p-3 bg-green-50 rounded-md">
            <div className="flex items-center">
              <svg className="w-4 h-4 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm text-green-700 font-medium">ვიზიტი წარმატებით დასრულდა</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentCard; 