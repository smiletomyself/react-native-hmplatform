
import { NativeModules } from 'react-native';
import { default as HMView } from './src/HMView';

const { RNHmplatform } = NativeModules;

export default RNHmplatform;

export { HMView };
