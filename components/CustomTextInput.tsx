import { Text, TextInput, StyleSheet, View } from 'react-native';
export default function CustomTextInput({ label, ...TextInputProps }) {
  return (
    <View>
      <Text style={styles.usernameTitle}>{label}</Text>
      <TextInput {...TextInputProps} style={styles.username} />
    </View>
  );
}

const styles = StyleSheet.create({
  usernameTitle: {
    marginBottom: 5,
    marginLeft: 5,
    color: 'grey',
    fontWeight: 'semibold',
  },
  username: {
    borderColor: 'grey',
    borderWidth: 0.5,
    padding: 10,
  },
});
