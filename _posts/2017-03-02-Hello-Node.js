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
  var headers = request.headers;
  var method = request.method;
  var url = request.url;
  var body = [];
  request.on('error', function(err) {
    console.error(err);
  }).on('data', function(chunk) {
    body.push(chunk);
  }).on('end', function() {
    body = Buffer.concat(body).toString();
  });
response.end('<html><body><h1>Hello from Node.js!</h1></body></html>');
}).listen(8080);

{% endhighlight %}
