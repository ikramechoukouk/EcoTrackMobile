import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Camera, Image as ImageIcon, Trash2 } from 'lucide-react-native';
import { COULEURS, ESPACEMENT } from '../constants/theme';

type Props = {
  photoUri?: string;
  onGalerie: () => void;
  onCamera: () => void;
  onRetirer: () => void;
};

export default function SelecteurPhoto({ photoUri, onGalerie, onCamera, onRetirer }: Props) {
  return (
    <View style={styles.conteneur}>
      <Text style={styles.libelle}>Photo (facultatif)</Text>
      {photoUri && <Image source={{ uri: photoUri }} style={styles.apercu} />}
      <View style={styles.boutons}>
        <Pressable style={styles.bouton} onPress={onGalerie}>
          <ImageIcon size={18} color={COULEURS.texte} />
          <Text style={styles.texte}>Galerie</Text>
        </Pressable>
        <Pressable style={styles.bouton} onPress={onCamera}>
          <Camera size={18} color={COULEURS.texte} />
          <Text style={styles.texte}>Caméra</Text>
        </Pressable>
        {photoUri && (
          <Pressable style={styles.bouton} onPress={onRetirer}>
            <Trash2 size={18} color={COULEURS.texte} />
            <Text style={styles.texte}>Retirer</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  conteneur: { gap: 6 },
  libelle: { fontSize: 15, fontWeight: '600', color: COULEURS.texte },
  apercu: { width: '100%', height: 200, borderRadius: 10 },
  boutons: { flexDirection: 'row', gap: ESPACEMENT.petit },
  bouton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: ESPACEMENT.moyen,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COULEURS.bordure,
    backgroundColor: COULEURS.carte,
  },
  texte: { fontSize: 14, color: COULEURS.texte },
});