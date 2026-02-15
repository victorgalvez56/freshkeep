import React from 'react';
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { Text } from './StyledText';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';

interface AIConsentDialogProps {
  visible: boolean;
  onAccept: () => void;
  onDecline: () => void;
}

export function AIConsentDialog({ visible, onAccept, onDecline }: AIConsentDialogProps) {
  const { colors } = useTheme();

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <View style={[styles.iconBg, { backgroundColor: colors.primary + '20' }]}>
            <Ionicons name="shield-checkmark-outline" size={32} color={colors.primary} />
          </View>

          <Text style={[styles.title, { color: colors.text }]}>Uso de inteligencia artificial</Text>

          <Text style={[styles.body, { color: colors.textSecondary }]}>
            Para escanear etiquetas y generar recetas, FreshKeep envia:
          </Text>

          <View style={styles.list}>
            <View style={styles.listItem}>
              <Ionicons name="camera-outline" size={16} color={colors.primary} />
              <Text style={[styles.listText, { color: colors.text }]}>
                Fotos de productos (solo para escaneo)
              </Text>
            </View>
            <View style={styles.listItem}>
              <Ionicons name="list-outline" size={16} color={colors.primary} />
              <Text style={[styles.listText, { color: colors.text }]}>
                Lista de ingredientes (solo para recetas)
              </Text>
            </View>
          </View>

          <Text style={[styles.body, { color: colors.textSecondary }]}>
            Los datos se procesan mediante OpenAI a traves de nuestro servidor. No se comparte informacion personal.
          </Text>

          <TouchableOpacity
            onPress={() => Linking.openURL('https://v0-freshkeep.vercel.app/privacy')}
            style={styles.link}
          >
            <Ionicons name="open-outline" size={14} color={colors.primary} />
            <Text style={[styles.linkText, { color: colors.primary }]}>Politica de privacidad</Text>
          </TouchableOpacity>

          <View style={styles.buttons}>
            <TouchableOpacity
              style={[styles.btn, styles.declineBtn, { borderColor: colors.border }]}
              onPress={onDecline}
            >
              <Text style={[styles.btnText, { color: colors.textSecondary }]}>No, gracias</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btn, styles.acceptBtn, { backgroundColor: colors.primary }]}
              onPress={onAccept}
            >
              <Text style={[styles.btnText, { color: colors.primaryText }]}>Aceptar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    borderRadius: 20,
    padding: 24,
  },
  iconBg: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12,
  },
  body: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  list: {
    gap: 8,
    marginBottom: 12,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  listText: {
    fontSize: 14,
    flex: 1,
  },
  link: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 20,
  },
  linkText: {
    fontSize: 13,
    fontWeight: '600',
  },
  buttons: {
    flexDirection: 'row',
    gap: 10,
  },
  btn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: 'center',
  },
  declineBtn: {
    borderWidth: 1,
  },
  acceptBtn: {},
  btnText: {
    fontSize: 15,
    fontWeight: '600',
  },
});
