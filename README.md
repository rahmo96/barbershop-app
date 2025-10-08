
```markdown
# Elegant Cuts - Barbershop App

A modern mobile application for barbershop service booking and management built with React Native and Expo.

## Features

- **User Authentication**: Secure login and registration system
- **Service Browsing**: View available haircut and grooming services with variants and add-ons
- **Appointment Booking**: Schedule, reschedule, and cancel appointments
- **User Profiles**: Manage personal information and view appointment history
- **Multi-language Support**: Available in English and Hebrew
- **Dark Mode**: Fully responsive light and dark theme support
- **Animated UI**: Smooth transitions and interactive elements
- **Accessibility**: Screen reader support and semantic elements

## Tech Stack

- **Frontend**: React Native with Expo
- **Navigation**: Expo Router
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **State Management**: React Context API
- **Authentication**: Firebase Authentication
- **Database**: Firebase Firestore
- **Animations**: React Native Reanimated
- **Localization**: Custom localization context

## Project Structure

```
barbershop-app/
├── app/                  # Main application screens
│   ├── (auth)/           # Authentication screens (login, register)
│   ├── (tabs)/           # Main app tabs (home, profile, services, bookings)
│   ├── bookings/         # Booking-related screens
│   ├── profile/          # Profile-related screens
│   ├── services/         # Service detail screens
├── components/           # Reusable UI components
├── context/              # React Context providers (User, Localization)
├── services/             # Firebase service functions
│   ├── appointments.ts   # Appointment management
│   ├── services.ts       # Services data
│   ├── timeSlots.ts      # Time slot availability
│   └── users.ts          # User data management
├── utils/                # Utility functions and Firebase config
├── assets/               # Static assets, images, and fonts
```

## Getting Started

### Prerequisites

- Node.js (v14 or newer)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/barbershop-app.git
   cd barbershop-app
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up your Firebase configuration in `utils/firebase.js`

4. Start the development server:
   ```bash
   npx expo start
   ```

## Firebase Setup

1. Create a new Firebase project
2. Enable Authentication with Email/Password
3. Create a Firestore database with the following collections:
   - `users`: User profiles
   - `services`: Available services with variants and add-ons
   - `appointments`: Booking information
   - `timeSlots`: Available time slots
4. Add your Firebase configuration to `utils/firebase.js`

## Key Features Implementation

### Appointment Booking Flow

The app implements a complete appointment booking flow:
1. Browse and select a service
2. Choose service variants and optional add-ons
3. Select a date from the calendar
4. Choose an available time slot
5. Confirm booking details
6. View and manage bookings

### Multilingual Support

The application supports multiple languages through the custom `LocalizationContext`, with easy language switching directly in the UI.

### User Authentication

Full authentication flow with registration, login, and profile management using Firebase Authentication.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.


## Contact

For questions or support, please contact:
- Email: raha1996@gmail.com
- GitHub: [rahmo96](https://github.com/rahmo96)
```

This README provides a comprehensive overview of your project, its features, structure, and setup instructions. Feel free to adjust any details to better match your specific requirements or preferences.
