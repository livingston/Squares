##Squares

*Animated background squares implemented with canvas*

####Features
* Simple random squares
* Interactive squares – Mouse & Touch (WIP)
* Patterns (Coming soon…)

<!--####Options
* Background size
* Block size
* Color function
* Grid customizations

-->

####Usage
Add the canvas element to your html page

    <canvas id='grid'></canvas>

Include `lodash.js` and `Squares.js` before the `</body>` tag.

Add the following snippet to you javascript code,

    var sqrs = new Squares(document.getElementById('grid'));
    sqrs.tick();