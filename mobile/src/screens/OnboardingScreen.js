import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');
const slides = [
  { title: 'Discover Authentic', desc: 'Experience real home-cooked meals from local hosts', icon: 'home' },
  { title: 'Book Easy', desc: 'Reserve your dining experience in seconds', icon: 'calendar' },
  { title: 'Pay Secure', desc: 'Safe & secure payments every time', icon: 'card' },
];

export default function OnboardingScreen({ navigation }) {
  const [current, setCurrent] = useState(0);

  const finish = async () => {
    await AsyncStorage.setItem('hasLaunched', 'true');
    navigation.replace('Login');
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <View style={styles.logo}><Ionicons name="restaurant" size={50} color={theme.colors.primary} /></View>
          <Text style={styles.logoText}>EATISO</Text>
        </View>
        <View style={styles.slides}>
          {slides.map((s, i) => (
            <View key={i} style={[styles.slide, i === current && styles.slideActive]}>
              <View style={styles.iconBox}><Ionicons name={s.icon} size={80} color={theme.colors.primary} /></View>
              <Text style={styles.title}>{s.title}</Text>
              <Text style={styles.desc}>{s.desc}</Text>
            </View>
          ))}
        </View>
        <View style={styles.dots}>
          {slides.map((_, i) => <View key={i} style={[styles.dot, i === current && styles.dotActive]} />)}
        </View>
        <TouchableOpacity style={styles.btn} onPress={finish}>
          <Text style={styles.btnText}>Get Started</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scroll: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  header: { alignItems: 'center', marginBottom: 40 },
  logo: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#FFF5F0', justifyContent: 'center', alignItems: 'center' },
  logoText: { fontSize: 28, fontWeight: '800', color: theme.colors.primary, marginTop: 10, letterSpacing: 3 },
  slides: { width: '100%', alignItems: 'center' },
  slide: { alignItems: 'center', paddingHorizontal: 20, display: 'none' },
  slideActive: { display: 'flex' },
  iconBox: { width: 160, height: 160, borderRadius: 80, backgroundColor: '#FFF5F0', justifyContent: 'center', alignItems: 'center', marginBottom: 30 },
  title: { fontSize: 28, fontWeight: '700', color: theme.colors.text, marginBottom: 10, textAlign: 'center' },
  desc: { fontSize: 16, color: theme.colors.textSecondary, textAlign: 'center', lineHeight: 24 },
  dots: { flexDirection: 'row', marginVertical: 30 },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: theme.colors.border, marginHorizontal: 5 },
  dotActive: { backgroundColor: theme.colors.primary, width: 30 },
  btn: { backgroundColor: theme.colors.primary, paddingVertical: 16, paddingHorizontal: 60, borderRadius: 30, marginTop: 20 },
  btnText: { color: '#fff', fontSize: 18, fontWeight: '700' },
});