import { Pressable, StyleSheet, Text, View } from 'react-native';
import { COULEURS, ESPACEMENT } from '../constants/theme';

export type Option<T extends string> = { valeur: T; libelle: string };

type Props<T extends string> = {
libelle: string;
options: Option<T>[];
selection?: T;
onSelection: (valeur: T) => void;
};

export default function SelecteurOptions<T extends string>({
libelle,
options,
selection,
onSelection,
}: Props<T>) {
return (
<View style={styles.conteneur}>
<Text style={styles.libelle}>{libelle}</Text>
<View style={styles.options}>
{options.map((option) => {
const actif = option.valeur === selection;
return (
<Pressable
key={option.valeur}
style={[styles.option, actif && styles.optionActive]}
onPress={() => onSelection(option.valeur)}
>
<Text style={[styles.texte, actif && styles.texteActif]}>{option.libelle}</Text>
</Pressable>
);
})}
</View>
</View>
);
}

const styles = StyleSheet.create({
conteneur: { gap: 6 },
libelle: { fontSize: 15, fontWeight: '600', color: COULEURS.texte },
options: { flexDirection: 'row', flexWrap: 'wrap', gap: ESPACEMENT.petit },
option: {
paddingVertical: 10,
paddingHorizontal: ESPACEMENT.moyen,
borderRadius: 20,
borderWidth: 1,
borderColor: COULEURS.bordure,
backgroundColor: COULEURS.carte,
},
optionActive: { backgroundColor: COULEURS.principale, borderColor: COULEURS.principale },
texte: { fontSize: 14, color: COULEURS.texte },
texteActif: { color: COULEURS.texteSurPrincipale, fontWeight: '600' },
});