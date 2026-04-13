// src/screens/SplashScreen.js
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../config/theme';

const SplashScreen = ({ navigation, onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onComplete) onComplete();
      else if (navigation) navigation.replace('AuthWelcome');
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigation, onComplete]);

  return (
    <View style={styles.container}>
      <View style={styles.bgCircle1} />
      <View style={styles.bgCircle2} />

      <View style={styles.logoRing}>
        <View style={styles.logoDot} />
      </View>

      <Text style={styles.title}>RED DOT</Text>
      <Text style={styles.tagline}>Your cycle, your power</Text>

      <View style={styles.dotsRow}>
        <View style={[styles.dot, styles.dotActive]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.deepPink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bgCircle1: {
    position: 'absolute',
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: 'rgba(255,255,255,0.07)',
    top: -90,
    right: -90,
  },
  bgCircle2: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(255,255,255,0.05)',
    bottom: 60,
    left: -60,
  },
  logoRing: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 28,
  },
  logoDot: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: COLORS.white,
  },
  title: {
    color: COLORS.white,
    fontSize: 42,
    fontWeight: '800',
    letterSpacing: 8,
  },
  tagline: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    fontWeight: '400',
    marginTop: 10,
    letterSpacing: 1,
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 52,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  dotActive: {
    width: 22,
    backgroundColor: COLORS.white,
  },
});

export default SplashScreen;
