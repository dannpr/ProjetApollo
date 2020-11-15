const baliseAll = document.querySelectorAll('.balise');
const box= document.querySelectorAll('.zonedepot');
var hauteur=document.getElementById("depot").offsetHeight;
var largeur=document.getElementById("depot").offsetWidth;
var liste_nom=[];
var liste=[];
const depart=document.querySelector('.depart');
var x=depart.offsetLeft+5;
var y=depart.offsetTop+10;

baliseAll.forEach(balise =>{
  balise.addEventListener('dragstart', dragStart);
  balise.addEventListener('dragend', dragEnd);
});


  function dragStart(event){
    console.log("dragstart");
    bool=0; gomme.className='gomme';
    event.dataTransfer.setData("text", event.target.name);
    this.className+='tenu';
  }

  function dragEnd(event){
    console.log("dragend");
    this.className='balise';
  }


box.forEach(vide =>{
  vide.addEventListener('dragover', dragOver);
  vide.addEventListener('dragenter', dragEnter);
  vide.addEventListener('dragleave', dragLeave);
  vide.addEventListener('drop', dragDrop);
});



function dragOver(e){
  console.log("dragover");

  e.preventDefault();
}

function dragEnter(e){
  console.log("dragenter");
  e.preventDefault();
  e.target.classList.add('hovered');
}

function dragLeave(event){
  console.log("dragleave");
  event.target.classList.remove('hovered');
}

function dragDrop(event){
  event.preventDefault();
  console.log("drop");
  if(x>=largeur){
    alert("Il n'y a plus de place!");
  }else{
    const balise= event.dataTransfer.getData("text");
    var b=document.createElement("button");
    b.className='balise depose';
    b.textContent=balise;
    b.style.top=y+'px';
    b.style.left=x+'px';
    if(y>hauteur){
      y=depart.offsetTop+10;
      x+=175;
    }else{y+=50;}
    liste_nom.push(balise);
    liste.push(b);
    var depot=document.querySelector(".zonedepot");
    depot.append(b);
  }
}

const compil=document.querySelector(".compil");
compil.addEventListener('click', compilation);

function compilation(event){
  var i;
  for(i=0; i<liste.length; i++){
    console.log(liste_nom[i], liste[i]);
  }
}

const init=document.querySelector('.init');
init.addEventListener('click', suppr_tout);

function suppr_tout(event){
  const allBalises=document.querySelectorAll('.depose');
  allBalises.forEach(vide =>{
    vide.remove();
  });
  x=depart.offsetLeft+5;
  y=depart.offsetTop+10;
  liste_nom=[];
  liste=[];
  bool=0; gomme.className='gomme';
}

function supprimer(event){
  var x1=this.offsetLeft;
  var y1=this.offsetTop;
  if (bool==1){
  this.remove();
  const balises=document.querySelectorAll('.depose');
  balises.forEach(vide =>{
    var k=vide.offsetTop;
    if(k>=y1){
      vide.style.top=(k-50)+'px';
      y=y-50;
    }

  });
  }
}

const gomme=document.querySelector('.gomme');
var bool=0;
gomme.addEventListener('click', suppr_bool);
function suppr_bool(e){
  if (bool==0){ bool=1; this.className='appuyee';}
  else {bool=0; this.className='gomme';}
  console.log(bool);
  const balises=document.querySelectorAll('.depose');
  balises.forEach(vide =>{
    vide.addEventListener('click', supprimer);
  });
}
