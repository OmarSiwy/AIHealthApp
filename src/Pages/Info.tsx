// imports
import React from 'react';
import { SafeAreaView, Animated, Image, View, TouchableOpacity, Text, StyleSheet } from 'react-native';

// Navigation
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackNavigatorParamsList } from '@/../App';

// Checking if Page got visited
import { CheckVisit, handleVisit } from '@/Helper/VisitHandler';
// end of imports

// Private Variables
const Images = [
  require('../../assets/ChatExample.png'),
  require('../../assets/ChatExample2.png'),
  require('../../assets/VoiceExample.png'),
];
const ImageTexts = [
  "As seen above, this is the chatbox that you write into",
  "The AI Responds with a message, where you are allowed to ask more questions",
  "You can even respond with voice commands if you click the headphones"
];
// End of Private Variables

export const Info: React.FC<{}> = (): React.JSX.Element => {
  const navigation = useNavigation<StackNavigationProp<RootStackNavigatorParamsList>>();

  // Animation Specific UI State 
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [nextIndex, setNextIndex] = React.useState(1);
  const currentSlideAnim = React.useRef(new Animated.Value(0)).current;
  const nextSlideAnim = React.useRef(new Animated.Value(0)).current;

  // Run Only once when navigated to 
  React.useEffect(() => {
    /*CheckVisit("InfoVisited").then((visited) => {
      if (visited) {
        navigation.navigate("Terms");
      }
    }).catch(() => {
      console.error("Error Checking Visit");
    });*/
  }, []);

  // Run Whenever Index Changes
  React.useEffect(() => {
    if (activeIndex === 0) return;
    currentSlideAnim.setValue(0);
    Animated.timing(currentSlideAnim, {
      toValue: -400,
      duration: 300,
      useNativeDriver: true,
    }).start();

    nextSlideAnim.setValue(400);
    Animated.timing(nextSlideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [nextIndex]);

  // Handles When Next is Pressed
  const handleNextPress = () => {
    console.log(activeIndex);
    setActiveIndex(nextIndex);
    setNextIndex((nextIndex + 1));

    if (activeIndex === Images.length - 1) {
      handleVisit("InfoVisited");
      navigation.navigate("Terms");
    }
  };

  return(
    <SafeAreaView style={InfoStyles.container}>
      {/* Image */}
      <View style={InfoStyles.imageContainer}>
        <Animated.View style={{ ...InfoStyles.fullSize, transform: [{ translateX: currentSlideAnim }] }}>
          <Image style={InfoStyles.image} source={Images[activeIndex]} />
        </Animated.View>

        <Animated.View style={{ ...InfoStyles.fullSize, transform: [{ translateX: nextSlideAnim }] }}>
          <Image style={InfoStyles.image} source={nextIndex < Images.length ? Images[activeIndex] : null} />
        </Animated.View>
      </View>


      {/* Progress Bars */}
      <View style={InfoStyles.barsContainer}>
        {Images.map((_, index) => (
          <View key={index} style={[InfoStyles.bar, activeIndex === index && InfoStyles.activeBar]} />
        ))}
      </View>

      {/* Image Description */}
      <Text style={InfoStyles.imageDescription}>{ImageTexts[activeIndex]}</Text>

      {/* Next Button */}
      <TouchableOpacity style={InfoStyles.nextButton} onPress={handleNextPress}>
        <Text style={InfoStyles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const InfoStyles = StyleSheet.create({
  fullSize: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: 20,
    backgroundColor: '#EFF1F3',
  },
  imageContainer: {
    overflow: 'hidden',
    height: 500,
    flexDirection: 'row', // Align children views in a row
    width: '90%'
  },
  image: {
    flex: 1,
    height: undefined, // Example fixed height, adjust based on your needs
    width: undefined,
    resizeMode: 'contain',
  },
  barsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  bar: {
    height: 5,
    width: 50,
    backgroundColor: '#CDD6F4',
    marginHorizontal: 5,
    padding: 5,
  },
  activeBar: {
    backgroundColor: '#A6E3A1',
  },
  nextButton: {
    backgroundColor: '#1E1E2E',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  nextButtonText: {
    color: '#A6E3A1',
    fontSize: 18,
    fontFamily: 'Georgia',
    fontWeight: 'bold',
  },
  imageDescription: {
    fontSize: 16,
    color: '#1E1E2E', // Choose a color that fits your design
    textAlign: 'center', // Center the text if desired
    fontFamily: 'Georgia',
    paddingHorizontal: 50, // Add some horizontal padding if the text is too close to the screen edges
  },
});


