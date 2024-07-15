import Post from '@/components/Post';
import { StyleSheet, View, FlatList, Alert } from 'react-native';
import post from '@/assets/data/posts.json';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function HomeScreen() {
  const [posts, setPosts] = useState();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    let { data, error } = await supabase
      .from('posts')
      .select('*, user:profiles(*)');
    if (error) {
      Alert.alert('Something went wrong');
    } else {
      setPosts(data);
    }
    console.log(posts);
  };

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{ gap: 10, width: '100%' }}
        data={posts}
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
