import React, { useState } from 'react';
import { StyleSheet, Button, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import * as AuthSession from 'expo-auth-session';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import axios from 'axios';
import {WORKOS_API_KEY, WORKOS_CLIENT_ID} from '@env'
import ProfileScreen from './ProfileScreen';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [profile, setProfile] = useState<String | null>();

  const reset = () => {
    setProfile(null)
  }

  async function getAuthURL(): Promise<any> {
    let redirect = AuthSession.makeRedirectUri().toString();
    let connection_id = process.env.WORKOS_CONNECTION_ID;
    let client_id = process.env.WORKOS_CLIENT_ID;
    console.log(connection_id, client_id)
    
    let url = `https://api.workos.com/sso/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirect}&state=&connection=${connection_id}`;
    let result = await AuthSession.startAsync({authUrl: url, returnUrl: redirect});
    let code = JSON.parse(JSON.stringify(result)).params.code;
    getProfile(client_id, code);
  }

  async function getProfile(client_id: String, code: String): Promise<any> {
    const apiKey = process.env.WORKOS_API_KEY

    axios({
      method: 'post',
      url: `https://api.workos.com/sso/token?client_id=${client_id}&client_secret=${apiKey}&grant_type=authorization_code&code=${code}`
    }).then((response) => {
      console.log(response.data);
      setProfile(JSON.stringify(response.data));
    });
  }
  return (
    <View style={styles.container}>
      
      {profile ? <Text style={styles.title}>Profile</Text> : 
      <View> 
      <Text style={styles.title}>SSO Powered By WorkOS</Text>         
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />        
      </View>}
        
        {!profile ? 
        <TouchableOpacity
            onPress={getAuthURL}
            style={styles.button}>
          <Text style={styles.buttonText}>Authenticate with SSO</Text>
          </TouchableOpacity> : 
          <View>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> 
            <TouchableOpacity 
            onPress={reset}
            style={styles.button}>
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>          
            <ProfileScreen profile={profile}/>
          </View>
        }
        
      
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
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
  buttonText: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
  },
});
