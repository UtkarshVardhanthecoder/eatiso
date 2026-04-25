import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../App';
import { useAuth } from '../../context/AuthContext';

export default function EditProfileScreen({ navigation }) {
  const { user, updateUser } = useAuth();
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name="arrow-back" size={24} /></TouchableOpacity>
        <Text style={styles.title}>Edit Profile</Text>
        <TouchableOpacity><Text style={styles.save}>Save</Text></TouchableOpacity>
      </View>
      <View style={styles.form}>
        <View style={styles.field}><Text style={styles.label}>Full Name</Text><View style={styles.input}><Text>{user?.name || ''}</Text></View></View>
        <View style={styles.field}><Text style={styles.label}>Email</Text><View style={styles.input}><Text>{user?.email || ''}</Text></View></View>
        <View style={styles.field}><Text style={styles.label}>Phone</Text><View style={styles.input}><Text>{user?.phone || ''}</Text></View></View>
        <View style={styles.field}><Text style={styles.label}>Bio</Text><View style={[styles.input, { height: 100 }]}><Text>Tell hosts about yourself...</Text></View></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 50, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: theme.colors.border },
  title: { fontSize: 18, fontWeight: '700' },
  save: { color: theme.colors.primary, fontWeight: '600' },
  form: { padding: 20 },
  field: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: '600', color: theme.colors.textSecondary, marginBottom: 8 },
  input: { backgroundColor: '#F8F8F8', padding: 16, borderRadius: 12, fontSize: 16 },
});