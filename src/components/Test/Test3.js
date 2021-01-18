import React, {useState} from 'react';
import {Button, TextInput, Text} from 'react-native';
import auth from '@react-native-firebase/auth';

export default function PhoneSignIn() {
  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);

  const [code, setCode] = useState('');

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber) {
    try {
      console.log(phoneNumber);
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      console.log(confirmation);
      setConfirm(confirmation);
      console.log(phoneNumber);
    } catch (err) {
      console.log(err);
    }
  }

  async function confirmCode() {
    try {
      console.log(code);
      await confirm.confirm(code);
      console.log(code + 'is valid');
      alert('gd');
    } catch (error) {
      console.log('Invalid code.');
    }
  }
  console.log(confirm);
  if (!confirm) {
    return (
      <>
        <Text>dsfsfdsfsd</Text>
        <Text>dsfsfdsfsd</Text>
        <Text>dsfsfdsfsd</Text>
        <Text>dsfsfdsfsd</Text>
        <Button
          title="Phone Number Sign In"
          onPress={() => signInWithPhoneNumber('+82123421421')}
        />
      </>
    );
  } else {
    return (
      <>
        <Text>dsfsfdsfsd</Text>
        <Text>dsfsfdsfsd</Text>
        <Text>dsfsfdsfsd</Text>
        <Text>dsfsfdsfsd</Text>
        <Text>dsfsfdsfsd</Text>
        <TextInput value={code} onChangeText={(text) => setCode(text)} />
        <Button title="Confirm Code" onPress={() => confirmCode()} />
      </>
    );
  }
}
