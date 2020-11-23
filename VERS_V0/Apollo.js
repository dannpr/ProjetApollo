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
        matchwith("<Avancer>", "avancer();") ||
        matchwith("<Tourner à gauche>", "tourneragauche();") ||
        matchwith("<Tourner à droite>", "tourneradroite();")
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
  /*if(x>=largeur){         //{sarah} mis en commentaire car provoque des bugs 
    alert("Il n'y a plus de place!");
  }else{*/
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

const compil=document.querySelector(".compil");
compil.addEventListener('click', compilation);
compil.addEventListener('click', BI_runcode);

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