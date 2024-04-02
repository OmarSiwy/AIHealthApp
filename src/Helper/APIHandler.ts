// Imports 
import { supabase } from '@/Pages/Login';
// End of Imports

// Private Variables
const AzureUrl = "https://healthbottalk.azurewebsites.net/api/sendrequest";
// End of Private Variables

export const PostRequests = async (req: string): Promise<string> => {
  try {
    const session = await supabase.auth.getSession();
    const token = session.data?.session?.access_token;

    if (!token) {
      console.error('No token found');
      return "No token found";
    }

    const response = await fetch(AzureUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: req
    });

    if (response.ok) {
      const data = await response.text();
      console.log(data);
      return data;
    } else {
      console.error('Response from Azure Function was not OK:', response.statusText);
      return 'Response from Azure Function was not OK';
    }
  } catch (error) {
    console.error('Error fetching from Azure Function:', error);
    return 'Error fetching from Azure Function';
  }
};

