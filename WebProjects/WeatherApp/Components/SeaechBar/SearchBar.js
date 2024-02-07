class SearchBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="Components/SeaechBar/SearchBar.css"/>
      <div part="container" >
        <img src="Components/SeaechBar/location.svg" alt="location mark" part="mark"/>
        <input type="text" placeholder="location" part="field"/>
      </div>
    `;
    this.shadowRoot.querySelector("input")
      .addEventListener("keypress", (ev) => {
        if (ev.key === "Enter") {
          this.dispatchEvent(
            new CustomEvent("search-input", {
              detail: ev.currentTarget.value,
            }),
          );
        }
      });
  }
  render(){
    this.shadowRoot.querySelector("input").value = this.getAttribute("value")||'';
   
  }
  connectedCallback(){
    this.render()
  }
  static get observedAttributes() {
    return ['value'];
  }
  setStyle(part, style = "") {
    try{    
      this.shadowRoot.querySelector(part).style = style;
    }catch(e){
      console.log(e);
    }
  }
  setClassName(part, className = ""){
    console.log(className);
    this.shadowRoot.querySelector(part).className = className;
  }
  attributeChangedCallback(name, oldValue, newValue){
    this.render();
  }
}
window.customElements.define("search-bar", SearchBar);


