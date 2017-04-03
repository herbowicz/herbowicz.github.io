---
layout: single
comments: true
title: 'React app online in 10 easy steps'
Category: Tutorial
tags: [React]
lang: en-EN
---
Tutorial for Beginners. Create and build your first React app. Deploy on the web in the fastest way possible. This process should take less than 30 minutes  to complete. Follow these instructions:

1. Install Node.js 
Download your version of Node from <https://nodejs.org/en/download/> and click to install it.

2. Open console: Start > cmd - cmd.exe

3. You should have Node.js and npm (comes in the packeage) already installed now. Check their version numbers:
```bash
node -v
npm -v    
```

4. Now install the main React appplication template with just one line of code:
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

7. Make some changes of your choice to the app now. Stop the server in console (Ctrl+C, Y) and type:
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
    (You can use editor of you choice, instead. You may also want to change other files like App.css or logo.svg)

8. Make sure that your changes are effective:  <http://localhost:3000/>

9. Now build you app:
```bash
npm run build    
```
This will create a /build folder with your app.

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

There you have it! Your first React application should be online now at your chosen URL (your-domain.surge.sh).

There are plenty of tutorials how to create React application but they all seem to miss one point: they don't show immediate results. Beginners are likely to get confused about the whole process. In this short tutorial, I showed you how to build a basic React app and have it working under a custom URL. This will not make you a dev right away, but may encourage you to learn more, and soon become one. 

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
