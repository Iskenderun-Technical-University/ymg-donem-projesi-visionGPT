[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/QA5O9x4M)

# VisionGPT

VisionGPT is a mobile application that allows users to read text from photos and communicate with the ChatGPT API to receive responses based on the text.

## About the Project

This mobile application is developed using React Native. The app enables users to take a photo with their camera or select an existing photo from their device. Then, the text in the photo is detected and read using OCR (Optical Character Recognition) technology and sent to the ChatGPT API. The ChatGPT API accepts the text as a prompt and returns a response to the user.

## Screenshot

![newIphoneSS](https://user-images.githubusercontent.com/83416622/235541641-a189f723-0fd6-4d08-8114-d90b6c55e519.png)

## Features

- Photo capturing and selection functionality
- Reading text from photos using OCR
- Communicating with the ChatGPT API
- Displaying responses from the ChatGPT API

## Roadmap

- ✅ Design user interface
- ✅ Use iOS and Android camera
- ✅ Detect text in images with OCR
- ✅ Solve questions in detected images with GPT 
- 🔄 UI improvements and login (soon)
- 🔄 Firebase database and user actions
- 🔄 Detect objects in images (soon)
- 🔄 Communicate detected objects to the user with voice and NLP (soon)


## Technologies

- React Native
- OCR (Optical Character Recognition)
- ChatGPT API

## Installation

1. Clone or download this repository:

`git clone https://github.com/Iskenderun-Technical-University/ymg-donem-projesi-visionGPT`


2. Install dependencies in the project:

`cd ymg-donem-projesi-visionGPT`

`npm install`


3. Run the application:

`npm expo start`


_Note: Depending on your operating system, installation and running instructions may vary. For detailed information, please refer to the React Native [documentation](https://reactnative.dev/docs/getting-started)._

## Usage

1. Open the app and take a photo or select an existing one.
2. The text in the photo will be automatically detected and sent to the ChatGPT API.
3. The response from the ChatGPT API will be displayed on the screen.

## UML

![uml](https://user-images.githubusercontent.com/83416622/235539191-21aaa1a5-d6bc-412d-815f-5d4594324b85.png)

## License

This project is licensed under the [MIT License](LICENSE).

