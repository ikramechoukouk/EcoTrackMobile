import { Categorie } from '../types/Categorie';
import { Gravite } from '../types/Gravite';
import { Priorite } from '../types/Priorite';
import {
POIDS_CATEGORIE,
POIDS_GRAVITE,
SEUIL_HAUTE,
SEUIL_NORMALE,
SEUIL_URGENTE,
} from '../constants/poidsPriorite';

export function calculerPriorite(categorie: Categorie, gravite: Gravite): Priorite {
const score = POIDS_CATEGORIE[categorie] + POIDS_GRAVITE[gravite];

if (score >= SEUIL_URGENTE) return Priorite.Urgente;
if (score >= SEUIL_HAUTE) return Priorite.Haute;
if (score >= SEUIL_NORMALE) return Priorite.Normale;
return Priorite.Basse;
}