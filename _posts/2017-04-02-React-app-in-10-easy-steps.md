---
layout: single
comments: true
title: 'React app online in 10 easy steps'
Category: Tutorial
tags: [React, JavaScript]
lang: en-EN
---
Tutorial for Beginners. Create and build your first React.js app. Deploy to the web in the fastest way possible. The process should take less than 30 minutes to complete. 

React is a modern, popular, state-of-art JavaScript framework invented by Facebook. Is an open source project used by such giants like Airbnb, Imgur, Instagram, Netflix. Everyone seems to be talking about React now! If you want to have your own React application online, follow these instructions:

1. Install Node.js 
Download your version of Node from <https://nodejs.org/en/download/> and click to install it.

2. Open console: Start > cmd - cmd.exe

3. You should have Node.js and npm (comes in the packeage) already installed now. Check their version numbers:
```bash
node -v
npm -v    
```

4. Now install the main React.js appplication template with just one line of code:
```bash
npm create-react-app my-app    
```
  It may take a minute to have your app ready.

5. Once installed, change the folder and start the application:
```bash
cd my-app    
npm start    
```

6. Now open the browser: <http://localhost:3000/> and you should see the "Welcome to React" screen.

7. Customize the app now. Stop the server (click Ctrl+C twice) and type:
```bash
cd src
edit App.js    
```

    Edit these two lines of code:

        <h2>Welcome to React</h2>
        To get started, edit src/App.js and save to reload.        

    To something of your choice, eg.:

        <h2>Hello world!</h2>
        This is my first React App.         

    Save and Exit. 
    (You can use your preferred editor, instead. You may also want to change other files like App.css or logo.svg)

8. Make sure that your changes are effective:  <http://localhost:3000/>

9. Now build your app:
```bash
npm run build    
```
This will create /build folder with your app inside.

10. It's time to show your app to the world! The fastest way to deploy is with <http://surge.sh> free option. Install it first:
```bash
npm install -g surge    
```
Now just type:
```bash
surge    
```
Provide your:
```bash
email:
password:
project path:  //path to your /build folder
domain:  //domain of your choice    
```

There you have it! Your first React.js application should be online now at your chosen URL (your-domain.surge.sh).

There are plenty of tutorials how to create React application but they all seem to miss one point: they don't show immediate results. Beginners are likely to get confused as the number of available tools, patterns and frameworks is growing exponentially. In this short tutorial, I show how to build a basic React app, deploy and have it running under a custom URL. Surprisingly, you don't need to use JSX, ES6 or even any JS code at all. This tutorial will not make you a dev right away, but may encourage you to learn more, and soon become one. 

In short:
```bash
npm create-react my-app
cd my-app/src
edit App.js
npm run build
npm install -g surge
surge    
```

That's the easiest way to build your first React app. Good luck and have fun! 
Let me know if it worked for you in the comments below.
