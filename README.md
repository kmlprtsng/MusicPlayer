# MusicPlayer

## Basic Instructions for Development

1. Clone Repo
2. Install node and npm.
3. Run the following commands:

```bash
cd MusicPlayer
brew upgrade node               # nodejs at 6.7.0 works well on Mac OSX
npm install -g cordova          # cordova at 6.3.1
npm install -g ionic
npm install -g gulp
npm install
gulp add-proxy
ionic serve
```

*Note*: Proxy is so that we can test locally in the browser. Before deploying it to the mobile, we need to run "gulp remove-proxy". More info: http://blog.ionic.io/handling-cors-issues-in-ionic/)

## Run app on android emulator/device

Requirements:
1. Have [android studio](https://developer.android.com/studio/index.html) installed on your machine. Ensure you get the SDK for Android 6 (API level 23). Ionic doesn't support Nougat yet.

Before running the app on emulator/device, we must remove the proxy.

```bash
gulp remove-proxy
cordova platform update android # android platform at 5.2.2
```

### Emulator

1. Create a compatible emulator target. Note the target name to use in the following commands.

```bash
android avd                                       # create a compatible emulator target. API 23 should work very well.
ionic emulate android [--target=your-target-name]
```

### Device

1. Run 'adb list' in terminal to see list of all the connected devices. (You may have to set up adb in the path if it doesn't automatically).
2. USB debugging enabled on your phone
3. Use the following command to run on device:

```bash
ionic run android
```

## More info:
1. [Installation](http://ionicframework.com/docs/guide/installation.html)
2. [Testing](http://ionicframework.com/docs/guide/testing.html)