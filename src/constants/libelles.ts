import { Categorie } from '../types/Categorie';
import { Gravite } from '../types/Gravite';
import { Priorite } from '../types/Priorite';
import { Statut } from '../types/Statut';

export const LIBELLES_CATEGORIE: Record<Categorie, string> = {
[Categorie.DechetsAbandonnes]: 'Déchets abandonnés',
[Categorie.DepotSauvage]: 'Dépôt sauvage',
[Categorie.FuiteEau]: "Fuite d'eau",
[Categorie.Autre]: 'Autre',
};

export const LIBELLES_GRAVITE: Record<Gravite, string> = {
[Gravite.Faible]: 'Faible',
[Gravite.Moyenne]: 'Moyenne',
[Gravite.Elevee]: 'Élevée',
};

export const LIBELLES_PRIORITE: Record<Priorite, string> = {
[Priorite.Basse]: 'Basse',
[Priorite.Normale]: 'Normale',
[Priorite.Haute]: 'Haute',
[Priorite.Urgente]: 'Urgente',
};

export const LIBELLES_STATUT: Record<Statut, string> = {
[Statut.Ouvert]: 'Ouvert',
[Statut.EnCours]: 'En cours',
[Statut.Cloture]: 'Clôturé',
};