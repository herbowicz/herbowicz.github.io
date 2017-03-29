---
layout: single
title: 'Moving Wordpress blog to NoSQL Database (Node.js + MongoDB)'
Category: Websites
tags: [node.js, MongoDB]
lang: en-EN
---
NoSQL databases have become heavily popular in recent years due to better scalability and performance when compared to their relational predecesors. Another benefit for programmers is that NoSQL database combined with Node.js server, allow to write entire code solely in JavaScript. For example, instead of PHP in backend you may use Node syntax and instead of SQL you create queries using Regular Expressions (which is JS RegExp object). There are ways to exchange traditonal approach in mobile appiication development (using Java/Android + Swift + C#) to one and only JavaScript (React Native). All these reasons make new JavaScript-based frameworks (Angular, React, Vue.js) so popular nowadays. The best introduction into new coding paradigm is always by doing some practical work. In this example, I will explain how I moved my old Wordpress blog with 150 posts, available at http://solipsyzm.pl - to MongoDB using Node.js and Express, available at http://nosql.solipsyzm.pl now. Let's get started!

NoSQL databases have become heavily popular in recent years due to better scalability and performance when compared to their relational predecesors. Another benefit for programmers is that NoSQL database combined with Node.js server, allow to write entire code solely in JavaScript. For example, instead of PHP in backend you may use Node syntax and instead of SQL you create queries using Regular Expressions (which is JS RegExp object). There are ways to exchange traditonal approach in mobile appiication development (using Java/Android + Swift + C#) to one and only JavaScript (React Native). All these reasons make new JavaScript-based frameworks (Angular, React, Vue.js) so popular nowadays. The best introduction into new coding paradigm is always by doing some practical work. In this example, I will explain how I moved my old Wordpress blog with 150 posts, available at http://solipsyzm.pl - to MongoDB using Node.js and Express, available at http://nosql.solipsyzm.pl now. Let's get started!

The first thing to do is an export of database from Wordpress. There are many plugins available to customize this task, but for the sake of simplicity, I use generic export functionality available at: Tools > Export > Download Export File, choose only published posts and received XML file that needs to be converted to JSON format. For that I use a converter from utilities-online.info/xmltojson. To get proper JSON format we need to remove empty break lines and wrap it all up with [ ] brackets. You can verify our new JSON here: jsonlint.com. I simplified the file a bit by removing "rss" reference and generic "item" object, just keeping the list of posts. For the sake of simplicity, I also replaced all instances of wp:post_name to slug, "wp:status":"published" to "published":true and content:encoded to text.
{% highlight javascript %} 
[
	{
	  "title":".....",
	  "text":".....",
	  "slug":".....",
	  "published":true,
	  ..... 
	},
	{
	  .....
	}
 ]
{% endhighlight %} 

 We will refer to only these four properties and will use the generated JSON file later as the content of our NoSQL database. Simple as that. Now we need to set up our Node environment. TBC...
