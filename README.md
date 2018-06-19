# LRN Weather App

This is a modified version of the Weather App from the [Learning React Native](http://shop.oreilly.com/product/0636920085270.do) book. This application demonstrates the use of various UI elements to give the presentation a modern look as well as improving the UX.

## Building

### Installing Dependencies

```
npm install
```

### Design and Build Notes

When preparing the initial project source the following command was run to ensure any native modules were linked to the native application projects. 

```
react-native link
```

However, this did not automatically add the Camararoll native module as it is part of the base react-native application modules. So the Cameraroll IOS module found at `<LRN_Weather_App HOME>/node_modules/react-native/Libraries/CameraRoll/RCTCameraRoll.xcodeproj` was linked manually using the instructions provided on the [Linking Libraries](https://facebook.github.io/react-native/docs/linking-libraries-ios.html) page of the official documentation.

For IOS projects non-TLS XHR requests will be rejected. To enable this you need to set the key `NSAllowsArbitraryLoads` to `true` in the XCode project's Info.plist file.

```
  .
  .
	<key>NSAppTransportSecurity</key>
	<dict>
		<key>NSAllowsArbitraryLoads</key>
		<true/>
    .
    .
```

For IOS the following key was also added to show a descriptive message when allowing access to the CamaraRoll and Location services.

```
.
.
<dict>
	<key>NSPhotoLibraryUsageDescription</key>
	<string>To select a background for the Weather app.</string>
	<key>NSLocationWhenInUseUsageDescription</key>
	<string>To retrieve the weather using your current location.</string>
  .
  .
```

To modify the application icons and the splash screen this [blog on Medium.com](https://medium.com/@scottianstewart/react-native-add-app-icons-and-launch-screens-onto-ios-and-android-apps-3bfbc20b7d4c) was followed.