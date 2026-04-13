// src/screens/SignInScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../config/theme';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import { useAuth } from '../context/AuthContext';

const { height } = Dimensions.get('window');

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (!result.success) {
      Alert.alert('Sign In Failed', result.error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={COLORS.deepPink} />
          </TouchableOpacity>

          <View style={styles.logoRing}>
            <View style={styles.logoDot} />
          </View>

          <Text style={styles.welcomeText}>Welcome Back</Text>
          <Text style={styles.welcomeSub}>Sign in to continue your journey</Text>
        </View>

        {/* Form section */}
        <View style={styles.formSection}>
          <CustomInput
            label="Email Address"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
          />

          <CustomInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry
          />

          <TouchableOpacity style={styles.forgotBtn}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          <CustomButton
            title="Sign In"
            onPress={handleSignIn}
            loading={loading}
            style={styles.signInBtn}
          />

          <CustomButton
            title="Continue With Google"
            onPress={() => Alert.alert('Info', 'Google Sign In coming soon')}
            icon={<Text style={styles.googleG}>G</Text>}
            style={styles.googleBtn}
            variant="secondary"
          />

          <CustomButton
            title="Sign In With Apple"
            onPress={() => Alert.alert('Info', 'Apple Sign In coming soon')}
            icon={<Ionicons name="logo-apple" size={20} color={COLORS.black} />}
            style={styles.appleBtn}
            variant="secondary"
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: COLORS.white,
    height: height * 0.36,
    paddingTop: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
  },
  backBtn: {
    position: 'absolute',
    top: 55,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.lightPink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoRing: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.softPink,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  logoDot: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: COLORS.deepPink,
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.deepPink,
    marginBottom: 4,
  },
  welcomeSub: {
    fontSize: SIZES.font,
    color: COLORS.grey,
    fontWeight: '400',
  },
  formSection: {
    flex: 1,
    backgroundColor: COLORS.primaryPink,
    paddingTop: 28,
    paddingBottom: 40,
    alignItems: 'center',
  },
  forgotBtn: {
    alignSelf: 'flex-end',
    marginRight: '7.5%',
    marginTop: 4,
    marginBottom: 8,
  },
  forgotText: {
    color: COLORS.white,
    fontSize: SIZES.small,
    fontWeight: '600',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '85%',
    marginVertical: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  dividerText: {
    color: COLORS.white,
    fontSize: SIZES.small,
    fontWeight: '500',
    marginHorizontal: 12,
  },
  signInBtn: {
    width: '85%',
    paddingVertical: 16,
  },
  googleBtn: {
    width: '85%',
    paddingVertical: 14,
  },
  appleBtn: {
    width: '85%',
    paddingVertical: 14,
  },
  googleG: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4285F4',
  },
});

export default SignInScreen;
