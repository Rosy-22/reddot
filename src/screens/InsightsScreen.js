// src/screens/InsightsScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../config/theme';

const { width } = Dimensions.get('window');

const MOOD_OPTIONS = ['Calm', 'Energetic', 'Happy', 'Sad', 'Anxious', 'Irritable'];
const SEX_OPTIONS = ['Protected Sex', 'No'];
const SYMPTOM_OPTIONS = ['Headache', 'Fatigue', 'Cramps', 'Back Pain', 'Bloating', 'Nausea'];
const DISCHARGE_OPTIONS = ['Spotting', 'Sticky', 'Creamy', 'Watery', 'Dry'];
const FLOW_OPTIONS = ['Light', 'Medium', 'Heavy'];

const ARTICLES = [
  {
    id: '1',
    title: 'Understanding Your Cycle',
    subtitle: 'Learn how to track and understand your menstrual cycle phases.',
    color: COLORS.rosePink,
  },
  {
    id: '2',
    title: 'Nutrition During Your Period',
    subtitle: 'Foods that can help ease period symptoms and boost energy.',
    color: COLORS.deepPink,
  },
  {
    id: '3',
    title: 'Exercise and Menstruation',
    subtitle: 'Safe and beneficial exercises during your period.',
    color: COLORS.maroon,
  },
];

const ChipRow = ({ options, selected, onSelect, multiSelect = true }) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.chipRow}
  >
    {options.map((option) => {
      const isSelected = multiSelect ? selected.includes(option) : selected === option;
      return (
        <TouchableOpacity
          key={option}
          style={[styles.chip, isSelected && styles.chipSelected]}
          onPress={() => onSelect(option)}
          activeOpacity={0.75}
        >
          <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
            {option}
          </Text>
        </TouchableOpacity>
      );
    })}
  </ScrollView>
);

