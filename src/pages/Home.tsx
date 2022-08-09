import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }
    setTasks(oldStates => [...oldStates, newTask])
  }

  function handleToggleTaskDone(id: number) {
    const oldState = tasks.map(task => ({ ...task }));
    const itemEnter = oldState.find(item => item.id === id);
    if (!itemEnter) {
      return;
    } else {
      itemEnter.done = !itemEnter.done;
      setTasks(oldState);
    }
  }

  function handleRemoveTask(id: number) {
    setTasks(oldState => oldState.filter(
      tasks => tasks.id !== id
    ))
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
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