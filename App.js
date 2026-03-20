import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  StatusBar,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const colors = {
  primary: '#ba9eff',
  primaryDim: '#8455ef',
  onPrimary: '#39008c',
  background: '#0e0e0e',
  surfaceContainer: '#1a1a1a',
  surfaceContainerHigh: '#20201f',
  onSurface: '#ffffff',
  onSurfaceVariant: '#adaaaa',
};

const featuredGame = {
  id: 'featured-1',
  title: 'The Last of Us',
  subtitle: 'Part II',
  description: 'Viva uma jornada brutal e emocionante de vinganca em um mundo pos-pandemico devastado.',
  image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKYPEsr-u-PlFAJYgYDcrrPxlqruU89ZsZBMCGmzAYewjRQyQntz9Lwq9hzqadgc1_hebzWgXD-TDPn1o0IqL1xGgXNiigTZvd41QLY39squ1ufb5wD7qpWpOSDrWENSVUrYkvysKioWR-uXukT8GHwYGjLTdGen4D3_Pqu9AotnMU91Ij6yY2BWSZ34vZqixkiywpIiQqVOnYHry5YIt7T84RkUFGWwkKQVjEXdRVlxbrj2EV-MsapXD1I202vRB4SgNmFxy4v83w',
};

const recommendedGamesData = [
  {
    id: '5',
    title: 'Gran Turismo 7',
    genre: 'Simulacao',
    price: 'R$ 349,90',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA4drJgHrTZZB__5wbbU19I9WHfEAcpOHxSdjMCkaKTrwA-f4YdmiQlN25ewyQ-kL5018m9xXzQG8-S7mKEeP6GgH2Fl3d8MCCyxPWSsvsNAssW5lXkH6kGPZL8on5Ol0aF3l3rn0RhL6EWg49vcRT4dhnEsmf83H5YXy59ffOoqj-uUc2tpF2fBA4SarONyJtVleeLy8ilIrVIL7kYdDaEk1p1lSTbaehpuHGWgjC0DbyxAxYunlQBp5tF8i0n0uCt9uIYctvpXzSh',
    isFavorite: true,
  },
  {
    id: '6',
    title: 'Ghost of Tsushima',
    genre: 'Acao / Stealth',
    price: 'Gratuito',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQz7bo2iU5XxxBQ_i7O0PjiTN6_DlAnbgB8seOPbbAQ__Cnb9nEsvMUEVaJzVr0w-ZfLSnOhOSGI0spT9FH32lMCYE5cg8VUblc92Qa5qo33ckoXvVM5mAYL5ptCFOuWuH-P6q0WJvbdiRgKo8japk6QCU7JuztGpzItXOgAZqWsQqxoxqoHRtjjhKXj5z5Ev_yV4eOGAL7ONb-s3X9xaXMm6eqJxifpr_gVNxT0HjYWXK9CGbSNvx6JvlMiIS1zujrTLVov8K_ypu',
    isFavorite: false,
  },
  {
    id: '7',
    title: "Demon's Souls",
    genre: 'Soulslike',
    price: 'R$ 299,00',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuASWCzBubnNbtcGSmK_YO_D1Bhf-RNHxb2jSb5s520dVU-egSNy2zvR2PZLGpPD46IlH39ZA5hEEjMjBkWjNty-0EEEJLjZaf7aNUGYLE142AnDiTmaDGkdij6ctVeoQe9GKk36erRZPbxSNdHuClsWvy9eg4pu9SCt87gSCNsX2ffIf1AnSRK4KjPvFnse7lIJD6B1yIZmui4nLrB7duhjwbtjmYHiGLyZ-NgZ1rVEXVNNe3bWAJkapW7ScExemRyxrvXaZ-qNw0s8',
    isFavorite: false,
  },
  {
    id: '8',
    title: 'Horizon Forbidden West',
    genre: 'Acao/RPG',
    price: 'R$ 249,90',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZM6joEarQ-PEr9eLsuB2kiJrLgFOIrOnjSwsX9K_TyzgbAufL2t3F04LGhFJgZ6mxqsa5IulGdcc2Ej-d4lp-lVUA-NmpWSS82mR_Y7cx_ZKiM_bnVNW62YerGQiYSY5ANYj8idout6XjjCKmJL2mi4uhTMIO17DXN8VGV5ROtHXomqVwXZ4PtUGojOtal8r6Zx30v1WN0gJzsIHLuzDMN4j4CX1cTjE5Iryunn4w5bZToBEMMaNwCAIh8dwpsJGvnRTmLAJKeWUH',
    isFavorite: false,
  },
];

