import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../App';

export default function BookingConfirmationScreen({ route, navigation }) {
  const { meal, guests } = route.params;
  
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.successIcon}><Ionicons name="checkmark" size={50} color="#fff" /></View>
        <Text style={styles.title}>Booking Confirmed!</Text>
        <Text style={styles.subtitle}>Your dining experience has been booked</Text>
        <View style={styles.card}>
          <Text style={styles.mealName}>{meal.name}</Text>
          <View style={styles.row}><Ionicons name="calendar" size={18} color={theme.colors.textSecondary} /><Text style={styles.rowText}>Apr 28, 2026 at 1:00 PM</Text></View>
          <View style={styles.row}><Ionicons name="people" size={18} color={theme.colors.textSecondary} /><Text style={styles.rowText}>{guests} Guests</Text></View>
          <View style={styles.row}><Ionicons name="location" size={18} color={theme.colors.textSecondary} /><Text style={styles.rowText}>{meal.location}</Text></View>
        </View>
        <Text style={styles.note}>Confirmation details have been sent to your email</Text>
      </View>
      <View style={styles.bottom}>
        <TouchableOpacity style={styles.homeBtn} onPress={() => navigation.navigate('MainTabs')}><Text style={styles.homeText}>Go Home</Text></TouchableOpacity>
        <TouchableOpacity style={styles.bookBtn} onPress={() => navigation.popToTop()}><Text style={styles.bookText}>View Bookings</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  successIcon: { width: 100, height: 100, borderRadius: 50, backgroundColor: theme.colors.success, justifyContent: 'center', alignItems: 'center', marginBottom: 24 },
  title: { fontSize: 28, fontWeight: '700', color: theme.colors.text },
  subtitle: { fontSize: 16, color: theme.colors.textSecondary, marginTop: 8 },
  card: { backgroundColor: '#F8F8F8', padding: 20, borderRadius: 16, marginTop: 30, width: '100%' },
  mealName: { fontSize: 20, fontWeight: '700', marginBottom: 16 },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  rowText: { marginLeft: 12, color: theme.colors.textSecondary },
  note: { fontSize: 14, color: theme.colors.textSecondary, marginTop: 24, textAlign: 'center' },
  bottom: { padding: 24, gap: 12 },
  homeBtn: { backgroundColor: '#F8F8F8', padding: 16, borderRadius: 30, alignItems: 'center' },
  homeText: { fontSize: 16, fontWeight: '600', color: theme.colors.text },
  bookBtn: { backgroundColor: theme.colors.primary, padding: 16, borderRadius: 30, alignItems: 'center' },
  bookText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});