
// import { NativeModules } from 'react-native';

// const { RNHmplatform } = NativeModules;

// export default RNHmplatform;

// export {default as HMView} from './src/HMView';

import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import ImagePicker from 'react-native-image-crop-picker';

export default class HMView extends Component {

  state = {
    kkk: 0
  }

  constructor(props) {
    super(props)
  }

  componentDidMount() {

  }

  componentWillUnmount() {
    ImagePicker.clean().then(() => {
      console.log('HSHMPlatform', 'remove temp images on component will unmount.');
    }).catch(e => {
      console.e('HSHMPlatform', 'remove temp images error', e);
    });
  }

  onMessage(event) {
    console.log(event);
    let data = event.nativeEvent.data;
    try {
      let result = JSON.parse(data);
      switch (result.type) {
        case 'HSopenCamera': //打开相机
          console.log("收到打开相机的指令");
          ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
            includeBase64: true,
            loadingLabelText: '资源加载中...',
            cropperToolbarTitle: '裁剪',
            cropperChooseText: '确定',
            cropperCancelText: '取消'

          }).then(image => {
            console.log(image);
            //回调方法通知H5
            this.RNCallback(image);
          });
          break;
        case 'HSselectGalley':  //选择相册
          console.log("收到选择相册的指令");
          ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
            includeBase64: true,
            loadingLabelText: '资源加载中...',
            cropperToolbarTitle: '裁剪',
            cropperChooseText: '确定',
            cropperCancelText: '取消',
            multiple: false,
            maxFiles: 6,
          }).then(image => {
            console.log(image);
            //回调方法通知H5
            this.RNCallback(image);
          });
          break;
        case '其他类型':

          break;
        default:

          break;
      }

    }
    catch (error) {

    }
  }

  //RN回调H5中申明的方法
  RNCallback(data) {
    let jsCode = `window.onRNMessage && window.onRNMessage(${JSON.stringify(data)});(function() {
        window.postMessage = function(data) {
            window.ReactNativeWebView.postMessage(data);
        };
        })()`;
    // this.refs.webView && this.refs.webView.injectJavaScript(jsCode);
    this.webView && this.webView.injectJavaScript(jsCode);
  }

  render() {
    return (
      <View style={{ flex: 1, width: Dimensions.get('window').width, height: Dimensions.get('window').height, backgroundColor: 'bule' }}>
        <WebView
          ref={v => this.webView = v}
          source={this.props.url ? { uri: this.props.url } : { html: this.props.html }}
          startInLoadingState={true}
          javaScriptEnabled={true}
          onMessage={(event) => { this.onMessage(event) }}
        />
      </View>
    );
  }
}
