# Red Dot - Women's Health & Period Tracker

**Student:** Roshni Budha  
**Student ID:** 1036224  
**Course:** Project 1 - Milestone 3

---

## Project Description

Red Dot is a comprehensive women's health and menstrual cycle tracking mobile application built with React Native (Expo). The app empowers users to monitor their menstrual cycles, log daily symptoms, track moods, and access personalised health insights — all wrapped in a warm, approachable pink-themed design.

### Key Highlights
- Full authentication flow with Firebase (Email/Password + Google/Apple placeholders)
- Personalised onboarding experience to customise cycle tracking
- Interactive circular cycle visualisation showing Period, PMS, and Fertile windows
- Full-year calendar with tap-to-log period days
- Daily insights logging (Mood, Symptoms, Discharge, Flow, Notes)
- Profile management with camera and gallery image support
- Firebase Firestore for cloud data persistence

---

## Screenshots

| Splash | Auth Welcome | Sign In | Sign Up |
|--------|-------------|---------|---------|
| Splash screen with app branding | Welcome screen with Sign In/Sign Up options | Email + password login with Apple/Google | New account registration |

| Onboarding | Cycle Tracker | Calendar | Insights |
|------------|--------------|----------|----------|
| Personalisation questions | Circular cycle view with phase indicators | Full-year calendar with period logging | Daily mood, symptom & flow tracking |

| Profile | Settings |
|---------|----------|
| User profile with photo, reminders | Edit profile with camera integration |

---

## Features

### Authentication
- Email and password sign in / sign up
- Firebase Authentication integration
- Sign In with Apple button (placeholder for Expo Apple Auth)
- Continue with Google button (placeholder for Expo Google Auth)
- Forgot Password link
- Input validation and error handling

### Onboarding & Personalisation
- Welcome screen with terms of service agreement
- Step-by-step personalisation questions:
  - Average cycle length (20–45 days)
  - Average period length (1–10 days)
- Number picker UI with smooth selection
- Data saved to Firebase Firestore

### Cycle Tracker (Home Screen)
- Circular visualisation with 28 dots representing cycle days
- Color-coded phases: Period (red), PMS (yellow), Fertile (green)
- Current date and cycle day display
- Ovulation countdown
- "Log Period" and "Log For Today" buttons
- Phase labels and legend

### Calendar
- Full 12-month scrollable calendar view
- Monday-start week layout
- Tap to select/deselect period dates
- "Add Period" button to confirm logging
- Dark maroon theme matching Figma design

### Insights & Daily Logging
- **Mood:** Calm, Energetic, Happy, Sad, Anxious, Irritable
- **Sex:** Protected Sex, No
- **Symptoms:** Headache, Fatigue, Cramps, Back Pain, Bloating, Nausea
- **Discharge:** Spotting, Sticky, Creamy, Watery, Dry
- **Heaviness of Flow:** Light, Medium, Heavy
- **Notes:** Free-text input
- Recommended articles section based on cycle phase

### Profile & Settings
- Profile photo with camera capture and gallery selection
- Display name and email
- Reminders status indicator
- Edit profile screen with:
  - First Name, Last Name, Email fields
  - Sex selector (Female, Male, Other)
  - Profile photo change (camera + gallery)
  - Save to Firebase Firestore

### Camera Integration
- **Image Capture:** Take profile photos directly within the app using device camera
- **Image Selection:** Choose images from the device's photo gallery
- **Image Display:** Profile photos displayed as circular thumbnails on Profile and Settings screens
- Uses `expo-image-picker` with proper permission handling for both iOS and Android

### Navigation
- Stack Navigator for auth flow and onboarding
- Bottom Tab Navigator with 4 tabs: Cycles, Calendar, Insights, Me
- Nested stack for Settings screen within main app
- Conditional navigation based on auth state and onboarding completion

---

## Tech Stack

