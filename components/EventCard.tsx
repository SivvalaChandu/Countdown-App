import { Text, View, Pressable, Animated } from "react-native";
import React, { useMemo, useRef } from "react";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { EventCardStyle } from "@/styles/EventCardStyle";
import { EventCardProps } from "@/util/types";
import { useTheme } from "@/constants/theme";

const RightAction = (
  progress: SharedValue<number>,
  dragX: SharedValue<number>,
  onDelete: () => void
) => {
  const theme = useTheme();
  const styles = useMemo(() => EventCardStyle(theme), [theme]);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: dragX.value + 130 }],
  }));

  return (
    <Pressable onPress={onDelete}>
      <Reanimated.View style={[animatedStyle]}>
        <Text style={styles.deleteText}>Delete</Text>
      </Reanimated.View>
    </Pressable>
  );
};

const EventCard: React.FC<EventCardProps> = ({
  id,
  title,
  date,
  delete: deleteEvent,
  currentTime,
}) => {
  const theme = useTheme();
  const styles = useMemo(() => EventCardStyle(theme), [theme]);
  const scaleValue = useRef(new Animated.Value(1)).current;
  const validDate = new Date(date);
  const daysLeft = Math.ceil(
    (validDate.getTime() - currentTime.getTime()) / (1000 * 60 * 60 * 24)
  );

  const handleDelete = () => {
    Animated.spring(scaleValue, {
      toValue: 0,
      useNativeDriver: true,
    }).start(() => deleteEvent(id));
  };

  const swipeableRef = React.useRef(null);
  return (
    <ReanimatedSwipeable
      ref={swipeableRef}
      containerStyle={styles.swipeableContainer}
      friction={2}
      enableTrackpadTwoFingerGesture
      rightThreshold={40}
      renderRightActions={(progress, dragX) =>
        RightAction(progress, dragX, () => {
          swipeableRef.current?.close();
          handleDelete();
        })
      }
    >
      <Pressable style={styles.pressableContainer}>
        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
          <View style={styles.cardContainer}>
            <View style={styles.contentContainer}>
              <Text style={styles.title} numberOfLines={2}>
                {title}
              </Text>
              <Text style={styles.date}>
                {validDate.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </Text>
            </View>
            <View style={styles.daysContainer}>
              <Text style={styles.daysText}>{daysLeft}</Text>
            </View>
          </View>
        </Animated.View>
      </Pressable>
    </ReanimatedSwipeable>
  );
};

export default EventCard;