const topGamesData = [
  {
    id: '9',
    title: 'Call of Duty: Warzone',
    players: '8.4M Jogadores Ativos',
    growth: '+12%',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxXGqGsQjNhG1Yjxb_vl2kEF6zUPjXioxE0RUXbMN8REQn19t0iy0tFeEyzzsoZKYxKwzXj_pDUbPJQ4g4H80Q9Hw9AD9d2oXGRZHMMb7LI4nlIxRO3USJMSxrr4iN_MqhNtY-Z4nAu03RA5A6Lx9lTQ4YCMsq-S6edm-F1PH3cHSzduqqAYRZNJsiOePSfGVPqNiSm2VVwJFaeqe2JC6tXYmZ0VlqNraGDAlrxcKu-HFkDo_ivKs-T_tvFJNXfysmBKZJf8z2HXrZ',
  },
  {
    id: '10',
    title: 'Fortnite',
    players: '6.1M Jogadores Ativos',
    growth: '+5%',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1SQ_O3SEyAe_t9f1NQCRV3633LVrsUrGtxNurinFpi4lOkHPd252Db-Kb_gVOZYzZFwCHP4jxPo3aoFSw5ClwqXdAXmsY3QuWrebECnThCBVw1108OFjmqQGYmgNLhnBnm28zcmp5eA_gFcu-8nJfi4_CjNl7z5nuZzYCbwDtmOujHMVL6DWGHVrrxfBaX-p77jvLi-pHudkafhB2CiIFYjq2gPfGNCVdCS25rnev-BDFf7q5tYVFEev8qijEsDdzA6ZXhFU76_WK',
  },
  {
    id: '11',
    title: 'Minecraft',
    players: '5.2M Jogadores Ativos',
    growth: '+8%',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCIFclYw9ZNMdssJBabyLwZYRCP_LoZ_B4iyxiABMB5bZP0ySmufFAAV38xLt06rNXIeIjDLEnlK81S7ds7uhYFA3U6kYMLUNHArZVkRIt61cxVbcadRcsRmGoG9Nng5r6Ttu6GrClJpZ_ukjSREPqCvg4mtV1fCLqEACqIGMehdnBYmFnL4Jjv6vneTwBD_rQe4MCJZDpIrfq0TO8tA6kY6LyrNFnDtnKDer0zZA-88Vtj4PGLyBkduVq0KoxO0l0_mItMWnuxClZW',
  },
  {
    id: '12',
    title: 'Valorant',
    players: '4.8M Jogadores Ativos',
    growth: '+15%',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZyTn4SjCq5uGdjkcw64Z__kRUTaNnVTn-9cdBEkX4FHt76EQXCOViLmY4-GRHabUaybniAiMlvV7A6772_9qGmqBkRENEdojBcgn-7zl2DBIArU6VwhG5LBh546RhrDbNy-mr7FRmP0JrD_0A7aQV8-XEZnNrOEKMCTVuLjcVVcW1YlNRqdCm0qPWclhRtwzBZt9sm_58dV3lwlpwIuTOMviw4Frr4KyhJy66VCCNW1i1SXpgHDOlwv3C0T0kfxdWOlkJBhaIHTwF',
  },
];

function Header() {
  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={18} color={colors.primary} />
        </View>
        <Text style={styles.headerTitle}>IRON</Text>
      </View>
      <TouchableOpacity onPress={() => Alert.alert('Buscar', 'Funcao de busca')}>
        <Ionicons name="search" size={24} color="#71717a" />
      </TouchableOpacity>
    </View>
  );
}

