import { apiService } from '../services/api';

// Initialize data - now handled by backend seeding
export const initializeData = () => {
  console.log('Data initialization is handled by the backend');
};

// 👨‍⚕️ DOCTOR OPERATIONS (API replacements)

// GET /api/doctors - Get list of all doctors
export const getDoctors = async (filters = {}) => {
  try {
    return await apiService.getDoctors(filters);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    return [];
  }
};

// POST /api/doctors - Create new doctor
export const addDoctor = async (doctorData) => {
  try {
    return await apiService.createDoctor(doctorData);
  } catch (error) {
    console.error('Error adding doctor:', error);
    throw error;
  }
};

// PUT /api/doctors/:id - Update existing doctor
export const updateDoctor = async (doctorId, updatedData) => {
  try {
    return await apiService.updateDoctor(doctorId, updatedData);
  } catch (error) {
    console.error('Error updating doctor:', error);
    return null;
  }
};

// DELETE /api/doctors/:id - Remove doctor from system
export const deleteDoctor = async (doctorId) => {
  try {
    await apiService.deleteDoctor(doctorId);
    return true;
  } catch (error) {
    console.error('Error deleting doctor:', error);
    throw error;
  }
};

// Legacy support - saveDoctor for create or update
export const saveDoctor = async (doctor) => {
  try {
    if (doctor.id) {
      return await apiService.updateDoctor(doctor.id, doctor);
    } else {
      return await apiService.createDoctor(doctor);
    }
  } catch (error) {
    console.error('Error saving doctor:', error);
    throw error;
  }
};

// 📅 APPOINTMENT OPERATIONS (API replacements)

// GET /api/appointments - Get list of all appointments
export const getAppointments = async (filters = {}) => {
  try {
    return await apiService.getAppointments(filters);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return [];
  }
};

// POST /api/appointments - Create new appointment
// PUT /api/appointments/:id - Update existing appointment
export const saveAppointment = async (appointment) => {
  try {
    if (appointment.id) {
      return await apiService.updateAppointment(appointment.id, appointment);
    } else {
      return await apiService.createAppointment(appointment);
    }
  } catch (error) {
    console.error('Error saving appointment:', error);
    throw error;
  }
};

// PATCH /api/appointments/:id/cancel - Cancel appointment (shortcut)
export const cancelAppointment = async (appointmentId) => {
  try {
    return await apiService.cancelAppointment(appointmentId);
  } catch (error) {
    console.error('Error cancelling appointment:', error);
    return null;
  }
};

// DELETE /api/appointments/:id - Permanently remove appointment
export const deleteAppointment = async (appointmentId) => {
  try {
    await apiService.deleteAppointment(appointmentId);
    return true;
  } catch (error) {
    console.error('Error deleting appointment:', error);
    throw error;
  }
};

// PATCH /api/appointments/:id/status - Change appointment status only
export const updateAppointmentStatus = async (appointmentId, status) => {
  try {
    return await apiService.updateAppointmentStatus(appointmentId, status);
  } catch (error) {
    console.error('Error updating appointment status:', error);
    return null;
  }
};

// 📊 DASHBOARD OPERATIONS (API replacements)

// GET /api/dashboard/stats - Get dashboard statistics
export const getDashboardStats = async () => {
  try {
    return await apiService.getDashboardStats();
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return {
      totalDoctors: 0,
      availableDoctors: 0,
      totalAppointments: 0,
      todayAppointments: 0,
      recentAppointments: []
    };
  }
}; 