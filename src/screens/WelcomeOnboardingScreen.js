// src/screens/WelcomeOnboardingScreen.js
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { COLORS, SIZES } from '../config/theme';
import CustomButton from '../components/CustomButton';

const { width, height } = Dimensions.get('window');

const WelcomeOnboardingScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Illustration area */}
      <View style={styles.illustrationArea}>
        <View style={styles.bgCircle1} />
        <View style={styles.bgCircle2} />

        {/* Person figure */}
        <View style={styles.personWrap}>
          <View style={styles.hairShape} />
          <View style={styles.faceCircle} />
          <View style={styles.bodyDress} />
        </View>

        {/* Decorative dots */}
        <View style={[styles.decorDot, { top: 60, right: 50 }]} />
        <View style={[styles.decorDot, { bottom: 80, left: 40, width: 10, height: 10, borderRadius: 5 }]} />
        <View style={[styles.decorHeart, { top: 100, left: 30 }]}>
          <Text style={styles.heartChar}>♥</Text>
        </View>
        <View style={[styles.decorHeart, { bottom: 100, right: 40 }]}>
          <Text style={[styles.heartChar, { fontSize: 14 }]}>♥</Text>
        </View>
      </View>

      {/* Text section */}
      <View style={styles.textSection}>
        <View style={styles.pill} />
        <Text style={styles.welcomeTitle}>Welcome!</Text>
        <Text style={styles.welcomeSubtitle}>
          Answer a few quick questions and we'll personalise the app just for you.
        </Text>

        <CustomButton
          title="Get Started"
          onPress={() => navigation.navigate('OnboardingQuestions')}
          style={styles.continueBtn}
        />

        <Text style={styles.termsText}>
          By tapping "Get Started" you agree to our{' '}
          <Text style={styles.linkText}>Terms of Service</Text>
          {' '}and{' '}
          <Text style={styles.linkText}>Privacy Policy</Text>.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryPink,
  },
  illustrationArea: {
    flex: 0.58,
    backgroundColor: COLORS.lightPink,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    overflow: 'hidden',
  },
  bgCircle1: {
    position: 'absolute',
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: 'rgba(244,143,177,0.15)',
    top: -60,
    right: -40,
  },
  bgCircle2: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(244,143,177,0.1)',
    bottom: -30,
    left: -30,
  },
  personWrap: {
    alignItems: 'center',
  },
  hairShape: {
    width: 90,
    height: 55,
    borderRadius: 45,
    backgroundColor: COLORS.deepPink,
    zIndex: 2,
  },
  faceCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#D4A574',
    marginTop: -18,
    zIndex: 3,
  },
  bodyDress: {
    width: 120,
    height: 130,
    backgroundColor: COLORS.rosePink,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    marginTop: -12,
  },
  decorDot: {
    position: 'absolute',
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: COLORS.rosePink,
    opacity: 0.6,
  },
  decorHeart: {
    position: 'absolute',
  },
  heartChar: {
    fontSize: 18,
    color: COLORS.primaryPink,
  },
  textSection: {
    flex: 0.42,
    alignItems: 'center',
    paddingTop: 28,
    paddingHorizontal: 24,
  },
  pill: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.5)',
    marginBottom: 16,
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.white,
    marginBottom: 10,
  },
  welcomeSubtitle: {
    fontSize: SIZES.font,
    fontWeight: '400',
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  continueBtn: {
    width: '80%',
    paddingVertical: 16,
    marginBottom: 16,
  },
  termsText: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.65)',
    textAlign: 'center',
    lineHeight: 17,
  },
  linkText: {
    textDecorationLine: 'underline',
    fontWeight: '600',
    color: COLORS.white,
  },
});

export default WelcomeOnboardingScreen;
