# AIHealthApp

AIHealthApp is a cutting-edge health application designed to provide highly accurate health information to users by leveraging advanced artificial intelligence (AI) technologies. By integrating Microsoft AI with other sophisticated AI services, the app can summarize and respond to user inquiries with remarkable precision.

## Key Features

- **Intelligent Summarization**: Using Microsoft AI, the app can distill complex health information into easily digestible summaries.
- **Accurate Responses**: With the aid of multiple AI services, users receive accurate and reliable answers to their health-related queries.
- **Secure Middleware**: Azure Serverless Functions serve as the middleware, ensuring a secure bridge between the frontend and AI services.
- **Privacy-First Approach**: No user data is transmitted over the internet. The app only sends anonymized requests to the server.
- **User Verification**: Incorporates Supabase for robust user authentication and verification.
- **Mobile-First Design**: Crafted with React Native and Expo for a seamless mobile user experience.
- **Python-Powered Backend**: The middleware is built on Python, offering powerful, flexible, and efficient data processing.

## Privacy and Security

Your privacy is our utmost priority. With AIHealthApp, rest assured that your data stays in your hands. We do not send any user data over the internet. Instead, only the necessary requests for processing are sent to our secure Azure functions.

## Getting Started

To get started with AIHealthApp, follow these simple steps:

1. **Clone the repository**:
    ```
    git clone https://github.com/OmarSiwy/AIHealthApp.git
    ```

2. **Install dependencies**:
    Navigate to your project directory and run:
    ```
    npm install
    ```

3. **Set up your environment**:
    Download EAS
    ```
    npm install -g eas-cli
    ```
    
    For IOS:
    ```
    eas build --profile development-simulator --platform ios
    ```

    For Android:
    ```
    eas build --profile development-simulator --platform android
    ```

5. **Start the application**:
    With your environment set up, launch the app using:
    ```
    npx expo start --dev-client
    ```

## Contributing

We welcome contributions from the community! If you'd like to improve AIHealthApp, feel free to fork the repository, make your changes, and create a pull request.

## License

AIHealthApp is released under the [MIT License](LICENSE).

## Acknowledgements

A special thank you to all the AI services and technologies that made this app possible, particularly Microsoft AI, Supabase, React Native, Expo, and Python.

For more information, questions, or feedback, please contact us through our GitHub repository.
