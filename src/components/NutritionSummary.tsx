import React from 'react';
import { View, StyleSheet, Platform, ScrollView, Dimensions } from 'react-native';
import { Text } from './StyledText';
import { GlassView } from 'expo-glass-effect';
import { GlassCard } from './GlassCard';
import { useTheme } from '../hooks/useTheme';
import { DailyNutrition } from '../types';

interface Props {
  nutrition: DailyNutrition;
}

const STAT_COLORS = {
  calories: '#F47551',
  protein: '#CCB1F6',
  fats: '#F8D558',
  carbs: '#CDE26D',
};

export function NutritionSummary({ nutrition }: Props) {
  const { colors, isDark } = useTheme();

  const stats = [
    { label: 'Calorias', value: `${Math.round(nutrition.totalCalories)}`, unit: 'kcal', color: STAT_COLORS.calories },
    { label: 'Proteina', value: `${Math.round(nutrition.totalProtein)}`, unit: 'g', color: STAT_COLORS.protein },
    { label: 'Grasas', value: `${Math.round(nutrition.totalFats)}`, unit: 'g', color: STAT_COLORS.fats },
    { label: 'Carbos', value: `${Math.round(nutrition.totalCarbs)}`, unit: 'g', color: STAT_COLORS.carbs },
  ];

  const StatCard = ({ stat }: { stat: typeof stats[0] }) => (
    <>
      <View style={[styles.statDot, { backgroundColor: stat.color }]} />
      <Text style={[styles.statValue, { color: colors.text }]}>
        {stat.value}
        <Text style={[styles.statUnit, { color: colors.textSecondary }]}> {stat.unit}</Text>
      </Text>
      <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{stat.label}</Text>
    </>
  );

  if (Platform.OS === 'android') {
    return (
      <View style={styles.container}>
        {stats.map(stat => (
          <GlassCard key={stat.label} style={styles.statCard} borderRadius={14}>
            <StatCard stat={stat} />
          </GlassCard>
        ))}
      </View>
    );
  }

  return (
    <ScrollView
      horizontal
      scrollEnabled={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {stats.map(stat => (
        <GlassView key={stat.label} style={[styles.statCard, colors.shadow]}>
          <StatCard stat={stat} />
        </GlassView>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statCard: {
    width: (Dimensions.get('window').width - 32 - 24) / 4,
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 14,
    gap: 2,
  },
  statDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  statUnit: {
    fontSize: 12,
    fontWeight: '400',
  },
  statLabel: {
    fontSize: 11,
    marginTop: 2,
  },
});
