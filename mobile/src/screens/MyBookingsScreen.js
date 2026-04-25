import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../App';
import { useAuth } from '../../context/AuthContext';

const BOOKINGS = [
  { id: '1', meal: 'Traditional Punjabi Thali', host: 'Priya Sharma', date: 'Apr 28, 2026', time: '1:00 PM', guests: 2, status: 'upcoming', total: 900, image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=200' },
  { id: '2', meal: 'Authentic Biryani Feast', host: 'Ahmed Khan', date: 'Apr 20, 2026', time: '7:00 PM', guests: 4, status: 'completed', total: 2200, image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=200' },
];

export default function MyBookingsScreen({ navigation }) {
  const { user } = useAuth();
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Bookings</Text>
      </View>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {BOOKINGS.map(booking => (
          <TouchableOpacity key={booking.id} style={styles.card}>
            <Image source={{ uri: booking.image }} style={styles.img} />
            <View style={styles.info}>
              <View style={styles.status}><View style={[styles.dot, booking.status === 'upcoming' ? styles.upcoming : styles.completed]} /><Text style={[styles.statusText, booking.status === 'upcoming' ? styles.upcomingText : styles.completedText]}>{booking.status === 'upcoming' ? 'Upcoming' : 'Completed'}</Text></View>
              <Text style={styles.name}>{booking.meal}</Text>
              <Text style={styles.host}>by {booking.host}</Text>
              <View style={styles.meta}><Ionicons name="calendar-outline" size={14} color={theme.colors.textSecondary} /><Text style={styles.metaText}>{booking.date} • {booking.time}</Text></View>
              <View style={styles.meta}><Ionicons name="people-outline" size={14} color={theme.colors.textSecondary} /><Text style={styles.metaText}>{booking.guests} Guests</Text></View>
            </View>
            <View style={styles.price}><Text style={styles.total}>₹{booking.total}</Text></View>
          </TouchableOpacity>
        ))}
        {BOOKINGS.length === 0 && <View style={styles.empty}><Ionicons name="calendar-outline" size={60} color={theme.colors.border} /><Text style={styles.emptyText}>No bookings yet</Text><Text style={styles.emptySub}>Start exploring and book your first meal!</Text></View>}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F8F8' },
  header: { backgroundColor: '#fff', paddingHorizontal: 20, paddingTop: 50, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: theme.colors.border },
  title: { fontSize: 24, fontWeight: '700', color: theme.colors.text },
  content: { flex: 1, padding: 16 },
  card: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 16, overflow: 'hidden', marginBottom: 16 },
  img: { width: 100, height: 120 },
  info: { flex: 1, padding: 12 },
  status: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  dot: { width: 8, height: 8, borderRadius: 4, marginRight: 6 },
  upcoming: { backgroundColor: theme.colors.primary },
  completed: { backgroundColor: theme.colors.success },
  statusText: { fontSize: 12, fontWeight: '600' },
  upcomingText: { color: theme.colors.primary },
  completedText: { color: theme.colors.success },
  name: { fontSize: 16, fontWeight: '700', color: theme.colors.text },
  host: { fontSize: 12, color: theme.colors.textSecondary },
  meta: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  metaText: { fontSize: 12, color: theme.colors.textSecondary, marginLeft: 6 },
  price: { padding: 12, justifyContent: 'center' },
  total: { fontSize: 18, fontWeight: '700', color: theme.colors.primary },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 100 },
  emptyText: { fontSize: 20, fontWeight: '700', color: theme.colors.text, marginTop: 16 },
  emptySub: { fontSize: 14, color: theme.colors.textSecondary, marginTop: 8 },
});