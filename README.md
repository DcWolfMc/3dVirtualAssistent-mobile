<div align="center">
  <h1 align="center">
    3D Virtual Assistent (Mobile)
    <br />
    <br />
      <img src="./cover.png" alt="3D Virtual Assistent (Mobile)">
  </h1>
</div>
<p align="center">
  <img src="http://img.shields.io/static/v1?label=STATUS&message=DEVELOPMENT&color=GREEN&style=for-the-badge" alt="In Development" />
<p/>

## Table of Contents
  
* [Table of Contents](#table-of-contents)
* [Introduction](#introduction)
* [Installation](#installation)
* [Functionalities](#functionalities)
* [Screenshots](#screenshots)
* [Technologies Used](#technologies-used)
* [Usefull Docs and Links](#usefull-docs-and-links)

## Introduction

3D Virtual Assistent is a project to display a 3D charecter and have a conversation with. This project was built to serve as a study for the use of 3d models in React and React Native.<br>
The Mobile version runs both in iOS and Android phones with Expo. 

**Tip**: This repository is the Mobile version. If you wish to see the backend version [click here](https://github.com/DcWolfMc/3dVirtualAssistent-backend)

## Installation

1. First, install the dependencies:

```
npm install
```
2.  Second, use expo to initialize:
 ```
npm start
```
## Functionalities
- `Display Avatar`: Display a 3D Model using [Ready Player Me Avatar](https://readyplayer.me/)
- `lipsync When Avatar Speak`: Map an mouth animation to play when message is ready.
- `Audio Message`: Recive and play an audio file when message is ready.
- `Gesture Animations`: Play an animation when message is ready to enhance interection.
- `Send text to Avatar`: Send text message to the avatar speak. 
- `Test backend conection`: "Speak" Button to use mockup text message and audio from backend.
- `Hide/Show UI`: 👁️ Button to change the UI display. 

## Screenshots
<p width="100%">
  <img src="./screenshot1.png" alt="screenshot1" width="40%" hspace="32"/>
  <img src="./screenshot2.png" alt="screenshot1" width="40%" hspace="32"/>
</p>

## Technologies Used
- React Native
- React Three Fiber
- React Three Drei
- Tailwind CSS
- Typescript
- Expo

## Usefull Docs and Links
- [Ready Player Me - RestAPI Documentation](https://docs.readyplayer.me/ready-player-me/api-reference/rest-api)
  - In case you wish to place your own RPM model on the project, here is the RestAPI [Link to GET your 3D Avatar.](https://docs.readyplayer.me/ready-player-me/api-reference/rest-api/avatars/get-3d-avatars)
- [React Three Fiber Documentation](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction)
- [gltfjsx](https://gltf.pmnd.rs/) - Map your 3D model file in glt to .jsx or .tsx .
