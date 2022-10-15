import { CardAttributes, CardEvents } from "./types.js";
class Card extends HTMLElement {
    constructor() {
        super();
        this.title = "";
        this.description = "";
        this.attachShadow({ mode: "open" });
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }
    static get observedAttributes() {
        return Object.keys(CardAttributes);
    }
    attributeChangedCallback(propName, _, newValue) {
        if (this[propName] === newValue)
            return;
        this[propName] = newValue;
        this.mount();
    }
    connectedCallback() {
        this.mount();
    }
    dissconnectedCallback() {
        this.removeListeners();
    }
    mount() {
        this.render();
        this.addListeners();
    }
    handleButtonClick() {
        const event = new CustomEvent(CardEvents.cardSelected, {
            detail: { title: this.title },
            composed: true,
        });
        console.log(event);
        this.dispatchEvent(event);
    }
    addListeners() {
        var _a;
        const btn = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector("button");
        btn === null || btn === void 0 ? void 0 : btn.addEventListener("click", this.handleButtonClick);
    }
    removeListeners() {
        var _a;
        const btn = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector("button");
        btn === null || btn === void 0 ? void 0 : btn.removeEventListener("click", this.handleButtonClick);
    }
    render() {
        if (!this.shadowRoot)
            return;
        this.shadowRoot.innerHTML = `
        <section>
            <h4>${this.title}</h4>
            <p>${this.description}</p>
            <button>Seleccionar</button>
        </section>
        `;
    }
}
customElements.define("my-card", Card);
export default Card;
