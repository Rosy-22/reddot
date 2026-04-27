// src/screens/CalendarScreen.js
import React, { useState, useCallback, memo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../config/theme';

const { width } = Dimensions.get('window');
const DAY_SIZE = (width - 64) / 7;

const MONTH_NAMES = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December',
];
const DAY_HEADERS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (month, year) => {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
};

const MonthView = memo(({ monthIndex, year, selectedDates, onToggle }) => {
  const today = new Date();
  const daysInMonth = getDaysInMonth(monthIndex, year);
  const firstDay = getFirstDayOfMonth(monthIndex, year);
  const days = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(<View key={`e-${i}`} style={styles.dayCell} />);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dateKey = `${year}-${monthIndex}-${day}`;
    const isSelected = selectedDates.includes(dateKey);
    const todayFlag =
      monthIndex === today.getMonth() && day === today.getDate() && year === today.getFullYear();

    days.push(
      <TouchableOpacity
        key={day}
        style={[
          styles.dayCell,
          isSelected && styles.dayCellSelected,
          todayFlag && !isSelected && styles.dayCellToday,
        ]}
        onPress={() => onToggle(monthIndex, day)}
        activeOpacity={0.7}
      >
        <Text
          style={[
            styles.dayText,
            isSelected && styles.dayTextSelected,
            todayFlag && !isSelected && styles.dayTextToday,
          ]}
        >
          {day}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.monthContainer}>
      <Text style={styles.monthTitle}>{MONTH_NAMES[monthIndex]}</Text>
      <View style={styles.dayHeaders}>
        {DAY_HEADERS.map((h, i) => (
          <View key={i} style={styles.dayCell}>
            <Text style={styles.dayHeaderText}>{h}</Text>
          </View>
        ))}
      </View>
      <View style={styles.daysGrid}>{days}</View>
    </View>
  );
});

const CalendarScreen = () => {
  const [selectedDates, setSelectedDates] = useState([]);
  const currentYear = new Date().getFullYear();

  const toggleDate = useCallback((month, day) => {
    const dateKey = `${currentYear}-${month}-${day}`;
    setSelectedDates((prev) =>
      prev.includes(dateKey) ? prev.filter((d) => d !== dateKey) : [...prev, dateKey]
    );
  }, [currentYear]);

  const handleAddPeriod = () => {
    if (selectedDates.length === 0) {
      Alert.alert('Select Dates', 'Tap on dates to mark your period days first.');
      return;
    }
    Alert.alert('Period Logged', `${selectedDates.length} day${selectedDates.length > 1 ? 's' : ''} logged as period days.`);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerYear}>{currentYear}</Text>
          <Text style={styles.headerTitle}>Calendar</Text>
        </View>
        <View style={styles.selectedBadge}>
          <Text style={styles.selectedBadgeText}>{selectedDates.length} selected</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {Array.from({ length: 12 }, (_, i) => (
          <MonthView
            key={i}
            monthIndex={i}
            year={currentYear}
            selectedDates={selectedDates}
            onToggle={toggleDate}
          />
        ))}
      </ScrollView>

      {/* Add Period Button */}
      <TouchableOpacity style={styles.addBtn} onPress={handleAddPeriod} activeOpacity={0.85}>
        <Ionicons name="add-circle" size={20} color={COLORS.white} />
        <Text style={styles.addBtnText}>Log Period Days</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.maroon,
    paddingTop: 55,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 22,
    marginBottom: 16,
  },
  headerYear: {
    fontSize: SIZES.small,
    color: 'rgba(255,255,255,0.55)',
    fontWeight: '500',
    letterSpacing: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.white,
  },
  selectedBadge: {
    backgroundColor: COLORS.deepPink,
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 14,
  },
  selectedBadgeText: {
    color: COLORS.white,
    fontSize: SIZES.small,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 22,
    paddingBottom: 100,
  },
  monthContainer: {
    marginBottom: 28,
  },
  monthTitle: {
    color: COLORS.softPink,
    fontSize: SIZES.medium,
    fontWeight: '700',
    marginBottom: 10,
    letterSpacing: 0.5,
  },
  dayHeaders: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  dayCell: {
    width: DAY_SIZE,
    height: DAY_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayCellSelected: {
    backgroundColor: COLORS.deepPink,
    borderRadius: DAY_SIZE / 2,
  },
  dayCellToday: {
    borderWidth: 1.5,
    borderColor: COLORS.softPink,
    borderRadius: DAY_SIZE / 2,
  },
  dayHeaderText: {
    color: 'rgba(255,255,255,0.45)',
    fontSize: 11,
    fontWeight: '700',
  },
  dayText: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: SIZES.font,
    fontWeight: '400',
  },
  dayTextSelected: {
    color: COLORS.white,
    fontWeight: '700',
  },
  dayTextToday: {
    color: COLORS.white,
    fontWeight: '700',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  addBtn: {
    position: 'absolute',
    bottom: 24,
    left: 22,
    right: 22,
    backgroundColor: COLORS.deepPink,
    paddingVertical: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: COLORS.deepPink,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  addBtnText: {
    color: COLORS.white,
    fontSize: SIZES.large,
    fontWeight: '700',
  },
});

export default CalendarScreen;
