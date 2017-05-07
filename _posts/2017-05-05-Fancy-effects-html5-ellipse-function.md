---
layout: single
comments: true
title: 'Fancy effects with html5 ellipse function'
Category: Tutorial
tags: [html5]
lang: en-EN
---

This is what I like the most. Write just one line of code to get amaizing results. Experiment on your own, just change the following parameters:

```html5
ctx.beginPath() ;

    var x             = 150;         // The X coordinate
    var y             = 75;          // The Y cooordinate
    var rx            = 125;         // The X radius
    var ry            = 50;          // The Y radius
    var rotation      = 0;           // The rotation of the ellipse (in radians)
    var start         = 0;           // The start angle (in radians)
    var end           = 2 * Math.PI; // The end angle (in radians)
    var anticlockwise = false;       // The direction the ellipse is drawn (optional)
    
ctx.ellipse(x, y, rx, ry, rotation, start, end, anticlockwise);

ctx.stroke() ;
```

Here are some examples: 
[ellipse1](https://solipsyzm.pl/demo/index.html), 
[ellipse2](https://solipsyzm.pl/demo/index2.html), 
[ellipse3](https://solipsyzm.pl/demo/index3.html), 
[ellipse4](https://solipsyzm.pl/demo/index4.html), 
[ellipse5](https://solipsyzm.pl/demo/index5.html), 
[ellipse6](https://solipsyzm.pl/demo/index6.html), 
[ellipse7](https://solipsyzm.pl/demo/index7.html), 
[ellipse8](https://solipsyzm.pl/demo/index8.html), 
[ellipse9](https://solipsyzm.pl/demo/index9.html). When you add random fill color, you can easily [draw Picasso-style paintings](https://solipsyzm.pl/demo/index10.html). (Wait approx. 20 sec. to complete.)

Unfortunatelly, the ellipse function is now [only supported](http://caniuse.com/#search=ellipse) by Chrome, Safari and Opera. 
