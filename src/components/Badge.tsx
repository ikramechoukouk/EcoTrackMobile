import { StyleSheet, Text, View } from 'react-native';
import { COULEURS } from '../constants/theme';

type Props = { texte: string; couleur: string };

export default function Badge({ texte, couleur }: Props) {
return (
<View style={[styles.badge, { backgroundColor: couleur }]}>
<Text style={styles.texte}>{texte}</Text>
</View>
);
}

const styles = StyleSheet.create({
badge: { paddingVertical: 4, paddingHorizontal: 10, borderRadius: 12 },
texte: { color: COULEURS.texteSurPrincipale, fontSize: 12, fontWeight: '700' },
});