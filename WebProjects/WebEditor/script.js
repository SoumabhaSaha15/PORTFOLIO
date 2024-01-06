(() => {
    const MAIN = document.querySelector('div#root main');
    const FILE_TOGGLERS = [HTML_BUTTON, CSS_BUTTON, JS_BUTTON] = document.querySelectorAll('div#root main section span#files button');
    const [RUN,CHANGE_VIEW] = document.querySelectorAll('div#root main section span#control button');
    const FILES = [HTML_FILE, CSS_FILE, JS_FILE] = document.querySelectorAll('div#root main section span#text textarea');
    const OUTPUT = document.querySelector('div#root main section#output iframe');
    HTML_BUTTON.addEventListener('click', (e) => {
        HTML_FILE.style.display = "block";
        CSS_FILE.style.display = "none";
        JS_FILE.style.display = "none";
        if(HTML_BUTTON.style.backgroundColor == 'black')
            HTML_BUTTON.style.backgroundColor = "#ff7300";
        else
            HTML_BUTTON.style.backgroundColor = "black";
        CSS_BUTTON.style.backgroundColor = "black";
        JS_BUTTON.style.backgroundColor = "black";
    });
    
    CSS_BUTTON.addEventListener('click', (e) => {
        HTML_FILE.style.display = "none";
        CSS_FILE.style.display = "block";
        JS_FILE.style.display = "none";
        if(CSS_BUTTON.style.backgroundColor == 'black')
            CSS_BUTTON.style.backgroundColor = "blue";
        else
            CSS_BUTTON.style.backgroundColor = "black";
        HTML_BUTTON.style.backgroundColor = "black";
        JS_BUTTON.style.backgroundColor = "black";
    });

    JS_BUTTON.addEventListener('click', (e) => {
        HTML_FILE.style.display = "none";
        CSS_FILE.style.display = "none";
        JS_FILE.style.display = "block";
        if(JS_BUTTON.style.backgroundColor == 'black')
            JS_BUTTON.style.backgroundColor = "#d7d700";
        else
            JS_BUTTON.style.backgroundColor = "black";
        HTML_BUTTON.style.backgroundColor = "black";
        CSS_BUTTON.style.backgroundColor = "black";
    });
    HTML_BUTTON.click();
    OUTPUT.contentDocument.head.innerHTML = `<meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>`;
    RUN.addEventListener("click",(e)=> {
        OUTPUT.contentDocument.body.innerHTML = HTML_FILE.value+`<style>${CSS_FILE.value}</style>`;

        try{
            OUTPUT.contentWindow.eval(JS_FILE.value);
        }
        catch(e){
            alert(e.message);
        }
    });

    CHANGE_VIEW.addEventListener("click",(e)=>{
        if(CHANGE_VIEW.innerHTML == "wide"){
            MAIN.style.gridTemplateColumns = "30% 70%";
            CHANGE_VIEW.innerHTML = "narrow";
        }
        else if(CHANGE_VIEW.innerHTML == "narrow"){
            MAIN.style.gridTemplateColumns = "70% 30%";
            CHANGE_VIEW.innerHTML = "normal";
        }
        else{
            MAIN.style.gridTemplateColumns = "50% 50%";
            CHANGE_VIEW.innerHTML = "wide";
        }
    });

    window.onload=(e)=>{
        if(window.matchMedia("(orientation:portrait)").matches)
            alert('change orientation');
    }
    window.matchMedia("(orientation:portrait)").addEventListener('change',e=>{window.location.reload()});
})()
