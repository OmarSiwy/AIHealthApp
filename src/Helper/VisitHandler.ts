// Imports
// Storage
import * as SecureStore from 'expo-secure-store';
// End of Imports

export const handleVisit = async (Item: string) => {
  try {
    await SecureStore.setItemAsync(Item, 'true');
    console.log('Item stored successfully');
  } catch (err) {
    console.error('Error storing the item:', err);
  }
};

export const CheckVisit = async (Item: string): Promise<boolean> => {
  try {
    const value = await SecureStore.getItemAsync(Item);
    return value === 'true';
  } catch (err) {
    console.error('Error retrieving the item:', err);
    return false;
  }
};
