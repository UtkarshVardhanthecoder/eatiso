import React, { useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../App';

export default function SplashScreen({ navigation }) {
  const scale = new Animated.Value(0.8);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, { toValue: 1, duration: 800, useNativeDriver: true }),
        Animated.timing(scale, { toValue: 0.8, duration: 800, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logoContainer, { transform: [{ scale }] }]}>
        <View style={styles.iconCircle}>
          <Ionicons name="restaurant" size={60} color="#fff" />
        </View>
        <Animated.Text style={styles.title}>EATISO</Animated.Text>
        <Animated.Text style={styles.subtitle}>Authentic Home Dining</Animated.Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.primary },
  logoContainer: { alignItems: 'center' },
  iconCircle: { width: 120, height: 120, borderRadius: 60, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 42, fontWeight: '800', color: '#fff', letterSpacing: 4 },
  subtitle: { fontSize: 16, color: 'rgba(255,255,255,0.8)', marginTop: 8 },
});