import React from 'react';
import { Link } from 'react-router-dom';

const DoctorCard = ({ doctor }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <img
              className="h-16 w-16 rounded-full object-cover border-2 border-primary-100"
              src={doctor.image}
              alt={doctor.name}
              onError={(e) => {
                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.name)}&background=22c55e&color=fff&size=64`;
              }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {doctor.name}
            </h3>
            <p className="text-sm text-primary-600 font-medium">
              {doctor.specialty}
            </p>
            <div className="flex items-center mt-1">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  doctor.available
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full mr-1 ${
                    doctor.available ? 'bg-green-400' : 'bg-red-400'
                  }`}
                />
                {doctor.available ? 'ხელმისაწვდომი' : 'დაკავებული'}
              </span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {doctor.phone}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {doctor.email}
          </div>
        </div>
        
        <div className="mt-6">
          <Link
            to={`/book-appointment/${doctor.id}`}
            className={`w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm transition-colors duration-200 ${
              doctor.available
                ? 'text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500'
                : 'text-gray-500 bg-gray-200 cursor-not-allowed'
            }`}
            onClick={(e) => !doctor.available && e.preventDefault()}
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {doctor.available ? 'ვიზიტის ჯავშნა' : 'არ არის ხელმისაწვდომი'}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard; 