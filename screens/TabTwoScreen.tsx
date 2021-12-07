import React, { useState } from 'react';
import { StyleSheet, Button, TouchableOpacity, TextInput, ScrollView, Alert, Modal, Pressable } from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import axios from 'axios';
import {WORKOS_API_KEY, WORKOS_CLIENT_ID, WORKOS_CONNECTION_ID} from '@env'
import { Table, Row, Rows } from 'react-native-table-component';
import ProfileScreen from './ProfileScreen';

export default function TabTwoScreen() {
  const [directories, setDirectories] = useState<Array<object> | null>();
  const [users, setUsers] = useState<Array<object> | null>();
  const [user, setUser] = useState<object | null>();
  const [profile, setProfile] = useState<String[][] | null>(
    [
      ['First Name', ''],
      ['Last Name', ''],
      ['Email', ''],
      ['ID', ''],
      ['Groups', ''],
      ['Directory', ''],
      ['Custom Attributes', '']
    ]
  );
  const [modalVisible, setModalVisible] = useState(false);

  let tableHead: String[] = ['Profile Key', 'Profile Value'];
  // let tableData: String[][] 
  // if (user) {    
  //   tableData = [
  //     ['First Name', user.first_name],
  //     ['Last Name', user.last_name],
  //     ['Email', user.emails[0].value],
  //     ['ID', user.id],
  //     ['Groups', JSON.stringify(user.groups)],
  //     ['Directory', user.directory_id],
  //     ['Custom Attributes', JSON.stringify(user.custom_attributes)]
  //   ]
  // } 


  const reset = () => {
    console.log('reset function')
    if (users) {
      console.log('users exists')
      getDirectories()
      setUser(null)
      setUsers(null)
      setProfile(null)
    } else {
      setDirectories(null)
    }
  }

  async function getDirectories(): Promise<any> {
    const apiKey = process.env.WORKOS_API_KEY
  
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

  async function getUser(id: String): Promise<any> {
    const apiKey = process.env.WORKOS_API_KEY
  
    axios.get(`https://api.workos.com/directory_users/${id}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`
      }
    })
    .then( response => {
      console.log(response.data)
      setUser(response.data)
      setProfile([
        ['First Name', response.data.first_name],
        ['Last Name', response.data.last_name],
        ['Email', response.data.emails[0].value],
        ['ID', response.data.id],
        ['Groups', JSON.stringify(response.data.groups)],
        ['Directory', response.data.directory_id],
        ['Custom Attributes', JSON.stringify(response.data.custom_attributes)]
      ])   
      setModalVisible(true)
    })
  }

  return (
    <View style={styles.container}>

    { !user && directories || users?     
      <View>
        <View style={[styles.flexRow, styles.marginTop]}>
          <View>
            <Text style={[styles.title]}>Directory</Text>
            <Text style={[styles.title]}>Sync</Text> 
          </View>  
          
          <View>
            <TouchableOpacity 
                onPress={reset}
                style={styles.button}>
                <Text style={styles.buttonText}>Back</Text>
              </TouchableOpacity> 
          </View>   
        </View>
        <View style={{flex: 2}}>

        <View style={styles.marginTop}>          
        { directories ? 
        <View>
          <View style={{flexDirection: 'row', alignItems: 'center', marginBottom:15}}>
            <View style={{flex: 1, height: 1, backgroundColor: '#6363F1'}} />
              <View>
                <Text style={{fontSize: 18, fontWeight: 'bold', width: 120, textAlign: 'center', color: 'gray'}}>Directories</Text>
              </View>
            <View style={{flex: 1, height: 1, backgroundColor: '#6363F1'}} />
          </View>
          {directories.map((directory, index) => (                    
            <View key={index}>
              <Button title={directory.name} key={index} onPress={() => {getUsers(directory.id); setDirectories(null)}}>{directory.name}</Button>
            </View>          
          ))}
        </View> 
        : null }
      </View>

      { users ? 
        <ScrollView>
          <View style={{flexDirection: 'row', alignItems: 'center', marginBottom:15}}>
            <View style={{flex: 1, height: 1, backgroundColor: '#6363F1'}} />
            <View>
              <Text style={{fontSize: 18, fontWeight: 'bold', width: 80, textAlign: 'center', color: 'gray'}}>Users</Text>
            </View>
            <View style={{flex: 1, height: 1, backgroundColor: '#6363F1'}} />
          </View>
        {users.map((user, index) => (
        <View key={index}>
          <Button title={user.username} onPress={() => getUser(user.id)}>{user.username}</Button>
        </View>
      ))}
      </ScrollView> : null}
        </View> 
      </View>
    :
      <View>
        <View style={[styles.flexRow, styles.marginTop]}>
          <View>
            <Text style={[styles.title]}>Directory</Text>
            <Text style={[styles.title]}>Sync</Text> 
          </View>  
          
          <View>
            <TouchableOpacity
              onPress={getDirectories}
              style={styles.button}>
              <Text style={styles.buttonText}>Show Directories</Text>
            </TouchableOpacity>              
          </View>   
              
        </View>
        <View style={{flex: 2}}></View> 
            
      </View>
    }

      
      <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <ScrollView>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>User Profile</Text>
                
                <View style={[styles.tableContainer]}>
                <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                  <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
                  <Rows data={profile} textStyle={styles.text}/>
                </Table>
              </View>
                
                <Pressable
                  style={[styles.modalButton, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Back</Text>
                </Pressable>
              </View>
            </View>
            </ScrollView>
          </Modal>
        </View>

      <EditScreenInfo path="/screens/TabTwoScreen.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',

    alignItems: 'center',
    justifyContent: 'center',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: 100,
    width: 400,
  },
  leftRow: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 37,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  marginLeft: {
    marginLeft: 33,
  },
  marginTop: {
    marginTop: 50
  },
  shiftUp: {
    position: 'relative',
    bottom: 106
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  button: {
    backgroundColor: "#6363F1",
    color: "white",
    padding: 10,
    borderRadius: 5,
    width: 150
  },
  backButton: {
    backgroundColor: "#6363F1",
    color: "white",
    padding: 20,
    borderRadius: 5,

  },
  buttonText: {
    fontSize: 15,
    color: '#fff',
    textAlign: 'center',
  },

  head: { 
    height: 40, 
    backgroundColor: '#f1f8ff'
  },
  text: { 
    margin: 6
  },
  tableContainer: { 
    flex: 2,
    padding: 16,
    position: 'relative',
    bottom: 15, 
    width:  370
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalButton: {
    borderRadius: 10,
    padding: 15,
    elevation: 2,
    width: 200
  },
  buttonOpen: {
    backgroundColor: "#6363F1",
  },
  buttonClose: {
    backgroundColor: "#6363F1",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 35,
    textAlign: "center",
    fontWeight: 'bold',
    fontSize:24,
    color: 'grey'
  }
});
