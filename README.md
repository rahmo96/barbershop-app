# Barbershop App

A modern mobile application for barbershop service booking and management built with React Native and Expo.

## Features

- **User Authentication**: Secure login and registration system
- **Service Browsing**: View available haircut and grooming services
- **Appointment Booking**: Schedule, reschedule, and cancel appointments
- **User Profiles**: Manage personal information and view appointment history
- **Multi-language Support**: Available in multiple languages
- **Dark Mode**: Fully responsive light and dark theme support
- **Animated UI**: Smooth transitions and interactive elements

## Tech Stack

- **Frontend**: React Native with Expo
- **Navigation**: Expo Router
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **State Management**: React Context API
- **Authentication**: Firebase Authentication
- **Database**: Firestore
- **Animations**: React Native Reanimated
- **Localization**: Custom localization context

## Project Structure

```
barbershop/
├── app/                  # Main application screens
│   ├── (auth)/           # Authentication screens (login, register)
│   ├── (tabs)/           # Main app tabs (home, profile, services, bookings)
├── components/           # Reusable UI components
├── context/              # React Context providers
├── services/             # Firebase service functions
├── utils/                # Utility functions and Firebase config
├── assets/               # Static assets and images
```

## Getting Started

### Prerequisites

- Node.js (v14 or newer)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/barbershop.git
   cd barbershop
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up your Firebase configuration in `utils/firebase.ts`

4. Start the development server:
   ```bash
   npx expo start
   ```

## Firebase Setup

1. Create a new Firebase project
2. Enable Authentication with Email/Password
3. Create a Firestore database
4. Add your Firebase configuration to the project

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For questions or support, please contact:
- Email: raha1996@gmail.com
- GitHub: [rahmo96](https://github.com/rahmo96)
