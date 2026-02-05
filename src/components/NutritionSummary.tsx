import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GlassView, GlassContainer } from 'expo-glass-effect';
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
  const { colors } = useTheme();

  const stats = [
    { label: 'Calorias', value: `${Math.round(nutrition.totalCalories)}`, unit: 'kcal', color: STAT_COLORS.calories },
    { label: 'Proteina', value: `${Math.round(nutrition.totalProtein)}`, unit: 'g', color: STAT_COLORS.protein },
    { label: 'Grasas', value: `${Math.round(nutrition.totalFats)}`, unit: 'g', color: STAT_COLORS.fats },
    { label: 'Carbos', value: `${Math.round(nutrition.totalCarbs)}`, unit: 'g', color: STAT_COLORS.carbs },
  ];

  return (
    <GlassContainer spacing={8} style={styles.container}>
      {stats.map(stat => (
        <GlassView key={stat.label} style={styles.statCard}>
          <View style={[styles.statDot, { backgroundColor: stat.color }]} />
          <Text style={[styles.statValue, { color: colors.text }]}>
            {stat.value}
            <Text style={[styles.statUnit, { color: colors.textSecondary }]}> {stat.unit}</Text>
          </Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{stat.label}</Text>
        </GlassView>
      ))}
    </GlassContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  statCard: {
    flex: 1,
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
