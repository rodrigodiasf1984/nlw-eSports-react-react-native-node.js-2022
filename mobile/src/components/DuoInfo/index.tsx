import React from "react";
import { ColorValue, View, Text } from "react-native";
import { THEME } from "../../theme";

import { styles } from "./styles";

type DuoInfoProps = {
  label: string;
  value: string;
  colorValue?: ColorValue;
};

export function DuoInfo({
  colorValue = THEME.COLORS.TEXT,
  label,
  value,
}: DuoInfoProps) {
  return (
    <View style={styles.container}>
      <Text numberOfLines={1} style={styles.label}>
        {label}
      </Text>
      <Text style={[styles.value, { color: colorValue }]}>{value}</Text>
    </View>
  );
}
