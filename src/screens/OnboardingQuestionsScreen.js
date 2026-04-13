// src/screens/OnboardingQuestionsScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { COLORS, SIZES } from '../config/theme';
import CustomButton from '../components/CustomButton';
import { useAuth } from '../context/AuthContext';

const { width } = Dimensions.get('window');

const OnboardingQuestionsScreen = () => {
  const [step, setStep] = useState(0);
  const [cycleLength, setCycleLength] = useState(28);
  const [periodLength, setPeriodLength] = useState(5);
  const { completeOnboarding } = useAuth();

  const questions = [
    {
      title: 'How long is your\naverage cycle?',
      subtitle: 'Most cycles are between 21–35 days',
      unit: 'days',
      value: cycleLength,
      setValue: setCycleLength,
      min: 20,
      max: 45,
    },
    {
      title: 'How long does your\nperiod usually last?',
      subtitle: 'Most periods last between 3–7 days',
      unit: 'days',
      value: periodLength,
      setValue: setPeriodLength,
      min: 1,
      max: 10,
    },
  ];

  const q = questions[step];

  const decrement = () => q.setValue(Math.max(q.min, q.value - 1));
  const increment = () => q.setValue(Math.min(q.max, q.value + 1));

  const handleContinue = async () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      await completeOnboarding(cycleLength, periodLength);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.bgCircle1} />
      <View style={styles.bgCircle2} />

      {/* Step indicator */}
      <View style={styles.stepRow}>
        {questions.map((_, i) => (
          <View key={i} style={[styles.stepDot, i === step && styles.stepDotActive]} />
        ))}
      </View>

      {/* Question */}
      <View style={styles.questionWrap}>
        <Text style={styles.questionTitle}>{q.title}</Text>
        <Text style={styles.questionSubtitle}>{q.subtitle}</Text>
      </View>

      {/* Number picker */}
      <View style={styles.pickerCard}>
        <TouchableOpacity style={styles.operatorBtn} onPress={decrement}>
          <Text style={styles.operatorText}>−</Text>
        </TouchableOpacity>

        <View style={styles.numberWrap}>
          <Text style={styles.numberText}>{q.value}</Text>
          <Text style={styles.unitText}>{q.unit}</Text>
        </View>

        <TouchableOpacity style={styles.operatorBtn} onPress={increment}>
          <Text style={styles.operatorText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Range hint */}
      <Text style={styles.rangeHint}>
        {q.min} – {q.max} days
      </Text>

      <CustomButton
        title={step < questions.length - 1 ? 'Next' : 'Finish'}
        onPress={handleContinue}
        style={styles.continueBtn}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryPink,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  bgCircle1: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: 'rgba(255,255,255,0.08)',
    top: -60,
    right: -60,
  },
  bgCircle2: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(255,255,255,0.06)',
    bottom: 80,
    left: -40,
  },
  stepRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 48,
  },
  stepDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.35)',
  },
  stepDotActive: {
    width: 24,
    backgroundColor: COLORS.white,
  },
  questionWrap: {
    alignItems: 'center',
    marginBottom: 48,
  },
  questionTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.white,
    textAlign: 'center',
    lineHeight: 34,
    marginBottom: 8,
  },
  questionSubtitle: {
    fontSize: SIZES.font,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
  },
  pickerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: 24,
    paddingVertical: 20,
    paddingHorizontal: 28,
    gap: 28,
    marginBottom: 16,
    width: width * 0.78,
    justifyContent: 'center',
  },
  operatorBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  operatorText: {
    fontSize: 28,
    fontWeight: '300',
    color: COLORS.deepPink,
    lineHeight: 32,
  },
  numberWrap: {
    alignItems: 'center',
    minWidth: 80,
  },
  numberText: {
    fontSize: 60,
    fontWeight: '800',
    color: COLORS.white,
    lineHeight: 68,
  },
  unitText: {
    fontSize: SIZES.small,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '500',
    marginTop: 2,
  },
  rangeHint: {
    fontSize: SIZES.small,
    color: 'rgba(255,255,255,0.55)',
    marginBottom: 44,
  },
  continueBtn: {
    width: '85%',
    paddingVertical: 16,
  },
});

export default OnboardingQuestionsScreen;
