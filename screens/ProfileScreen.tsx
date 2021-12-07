import React, { useState} from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Alert, Modal, Pressable } from 'react-native';
import { Text, View } from '../components/Themed';
import { Table, Row, Rows } from 'react-native-table-component';


export default function ProfileScreen(props: Object) {
  const [modalVisible, setModalVisible] = useState(false);
  
  const tableHead = ['Profile Key', 'Profile Value'];
  const tableData = [
    ['First Name', props.profile.first_name],
    ['Last Name', props.profile.last_name],
    ['Email', props.profile.email],
    ['Profile ID', props.profile.id],
    ['Connection Type', props.profile.connection_type],
    ['Connection ID',props.profile.connection_id],
    ['Raw Attributes', 
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={{color: '#6363F1'}}> View Raw Attributes </Text>
      </TouchableOpacity>],
  ]

  const rawAttributes = JSON.stringify(props.profile.raw_attributes)

  return (
    <View style={styles.container}>
        <View style={[styles.tableContainer]}>
          <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
            <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
            <Rows data={tableData} textStyle={styles.text}/>
          </Table>
        </View>
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
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>{rawAttributes}</Text>
                <Pressable
                  style={[styles.modalButton, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Back</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
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
    marginVertical: 15,
    height: 1,
    width: '80%',
  },
  button: {
    borderColor: '#6363F1',
    borderStyle: "solid",
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    position: 'relative',
    bottom: 300,
  },
  buttonText: {
    fontSize: 20,
    color: '#6363F1',
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
    width: '70%' 
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
    marginBottom: 15,
    textAlign: "center"
  }
});
