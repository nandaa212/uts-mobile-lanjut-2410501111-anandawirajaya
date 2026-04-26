import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

export default function AboutScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{ uri: 'https://i.imgur.com/3gmtkW3.jpeg' }} // ⚠️ ganti link foto kamu
        style={styles.avatar}
      />
      <Text style={styles.name}> ananda wirajaya</Text>
      <Text style={styles.info}>NIM:  2410501111</Text>
      <Text style={styles.info}>Kelas: A</Text>
      <Text style={styles.info}>Tema: MovieDex (Tema B)</Text>

      <View style={styles.divider} />

      <Text style={styles.sectionTitle}>Tentang Aplikasi</Text>
      <Text style={styles.desc}>
        MovieDex adalah aplikasi mobile yang menampilkan daftar film dan serial TV
        menggunakan data dari TVMaze API. Fitur utama meliputi browsing film,
        pencarian, dan manajemen favorit bagi para cinnefil.
      </Text>

      <View style={styles.divider} />

      <Text style={styles.sectionTitle}>Credit API</Text>
      <Text style={styles.credit}>📡 TVMaze API</Text>
      <Text style={styles.credit}>🔗 https://api.tvmaze.com</Text>
      <Text style={styles.credit}>Gratis dan tanpa API key</Text>

      <View style={styles.divider} />
      <Text style={styles.footer}>© 2026 MovieDex — UTS Mobile Lanjut</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', padding: 24, backgroundColor: '#fff' },
  avatar: {
    width: 120, height: 120, borderRadius: 60,
    marginBottom: 16, borderWidth: 3, borderColor: '#e50914'
  },
  name: { fontSize: 22, fontWeight: 'bold' },
  info: { fontSize: 15, color: '#555', marginTop: 4 },
  divider: { width: '100%', height: 1, backgroundColor: '#eee', marginVertical: 16 },
  sectionTitle: { fontSize: 17, fontWeight: 'bold', alignSelf: 'flex-start', marginBottom: 8 },
  desc: { fontSize: 14, color: '#444', lineHeight: 22, alignSelf: 'flex-start' },
  credit: { fontSize: 14, color: '#555', alignSelf: 'flex-start' },
  footer: { marginTop: 24, color: '#aaa', fontSize: 13 },
});