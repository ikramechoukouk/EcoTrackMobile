import AsyncStorage from '@react-native-async-storage/async-storage';
import { CLE_STOCKAGE_SIGNALEMENTS } from '../constants/config';
import { MESSAGES_ERREUR } from '../constants/messages';
import { DonneesSignalement } from '../types/DonneesSignalement';
import { Signalement } from '../types/Signalement';
import { Statut } from '../types/Statut';
import { genererId } from '../utils/id';
import { calculerPriorite } from '../utils/priorite';
import { peutEtreModifie } from '../utils/statut';
import { validerSignalement } from '../utils/validation';
import { normaliserLocalisation } from '../utils/localisation';
async function sauvegarder(liste: Signalement[]): Promise<void> {
try {
await AsyncStorage.setItem(CLE_STOCKAGE_SIGNALEMENTS, JSON.stringify(liste));
} catch {
throw new Error(MESSAGES_ERREUR.echecSauvegarde);
}
}

export async function lireTous(): Promise<Signalement[]> {
try {
const brut = await AsyncStorage.getItem(CLE_STOCKAGE_SIGNALEMENTS);
return brut ? (JSON.parse(brut) as Signalement[]) : [];
} catch {
return [];
}
}

export async function obtenirParId(id: string): Promise<Signalement | undefined> {
const liste = await lireTous();
return liste.find((s) => s.id === id);
}

export async function ajouter(donnees: DonneesSignalement): Promise<Signalement> {
const erreurs = validerSignalement(donnees);
const { categorie, gravite } = donnees;
if (erreurs.length > 0 || !categorie || !gravite) {
throw new Error(erreurs.join('\n'));
}

const nouveau: Signalement = {
id: genererId(),
titre: donnees.titre.trim(),
description: donnees.description.trim(),
categorie,
gravite,
priorite: calculerPriorite(categorie, gravite),
statut: Statut.Ouvert,
photoUri: donnees.photoUri,
localisation: normaliserLocalisation(donnees.localisation),
dateCreation: new Date().toISOString(),
};

const liste = await lireTous();
await sauvegarder([nouveau, ...liste]);
return nouveau;
}

export async function modifier(id: string, donnees: DonneesSignalement): Promise<Signalement> {
const erreurs = validerSignalement(donnees);
const { categorie, gravite } = donnees;
if (erreurs.length > 0 || !categorie || !gravite) {
throw new Error(erreurs.join('\n'));
}

const liste = await lireTous();
const existant = liste.find((s) => s.id === id);
if (!existant) throw new Error(MESSAGES_ERREUR.signalementIntrouvable);
if (!peutEtreModifie(existant)) throw new Error(MESSAGES_ERREUR.signalementCloture);

const misAJour: Signalement = {
...existant,
titre: donnees.titre.trim(),
description: donnees.description.trim(),
categorie,
gravite,
priorite: calculerPriorite(categorie, gravite),
photoUri: donnees.photoUri,
localisation: normaliserLocalisation(donnees.localisation),
dateModification: new Date().toISOString(),
};

await sauvegarder(liste.map((s) => (s.id === id ? misAJour : s)));
return misAJour;
}

export async function supprimer(id: string): Promise<void> {
const liste = await lireTous();
const existant = liste.find((s) => s.id === id);
if (!existant) throw new Error(MESSAGES_ERREUR.signalementIntrouvable);
if (!peutEtreModifie(existant)) throw new Error(MESSAGES_ERREUR.signalementCloture);

await sauvegarder(liste.filter((s) => s.id !== id));
}