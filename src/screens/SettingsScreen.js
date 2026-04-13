// src/screens/SettingsScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { COLORS, SIZES } from '../config/theme';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { useAuth } from '../context/AuthContext';

const SettingsScreen = ({ navigation }) => {
  const { userProfile, updateProfile } = useAuth();
  const [firstName, setFirstName] = useState(userProfile?.firstName || '');
  const [lastName, setLastName] = useState(userProfile?.lastName || '');
  const [email, setEmail] = useState(userProfile?.email || '');
  const [sex, setSex] = useState(userProfile?.sex || 'Female');
  const [profileImage, setProfileImage] = useState(userProfile?.profilePhoto || null);
  const [saving, setSaving] = useState(false);

  const pickImage = async () => {
    Alert.alert(
      'Change Photo',
      'Choose a method',
      [
        {
          text: 'Take Photo',
          onPress: async () => {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
              Alert.alert('Permission needed', 'Camera permission is required.');
              return;
            }
            const result = await ImagePicker.launchCameraAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [1, 1],
              quality: 0.8,
            });
            if (!result.canceled) {
              setProfileImage(result.assets[0].uri);
            }
          },
        },
        {
          text: 'Choose from Gallery',
          onPress: async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              Alert.alert('Permission needed', 'Gallery permission is required.');
              return;
            }
            const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [1, 1],
              quality: 0.8,
            });
            if (!result.canceled) {
              setProfileImage(result.assets[0].uri);
            }
          },
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleSave = async () => {
    setSaving(true);
    await updateProfile({
      firstName,
      lastName,
      email,
      sex,
      profilePhoto: profileImage,
    });
    setSaving(false);
    Alert.alert('Saved', 'Your profile has been updated.');
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={28} color={COLORS.white} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Ionicons name="settings-outline" size={26} color={COLORS.white} />
          </TouchableOpacity>
        </View>

        {/* Profile Photo */}
        <TouchableOpacity style={styles.photoContainer} onPress={pickImage} activeOpacity={0.85}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <View style={styles.photoPlaceholder}>
              <Ionicons name="person" size={40} color={COLORS.softPink} />
            </View>
          )}
          <View style={styles.cameraOverlay}>
            <Ionicons name="camera" size={15} color={COLORS.white} />
          </View>
        </TouchableOpacity>

        {/* Account Section */}
        <Text style={styles.sectionTitle}>Account</Text>

        <CustomInput
          label="First Name"
          value={firstName}
          onChangeText={setFirstName}
          placeholder="Enter first name"
          autoCapitalize="words"
        />

        <CustomInput
          label="Last Name"
          value={lastName}
          onChangeText={setLastName}
          placeholder="Enter last name"
          autoCapitalize="words"
        />

        <CustomInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="Enter email"
          keyboardType="email-address"
        />

        {/* Sex selector */}
        <View style={styles.sexContainer}>
          <Text style={styles.sexLabel}>Sex</Text>
          <View style={styles.sexOptions}>
            {['Female', 'Male', 'Other'].map((option) => (
              <TouchableOpacity
                key={option}
                style={[styles.sexOption, sex === option && styles.sexOptionSelected]}
                onPress={() => setSex(option)}
              >
                <Text
                  style={[styles.sexOptionText, sex === option && styles.sexOptionTextSelected]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Save Button */}
        <CustomButton
          title="Save Changes"
          onPress={handleSave}
          loading={saving}
          variant="dark"
          style={styles.saveBtn}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryPink,
  },
  scrollContent: {
    paddingTop: 50,
    paddingBottom: 40,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  photoContainer: {
    marginBottom: 24,
    position: 'relative',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: COLORS.white,
  },
  photoPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.deepPink,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: COLORS.white,
  },
  cameraOverlay: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: COLORS.deepPink,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  sectionTitle: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '700',
    alignSelf: 'flex-start',
    paddingLeft: '7.5%',
    marginBottom: 10,
  },
  sexContainer: {
    width: '85%',
    marginVertical: 12,
  },
  sexLabel: {
    color: COLORS.white,
    fontSize: SIZES.font,
    fontWeight: '600',
    marginBottom: 10,
  },
  sexOptions: {
    flexDirection: 'row',
    gap: 10,
  },
  sexOption: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.white,
  },
  sexOptionSelected: {
    backgroundColor: COLORS.deepPink,
    borderColor: COLORS.deepPink,
  },
  sexOptionText: {
    color: COLORS.white,
    fontSize: SIZES.font,
    fontWeight: '500',
  },
  sexOptionTextSelected: {
    fontWeight: '700',
  },
  saveBtn: {
    marginTop: 25,
    width: '75%',
  },
});

export default SettingsScreen;
