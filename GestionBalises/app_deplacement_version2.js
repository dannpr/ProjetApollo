const baliseAll = document.querySelectorAll('.balise');//récupération de toutes les balises du menu
const box= document.querySelectorAll('.zonedepot');//on récupère la zone de dépot de la grid
//récupération de la taille de la zone de dépot
var hauteur=document.getElementById("depot").offsetHeight;
var largeur=document.getElementById("depot").offsetWidth;
var liste_nom=[];
var liste=[];
//récupération des coordonnées de la ligne marquant l'origine du repère donnant ensuite les coordonnées des balises déposées
const depart=document.querySelector('.depart');
var x=depart.offsetLeft+5;
var y=depart.offsetTop+10;

baliseAll.forEach(balise =>{//ajout d'écouteurs sur les balises du menu, avec les évèments dragStart et dragEnd, marquant respectivement le début et la fin du drag
  balise.addEventListener('dragstart', dragStart);
  balise.addEventListener('dragend', dragEnd);
});


  function dragStart(event){//gestion du début du déplacement
    console.log("dragstart");
    bool=0; gomme.className='gomme';//la gomme est par défaut désactivée
    event.dataTransfer.setData("text", event.target.name);//on sauvegarde les données(nom) des balises dans la variable text
    this.className+='tenu';//l'affichage des balises est modifiés lorsqu'elles sont tenues
  }

  function dragEnd(event){//gestion de la fin du déplacement, lorsque la balise est lachée elle reprend son apparence habituelle
    console.log("dragend");
    this.className='balise';
  }


box.forEach(vide =>{//ajout d'écouteurs d'évènement sur la zone de dépot
  //fonctions pour l'affichage
  //
  vide.addEventListener('dragover', dragOver);//lorsqu'un objet est déplacé au dessus
  vide.addEventListener('dragenter', dragEnter);//lorsqu'un objet entre dans la zone
  vide.addEventListener('dragleave', dragLeave);//lorsqu'un objet quitte la zone
  //
  vide.addEventListener('drop', dragDrop);//lorsqu'un objet est lâché dans la zone
});



function dragOver(e){
  console.log("dragover");

  e.preventDefault();//anule le comportement par défaut de l'évènement
}

function dragEnter(e){
  console.log("dragenter");
  e.preventDefault();
  e.target.classList.add('hovered');//change l'affichage de la zone pour ue l'utilisateur puisse voir qu'il peut déposer la balise
}

function dragLeave(event){
  console.log("dragleave");
  event.target.classList.remove('hovered');//l'affichage de la zone est réinitialisé
}

function dragDrop(event){//fonction gérant le dépot, donc l'insertion des balises dans la zone
  event.preventDefault();
  console.log("drop");
  if(x>=largeur){//si la coordonnée disponible est supérieure à la taille de la zone, il n'y a plus de place pour l'insertion, l'utilisateur est signalé et la balise ne se dépose pas
    alert("Il n'y a plus de place!");
  }else{
    const balise= event.dataTransfer.getData("text");//on récupère les données stockées précedement dans "text", permettant de construire une balise identique à celle du menu dans la zone
    var b=document.createElement("button");//création de la balise
    b.className='balise depose';//ajout des caractéristiques d'affichage
    b.textContent=balise;//ajout des données
    //placement de la balise en fonction des coordonnées disponibles 
    b.style.top=y+'px';//coordonnées en x
    b.style.left=x+'px';//coordonnées en y
    if(y>hauteur){//si la balise arrive en dehors de la zone par le bas, elle peut être décallée d'une colonne vers la droite
      y=depart.offsetTop+10;
      x+=175;
    }else{y+=50;}//sinon, on incrémente simplement pour les coordonnées de la prochaine balise déposée
    liste_nom.push(balise);
    liste.push(b);
    //la balise est ajoutée à ses coordonnées à la zone de dépot
    var depot=document.querySelector(".zonedepot");
    depot.append(b);
  }
}

const compil=document.querySelector(".compil");//gestion du bouton compilation
compil.addEventListener('click', compilation);

function compilation(event){//la fonction doit compiler les données et les envoyer aux fonctions de gestion de la fusée(ici simple affichage)
  var i;
  for(i=0; i<liste.length; i++){
    console.log(liste_nom[i], liste[i]);
  }
}

const init=document.querySelector('.init');//gestion de la réinitialisation
init.addEventListener('click', suppr_tout);

function suppr_tout(event){//suppression de toutes les balises et réinitialisation des coordonnées
  const allBalises=document.querySelectorAll('.depose');
  allBalises.forEach(vide =>{
    vide.remove();
  });
  depart=document.querySelector('.depart');
  x=depart.offsetLeft+5;
  y=depart.offsetTop+10;
  liste_nom=[];
  liste=[];
  bool=0; gomme.className='gomme';
}

function supprimer(event){//fonction de suppression individuelle des balises 
  var x1=this.offsetLeft;
  var y1=this.offsetTop;
  if (bool==1){//valable uniquement si la gomme a été activée
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
var bool=0;//ce booléen fait état de l'activation ou non de la gomme
gomme.addEventListener('click', suppr_bool);
function suppr_bool(e){//gestion de la gomme
  if (bool==0){ bool=1; this.className='appuyee';}//signale à l'utilisateur que la gomme a été activée par un changement d'affichage
  else {bool=0; this.className='gomme';}//signale à l'utilisateur que la gomme est desactivée
  console.log(bool);//
  //ajout d'un écouteur d'évènement sur toutes les balises de la zone de dépot
  const balises=document.querySelectorAll('.depose');
  balises.forEach(vide =>{
    vide.addEventListener('click', supprimer);
  });
}
