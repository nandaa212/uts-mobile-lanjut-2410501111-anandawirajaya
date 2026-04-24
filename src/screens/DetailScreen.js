import React from 'react';
import {
  View, Text, Image, ScrollView,
  TouchableOpacity, StyleSheet, Alert,
} from 'react-native';
import { useApp } from '../context/AppContext';

export default function DetailScreen({ route }) {
  const { movie } = route.params;
  const { addFavorite, removeFavorite, isFavorite } = useApp();
  const favorite = isFavorite(movie.id);

  const toggleFavorite = () => {
    if (favorite) {
      removeFavorite(movie.id);
      Alert.alert('Dihapus', `${movie.name} dihapus dari favorit`);
    } else {
      addFavorite(movie);
      Alert.alert('Ditambahkan', `${movie.name} ditambahkan ke favorit`);
    }
  };

  const summary = movie.summary
    ? movie.summary.replace(/<[^>]+>/g, '')
    : 'Tidak ada deskripsi.';

  return (
    <ScrollView style={styles.container}>
      {movie.image?.original && (
        <Image source={{ uri: movie.image.original }} style={styles.poster} />
      )}
      <View style={styles.content}>
        <Text style={styles.title}>{movie.name}</Text>
        <Text style={styles.meta}>⭐ Rating: {movie.rating?.average ?? 'N/A'}</Text>
        <Text style={styles.meta}>🎭 Genre: {movie.genres?.join(', ') || 'Unknown'}</Text>
        <Text style={styles.meta}>📅 Premiered: {movie.premiered ?? 'N/A'}</Text>
        <Text style={styles.meta}>🌐 Language: {movie.language ?? 'N/A'}</Text>
        <Text style={styles.meta}>📺 Status: {movie.status ?? 'N/A'}</Text>

        <Text style={styles.summaryTitle}>Sinopsis</Text>
        <Text style={styles.summary}>{summary}</Text>

        <TouchableOpacity
          style={[styles.btn, favorite ? styles.btnRemove : styles.btnAdd]}
          onPress={toggleFavorite}
        >
          <Text style={styles.btnText}>
            {favorite ? '❌ Hapus dari Favorit' : '❤️ Tambah ke Favorit'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  poster: { width: '100%', height: 300, resizeMode: 'cover' },
  content: { padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 8 },
  meta: { fontSize: 14, color: '#555', marginBottom: 4 },
  summaryTitle: { fontSize: 16, fontWeight: 'bold', marginTop: 12, marginBottom: 6 },
  summary: { fontSize: 14, color: '#333', lineHeight: 22 },
  btn: { marginTop: 20, padding: 14, borderRadius: 10, alignItems: 'center' },
  btnAdd: { backgroundColor: '#e50914' },
  btnRemove: { backgroundColor: '#555' },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});