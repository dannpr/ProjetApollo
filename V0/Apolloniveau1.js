console.log(document);
console.log(document.getElementById("fusee"));
console.log(document.getElementById("fusee").style);


/* informations sur l'obstacle meteorite */
var m=document.getElementById("meteorite");
var ym=0;
var hm=0;
var xm=0;
var wm=0;

/*informations sur la fusée*/
var f=document.getElementById("fusee");
var yf=420;
var xf=180;
var wf=40;
var hf=70;
var direction="haut";
var currentangle=0;
/* réaction au moment d'une réussite ou d'une defaite lors du deplacement du jeu
proposant au joueur de rejouer ou aller à la page d'acceuil*/
function rejouer(chaine) {
	if(typeof chaine=="string"){
		if (confirm(chaine)){
			document.location.reload();
		}
		else {
			document.location.href="Page d'accueil.html";
		}
	}
}

function niveau_suivant(){
	if(confirm("Gagné Voulez-vous passer au niveau suivant?")){
		document.location.href="Apolloniveau2.html";
	}
	else {
		document.location.href="Page d'accueil.html";
	}
}


/*fonction hors zone : si le user touche une des limites de la zone de jeux ( a ameliorer)*/
function perdu(){
	if ((xf<=10) || (xf+wf>=400) || (yf>=430) ){//verifiera a chaque deplacement si la fuséée est bien dans sa zone pour ce deplacer
		rejouer("Perdu!\nVous êtes sorti de l'espace =(\nVoulez-vous rejouer?");
	}
}
/*fonction qui gère le deplacement de la fusée lié au css*/
function avancer(direction){
	switch (direction) {

		case "haut":
			yf -=20;
			f.style.top = yf +"px";
			break;

		case "bas":
			yf +=20;
			f.style.top = yf +"px";
			break;

		case "gauche":
			xf -=20;
			f.style.left = xf +"px";
			break;

		case "droite":
			xf +=20;
			f.style.left = xf +"px";
			break;

		default:
		printf("Error! la direction est incorrecte");
	}

	if(yf<=10){
		niveau_suivant();
	}
		perdu();
}
/*fonction qui ce charge de tourner */
function tourner(dir,sens) {


		switch (sens) {

			case "horaire":
			console.log(sens);

			currentangle += 90
			document.querySelector("#fusee").style.transform = 'rotate(' + (currentangle) + 'deg)';

				switch (dir){

					case "haut":
						 dir = "droite";
						 direction = dir;
						break;

					case "bas":
						 dir = "gauche";
						 direction = dir;
						break;

					case "gauche":
						dir = "haut";
						direction = dir;
						break;

					case "droite":
						dir = "bas";
						direction = dir;
						break;
			}
			break;

			case "antihoraire":
			console.log(sens);

				currentangle -= 90
				document.querySelector("#fusee").style.transform = 'rotate(' + (currentangle) + 'deg)';

				switch (dir){

					case "haut":
						 dir = "gauche";
						 direction = dir;
						break;

					case "bas":
						dir = "droite";
						direction = dir;
						break;

					case "gauche":
						dir = "bas";
						direction = dir;
						break;

					case "droite":
						dir = "haut";
						direction = dir;
						break;

					default:
							printf("Error! la direction est incorrecte");
					}
			break;

			default:
					printf("Error! le sens est incorrecte");
			}
		console.log(direction);
}


//pour éviter tout conflict avec d'autres fichier, toute fonction ou variable globale sera de la forme BI_nom
function BI_query(id) {
    var buffer = "";
    var i,start;
    buffer = document.querySelector(id).innerHTML;
    i=0;
		var id="";
    while(i<buffer.length) {
      if (buffer.slice(i,i+7)=="<button") {
        start = i;
        i += 7;
        while ( buffer[i] != '>') {
					if(buffer.slice(i, i+3)=="id="){
						var k=i+4;
						while(buffer[k]!='"'){
							id=id+buffer[k];
							k++;
						}
					}
          i++;
        }
				if(id!=""){
					console.log(id);
					buffer = buffer.slice(0,start)+'<'+((document.getElementById(id)).querySelector('input')).value+' '+buffer.slice(i+1);
				}else{
        	buffer = buffer.slice(0,start) + '<' +buffer.slice(i+1);
				}
				id="";
        i -= i-start;
				//gestion de la balise de Boucle

			}	else if (buffer.slice(i,i+8)=="</button") {
				buffer = buffer.slice(0,i)+buffer.slice(i+8);
        i -= 10;
      } else if (buffer.slice(i, i+6)=="<input") {
				var j=i+7;
				while(buffer[j]!=">"){
					j++;
				}
				buffer = buffer.slice(0,i)+buffer.slice(j+1);
        i -= 10;
      }else{
				i++
			}
    }
		console.log(buffer);
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
		var insert=false;
    while (buffer != "") {
			for(i=1;i<100; i++){
				if(matchwith("<"+parseInt(i)+" Boucle>", "for(i=1; i<"+parseInt(i)+"; i++){")){
					insert=true;
				}
			}
      if (!(
				matchwith("<Avancer>", "avancer(direction);") ||
      matchwith("<Tourner à gauche>", "tourner(direction,\"antihoraire\");") ||
      matchwith("<Tourner à droite>", "tourner(direction,\"horaire\");")||
			matchwith("<Fin de boucle>", "}")||insert==true
      )){
        console.error("BI_bloctojavascript ERROR 1 : unknown bloc !");
        return "";
      }
    }
    return res;
  }

