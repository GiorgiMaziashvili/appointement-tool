// Demo data for doctors
const demoData = {
  doctors: [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      available: true,
      phone: "+1 (555) 123-4567",
      email: "sarah.johnson@clinic.com",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Dermatology",
      available: true,
      phone: "+1 (555) 234-5678",
      email: "michael.chen@clinic.com",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      specialty: "Pediatrics",
      available: false,
      phone: "+1 (555) 345-6789",
      email: "emily.rodriguez@clinic.com",
      image: "https://images.unsplash.com/photo-1594824475317-d3be60f2e5e1?w=300&h=300&fit=crop&crop=face"
    },
    {
      id: 4,
      name: "Dr. David Thompson",
      specialty: "Orthopedics",
      available: true,
      phone: "+1 (555) 456-7890",
      email: "david.thompson@clinic.com",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=300&fit=crop&crop=face"
    },
    {
      id: 5,
      name: "Dr. Lisa Wang",
      specialty: "Neurology",
      available: true,
      phone: "+1 (555) 567-8901",
      email: "lisa.wang@clinic.com",
      image: "https://images.unsplash.com/photo-1551884303-5d4f4012dddb?w=300&h=300&fit=crop&crop=face"
    },
    {
      id: 6,
      name: "Dr. James Miller",
      specialty: "Cardiology",
      available: false,
      phone: "+1 (555) 678-9012",
      email: "james.miller@clinic.com",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face"
    }
  ],
  appointments: []
};

// Initialize localStorage with demo data if empty
export const initializeData = () => {
  if (!localStorage.getItem('clinicDoctors')) {
    localStorage.setItem('clinicDoctors', JSON.stringify(demoData.doctors));
  }
  if (!localStorage.getItem('clinicAppointments')) {
    localStorage.setItem('clinicAppointments', JSON.stringify(demoData.appointments));
  }
};

// Doctor operations
export const getDoctors = () => {
  const doctors = localStorage.getItem('clinicDoctors');
  return doctors ? JSON.parse(doctors) : [];
};

export const saveDoctor = (doctor) => {
  const doctors = getDoctors();
  const existingIndex = doctors.findIndex(d => d.id === doctor.id);
  
  if (existingIndex !== -1) {
    doctors[existingIndex] = doctor;
  } else {
    doctor.id = Date.now();
    doctors.push(doctor);
  }
  
  localStorage.setItem('clinicDoctors', JSON.stringify(doctors));
  return doctor;
};

export const addDoctor = (doctorData) => {
  const doctors = getDoctors();
  const newDoctor = {
    ...doctorData,
    id: Date.now(),
    available: doctorData.available !== undefined ? doctorData.available : true
  };
  
  doctors.push(newDoctor);
  localStorage.setItem('clinicDoctors', JSON.stringify(doctors));
  return newDoctor;
};

export const updateDoctor = (doctorId, updatedData) => {
  const doctors = getDoctors();
  const doctorIndex = doctors.findIndex(d => d.id === doctorId);
  
  if (doctorIndex !== -1) {
    doctors[doctorIndex] = { ...doctors[doctorIndex], ...updatedData };
    localStorage.setItem('clinicDoctors', JSON.stringify(doctors));
    return doctors[doctorIndex];
  }
  return null;
};

export const deleteDoctor = (doctorId) => {
  const doctors = getDoctors();
  const filteredDoctors = doctors.filter(d => d.id !== doctorId);
  localStorage.setItem('clinicDoctors', JSON.stringify(filteredDoctors));
};

// Appointment operations
export const getAppointments = () => {
  const appointments = localStorage.getItem('clinicAppointments');
  return appointments ? JSON.parse(appointments) : [];
};

export const saveAppointment = (appointment) => {
  const appointments = getAppointments();
  
  if (appointment.id) {
    const existingIndex = appointments.findIndex(a => a.id === appointment.id);
    if (existingIndex !== -1) {
      appointments[existingIndex] = appointment;
    }
  } else {
    appointment.id = Date.now();
    appointment.status = 'scheduled';
    appointments.push(appointment);
  }
  
  localStorage.setItem('clinicAppointments', JSON.stringify(appointments));
  return appointment;
};

// Fixed: Cancel appointment changes status instead of deleting
export const cancelAppointment = (appointmentId) => {
  const appointments = getAppointments();
  const appointmentIndex = appointments.findIndex(a => a.id === appointmentId);
  
  if (appointmentIndex !== -1) {
    appointments[appointmentIndex].status = 'cancelled';
    localStorage.setItem('clinicAppointments', JSON.stringify(appointments));
    return appointments[appointmentIndex];
  }
  return null;
};

// Keep the delete function for admin purposes if needed
export const deleteAppointment = (appointmentId) => {
  const appointments = getAppointments();
  const filteredAppointments = appointments.filter(a => a.id !== appointmentId);
  localStorage.setItem('clinicAppointments', JSON.stringify(filteredAppointments));
};

export const updateAppointmentStatus = (appointmentId, status) => {
  const appointments = getAppointments();
  const appointmentIndex = appointments.findIndex(a => a.id === appointmentId);
  
  if (appointmentIndex !== -1) {
    appointments[appointmentIndex].status = status;
    localStorage.setItem('clinicAppointments', JSON.stringify(appointments));
    return appointments[appointmentIndex];
  }
  return null;
}; 