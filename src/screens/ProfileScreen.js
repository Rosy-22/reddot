// src/screens/ProfileScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { COLORS, SIZES } from '../config/theme';
import { useAuth } from '../context/AuthContext';

const ProfileScreen = ({ navigation }) => {
  const { userProfile, updateProfile, logout } = useAuth();
  const [profileImage, setProfileImage] = useState(userProfile?.profilePhoto || null);

  const pickImage = async () => {
    Alert.alert('Profile Photo', 'Choose how you want to add a photo', [
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
            const uri = result.assets[0].uri;
            setProfileImage(uri);
            updateProfile({ profilePhoto: uri });
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
            const uri = result.assets[0].uri;
            setProfileImage(uri);
            updateProfile({ profilePhoto: uri });
          }
        },
      },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const handleLogout = () => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Log Out', style: 'destructive', onPress: logout },
    ]);
  };

  const displayName = [userProfile?.firstName, userProfile?.lastName]
    .filter(Boolean)
    .join(' ') || 'Your Name';

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Header bar */}
      <View style={styles.topBar}>
        <Text style={styles.screenTitle}>Profile</Text>
        <TouchableOpacity
          style={styles.settingsBtn}
          onPress={() => navigation.navigate('Settings')}
        >
          <Ionicons name="settings-outline" size={22} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      {/* Avatar section */}
      <View style={styles.avatarSection}>
        <TouchableOpacity style={styles.avatarWrap} onPress={pickImage} activeOpacity={0.85}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Ionicons name="person" size={44} color={COLORS.softPink} />
            </View>
          )}
          <View style={styles.cameraOverlay}>
            <Ionicons name="camera" size={16} color={COLORS.white} />
          </View>
        </TouchableOpacity>

        <Text style={styles.userName}>{displayName}</Text>
        <Text style={styles.userEmail}>{userProfile?.email || ''}</Text>
      </View>

      {/* Stats card */}
      <View style={styles.statsCard}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{userProfile?.cycleLength || 28}</Text>
          <Text style={styles.statLabel}>Cycle Days</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{userProfile?.periodLength || 5}</Text>
          <Text style={styles.statLabel}>Period Days</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Ionicons
            name={userProfile?.remindersActive ? 'notifications' : 'notifications-off'}
            size={22}
            color={userProfile?.remindersActive ? COLORS.fertileGreen : COLORS.grey}
          />
          <Text style={styles.statLabel}>Reminders</Text>
        </View>
      </View>

      {/* Actions */}
      <View style={styles.actionsCard}>
        <TouchableOpacity
          style={styles.actionRow}
          onPress={() => navigation.navigate('Settings')}
          activeOpacity={0.7}
        >
          <View style={styles.actionIcon}>
            <Ionicons name="person-outline" size={20} color={COLORS.deepPink} />
          </View>
          <Text style={styles.actionText}>Edit Profile</Text>
          <Ionicons name="chevron-forward" size={18} color={COLORS.grey} />
        </TouchableOpacity>

        <View style={styles.actionDivider} />

        <TouchableOpacity style={styles.actionRow} activeOpacity={0.7}>
          <View style={styles.actionIcon}>
            <Ionicons name="notifications-outline" size={20} color={COLORS.deepPink} />
          </View>
          <Text style={styles.actionText}>Notifications</Text>
          <Ionicons name="chevron-forward" size={18} color={COLORS.grey} />
        </TouchableOpacity>

        <View style={styles.actionDivider} />

        <TouchableOpacity style={styles.actionRow} activeOpacity={0.7}>
          <View style={styles.actionIcon}>
            <Ionicons name="shield-checkmark-outline" size={20} color={COLORS.deepPink} />
          </View>
          <Text style={styles.actionText}>Privacy & Security</Text>
          <Ionicons name="chevron-forward" size={18} color={COLORS.grey} />
        </TouchableOpacity>
      </View>

      {/* Logout */}
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout} activeOpacity={0.8}>
        <Ionicons name="log-out-outline" size={20} color={COLORS.periodRed} />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryPink,
  },
  scrollContent: {
    paddingTop: 55,
    paddingBottom: 40,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 22,
    marginBottom: 24,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.white,
  },
  settingsBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarWrap: {
    marginBottom: 12,
    position: 'relative',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: COLORS.white,
  },
  avatarPlaceholder: {
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
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.deepPink,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  userName: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.white,
    marginBottom: 3,
  },
  userEmail: {
    fontSize: SIZES.font,
    color: 'rgba(255,255,255,0.75)',
    fontWeight: '400',
  },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    marginHorizontal: 22,
    borderRadius: 18,
    paddingVertical: 18,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.deepPink,
  },
  statLabel: {
    fontSize: 11,
    color: COLORS.grey,
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    backgroundColor: COLORS.lightGrey,
    marginVertical: 4,
  },
  actionsCard: {
    backgroundColor: COLORS.white,
    marginHorizontal: 22,
    borderRadius: 18,
    paddingHorizontal: 18,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    gap: 14,
  },
  actionIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: COLORS.lightPink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    flex: 1,
    fontSize: SIZES.medium,
    color: COLORS.black,
    fontWeight: '500',
  },
  actionDivider: {
    height: 1,
    backgroundColor: COLORS.lightGrey,
    marginLeft: 50,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginHorizontal: 22,
    paddingVertical: 16,
    borderRadius: 18,
    backgroundColor: COLORS.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  logoutText: {
    fontSize: SIZES.medium,
    fontWeight: '600',
    color: COLORS.periodRed,
  },
});

export default ProfileScreen;
