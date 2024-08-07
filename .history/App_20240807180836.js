import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";

export default function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("All");

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

  const changeStatus = (id, status) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, status } : todo))
    );
  };

  const getFilteredTodos = () => {
    if (filter === "All") return todos;
    return todos.filter((todo) => todo.status === filter.toLowerCase());
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
      <FlatList
        data={getFilteredTodos()}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <Text style={styles.todoTitle}>{item.title}</Text>
            <Text style={styles.todoDescription}>{item.description}</Text>
            {item.status === "active" ? (
              <Button
                title="Mark as Done"
                onPress={() => changeStatus(item.id, "done")}
                color="#03DAC5"
              />
            ) : (
              <Button
                title="Mark as Active"
                onPress={() => changeStatus(item.id, "active")}
                color="#BB86FC"
              />
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    marginTop: 20,
    padding: 20,
    gap: 8,
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
  },
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 20,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
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
});
