import React from 'react';
import { View, TouchableOpacity, ViewStyle, Platform } from 'react-native';
import { GlassView } from 'expo-glass-effect';
import { useTheme } from '../hooks/useTheme';

interface Props {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  borderRadius?: number;
  intensity?: 'standard' | 'subtle';
  onPress?: () => void;
  activeOpacity?: number;
}

export function GlassCard({
  children,
  style,
  borderRadius = 16,
  intensity = 'standard',
  onPress,
  activeOpacity = 0.7,
}: Props) {
  const { colors } = useTheme();

  const fallbackStyle: ViewStyle = {
    backgroundColor: intensity === 'standard' ? colors.glass.card : colors.glass.surface,
    borderWidth: 1,
    borderColor: colors.glass.border,
    borderRadius,
    overflow: 'hidden',
    ...colors.glassShadow,
  };

  if (onPress) {
    return (
      <TouchableOpacity
        style={[{ borderRadius, overflow: 'hidden' }, style]}
        onPress={onPress}
        activeOpacity={activeOpacity}
      >
        <GlassView
          style={[fallbackStyle, { borderRadius }]}
          tintColor={intensity === 'standard' ? colors.glass.card : colors.glass.surface}
        >
          {children}
        </GlassView>
      </TouchableOpacity>
    );
  }

  return (
    <GlassView
      style={[fallbackStyle, style, { borderRadius }]}
      tintColor={intensity === 'standard' ? colors.glass.card : colors.glass.surface}
    >
      {children}
    </GlassView>
  );
}
