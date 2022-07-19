import * as FileSystem from 'expo-file-system';

export const getBase64 = async(item:any)=>{
    const file = await FileSystem.readAsStringAsync(item.uri, {
        encoding: FileSystem.EncodingType.Base64,
    });
    return file;
}