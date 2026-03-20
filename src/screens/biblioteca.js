import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { storyGames, recommendedGames } from '../data/games';

const allGames = [...storyGames, ...recommendedGames];

export default function Biblioteca() {
  const handleGamePress = (game) => {
    Alert.alert('Biblioteca', `Abrindo ${game.title}...`);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.gameItem}
      onPress={() => handleGamePress(item)}
      activeOpacity={0.8}
    >
      <Image source={{ uri: item.image }} style={styles.gameImage} />
      <View style={styles.gameInfo}>
        <Text style={styles.gameTitle} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.gameGenre}>{item.genre}</Text>
      </View>
      <Ionicons name="play-circle" size={32} color={colors.primary} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Biblioteca</Text>
        <Text style={styles.subtitle}>{allGames.length} jogos</Text>
      </View>
      <FlatList
        data={allGames}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: colors.onSurface,
    textTransform: 'uppercase',
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
    marginTop: 4,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  gameItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: colors.surfaceContainer,
    borderRadius: 12,
    marginBottom: 12,
    gap: 12,
  },
  gameImage: {
    width: 64,
    height: 64,
    borderRadius: 8,
    backgroundColor: colors.surfaceContainerHigh,
  },
  gameInfo: {
    flex: 1,
  },
  gameTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.onSurface,
    textTransform: 'uppercase',
  },
  gameGenre: {
    fontSize: 11,
    color: colors.onSurfaceVariant,
    marginTop: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
