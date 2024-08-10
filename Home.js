import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("All");
  const navigation = useNavigation();

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

  const handleTodoPress = (todo) => {
    navigation.navigate("Details", { todo });
  };

  const markAsDone = (id) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, status: "done" } : todo))
    );
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
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
      <ScrollView style={styles.todosContainer}>
        {todos
          .filter((todo) => filter === "All" || todo.status === filter)
          .map((todo) => (
            <View key={todo.id} style={styles.todoItem}>
              <TouchableOpacity onPress={() => handleTodoPress(todo)}>
                <Text style={todo.status === "done" ? styles.done : null}>
                  {todo.title}
                </Text>
              </TouchableOpacity>
              <View style={styles.icons}>
                <TouchableOpacity onPress={() => markAsDone(todo.id)}>
                  <Ionicons
                    name="checkmark-circle-outline"
                    size={24}
                    color="green"
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => removeTodo(todo.id)}>
                  <Ionicons name="trash-outline" size={24} color="red" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
      </ScrollView>
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
    justifyContent: "flex-start",
    alignItems: "center",
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
  todosContainer: {
    flex: 1,
    width: "100%",
    marginBottom: 10,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#E0E0E0",
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
  todoItem: {
    padding: 15,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  done: {
    textDecorationLine: "line-through",
    color: "#d3d3d3",
  },
  icons: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
