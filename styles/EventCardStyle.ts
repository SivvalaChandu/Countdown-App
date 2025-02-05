import { StyleSheet } from "react-native";
import { useTheme } from "@/constants/theme";

export const EventCardStyle = (theme: any) =>
  StyleSheet.create({
    swipeableContainer: {
      marginVertical: 5,
    },
    pressableContainer: {
      backgroundColor: theme.colors.surface,
    },
    cardContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: theme.colors.onSecondaryContainer,
      borderRadius: theme.shapes.corner.large,
      padding: theme.shapes.corner.large,
      marginHorizontal: theme.shapes.corner.small,
    },
    contentContainer: {
      flex: 1,
      marginRight: theme.shapes.corner.medium,
    },
    title: {
      ...theme.typography.titleMedium,
      color: theme.colors.onSurface,
      marginBottom: theme.shapes.corner.small,
    },
    date: {
      ...theme.typography.labelMedium,
      color: theme.colors.onSurfaceVariant,
    },
    daysContainer: {
      width: 48,
      height: 48,
      borderRadius: theme.shapes.corner.full,
      backgroundColor: theme.colors.primaryContainer,
      justifyContent: "center",
      alignItems: "center",
    },
    daysText: {
      ...theme.typography.titleLarge,
      color: theme.colors.onPrimaryContainer,
    },

    deleteText: {
      ...theme.typography.labelLarge,
      color: theme.colors.onError,
      backgroundColor: "#EF5350",
      textAlignVertical: "center",
      textAlign: "center",
      width: 130,
      height: "99%",
      borderRadius: theme.shapes.corner.large,
    },
  });
