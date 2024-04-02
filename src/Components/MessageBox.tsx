// Imports 
import React from 'react';
import { View, Text, Image, StyleSheet, Linking } from 'react-native';
// End of Imports

// Private Functions
export type ContentPart = {
  type: 'text' | 'image' | 'link';
  content: string;
  linkUrl?: string;
};

export const extractContent = (message: string): ContentPart[] => {
  const parts: ContentPart[] = [];
  const regex = /(!\[Img\]\((.*?)\))|(\[([^\]]+)\]\((.*?)\))/g;
  let lastIndex = 0;

  // Cleanup message and extract content parts
  message.replace(regex, (match, p1, imageUrl, p3, linkText, linkUrl, index) => {
    if (index > lastIndex) {
      parts.push({ type: 'text', content: message.substring(lastIndex, index) });
    }

    if (imageUrl) {
      parts.push({ type: 'image', content: imageUrl });
    } else if (linkUrl) {
      parts.push({ type: 'link', content: linkText, linkUrl });
    }

    lastIndex = index + match.length;
    return match;
  });

  // If there is sitll a message, we know it is text
  if (lastIndex < message.length) {
    parts.push({ type: 'text', content: message.substring(lastIndex) });
  }

  return parts;
};

type MessageProps = {
  message: string;
  fromBot: boolean;
};

const MessageBox: React.FC<MessageProps> = ({ message, fromBot }) => {
  const contentParts = extractContent(message);

  return (
    <View style={MessageStyles.messageContainer}>
      {fromBot && <Image source={require('../../public/Logo.png')} style={MessageStyles.profilePic} />}
      <View style={MessageStyles.messageContent}>
        {contentParts.map((part, index) => {
          switch (part.type) {
            case 'text':
              return <Text key={index} style={MessageStyles.messageText}>{part.content}</Text>;
            case 'image':
              // Images need to be handled outside of the Text component to stay inline
              return <Image key={index} source={{ uri: part.content }} style={MessageStyles.messageImage} />;
            case 'link':
              return (
                <Text key={index} style={MessageStyles.messageText}>
                  <Text style={MessageStyles.linkText} onPress={() => part.linkUrl && Linking.openURL(part.linkUrl)}>
                    {part.content}
                  </Text>
                </Text>
              );
            default:
              return null;
          }
        })}
      </View>
    </View>
  );
};

export default MessageBox;

const MessageStyles = StyleSheet.create({
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    padding: 10,
    backgroundColor: '#44475a', // Dracula selection color, for the message background
    borderRadius: 10, // Rounded corners for the message box
    borderWidth: 1,
    borderColor: '#6272a4', // Dracula comment color, for a subtle border
  },
  messageContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  messageText: {
    fontSize: 16,
    color: '#f8f8f2', // Dracula foreground color, for the text
  },
  messageImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  linkText: {
    color: '#8be9fd', // Dracula cyan, for links to make them stand out
    textDecorationLine: 'underline',
  },
});