const InsightsScreen = () => {
  const [selectedMood, setSelectedMood] = useState([]);
  const [selectedSex, setSelectedSex] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [selectedDischarge, setSelectedDischarge] = useState([]);
  const [selectedFlow, setSelectedFlow] = useState('');
  const [notes, setNotes] = useState('');

  const today = new Date();
  const dateStr = today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  const toggleMulti = (item, selected, setSelected) => {
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const sections = [
    {
      icon: 'happy-outline',
      label: 'Mood',
      content: (
        <ChipRow
          options={MOOD_OPTIONS}
          selected={selectedMood}
          onSelect={(item) => toggleMulti(item, selectedMood, setSelectedMood)}
        />
      ),
    },
    {
      icon: 'heart-outline',
      label: 'Sex',
      content: (
        <ChipRow
          options={SEX_OPTIONS}
          selected={selectedSex}
          onSelect={(item) => setSelectedSex(item)}
          multiSelect={false}
        />
      ),
    },
    {
      icon: 'fitness-outline',
      label: 'Symptoms',
      content: (
        <ChipRow
          options={SYMPTOM_OPTIONS}
          selected={selectedSymptoms}
          onSelect={(item) => toggleMulti(item, selectedSymptoms, setSelectedSymptoms)}
        />
      ),
    },
    {
      icon: 'water-outline',
      label: 'Discharge',
      content: (
        <ChipRow
          options={DISCHARGE_OPTIONS}
          selected={selectedDischarge}
          onSelect={(item) => toggleMulti(item, selectedDischarge, setSelectedDischarge)}
        />
      ),
    },
    {
      icon: 'water',
      label: 'Flow',
      content: (
        <ChipRow
          options={FLOW_OPTIONS}
          selected={selectedFlow}
          onSelect={(item) => setSelectedFlow(item)}
          multiSelect={false}
        />
      ),
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerDate}>{dateStr}</Text>
          <Text style={styles.headerTitle}>Today's Log</Text>
        </View>
        <View style={styles.headerDot} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Tracking sections */}
        <View style={styles.trackCard}>
          {sections.map((section, index) => (
            <View key={section.label}>
              <View style={styles.section}>
                <View style={styles.sectionLabel}>
                  <Ionicons name={section.icon} size={18} color={COLORS.deepPink} />
                  <Text style={styles.sectionTitle}>{section.label}</Text>
                </View>
                {section.content}
              </View>
              {index < sections.length - 1 && <View style={styles.sectionDivider} />}
            </View>
          ))}
        </View>

        {/* Notes */}
        <View style={styles.notesCard}>
          <View style={styles.sectionLabel}>
            <Ionicons name="create-outline" size={18} color={COLORS.deepPink} />
            <Text style={styles.sectionTitle}>Notes</Text>
          </View>
          <TextInput
            style={styles.notesInput}
            value={notes}
            onChangeText={setNotes}
            placeholder="How are you feeling today?"
            placeholderTextColor={COLORS.lightGrey}
            multiline
            numberOfLines={3}
          />
        </View>

        {/* Articles */}
        <View style={styles.articlesHeader}>
          <Text style={styles.articlesTitle}>For You</Text>
          <Text style={styles.articlesSubtitle}>Based on your cycle</Text>
        </View>

        {ARTICLES.map((article) => (
          <TouchableOpacity key={article.id} style={styles.articleCard} activeOpacity={0.8}>
            <View style={[styles.articleAccent, { backgroundColor: article.color }]} />
            <View style={styles.articleContent}>
              <Text style={styles.articleTitle}>{article.title}</Text>
              <Text style={styles.articleSubtitle}>{article.subtitle}</Text>
              <View style={styles.articleReadMore}>
                <Text style={styles.readMoreText}>Read more</Text>
                <Ionicons name="arrow-forward" size={14} color={COLORS.deepPink} />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryPink,
    paddingTop: 55,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 22,
    marginBottom: 16,
  },
  headerDate: {
    fontSize: SIZES.small,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '500',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.white,
  },
  headerDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.white,
    opacity: 0.6,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  trackCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  section: {
    paddingVertical: 12,
  },
  sectionLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  sectionTitle: {
    color: COLORS.black,
    fontSize: SIZES.font,
    fontWeight: '700',
  },
  sectionDivider: {
    height: 1,
    backgroundColor: COLORS.lightGrey,
  },
  chipRow: {
    flexDirection: 'row',
    gap: 8,
    paddingBottom: 2,
  },
  chip: {
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: COLORS.softPink,
    backgroundColor: 'transparent',
  },
  chipSelected: {
    backgroundColor: COLORS.deepPink,
    borderColor: COLORS.deepPink,
  },
  chipText: {
    color: COLORS.deepPink,
    fontSize: SIZES.small,
    fontWeight: '600',
  },
  chipTextSelected: {
    color: COLORS.white,
  },
  notesCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  notesInput: {
    borderWidth: 1.5,
    borderColor: COLORS.softPink,
    borderRadius: 12,
    padding: 12,
    color: COLORS.black,
    fontSize: SIZES.font,
    minHeight: 72,
    textAlignVertical: 'top',
  },
  articlesHeader: {
    marginBottom: 12,
  },
  articlesTitle: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '800',
  },
  articlesSubtitle: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: SIZES.small,
    fontWeight: '400',
  },
  articleCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    marginBottom: 10,
    flexDirection: 'row',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },
  articleAccent: {
    width: 5,
  },
  articleContent: {
    flex: 1,
    padding: 14,
  },
  articleTitle: {
    color: COLORS.black,
    fontSize: SIZES.font,
    fontWeight: '700',
    marginBottom: 4,
  },
  articleSubtitle: {
    color: COLORS.grey,
    fontSize: SIZES.small,
    lineHeight: 18,
    marginBottom: 8,
  },
  articleReadMore: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  readMoreText: {
    color: COLORS.deepPink,
    fontSize: SIZES.small,
    fontWeight: '600',
  },
});

export default InsightsScreen;
