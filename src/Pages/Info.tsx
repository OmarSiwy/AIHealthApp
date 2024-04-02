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
  require('../../assets/InfoPage.png'),
  require('../../assets/InfoPage.png'),
  require('../../assets/InfoPage.png'),
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
    CheckVisit("InfoVisited").then((visited) => {
      if (visited) {
        navigation.navigate("Terms");
      }
    }).catch(() => {
      console.error("Error Checking Visit");
    });
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
    setNextIndex((nextIndex + 1));
    setActiveIndex(nextIndex);

    if (activeIndex === Images.length - 1) {
      handleVisit("InfoVisited");
      navigation.navigate("Chat");
    }
  };

  return(
    <SafeAreaView style={InfoStyles.container}>
      {/* Image */}
      <View style={InfoStyles.imageContainer}>
        <Animated.View style={{ ...InfoStyles.fullSize, transform: [{ translateX: currentSlideAnim }] }}>
          <Image style={InfoStyles.fullSize} source={Images[activeIndex]} />
        </Animated.View>

        <Animated.View style={{ ...InfoStyles.fullSize, position: 'absolute', transform: [{ translateX: nextSlideAnim }] }}>
          <Image style={InfoStyles.fullSize} source={nextIndex < Images.length ? Images[nextIndex] : null} />
        </Animated.View>
      </View>

      {/* Image Description */}
      <View>
        <Text></Text>
      </View>

      {/* Progress Bars */}
      <View style={InfoStyles.barsContainer}>
        {Images.map((_, index) => (
          <View key={index} style={[InfoStyles.bar, activeIndex === index && InfoStyles.activeBar]} />
        ))}
      </View>

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
    width: 300,
    height: 200,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
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
    fontWeight: 'bold',
  },
});


