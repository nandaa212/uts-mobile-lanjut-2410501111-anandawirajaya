import React, { useState } from 'react';
import {
  View, TextInput, FlatList, Text,
  TouchableOpacity, StyleSheet, ActivityIndicator,
} from 'react-native';
import MovieCard from '../components/MovieCard';

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  const validate = () => {
    if (query.trim() === '') {
      setError('Kolom pencarian tidak boleh kosong');
      return false;
    }
    if (query.trim().length < 3) {
      setError('Minimal 3 karakter');
      return false;
    }
    setError('');
    return true;
  };

  const handleSearch = async () => {
    if (!validate()) return;
    setLoading(true);
    setSearched(true);
    try {
      const res = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`);
      const data = await res.json();
      setResults(data.map(d => d.show));
    } catch (e) {
      setError('Gagal mencari. Cek koneksi internet.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>🔍 Cari Film</Text>
      <TextInput
        style={[styles.input, error ? styles.inputError : null]}
        placeholder="Ketik nama film... (min. 3 karakter)"
        value={query}
        onChangeText={(t) => { setQuery(t); setError(''); }}
        onSubmitEditing={handleSearch}
        returnKeyType="search"
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity style={styles.btn} onPress={handleSearch}>
        <Text style={styles.btnText}>Cari</Text>
      </TouchableOpacity>

      {loading && (
        <ActivityIndicator size="large" color="#e50914" style={{ marginTop: 20 }} />
      )}

      {!loading && searched && results.length === 0 && (
        <Text style={styles.noResult}>Tidak ada hasil untuk "{query}"</Text>
      )}

      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MovieCard
            movie={item}
            onPress={() => navigation.navigate('HomeTab', {
              screen: 'Detail',
              params: { movie: item },
            })}
          />
        )}
        style={{ marginTop: 8 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  heading: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 8,
    padding: 12, fontSize: 15,
  },
  inputError: { borderColor: '#e50914' },
  errorText: { color: '#e50914', marginTop: 4, fontSize: 13 },
  btn: {
    backgroundColor: '#e50914', padding: 12,
    borderRadius: 8, alignItems: 'center', marginTop: 10,
  },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  noResult: { textAlign: 'center', color: '#888', marginTop: 20, fontSize: 15 },
});