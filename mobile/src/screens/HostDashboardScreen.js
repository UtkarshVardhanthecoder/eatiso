import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../App';
import { useAuth } from '../../context/AuthContext';

const STATS = [
  { value: '12', label: 'Total Bookings', icon: 'calendar' },
  { value: '₹45,600', label: 'Earnings', icon: 'wallet' },
  { value: '4.8', label: 'Rating', icon: 'star' },
];

const MEALS = [
  { id: '1', name: 'Punjabi Thali', bookings: 8, earnings: 3600, status: 'active' },
  { id: '2', name: 'Biryani Special', bookings: 5, earnings: 2750, status: 'active' },
];

export default function HostDashboardScreen({ navigation }) {
  const { user } = useAuth();
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name="arrow-back" size={24} /></TouchableOpacity>
        <Text style={styles.title}>Host Dashboard</Text>
        <TouchableOpacity onPress={() => navigation.navigate('CreateMeal')}><Ionicons name="add-circle" size={28} color={theme.colors.primary} /></TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profile}>
          <Image source={{ uri: 'https://ui-avatars.com/api/?name=' + (user?.name || 'Host') + '&background=FF6B35&color=fff&size=100' }} style={styles.avatar} />
          <Text style={styles.name}>{user?.name || 'Host'}</Text>
          <Text style={styles.sub}>Superhost Status</Text>
        </View>
        <View style={styles.stats}>
          {STATS.map((s, i) => (
            <View key={i} style={styles.stat}>
              <View style={styles.statIcon}><Ionicons name={s.icon} size={20} color={theme.colors.primary} /></View>
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Meals</Text>
          {MEALS.map(meal => (
            <View key={meal.id} style={styles.meal}>
              <View style={styles.mealInfo}><Text style={styles.mealName}>{meal.name}</Text><Text style={styles.mealSub}>{meal.bookings} bookings • ₹{meal.earnings}</Text></View>
              <View style={styles.status}><Text style={styles.statusText}>Active</Text></View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 50, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: theme.colors.border },
  title: { fontSize: 18, fontWeight: '700' },
  profile: { alignItems: 'center', paddingVertical: 30, backgroundColor: '#FFF5F0' },
  avatar: { width: 80, height: 80, borderRadius: 40 },
  name: { fontSize: 22, fontWeight: '700', marginTop: 12 },
  sub: { color: theme.colors.primary, marginTop: 4 },
  stats: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 24, borderBottomWidth: 1, borderBottomColor: theme.colors.border },
  stat: { alignItems: 'center' },
  statIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFF5F0', justifyContent: 'center', alignItems: 'center' },
  statValue: { fontSize: 20, fontWeight: '700', marginTop: 8 },
  statLabel: { fontSize: 12, color: theme.colors.textSecondary, marginTop: 4 },
  section: { padding: 20 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 16 },
  meal: { flexDirection: 'row', backgroundColor: '#F8F8F8', padding: 16, borderRadius: 12, marginBottom: 12 },
  mealInfo: { flex: 1 },
  mealName: { fontSize: 16, fontWeight: '600' },
  mealSub: { color: theme.colors.textSecondary, marginTop: 4 },
  status: { backgroundColor: '#E8F5E9', paddingHorizontal: 12, height: 28, borderRadius: 14, justifyContent: 'center' },
  statusText: { color: theme.colors.success, fontWeight: '600', fontSize: 12 },
});