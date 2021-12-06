import React, { useState } from 'react';
import { StyleSheet, Button, TouchableOpacity, TextInput } from 'react-native';
import { withSafeAreaInsets } from 'react-native-safe-area-context';
import axios from 'axios';
import Colors from '../constants/Colors';
import { MonoText } from './StyledText';
import {Text, View } from './Themed';
import * as AuthSession from 'expo-auth-session';
import {WORKOS_API_KEY, WORKOS_CLIENT_ID, WORKOS_CONNECTION_ID} from '@env'



export default function EditScreenInfo({ path }: { path: string }) {
  const [profile, setProfile] = useState<String | null>();

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
      console.log(response.data);
      setProfile(JSON.stringify(response.data));
    });
  }

  return (
    <View>
      <View style={styles.getStartedContainer}>
        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
        </Text>
        
        {profile == null ? null : 
        <TouchableOpacity 
        onPress={reset}
        style={styles.button}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>}

        <Text>{profile}</Text>

        <TouchableOpacity
          onPress={getAuthURL}
          style={styles.button}>
        <Text style={styles.buttonText}>Authenticate with SSO</Text>
        </TouchableOpacity>


        <View
          style={[styles.codeHighlightContainer, styles.homeScreenFilename]}
          darkColor="rgba(255,255,255,0.05)"
          lightColor="rgba(0,0,0,0.05)">
        </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: 'center',
  },
  input: {
    color: 'white',
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
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
  },
});



