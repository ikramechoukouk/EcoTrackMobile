import { DESCRIPTION_LONGUEUR_MIN, TITRE_LONGUEUR_MAX } from './config';

export const MESSAGES_VALIDATION = {
titreObligatoire: 'Le titre est obligatoire.',
titreTropLong: `Le titre ne doit pas dépasser ${TITRE_LONGUEUR_MAX} caractères.`,
descriptionTropCourte: `La description doit contenir au moins ${DESCRIPTION_LONGUEUR_MIN} caractères.`,
categorieObligatoire: 'Choisissez une catégorie.',
graviteObligatoire: 'Choisissez une gravité.',
};

export const MESSAGES_ERREUR = {
signalementIntrouvable: 'Signalement introuvable.',
signalementCloture: 'Un signalement clôturé ne peut plus être modifié ou supprimé.',
echecSauvegarde: 'Impossible de sauvegarder les données.',
  permissionCameraRefusee: "L'accès à la caméra a été refusé.",
  echecPhoto: "Impossible d'ajouter la photo.",
  permissionLocalisationRefusee: "L'accès à la position a été refusé. Saisissez le lieu manuellement.",
positionIndisponible: 'Position GPS indisponible. Activez la localisation du téléphone.',
};