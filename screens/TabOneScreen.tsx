import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as AuthSession from 'expo-auth-session';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import axios from 'axios';
import {WORKOS_API_KEY, WORKOS_CLIENT_ID} from '@env'
import ProfileScreen from './ProfileScreen';


export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  interface Profile {
    first_name: string;
    last_name: string;
    email: string;
    id: string;
    connection_id: string;
    connection_type: string;
    raw_attributes: object;
  }

  const [profile, setProfile] = useState<Profile | null>();

  const reset = () => {
    setProfile(null)
  }

  async function getAuthURL(): Promise<any> {
    let redirect = AuthSession.makeRedirectUri().toString();
    let connection_id = process.env.WORKOS_CONNECTION_ID;
    let client_id = process.env.WORKOS_CLIENT_ID;
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
      console.log(JSON.stringify(response.data));
      setProfile({
        first_name: response.data.profile.first_name,
        last_name: response.data.profile.last_name,
        email: response.data.profile.email,
        id: response.data.profile.id,
        connection_id: response.data.profile.connection_id,
        connection_type: response.data.profile.connection_type,
        raw_attributes: response.data.profile.raw_attributes
      })
    });
  }
  return (
    <View style={styles.container}>
      
      {profile ? 
      <View>
        <View style={styles.bigSeparator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> 
        <View style={styles.row}>
          <View>
            <Text style={[styles.title, styles.profile]}>Profile</Text>
          </View>
          <View>
            <TouchableOpacity 
              onPress={reset}
              style={styles.backButton}>
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity> 
          </View>
        </View>
        
        <View>
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> 
          <ProfileScreen profile={profile}/>
        </View>
      </View> 
      : 
      <View>
        <View style={styles.logoContainer}>
          <Image source={require('../assets/images/workos_logo.png')} style={styles.logo}/> 
          <View>
            <View style={styles.medSeparator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> 
            <Text style={styles.headingText}>Your app,</Text>
            <Text style={[styles.headingText, styles.blurpleText]}>Enterprise Ready</Text>
          </View>        
        </View>

        <View style={{position: 'relative', bottom: 65}}>
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> 
          <Text style={styles.title}>SSO Powered By WorkOS</Text>         
          
          <TouchableOpacity
              onPress={getAuthURL}
              style={styles.button}>
            <Text style={styles.buttonText}>Authenticate with SSO</Text>
          </TouchableOpacity>
        </View>          
      </View>}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: 100,
    width: 500,

  },
  logoContainer: {
    flex: 1,
    alignItems:'center',
    justifyContent: 'center',
    alignSelf: 'stretch'
  },
  headingText: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  blurpleText: {
    color: "#6363F1"
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'gray',
    padding: 15,
  },
  separator: {
    marginVertical: 40,
    height: 1,
    width: '80%',
  },
  medSeparator: {
    marginTop: 75,
    height: 1,
    width: '80%',
  },
  bigSeparator: {
    marginTop: 150,
    height: 1,
    width: '80%',
  },
  logo: {
    width: '100%',
    height: 60,
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
    padding: 5,
    borderRadius: 5,
    width: 125
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
  },
  profile: {
    fontSize: 38,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  }
});
