// Imports 
import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
// End of Imports

type TopBarProps = {
  toggleVoiceChat: () => void;
  isVoiceChatOn: boolean;
};

const TopBar: React.FC<TopBarProps> = ({ toggleVoiceChat, isVoiceChatOn }) => {
  return (
    <View style={TopBarStyles.topBar}>
      <Text style={TopBarStyles.chatTitle}>Chat with Iris</Text>
      <TouchableOpacity onPress={toggleVoiceChat} style={TopBarStyles.chatButton}>
        <MaterialIcons
          name={isVoiceChatOn ? 'headset-mic' : 'headset-off'}
          size={24}
          color="#F8F8F2"
        />
      </TouchableOpacity>
    </View>
  );
};

export default TopBar;

const TopBarStyles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#282a36', // Dracula theme background color
  },
  chatTitle: {
    color: '#F8F8F2', // Dracula theme text color
    fontSize: 20,
    fontFamily: 'Georgia',
  },
  chatButton: {
    // Style for the touchable opacity if needed
  },
});

