
# react-native-hmplatform

## Getting started

`$ npm install react-native-hmplatform --save`

### Mostly automatic installation

`$ react-native link react-native-hmplatform`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-hmplatform` and add `RNHmplatform.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNHmplatform.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.hessian.hmplatform.RNHmplatformPackage;` to the imports at the top of the file
  - Add `new RNHmplatformPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-hmplatform'
  	project(':react-native-hmplatform').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-hmplatform/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-hmplatform')
  	```


## Common Usage as a Webview
```javascript
import  {HMView}  from 'react-native-hmplatform';

// the other code
...

render() {
	var url = "https://github.com/smiletomyself/react-native-hmplatform/blob/main/README.md";
	return(
		<HMView url={url} />
	)
}
```
### Load local html file
```javascript
import  {HMView}  from 'react-native-hmplatform';

// the other code
...

render() {
	var html = `
      <html>
      <head>
        <meta charset="utf-8">
        <title>RNHmplatform</title>
      </head>
      <body>
        <h1>A common WebView extended by ImagePicker for React Native (Android and iOS platform).</h1>
      </body>
      </html>
    `;
	return(
		<HMView html={html} />
	)
}
```

## Extend Usage as a image picker view

Before your want to use image picker by javascript in H5, notice as below:

1. H5 need to post a message to RN;
2. RN listen the message from H5 and do something about image picking;
3. After image selected, RN inject a message named onRNMessage include image's datas;
4. H5 listen the onRNMessage function and parse the callback result;

### select from camera

you need to copy code blow in your H5 page

```javascript
function openCamera(){
  window.ReactNativeWebView.postMessage(JSON.stringify({ type: "HSopenCamera",data: { } }))
}
```
### Select from gallery

you need to copy code blow in your H5 page

```javascript
function openCamera(){
  window.ReactNativeWebView.postMessage(JSON.stringify({ type: "HSselectGalley",data: { } }))
}
```
### Listen the result

you need to copy code blow in your H5 page

```javascript
window["onRNMessage"] = (data) => {
	// todo parse the data

	// example:
	if (data instanceof Object) {
		var img = new Image()
    img.src='data:image/jpeg;base64,'+data.data
    document.body.appendChild(img)
	} else if () {
		for (var i = 0 ; i < data.length ; i++) {
      var img = new Image()
      img.src='data:image/jpeg;base64,'+data[i].data
      document.body.appendChild(img)
    }
	} else {
		console.e('pase data failed')
	}
}
```
### Result data object

| Property                  |  Type  | Description                              |
| ------------------------- | :----: | :--------------------------------------- |
| path                      | string | Selected image location. This is null when the `writeTempFile` option is set to false. |
| localIdentifier(ios only) | string | Selected images' localidentifier, used for PHAsset searching |
| sourceURL(ios only)       | string | Selected images' source path, do not have write access |
| filename(ios only)        | string | Selected images' filename                |
| width                     | number | Selected image width                     |
| height                    | number | Selected image height                    |
| mime                      | string | Selected image MIME type (image/jpeg, image/png) |
| size                      | number | Selected image size in bytes             |
| duration                  | number | Video duration time in milliseconds      |
| data                      | base64 | Optional base64 selected file representation |
| exif                      | object | Extracted exif data from image. Response format is platform specific |
| cropRect                  | object | Cropped image rectangle (width, height, x, y)    |
| creationDate (ios only)   | string | UNIX timestamp when image was created    |
| modificationDate          | string | UNIX timestamp when image was last modified |

## Optional

The custom props for the HMView

|Property|Type|Description|
|:------------|:-----------------------------|:------------------|
|html|string|Load local html file|
|url|string|Load remote url|
|pickerOptions|object|the common properties for image picker|

### pickerOptions
| Property                                |                   Type                   | Description                           |
| --------------------------------------- | :--------------------------------------: | :--------------------------------------- |
| cropping                                |           bool (default false)           | Enable or disable cropping               |
| width                                   |                  number                  | Width of result image when used with `cropping` option |
| height                                  |                  number                  | Height of result image when used with `cropping` option |
| multiple                                |           bool (default false)           | Enable or disable multiple image selection |
| writeTempFile (ios only)                |           bool (default true)            | When set to false, does not write temporary files for the selected images. This is useful to improve performance when you are retrieving file contents with the `includeBase64` option and don't need to read files from disk. |
| includeBase64                           |           bool (default false)           | When set to true, the image file content will be available as a base64-encoded string in the `data` property. Hint: To use this string as an image source, use it like: ``<Image source={{uri: `data:${image.mime};base64,${image.data}`}} />`` |
| includeExif                           |           bool (default false)           | Include image exif data in the response |
| avoidEmptySpaceAroundImage (ios only)  |           bool (default true)           |  When set to true, the image will always fill the mask space. |
| cropperActiveWidgetColor (android only) |       string (default `"#424242"`)       | When cropping image, determines ActiveWidget color. |
| cropperStatusBarColor (android only)    |        string (default `#424242`)        | When cropping image, determines the color of StatusBar. |
| cropperToolbarColor (android only)      |        string (default `#424242`)        | When cropping image, determines the color of Toolbar. |
| cropperToolbarWidgetColor (android only)      |        string (default `darker orange`)        | When cropping image, determines the color of Toolbar text and buttons. |
| freeStyleCropEnabled      |        bool (default false)        | Enables user to apply custom rectangle area for cropping |
| cropperToolbarTitle                     |        string (default `Edit Photo`)     | When cropping image, determines the title of Toolbar. |
| cropperCircleOverlay                    |           bool (default false)           | Enable or disable circular cropping mask. |
| disableCropperColorSetters (android only)|           bool (default false)           | When cropping image, disables the color setters for cropping library. |
| minFiles (ios only)                     |            number (default 1)            | Min number of files to select when using `multiple` option |
| maxFiles (ios only)                     |            number (default 5)            | Max number of files to select when using `multiple` option |
| waitAnimationEnd (ios only)             |           bool (default true)            | Promise will resolve/reject once ViewController `completion` block is called |
| smartAlbums (ios only)                  | array ([supported values](https://github.com/ivpusic/react-native-image-crop-picker/blob/master/README.md#smart-album-types-ios)) (default ['UserLibrary', 'PhotoStream', 'Panoramas', 'Videos', 'Bursts']) | List of smart albums to choose from      |
| useFrontCamera                          |           bool (default false)           | Whether to default to the front/'selfie' camera when opened. Please note that not all Android devices handle this parameter, see [issue #1058](https://github.com/ivpusic/react-native-image-crop-picker/issues/1058)|
| compressVideoPreset (ios only)          |      string (default MediumQuality)      | Choose which preset will be used for video compression |
| compressImageMaxWidth                   |          number (default none)           | Compress image with maximum width        |
| compressImageMaxHeight                  |          number (default none)           | Compress image with maximum height       |
| compressImageQuality                    |            number (default 1 (Android)/0.8 (iOS))            | Compress image with quality (from 0 to 1, where 1 is best quality). On iOS, values larger than 0.8 don't produce a noticeable quality increase in most images, while a value of 0.8 will reduce the file size by about half or less compared to a value of 1. |
| loadingLabelText (ios only)             | string (default "Processing assets...")  | Text displayed while photo is loading in picker |
| mediaType                               |           string (default any)           | Accepted mediaType for image selection, can be one of: 'photo', 'video', or 'any' |
| showsSelectedCount (ios only)           |           bool (default true)            | Whether to show the number of selected assets |
| sortOrder (ios only)           |           string (default 'none', supported values: 'asc', 'desc', 'none')            | Applies a sort order on the creation date on how media is displayed within the albums/detail photo views when opening the image picker |
| forceJpg (ios only)           |           bool (default false)            | Whether to convert photos to JPG. This will also convert any Live Photo into its JPG representation |
| showCropGuidelines (android only)       |           bool (default true)            | Whether to show the 3x3 grid on top of the image during cropping |
| showCropFrame (android only)       |           bool (default true)            | Whether to show crop frame during cropping |
| hideBottomControls (android only)       |           bool (default false)           | Whether to display bottom controls       |
| enableRotationGesture (android only)    |           bool (default false)           | Whether to enable rotating the image by hand gesture |
| cropperChooseText (ios only)            |           string (default choose)        | Choose button text |
| cropperCancelText (ios only)            |           string (default Cancel)        | Cancel button text |
| cropperRotateButtonsHidden (ios only)   |           bool (default false)           | Enable or disable cropper rotate buttons |


