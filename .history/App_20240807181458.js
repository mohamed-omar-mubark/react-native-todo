import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";

export default function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);

  const addTodo = () => {
    if (title && description) {
      setTodos([
        ...todos,
        { id: Date.now(), title, description, status: "active" },
      ]);
      setTitle("");
      setDescription("");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To Do List</Text>
      <TextInput
        style={styles.input}
        placeholder="Todo Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Todo Description"
        value={description}
        onChangeText={setDescription}
      />
      <Button title="Add Todo" onPress={addTodo} color="#6200EE" />
      <View style={styles.divider} />
      <View style={styles.filterContainer}>
        {["All", "active", "done"].map((status) => (
          <TouchableOpacity key={status} onPress={() => setFilter(status)}>
            <Text
              style={[
                styles.filterButton,
                filter === status && styles.selectedFilter,
              ]}>
              {status.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    padding: 20,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 29,
    fontWeight: "bold",
    textAlign: "center",
    color: "#6200EE",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#6200EE",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    width: "100%",
  },
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 20,
    width: "100%",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 20,
  },
  filterButton: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#6200EE",
    textAlign: "center",
    color: "#6200EE",
  },
  selectedFilter: {
    backgroundColor: "#6200EE",
    color: "#ffffff",
  },
});
