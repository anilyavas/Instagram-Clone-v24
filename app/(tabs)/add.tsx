import { useEffect, useState } from 'react';
import { StyleSheet, View, Image, TextInput, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Button from '@/components/Button';
import { cld } from '@/lib/cloudinary';
import { upload } from 'cloudinary-react-native';

export default function CreatePostScreen() {
  const [input, setInput] = useState('');
  const [image, setImage] = useState<string | null>(null);

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
  const uploadImage = async () => {
    if (!image) {
      return;
    } else {
      const options = {
        upload_preset: 'Default',
        unsigned: true,
      };
      await upload(cld, {
        file: image,
        options: options,
        callback: (error: any, response: any) => {
          console.log(error);
          console.log(response);
        },
      });
    }
  };
  const createPost = async () => {
    await uploadImage();
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
        value={input}
        onChangeText={(item) => setInput(item)}
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
