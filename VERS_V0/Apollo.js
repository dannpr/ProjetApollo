/* informations sur l'obstacle meteorite */
var ym=90;
var hm=90;

/*informations sur la fusée*/
var yf=430;

var f=document.getElementById("fusee");

function rejouer (chaine){
	if(typeof chaine=="string"){
		if (confirm(chaine)){
			document.location.reload();
		}
		else {
			document.location.href="Page d'accueil.html";
		}
	}
}

function avancer(){
	console.log(f.src.indexOf('explosion.png')>=0);
	if(f.src.indexOf('explosion.png')>=0){
		return;
	}
	//console.log(f.src);
	yf-=10;
	if(f && yf>0){
		f.style.top = yf +"px";
		if((yf>ym) && (yf<ym+hm-20)){
			f.src="explosion.png";
			f.style.left=150;
			f.style.width=80+"px";
			setTimeout(function(){rejouer("Perdu! Voulez-vous rejouer ?")}, 1000);	

		} 
		//console.log(yf); //test pour voir le pixel top de la fusee non obligatoire*   
	}
	else{
		rejouer("Gagné! Voulez-vous rejouer ?");
	}

}
//pour éviter tout conflict avec d'autres fichier, toute fonction ou variable globale sera de la forme BI_nom
function BI_query(id) {
    var buffer = "";
    var i,start;
    buffer = document.querySelector(id).innerHTML;
    i=0;
    while(i<buffer.length) {
      if (buffer.slice(i,i+7)=="<button") {
        start = i;
        i += 7;
        while ( buffer[i] != '>') {
          i++;
        }
        buffer = buffer.slice(0,start) + '<' +buffer.slice(i+1);
        i -= i-start;
      } else if (buffer.slice(i,i+8)=="</button") {
        buffer = buffer.slice(0,i)+buffer.slice(i+8);
        i -= 10;
      } else {
        i++;
      }
    }
    return buffer;
  }
  /////////////////////// Partie Block
function BI_bloctojavascript(buffer) {
    var res = "";
    function matchwith (bloc,command) {
      if (buffer.slice(0,bloc.length) == bloc) {
        res += command;
        buffer = buffer.slice(bloc.length);
        return true;
      }
      return false;
    };
    while (buffer != "") {
      if (!(
      matchwith("<Avancer>", "avancer(direction);") ||
      matchwith("<Tourner à gauche>", "tourner(direction,\"antihoraire\")") ||
      matchwith("<Tourner à droite>", "tourner(direction,\"horaire\");")
      )){
        console.error("BI_bloctojavascript ERROR 1 : unknown bloc !");
        return "";
      }
    }
    return res;
  }
  
function BI_runcode(){
    eval(BI_bloctojavascript(BI_query("#depot")))
  }


  

 //////////////partie Balises
 
const baliseAll = document.querySelectorAll('.balise');//selection de toutes les balises du menu
const box= document.querySelectorAll('.zonedepot');//selection de la zone de dépot
//on récupère la taille de la zone de dépot:
var hauteur=document.getElementById("depot").offsetHeight;
var largeur=document.getElementById("depot").offsetWidth;
//liste vide, on y ajoutera les balises déposées dans la zone de dépot afin de faciliter les itérations sur ces dernières
var liste=[];
//initialisation des coordonnées d'ajout, l'ajout s'effectuant par rapport à la coordonnée gauche supérieure de la zone de dépot:
var x=5;
var y=0;

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
  e.target.classList.add('hovered');//change l'affichage de la zone pour que l'utilisateur puisse voir qu'il peut déposer la balise
}

function dragLeave(event){
  console.log("dragleave");
  event.target.classList.remove('hovered');//l'affichage de la zone est réinitialisé
}

function dragDrop(event){
  event.preventDefault();
  console.log("drop");
	event.target.classList.remove('hovered');
  /*if(x>=largeur){         //{sarah} mis en commentaire car provoque des bugs
    alert("Il n'y a plus de place!");
  }else{*/
	const balise= event.dataTransfer.getData("text");//on récupère les données stockées précedement dans "text", permettant de construire une balise identique à celle du menu dans la zone
	var b=document.createElement("button");//création de la balise
	b.className='balise depose';//ajout des caractéristiques d'affichage
	b.textContent=balise;//ajout des données
	//placement de la balise en fonction des coordonnées disponibles
	b.style.top=y+'px';//coordonnées en x
	b.style.left=x+'px';//coordonnées en y
	y+=50;//on incrémente simplement pour les coordonnées de la prochaine balise déposée
	liste.push(b);
	//la balise est ajoutée à ses coordonnées à la zone de dépot
	var depot=document.getElementById("depot");
	depot.append(b);
}

