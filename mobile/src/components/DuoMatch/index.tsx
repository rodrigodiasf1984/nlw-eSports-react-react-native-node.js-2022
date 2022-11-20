import React, { useState } from "react";
import {
  Text,
  View,
  Modal,
  ModalProps,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { CheckCircle } from "phosphor-react-native";
import { styles } from "./styles";
import { THEME } from "../../theme";
import { Heading } from "../Heading";
import * as Clipboard from "expo-clipboard";

interface DuoMatchProps extends ModalProps {
  discord: string;
  onClose: () => void;
}

export const DuoMatch = ({ discord, onClose, ...rest }: DuoMatchProps) => {
  const [isCoppingDiscord, setIsCoppingDiscord] = useState(false);

  async function handleCopyDiscordToClipboard() {
    setIsCoppingDiscord(true);
    await Clipboard.setStringAsync(discord);
    Alert.alert(
      "Discord Cópiado",
      "Usuário copiado, cole no Discord para adicionar um amigo!"
    );
    setIsCoppingDiscord(false);
  }

  return (
    <Modal transparent {...rest} statusBarTranslucent animationType="fade">
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
            <MaterialIcons
              name="close"
              size={20}
              color={THEME.COLORS.CAPTION_500}
            />
          </TouchableOpacity>
          <CheckCircle size={64} color={THEME.COLORS.SUCCESS} weight="bold" />
          <Heading
            style={{ alignItems: "center", marginTop: 24 }}
            title="Let's play!"
            subtitle="Agora é só começar a jogar!"
          />
          <Text style={styles.label}>Adicione seu Discord</Text>
          <TouchableOpacity
            style={styles.discordButton}
            disabled={isCoppingDiscord}
            onPress={handleCopyDiscordToClipboard}
          >
            <Text style={styles.discord}>
              {isCoppingDiscord ? (
                <ActivityIndicator color={THEME.COLORS.PRIMARY} />
              ) : (
                discord
              )}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
