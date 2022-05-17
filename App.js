import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView } from 'react-native';
import Task from './components/Task';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';

export default function App() {
  const [task, setTask] = useState('');
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = async () => {
    if (task === '') { return }
    Keyboard.dismiss();

    setTaskItems([...taskItems, task])
    await AsyncStorage.setItem('@tarefas', JSON.stringify([...taskItems, task]))
    setTask('');
  }

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    await SplashScreen.preventAutoHideAsync()

    await new Promise(resolve => setTimeout(resolve, 1500))
    const listaTarefas = await AsyncStorage.getItem('@tarefas')
    if (listaTarefas !== null) {
      setTaskItems(JSON.parse(listaTarefas))
    }

    await SplashScreen.hideAsync()
  }

  const completeTask = async (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy)
    await AsyncStorage.setItem('@tarefas', JSON.stringify(itemsCopy))
  }

  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Tarefas de Hoje</Text>
        <ScrollView style={styles.items}>
          {/* This is where the tasks will go! */}
          {
            taskItems.map((item, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                  <Task text={item} />
                </TouchableOpacity>
              )
            })
          }
        </ScrollView>
      </View>

      {/* Write a task */}
      {/* Uses a keyboard avoiding view which ensures the keyboard does not cover the items on screen */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput style={styles.input} placeholder={'Escreva uma tarefa'} value={task} onChangeText={text => setTask(text)} />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebbda4',
    height: '100%',
    width: '100%'
  },

  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,

  },

  sectionTitle: {
    color: '#222222',
    fontSize: 24,
    fontWeight: 'bold'
  },

  items: {
    marginTop: 30,
    height: '75%'
  },

  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },

  input: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: 250,
    backgroundColor: '#ffe7d9',
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#BD896D',
  },

  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#ffe7d9',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#BD896D',
  }
});