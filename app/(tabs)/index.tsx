import Post from '@/components/Post';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import post from '@/assets/data/posts.json';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <FlatList data={post} renderItem={({ item }) => <Post item={item} />} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
