import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  TextInput,
  Modal,
  Platform,
} from 'react-native';
import { Text } from '../../src/components/StyledText';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../src/hooks/useTheme';
import { useSettings } from '../../src/contexts/SettingsContext';
import { AppSettings, AIProvider } from '../../src/types';
import { AI_PROVIDERS } from '../../src/constants/ai';

const PROVIDER_KEYS = Object.keys(AI_PROVIDERS) as AIProvider[];

const CURRENCIES = [
  { code: 'PEN', label: 'PEN — Sol peruano' },
  { code: 'MXN', label: 'MXN — Peso mexicano' },
  { code: 'COP', label: 'COP — Peso colombiano' },
  { code: 'ARS', label: 'ARS — Peso argentino' },
  { code: 'CLP', label: 'CLP — Peso chileno' },
  { code: 'BRL', label: 'BRL — Real brasileno' },
  { code: 'UYU', label: 'UYU — Peso uruguayo' },
  { code: 'BOB', label: 'BOB — Boliviano' },
  { code: 'GTQ', label: 'GTQ — Quetzal' },
  { code: 'CRC', label: 'CRC — Colon costarricense' },
  { code: 'DOP', label: 'DOP — Peso dominicano' },
  { code: 'USD', label: 'USD — Dolar estadounidense' },
];

