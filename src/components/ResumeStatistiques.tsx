import { StyleSheet, Text, View } from 'react-native';
import { COULEURS, ESPACEMENT } from '../constants/theme';
import { Statistiques } from '../utils/statistiques';

type Props = { stats: Statistiques };

export default function ResumeStatistiques({ stats }: Props) {
const tuiles = [
{ libelle: 'Total', valeur: stats.total },
{ libelle: 'Urgents', valeur: stats.urgents },
{ libelle: 'Clôturés', valeur: stats.clotures },
];

return (
<View style={styles.conteneur}>
{tuiles.map((tuile) => (
<View key={tuile.libelle} style={styles.tuile}>
<Text style={styles.valeur}>{tuile.valeur}</Text>
<Text style={styles.libelle}>{tuile.libelle}</Text>
</View>
))}
</View>
);
}

const styles = StyleSheet.create({
conteneur: { flexDirection: 'row', gap: ESPACEMENT.petit, marginBottom: ESPACEMENT.petit },
tuile: {
flex: 1,
alignItems: 'center',
backgroundColor: COULEURS.carte,
borderWidth: 1,
borderColor: COULEURS.bordure,
borderRadius: 10,
padding: ESPACEMENT.moyen - 4,
},
valeur: { fontSize: 22, fontWeight: '700', color: COULEURS.principale },
libelle: { fontSize: 13, color: COULEURS.texteSecondaire },
});