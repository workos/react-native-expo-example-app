import React, { useState } from 'react';
import { StyleSheet, Button, TouchableOpacity, ScrollView, Alert, Modal, Pressable } from 'react-native';
import { Text, View } from '../components/Themed';
import axios from 'axios';
import {WORKOS_API_KEY, WORKOS_CLIENT_ID, WORKOS_CONNECTION_ID} from '@env'
import io from 'socket.io-client';
import { useEffect } from 'react';


export default function TabThreeScreen() {
    const [connected, setConnected] = useState<Boolean>(false);
    const [webhook, setWebhook] = useState<String| null>()
    const SOCKET_URL = 'http://localhost:8080';

    const reset = () => {
      setWebhook(null)
    }

    const socket = io.connect(SOCKET_URL, {
        transports: ['websocket'],
        reconnectionAttempts: 5
      });

    const onConnectSocket = () => {
        if(socket) {
          socket.on('connect', () => {
          console.log("socket is connected")
          setConnected(true)
          });
        }
      }

      useEffect(() => {
        onConnectSocket()
        socket.on('webhook event', function(event){
          console.log(event);
          setWebhook(JSON.stringify(event))
        });
      }, [])

  return (
    <View style={styles.container}>
        <View>
        <View style={[styles.flexRow, styles.marginTop]}>
          <View>
            <Text style={[styles.title]}>Webhooks</Text>
          </View>            
          <View>
            <TouchableOpacity
              style={styles.button}
              onPress={reset}>
              <Text style={styles.buttonText}>Clear Webhooks</Text>
            </TouchableOpacity>              
          </View>   
        </View>
        { webhook ? 
        <View style={{flex: 2}}>            
            <Text style={{textAlign: 'center'}}>{webhook}</Text>
        </View> : null 
        }  
      </View>
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
  title: {
    fontSize: 37,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  secondaryTitle: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom:15,
  },
  secondaryTitleBars: {
    flex: 1, 
    height: 1, 
    backgroundColor: '#6363F1'
  },
  secondaryTitleText: {
    fontSize: 18, 
    fontWeight: 'bold', 
    width: 110, 
    textAlign: 'center', 
    color: 'gray'
  },
  marginLeft: {
    marginLeft: 33,
  },
  marginTop: {
    marginTop: 50,
  },
  button: {
    backgroundColor: "#6363F1",
    color: "white",
    padding: 10,
    borderRadius: 5,
    width: 150
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
