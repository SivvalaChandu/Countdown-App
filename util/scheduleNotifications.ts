import * as Notifications from "expo-notifications";
import { Event } from "./types";

const Notification_Hour = 6;
const Notification_Minute = 0;

export const scheduleNotifications = async (event: Event) => {
  const eventDate = new Date(event.date);
  const notificationIntervals = [5, 3, 1, 0];

  for (const daysBefore of notificationIntervals) {
    const triggerDate = new Date(eventDate);
    triggerDate.setDate(eventDate.getDate() - daysBefore);
    triggerDate.setHours(Notification_Hour, Notification_Minute, 0, 0);

    if (triggerDate.getTime() <= Date.now()) continue;

    let message = "";
    switch (daysBefore) {
      case 5:
        message = `${event.title} is in 5 days`;
        break;
      case 3:
        message = `${event.title} is in 3 days`;
        break;
      case 1:
        message = `${event.title} is tomorrow`;
        break;
      case 0:
        message = `${event.title} is today!`;
        break;
    }

    const notificationId = `${event.id}_${daysBefore}days`;

    await Notifications.scheduleNotificationAsync({
      identifier: notificationId,
      content: {
        title: message,
        priority: Notifications.AndroidNotificationPriority.HIGH,
        autoDismiss: true,
        vibrate: [250, 250, 250],
      },
      trigger: {
        type: "date",
        date: triggerDate,
      } as Notifications.DateTriggerInput,
    });
  }
};
