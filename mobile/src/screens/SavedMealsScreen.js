import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../App';

const SAVED = [
  { id: '1', name: 'Traditional Punjabi Thali', host: 'Priya Sharma', price: 450, image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=200' },
  { id: '2', name: 'Authentic Biryani Feast', host: 'Ahmed Khan', price: 550, image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=200' },
];

export default function SavedMealsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name="arrow-back" size={24} /></TouchableOpacity>
        <Text style={styles.title}>Saved Meals</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView style={styles.content}>
        {SAVED.map(meal => (
          <TouchableOpacity key={meal.id} style={styles.card}>
            <Image source={{ uri: meal.image }} style={styles.img} />
            <View style={styles.info}><Text style={styles.name}>{meal.name}</Text><Text style={styles.host}>by {meal.host}</Text><Text style={styles.price}>₹{meal.price}</Text></View>
            <TouchableOpacity style={styles.remove}><Ionicons name="bookmark" size={24} color={theme.colors.primary} /></TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 50, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: theme.colors.border },
  title: { fontSize: 18, fontWeight: '700' },
  content: { flex: 1, padding: 20 },
  card: { flexDirection: 'row', backgroundColor: '#F8F8F8', borderRadius: 12, overflow: 'hidden', marginBottom: 12 },
  img: { width: 80, height: 80 },
  info: { flex: 1, padding: 12, justifyContent: 'center' },
  name: { fontSize: 16, fontWeight: '700' },
  host: { color: theme.colors.textSecondary, marginTop: 2 },
  price: { color: theme.colors.primary, fontWeight: '700', marginTop: 4 },
  remove: { justifyContent: 'center', padding: 12 },
});