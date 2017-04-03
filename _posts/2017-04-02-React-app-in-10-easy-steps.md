---
layout: single
comments: true
title: 'React app online in 10 easy steps'
Category: Tutorial
tags: [React]
lang: en-EN
---
Tutorial for Beginners. Create and build your first React app. Deploy on the web in the shortest way possible. This process should take less than 30 minutes to complete. Follow these instructions:

1. Install Node.js 
    Download your version of Node.js from <https://nodejs.org/en/download/> and click to install it.

2. Open console: Start > cmd - cmd.exe

3. You should have Node and npm (comes in a packeage) already installed now. Check:
    {% highlight bash %}
    node -v
    npm -v    {% endhighlight %}
    Each of these commands should give the version number.

4. Now install the main React appplication template with just one line of code:
    {% highlight bash %}
    npm create-react my-app    {% endhighlight %}

    It may take you a couple minutes to have your app ready.

5. Once installed go inside the folder:
    {% highlight bash %}
    cd my-app    {% endhighlight %}

    And start the application:
    {% highlight bash %}
    npm start    {% endhighlight %}

6. Now open the browser:
    <http://localhost:3000/>
    You should see "Welcome to React" screen.

7. Make some changes of your choice to the app now. Stop the server in console (Ctrl+C, Y) and type:
    {% highlight bash %}
    cd src
    edit App.js    {% endhighlight %}

    Edit this 2 lines of code:

    {% highlight bash %}
    <h2>Welcome to React</h2>
    To get started, edit src/App.js and save to reload.        {% endhighlight %}

    To something of your choice, eg.:

    {% highlight bash %}
    <h2>Hello world!</h2>
    This is my first React App.         {% endhighlight %}

    Save and Exit. 
    (You can use your editor, instead. You may also want to change other files like App.css or logo.svg)

8. Check again if your changes are effective now:    
    <http://localhost:3000/>

9. Build you app:
    {% highlight bash %}
    npm run build    {% endhighlight %}

    This will create /build folder with your app.

10. It's time to show your app to the world! The fastest way to deploy is to use <http://surge.sh> free option. Install it first:

    {% highlight bash %}
    npm install -g surge    {% endhighlight %}

    Now just type:
    {% highlight bash %}
    surge    {% endhighlight %}

    Provide your:
    {% highlight bash %}
    email:
    password:
    project path:  //path to your /build folder
    domain:  //domain of your choice    {% endhighlight %}

There you have it. Your first React application should be online now at your chosen URL (your-domain.surge.sh).

There are plenty of tutorials how to create React application but they all seem to miss one point: they don't show immediate results. Beginners are likely to get confused about the whole process. In this short tutorial, I showed you how to build a basic React app and have it working under a custom URL. It will not make you a developer right away, but may encourage you to learn more, and soon becoming one.

In short:
    {% highlight bash %}
    npm create-react my-app
    cd my-app/src
    edit App.js
    npm run build
    npm install -g surge
    surge    {% endhighlight %}

This is the easied way to build your first React application. Good luck and have fun! 
Let me know if it worked for you in the comments below.
