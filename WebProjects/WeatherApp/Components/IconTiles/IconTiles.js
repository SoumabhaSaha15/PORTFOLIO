class IconTiles extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="Components/SeaechBar/SearchBar.css"/>
      <div part="container">
        <span part="heading"></span>
        <img src="" alt="icon" part="icon"/>
        <span part="data"></span>
      </div>
    `;
    
  }
  render(){
    this.shadowRoot.querySelector('span[part="heading"]').textContent = this.getAttribute("heading")||'';
    this.shadowRoot.querySelector('img[part="icon"]').src= this.getAttribute("icon")||'';
    this.shadowRoot.querySelector('span[part="data"]').textContent = this.getAttribute("data")||'';
    
  }
  connectedCallback(){
    this.render()
  }
  static get observedAttributes() {
    return ['icon','data','heading'];
  }
  attributeChangedCallback(name, oldValue, newValue){
    this.render();
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
}
window.customElements.define("icon-tiles", IconTiles);
