import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { theme } from '../../App';

const DEMO_MEALS = [
  { id: '1', name: 'Traditional Punjabi Thali', host: 'Priya Sharma', cuisine: 'North Indian', price: 450, rating: 4.8, reviews: 124, image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400', location: 'Mumbai' },
  { id: '2', name: 'Authentic Biryani Feast', host: 'Ahmed Khan', cuisine: 'Mughlai', price: 550, rating: 4.9, reviews: 89, image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400', location: 'Hyderabad' },
  { id: '3', name: 'South Indian Sambar Meal', host: 'Lakshmi Reddy', cuisine: 'South Indian', price: 380, rating: 4.7, reviews: 156, image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400', location: 'Chennai' },
  { id: '4', name: 'Rajasthani Dal Baati', host: 'Ramesh Singh', cuisine: 'Rajasthani', price: 420, rating: 4.6, reviews: 78, image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=400', location: 'Jaipur' },
];

const CATEGORIES = ['All', 'North Indian', 'South Indian', 'Mughlai', 'Rajasthani', 'Gujarati', 'Bengali'];

export default function HomeScreen({ navigation }) {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello, {user?.name?.split(' ')[0] || 'Guest'} 👋</Text>
            <Text style={styles.subtitle}>What would you like to eat?</Text>
          </View>
          <TouchableOpacity style={styles.notification}><Ionicons name="notifications-outline" size={24} color={theme.colors.text} /></TouchableOpacity>
        </View>
        {/* Search */}
        <View style={styles.searchBox}>
          <Ionicons name="search" size={20} color={theme.colors.textSecondary} />
          <TextInput style={styles.searchInput} placeholder="Search meals, cuisines, hosts..." value={search} onChangeText={setSearch} placeholderTextColor={theme.colors.textSecondary} />
        </View>
        {/* Categories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories}>
          {CATEGORIES.map((cat, i) => (
            <TouchableOpacity key={i} style={[styles.catChip, category === cat && styles.catChipActive]} onPress={() => setCategory(cat)}>
              <Text style={[styles.catText, category === cat && styles.catTextActive]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        {/* Featured */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Experiences</Text>
          <TouchableOpacity><Text style={styles.seeAll}>See All</Text></TouchableOpacity>
        </View>
        <FlatList
          horizontal data={DEMO_MEALS} keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false} contentContainerStyle={styles.featuredList}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.featuredCard} onPress={() => navigation.navigate('MealDetail', { meal: item })}>
              <Image source={{ uri: item.image }} style={styles.featuredImg} />
              <View style={styles.featuredOverlay}><Text style={styles.featuredPrice}>₹{item.price}</Text></View>
              <View style={styles.featuredInfo}>
                <Text style={styles.featuredName} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.featuredHost}>by {item.host}</Text>
                <View style={styles.featuredMeta}><Ionicons name="star" size={14} color="#FFD700" /><Text style={styles.featuredRating}>{item.rating}</Text><Text style={styles.featuredReviews}>({item.reviews})</Text></View>
              </View>
            </TouchableOpacity>
          )}
        />
        {/* Near You */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Near You</Text>
        </View>
        {DEMO_MEALS.map(item => (
          <TouchableOpacity key={item.id} style={styles.mealCard} onPress={() => navigation.navigate('MealDetail', { meal: item })}>
            <Image source={{ uri: item.image }} style={styles.mealImg} />
            <View style={styles.mealInfo}>
              <Text style={styles.mealName}>{item.name}</Text>
              <Text style={styles.mealCuisine}>{item.cuisine} • {item.location}</Text>
              <View style={styles.mealMeta}><Ionicons name="star" size={14} color="#FFD700" /><Text style={styles.mealRating}>{item.rating}</Text><Text style={styles.mealReviews}>({item.reviews})</Text></View>
            </View>
            <View style={styles.mealPrice}><Text style={styles.priceText}>₹{item.price}</Text><Text style={styles.priceSub}>per person</Text></View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 50, paddingBottom: 10 },
  greeting: { fontSize: 24, fontWeight: '700', color: theme.colors.text },
  subtitle: { fontSize: 14, color: theme.colors.textSecondary, marginTop: 4 },
  notification: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#F8F8F8', justifyContent: 'center', alignItems: 'center' },
  searchBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8F8F8', marginHorizontal: 20, borderRadius: 12, paddingHorizontal: 16, height: 50 },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 16, color: theme.colors.text },
  categories: { paddingVertical: 16, paddingLeft: 20 },
  catChip: { paddingHorizontal: 20, height: 36, borderRadius: 18, backgroundColor: '#F8F8F8', marginRight: 10, justifyContent: 'center' },
  catChipActive: { backgroundColor: theme.colors.primary },
  catText: { fontSize: 14, fontWeight: '600', color: theme.colors.textSecondary },
  catTextActive: { color: '#fff' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginTop: 20, marginBottom: 12 },
  sectionTitle: { fontSize: 20, fontWeight: '700', color: theme.colors.text },
  seeAll: { color: theme.colors.primary, fontWeight: '600' },
  featuredList: { paddingLeft: 20 },
  featuredCard: { width: 200, marginRight: 16, borderRadius: 16, overflow: 'hidden', backgroundColor: '#fff', elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8 },
  featuredImg: { width: '100%', height: 140 },
  featuredOverlay: { position: 'absolute', top: 10, right: 10, backgroundColor: theme.colors.primary, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  featuredPrice: { color: '#fff', fontWeight: '700', fontSize: 14 },
  featuredInfo: { padding: 12 },
  featuredName: { fontSize: 16, fontWeight: '700', color: theme.colors.text },
  featuredHost: { fontSize: 12, color: theme.colors.textSecondary, marginTop: 2 },
  featuredMeta: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  featuredRating: { fontSize: 12, fontWeight: '600', marginLeft: 4 },
  featuredReviews: { fontSize: 12, color: theme.colors.textSecondary },
  mealCard: { flexDirection: 'row', marginHorizontal: 20, marginBottom: 16, borderRadius: 16, overflow: 'hidden', backgroundColor: '#fff', elevation: 2 },
  mealImg: { width: 100, height: 100 },
  mealInfo: { flex: 1, padding: 12, justifyContent: 'center' },
  mealName: { fontSize: 16, fontWeight: '700', color: theme.colors.text },
  mealCuisine: { fontSize: 12, color: theme.colors.textSecondary, marginTop: 2 },
  mealMeta: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  mealRating: { fontWeight: '600', marginLeft: 4 },
  mealReviews: { color: theme.colors.textSecondary, fontSize: 12 },
  mealPrice: { padding: 12, justifyContent: 'center', alignItems: 'center' },
  priceText: { fontSize: 18, fontWeight: '700', color: theme.colors.primary },
  priceSub: { fontSize: 10, color: theme.colors.textSecondary },
});