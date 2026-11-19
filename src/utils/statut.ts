import { Signalement } from '../types/Signalement';
import { Statut } from '../types/Statut';

export function peutEtreModifie(signalement: Signalement): boolean {
return signalement.statut !== Statut.Cloture;
}