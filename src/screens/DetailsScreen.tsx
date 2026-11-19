import { useEffect, useState } from 'react';
import { Image, Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MapPin } from 'lucide-react-native';
import { MESSAGES_ERREUR } from '../constants/messages';
import { COULEURS, ESPACEMENT } from '../constants/theme';
import {
  LIBELLES_CATEGORIE,
  LIBELLES_GRAVITE,
  LIBELLES_PRIORITE,
  LIBELLES_STATUT,
} from '../constants/libelles';
import { RootStackParamList } from '../navigation/types';
import { obtenirParId } from '../services/signalementService';
import { Signalement } from '../types/Signalement';
import { formaterLocalisation, lienCarte } from '../utils/localisation';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

export default function DetailsScreen({ route }: Props) {
  const { signalementId } = route.params;
  const [signalement, setSignalement] = useState<Signalement | undefined>();
  const [introuvable, setIntrouvable] = useState(false);

  useEffect(() => {
    obtenirParId(signalementId).then((resultat) => {
      if (resultat) setSignalement(resultat);
      else setIntrouvable(true);
    });
  }, [signalementId]);

  if (introuvable) {
    return <Text style={styles.erreur}>{MESSAGES_ERREUR.signalementIntrouvable}</Text>;
  }
  if (!signalement) return null;

  const urlCarte = signalement.localisation
    ? lienCarte(signalement.localisation)
    : undefined;

  return (
    <ScrollView style={styles.conteneur} contentContainerStyle={styles.contenu}>
      <Text style={styles.titre}>{signalement.titre}</Text>
      {signalement.photoUri && (
        <Image source={{ uri: signalement.photoUri }} style={styles.photo} />
      )}
      <Text style={styles.ligne}>
        Catégorie : {LIBELLES_CATEGORIE[signalement.categorie]}
      </Text>
      <Text style={styles.ligne}>Gravité : {LIBELLES_GRAVITE[signalement.gravite]}</Text>
      <Text style={styles.ligne}>Priorité : {LIBELLES_PRIORITE[signalement.priorite]}</Text>
      <Text style={styles.ligne}>Statut : {LIBELLES_STATUT[signalement.statut]}</Text>
      {signalement.localisation && (
        <>
          <Text style={styles.ligne}>
            Lieu : {formaterLocalisation(signalement.localisation)}
          </Text>
          {urlCarte && (
            <Pressable
              style={styles.lien}
              onPress={() => void Linking.openURL(urlCarte)}
              accessibilityRole="link"
            >
              <MapPin size={18} color={COULEURS.principale} />
              <Text style={styles.texteLien}>Voir sur la carte</Text>
            </Pressable>
          )}
        </>
      )}
      <Text style={styles.description}>{signalement.description}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  conteneur: { flex: 1, backgroundColor: COULEURS.fond },
  contenu: { padding: ESPACEMENT.moyen, gap: ESPACEMENT.petit },
  titre: { fontSize: 20, fontWeight: '700', color: COULEURS.texte },
  ligne: { fontSize: 15, color: COULEURS.texteSecondaire },
  description: { fontSize: 16, color: COULEURS.texte, marginTop: ESPACEMENT.moyen },
  erreur: { padding: ESPACEMENT.moyen, color: COULEURS.texte },
  photo: { width: '100%', height: 220, borderRadius: 10 },
  lien: { flexDirection: 'row', alignItems: 'center', gap: ESPACEMENT.petit },
  texteLien: { fontSize: 15, color: COULEURS.principale, fontWeight: '600' },
});
