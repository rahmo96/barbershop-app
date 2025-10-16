# Barbershop App

A modern mobile application for barbershop service booking and management, built with React Native, Expo, and Firebase.

## Features

- **User Authentication**: Secure login, registration, and profile management
- **Service Browsing**: Explore available haircut and grooming services
- **Appointment Booking**: Book, reschedule, and cancel appointments
- **User Profiles**: Manage personal info and view appointment history
- **Multi-language Support**: English & Hebrew (RTL support)
- **Dark Mode**: Responsive light/dark themes
- **Animated UI**: Smooth transitions and interactive elements

## Tech Stack

- **Frontend**: React Native (Expo)
- **Navigation**: Expo Router
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **State Management**: React Context API
- **Authentication**: Firebase Authentication
- **Database**: Firestore
- **Animations**: React Native Reanimated
- **Localization**: Custom context with AsyncStorage

## Project Structure

```
barbershop-app/
├── app/                  # Main application screens
│   ├── (auth)/           # Authentication (login, register)
│   ├── (tabs)/           # Main tabs (home, profile, services, bookings)
│   ├── profile/          # Profile-related screens
│   ├── bookings/         # Booking flow screens
├── components/           # Reusable UI components
├── context/              # React Context providers (User, Localization)
├── services/             # Firebase service functions
├── utils/                # Utility functions and Firebase config
├── assets/               # Static assets and images
├── constants/            # App-wide constants (icons, images)
```

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/barbershop-app.git
   cd barbershop-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure Firebase:**
   - Add your Firebase config to [`utils/firebase.js`](file:///C:/Users/raha1/WebstormProjects/barbershop-app/utils/firebase.js)
   - Enable Email/Password authentication and Firestore in your Firebase project.

4. **Start the development server:**
   ```bash
   npx expo start
   ```

## Firebase Setup

1. Create a Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Enable **Authentication** (Email/Password)
3. Create a **Firestore** database
4. Add your Firebase config to the project

## Scripts

- `npm start` — Start Expo development server
- `npm run android` — Run on Android device/emulator
- `npm run ios` — Run on iOS simulator
- `npm run web` — Run in web browser
- `npm run lint` — Lint the codebase

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.

## Contact

For questions or support, contact:
- Email: raha1996@gmail.com
- GitHub: [rahmo96](https://github.com/rahmo96)
