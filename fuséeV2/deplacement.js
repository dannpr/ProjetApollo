console.log(document);/*verification du document*/
console.log(document.getElementById("fusee"));/*verification de la fusee*/
console.log(document.getElementById("fusee").style);/*verification du style de la fusee*/


/* informations sur l'obstacle meteorite */
var m=document.getElementById("meteorite");
var ym=90;/*top de la meteorite*/
var hm=90;/*hauteur de la meteorite*/
var xm=150;/*left de la meteorite*/
var wm=80;/*largeur de la meteorite*/

/*informations sur la fusée*/
var f=document.getElementById("fusee");
var yf=430;/*top de la fusee*/
var xf=180;/*left de la fusee*/
var wf=50;/*largeur de la fusée*/

console.log(yf);/*affichage du top de la fusée*/


function rejouer (chaine){
/*Cette fonction consiste à afficher le message chaine et propose au joueur de rejouer ou revenir à la page d'acceuil*/
	/*verifie si chaine est bien un string*/
	if(typeof chaine=="string"){
		/*confirm affiche le message chaine et demande au joueur de clisuer sur Ok ou Annuler*/
		if (confirm(chaine)){
			/*si Ok on rafraichit la page , le joueur peut recommencer*/
			document.location.reload();
		}
		else {
			/*si Annuler le joueur sera rediriger sur la page d'acceuil*/
			document.location.href="Page d'accueil.html";
		}
	}
}

/*La fonction collision permet de voir si la fusée touche l'obstacle, 
il prend en paramètres
y= le top de la fusée,
x= le left de la fusée*/
function colision(y,x){	
	/*condition:1- (y est compris entre le top de l'obstacle et le top+hauteur de l'obstacle)
		    2- (x est compris entre le left de la meteorite et le left+largeur de la meteorite)
		    3- (x+largeur de la fusee est compris entre le left de la meteorite et le left+largeur de la meteorite
			Il faudra faire des ajustement comme dans la consition 1 on fait -20 pour que la collsion soit realiste*/
	if(((y>ym) && (y<ym+hm-20))||((x>xm) &&(x>xm+wm))||((x+wf<xm) &&(x+wm<xm+wm))){
			f.src="explosion.png";/*On change l'image de la fusée par une image de l'explosion*/
			f.style.left=150;/*On change le top et left pour avoir une image plus grande*/
			f.style.width=80;
			setTimeout(function(){rejouer("Perdu! Voulez-vous rejouer ?")}, 1000);	
		/*On fait une pause et on utilise la fonction rejouer, la pause permet d'imobiliser la fusée sinon elle continue de faire la fonction avancer*/

		} 
}

function avancer(direction){

	switch (direction) {

		case "haut":
			yf -=20;
			f.style.top = yf +"px";
	    //console.log(yf);
			break;

		case "bas":
			yf +=20;
			f.style.top = yf +"px";
			//console.log(yf);
			break;

		case "gauche":
			xf -=20;
			f.style.left = xf +"px";
			//console.log(xf);
			break;

		case "droite":
			xf +=20;
			f.style.left = xf +"px";
			//console.log(xf);
			break;

		default:
		printf("Error! la direction est incorrecte");
	}
	colision();


}

function tourner(dir,sens) {

		switch (sens) {

			case "horaire":
			console.log(sens);

			currentangle += 90
			document.querySelector("#fusee").style.transform = 'rotate(' + (currentangle) + 'deg)';
			//console.log(currentangle); peut etre effacer

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
				//console.log(currentangle); peut effacer

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
		colision();
}

//refaire programme collision
/*function collision(pf){

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
		rejouer("Gagné! Voulez-vous rejouer
	}
}*/
//j'ai essayer un peu mais tu peu modifier
