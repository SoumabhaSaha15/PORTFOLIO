(function main() {

  const SHOW_ONLY = (element)=>{ 
    SECTIONS.forEach((item) => { 
      item.style.display = 'none'; 
    }); 
    element.style.display = 'grid';
  }
  const SECTIONS = [HOME,ABOUT,MY_PROJECT,CONTACT] = document.querySelectorAll("body main section");
  const BTN = [HOME_BTN,ABOUT_BTN,MY_PROJECT_BTN,CONTACT_BTN]=[...document.getElementsByClassName('btn')];
  // HOME_BTN.addEventListener("click",(e)=>{location.hash = "#home";});
  // ABOUT_BTN.addEventListener("click",(e)=>{location.hash = "#about";});
  // MY_PROJECT_BTN.addEventListener("click",(e)=>{location.hash = "#my-projects";});
  // CONTACT_BTN.addEventListener("click",(e)=>{location.hash = "#contact";});

  const LOAD_PAGE = (e)=>{
    switch(location.hash){
      case "#home","":
        SHOW_ONLY(HOME);
        HOME_BTN.hover();
      break;
      case "#about":
        SHOW_ONLY(ABOUT);
        ABOUT_BTN.hover();
      break;
      case "#my-projects":
        SHOW_ONLY(MY_PROJECT);
        MY_PROJECT_BTN.hover()
      break;
      case "#contact":
        SHOW_ONLY(CONTACT);
      break;
      default:
        SHOW_ONLY(HOME);
        CONTACT_BTN.hover();
      break;
    }
  }

  window.addEventListener("hashchange",LOAD_PAGE);
  window.addEventListener("load",LOAD_PAGE);
  
  const scriptURL = 'https://script.google.com/macros/s/AKfycbwbvfc8u2DmIAn90nEKs9EIlvFGZuCoCeloEwRdxOBJ8TiaDh4jIlfqzTDX4ockAbXc7A/exec';
  const form = document.forms['submit-to-google-sheet'];
  form.addEventListener('submit',(e) => {
    e.preventDefault();
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
      .then((response )=>{window.alert('Success!');})
      .catch((error)=>{window.alert('Error!');});
  });
  
  const Observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle('show', entry.isIntersecting);
    });
  }, {
    threshold: 0,
  });
  
  [...document.querySelectorAll('div .hide')].forEach((element) => { Observer.observe(element); });
  
})();
