import Accordion from './components/Accordion';
import Background from './components/Background';
import Carousel from './components/Carousel';
import Circle from './components/Circle';
import Cursor from './components/Cursor';
import Header from './components/Header';
import Form from './components/Form';
import Modal from './components/Modal';
import Parallax from './components/Parallax';
import Youtube from './components/Youtube';
import Scrolly from './components/Scrolly';

export default class ComponentFactory {
  constructor(element) {
    this.element = element;
    this.componentList = {
      Accordion,
      Background,
      Carousel,
      Circle,
      Cursor,
      Form,
      Header,
      Modal,
      Parallax,
      Scrolly,
      Youtube,
    };
    this.init();
  }

  init() {
    const components = document.querySelectorAll('[data-component]');

    for (let i = 0; i < components.length; i++) {
      const element = components[i];
      const componentName = element.dataset.component;

      new this.componentList[componentName](element);
    }
  }
}
