import * as WebBrowser from 'expo-web-browser';
import React, { Component } from 'react';
import { StyleSheet, Button, TouchableOpacity, TextInput, Linking } from 'react-native';
import { withSafeAreaInsets } from 'react-native-safe-area-context';
import axios from 'axios';
import Colors from '../constants/Colors';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';
import * as AuthSession from 'expo-auth-session';

export default function EditScreenInfo({ path }: { path: string }) {
  const [text] = React.useState();

  return (
    <View>
      <View style={styles.getStartedContainer}>
        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
        </Text>

        <Button
          onPress={getAuthURL}
          title="Authenticate with SSO"
          color="#6363F1"
        />

        <View
          style={[styles.codeHighlightContainer, styles.homeScreenFilename]}
          darkColor="rgba(255,255,255,0.05)"
          lightColor="rgba(0,0,0,0.05)">
        </View>
      </View>
    </View>
  );
}

async function getAuthURL(): Promise<any> {
  let redirect = AuthSession.makeRedirectUri().toString();
  console.log(redirect);
  console.log(typeof redirect);
  let url = `https://api.workos.com/sso/authorize?response_type=code&client_id=project_01ERG1BJWYAWX9P93Y19DSYE1C&redirect_uri=${redirect}&state=&connection=conn_01FNSDTB9YZCGGT9YV3HN7MEK3`;
  await AuthSession.startAsync({authUrl: url, returnUrl: redirect});
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
});
