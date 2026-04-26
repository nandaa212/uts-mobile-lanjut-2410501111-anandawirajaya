import React, { useEffect, useState, useCallback } from 'react';
import {
  View, FlatList, Text, StyleSheet,
  ActivityIndicator, RefreshControl, TouchableOpacity,
} from 'react-native';
import MovieCard from '../components/MovieCard';

const API_URL = 'https://api.tvmaze.com/shows?page=0';

export default function HomeScreen({ navigation }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(API_URL, { cache: 'no-store' });
      if (!res.ok) throw new Error('Gagal mengambil data dari server');
      const data = await res.json();
      setMovies(data);
    } catch (e) {
      setError('Gagal memuat data, periksa koneksi internet!');
      setMovies([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { fetchMovies(); }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchMovies();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#e50914" />
        <Text style={{ marginTop: 8, color: '#666' }}>Memuat data...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>❌ {error}</Text>
        <TouchableOpacity onPress={fetchMovies} style={styles.retryBtn}>
          <Text style={styles.retry}>Coba lagi</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <FlatList
      data={movies}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <MovieCard
          movie={item}
          onPress={() => navigation.navigate('Detail', { movie: item })}
        />
      )}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['#e50914']}
        />
      }
      contentContainerStyle={{ paddingVertical: 8 }}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  errorText: { fontSize: 16, color: 'red', marginBottom: 12, textAlign: 'center' },
  retryBtn: {
    backgroundColor: '#e50914', padding: 12,
    borderRadius: 8, marginTop: 8,
  },
  retry: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});