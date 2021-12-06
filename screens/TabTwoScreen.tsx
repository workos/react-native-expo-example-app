import React, { useState } from 'react';
import { StyleSheet, Button, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import * as AuthSession from 'expo-auth-session';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import axios from 'axios';
import {WORKOS_API_KEY, WORKOS_CLIENT_ID, WORKOS_CONNECTION_ID} from '@env'
import ProfileScreen from './ProfileScreen';

export default function TabTwoScreen() {
  const [directories, setDirectories] = useState<Array<object> | null>();
  const [users, setUsers] = useState<Array<object> | null>();
  const reset = () => {
    setDirectories(null)
  }

  async function getDirectories(): Promise<any> {
    const apiKey = process.env.WORKOS_API_KEY
    console.log(apiKey);
  
    axios.get('https://api.workos.com/directories', {
      headers: {
        Authorization: `Bearer ${apiKey}`
      }
    })
    .then( response => {
      console.log(response.data.data)
      setDirectories(response.data.data)
    })
  }

  async function getUsers(id: String): Promise<any> {
    const apiKey = process.env.WORKOS_API_KEY
    console.log(apiKey);
  
    axios.get(`https://api.workos.com/directory_users?directory=${id}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`
      }
    })
    .then( response => {
      console.log(response.data.data)
      setUsers(response.data.data)
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Directory Sync Powered By WorkOS</Text>
      <View>
      <TouchableOpacity
          onPress={getDirectories}
          style={styles.button}>
        <Text style={styles.buttonText}>Show Directories</Text>
        </TouchableOpacity>
      </View>
      <View>
      { directories ? directories.map((directory, index) => (
        <View key={index}>
          <Button title={directory.name} key={index} onPress={() => getUsers(directory.id)}>{directory.name}</Button>
        </View>
      )) : <Text></Text>}
      </View>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <TouchableOpacity 
        onPress={reset}
        style={styles.backButton}>
          <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity> 
      <EditScreenInfo path="/screens/TabTwoScreen.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  button: {
    backgroundColor: "#6363F1",
    color: "white",
    padding: 20,
    borderRadius: 5,
  },
  backButton: {
    backgroundColor: "#6363F1",
    color: "white",
    padding: 20,
    borderRadius: 5,

  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
  },
});
