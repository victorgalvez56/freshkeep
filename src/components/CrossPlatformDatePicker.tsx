import React, { useState } from 'react';
import { Platform, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from './StyledText';
import { useTheme } from '../hooks/useTheme';

interface Props {
  value: string; // YYYY-MM-DD
  onChange: (date: string) => void;
}

function toDateString(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function formatDisplay(dateStr: string): string {
  const [y, m, d] = dateStr.split('-');
  return `${d}/${m}/${y}`;
}

export function CrossPlatformDatePicker({ value, onChange }: Props) {
  const { colors } = useTheme();

  if (Platform.OS === 'ios') {
    const { Host, DateTimePicker } = require('@expo/ui/swift-ui');
    return (
      <Host matchContents>
        <DateTimePicker
          variant="compact"
          displayedComponents="date"
          initialDate={value}
          onDateSelected={(date: string) => {
            const d = new Date(date);
            onChange(toDateString(d));
          }}
        />
      </Host>
    );
  }

  // Android fallback
  const DateTimePickerAndroid = require('@react-native-community/datetimepicker').default;
  const [show, setShow] = useState(false);
  const dateObj = new Date(value + 'T00:00:00');

  return (
    <>
      <TouchableOpacity
        style={[styles.androidBtn, { backgroundColor: colors.surface, borderColor: colors.border }]}
        onPress={() => setShow(true)}
      >
        <Text style={{ color: colors.text, fontSize: 14 }}>{formatDisplay(value)}</Text>
      </TouchableOpacity>
      {show && (
        <DateTimePickerAndroid
          value={dateObj}
          mode="date"
          display="default"
          onChange={(_: unknown, selectedDate?: Date) => {
            setShow(false);
            if (selectedDate) {
              onChange(toDateString(selectedDate));
            }
          }}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  androidBtn: {
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
});
