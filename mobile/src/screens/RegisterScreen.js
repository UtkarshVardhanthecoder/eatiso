import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../App';
import { useAuth } from '../../context/AuthContext';

export default function RegisterScreen({ navigation }) {
  const { login } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isHost, setIsHost] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !phone || !password) return Alert.alert('Error', 'Please fill all fields');
    setLoading(true);
    setTimeout(() => {
      login({ id: '1', name, email, phone, isHost });
      setLoading(false);
    }, 1000);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <View style={styles.logo}><Ionicons name="restaurant" size={40} color={theme.colors.primary} /></View>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join the home dining community</Text>
        </View>
        <View style={styles.form}>
          <View style={styles.inputBox}><Ionicons name="person-outline" size={20} color={theme.colors.textSecondary} /><TextInput style={styles.input} placeholder="Full Name" value={name} onChangeText={setName} placeholderTextColor={theme.colors.textSecondary} /></View>
          <View style={styles.inputBox}><Ionicons name="mail-outline" size={20} color={theme.colors.textSecondary} /><TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" placeholderTextColor={theme.colors.textSecondary} /></View>
          <View style={styles.inputBox}><Ionicons name="call-outline" size={20} color={theme.colors.textSecondary} /><TextInput style={styles.input} placeholder="Phone" value={phone} onChangeText={setPhone} keyboardType="phone-pad" placeholderTextColor={theme.colors.textSecondary} /></View>
          <View style={styles.inputBox}><Ionicons name="lock-closed-outline" size={20} color={theme.colors.textSecondary} /><TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry placeholderTextColor={theme.colors.textSecondary} /></View>
          <TouchableOpacity style={styles.hostToggle} onPress={() => setIsHost(!isHost)}>
            <View style={[styles.checkbox, isHost && styles.checkboxActive]}><Ionicons name="checkmark" size={16} color={isHost ? '#fff' : 'transparent'} /></View>
            <View><Text style={styles.hostTitle}>Register as a Host</Text><Text style={styles.hostDesc}>Cook & earn by hosting meals</Text></View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={handleRegister} disabled={loading}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnText}>Create Account</Text>}
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}><Text style={styles.link}>Sign In</Text></TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scroll: { flexGrow: 1, justifyContent: 'center', padding: 24 },
  header: { alignItems: 'center', marginBottom: 30 },
  logo: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#FFF5F0', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 28, fontWeight: '700', color: theme.colors.text, marginBottom: 8 },
  subtitle: { fontSize: 16, color: theme.colors.textSecondary },
  form: { gap: 16 },
  inputBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8F8F8', borderRadius: 12, paddingHorizontal: 16, height: 56 },
  input: { flex: 1, marginLeft: 12, fontSize: 16, color: theme.colors.text },
  hostToggle: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 16, backgroundColor: '#FFF5F0', borderRadius: 12 },
  checkbox: { width: 24, height: 24, borderRadius: 6, borderWidth: 2, borderColor: theme.colors.primary },
  checkboxActive: { backgroundColor: theme.colors.primary },
  hostTitle: { fontWeight: '600', color: theme.colors.text },
  hostDesc: { fontSize: 12, color: theme.colors.textSecondary },
  btn: { backgroundColor: theme.colors.primary, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center', marginTop: 10 },
  btnText: { color: '#fff', fontSize: 18, fontWeight: '700' },
  footer: { flexDirection: 'row', justifyContent: 'center', gap: 8, marginTop: 30 },
  footerText: { color: theme.colors.textSecondary },
  link: { color: theme.colors.primary, fontWeight: '700' },
});