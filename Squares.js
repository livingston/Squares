/*! Animated Squares
 *
 * @author Livingston Samuel
 * @license MIT License
 *
 * Original idea by squaredesign - http://squaredesign.com/lab/crazy-squares/
 *
 */

;(function (win, doc, Math) {
  var grid = doc.getElementById('grid'),
      strSquare = 'square',
      getSquare = (function () {
        var div = doc.createElement('div');
        div.className = strSquare;
        
        return function () {
          return div.cloneNode(true);
        };
      }()),
      getGrid = function (col, row) {
        var cols = col || 10,
            rows = row || 6,
            l = cols * rows,
            frag = doc.createDocumentFragment();
            
        while (l--) {
          frag.appendChild(getSquare());
        }
        
        return frag;
      },
      pulsate = function () {
        var squares = grid.getElementsByTagName('div'),
            len = squares.length,
            classes = [strSquare + ' isDark', strSquare + ' isLightDark', strSquare + ' isPale'],
            cLen = classes.length;
        
        return function () {
          var randomSquare = squares.item(Math.floor(len * Math.random())),
              randomClass = classes[Math.floor(cLen * Math.random())];
          
          if(randomSquare.className === randomClass) {
            randomSquare.className = strSquare;
          } else {
            randomSquare.className = randomClass;
          }

        };
      },
      bind = (function () {
        if (win.addEventListener) {
          return function (elem, evt, fn) {
            elem.addEventListener(evt, fn, false)
          };
        } else if (win.attachEvent) {
          return function (elem, evt, fn) {
            elem.attachEvent('on' + evt, fn);
          }
        } else {
          return function (elem, evt, fn) {
            var oldfn = elem['on' +  evt];
            
            elem['on' + evt] = function () {
              if(oldfn) {
                oldfn();
              }
              
              fn();
            }
          }
        }
      }()),
      initialize = function () {
        var row = Math.floor((win.innerHeight || doc.documentElement.clientHeight)/52),
            col = Math.floor((win.innerWidth || doc.documentElement.clientWidth)/52);

        grid.appendChild(getGrid(col, row));
        
        bind(grid, 'mouseover', pulsate(), false);
      };
      
      initialize();
}(window, document, Math));