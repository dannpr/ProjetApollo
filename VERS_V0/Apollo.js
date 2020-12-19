class Image{
	constructor(url,width,height,left,top){
		this.url=url;
		this.width=width;
		this.height=height;
		this.left=left;
		this.top=top;
		this.position="absolute";
	}
	afficher(){
		var i=document.createElement("img");
		i.src=this.url;
		i.className='image',
		i.style.zIndex="1";
		i.style.position="absolute";
		i.style.top=this.top+"px";
		i.style.left=this.left+"px";
		i.style.width=this.width+"px";
		i.style.height=this.height+"px";
		var anim=document.querySelector(".animation");
		anim.append(i);
	}

}

class Fusee extends Image{
	constructor(left,top){
		super("fusee.png",20,40,left,top);
    this.currentangle=0;
    this.direction="haut";
	}
	var i=document.createElement("img");
	afficher_fusee(){
		i.src=this.url;
		i.className="fusee";
		i.style.position="absolute";
		i.style.top=this.top+"px";
		i.style.left=this.left+"px";
		i.style.width=this.width+"px";
		i.style.height=this.height+"px";
		i.style.zIndex="2";
		i.style.animation="move 3s 2ms 1 linear";
		var anim=document.querySelector(".animation");
		anim.append(i);
	}
	deplacer(x,y){
		i.style.top=y+"px";
		i.style.left=x+"px";
	}

}

class Niveau{
	constructor(){
		this.obstacles=[];
		}
	ajouter(image){
		this.obstacles.push(image);
	}
	afficher_niveau(){
		for(var i=0;this.obstacles.length>i;i++){
			(this.obstacles[i]).afficher();
		}
	}
}

var m0=new Image("meteor.png",80,90,0,0);
var m1=new Image("meteor.png",80,90,150,90);
var niveau0= new Niveau(1);
niveau0.ajouter(m0);
var niveau1=new Niveau(1);
niveau1.ajouter(m1);

var Monjeu={
	fusee:new Fusee (180,430),
	niveau:[niveau0,niveau1],
	i:0,
}

console.log(Monjeu.niveau);
console.log(niveau0.obstacles);
console.log(Monjeu.fusee);

function affichage(){
	var level=Monjeu.i;
	var niveau=Monjeu.niveau[level];
	Monjeu.fusee.afficher_fusee();
	niveau.afficher_niveau();
}

affichage();

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

function jouer(){
	var niveau_suivant=Monjeu.i+1;
	if(niveau_suivant==Monjeu.niveau.length){
		if (confirm("Bravo, vous avez réussi tous les niveaux!\nVoulez-vous rejouer depuis le début ?")){
			niveau_suivant=0;
			affichage();
		}
		else{
			document.location.href="Page d'accueil.html";
		}
	}
	else{
		if (confirm("Bravo, vous avez réussi\nVoulez-vous passez au niveau suivant ?")){
			affichage();
		}
		else{
			document.location.href="Page d'accueil.html";
		}
	}
}

var f=Monjeu.fusee;

function colision(y,x,level,i){
	var o=Monjeu.niveau[level].obstacles[i];
	var ym=o.top;
	var xm=o.left;
	var hm=o.height;
	var wm=o.width;
	/*condition:1- (y est compris entre le top de l'obstacle et le top+hauteur de l'obstacle)
		    2- (x est compris entre le left de la meteorite et le left+largeur de la meteorite)
		    3- (x+largeur de la fusee est compris entre le left de la meteorite et le left+largeur de la meteorite
			Il faudra faire des ajustement comme dans la consition 1 on fait -20 pour que la collsion soit realiste*/
	if(((y>ym) && (y<ym+hm-20))||((x>xm) &&(x>xm+wm))||((x+Monjeu.fusee.width<xm) &&(x+wm<xm+wm))){
			f.src="explosion.png";/*On change l'image de la fusée par une image de l'explosion*/
			f.left=150;/*On change le top et left pour avoir une image plus grande*/
			f.width=80;
			setTimeout(function(){rejouer("Perdu!\nVous avez touché la météorite =(\nVoulez-vous rejouer ?")}, 1000);
		/*On fait une pause et on utilise la fonction rejouer, la pause permet d'imobiliser la fusée sinon elle continue de faire la fonction avancer*/

		}
}


/*fonction qui gère le deplacement de la fusée lié au css*/
function avancer(direction){
	var yf=f.top;
	var xf=f.left;
	if(yf=0){
		jouer()
	}
	else{
		switch (direction) {

			case "haut":
				yf -=20;
				break;

			case "bas":
				yf +=20;
				break;

			case "gauche":
				xf -=20;
				break;

			case "droite":
				xf +=20;
				break;

				default:
				console.log("Error! la direction est incorrecte");
			}
			deplacer(xf,yf);
			colision(yf,xf,Monjeu.i,0);
			hors_zone();
		}
}
var direction=f.direction;
/*fonction qui ce charge de tourner */
function tourner(dir,sens) {

		switch (sens) {

			case "horaire":
			console.log(sens);

			f.currentangle += 90
			document.querySelector(".fusee").style.transform = 'rotate(' + (f.currentangle) + 'deg)';

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
			//console.log(sens);

				f.currentangle -= 90
				document.querySelector(".fusee").style.transform = 'rotate(' + (f.currentangle) + 'deg)';

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
		//console.log(direction); non necessaire affiche la direction
}

/*fonction hors zone : si le user touche une des limites de la zone de jeux ( a ameliorer)*/
function hors_zone(){
	var yf=f.top;
	var xf=f.left;
	if ((xf >330) || (xf < 40) || ( yf <20) || (yf>430) )//verifiera a chaque deplacement si la fuséée est bien dans sa zone pour ce deplacer
		return rejouer("Perdu!\nVous êtes sorti de l'espace =(\nVoulez-vous rejouer?");
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
    eval(BI_bloctojavascript(BI_query("#depot")));
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
