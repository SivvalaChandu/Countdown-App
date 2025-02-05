import { StyleSheet } from "react-native";
import { useTheme } from "@/constants/theme";

export const NewEventAddStyle = (theme: any) =>
  StyleSheet.create({
    container: {
      ...theme.elevation.level2,
      height: 56,
      width: 56,
      borderRadius: 28,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.primary,
    },
    add: {
      fontSize: 32,
      fontWeight: "400",
      color: theme.colors.onPrimary,
      marginTop: -2,
    },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
      backgroundColor: theme.colors.surface,
      padding: 24,
      borderRadius: theme.shapes.corner.extraLarge,
      width: "90%",
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 20,
      textAlign: "center",
      color: theme.colors.onSurfaceVariant,
    },
    input: {
      height: 48,
      color: theme.colors.onSurfaceVariant,
      backgroundColor: theme.colors.surfaceVariant,
      borderRadius: theme.shapes.corner.medium,
      paddingHorizontal: 16,
      marginBottom: 16,
    },
    dateButton: {
      backgroundColor: theme.colors.surfaceVariant,
      borderRadius: theme.shapes.corner.medium,
      paddingHorizontal: 16,
      height: 43,
      justifyContent: "center",
      marginBottom: 15,
    },
    dateText: {
      color: theme.colors.onSurfaceVariant,
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 10,
    },
    button: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 20,
      minWidth: 100,
      alignItems: "center",
    },
    saveButton: {
      backgroundColor: theme.colors.primary,
      borderRadius: theme.shapes.corner.medium,
    },
    cancelButton: {
      backgroundColor: theme.colors.surfaceVariant,
      borderRadius: theme.shapes.corner.medium,
    },
    buttonText: {
      color: theme.colors.onCancel,
      fontWeight: "500",
    },
    buttonSaveText: {
      color: theme.colors.onPrimary,
      fontWeight: "500",
    },
  });
