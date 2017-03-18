---
layout: single
title: 'Hello Node.js'
Category: Websites
tags: [hello]
lang: en-EN
---
To start with and check localhost:8080...

{% highlight javascript %}

var http = require('http');
http.createServer(function(request, response) {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end('Hello from Node.js!');
}).listen(1234);

{% endhighlight %}
