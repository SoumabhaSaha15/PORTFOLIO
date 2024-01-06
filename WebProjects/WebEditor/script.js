const OUTPUT = document.querySelector('input[type="text"]#output');
const MOVE_EXPRESSION = (value) => {OUTPUT.value = value;}
(function main(){ 
  
  let DATA = localStorage.getItem('ALL_EXPRESSION');
  const EXPRESSION_HISTORY = (DATA===null)?([]):(JSON.parse(DATA));
  const HISTORY = document.querySelector('.history');

  OUTPUT.addEventListener("keypress",(event)=>{
    if(event.key==="Enter"){
      try {
        const EXPRESSION = OUTPUT.value;
        OUTPUT.value = eval(OUTPUT.value);
        HISTORY.innerHTML+=(OUTPUT.value=='undefined' || OUTPUT.value=='Invalid')?(''):((()=>{
          EXPRESSION_HISTORY.push({Expression:EXPRESSION,Output:OUTPUT.value});
          localStorage.setItem('ALL_EXPRESSION',JSON.stringify(EXPRESSION_HISTORY));
          return `<div class="expressionHolder"><input type="text" value="${EXPRESSION}"  onclick="MOVE_EXPRESSION(value)" readonly style="border-radius:2vmin 2vmin 0 0 ;" /><input type="text" value="${OUTPUT.value}" readonly style="border-radius:0 0 2vmin 2vmin;"/></div>`
        })());
      }
      catch (err) {
        OUTPUT.value = "Invalid";
      }
    }
  });

  EXPRESSION_HISTORY.forEach(element => {
    HISTORY.innerHTML+=`<div class="expressionHolder"><input type="text" value="${element.Expression}"  onclick="MOVE_EXPRESSION(value)" readonly style="border-radius:2vmin 2vmin 0 0 ;" /><input type="text" value="${element.Output}" readonly style="border-radius:0 0 2vmin 2vmin;"/></div>`
  });
  

})();