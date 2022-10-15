import "./components/index.js";
import { CardEvents } from "./components/card/types.js";
class AppContainer extends HTMLElement {
    constructor() {
        super();
        this.selections = "";
        this.attachShadow({ mode: "open" });
        this.handleCardSelection = this.handleCardSelection.bind(this);
    }
    connectedCallback() {
        this.mount();
    }
    mount() {
        this.render();
        this.addlisteners();
    }
    render() {
        if (!this.shadowRoot)
            return;
        this.shadowRoot.innerHTML = `
    <h2>seleccionados: ${this.selections}</h2>
    <my-card title="Viaje a cartagena" description="divertido viaje"></my-card>
    <my-card title="Viaje a san andres" description="conoce el mar"></my-card>
    `;
    }
    handleCardSelection(event) {
        const cardTitle = event.detail.title;
        const alreadySelected = this.selections.includes(cardTitle);
        if (alreadySelected) {
            this.selections = this.selections.replace(cardTitle, "");
        }
        else {
            this.selections += event.detail.title;
        }
        this.mount();
    }
    addlisteners() {
        if (!this.shadowRoot)
            return;
        const cards = this.shadowRoot.querySelectorAll("my-card");
        cards.forEach((card) => card.addEventListener(CardEvents.cardSelected, (evt) => this.handleCardSelection(evt)));
    }
    disconnectedCallback() {
        if (!this.shadowRoot)
            return;
        const cards = this.shadowRoot.querySelectorAll("my-card");
        cards.forEach((card) => card.removeEventListener(CardEvents.cardSelected, (evt) => this.handleCardSelection(evt)));
    }
}
customElements.define("app-container", AppContainer);
