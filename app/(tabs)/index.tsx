import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Alert,
  Image,
} from 'react-native';
import { GlassView, GlassContainer } from 'expo-glass-effect';
import { useFocusEffect, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useDatabase } from '../../src/hooks/useDatabase';
import { useTheme } from '../../src/hooks/useTheme';
import { getDailyNutrition, deleteMeal } from '../../src/database/meals';
import { getExpiringItems, getExpiredItems } from '../../src/database/foodItems';
import { DailyNutrition, Meal, MealType, FoodItem } from '../../src/types';
import { DateSelector } from '../../src/components/DateSelector';
import { MealTypeFilter } from '../../src/components/MealTypeFilter';
import { MealCard } from '../../src/components/MealCard';
import { EmptyState } from '../../src/components/EmptyState';
import { getTodayString } from '../../src/utils/dates';
import { getExpirationLabel } from '../../src/utils/dates';
import { Host, Button, VStack, HStack } from '@expo/ui/swift-ui';

export default function HomeScreen() {
  const db = useDatabase();
  const router = useRouter();
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();

  const [selectedDate, setSelectedDate] = useState(getTodayString());
  const [mealFilter, setMealFilter] = useState<MealType | 'all'>('all');
  const [nutrition, setNutrition] = useState<DailyNutrition>({
    date: getTodayString(),
    totalCalories: 0,
    totalProtein: 0,
    totalFats: 0,
    totalCarbs: 0,
    meals: [],
  });
  const [expiringItems, setExpiringItems] = useState<FoodItem[]>([]);
  const [expiredCount, setExpiredCount] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = useCallback(async () => {
    const [daily, expiring, expired] = await Promise.all([
      getDailyNutrition(db, selectedDate),
      getExpiringItems(db, 3),
      getExpiredItems(db),
    ]);
    setNutrition(daily);
    setExpiringItems(expiring.slice(0, 3));
    setExpiredCount(expired.length);
  }, [db, selectedDate]);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
  };

  const handleDeleteMeal = async (meal: Meal) => {
    Alert.alert(
      'Eliminar comida',
      `Quieres eliminar "${meal.name}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            await deleteMeal(db, meal.id);
            loadData();
          },
        },
      ]
    );
  };

  const filteredMeals = mealFilter === 'all'
    ? nutrition.meals
    : nutrition.meals.filter(m => m.mealType === mealFilter);

  const alertItems = [...expiringItems];
  const totalAlerts = expiredCount + expiringItems.length;

  return (
    <View style={styles.container}>
      <Image
        style={styles.backgroundImage}
        source={require('../../assets/background.png')}
        resizeMode="cover"
      />
      <ScrollView
        style={[styles.container, { paddingTop: insets.top }]}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />}
      >
        <Host style={{ flex: 1, justifyContent: 'center', paddingTop: 400 }}>
          <VStack spacing={16}>

            {/* Liquid Glass translúcido - deja ver el fondo */}
            <Button
              variant="glass"
              onPress={() => Alert.alert('Glass!')}>
              Botón Glass
            </Button>

            {/* Liquid Glass prominente - opaco pero con efecto glass */}
            <Button
              variant="glassProminent"
              onPress={() => Alert.alert('Glass Prominent!')}>
              Botón Glass Prominent
            </Button>

            {/* Glass con tint de color y ícono */}
            <Button
              variant="glass"
              color="purple"
              systemImage="star.fill"
              onPress={() => Alert.alert('Favorito!')}>
              Favorito
            </Button>

            {/* Glass Prominent con color - para acción primaria */}
            <Button
              variant="glassProminent"
              color="orange"
              systemImage="questionmark.circle"
              onPress={() => Alert.alert('Ayuda!')}>
              Help & support
            </Button>

            {/* Grupo de botones glass juntos */}
            <HStack spacing={12}>
              <Button
                variant="glass"
                systemImage="heart.fill"
                color="red"
                onPress={() => { }}>
                Like
              </Button>
              <Button
                variant="glass"
                systemImage="square.and.arrow.up"
                onPress={() => { }}>
                Share
              </Button>
            </HStack>

          </VStack>
        </Host>
        {/* <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>FreshKeep</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity
              onPress={() => router.push('/ai-recipes')}
            >
              <GlassView style={styles.headerBtn}>
                <Ionicons name="sparkles" size={20} color={colors.accent} />
              </GlassView>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.addButton, { backgroundColor: colors.primary }, colors.shadow]}
              onPress={() => router.push({ pathname: '/add-meal', params: { date: selectedDate } })}
            >
              <Ionicons name="add" size={24} color={colors.primaryText} />
            </TouchableOpacity>
          </View>
        </View>

        <DateSelector selectedDate={selectedDate} onDateChange={handleDateChange} />

        <View style={{ height: 12 }} />

        <GlassContainer spacing={8} style={styles.nutritionContainer}>
          <GlassView style={styles.nutritionCard}>
            <View style={[styles.nutritionDot, { backgroundColor: '#F47551' }]} />
            <Text style={[styles.nutritionValue, { color: colors.text }]}>
              {Math.round(nutrition.totalCalories)}
              <Text style={[styles.nutritionUnit, { color: colors.textSecondary }]}> kcal</Text>
            </Text>
            <Text style={[styles.nutritionLabel, { color: colors.textSecondary }]}>Calorias</Text>
          </GlassView>
          <GlassView style={styles.nutritionCard}>
            <View style={[styles.nutritionDot, { backgroundColor: '#CCB1F6' }]} />
            <Text style={[styles.nutritionValue, { color: colors.text }]}>
              {Math.round(nutrition.totalProtein)}
              <Text style={[styles.nutritionUnit, { color: colors.textSecondary }]}> g</Text>
            </Text>
            <Text style={[styles.nutritionLabel, { color: colors.textSecondary }]}>Proteina</Text>
          </GlassView>
          <GlassView style={styles.nutritionCard}>
            <View style={[styles.nutritionDot, { backgroundColor: '#F8D558' }]} />
            <Text style={[styles.nutritionValue, { color: colors.text }]}>
              {Math.round(nutrition.totalFats)}
              <Text style={[styles.nutritionUnit, { color: colors.textSecondary }]}> g</Text>
            </Text>
            <Text style={[styles.nutritionLabel, { color: colors.textSecondary }]}>Grasas</Text>
          </GlassView>
          <GlassView style={styles.nutritionCard}>
            <View style={[styles.nutritionDot, { backgroundColor: '#CDE26D' }]} />
            <Text style={[styles.nutritionValue, { color: colors.text }]}>
              {Math.round(nutrition.totalCarbs)}
              <Text style={[styles.nutritionUnit, { color: colors.textSecondary }]}> g</Text>
            </Text>
            <Text style={[styles.nutritionLabel, { color: colors.textSecondary }]}>Carbos</Text>
          </GlassView>
        </GlassContainer>

        <View style={{ height: 12 }} />
      
        <MealTypeFilter selected={mealFilter} onSelect={setMealFilter} />

        <View style={{ height: 8 }} />

        {filteredMeals.length > 0 ? (
          filteredMeals.map(meal => (
            <MealCard
              key={meal.id}
              meal={meal}
              onDelete={handleDeleteMeal}
            />
          ))
        ) : (
          <EmptyState
            icon="restaurant-outline"
            title="Sin comidas"
            message="Toca el boton + para registrar tu primera comida del dia."
          />
        )}

        {totalAlerts > 0 && (
          <View style={styles.alertSection}>
            <GlassView style={styles.alertBanner}>
              <View style={[styles.alertIconBg, { backgroundColor: colors.statusExpired + '25' }]}>
                <Ionicons name="alert-circle" size={18} color={colors.statusExpired} />
              </View>
              <Text style={[styles.alertText, { color: colors.text }]}>
                {expiredCount > 0 && `${expiredCount} vencido${expiredCount !== 1 ? 's' : ''}`}
                {expiredCount > 0 && expiringItems.length > 0 && ' · '}
                {expiringItems.length > 0 && `${expiringItems.length} por vencer`}
              </Text>
              <TouchableOpacity onPress={() => router.push('/(tabs)/inventory')}>
                <Text style={[styles.alertLink, { color: colors.primary }]}>Ver</Text>
              </TouchableOpacity>
            </GlassView>

            {alertItems.map(item => (
              <GlassView key={item.id} style={styles.alertItem}>
                <View style={[styles.alertDot, {
                  backgroundColor: item.status === 'expired' ? colors.statusExpired : colors.statusExpiring,
                }]} />
                <Text style={[styles.alertItemName, { color: colors.text }]} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={[styles.alertItemLabel, { color: colors.textSecondary }]}>
                  {getExpirationLabel(item.expirationDate)}
                </Text>
              </GlassView>
            ))}
          </View>
        )}

        <View style={{ height: 32 }} /> */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    opacity: 0.55,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 10,
  },
  headerBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nutritionContainer: {
    marginHorizontal: 16,
    marginVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  nutritionCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 14,
    gap: 2,
  },
  nutritionDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 4,
  },
  nutritionValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  nutritionUnit: {
    fontSize: 12,
    fontWeight: '400',
  },
  nutritionLabel: {
    fontSize: 11,
    marginTop: 2,
  },
  alertSection: {
    marginTop: 16,
    paddingHorizontal: 16,
    gap: 6,
  },
  alertBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
    borderRadius: 14,
  },
  alertIconBg: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertText: {
    fontSize: 13,
    fontWeight: '500',
    flex: 1,
  },
  alertLink: {
    fontSize: 13,
    fontWeight: '600',
  },
  alertItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    borderRadius: 12,
  },
  alertDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  alertItemName: {
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  alertItemLabel: {
    fontSize: 12,
  },
});