- **Framework:** React Native with Expo SDK 50
- **Navigation:** React Navigation 6 (Stack + Bottom Tabs)
- **Backend:** Firebase Authentication + Firestore
- **Camera:** expo-image-picker, expo-camera
- **Icons:** @expo/vector-icons (Ionicons)
- **State Management:** React Context API
- **Animations:** react-native-reanimated

---

## How to Run the App

### Prerequisites
- Node.js (v18+)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app on your phone (iOS/Android) OR an emulator

### Setup Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/red-dot.git
   cd red-dot
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Firebase:**
   - Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
   - Enable Email/Password authentication
   - Create a Firestore database
   - Copy your Firebase config into `src/config/firebase.js`

4. **Start the development server:**
   ```bash
   npx expo start
   ```

5. **Run on device or emulator:**
   - Scan the QR code with Expo Go (phone)
   - Press `i` for iOS simulator
   - Press `a` for Android emulator

---

## Project Structure

```
RedDot/
├── App.js                          # Main entry point
├── app.json                        # Expo configuration
├── package.json                    # Dependencies
├── babel.config.js                 # Babel configuration
├── assets/                         # App icons and splash images
└── src/
    ├── config/
    │   ├── firebase.js             # Firebase initialisation
    │   └── theme.js                # Colors, fonts, sizes
    ├── context/
    │   └── AuthContext.js          # Authentication state management
    ├── components/
    │   ├── CustomButton.js         # Reusable button component
    │   └── CustomInput.js          # Reusable text input component
    ├── navigation/
    │   └── AppNavigator.js         # All navigation (auth, onboarding, tabs)
    └── screens/
        ├── SplashScreen.js         # App splash/loading screen
        ├── AuthWelcomeScreen.js    # Sign In / Sign Up choice
        ├── SignInScreen.js         # Login with email/password
        ├── SignUpScreen.js         # Register new account
        ├── WelcomeOnboardingScreen.js  # Welcome + terms
        ├── OnboardingQuestionsScreen.js # Cycle personalisation
        ├── CyclesScreen.js         # Home - circular cycle tracker
        ├── CalendarScreen.js       # Full-year calendar view
        ├── InsightsScreen.js       # Daily logging + articles
        ├── ProfileScreen.js        # User profile + camera
        └── SettingsScreen.js       # Edit profile settings
```

---

## Dependencies

| Package | Purpose |
|---------|---------|
| expo | Expo SDK framework |
| react-native | Core React Native |
| @react-navigation/native | Navigation framework |
| @react-navigation/native-stack | Stack navigator |
| @react-navigation/bottom-tabs | Bottom tab navigator |
| firebase | Firebase Auth + Firestore |
| expo-image-picker | Camera and gallery access |
| expo-camera | Camera permissions |
| @expo/vector-icons | Ionicons icon set |
| react-native-safe-area-context | Safe area handling |
| react-native-screens | Native screen components |
| react-native-gesture-handler | Gesture support |
| react-native-reanimated | Animations |

---

## Development Challenges & Learning Outcomes

### Challenges
- Implementing the circular cycle tracker with precisely positioned dots using trigonometry
- Managing complex navigation flows (auth → onboarding → main app) with conditional rendering
- Handling camera permissions across iOS and Android with graceful fallbacks
- Designing a consistent pink theme that matches the Figma prototype across all screens

### Learning Outcomes
- Deepened understanding of React Native component architecture and reusable components
- Gained experience with Firebase Authentication and Firestore for real-time data
- Learned mobile-specific UX patterns (onboarding flows, bottom tab navigation, image picking)
- Improved skills in state management using React Context API

### Next Steps
- Implement push notifications for period reminders
- Add data visualisation charts for cycle history
- Integrate Apple Health / Google Fit for health data sync
- Add multi-language support
- Implement offline-first data storage with AsyncStorage fallback

---

## License

This project was developed as part of an academic assignment. All rights reserved.
