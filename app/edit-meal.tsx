import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  InputAccessoryView,
  Keyboard,
  Platform,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Text } from '../src/components/StyledText';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useDatabase } from '../src/hooks/useDatabase';
import { useTheme } from '../src/hooks/useTheme';
import { getMealById, updateMeal, deleteMeal } from '../src/database/meals';
import { MealType, MealSource } from '../src/types';
import { MEAL_TYPES, FOOD_EMOJIS } from '../src/constants/meals';

export default function EditMealScreen() {
  const db = useDatabase();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colors } = useTheme();

  const [name, setName] = useState('');
  const [emoji, setEmoji] = useState('🍽️');
  const [mealType, setMealType] = useState<MealType>('lunch');
  const [date, setDate] = useState('');
  const [servingSize, setServingSize] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [fats, setFats] = useState('');
  const [carbs, setCarbs] = useState('');
  const [notes, setNotes] = useState('');
  const [source, setSource] = useState<MealSource>('manual');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [loading, setLoading] = useState(true);

  const servingSizeRef = useRef<TextInput>(null);
  const caloriesRef = useRef<TextInput>(null);
  const proteinRef = useRef<TextInput>(null);
  const fatsRef = useRef<TextInput>(null);
  const carbsRef = useRef<TextInput>(null);
  const notesRef = useRef<TextInput>(null);

  const mealTypeOptions = MEAL_TYPES.filter(m => m.value !== 'all');

  useEffect(() => {
    if (!id) return;
    (async () => {
      const meal = await getMealById(db, id);
      if (!meal) {
        Alert.alert('Error', 'Comida no encontrada.');
        router.back();
        return;
      }
      setName(meal.name);
      setEmoji(meal.emoji);
      setMealType(meal.mealType);
      setDate(meal.date);
      setServingSize(meal.servingSize);
      setCalories(meal.calories ? String(meal.calories) : '');
      setProtein(meal.protein ? String(meal.protein) : '');
      setFats(meal.fats ? String(meal.fats) : '');
      setCarbs(meal.carbs ? String(meal.carbs) : '');
      setNotes(meal.notes);
      setSource(meal.source);
      setLoading(false);
    })();
  }, [id, db]);

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Falta el nombre', 'Por favor ingresa un nombre para la comida.');
      return;
    }
    if (!id) return;

    await updateMeal(db, id, {
      name: name.trim(),
      mealType,
      date,
      calories: parseFloat(calories) || 0,
      protein: parseFloat(protein) || 0,
      fats: parseFloat(fats) || 0,
      carbs: parseFloat(carbs) || 0,
      servingSize: servingSize.trim(),
      emoji,
      notes: notes.trim(),
      source,
    });

    router.back();
  };

  const handleDelete = () => {
    Alert.alert('Eliminar comida', `Seguro que quieres eliminar "${name}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: async () => {
          if (id) {
            await deleteMeal(db, id);
            router.back();
          }
        },
      },
    ]);
  };

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: colors.textSecondary }}>Cargando...</Text>
      </View>
    );
  }

  return (
    <>
    <KeyboardAwareScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      keyboardShouldPersistTaps="handled"
      enableOnAndroid
      extraScrollHeight={20}
    >
      <View key={loading ? 'loading' : id} style={styles.form}>
        <Text style={[styles.label, { color: colors.text }]}>Nombre *</Text>
        <TextInput
          style={[styles.input, { backgroundColor: colors.surface, color: colors.text, borderColor: colors.border }]}
          value={name}
          onChangeText={setName}
          placeholder="Ej: Ensalada cesar"
          placeholderTextColor={colors.textSecondary}
          autoCapitalize="words"
          autoCorrect={false}
          maxLength={100}
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => servingSizeRef.current?.focus()}
        />

        <Text style={[styles.label, { color: colors.text }]}>Emoji</Text>
        <TouchableOpacity
          style={[styles.emojiBtn, { backgroundColor: colors.surface, borderColor: colors.border }]}
          onPress={() => setShowEmojiPicker(!showEmojiPicker)}
        >
          <Text style={styles.emojiBtnText}>{emoji}</Text>
          <Ionicons name="chevron-down" size={16} color={colors.textSecondary} />
        </TouchableOpacity>

        {showEmojiPicker && (
          <View style={[styles.emojiGrid, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            {FOOD_EMOJIS.map(e => (
              <TouchableOpacity
                key={e}
                style={[
                  styles.emojiItem,
                  emoji === e && { backgroundColor: colors.primary + '30' },
                ]}
                onPress={() => { setEmoji(e); setShowEmojiPicker(false); }}
              >
                <Text style={styles.emojiItemText}>{e}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <Text style={[styles.label, { color: colors.text }]}>Tipo de comida</Text>
        <View style={styles.chipGroup}>
          {mealTypeOptions.map(t => (
            <TouchableOpacity
              key={t.value}
              style={[
                styles.chip,
                {
                  backgroundColor: mealType === t.value ? colors.primary : colors.surface,
                  borderColor: mealType === t.value ? colors.primary : colors.border,
                },
              ]}
              onPress={() => setMealType(t.value as MealType)}
            >
              <Ionicons
                name={t.icon as keyof typeof Ionicons.glyphMap}
                size={14}
                color={mealType === t.value ? colors.primaryText : colors.textSecondary}
              />
              <Text style={{ color: mealType === t.value ? colors.primaryText : colors.text, fontSize: 13 }}>
                {t.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[styles.label, { color: colors.text }]}>Fecha</Text>
        <TextInput
          style={[styles.input, { backgroundColor: colors.surface, color: colors.text, borderColor: colors.border }]}
          value={date}
          onChangeText={setDate}
          placeholder="YYYY-MM-DD"
          placeholderTextColor={colors.textSecondary}
        />

        <Text style={[styles.label, { color: colors.text }]}>Porcion</Text>
        <TextInput
          ref={servingSizeRef}
          style={[styles.input, { backgroundColor: colors.surface, color: colors.text, borderColor: colors.border }]}
          value={servingSize}
          onChangeText={setServingSize}
          placeholder="Ej: 1 porcion"
          placeholderTextColor={colors.textSecondary}
          maxLength={50}
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => caloriesRef.current?.focus()}
        />

        <Text style={[styles.label, { color: colors.text }]}>Nutricion</Text>
        <View style={styles.macroGrid}>
          <View style={styles.macroField}>
            <Text style={[styles.macroLabel, { color: colors.textSecondary }]}>Calorias</Text>
            <TextInput
              ref={caloriesRef}
              style={[styles.macroInput, { backgroundColor: colors.surface, color: colors.text, borderColor: colors.border }]}
              value={calories}
              onChangeText={setCalories}
              keyboardType="decimal-pad"
              placeholder="0"
              placeholderTextColor={colors.textSecondary}
              maxLength={8}
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={() => proteinRef.current?.focus()}
            />
          </View>
          <View style={styles.macroField}>
            <Text style={[styles.macroLabel, { color: colors.textSecondary }]}>Proteina (g)</Text>
            <TextInput
              ref={proteinRef}
              style={[styles.macroInput, { backgroundColor: colors.surface, color: colors.text, borderColor: colors.border }]}
              value={protein}
              onChangeText={setProtein}
              keyboardType="decimal-pad"
              placeholder="0"
              placeholderTextColor={colors.textSecondary}
              maxLength={8}
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={() => fatsRef.current?.focus()}
            />
          </View>
          <View style={styles.macroField}>
            <Text style={[styles.macroLabel, { color: colors.textSecondary }]}>Grasas (g)</Text>
            <TextInput
              ref={fatsRef}
              style={[styles.macroInput, { backgroundColor: colors.surface, color: colors.text, borderColor: colors.border }]}
              value={fats}
              onChangeText={setFats}
              keyboardType="decimal-pad"
              placeholder="0"
              placeholderTextColor={colors.textSecondary}
              maxLength={8}
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={() => carbsRef.current?.focus()}
            />
          </View>
          <View style={styles.macroField}>
            <Text style={[styles.macroLabel, { color: colors.textSecondary }]}>Carbos (g)</Text>
            <TextInput
              ref={carbsRef}
              style={[styles.macroInput, { backgroundColor: colors.surface, color: colors.text, borderColor: colors.border }]}
              value={carbs}
              onChangeText={setCarbs}
              keyboardType="decimal-pad"
              placeholder="0"
              placeholderTextColor={colors.textSecondary}
              maxLength={8}
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={() => notesRef.current?.focus()}
            />
          </View>
        </View>

        <Text style={[styles.label, { color: colors.text }]}>Notas</Text>
        <TextInput
          ref={notesRef}
          style={[styles.input, styles.textArea, { backgroundColor: colors.surface, color: colors.text, borderColor: colors.border }]}
          value={notes}
          onChangeText={setNotes}
          placeholder="Notas opcionales..."
          placeholderTextColor={colors.textSecondary}
          multiline
          numberOfLines={3}
          autoCapitalize="sentences"
          maxLength={500}
          {...(Platform.OS === 'ios' && { inputAccessoryViewID: 'editMealNotesAccessory' })}
        />

        <TouchableOpacity
          style={[styles.saveBtn, { backgroundColor: colors.primary }]}
          onPress={handleSave}
        >
          <Ionicons name="checkmark" size={20} color={colors.primaryText} />
          <Text style={[styles.saveBtnText, { color: colors.primaryText }]}>Guardar Cambios</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.deleteBtn, { borderColor: colors.danger }]}
          onPress={handleDelete}
        >
          <Ionicons name="trash-outline" size={20} color={colors.danger} />
          <Text style={[styles.deleteBtnText, { color: colors.danger }]}>Eliminar Comida</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </View>
    </KeyboardAwareScrollView>

    {Platform.OS === 'ios' && (
      <InputAccessoryView nativeID="editMealNotesAccessory">
        <View style={[styles.accessoryBar, { backgroundColor: colors.surface, borderTopColor: colors.border }]}>
          <TouchableOpacity onPress={() => Keyboard.dismiss()}>
            <Text style={[styles.accessoryBtn, { color: colors.textSecondary }]}>Listo</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSave}>
            <Text style={[styles.accessoryBtn, { color: colors.primary }]}>Guardar</Text>
          </TouchableOpacity>
        </View>
      </InputAccessoryView>
    )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    padding: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  emojiBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  emojiBtnText: {
    fontSize: 24,
  },
  emojiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderWidth: 1,
    borderRadius: 14,
    padding: 8,
    marginTop: 4,
    gap: 2,
  },
  emojiItem: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  emojiItemText: {
    fontSize: 20,
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
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  macroGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  macroField: {
    width: '47%',
  },
  macroLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  macroInput: {
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
  },
  saveBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginTop: 20,
    padding: 14,
    borderRadius: 16,
  },
  saveBtnText: {
    fontSize: 16,
    fontWeight: '600',
  },
  deleteBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginTop: 12,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
  },
  deleteBtnText: {
    fontSize: 16,
    fontWeight: '600',
  },
  accessoryBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  accessoryBtn: {
    fontSize: 16,
    fontWeight: '600',
  },
});
