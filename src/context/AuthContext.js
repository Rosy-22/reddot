// src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth, db } from '../config/firebase';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const AuthContext = createContext({});

const getFriendlyAuthError = (code) => {
  switch (code) {
    case 'auth/email-already-in-use':
      return 'This email is already registered. Try signing in instead.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/weak-password':
      return 'Password must be at least 6 characters.';
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Incorrect email or password.';
    case 'auth/too-many-requests':
      return 'Too many attempts. Please try again later.';
    case 'auth/network-request-failed':
      return 'Network error. Check your internet connection.';
    case 'auth/operation-not-allowed':
      return 'Email/password sign-in is not enabled. Please contact support.';
    default:
      return 'Something went wrong. Please try again.';
  }
};

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [userProfile, setUserProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    sex: 'Female',
    cycleLength: 28,
    periodLength: 5,
    profilePhoto: null,
    remindersActive: true,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        // Fetch user profile from Firestore
        try {
          const docRef = doc(db, 'users', firebaseUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserProfile(docSnap.data());
            setOnboardingComplete(docSnap.data().onboardingComplete || false);
          }
        } catch (error) {
          console.log('Error fetching profile:', error);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, user: result.user };
    } catch (error) {
      const friendlyMessage = getFriendlyAuthError(error.code);
      return { success: false, error: friendlyMessage };
    }
  };

  const register = async (email, password) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      // Create user document in Firestore (non-critical — auth account is already created)
      try {
        await setDoc(doc(db, 'users', result.user.uid), {
          email: email,
          firstName: '',
          lastName: '',
          sex: 'Female',
          cycleLength: 28,
          periodLength: 5,
          profilePhoto: null,
          remindersActive: true,
          onboardingComplete: false,
          createdAt: new Date().toISOString(),
        });
      } catch (firestoreError) {
        console.log('Firestore profile creation failed:', firestoreError.message);
      }
      return { success: true, user: result.user };
    } catch (error) {
      const friendlyMessage = getFriendlyAuthError(error.code);
      return { success: false, error: friendlyMessage };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUserProfile({
        firstName: '',
        lastName: '',
        email: '',
        sex: 'Female',
        cycleLength: 28,
        periodLength: 5,
        profilePhoto: null,
        remindersActive: true,
      });
      setOnboardingComplete(false);
    } catch (error) {
      console.log('Logout error:', error);
    }
  };

  const updateProfile = async (data) => {
    try {
      if (user) {
        await setDoc(doc(db, 'users', user.uid), data, { merge: true });
        setUserProfile((prev) => ({ ...prev, ...data }));
      }
    } catch (error) {
      console.log('Update profile error:', error);
    }
  };

  const completeOnboarding = async (cycleLength, periodLength) => {
    try {
      if (user) {
        await setDoc(
          doc(db, 'users', user.uid),
          { cycleLength, periodLength, onboardingComplete: true },
          { merge: true }
        );
        setUserProfile((prev) => ({
          ...prev,
          cycleLength,
          periodLength,
        }));
        setOnboardingComplete(true);
      }
    } catch (error) {
      console.log('Onboarding error:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        userProfile,
        onboardingComplete,
        login,
        register,
        logout,
        updateProfile,
        completeOnboarding,
        setOnboardingComplete,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
