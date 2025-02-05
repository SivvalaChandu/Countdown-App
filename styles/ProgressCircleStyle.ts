import { StyleSheet } from "react-native";
import { useTheme } from "@/constants/theme";

export const ProgressCircleStyle = (theme: any) =>
  StyleSheet.create({
    progressContainer: {
      position: "relative",
      width: 110,
      height: 110,
      justifyContent: "center",
      alignItems: "center",
    },
    textContainer: {
      position: "absolute",
      alignItems: "center",
    },
    progressText: {
      ...theme.typography.headlineMedium,
      color: theme.colors.onSurfaceVariant,
      marginBottom: 2,
    },
    labelText: {
      fontSize: 13,
      color: theme.colors.onSurfaceVariant,
    },
  });
