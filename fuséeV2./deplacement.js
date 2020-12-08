/* informations sur l'obstacle meteorite */
var ym=90;
var hm=90;

/*informations sur la fusée*/
var yf=430; //axe y
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

/*fonction qui affichera une explosion, un pop-up et ou des nuages selon ce que la fusée "percute"*/
function collision(yf){

	//cas si on touche les rebord
	
	//cas si on touche touche quelque chose d'autre de la planete

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
