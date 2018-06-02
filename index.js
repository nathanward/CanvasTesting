
var canvas, ctx, cursor;

var shapes = [];
var shapeSize = 50;

var rcCol = '#ffffff';
var lcCol = '#000000';

function Shape(x, y, width, height, colour) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.fill = colour || '#000000';

  this.setData = function(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  this.getX = function() {
    return this.x;
  }

  this.getY = function() {
    return this.y;
  }

  this.getWidth = function() {
    return this.width;
  }

  this.getHeight = function() {
    return this.height;
  }

  this.getFill = function() {
    return this.fill;
  }

  this.setX = function(xChange) {
    this.x = xChange;
  }

  this.setY = function(yChange) {
    this.y = yChange;
  }

  this.setWidth = function(widthChange) {
    this.width = widthChange;
  }

  this.setHeight = function(heightChange) {
    this.height = heightChange;
  }
}

function drawAll(cursorX, cursorY) {
  // clear the screen
  ctx.fillStyle = '#ffffff';
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();

  // get the position of the cursor
  var positionData = getCursorPosition(cursorX, cursorY);

  // draw cursor
  cursor.setData(positionData.xPos, positionData.yPos, shapeSize, shapeSize);
  ctx.rect(cursor.getX(), cursor.getY(), shapeSize, shapeSize);

  // draw shapes
  drawShapes();

  // update canvas
  ctx.stroke();
}

function getCursorPosition(cursorX, cursorY) {
  var xSquare = Math.floor(cursorX / shapeSize);
  var xOffset = cursorX - (xSquare * shapeSize);

  var ySquare = Math.floor(cursorY / shapeSize);
  var yOffset = cursorY - (ySquare * shapeSize);

  return {
    xPos: cursorX - xOffset,
    yPos: cursorY - yOffset
  }
}

function drawShapes() {
  for (var i = 0; i < shapes.length; i++) {
    ctx.fillStyle = shapes[i].getFill();
    ctx.fillRect(shapes[i].getX(), shapes[i].getY(), shapes[i].getWidth(), shapes[i].getHeight());
  }
}

function addShape(cursorX, cursorY, colour) {
  var positionData = getCursorPosition(cursorX, cursorY);

  shape = new Shape(positionData.xPos, positionData.yPos, shapeSize, shapeSize, colour);
  shapes.push(shape);
}

function registerEvents() {
  $(canvas).mousemove(function(e) {
    drawAll(e.pageX, e.pageY);
  });

  $(canvas).mousedown(function(e) {

    switch(e.which) {
      case 1:
        // Left click
        addShape(e.pageX, e.pageY, lcCol);
        break;
      case 3:
        // Right click
        addShape(e.pageX, e.pageY, rcCol);
        break;
    }

    drawAll(e.pageX, e.pageY);
  });

  $('.caret-overlay').click(function(e) {
    if ($('.tray-outer').hasClass('closed-tray')) {
      $('.caret-open').html('&#9664');
      $('.tray-outer').animate({
        left: '0px'
      });
      $('.tray-outer').removeClass('closed-tray');
      $('.tray-outer').addClass('open-tray');
    } else if ($('.tray-outer').hasClass('open-tray')) {
      $('.caret-open').html('&#9658');
      $('.tray-outer').animate({
        left: '-170px'
      });
      $('.tray-outer').removeClass('open-tray');
      $('.tray-outer').addClass('closed-tray');
    }
  });
}

function createObjects() {
  $(".colourPicker").spectrum({
    color: "#000000",
    change: function(c) {
      lcCol = c.toHexString();
    }
  });
}

function init() {
  canvas = document.getElementById('canvas');

  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;

  ctx = canvas.getContext('2d');
  cursor = new Shape(0, 0, 0, 0);
  createObjects();
  registerEvents();
}

init();
