import { StyleSheet, Text, TextInput, View } from 'react-native';
import { COULEURS, ESPACEMENT } from '../constants/theme';

type Props = {
libelle: string;
valeur: string;
onChangement: (texte: string) => void;
placeholder?: string;
multiligne?: boolean;
};

export default function ChampTexte({ libelle, valeur, onChangement, placeholder, multiligne }: Props) {
return (
<View style={styles.conteneur}>
<Text style={styles.libelle}>{libelle}</Text>
<TextInput
style={[styles.champ, multiligne && styles.multiligne]}
value={valeur}
onChangeText={onChangement}
placeholder={placeholder}
placeholderTextColor={COULEURS.texteSecondaire}
multiline={multiligne}
textAlignVertical={multiligne ? 'top' : 'center'}
/>
</View>
);
}

const styles = StyleSheet.create({
conteneur: { gap: 6 },
libelle: { fontSize: 15, fontWeight: '600', color: COULEURS.texte },
champ: {
backgroundColor: COULEURS.carte,
borderWidth: 1,
borderColor: COULEURS.bordure,
borderRadius: 10,
padding: ESPACEMENT.petit + 4,
fontSize: 16,
color: COULEURS.texte,
},
multiligne: { minHeight: 100 },
});