import { Categorie } from './Categorie';
import { Gravite } from './Gravite';
import { Priorite } from './Priorite';
import { Statut } from './Statut';
import { Localisation } from './Localisation';

export interface Signalement {
id: string;
titre: string;
description: string;
categorie: Categorie;
gravite: Gravite;
priorite: Priorite;
statut: Statut;
photoUri?: string;
dateCreation: string;
dateModification?: string;
localisation?: Localisation;
}