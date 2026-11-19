import { useCallback, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Plus } from 'lucide-react-native';
import Badge from '../components/Badge';
import ResumeStatistiques from '../components/ResumeStatistiques';
import { COULEURS, COULEURS_PRIORITE, COULEURS_STATUT, ESPACEMENT } from '../constants/theme';
import { ICONES_CATEGORIE } from '../constants/icones';
import { LIBELLES_CATEGORIE, LIBELLES_PRIORITE, LIBELLES_STATUT } from '../constants/libelles';
import { RootStackParamList } from '../navigation/types';
import { lireTous } from '../services/signalementService';
import { Signalement } from '../types/Signalement';
import { calculerStatistiques } from '../utils/statistiques';

type Props = NativeStackScreenProps<RootStackParamList, 'Liste'>;

export default function ListeScreen({ navigation }: Props) {
  const [signalements, setSignalements] = useState<Signalement[]>([]);

  useFocusEffect(
    useCallback(() => {
      void lireTous().then(setSignalements);
    }, [])
  );

  return (
    <View style={styles.conteneur}>
      <FlatList
        data={signalements}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.liste}
        ListHeaderComponent={<ResumeStatistiques stats={calculerStatistiques(signalements)} />}
        ListEmptyComponent={
          <Text style={styles.vide}>Aucun signalement pour le moment.</Text>
        }
        renderItem={({ item }) => {
          const IconeCategorie = ICONES_CATEGORIE[item.categorie];

          return (
            <Pressable
              style={[styles.carte, { borderLeftColor: COULEURS_PRIORITE[item.priorite] }]}
              onPress={() => navigation.navigate('Details', { signalementId: item.id })}
              accessibilityRole="button"
            >
              <View style={styles.titreConteneur}>
                <IconeCategorie size={20} color={COULEURS.principale} />
                <Text style={styles.titre}>{item.titre}</Text>
              </View>
              <Text style={styles.info}>{LIBELLES_CATEGORIE[item.categorie]}</Text>
              <View style={styles.badges}>
                <Badge
                  texte={LIBELLES_PRIORITE[item.priorite]}
                  couleur={COULEURS_PRIORITE[item.priorite]}
                />
                <Badge
                  texte={LIBELLES_STATUT[item.statut]}
                  couleur={COULEURS_STATUT[item.statut]}
                />
              </View>
            </Pressable>
          );
        }}
      />
      <Pressable
        style={styles.bouton}
        onPress={() => navigation.navigate('Creation')}
        accessibilityRole="button"
      >
        <Plus size={20} color={COULEURS.texteSurPrincipale} />
        <Text style={styles.texteBouton}>Nouveau signalement</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  conteneur: { flex: 1, backgroundColor: COULEURS.fond },
  liste: { padding: ESPACEMENT.moyen, gap: ESPACEMENT.petit },
  vide: {
    textAlign: 'center',
    color: COULEURS.texteSecondaire,
    marginTop: ESPACEMENT.grand,
  },
  carte: {
    backgroundColor: COULEURS.carte,
    borderRadius: 10,
    borderWidth: 1,
    borderLeftWidth: 5,
    borderColor: COULEURS.bordure,
    padding: ESPACEMENT.moyen,
  },
  titreConteneur: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ESPACEMENT.petit,
    marginBottom: 4,
  },
  titre: { flex: 1, fontSize: 16, fontWeight: '600', color: COULEURS.texte },
  info: { fontSize: 14, color: COULEURS.texteSecondaire },
  badges: {
    flexDirection: 'row',
    gap: ESPACEMENT.petit,
    marginTop: ESPACEMENT.petit,
  },
  bouton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: ESPACEMENT.petit,
    backgroundColor: COULEURS.principale,
    margin: ESPACEMENT.moyen,
    padding: ESPACEMENT.moyen,
    borderRadius: 10,
  },
  texteBouton: { color: COULEURS.texteSurPrincipale, fontSize: 16, fontWeight: '600' },
});
