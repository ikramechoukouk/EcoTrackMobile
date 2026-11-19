import { DonneesSignalement } from '../types/DonneesSignalement';
import { DESCRIPTION_LONGUEUR_MIN, TITRE_LONGUEUR_MAX } from '../constants/config';
import { MESSAGES_VALIDATION } from '../constants/messages';

export function validerSignalement(donnees: DonneesSignalement): string[] {
const erreurs: string[] = [];
const titre = donnees.titre.trim();

if (titre.length === 0) {
erreurs.push(MESSAGES_VALIDATION.titreObligatoire);
} else if (titre.length > TITRE_LONGUEUR_MAX) {
erreurs.push(MESSAGES_VALIDATION.titreTropLong);
}

if (donnees.description.trim().length < DESCRIPTION_LONGUEUR_MIN) {
erreurs.push(MESSAGES_VALIDATION.descriptionTropCourte);
}

if (!donnees.categorie) {
erreurs.push(MESSAGES_VALIDATION.categorieObligatoire);
}

if (!donnees.gravite) {
erreurs.push(MESSAGES_VALIDATION.graviteObligatoire);
}

return erreurs;
}