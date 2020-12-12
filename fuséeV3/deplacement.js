/* informations sur l'obstacle meteorite */
var ym=90;
var hm=90;

/*coordonné des bord ou la fusée ce deplace*/
var xz = 400;
var yz = 500;


/*informations sur la fusée*/
var yf=430; //axe y position de
var xf=180; //axe x
var currentangle = 0; //angle de la fusée
var direction = "haut"; //direction au départ
var f=document.getElementById("fusee"); //variable qui est lié au css de la fusée (en cas de modification )

/* réaction au moment d'une réussite ou d'une defaite lors du deplacement du jeu
proposant au joueur de rejouer ou aller à la page d'acceuil*/
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

/*fonction qui gère le deplacement de la fusée lié au css*/
function avancer(direction){

	if ((xf >330) || (xf < 40) || ( yf <20) || (yf>430) ){//verifiera a chaque deplacement si la fuséée est bien dans sa zone pour ce deplacer
		return hors_zone();
	}

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
			//console.log(sens);

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
		//console.log(direction); non necessaire affiche la direction
}

/*fonction hors zone : si le user touche une des limites de la zone de jeux ( a ameliorer)*/
function hors_zone(){
	//pop up qui affichera que on est hors zone;
	confirm("vous êtes sortie de la zone vous avez perdu");//dire que c'est perdu mais on peu personnalisé
	document.location.reload();//si on est hors zone elle rafraichiera la page (autre solution possible comme donner la possibiliter de recommencer ou aller a la page d'acceuil)

}

/*fonction qui affichera une explosion, un pop-up et ou des nuages selon ce que la fusée "percute"*/
function collision(yf){
	
	console.log(f.src.indexOf('explosion.png')>=0);
	if(f.src.indexOf('explosion.png')>=0){
		return;
	}
	//console.log(f.src);
	if((pf>ym) && (pf<ym+hm-20)){
			f.src="explosion.png";
			f.style.left=150;
			f.style.width=80+"px";
			setTimeout(function(){rejouer("Perdu! Voulez-vous rejouer ?")}, 1000);

		}
		//console.log(yf); //test pour voir le pixel top de la fusee non obligatoire*
	else{
		rejouer("Gagné! Voulez-vous rejouer?");
	}
}

