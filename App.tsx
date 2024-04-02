// imports
import React from 'react';

// Navigation Specific
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Pages Imported
import { Terms } from '@/Pages/Terms';
import { Login } from '@/Pages/Login';
import { Info } from '@/Pages/Info';
import { Chat } from '@/Pages/Chat';
// End of imports 

// Private Variables
const Stack = createNativeStackNavigator<RootStackNavigatorParamsList>();

export type RootStackNavigatorParamsList = {
  Terms: undefined;
  Chat: undefined;
  Info: undefined;
  Login: undefined;
};
// End of Private Variables

const App: React.FC<{}> = (): React.JSX.Element => {
  // Run Before Every Render
  React.useEffect(() => {
    
  }, []);

  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Info"
        component={Info}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Terms"
        component={Terms}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Chat" 
        component={Chat}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

export default App;
