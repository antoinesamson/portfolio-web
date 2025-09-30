export default class Cursor {
    constructor(element) {  
      this.element = element;
  
      this.init();
      
    }
  
    init() {

      var cursor = document.getElementById("cursor");
      console.log("mon curseur est créé");
      document.addEventListener('mousemove', 
      function(e){


      var x = e.clientX;
      var y = e.clientY;
      
      cursor.style.left = x + "px";
      cursor.style.top = y + "px";
      });

    }

   

  }