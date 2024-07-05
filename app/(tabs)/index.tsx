import Post from '@/components/Post';
import { StyleSheet, View, Text } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Post />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
