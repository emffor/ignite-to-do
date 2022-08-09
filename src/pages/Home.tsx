import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export type EditTaskArgs = {
  taskId: number;
  newTitle: string;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskFound = tasks.some(task => task.title === newTaskTitle);

    if (!taskFound) {
      const newTask = {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false,
      }

      setTasks(prev => [...prev, newTask]);
    }
    else {
      Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome",
        [{ text: "OK" }]
      );
    }
  }

  function handleToggleTaskDone(id: number) {
    setTasks(prev => prev.map(task => (
      {
        id: task.id,
        title: task.title,
        done: task.id === id ? !task.done : task.done
      })
    ));
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: () => setTasks(prev => prev.filter(task => task.id !== id)) }
      ]
    );
  }

  function handleEditTask({ taskId, newTitle }: EditTaskArgs) {
    setTasks(prev => prev.map(task => (
      {
        id: task.id,
        title: task.id === taskId ? newTitle : task.title,
        done: task.done
      })
    ));
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        editTask={() => handleEditTask}
        removeTask={handleRemoveTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})