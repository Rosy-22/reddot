// src/navigation/AppNavigator.js
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';

import { useAuth } from '../context/AuthContext';
import { COLORS } from '../config/theme';

// Auth Screens
import SplashScreen from '../screens/SplashScreen';
import AuthWelcomeScreen from '../screens/AuthWelcomeScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';

// Onboarding Screens
import WelcomeOnboardingScreen from '../screens/WelcomeOnboardingScreen';
import OnboardingQuestionsScreen from '../screens/OnboardingQuestionsScreen';

// Main App Screens
import CyclesScreen from '../screens/CyclesScreen';
import CalendarScreen from '../screens/CalendarScreen';
import InsightsScreen from '../screens/InsightsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom Tab Navigator
const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: COLORS.deepPink,
        tabBarInactiveTintColor: COLORS.grey,
        tabBarLabelStyle: styles.tabLabel,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Cycles':
              iconName = focused ? 'ellipse' : 'ellipse-outline';
              break;
            case 'Calendar':
              iconName = focused ? 'calendar' : 'calendar-outline';
              break;
            case 'Insights':
              iconName = focused ? 'bulb' : 'bulb-outline';
              break;
            case 'Me':
              iconName = focused ? 'person' : 'person-outline';
              break;
          }

          return (
            <View style={focused ? styles.activeTab : null}>
              <Ionicons name={iconName} size={24} color={color} />
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Cycles" component={CyclesScreen} />
      <Tab.Screen name="Calendar" component={CalendarScreen} />
      <Tab.Screen name="Insights" component={InsightsScreen} />
      <Tab.Screen name="Me" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

// Auth Stack
const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AuthWelcome" component={AuthWelcomeScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );
};

// Onboarding Stack
const OnboardingStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="WelcomeOnboarding" component={WelcomeOnboardingScreen} />
      <Stack.Screen name="OnboardingQuestions" component={OnboardingQuestionsScreen} />
    </Stack.Navigator>
  );
};

// Main App Stack (Tabs + Settings)
const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
};

// Root Navigator
const AppNavigator = () => {
  const { user, loading, onboardingComplete } = useAuth();
  const [splashDone, setSplashDone] = useState(false);

  if (loading || !splashDone) {
    return <SplashScreen onComplete={() => setSplashDone(true)} />;
  }

  return (
    <NavigationContainer>
      {!user ? (
        <AuthStack />
      ) : !onboardingComplete ? (
        <OnboardingStack />
      ) : (
        <MainStack />
      )}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.softPink,
    borderTopWidth: 0,
    height: 75,
    paddingBottom: 10,
    paddingTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 10,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
  activeTab: {
    padding: 4,
    borderRadius: 20,
  },
});

export default AppNavigator;
