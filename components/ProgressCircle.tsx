import { useTheme } from "@/constants/theme";
import { View, Text } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { ProgressCircleStyle } from "../styles/ProgressCircleStyle";
import { progressBar } from "@/util/types";
import { useMemo } from "react";

const ProgressCircle: React.FC<progressBar> = ({ daysLeftYear, progress }) => {
  const theme = useTheme();
  const styles = useMemo(() => ProgressCircleStyle(theme), [theme]);
  const size = 110;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference * (1 - progress / 100);

  return (
    <View style={styles.progressContainer}>
      <Svg width={size} height={size}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={theme.colors.surfaceVariant}
          strokeWidth={strokeWidth}
          fill="transparent"
        />

        {/* Progress track */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={theme.colors.primary}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={progressOffset}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>

      {/* Center text */}
      <View style={styles.textContainer}>
        <Text style={styles.progressText}>{daysLeftYear}</Text>
        <Text style={styles.labelText}>days left</Text>
      </View>
    </View>
  );
};

export default ProgressCircle;
