// imports
import React from 'react';
import { FlatList, StyleSheet, KeyboardAvoidingView, Platform, ListRenderItemInfo, SafeAreaView, Alert } from 'react-native';

// Components
import ChatBar from '@/Components/ChatBar';
import VoiceBar from '@/Components/VoiceBar';
import MessageBox from '@/Components/MessageBox';
import TopBar from '@/Components/TopBar';

// Azure API 
import { PostRequests } from '@/Helper/APIHandler';

// Voice 
import Voice from '@react-native-voice/voice';
import * as Speech from 'expo-speech';
import { Audio } from "expo-av";

// keyExtractor
import { extracttext } from '@/Components/MessageBox'
// end of imports 

// Private Variables
type Message = {
  id: number;
  text: string;
  fromBot: boolean;
};
const soundObject = new Audio.Sound();
// End of Private Variables


export const Chat: React.FC = () => {
  const [chat, setChat] = React.useState<string>('');
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [isVoiceChatOn, setIsVoiceChatOn] = React.useState<boolean>(false);
  const [isRecording, setIsRecording] = React.useState<boolean>(false);
  const [recordingdata, setRecordingData] = React.useState<string[]>([]);

  // Run Before Every render, and at the end of the component life span
  React.useEffect(() => {
    Voice.onSpeechError = (error) => {console.log(error)};
    Voice.onSpeechResults = (result) => {
      if (result.value) setRecordingData(result.value);
    };

    return () => {
      Voice.destroy().then(() => Voice.removeAllListeners());
    }
  }, []);

  const toggleVoiceChat = () => {
    setIsVoiceChatOn((prev) => !prev);
    Speech.stop();
    if (isRecording) stopRecording();
  };

  const startRecording = async () => {
    setIsRecording(true);
    await Voice.start('en-US');
    Speech.stop();
  };

  const stopRecording = async () => {
    setIsRecording(false);
    await Voice.stop();
    setChat(recordingdata.join(" "));
    sendMessage();
  };

  const EnableSound = async (Item: string) => {
    if (Platform.OS === "ios") {
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
        });
        await soundObject.loadAsync(require("../../public/soundFile.mp3"));
        await soundObject.playAsync();
      }

      setInterval(() => {
        Speech.speak(Item);
      }, 1000);
  };

  // Function to deal with sending a message over
  const sendMessage = async () => {
    if (chat.trim().length > 0) {
      const chattemp = chat;
      console.log(chattemp);
      setChat('');
      const newMessage: Message = { id: Date.now(), text: chattemp, fromBot: false };
      setMessages((previousMessages) => [...previousMessages, newMessage]);

      // API Response
      const response = await PostRequests(newMessage.text);
      console.log(response);
      const botResponse: Message = { id: Date.now(), text: response, fromBot: true };
      setMessages((previousMessages) => [...previousMessages, botResponse]);
      if (isVoiceChatOn && !isRecording) { await EnableSound(extracttext(response)); }
    }
  };

  const renderItem = ({ item }: ListRenderItemInfo<Message>) => (
    <MessageBox message={item.text} fromBot={item.fromBot} />
  );

  return (
    <KeyboardAvoidingView
      style={ChatStyles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
    >
      <SafeAreaView>
        <TopBar toggleVoiceChat={toggleVoiceChat} isVoiceChatOn={isVoiceChatOn} />
      </SafeAreaView>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        style={ChatStyles.messagesList}
      />

      {isVoiceChatOn ? (
        <VoiceBar isRecording={isRecording} onStartRecording={startRecording} onStopRecording={stopRecording} />
      ) : (
        <ChatBar chat={chat} setChat={setChat} sendMessage={sendMessage} />
      )}
    </KeyboardAvoidingView>
  );
};

const ChatStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282a36',
  },
  messagesList: {
    flex: 1,
  },
});
