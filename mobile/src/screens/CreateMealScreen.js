import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../App';

const CUISINES = ['North Indian', 'South Indian', 'Mughlai', 'Rajasthani', 'Gujarati', 'Bengali'];

export default function CreateMealScreen({ navigation }) {
  const [name, setName] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [price, setPrice] = useState('');
  const [desc, setDesc] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name="close" size={24} /></TouchableOpacity>
        <Text style={styles.title}>Create Meal</Text>
        <TouchableOpacity><Text style={styles.publish}>Publish</Text></TouchableOpacity>
      </View>
      <ScrollView style={styles.content}>
        <View style={styles.uploadBox}><Ionicons name="camera" size={40} color={theme.colors.textSecondary} /><Text style={styles.uploadText}>Add Photos</Text><Text style={styles.uploadSub}>Tap to upload</Text></View>
        <View style={styles.field}><Text style={styles.label}>Meal Name</Text><TextInput style={styles.input} value={name} onChangeText={setName} placeholder="e.g., Traditional Punjabi Thali" placeholderTextColor={theme.colors.textSecondary} /></View>
        <View style={styles.field}><Text style={styles.label}>Cuisine Type</Text><View style={styles.chips}>{CUISINES.map(c => <TouchableOpacity key={c} style={[styles.chip, cuisine === c && styles.chipActive]} onPress={() => setCuisine(c)}><Text style={[styles.chipText, cuisine === c && styles.chipTextActive]}>{c}</Text></TouchableOpacity>)}</View></View>
        <View style={styles.field}><Text style={styles.label}>Price (per person)</Text><View style={styles.priceBox}><Text style={styles.currency}>₹</Text><TextInput style={styles.priceInput} value={price} onChangeText={setPrice} keyboardType="numeric" placeholder="450" placeholderTextColor={theme.colors.textSecondary} /></View></View>
        <View style={styles.field}><Text style={styles.label}>Description</Text><TextInput style={[styles.input, { height: 120, textAlignVertical: 'top' }]} value={desc} onChangeText={setDesc} multiline placeholder="Describe your meal experience..." placeholderTextColor={theme.colors.textSecondary} /></View>
        <View style={styles.field}><Text style={styles.label}>Location</Text><View style={styles.input}><Ionicons name="location-outline" size={20} color={theme.colors.textSecondary} /><Text style={{ marginLeft: 10, color: theme.colors.textSecondary }}>Use current location</Text></View></View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 50, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: theme.colors.border },
  title: { fontSize: 18, fontWeight: '700' },
  publish: { color: theme.colors.primary, fontWeight: '600' },
  content: { flex: 1, padding: 20 },
  uploadBox: { height: 150, backgroundColor: '#F8F8F8', borderRadius: 16, borderWidth: 2, borderStyle: 'dashed', borderColor: theme.colors.border, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  uploadText: { fontSize: 16, fontWeight: '600', marginTop: 8 },
  uploadSub: { color: theme.colors.textSecondary, marginTop: 4 },
  field: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: '600', color: theme.colors.textSecondary, marginBottom: 8 },
  input: { backgroundColor: '#F8F8F8', padding: 16, borderRadius: 12, fontSize: 16, flexDirection: 'row', alignItems: 'center' },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { paddingHorizontal: 16, height: 36, borderRadius: 18, backgroundColor: '#F8F8F8', justifyContent: 'center' },
  chipActive: { backgroundColor: theme.colors.primary },
  chipText: { fontSize: 14, color: theme.colors.textSecondary },
  chipTextActive: { color: '#fff' },
  priceBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8F8F8', paddingHorizontal: 16, borderRadius: 12 },
  currency: { fontSize: 20, color: theme.colors.primary },
  priceInput: { flex: 1, marginLeft: 8, fontSize: 20, color: theme.colors.text },
});