import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../App';
import { useAuth } from '../../context/AuthContext';

export default function LoginScreen({ navigation }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) return Alert.alert('Error', 'Please fill all fields');
    setLoading(true);
    // Demo login - replace with real API call
    setTimeout(() => {
      login({ id: '1', name: 'Demo User', email, isHost: false });
      setLoading(false);
    }, 1000);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.logo}><Ionicons name="restaurant" size={40} color={theme.colors.primary} /></View>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>
        </View>
        <View style={styles.form}>
          <View style={styles.inputBox}>
            <Ionicons name="mail-outline" size={20} color={theme.colors.textSecondary} />
            <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" placeholderTextColor={theme.colors.textSecondary} />
          </View>
          <View style={styles.inputBox}>
            <Ionicons name="lock-closed-outline" size={20} color={theme.colors.textSecondary} />
            <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry={!showPass} placeholderTextColor={theme.colors.textSecondary} />
            <TouchableOpacity onPress={() => setShowPass(!showPass)}><Ionicons name={showPass ? 'eye-off-outline' : 'eye-outline'} size={20} color={theme.colors.textSecondary} /></TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.forgot}><Text style={styles.forgotText}>Forgot Password?</Text></TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={handleLogin} disabled={loading}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnText}>Sign In</Text>}
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}><Text style={styles.link}>Sign Up</Text></TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { flex: 1, justifyContent: 'center', padding: 24 },
  header: { alignItems: 'center', marginBottom: 40 },
  logo: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#FFF5F0', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 28, fontWeight: '700', color: theme.colors.text, marginBottom: 8 },
  subtitle: { fontSize: 16, color: theme.colors.textSecondary },
  form: { gap: 16 },
  inputBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8F8F8', borderRadius: 12, paddingHorizontal: 16, height: 56 },
  input: { flex: 1, marginLeft: 12, fontSize: 16, color: theme.colors.text },
  forgot: { alignItems: 'flex-end' },
  forgotText: { color: theme.colors.primary, fontWeight: '600' },
  btn: { backgroundColor: theme.colors.primary, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center', marginTop: 10 },
  btnText: { color: '#fff', fontSize: 18, fontWeight: '700' },
  footer: { flexDirection: 'row', justifyContent: 'center', gap: 8, marginTop: 30 },
  footerText: { color: theme.colors.textSecondary },
  link: { color: theme.colors.primary, fontWeight: '700' },
});