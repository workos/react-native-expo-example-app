# WorkOS React Native Expo Example App

An example React Native Expo application demonstrating to use the WorkOS API to authenticate users via SSO, pull directory user details with Directory Sync and recieve and parse Webhooks.

## Prerequisites

Ensure that you have [expo](https://docs.expo.dev/get-started/installation/) installed.

```
npm install expo
```

## React Native Expo Project Setup / SSO Tab

1. Clone the main repo and install dependencies for the app you'd like to use:
    ```bash
    # HTTPS
    git clone https://github.com/workos-inc/react-native-expo-example-app.git
    ```
    or

    ```bash
    # SSH
    git clone git@github.com:workos-inc/react-native-expo-example-app.git
    ```

2. Navigate into the cloned repo.
   ```bash
   $ cd react-native-expo-example-app
   ```

3. Install the dependencies.
    ```bash
    $ npm install
    ```

## Configure your environment

4. Grab your API Key and Client ID from the WorkOS Dashboard. Create a `.env` file at the root of the project, and store these like so:
    ```
    WORKOS_API_KEY=sk_xxxxxxxxxxxxx
    WORKOS_CLIENT_ID=project_xxxxxxxxxxxx
    WORKOS_CONNECTION_ID=conn_xxxxxxxxxxxxxx
    ```

## SSO Setup with WorkOS

5. Follow the [SSO authentication flow instructions](https://workos.com/docs/sso/guide/introduction) to create a new SSO Connection in your WorkOS dashboard. Add the Connection ID to the envionment variables as `WORKOS_CONNECTION_ID`, as shown in the previous step.

6. Add the URL generated with `AuthSession.makeRedirectUri().toString();` as a Redirect URI in the Configuration section of the Dashboard. The URL should look something like this: `exp://123.4.5.6:78900`.

## Testing the Integration

7. Start the server. An Expo browser page should launch and you can begin to test the login flow on your mobile device or a simulator!

```sh
npx expo start
```

## Directory Sync Tab

As long as you've added your API key to the environment variables as `WORKOS_API_KEY`, you should also be able to use the Directory Sync tab to get a look into all of your currently configured Directories.

Simply click on "Show Directories" to get a list of your current, active Directories. You can then click into any directory to get a list of users, and click into any user to get their details.

## Webhooks Tab

In order to test out webhook functionality, you'll need to start the server (while `npm start` is still running). To run the server, use:

```
npm run server
```

The server will run on `localhost://8080`.

You'll then want to start an `ngrok` session. [Ngrok](https://ngrok.com/) is a simple application that allows you to map a local endpoint to a public endpoint.

The application will run on http://localhost:8080. Ngrok will create a tunnel to the application so we can receive webhooks from WorkOS.

```sh
ngrok http 8080
```

Next, log into the [WorkOS Dashboard](https://dashboard.workos.com/webhooks) and add a Webhook endpoint with the public ngrok URL with `/webhooks` appended.

The local application is listening for webhook requests at http://localhost:8080/webhooks

In order for the SDK to validate that WorkOS webhooks, locate the Webhook secret from the dashboard.

Then populate the following environment variable in your `.env` file at the root of the project.

```sh
WORKOS_WEBHOOK_SECRET=your_webhook_secret
```

You will now be able to see your webhooks in the UI of the Webhooks tab as they come in!

## Need help?

If you get stuck and aren't able to resolve the issue by reading our [documentation](https://docs.workos.com/), API reference, or tutorials, you can reach out to us at support@workos.com and we'll lend a hand.
