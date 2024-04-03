// Imports 
import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';
// End of Imports

type ChatBarProps = {
  chat: string;
  setChat: (chat: string) => void;
  sendMessage: () => void;
};

const ChatBar: React.FC<ChatBarProps> = ({ chat, setChat, sendMessage }) => {
  return (
    <View style={ChatBarStyles.container}>
      <TextInput
        value={chat}
        onChangeText={setChat}
        placeholder="Type a message..."
        placeholderTextColor="#6272a4" // Dracula comment color
        style={ChatBarStyles.input}
        keyboardAppearance="dark"
      />
      <TouchableOpacity onPress={sendMessage} style={ChatBarStyles.button}>
        <Text style={ChatBarStyles.buttonText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChatBar;

const ChatBarStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#282a36',
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    marginRight: 10,
    backgroundColor: '#44475a',
    color: '#f8f8f2',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  button: {
    backgroundColor: '#50fa7b',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonText: {
    color: '#282a36',
    fontWeight: 'bold',
    fontFamily: 'Georgia',
  },
});
