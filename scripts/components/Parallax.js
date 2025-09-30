export default class Parallax {
  constructor(element) {
    this.element = element;

    this.init();
  }

  init() {
    console.log('mon parallaxe est là');
    document.addEventListener('mousemove', parallax);
    function parallax(event) {
      this.querySelectorAll('.parallax-wrap .parallax-element').forEach(
        (shift) => {
          const positionX = shift.getAttribute('valueX');
          const positionY = shift.getAttribute('valueY');
          const x = (window.innerWidth - event.pageX * positionX) / 90;
          const y = (window.innerHeight - event.pageY * positionY) / 90;

          shift.style.transform = `translateX(${x}px) translateY(${y}px)`;
        }
      );
    }
  }
}
