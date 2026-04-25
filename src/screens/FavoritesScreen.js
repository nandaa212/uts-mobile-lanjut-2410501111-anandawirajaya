import React from 'react';
import {
  View, FlatList, Text, TouchableOpacity,
  StyleSheet, Alert,
} from 'react-native';
import { useApp } from '../context/AppContext';
import MovieCard from '../components/MovieCard';

export default function FavoritesScreen({ navigation }) {
  const { state, removeFavorite } = useApp();

  const handleRemove = (movie) => {
    Alert.alert(
      'Hapus Favorit',
      `Hapus "${movie.name}" dari favorit?`,
      [
        { text: 'Batal', style: 'cancel' },
        { text: 'Hapus', style: 'destructive', onPress: () => removeFavorite(movie.id) },
      ]
    );
  };

  if (state.favorites.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.empty}>Belum ada favorit 💔</Text>
        <Text style={styles.sub}>Tambahkan film dari halaman Detail</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={state.favorites}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View>
          <MovieCard
            movie={item}
            onPress={() => navigation.navigate('HomeTab', {
              screen: 'Detail',
              params: { movie: item },
            })}
          />
          <TouchableOpacity
            style={styles.removeBtn}
            onPress={() => handleRemove(item)}
          >
            <Text style={styles.removeTxt}>🗑️ Hapus dari Favorit</Text>
          </TouchableOpacity>
        </View>
      )}
      contentContainerStyle={{ paddingVertical: 8 }}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  empty: { fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
  sub: { color: '#888' },
  removeBtn: {
    marginHorizontal: 12,
    marginBottom: 6,
    padding: 8,
    backgroundColor: '#fee',
    borderRadius: 6,
    alignItems: 'center',
  },
  removeTxt: { color: '#e50914', fontWeight: '600' },
});