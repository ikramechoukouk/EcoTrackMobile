import { Categorie } from '../types/Categorie';
import { Gravite } from '../types/Gravite';

export const POIDS_CATEGORIE: Record<Categorie, number> = {
[Categorie.FuiteEau]: 3,
[Categorie.DepotSauvage]: 2,
[Categorie.DechetsAbandonnes]: 1,
[Categorie.Autre]: 0,
};

export const POIDS_GRAVITE: Record<Gravite, number> = {
[Gravite.Faible]: 1,
[Gravite.Moyenne]: 2,
[Gravite.Elevee]: 3,
};

export const SEUIL_URGENTE = 6;
export const SEUIL_HAUTE = 5;
export const SEUIL_NORMALE = 3;