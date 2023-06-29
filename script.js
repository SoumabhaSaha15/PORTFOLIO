(function main() {

  const SECTIONS = [...document.getElementsByTagName('section')];
  [...document.getElementsByClassName('btn')].forEach((item, index, array) => {
    item.addEventListener("click", () => {
      SECTIONS.forEach((i) => { i.style.display = 'none'; });
      SECTIONS[index].style.display = 'grid';
    });
  });
  const Observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle('show', entry.isIntersecting);
    });
  }, {
    threshold: 0,
  });
  [...document.querySelectorAll('div .hide')].forEach((element) => { Observer.observe(element); })

})();
