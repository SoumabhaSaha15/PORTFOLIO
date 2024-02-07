class WeatherCondition extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="Components/WeatherCondition/WeatherCondition.css"/>
      <div part="container" class="hide" >
        <img src="" alt="condition" part="condition"/>
        <span part="location"></span>
        <span part="temperature"></span>
      </div>
    `;
  }
  render() {
    this.shadowRoot.querySelector('span[part="location"]').textContent =
      this.getAttribute("location") || "";
    this.shadowRoot.querySelector("img").src =
      this.getAttribute("icon") || "Components/WeatherCondition/mark.svg";
    this.shadowRoot.querySelector('span[part="temperature"]').textContent =
      this.getAttribute("temperature") || "";
   
  }

  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ["icon", "location", "temperature"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }
  setStyle(part, style = "") {
    this.shadowRoot.querySelector(part).style = style;
  }
  setClassName(part, className = ""){
    console.log(className);
    this.shadowRoot.querySelector(part).className = className;
  }
}
window.customElements.define("weather-condition", WeatherCondition);
