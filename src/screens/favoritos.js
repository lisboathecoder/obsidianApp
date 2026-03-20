import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { recommendedGames as initialGames } from '../data/games';

export default function Favoritos() {
  const [favorites, setFavorites] = useState(
    initialGames.filter((game) => game.isFavorite)
  );

  const handleRemove = (gameId) => {
    const game = favorites.find((g) => g.id === gameId);
    Alert.alert(
      'Remover dos Favoritos',
      `Deseja remover ${game?.title} dos favoritos?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: () => {
            setFavorites((prev) => prev.filter((g) => g.id !== gameId));
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.gameItem}>
      <Image source={{ uri: item.image }} style={styles.gameImage} />
      <View style={styles.gameInfo}>
        <Text style={styles.gameTitle} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.gameGenre}>{item.genre}</Text>
        <Text style={styles.gamePrice}>{item.price}</Text>
      </View>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => handleRemove(item.id)}
      >
        <Ionicons name="heart-dislike" size={24} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="heart-outline" size={64} color={colors.outlineVariant} />
      <Text style={styles.emptyText}>Nenhum favorito ainda</Text>
      <Text style={styles.emptySubtext}>
        Adicione jogos aos favoritos na tela inicial
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Favoritos</Text>
        <Text style={styles.subtitle}>{favorites.length} jogos</Text>
      </View>
      <FlatList
        data={favorites}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[
          styles.list,
          favorites.length === 0 && styles.emptyList,
        ]}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmpty}
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
  emptyList: {
    flex: 1,
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
    width: 80,
    height: 100,
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
  gamePrice: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
    marginTop: 8,
  },
  removeButton: {
    padding: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.onSurface,
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
    marginTop: 8,
    textAlign: 'center',
  },
});
