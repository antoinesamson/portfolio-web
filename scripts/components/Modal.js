export default class Modal {
    constructor(element) {
      this.element = element;
      this.card1 = document.querySelector(".card-modale-1");
      this.modal1 = document.querySelector(".modale-window-1");
      this.card2 = document.querySelector(".card-modale-2");
      this.modal2 = document.querySelector(".modale-window-2");
      this.card3 = document.querySelector(".card-modale-3");
      this.modal3 = document.querySelector(".modale-window-3");

      
      this.init();
    }
  
    init() {
      console.log('initialisation de ma modale');

     this.card1.addEventListener("click", this.openModal1.bind(this));
     this.card2.addEventListener("click", this.openModal2.bind(this));
     this.card3.addEventListener("click", this.openModal3.bind(this));

     this.modal1.addEventListener("click", this.closeModal1.bind(this));
     this.modal2.addEventListener("click", this.closeModal2.bind(this));
     this.modal3.addEventListener("click", this.closeModal3.bind(this));

    }
  
    openModal1() {

        this.modal1.showModal();

    }

    closeModal1() {

        this.modal1.close();

    }

    openModal2() {

        this.modal2.showModal();

    }

    closeModal2() {

        this.modal2.close();

    }

    openModal3() {

        this.modal3.showModal();

    }

    closeModal3() {

        this.modal3.close();

    }


  }