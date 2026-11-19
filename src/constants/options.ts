import { Categorie } from '../types/Categorie';
import { Gravite } from '../types/Gravite';
import { LIBELLES_CATEGORIE, LIBELLES_GRAVITE } from './libelles';

export const OPTIONS_CATEGORIE = Object.values(Categorie).map((valeur) => ({
valeur,
libelle: LIBELLES_CATEGORIE[valeur],
}));

export const OPTIONS_GRAVITE = Object.values(Gravite).map((valeur) => ({
valeur,
libelle: LIBELLES_GRAVITE[valeur],
}));