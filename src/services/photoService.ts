import * as ImagePicker from 'expo-image-picker';
import { MESSAGES_ERREUR } from '../constants/messages';

const OPTIONS_PHOTO: ImagePicker.ImagePickerOptions = {
  mediaTypes: ['images'],
  quality: 0.7,
};

export async function choisirDansGalerie(): Promise<string | undefined> {
  const resultat = await ImagePicker.launchImageLibraryAsync(OPTIONS_PHOTO);
  return resultat.canceled ? undefined : resultat.assets[0].uri;
}

export async function prendrePhoto(): Promise<string | undefined> {
  const permission = await ImagePicker.requestCameraPermissionsAsync();
  if (!permission.granted) {
    throw new Error(MESSAGES_ERREUR.permissionCameraRefusee);
  }
  const resultat = await ImagePicker.launchCameraAsync(OPTIONS_PHOTO);
  return resultat.canceled ? undefined : resultat.assets[0].uri;
}