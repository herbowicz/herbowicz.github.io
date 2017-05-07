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

[ctx.ellipse(canvas.width/2, canvas.height/2, 1, 3*i, i, 0, 2*Math.PI);](https://solipsyzm.pl/demo/index.html) 
[ctx.ellipse(canvas.width/2, canvas.height/2, 10, 2*i, i, 0, 2*Math.PI);](https://solipsyzm.pl/demo/index2.html)
[ctx.ellipse(canvas.width/2, canvas.height/2, 2, i*2, i, i/25, i, 600*Math.PI);](https://solipsyzm.pl/demo/index6.html) 

Add random fil color to [draw Picasso style paintings](https://solipsyzm.pl/demo/index10.html).

Unfortunatelly, the ellipse function is [only supported](http://caniuse.com/#search=ellipse) by Chrome, Safari and Opera. 
