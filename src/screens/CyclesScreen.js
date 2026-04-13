// src/screens/CyclesScreen.js
import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { COLORS, SIZES } from '../config/theme';
import { useAuth } from '../context/AuthContext';

const { width } = Dimensions.get('window');
const CIRCLE_SIZE = width * 0.74;
const DOT_COUNT = 28;

const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

const CyclesScreen = () => {
  const { userProfile } = useAuth();
  const [periodLogged, setPeriodLogged] = useState(false);
  const cycleLength = userProfile?.cycleLength || 28;
  const periodLength = userProfile?.periodLength || 5;

  const today = new Date();
  const currentDate = `${today.getDate()} ${monthNames[today.getMonth()]}`;
  const cycleDay = 11;
  const ovulationIn = Math.max(0, 14 - cycleDay);

  const dots = useMemo(() => {
    const items = [];
    for (let i = 0; i < DOT_COUNT; i++) {
      const angle = (i / DOT_COUNT) * 2 * Math.PI - Math.PI / 2;
      const radius = CIRCLE_SIZE / 2 - 16;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      let color = 'rgba(255,255,255,0.25)';
      let size = 9;

      if (i < periodLength) {
        color = COLORS.periodRed;
        size = 13;
      } else if (i >= DOT_COUNT - 4) {
        color = COLORS.pmsYellow;
        size = 10;
      } else if (i >= 10 && i <= 17) {
        color = COLORS.fertileGreen;
        size = 12;
      }

      items.push({ x, y, color, size, day: i + 1 });
    }
    return items;
  }, [periodLength]);

  const handleLogPeriod = () => {
    setPeriodLogged(!periodLogged);
    Alert.alert(
      periodLogged ? 'Period Removed' : 'Period Logged',
      periodLogged ? 'Period log removed for today.' : 'Your period has been logged for today!'
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.bgCircle} />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerGreeting}>Good morning</Text>
          <Text style={styles.headerDate}>{currentDate}</Text>
        </View>
        <View style={styles.cycleBadge}>
          <Text style={styles.cycleBadgeText}>Day {cycleDay}</Text>
        </View>
      </View>

      {/* Cycle circle */}
      <View style={styles.circleContainer}>
        <View style={styles.outerRing}>
          {dots.map((dot, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                {
                  left: CIRCLE_SIZE / 2 + dot.x - dot.size / 2,
                  top: CIRCLE_SIZE / 2 + dot.y - dot.size / 2,
                  width: dot.size,
                  height: dot.size,
                  borderRadius: dot.size / 2,
                  backgroundColor: dot.color,
                },
              ]}
            />
          ))}

          {/* Inner circle */}
          <View style={styles.innerCircle}>
            <Text style={styles.ovulationLabel}>Ovulation in</Text>
            <Text style={styles.ovulationDays}>{ovulationIn}</Text>
            <Text style={styles.ovulationUnit}>days</Text>
            <View style={styles.innerDivider} />
            <Text style={styles.innerDate}>{currentDate}</Text>
          </View>
        </View>
      </View>

      {/* Legend */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: COLORS.periodRed }]} />
          <Text style={styles.legendText}>Period</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: COLORS.fertileGreen }]} />
          <Text style={styles.legendText}>Fertile</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: COLORS.pmsYellow }]} />
          <Text style={styles.legendText}>PMS</Text>
        </View>
      </View>

      {/* CTA */}
      <TouchableOpacity
        style={[styles.logBtn, periodLogged && styles.logBtnLogged]}
        onPress={handleLogPeriod}
        activeOpacity={0.85}
      >
        <Text style={styles.logBtnText}>
          {periodLogged ? '✓  Period Logged' : 'Log Period Today'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryPink,
    alignItems: 'center',
    paddingTop: 55,
  },
  bgCircle: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(255,255,255,0.07)',
    top: -80,
    right: -80,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    marginBottom: 18,
  },
  headerGreeting: {
    fontSize: SIZES.small,
    color: 'rgba(255,255,255,0.75)',
    fontWeight: '500',
  },
  headerDate: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.white,
  },
  cycleBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
  },
  cycleBadgeText: {
    color: COLORS.white,
    fontSize: SIZES.font,
    fontWeight: '700',
  },
  circleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  outerRing: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  dot: {
    position: 'absolute',
  },
  innerCircle: {
    width: CIRCLE_SIZE * 0.58,
    height: CIRCLE_SIZE * 0.58,
    borderRadius: (CIRCLE_SIZE * 0.58) / 2,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
  },
  ovulationLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '500',
  },
  ovulationDays: {
    fontSize: 44,
    fontWeight: '800',
    color: COLORS.white,
    lineHeight: 50,
  },
  ovulationUnit: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '500',
    marginBottom: 8,
  },
  innerDivider: {
    width: 30,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.35)',
    marginBottom: 8,
  },
  innerDate: {
    fontSize: SIZES.font,
    fontWeight: '700',
    color: COLORS.white,
  },
  legend: {
    flexDirection: 'row',
    gap: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 20,
    marginBottom: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    color: COLORS.white,
    fontSize: SIZES.small,
    fontWeight: '600',
  },
  logBtn: {
    backgroundColor: COLORS.deepPink,
    width: '88%',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: COLORS.deepPink,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  logBtnLogged: {
    backgroundColor: COLORS.maroon,
  },
  logBtnText: {
    color: COLORS.white,
    fontSize: SIZES.large,
    fontWeight: '700',
  },
});

export default CyclesScreen;
