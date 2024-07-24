import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, View, Text, useWindowDimensions } from 'react-native';
import { AdvancedImage } from 'cloudinary-react-native';

import { thumbnail } from '@cloudinary/url-gen/actions/resize';
import { focusOn } from '@cloudinary/url-gen/qualifiers/gravity';
import { FocusOn } from '@cloudinary/url-gen/qualifiers/focusOn';
import { byRadius } from '@cloudinary/url-gen/actions/roundCorners';

import { cld } from '@/lib/cloudinary';

type Post = {
  id: String;
  image: String;
  image_url: String;
  caption: String;
  user: {
    id: String;
    username: String;
    image_url: String;
    avatar_url: String;
  };
};

export default function Post({ post }: { post: Post | any }) {
  const { width } = useWindowDimensions();

  const image = cld.image(post.image);
  image.resize(thumbnail().width(width).height(width));

  const avatar = cld.image(
    post.user.avatar_url ||
      'png-transparent-user-interface-design-computer-icons-default-stephen-salazar-graphy-user-interface-design-computer-wallpaper-sphere-thumbnail_kumxbc'
  );
  avatar.resize(
    thumbnail().width(48).height(48).gravity(focusOn(FocusOn.face()))
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <AdvancedImage cldImg={avatar} style={styles.userImage} />
        <Text style={styles.userName}>{post.user.username || 'New user'}</Text>
      </View>
      <AdvancedImage cldImg={image} style={styles.advancedImg} />
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
  advancedImg: {
    width: '100%',
    aspectRatio: 4 / 3,
  },
});
