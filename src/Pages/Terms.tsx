// imports
import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

// Checking if Page got visited
import { CheckVisit, handleVisit } from '@/Helper/VisitHandler';

// Navigation
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackNavigatorParamsList } from '@/../App';
// end of imports 

// Private Variables
// End of Private Variables

export const Terms: React.FC<{}> = (): React.JSX.Element => {
  const navigation = useNavigation<StackNavigationProp<RootStackNavigatorParamsList>>();
  const scrollViewRef = React.useRef<ScrollView>(null);

  const scrollToSection = (sectionheight: number) => {
    scrollViewRef.current?.scrollTo({
      y: sectionheight,
      animated: true
    });
  };

  // Runs Only Once 
  React.useEffect(() => {
    CheckVisit("TermsVisited").then((visited) => {
      if (visited) {
        navigation.navigate("Login");
      }
    }).catch(() => {
      console.error("Error Checking Visit");
    });
  }, []);

  return(
    <SafeAreaView>
      <ScrollView ref={scrollViewRef} style={TermStyles.scrollView}>
        <View style={TermStyles.container}>
          {/* Terms and Conditions*/}
          <Text style={TermStyles.title}>Terms of Use</Text>

          <Text style={TermStyles.heading}>Secure Information Transmission</Text>
          <Text style={TermStyles.content}>
            Our service is designed to respect your privacy and the confidentiality of your information. 
            At no point do we transmit sensitive or personal data from your device. All interactions are 
            processed in a manner that prioritizes your security and privacy.
          </Text>

          <Text style={TermStyles.heading}>Accuracy of Information</Text>
          <Text style={TermStyles.content}>
            While our service aims to provide helpful and accurate information, 
            there is a risk that the bot might generate or relay incorrect or incomplete information. 
            We advise users to use their discretion and verify the information independently.
          </Text>

          <Text style={TermStyles.heading}>No Liability</Text>
          <Text style={TermStyles.content}>
            We are not liable for any decisions made based on the information provided by the bot.
            Users should consider the context and seek professional advice when necessary.
          </Text>

          {/* Accept Button */}
          <TouchableOpacity onPress={() => handleVisit("TermsVisited")} style={TermStyles.acceptButton}>
            <Text style={TermStyles.acceptButtonText}>I Understand and Accept</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const TermStyles = StyleSheet.create({
  scrollView: {
    marginHorizontal: 20,
    backgroundColor: '#f7f7f7',
  },
  container: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Times New Roman',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  tocItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
  },
  tocItemText: {
    fontSize: 18,
    fontFamily: 'Times New Roman', 
    color: '#007aff',
  },
  heading: {
    fontSize: 20,
    fontFamily: 'Times New Roman',
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    fontFamily: 'Times New Roman',
    marginBottom: 20,
    textAlign: 'justify',
  },
  acceptButton: {
    backgroundColor: '#007aff',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  acceptButtonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Times New Roman',
  },});
