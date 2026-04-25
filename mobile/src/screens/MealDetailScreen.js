import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../App';

const { width } = Dimensions.get('window');

export default function MealDetailScreen({ route, navigation }) {
  const { meal } = route.params;
  
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={{ uri: meal.image }} style={styles.image} />
        <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}><Ionicons name="arrow-back" size={24} color="#fff" /></TouchableOpacity>
        <TouchableOpacity style={styles.save}><Ionicons name="bookmark-outline" size={24} color="#fff" /></TouchableOpacity>
        <View style={styles.content}>
          <View style={styles.header}>
            <View><Text style={styles.cuisine}>{meal.cuisine}</Text><Text style={styles.name}>{meal.name}</Text></View>
            <View style={styles.price}><Text style={styles.priceText}>₹{meal.price}</Text><Text style={styles.perPerson}>per person</Text></View>
          </View>
          <View style={styles.rating}><Ionicons name="star" size={18} color="#FFD700" /><Text style={styles.ratingText}>{meal.rating}</Text><Text style={styles.reviews}>({meal.reviews} reviews)</Text></View>
          <View style={styles.location}><Ionicons name="location-outline" size={18} color={theme.colors.textSecondary} /><Text style={styles.locationText}>{meal.location}</Text></View>
          <View style={styles.divider} />
          <Text style={styles.sectionTitle}>Hosted by</Text>
          <View style={styles.host}>
            <Image source={{ uri: 'https://ui-avatars.com/api/?name=' + meal.host + '&background=FF6B35&color=fff' }} style={styles.hostAvatar} />
            <View style={styles.hostInfo}><Text style={styles.hostName}>{meal.host}</Text><Text style={styles.hostSub}>Superhost • 5 years hosting</Text></View>
          </View>
          <View style={styles.divider} />
          <Text style={styles.sectionTitle}>About this experience</Text>
          <Text style={styles.desc}>Authentic home-cooked meal with traditional recipes passed down through generations. Experience the true taste of homemade Indian cuisine in a warm, welcoming environment.</Text>
          <Text style={styles.desc}>Menu includes: Main dish, dal, rice, roti, salad, papad, pickle, and dessert.</Text>
          <View style={styles.divider} />
          <Text style={styles.sectionTitle}>What's included</Text>
          {['Welcome drink', 'Full meal', 'Water & beverages', 'Dessert'].map((item, i) => (
            <View key={i} style={styles.include}><Ionicons name="checkmark-circle" size={20} color={theme.colors.success} /><Text style={styles.includeText}>{item}</Text></View>
          ))}
        </View>
      </ScrollView>
      <View style={styles.bottomBar}>
        <View style={styles.priceBar}><Text style={styles.priceBarText}>₹{meal.price}</Text><Text style={styles.priceBarSub}>per person</Text></View>
        <TouchableOpacity style={styles.bookBtn} onPress={() => navigation.navigate('Booking', { meal })}><Text style={styles.bookText}>Book Now</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  image: { width, height: 280 },
  back: { position: 'absolute', top: 50, left: 20, width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' },
  save: { position: 'absolute', top: 50, right: 20, width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' },
  content: { padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between' },
  cuisine: { fontSize: 14, color: theme.colors.primary, fontWeight: '600' },
  name: { fontSize: 24, fontWeight: '700', color: theme.colors.text, marginTop: 4, width: width - 140 },
  price: { alignItems: 'flex-end' },
  priceText: { fontSize: 24, fontWeight: '700', color: theme.colors.primary },
  perPerson: { fontSize: 12, color: theme.colors.textSecondary },
  rating: { flexDirection: 'row', alignItems: 'center', marginTop: 12 },
  ratingText: { fontSize: 16, fontWeight: '700', marginLeft: 6 },
  reviews: { color: theme.colors.textSecondary, marginLeft: 4 },
  location: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  locationText: { color: theme.colors.textSecondary, marginLeft: 6 },
  divider: { height: 1, backgroundColor: theme.colors.border, marginVertical: 20 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: theme.colors.text, marginBottom: 12 },
  host: { flexDirection: 'row', alignItems: 'center' },
  hostAvatar: { width: 56, height: 56, borderRadius: 28 },
  hostInfo: { marginLeft: 12 },
  hostName: { fontSize: 18, fontWeight: '600' },
  hostSub: { color: theme.colors.textSecondary, marginTop: 2 },
  desc: { fontSize: 15, color: theme.colors.textSecondary, lineHeight: 24 },
  include: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  includeText: { marginLeft: 12, fontSize: 15, color: theme.colors.text },
  bottomBar: { flexDirection: 'row', padding: 20, borderTopWidth: 1, borderTopColor: theme.colors.border, alignItems: 'center' },
  priceBar: { flex: 1 },
  priceBarText: { fontSize: 22, fontWeight: '700', color: theme.colors.primary },
  priceBarSub: { fontSize: 12, color: theme.colors.textSecondary },
  bookBtn: { backgroundColor: theme.colors.primary, paddingVertical: 14, paddingHorizontal: 40, borderRadius: 30 },
  bookText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});