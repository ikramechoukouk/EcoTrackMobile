import { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import BoutonPrincipal from '../components/BoutonPrincipal';
import ChampTexte from '../components/ChampTexte';
import ListeErreurs from '../components/ListeErreurs';
import SelecteurLocalisation from '../components/SelecteurLocalisation';
import SelecteurOptions from '../components/SelecteurOptions';
import SelecteurPhoto from '../components/SelecteurPhoto';
import { COULEURS, ESPACEMENT } from '../constants/theme';
import { MESSAGES_ERREUR } from '../constants/messages';
import { OPTIONS_CATEGORIE, OPTIONS_GRAVITE } from '../constants/options';
import { RootStackParamList } from '../navigation/types';
import { obtenirPositionActuelle } from '../services/localisationService';
import { choisirDansGalerie, prendrePhoto } from '../services/photoService';
import { ajouter } from '../services/signalementService';
import { DonneesSignalement } from '../types/DonneesSignalement';
import { validerSignalement } from '../utils/validation';

type Props = NativeStackScreenProps<RootStackParamList, 'Creation'>;

const FORMULAIRE_VIDE: DonneesSignalement = { titre: '', description: '' };

export default function CreationScreen({ navigation }: Props) {
  const [formulaire, setFormulaire] = useState<DonneesSignalement>(FORMULAIRE_VIDE);
  const [erreurs, setErreurs] = useState<string[]>([]);
  const [enCours, setEnCours] = useState(false);
  const [positionEnCours, setPositionEnCours] = useState(false);

  async function enregistrer() {
    const erreursValidation = validerSignalement(formulaire);
    setErreurs(erreursValidation);
    if (erreursValidation.length > 0) return;

    setEnCours(true);
    try {
      await ajouter(formulaire);
      navigation.goBack();
    } catch {
      setErreurs([MESSAGES_ERREUR.echecSauvegarde]);
      setEnCours(false);
    }
  }

  async function ajouterPhoto(source: () => Promise<string | undefined>) {
    try {
      const photoUri = await source();
      if (photoUri) setFormulaire((actuel) => ({ ...actuel, photoUri }));
    } catch (erreur) {
      setErreurs([erreur instanceof Error ? erreur.message : MESSAGES_ERREUR.echecPhoto]);
    }
  }

  async function utiliserMaPosition() {
    setPositionEnCours(true);
    try {
      const localisation = await obtenirPositionActuelle();
      setFormulaire((actuel) => ({ ...actuel, localisation }));
      setErreurs([]);
    } catch (erreur) {
      setErreurs([
        erreur instanceof Error ? erreur.message : MESSAGES_ERREUR.positionIndisponible,
      ]);
    } finally {
      setPositionEnCours(false);
    }
  }

  return (
    <ScrollView
      style={styles.conteneur}
      contentContainerStyle={styles.contenu}
      keyboardShouldPersistTaps="handled"
    >
      <ChampTexte
        libelle="Titre"
        valeur={formulaire.titre}
        onChangement={(titre) => setFormulaire((actuel) => ({ ...actuel, titre }))}
        placeholder="Ex. : Dépôt de déchets près de l'école"
      />
      <ChampTexte
        libelle="Description"
        valeur={formulaire.description}
        onChangement={(description) =>
          setFormulaire((actuel) => ({ ...actuel, description }))
        }
        placeholder="Décrivez le problème"
        multiligne
      />
      <SelecteurOptions
        libelle="Catégorie"
        options={OPTIONS_CATEGORIE}
        selection={formulaire.categorie}
        onSelection={(categorie) => setFormulaire((actuel) => ({ ...actuel, categorie }))}
      />
      <SelecteurOptions
        libelle="Gravité"
        options={OPTIONS_GRAVITE}
        selection={formulaire.gravite}
        onSelection={(gravite) => setFormulaire((actuel) => ({ ...actuel, gravite }))}
      />
      <SelecteurLocalisation
        localisation={formulaire.localisation}
        enCours={positionEnCours}
        onAdresse={(adresse) =>
          setFormulaire((actuel) => ({
            ...actuel,
            localisation: { ...actuel.localisation, adresse },
          }))
        }
        onPosition={utiliserMaPosition}
      />
      <SelecteurPhoto
        photoUri={formulaire.photoUri}
        onGalerie={() => ajouterPhoto(choisirDansGalerie)}
        onCamera={() => ajouterPhoto(prendrePhoto)}
        onRetirer={() =>
          setFormulaire((actuel) => ({ ...actuel, photoUri: undefined }))
        }
      />
      <ListeErreurs erreurs={erreurs} />
      <BoutonPrincipal titre="Enregistrer" onPress={enregistrer} desactive={enCours} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  conteneur: { flex: 1, backgroundColor: COULEURS.fond },
  contenu: { padding: ESPACEMENT.moyen, gap: ESPACEMENT.moyen },
});
