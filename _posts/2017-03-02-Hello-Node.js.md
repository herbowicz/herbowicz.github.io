---
layout: single
comments: true
title: 'Hello Node.js'
Category: Websites
tags: [node.js]
lang: en-EN
---
To start with... check localhost:1234

{% highlight javascript %}
var http = require('http');
http.createServer(function(request, response) {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end('Hello from Node.js!');
}).listen(1234);
{% endhighlight %}
