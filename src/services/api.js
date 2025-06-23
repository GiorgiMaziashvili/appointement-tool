// API Base URL from environment variable
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://appointement-tool-back.onrender.com';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      // Handle 204 No Content (successful DELETE)
      if (response.status === 204) {
        return null;
      }
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`API call failed: ${endpoint}`, error);
      throw error;
    }
  }

  // Helper method to build query parameters
  buildQueryParams(params) {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== '' && value !== null && value !== undefined) {
        queryParams.append(key, value);
      }
    });
    return queryParams.toString();
  }

  // 👨‍⚕️ DOCTORS ENDPOINTS

  // GET /api/doctors - Get list of all doctors
  async getDoctors(filters = {}) {
    const queryString = this.buildQueryParams(filters);
    const endpoint = queryString ? `/api/doctors?${queryString}` : '/api/doctors';
    return await this.request(endpoint);
  }

  // POST /api/doctors - Create new doctor
  async createDoctor(doctorData) {
    return await this.request('/api/doctors', {
      method: 'POST',
      body: JSON.stringify(doctorData),
    });
  }

  // PUT /api/doctors/:id - Update existing doctor
  async updateDoctor(id, doctorData) {
    return await this.request(`/api/doctors/${id}`, {
      method: 'PUT',
      body: JSON.stringify(doctorData),
    });
  }

  // DELETE /api/doctors/:id - Remove doctor from system
  async deleteDoctor(id) {
    return await this.request(`/api/doctors/${id}`, {
      method: 'DELETE',
    });
  }

  // 📅 APPOINTMENTS ENDPOINTS

  // GET /api/appointments - Get list of all appointments
  async getAppointments(filters = {}) {
    const queryString = this.buildQueryParams(filters);
    const endpoint = queryString ? `/api/appointments?${queryString}` : '/api/appointments';
    return await this.request(endpoint);
  }

  // POST /api/appointments - Create new appointment
  async createAppointment(appointmentData) {
    return await this.request('/api/appointments', {
      method: 'POST',
      body: JSON.stringify(appointmentData),
    });
  }

  // PUT /api/appointments/:id - Update existing appointment
  async updateAppointment(id, appointmentData) {
    return await this.request(`/api/appointments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(appointmentData),
    });
  }

  // PATCH /api/appointments/:id/status - Change appointment status only
  async updateAppointmentStatus(id, status) {
    return await this.request(`/api/appointments/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }

  // PATCH /api/appointments/:id/cancel - Cancel appointment (shortcut)
  async cancelAppointment(id) {
    return await this.request(`/api/appointments/${id}/cancel`, {
      method: 'PATCH',
    });
  }

  // DELETE /api/appointments/:id - Permanently remove appointment
  async deleteAppointment(id) {
    return await this.request(`/api/appointments/${id}`, {
      method: 'DELETE',
    });
  }

  // 📊 DASHBOARD ENDPOINTS

  // GET /api/dashboard/stats - Get dashboard statistics
  async getDashboardStats() {
    return await this.request('/api/dashboard/stats');
  }

  // 🔧 UTILITY ENDPOINTS

  // GET /health - Check if backend server is running
  async checkHealth() {
    return await this.request('/health');
  }
}

export const apiService = new ApiService(); 