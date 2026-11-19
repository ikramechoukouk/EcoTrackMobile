import { Pressable, StyleSheet, Text } from 'react-native';
import { COULEURS, ESPACEMENT } from '../constants/theme';

type Props = {
titre: string;
onPress: () => void;
desactive?: boolean;
};

export default function BoutonPrincipal({ titre, onPress, desactive }: Props) {
return (
<Pressable
style={[styles.bouton, desactive && styles.desactive]}
onPress={onPress}
disabled={desactive}
>
<Text style={styles.texte}>{titre}</Text>
</Pressable>
);
}

const styles = StyleSheet.create({
bouton: {
backgroundColor: COULEURS.principale,
padding: ESPACEMENT.moyen,
borderRadius: 10,
alignItems: 'center',
},
desactive: { opacity: 0.5 },
texte: { color: COULEURS.texteSurPrincipale, fontSize: 16, fontWeight: '600' },
});