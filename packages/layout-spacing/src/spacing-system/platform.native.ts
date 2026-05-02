import { Platform } from 'react-native';
export const isNative = () => Platform.OS !== 'web';
export const getPlatform = () => Platform.OS;
