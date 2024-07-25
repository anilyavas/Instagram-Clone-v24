import { View, Text, StyleSheet, Image, TextInput, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import Button from '@/components/Button';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/providers/AuthProvider';
import CustomTextInput from '@/components/CustomTextInput';
import { cld, uploadImage } from '@/lib/cloudinary';
import { thumbnail } from '@cloudinary/url-gen/actions/resize';
import { AdvancedImage } from 'cloudinary-react-native';

const ProfileScreen = () => {
  const [image, setImage] = useState<string | null>(null);
  const [remoteImage, setRemoteImage] = useState<string | null>(null);
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    if (!user) {
      return;
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) {
      Alert.alert('Failed to fetch the profile');
    }
    setUsername(data.username);
    setBio(data.bio);
    setRemoteImage(data.avatar_url);
  };

  const updateProfile = async () => {
    if (!user) {
      return;
    }

    const updatedProfile = {
      id: user.id,
      username,
      bio,
    };

    if (image) {
      const response = await uploadImage(image);
      console.log(response.public_id);
      updatedProfile.avatar_url = response.public_id;
    }

    const { data, error } = await supabase
      .from('profiles')
      .update(updatedProfile);

    if (error) {
      Alert.alert('Failed to update profile');
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  let remoteCloudinaryImage;
  if (remoteImage) {
    remoteCloudinaryImage = cld.image(remoteImage);
    remoteCloudinaryImage.resize(thumbnail().width(300).height(300));
  }
  return (
    <View style={styles.container}>
      {image ? (
        <Image
          source={{
            uri: image,
          }}
          style={styles.image}
        />
      ) : remoteCloudinaryImage ? (
        <AdvancedImage cldImg={remoteCloudinaryImage} style={styles.image} />
      ) : (
        <View style={styles.image} />
      )}
      <Text onPress={pickImage} style={styles.buttonText}>
        Change
      </Text>
      <View style={styles.textinputContainer}>
        <CustomTextInput
          label='Username'
          placeholder='Username'
          value={username}
          onChangeText={setUsername}
        />
        <CustomTextInput
          label='Bio'
          placeholder='Bio'
          value={bio}
          onChangeText={setBio}
        />
      </View>
      <View style={styles.footer}>
        <Button title='Update' onPress={updateProfile} />
        <Button title='Sign out' onPress={() => supabase.auth.signOut()} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  image: {
    width: 200,
    aspectRatio: 1,
    borderRadius: 100,
    backgroundColor: 'lightgrey',
    margin: 10,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#036bfc',
    alignSelf: 'center',
    padding: 10,
  },

  footer: {
    marginTop: 'auto',
    gap: 5,
  },
  textinputContainer: {
    gap: 5,
  },
});
export default ProfileScreen;
