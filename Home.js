import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
  Modal,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("All");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);
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

  const confirmDelete = (todo) => {
    setTodoToDelete(todo);
    setIsModalVisible(true);
  };

  const removeTodo = () => {
    setTodos(todos.filter((todo) => todo.id !== todoToDelete.id));
    setIsModalVisible(false);
    setTodoToDelete(null);
  };

  const markAsDone = (id) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, status: "done" } : todo))
    );
  };

  return (
    <ImageBackground
      source={{
        uri: "https://images.pexels.com/photos/1723637/pexels-photo-1723637.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      }}
      style={styles.backgroundImage}>
      <View style={styles.overlay}>
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
                  <TouchableOpacity onPress={() => confirmDelete(todo)}>
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

        {/* Modal for delete confirmation */}
        <Modal
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Are you sure you want to delete this todo?
              </Text>
              <View style={styles.modalButtons}>
                <Button
                  title="Cancel"
                  onPress={() => setIsModalVisible(false)}
                  color="grey"
                />
                <Button title="Delete" onPress={removeTodo} color="red" />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 20,
    justifyContent: "flex-start",
    alignItems: "center",
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
    backgroundColor: "#fff",
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
  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});
