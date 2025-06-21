# Clinic Dashboard

A fully responsive clinic dashboard built with React, featuring doctor management and appointment booking functionality.

## Features

### 🏥 Dashboard Overview

- Real-time statistics (total doctors, available doctors, appointments)
- Quick action buttons for common tasks
- Recent appointments display
- Today's appointments counter

### 👨‍⚕️ Doctors Management

- View all doctors with their information
- Filter doctors by:
  - Name (search)
  - Medical specialty
  - Availability status
- Doctor cards showing:
  - Profile photo
  - Contact information (phone, email)
  - Specialty and availability status
  - Direct "Book Appointment" button

### 📅 Appointments Management

- View all appointments with filtering and sorting
- Filter appointments by:
  - Status (scheduled, in-progress, completed, cancelled)
  - Doctor name
  - Date
  - Patient name
- Sort appointments by date, doctor, patient, or status
- Status management (start, complete, cancel appointments)
- Appointment cards showing:
  - Patient and doctor information
  - Date and time
  - Status with color-coded badges
  - Reason for visit

### 📝 Book Appointments

- Comprehensive appointment booking form with validation
- Form fields:
  - Doctor selection (only available doctors)
  - Date and time selection
  - Patient information (name, email, phone)
  - Reason for visit (optional)
- Real-time form validation using `react-hook-form`
- Success confirmation with auto-redirect

## Technology Stack

- **React 18** - Frontend framework
- **React Router 6** - Client-side routing
- **React Hook Form** - Form handling and validation
- **TailwindCSS** - Utility-first CSS framework
- **LocalStorage** - Data persistence
- **Responsive Design** - Mobile-first approach

## Color Palette

The application uses a medical-themed green color palette:

- Primary Green: `#22c55e` (green-500)
- Light Green: `#f0fdf4` (green-50)
- Dark Green: `#15803d` (green-700)

## Project Structure

```
src/
├── components/           # Reusable components
│   ├── Layout.js        # Main layout wrapper
│   ├── Sidebar.js       # Navigation sidebar
│   ├── Navbar.js        # Top navigation bar
│   ├── DoctorCard.js    # Individual doctor display
│   ├── AppointmentCard.js # Individual appointment display
│   └── AppointmentForm.js # Appointment booking form
├── pages/               # Page components
│   ├── Dashboard.js     # Dashboard overview
│   ├── DoctorsList.js   # Doctors listing and filtering
│   ├── Appointments.js  # Appointments management
│   └── BookAppointment.js # Appointment booking page
├── utils/               # Utility functions
│   └── localStorage.js  # LocalStorage data management
├── App.js              # Main app component with routing
├── index.js            # Application entry point
└── index.css           # Global styles and TailwindCSS imports
```

## Installation & Setup

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start the development server:**

   ```bash
   npm start
   ```

3. **Open your browser and navigate to:**
   ```
   http://localhost:3000
   ```

## Demo Data

The application comes with pre-loaded demo data including:

- 6 sample doctors with different specialties
- Mixed availability status
- Professional profile photos
- Contact information

Demo doctors include specialists in:

- Cardiology
- Dermatology
- Pediatrics
- Orthopedics
- Neurology

## Data Persistence

All data is stored in the browser's localStorage:

- **Doctors data** - `clinicDoctors`
- **Appointments data** - `clinicAppointments`

Data persists between browser sessions and is automatically initialized with demo data on first visit.

## Responsive Design

The application is fully responsive and optimized for:

- **Desktop** (1024px+) - Full sidebar layout
- **Tablet** (768px-1023px) - Collapsible sidebar
- **Mobile** (< 768px) - Mobile-friendly navigation

## Key Features Detail

### Dashboard Statistics

- Real-time data calculations
- Color-coded status indicators
- Quick navigation links

### Advanced Filtering

- Real-time search functionality
- Multiple filter combinations
- Clear all filters option
- Results counter

### Appointment Management

- Status workflow (scheduled → in-progress → completed)
- One-click status updates
- Confirmation dialogs for destructive actions
- Date and time formatting

### Form Validation

- Required field validation
- Email format validation
- Phone number validation
- Date/time constraints (no past appointments)
- Real-time error display

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Future Enhancements

Potential features for future versions:

- User authentication
- Email notifications
- Calendar integration
- Print functionality
- Export to PDF
- Advanced reporting
- Multi-language support

## License

This project is open source and available under the MIT License.
