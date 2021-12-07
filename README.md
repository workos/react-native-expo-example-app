# React Native Expo Example App with SSO and Directory Sync powered by WorkOS

An example React Native Expo application demonstrating to use the WorkOS API to authenticate users via SSO and pull directory user details with Directory Sync. 

## Prerequisites

[expo-cli](https://docs.expo.dev/workflow/expo-cli/)
```
npm install -g expo-cli
```

## React Native Expo Project Setup

1. In your CLI, navigate to the directory into which you want to clone this git repo.
   ```bash
   $ cd ~/Desktop/
   ```

2. Clone the main repo and install dependencies for the app you'd like to use:
    ```bash
    # HTTPS
    git clone https://github.com/workos-inc/react-native-expo-example-app.git
    ```
    or

    ```bash
    # SSH
    git clone git@github.com:workos-inc/react-native-expo-example-app.git
    ```

3. Navigate into the cloned repo. 
   ```bash
   $ cd react-native-expo-example-app
   ```

4. Install the dependencies. 
    ```bash
    $ npm install
    ```

## Configure your environment

5. Grab your API Key and Client ID from the WorkOS Dashboard. Create a `.env`
file at the root of the project, and store these like so:
    ```
    WORKOS_API_KEY=sk_xxxxxxxxxxxxx
    WORKOS_CLIENT_ID=project_xxxxxxxxxxxx
    WORKOS_CONNECTION_ID=conn_xxxxxxxxxxxxxx
    ```

## SSO Setup with WorkOS

6. Follow the [SSO authentication flow instructions](https://workos.com/docs/sso/guide/introduction) to create a new SSO connection in your WorkOS dashboard. Add the Connection ID to the envionment variables as `WORKOS_CONNECTION_ID`, as shown in the previous step.

7. Add the URL generated with `AuthSession.makeRedirectUri().toString();` as a Redirect URI in the Configuration section of the Dashboard. The URL should look something like this: `exp://123.4.5.6:78900`.

## Testing the Integration

9. Start the server. An Expo browser page should launch and you can begin to test the login flow on your mobile device or a simulator! 

```sh
npm start
```
## Run the server

To run the server, use:

```
npm run server
```

The server will run on `localhost://8080`.

## Need help?

If you get stuck and aren't able to resolve the issue by reading our [documentation](https://docs.workos.com/), API reference, or tutorials, you can reach out to us at support@workos.com and we'll lend a hand.
