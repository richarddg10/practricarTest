import { CardAttributes, CardEvents, CardSelectedEvent } from "./types.js";

class Card extends HTMLElement {
  title: string = "";
  description: string = "";

  static get observedAttributes(): CardAttributes[] {
    return Object.keys(CardAttributes) as CardAttributes[];
  }

  attributeChangedCallback(
    propName: CardAttributes,
    _: string,
    newValue: string
  ) {
    if (this[propName] === newValue) return;
    this[propName] = newValue;
    this.mount();
  }

  connectedCallback(): void {
    this.mount();
  }

  dissconnectedCallback(): void {
    this.removeListeners();
  }

  mount(): void {
    this.render();
    this.addListeners();
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleButtonClick(): void {
    const event: CardSelectedEvent = new CustomEvent(CardEvents.cardSelected, {
      detail: { title: this.title },
      composed: true,
    });
    console.log(event);

    this.dispatchEvent(event);
  }

  addListeners(): void {
    const btn = this.shadowRoot?.querySelector("button");
    btn?.addEventListener("click", this.handleButtonClick);
  }

  removeListeners(): void {
    const btn = this.shadowRoot?.querySelector("button");
    btn?.removeEventListener("click", this.handleButtonClick);
  }

  render(): void {
    if (!this.shadowRoot) return;
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
