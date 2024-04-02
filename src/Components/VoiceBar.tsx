// Imports 
import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, } from 'react-native';
// End of Imports

type VoiceBarProps = {
  isRecording: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
};

const VoiceBar: React.FC<VoiceBarProps> = ({ isRecording, onStartRecording, onStopRecording }) => {
  const [seconds, setSeconds] = React.useState<number>(0);

  React.useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isRecording) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else {
      setSeconds(0);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording]);

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <View style={VoiceBarStyles.container}>
      {!isRecording ? (
        <TouchableOpacity onPress={onStartRecording} style={VoiceBarStyles.button}>
          <Text style={VoiceBarStyles.buttonText}>Start</Text>
        </TouchableOpacity>
      ) : (
        <View style={VoiceBarStyles.recordingContainer}>
          <Text style={VoiceBarStyles.timerText}>{formatTime(seconds)}</Text>
          <TouchableOpacity onPress={onStopRecording} style={VoiceBarStyles.stopButton}>
            <Text style={VoiceBarStyles.buttonText}>Stop</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default VoiceBar;


const VoiceBarStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#282a36',
    padding: 20,
    borderRadius: 25,
  },
  button: {
    backgroundColor: '#50fa7b',
    width: 80, // Set width for a bigger button
    height: 80, // Set height for a bigger button
    borderRadius: 40, // Ensure this is half of width/height to make it circular
    alignItems: 'center', // Center the text horizontally
    justifyContent: 'center', // Center the text vertically
  },
  buttonText: {
    color: '#282a36',
    fontWeight: 'bold',
  },
  recordingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timerText: {
    color: '#f8f8f2',
    marginRight: 20,
    fontSize: 16,
  },
  stopButton: {
    backgroundColor: '#ff5555',
    width: 80, // Set width for a bigger button
    height: 80, // Set height for a bigger button
    borderRadius: 40, // Ensure this is half of width/height to make it circular
    alignItems: 'center', // Center the text horizontally
    justifyContent: 'center', // Center the text vertically
  },
});

