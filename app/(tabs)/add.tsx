import { useEffect, useState } from 'react';
import { StyleSheet, View, Image, TextInput, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Button from '@/components/Button';
import { uploadImage } from '@/lib/cloudinary';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/providers/AuthProvider';
import { router } from 'expo-router';

export default function CreatePostScreen() {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const { session } = useAuth();

  useEffect(() => {
    if (!image) {
      pickImage();
    }
  }, [image]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const createPost = async () => {
    if (!image) {
      return;
    }
    const response = await uploadImage(image);

    console.log('image id: ', response?.public_id);

    const { data, error } = await supabase
      .from('posts')
      .insert([
        { caption, image: response?.public_id, user_id: session?.user.id },
      ])
      .select();
    router.push('/(tabs)');
  };

  return (
    <View style={styles.container}>
      {image ? (
        <Image
          source={{
            uri: image,
          }}
          style={styles.image}
        />
      ) : (
        <View style={styles.image} />
      )}

      <Text onPress={pickImage} style={styles.buttonText}>
        Change
      </Text>
      <TextInput
        value={caption}
        onChangeText={(item) => setCaption(item)}
        style={styles.input}
        placeholder='What is on your mind'
      />
      <View style={styles.footer}>
        <Button title='Share' onPress={createPost} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    gap: 10,
  },
  footer: {
    marginTop: 'auto',
    width: '100%',
    alignItems: 'center',
  },
  image: {
    width: 200,
    aspectRatio: 3 / 4,
    borderRadius: 10,
    backgroundColor: 'lightgrey',
    margin: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#036bfc',
  },
  input: {
    width: '100%',
    padding: 10,
  },
});
