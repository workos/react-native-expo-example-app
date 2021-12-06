import * as React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Text, View } from '../components/Themed';


export default function ProfileScreen(props: Object) {
  
  
  return (
    <View style={styles.container}>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <ScrollView>
          <Text>{props.profile}</Text>
        </ScrollView>
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

});
