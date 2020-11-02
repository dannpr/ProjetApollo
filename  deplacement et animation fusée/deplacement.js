//position initial de la fusée
var offsettop = 400;
function avancer()
{
  //soustraction de la position en px
  offsettop -=20;//nombre de px peu etre 10 ou 20
  if(document.getElementById("fusee"))
  {
    document.getElementById("fusee").style.top = offsettop +"px";
    console.log(offsettop); //test pour voir le pixel top de la fusee non obligatoire

  }
}
