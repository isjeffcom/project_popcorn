/*
Popcorn Project
Created by Jeff Wu, Liam White
Slider Function
University of Portsmouth
2018.01.11
*/

var slideIndex = 0;
var textIndex = 0;
var textH1Index = 0;
var textH3Index = 0;
carousel();
bigText();
bigTextH3();
indicator();
//replaceLogo();


/*function plusDivs(n) {
    carousel(slideIndex += n);
}*/


function carousel() {
    var i;
    var x = document.getElementsByClassName("mySlides");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none"; //disappear

    }
    slideIndex++;
    if (slideIndex > x.length) {slideIndex = 1}
    x[slideIndex-1].style.display = "block"; //display
    setTimeout(carousel, 10000); //10s
}

function indicator() {
    var j;
    var ind = document.getElementsByClassName("myInd");
    //var bt = document.getElementById("btx");

    for (j = 0; j < ind.length; j++) {
      if(window.innerWidth > 600){
        ind[j].className="fa fa-circle fa-1x fa-inverse myInd";
        ind[j].style.transform="scale(1.0)";
        ind[j].style.opacity = "1.0";
      }else{
        ind[j].className="fa fa-circle fa-1x fa-inverse myInd";
        ind[j].style.transform="scale(1.0)";
        ind[j].style.opacity = "0.1";
      }
    }
    textIndex++;

    if (textIndex > ind.length) {textIndex = 1;}
    if(window.innerWidth > 600){
      ind[slideIndex-1].className="fa fa-chevron-right fa-1x fa-inverse myInd";
      ind[slideIndex-1].style.transform="scale(1.5)";
    }else{
      ind[slideIndex-1].className="fa fa-circle fa-1x fa-inverse myInd";
      ind[slideIndex-1].style.transform="scale(1.0)";
      ind[slideIndex-1].style.opacity = "0.6";
    }


    /*if(slideIndex == 1){
      console.log('400');
      bt.style.marginTop="-20.6%";
      console.log(bt);

    }else{
      console.log('440');
      bt.style.marginTop="-23%";
      console.log(bt);
    }*/
    setTimeout(indicator, 10000); //10s
}

function bigText() {
    var a;
    var b = document.getElementsByClassName("myTexts");
    for (a = 0; a < b.length; a++) {
      b[a].style.display = "none"; //disappear

    }
    console.log(textH1Index, b.length);

    if (textH1Index >= b.length) {textH1Index = 0}

    b[textH1Index].style.display = "block"; //display
    textH1Index = textH1Index + 1;
    console.log(textH1Index);
    setTimeout(bigText, 10000); //10s
}

function bigTextH3() {
    var c;
    var d = document.getElementsByClassName("myTextsH3");
    for (c = 0; c < d.length; c++) {
      d[c].style.display = "none"; //disappear

    }
    textH3Index++;
    if (textH3Index > d.length) {textH3Index = 1}
    d[textH3Index-1].style.display = "block"; //display
    setTimeout(bigTextH3, 10000); //10s
}

/*function replaceLogo(){
  if(window.innerWidth < 600){
    console.log(window.innerWidth);
    logo = document.getElementById('logo');
    logoBg = document.getElementById('logoBg');
    console.log(logoBg);
    logo.src = "./asset/img/headLogoMobile.png";
    logoBg.style.backgroundColor = "transparent";
  }
}*/