//compilation: appelle deux fonctions sur le bouton de compilation
const compil=document.querySelector(".compil");
compil.addEventListener('click', compilation);
compil.addEventListener('click', BI_runcode);

function compilation(event){//fonction indicative pour les développeurs: permet de visualiser la liste des balises
  var i;
  for(i=0; i<liste.length; i++){
    console.log(liste[i]);
  }
}

//écouteur d'évènement ajouté sur le bouton de réinitialisation, appelle supr_tout
const init=document.querySelector('.init');
init.addEventListener('click', suppr_tout);

function suppr_tout(event){//fonction de suppression des balises
  const allBalises=document.querySelectorAll('.depose');//on récupère toutes les balises déposées dans la constante allBalises
  allBalises.forEach(vide =>{//Itération sur toutes les balises
    vide.remove();//suppression
  });
	//réinitialisation des coordonnées d'ajout
  x=5;
  y=0;
	//réinitialisation de la liste des balises
  liste=[];
	//réinitialisation de la gomme et de son booléen(cf les fonctions du bouton gomme ci-dessous)
  bool=0; gomme.className='gomme';
}

function supprimer(event){//fonction de suppression d'une balise unique
  var y1=this.offsetTop;//on récupère l'ordonnée de la balise à supprimer, à partir de laquelle on va pouvoir déterminer quelles balises déplacer pour combler le vide
  if (bool==1){//si la gomme a été activée, son booléen vaut true(1), on peut donc procéder à la suppression
  	this.remove();//suppression
		y-=50;//la coordonnée d'ajout est décrémentée de la place laissée par la balise supprimer, de sorte que les prochaines balises insérées le soit correctement
  	const balises=document.querySelectorAll('.depose');//on sélectionne toutes les balises restantes dans la zone de dépot
  	balises.forEach(vide =>{//itération sur chaque balise
			var k=vide.offsetTop;//on récupère l'ordonnée de la balise
    	if(k>=y1){//si l'ordonnée de la balise est supérieure à celle de la balise supprimée précédement, il faut la remonter, ce qui est effectué à la ligne suivante en décrémentant l'ordonnée
      	vide.style.top=(k-50)+'px';
    	}
  	});
  }
}

function supprimer_liste(e){//fonction de mise à jour de la liste des balises lors des suppressions
	liste.splice(liste.indexOf(this),1);//suppression de la liste de la balise supprimée. on utilise la méthode splice qui supprime à partir de l'indice donné en premier argument(ici l'indice de la balise à supprimer) le nombre d'éléments donné en 2ème argument (ici 1 puisqu'on ne supprime qu'une balise à la fois).La longueur de la liste diminue de 1
	if(liste.length==0) y=0;//sécurité supplémentaire sur l'ordonnée d'ajout:on s'assure que lorsque la liste est vide, donc qu'il n'y a plus de balises dans la zone de dépot, les coordonnées d'ajout sont bien les coordonnées initiales
}

//ajout d'un écouteur d'évènement sur la gomme
const gomme=document.querySelector('.gomme');
gomme.addEventListener('click', suppr_bool);

//déclaration du booléen de la gomme, initialisé à false(0). Ce booléen permet au programme de connaître l'état de la gomme: si l'utilisateur clique dessus une fois, la gomme est activée et le booléen vaut true, tandis que s'il clique de nouveau dessus, la gomme est désactivée et le booléen vaut false
var bool=0;

function suppr_bool(e){//fonction de gestion de la gomme
	//mise à jour de l'état de la gomme
  if (bool==0){ bool=1; this.className='appuyee';}//la gomme était désactivée, on l'active et on change son affichage de sorte que l'utilisateur sache qu'elle est activée
  else {bool=0; this.className='gomme';}//sinon, la gomme était activée, elle se désactive et retrouve son apparence normale
  console.log(bool);
	//ajout d'écouteur d'évènement sur les balises de la zone de dépot pour les fonctions de suppression de la zone et de la liste des balises:
  const balises=document.querySelectorAll('.depose');
  balises.forEach(vide =>{
    vide.addEventListener('click', supprimer);
		vide.addEventListener('click',supprimer_liste);
  });
}
// //////////Pop-up (fonctions: fermeture/ouverture)
$ = function(id) {
  return document.getElementById(id);
}

var show = function(id) {
	$(id).style.display ='flex';
}
var hide = function(id) {
	$(id).style.display ='none';
}
// Pour que le pop up s'affiche automatiquement
setTimeout(show('popup'),2000);


//Suppression du popup à l'écran 
var ok = document.getElementById("cross"); 

if(cross){
  cross.addEventListener("click",deletePopup);  //écouteur d'évènement sur le bouton OK du popup qui appel deletePopup
}                                       
                                        
function deletePopup(){  
  hide('popup');    
}
