// src/screens/AuthWelcomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { COLORS, SIZES } from '../config/theme';
import CustomButton from '../components/CustomButton';

const { width, height } = Dimensions.get('window');

const AuthWelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Floral illustration area */}
      <View style={styles.floralArea}>
        {/* Background circles */}
        <View style={styles.bgCircle} />
        <View style={styles.bgCircleSmall} />

        {/* Petal flower — top right */}
        <View style={[styles.flower, { top: 40, right: 50 }]}>
          <View style={styles.flowerCenter} />
          {[...Array(8)].map((_, i) => (
            <View
              key={i}
              style={[styles.petal, { transform: [{ rotate: `${i * 45}deg` }, { translateY: -18 }] }]}
            />
          ))}
        </View>

        {/* Large flower — center left */}
        <View style={[styles.bigFlower, { top: height * 0.12, left: width * 0.08 }]}>
          <View style={styles.bigFlowerCenter} />
          {[...Array(10)].map((_, i) => (
            <View
              key={i}
              style={[styles.bigPetal, { transform: [{ rotate: `${i * 36}deg` }, { translateY: -36 }] }]}
            />
          ))}
        </View>

        {/* Hearts */}
        <Text style={[styles.heart, { top: height * 0.28, right: 55 }]}>♥</Text>
        <Text style={[styles.heart, { top: height * 0.22, left: 35 }]}>♥</Text>

        {/* App branding in center of floral area */}
        <View style={styles.brandContainer}>
          <View style={styles.brandDot} />
          <Text style={styles.brandTitle}>RED DOT</Text>
          <Text style={styles.brandTagline}>Track. Understand. Thrive.</Text>
        </View>
      </View>

      {/* Bottom action section */}
      <View style={styles.bottomSection}>
        <CustomButton
          title="Sign In"
          onPress={() => navigation.navigate('SignIn')}
          style={styles.signInBtn}
        />
        <TouchableOpacity
          style={styles.signUpBtn}
          onPress={() => navigation.navigate('SignUp')}
          activeOpacity={0.8}
        >
          <Text style={styles.signUpText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryPink,
  },
  floralArea: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bgCircle: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: 'rgba(255,255,255,0.12)',
    top: -40,
    right: -40,
  },
  bgCircleSmall: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255,255,255,0.08)',
    bottom: 20,
    left: -20,
  },
  flower: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flowerCenter: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: COLORS.white,
    zIndex: 1,
  },
  petal: {
    position: 'absolute',
    width: 12,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
  bigFlower: {
    position: 'absolute',
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigFlowerCenter: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.white,
    zIndex: 1,
  },
  bigPetal: {
    position: 'absolute',
    width: 22,
    height: 38,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.45)',
  },
  heart: {
    position: 'absolute',
    fontSize: 20,
    color: 'rgba(255,255,255,0.7)',
  },
  brandContainer: {
    alignItems: 'center',
  },
  brandDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: COLORS.white,
    marginBottom: 12,
  },
  brandTitle: {
    fontSize: 48,
    fontWeight: '800',
    color: COLORS.white,
    letterSpacing: 6,
  },
  brandTagline: {
    fontSize: 13,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.75)',
    letterSpacing: 1.5,
    marginTop: 6,
  },
  bottomSection: {
    paddingHorizontal: 30,
    paddingBottom: 50,
    paddingTop: 24,
    gap: 12,
    backgroundColor: 'rgba(244,143,177,0.3)',
  },
  signInBtn: {
    width: '100%',
    paddingVertical: 16,
    alignSelf: 'center',
  },
  signUpBtn: {
    borderWidth: 2,
    borderColor: COLORS.white,
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: 'center',
  },
  signUpText: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    fontWeight: '700',
  },
});

export default AuthWelcomeScreen;
