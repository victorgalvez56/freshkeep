import { Platform } from 'react-native';

export const Colors = {
  light: {
    background: '#E2F2D8',
    surface: '#FFFFFF',
    text: '#333333',
    textSecondary: '#888888',
    primary: '#CDE26D',
    primaryDark: '#B5C95A',
    primaryText: '#333333',
    accent: '#CCB1F6',
    danger: '#F47551',
    warning: '#F8D558',
    success: '#CDE26D',
    border: '#EEEEEE',
    card: '#FFFFFF',
    statusFresh: '#CDE26D',
    statusExpiring: '#F8D558',
    statusExpired: '#F47551',
    tabBar: '#FFFFFF',
    tabBarActive: '#5B8C2A',
    tabBarInactive: '#BBBBBB',
    shadow: Platform.select({
      ios: {
        shadowColor: '#333333',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 10,
      },
      android: {
        elevation: 2,
      },
      default: {},
    })!,
    glass: {
      card: 'rgba(255,255,255,0.72)',
      surface: 'rgba(255,255,255,0.55)',
      border: 'rgba(255,255,255,0.45)',
    },
    glassShadow: Platform.select({
      ios: {
        shadowColor: '#333333',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 16,
      },
      android: {
        elevation: 3,
      },
      default: {},
    })!,
  },
  dark: {
    background: '#1A1A1A',
    surface: '#2A2A2A',
    text: '#F0F0F0',
    textSecondary: '#999999',
    primary: '#CDE26D',
    primaryDark: '#B5C95A',
    primaryText: '#333333',
    accent: '#CCB1F6',
    danger: '#F47551',
    warning: '#F8D558',
    success: '#CDE26D',
    border: '#3A3A3A',
    card: '#2A2A2A',
    statusFresh: '#CDE26D',
    statusExpiring: '#F8D558',
    statusExpired: '#F47551',
    tabBar: '#1A1A1A',
    tabBarActive: '#CDE26D',
    tabBarInactive: '#666666',
    shadow: Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
      },
      android: {
        elevation: 2,
      },
      default: {},
    })!,
    glass: {
      card: 'rgba(42,42,42,0.72)',
      surface: 'rgba(42,42,42,0.55)',
      border: 'rgba(255,255,255,0.12)',
    },
    glassShadow: Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.35,
        shadowRadius: 16,
      },
      android: {
        elevation: 3,
      },
      default: {},
    })!,
  },
};

export type ThemeColors = typeof Colors.light;
