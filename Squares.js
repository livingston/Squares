/*! Animated Squares
 *
 * @author Livingston Samuel
 * @license MIT License
 *
 */

;(function (win, doc, Math) {
  var getRandomColor = function () {
    return 'rgba('+ Math.floor(Math.random()*255) +','+ Math.floor(Math.random()*255) +','+ Math.floor(Math.random()*255) +','+ Math.random().toFixed(1) +')';
  };

  var Squares = function (board, options) {
    var defaultOptions = {
      width: doc.body.offsetWidth,
      height: doc.body.offsetHeight,

      colWidth: 20,

      grid: {
        color: '#f7f7f7',
        width: 1
      },

      colorFn: getRandomColor
    };

    this.board = board;
    this.options = _.assign(options || {}, defaultOptions);

    this.setup();

    this.renderGrid();
  };

  Squares.prototype = {
    setup: function () {
      var options = this.options;

      this.ctx = this.board.getContext('2d');
    },

    updateDimensions: function () {
      var options = this.options;

      this.board.width = options.width;
      this.board.height = options.height;
    },

    renderGrid: function () {
      var options = this.options,
          ctx = this.ctx,
          width = options.width,
          height = options.height,
          cols = options.colWidth;

      this.updateDimensions();

      ctx.save();
        ctx.translate(0,0);

        ctx.beginPath();

        var x, y;

        for (x = .5; x <= width; x += cols) {
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
        }

        for (y = .5; y <= height; y += cols) {
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
        }

        ctx.closePath();

        ctx.strokeStyle = options.grid.color;
        ctx.strokeWidth = options.grid.width;
        ctx.stroke();

      ctx.restore();
    },

    fillBox: function (x, y) {
      var cols = this.options.colWidth;

      x = x * cols;
      y = y * cols;

      this.ctx.fillStyle = this.options.colorFn();
      this.ctx.fillRect(x, y, cols, cols);
    },

    tick: function () {
      var cols = this.options.colWidth,
          randomX = Math.floor((Math.random()*this.options.width)/cols),
          randomY = Math.floor((Math.random()*this.options.height)/cols);

      this.fillBox(randomX, randomY);

      requestAnimationFrame(this.tick.bind(this));
    }
  };

  var sqrs = new Squares(document.getElementById('sqrs-grid'));

  sqrs.tick();
}(window, document, Math));
