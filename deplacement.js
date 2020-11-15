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


