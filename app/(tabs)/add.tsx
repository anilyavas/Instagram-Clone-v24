import { useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TextInput,
  Text,
  Pressable,
} from 'react-native';

export default function CreatePostScreen() {
  const [input, setInput] = useState('');
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/1.jpg',
        }}
        style={styles.image}
      />

      <Text onPress={() => {}} style={styles.buttonText}>
        Change
      </Text>
      <TextInput
        value={input}
        onChangeText={(item) => setInput(item)}
        style={styles.input}
        placeholder='What is on your mind'
      />
      <View style={styles.footer}>
        <Pressable style={styles.shareButton}>
          <Text style={styles.shareText}>Share</Text>
        </Pressable>
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
  shareButton: {
    width: '95%',
    alignItems: 'center',
    backgroundColor: '#036bfc',
    borderRadius: 10,
  },
  shareText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'semibold',
    padding: 10,
  },
});
