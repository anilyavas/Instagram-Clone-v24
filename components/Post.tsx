import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, View, Text, Image } from 'react-native';

type Post = {
  id: String;
  image_url: String;
  caption: String;
  user: {
    id: String;
    username: String;
    image_url: String;
    avatar_url: String;
  };
};
export default function Post({ item }: { item: Post }) {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={{ uri: item.user.image_url }} style={styles.userImage} />
        <Text style={styles.userName}>{item.user.username}</Text>
      </View>
      <Image source={{ uri: item.image_url }} style={styles.postImage} />
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
  buttonSecondContainer: {
    flexDirection: 'row',
    gap: 15,
    flex: 1,
  },
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
