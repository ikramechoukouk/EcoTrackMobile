import { Localisation } from '../types/Localisation';

export function normaliserLocalisation(localisation?: Localisation): Localisation | undefined {
if (!localisation) return undefined;
const adresse = localisation.adresse?.trim() ?? '';
const aGps = localisation.latitude !== undefined && localisation.longitude !== undefined;
if (!adresse && !aGps) return undefined;
return { ...localisation, adresse };
}

export function formaterLocalisation(localisation: Localisation): string {
if (localisation.adresse) return localisation.adresse;
if (localisation.latitude !== undefined && localisation.longitude !== undefined) {
return `${localisation.latitude.toFixed(5)}, ${localisation.longitude.toFixed(5)}`;
}
return '';
}

export function lienCarte(localisation: Localisation): string | undefined {
if (localisation.latitude === undefined || localisation.longitude === undefined) return undefined;
return `https://www.google.com/maps?q=${localisation.latitude},${localisation.longitude}`;
}