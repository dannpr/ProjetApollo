
const canvas = document.getElementById('canvas');
const score = document.getElementById('score');
const endScreen = document.getElementById('endScreen');

//le reglage pour afficher le canvas du départ/fin
endScreen.addEventListener('click', () => {
    start();
      endScreen.style.visibility = 'hidden';
    , 1000);
  });
  
//[sarah]Message d'accueil//
onload="alert("Bienvenue sur Apollo, le jeu qui vous permettera d'apprendre l'algorithmie de manière amusante et ludique! Vous utiliserez des balises dont le fonctionnement vous sera expliqué au fur et à mesure de votre avancement dans le jeu");"
