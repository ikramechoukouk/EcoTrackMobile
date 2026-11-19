import { StyleSheet, Text, View } from 'react-native';
import { ESPACEMENT } from '../constants/theme';

type Props = { erreurs: string[] };

export default function ListeErreurs({ erreurs }: Props) {
if (erreurs.length === 0) return null;

return (
<View style={styles.conteneur}>
{erreurs.map((erreur) => (
<Text key={erreur} style={styles.texte}>
• {erreur}
</Text>
))}
</View>
);
}

const styles = StyleSheet.create({
conteneur: {
backgroundColor: '#FDECEA',
borderWidth: 1,
borderColor: '#F5C2C0',
borderRadius: 10,
padding: ESPACEMENT.petit + 4,
gap: 4,
},
texte: { color: '#B3261E', fontSize: 14 },
});