function HeroSection() {

  return (
    <View style={styles.heroContainer}>
      <Image source={{ uri: featuredGame.image }} style={styles.heroImage} />
      <View style={styles.heroOverlay} />
      <View style={styles.heroContent}>
        <View style={styles.heroBadge}>
          <Text style={styles.heroBadgeText}>DESTAQUE</Text>
        </View>
        <Text style={styles.heroTitle}>{featuredGame.title}</Text>
        <Text style={styles.heroSubtitle}>{featuredGame.subtitle}</Text>
        <Text style={styles.heroDescription}>{featuredGame.description}</Text>
        <View style={styles.heroButtons}>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>JOGAR AGORA</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.secondaryButton}
          >
            <Text style={styles.secondaryButtonText}>SAIBA MAIS</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

function SectionTitle({ title, highlight }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>
        {title} <Text style={styles.sectionHighlight}>{highlight}</Text>
      </Text>
    </View>
  );
}

function GameCard({ game, onToggleFavorite }) {
  return (
    <TouchableOpacity
      style={styles.gameCard}
      onPress={() => Alert.alert(game.title, `Genero: ${game.genre}\nPreco: ${game.price}`)}
      activeOpacity={0.8}
    >
      <View style={styles.gameCardImageContainer}>
        <Image source={{ uri: game.image }} style={styles.gameCardImage} />
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => onToggleFavorite(game.id)}
        >
          <Ionicons
            name={game.isFavorite ? 'heart' : 'heart-outline'}
            size={20}
            color={game.isFavorite ? colors.primary : '#71717a'}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.gameCardTitle}>{game.title}</Text>
      <View style={styles.gameCardMeta}>
        <Text style={styles.gameCardGenre}>{game.genre}</Text>
        <Text style={styles.gameCardPrice}>{game.price}</Text>
      </View>
    </TouchableOpacity>
  );
}

function TopGameItem({ game, index }) {
  return (
    <TouchableOpacity
      style={styles.topGameItem}
      onPress={() => Alert.alert(game.title, game.players)}
      activeOpacity={0.7}
    >
      <Text style={styles.topGameRank}>0{index + 1}</Text>
      <Image source={{ uri: game.image }} style={styles.topGameImage} />
      <View style={styles.topGameInfo}>
        <Text style={styles.topGameTitle}>{game.title}</Text>
        <Text style={styles.topGamePlayers}>{game.players}</Text>
      </View>
      <Text style={styles.topGameGrowth}>{game.growth}</Text>
    </TouchableOpacity>
  );
}

