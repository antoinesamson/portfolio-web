//source : https://codepen.io/toshiya-marukubo/pen/NWxzOMz

export default class Background {
  constructor(element) {
    this.element = element;

    this.init();
  }

  init() {
    console.log('initialisation de mon background');
    this.animBackground();
  }

  animBackground() {
    (function () {
      'use strict';
      window.addEventListener('load', function () {
        var canvas = document.getElementById('canvas');  //recherche la zone ou le fond sera intégré

        if (!canvas || !canvas.getContext) {
          return false;
        }

        /********************
          Random Number
        ********************/

        function rand(min, max) {
          return Math.floor(Math.random() * (max - min + 1) + min);
        }

        /********************
          Var
        ********************/

        var ctx = canvas.getContext('2d');
        var X = (canvas.width = window.innerWidth); //largeur de l'écran
        var Y = (canvas.height = window.innerHeight); //hauteur de l'écran
        var mouseX = null; //position horizontale de la souris
        var mouseY = null; //position verticale de la souris
        var dist = 100;  //distance entre les lignes du fond
        var lessThan = Math.sqrt(dist * dist + dist * dist);
        var mouseDist = 110;  //grosseur de la zone autour de la souris qui modifie le fond 
        var shapeNum;
        var shapes = []; //tableau vide qui accueillera les lignes présentes dans le canvas
        var ease = 0.7;  // easing de l'animation des lignes au contact de la souris
        var friction = 0.35;  //indique à quel point le mouvement des lignes doit rebondir au contact de la souris
        var lineWidth = 2;  //largeur des lignes
        X > Y ? (shapeNum = X / dist) : (shapeNum = Y / dist);

        if (X < 768) { //breakpoint qui modifie les paramètres lorsque l'écran est en desosus de 768px
          lineWidth = 2;
          dist = 70;
          lessThan = Math.sqrt(dist * dist + dist * dist);
          mouseDist = 70;
          X > Y ? (shapeNum = X / dist) : (shapeNum = Y / dist);
        }

        /********************
          Animation
        ********************/

        window.requestAnimationFrame =
          window.requestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.msRequestAnimationFrame ||
          function (cb) {
            setTimeout(cb, 17);
          };

        /********************
          Shape
        ********************/

        function Shape(ctx, x, y, i) {
          this.ctx = ctx;
          this.init(x, y, i);
        }

        Shape.prototype.init = function (x, y, i) {
          this.x = x; //valeur de la longueur
          this.y = y; //valeur de la hauteur
          this.xi = x;
          this.yi = y;
          this.i = i;
          this.r = 1; //indique la grosseur des cercles ou les lignes se rencontrent
          this.v = { //indique le nombre de lignes qui se surperposent sur les lignes horizontales et verticales
            x: 0,
            y: 0,
          };
          this.c = rand(220, 220); //appliquera au hazard une couleur entre ces deux chiffres, peut varier entre 0 et 360 et être modifié pour changer la palette
        };

        Shape.prototype.draw = function () { //fonction qui dessine les lignes une par une
          var ctx = this.ctx;
          ctx.save();
          ctx.fillStyle = 'hsl(' + this.c + ', ' + '80%, 60%)';
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
          ctx.fill();
          ctx.restore();
        };

        Shape.prototype.mouseDist = function () {//fonction qui modifie la position des lignes
          var x = mouseX - this.x;
          var y = mouseY - this.y;
          var d = x * x + y * y;
          var dist = Math.sqrt(d);
          if (dist < mouseDist) {
            this.v.x = +this.v.x;
            this.v.y = +this.v.y;
            var colAngle = Math.atan2(mouseY - this.y, mouseX - this.x);
            this.v.x = -Math.cos(colAngle) * 5;
            this.v.y = -Math.sin(colAngle) * 5;
            this.x += this.v.x;
            this.y += this.v.y;
          } else if (dist > mouseDist && dist < mouseDist + 10) {
            this.v.x = 0;
            this.v.y = 0;
          } else {
            this.v.x += (this.xi - this.x) * ease;
            this.v.y += (this.yi - this.y) * ease;
            this.v.x *= friction;
            this.v.y *= friction;
            this.x += this.v.x;
            this.y += this.v.y;
          }
        };

        Shape.prototype.drawLine = function (i) {
          var j = i;
          for (var i = 0; i < shapes.length; i++) {
            if (j !== i) {
              var x = this.x - shapes[i].x;
              var y = this.y - shapes[i].y;
              var d = x * x + y * y;
              var dist = Math.floor(Math.sqrt(d));
              if (dist <= lessThan) {
                ctx.save();
                ctx.lineWidth = lineWidth;
                ctx.strokeStyle = 'hsl(' + this.c + ', ' + '80%, 40%)';
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(shapes[i].x, shapes[i].y);
                ctx.stroke();
                ctx.restore();
              }
            }
          }
        };

        Shape.prototype.render = function (i) { //fonction qui modifie la position des lignes.
          this.drawLine(i);
          if (mouseX !== null) this.mouseDist();
          this.draw();
        };

        for (var i = 0; i < shapeNum + 1; i++) {
          for (var j = 0; j < shapeNum + 1; j++) {
            if (j * dist - dist > Y) break;
            var s = new Shape(ctx, i * dist, j * dist, i, j);
            shapes.push(s);
          }
        }

        /********************
          Render
        ********************/

        function render() {
          ctx.clearRect(0, 0, X, Y);
          for (var i = 0; i < shapes.length; i++) {
            shapes[i].render(i);
          }
          requestAnimationFrame(render);
        }

        render();

        /********************
          Event
        ********************/

        function onResize() { //fonction qui ajuste les propriétés des lignes selon la taille de la fenêtre
          X = canvas.width = window.innerWidth;
          Y = canvas.height = window.innerHeight;
          shapes = [];
          if (X < 768) {
            lineWidth = 1;
            dist = 70;
            lessThan = Math.sqrt(dist * dist + dist * dist);
            mouseDist = 50;
            X > Y ? (shapeNum = X / dist) : (shapeNum = Y / dist);
          } else {
            lineWidth = 2;
            dist = 100;
            lessThan = Math.sqrt(dist * dist + dist * dist);
            mouseDist = 110;
            X > Y ? (shapeNum = X / dist) : (shapeNum = Y / dist);
          }
          for (var i = 0; i < shapeNum + 1; i++) {
            for (var j = 0; j < shapeNum + 1; j++) {
              if (j * dist - dist > Y) break;
              var s = new Shape(ctx, i * dist, j * dist, i, j);
              shapes.push(s);
            }
          }
        }

        window.addEventListener('resize', function () { //fonction qui met à jour le resizing des lignes
          onResize();
        });

        window.addEventListener(
          'mousemove',
          function (e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
          },
          false
        );

        canvas.addEventListener('touchmove', function (e) {
          var touch = e.targetTouches[0];
          mouseX = touch.pageX;
          mouseY = touch.pageY;
        });
      });
      // Author
      console.log(
        'File Name / net.js\nCreated Date / July 11, 2020\nAuthor / Toshiya Marukubo\nTwitter / https://twitter.com/toshiyamarukubo'
      );
    })();
  }
}
