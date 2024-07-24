import { View, Text, StyleSheet, Image, TextInput, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import Button from '@/components/Button';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/providers/AuthProvider';

const ProfileScreen = () => {
  const [image, setImage] = useState<string | null>(null);
  const [username, setUsername] = useState('');
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
  };

  const updateProfile = async () => {
    if (!user) {
      return;
    }

    const { data, error } = await supabase.from('profiles').update({
      id: user.id,
      username,
    });

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
      <Text style={styles.usernameTitle}>Username</Text>
      <TextInput
        placeholder='Username'
        value={username}
        onChangeText={setUsername}
        style={styles.username}
      />
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
  username: {
    borderColor: 'grey',
    borderWidth: 0.5,
    padding: 10,
  },
  usernameTitle: {
    marginBottom: 5,
    marginLeft: 5,
    color: 'grey',
    fontWeight: 'semibold',
  },
  footer: {
    marginTop: 'auto',
    gap: 5,
  },
});
export default ProfileScreen;
