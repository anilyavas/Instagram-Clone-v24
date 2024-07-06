import Post from '@/components/Post';
import { StyleSheet, View, FlatList } from 'react-native';
import post from '@/assets/data/posts.json';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{ gap: 10 }}
        data={post}
        renderItem={({ item }) => <Post item={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
