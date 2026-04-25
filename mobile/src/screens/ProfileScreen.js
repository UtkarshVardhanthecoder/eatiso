import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../App';
import { useAuth } from '../../context/AuthContext';

export default function ProfileScreen({ navigation }) {
  const { user, logout } = useAuth();
  
  const menu = [
    { icon: 'person-outline', label: 'Edit Profile', action: () => navigation.navigate('EditProfile') },
    { icon: 'bookmark-outline', label: 'Saved Meals', action: () => navigation.navigate('SavedMeals') },
    { icon: 'home-outline', label: 'Become a Host', action: () => navigation.navigate('CreateMeal') },
    { icon: 'wallet-outline', label: 'Payment Methods', action: () => {} },
    { icon: 'notifications-outline', label: 'Notifications', action: () => {} },
    { icon: 'help-circle-outline', label: 'Help & Support', action: () => {} },
    { icon: 'document-text-outline', label: 'Terms & Privacy', action: () => {} },
    { icon: 'log-out-outline', label: 'Logout', action: logout, danger: true },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
        <TouchableOpacity><Ionicons name="settings-outline" size={24} color={theme.colors.text} /></TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileCard}>
          <Image source={{ uri: 'https://ui-avatars.com/api/?name=' + (user?.name || 'User') + '&background=FF6B35&color=fff&size=200' }} style={styles.avatar} />
          <Text style={styles.name}>{user?.name || 'Guest User'}</Text>
          <Text style={styles.email}>{user?.email || 'user@example.com'}</Text>
          {user?.isHost && <View style={styles.hostBadge}><Ionicons name="star" size={14} color="#fff" /><Text style={styles.hostText}>Host</Text></View>}
        </View>
        <View style={styles.stats}>
          <View style={styles.statItem}><Text style={styles.statValue}>4</Text><Text style={styles.statLabel}>Bookings</Text></View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}><Text style={styles.statValue}>2</Text><Text style={styles.statLabel}>Saved</Text></View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}><Text style={styles.statValue}>5</Text><Text style={styles.statLabel}>Reviews</Text></View>
        </View>
        <View style={styles.menu}>
          {menu.map((item, i) => (
            <TouchableOpacity key={i} style={styles.menuItem} onPress={item.action}>
              <View style={[styles.menuIcon, item.danger && { backgroundColor: '#FFEBEB' }]}><Ionicons name={item.icon} size={22} color={item.danger ? theme.colors.error : theme.colors.primary} /></View>
              <Text style={[styles.menuLabel, item.danger && { color: theme.colors.error }]}>{item.label}</Text>
              <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F8F8' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', paddingHorizontal: 20, paddingTop: 50, paddingBottom: 16 },
  title: { fontSize: 24, fontWeight: '700', color: theme.colors.text },
  profileCard: { alignItems: 'center', backgroundColor: '#fff', paddingVertical: 30 },
  avatar: { width: 100, height: 100, borderRadius: 50 },
  name: { fontSize: 22, fontWeight: '700', color: theme.colors.text, marginTop: 16 },
  email: { fontSize: 14, color: theme.colors.textSecondary, marginTop: 4 },
  hostBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: theme.colors.primary, paddingHorizontal: 16, paddingVertical: 6, borderRadius: 20, marginTop: 12 },
  hostText: { color: '#fff', fontWeight: '600', marginLeft: 4 },
  stats: { flexDirection: 'row', backgroundColor: '#fff', paddingVertical: 20, borderTopWidth: 1, borderBottomWidth: 1, borderColor: theme.colors.border },
  statItem: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: 22, fontWeight: '700', color: theme.colors.primary },
  statLabel: { fontSize: 12, color: theme.colors.textSecondary, marginTop: 4 },
  statDivider: { width: 1, backgroundColor: theme.colors.border },
  menu: { backgroundColor: '#fff', marginTop: 16, paddingHorizontal: 20 },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: theme.colors.border },
  menuIcon: { width: 40, height: 40, borderRadius: 10, backgroundColor: '#FFF5F0', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  menuLabel: { flex: 1, fontSize: 16, color: theme.colors.text },
});