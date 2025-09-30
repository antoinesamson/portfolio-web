export default class Accordion{
    constructor(element){
        this.element = element;
        this.accordionContainers = this.element.querySelectorAll('.js-accordion');
        this.accordionContainersAutoOpen = [];

        this.init();
    }

    init(){
        console.log("les accordéons sont là");
        

        for (let i = 0; i < this.accordionContainers.length; i++) {
            const accordionContainer = this.accordionContainers[i];
            
            if ('autoopen' in accordionContainer.dataset){
                accordionContainer.classList.add('is-active');

                this.accordionContainersAutoOpen.push(accordionContainer);

                this.checkAutoOpenNumber();
            }

            accordionContainer.addEventListener('click', this.openAccordion.bind(this));

        }

    }

    checkAutoOpenNumber(){
        if (this.accordionContainersAutoOpen.length >= 2){
            this.element.dataset.notclosing = "";
        }
    }

    openAccordion(event){
        if ('notclosing' in this.element.dataset){
            event.currentTarget.classList.toggle('is-active');

        }

        else{

            if(!event.currentTarget.classList.contains('is-active')){
                this.closeAccordions(); 
                event.currentTarget.classList.add('is-active');
            }

            else if(event.currentTarget.classList.contains('is-active')){
            event.currentTarget.classList.remove('is-active');
          }
           

        }
        

        
    }

    closeAccordions(){
        
        for (let i = 0; i < this.accordionContainers.length; i++) {
            const accordionContainer = this.accordionContainers[i];

            accordionContainer.classList.remove('is-active');
        }
    }
}