import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDoctors, getAppointments } from '../utils/localStorage';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalDoctors: 0,
    availableDoctors: 0,
    totalAppointments: 0,
    todayAppointments: 0,
    recentAppointments: []
  });

  useEffect(() => {
    const doctors = getDoctors();
    const appointments = getAppointments();
    const today = new Date().toISOString().split('T')[0];
    
    const todayAppointments = appointments.filter(app => app.date === today);
    const recentAppointments = appointments
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);

    setStats({
      totalDoctors: doctors.length,
      availableDoctors: doctors.filter(d => d.available).length,
      totalAppointments: appointments.length,
      todayAppointments: todayAppointments.length,
      recentAppointments
    });
  }, []);

  const StatCard = ({ title, value, icon, color, link }) => (
    <div className="bg-white overflow-hidden shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className={`w-8 h-8 rounded-md flex items-center justify-center ${color}`}>
              {icon}
            </div>
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
              <dd className="text-lg font-medium text-gray-900">{value}</dd>
            </dl>
          </div>
        </div>
        {link && (
          <div className="mt-3">
            <Link
              to={link}
              className="text-sm font-medium text-primary-600 hover:text-primary-500 transition-colors duration-200"
            >
              ყველას ნახვა →
            </Link>
          </div>
        )}
      </div>
    </div>
  );

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

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
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

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">მთავარი პანელი</h1>
        <p className="mt-1 text-sm text-gray-600">
          კეთილი იყოს თქვენი მობრძანება! აქ არის ინფორმაცია თქვენი კლინიკის შესახებ დღეს.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="სულ ექიმები"
          value={stats.totalDoctors}
          icon={
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          }
          color="bg-primary-500"
          link="/doctors"
        />
        
        <StatCard
          title="ხელმისაწვდომი ექიმები"
          value={stats.availableDoctors}
          icon={
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          color="bg-green-500"
        />
        
        <StatCard
          title="სულ ვიზიტები"
          value={stats.totalAppointments}
          icon={
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          }
          color="bg-blue-500"
          link="/appointments"
        />
        
        <StatCard
          title="დღევანდელი ვიზიტები"
          value={stats.todayAppointments}
          icon={
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          color="bg-orange-500"
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">სწრაფი მოქმედებები</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/book-appointment"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            ვიზიტის ჯავშნა
          </Link>
          
          <Link
            to="/add-doctor"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            ექიმის დამატება
          </Link>
          
          <Link
            to="/doctors"
            className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            ყველა ექიმის ნახვა
          </Link>
          
          <Link
            to="/appointments"
            className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            ვიზიტების მართვა
          </Link>
        </div>
      </div>

      {/* Recent Appointments */}
      <div className="bg-white shadow-md rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">ბოლო ვიზიტები</h2>
            <Link
              to="/appointments"
              className="text-sm font-medium text-primary-600 hover:text-primary-500 transition-colors duration-200"
            >
              ყველას ნახვა →
            </Link>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {stats.recentAppointments.length > 0 ? (
            stats.recentAppointments.map((appointment) => (
              <div key={appointment.id} className="px-6 py-4 hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-sm font-medium text-gray-900">
                        {appointment.patientName}
                      </h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                        {getStatusText(appointment.status)}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                      <span>დოქტორი {appointment.doctorName}</span>
                      <span>•</span>
                      <span>{formatDate(appointment.date)}</span>
                      <span>•</span>
                      <span>{formatTime(appointment.time)}</span>
                    </div>
                    {appointment.reason && (
                      <p className="mt-1 text-sm text-gray-600 truncate">
                        {appointment.reason}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-8 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">ჯერ არ არის ვიზიტები</h3>
              <p className="mt-1 text-sm text-gray-500">დაიწყეთ თქვენი პირველი ვიზიტის ჯავშნით.</p>
              <div className="mt-6">
                <Link
                  to="/book-appointment"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  ვიზიტის ჯავშნა
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 