export default function SettingsScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { settings, updateSetting } = useSettings();

  const toggleNotifyDay = async (day: number) => {
    const current = settings.notifyDaysBefore;
    const updated = current.includes(day)
      ? current.filter(d => d !== day)
      : [...current, day].sort((a, b) => b - a);
    await updateSetting('notifyDaysBefore', updated);
  };

  const notifyDays = [7, 3, 1, 0];

  const themes: { value: AppSettings['theme']; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
    { value: 'system', label: 'Sistema', icon: 'phone-portrait-outline' },
    { value: 'light', label: 'Claro', icon: 'sunny-outline' },
    { value: 'dark', label: 'Oscuro', icon: 'moon-outline' },
  ];

  const [apiKeyInput, setApiKeyInput] = useState(settings.openaiApiKey);
  const [showApiKey, setShowApiKey] = useState(false);
  const [showCurrencyPicker, setShowCurrencyPicker] = useState(false);

  const handleSaveApiKey = async (key: string) => {
    setApiKeyInput(key);
    await updateSetting('openaiApiKey', key);
  };

  const currentProvider = AI_PROVIDERS[settings.aiProvider];

  return (
    <>
      <ScrollView style={[styles.container, { backgroundColor: colors.background, paddingTop: Platform.OS === 'android' ? insets.top : 0 }]}>
        {/* Notificaciones */}
        <Text style={[styles.sectionTitle, { color: colors.text, marginTop: 12 }]}>Notificaciones</Text>

        <View style={[styles.card, { backgroundColor: colors.card }, colors.shadow]}>
          <Text style={[styles.cardLabel, { color: colors.text }]}>Alertas de vencimiento</Text>
          <View style={styles.chipGroup}>
            {notifyDays.map(day => (
              <TouchableOpacity
                key={day}
                style={[
                  styles.chip,
                  {
                    backgroundColor: settings.notifyDaysBefore.includes(day) ? colors.primary : colors.surface,
                    borderColor: settings.notifyDaysBefore.includes(day) ? colors.primary : colors.border,
                  },
                ]}
                onPress={() => toggleNotifyDay(day)}
              >
                <Text
                  style={{
                    color: settings.notifyDaysBefore.includes(day) ? colors.primaryText : colors.text,
                    fontSize: 13,
                    fontWeight: '500',
                  }}
                >
                  {day === 0 ? 'El dia' : `${day}d`}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={[styles.divider, { backgroundColor: colors.border + '30' }]} />

          <View style={styles.rowInline}>
            <Text style={[styles.rowLabel, { color: colors.text }]}>Resumen diario</Text>
            <Switch
              value={settings.dailySummary}
              onValueChange={v => updateSetting('dailySummary', v)}
              trackColor={{ true: colors.primary }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        {/* General */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>General</Text>

        <View style={[styles.card, { backgroundColor: colors.card }, colors.shadow]}>
          <Text style={[styles.cardLabel, { color: colors.text }]}>Tema</Text>
          <View style={styles.chipGroup}>
            {themes.map(t => (
              <TouchableOpacity
                key={t.value}
                style={[
                  styles.chip,
                  {
                    backgroundColor: settings.theme === t.value ? colors.primary : colors.surface,
                    borderColor: settings.theme === t.value ? colors.primary : colors.border,
                  },
                ]}
                onPress={() => updateSetting('theme', t.value)}
              >
                <Ionicons
                  name={t.icon}
                  size={14}
                  color={settings.theme === t.value ? colors.primaryText : colors.textSecondary}
                />
                <Text
                  style={{
                    color: settings.theme === t.value ? colors.primaryText : colors.text,
                    fontSize: 13,
                    fontWeight: '500',
                  }}
                >
                  {t.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={[styles.divider, { backgroundColor: colors.border + '30' }]} />

          <View style={styles.rowInline}>
            <Text style={[styles.rowLabel, { color: colors.text }]}>Moneda</Text>
            <TouchableOpacity
              style={[styles.currencySelector, { backgroundColor: colors.surface, borderColor: colors.border }]}
              onPress={() => setShowCurrencyPicker(true)}
              activeOpacity={0.7}
            >
              <Text style={[styles.currencyValue, { color: colors.text }]}>{settings.currency}</Text>
              <Ionicons name="chevron-down" size={16} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* IA */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Integracion con IA</Text>

        <View style={[styles.card, { backgroundColor: colors.card }, colors.shadow]}>
          <Text style={[styles.cardLabel, { color: colors.text }]}>Proveedor</Text>
          <View style={styles.chipGroup}>
            {PROVIDER_KEYS.map(key => (
              <TouchableOpacity
                key={key}
                style={[
                  styles.chip,
                  {
                    backgroundColor: settings.aiProvider === key ? colors.primary : colors.surface,
                    borderColor: settings.aiProvider === key ? colors.primary : colors.border,
                  },
                ]}
                onPress={() => updateSetting('aiProvider', key)}
              >
                <Text
                  style={{
                    color: settings.aiProvider === key ? colors.primaryText : colors.text,
                    fontSize: 13,
                    fontWeight: '500',
                  }}
                >
                  {AI_PROVIDERS[key].name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={[styles.divider, { backgroundColor: colors.border + '30' }]} />

          <View style={styles.aiHeader}>
            <Text style={[styles.cardLabel, { color: colors.text }]}>API Key</Text>
            {settings.openaiApiKey ? (
              <View style={[styles.aiIndicator, { backgroundColor: '#4CAF5020' }]}>
                <Ionicons name="checkmark-circle" size={14} color="#4CAF50" />
                <Text style={{ color: '#4CAF50', fontSize: 12, fontWeight: '500' }}>OK</Text>
              </View>
            ) : null}
          </View>
          <View style={styles.apiKeyRow}>
            <TextInput
              style={[styles.apiKeyInput, { backgroundColor: colors.surface, color: colors.text, borderColor: colors.border }]}
              value={apiKeyInput}
              onChangeText={handleSaveApiKey}
              placeholder={currentProvider.placeholder}
              placeholderTextColor={colors.textSecondary}
              secureTextEntry={!showApiKey}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TouchableOpacity
              style={[styles.apiKeyToggle, { backgroundColor: colors.surface, borderColor: colors.border }]}
              onPress={() => setShowApiKey(!showApiKey)}
            >
              <Ionicons name={showApiKey ? 'eye-off' : 'eye'} size={18} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Acerca de */}
        <View style={[styles.card, { backgroundColor: colors.card, marginTop: 16 }, colors.shadow]}>
          <View style={styles.aboutRow}>
            <Text style={[styles.aboutLabel, { color: colors.textSecondary }]}>FreshKeep</Text>
            <Text style={[styles.aboutValue, { color: colors.textSecondary }]}>v1.0.0</Text>
          </View>
        </View>

        <View style={{ height: Platform.select({ ios: 40, android: 190 }) }} />
      </ScrollView>

      {/* Currency picker modal */}
      <Modal visible={showCurrencyPicker} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowCurrencyPicker(false)}
        >
          <View style={[styles.modalCard, { backgroundColor: colors.card }, colors.shadow]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>Moneda</Text>
            <ScrollView style={styles.modalScroll} bounces={false}>
              {CURRENCIES.map(c => (
                <TouchableOpacity
                  key={c.code}
                  style={[
                    styles.modalOption,
                    settings.currency === c.code && { backgroundColor: colors.primary + '18' },
                  ]}
                  onPress={() => {
                    updateSetting('currency', c.code);
                    setShowCurrencyPicker(false);
                  }}
                >
                  <Text style={[styles.modalOptionText, { color: colors.text }]}>{c.label}</Text>
                  {settings.currency === c.code && (
                    <Ionicons name="checkmark" size={18} color={colors.primary} />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    paddingHorizontal: 20,
    marginTop: 16,
    marginBottom: 6,
  },
  card: {
    marginHorizontal: 16,
    marginVertical: 4,
    padding: 14,
    borderRadius: 16,
  },
  cardLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  chipGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
  },
  divider: {
    height: 1,
    marginVertical: 12,
  },
  rowInline: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  currencySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
  },
  currencyValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  aiHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  aiIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    marginBottom: 8,
  },
  apiKeyRow: {
    flexDirection: 'row',
    gap: 8,
  },
  apiKeyInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
  },
  apiKeyToggle: {
    borderWidth: 1,
    borderRadius: 14,
    width: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  aboutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  aboutLabel: {
    fontSize: 13,
  },
  aboutValue: {
    fontSize: 13,
    fontWeight: '500',
  },
  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  modalCard: {
    width: '100%',
    borderRadius: 20,
    padding: 20,
    maxHeight: 420,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },
  modalScroll: {
    maxHeight: 360,
  },
  modalOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  modalOptionText: {
    fontSize: 14,
    fontWeight: '400',
  },
});
