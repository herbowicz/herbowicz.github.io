---
layout: single
comments: true
title: 'Fancy effects with canvas ellipse()'
Category: Tutorial
tags: [html5]
lang: en-EN
---

Write just one line of code to get amazing results. This is what I like the most. Experiment on your own by changing the following parameters:

{% highlight html5 %} 
ctx.beginPath() ;
  var x             // The X coordinate
  var y             // The Y cooordinate
  var rx            // The X radius
  var ry            // The Y radius
  var rotation      // The rotation of the ellipse (in radians)
  var start         // The start angle (in radians)
  var end           // The end angle (in radians)
  var anticlockwise // The direction the ellipse is drawn (optional)
  
**`ctx.ellipse(x, y, rx, ry, rotation, start, end, anticlockwise);`**  

ctx.stroke() ;
{% endhighlight %} 

Here are some examples: 
[ellipse1](https://solipsyzm.pl/demo/index.html), 
[ellipse2](https://solipsyzm.pl/demo/index2.html), 
[ellipse3](https://solipsyzm.pl/demo/index3.html), 
[ellipse4](https://solipsyzm.pl/demo/index4.html), 
[ellipse5](https://solipsyzm.pl/demo/index5.html), 
[ellipse6](https://solipsyzm.pl/demo/index6.html) (my favourite), 
[ellipse7](https://solipsyzm.pl/demo/index7.html), 
[ellipse8](https://solipsyzm.pl/demo/index8.html), 
[ellipse9](https://solipsyzm.pl/demo/index9.html). 

When you add random fill color and some transparency, you can easily [draw Picasso-style paintings](https://solipsyzm.pl/demo/index10.html). (Please wait 20 sec. to complete.)

<small>Unfortunatelly, the ellipse function is now [only supported](http://caniuse.com/#search=ellipse) by Chrome, Safari and Opera.</small>
