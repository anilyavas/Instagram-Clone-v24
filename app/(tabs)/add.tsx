import { StyleSheet, View, Text } from 'react-native';

export default function AddScreen() {
  return (
    <View style={styles.container}>
      <Text>Hello second screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
