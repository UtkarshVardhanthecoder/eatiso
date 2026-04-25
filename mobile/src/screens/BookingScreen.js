import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../App';

export default function BookingScreen({ route, navigation }) {
  const { meal } = route.params;
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState('Apr 28, 2026');
  const [time, setTime] = useState('1:00 PM');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name="arrow-back" size={24} /></TouchableOpacity>
        <Text style={styles.title}>Book Experience</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView style={styles.content}>
        <View style={styles.mealInfo}><Text style={styles.mealName}>{meal.name}</Text><Text style={styles.mealHost}>by {meal.host}</Text></View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Date</Text>
          <View style={styles.option}><Ionicons name="calendar" size={20} color={theme.colors.primary} /><TouchableOpacity style={styles.optionText}><Text>Apr 28, 2026</Text></TouchableOpacity></View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Time</Text>
          <View style={styles.option}><Ionicons name="time" size={20} color={theme.colors.primary} /><TouchableOpacity style={styles.optionText}><Text>1:00 PM</Text></TouchableOpacity></View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Guests</Text>
          <View style={styles.counter}><TouchableOpacity onPress={() => setGuests(Math.max(1, guests - 1))} style={styles.counterBtn}><Ionicons name="remove" size={20} /></TouchableOpacity><Text style={styles.counterText}>{guests}</Text><TouchableOpacity onPress={() => setGuests(Math.min(10, guests + 1))} style={styles.counterBtn}><Ionicons name="add" size={20} /></TouchableOpacity></View>
        </View>
        <View style={styles.divider} />
        <View style={styles.summary}>
          <Text style={styles.summaryTitle}>Payment Summary</Text>
          <View style={styles.summaryRow}><Text>₹{meal.price} x {guests} guests</Text><Text>₹{meal.price * guests}</Text></View>
          <View style={styles.summaryRow}><Text>Platform fee</Text><Text>₹50</Text></View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryRow}><Text style={styles.totalLabel}>Total</Text><Text style={styles.totalValue}>₹{meal.price * guests + 50}</Text></View>
        </View>
      </ScrollView>
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.payBtn} onPress={() => navigation.navigate('BookingConfirmation', { meal, guests })}><Text style={styles.payText}>Proceed to Pay ₹{meal.price * guests + 50}</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 50, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: theme.colors.border },
  title: { fontSize: 18, fontWeight: '700' },
  content: { flex: 1, padding: 20 },
  mealInfo: { backgroundColor: '#FFF5F0', padding: 16, borderRadius: 12, marginBottom: 20 },
  mealName: { fontSize: 18, fontWeight: '700' },
  mealHost: { color: theme.colors.textSecondary, marginTop: 4 },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 14, fontWeight: '600', color: theme.colors.textSecondary, marginBottom: 8 },
  option: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8F8F8', padding: 16, borderRadius: 12 },
  optionText: { marginLeft: 12, fontSize: 16 },
  counter: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8F8F8', padding: 12, borderRadius: 12, justifyContent: 'center' },
  counterBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: theme.colors.primary, justifyContent: 'center', alignItems: 'center' },
  counterText: { fontSize: 20, fontWeight: '700', marginHorizontal: 30 },
  divider: { height: 1, backgroundColor: theme.colors.border, marginVertical: 20 },
  summary: { backgroundColor: '#F8F8F8', padding: 16, borderRadius: 12 },
  summaryTitle: { fontSize: 16, fontWeight: '700', marginBottom: 16 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  summaryDivider: { height: 1, backgroundColor: theme.colors.border, marginVertical: 12 },
  totalLabel: { fontSize: 16, fontWeight: '700' },
  totalValue: { fontSize: 18, fontWeight: '700', color: theme.colors.primary },
  bottomBar: { padding: 20, borderTopWidth: 1, borderTopColor: theme.colors.border },
  payBtn: { backgroundColor: theme.colors.primary, padding: 16, borderRadius: 30, alignItems: 'center' },
  payText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});