import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import EventCard from "./EventCard";
import { EventCardsProps } from "@/util/types";

const EventCards: React.FC<EventCardsProps> = ({
  events,
  deleteEvent,
  currentTime,
}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={events}
        renderItem={({ item }) => (
          <EventCard {...item} delete={deleteEvent} currentTime={currentTime} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 25 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default EventCards;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
  },
});
