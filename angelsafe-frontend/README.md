# Angelsafe Mobile App Developer Guide

> "Connect, chat, talk, cope and share experiences securely and anonymously with others to help you heal."

## Who is this for?

This README documentation is intended for _(typescript)_ developers to quickly setup the React Native/Expo environment required to run the mobile application.

## App's main features:

- Create and join groups or communities
- Share or post your thoughts and personal experiences
- Update your mood and symptoms daily
- Connect and chat with other members anonymously
- Create your profile
- View other people's profile

More information on the [Angelsafe mobile app's Website](https://mobile.angelsafe.co)

## Quickstart

- This app is built with [Expo](https://expo.dev/) so make sure you have the [Expo CLI](https://docs.expo.dev/get-started/installation/#1-expo-cli) installed. More information on how to install Expo and its requirements can be found on their [website](https://docs.expo.dev/get-started/installation/).
- Make sure you have an emulator installed to quickly test out the app on your computer.
  - [Android Emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
  - [iOS Simulator](https://docs.expo.dev/workflow/ios-simulator/)
- This project uses [yarn](https://classic.yarnpkg.com/en/docs/install) as its package manager, it is [recommended](https://docs.expo.dev/get-started/installation/#1-expo-cli) but not required.

### Install the dependencies

```shell
$ yarn install
```

### Test out the app

To quickly try out the app on your mobile device, input the following command:

```shell
$ yarn start
```

The above command will stdout a QR code which you scan on your actual device to run the app. Make sure you have [Expo Go](https://docs.expo.dev/get-started/installation/#2-expo-go-app-for-ios-and) mobile client app installed to serve it. The command will run in a `development` environment and will try to query the backend running in `localhost`. Refer to the [Config file](#the-app-config) to replace the `backend/server url`.

### Run app on an Android emulator

```shell
$ yarn android
```

The above command will run in a `development` environment and will opena the android emulator. The mobile client app [Expo Go](https://docs.expo.dev/get-started/installation/#2-expo-go-app-for-ios-and) will be used from within the emulator to serve the app.

### Standalone Development Builds

If you prefer not to have the built app served through Expo Go, but rather have the development build actually installed, refer to these links:

- [Create a Development build](https://docs.expo.dev/development/introduction/)
- [Running a project with a development build](https://docs.expo.dev/workflow/run-on-device/#running-a-project-with-a-development-build)

## Development

The following are the main libraries and frameworks used to develop the app:

- `Expo SDK 46` which is using `React Native version 0.69`
- [Redux Toolkit](https://redux-toolkit.js.org/) for state management
- [RTK Query](https://redux-toolkit.js.org/rtk-query/overview) for handling API calls
- [React Navigation](https://reactnavigation.org/) for navigation and routing
- [React-hook-form](https://react-hook-form.com/) for forms and field validation
- [React Native Elements](https://reactnativeelements.com/) as the main UI library
- [Socket IO](https://socket.io/docs/v4/client-api/) for realtime events
- Typescript
- Yarn

### The App Config

In here you can see the [app's main build configuration](/app.config.ts). Updating the values here can influence the app's build information, default UI, etc. Update values as necessary. Refer to the [Expo Config documentation](https://docs.expo.dev/workflow/configuration/) for more information.

## Building

Currently there are 2 ways to build the app. Both options requires its CLI installed and a registered Expo account.

- expo build _(will be discontinued by January 2023)_
- eas build

#### Using Expo Build

```shell
$ expo build:android -t apk
```

The above command will build the android apk. Do note that the `expo build` command will be superseded by `eas build` coming January 2023

#### Using EAS build

```shell
$ eas build --platform android --profile preview
```

The above command is now the recommended way to build an Expo app. It uses [Expo Application Services or EAS](https://expo.dev/eas) to build the app on expo servers, however you can also [build locally](https://docs.expo.dev/build-reference/local-builds/) if preferred.

The `eas build` command will use the [eas.json](/eas.json) file determine the build profile. By setting flag to `--profile preview`, we are telling eas build to use the `preview` profile.

`EAS` also offers full end-to-end handling and management of the app if preferred. Refer to the [official documentation](https://docs.expo.dev/eas/) for more information.

Note that both commands will keep track of every build in the logged in Expo account. You can view all builds from the logged in Expo account dashboard.

## Versioning

Currently app is in development and testing stage.

## Api Reference

In summary, this apps interacts with a single NodeJS express server API gateway. The gateway is just part of a microservice architecture backend. More information here _(backend repository)_
