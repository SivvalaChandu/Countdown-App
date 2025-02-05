import { useMemo } from "react";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "../hooks/useColorScheme";

export const useTheme = () => {
  const colorScheme = useColorScheme();

  return useMemo(() => {
    const isDark = colorScheme === "dark";

    return {
      colors: {
        ...(isDark ? Colors.dark : Colors.light),
        surfaceTint: isDark ? Colors.dark.primary : Colors.light.primary,
      },
      shapes: {
        corner: {
          extraSmall: 4,
          small: 8,
          medium: 12,
          large: 16,
          extraLarge: 28,
          full: 1000,
        },
      },
      typography: {
        displaySmall: {
          fontSize: 36,
          lineHeight: 44,
          fontFamily: "Roboto-Regular",
        },
        headlineMedium: {
          fontSize: 28,
          lineHeight: 36,
          fontFamily: "Roboto-Medium",
        },
        titleLarge: {
          fontSize: 22,
          lineHeight: 28,
          fontFamily: "Roboto-Medium",
        },
        titleMedium: {
          fontSize: 16,
          lineHeight: 24,
          fontFamily: "Roboto-Medium",
          letterSpacing: 0.15,
        },
        labelLarge: {
          fontSize: 16,
          lineHeight: 20,
          fontFamily: "Roboto-Medium",
          letterSpacing: 0.1,
        },
        labelMedium: {
          fontSize: 12,
          lineHeight: 16,
          fontFamily: "Roboto-Medium",
          letterSpacing: 0.5,
        },
        labelSmall: {
          fontSize: 10,
          lineHeight: 16,
          fontFamily: "Roboto-Medium",
          letterSpacing: 0.5,
        },
      },
      elevation: {
        level0: {
          elevation: 0,
          shadowColor: "transparent",
        },
        level1: {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: isDark ? 0.3 : 0.2,
          shadowRadius: 3,
          elevation: 1,
        },
        level2: {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: isDark ? 0.3 : 0.23,
          shadowRadius: 6,
          elevation: 3,
        },
      },
    };
  }, [colorScheme]);
};
