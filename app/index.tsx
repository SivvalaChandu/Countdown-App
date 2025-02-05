import { useState, useEffect } from "react";
import { View, Text, StatusBar, Platform, Alert, Linking } from "react-native";
import { getTimeDetails } from "../util/getTimeDetails";
import EventCards from "../components/EventCards";
import NewEventAdd from "@/components/NewEventAdd";
import LaunchAnimation from "../components/LaunchAnimation";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ProgressCircle from "@/components/ProgressCircle";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";
import { style } from "./styles";
import { scheduleNotifications } from "@/util/scheduleNotifications";
import { Event } from "@/util/types";
import { useColorScheme } from "../hooks/useColorScheme";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaView } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

const App = () => {
  const styles = style();
  const theme = useColorScheme() ?? "light";
  const [animationComplete, setAnimationComplete] = useState(false);
  const [time, setTime] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("@expo-google-fonts/roboto/Roboto_400Regular.ttf"),
    "Roboto-Medium": require("@expo-google-fonts/roboto/Roboto_500Medium.ttf"),
    "Roboto-Bold": require("@expo-google-fonts/roboto/Roboto_700Bold.ttf"),
  });

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    const loadEventsAndSchedule = async () => {
      const storedEvents = await AsyncStorage.getItem("events");
      if (storedEvents) {
        const now = new Date();
        now.setUTCHours(0, 0, 0, 0);
        let parsedEvents: Event[] = JSON.parse(storedEvents)
          .map((event: Event) => ({
            ...event,
            date: new Date(event.date),
          }))
          .filter((event: Event) => event.date >= now)
          .sort((a: Event, b: Event) => a.date.getTime() - b.date.getTime());

        await AsyncStorage.setItem("events", JSON.stringify(parsedEvents));
        setEvents(parsedEvents);

        await Notifications.cancelAllScheduledNotificationsAsync();

        parsedEvents.forEach((event) => scheduleNotifications(event));
      }
    };
    loadEventsAndSchedule();
  }, []);

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        if (Platform.OS === "android") {
          Alert.alert(
            "Notification Permission",
            "Please enable notifications to get event reminders. Click 'OK' go to Notification Settings",
            [
              {
                text: "OK",
                onPress: () => {
                  Linking.openSettings();
                },
              },
            ]
          );
        }
      }
    };
    requestPermissions();
  }, []);

  const hoursLeft = 23 - time.getHours();
  const minutesLeft = 60 - time.getMinutes();

  const { currentYear, daysLeftInYear, yearProgress, daysLeftInMonth } =
    getTimeDetails(time);

  const addNewEvent = (newEvent: Event) => {
    setEvents((prevEvents) => {
      const updatedEvents = [...prevEvents, newEvent];
      return updatedEvents.sort((a, b) => a.date.getTime() - b.date.getTime());
    });
  };

  const deleteEvent = async (id: string) => {
    const updatedEvents = events.filter((event) => event.id !== id);
    setEvents(updatedEvents);

    await AsyncStorage.setItem("events", JSON.stringify(updatedEvents));

    const notificationIds = ["5days", "3days", "1days", "0days"].map(
      (suffix) => `${id}_${suffix}`
    );

    await Promise.all(
      notificationIds.map((notificationId) =>
        Notifications.cancelScheduledNotificationAsync(notificationId)
      )
    );
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar
        backgroundColor={theme === "dark" ? "#1C1B1F" : "#FEF7FF"}
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
      />
      <SafeAreaView style={styles.container}>
        <Text style={styles.emoji}>😉</Text>
        <LaunchAnimation onComplete={() => setAnimationComplete(true)}>
          <View style={styles.todayContainer}>
            <View style={styles.dateContainer}>
              <Text style={styles.day}>
                {time.toLocaleDateString("en-US", { weekday: "long" })}
              </Text>
              <View style={styles.dateAndMonth}>
                <Text style={styles.date}>{time.getDate()}</Text>
                <View>
                  <Text style={styles.month}>
                    {time.toLocaleString("default", { month: "short" })}
                  </Text>
                  <Text style={styles.year}>{currentYear}</Text>
                </View>
              </View>
            </View>
            <Text style={styles.timeContainer}>
              {hoursLeft}hr {minutesLeft}min
            </Text>
          </View>

          <View style={styles.remainingDaysContainer}>
            <View style={styles.daysInMonthContainer}>
              <Text style={styles.daysLeftNumber}>{daysLeftInMonth}</Text>
              <View style={styles.daysLeft}>
                <Text style={styles.daysLeftLabel}>days</Text>
                <Text style={styles.daysLeftSubLabel}>left</Text>
              </View>
            </View>
            <View style={styles.daysInYearContainer}>
              <ProgressCircle
                daysLeftYear={daysLeftInYear}
                progress={yearProgress}
              />
            </View>
          </View>

          <Text style={styles.eventsHeader}>Events</Text>

          <EventCards
            events={events}
            deleteEvent={deleteEvent}
            currentTime={time}
          />

          <View style={styles.AddIcon}>
            <NewEventAdd addEvent={addNewEvent} />
          </View>
        </LaunchAnimation>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default App;
