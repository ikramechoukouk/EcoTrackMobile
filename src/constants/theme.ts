import { Priorite } from '../types/Priorite';
import { Statut } from '../types/Statut';

export const COULEURS = {
  fond: '#F4F7F5',
  carte: '#FFFFFF',
  principale: '#2E7D32',
  texte: '#1B1B1B',
  texteSecondaire: '#5F6B63',
  bordure: '#DDE5DF',
  texteSurPrincipale: '#FFFFFF',
};

export const ESPACEMENT = {
  petit: 8,
  moyen: 16,
  grand: 24,
};

export const COULEURS_PRIORITE: Record<Priorite, string> = {
  [Priorite.Basse]: '#2E7D32',
  [Priorite.Normale]: '#1565C0',
  [Priorite.Haute]: '#E65100',
  [Priorite.Urgente]: '#C62828',
};

export const COULEURS_STATUT: Record<Statut, string> = {
  [Statut.Ouvert]: '#1565C0',
  [Statut.EnCours]: '#E65100',
  [Statut.Cloture]: '#616161',
};
