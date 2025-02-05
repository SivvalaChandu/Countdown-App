import { useTheme } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const style = () => {
  const theme = useTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: theme.shapes.corner.large,
      backgroundColor: theme.colors.background,
    },
    emoji: {
      fontSize: 34,
      textAlign: "right",
    },
    todayContainer: {
      ...theme.elevation.level1,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginVertical: theme.shapes.corner.medium,
      paddingHorizontal: 36,
      paddingBottom: 10,
      backgroundColor: theme.colors.surface,
      borderRadius: theme.shapes.corner.extraLarge,
    },
    dateAndMonth: {
      flexDirection: "row",
      alignItems: "center",
    },
    dateContainer: {
      flexDirection: "column",
    },
    timeContainer: {
      ...theme.typography.headlineMedium,
      color: theme.colors.onSurface,
    },
    remainingDaysContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: theme.shapes.corner.extraSmall,
    },
    daysInMonthContainer: {
      ...theme.elevation.level1,
      flex: 1,
      flexDirection: "row",
      height: 96,
      alignItems: "center",
      justifyContent: "center",
      padding: theme.shapes.corner.medium,
      backgroundColor: theme.colors.primaryContainer,
      borderRadius: theme.shapes.corner.large,
      marginRight: theme.shapes.corner.medium,
    },

    daysInYearContainer: {
      ...theme.elevation.level2,
      width: 100,
      height: 100,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.surfaceVariant,
      borderRadius: theme.shapes.corner.full,
    },
    day: {
      ...theme.typography.titleMedium,
      fontSize: 18,
      color: theme.colors.primary,
    },
    date: {
      ...theme.typography.displaySmall,
      color: theme.colors.onSurface,
      marginRight: theme.shapes.corner.small,
    },
    month: {
      ...theme.typography.labelLarge,
      color: theme.colors.onSurfaceVariant,
    },
    year: {
      ...theme.typography.labelSmall,
      fontSize: 12,
      color: theme.colors.outlineVariant,
    },
    eventsHeader: {
      ...theme.typography.titleMedium,
      color: theme.colors.onSurfaceVariant,
      marginLeft: theme.shapes.corner.medium,
    },
    daysLeftNumber: {
      ...theme.typography.displaySmall,
      fontWeight: "bold",
      marginRight: theme.shapes.corner.small,
    },
    daysLeft: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 5,
    },
    daysLeftLabel: {
      ...theme.typography.labelSmall,
      fontSize: 18,
      fontWeight: "600",
      color: theme.colors.onPrimaryContainer,
    },
    daysLeftSubLabel: {
      ...theme.typography.labelMedium,
      color: theme.colors.outline,
      letterSpacing: 1,
    },
    AddIcon: {
      position: "absolute",
      bottom: 50,
      right: theme.shapes.corner.large,
      zIndex: 1000,
    },
  });
};
