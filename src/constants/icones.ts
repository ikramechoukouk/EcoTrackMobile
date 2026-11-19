import {
  Trash2,
  Truck,
  Droplets,
  CircleHelp,
} from 'lucide-react-native';

import { Categorie } from '../types/Categorie';

export const ICONES_CATEGORIE = {
  [Categorie.DechetsAbandonnes]: Trash2,
  [Categorie.DepotSauvage]: Truck,
  [Categorie.FuiteEau]: Droplets,
  [Categorie.Autre]: CircleHelp,
};