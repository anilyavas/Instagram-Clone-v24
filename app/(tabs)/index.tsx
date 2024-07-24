import Post from '@/components/Post';
import { StyleSheet, View, FlatList, Alert } from 'react-native';
import post from '@/assets/data/posts.json';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/providers/AuthProvider';

export default function HomeScreen() {
  const [posts, setPosts] = useState();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    let { data, error } = await supabase
      .from('posts')
      .select('*, user:profiles(*)')
      .order('created_at', { ascending: false });
    if (error) {
      Alert.alert('Something went wrong');
    }
    setPosts(data);
    setLoading(false);
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
