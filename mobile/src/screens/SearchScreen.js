import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../App';

const DEMO_MEALS = [
  { id: '1', name: 'Traditional Punjabi Thali', host: 'Priya Sharma', cuisine: 'North Indian', price: 450, rating: 4.8, image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=200' },
  { id: '2', name: 'Authentic Biryani Feast', host: 'Ahmed Khan', cuisine: 'Mughlai', price: 550, rating: 4.9, image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=200' },
  { id: '3', name: 'South Indian Sambar Meal', host: 'Lakshmi Reddy', cuisine: 'South Indian', price: 380, rating: 4.7, image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=200' },
];

export default function SearchScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [cuisine, setCuisine] = useState('All');
  const cuisines = ['All', 'North Indian', 'South Indian', 'Mughlai', 'Rajasthani'];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Search</Text>
      </View>
      <View style={styles.searchBox}>
        <Ionicons name="search" size={20} color={theme.colors.textSecondary} />
        <Text style={styles.searchInput}>{search || 'Search meals...'}</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filters}>
        {cuisines.map((c, i) => <TouchableOpacity key={i} style={[styles.filter, cuisine === c && styles.filterActive]} onPress={() => setCuisine(c)}><Text style={[styles.filterText, cuisine === c && styles.filterTextActive]}>{c}</Text></TouchableOpacity>)}
      </ScrollView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.results}>Results</Text>
        {DEMO_MEALS.map(meal => (
          <TouchableOpacity key={meal.id} style={styles.mealCard} onPress={() => navigation.navigate('MealDetail', { meal })}>
            <Image source={{ uri: meal.image }} style={styles.img} />
            <View style={styles.info}><Text style={styles.name}>{meal.name}</Text><Text style={styles.host}>{meal.cuisine} • by {meal.host}</Text><View style={styles.rating}><Ionicons name="star" size={14} color="#FFD700" /><Text style={styles.ratingText}>{meal.rating}</Text></View></View>
            <Text style={styles.price}>₹{meal.price}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { paddingHorizontal: 20, paddingTop: 50, paddingBottom: 16 },
  title: { fontSize: 24, fontWeight: '700', color: theme.colors.text },
  searchBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8F8F8', marginHorizontal: 20, borderRadius: 12, paddingHorizontal: 16, height: 50 },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 16, color: theme.colors.textSecondary },
  filters: { paddingVertical: 16, paddingLeft: 20 },
  filter: { paddingHorizontal: 20, height: 36, borderRadius: 18, backgroundColor: '#F8F8F8', marginRight: 10, justifyContent: 'center' },
  filterActive: { backgroundColor: theme.colors.primary },
  filterText: { fontSize: 14, fontWeight: '600', color: theme.colors.textSecondary },
  filterTextActive: { color: '#fff' },
  results: { fontSize: 18, fontWeight: '700', color: theme.colors.text, paddingHorizontal: 20, marginTop: 10 },
  mealCard: { flexDirection: 'row', backgroundColor: '#fff', marginHorizontal: 20, marginTop: 12, borderRadius: 12, overflow: 'hidden', elevation: 2 },
  img: { width: 90, height: 90 },
  info: { flex: 1, padding: 12, justifyContent: 'center' },
  name: { fontSize: 16, fontWeight: '700', color: theme.colors.text },
  host: { fontSize: 12, color: theme.colors.textSecondary, marginTop: 2 },
  rating: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  ratingText: { fontWeight: '600', marginLeft: 4 },
  price: { padding: 12, justifyContent: 'center', fontSize: 18, fontWeight: '700', color: theme.colors.primary },
});