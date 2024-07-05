import post from '@/assets/data/posts.json';
import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, View, Text, Image } from 'react-native';

export default function Post() {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={{ uri: post[0].user.image_url }}
          style={styles.userImage}
        />
        <Text style={styles.userName}>{post[0].user.username}</Text>
      </View>
      <Image source={{ uri: post[0].image_url }} style={styles.postImage} />
      <View style={styles.buttonContainer}>
        <View style={styles.buttonSecondContainer}>
          <FontAwesome name='heart-o' size={25} color='black' />
          <FontAwesome name='comment-o' size={25} color='black' />
          <FontAwesome name='send-o' size={25} color='black' />
        </View>
        <FontAwesome name='bookmark-o' size={25} color='black' />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    gap: 10,
  },
  buttonContainer: {
    padding: 10,
    flexDirection: 'row',
  },
  buttonSecondContainer: { flexDirection: 'row', gap: 10, flex: 1 },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  postImage: {
    width: '100%',
    aspectRatio: 1,
  },
});
