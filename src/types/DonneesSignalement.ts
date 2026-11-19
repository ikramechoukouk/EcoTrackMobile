import { Categorie } from './Categorie';
import { Gravite } from './Gravite';
import { Localisation } from './Localisation';

export interface DonneesSignalement {
titre: string;
description: string;
categorie?: Categorie;
gravite?: Gravite;
photoUri?: string;
localisation?: Localisation;
}