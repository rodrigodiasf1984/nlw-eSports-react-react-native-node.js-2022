import {
  ImageBackground,
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
} from "react-native";

import { styles } from "./styles";
import { THEME } from "../../theme";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

export type GameCardProps = {
  id: string;
  title: string;
  _count: {
    ads: number;
  };
  bannerUrl: string;
};

interface Props extends TouchableOpacityProps {
  data: GameCardProps;
}

export function GameCard({ data, ...rest }: Props) {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <ImageBackground
        style={styles.bannerUrl}
        source={{ uri: data.bannerUrl }}
      >
        <LinearGradient colors={THEME.COLORS.FOOTER} style={styles.footer}>
          <Text style={styles.title}>{data.title}</Text>
          <Text style={styles.ads}>{data._count.ads} anúncios</Text>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
}