function BI_runcode(){
		if(nbBoucle!=nbFinDeBoucle){
			alert("Boucle non-fermée!");
		}
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
//compteurs de boucle (permettent de vérifier qu'une boucle est bien fermée, et qu'on essaye pas de fermer une boucle qui n'a jamais été ouverte)
var nbBoucle=0;
var nbFinDeBoucle=0;
//identifiant des balises de boucle pour la récupération des input de l'utilisateur
var idEntree=1;


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
	var b;
	if (balise == "Boucle"){
		b=document.createElement("button");
		b.textContent=balise;
		b.id=parseInt(idEntree);
		idEntree+=1;
		var entree=document.createElement("input");
		entree.type="number";
		entree.min=1;
		entree.max=99;
		entree.title="Entrer un nombre entier positif";
		entree.value=1;
		entree.size=2;
		entree.style.height="20px";
		b.insertAdjacentElement('beforeend',entree);
		b.style.height="35px";
		b.style.top=y+'px';
		y+=75;
		b.className='balise depose';
		nbBoucle+=1;
	}else{
		b=document.createElement("button");
		b.textContent=balise;
		b.style.top=y+'px';
		b.className='balise depose';
		if (balise == "Fin de boucle") {
			if(nbBoucle>nbFinDeBoucle){
				nbFinDeBoucle+=1;
				x-=25;
				y+=50;
			}
			else{
				alert("Il n'y a pas de balise de boucle à associer à une fin de boucle!");
				return;
			}
		}else{
			y+=50;
		}
	}
	//ajout des caractéristiques d'affichage
	//placement de la balise en fonction des coordonnées disponibles
//coordonnées en x
	b.style.left=x+'px';//coordonnées en y
//on incrémente simplement pour les coordonnées de la prochaine balise déposée
	if (balise =="Boucle") x+=25;
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
	nbBoucle=0;
	nbFindeboucle=0;
	//réinitialisation de la liste des balises
  liste=[];
	//réinitialisation de la gomme et de son booléen(cf les fonctions du bouton gomme ci-dessous)
  bool=0; gomme.className='gomme';
}

function supprimer(event){//fonction de suppression d'une balise unique
  var y1=this.offsetTop;//on récupère l'ordonnée de la balise à supprimer, à partir de laquelle on va pouvoir déterminer quelles balises déplacer pour combler le vide
	var balise=this.textContent;
  if (bool==1){//si la gomme a été activée, son booléen vaut true(1), on peut donc procéder à la suppression
		if (balise=="Boucle"){//suppression d'une balise de boucle: tous les éléments contenus dans la boucle sont redécallées vers la gauche jusqu'à la prochaine balise de fin de boucle, qui est aussi supprimée
			var prochFin=true;
			nbBoucle-=1;
			y-=75;
			this.remove();
			const balises=document.querySelectorAll('.depose');//on sélectionne toutes les balises restantes dans la zone de dépot
  		balises.forEach(vide =>{//itération sur chaque balise
				var k=vide.offsetTop;//on récupère l'ordonnée de la balise
				var l=vide.offsetLeft;
    		if(k>=y1){//si l'ordonnée de la balise est supérieure à celle de la balise supprimée précédement, il faut la remonter, ce qui est effectué à la ligne suivante en décrémentant l'ordonnée. il faut également supprimer l'indentation.
					temp=vide.textContent;
					if(prochFin){
						if(temp=="Fin de boucle"){
							vide.remove();
							y-=50;
							prochFin=false;
							nbFinDeBoucle-=1;
						}else if(prochFin){
							vide.style.top=(k-75)+'px';
							vide.style.left=(l-25)+'px';
						}
					}else{
						vide.style.top=(k-125)+'px';
					}
    		}
  		});
			if(prochFin) x-=25;//cas où le programme n'a pas rencontré de fin de boucle, auquel cas il faut décrémenter x pour les prochains ajouts
		}else{
			y-=50;//la coordonnée d'ajout est décrémentée de la place laissée par la balise supprimer, de sorte que les prochaines balises insérées le soit correctement
			if(balise=="Fin de boucle"){
				x+=25;//lors des ajout suivant, il faut reprendre l'indentation de la balise de boucle, désormais ouverte
				nbFinDeBoucle-=1;
			}
  		this.remove();//suppression
  		const balises=document.querySelectorAll('.depose');//on sélectionne toutes les balises restantes dans la zone de dépot
  		balises.forEach(vide =>{//itération sur chaque balise
				var k=vide.offsetTop;//on récupère l'ordonnée de la balise
    		if(k>=y1){//si l'ordonnée de la balise est supérieure à celle de la balise supprimée précédement, il faut la remonter, ce qui est effectué à la ligne suivante en décrémentant l'ordonnée
      		vide.style.top=(k-50)+'px';
					if(balise=="Fin de boucle"){
						vide.style.left=(vide.offsetLeft+25)+'px';
					}
    		}
  		});
		}
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

//Popup2

document.getElementById("open-popup1-btn").addEventListener("click",function(){document.getElementsByClassName("popup1")[0].classList.add("active");
});
document.getElementById("dismiss-popup1-btn").addEventListener("click",function(){document.getElementsByClassName("popup1")[0].classList.remove("active");
});
//Bouton de compilation en boucle
function complilOnLoop(){
	for (var i = 0; i < 5; i++) {
		compilation('click');
		BI_runcode('click');

	}
}
