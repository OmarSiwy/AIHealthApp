// imports
import React from 'react';
import { Image, Text, TextInput, Button, StyleSheet, KeyboardAvoidingView, Platform, View } from 'react-native';

// Navigation
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackNavigatorParamsList } from '@/../App';

// Supabase Specific
import { createClient } from '@supabase/supabase-js';
// end of imports 

// Private Variables
// Public SUPABASE Keys 
const supabaseUrl = 'https://bwudmwkoedffjuqdifdi.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3dWRtd2tvZWRmZmp1cWRpZmRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE3NDU4NzQsImV4cCI6MjAyNzMyMTg3NH0.1Xq_683Ue9Tz9fD3q3StutHiisLnMsff6PTcPi2wf5M';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
// End of Private Variables

export const Login: React.FC<{}> = (): React.JSX.Element => {
  const navigation = useNavigation<StackNavigationProp<RootStackNavigatorParamsList>>();

  // UI State Variables
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [message, setMessage] = React.useState<string>('');

  // Login/Signup Functions
  const handleLogin = async () => {
    await supabase.auth.signInWithPassword({ email, password }).then((response) => {
      if (response.error) { setMessage(response.error.message); return; }
      setMessage('Logged in successfully!');
      navigation.navigate("Info");
    });
  };

  const handleSignup = async () => {
    await supabase.auth.signUp({ email, password }).then((response) => {
      if (response.error) setMessage(response.error.message);
      setMessage('Check Your Email to Verify Account');
    });
  };

  // Run Only Once when navigated to
  React.useEffect(() => {
    // Checks if User is Already Logged In
    supabase.auth.getSession().then((response) => {
      console.log(response); // Add this line to log the response
      if (response.data.session) {
        navigation.navigate("Chat");
      }
    });
  }, []);

  return(
    <View style={LoginStyles.container}>
      <Image
        source={require('../../public/Logo.png')}
        style={{ width: 200, height: 200 }}
      />
      <Text style={LoginStyles.title}>Login</Text>
      <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
          >
        <TextInput
          style={LoginStyles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="Email"
          placeholderTextColor="#6272a4"
          keyboardType="email-address"
          keyboardAppearance="dark"
        />
        <TextInput
          style={LoginStyles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="Password"
          placeholderTextColor="#6272a4"
          secureTextEntry
          keyboardAppearance="dark"
        />
      <Button title="Sign Up" onPress={handleSignup} color="#ff79c6" />
      <Button title="Login" onPress={handleLogin} color="#ff79c6" />
      {message && <Text style={LoginStyles.message}>{message}</Text>}
    </KeyboardAvoidingView>
    </View>
  );
};


const LoginStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Center content vertically in the container
    alignItems: 'center', // Center content horizontally in the container
    backgroundColor: '#282a36',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f8f8f2',
    marginBottom: 20, // Adds some space below the title
  },
  input: {
    height: 40, // Fixed height for the inputs
    width: '80%', // Width relative to the container size
    minWidth: 200, // Minimum width for the inputs
    margin: 12, // Adds some space outside the borders of the input box
    borderWidth: 1,
    padding: 10, // Padding inside the input box, making text not stick to the borders
    color: '#f8f8f2',
    borderColor: '#6272a4',
    borderRadius: 5, // Optional: Adds rounded corners to your input boxes
  },
  message: {
    color: '#50fa7b',
    marginTop: 20, // Adds some space above the message text
  },
});

