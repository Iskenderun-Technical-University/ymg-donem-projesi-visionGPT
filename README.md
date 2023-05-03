[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/QA5O9x4M)

# VisionGPT [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![Android](https://img.shields.io/badge/Android-3DDC84?style=for-the-badge&logo=android&logoColor=white)
![iOS](https://img.shields.io/badge/iOS-000000?style=for-the-badge&logo=ios&logoColor=white)



VisionGPT is a mobile application that allows users to read text from photos and communicate with the ChatGPT API to receive responses based on the text.
The prompt that currently only for answering the lesson questions.

(Email for beta .apk -> mertdonmez@gmx.com)

## About the Project

This mobile application is developed using React Native. The app enables users to take a photo with their camera or select an existing photo from their device. Then, the text in the photo is detected and read using OCR (Optical Character Recognition) technology and sent to the ChatGPT API. The ChatGPT API accepts the text as a prompt and returns a response to the user.

## Screenshot

![newappss](https://user-images.githubusercontent.com/83416622/236014118-8fc5d466-3dcf-4028-8382-dd1a549a9747.png)



## Roadmap

- ✅ Design user interface (Done)
- ✅ Use iOS and Android camera (Done)
- ✅ Detect text in images with OCR (Done)
- ✅ Solve questions in detected images with GPT (Done) 
- ✅ Sessions, Firebase database and user actions (Done)
- 🔄 Text input (soon) 
- 🔄 UI improvements, Language and Theme settings (soon)
- 🔄 Different prompts and tabs for different applications in one App (soon)
- 🔄 GPT3 to GPT3.5 upgrade (soon)
- 🔄 Detect objects in images (soon)
- 🔄 Communicate detected objects to the user with voice and NLP (soon)

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

(you need OpenAI and Google Vision API)



_Note: Depending on your operating system, installation and running instructions may vary. For detailed information, please refer to the React Native [documentation](https://reactnative.dev/docs/getting-started)._

## Usage

1. Open the app and take a photo or select an existing one.
2. The text in the photo will be automatically detected and sent to the ChatGPT API.
3. The response from the ChatGPT API will be displayed on the screen.

## UML

![newUml](https://user-images.githubusercontent.com/83416622/236022745-8909715e-596e-4872-a185-79b06a3e9ea6.png)



