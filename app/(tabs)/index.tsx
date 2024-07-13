import Post from '@/components/Post';
import { StyleSheet, View, FlatList } from 'react-native';
import post from '@/assets/data/posts.json';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{ gap: 10, width: '100%' }}
        data={post}
        renderItem={({ item }) => <Post post={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
