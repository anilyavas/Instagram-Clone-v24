import { Pressable, Text, StyleSheet } from 'react-native';

type ButtonProps = {
  title: String;
  onPress: () => void;
};

export default function Button({ title, onPress }: ButtonProps) {
  return (
    <Pressable onPress={onPress} style={styles.shareButton}>
      <Text style={styles.shareText}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  shareButton: {
    marginTop: 'auto',
    width: '95%',
    alignItems: 'center',
    backgroundColor: '#036bfc',
    borderRadius: 10,
    alignSelf: 'center',
  },
  shareText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'semibold',
    padding: 10,
  },
});
