[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/QA5O9x4M)



<h1 align='center'>
<img src="https://img.shields.io/badge/Android-3DDC84?style=for-the-badge&logo=android&logoColor=white" alt="Android"> <img src="https://img.shields.io/badge/iOS-000000?style=for-the-badge&logo=ios&logoColor=white" alt="iOS"> <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT"><br>VisionGPT</h1>
<p align="center">
  <img src="https://user-images.githubusercontent.com/83416622/236870768-2b6b9f3f-f898-4456-be46-9797002a5928.png" alt="smallicon">
</p>




VisionGPT is a mobile application that allows users to read text from photos and communicate with the ChatGPT API to receive responses based on the text.
The prompt that currently only for answering the lesson questions.

(Email for beta .apk -> mertdonmez@gmx.com)

## New Updates
- VisionGPT upgraded to GPT-3.5 Turbo
- Chat with VisionGPT 
- Dark/Light Theme


## About the Project

This mobile application is developed using React Native. The app enables users to take a photo with their camera or select an existing photo from their device. Then, the text in the photo is detected and read using OCR (Optical Character Recognition) technology and sent to the ChatGPT API. The ChatGPT API accepts the text as a prompt and returns a response to the user.

## Screenshot
![newAppSs](https://github.com/mert-donmez/VisionGPT/assets/83416622/7b531e40-bf83-4efb-87ac-d1d9a784e504)





## Screen recording
![Screen Recording 2023-05-22 at 04 09 11](https://github.com/Iskenderun-Technical-University/ymg-donem-projesi-visionGPT/assets/83416622/c4f516b8-26ae-498f-9f13-9c80ea281ae6)


## Roadmap

- ✅ Design user interface (Done)
- ✅ Use iOS and Android camera (Done)
- ✅ Detect text in images with OCR (Done)
- ✅ Solve questions in detected images with GPT (Done) 
- ✅ Sessions, Firebase database and user actions (Done)
- ✅ First .apk build (Done)
- ✅ GPT3 to GPT3.5 upgrade (Done)
- ✅ Register and Login with Google and Apple auth (Will be removed with next update) 
- ✅ Register with Email (Will be removed with next update)
- ✅ Language and theme settings (Theme settings Done)
- ✅ Text input (Done)
- ✅ Login as anonymous user (Done)
- 🔄 Google Admob ads and some restrictions (soon)
- 🔄 In-app purchase (soon)
- 🎯 Publish on App Store and Play Store (End of project)

- ### Later
- 🔄 Detect objects in images (Another Project)
- 🔄 Communicate detected objects to the user with voice and NLP (Another Project)



## Features

- Photo capturing and selection functionality
- Reading text from photos using OCR
- Communicating with the ChatGPT API
- Displaying responses from the ChatGPT API


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

(you need OpenAI, Google Vision API also Google OAuth client ID's for IOS, Android and Web. (web client ID for expo client ID))



_Note: Depending on your operating system, installation and running instructions may vary. For detailed information, please refer to the React Native [documentation](https://reactnative.dev/docs/getting-started)._

## Usage

1. Open the app and take a photo or select an existing one.
2. The text in the photo will be automatically detected and sent to the ChatGPT API.
3. The response from the ChatGPT API will be displayed on the screen.

## Contributing

If you would like to contribute to this project, please check out the [Contributing Guide](CONTRIBUTING.md).


## UML

![newUml](https://user-images.githubusercontent.com/83416622/236022745-8909715e-596e-4872-a185-79b06a3e9ea6.png)



