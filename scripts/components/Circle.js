export default class Circle {
    constructor(element) {
      this.element = element;
      
      this.init();
    }
  
    init() {
      console.log('initialisation de mon cercle');
      this.animText();
      
    }
  
    animText() {

    const text = document.querySelector('.text-circle h2');
      text.innerHTML = text.innerText.split("").map(
        (char, i) =>
        `<span style="transform:rotate(${i * 8.7}deg)">${char}</span>`
      ).join("");
    }
  }