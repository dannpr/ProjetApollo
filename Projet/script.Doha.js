
const canvas = document.getElementById('canvas');
const score = document.getElementById('score');
const endScreen = document.getElementById('endScreen');

//le reglage pour afficher le canvas du départ/fin
endScreen.addEventListener('click', () => {
    start();
      endScreen.style.visibility = 'hidden';
    , 1000);
  });
  
