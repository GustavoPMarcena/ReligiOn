import React from "react";
import { Modal, View, Text, TouchableOpacity} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";

interface ConfirmNotificationProps {
  visible: boolean;
  title: string;

  iconName?: keyof typeof Ionicons.glyphMap;
  iconColor?: string;

  showCancel?: boolean;

  cancelText?: string;
  confirmText?: string;

  onCancel?: () => void;
  onConfirm: () => void;
}

const ConfirmNotification: React.FC<ConfirmNotificationProps> = ({
  visible,
  title,

  iconName = "notifications-outline",
  iconColor = "#1D559F",

  showCancel = true,

  cancelText = "Cancelar",
  confirmText = "Confirmar",

  onCancel,
  onConfirm,
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Ionicons
            name={iconName}
            size={42}
            color={iconColor}
            style={styles.icon}
          />

          <Text style={styles.title}>{title}</Text>

          <View style={styles.buttonsRow}>
            {showCancel && (
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={onCancel}
              >
                <Text style={styles.cancelText}>{cancelText}</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={styles.confirmButton}
              onPress={onConfirm}
            >
              <Text style={styles.confirmText}>{confirmText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmNotification;