/* informations sur l'obstacle meteorite */
var ym=90;
var hm=90;

/*informations sur la fusée*/
var yf=430;
var xf=180;
var currentangle = 0;
var direction = "haut";
//console.log(direction);
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
