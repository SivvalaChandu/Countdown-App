import { Alert, Modal, Pressable, Text, TextInput, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useMemo, useState } from "react";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { NewEventAddStyle } from "@/styles/NewEventAddStyle";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { NewEventAddProps } from "@/util/types";
import { useTheme } from "@/constants/theme";

const NewEventAdd: React.FC<NewEventAddProps> = ({ addEvent }) => {
  const theme = useTheme();
  const styles = useMemo(() => NewEventAddStyle(theme), [theme]);
  const [showModal, setShowModal] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleConfirm = (date: Date) => {
    setEventDate(date);
    setShowDatePicker(false);
  };

  const AddEvent = async () => {
    if (!eventTitle.trim()) {
      Alert.alert("Error", "Please enter event title");
      return;
    }

    try {
      const storedEvents = await AsyncStorage.getItem("events");
      const events = storedEvents ? JSON.parse(storedEvents) : [];

      const newEvent = {
        id: uuidv4(),
        title: eventTitle,
        date: eventDate,
      };

      events.push(newEvent);
      await AsyncStorage.setItem("events", JSON.stringify(events));

      addEvent(newEvent);

      setShowModal(false);
      setEventTitle("");
      setEventDate(new Date());
    } catch (error) {}
  };

  return (
    <>
      <Pressable onPress={() => setShowModal(true)} style={styles.container}>
        <Text style={styles.add}>+</Text>
      </Pressable>

      <Modal
        visible={showModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Event</Text>

            <TextInput
              style={styles.input}
              placeholder="Event Title"
              value={eventTitle}
              onChangeText={setEventTitle}
            />

            <Pressable
              style={styles.dateButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.dateText}>
                {eventDate.toLocaleDateString()}
              </Text>
            </Pressable>

            <DateTimePickerModal
              isVisible={showDatePicker}
              mode="date"
              minimumDate={new Date()}
              onConfirm={handleConfirm}
              onCancel={() => setShowDatePicker(false)}
            />

            <View style={styles.buttonContainer}>
              <Pressable
                style={[styles.button, styles.cancelButton]}
                onPress={() => setShowModal(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </Pressable>

              <Pressable
                style={[styles.button, styles.saveButton]}
                onPress={AddEvent}
              >
                <Text style={styles.buttonSaveText}>Save</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default NewEventAdd;
