import * as React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, View } from '../components/Themed';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';


export default function ProfileScreen(props: Object) {
  const tableHead = ['Profile Key', 'Profile Value'];
  const tableData = [
    ['First Name', props.profile.first_name],
    ['Last Name', props.profile.last_name],
    ['Email', props.profile.email],
    ['Profile ID', props.profile.id],
    ['Connection Type', props.profile.connection_type],
    ['Connection ID',props.profile.connection_id],
    ['Raw Attributes', <TouchableOpacity><Text>View Raw Attributes</Text></TouchableOpacity>],
  ]

  return (
    <View style={styles.container}>
        <View style={[styles.tableContainer]}>
          <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
            <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
            <Rows data={tableData} textStyle={styles.text}/>
          </Table>
        </View>

        {/* <ScrollView>
          <Text>{JSON.stringify(props.profile.raw_attributes)}</Text>
        </ScrollView> */}

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
});
