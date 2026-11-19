import * as Location from 'expo-location';
import { MESSAGES_ERREUR } from '../constants/messages';
import { Localisation } from '../types/Localisation';

async function chercherAdresse(latitude: number, longitude: number): Promise<string> {
try {
const [lieu] = await Location.reverseGeocodeAsync({ latitude, longitude });
if (!lieu) return '';
return [lieu.street, lieu.city].filter(Boolean).join(', ');
} catch {
return '';
}
}

export async function obtenirPositionActuelle(): Promise<Localisation> {
const permission = await Location.requestForegroundPermissionsAsync();
if (!permission.granted) {
throw new Error(MESSAGES_ERREUR.permissionLocalisationRefusee);
}

let position: Location.LocationObject;
try {
position = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
} catch {
throw new Error(MESSAGES_ERREUR.positionIndisponible);
}

const { latitude, longitude } = position.coords;
return { latitude, longitude, adresse: await chercherAdresse(latitude, longitude) };
}