function BottomNav({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'home', icon: 'home', label: 'Home' },
    { id: 'library', icon: 'library', label: 'Biblioteca' },
    { id: 'favorites', icon: 'heart', label: 'Favoritos' },
    { id: 'search', icon: 'search', label: 'Buscar' },
  ];

  return (
    <View style={styles.bottomNav}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={[styles.navItem, activeTab === tab.id && styles.navItemActive]}
          onPress={() => setActiveTab(tab.id)}
        >
          <Ionicons
            name={activeTab === tab.id ? tab.icon : `${tab.icon}-outline`}
            size={24}
            color={activeTab === tab.id ? colors.primary : '#71717a'}
          />
          <Text
            style={[styles.navLabel, activeTab === tab.id && styles.navLabelActive]}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [recommendedGames, setRecommendedGames] = useState(recommendedGamesData);

  const toggleFavorite = (gameId) => {
    setRecommendedGames((prev) =>
      prev.map((game) =>
        game.id === gameId ? { ...game, isFavorite: !game.isFavorite } : game
      )
    );
    const game = recommendedGames.find((g) => g.id === gameId);
    Alert.alert(
      game?.isFavorite ? 'Removido dos Favoritos' : 'Adicionado aos Favoritos',
      game?.title
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <Header />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <HeroSection />
        <SectionTitle title="Recomendados" highlight="para voce" />
        <FlatList
          data={recommendedGames}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
          renderItem={({ item }) => (
            <GameCard game={item} onToggleFavorite={toggleFavorite} />
          )}
        />
    
        <SectionTitle title="Mais" highlight="Jogados" />
        <FlatList
          data={topGamesData}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          renderItem={({ item, index }) => <TopGameItem game={item} index={index} />}
          contentContainerStyle={styles.topGamesList}
        />

        <View style={styles.bottomPadding} />
      </ScrollView>

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 12,
    backgroundColor: colors.background,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surfaceContainer,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: -1,
  },

  heroContainer: {
    height: 450,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  heroImage: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  heroContent: {
    position: 'absolute',
    bottom: 24,
    left: 20,
    right: 20,
  },
  heroBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: 'rgba(186, 158, 255, 0.2)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(186, 158, 255, 0.3)',
    marginBottom: 12,
  },
  heroBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.primary,
    letterSpacing: 1,
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: '900',
    color: colors.onSurface,
    textTransform: 'uppercase',
    letterSpacing: -1,
  },
  heroSubtitle: {
    fontSize: 36,
    fontWeight: '900',
    color: colors.primaryDim,
    textTransform: 'uppercase',
    letterSpacing: -1,
    marginBottom: 8,
  },
  heroDescription: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
    lineHeight: 20,
    marginBottom: 16,
  },
  heroButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 8,
  },
  primaryButtonText: {
    fontSize: 12,
    fontWeight: '900',
    color: colors.onPrimary,
    letterSpacing: 1,
  },
  secondaryButton: {
    backgroundColor: colors.surfaceContainerHigh,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 8,
  },
  secondaryButtonText: {
    fontSize: 12,
    fontWeight: '900',
    color: colors.onSurface,
    letterSpacing: 1,
  },

  sectionHeader: {
    paddingHorizontal: 16,
    marginTop: 32,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.onSurface,
    textTransform: 'uppercase',
    fontStyle: 'italic',
    letterSpacing: -1,
  },
  sectionHighlight: {
    color: colors.primary,
  },

  horizontalList: {
    paddingHorizontal: 16,
    gap: 16,
  },
  gameCard: {
    width: 180,
  },
  gameCardImageContainer: {
    width: 180,
    height: 240,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: colors.surfaceContainer,
    marginBottom: 8,
  },
  gameCardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(14, 14, 14, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameCardTitle: {
    fontSize: 14,
    fontWeight: '900',
    color: colors.onSurface,
    textTransform: 'uppercase',
    letterSpacing: -0.5,
  },
  gameCardMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  gameCardGenre: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  gameCardPrice: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  topGamesList: {
    paddingHorizontal: 16,
    gap: 12,
  },
  topGameItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainer,
    borderRadius: 12,
    padding: 12,
    gap: 12,
  },
  topGameRank: {
    fontSize: 28,
    fontWeight: '900',
    color: 'rgba(72, 72, 71, 0.5)',
    fontStyle: 'italic',
    width: 40,
    textAlign: 'center',
  },
  topGameImage: {
    width: 56,
    height: 56,
    borderRadius: 8,
    backgroundColor: colors.surfaceContainerHigh,
  },
  topGameInfo: {
    flex: 1,
  },
  topGameTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.onSurface,
    textTransform: 'uppercase',
    letterSpacing: -0.5,
  },
  topGamePlayers: {
    fontSize: 11,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
  topGameGrowth: {
    fontSize: 12,
    fontWeight: '900',
    color: colors.primary,
  },

  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(14, 14, 14, 0.95)',
    paddingVertical: 12,
    paddingBottom: 28,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  navItem: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  navItemActive: {
    backgroundColor: 'rgba(186, 158, 255, 0.1)',
  },
  navLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#71717a',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: 4,
  },
  navLabelActive: {
    color: colors.primary,
  },

  bottomPadding: {
    height: 20,
  },
});
