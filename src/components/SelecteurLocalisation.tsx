import { Crosshair } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { COULEURS, ESPACEMENT } from '../constants/theme';
import { Localisation } from '../types/Localisation';
import ChampTexte from './ChampTexte';

type Props = {
  localisation?: Localisation;
  enCours: boolean;
  onAdresse: (adresse: string) => void;
  onPosition: () => void;
};

export default function SelecteurLocalisation({
  localisation,
  enCours,
  onAdresse,
  onPosition,
}: Props) {
  const latitude = localisation?.latitude;
  const longitude = localisation?.longitude;

  return (
    <View style={styles.conteneur}>
      <ChampTexte
        libelle="Lieu (facultatif)"
        valeur={localisation?.adresse ?? ''}
        onChangement={onAdresse}
        placeholder="Ex. : Avenue Habib Bourguiba, Sfax"
      />
      <Pressable
        style={[styles.bouton, enCours && styles.desactive]}
        onPress={onPosition}
        disabled={enCours}
        accessibilityRole="button"
      >
        <Crosshair size={18} color={COULEURS.principale} />
        <Text style={styles.texte}>
          {enCours ? 'Recherche de la position...' : 'Utiliser ma position'}
        </Text>
      </Pressable>
      {latitude !== undefined && longitude !== undefined && (
        <Text style={styles.info}>
          GPS : {latitude.toFixed(5)}, {longitude.toFixed(5)}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  conteneur: { gap: ESPACEMENT.petit },
  bouton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ESPACEMENT.petit,
    alignSelf: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: ESPACEMENT.moyen,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COULEURS.principale,
    backgroundColor: COULEURS.carte,
  },
  desactive: { opacity: 0.5 },
  texte: { fontSize: 14, color: COULEURS.principale, fontWeight: '600' },
  info: { fontSize: 13, color: COULEURS.texteSecondaire },
});
