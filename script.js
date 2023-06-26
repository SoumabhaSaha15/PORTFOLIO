(function main() {
  
  const SECTIONS = [...document.getElementsByTagName('section')];
  [...document.getElementsByClassName('btn')].forEach((item, index, array) => {
    item.addEventListener("click", () => {
      SECTIONS.forEach((i) => { i.style.display = 'none'; });
      SECTIONS[index].style.display = 'grid';
    });
  });
  
})();
