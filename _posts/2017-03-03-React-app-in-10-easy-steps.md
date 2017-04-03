---
layout: single
comments: true
title: 'React app online in 10 easy steps'
Category: Tutorial
tags: [React]
lang: en-EN
---
Create, test and build your first React app, and deploy it on the web in 10 easy steps. Tutorial for Beginners. It should take less than 30 minutes to complete.

There are plenty of tutorials how to create React application but they all seem to miss one point: they don't show immediate results, so beginners are likely to get confused about the whole process. 
In this short tutorial, I show how to build a basic React app and have working under a custom URL. It will not make you a developer right away, but may encourage you to learn more, and soon becoming one.

Follow these instructions:

1. Install Node.js 
Download your version of Node.js from https://nodejs.org/en/download/ and click to install it.

2. Open console: Start > cmd - cmd.exe

3. You should have Node and npm (comes in a packeage) already installed now. Check:
node -v
npm -v
Each of these commands should give the version number.

4.  Now install the main React appplication template with just one line of code:
{% highlight javascript %}
npm create-react my-app
{% endhighlight %}

It may take you a couple minutes to have your app ready.

5. Once installed go inside the folder:
cd my-app

And start the application:
npm start

6. Now open the browser:
http://localhost:3000/
You should see "Welcome to React" screen.

7. Make some changes of your choice to the app now. Stop the server in console (Ctrl+C, Y) and type:
cd src
edit App.js

Edit this 2 lines of code:

<h2>Welcome to React</h2>
To get started, edit src/App.js and save to reload.

To something of your choice, like:

<h2>Hello world!</h2>
This is my first React App. 

Save and Exit. 
(You can use your editor, instead.
 You may also want to change logo.svg or edit App.css.)

8. Check again at:
http://localhost:3000/
if your changes are effective now.

9. Build you app:
npm run build

This will create /build folder with your app.

10. It's time to show your app to the world! Easiest way to deploy is  to use htpp://surge.sh free option. Install it first:
npm install -g surge

Now just type:
surge

Provide your:
email
password
project path (the /build folder)
and domain of your choice

There you have it. Your first React application should be online now at your chosen URL (your-domain.surge.sh).
This is the easied way to build your first React application. Good luck and have fun!
Please let me know if it worked for you in the comments below.

In short:
npm create-react my-app
cd my-app/src
edit App.js
npm run build
npm install -g surge
surge

{% highlight javascript %}
{% endhighlight %}
