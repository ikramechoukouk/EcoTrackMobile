import { Priorite } from '../types/Priorite';
import { Signalement } from '../types/Signalement';
import { Statut } from '../types/Statut';

export interface Statistiques {
total: number;
urgents: number;
clotures: number;
}

export function calculerStatistiques(liste: Signalement[]): Statistiques {
return {
total: liste.length,
urgents: liste.filter((s) => s.priorite === Priorite.Urgente && s.statut !== Statut.Cloture).length,
clotures: liste.filter((s) => s.statut === Statut.Cloture).length,
};
}