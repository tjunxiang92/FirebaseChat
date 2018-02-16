# WIP: FirebaseChatDemo
React Native implementation of FirebaseChat based on https://github.com/marcovann/Firebase-Chat-Demo
This is to create a chat app to allow a group of users to communicate and send attachments to one another.

## Web
- Create `firebase.json` inside `web/src` folder and replace it with firebase credentials
```
{
  "apiKey": "xxx",
  "authDomain": "xxx",
  "databaseURL": "xxx",
  "projectId": "xxx",
  "storageBucket": "xxx",
  "messagingSenderId": "xxx"
}
```
- Run the following commands to start the server
```
cd web
npm start
```

## Mobile
- Download `GoogleService-Info.plist` and put in the `mobile/ios` and `mobile/android` folders respectively
- Run either the following commands to start
```
react-native run-ios
react-native run-android
```

## TODO
- Upload Multiple images with React FineUploader
- Optimize uploaded images [here](https://gist.github.com/ozasadnyy/f1bc84eebe5335af4618955f77dc7d5c)