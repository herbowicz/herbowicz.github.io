---
layout: single
comments: true
title: 'Fancy effects with canvas ellipse function'
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
    var anticlockwise = false;       // Whether the ellipse is drawn in a clockwise direction or
                                     // anti-clockwise direction
    
    ctx.ellipse(x, y, rx, ry, rotation, start, end, anticlockwise);

ctx.stroke() ;
```

Here are some examples: 

[ctx.ellipse(canvas.width/2, canvas.height/2, 1, 3*i, i, 0, 2*Math.PI);](https://solipsyzm.pl/demo/index.html)
[ctx.ellipse(canvas.width/2, canvas.height/2, 10, 2*i, i, 0, 2*Math.PI);](https://solipsyzm.pl/demo/index2.html)
[ctx.ellipse(canvas.width/2, canvas.height/2, i, 4*i, i, 0, 3 * Math.PI);](https://solipsyzm.pl/demo/index3.html)
[ctx.ellipse(canvas.width/2, canvas.height/2, 1, 2/i, i, i, 2/i, 8*Math.PI);](https://solipsyzm.pl/demo/index4.html)
[ctx.ellipse(canvas.width/2, canvas.height/2, 1, 2/i, i, i, 2/i, 8*Math.PI);](https://solipsyzm.pl/demo/index5.html)
[ctx.ellipse(canvas.width/2, canvas.height/2, 1, 2, i*2, i, i/25, i, 600*Math.PI);](https://solipsyzm.pl/demo/index6.html)
[ctx.ellipse(canvas.width/2, canvas.height/2, 1, 20*i, 10000/i, i/20, 8*i, 600*Math.PI);](https://solipsyzm.pl/demo/index7.html)
[ctx.ellipse(canvas.width/2, canvas.height/2, 1, 20*i, 10000/i, i/200, 8000/i, 6000*Math.PI);](https://solipsyzm.pl/demo/index8.html)
[ctx.ellipse(canvas.width/2, canvas.height/2, 1, 6000/i, 90000/i, i*10, i*Math.PI, 600*Math.PI);](https://solipsyzm.pl/demo/index9.html)

Add random fil color to drow Picasso style paintings:
ctx.fillStyle = "#"+((1<<24)*Math.random()|0).toString(16);
[ctx.ellipse(canvas.width/2, canvas.height/2, 1, 2, i, i*i, i*i, i, 600*Math.PI);](https://solipsyzm.pl/demo/index10.html)

Unfortunatelly, the ellipse function is [only supported](http://caniuse.com/#search=ellipse) by Chrome, Safari and Opera. 
