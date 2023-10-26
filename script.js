(function main() {

  const SECTIONS = [...document.getElementsByTagName('section')];
  [...document.getElementsByClassName('btn')].forEach((item, index, array) => {
    item.addEventListener("click", () => {
      SECTIONS.forEach((i) => { i.style.display = 'none'; });
      SECTIONS[index].style.display = 'grid';
    });
  });

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

  const CIRTIFICATE = [...document.querySelectorAll('img.cirtificate')];
  CIRTIFICATE.forEach(item=>{
    item.addEventListener('click',(e)=>{
      console.log(e);
      location.href=item.dataset.link;
    });
  });
  
  [...document.querySelectorAll('div .hide')].forEach((element) => { Observer.observe(element); });

  
  
})();
